from django.contrib import admin
from .models import Address
class AddressAdmin(admin.ModelAdmin):
    list_display = ["email", 'nid', "user"]
    list_filter = ["is_active", "is_staff"]
    search_fields = ('email','nid')

admin.site.register(Address)
