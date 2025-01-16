from rest_framework import serializers

import product.models
import category.serializer

class ProductCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = product.models.Item
        fields = ['title', 'description', "category", "price"]


class ProductSerializer(serializers.ModelSerializer):
    category = category.serializer.CategorySerializer(read_only=True)

    class Meta:
        model = product.models.Item
        fields = ['id', 'title', 'description', "category", "price"]