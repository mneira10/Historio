from flask import Blueprint, request, Response
from aux import *

author = Blueprint("author", __name__)


@author.route('/', methods=['POST'])
def createAuthor():
    incoming = request.json
    query("create (:Author $props)",{"props":incoming})
    return getAuthor(incoming["username"])


@author.route('/', methods=['PUT'])
def updateAuthor():
    incoming = request.json
    query("match (n:Author) where n.username = $uname set n = $props",{"props":incoming,"uname" : incoming["username"]})
    return getAuthor(incoming["username"])




@author.route('/<author>')
def getAuthor(author):
    resp = query("match (n:Author) where n.username = $uname return n",{"uname":author})
    return Response(json.dumps(resp),content_type='application/json')


#author stories 

@author.route('/<author>/stories')
def getAuthorStories(author):
    resp = query("match (a:Author)-[:Wrote]->(s:Story) where a.username = $uname return s.title, s.date, id(s)",{"uname":author},returnType="row")
    return Response(json.dumps(resp),content_type='application/json')

