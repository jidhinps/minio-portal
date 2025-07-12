from celery import Celery

celery = Celery(
    'app',
    broker='redis://redis:6379/0',
    backend='redis://redis:6379/0'
)
