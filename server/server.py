from flask import Flask,request
from mongoengine import *
from bson.json_util import dumps,loads


from flask import redirect, url_for, make_response, abort
from mongoengine.fields import get_db
from bson import ObjectId
from gridfs import GridFS
from gridfs.errors import NoFile

app = Flask(__name__)


class User(Document):
    name = StringField(required=True)
    photo = FileField()

@app.route("/")
def index():
    return User.objects.to_json()


@app.route("/api/post_form", methods=['POST'])
def post_form():
    print '---------'
    print request
    print loads(request.form['json'])
    print request.files
    f = request.files

    json = loads(request.form['json'])

    user = User.objects.get(id='5710caa748351010a32cd348')
    user.name = json['name']
    user.photo.replace(request.files['image'], content_type = 'image/jpeg')
    print user.save()


    return "ok"




@app.route('/api/files/<oid>')
def get_file(oid):
	try:
		db = get_db()
		gfs = GridFS(db)
		fl = gfs.get(ObjectId(oid))
		response = make_response(fl.read())
		response.mimetype = fl.content_type
		return response
	except NoFile:
		abort(404)


if __name__ == "__main__":
    connect('localhost')
    app.run(debug=True)
