from django.db import models
from firebase_admin import credentials, initialize_app, db
# Create your models here.
teamImageName = {
    "Sunrisers Hyderbad": "cricVis/SRH.png",
    "Mumbai Indians":"cricVis/MI.png",
    "Gujarat Lions":"cricVis/GL.png",
    "Rising Pune Supergiant":"cricVis/RPS.png",
    "Royal Challengers Bangalore":"cricVis/RCB.png",
    "Kolkata Knight Riders":"cricVis/KKR.png",
    "Delhi Daredevils":"cricVis/DD.png",
    "Kings XI Punjab": "cricVis/KXIP.png",
    "Deccan Chargers":"cricVis/DC.png",
    "Chennai Super Kings":"cricVis/CSK.png",
    "Rajasthan Royals": "cricVis/RR.png"}

cred = credentials.Certificate('static/cricVis/cricVis-sdk.json')

initialize_app(cred, {
	'databaseURL' : 'https://cricvis-1a59f.firebaseio.com/'
})

ref = db.reference('/')
