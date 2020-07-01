var autofillData;
var tableHeadingData;
function receiveAutofillData(autofillDataReceived, tableHeadingReceived){
  console.log(tableHeadingReceived);
  autofillData = autofillDataReceived;
  tableHeadingData = tableHeadingReceived;
}

$('.comparisonTableChoice').on('input', function(){
  const tableName = $("input:radio[name='comparisonTable']:checked").val();
  console.log(tableName);
  createAutofill(autofillData[tableName], "autofillFirst", tableHeadingData[tableName]);
  createAutofill(autofillData[tableName], "autofillSecond", tableHeadingData[tableName]);
});

function createAutofill(sourceData, inputID, type){
  $(`#${inputID}`).attr('disabled', false);
  $(`#${inputID}`).attr('placeholder', `Enter ${type} name...`);
  $(`#${inputID}`).autocomplete({
    minLength:2,    
    source: sourceData
 });
}

function createHTMLElement(type, elementClass=null, elementID=null){
  const element = document.createElement(type);
  if (elementID) element.id = elementID;
  if (elementClass) element.className = elementClass;
  return element;
}

function createStatDiv(chartDivID, field, fieldValue1, fieldValue2){
  const parentDiv = createHTMLElement("div", "list-group-item list-group-item-action flex-column align-items-center");
  const chartStatsDiv = createHTMLElement("div", "d-flex w-100 justify-content-around");
  const chartDiv = createHTMLElement("div", "comparisonChartDiv", chartDivID);
  const stat1 = createHTMLElement("p", "statTag");
  const stat2 = createHTMLElement("p", "statTag");
  stat1.innerText = fieldValue1;
  stat2.innerText = fieldValue2;
  const chartStatsDivHeading = createHTMLElement("h4", "chartStatsDivHeading");
  chartStatsDivHeading.innerText = field;
  chartStatsDiv.appendChild(stat1);
  chartStatsDiv.appendChild(chartDiv);
  chartStatsDiv.appendChild(stat2);
  parentDiv.appendChild(chartStatsDivHeading);
  parentDiv.appendChild(chartStatsDiv);
  return parentDiv;
}