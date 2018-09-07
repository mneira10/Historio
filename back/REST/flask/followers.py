from flask import Blueprint
from aux import *

follower = Blueprint("follower", __name__)


@follower.route('/', methods=["POST"])
def createFollower():
    incoming = request.json
    follower = incoming["follower"]["username"]
    followed = incoming["followed"]["username"]
    resp = query("match (fr:Author) match (fd:Author) where fr.username = $follower and fd.username = $followed " + \
                 " merge (fd)<-[r:Follows ]-(fr) return r",
                 {"followed": followed, "follower": follower})
    return Response(json.dumps(resp), content_type='application/json')


@follower.route('/', methods=["DELETE"])
def deleteFollower():
    incoming = request.json
    follower = incoming["follower"]["username"]
    followed = incoming["followed"]["username"]
    resp = query(
        "match (fr:Author) -[r:Follows]-> (fd:Author) where fr.username = $follower and fd.username = $followed delete r",
        {"followed": followed, "follower": follower})
    return Response(json.dumps(resp), content_type='application/json')


@follower.route('/<follower>')
def getFollowing(follower):
    resp = query("match (fr:Author) -[r:Follows]-> (fd:Author) where fr.username = $follower  return fd",
                 {"follower": follower})
    return Response(json.dumps(resp), content_type='application/json')
