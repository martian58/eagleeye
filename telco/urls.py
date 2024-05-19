from django.urls import path
from . import views

urlpatterns = [
    path('nodes/', views.node_list, name='node_list'),
    path('nodes/<int:pk>/', views.node_detail, name='node_detail'),
    path('alarms/', views.alarm_list, name='alarm_list'),
    path('faults/', views.fault_list, name='fault_list'),
]
