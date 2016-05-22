$(function () {

    var options = {

        chart: {
            backgroundColor: '#FFFFFF',
            renderTo: 'container',
            type: 'spline',
            shadow: true,
            zoomType: 'x',
            panning: true,
            panKey: 'shift',
            resetZoomButton: {
                position: {
                    x: 0,
                    y: -30
                }
            },
        },
        title: {
            text: "Solar Thermal Temperatures"
        },
        subtitle: {
            text: 'Click and drag to zoom in. Hold down shift key to pan.'
        },
        xAxis: {
            type: 'datetime'
        },
        yAxis: {
            min: 30
        },
        series: [
            { name: 'Collector', type: 'spline', data: [] },
            { name: 'Primary Tank', type: 'spline', data: [] },
            { name: 'Secondary Tank', type: 'spline', data: [] },
            { name: 'Pool', type: 'spline', data: [] }
        ]
    };

    var options2 = {

        chart: {
            backgroundColor: '#FFFFFF',
            renderTo: 'container2',
            type: 'spline',
            shadow: true,
            zoomType: 'x',
            panning: true,
            panKey: 'shift',
            resetZoomButton: {
                position: {
                    x: 0,
                    y: -30
                }
            },
        },
        title: {
            text: "Solar Thermal Activity"
        },
        subtitle: {
            text: 'Click and drag to zoom in. Hold down shift key to pan.'
        },
        xAxis: {
            type: 'datetime'
        },
        yAxis: {
            min: 0,
            max: 100
        },
        series: [
            { name: 'Pump', type: 'line', data: [] },
            { name: 'Primary Tank', type: 'areaspline', data: [] },
            { name: 'Secondary Tank', type: 'areaspline', data: [] },
            { name: 'Pool', type: 'areaspline', data: [] }
        ]
    };

    $.getJSON('get-solar.php?data=valves', function (json) {
        //options.series[0].data = json;

        var collector = [];
        var tank1 = [];
        var tank2 = [];
        var pool = [];
        $.each(json, function(key,value) {
                collector.push([value[0], value[1]]);
                tank1.push([value[0], value[2]]);
                tank2.push([value[0], value[3]]);
                pool.push([value[0], value[4]]);
            }

        )
        options2.series[0].data = collector;
        options2.series[1].data = tank1;
        options2.series[2].data = tank2;
        options2.series[3].data = pool;

        Highcharts.setOptions({
            global: {
                useUTC: false
            }
        });

        chart2 = new Highcharts.Chart(options2);
    });

    $.getJSON('get-solar.php?data=temp', function (json) {
        //options.series[0].data = json;

        var collector = [];
        var tank1 = [];
        var tank2 = [];
        var pool = [];
        $.each(json, function(key,value) {
                collector.push([value[0], value[1]]);
                tank1.push([value[0], value[2]]);
                tank2.push([value[0], value[3]]);
                pool.push([value[0], value[4]]);
            }

        )
        options.series[0].data = collector;
        options.series[1].data = tank1;
        options.series[2].data = tank2;
        options.series[3].data = pool;

        Highcharts.setOptions({
            global: {
                useUTC: false
            }
        });

        chart = new Highcharts.Chart(options);
    });

    $('#change').click(function () {
        var fromDate = $( "#fromDate").val();
        var toDate = $( "#toDate").val();
        $.getJSON('get-solar.php?data=temp&fromDate='+fromDate+'&toDate='+toDate, function (json) {

            var collector = [];
            var tank1 = [];
            var tank2 = [];
            var pool = [];
            $.each(json, function(key,value) {
                    collector.push([value[0], value[1]]);
                    tank1.push([value[0], value[2]]);
                    tank2.push([value[0], value[3]]);
                    pool.push([value[0], value[4]]);
                }

            )
            chart.series[0].setData(collector);
            chart.series[1].setData(tank1);
            chart.series[2].setData(tank2);
            chart.series[3].setData(pool);
        });

        $.getJSON('get-solar.php?data=valves&fromDate='+fromDate+'&toDate='+toDate, function (json) {

            var collector = [];
            var tank1 = [];
            var tank2 = [];
            var pool = [];
            $.each(json, function(key,value) {
                    collector.push([value[0], value[1]]);
                    tank1.push([value[0], value[2]]);
                    tank2.push([value[0], value[3]]);
                    pool.push([value[0], value[4]]);
                }

            )
            chart2.series[0].setData(collector);
            chart2.series[1].setData(tank1);
            chart2.series[2].setData(tank2);
            chart2.series[3].setData(pool);
        });
    });

    $('#12h').click(function () {
        $.getJSON('get-solar.php?data=temp&range=12h', function (json) {
            var collector = [];
            var tank1 = [];
            var tank2 = [];
            var pool = [];
            $.each(json, function(key,value) {
                    collector.push([value[0], value[1]]);
                    tank1.push([value[0], value[2]]);
                    tank2.push([value[0], value[3]]);
                    pool.push([value[0], value[4]]);
                }

            )
            chart.series[0].setData(collector);
            chart.series[1].setData(tank1);
            chart.series[2].setData(tank2);
            chart.series[3].setData(pool);
        });

        $.getJSON('get-solar.php?data=valves&range=12h', function (json) {

            var collector = [];
            var tank1 = [];
            var tank2 = [];
            var pool = [];
            $.each(json, function(key,value) {
                    collector.push([value[0], value[1]]);
                    tank1.push([value[0], value[2]]);
                    tank2.push([value[0], value[3]]);
                    pool.push([value[0], value[4]]);
                }

            )
            chart2.series[0].setData(collector);
            chart2.series[1].setData(tank1);
            chart2.series[2].setData(tank2);
            chart2.series[3].setData(pool);
        });

    });

    $('#6h').click(function () {
        $.getJSON('get-solar.php?data=temp&range=6h', function (json) {
            var collector = [];
            var tank1 = [];
            var tank2 = [];
            var pool = [];
            $.each(json, function(key,value) {
                    collector.push([value[0], value[1]]);
                    tank1.push([value[0], value[2]]);
                    tank2.push([value[0], value[3]]);
                    pool.push([value[0], value[4]]);
                }

            )
            chart.series[0].setData(collector);
            chart.series[1].setData(tank1);
            chart.series[2].setData(tank2);
            chart.series[3].setData(pool);
        });

        $.getJSON('get-solar.php?data=valves&range=6h', function (json) {

            var collector = [];
            var tank1 = [];
            var tank2 = [];
            var pool = [];
            $.each(json, function(key,value) {
                    collector.push([value[0], value[1]]);
                    tank1.push([value[0], value[2]]);
                    tank2.push([value[0], value[3]]);
                    pool.push([value[0], value[4]]);
                }

            )
            chart2.series[0].setData(collector);
            chart2.series[1].setData(tank1);
            chart2.series[2].setData(tank2);
            chart2.series[3].setData(pool);
        });

    });

    setInterval(function () {
        var fromDate = $( "#fromDate").val();
        var toDate = $( "#toDate").val();
        $.getJSON('get-solar.php?data=temp&fromDate='+fromDate+'&toDate='+toDate, function (json) {

            var collector = [];
            var tank1 = [];
            var tank2 = [];
            var pool = [];
            $.each(json, function(key,value) {
                    collector.push([value[0], value[1]]);
                    tank1.push([value[0], value[2]]);
                    tank2.push([value[0], value[3]]);
                    pool.push([value[0], value[4]]);
                }

            )
            chart.series[0].setData(collector);
            chart.series[1].setData(tank1);
            chart.series[2].setData(tank2);
            chart.series[3].setData(pool);
        });

        $.getJSON('get-solar.php?data=valves&fromDate='+fromDate+'&toDate='+toDate, function (json) {

            var collector = [];
            var tank1 = [];
            var tank2 = [];
            var pool = [];
            $.each(json, function(key,value) {
                    collector.push([value[0], value[1]]);
                    tank1.push([value[0], value[2]]);
                    tank2.push([value[0], value[3]]);
                    pool.push([value[0], value[4]]);
                }

            )
            chart.series[0].setData(collector);
            chart.series[1].setData(tank1);
            chart.series[2].setData(tank2);
            chart.series[3].setData(pool);
        });
    }, 100000);

});
