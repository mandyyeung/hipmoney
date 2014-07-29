$(document).on('page:change', function () {
  
  $('.nav-stacked li').click(function(){
    var content = $(this).html();
    var ticker = $(this).html().split(" | ")[0].split('> ')[1];
    var name = $(this).html().split(" | ")[1].split('< ')[0].split(' <')[0];
    var img = $(this).attr('data-url');
    $('.user-heading h1').html(ticker);
    $('.user-heading p').html(name);
    $('.stock-logo img').attr("src", img);
    setChart(ticker);
  });

  $('.fa-plus').click(function() {
    $('#results').animate({
      height: "toggle"
      }, 500, function() {
      // Animation complete.
    });
    $(".fa-plus").toggleClass("rotate");
    $('input').animate({
    width: "toggle"
    }, 500, function() {
    // Animation complete.
  });

  $('div#results').on('click', '.result', function() {
    var id = 'data-id="' + $(this).attr("data-id") + '"'
    var link = 'stocks/'+ $(this).attr("data-id") + '/add'
    if($('.nav-stacked').html().indexOf(id) < 0){
      $(this).find('.fa-check-circle').addClass('green');
      $.getJSON(link, function( stock ){ 
        var li = "<li><a href=''><i img='' src=''></i>" + stock.ticker + " | " + stock.name + "<span class='badge label-success pull-right r-activity'>10</span></a></li>"
        $('ul.nav-stacked').prepend(li);
      });
    };
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
        $list = $('#results');

    $list.html('');
    if(!input)
      return; 

    $.getJSON(JSONPath, function( response ){
      response.forEach(function( obj ){
        var id = obj.id;
        if($('.nav-stacked').html().indexOf(id) < 0){
          var template = '<div class="result" data-id="'+ obj.id +'"> Name: ' + obj.name + ' Ticker: ' + obj.ticker + '<span class="pull-right fa fa-check-circle"></span></div>';
        } else {
          var template = '<div class="result" data-id="'+ obj.id +'"> Name: ' + obj.name + ' Ticker: ' + obj.ticker + '<span class="pull-right fa fa-check-circle green"></span></div>';
        }
        $list.append(template);
      });
    });
  });



});