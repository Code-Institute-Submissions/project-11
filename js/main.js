var ndx;
queue()//Function from script libraries above
    .defer(d3.json, "data/transactions.json")//This gets the data from json files
    .await(makeGraphs);//makeGraphs is the function declared below

function makeGraphs(error, transactionsData) {
    ndx = crossfilter(transactionsData);
    var parseDate = d3.time.format("%d/%m/%Y").parse;
    transactionsData.forEach(function (d) {
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

    var name_dim = ndx.dimension(dc.pluck('name'));
    var playerName = name_dim.group().reduceCount();  
    console.log(playerName);  
    var select1 = new dc.selectMenu("#select1");
    select1
        .dimension(name_dim)
        .group(playerName)
        .title(function(d) {
            return d.key;
        })
        //.multiple(true)
        //.numberVisible(16)
        .controlsUseVisibility(true);

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
        .legend(dc.legend().x(555).y(10).itemHeight(15).gap(5))
        .margins({ top: 30, right: 50, bottom: 30, left: 50 })

    var name_dim = ndx.dimension(dc.pluck('name'));
    var total_goals_per_person = name_dim.group().reduceSum(dc.pluck('goals'));
    var total_assists_per_person = name_dim.group().reduceSum(dc.pluck('assists'));
    var goals_Assists_Stacked_Chart = dc.barChart('#goals-per-person-chart');
    goals_Assists_Stacked_Chart
        .width($(goals_Assists_Stacked_Chart.anchor()).parent().width())
        .height(200)
        .margins({ top: 30, right: 50, bottom: 30, left: 50 })
        .dimension(name_dim)
        .group(total_goals_per_person, "Goals")
        .stack(total_assists_per_person, "Assists")
        .transitionDuration(1000)
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .ordinalColors(['blue', 'white'])
        .legend(dc.legend().x(555).y(10).itemHeight(15).gap(5))
        .yAxis().ticks(4);

    var opponent_dim = ndx.dimension(dc.pluck('opponent'));
    var total_goals_per_opponent = opponent_dim.group().reduceSum(dc.pluck('goals'));
    var total_assists_per_opponent = opponent_dim.group().reduceSum(dc.pluck('assists'));
    var goalBarChart = dc.barChart('#goals-per-opponent-chart');
    goalBarChart
        .width($(goalBarChart.anchor()).parent().width())
        .height(200)
        .margins({ top: 30, right: 50, bottom: 30, left: 50 })
        .dimension(opponent_dim)
        .group(total_goals_per_opponent, "Goals")
        .stack(total_assists_per_opponent, "Assists")
        .transitionDuration(1000)
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .ordinalColors(['blue', 'white'])
        .legend(dc.legend().x(560).y(10).itemHeight(15).gap(5))
        .yAxis().ticks(4);

    var date_dim = ndx.dimension(dc.pluck('date'));
    var minDate = date_dim.bottom(1)[0].date;
    var maxDate = date_dim.top(1)[0].date;
    function spend_by_name(name) {
        return function (d) {
            if (d.name === name) {
                return d.rating;
            } else {
                return 0;
            }
        }
    };

    var jamieSpendByMonth = date_dim.group().reduceSum(spend_by_name('Jamie'));
    var joshfSpendByMonth = date_dim.group().reduceSum(spend_by_name('Josh F'));
    var joshrSpendByMonth = date_dim.group().reduceSum(spend_by_name('Josh R'));
    var jamesSpendByMonth = date_dim.group().reduceSum(spend_by_name('James'));
    var jackSpendByMonth = date_dim.group().reduceSum(spend_by_name('Jack'));
    var seanSpendByMonth = date_dim.group().reduceSum(spend_by_name('Sean'));
    var ralphSpendByMonth = date_dim.group().reduceSum(spend_by_name('Ralph'));
    var alexSpendByMonth = date_dim.group().reduceSum(spend_by_name('Alex'));
    var pavanSpendByMonth = date_dim.group().reduceSum(spend_by_name('Pavan'));
    var tadghSpendByMonth = date_dim.group().reduceSum(spend_by_name('Tadgh'));
    var coleSpendByMonth = date_dim.group().reduceSum(spend_by_name('Cole'));
    var leeSpendByMonth = date_dim.group().reduceSum(spend_by_name('Lee'));
    var marcusSpendByMonth = date_dim.group().reduceSum(spend_by_name('Marcus'));
    var saadSpendByMonth = date_dim.group().reduceSum(spend_by_name('Saad'));
    var paulSpendByMonth = date_dim.group().reduceSum(spend_by_name('Paul'));
    var gusSpendByMonth = date_dim.group().reduceSum(spend_by_name('Gus'));

    var compositeChart = dc.compositeChart('#composite-chart');
    compositeChart
        .width($(compositeChart.anchor()).parent().width())
        .height(200)
        .margins({ top: 30, right: 50, bottom: 30, left: 50 })
        .dimension(date_dim)
        .transitionDuration(1000)
        .x(d3.time.scale().domain([minDate, maxDate]))
        .yAxisLabel("Spend")
        .legend(dc.legend().x(560).y(0).itemHeight(13).gap(5))
        .renderHorizontalGridLines(true)
        .compose([
            dc.lineChart(compositeChart)
                .colors('green')
                .group(jamieSpendByMonth, 'Jamie'),
            dc.lineChart(compositeChart)
                .colors('red')
                .group(joshfSpendByMonth, 'Josh F'),
            dc.lineChart(compositeChart)
                .colors('blue')
                .group(joshrSpendByMonth, 'Josh R'),
            dc.lineChart(compositeChart)
                .colors('maroon')
                .group(jackSpendByMonth, 'Jack'),
            dc.lineChart(compositeChart)
                .colors('yellow')
                .group(jamesSpendByMonth, 'James'),
            dc.lineChart(compositeChart)
                .colors('pink')
                .group(seanSpendByMonth, 'Sean'),
            dc.lineChart(compositeChart)
                .colors('tomato')
                .group(ralphSpendByMonth, 'Ralph'),
            dc.lineChart(compositeChart)
                .colors('orange')
                .group(alexSpendByMonth, 'Alex'),
            dc.lineChart(compositeChart)
                .colors('dodgerblue')
                .group(pavanSpendByMonth, 'Pavan'),
            dc.lineChart(compositeChart)
                .colors('mediumseagreen')
                .group(tadghSpendByMonth, 'Tadgh'),
            dc.lineChart(compositeChart)
                .colors('grey')
                .group(coleSpendByMonth, 'Cole'),
            dc.lineChart(compositeChart)
                .colors('slateblue')
                .group(leeSpendByMonth, 'Lee'),
            dc.lineChart(compositeChart)
                .colors('violet')
                .group(marcusSpendByMonth, 'Marcus'),
            dc.lineChart(compositeChart)
                .colors('lightgrey')
                .group(saadSpendByMonth, 'Saad'),
            dc.lineChart(compositeChart)
                .colors('teal')
                .group(paulSpendByMonth, 'Paul'),
            dc.lineChart(compositeChart)
                .colors('black')
                .group(gusSpendByMonth, 'Gus'),
        ])
        .brushOn(false)
        .render();

    var name_dim = ndx.dimension(dc.pluck('name'));
    var total_goals_per_person = name_dim.group().reduceSum(dc.pluck('goals'));
    dc.pieChart('#per-person-chart')
        .width(150)
        .height(150)
        .transitionDuration(1000)
        .dimension(name_dim)
        .group(total_goals_per_person)

    var store_dim = ndx.dimension(dc.pluck('opponent'));
    var total_spend_per_store = store_dim.group().reduceSum(dc.pluck('goals'));
    dc.pieChart('#per-store-chart')
        .width(150)
        .height(150)
        .transitionDuration(1000)
        .dimension(name_dim)
        .group(total_spend_per_store)

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