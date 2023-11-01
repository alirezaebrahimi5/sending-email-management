from django.contrib import admin
from .models import Address, FileSave
class AddressAdmin(admin.ModelAdmin):
    list_display = ["email", 'nid', "user"]
    list_filter = ["is_active", "is_staff"]
    search_fields = ('email','nid')

class FileAdmin(admin.ModelAdmin):
    list_display = ["user"]
    ordering = ['user']
    earch_fields = ('title')

admin.site.register(Address)
admin.site.register(FileSave, FileAdmin)