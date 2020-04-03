$(document).ready(function () {
    console.log("ready!");

    'use strict';
    //Declare chart objects
    const attendanceStackedBarChart = new dc.barChart('#attendance-chart'); //Match Attendance Start/Sub Chart object
    const ratingsLineChart = new dc.compositeChart('#ratings-composite-chart');//Match Ratings Chart object
    const personGoalsAssistsBarChart = new dc.barChart('#goals-per-person-chart');//Goals/Assists per person chart object
    const opponentGoalsAssistsBarChart = new dc.barChart('#goals-per-opponent-chart');//Goals/Assists per opponent chart object
    const goalsPerPersonCount = new dc.dataCount('#count-goals-per-person');//data count goals per person object
    const goalsPerPersonPieChart = new dc.pieChart('#goals-per-person-piechart');//Goals per person pie chart object
    const goalsPerOpponentCount = new dc.dataCount('#count-goals-per-opponent');//data count goals per opponent object
    const goalsPerOpponentPieChart = new dc.pieChart('#goals-per-opponent-piechart');//Goals per opponent chart object
    const statsTable = new dc.dataTable('#data-table');//Player stats table object

    //Get data
    d3.json('data/stats.json').then(function (data) {
        console.log(data);

        //Parse the date
        const dateFormatSpecifier = '%d/%m/%Y';
        //const dateFormat = d3.timeFormat(dateFormatSpecifier);
        const dateFormatParser = d3.timeParse(dateFormatSpecifier);
        //const numberFormat = d3.format('.2f');

        data.forEach(d => {
            d.date = dateFormatParser(d.date);
            //console.log(d.date);
        });

        //Create the crossfilter
        const ndx = crossfilter(data);
        const all = ndx.groupAll();

        //Create name dimension
        const name_dim = ndx.dimension(dc.pluck('name'));
        //Create and calculate number of starts per player
        const start = name_dim.group().reduceSum(function (d) {
            if (d.squad === 1) {
                return +d.squad;
            } else {
                return 0;
            }
        })
        //Create and calculate number of subs per player
        const sub = name_dim.group().reduceSum(function (d) {
            if (d.squad === 0) {
                return +d.squad + 1;
            } else {
                return 0;
            }
        })


        const date_dim = ndx.dimension(dc.pluck('date'));//Create date dimension
        const minDate = date_dim.bottom(1)[0].date;//Declare and get the minimum date
        const maxDate = date_dim.top(1)[0].date;//Declare and get the maximum date
        //Get the player rating for each date
        function rating_by_name(name) {
            return function (d) {
                if (d.name === name) {
                    return d.rating;
                } else {
                    return 0;
                }
            }
        };

        //Group the ratings by player name
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

        const total_goals_per_person = name_dim.group().reduceSum(dc.pluck('goals'));//Group goals per person
        console.log(total_goals_per_person);
        const total_assists_per_person = name_dim.group().reduceSum(dc.pluck('assists'));//Group assists per person

        const opponent_dim = ndx.dimension(dc.pluck('opponent'));//Create opponent dimension
        const total_goals_per_opponent = opponent_dim.group().reduceSum(dc.pluck('goals'));//Group goals per opponent
        const total_assists_per_opponent = opponent_dim.group().reduceSum(dc.pluck('assists'));//Group assists per opponent

        //Match Attendance Start/Sub Chart
        attendanceStackedBarChart
            .width($(attendanceStackedBarChart.anchor()).parent().width())
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
        ratingsLineChart
            .width($(ratingsLineChart.anchor()).parent().width())
            .height(200)
            .margins({ top: 30, right: 50, bottom: 30, left: 70 })
            .dimension(date_dim)
            .transitionDuration(1000)
            .x(d3.scaleTime().domain([minDate, maxDate]))
            .legend(dc.legend().x(0).y(0).itemHeight(7).gap(5))
            .renderHorizontalGridLines(true)
            .compose([
                new dc.lineChart(ratingsLineChart)
                    .colors('green')
                    .group(jamieRating, 'Jamie'),
                new dc.lineChart(ratingsLineChart)
                    .colors('red')
                    .group(joshfRating, 'Josh F'),
                new dc.lineChart(ratingsLineChart)
                    .colors('blue')
                    .group(joshrRating, 'Josh R'),
                new dc.lineChart(ratingsLineChart)
                    .colors('maroon')
                    .group(jackRating, 'Jack'),
                new dc.lineChart(ratingsLineChart)
                    .colors('yellow')
                    .group(jamesRating, 'James'),
                new dc.lineChart(ratingsLineChart)
                    .colors('pink')
                    .group(seanRating, 'Sean'),
                new dc.lineChart(ratingsLineChart)
                    .colors('tomato')
                    .group(ralphRating, 'Ralph'),
                new dc.lineChart(ratingsLineChart)
                    .colors('orange')
                    .group(alexRating, 'Alex'),
                new dc.lineChart(ratingsLineChart)
                    .colors('dodgerblue')
                    .group(pavanRating, 'Pavan'),
                new dc.lineChart(ratingsLineChart)
                    .colors('mediumseagreen')
                    .group(tadghRating, 'Tadgh'),
                new dc.lineChart(ratingsLineChart)
                    .colors('grey')
                    .group(coleRating, 'Cole'),
                new dc.lineChart(ratingsLineChart)
                    .colors('slateblue')
                    .group(leeRating, 'Lee'),
                new dc.lineChart(ratingsLineChart)
                    .colors('violet')
                    .group(marcusRating, 'Marcus'),
                new dc.lineChart(ratingsLineChart)
                    .colors('lightgrey')
                    .group(saadRating, 'Saad'),
                new dc.lineChart(ratingsLineChart)
                    .colors('teal')
                    .group(paulRating, 'Paul'),
                new dc.lineChart(ratingsLineChart)
                    .colors('black')
                    .group(gusRating, 'Gus'),
            ])
            .brushOn(false)
            .render();

        //Goals/assists per person chart
        personGoalsAssistsBarChart
            .width($(personGoalsAssistsBarChart.anchor()).parent().width())
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
        opponentGoalsAssistsBarChart
            .width($(opponentGoalsAssistsBarChart.anchor()).parent().width())
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

        goalsPerPersonCount
            .crossfilter(ndx)
            .groupAll(all)
            .html({
                some: '<strong>%filter-count</strong> selected out of <strong>%total-count</strong> records' +
                    ' | <a href=\'javascript:dc.filterAll(); dc.renderAll();\'>Reset All</a>',
                all: 'All records selected. Please click on the graph to apply filters.'
            });



        //Pie chart 1
        goalsPerPersonPieChart
            //.width(150)
            //.height(150)
            .radius(80)
            .dimension(name_dim)
            .group(total_goals_per_person)
            .transitionDuration(1000)
        //.externalRadiusPadding(300)
        //.externalLabels(true)



        goalsPerOpponentCount
            .crossfilter(ndx)
            .groupAll(all)
            .html({
                some: '<strong>%filter-count</strong> selected out of <strong>%total-count</strong> records' +
                    ' | <a href=\'javascript:dc.filterAll(); dc.renderAll();\'>Reset All</a>',
                all: 'All records selected. Please click on the graph to apply filters.'
            });


        //Pie chart 2
        goalsPerOpponentPieChart
            //.width(150)
            //.height(150)
            .radius(80)
            .transitionDuration(1000)
            .dimension(opponent_dim)
            .group(total_goals_per_opponent)

        statsTable
            .dimension(name_dim)
            .section(d => {
                    return d.name;
                })
            .size(100)
            .columns([
                {
                    label: 'Starts',
                    format: function (d) {
                        //console.log(d.name);
                        //console.log(d.squad);
                        if (d.squad === 1) {
                            //console.log("d.squad = " + d.squad);
                            return +d.squad;

                        } else {
                            //console.log("0000000");
                            return d.squad;
                        }
                    }
                },
                //function (d) { return d.squad; },
                //function (d) { return d.sub; },

                //function (d) { return d.total_assists_per_person; },
                //function (d) { return d.rating; },



            ]);
        dc.renderAll();
        dc.redrawAll();
    });
});