from cricVis.models import *

def getComprisonData(tableName, entityID1, entityID2):

def getPlayerData(tableName, playerID):
    playerData = ref.child(tableName).child(playerID).get()
    