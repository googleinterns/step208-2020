from cricVis.models import *

def getVisualizationResponse(visualizationRequest):


def getTableName(metaDataRequest):
    return metaDataRequest["type"] + metaDataRequest["format"] +metaDataRequest["gender"] 