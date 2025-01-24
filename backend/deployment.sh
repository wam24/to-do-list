#!/bin/sh


export USER_SCRIPT="from django.contrib.auth.models import User; User.objects.create_superuser('${APP_ADMIN_USER}', 'admin@example.com', '${APP_ADMIN_PASSWORD}') if not User.objects.filter(username='$APP_ADMIN_USER').exists() else None"




python manage.py migrate --settings=$DJANGO_SETTINGS_MODULE --noinput \
&& python manage.py shell -c "$USER_SCRIPT"


