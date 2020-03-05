var ndx;
queue()//Function from script libraries above
    .defer(d3.json, "data/stats.json")//This gets the data from json files
    .await(makeGraphs);//makeGraphs is the function declared below

function makeGraphs(error, statsData) {
    let ndx = crossfilter(statsData);
    var parseDate = d3.time.format("%d/%m/%Y").parse;
    statsData.forEach(function (d) {
        d.date = parseDate(d.date);
        console.log("ndx complete");
    });

    //playerList();
    console.log("Player list function called");
    console.log("Work function called");
    work();

};



function work() {
    console.log("work function");

    //Select drop down menu
    var name_dim = ndx.dimension(dc.pluck('name'));
    var playerName = name_dim.group();
    console.log(playerName);
    var select1 = new dc.selectMenu("#select1");
    select1
        .dimension(name_dim)
        .group(playerName)
        .title(function (d) {
            return d.key;
        })
    //.multiple(true)
    //.numberVisible(16)
    //.controlsUseVisibility(true);


    //Match attendance start/sub chart
    var name_dim = ndx.dimension(dc.pluck('name'));
    var start = name_dim.group().reduceSum(function (d) {
        if (d.squad === 1) {
            return +d.squad;
        } else {
            return 0;
        }
    })
    var sub = name_dim.group().reduceSum(function (d) {
        if (d.squad === 0) {
            return +d.squad + 1;
        } else {
            return 0;
        }
    })
    var attendance_Stacked_Chart = dc.barChart("#attendance-chart");
    attendance_Stacked_Chart
        .width($(attendance_Stacked_Chart.anchor()).parent().width())
        .dimension(name_dim)
        .group(start, "Start")
        .stack(sub, "Sub")
        .transitionDuration(1000)
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .ordinalColors(['blue', 'white'])
        .legend(dc.legend().x(0).y(10).itemHeight(15).gap(5))
        .margins({ top: 30, right: 50, bottom: 30, left: 70 })


    //Player ratings chart
    var date_dim = ndx.dimension(dc.pluck('date'));
    var minDate = date_dim.bottom(1)[0].date;
    var maxDate = date_dim.top(1)[0].date;
    function rating_by_name(name) {
        return function (d) {
            if (d.name === name) {
                return d.rating;
            } else {
                return 0;
            }
        }
    };

    var jamieRating = date_dim.group().reduceSum(rating_by_name('Jamie'));
    var joshfRating = date_dim.group().reduceSum(rating_by_name('Josh F'));
    var joshrRating = date_dim.group().reduceSum(rating_by_name('Josh R'));
    var jamesRating = date_dim.group().reduceSum(rating_by_name('James'));
    var jackRating = date_dim.group().reduceSum(rating_by_name('Jack'));
    var seanRating = date_dim.group().reduceSum(rating_by_name('Sean'));
    var ralphRating = date_dim.group().reduceSum(rating_by_name('Ralph'));
    var alexRating = date_dim.group().reduceSum(rating_by_name('Alex'));
    var pavanRating = date_dim.group().reduceSum(rating_by_name('Pavan'));
    var tadghRating = date_dim.group().reduceSum(rating_by_name('Tadgh'));
    var coleRating = date_dim.group().reduceSum(rating_by_name('Cole'));
    var leeRating = date_dim.group().reduceSum(rating_by_name('Lee'));
    var marcusRating = date_dim.group().reduceSum(rating_by_name('Marcus'));
    var saadRating = date_dim.group().reduceSum(rating_by_name('Saad'));
    var paulRating = date_dim.group().reduceSum(rating_by_name('Paul'));
    var gusRating = date_dim.group().reduceSum(rating_by_name('Gus'));

    var compositeChart = dc.compositeChart('#composite-chart');
    compositeChart
        .width($(compositeChart.anchor()).parent().width())
        .height(200)
        .margins({ top: 30, right: 50, bottom: 30, left: 70 })
        .dimension(date_dim)
        .transitionDuration(1000)
        .x(d3.time.scale().domain([minDate, maxDate]))
        .legend(dc.legend().x(0).y(0).itemHeight(7).gap(5))
        .renderHorizontalGridLines(true)
        .compose([
            dc.lineChart(compositeChart)
                .colors('green')
                .group(jamieRating, 'Jamie'),
            dc.lineChart(compositeChart)
                .colors('red')
                .group(joshfRating, 'Josh F'),
            dc.lineChart(compositeChart)
                .colors('blue')
                .group(joshrRating, 'Josh R'),
            dc.lineChart(compositeChart)
                .colors('maroon')
                .group(jackRating, 'Jack'),
            dc.lineChart(compositeChart)
                .colors('yellow')
                .group(jamesRating, 'James'),
            dc.lineChart(compositeChart)
                .colors('pink')
                .group(seanRating, 'Sean'),
            dc.lineChart(compositeChart)
                .colors('tomato')
                .group(ralphRating, 'Ralph'),
            dc.lineChart(compositeChart)
                .colors('orange')
                .group(alexRating, 'Alex'),
            dc.lineChart(compositeChart)
                .colors('dodgerblue')
                .group(pavanRating, 'Pavan'),
            dc.lineChart(compositeChart)
                .colors('mediumseagreen')
                .group(tadghRating, 'Tadgh'),
            dc.lineChart(compositeChart)
                .colors('grey')
                .group(coleRating, 'Cole'),
            dc.lineChart(compositeChart)
                .colors('slateblue')
                .group(leeRating, 'Lee'),
            dc.lineChart(compositeChart)
                .colors('violet')
                .group(marcusRating, 'Marcus'),
            dc.lineChart(compositeChart)
                .colors('lightgrey')
                .group(saadRating, 'Saad'),
            dc.lineChart(compositeChart)
                .colors('teal')
                .group(paulRating, 'Paul'),
            dc.lineChart(compositeChart)
                .colors('black')
                .group(gusRating, 'Gus'),
        ])
        .brushOn(false)
        .render();


    //Goals/assists per person chart
    var name_dim = ndx.dimension(dc.pluck('name'));
    var total_goals_per_person = name_dim.group().reduceSum(dc.pluck('goals'));
    var total_assists_per_person = name_dim.group().reduceSum(dc.pluck('assists'));
    var goals_Assists_Stacked_Chart = dc.barChart('#goals-per-person-chart');
    goals_Assists_Stacked_Chart
        .width($(goals_Assists_Stacked_Chart.anchor()).parent().width())
        .height(200)
        .margins({ top: 30, right: 50, bottom: 30, left: 70 })
        .dimension(name_dim)
        .group(total_goals_per_person, "Goals")
        .stack(total_assists_per_person, "Assists")
        .transitionDuration(1000)
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .ordinalColors(['blue', 'white'])
        .legend(dc.legend().x(0).y(10).itemHeight(15).gap(5))
        .yAxis().ticks(4);


    //Goals/asssists per opponent chart
    var opponent_dim = ndx.dimension(dc.pluck('opponent'));
    var total_goals_per_opponent = opponent_dim.group().reduceSum(dc.pluck('goals'));
    var total_assists_per_opponent = opponent_dim.group().reduceSum(dc.pluck('assists'));
    var goalBarChart = dc.barChart('#goals-per-opponent-chart');
    goalBarChart
        .width($(goalBarChart.anchor()).parent().width())
        .height(200)
        .margins({ top: 30, right: 50, bottom: 30, left: 70 })
        .dimension(opponent_dim)
        .group(total_goals_per_opponent, "Goals")
        .stack(total_assists_per_opponent, "Assists")
        .transitionDuration(1000)
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .ordinalColors(['blue', 'white'])
        .legend(dc.legend().x(0).y(10).itemHeight(15).gap(5))
        .yAxis().ticks(4);


    //Pie chart 1
    var name_dim = ndx.dimension(dc.pluck('name'));
    var total_goals_per_person = name_dim.group().reduceSum(dc.pluck('goals'));
    dc.pieChart('#per-person-chart')
        .width(150)
        .height(150)
        .transitionDuration(1000)
        .dimension(name_dim)
        .group(total_goals_per_person)
        //.externalRadiusPadding(300)
        //.externalLabels(true)


    //Pie chart 2
    var opponent_dim = ndx.dimension(dc.pluck('opponent'));
    var total_goals_per_opponenet = opponent_dim.group().reduceSum(dc.pluck('goals'));
    dc.pieChart('#per-store-chart')
        .width(150)
        .height(150)
        .transitionDuration(1000)
        .dimension(opponent_dim)
        .group(total_goals_per_opponent)

    dc.renderAll();
};

var resizing = false;
console.log("Setting var resizing = false");
var resizeTimer;
console.log("setting var resizeTimer");


function resize() {
    if (!resizing) {
        console.log("Setting var resizing = True");
        resizing = true;
        console.log("Set resizeTime");
        resizeTimer = setTimeout("work()", 1000);
    }
    else {
        console.log("clearTimeout");
        clearTimeout(resizeTimer);
        resizing = false
        resize();
    }
}

window.addEventListener('resize', function (event) {
    console.log("Event listener resize fired");
    resize();
})