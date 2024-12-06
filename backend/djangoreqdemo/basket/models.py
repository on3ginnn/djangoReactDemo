from django.contrib.auth import get_user_model
from django.db import models

User = get_user_model()
print(User)

class Product(models.Model):
    """
    Пример модели товара.
    """
    name = models.CharField(max_length=255)
    price = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return self.name


class Basket(models.Model):
    """
    Модель корзины.
    """
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='basket')
    products = models.ManyToManyField(Product, related_name='baskets', blank=True)

    def __str__(self):
        return f"Корзина пользователя {self.user.username}"
