$(document).on('page:change', function (){
      setInterval(function() {
        $('.stocktwits').load('/users/stocktwits');
      }, 10000);
});
