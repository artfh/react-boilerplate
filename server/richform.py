from flask import Blueprint, abort, request

from mongoengine import *

from utils import RequestToModelBuilder, json_response


class User(Document):
    name = StringField()
    info = StringField()
    photo = FileField()
    avatar = FileField()
    attachment = FileField()


richform = Blueprint('richform', __name__)


@richform.route("/")
def index():
    return User.objects.to_json()


@richform.route("/<user_id>", methods=['GET', 'POST'])
def user(user_id):
    if request.method == 'GET':
        json = User.objects.get(id=user_id).to_json()
        return json_response(json)
    else:
        user = User.objects.get(id=user_id)

        user = RequestToModelBuilder(request, user).set('name').set('info') \
            .setFile('avatar').setFile('photo').setFile('attachment').build()

        user.save()
        return json_response(user.to_json())
