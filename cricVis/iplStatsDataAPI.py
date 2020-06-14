from cricVis.models import *

teamsList = []

def getIPLStatsData():
    allTeamsData = getTeamsData()
    allSeaonsData = getSeasonsData()
    allVenuesData = getVenuesData()
    allData = {}
    allData.update(allTeamsData)
    allData.update(allSeaonsData)
    allData.update(allVenuesData)
    return allData

def getTeamsData():
    teamsData = db.reference('/TeamWise').get()
    setTeamsList(teamsData)
    allTeamsData = {}
    allTeamsData["teamWins"] = getTeamsWins(teamsData)
    allTeamsData["tossWinsTeams"] = getTeamsTossWins(teamsData)
    allTeamsData["seasonsWinsTeams"] = getTeamsSeasonWins(teamsData)
    allTeamsData["averageScoreTeams"] = getTeamsAvgScore(teamsData)
    return allTeamsData

def setTeamsList(teamsData):
    for team in teamsData:
        teamsList.append(team)

def getSeasonsData():
    seasonsData = db.reference('/SeasonWise').get()
    allSeasonsData = {}
    allSeasonsData["finalScoreBatFirst"] = getFinalScoreBatFirst(seasonsData)
    allSeasonsData["lowestScoreTeams"] = getScoreTeamPerSeason(seasonsData,"lowestScore")
    allSeasonsData["highestScoreTeams"] = getScoreTeamPerSeason(seasonsData,"highestScore")
    return allSeasonsData

def getVenuesData():
    venuesData = db.reference('/VenueWise').get()
    allVenuesData = {}
    allVenuesData["gamesPlayedCity"], allVenuesData["gamesPlayedStadium"]  = getGamesPlayedVenueWise(venuesData)
    return allVenuesData

def getTeamsWins(teamsData):
    teamsWins = {}
    for team in teamsData:
        teamsWins[team] = teamsData[team]["matchWins"]
    return teamsWins

def getTeamsTossWins(teamsData):
    teamsTossWins = {}
    for team in teamsData:
        teamsTossWins[team] = teamsData[team]["tossWins"]
    return teamsTossWins

def getTeamsSeasonWins(teamsData):
    teamsSeasonWins = {}
    for team in teamsData:
        teamsSeasonWins[team] = teamsData[team]["seasonWins"]
    return teamsSeasonWins

def getTeamsAvgScore(teamsData):
    teamsAvgScore = {}
    for team in teamsData:
        teamsAvgScore[team] = teamsData[team]["averageScore"]
    return teamsAvgScore

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
