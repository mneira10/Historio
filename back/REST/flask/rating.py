from flask import Blueprint
from aux import *

rating = Blueprint("rating", __name__)


@rating.route('/', methods=["POST"])
@authorExists
def createRating():
    incoming = request.json
    story = incoming["story"]
    author = incoming["author"]["username"]
    rating = incoming["rating"]
    resp = query(
        "match (a:Author) match (s:Story) where a.username = $uname and id(s) = $sid merge (s)<-[r:Rating ]-(a) on create set r.rating = $rating, r.comment = $comment, r.date = $date return r",
        {"uname": author, "sid": story, "rating": rating["rating"], "comment": rating["comment"],
         "date": rating["date"]})
    return Response(json.dumps(resp), content_type='application/json')


@rating.route('/', methods=["PUT"])
def updateRating():
    incoming = request.json
    story = incoming["story"]
    author = incoming["author"]["username"]
    rating = incoming["rating"]
    resp = query(
        " match (s:Story)<-[r:Rating ]-(a:Author) where a.username = $uname and id(s) = $sid set r.rating = $rating, r.comment = $comment, r.date = $date return r",
        {"uname": author, "sid": story, "rating": rating["rating"], "comment": rating["comment"],
         "date": rating["date"]})
    return Response(json.dumps(resp), content_type='application/json')


@rating.route('/', methods=["DELETE"])
def deleteRating():
    incoming = request.json
    story = incoming["story"]
    author = incoming["author"]["username"]
    resp = query("match (s:Story)<-[r:Rating ]-(a:Author) where a.username = $uname and id(s) = $sid delete r",
                 {"uname": author, "sid": story})
    return Response(json.dumps(resp), content_type='application/json')
