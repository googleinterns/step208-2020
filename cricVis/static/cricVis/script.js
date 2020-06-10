function plotCharts(chartsData){
  // TO-DO: Use the charting library to plot the charts
}
function createHTMLElement(elementType,className=null){
  let element = document.createElement(elementType);
  if (className) element.classList.add(className);
  return element;
}
function createTextHTMLElement(elementType,text,className=null){
  let element = document.createElement(elementType);
  let textNode = document.createTextNode(text);
  element.addChild(textNode);
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
function displayMatchTeams(){

}
function emptyMatchElements(){
  $('#WormChartContainer').empty();
  $('#RunRateChartContainer').empty();
  $('#ManhattanChartContainer').empty();
  $('#team1Details').empty();
  $('#team2Details').empty();
}
function enableChartsDiv(){
  $("#toggleChartsBar").css("visibility","visible");
  $("#chartsContainer").css("visibility","visible");
}
function displayMatch(allData){
  emptyMatchElements();
  enableChartsDiv();
  displayTeamLists(allData);
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