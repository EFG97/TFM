function pieChart(data){
    

    
    // set the dimensions and margins of the graph
    var width = document.getElementById('pie_chart').clientWidth/1.20;
    var height = width
    var margin = width/10

    // The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
    var radius = Math.min(width, height) / 2 - margin

    // append the svg object to the div called 'my_dataviz'
    var svg = d3.select("#pie_chart")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
    

    // set the color scale
    var color = d3.scaleOrdinal()
        .domain(data)
        .range(["#4595FF","#FFAF45","#B0B0B0"]);

    // Compute the position of each group on the pie:
    var pie = d3.pie()
        .value(function(d) {return d.value; })
    var data_ready = pie(d3.entries(data))
    // Now I know that group A goes from 0 degrees to x degrees and so on.

    // shape helper to build arcs:
    var arcGenerator = d3.arc()
        .innerRadius(0)
        .outerRadius(radius)

    //ELEMENTO TOOLTIP (contenedor html en el body)
    var tooltip = d3.select("#pie_chart")
        .append("div")
        .attr("class","tooltip")

    function pintarTooltip(d){
        tooltip
            .text(d.data.key + ": " + d.data.value)
            .style("top",(d3.event.pageY)+"px") //d3.event.pageX / .pagey solo disponible en la versión 5 de d3.
            .style("left",(d3.event.pageX)+"px")
            .transition()
            .style("opacity",1)
    }
    
    function borrarTooltip(){
        tooltip    
            // .transition()
            .style("opacity",0)         
    }

    // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
    svg
        .selectAll('mySlices')
        .data(data_ready)
        .enter()
        .append('path')
        .attr('d', arcGenerator)
        .attr('fill', function(d){ return(color(d.data.key)) })
        //.attr("stroke", "black")
        //.style("stroke-width", "1px")
        .style("opacity", 0.7)

        .on("mouseover",function(d){
            pintarTooltip(d)
        })
        .on("mouseout",function(){
            borrarTooltip()
        })
    // Now add the annotation. Use the centroid method to get the best coordinates
    
}