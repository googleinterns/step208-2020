from cricVis.models import *

teamsList = []

def getTeamsData():
    teamsData = db.reference('/TeamWise').get()
    setTeamsList(teamsData)

def setTeamsList(teamsData):
    for team in teamsData:
        teamsList.append(team)

def getSeasonsData():
    seasonsData = db.reference('/SeasonWise').get()

def getVenuesData():
    venuesData = db.reference('/VenueWise').get()

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
    finalScoreBatFirst = {}
    for season in seasonsData:
        seasonData = seasonsData[season]
        for team in teamsList:
            if team in seasonData and seasonData[team]["finalMatchScoreBatting"]!=0:
                finalScoreBatFirst[season] = {team: seasonData[team]["finalMatchScoreBatting"]}
                break
    return finalScoreBatFirst

def getScoreTeamPerSeason(seasonsData,scoreType):
    teamsScore = {}
    for team in teamsList:
        teamsScore[team] = {}
    for season in seasonsData:
        seasonData = seasonsData[season]
        for team in seasonData:
            teamsScore[team][season] = seasonData[team][scoreType]
    return teamsScore

def getGamesPlayedVenueWise(venuesData):
    stadiumMatches = {}
    cityMatches = {}
    for city in venuesData:
        cityData = venuesData[city]
        totalCityMatches = 0
        for stadium in cityData:
            stadiumMatches[stadium] = cityData[stadium]["numberOfMatches"]
            totalCityMatches += cityData[stadium]["numberOfMatches"]
        cityMatches[city] = totalCityMatches
    return cityMatches, stadiumMatches
