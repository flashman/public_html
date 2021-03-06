    var width = 1100, height = 650;

    var force = d3.layout.force()
	.size([width, height])
	.linkDistance(40)
	.charge(-100);

    var svg = d3.select("body").append("svg")
	.attr("width", width)
	.attr("height", height)
	.append("g")
	.call(d3.behavior.zoom().scaleExtent([1, 8]).on("zoom", zoom))
    
    svg
	.append("g")
	.append("rect")
	.attr("class", "overlay")
	.attr("width", width)
	.attr("height", height);

    var tooltip = d3.select("body")
	.append("div")
	.style("position", "absolute")
	.style("z-index", "10")
	.style("visibility", "hidden")
	.text("");


    d3.json("coauthorshipNetwork.json", function(error, graph) {
	
	force
	    .nodes(graph.nodes)
	    .links(graph.links)
	    .start();

	var link = svg.selectAll(".link")
	    .data(graph.links)
	    .enter().append("line")
	    .attr("class", "link");

	var node = svg.selectAll(".node")
	    .data(graph.nodes)
	    .enter().append("circle")
	    .attr("class", "node")
	    .attr("r", 4)
	    .attr("transform", function(d) { return "translate(" + d + ")"; })
	    .call(force.drag)
	    .on("mouseover", function(d){ tooltip.text(d.name); return tooltip.style("visibility", "visible");})
	    .on("mousemove", function(){return tooltip.style("top", (event.pageY-10)+"px").style("left",(event.pageX+10)+"px");})
	    .on("mouseout", function(){return tooltip.style("visibility", "hidden");});


	force.on("tick", function() {
	    link.attr("x1", function(d) { return d.source.x; })
		.attr("y1", function(d) { return d.source.y; })
		.attr("x2", function(d) { return d.target.x; })
		.attr("y2", function(d) { return d.target.y; });

	    node.attr("cx", function(d) { return d.x; })
		.attr("cy", function(d) { return d.y; });
	});
    });

    function zoom() {
	//svg.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
    }



