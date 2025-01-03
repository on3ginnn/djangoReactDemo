# Generated by Django 4.2 on 2024-12-23 15:20

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ("category", "0001_initial"),
    ]

    operations = [
        migrations.CreateModel(
            name="Item",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                (
                    "title",
                    models.CharField(
                        help_text="max 150 символов",
                        max_length=150,
                        unique=True,
                        verbose_name="название",
                    ),
                ),
                (
                    "description",
                    models.TextField(
                        help_text='описание товара"', verbose_name="текст"
                    ),
                ),
                ("price", models.PositiveIntegerField(verbose_name="цена")),
                (
                    "created",
                    models.DateTimeField(
                        auto_now_add=True, null=True, verbose_name="дата создания"
                    ),
                ),
                (
                    "updated",
                    models.DateTimeField(
                        auto_now=True, null=True, verbose_name="дата изменения"
                    ),
                ),
                (
                    "category",
                    models.ForeignKey(
                        default=None,
                        help_text="Выберите категорию",
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="product_items",
                        related_query_name="item",
                        to="category.category",
                        verbose_name="Категория",
                    ),
                ),
            ],
            options={
                "verbose_name": "товар",
                "verbose_name_plural": "товары",
                "ordering": ("-created",),
            },
        ),
    ]
