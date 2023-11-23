function _1(md){return(
md`# HW06`
)}

function _artistpublic(__query,FileAttachment,invalidation){return(
__query(FileAttachment("artistPublic (1) - artistPublic (1).csv"),{from:{table:"artistPublic (1) - artistPublic (1)"},sort:[],slice:{to:null,from:null},filter:[],select:{columns:null}},invalidation)
)}

function _artistver(__query,FileAttachment,invalidation){return(
__query(FileAttachment("artistVer (1) - artistVer (1).csv"),{from:{table:"artistVer (1) - artistVer (1)"},sort:[],slice:{to:null,from:null},filter:[],select:{columns:null}},invalidation)
)}

function _artist_column_key(artistver){return(
Object.keys(artistver[0])[3]
)}

function _artist_column(artistver,artist_column_key){return(
artistver.map(row => row[artist_column_key])
)}

function _artistver_unique_values(artist_column){return(
[...new Set(artist_column)].sort()
)}

function _artist_counts(artistver_unique_values,artist_column){return(
artistver_unique_values.map(val => ({
  value: val,
  count: artist_column.filter(v => v === val).length
}))
)}

function _artistpublic_column_key(artistpublic){return(
Object.keys(artistpublic[0])[4]
)}

function _artistpublic_column(artistpublic,artistpublic_column_key){return(
artistpublic.map(row => String(row[artistpublic_column_key]))
)}

function _artistpublic_unique_values(artistpublic_column){return(
[...new Set(artistpublic_column)].sort()
)}

function _artistpublic_counts(artistpublic_unique_values,artistpublic_column){return(
artistpublic_unique_values.map(val => ({
  value: val,
  count: artistpublic_column.filter(v => v === String(val)).length
}))
)}

function _data(artist_counts,artistpublic_counts){return(
artist_counts.flatMap((item, index) => ([
  {
    value: item.value,
    count: item.count,
    series: 'artist'
  },
  {
    value: item.value,
    count: artistpublic_counts[index].count,
    series: 'artistpublic'
  }
]))
)}

function _selected_series(Inputs){return(
Inputs.checkbox(["artist", "artistpublic"], {label: "Choose datasets", value: ["artist", "artistpublic"]})
)}

function _14(Plot,artist_column_key,data,selected_series){return(
Plot.plot({
  height: 600,
  title: artist_column_key,
  x: {
    label: 'Value',
    domain: data.map(d => d.value),
    padding: 0.1
  },
  y: {
    label: 'Count',
    grid: true
  },
  color: {
    domain: ['artist', 'artistpublic'],
    range: ['#4B6F85', '#FADBE3'],
    legend: true
  },
  marks: [
    Plot.barY(data.filter(d => selected_series.includes(d.series)), Plot.stackY({ 
      x: "value",
      y: "count",
      fill: "series",
      title: d => `${d.series}\nvalue: ${d.value}\ncount: ${d.count}`
    }))
  ]
})
)}

function _selected_series_1(Inputs){return(
Inputs.checkbox(["artist", "artistpublic"], {label: "Choose datasets", value: ["artist", "artistpublic"]})
)}

function _chart(data,selected_series_1,d3)
{
  const margin = {top: 20, right: 30, bottom: 30, left: 40};
  const width  = 500 - margin.left - margin.right;
  const height = 400 - margin.top - margin.bottom;

  const keys         = Array.from(new Set(data.map(d => d.series)));
  const filteredData = data.filter(d => selected_series_1.includes(d.series));

  
  let grouped = Array.from(d3.group(filteredData, d => d.value), ([key, value]) => {
    return {value: key, ...Object.fromEntries(value.map(obj => [obj.series, obj.count]))};
  });

  
  const stack  = d3.stack().keys(keys);
  const series = stack(grouped);
  
  
  const xScale = d3.scaleBand()
    .domain(data.map(d => d.value))
    .range([0, width])
    .padding(0.1);

  const yMax = d3.max(series, serie => d3.max(serie, d => d[1]));
  const yScale = d3.scaleLinear()
      .domain([0, yMax]).nice()
      .range([height, 0]);

  const colorScale = d3.scaleOrdinal()
    .domain(keys)
    .range(['#4B6F85', '#FADBE3']);

  
  const svg = d3.create("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom);

  const g = svg.append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);


  series.forEach((serie) => {
      let bars = g.append("g")
          .attr("fill", colorScale(serie.key))
          .selectAll("rect")
          .data(serie);
  
      bars.enter().append("rect")
          .attr("x", d => xScale(d.data.value))
          .attr("y", height)
          .attr("width", xScale.bandwidth())
          .attr("height", 0)

          .attr("y", d => yScale(d[1]))
          .attr("height", d => yScale(d[0]) - yScale(d[1]));
  });


  g.append("g")
    .attr("transform", `translate(0,${height})`)
    .call(d3.axisBottom(xScale));

  g.append("g")
    .call(d3.axisLeft(yScale));

  
  return svg.node();
}


function _chart1(data,selected_series_1,d3)
{
  // 定義邊界大小，以及圖形的寬度和高度
  const margin = {top: 20, right: 30, bottom: 30, left: 40};
  const width  = 500 - margin.left - margin.right;
  const height = 400 - margin.top - margin.bottom;
  
  const keys = Array.from(new Set(data.map(d => d.series)));
  

  const filteredData = data.filter(d => selected_series_1.includes(d.series));


  let grouped = Array.from(d3.group(filteredData, d => d.value), ([key, value]) => {
    return {value: key, ...Object.fromEntries(value.map(obj => [obj.series, obj.count]))};
  });


  const stack = d3.stack().keys(keys);
  const series = stack(grouped);
  
  // 定義x軸的比例尺
  const xScale = d3.scaleBand()
    .domain(data.map(d => d.value))
    .range([0, width])
    .padding(0.1);

  // 定義y軸的比例尺
  const yMax = d3.max(series, serie => d3.max(serie, d => d[1]));
  const yScale = d3.scaleLinear()
      .domain([0, yMax]).nice()
      .range([height, 0]);

  // 定義顏色的比例尺
  const colorScale = d3.scaleOrdinal()
    .domain(keys)
    .range(['#4B6F85', '#FADBE3']);

  // 創建SVG元素
  const svg = d3.create("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom);

  // 在SVG中添加一個包含所有內容的g元素(對它進行一個平移變換，以便為接下來的元素提供一個留白的區域)
  const g = svg.append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  // 繪製每一個系列的柱子
  series.forEach((serie) => {
      let bars = g.append("g")
          .attr("fill", colorScale(serie.key))
          .selectAll("rect")
          .data(serie);
  
      bars.enter().append("rect")
          .attr("x", d => xScale(d.data.value))
          .attr("y", height)
          .attr("width", xScale.bandwidth())
          .attr("height", 0)
        //新增以下兩行可新增出過渡效果
          .transition() 
          .duration(1000) //改為0可以呈現無過度效果
        //新增到這兩行可新增出過渡效果
          .attr("y", d => yScale(d[1]))
          .attr("height", d => yScale(d[0]) - yScale(d[1]));
  });

  // 繪製x軸
  g.append("g")
    .attr("transform", `translate(0,${height})`)
    .call(d3.axisBottom(xScale));

  // 繪製y軸
  g.append("g")
    .call(d3.axisLeft(yScale));

  return svg.node();
}


export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["artistPublic (1) - artistPublic (1).csv", {url: new URL("./artistPublic (1) - artistPublic (1).csv", import.meta.url), mimeType: "text/csv", toString}],
    ["artistVer (1) - artistVer (1).csv", {url: new URL("./artistPublic (1) - artistPublic (1).csv", import.meta.url), mimeType: "text/csv", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("artistpublic")).define("artistpublic", ["__query","FileAttachment","invalidation"], _artistpublic);
  main.variable(observer("artistver")).define("artistver", ["__query","FileAttachment","invalidation"], _artistver);
  main.variable(observer("artist_column_key")).define("artist_column_key", ["artistver"], _artist_column_key);
  main.variable(observer("artist_column")).define("artist_column", ["artistver","artist_column_key"], _artist_column);
  main.variable(observer("artistver_unique_values")).define("artistver_unique_values", ["artist_column"], _artistver_unique_values);
  main.variable(observer("artist_counts")).define("artist_counts", ["artistver_unique_values","artist_column"], _artist_counts);
  main.variable(observer("artistpublic_column_key")).define("artistpublic_column_key", ["artistpublic"], _artistpublic_column_key);
  main.variable(observer("artistpublic_column")).define("artistpublic_column", ["artistpublic","artistpublic_column_key"], _artistpublic_column);
  main.variable(observer("artistpublic_unique_values")).define("artistpublic_unique_values", ["artistpublic_column"], _artistpublic_unique_values);
  main.variable(observer("artistpublic_counts")).define("artistpublic_counts", ["artistpublic_unique_values","artistpublic_column"], _artistpublic_counts);
  main.variable(observer("data")).define("data", ["artist_counts","artistpublic_counts"], _data);
  main.variable(observer("viewof selected_series")).define("viewof selected_series", ["Inputs"], _selected_series);
  main.variable(observer("selected_series")).define("selected_series", ["Generators", "viewof selected_series"], (G, _) => G.input(_));
  main.variable(observer()).define(["Plot","artist_column_key","data","selected_series"], _14);
  main.variable(observer("viewof selected_series_1")).define("viewof selected_series_1", ["Inputs"], _selected_series_1);
  main.variable(observer("selected_series_1")).define("selected_series_1", ["Generators", "viewof selected_series_1"], (G, _) => G.input(_));
  main.variable(observer("chart")).define("chart", ["data","selected_series_1","d3"], _chart);
  main.variable(observer("chart1")).define("chart1", ["data","selected_series_1","d3"], _chart1);
  return main;
}
