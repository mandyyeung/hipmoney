$(document).on('page:change', function() {
  
  Highcharts.setOptions({
    global : {
      useUTC : false
    }
  });
  
  // Create the chart
  $('#container').highcharts('StockChart', {
    chart : {
      events : {
        load : function() {

          // set up the updating of the chart each second
          var series = this.series[0];

          function getCurrentPrice() {
            $.ajax({
                url: 'http://finance.google.com/finance/info?client=ig&q=FB', 
                success: function(data) { 
                  // uncomment to view all the raw data returned by google API
                  // console.log(JSON.stringify(data)); 

                  // get the time from the JSON response
                  var dateString = data[0].lt_dts; // 2014-07-25T16:00:00Z"
                  var date = new Date(dateString);
                  date.setHours(date.getHours()+4);
                  var x = date.getTime(); 

                  // instead of using official time, use current local time
                  // var x = new Date().getTime();

                  // get the stock price from the JSON response
                  var y = Number(data[0].l_cur);

                  // console.log('displaying point x = ' + x + ' y = ' + y);
                  series.addPoint([x, y], true, false);
                },
                error: function() { alert('error'); },
                dataType: 'jsonp'
            });            
          }

          var toggle = false;
          function generateRandomData() {
            // y = Math.round(Math.random() * 100);

            // x = (new Date('2014-07-24T10:00:00Z')).getTime();
            // y = 100;
            // series.addPoint([x, y], true, true);

            // x = (new Date('2014-07-25T10:00:00Z')).getTime();
            // y = 200;
            // series.addPoint([x, y], true, true);            

            // x = (new Date('2014-07-26T10:02:00Z')).getTime();
            // y = 100;
            // series.addPoint([x, y], true, false);

            // x = (new Date('2014-07-26T10:03:00Z')).getTime();
            // y = 300;
            // series.addPoint([x, y], true, false);

            // x = (new Date('2014-07-26T10:03:00Z')).getTime();
            x = (new Date()).getTime();
            if (toggle) {
              y = 100;
            }
            else {
              y = 100;
            }
            toggle = !toggle;
            series.addPoint([x, y], true, false);
          }

          // setInterval(generateRandomData, 1000);
          setInterval(getCurrentPrice, 1000);
        }
      }
    },
    
    // xAxis: {
    //   gapGridLineWidth: 0
    // },
    
    // rangeSelector : {
    //   buttons : [{
    //     type : 'minute',
    //     count : 1,
    //     text : '1m'
    //   }, {
    //     type : 'hour',
    //     count : 1,
    //     text : '1h'
    //   }, {
    //     type : 'day',
    //     count : 1,
    //     text : '1D'
    //   }, {
    //     type : 'all',
    //     count : 1,
    //     text : 'All'
    //   }],
    //   selected : 1,
    //   inputEnabled : false
    // },
    
    series : [{
      name : 'Intraday FB Price',

      data: [ ],

      // data: (function() {
      //   var data = [ ];

      //   // x = (new Date('2014-07-26T10:00:00Z')).getTime();
      //   // y = 100;
      //   // data.push([x, y]);

      //   // x = (new Date('2014-07-26T10:01:00Z')).getTime();
      //   // y = 200;
      //   // data.push([x, y]);

      //   return data;
      // })()

      // type: 'area',
      // data: [ [ new Date().getTime(), 0 ] ],

      // dataGrouping: {
      //   enabled: false
      // },

      // data : (function() {
      //   // generate an array of random data
      //   var data = [], time = (new Date()).getTime(), i;

      //   for( i = -999; i <= 0; i++) {
      //     data.push([
      //       time + i * 1000,
      //       Math.round(Math.random() * 100)
      //     ]);
      //   }
      //   return data;
      // })()

      // data : [ [new Date().getTime(), 0] ] 
      // gapSize: null,
      // tooltip: {
      //   valueDecimals: 2
      // },
      // fillColor : {
      //   linearGradient : {
      //     x1: 0, 
      //     y1: 0, 
      //     x2: 0, 
      //     y2: 1
      //   },
      //   stops : [
      //     [0, Highcharts.getOptions().colors[0]], 
      //     [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
      //   ]
      // },
      // threshold: null
    }],

    title : {
      text : 'Intraday Stock Price (FB)'
    }
  });
}); 
