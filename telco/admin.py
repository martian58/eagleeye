from django.contrib import admin
from .models import Node, Connection, Alarm, Fault

admin.site.register(Node)
admin.site.register(Connection)
admin.site.register(Alarm)
admin.site.register(Fault)
