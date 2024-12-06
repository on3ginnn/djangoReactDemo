from rest_framework.generics import RetrieveUpdateAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.generics import RetrieveAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
import rest_framework.views
import django.shortcuts

import basket.models as basket_models
import basket.serializer
import product.models as item_models


class AddToBasketAPIView(rest_framework.views.APIView):
    """
    Добавляет товар в корзину текущего пользователя.
    Аргумент 'id' передается через URL.
    """
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        product_id = kwargs.get('item_id')  # Получаем ID товара из URL

        product = django.shortcuts.get_object_or_404(item_models.Item, id=product_id)  # Проверяем, существует ли товар

        # Получаем или создаём корзину пользователя
        basket, created = basket_models.Basket.objects.get_or_create(user=request.user)

        # Добавляем товар в корзину
        basket.add_product(product)

        return Response({"message": "Товар успешно добавлен в корзину"}, status=status.HTTP_200_OK)
    

class RetrieveBasketAPIView(rest_framework.generics.RetrieveAPIView):
    queryset = basket_models.Basket.objects.all()
    serializer_class = basket.serializer.BasketSerializer
