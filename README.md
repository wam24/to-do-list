# to-do-list
Este proyecto es un backend con frontend para un lista de tareas

Está desarrollado con [Vite](https://vitejs.dev/) y [React](https://reactjs.org/) del lado frontend y con [Django](https://www.djangoproject.com/) y [Django Rest Framework](https://www.django-rest-framework.org/) del lado backend.

Base de datos usada es [Postgresql](https://www.postgresql.org/).

Requisitos
* [Python 3.10](https://www.python.org/)
* [Node 22](https://nodejs.org/en/download/)

Instalación Backend

Las variables de entorno se encuentran en el archivo [.env.example](backend/to_do_list_config/.env.example)

```bash python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
```
Instalación Frontend

La variable de entorno se encuentran en el archivo [.env.example](frontend/.env.example)

```bash
npm install
```

Iniciar servidor Backend en local o desarrollo

```bash
python manage.py runserver
```

Iniciar servidor Frontend en local o desarrollo

```bash
npm run dev
```

Iniciar orquestador docker con [docker-compose](https://docs.docker.com/compose/)

```bash
  docker-compose up -d
```

Documentación backend en [Swagger](http://localhost:8000/swagger/)