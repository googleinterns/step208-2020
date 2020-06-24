from django.db import models
from firebase_admin import credentials, initialize_app, db
cred = credentials.Certificate('static/cricVis/timeseries-sdk.json')

initialize_app(cred, {
	'databaseURL' : 'https://crickettimeseriesvis.firebaseio.com/'
})

ref = db.reference('/')
