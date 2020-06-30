var autofillData;
var tableHeadingData;
function receiveAutofillData(autofillDataReceived, tableHeadingReceived){
  console.log(tableHeadingReceived);
  autofillData = autofillDataReceived;
  tableHeadingData = tableHeadingReceived;
}
function createAutofill(sourceData, inputID, type){
  $(`#${inputID}`).attr('disabled', false);
  $(`#${inputID}`).attr('placeholder', `Enter ${type} name...`);
  $(`#${inputID}`).autocomplete({
    minLength:2,    
    source: sourceData
 });
}