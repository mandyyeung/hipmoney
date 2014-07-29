$(document).ready(
    function() {
      setInterval(function() {
        $('.stocktwits').load('/users/stocktwits');
      }, 900000);
});
