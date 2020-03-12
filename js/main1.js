$(document).ready(function () {
    console.log("ready!");

    'use strict';

    const attendance_Stacked_Chart = new dc.barChart('#attendance-chart');
    //var compositeChart = new dc.compositeChart('#composite-chart');
    const goals_Assists_Stacked_Chart = new dc.barChart('#goals-per-person-chart');
    const goalBarChart = new dc.barChart('#goals-per-opponent-chart');
    //const total_goals_per_person = new dc.pieChart('#goals-per-person-piechart');
    //const total_goals_per_opponenet = new dc.pieChart('#goals-per-opponent-piechart');


    d3.json('data/stats.json').then(function (data) {
        console.log(data);
        const dateFormatSpecifier = '%d/%m/%Y';
        const dateFormat = d3.timeFormat(dateFormatSpecifier);
        const dateFormatParser = d3.timeParse(dateFormatSpecifier);
        const numberFormat = d3.format('.2f');
        //console.log(numberFormat);

        data.forEach(d => {
            //console.log(d);
            d.dd = dateFormatParser(d.date);
            d.month = d3.timeMonth(d.dd); // pre-calculate month for better performance
            d.close = +d.close; // coerce to number
            d.open = +d.open;
        });


        const ndx = crossfilter(data);
        const all = ndx.groupAll();

// attendance_Stacked_Chart = dc.barChart("#attendance-chart");
        const name_dim = ndx.dimension(dc.pluck('name'));
        const start = name_dim.group().reduceSum(function (d) {
            if (d.squad === 1) {
                return +d.squad;
            } else {
                return 0;
            }
        })
        const sub = name_dim.group().reduceSum(function (d) {
            if (d.squad === 0) {
                return +d.squad + 1;
            } else {
                return 0;
            }
        })
        attendance_Stacked_Chart
            .width($(attendance_Stacked_Chart.anchor()).parent().width())
            .margins({ top: 30, right: 50, bottom: 30, left: 70 })
            .dimension(name_dim)
            .group(start, "Start")
            .stack(sub, "Sub")
            .transitionDuration(1000)
            .x(d3.scaleBand())
            .xUnits(dc.units.ordinal)
            .ordinalColors(['blue', 'white'])
            .legend(dc.legend().x(0).y(10).itemHeight(15).gap(5))


        //Goals/assists per person chart
        const total_goals_per_person = name_dim.group().reduceSum(dc.pluck('goals'));
        const total_assists_per_person = name_dim.group().reduceSum(dc.pluck('assists'));
        goals_Assists_Stacked_Chart
            .width($(goals_Assists_Stacked_Chart.anchor()).parent().width())
            .height(200)
            .margins({ top: 30, right: 50, bottom: 30, left: 70 })
            .dimension(name_dim)
            .group(total_goals_per_person, "Goals")
            .stack(total_assists_per_person, "Assists")
            .transitionDuration(1000)
            .x(d3.scaleBand())
            .xUnits(dc.units.ordinal)
            .ordinalColors(['blue', 'white'])
            .legend(dc.legend().x(0).y(10).itemHeight(15).gap(5))
        //.yAxis().ticks(4);


        //Goals/asssists per opponent chart
        const opponent_dim = ndx.dimension(dc.pluck('opponent'));
        const total_goals_per_opponent = opponent_dim.group().reduceSum(dc.pluck('goals'));
        const total_assists_per_opponent = opponent_dim.group().reduceSum(dc.pluck('assists'));
        goalBarChart
            .width($(goalBarChart.anchor()).parent().width())
            .height(200)
            .margins({ top: 30, right: 50, bottom: 30, left: 70 })
            .dimension(opponent_dim)
            .group(total_goals_per_opponent, "Goals")
            .stack(total_assists_per_opponent, "Assists")
            .transitionDuration(1000)
            .x(d3.scaleBand())
            .xUnits(dc.units.ordinal)
            .ordinalColors(['blue', 'white'])
            .legend(dc.legend().x(0).y(10).itemHeight(15).gap(5))
        //.yAxis().ticks(4);



        //Pie chart 1
        //var name_dim = ndx.dimension(dc.pluck('name'));
        /*
        var total_goals_per_person = name_dim.group().reduceSum(dc.pluck('goals'));
        dc.pieChart('#per-person-chart')
            .width(150)
            .height(150)
            .dimension(name_dim)
            .group(total_goals_per_person)
            .transitionDuration(1000)
        //.externalRadiusPadding(300)
        //.externalLabels(true)
        */


        
        dc.renderAll();
    });
});