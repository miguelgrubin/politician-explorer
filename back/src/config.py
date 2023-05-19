import os

ELASTICSEARCH_HOST = "ELASTICSEARCH_HOST"


def get_config():
    return {ELASTICSEARCH_HOST: os.environ.get(ELASTICSEARCH_HOST, "http://localhost:9200")}
