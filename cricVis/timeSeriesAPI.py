from cricVis.models import *

def getVisualizationResponse(visualizationRequest):


def getTableName(metaDataRequest):
    return metaDataRequest["type"] + metaDataRequest["format"] +metaDataRequest["gender"] 

def getYearsInRange(startDate, endDate, tableName):
    return ref.child(tableName).order_by_key().start_at(startDate).end_at(endDate).get().keys()