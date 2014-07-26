$(document).on('page:change', function () {


  DraggablePortlet.init();


  $('input').on('keyup', function( e ){
    var input = $(this).val(),
        JSONPath = '/stocks/' + input,
        $list = $('#list');

    $list.html('');
    if(!input)
      return; 

    $.getJSON(JSONPath, function( response ){
      response.forEach(function( obj ){
        var template = '<li> Name: ' + obj.name + ' Ticker: ' + obj.ticker + '</li>';

        $list.append(template);
      });
    });

  });
});