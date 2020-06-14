from cricVis.models import *

def getTeamsData():
    teamsData = db.reference('/TeamWise').get()

def getTeamsWins(teamsData):
    teamsWins = {}
    for team in teamsData:
        teamsWins[team] = teamsData["matchWins"]
    return teamsWins