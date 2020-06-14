google.charts.load("current", {packages: ['corechart', 'bar']});
google.charts.setOnLoadCallback(drawChart);

function convertDataToMatrix(data,headers){
  let matrixData = []
  matrixData.push(headers);
  for (let xAxis in data){
    matrixData.push[xAxis, data[xAxis]];
  }
  return matrixData;
}

function generateChartData(data){
  let chartdata = google.visualization.arrayToDataTable(convertDataToMatrix(data));
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
    }
  }
  return options;
}

function drawChart(){
  
}

function receiveData(allIPLData){
  console.log(allIPLData);
}