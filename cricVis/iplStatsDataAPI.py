from cricVis.models import *

def getTeamsData():
    teamsData = db.reference('/TeamWise').get()

def getTeamsWins(teamsData):
    teamsWins = {}
    for team in teamsData:
        teamsWins[team] = teamsData["matchWins"]
    return teamsWins

def getTeamsTossWins(teamsData):
    teamsTossWins = {}
    for team in teamsData:
        teamsTossWins[team] = teamsData["tossWins"]
    return teamsTossWins

def getTeamsSeasonWins(teamsData):
    teamsSeasonWins = {}
    for team in teamsData:
        teamsSeasonWins[team] = teamsData["seasonWins"]
    return teamsSeasonWins

def getTeamsAvgWins(teamsData):
    teamsAvgWins = {}
    for team in teamsData:
        teamsAvgWins[team] = teamsData["averageScore"]
    return teamsAvgWins