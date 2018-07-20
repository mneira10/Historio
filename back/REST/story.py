from flask import Blueprint, request, Response
from aux import *
from author import getAuthor

story = Blueprint("story", __name__)


@story.route('/', methods=['POST'])
def createStory():
    incoming = request.json
    story = incoming["story"]
    author = incoming["author"]["username"]
    authorExists = query(
        "match (n:Author) where n.username = $uname return n", {"uname": author})

    if(len(authorExists["results"]) == 0):
        return Response("The author does not exist", status=400)

    resp = query("match (a:Author) match (p:Story) where a.username = $uname and id(p) = $pid " +
                 "create (s :Story $props), (a) -[:Wrote]->(s), (p)<-[:Inherits]-(s) return s", {"props": story, "uname": author, "pid": incoming["padre"]})

    return Response(json.dumps(resp), content_type='application/json')


@story.route('/root')
def getRootId():
    return Response(json.dumps(query("match (N:Root) return id(N)", returnType="row")["results"][0]["data"][0]["row"][0]), content_type='application/json')


@story.route('/<storyId>')
def getStory(storyId):
    if not storyId.isdigit():
        return Response("Story id is not a number", status = 400)
        
    resp = query("match (n:Story) where id(n) = $sid return n",
                 {"sid": int(storyId)})
    return Response(json.dumps(resp), content_type='application/json')
