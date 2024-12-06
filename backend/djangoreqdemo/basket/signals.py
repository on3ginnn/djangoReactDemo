from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth import get_user_model
import basket.models

@receiver(post_save, sender=get_user_model())
def create_user_basket(sender, instance, created, **kwargs):
    """
    Создает корзину для нового пользователя при его регистрации.
    """
    if created:
        basket.models.Basket.objects.create(user=instance)
