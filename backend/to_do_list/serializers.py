from rest_framework.serializers import ModelSerializer

from .models import ToDoList


class ToDoListSerializer(ModelSerializer):

    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user
        return ToDoList.objects.create(**validated_data)

    class Meta:
        model = ToDoList
        fields = ["id", "creation_date", "title", "description", "ready", "scheduled_date"]
