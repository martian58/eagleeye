
function createStars() {
  const numStars = 100;
  const stars = d3
    .select(".stars")
    .selectAll(".star")
    .data(d3.range(numStars))
    .enter()
    .append("div")
    .attr("class", "star")
    .style("left", () => `${Math.random() * 100}%`)
    .style("top", () => `${Math.random() * 100}%`);
}

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
    .force("center", d3.forceCenter(width / 2, height / 2));

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
    .attr("fill", (d) => (d.id === nodes[0].id ? "#fff" : "#ffd700")) // First node is white, others are yellow
    .call(
      d3
        .drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended)
    )
    .on("mouseover", function (event, d) {
      d3.select(this).classed("shine", true);
    })
    .on("mouseout", function (event, d) {
      d3.select(this).classed("shine", false);
    });

  const label = g
    .append("g")
    .attr("class", "labels")
    .selectAll("text")
    .data(nodes)
    .enter()
    .append("text")
    .attr("class", "label")
    .attr("dy", -15)
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

// $(document).ready(function () {
//   createStars(); // Create stars in the background
//   $.ajax({
//     // url: "{% url 'scan_network' %}",
//     url: "/scan_network/",
//     method: "GET",
//     success: function (data) {
//       updateVisualization(data.devices);
//     },
//     error: function () {
//       alert("Error occurred while scanning the network.");
//     },
//   });
// });

document.addEventListener('DOMContentLoaded', function() {
  fetch('/scan_network/')
      .then(response => response.json())
      .then(data => {
          updateVisualization(data.devices)
      })
      .catch(error => console.error("Error occurred while scanning the network.", error));
});

// document.addEventListener('DOMContentLoaded', function() {
//   createStars(); // Create stars in the background
//   $.ajax({
//     // url: "{% url 'scan_network' %}",
//     url: "/scan_network/",
//     method: "GET",
//     success: function (data) {
//       updateVisualization(data.devices);
//     },
//     error: function () {
//       alert("Error occurred while scanning the network.");
//     },
//   });
// });

