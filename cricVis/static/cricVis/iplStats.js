google.charts.load("current", {packages: ['corechart', 'bar', 'geochart']});
google.charts.setOnLoadCallback(drawChart);
var allChartData;

function convertDataToMatrix(data,headers){
  let matrixData = []
  matrixData.push(headers);
  for (let xAxis in data){
    if (typeof(data[xAxis]) === "object"){
      let key = Object.keys(data[xAxis]);
      matrixData.push([xAxis, data[xAxis][key[0]], key[0]]);
    }
    else matrixData.push([xAxis, data[xAxis]]);
  }
  return matrixData;
}

function createDataPacket(chartData, chartHeaders, chartTitle, chartSubTitle, chartXAxisTitle, chartYAxisTitle){
  let data = {};
  data["chartData"] = chartData;
  data["headers"] = chartHeaders;
  data["chartTitle"] = chartTitle;
  data["chartSubTitle"] = chartSubTitle;
  data["chartXAxisTitle"] = chartXAxisTitle;
  data["chartYAxisTitle"] = chartYAxisTitle;
  return data;
}

function generateChartData(data,headers){
  let matrixData = convertDataToMatrix(data,headers);
  console.log(matrixData);
  let chartdata = google.visualization.arrayToDataTable(matrixData);
  return chartdata;
}

function generateOptions(chartTitle,chartSubtitle,chartXAxisTitle,chartYAxisTitle,chartWidth=900,chartHeight=300){
  let options = {
    title: chartTitle,
    subtitle: chartSubtitle,
    hAxis: {
      title: chartXAxisTitle,
    },
    vAxis: {
      title: chartYAxisTitle,
    },
    width: chartWidth,
    height: chartHeight,
    legend: {
      position: 'none'
    },
  }
  return options;
}

function plotBarChart(data, chartDivID){
  let chartData = generateChartData(data["chartData"],data["headers"]);
  let chartOptions = generateOptions(data["chartTitle"],data["chartSubTitle"],data["chartXAxisTitle"],data["chartYAxisTitle"]);
  chartOptions["bars"] = 'horizontal';
  var chart = new google.charts.Bar(document.getElementById(chartDivID));
  chart.draw(chartData, google.charts.Bar.convertOptions(chartOptions));
}

function plotColumnChart(data, chartDivID){
  let chartData = generateChartData(data["chartData"],data["headers"]);
  let chartOptions = generateOptions(data["chartTitle"],data["chartSubTitle"],data["chartXAxisTitle"],data["chartYAxisTitle"]);
  var chart = new google.visualization.ColumnChart(document.getElementById(chartDivID));
  chart.draw(chartData, chartOptions);
}

function plotPieChart(data,chartDivID){
  let chartData = generateChartData(data["chartData"],data["headers"]);
  let chartOptions = generateOptions(data["chartTitle"],data["chartSubTitle"],data["chartXAxisTitle"],data["chartYAxisTitle"]);
  chartOptions["pieHole"] = 0.5;
  chartOptions["pieSliceText"] = 'label';
  var chart = new google.visualization.PieChart(document.getElementById(chartDivID));
  chart.draw(chartData, chartOptions);
}

function plotBubbleChart(data,chartDivID){
  let chartData = generateChartData(data["chartData"],data["headers"]);
  let chartOptions = generateOptions(data["chartTitle"],data["chartSubTitle"],data["chartXAxisTitle"],data["chartYAxisTitle"]);
  var chart = new google.visualization.BubbleChart(document.getElementById(chartDivID));
  chart.draw(chartData, chartOptions);
}

function plotLineChart(data,chartDivID){
  let chartData = generateChartData(data["chartData"],data["headers"]);
  let chartOptions = generateOptions(data["chartTitle"],data["chartSubTitle"],data["chartXAxisTitle"],data["chartYAxisTitle"]);
  var chart = new google.visualization.LineChart(document.getElementById(chartDivID));
  chart.draw(chartData, chartOptions);
}

function plotGeoChart(data,chartDivID){
  let chartData = generateChartData(data["chartData"],data["headers"]);
  let chartOptions = generateOptions(data["chartTitle"],data["chartSubTitle"],data["chartXAxisTitle"],data["chartYAxisTitle"]);
  var chart = new google.visualization.GeoChart(document.getElementById(chartDivID));
  chart.draw(chartData, chartOptions);
}

function plotMostWinsChart(chartData){
  let data = {};
  data["chartData"] = chartData;
  data["headers"] = ["Winning Team","Number of Match Wins"];
  data["chartTitle"] = "Most Winning IPL Teams";
  data["chartSubTitle"] = "Number of match wins by every IPL team";
  data["chartXAxisTitle"] = "Number of Match Wins";
  data["chartYAxisTitle"] = "Winning Team";
  plotBarChart(data, "mostMatchWins")
}

function plotMostTossWinsChart(chartData){
  let data = {};
  data["chartData"] = chartData;
  data["headers"] = ["Winning Team","Number of Toss Wins"];
  data["chartTitle"] = "Most Toss Winning IPL Teams";
  data["chartSubTitle"] = "Number of toss wins by every IPL team";
  data["chartXAxisTitle"] = "Number of Toss Wins";
  data["chartYAxisTitle"] = "Winning Team";
  plotBarChart(data, "mostTossWins");
}

function plotMostSeasonWinsChart(chartData){
  let data = {};
  data["chartData"] = chartData;
  data["headers"] = ["Winning Team","Number of Season Wins"];
  data["chartTitle"] = "Most Season Winning IPL Teams";
  data["chartSubTitle"] = "Number of season wins by every IPL team";
  data["chartXAxisTitle"] = "Number of Season Wins";
  data["chartYAxisTitle"] = "Winning Team";
  plotBarChart(data, "mostSeasonWins");
}

function plotAverageScoreChart(chartData){
  let data = {};
  data["chartData"] = chartData;
  data["headers"] = ["Team","Average Score"];
  data["chartTitle"] = "Average Score of IPL Teams";
  data["chartSubTitle"] = "Average Score of every IPL team over all seasons";
  data["chartXAxisTitle"] = "Team";
  data["chartYAxisTitle"] = "Average Score";
  plotPieChart(data, "averageScore");
}

function plotFinalScoreBatFirstChart(chartData){
  let data = {};
  data["chartData"] = chartData;
  data["headers"] = ["Team","Final Match Score", { type: "string", role: "annotation" }];
  data["chartTitle"] = "Final Match Score of IPL Teams - Bat First";
  data["chartSubTitle"] = "Total scored by the team which batted first in the final of the season";
  data["chartXAxisTitle"] = "Team";
  data["chartYAxisTitle"] = "Final Match Score";
  plotColumnChart(data, "finalScoreBatFirst");
}

function plotMatchesStadiumChart(chartData){
  let data = {};
  data["chartData"] = chartData;
  data["headers"] = ["Stadium","Number of Matches"];
  data["chartTitle"] = "Number of IPL Matches per stadium";
  data["chartSubTitle"] = "A stadium wise distribution of IPL matches";
  data["chartXAxisTitle"] = "Stadium";
  data["chartYAxisTitle"] = "Number of Matches";
  plotColumnChart(data, "mostMatchesStadiumWise");
}

function plotMatchesCityChart(chartData){
  let data = {};
  data["chartData"] = chartData;
  data["headers"] = ["City","Number of Matches"];
  data["chartTitle"] = "Number of IPL Matches per city";
  data["chartSubTitle"] = "A city wise distribution of IPL matches";
  data["chartXAxisTitle"] = "City";
  data["chartYAxisTitle"] = "Number of Matches";
  plotGeoChart(data, "mostMatchesCityWise");
}

function plotLowestScoreTeams(chartData){
  for (let team in chartData){
    let data = {};
    data["chartData"] = chartData[team];
    data["headers"] = ["Season","Lowest Score"];
    data["chartTitle"] = "Lowest Score of " + team + " over all seasons";
    data["chartSubTitle"] = "Per Season lowest total";
    data["chartXAxisTitle"] = "Season";
    data["chartYAxisTitle"] = "Lowest Score";
    let perTeamDiv = document.createElement("div");
    perTeamDiv.id = team + "LowestScore";
    document.getElementById("lowestScoreSeasonWise").appendChild(perTeamDiv);
    plotLineChart(data, perTeamDiv.id);
  }
}

function plotHighestScoreTeams(chartData){
  for (let team in chartData){
    let data = {};
    data["chartData"] = chartData[team];
    data["headers"] = ["Season","Highest Score"];
    data["chartTitle"] = "Highest Score of " + team + " over all seasons";
    data["chartSubTitle"] = "Per Season highest total";
    data["chartXAxisTitle"] = "Season";
    data["chartYAxisTitle"] = "Highest Score";
    let perTeamDiv = document.createElement("div");
    perTeamDiv.id = team + "HighestScore";
    document.getElementById("highestScoreSeasonWise").appendChild(perTeamDiv);
    plotLineChart(data, perTeamDiv.id);
  }
}

function drawChart(){
  plotMostWinsChart(allChartData["teamWins"]);
  plotMostTossWinsChart(allChartData["tossWinsTeams"]);
  plotMostSeasonWinsChart(allChartData["seasonsWinsTeams"]);
  plotAverageScoreChart(allChartData["averageScoreTeams"]);
  plotFinalScoreBatFirstChart(allChartData["finalScoreBatFirst"]);
  plotLowestScoreTeams(allChartData["lowestScoreTeams"]);
  plotHighestScoreTeams(allChartData["highestScoreTeams"]);
  plotMatchesStadiumChart(allChartData["gamesPlayedStadium"]);
}

function receiveData(allIPLData){
  allChartData = allIPLData;
}