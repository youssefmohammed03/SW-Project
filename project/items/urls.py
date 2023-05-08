from django.urls import path
from . import views

urlpatterns = [
    path('products/', views.products, name='products'),
    path('details/<int:item_id>/', views.details, name='details'),
]