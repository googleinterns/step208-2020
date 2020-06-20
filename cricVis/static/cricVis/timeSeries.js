function getSelectedCheckboxValues(checkboxGroupName){
    let selectedValues = [];
    $(`input:checkbox[name=${checkboxGroupName}]:checked`).each(function(){
        selectedValues.push($(this).val());
    });
    return selectedValues
}

$('#startDate').on('input', function(){
    $('#endDate').prop('disabled', false);
});
$('#endDate').on('input', function(){
    $('input:checkbox[name=Batsman]').each(function(){
        $(this).prop('disabled', false);
    });
    $('input:checkbox[name=Bowler]').each(function(){
        $(this).prop('disabled', false);
    });
});
$('.batsmanInput').on('input', function(){
    $('input:checkbox[name=matchType]').each(function(){
        $(this).prop('disabled', false);
    });
});
$('.bowlerInput').on('input', function(){
    $('input:checkbox[name=matchType]').each(function(){
        $(this).prop('disabled', false);
    });
});
$('.matchTypeInput').on('input', function(){
    $('input:checkbox[name=gender]').each(function(){
        $(this).prop('disabled', false);
    });
});
$('.genderInput').on('input', function(){
    $('#fetchTimeSeriesDataButton').prop('disabled', false);
});
$('#fetchTimeSeriesDataButton').click(function(){
    const startDate = $('#startDate').val();
    const endDate = $('#endDate').val();
    const batsmanFields = getSelectedCheckboxValues('Batsman');
    const bowlerFields = getSelectedCheckboxValues('Bowler');
    const matchTypes = getSelectedCheckboxValues('matchType');
    const genders = getSelectedCheckboxValues('gender');
});