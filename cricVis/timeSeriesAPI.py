from cricVis.models import *

def getVisualizationResponse(visualizationRequest):

def getTableName(metaDataRequest):
    return metaDataRequest["type"] + metaDataRequest["format"] +metaDataRequest["gender"] 

def getYearsInRange(startDate, endDate, tableName):
    return ref.child(tableName).order_by_key().start_at(startDate).end_at(endDate).get().keys()

def getTopScoresForAYear(tableName, year, field, top=10):
    return ref.child(tableName).child(year).child(field).order_by_value().limit_to_last(top).get()

def getMetaDataResponse(playerType, gameFormat, gender, field, startDate, endDate, top=10):
    responseMetaData = {}
    wordPostion = playerType.find("Performance")
    responseMetaData["title"] = "Top {} {} in {} {} from {} to {}".format(top, playerType[:wordPostion], playerType, gameFormat, startDate, endDate)
    responseMetaData["xAxisLabel"] = field
    responseMetaData["yAxisLabel"] = playerType[wordPostion:]
    return responseMetaData

def getChartDataResponse(visualizationRequest):
    tableName = getTableName(visualizationRequest["metaDataRequest"])
    years = getYearsInRange(visualizationRequest["startDate"], visualizationRequest["endDate"], tableName)
    chartDataResponse = {}
    for year in years:
        yearResponse = getTopScoresForAYear(tableName, year, visualizationRequest["field"])
        chartDataResponse[year] = yearResponse 
    return chartDataResponse