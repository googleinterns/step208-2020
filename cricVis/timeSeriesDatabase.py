from firebase_admin import credentials, initialize_app, db
cred = credentials.Certificate('static/cricVis/timeSeriesSDK.json')

timeSeriesDB = initialize_app(cred, {
	'databaseURL' : 'https://crickettimeseriesvis.firebaseio.com/',
},name="timeSeriesDB")

ref = db.reference('/',timeSeriesDB)