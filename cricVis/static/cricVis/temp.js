google.charts.load('current', {'packages':['corechart','bar']});
google.charts.setOnLoadCallback(plotCharts);
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
