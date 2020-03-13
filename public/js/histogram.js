const height = 500;
const width = 800;
const margin = { top: 20, right: 20, bottom: 30, left: 40 };

const x = d3
  .scaleLinear()
  .domain(d3.extent(data))
  .nice()
  .range([margin.left, width - margin.right]);

const bins = d3
  .histogram()
  .domain(x.domain())
  .thresholds(x.ticks(40))(data);

const y = d3
  .scaleLinear()
  .domain([0, d3.max(bins, d => d.length)])
  .nice()
  .range([height - margin.bottom, margin.top]);

const xAxis = g =>
  g
    .attr('transform', `translate(0,${height - margin.bottom})`)
    .call(
      d3
        .axisBottom(x)
        .ticks(width / 80)
        .tickSizeOuter(0),
    )
    .call(g =>
      g
        .append('text')
        .attr('x', width - margin.right)
        .attr('y', -4)
        .attr('fill', 'currentColor')
        .attr('font-weight', 'bold')
        .attr('text-anchor', 'end')
        .text(data.x),
    );

const yAxis = g =>
  g
    .attr('transform', `translate(${margin.left},0)`)
    .call(d3.axisLeft(y).ticks(height / 40))
    .call(g => g.select('.domain').remove())
    .call(g =>
      g
        .select('.tick:last-of-type text')
        .clone()
        .attr('x', 4)
        .attr('text-anchor', 'start')
        .attr('font-weight', 'bold')
        .text(data.y),
    );

const svg = d3.create('svg').attr('viewBox', [0, 0, width, height]);

svg
  .append('g')
  .attr('fill', 'steelblue')
  .selectAll('rect')
  .data(bins)
  .join('rect')
  .attr('x', d => x(d.x0) + 1)
  .attr('width', d => Math.max(0, x(d.x1) - x(d.x0) - 1))
  .attr('y', d => y(d.length))
  .attr('height', d => y(0) - y(d.length));

svg.append('g').call(xAxis);

svg.append('g').call(yAxis);

const node = svg.node();

const container = document.getElementById('histogram-container');
container.appendChild(node);
