from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import permissions
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import ModelViewSet
from .models import ToDoList
from .serializers import ToDoListSerializer

__all__ = ['ToDoListViewSet']


class StandardResultsSetPagination(PageNumberPagination):
    """
    Configuración la paginación y límite
    """
    page_size = 10
    page_size_query_param = 'page_size'


class ToDoListPermission(permissions.BasePermission):

    def has_permission(self, request, view):
        """
        Anexamos permiso que requiera el usuario para acceder a la vista
        :param request:
        :param view:
        :return:
        """
        return request.user.is_authenticated

    def has_object_permission(self, request, view, obj):
        """
        Evalua los permisos de los objetos, solo usuario autenticado podra modificar
        sus propios registros, los administradores pueden hacer cualquier cosa
        :param request: 
        :param view: Tipo de vista
        :param obj: Objeto
        :return: 
        """
        if not request.user.is_authenticated:
            return False
        user_admin = request.user.is_staff or request.user.is_superuser
        if view.action == 'retrieve':
            return obj.user == request.user or user_admin
        elif view.action in ['update', 'partial_update']:
            return obj.user == request.user or user_admin
        elif view.action == 'destroy':
            return obj.user == request.user or user_admin
        else:
            return False


class ToDoListViewSet(ModelViewSet):
    model = ToDoList
    queryset = ToDoList.objects.all()
    filter_backends = [DjangoFilterBackend]
    serializer_class = ToDoListSerializer
    permission_classes = [ToDoListPermission]
    pagination_class = StandardResultsSetPagination


    def get_queryset(self):
        qs = super().get_queryset()
        if self.request.user.is_staff or self.request.user.is_superuser:
            return qs
        return qs.filter(user=self.request.user)
