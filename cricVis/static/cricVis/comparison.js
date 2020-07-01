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