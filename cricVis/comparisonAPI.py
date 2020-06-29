from cricVis.models import *

def getComprisonData(tableName, entityID1, entityID2):

def getPlayerData(tableName, playerID):
    playerData = ref.child(tableName).child(playerID).get()
    playerDataResponse = {}
    playerDataResponse["cardData"] = getPlayerCardData(playerData, getPlayerType(tableName))
    playerDataResponse["chartDataT20"] =  getChartData(playerData["T20"])
    playerDataResponse["chartDataODI"] =  getChartData(playerData["ODI"])
    playerDataResponse["chartDataTest"] =  getChartData(playerData["Test"])
    return playerData

def getPlayerCardData(playerData, playerType):
    playerCardData  = {}
    playerCardData[getHeadingNames("player_name")] = playerData["player_name"]
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
    return headingName
    