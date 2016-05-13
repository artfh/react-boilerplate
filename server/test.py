#5710caa748351010a32cd348
from mongoengine import *
from bson.json_util import dumps,loads
from bson import ObjectId



class Theater(Document):
    name = StringField()
    email = StringField()
    homepage = StringField()
    phone = StringField()
    address = StringField()
    open_hours = StringField()


class Show(Document):
    theater = ReferenceField(Theater)
    title = StringField()
    subtitle = StringField()
    teaser = StringField()
    stuff = StringField()
    landscape_image = FileField()
    portrait_image = FileField()


if __name__ == '__main__':
    connect('localhost')

    print Theater.objects.get(id='572e7b91ba4d1248d08bc190')

    show = Show(title='aaaa')
    #show.theater_id = ObjectId('572e7b91ba4d1248d08bc190')
    show.theater=Theater(id='572e7b91ba4d1248d08bc190')
    show.save()
    print show.to_json()
