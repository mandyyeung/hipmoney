$(document).on('page:change', function () {
  $.getJSON('bitcoin.json', function( bit ){ 
    $('.bit-count').html('$'+ bit.vwap);
    $('.wdgt-value p').html('High of $'+ bit.high +' | Low of $' + bit.low );
  });
});
