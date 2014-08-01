// returns true or false depending on whether date is a market open date
function isMarketOpenDate(date)
{
  // is it a weekday?
  var isWeekday = date.getDay() !== 0 && date.getDay() !== 6;

  // is it a bank holiday?
  var isHoliday = false; // we won't implement this now

  return (isWeekday && !isHoliday);
}

function setMarketOpenTime(date)
{
  date.setHours(9);
  date.setMinutes(30);
  date.setSeconds(0);
  date.setMilliseconds(0);
  return date;
}

function setMarketCloseTime(date)
{
  date.setHours(16);
  date.setMinutes(0);
  date.setSeconds(0);
  date.setMilliseconds(0);
  return date;
}

function getMarketTime()
{
  var now = new Date();
  var marketTime = { };

  /*
   * determine if the market is open
   */

  var isMarketDate = isMarketOpenDate(now);

  // is it between 9:30am and 4pm EST?
  var todayMarketOpenDate = new Date(now);
  setMarketOpenTime(todayMarketOpenDate);
  var todayMarketCloseDate = new Date(now);
  setMarketCloseTime(todayMarketCloseDate);
  var isMarketHours = (now.getTime() >= todayMarketOpenDate.getTime()) && (now.getTime() < todayMarketCloseDate.getTime());

  marketTime.marketIsOpen = (isMarketDate && isMarketHours);

  /*
   * generate marketTime data based on whether the market is open
   */

  if (marketTime.marketIsOpen) {
    // countdown until today's date at 4pm EST
    marketTime.nextMarketDate = todayMarketCloseDate;
  }
  else {
    // find the next market open date and countdown until 9:30am EST
    var searchDate = new Date(now);
    var searchDateIsMarketDate = false;

    // note: this could run forever if our code is bugged
    do {
      // increment the searchDate to the next day
      searchDate.setDate(searchDate.getDate() + 1);

      // check if the new searchDate is a marketOpenDate
      searchDateIsMarketDate = isMarketOpenDate(searchDate);
    }
    while (searchDateIsMarketDate !== true);

    marketTime.nextMarketDate = setMarketOpenTime(searchDate);
  }

  return marketTime;
}

$(document).on('page:change', function() {

  var marketTime = getMarketTime();

  $('.countdown').countdown({
    date: marketTime.nextMarketDate,

    // data = { years, days, hours, min, sec }
    render: function(data) {
      var text = data.sec + ' seconds until the market ';
      if (marketTime.marketIsOpen) {
        text += 'closes';
      }
      else {
        text += 'opens';
      }

      if (data.min > 0) {
        text = data.min + ' minutes, ' + text;
      }
      if (data.hours > 0) {
        text = data.hours + ' hours, ' + text;
      }
      if (data.days > 0) {
        text = data.days + ' days, ' + text;
      }
      $(this.el).text(text);
    },
  });

});