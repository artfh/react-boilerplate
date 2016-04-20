#5710caa748351010a32cd348
from mongoengine import *
from bson.json_util import dumps,loads
from bson import ObjectId



class User(Document):
    name = StringField(required=True)
    photo = FileField()


if __name__ == '__main__':

    connect('localhost')

    #user = User(name='test@example.com')
    #print user.save()

    #data = { 'name': 'test123' }
    #print User.objects(id='5710caa748351010a32cd348').update(**data)

    user = User.objects.get(id='57149070ba4d126035c4e8f3')
    user.name = 'aaaaa1'
    user.photo.grid_id = ObjectId('57149070ba4d126035c4e8f3')
    user.save()

    print

    for u in User.objects:
        print u.name, u.id, u.photo.grid_id
        print u.photo.__dict__
        print
