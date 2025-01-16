from rest_framework import serializers
from slugify import slugify

import category.models


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = category.models.Category
        fields = ['id', 'title', 'slug']
        read_only_fields = ['id', 'slug']  # Эти поля не изменяются при создании/обновлении

    def create(self, validated_data):
        # Генерация slug при создании
        validated_data['slug'] = slugify(validated_data['title'])
        return super().create(validated_data)

    def update(self, instance, validated_data):
        # Генерация нового slug при обновлении (если нужно)
        if 'title' in validated_data:
            instance.slug = slugify(validated_data['title'])
        return super().update(instance, validated_data)