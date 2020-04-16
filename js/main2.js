$(document).ready(function () {
    console.log("ready!");

    const nameChart = dc.rowChart("#nameType");
    const opponentChart = dc.rowChart("#opponentType");

    //Get data
    d3.json('data/stats.json').then(function (data, err) {
        if (err) throw err;
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

        const nameDim = ndx.dimension(function (d) { return d.name; });
        const opponentDim = ndx.dimension(function (d) { return d.opponent; });
        const nameGroup = nameDim.group();
        const opponentGroup = opponentDim.group();

        nameChart
            .dimension(nameDim)
            .group(nameGroup)
            .height(500)
            //.data(function(group) { return group.top(3)})
            //.x(d3.scaleBand())
            //.xUnits(dc.units.ordinal)
            ;

        opponentChart
            .dimension(opponentDim)
            .group(opponentGroup)
            .height(500)
            //.elasticX(true)
            //.x(d3.scaleBand())
            //.xUnits(dc.units.ordinal)
            ;


        dc.renderAll();
    });
});