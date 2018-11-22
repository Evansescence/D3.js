// @TODO: YOUR CODE HERE!


var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 50
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;


var svg = d3
  .select("body")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);




d3.csv("assets/data/data.csv").then (function(healthData) {
    console.log(healthData);

    var ic = healthData.map(data => data.id);
    console.log("id", ic);

    healthData.forEach(function(data) {
        data.state = data.state;
    console.log("ID:", data.id);
    console.log("State:", data.state);
    console.log("Abbreviation:", data.abbr);
    console.log("Poverty:", data.poverty);
    console.log("PovertyMOE:", data.povertyMoe);
    console.log("Age:", data.age);
    console.log("ageMOE:", data.ageMoe);
    console.log("Income:", data.income);
    console.log("incomeMOE:", data.incomeMoe);
    console.log("No_Health_Insurance:", data.noHealthInsurance);
    console.log("Obesity:", data.obesity);
    console.log("Smokes", data.smokes);
});
});
// Create Scales
var xLinearScale = d3.scaleLinear()
.domain(d3.extent(healthData, d => d.smokes))
.range([0, width]);

var yLinearScale1 = d3.scaleLinear()
.domain([0, d3.max(healthData, d => d.age)]
.range([height, 0]);

// Create Axes
var bottomAxis = d3.axisBottom(xLinearScale).tickFormat(d3.timeFormat("%d-%b"));
var leftAxis = d3.axisLeft(yLinearScale);

chartGroup.append("g").attr("transform", `translate(0, ${height})`).call(bottomAxis);

  // Add leftAxis to the left side of the display
  chartGroup.append("g").call(leftAxis);

// Line generator
  var line1 = d3
    .line()
    .x(d => xLinearScale(d.smokes))
    .y(d => yLinearScale1(d.age));

// Append a path for line
    chartGroup.append("path")
    .data([healthData])
    .attr("d", line1)
    .classed("line green", true);

    

//https://factfinder.census.gov/faces/nav/jsf/pages/searchresults.xhtml