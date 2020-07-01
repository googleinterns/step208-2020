from cricVis.models import *

def getAutofillData():
    autofillData = {}
    autofillData["BatsmanStats"] = getKeyValues("BatsmanStats")
    autofillData["BowlerStats"] = getKeyValues("BowlerStats")
    autofillData["TeamWise"] = getKeyValues("TeamWise")
    tableNameHeadingMap = {"BatsmanStats": "Batsman", "BowlerStats": "Bowler", "TeamWise": "Team"}
    return autofillData, tableNameHeadingMap

def getComprisonData(tableName, entityID1, entityID2):
    comparisonData = []
    if tableName == "TeamWise":
        comparisonData.append(getTeamData(tableName, entityID1))
        comparisonData.append(getTeamData(tableName, entityID2))
    else:
        comparisonData.append(getPlayerData(tableName, entityID1))
        comparisonData.append(getPlayerData(tableName, entityID2))
    return comparisonData

def getPlayerData(tableName, playerName):
    playerData = ref.child(tableName).child(playerName).get()
    playerDataResponse = {}
    playerDataResponse["cardData"] = getPlayerCardData(playerData, getPlayerType(tableName), playerName)
    playerDataResponse["chartDataT20"] =  getChartData(playerData["T20"])
    playerDataResponse["chartDataODI"] =  getChartData(playerData["ODI"])
    playerDataResponse["chartDataTest"] =  getChartData(playerData["Test"])
    return playerDataResponse

def getTeamData(tableName, teamName):
    teamData = ref.child(tableName).child(teamName).get()
    teamDataResponse = {}
    teamDataResponse["cardData"] =  { "Team Name": teamName }
    teamDataResponse["chartData"] = getChartData(teamData)
    return teamDataResponse

def getPlayerCardData(playerData, playerType, playerName):
    playerCardData  = {}
    playerCardData[getHeadingNames("player_name")] = playerName
    playerCardData[getHeadingNames("birth_date")] = playerData["birth_date"]
    playerCardData[getHeadingNames(playerType)] = playerData[playerType]
    playerCardData[getHeadingNames("team")] = playerData["team"]
    return playerCardData

def getChartData(matchTypeData):
    chartData = {}
    for data in matchTypeData:
        chartData[getHeadingNames(data)] = matchTypeData[data]
    return chartData

def getHeadingNames(columnName):
    columnNameList = columnName.split("_")
    headingName = ""
    for name in columnNameList:
        headingName += '%s ' % (name.capitalize())
    return headingName.strip()
    
def getPlayerType(tableName):
    if tableName == "BatsmanStats":
        return "batting_style"
    elif tableName == "BowlingStats":
        return "bowling_style"

def getKeyValues(tableName):
    tableKeys = ref.child(tableName).get().keys()
    keyValues = []
    for key in tableKeys:
        keyValues.append(key)
    return keyValues