from flask import Flask, request, Response, jsonify
from mongoengine import *
from bson.json_util import dumps, loads


from flask import redirect, url_for, make_response, abort
from mongoengine.fields import get_db
from bson import ObjectId
from gridfs import GridFS
from gridfs.errors import NoFile

app = Flask(__name__)


class User(Document):
    name = StringField()
    info = StringField()
    photo = FileField()
    avatar = FileField()
    attachment = FileField()


@app.route("/")
def index():
    return User.objects.to_json()


@app.route("/api/user/<user_id>", methods=['GET', 'POST'])
def user(user_id):
    if request.method == 'GET':
        json = User.objects.get(id=user_id).to_json()
        return Response(response=json, status=200, mimetype="application/json")
    else:
        json = loads(request.form['json'])
        user = User.objects.get(id=user_id)

        setField(user, 'name', json)
        setField(user, 'info', json)

        setFile(user, 'avatar', json, request.files)
        setFile(user, 'photo', json, request.files)
        setFile(user, 'attachment', json, request.files)

        user.save()
        return Response(response=user.to_json(), status=200,
                        mimetype="application/json")


@app.route('/api/files/<oid>')
def get_file(oid):
    meta = request.args.get('meta', False)
    print meta

    try:
        db = get_db()
        gfs = GridFS(db)
        fl = gfs.get(ObjectId(oid))
        if meta:
            return jsonify(
                filename=fl.filename,
                content_type=fl.content_type, length=fl.length)
        response = make_response(fl.read())
        response.mimetype = fl.content_type
        return response
    except NoFile:
        abort(404)


def setField(obj, prop, json):
    v = json.get(prop)
    if v:
        obj[prop] = v


def setFile(obj, prop, json, files):
    photo_id = json.get(prop)
    if photo_id:
        obj[prop].grid_id = photo_id
    else:
        obj[prop].delete()

    if prop in files:
        f = files[prop]
        obj[prop].replace(f, content_type=f.content_type, filename=f.filename)


if __name__ == "__main__":
    connect('localhost')
    app.run(debug=True)
