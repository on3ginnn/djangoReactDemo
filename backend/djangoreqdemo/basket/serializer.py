from rest_framework import serializers

import basket.models


class BasketCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = basket.models.Basket
        fields = ['__all__']


class BasketSerializer(serializers.ModelSerializer):
    class Meta:
        model = basket.models.Basket
        fields = ['__all__']
