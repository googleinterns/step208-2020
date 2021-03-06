from cricVis.models import *

def getSetOfOvers(match):
	overs = {}
	for over in match:
		overs[over] = 0
	return overs

def getSetOfBalls(over):
	balls = {}
	for ball in over:
		balls[ball] = 0
	return balls

def getSeasonNumber(matchID):
	season = db.reference('/MatchDescription').child(matchID).child("season").get()
	return str(season)

def getColumnValue(columnValue):
	value = columnValue.split("_")[1]
	return int(value)

def getImageName(team):
	if team in teamImageName:
		return teamImageName[team]
	return "cricVis/IPL.png"

def getTeamName(matchID, team):
	match = db.reference('/MatchDescription').child(matchID).get()
	return str(match[team])

""" gets the runs, breakdown of runs, and over number for a team in a given over """

def getOverStatsOfTeam(overDetails, team, over):
	overStats = {}
	overStats["over"] = over
	overStats["runs"] = overDetails[team]["runs"]
	overStats["breakdownRuns"] = overDetails[team]["breakdownRuns"]
	return overStats

""" gets the player dismissed, bowler, type of dismissal, non-striker player,
over number and ball for a team at a given over and ball """

def getWicketDetailsOfTeam(wicketDetails, over, ball):
	wicket = {}
	for detail in wicketDetails:
		wicket[detail] = wicketDetails[detail]
	wicket["over"] = over
	wicket["ball"] = ball
	return wicket

def getPlayerTeam(playerName,season):
	return db.reference('/PlayerDescription').child(playerName).child(season).child("team").get()

""" get the previous over's cumulative runs, used to calculate current over's
cumulative runs"""

def getPrevOverCumulativeRuns(innings, overNumber):
	for over in innings:
		if over["over"] == overNumber:
			return over["cumulativeRuns"]

""" add run rate and cumulative runs statistics to a given innings' stats """

def addStatsToInnings(innings):
	innings = sorted(innings, key = lambda x : x["over"])
	for over in innings:
		overNumber = over["over"]
		if overNumber == 1:
			over["cumulativeRuns"] = over["runs"]
			over["runRate"] = over["runs"]
			continue
		over["cumulativeRuns"] = over["runs"] + getPrevOverCumulativeRuns(innings, overNumber-1)
		over["runRate"] = over["cumulativeRuns"]/overNumber
	return innings

""" Fetches the data for populating the frontend dropdown with matches,
which will be list of {matchID:, matchDate:, team1:,team2:} """

def getAllData():
	allDataSeasonWise = {}
	allDataSeasonWiseList = []
	allMatches = ref.child("MatchDescription").get()
	counter=1
	for matchID in allMatches:
		counter+=1
		matchData = {}
		match = allMatches[matchID]
		matchData["matchID"] = matchID
		matchData["team1"] = match["team1"]
		matchData["team2"] = match["team2"]
		matchData["team1_image"] = getImageName(matchData["team1"])
		matchData["team2_image"] = getImageName(matchData["team2"])
		matchData["matchDate"] = match["matchDate"]
		if match["season"] in allDataSeasonWise:
			allDataSeasonWise[match["season"]].append(matchData)
		else:
			allDataSeasonWise[match["season"]] = [matchData]
	for season in allDataSeasonWise:
		allDataSeasonWiseList.append({ "seasonName": "Season%s" %season, "seasonID": "#Season%s" %season, "match": allDataSeasonWise[season]})
	allDataSeasonWiseList = sorted(allDataSeasonWiseList, key = lambda x : x["seasonName"])
	return allDataSeasonWiseList

""" gets the match statistics for batting: for an over, the runs scored
and breakdown of runs for each team """

def getMatchStats(matchID,teamNames):
	matchStats = {}
	team1 = teamNames["team1"]
	team2 = teamNames["team2"]
	matchStats[team1] = []
	matchStats[team2] = []
	match = db.reference('/MatchStats').child(matchID).get()
	overs = getSetOfOvers(match)
	for over in overs:
		overDetails = match[over]
		overNumber = getColumnValue(over)
		if team1 in overDetails:
			team1OverStats = getOverStatsOfTeam(overDetails, team1, overNumber)
			matchStats[team1].append(team1OverStats)
		if team2 in overDetails:
			team2OverStats = getOverStatsOfTeam(overDetails, team2, overNumber)
			matchStats[team2].append(team2OverStats)
	matchStats[team1] = addStatsToInnings(matchStats[team1])
	matchStats[team2] = addStatsToInnings(matchStats[team2])
	return matchStats

""" gets the match statistics for bowling: for an over and ball,
the player dismissed, the bowler, type of dismissal and non striker for each team """

def getPlayersDismissed(matchID,teamNames):
	playersDismissed = {}
	team1, team2 = teamNames["team1"], teamNames["team2"]
	playersDismissed[team1], playersDismissed[team2] = [], []
	match = db.reference('/MatchDismissal').child(matchID).get()
	overs = getSetOfOvers(match)
	for over in overs:
		overDetails = match[over]
		balls = getSetOfBalls(overDetails)
		for ball in balls:
			wicketDetails = overDetails[ball]
			overNumber = getColumnValue(over)
			if team1 in wicketDetails:
				playersDismissed[team1].append(getWicketDetailsOfTeam(wicketDetails[team1], overNumber, ball))
			if team2 in wicketDetails:
				playersDismissed[team2].append(getWicketDetailsOfTeam(wicketDetails[team2], overNumber, ball))
	return playersDismissed

""" gets teamNames of the given match in a JSON format
(a helper function needed in views.py) """

def getTeamNames(matchID):
	teamNames = {}
	teamNames["team1"] = getTeamName(matchID, "team1")
	teamNames["team2"] = getTeamName(matchID, "team2")
	return teamNames

""" gets the players playing in a particular match and group them by their team """

def getPlayersPlaying(matchID):
	teamNames = getTeamNames(matchID)
	team1 = teamNames["team1"]
	team2 = teamNames["team2"]
	seasonNumber = getSeasonNumber(matchID)
	playersPlaying = {team1: [], team2: []}
	playersOfMatch = db.reference('/PlayerMatch').child(matchID).get()
	for player in playersOfMatch:
		playerName = playersOfMatch[player]
		team = getPlayerTeam(playerName,"season_%s" % (seasonNumber))
		playersPlaying[team].append(playerName)
	return playersPlaying

""" gets the details: innings, match date, player of match, result of match,
season, first team, second team, venue, win by runs, win by wickets for a given match """

def getMatchDetails(matchID):
	match = db.reference('/MatchDescription').child(matchID).get()
	matchDetails = {}
	matchDetails["matchID"] = getColumnValue(matchID)
	for detail in match:
		matchDetails[detail] = match[detail]
	print(matchDetails)
	return matchDetails
