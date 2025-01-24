
FROM python:3.10-alpine

RUN apk update

RUN apk add --no-cache --virtual .build-deps curl


COPY requirements.txt .

RUN curl https://bootstrap.pypa.io/get-pip.py -o /get-pip.py  \
    && python /get-pip.py \
    && pip3 install --upgrade pip \
    && pip install virtualenv \
    &&  virtualenv /env \
    && chmod u+x /env/bin/activate

RUN . /env/bin/activate && pip install -r requirements.txt

RUN pip install -r requirements.txt
ENV VIRTUAL_ENV=/env \
    PATH=/env/bin:$PATH \
    NAME=app \
    DJANGO_WSGI_MODULE=to_do_list_config.wsgi \
    NUM_WORKERS=2 \
    DJANGO_SETTINGS_MODULE=to_do_list_config.settings \
    SECRET_KEY=xnZADbBeju69lkaXfAP2m58Cui2Wvsc3Em4TQa56uSRCuZtqgVV079DVcrDFMARu \
    APP_ADMIN_USER=admin \
    APP_ADMIN_PASSWORD=admin1234 \
    DEBUG=False

WORKDIR /app

COPY . .

RUN ["chmod", "+x", "startup.sh"]
RUN ["chmod", "+x", "deployment.sh"]

EXPOSE 8000

CMD ["sh", "startup.sh"]

