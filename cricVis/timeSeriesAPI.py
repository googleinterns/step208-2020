from cricVis.models import *
from howsThat.celery import app

""" assemble the chart data and met data response and return a JSON """

@app.task(trail=True)
def getVisualizationResponse(visualizationRequest):
    visualizationResponse = {}
    visualizationResponse["metaDataResponse"] = getMetaDataResponse(
        visualizationRequest["metaDataRequest"]["playerType"],
        visualizationRequest["metaDataRequest"]["gameFormat"],
        visualizationRequest["metaDataRequest"]["gender"],
        visualizationRequest["field"],
        visualizationRequest["startDate"],
        visualizationRequest["endDate"]
        )
    visualizationResponse["chartDataResponse"] = getChartDataResponse(visualizationRequest)
    return visualizationResponse

""" get the table name to fetch the data from using the player, match and gender type"""

def getTableName(metaDataRequest):
    return metaDataRequest["playerType"] + "Performance" + metaDataRequest["gameFormat"] + metaDataRequest["gender"] 

""" get the years in the given start and end date """

def getYearsInRange(startDate, endDate, tableName):
    return ref.child(tableName).order_by_key().start_at(str(startDate)).end_at(str(endDate)).get().keys()

""" for every year, get the top field scorers """

def getTopScoresForAYear(tableName, year, field, top=10):
    return ref.child(tableName).child(year).child(field).order_by_value().limit_to_last(top).get()

""" get meta data response : {title:, xAxisLabel:, yAxisLabel: } for charting"""

def getMetaDataResponse(playerType, gameFormat, gender, field, startDate, endDate, top=10):
    responseMetaData = {}
    responseMetaData["title"] = "Top {} {} in {} {} from {} to {}".format(top, playerType, gender, gameFormat, startDate, endDate)
    responseMetaData["xAxisLabel"] = field
    responseMetaData["yAxisLabel"] = playerType
    return responseMetaData

""" get chart data response: year wise data  {year: {xAxisValue: yAxisValue, ...}, ...}"""

def getChartDataResponse(visualizationRequest):
    tableName = getTableName(visualizationRequest["metaDataRequest"])
    years = getYearsInRange(visualizationRequest["startDate"], visualizationRequest["endDate"], tableName)
    chartDataResponse = {}
    for year in years:
        yearResponse = getTopScoresForAYear(tableName, year, visualizationRequest["field"])
        chartDataResponse[year] = yearResponse 
    return chartDataResponse