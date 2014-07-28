$(document).on('page:change', function () {

  $('div#list').on('click', '.result', function() {
    var link = 'stocks/'+$(this).attr("data-id")+'/add'
    $.getJSON(link, function( stock ){ 
      $('#all').append('<div>' + stock.name +'</div>');
    });

  });

  $('.fa-plus').click(function() {
    $(".fa-minus").toggleClass("rotate");
    $(".fa-plus").toggleClass("rotate");
    $('input').animate({
    left: "+=50",
    width: "toggle"
    }, 500, function() {
    // Animation complete.
  });
  });

  // $('.result').click(function() {
  //   alert('clicked');
  //   var link = 'stocks/'+$(this).attr("data-id")+'/add'
  //   $.ajax({
  //     url: link,
  //     }).done(function() {
  //       alert('requert made');
  //     });
  //   $('#all').append('<div><%= j @stock.name %></div>');
  // });

  $('input').on('keyup', function( e ){
    var input = $(this).val(),
        JSONPath = '/stocks/' + input,
        $list = $('#list');

    $list.html('');
    if(!input)
      return; 

    $.getJSON(JSONPath, function( response ){
      response.forEach(function( obj ){
        var template = '<div class="result" data-id="'+ obj.id +'"> Name: ' + obj.name + ' Ticker: ' + obj.ticker + '</div>';

        $list.append(template);
      });
    });

  });



});