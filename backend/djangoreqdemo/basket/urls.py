from django.urls import path
from .views import AddToBasketView

urlpatterns = [
    path('basket/add/<int:pk>/', AddToBasketView.as_view(), name='add-to-basket'),
]