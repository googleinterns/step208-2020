google.charts.load("current", {packages: ['corechart', 'bar', 'geochart']});
google.charts.setOnLoadCallback(drawChart);
var allChartData;

$('.carousel').carousel({
  interval: false,
});

function getColour(key){
  if (key in allChartData["teamColour"]) return "color: " + allChartData["teamColour"][key];
  return "color: #FFBE7D";
}

function convertDataToMatrix(data,headers, color=null){
  let matrixData = []
  headers.push({ role: "style" });
  matrixData.push(headers);
  for (let xAxis in data){
    if (typeof(data[xAxis]) === "object"){
      let key = Object.keys(data[xAxis]);
      if (!color) colour = getColour(key[0]);
      matrixData.push([xAxis, data[xAxis][key[0]], key[0], colour]);
    }
    else {
      if (!color) colour = getColour(xAxis);
      matrixData.push([xAxis, data[xAxis], colour]);
    }
  }
  return matrixData;
}

function generateChartData(data,headers, color=null){
  let matrixData = convertDataToMatrix(data,headers, color);
  console.log(matrixData);
  let chartdata = google.visualization.arrayToDataTable(matrixData);
  return chartdata;
}

function generateOptions(chartTitle,chartSubtitle,chartXAxisTitle,chartYAxisTitle){
  let options = {
    title: chartTitle,
    subtitle: chartSubtitle,
    hAxis: {
      title: chartXAxisTitle,
    },
    vAxis: {
      title: chartYAxisTitle,
    },
    width: 900,
    height: 600,
    legend: {
      position: 'none'
    },
  }
  return options;
}

function plotBarChart(chartData, chartOptions, chartDivID){
  chartOptions["bars"] = 'horizontal';
  var chart = new google.visualization.BarChart(document.getElementById(chartDivID));
  chart.draw(chartData, chartOptions);
}

function plotColumnChart(chartData, chartOptions, chartDivID){
  var chart = new google.visualization.ColumnChart(document.getElementById(chartDivID));
  chart.draw(chartData, chartOptions);
}

function plotPieChart(chartData, chartOptions ,chartDivID){
  chartOptions["pieSliceText"] = 'label';
  var chart = new google.visualization.PieChart(document.getElementById(chartDivID));
  chart.draw(chartData, chartOptions);
}

function plotBubbleChart(chartData, chartOptions ,chartDivID){
  var chart = new google.visualization.BubbleChart(document.getElementById(chartDivID));
  chart.draw(chartData, chartOptions);
}

function plotLineChart(chartData, chartOptions ,chartDivID){
  var chart = new google.visualization.LineChart(document.getElementById(chartDivID));
  chart.draw(chartData, chartOptions);
}

function plotGeoChart(chartData, chartOptions ,chartDivID){
  var chart = new google.visualization.GeoChart(document.getElementById(chartDivID));
  chart.draw(chartData, chartOptions);
}

function plotMostWinsChart(chartData){
  let data = generateChartData(chartData,["Winning Team","Number of Match Wins"]); 
    let chartOptions = generateOptions("Most Winning IPL Teams","Number of match wins by every IPL team","Number of Match Wins","Winning Team");
  plotBarChart(data, chartOptions, "mostMatchWins")
}

function plotMostTossWinsChart(chartData){
  let data = generateChartData(chartData,["Winning Team","Number of Toss Wins"]); 
  let chartOptions = generateOptions("Most Toss Winning IPL Teams","Number of toss wins by every IPL team","Number of Toss Wins","Winning Team");
  plotBarChart(data, chartOptions, "mostTossWins");
}

function plotMostSeasonWinsChart(chartData){
  let data = generateChartData(chartData,["Winning Team","Number of Season Wins"]);
  let chartOptions = generateOptions("Most Season Winning IPL Teams","Number of season wins by every IPL team","Most Season Winning IPL Teams","Number of season wins by every IPL team","Number of Season Wins","Winning Team");
  plotBarChart(data, chartOptions, "mostSeasonWins");
}

function plotAverageScoreChart(chartData){
  let data = generateChartData(chartData,["Team","Average Score"]);
  let chartOptions = generateOptions("Average Score of IPL Teams","Average Score of every IPL team over all seasons","Team","Average Score");
  chartOptions["chartArea"] = {"width": 900, "height": 900};
  chartOptions["pieHole"] = 0.5;
  plotPieChart(data, chartOptions, "averageScore");
}

function plotFinalScoreBatFirstChart(chartData){
  let data = generateChartData(chartData,["Team","Final Match Score", { type: "string", role: "annotation" }]);
  let chartOptions = generateOptions("Final Match Score of IPL Teams - Bat First","Total scored by the team which batted first in the final of the season","Team","Final Match Score");
  plotColumnChart(data, chartOptions, "finalScoreBatFirst");
}

function plotMatchesStadiumChart(chartData){
  let data = generateChartData(chartData,["Stadium","Number of Matches"]);
  let chartOptions = generateOptions("Number of IPL Matches per stadium","A stadium wise distribution of IPL matches","Stadium","Number of Matches");
  plotColumnChart(data, chartOptions, "mostMatchesStadiumWise");
}

function plotMatchesCityChart(chartData){
  let data = generateChartData(chartData,["City","Number of Matches"]);
  let chartOptions = generateOptions("Number of IPL Matches per city","A city wise distribution of IPL matches","City","Number of Matches");
  plotGeoChart(data, chartOptions, "mostMatchesCityWise");
}

function plotScoreTeams(chartData, scoreType, scoreTypeDiv){
  let flag = true;
  for (let team in chartData){
    let data = generateChartData(chartData[team],["Season",`${scoreType} Score`], allChartData["teamColour"][team]);
    let chartOptions = generateOptions(`${scoreType} Score of ${team} over all seasons`,`Per Season ${scoreType} total`,"Season",`${scoreType} Score`);
    chartOptions.height = 200;
    let perTeamDiv = document.createElement("div");
    perTeamDiv.id = `${team}${scoreType}Score`;
    if (flag) {
      perTeamDiv.classList.add("carousel-item");
      perTeamDiv.classList.add("active");
      flag = false;
    }
    else perTeamDiv.classList.add("carousel-item");
    document.getElementById(scoreTypeDiv).appendChild(perTeamDiv);
    plotLineChart(data, chartOptions, perTeamDiv.id);
  }
}

function drawChart(){
  plotMostWinsChart(allChartData["teamWins"]);
  plotMostTossWinsChart(allChartData["tossWinsTeams"]);
  plotMostSeasonWinsChart(allChartData["seasonsWinsTeams"]);
  plotAverageScoreChart(allChartData["averageScoreTeams"]);
  plotFinalScoreBatFirstChart(allChartData["finalScoreBatFirst"]);
  plotScoreTeams(allChartData["lowestScoreTeams"],"Lowest","lowestScoreSeasonWise");
  plotScoreTeams(allChartData["highestScoreTeams"],"Highest","highestScoreSeasonWise");
  plotMatchesStadiumChart(allChartData["gamesPlayedStadium"]);
}

function receiveData(allIPLData){
  allChartData = allIPLData;
  console.log(allChartData);
}