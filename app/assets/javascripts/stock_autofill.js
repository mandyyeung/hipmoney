$(document).on('page:change', function () {
  
  $('.nav-stacked').on('click', 'li', function(e){
    var ticker = $(this).attr('data-ticker');
    var name = $(this).attr('data-name');
    var img = $(this).attr('data-url');
    $('.user-heading h2').html(ticker);
    $('.user-heading p').html(name);
    $('.stock-logo img').attr("src", img);
    fillChart();
  });

  $('.fa-plus').click(function() {
    if ( $('.stock.title').css('display')==='inline-block'){
      $('.stock.title').slideToggle( "slow", function() {
      // Animation complete.
        $('input').animate({
        width: "toggle"
        }, 500, function() {
        // Animation complete.
          $('input').select();
        });
      });
    }else{
      $('input').animate({
        width: "toggle"
        }, 500, function() {
        // Animation complete.

       
        $('.stock.title').slideToggle( "slow", function() {
        // Animation complete.
          
        });
      });
    };
    $('#results').animate({
      height: "toggle"
      }, 500, function() {
      // Animation complete.
    });
    $(".fa-plus").toggleClass("rotate");
    

  $('div#results').on('click', '.result', function() {
    var id = $(this).attr("data-id");
    var name = $(this).attr("data-name");
    var ticker = $(this).attr("data-ticker");
    var logo = $(this).attr("data-url"); 
    var link = 'stocks/'+ $(this).attr("data-id") + '/add'
    if($('.nav-stacked').html().indexOf(id) < 0){
      $(this).find('.fa-check-circle').addClass('green');
      $.getJSON(link, function( stock ){ 
        var li = '<li data-name="' + name + '" data-ticker="' + ticker + '" data-url=' + logo + ' data-id="' + id + '"><span><a>' + ticker + '</a></span><span class="badge label-success pull-right r-activity">10</span>&nbsp;<span><a class="fa fa-minus-circle red" data-method="delete" data-remote="true", href="stocks/' + id + '"></a></span></li>'
        $('ul.nav-stacked').prepend(li);
         $('.user-heading h2').html(stock.ticker);
         $('.user-heading p').html(stock.name);
         $('.stock-logo img').attr("src", stock.logo);
         fillChart();
      });
    };
  });

  });

  // $('.fa-minus-circle.red').click(function(){
  //    // debugger
  //   $.ajax ({
  //     type: 'DELETE',
  //     url: "/stocks/" + $(this).parent().parent().attr('data-id'),
  //     dataType: 'json',
  //     success: function(data) {
  //       $('li[data-id="' + data.id + '"').remove(); 
  //     }
  //   });
  // });

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
        if(obj.logo === null){
          var logo = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT08tgzF1SmLGFuIperm7c1h9ZasKCkZ5Mmeljhitb8uzpfiymnug';
        }else{
          var logo = obj.logo;
        };
        var id = obj.id;
        if($('.nav-stacked').html().indexOf(id) < 0){
          var template = '<div class="result" data-url="' + logo + '" data-name="' + obj.name + '" data-ticker="' + obj.ticker + '" data-id="'+ obj.id +'">' + obj.name + ' (' + obj.ticker + ')<span class="pull-right fa fa-check-circle"></span></div>';
        } else {
          var template = '<div class="result" data-url="' + logo + '" data-name="' + obj.name + '" data-ticker="' + obj.ticker + '" data-id="'+ obj.id +'">' + obj.name + ' (' + obj.ticker + ')<span class="pull-right fa fa-check-circle green"></span></div>';
        }
        $list.append(template);
      });
    });
  });



});