$(document).on('page:change', function () {
  $.getJSON('bitcoin.json', function( bit ){ 
    $('.bit-count').html('$'+ bit.vwap);
    $('.wdgt-value p').html('Today\'s High: <b>$'+ bit.high + '</b><br> Today\s Low: <b>$' + bit.low + '</b>' ).html_safe;
  });
});
