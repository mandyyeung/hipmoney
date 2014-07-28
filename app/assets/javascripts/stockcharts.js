$(document).on('page:change', function() {
  
  Highcharts.setOptions({
    global : {
      useUTC : false
    }
  });
  
  var ticker = 'AAPL';
  var lastTime = null;

  // google finance API for retrieving past week of closing prices
  $.get("http://finance.google.com/finance/historical",
    { 
          q: ticker,
          startdate:'Jul 15 2014',
          output:'csv'
    },
    function(csvData)
    {
      // parse the CSV into an array
      var parsedData = CSV.parse(csvData);
      // console.log(JSON.stringify(parsedData));

      // transform the array into coordinates to chart
      var history = [ ];
      parsedData.shift(); // remove the title row
      for (var i=0; i<7; i++) {
        var row = parsedData[i];
        var date = new Date(row[0]);
        date.setHours(16);
        var price = row[4];
        history.unshift([ date.getTime(), price ]);
      }

      // start with lastTime being the latest x coordinate
      lastTime = history[history.length-1][0];

      // Create the chart
    //   $('#stockchart').highcharts('StockChart', {
    //     chart : {
    //       events : {
    //         load : function() {

    //           // set up the updating of the chart each second
    //           var series = this.series[0];

    //           function getCurrentPrice() {
    //             $.ajax({
    //                 url: 'http://finance.google.com/finance/info?client=ig&q=FB', 
    //                 success: function(data) { 
    //                   // FOR TESTING: view all the raw data returned by google API
    //                   // console.log(JSON.stringify(data)); 

    //                   // get the time from the JSON response
    //                   var dateString = data[0].lt_dts; // 2014-07-25T16:00:00Z"
    //                   var date = new Date(dateString);
    //                   date.setHours(date.getHours()+4);
    //                   var x = date.getTime(); 

    //                   // get the stock price from the JSON response
    //                   var y = Number(data[0].l_cur);

    //                   // FOR TESTING:
    //                   // instead of using official time, use current local time
    //                   // x = new Date().getTime();
    //                   // instead of using actual data, use random data
    //                   // y = 70 + Math.floor(Math.random() * 10);

    //                   // since adding a point pushes the other points over, only add
    //                   // if we actually got a new x coordinate (time)
    //                   if (x !== lastTime) {
    //                     series.addPoint([x, y], true, true);
    //                     lastTime = s;
    //                   }
    //                 },
    //                 error: function() { alert('error'); },
    //                 dataType: 'jsonp'
    //             });            
    //           }

    //           setInterval(getCurrentPrice, 1000);
    //         }
    //       }
    //     },
        
    //     xAxis: {
    //       // x-axis scale based on "time" instead of "points"
    //       // ordinal: false,

    //       gapGridLineWidth: 0
    //     },
        
    //     rangeSelector: {
    //       enabled: false
    //     },
        
    //     series : [{
    //       name : 'Intraday AAPL Price',
    //       data: history,

    //       type : 'spline',
    //       fillColor : {
    //         linearGradient : {
    //           x1: 0, 
    //           y1: 0, 
    //           x2: 0, 
    //           y2: 1
    //         },
    //         stops : [
    //           [0, Highcharts.getOptions().colors[0]], 
    //           [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
    //         ]
    //       },
    //       threshold: null

    //     }],

    //     title : {
    //       text : 'Intraday Stock Price (AAPL)'
    //     }
    //   });
    // }); 
      var chart;
        $('#stockchart').highcharts({
            chart: {
                type: 'spline',
                animation: Highcharts.svg, // don't animate in old IE
                marginRight: 10,
                events: {
                               load : function() {

              // set up the updating of the chart each second
              var series = this.series[0];

              function getCurrentPrice() {
                $.ajax({
                    url: 'http://finance.google.com/finance/info?client=ig&q=AAPL', 
                    success: function(data) { 
                      // FOR TESTING: view all the raw data returned by google API
                      // console.log(JSON.stringify(data)); 

                      // get the time from the JSON response
                      var dateString = data[0].lt_dts; // 2014-07-25T16:00:00Z"
                      var date = new Date(dateString);
                      date.setHours(date.getHours()+4);
                      var x = date.getTime(); 

                      // get the stock price from the JSON response
                      var y = Number(data[0].l_cur);

                      // FOR TESTING:
                      // instead of using official time, use current local time
                      // x = new Date().getTime();
                      // instead of using actual data, use random data
                      // y = 70 + Math.floor(Math.random() * 10);

                      // since adding a point pushes the other points over, only add
                      // if we actually got a new x coordinate (time)
                      if (x !== lastTime) {
                        series.addPoint([x, y], true, true);
                        lastTime = s;
                      }
                    },
                    error: function() { alert('error'); },
                    dataType: 'jsonp'
                });            
              }

              setInterval(getCurrentPrice, 1000);
            }
          }
        },
            title: {
                text: 'AAPL Intraday'
            },
            xAxis: {
                type: 'datetime',
                tickPixelInterval: 150
            },
            yAxis: {
                title: {
                    text: 'Value'
                },
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }]
            },
            tooltip: {
                formatter: function() {
                        return '<b>'+ this.series.name +'</b><br/>'+
                        Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) +'<br/>'+
                        Highcharts.numberFormat(this.y, 2);
                }
            },
            legend: {
                enabled: false
            },
            exporting: {
                enabled: false
            },
            series: [{
                name: 'Intraday Stock Price (AAPL)',
                data: (function() {
                    // generate an array of random data
                    var data = [],
                        time = (new Date()).getTime(),
                        i;
    
                    for (i = -10; i <= 0; i++) {
                        data.push({
                            x: time + i * 1000,
                            y: 100
                        });
                    }
                    return data;
                })()
            }]
        });
    });


    }
  );

