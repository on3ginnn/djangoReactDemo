from rest_framework import serializers
from django.utils.text import slugify

import category.models


class CategoryCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = category.models.Category
        fields = ['title']

    def create(self, validated_data):
        validated_data['slug'] = slugify(validated_data['title'])
        return super().create(validated_data)


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = category.models.Category
        fields = ['id', 'title', "slug"]