from flask import Flask
from flask_cors import CORS

from author import author
from rating import rating
from story import story


app = Flask(__name__)

# module registration
app.register_blueprint(story, url_prefix='/story')
app.register_blueprint(author, url_prefix='/author')
app.register_blueprint(rating, url_prefix='/rating')

# enable port communication
CORS(app)
PORT = 8080
DEBUG = False

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=PORT, debug=DEBUG, threaded=True)
