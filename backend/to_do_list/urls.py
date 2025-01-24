from . import views
from rest_framework.routers import DefaultRouter

app_name = 'to_do_list'

router = DefaultRouter()

router.register(r'to_do_list', views.ToDoListViewSet, basename='to_do_list')
urlpatterns = router.urls
