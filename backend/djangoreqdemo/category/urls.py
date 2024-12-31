import django.urls
import category.views


urlpatterns = [
    django.urls.path('create/', category.views.CategoryCreateAPIView.as_view(), name='create'),
    django.urls.path('list/', category.views.CategoryListAPIView.as_view(), name='list'),
    django.urls.path('<int:pk>/', category.views.CategoryDetailUpdateDeleteAPIView.as_view(), name='concrete'),
    django.urls.path('search/', category.views.CategorySearchView.as_view(), name='search'),
]
