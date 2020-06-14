from cricVis.models import *

def getTeamsData():
    teamsData = db.reference('/TeamWise').get()

def getTeamsList():
    teamsData = db.reference('/TeamWise').get()
    teamsList = []
    for team in teamsData:
        teamsList.append(team)
    return teamsList

def getSeasonsData():
    seasonsData = db.reference('/SeasonWise').get()

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

def getFinalScoreBatFirst(seasonsData):
    teamsList = getTeamsList()
    finalScoreBatFirst = {}
    for season in seasonsData:
        seasonData = seasonsData[season]
        for team in teamsList:
            if team in seasonData and seasonData[team]["finalMatchScoreBatting"]!=0:
                finalScoreBatFirst[season] = {team: seasonData[team]["finalMatchScoreBatting"]}
                break
    return finalScoreBatFirst