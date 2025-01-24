#!/bin/sh
sh deployment.sh
gunicorn ${DJANGO_WSGI_MODULE}:application \
          --log-level=debug --timeout 300 \
         --worker-tmp-dir /dev/shm \
         --capture-output \
         --bind :8000 \
         --workers 3
