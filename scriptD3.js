//Se cargan los datos
var datos = [
    { "dia": 01, "anual": 9234, "ocasional": 15, "total": 9249, "tipo": "Lab lun-vie" },
    { "dia": 02, "anual": 11298, "ocasional": 46, "total": 11344, "tipo": "Lab lun-vie" },
    { "dia": 03, "anual": 11926, "ocasional": 47, "total": 11973, "tipo": "Lab lun-vie" },
    { "dia": 04, "anual": 12057, "ocasional": 38, "total": 12095, "tipo": "Lab lun-vie" },
    { "dia": 05, "anual": 12844, "ocasional": 15, "total": 12859, "tipo": "Lab lun-vie" },
    { "dia": 06, "anual": 10604, "ocasional": 92, "total": 10696, "tipo": "Sab, dom, fest" },
    { "dia": 07, "anual": 7657, "ocasional": 52, "total": 7709, "tipo": "Sab, dom, fest" },
    { "dia": 08, "anual": 8122, "ocasional": 10, "total": 8132, "tipo": "Lab lun-vie" },
    { "dia": 09, "anual": 11733, "ocasional": 27, "total": 11760, "tipo": "Lab lun-vie" },
    { "dia": 10, "anual": 12034, "ocasional": 48, "total": 12082, "tipo": "Lab lun-vie" },
    { "dia": 11, "anual": 12972, "ocasional": 30, "total": 13002, "tipo": "Lab lun-vie" },
    { "dia": 12, "anual": 13534, "ocasional": 47, "total": 13581, "tipo": "Lab lun-vie" },
    { "dia": 13, "anual": 10868, "ocasional": 119, "total": 10987, "tipo": "Sab, dom, fest" },
    { "dia": 14, "anual": 9098, "ocasional": 159, "total": 9257, "tipo": "Sab, dom, fest" },
    { "dia": 15, "anual": 11262, "ocasional": 25, "total": 11287, "tipo": "Lab lun-vie" },
    { "dia": 16, "anual": 12175, "ocasional": 69, "total": 12244, "tipo": "Lab lun-vie" },
    { "dia": 17, "anual": 12519, "ocasional": 60, "total": 12579, "tipo": "Lab lun-vie" },
    { "dia": 18, "anual": 12430, "ocasional": 30, "total": 12460, "tipo": "Lab lun-vie" },
    { "dia": 19, "anual": 8139, "ocasional": 39, "total": 8178, "tipo": "Sab, dom, fest" },
    { "dia": 20, "anual": 8985, "ocasional": 71, "total": 9056, "tipo": "Sab, dom, fest" },
    { "dia": 21, "anual": 8457, "ocasional": 82, "total": 8539, "tipo": "Sab, dom, fest" },
    { "dia": 22, "anual": 11208, "ocasional": 50, "total": 11258, "tipo": "Lab lun-vie" },
    { "dia": 23, "anual": 12706, "ocasional": 39, "total": 12745, "tipo": "Lab lun-vie" },
    { "dia": 24, "anual": 13126, "ocasional": 16, "total": 13142, "tipo": "Lab lun-vie" },
    { "dia": 25, "anual": 13141, "ocasional": 35, "total": 13176, "tipo": "Lab lun-vie" },
    { "dia": 26, "anual": 12701, "ocasional": 56, "total": 12757, "tipo": "Lab lun-vie" },
    { "dia": 27, "anual": 9902, "ocasional": 134, "total": 10036, "tipo": "Sab, dom, fest" },
    { "dia": 28, "anual": 9045, "ocasional": 123, "total": 9168, "tipo": "Sab, dom, fest" },
    { "dia": 29, "anual": 10479, "ocasional": 88, "total": 10567, "tipo": "Lab lun-vie" }
];

console.log(datos)

//Personalización de márgenes en el área de trabajo
var margin = { top: 150, right: 40, bottom: 70, left: 100 },
    width = 600 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;


//Creación de objeto SVG para el body
var svg = d3.select("body")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

//Creación y visualización del eje horizontal (X) para la gráfica lineal
var x = d3.scaleLinear()
    .domain(d3.extent(datos, function(d) { return d.dia; }))
    .range([0, width]);

svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

//Creación y visualización del eje vertical (Y) para la gráfica lineal
var y = d3.scaleLinear()
    .domain([0, d3.max(datos, function(d) { return +d.total; }) * 1.15])
    .range([height, 0]);

svg.append("g")
    .call(d3.axisLeft(y));

svg.append("text")
    .attr("x", -80)
    .attr("y", -8)
    .text("Uso total por dia");

//Creación de gráfica lineal
svg.append("path")
    .datum(datos)
    .attr("fill", "none")
    .attr("stroke", "#69b3a2")
    .attr("stroke-width", 1.5)
    .attr("d", d3.line()
        .x(function(d) { return x(d.dia) })
        .y(function(d) { return y(d.total) })
    )

//Creación del primer tooltip
var Tooltip = d3.select("body")
    .append("div")
    .attr("class", "tooltip")

//Función para el primer tooltip cuando el cursor se posiciona sobre un punto del gráfico dejándolo demarcado
var mouseover = function(d) {
    Tooltip.style("opacity", 1)
    d3.select(this)
        .style("stroke", "black")
        .style("opacity", 1)
}

//Función para el primer tootltip cuando el cursor se posiciona sobre un punto del gráfico mostrando la información
var mousemove = function(d) {
    Tooltip.html("<p style='color:#022920;'>Dia: " + d.dia + "<br/> <b>" + d.total.toFixed(2) + "</b> Bicis</p>")
        .style("top", d3.event.pageY + 20 + "px")
        .style("left", d3.event.pageX + 20 + "px")
        .transition()
        .style("opacity", 1)
}

//Función para borrar el primer tooltip cuando el cursor se aleja
var mouseleave = function(d) {
    Tooltip.style("opacity", 0)
    d3.select(this)
        .style("stroke", "none")
        .style("opacity", 0.8)
}

//Adición de puntos a la linea para poder seleccionar más facilmente el día
svg.append("g")
    .selectAll("dot")
    .data(datos)
    .enter()
    .append("circle")
    .attr("cx", function(d) { return x(d.dia) })
    .attr("cy", function(d) { return y(d.total) })
    .attr("r", 3)
    .attr("fill", "#69b3a2")
    .on("mouseover", mouseover)
    .on("mousemove", d => {
    	pintarBarrasAnuales(d.dia) ////////////////////AQUI LLAMA A LA FUNCION Y PINTA LA GRAFICA DE BARRAS DEL BONO ANUAL///////////////////////
    	pintarBarrasOcasionales(d.dia) ////////////////////AQUI LLAMA A LA FUNCION Y PINTA LA GRAFICA DE BARRAS DEL BONO OCASIONAL///////////////////////
        mousemove(d)
    })
    .on("mouseleave", mouseleave);







/////////////////////////////////////SEGUNDO SVG//////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////  

var margin2 = { top: 20, right: 40, bottom: 200, left: 160 },
width = 800 - margin.left - margin.right,
height = 500 - margin.top - margin.bottom;


//Creación de segundo SVG para la gráfica de barras
var svg2 = d3.select("body")
            .append("svg")
		    .attr("width", width + margin2.left + margin2.right)
		    .attr("height", height + margin2.top + margin2.bottom)
	        .append("g")
		    .attr("transform", "translate(" + margin2.left + "," + margin2.top + ")");

//Creación del segundo tooltip
var Tooltip2 = d3.select("body")
                 .append("div")
                 .attr("class","tooltip")

//Función para el segundo tooltip cuando el cursor se posiciona sobre una barra del gráfico dejándolo demarcado
var mouseover2 = function(d) {
    Tooltip2.style("opacity", 1)
    d3.select(this)
      .style("stroke", "black")
      .style("opacity", 1)
}

//Función para el segundo tootltip cuando el cursor se posiciona sobre un punto del gráfico mostrando la información
var mousemove2 = function(d) {
    Tooltip2.html("<p style='color:#022920;'>Dia: "+d.dia+"<br/> <b>"+d.anual.toFixed(2)+"</b> Usuarios con bono anual</p>")				
			.style ("top", d3.event.pageY + 20 + "px")
			.style ("left", d3.event.pageX + 20 + "px")
			.transition()
			.style("opacity",1)
  }

//Función para borrar el segundo tooltip cuando el cursor se aleja
var mouseleave2 = function(d) {
    Tooltip2.style("opacity", 0)
	d3.select(this)
	  .style("stroke", "none")
	  .style("opacity", 0.8)
}

//Creación y visualización del eje horizontal (X) para la gráfica de barras
var x = d3.scaleBand()
	      .range([ 0, width])
	      .domain(datos.map(function(d) { return d.dia; }))
          .padding(0.3);

svg2.append("g")
    .attr("transform", "translate(0," + height + ")")
	.call(d3.axisBottom(x));


////Creación y visualización del eje vertical (Y) para la gráfica de barras
var y = d3.scaleLinear()
	      .domain([0, d3.max(datos, function(d) { return +d.anual; })])
	      .range([ height, 0]);

svg2.append("g")
    .call(d3.axisLeft(y));

svg2.append("text")
    .attr("x",-80)
    .attr("y",-8 )
    .text("Bono Anual");


	 //Función que realiza la gráfica de barras secundaria recibiendo como para parámetro el dia a filtrar
    function pintarBarrasAnuales (diaseleccionado) {
        
        //Filtro de dataset con el dia que se selecciona para pintar las barras
	 	datosFiltrados = datos.filter(function (d) { return d.dia === diaseleccionado; });	

        //Creación de la gráfica de barras con el dataset del dia seleccionado y actualización cuando se selecciona otro dia
        var selection = svg2.selectAll("rect").data(datosFiltrados)
        
        selection.enter().append("rect")
                         .on("mouseover", mouseover2)
                         .on("mousemove", d => {mousemove2(d)})
                         .on("mouseleave", mouseleave2);
        
        selection.exit().transition().delay(100).duration(300).remove()
        
        selection.transition()
                 .duration(300)
                 .ease(d3.easeLinear)
                 .attr("x", function(d,i) { return x(d.dia); })
			     .attr("y", function(d) { return y(d.anual); })
			     .attr("width", x.bandwidth())
			     .attr("height", function(d) { return height - y(d.anual); })
			     .attr("fill", "#00FCFE")
    }		









/////////////////////////////////////TERCER SVG//////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////  

var margin3 = { top: 20, right: 40, bottom: 40, left: 160 },
width = 800 - margin.left - margin.right,
height = 500 - margin.top - margin.bottom;


//Creación de tercer SVG para la gráfica de barras
var svg3 = d3.select("body")
            .append("svg")
		    .attr("width", width + margin3.left + margin3.right)
		    .attr("height", height + margin3.top + margin3.bottom)
	        .append("g")
		    .attr("transform", "translate(" + margin3.left + "," + margin3.top + ")");

//Creación del tercer tooltip
var Tooltip3 = d3.select("body")
                 .append("div")
                 .attr("class","tooltip")

//Función para el tercer tooltip cuando el cursor se posiciona sobre una barra del gráfico dejándolo demarcado
var mouseover3 = function(d) {
    Tooltip3.style("opacity", 1)
    d3.select(this)
      .style("stroke", "black")
      .style("opacity", 1)
}

//Función para el tercer tootltip cuando el cursor se posiciona sobre un punto del gráfico mostrando la información
var mousemove3 = function(d) {
    Tooltip3.html("<p style='color:#022920;'>Dia: "+d.dia+"<br/> <b>"+d.ocasional.toFixed(2)+"</b> Usuarios con bono ocasional</p>")				
			.style ("top", d3.event.pageY + 20 + "px")
			.style ("left", d3.event.pageX + 20 + "px")
			.transition()
			.style("opacity",1)
  }

//Función para borrar el tercer tooltip cuando el cursor se aleja
var mouseleave3 = function(d) {
    Tooltip3.style("opacity", 0)
	d3.select(this)
	  .style("stroke", "none")
	  .style("opacity", 0.8)
}

//Creación y visualización del eje horizontal (X) para la gráfica de barras
var x = d3.scaleBand()
	      .range([ 0, width])
	      .domain(datos.map(function(d) { return d.dia; }))
          .padding(0.3);

svg3.append("g")
    .attr("transform", "translate(0," + height + ")")
	.call(d3.axisBottom(x));


////Creación y visualización del eje vertical (Y) para la gráfica de barras
var y = d3.scaleLinear()
	      .domain([0, d3.max(datos, function(d) { return +d.ocasional; })])
	      .range([ height, 0]);

svg3.append("g")
    .call(d3.axisLeft(y));

svg3.append("text")
    .attr("x",-80)
    .attr("y",-8 )
    .text("Bono Ocasional");



	// //Función que realiza la gráfica de barras secundaria recibiendo como para parámetro el dia a filtrar
    function pintarBarrasOcasionales (diaseleccionado) {
        
        //Filtro de dataset con el dia que se selecciona para pintar las barras
	 	datosFiltrados = datos.filter(function (d) { return d.dia === diaseleccionado; });	

        //Creación de la gráfica de barras con el dataset del dia seleccionado y actualización cuando se selecciona otro dia
        var selection = svg3.selectAll("rect").data(datosFiltrados)
        
        selection.enter().append("rect")
                         .on("mouseover", mouseover3)
                         .on("mousemove", d => {mousemove3(d)})
                         .on("mouseleave", mouseleave3);
        
        selection.exit().transition().delay(100).duration(300).remove()
        
        selection.transition()
                 .duration(300)
                 .ease(d3.easeLinear)
                 .attr("x", function(d,i) { return x(d.dia); })
			     .attr("y", function(d) { return y(d.ocasional); })
			     .attr("width", x.bandwidth())
			     .attr("height", function(d) { return height - y(d.ocasional); })
			     .attr("fill", "#FE0073")
    }	