from flask import Blueprint

from flask import Flask, request, Response, jsonify
from mongoengine import *
from bson.json_util import dumps, loads


from flask import redirect, url_for, make_response, abort
from mongoengine.fields import get_db
from bson import ObjectId
from gridfs import GridFS
from gridfs.errors import NoFile

from mongoengine import *


files = Blueprint('files', __name__)


@files.route('/<oid>')
def get_file(oid):
    meta = request.args.get('meta', False)

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
