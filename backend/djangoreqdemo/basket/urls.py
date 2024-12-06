from django.urls import path

import basket.views


urlpatterns = [
    # TODO: add CRUD urls
    path('add/<int:item_id>/', basket.views.AddToBasketAPIView.as_view(), name='add-to-basket'),
    path('<int:pk>/', basket.views.RetrieveBasketAPIView.as_view(), name='get'),
]