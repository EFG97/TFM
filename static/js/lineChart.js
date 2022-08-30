function lineChart(data){
    // set the dimensions and margins of the graph
    var width = document.getElementById('line-chart').clientWidth;
    var height = width;
    var margin = {"top":width/8,"bottom":width/8,"left":width/8,"right":width/10};

    var sumstat = d3.nest() // nest function allows to group the calculation per level of a factor
        .key(function(d) { return d.prediction;})
        .entries(data);

    // append the svg object to the body of the page
    var elemento_SVG = d3.select("#line-chart")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
    
    var escalaX = d3.scaleTime()
        .domain(d3.extent(data, function(d) { return new Date(d.date); }))
        .range([margin.left, width - margin.right]); 

    var escalaY = d3.scaleLinear()
        .domain(d3.extent(data,d=>d.count))
        .range([height-margin.bottom,margin.top])

    // var res = sumstat.map(function(d){ return d.key }) 
    res = ['positive','negative','neutral']

    var color = d3.scaleOrdinal()
        .domain(res)
        .range(["#4595FF","#FFAF45","#B0B0B0"]);

    ejeX = d3.axisBottom()
        .scale(escalaX)
        //.tickFormat(d3.timeFormat("%Y-%m-%d"))

    ejeY = d3.axisLeft()
        .scale(escalaY)

    //ELEMENTO TOOLTIP (contenedor html en el body)
    var tooltip = d3.select("#bubble_chart")
        .append("div")
        .attr("class","tooltip")

    function pintarTooltip(d){
        tooltip
            .text(d.key)
            .style("top",(d3.event.pageY)+"px") //d3.event.pageX / .pagey solo disponible en la versión 5 de d3.
            .style("left",(d3.event.pageX)+"px")
            .transition()
            .duration(400)
            .style("opacity",1)
    }

    function borrarTooltip(){
        tooltip    
            // .transition()
            .style("opacity",0)         
    }


    // EJES
    elemento_SVG
        .append("g")
        .attr("transform","translate(0," + (height - 0.75*margin.bottom) + ")")
        .call(ejeX)
        //.style("stroke-width",2)
        //.style("font-weight", "bolder")
        
        .selectAll("text")  
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", "rotate(-65)")
        ;

    elemento_SVG
        .append("g")
        .attr("transform","translate("+ (margin.left) +",0)")
        //.transition()
        //.duration(500)
        //.ease(d3.easeBounce)
        //.delay(500)
        .call(ejeY)
        .attr("color","black")
        //.style("stroke-width",2)
        //.style("font-weight", "bolder")
        .append("text")
        .attr("class", "axis-title")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .attr("fill", "black")
        .attr("transform","translate( 0,40)")
        .text("N comments")

    // 
    elemento_SVG
        .selectAll(".line")
        .data(sumstat)
        .enter()
        .append("path")
        .attr("fill", "none")
        .attr("stroke", function(d){ return color(d.key) })
        .attr("stroke-width", 3)
        .attr("d", function(d){
            return d3.line()
            .x(function(d) { return escalaX( new Date(d.date)); })
            .y(function(d) { return escalaY(d.count); })
            (d.values)
        })
        .on("mouseover",function(d){
            pintarTooltip(d)
        })
        .on("mouseout",function(){
            borrarTooltip()
        })
 

}