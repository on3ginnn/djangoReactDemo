import django.contrib.auth
from django.db import models

import product.models


class Basket(models.Model):
    user = models.OneToOneField(django.contrib.auth.get_user_model(), on_delete=models.CASCADE, related_name='basket')
    products = models.ManyToManyField(product.models.Item, related_name='baskets', blank=True)

    def __str__(self):
        return f"Корзина пользователя {self.user.username}"
    
    def add_product(self, product):
        self.products.add(product)
