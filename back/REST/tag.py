from flask import Blueprint, Response
from aux import *

tag = Blueprint("tag", __name__)


@tag.route('/')
def getall():
   resp =  json.dumps(query("match (n:Tag) return n;"))
   return Response(resp,content_type='application/json')