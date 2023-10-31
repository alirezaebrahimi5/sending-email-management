from django.contrib import admin
from .models import CustomUser
# Register your models here.


class UserAdmin(admin.ModelAdmin):
    list_display = ["email", "is_active", "is_staff", 'last_login']
    sortable_by = ('last_login')
    list_filter = ["is_active", "is_staff"]
    search_fields = ('email',)


admin.site.register(CustomUser, UserAdmin)

