/**
 * @desc creats a line chart with multiple lines corresponding to each list of values
 * @param {string[]} lineNameList - The list of names corresponponding to each line of linechart
 * @param {number[][]} yLists - List of lists of numbers to be plotted, each child list corresponding to separate lines on line chart
 * @param {string[][]} tooltipLists - List of list of tooltips corresponding to each number to be plotted
 * @param {number[][]} pointValueLists - List of list of numbers at which points would appear in the line chart per list corresponding to a list of values
 */
function createLineChart(lineNameList,yLists,tooltipLists,pointValueLists,xAxisLabel,chartTitle,containerID)
{
  //sanity checks
  let flag = true;
    if(!isEqualLength([lineNameList,yLists,tooltipLists,pointValueLists])) flag=false;
    if(!isListOfListOfNumbers(yLists)) flag=false;
    if(!isListOfListOfStrings(tooltipLists)) flag=false;
    if(!isListOfListOfNumbers(pointValueLists)) flag=false;
    if(!isEqualLengthPerIndex([yLists,tooltipLists])) flag=false;
  if (flag==false) return;

  const chart = new google.visualization.DataTable();
  chart.addColumn('number', xAxisLabel);
  yLists.forEach((element, index) => {
    chart.addColumn('number', lineNameList[index]);
    chart.addColumn({type: 'string', role: 'tooltip'});
    chart.addColumn({type: 'string', role: 'style'});
  });
  const maxLengthIndex = yLists.map(a => a.length).indexOf(Math.max.apply(Math, yLists.map(a => a.length)));
  const maxLength = yLists[maxLengthIndex].length;
  let pointTruthValueLists = [];
  pointValueLists.forEach((element, index) => {
    pointTruthValueLists.push(createTruthValueList(element,yLists[index].length));
  });
  let rowElement;
  yLists[maxLengthIndex].forEach((element, index) => {
    rowElement = [];
    rowElement.push(index+1);
    yLists.forEach((elementInner, indexInner) => {
      if (index<yLists[indexInner].length) {
        rowElement.push(elementInner[index]);
        rowElement.push(tooltipLists[indexInner][index]);
        rowElement.push((pointTruthValueLists[indexInner][index])? 'point { size: 4; }':null);  
      }
      else rowElement.push(null,null,null);
    });
    chart.addRow(rowElement);
  });
  const options =
  {
    title: chartTitle,
    width: 1200,
    height: 500,
    pointSize: 0.000001,
  };
  const lineChart = new google.visualization.LineChart(document.getElementById(containerID));
  lineChart.draw(chart, options);
}

 /**
 * @desc creats a column chart with multiple series of columns corresponding to each list of values
 * @param {string[]} lineNameList - The list of names corresponponding to each line of column chart
 * @param {number[][]} yLists - List of lists of numbers to be plotted, each child list corresponding to separate lines on column chart
 * @param {string[][]} tooltipLists - List of list of tooltips corresponding to each number to be plotted
 */
function createColumnChart(lineNameList,yLists,tooltipLists,xAxisLabel,chartTitle,containerID)
{
  //sanity checks
  let flag = true;
    if(!isEqualLength([lineNameList,yLists,tooltipLists])) flag=false;
    if(!isListOfListOfNumbers(yLists)) flag=false;
    if(!isListOfListOfStrings(tooltipLists)) flag=false;
    if(!isEqualLengthPerIndex([yLists,tooltipLists])) flag=false;
  if (flag==false) return;

  const chart = new google.visualization.DataTable();
  chart.addColumn('number', xAxisLabel);
  yLists.forEach((element, index) => {
    chart.addColumn('number', lineNameList[index]);
    chart.addColumn({type: 'string', role: 'tooltip'});
  });
  const maxLengthIndex = yLists.map(function(a){return a.length;}).indexOf(Math.max.apply(Math, yLists.map(function(a){return a.length;})));
  const maxLength = yLists[maxLengthIndex].length;
  let rowElement;
  yLists[maxLengthIndex].forEach((element, index) => {
    rowElement = [];
    rowElement.push(index+1);
    yLists.forEach((elementInner, indexInner) => {
      if (index<yLists[indexInner].length) {
        rowElement.push(elementInner[index]);
        rowElement.push(tooltipLists[indexInner][index]);
      }
      else rowElement.push(null,null);
    });
    chart.addRow(rowElement);
  });
  const options =
  {
  title: chartTitle,
  width: 1200,
  height: 500,
  };
  const lineChart = new google.visualization.ColumnChart(document.getElementById(containerID));
  lineChart.draw(chart, options);
}

 /**
 * @desc checks per index length correspondance of children lists
 * @return bool - success or failure, returns success in case of empty list
 */
function isEqualLengthPerIndex(lists) {
  let flag = true;
  if (!isEqualLength(lists))
    return false;
  if (lists.length == 0)
    return true;
  lists.forEach((list, index) => {
    list.forEach((innerList, innerIndex) => {
      if(innerList.length!=lists[0][innerIndex].length)
        flag = false;
    });
  });
  if (flag==false) {
    console.log(`${lists} : Non-equality in length of children lists per index`);
  }
  return flag;
}

 /**
 * @desc checks if every child list is of equal length
 * @return bool - success or failure, returns success in case of empty list
 */
function isEqualLength(lists) {
  let flag = true;
  flag = isListOfLists(lists);
  if (flag==false)
    return false;
  lists.forEach((list, index) => {
    if(list.length!=lists[0].length)
      flag = false;
  });
  if (flag==false) {
    console.log(`${lists} : Non-equality in length of children lists`);
  }
  return flag;
}

function isListOfLists(lists) {
  let flag = true;  
  if (!Array.isArray(lists))
  {
    console.log(`${lists} is not a list`);
    return false;
  }
  lists.forEach((element, index) => {
    if (!Array.isArray(element))
      flag = false;
  });
  if (flag==false) {
    console.log(`${list} is not a list of lists`);
  }
  return flag;
}

function isListOfListOfNumbers(list) {
  let flag = true;
  if (!Array.isArray(list))
  {
    console.log(`${list} is not a list`);
    return false;
  }
  list.forEach((element, index) => {
    if(!isListOfNumbers(element))
      flag = false;
  });
  if (flag==false) {
    console.log(`${list} is not a list of list of numbers`);
  }
  return flag;
}

function isListOfNumbers(list) {
  let flag = true;
  if (!Array.isArray(list))
  {
    console.log(`${list} is not a list`);
    return false;
  }
  list.forEach((element, index) => {
    if(isNaN(element))
      flag = false;
  });
  if (flag==false) {
    console.log(`${list} is not a list of numbers`);
  }
  return flag;
}

function isListOfListOfStrings(list) {
  let flag = true;
  if (!Array.isArray(list))
  {
    console.log(`${list} is not a list`);
    return false;
  }
  list.forEach((element, index) => {
    if(!(isListOfStrings(element)))
      flag = false;
  });
  if (flag==false) {
    console.log(`${list} is not a list of list of strings`);
  }
  return flag;
}

function isListOfStrings(list) {
  let flag = true;
  if (!Array.isArray(list))
  {
    console.log(`${list} is not a list`);
    return false;
  }
  list.forEach((element, index) => {
    if(!(typeof element === 'string'))
      flag = false;
  });
  if (flag==false) {
    console.log(`${list} is not a list of strings`);
  }
  return flag;
}
/**
 * @desc creats a list of boolean values with 'true' at indices in parameter list and others as false
 * @param {number[]} list - List of indices (1 based) whose value needs to be set to true
 * @param {number} finalListLength - length of list to be returned
 */
function createTruthValueList(list,finalListLength)
{
  let truthValueList = new Array(finalListLength).fill(false);
  let ignoredValues = [];
  list.forEach((element, index) => {
  if ((element-1)<finalListLength) {
    truthValueList[element-1]=true;
  }
  else ignoredValues.push(element);
  });
  if (ignoredValues.length>0) {
    console.log(`Defaulting to values greater than length of list\nIgnored indices: ${ignoredValues}`);
  }
  return truthValueList;
}
