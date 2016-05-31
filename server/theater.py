from flask import Blueprint, abort, request
from mongoengine import *
from bson import ObjectId

from utils import RequestToModelBuilder, Repository


class Theater(Document):
    name = StringField()
    email = StringField()
    homepage = StringField()
    phone = StringField()
    address = StringField()
    open_hours = StringField()

    def __str__(self):
        return 'Theater %s (%s)' % (self.name, self.id)


class Show(Document):
    theater = ReferenceField(Theater)
    title = StringField()
    subtitle = StringField()
    teaser = StringField()
    stuff = StringField()
    landscape_image = FileField()
    portrait_image = FileField()
    start_date = DateTimeField()
    end_date = DateTimeField()
    crons = StringField()

    def __str__(self):
        return 'Show %s (%s) in %s' % (self.title, self.id, self.theater)

class Offer(EmbeddedDocument):
    value = StringField()
    details = StringField()
    short_description = StringField()
    full_description = StringField()

class Campaign(Document):
    theater = ReferenceField(Theater)
    show = ReferenceField(Show)
    offer = EmbeddedDocumentField(Offer)
    start_date = DateTimeField()
    end_date = DateTimeField()
    crons = StringField()
    start_before = IntField()
    max_deals = IntField()

    def __str__(self):
        return 'Campaign %s (%s) for %s' % (self.offer.value, self.id, self.show)


theater = Blueprint('theater', __name__)


@theater.route('/',  methods=['GET', 'POST'])
@theater.route('/<id>',  methods=['GET', 'POST', 'DELETE'])
def theater_api(id=None):
    repo = Repository(Theater)

    repo.buildModel = lambda builder: builder.set('name').set('email') \
        .set('homepage').set('phone').set('address').set('open_hours')

    return repo.process(id)


@theater.route('/<teater_id>/shows/',  methods=['GET', 'POST'])
@theater.route('/<teater_id>/shows/<show_id>',  methods=['GET', 'POST', 'DELETE'])
def show_api(teater_id, show_id=None):
    repo = Repository(Show)

    repo.list = lambda: Show.objects(theater=teater_id)
    repo.get = lambda id: Show.objects.get(id=show_id, theater=teater_id)

    repo.buildModel = lambda builder: builder.set('title').set('subtitle') \
        .set('teaser').set('stuff')\
        .set_value('theater', Theater(id=teater_id))\
        .set_file('landscape_image').set_file('portrait_image')\
        .set('start_date').set('end_date').set('crons')

    return repo.process(show_id)


@theater.route('/<teater_id>/campaigns/',  methods=['GET', 'POST'])
@theater.route('/<teater_id>/campaigns/<campaign_id>',  methods=['GET', 'POST', 'DELETE'])
def campaign_api(teater_id, campaign_id=None):
    repo = Repository(Campaign)

    repo.list = lambda: Campaign.objects(theater=teater_id)
    repo.get = lambda id: Campaign.objects.get(id=campaign_id, theater=teater_id)

    repo.buildModel = lambda builder: builder.set_value('theater', Theater(id=teater_id))\
        .set('start_date').set('end_date').set('crons').set('start_before').set('max_deals')

    return repo.process(campaign_id)
