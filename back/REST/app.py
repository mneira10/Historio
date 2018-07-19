from flask import Flask
from flask_cors import CORS

app = Flask(__name__)

# enable port communication
CORS(app)

# 7474 - http to neo4j
# 7473 - https to neo4j

@app.route('/')
def hello():
    return "Hello World!"


@app.route('/<name>')
def hello_name(name):
    return "Hello aaa {}!".format(name)


if __name__ == '__main__':
    app.run(host="0.0.0.0")
