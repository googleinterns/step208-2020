from cricVis.comparisonDatabase import *
from cricVis.models import *

""" returns the data for the three types of comparisons which is used to fill the 
autofill at the frontend. Additionaly returns the headings for the statistics tables """

def getAutofillData():
    autofillData = {}
    autofillData["BatsmanStats"] = getKeyValues("BatsmanStats", refComparison)
    autofillData["BowlerStats"] = getKeyValues("BowlerStats", refComparison)
    autofillData["TeamWise"] = getKeyValues("TeamWise", ref)
    tableNameHeadingMap = {"BatsmanStats": "Batsman", "BowlerStats": "Bowler", "TeamWise": "Team"}
    return autofillData, tableNameHeadingMap

""" returns the data for the two entities to be compared [entity1: {...}, entity2: {...}] """

def getComprisonData(tableName, entityID1, entityID2):
    comparisonData = []
    if tableName == "TeamWise":
        comparisonData.append(getTeamData(tableName, entityID1))
        comparisonData.append(getTeamData(tableName, entityID2))
    else:
        comparisonData.append(getPlayerData(tableName, entityID1))
        comparisonData.append(getPlayerData(tableName, entityID2))
    return comparisonData

""" returns the data of the player needed and arranges it in the three match formats 
and the card format """

def getPlayerData(tableName, playerName):
    playerData = refComparison.child(tableName).child(playerName).get()
    playerDataResponse = {}
    playerDataResponse["cardData"] = getPlayerCardData(playerData, getPlayerType(tableName), playerName)
    playerDataResponse["chartDataT20"] =  getChartData(playerData["T20"])
    playerDataResponse["chartDataODI"] =  getChartData(playerData["ODI"])
    playerDataResponse["chartDataTest"] =  getChartData(playerData["Test"])
    return playerDataResponse

""" returns the data of the team needed and arranges it in the three match formats 
and the card format """

def getTeamData(tableName, teamName):
    teamData = ref.child(tableName).child(teamName).get()
    teamDataResponse = {}
    teamDataResponse["cardData"] =  { "Team Name": teamName }
    teamDataResponse["chartData"] = getChartData(teamData)
    return teamDataResponse

""" returns the card data for a player """

def getPlayerCardData(playerData, playerType, playerName):
    playerCardData  = {}
    playerCardData[getHeadingNames("player_name")] = playerName
    playerCardData[getHeadingNames("birth_date")] = playerData["birth_date"]
    playerCardData[getHeadingNames(playerType)] = playerData[playerType]
    playerCardData[getHeadingNames("team")] = playerData["team"]
    return playerCardData

""" returns the chart data ie data needed to create the statistics table for an entity """

def getChartData(matchTypeData):
    chartData = { getHeadingNames(data): matchTypeData[data] for data in matchTypeData}
    return chartData

""" utility function to format the heading name for a field from its column name in the database """

def getHeadingNames(columnName):
    columnNameList = columnName.split("_")
    headingName = ""
    for name in columnNameList:
        headingName += '%s ' % (name.capitalize())
    return headingName.strip()

""" returns the type of player field from the table selected """

def getPlayerType(tableName):
    if tableName == "BatsmanStats":
        return "batting_style"
    elif tableName == "BowlerStats":
        return "bowling_style"

""" returns only the key values ie the names of the players/teams for the autofill data """

def getKeyValues(tableName, reference):
    tableKeys = reference.child(tableName).get().keys()
    keyValues = []
    for key in tableKeys:
        keyValues.append(key)
    return keyValues
