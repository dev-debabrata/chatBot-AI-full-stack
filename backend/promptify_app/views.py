import os
from dotenv import load_dotenv

load_dotenv()

from openai import OpenAI
from django.shortcuts import get_object_or_404
from django.utils import timezone
from datetime import timedelta

from django.contrib.auth import authenticate, login, logout, get_user_model
from django.views.decorators.csrf import csrf_exempt

from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from promptify_app.models import Chat, ChatMessage
from promptify_app.serializers import ChatMessageSerializer, ChatSerializer

# --- Helper: lazy OpenAI client factory ---
def get_openai_client():
    api_key = os.getenv("OPENAI_API_KEY")
    if not api_key:
        raise RuntimeError(
            "OPENAI_API_KEY not set. Set OPENAI_API_KEY env var or add it to a .env file."
        )
    return OpenAI(api_key=api_key)


# compute date ranges when functions run (not at module import)
def _date_vars():
    now = timezone.now()
    today = now.date()
    yesterday = today - timedelta(days=1)
    seven_days_ago = today - timedelta(days=7)
    thirty_days_ago = today - timedelta(days=30)
    return now, today, yesterday, seven_days_ago, thirty_days_ago


def createChatTitle(user_message):

    try:
        client = get_openai_client()
    except RuntimeError:
        return user_message[:50]

    try:
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {
                    "role": "assistant",
                    "content": "Give a short, descriptive title for this conversation in not more than 5 words.",
                },
                {"role": "user", "content": user_message},
            ],
        )
        title = response.choices[0].message.content.strip()
    except Exception:
        title = user_message[:50]
    return title


# ---- Authentication endpoints ----
User = get_user_model()


@csrf_exempt
@api_view(["POST"])
def signup_view(request):
   
    data = request.data
    username = (data.get("username") or data.get("email") or "").strip()
    email = (data.get("email") or "").strip()
    password = data.get("password")
    first_name = data.get("first_name", "")

    if not username or not password:
        return Response({"code": "missing_fields", "message": "username and password are required"},
                        status=status.HTTP_400_BAD_REQUEST)

    # Prevent duplicate usernames/emails
    if User.objects.filter(username=username).exists():
        return Response({"code": "username_exists", "message": "username already exists"},
                        status=status.HTTP_400_BAD_REQUEST)
    if email and User.objects.filter(email=email).exists():
        return Response({"code": "email_exists", "message": "email already exists"},
                        status=status.HTTP_400_BAD_REQUEST)

    user = User.objects.create_user(
        username=username,
        email=email,
        password=password,
        first_name=first_name,
    )

    # Optionally auto-login the new user (session cookie will be set)
    login(request, user)

    return Response({
        "code": "ok",
        "message": "User created",
        "id": user.id,
        "username": user.username,
        "email": user.email
    }, status=status.HTTP_201_CREATED)


@csrf_exempt
@api_view(["POST"])
def login_view(request):
   
    data = request.data
    username = (data.get("username") or "").strip()
    password = data.get("password")

    if not username or not password:
        return Response({"code": "missing_fields", "message": "Username and password required."},
                        status=status.HTTP_400_BAD_REQUEST)

    # check if user exists first -> allows a distinct response for not-found
    if not User.objects.filter(username=username).exists():
        return Response({"code": "user_not_found", "message": "No account found with that email/username."},
                        status=status.HTTP_404_NOT_FOUND)

    user = authenticate(request, username=username, password=password)
    if user is None:
        return Response({"code": "invalid_credentials", "message": "Invalid password."},
                        status=status.HTTP_401_UNAUTHORIZED)

    login(request, user)
    return Response({"code": "ok", "message": "Logged in", "id": user.id, "username": user.username},
                    status=status.HTTP_200_OK)


@csrf_exempt
@api_view(["POST"])
def logout_view(request):
    """
    Logout the current session.
    """
    logout(request)
    return Response({"code": "ok", "message": "Logged out"}, status=status.HTTP_200_OK)


# ===== auth_me endpoint =====
@api_view(["GET"])
def auth_me(request):
   
    user = getattr(request, "user", None)
    if not user or user.is_anonymous:
        return Response({"detail": "Anonymous"}, status=status.HTTP_200_OK)

    data = {
        "id": user.id,
        "username": user.get_username(),
        "email": user.email,
    }
    return Response(data, status=status.HTTP_200_OK)


# ---- Chat endpoints ----
@api_view(["POST"])
def prompt_gpt(request):
    chat_id = request.data.get("chat_id")
    content = request.data.get("content")

    if not chat_id:
        return Response({"error": "Chat ID was not provided."}, status=status.HTTP_400_BAD_REQUEST)
    if not content:
        return Response({"error": "There was no prompt passed."}, status=status.HTTP_400_BAD_REQUEST)

    chat, created = Chat.objects.get_or_create(id=chat_id)

    # create/refresh chat title (safe)
    try:
        chat.title = createChatTitle(content)
        chat.save()
    except Exception:
        pass

    ChatMessage.objects.create(role="user", chat=chat, content=content)

    chat_messages = chat.messages.order_by("created_at")[:10]
    openai_messages = [{"role": message.role, "content": message.content} for message in chat_messages]

    if not any(message["role"] == "assistant" for message in openai_messages):
        openai_messages.insert(0, {"role": "assistant", "content": "You are a helpful assistant."})

    try:
        client = get_openai_client()
    except RuntimeError as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    try:
        response = client.chat.completions.create(model="gpt-4o-mini", messages=openai_messages)
        openai_reply = response.choices[0].message.content
    except Exception as e:
        return Response({"error": f"An error from OpenAI: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    ChatMessage.objects.create(role="assistant", content=openai_reply, chat=chat)
    return Response({"reply": openai_reply}, status=status.HTTP_201_CREATED)


@api_view(["GET"])
def get_chat_messages(request, pk):
    chat = get_object_or_404(Chat, id=pk)
    chatmessages = chat.messages.all()
    serializer = ChatMessageSerializer(chatmessages, many=True)
    return Response(serializer.data)


@api_view(["GET"])
def todays_chat(request):
    _, today, _, _, _ = _date_vars()
    chats = Chat.objects.filter(created_at__date=today).order_by("-created_at")[:10]
    serializer = ChatSerializer(chats, many=True)
    return Response(serializer.data)


@api_view(["GET"])
def yesterdays_chat(request):
    _, _, yesterday, _, _ = _date_vars()
    chats = Chat.objects.filter(created_at__date=yesterday).order_by("-created_at")[:10]
    serializer = ChatSerializer(chats, many=True)
    return Response(serializer.data)


@api_view(["GET"])
def seven_days_chat(request):
    _, _, yesterday, seven_days_ago, _ = _date_vars()
    chats = Chat.objects.filter(created_at__lt=yesterday, created_at__gte=seven_days_ago).order_by("-created_at")[:10]
    serializer = ChatSerializer(chats, many=True)
    return Response(serializer.data)


