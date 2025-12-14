# from django.contrib import admin
# from django.contrib.auth.admin import UserAdmin
# from promptify_app.models import Chat, ChatMessage, CustomUser

# # Register your models here.

# @admin.register(CustomUser)
# class CustomUserAdmin(UserAdmin):
#     model = CustomUser
#     list_display = ("email", "username")



# @admin.register(Chat)
# class ChatAdmin(admin.ModelAdmin):
#     model = Chat 
#     list_display = ("id", "title", "created_at")


# @admin.register(ChatMessage)
# class ChatMessageAdmin(admin.ModelAdmin):
#     models = ChatMessage 
#     list_display = ("id", "role", "content", "created_at")



from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from promptify_app.models import Chat, ChatMessage, CustomUser

# Register your models here.

@admin.register(CustomUser)
class CustomUserAdmin(UserAdmin):
    model = CustomUser
    # Added 'first_name' and 'last_name' so you can see them in the list!
    list_display = ("email", "username", "first_name", "last_name", "is_staff")

@admin.register(Chat)
class ChatAdmin(admin.ModelAdmin):
    list_display = ("id", "title", "created_at")

@admin.register(ChatMessage)
class ChatMessageAdmin(admin.ModelAdmin):
    # Typo fixed: 'models' -> 'model' (though strictly not required here, it's good practice)
    model = ChatMessage 
    list_display = ("id", "role", "content", "created_at")