from flask import Blueprint
from aux import *

rating = Blueprint("rating",__name__)


@rating.route('/')
def main():
    return "rating"