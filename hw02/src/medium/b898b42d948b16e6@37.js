function _1(md){return(
md`# HW2 Medium baseline (4pt)`
)}

function _data(FileAttachment){return(
FileAttachment("data.json").json()
)}

function _y_counts(){return(
[]
)}

function _years(data){return(
data.map(item => item.Year)
)}

function _5(y_counts,years,data)
{
  y_counts.length = 0;
  
  var minYear = Math.min(...years); 
  var maxYear = Math.max(...years);
  
  for (var y = minYear; y <= maxYear; y++) { 
    y_counts.push({year:y, gender:"male"  , count:0}); 
    y_counts.push({year:y, gender:"female", count:0}); 
  }
  
  data.forEach (x=> {
    var i = (x.Year-minYear) * 2 + (x.Gender == "男" ? 0 : 1); 
    y_counts[i].count++;
  })
  
  return y_counts
}


function _6(Plot,y_counts){return(
Plot.plot({
  y: {
    label: "count", 
    grid: true
  },
  marks: [
    Plot.barY(y_counts, {x: "year", y: "count"})
  ]
})
)}

function _plot2(Inputs){return(
Inputs.form({
	mt: Inputs.range([0, 100], {label: "margin-top"   , step: 1}),
	mr: Inputs.range([0, 100], {label: "margin-right" , step: 1}),
	mb: Inputs.range([0, 100], {label: "margin-bottom", step: 1}),
	ml: Inputs.range([0, 100], {label: "margin-left"  , step: 1}),
})
)}

function _8(Plot,plot2,y_counts){return(
Plot.plot({
  marginTop    : plot2.mt,
  marginRight  : plot2.mr,
  marginBottom : plot2.mb,
  marginLeft   : plot2.ml,
  
  y: {
    label: "count", 
    grid: true
  },
  marks: [
    Plot.ruleY([0]),
    Plot.barY(y_counts, {x: "year", y: "count", tip: true, fill: "gender"}),
  ]
})
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["data.json", {url: new URL("../data.json", import.meta.url), mimeType: "application/json", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("data")).define("data", ["FileAttachment"], _data);
  main.variable(observer("y_counts")).define("y_counts", _y_counts);
  main.variable(observer("years")).define("years", ["data"], _years);
  main.variable(observer()).define(["y_counts","years","data"], _5);
  main.variable(observer()).define(["Plot","y_counts"], _6);
  main.variable(observer("viewof plot2")).define("viewof plot2", ["Inputs"], _plot2);
  main.variable(observer("plot2")).define("plot2", ["Generators", "viewof plot2"], (G, _) => G.input(_));
  main.variable(observer()).define(["Plot","plot2","y_counts"], _8);
  return main;
}
