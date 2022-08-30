function legend(){
    //DIMENSIONES DEL GRÁFICO
    var width = document.getElementById('legend').clientWidth;
    var height = 0.5*width;
    var margin = {"top":width/8,"bottom":width/8,"left":width/8,"right":width/8};

    var SVG = d3.select("#legend")
        .append("svg")
        .attr("width",width)
        .attr("height",height)

    // create a list of keys
    var keys = ["positive","negative","neutral"]

    // Usually you have a color scale in your chart already
    var color = d3.scaleOrdinal()
        .domain(keys)
        .range(["#4595FF","#FFAF45","#B0B0B0"]);

    // Add one dot in the legend for each name.
    var size = width/15

    SVG.selectAll("mydots")
    .data(keys)
    .enter()
    .append("rect")
        .attr("x", margin.left)
        .attr("y", function(d,i){ return margin.top + i*(size+0.5*size)}) // 100 is where the first dot appears. 25 is the distance between dots
        .attr("width", size)
        .attr("height", size)
        .style("fill", function(d){ return color(d)})

    // Add one dot in the legend for each name.
    SVG.selectAll("mylabels")
    .data(keys)
    .enter()
    .append("text")
        .attr("x", margin.left + size*1.2)
        .attr("y", function(d,i){ return margin.top + i*(size+0.5*size) + (size/2)}) // 100 is where the first dot appears. 25 is the distance between dots
        //.style("fill", function(d){ return color(d)})
        .text(function(d){ return d})
        .attr("text-anchor", "left")
        .style("alignment-baseline", "middle")
        .style("font-size",width/15)
}