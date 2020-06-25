google.charts.load('current', {'packages':['corechart','bar']});
function plotCharts(chartsData)
{
  const wormdata = new google.visualization.DataTable();
  wormdata.addColumn('number', 'Overs');
  wormdata.addColumn('number', chartsData.wormChartData.team1.teamName);
  wormdata.addColumn({type: 'string', role: 'tooltip'});
  wormdata.addColumn({type: 'string', role: 'style'});
  wormdata.addColumn('number', chartsData.wormChartData.team2.teamName);
  wormdata.addColumn({type: 'string', role: 'tooltip'});
  wormdata.addColumn({type: 'string', role: 'style'});
  let tooltip1='',tooltip2='';
  let point1=null,point2=null;
  var i;
  if(chartsData.wormChartData.team1.overs.length>=chartsData.wormChartData.team2.overs.length)
  {
      for (i = 0; i < chartsData.wormChartData.team2.overs.length; i++)
      {
        tooltip1=createTooltip(i+1,chartsData.wormChartData.team1.teamName,chartsData.wormChartData.team1.overs[i].cumulativeRuns,chartsData.wormChartData.team1.overs[i].playersDismissed);
        tooltip2=createTooltip(i+1,chartsData.wormChartData.team2.teamName,chartsData.wormChartData.team2.overs[i].cumulativeRuns,chartsData.wormChartData.team2.overs[i].playersDismissed);
        point1=null;
        point2=null;
        if (chartsData.wormChartData.team1.overs[i].playersDismissed.length>0)
        {
          point1='point { size: 4; }';
        }
        if (chartsData.wormChartData.team2.overs[i].playersDismissed.length>0)
        {
          point2='point { size: 4; }';
        }
        wormdata.addRow([i+1,chartsData.wormChartData.team1.overs[i].cumulativeRuns,tooltip1,point1,chartsData.wormChartData.team2.overs[i].cumulativeRuns,tooltip2,point2]);
      }
      for (i = chartsData.wormChartData.team2.overs.length; i < chartsData.wormChartData.team1.overs.length; i++)
      {
        tooltip1=createTooltip(i+1,chartsData.wormChartData.team1.teamName,chartsData.wormChartData.team1.overs[i].cumulativeRuns,chartsData.wormChartData.team1.overs[i].playersDismissed);
        point1=null;
        if (chartsData.wormChartData.team1.overs[i].playersDismissed.length>0)
        {
          point1='point { size: 4; }';
        }
        wormdata.addRow([i+1,chartsData.wormChartData.team1.overs[i].cumulativeRuns,tooltip1,point1,null,null,null]);
      }
  }
  else
  {
      for (i = 0; i < chartsData.wormChartData.team1.overs.length; i++)
      {
        tooltip1=createTooltip(i+1,chartsData.wormChartData.team1.teamName,chartsData.wormChartData.team1.overs[i].cumulativeRuns,chartsData.wormChartData.team1.overs[i].playersDismissed);
        tooltip2=createTooltip(i+1,chartsData.wormChartData.team2.teamName,chartsData.wormChartData.team2.overs[i].cumulativeRuns,chartsData.wormChartData.team2.overs[i].playersDismissed);
        point1=null;
        point2=null;
        if (chartsData.wormChartData.team1.overs[i].playersDismissed.length>0)
        {
          point1='point { size: 4; }';
        }
        if (chartsData.wormChartData.team2.overs[i].playersDismissed.length>0)
        {
          point2='point { size: 4; }';
        }
        wormdata.addRow([i+1,chartsData.wormChartData.team1.overs[i].cumulativeRuns,tooltip1,point1,chartsData.wormChartData.team2.overs[i].cumulativeRuns,tooltip2,point2]);
      }
      for (i = chartsData.wormChartData.team1.overs.length; i < chartsData.wormChartData.team2.overs.length; i++)
      {
        tooltip2=createTooltip(i+1,chartsData.wormChartData.team2.teamName,chartsData.wormChartData.team2.overs[i].cumulativeRuns,chartsData.wormChartData.team2.overs[i].playersDismissed);
        point2=null;
        if (chartsData.wormChartData.team2.overs[i].playersDismissed.length>0)
        {
          point2='point { size: 4; }';
        }
          wormdata.addRow([i+1,null,null,null,chartsData.wormChartData.team2.overs[i].cumulativeRuns,tooltip2,point2]);
      }
  }
  const wormoptions =
  {
      title: 'Worm Chart',
      width: 1200,
      height: 500,
      pointSize: 0.000001,
  };
  const wormchart = new google.visualization.LineChart(document.getElementById('WormChartContainer'));
  wormchart.draw(wormdata, wormoptions);

  const runratedata = new google.visualization.DataTable();
  runratedata.addColumn('number', 'Overs');
  runratedata.addColumn('number', chartsData.runRateChartData.team1.teamName);
  runratedata.addColumn({type: 'string', role: 'tooltip'});
  runratedata.addColumn({type: 'string', role: 'style'});
  runratedata.addColumn('number', chartsData.runRateChartData.team2.teamName);
  runratedata.addColumn({type: 'string', role: 'tooltip'});
  runratedata.addColumn({type: 'string', role: 'style'});
  if(chartsData.runRateChartData.team1.overs.length>=chartsData.runRateChartData.team2.overs.length)
  {
      for (i = 0; i < chartsData.runRateChartData.team2.overs.length; i++)
      {
        tooltip1=createTooltip(i+1,chartsData.runRateChartData.team1.teamName,chartsData.runRateChartData.team1.overs[i].runRate.toFixed(2),chartsData.runRateChartData.team1.overs[i].playersDismissed);
        tooltip2=createTooltip(i+1,chartsData.runRateChartData.team2.teamName,chartsData.runRateChartData.team2.overs[i].runRate.toFixed(2),chartsData.runRateChartData.team2.overs[i].playersDismissed);
        point1=null;
        point2=null;
        if (chartsData.runRateChartData.team1.overs[i].playersDismissed.length>0)
        {
          point1='point { size: 4; }';
        }
        if (chartsData.runRateChartData.team2.overs[i].playersDismissed.length>0)
        {
          point2='point { size: 4; }';
        }
          runratedata.addRow([ i+1, chartsData.runRateChartData.team1.overs[i].runRate, tooltip1, point1, chartsData.runRateChartData.team2.overs[i].runRate, tooltip2, point2 ]);
      }
      for (i = chartsData.runRateChartData.team2.overs.length; i < chartsData.runRateChartData.team1.overs.length; i++)
      {
        tooltip1=createTooltip(i+1,chartsData.runRateChartData.team1.teamName,chartsData.runRateChartData.team1.overs[i].runRate.toFixed(2),chartsData.runRateChartData.team1.overs[i].playersDismissed);
        point1=null;
        if (chartsData.runRateChartData.team1.overs[i].playersDismissed.length>0)
        {
          point1='point { size: 4; }';
        }
          runratedata.addRow([ i+1, chartsData.runRateChartData.team1.overs[i].runRate, tooltip1, point1, null, null, null]);
      }
  }
  else
  {
      for (i = 0; i < chartsData.runRateChartData.team1.overs.length; i++)
      {
        tooltip1=createTooltip(i+1,chartsData.runRateChartData.team1.teamName,chartsData.runRateChartData.team1.overs[i].runRate.toFixed(2),chartsData.runRateChartData.team1.overs[i].playersDismissed);
        tooltip2=createTooltip(i+1,chartsData.runRateChartData.team2.teamName,chartsData.runRateChartData.team2.overs[i].runRate.toFixed(2),chartsData.runRateChartData.team2.overs[i].playersDismissed);
        point1=null;
        point2=null;
        if (chartsData.runRateChartData.team1.overs[i].playersDismissed.length>0)
        {
          point1='point { size: 4; }';
        }
        if (chartsData.runRateChartData.team2.overs[i].playersDismissed.length>0)
        {
          point2='point { size: 4; }';
        }
          runratedata.addRow([ i+1, chartsData.runRateChartData.team1.overs[i].runRate, tooltip1, point1, chartsData.runRateChartData.team2.overs[i].runRate, tooltip2, point2]);
      }
      for (i = chartsData.runRateChartData.team1.overs.length; i < chartsData.runRateChartData.team2.overs.length; i++)
      {
        tooltip2=createTooltip(i+1,chartsData.runRateChartData.team2.teamName,chartsData.runRateChartData.team2.overs[i].runRate.toFixed(2),chartsData.runRateChartData.team2.overs[i].playersDismissed);
        point2=null;
        if (chartsData.runRateChartData.team2.overs[i].playersDismissed.length>0)
        {
          point2='point { size: 4; }';
        }
          runratedata.addRow([i+1, null, null, null, chartsData.runRateChartData.team2.overs[i].runRate, tooltip2, point2]);
      }
  }


  const runrateoptions =
  {
      title: 'Run Rate Graph',
      width: 1200,
      height: 500,
      pointSize: 0.000001,
  };
  const runratechart = new google.visualization.LineChart(document.getElementById('RunRateChartContainer'));
  runratechart.draw(runratedata, runrateoptions);


  const manhattandata = new google.visualization.DataTable();
  manhattandata.addColumn('number', 'Overs');
  manhattandata.addColumn('number', chartsData.manhattanChartData.team1.teamName);
  manhattandata.addColumn('number', chartsData.manhattanChartData.team2.teamName);
  if(chartsData.manhattanChartData.team1.overs.length>=chartsData.manhattanChartData.team2.overs.length)
  {
      for (i = 0; i < chartsData.manhattanChartData.team2.overs.length; i++)
      {
          manhattandata.addRow([i+1,chartsData.manhattanChartData.team1.overs[i].runs,chartsData.manhattanChartData.team2.overs[i].runs]);
      }
      for (i = chartsData.manhattanChartData.team2.overs.length; i < chartsData.manhattanChartData.team1.overs.length; i++)
      {
          manhattandata.addRow([i+1,chartsData.manhattanChartData.team1.overs[i].runs,null]);
      }
  }
  else
  {
      for (i = 0; i < chartsData.manhattanChartData.team1.overs.length; i++)
      {
          manhattandata.addRow([i+1,chartsData.manhattanChartData.team1.overs[i].runs,chartsData.manhattanChartData.team2.overs[i].runs]);
      }
      for (i = chartsData.manhattanChartData.team1.overs.length; i < chartsData.manhattanChartData.team2.overs.length; i++)
      {
          manhattandata.addRow([i+1,null,chartsData.manhattanChartData.team2.overs[i].runs]);
      }
  }
  const manhattanoptions =
  {
      title: 'Manhattan Graph',
      width: 1200,
      height: 500
  };
  const manhattanchart = new google.charts.Bar(document.getElementById('ManhattanChartContainer'));
  manhattanchart.draw(manhattandata, google.charts.Bar.convertOptions(manhattanoptions));
}


function createTooltip(overNumber, teamName, overValue, playersDismissed)
{
  let tooltip=overNumber+'\n'+teamName+': '+overValue;
  if (playersDismissed.length>0)
  {
  tooltip = tooltip.concat('\nPlayers Dismissed:');
  playersDismissed.forEach((player) =>  {
    tooltip = tooltip.concat('\n'+ player.playerDismissed+' (Dismissal-type: '+player.type+', Bowler: '+player.bowler+', Fielder: '+player.fielder +')');
      });
  }
  return tooltip;
}
function createHTMLElement(elementType,className=null){
  let element = document.createElement(elementType);
  if (className) element.classList.add(className);
  return element;
}
function createTextHTMLElement(elementType,text,className=null){
  let element = document.createElement(elementType);
  let textNode = document.createTextNode(text);
  element.appendChild(textNode);
  if (className) element.classList.add(className);
  return element;
}
function createTeamList(teamList,containerName){
  let listLength = teamList.length;
  let listContainer = document.getElementById(containerName);
  for (let i = 0; i < listLength; i++){
    let listElement = createHTMLElement("li","list-group-item");
    listElement.appendChild(document.createTextNode(teamList[i]));
    listContainer.appendChild(listElement);
  }
}
function displayTeamLists(allData){
  let team1 = allData["matchDetails"]["team1"];
  let team2 = allData["matchDetails"]["team2"];
  $('#team1Heading').append(document.createTextNode(team1));
  $('#team2Heading').append(document.createTextNode(team2));
  createTeamList(allData["playersPlaying"][team1],"team1Details");
  createTeamList(allData["playersPlaying"][team2],"team2Details");
}
function addOneBoxResult(matchDetails){
  let matchResultDiv = $("#matchResult");
  let resultString = matchDetails["result"] + " won by ";
  if (matchDetails["winByRuns"]) resultString += matchDetails["winByRuns"] + " runs";
  else resultString += matchDetails["winByWickets"] + " wickets";
  matchResultDiv.append(createTextHTMLElement("p",resultString));
}
function addOneBoxDetails(matchDetails){
  let matchDetailsDiv = $("#matchDetails");
  matchDetailsDiv.append(createTextHTMLElement("p","Venue: " + matchDetails["venue"],"card-text"));
  matchDetailsDiv.append(createTextHTMLElement("p","Player of Match: " + matchDetails["playerOfMatch"],"card-text"));
  matchDetailsDiv.append(createTextHTMLElement("p",matchDetails["team1"] + " batted first","card-text"));
}
function addOneBoxTeams(matchDetails){
  let matchTeamsDiv = $("#matchTeams");
  matchTeamsDiv.append(createTextHTMLElement("p",matchDetails["team1"] + " v/s " + matchDetails["team2"]));
  matchTeamsDiv.append(createTextHTMLElement("small",matchDetails["matchDate"]));
}
function createOneBox(matchDetails){
  $("#matchTeams").css("visibility","visible");
  $("#matchDetails").css("visibility","visible");
  $("#matchResult").css("visibility","visible");
  addOneBoxTeams(matchDetails);
  addOneBoxDetails(matchDetails);
  addOneBoxResult(matchDetails);
}
function emptyMatchElements(){
  $('#WormChartContainer').empty();
  $('#RunRateChartContainer').empty();
  $('#ManhattanChartContainer').empty();
  $('#team1Details').empty();
  $('#team2Details').empty();
  $('#matchTeams').empty();
  $('#matchDetails').empty();
  $('#matchResult').empty();
  $('#team1Heading').empty();
  $('#team2Heading').empty();
}
function enableChartsDiv(){
  $("#toggleChartsBar").css("visibility","visible");
  $("#chartsContainer").css("visibility","visible");
}
function displayMatch(allData){
  emptyMatchElements();
  enableChartsDiv();
  displayTeamLists(allData);
  createOneBox(allData["matchDetails"]);
  plotCharts(allData["chartData"]);
}
// on clicking the "View Results" button, send a GET request to fetchGraphData function in views.py and log the chartsData response.
$('.match-group .match').click(function(){
  $(this).parent().parent().find('.match').removeClass('badge');
  $(this).parent().parent().find('.match').removeClass('badge-pill');
  $(this).parent().parent().find('.match').removeClass('badge-primary');
  $(this).addClass('badge');
  $(this).addClass('badge-pill');
  $(this).addClass('badge-primary');
  let matchID = $(this).attr('data-value');
  console.log(matchID);
  $.ajax({
    type: 'GET',
    url: '/cricVis/fetchGraphData',
    data: {
      matchID: matchID
    },
    success: function(allData){
      allData = JSON.parse(allData);
      console.log(allData);
      displayMatch(allData);
    },
    error: function(error){
      console.log(error);
    }
  })
});