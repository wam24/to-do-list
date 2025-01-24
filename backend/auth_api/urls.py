from . import views
from rest_framework.routers import DefaultRouter

app_name = 'auth_api'

router = DefaultRouter()

router.register(r'user', views.UserViewSet, basename='user')
urlpatterns = router.urls
