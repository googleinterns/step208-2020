$('#startDate').on('input', function(){
    $('#endDate').prop('disabled', false);
    $('#endDate').on('input', function(){
        $('input:checkbox[name=Batsman]').each(function(){
            $(this).prop('disabled', false);
        });
        $('input:checkbox[name=Bowler]').each(function(){
            $(this).prop('disabled', false);
        });
    });
});