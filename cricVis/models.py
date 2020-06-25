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

teamColour = {
    'Chennai Super Kings': '#ffcc00', 
    'Deccan Chargers': '#003399', 
    'Delhi Daredevils': '#ff5050', 
    'Gujarat Lions': '#33cc33' , 
    'Kings XI Punjab': '#ff0066', 
    'Kochi Tuskers Kerala': '#cc3300', 
    'Kolkata Knight Riders': '#9900ff', 
    'Mumbai Indians': '#0099ff', 
    'Pune Warriors': '#4d1300', 
    'Rajasthan Royals': '#3333cc', 
    'Rising Pune Supergiant': '#993399', 
    'Rising Pune Supergiants':'#993399', 
    'Royal Challengers Bangalore': '#cc0000', 
    'Sunrisers Hyderabad':'#ff6600'}

cred = credentials.Certificate('static/cricVis/cricVis-sdk.json')

initialize_app(cred, {
	'databaseURL' : 'https://cricvis-1a59f.firebaseio.com/'
})

ref = db.reference('/')
