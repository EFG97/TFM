function bubbleChart(datos){

    //DIMENSIONES DEL GRÁFICO
    var width = document.getElementById('bubble_chart').clientWidth;
    var height = width;
    var margin = {"top":width/8,"bottom":width/8,"left":width/8,"right":width/10};

    //ESCALAS
    escalaX = d3.scaleLinear()
        .domain([-1,1])
        .range([margin.left,width-margin.right])

    escalaY = d3.scaleLinear()
        .domain(d3.extent(datos,d=>d.likeCount))
        .range([height - margin.bottom,margin.top])

    escalaTamanio = d3.scaleLinear()
        .domain(d3.extent(datos,d=>d.likeCount))
        .range([width/100,width/12])

    escalaColor = d3.scaleLinear()
        .domain([-1,1])
        .range(["#FFAF45","#4595FF"])

    //ELEMENTO TOOLTIP (contenedor html en el body)
    var tooltip = d3.select("#bubble_chart")
        .append("div")
        .attr("class","tooltip")

    // FUNCIONES PARA PINTAR TOOLTIP
    function pintarTooltip(d){
        tooltip
            .text("Polarity:" + d.prediction.compound + "------Like Count:" +  d.likeCount + "------Text: " + d.textDisplay)
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

    // ELEMENTO SVG
    var elemento_SVG = d3.select("#bubble_chart")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
    
    elemento_SVG
        .append("rect")
        .attr("width",(width-margin.left-margin.right)/2)
        .attr("height",(height-margin.top-margin.bottom))
        .attr("x",(width-margin.left-margin.right)/2+margin.left)
        //.attr("rx",width/40)
        //.attr("ry",width/40)
        .attr("y",margin.top)
        .style("fill","#F6F6F6")


    /*
    elemento_SVG
        .append("line")
        .attr("y1",height-margin.bottom)
        .attr("y2",margin.top)
        .attr("x1",width/2)
        .attr("x2",width/2)
        .attr("stroke","#CBCBCB")
        .attr("stroke-width","1")
        .attr("stroke-dasharray","5,5")
    */

    elemento_SVG
        .selectAll("circle")
        .data(datos)
        .enter()
        .append("circle")
        // FILTROS
        //.filter(function(d){return d.votantes>400;}) 

        .attr("r",d=>escalaTamanio(d.likeCount))
        .attr("cx",d=>escalaX(d.prediction.compound))
        .attr("cy",d=>escalaY(d.likeCount))
        .attr("fill",d=>escalaColor(d.prediction.compound))
        //gestionamos enventos mouseover y mouseout
        //.attr('class','saturate')
        
 
        .on("mouseover",function(d){
            d3.select(this).attr("class","saturate");
            pintarTooltip(d)
        })
        .on("mouseout",function(){
            d3.select(this).attr("class","none");
            borrarTooltip()
        })
 
        /*
        .on("mouseover",d=>{
            //pintarHistograma(d.partido)
            pintarTooltip(d)
        })*/
        
        //.on("mouseout",borrarTooltip)


    //EJES PRIMERA GRÁFICA
    ejeY = d3.axisLeft()
        .scale(escalaY)

    ejeX = d3.axisBottom()
        .scale(escalaX)

    elemento_SVG
        .append("g")
        .attr("transform","translate(0," + (height - 0.75*margin.bottom) + ")")
        .call(ejeX)
        //.style("stroke-width",2)
        //.style("font-weight", "bolder")
        .append("text")
        .attr("class", "axis-title")
        .attr("x", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .attr("fill", "black")
        .attr("transform","translate("+ (width - 0.75*margin.left) +","+  (0.4*margin.bottom) + ")")
        .text("Polarity");


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
        .text("Like Count")
        
        

        ;

    // Título
    /*
    elemento_SVG
        .append("text")
        .attr("x", margin.left*4)             
        .attr("y", margin.top/2)
        .attr("text-anchor", "middle")  
        .style("font-size", "16px") 
        .style("text-decoration", "underline")  
        .text("Value vs Date Graph");
    */
    
}