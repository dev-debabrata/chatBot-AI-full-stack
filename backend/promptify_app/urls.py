from django.urls import path
from . import views
# if you put auth views in a separate file:
# from .auth_views import signup_view, login_view, logout_view

# If auth views are in views.py:
from .views import signup_view, login_view, logout_view, auth_me  # ensure auth_me present

urlpatterns = [
    # auth endpoints (accept both with and without trailing slash)
    path("auth/signup/", signup_view, name="auth_signup"),
    path("auth/signup", signup_view),
    path("auth/login/", login_view, name="auth_login"),
    path("auth/login", login_view),
    path("auth/logout/", logout_view, name="auth_logout"),
    path("auth/logout", logout_view),

    # keep the rest of your endpoints
    path("auth/me/", auth_me, name="auth_me"),
    path("auth/me", auth_me),
    path("prompt_gpt/", views.prompt_gpt, name="prompt_gpt"),
    path("get_chat_messages/<str:pk>/", views.get_chat_messages, name="get_chat_messages"),
    path("todays_chat/", views.todays_chat, name="todays_chat"),
    path("yesterdays_chat/", views.yesterdays_chat, name="yesterdays_chat"),
    path("seven_days_chat/", views.seven_days_chat, name="seven_days_chat"),
]




# from django.urls import path
# from . import views

# urlpatterns = [
#     path("auth/me/", views.auth_me, name="auth_me"),
#     path("auth/me", views.auth_me),   # <-- allow no-trailing-slash version
#     path("prompt_gpt/", views.prompt_gpt, name="prompt_gpt"),
#     path("get_chat_messages/<str:pk>/", views.get_chat_messages, name="get_chat_messages"),
#     path("todays_chat/", views.todays_chat, name="todays_chat"),
#     path("yesterdays_chat/", views.yesterdays_chat, name="yesterdays_chat"),
#     path("seven_days_chat/", views.seven_days_chat, name="seven_days_chat"),
# ]



# from django.urls import path 
# from . import views 



# urlpatterns = [
#     path("prompt_gpt/", views.prompt_gpt, name="prompt_gpt"),
#     path("get_chat_messages/<str:pk>/", views.get_chat_messages, name="get_chat_messages"),
#     path("todays_chat/", views.todays_chat, name="todays_chat"),
#     path("yesterdays_chat/", views.yesterdays_chat, name="yesterdays_chat"),
#     path("seven_days_chat/", views.seven_days_chat, name="seven_days_chat")
# ]
