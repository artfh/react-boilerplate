#5710caa748351010a32cd348
from mongoengine import *
from bson.json_util import dumps,loads

class User(Document):
    name = StringField(required=True)
    photo = FileField()


if __name__ == '__main__':

    connect('localhost')

    #user = User(name='ross@example.com')
    #print user.save()

    #data = { 'name': 'test123' }
    #print User.objects(id='5710caa748351010a32cd348').update(**data)

    #user = User.objects.get(id='5710caa748351010a32cd348')
    #user.name = 'aaaaa'
    #user.save()

    print

    for u in User.objects:
        print u.name, u.id
