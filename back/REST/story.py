from flask import Blueprint, request, Response
from aux import *
from author import getAuthor
from aux import authorExists

story = Blueprint("story", __name__)


@story.route('/', methods=['POST'])
@authorExists
def createStory():
    incoming = request.json
    story = incoming["story"]
    tags = set(incoming["tags"])
    author = incoming["author"]["username"]

    tagDict = {}
    miQuery = "match (a:Author) " +\
              "match (p:Story) " +\
              "where a.username = $uname and id(p) = $pid " +\
              "create (s :Story $props), (a) -[:Wrote]->(s), (p)<-[:Inherits]-(s) "

    for tag in tags:
        miQuery += "merge ({0}:Tag {{ name: ${0}}}) ".format(tag.replace("#", ""))
        tagDict[tag.replace("#", "")] = tag
        miQuery += "create (s)-[:Is]->("+tag.replace("#", "")+") "

    miQuery += "return s"
    print(miQuery)
    parameters = {"props": story, "uname": author, "pid": incoming["padre"]}
    print({**tagDict, **parameters})

    resp = query(miQuery, {**tagDict, **parameters})
    print(resp)
    return Response(json.dumps(resp), content_type='application/json')


@story.route('/root')
def getRootId():
    return Response(json.dumps(query("match (N:Root) return id(N)", returnType="row")["results"][0]["data"][0]["row"][0]), content_type='application/json')


@story.route('/<storyId>')
def getStory(storyId):
    if not storyId.isdigit():
        return Response("Story id is not a number", status=400)

    resp = query("match (n:Story) where id(n) = $sid return n",
                 {"sid": int(storyId)})
    return Response(json.dumps(resp), content_type='application/json')


# story tags
@story.route('/<id>/tags')
def getStoryTags(id):
    if(not id.isdigit()):
        return Response("The id is not a number", status=400)

    resp = query(
        "match (s:Story)-[:Is]->(t:Tag) where id(s)=$id return t", {"id": int(id)})
    return Response(json.dumps(resp), content_type='application/json')


# story ratings

@story.route('/<id>/ratings')
def getStoryRatings(id):
    if(not id.isdigit()):
        return Response("The id is not a number", status=400)

    resp = query("match (s:Story)<-[r:Rating]-(a:Author) where id(s)=$id return r,a", {
                 "id": int(id)}, returnType="row")
    return Response(json.dumps(resp), content_type='application/json')


# story authors
@story.route('/<id>/authors')
def getStoryAuthors(id):
    if(not id.isdigit()):
        return Response("The id is not a number", status=400)

    resp = query("match (s:Story)-[:Inherits]->(e:Story)  match (a:Author) -[:Wrote]-> (n) where id(s)=$id return a", {
                 "id": int(id)}, returnType="row")
    return Response(json.dumps(resp), content_type='application/json')
