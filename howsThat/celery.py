import os
from celery import Celery

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'howsThat.settings')

app = Celery('cricVis',backend='rpc://', broker='amqp://')
app.config_from_object('django.conf:settings', namespace='CELERY')
app.autodiscover_tasks()