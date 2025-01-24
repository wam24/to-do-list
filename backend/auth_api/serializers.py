from abc import ABC

from django.contrib.auth import get_user_model, models, authenticate
from django.contrib.auth.models import Permission
from django.contrib.auth.password_validation import validate_password
from django.contrib.contenttypes.models import ContentType
from django.db import transaction
from django.db.models import Q
from rest_framework import serializers
from rest_framework.authtoken.serializers import AuthTokenSerializer
from rest_framework.exceptions import ValidationError
from rest_framework.fields import SerializerMethodField
from django.utils.translation import gettext_lazy as _

UserModel = get_user_model()

__all__ = [
    'UserRegisterSerializer',
    'ChangePasswordSerializer'
]


def get_user_permissions(user):
    if user.is_superuser:
        return Permission.objects.all()
    return user.user_permissions.all() | Permission.objects.filter(group__user=user)


class UserRegisterSerializer(serializers.ModelSerializer):
    def __init__(self, *args, **kwargs):
        self.password = None
        self.is_registering = False

        if 'data' in kwargs and isinstance(kwargs['data'], dict):
            self.password = kwargs['data'].pop('password', '')
            self.is_registering = True
            self.instance = kwargs.get('instance', None)
        super().__init__(*args, **kwargs)



    @transaction.atomic
    def create(self, validated_data):
        validated_data['username'] = validated_data['email']
        user = super().create(validated_data)
        user.set_password(self.password)
        user.is_active = True
        user.save()

        return user

    def update(self, instance, validated_data):
        user = super().update(instance, validated_data)
        if self.password:
            user.set_password(self.password)
        user.save()
        return user

    def validate_password_field(self, value):
        try:
            validate_password(value)
        except ValidationError as exc:
            raise serializers.ValidationError({"password": str(exc)})
        return value

    def validate(self, data):
        email = data['email']
        if self.password:
            self.validate_password_field(self.password)
        if not self.password and not self.instance:
            raise serializers.ValidationError({"password": _("Este campo es requerido.")})
        qs = UserModel.objects.filter(Q(email=email)|Q(username=email))
        if self.instance:
            qs = qs.exclude(pk=self.instance.pk)
        if qs.exists():
            raise serializers.ValidationError({"email": _("Este correo ya fue registrado")})
        return data

    class Meta:
        model = UserModel
        fields = ['id', 'email', 'first_name', 'last_name', ]
        extra_kwargs = {'email': {'required': True}, 'password': {'write_only': True},
                        'first_name': {'required': True}, 'last_name': {'required': True}}


class PasswordSerializer(serializers.Serializer):
    repeat_new_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)

    def __init__(self, *args, **kwargs):
        self.user = None
        if 'data' in kwargs and isinstance(kwargs['data'], dict):
            self.user = kwargs['data'].pop('user', '')

        super().__init__(*args, **kwargs)

    def validate(self, data):

        if data['new_password'] != data['repeat_new_password']:
            raise serializers.ValidationError({"repeat_new_password": _("Las contraseñas no coinciden")})
        return data


class ChangePasswordSerializer(PasswordSerializer):
    old_password = serializers.CharField(required=True)

    def validate(self, data):

        if not self.user:
            raise serializers.ValidationError({"user": _("Usuario no encontrado")})
        else:
            if not self.user.check_password(data['old_password']):
                raise serializers.ValidationError({"old_password": _("La contraseña no coinciden con la actual")})

        if data['new_password'] != data['repeat_new_password']:
            raise serializers.ValidationError({"repeat_new_password": _("Las contraseñas no coinciden")})
        if data['new_password'] == data['old_password']:
            raise serializers.ValidationError(
                {"new_password": _("La nueva contraseña no puede ser igual a la anterior")})
        return data
