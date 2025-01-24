from django.contrib.auth import logout, get_user_model
from django.contrib.auth.models import AnonymousUser, User
from django.db import transaction
from django.http import JsonResponse
from rest_framework import permissions, status
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated, DjangoModelPermissions, AllowAny
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK
from rest_framework.viewsets import ModelViewSet
from rest_framework_simplejwt.tokens import RefreshToken

from .serializers import UserRegisterSerializer, ChangePasswordSerializer

UserModel = get_user_model()
__all__ = ['UserViewSet']


class UserPermission(permissions.BasePermission):

    def has_permission(self, request, view):
        if view.action == 'list':
            return request.user.is_authenticated and request.user.is_staff
        elif view.action == 'create':
            return True
        elif view.action in ['retrieve', 'update', 'partial_update']:
            return True
        elif view.action == 'destroy' and request.user.is_staff:
            return True
        else:
            return False

    def has_object_permission(self, request, view, obj):
        if not request.user.is_authenticated:
            return False

        if view.action == 'retrieve':
            return obj == request.user or request.user.is_staff
        elif view.action in ['update', 'partial_update']:
            return obj == request.user or request.user.is_staff
        elif view.action == 'destroy':
            return request.user.is_staff
        else:
            return False


class UserViewSet(ModelViewSet):
    permission_classes = [UserPermission]
    serializer_class = UserRegisterSerializer
    queryset = UserModel.objects.all()

    @transaction.atomic
    @action(detail=False, methods=['post'], permission_classes=[AllowAny])
    def register(self, request):
        """
        Registro por parte de usuario
        :param request:
        :return:
        """
        data = request.data
        serializer = UserRegisterSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            headers = self.get_success_headers(serializer.data)
            return Response(status=201, data={"message": "Usuario creado"}, headers=headers)
        else:
            return Response(data={'message': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['post', 'put'], permission_classes=[IsAuthenticated])
    def set_password(self, request):
        """
        Cambio de contraseña desde sesion iniciada
        :param request:
        :return:
        """
        user_id = request.user.pk
        user = User.objects.get(pk=user_id)
        data = request.data
        data['user'] = user
        serializer = ChangePasswordSerializer(data=data)
        if serializer.is_valid():
            new_password = request.data['new_password']
            user.set_password(new_password)
            user.save()
            return JsonResponse({'message': '¡La contraseña se ha cambiado con éxito!'}, status=status.HTTP_200_OK)
        else:
            return JsonResponse({'message': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

    @action(methods=['get'], detail=False, permission_classes=[IsAuthenticated])
    def session(self, request):
        """
        Usuario que se encuentra en sesión
        :param request:
        :return:
        """

        return Response(status=HTTP_200_OK, data=self.serializer_class(request.user).data)

    @action(methods=['post'], detail=False, permission_classes=[IsAuthenticated])
    def logout(self, request):
        """
                Cierre de sesion
                :param request:
                :return:
                """
        try:
            logout(request)
            return Response(status=status.HTTP_205_RESET_CONTENT, data='El usuario se desconectó con éxito',)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST, data={'message': 'Campo refresh es requerido'})


    @action(methods=['post'], detail=False, permission_classes=[AllowAny])
    def check_email_exist(self, request):
        """
        Chequear si existe el correo
        :param request:
        :return:
        """
        email = request.data.get('email', '')
        if email.strip():
            res = UserModel.objects.filter(email=email).exists()
        else:
            res = False
        return JsonResponse({'exists': res}, status=HTTP_200_OK)


class DjangoModelPermissionsAPI(DjangoModelPermissions):
    perms_map = {
        'GET': ['%(app_label)s.view_%(model_name)s'],
        'OPTIONS': [],
        'HEAD': [],
        'POST': ['%(app_label)s.add_%(model_name)s'],
        'PUT': ['%(app_label)s.change_%(model_name)s'],
        'PATCH': ['%(app_label)s.change_%(model_name)s'],
        'DELETE': ['%(app_label)s.delete_%(model_name)s'],
    }
