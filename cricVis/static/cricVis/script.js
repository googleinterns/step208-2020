  function plotCharts(chartsData){
    // TO-DO: Use the charting library to plot the charts
  }
  function emptyChartDivs(){
    $('#WormChartContainer').empty();
    $('#RunRateChartContainer').empty();
    $('#ManhattanChartContainer').empty();
  }
  function enableChartsDiv(){
    $("#toggleChartsBar").css("visibility","visible");
    $("#chartsContainer").css("visibility","visible");
    emptyChartDivs();
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
      success: function(chartsData){
        chartsData = JSON.parse(chartsData);
        console.log(chartsData);
        enableChartsDiv();
        plotCharts(chartsData);
      },
      error: function(error){
        console.log(error);
      }
    })
  });