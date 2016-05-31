#5710caa748351010a32cd348
from mongoengine import *
from bson.json_util import dumps,loads
from bson import ObjectId

from theater import *


def create_theaters():
    t = Theater(name='T3')
    t.save()

    s = Show( theater=t, title='S1' )
    s.save()

    c = Campaign ( theater=t, show=s, start_before=120, max_deals=50)
    c.offer = Offer(value='2 for 1', details='Offer')
    c.save()


if __name__ == '__main__':
    connect('localhost')

    create_theaters()

    for t in Theater.objects():
        print t

    print

    for s in Show.objects():
        print s

    print

    for c in Campaign.objects():
        print c

    
    #show = Show(title='aaaa')
    #show.theater_id = ObjectId('572e7b91ba4d1248d08bc190')
    #show.theater=Theater(id='572e7b91ba4d1248d08bc190')
    #show.save()
