from flask import request, Response, abort
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
    def __init__(self, request, model, model_class):
        self.model = model
        self.request = request
        self.model_class = model_class
        print request.data
        print request.content_type
        if request.content_type == 'application/json':
            self.json = loads(request.data)
        else:
            self.json = loads(request.form['json'])
        self.files = request.files

    def set(self, prop):
        v = self.json.get(prop)
        if v:
            self.model[prop] = v
        return self

    def set_file(self, prop):
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

    def set_value(self, prop, v):
        self.model[prop] = v
        return self

    def build(self):
        return self.model


class Repository(object):

    def __init__(self, model_class):
        super(Repository, self).__init__()
        self.model_class = model_class
        self.get = lambda id: model_class.objects.get(id=id)
        self.list = lambda: model_class.objects
        self.new = lambda: model_class()
        self.buildModel = lambda builder: builder
        self.update = lambda obj: obj.save()
        self.delete = lambda obj: obj.delete()

    def process(self, id):
        if request.method == 'GET':
            obj = self.get(id) if id else self.list()
            return json_response(obj.to_json())
        if request.method == 'POST':
            obj = self.get(id) if id else self.new()
            builder = RequestToModelBuilder(request, obj, self.model_class)
            self.buildModel(builder)
            obj = builder.build()
            self.update(obj)
            return json_response(obj.to_json())
        if request.method == 'DELETE':
            if id:
                print 'del', self.get(id)
                return json_response(self.delete(self.get(id)))
        abort(500)
