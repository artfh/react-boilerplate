from flask import request, Response
from bson.json_util import dumps, loads


def json_response(json):
    return Response(response=json, status=200, mimetype="application/json")


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


class RequestToModelBuilder:
    def __init__(self, request, model):
        self.model = model
        self.request = request
        self.json = loads(request.form['json'])
        self.files = request.files

    def set(self, prop):
        v = self.json.get(prop)
        if v:
            self.model[prop] = v
        return self

    def setFile(self, prop):
        photo_id = self.json.get(prop)
        if photo_id:
            self.model[prop].grid_id = photo_id
        else:
            self.model[prop].delete()

        if prop in self.files:
            f = self.files[prop]
            self.model[prop].replace(
                f, content_type=f.content_type, filename=f.filename)

        return self

    def build(self):
        return self.model
