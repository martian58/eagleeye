from django.urls import path
from . import views


urlpatterns = [
    path('',views.home,name="home"),
    path('scan/list/',views.network_scan,name="listscan"),
    path('scan/tree/',views.visualization_view,name="treescan"),
    path('about/',views.about,name="about"),
    path('scan_network/', views.network_scan_view, name='scan_network'),
]
    