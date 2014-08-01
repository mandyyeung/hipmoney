$(document).on('page:change', function () {
  $('#portfolio-edit').click(function(){
    $('.portfolio').load('/users/edit_portfolio');
  });
});
