function updateVisualization(devices) {
  const nodes = devices.map((device) => ({ id: device.host }));
  const links = nodes.slice(1).map((node) => ({
    source: nodes[0].id, // The first node is the server
    target: node.id,
  }));

  const svg = d3.select("svg");
  svg.selectAll("*").remove(); // Clear the svg content before appending new elements

  const width = window.innerWidth;
  const height = window.innerHeight;

  const zoom = d3
    .zoom()
    .scaleExtent([0.5, 4])
    .on("zoom", (event) => {
      svg.attr("transform", event.transform);
    });

  svg.call(zoom);

  const g = svg.append("g");

  const simulation = d3
    .forceSimulation(nodes)
    .force(
      "link",
      d3
        .forceLink(links)
        .id((d) => d.id)
        .distance(100)
    )
    .force("charge", d3.forceManyBody().strength(-300))
    .force("center", d3.forceCenter(width / 3, height / 3));

  const link = g
    .append("g")
    .attr("class", "links")
    .selectAll("line")
    .data(links)
    .enter()
    .append("line")
    .attr("class", "link");

  const node = g
    .append("g")
    .attr("class", "nodes")
    .selectAll("circle")
    .data(nodes)
    .enter()
    .append("circle")
    .attr("class", "node")
    .attr("r", 10)
    .call(
      d3
        .drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended)
    );

  const label = g
    .append("g")
    .attr("class", "labels")
    .selectAll("text")
    .data(nodes)
    .enter()
    .append("text")
    .attr("class", "label")
    .attr("dy", -3)
    .text((d) => d.id);

  simulation.on("tick", () => {
    link
      .attr("x1", (d) => d.source.x)
      .attr("y1", (d) => d.source.y)
      .attr("x2", (d) => d.target.x)
      .attr("y2", (d) => d.target.y);

    node.attr("cx", (d) => d.x).attr("cy", (d) => d.y);

    label.attr("x", (d) => d.x).attr("y", (d) => d.y);
  });

  function dragstarted(event, d) {
    if (!event.active) simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
  }

  function dragged(event, d) {
    d.fx = event.x;
    d.fy = event.y;
  }

  function dragended(event, d) {
    if (!event.active) simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;
  }
}

$(document).ready(function () {
  $("#scanButton").click(function () {
    $.ajax({
      url: "{% url 'scan_network' %}",
      method: "GET",
      success: function (data) {
        updateVisualization(data.devices);
      },
      error: function () {
        alert("Error occurred while scanning the network.");
      },
    });
  });
});
