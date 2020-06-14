from cricVis.models import *

def getTeamsData():
    teamsData = db.reference('/TeamWise').get()
