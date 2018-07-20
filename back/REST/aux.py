import requests
import base64
import json

# authorization header
headers = {
    'Authorization': 'Basic ' + base64.b64encode(bytes('flask:2hn54frYm4', 'utf-8')).decode('utf-8'),
    'Accept': 'application/json; charset=UTF-8',
    'Content-Type': 'application/json'
}

# query handler
# 7474 - http to neo4j
# 7473 - https to neo4j


def query(theQuery, JSONparam={"": ""}, returnType="graph"):
    req = {
        "statements": [
            {
                "statement": theQuery,
                "parameters": JSONparam,
                "resultDataContents": [returnType]
            }
        ]
    }
    # url to db: http://neo4jbig8575.cloudapp.net
    r = requests.post('http://neo4jbig8575.cloudapp.net:7474/db/data/transaction/commit',
                      headers=headers,
                      data=json.dumps(req))

    return r.json()
