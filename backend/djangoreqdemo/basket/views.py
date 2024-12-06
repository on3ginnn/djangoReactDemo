from rest_framework.generics import RetrieveUpdateAPIView
from rest_framework.permissions import IsAuthenticated
from .serializers import BasketSerializer


from rest_framework.generics import RetrieveAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
import rest_framework.views
import django.shortcuts

import basket.models
import product.models


class AddToBasketView(rest_framework.views.APIView):
    """
    Добавляет товар в корзину текущего пользователя.
    Аргумент 'id' передается через URL.
    """
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        product_id = kwargs.get('pk')  # Получаем ID товара из URL

        product = django.shortcuts.get_object_or_404(product.models.Product, id=product_id)  # Проверяем, существует ли товар

        # Получаем или создаём корзину пользователя
        basket, created = basket.models.Basket.objects.get_or_create(user=request.user)

        # Добавляем товар в корзину
        basket.add_product(product)

        return Response({"message": "Товар успешно добавлен в корзину"}, status=status.HTTP_200_OK)