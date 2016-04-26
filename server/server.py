from flask import Flask, request
from mongoengine import *

import files
import richform

app = Flask(__name__)
app.register_blueprint(files.files, url_prefix='/api/files')
app.register_blueprint(richform.richform, url_prefix='/api/user')


@app.route("/")
def index():
    return 'ok!'


if __name__ == "__main__":
    connect('localhost')
    app.run(debug=True)
