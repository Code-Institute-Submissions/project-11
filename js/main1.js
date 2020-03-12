$(document).ready(function () {
    console.log("ready!");

    'use strict';

    const attendance_Stacked_Chart = new dc.barChart('#attendance-chart');
    const ratingsChart = new dc.compositeChart('#composite-chart');
    //const ratingsChart = new dc.lineChart(compositeChart);
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

        data.forEach(d => {
            d.date = dateFormatParser(d.date);
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


        //Player ratings chart
        const date_dim = ndx.dimension(dc.pluck('date'));
        //console.log(d.date);
        const minDate = date_dim.bottom(1)[0].date;
        console.log("min_date = " + minDate);
        const maxDate = date_dim.top(1)[0].date;
        console.log("max_date = " + maxDate);
        function rating_by_name(name) {
            return function (d) {
                if (d.name === name) {
                    return d.rating;
                } else {
                    return 0;
                }
            }
        };

        const jamieRating = date_dim.group().reduceSum(rating_by_name('Jamie'));
        const joshfRating = date_dim.group().reduceSum(rating_by_name('Josh F'));
        const joshrRating = date_dim.group().reduceSum(rating_by_name('Josh R'));
        const jamesRating = date_dim.group().reduceSum(rating_by_name('James'));
        const jackRating = date_dim.group().reduceSum(rating_by_name('Jack'));
        const seanRating = date_dim.group().reduceSum(rating_by_name('Sean'));
        const ralphRating = date_dim.group().reduceSum(rating_by_name('Ralph'));
        const alexRating = date_dim.group().reduceSum(rating_by_name('Alex'));
        const pavanRating = date_dim.group().reduceSum(rating_by_name('Pavan'));
        const tadghRating = date_dim.group().reduceSum(rating_by_name('Tadgh'));
        const coleRating = date_dim.group().reduceSum(rating_by_name('Cole'));
        const leeRating = date_dim.group().reduceSum(rating_by_name('Lee'));
        const marcusRating = date_dim.group().reduceSum(rating_by_name('Marcus'));
        const saadRating = date_dim.group().reduceSum(rating_by_name('Saad'));
        const paulRating = date_dim.group().reduceSum(rating_by_name('Paul'));
        const gusRating = date_dim.group().reduceSum(rating_by_name('Gus'));

        //const compositeChart = dc.compositeChart('#composite-chart');
        ratingsChart
            .width($(ratingsChart.anchor()).parent().width())
            .height(200)
            .margins({ top: 30, right: 50, bottom: 30, left: 70 })
            .dimension(date_dim)
            .transitionDuration(1000)
            .x(d3.scaleTime().domain([minDate, maxDate]))
            .legend(dc.legend().x(0).y(0).itemHeight(7).gap(5))
            .renderHorizontalGridLines(true)
            .compose([
                new dc.lineChart(ratingsChart)
                    .colors('green')
                    .group(jamieRating, 'Jamie'),
                new dc.lineChart(ratingsChart)
                    .colors('red')
                    .group(joshfRating, 'Josh F'),
                new dc.lineChart(ratingsChart)
                    .colors('blue')
                    .group(joshrRating, 'Josh R'),
                new dc.lineChart(ratingsChart)
                    .colors('maroon')
                    .group(jackRating, 'Jack'),
                new dc.lineChart(ratingsChart)
                    .colors('yellow')
                    .group(jamesRating, 'James'),
                new dc.lineChart(ratingsChart)
                    .colors('pink')
                    .group(seanRating, 'Sean'),
                new dc.lineChart(ratingsChart)
                    .colors('tomato')
                    .group(ralphRating, 'Ralph'),
                new dc.lineChart(ratingsChart)
                    .colors('orange')
                    .group(alexRating, 'Alex'),
                new dc.lineChart(ratingsChart)
                    .colors('dodgerblue')
                    .group(pavanRating, 'Pavan'),
                new dc.lineChart(ratingsChart)
                    .colors('mediumseagreen')
                    .group(tadghRating, 'Tadgh'),
                new dc.lineChart(ratingsChart)
                    .colors('grey')
                    .group(coleRating, 'Cole'),
                new dc.lineChart(ratingsChart)
                    .colors('slateblue')
                    .group(leeRating, 'Lee'),
                new dc.lineChart(ratingsChart)
                    .colors('violet')
                    .group(marcusRating, 'Marcus'),
                new dc.lineChart(ratingsChart)
                    .colors('lightgrey')
                    .group(saadRating, 'Saad'),
                new dc.lineChart(ratingsChart)
                    .colors('teal')
                    .group(paulRating, 'Paul'),
                new dc.lineChart(ratingsChart)
                    .colors('black')
                    .group(gusRating, 'Gus'),
            ])
            .brushOn(false)
            .render();



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
        //const name_dim = ndx.dimension(dc.pluck('name'));
        /*
        const total_goals_per_person = name_dim.group().reduceSum(dc.pluck('goals'));
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