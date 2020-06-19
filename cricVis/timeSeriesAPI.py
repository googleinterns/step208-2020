from cricVis.models import *

def getVisualizationResponse(visualizationRequest):


def getTableName(metaDataRequest):
    return metaDataRequest["type"] + metaDataRequest["format"] +metaDataRequest["gender"] 

def getYearsInRange(startDate, endDate, tableName):
    return ref.child(tableName).order_by_key().start_at(startDate).end_at(endDate).get().keys()

def getTopScoresForAYear(tableName, year, field, top=10):
    return ref.child(tableName).child(year).child(field).order_by_value().limit_to_last(top).get()