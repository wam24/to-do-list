from django.contrib.auth import get_user_model
from django.db import models


# Create your models here.
class LogFieldsMixin(models.Model):
    creation_date = models.DateTimeField(verbose_name='Fecha de creación', auto_now_add=True)
    last_update = models.DateTimeField(verbose_name='Última actualización', auto_now=True)

    class Meta:
        abstract = True


class ToDoList(LogFieldsMixin):
    title = models.CharField(max_length=255, verbose_name='Título')
    description = models.TextField(verbose_name='Descripción', blank=True, null=True)
    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE, verbose_name='Usuario')
    ready = models.BooleanField(verbose_name='Listo', default=False)
    scheduled_date = models.DateField(verbose_name='Fecha programada', blank=True, null=True)

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = 'Tarea'
        verbose_name_plural = 'Tareas'
        ordering = ['-pk']
