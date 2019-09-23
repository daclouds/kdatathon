var columns = 'name,gender,under_gfr_min,under_cr_max,alt_max,ast_max,a1c_max,alp_max,bil_max,d1_cnt,hbv,age\n'
  + 'Default,1,0,1,1,1,1,1,1,0.58,0,0.52\n';
function showRadar(){
  var gender = document.getElementById("gender");
  var under_gfr_min = document.getElementById("under_gfr_min");
  var under_cr_max = document.getElementById("under_cr_max");
  var alt = document.getElementById("alt_max");
  var ast = document.getElementById("ast_max");
  var a1c = document.getElementById("a1c_max");
  var alp = document.getElementById("alp_max");
  var bil = document.getElementById("bil_max");
  var d1 = document.getElementById("d1_cnt");
  var hbv = document.getElementById("hbv");
  var age = document.getElementById("age");

  var wInput = document.getElementById("w");
  var hInput = document.getElementById("h");

  // var dataInput = document.getElementById("data");
  // var c = document.getElementById("data").value,

  c = columns + [
    gender.value,
    under_gfr_min.value,
    under_cr_max.value,
    alt.value,
    ast.value,
    a1c.value,
    alp.value,
    bil.value,
    d1.value,
    hbv.value,
    age.value,
  ].join(",");
  const params = {
    gender: gender.value,
    under_gfr_min: under_gfr_min.value,
    under_cr_max: under_cr_max.value,
    alt_max: alt.value,
    ast_max: ast.value,
    a1c_max: a1c.value,
    alp_max: alp.value,
    bil_max: bil.value,
    d1_cnt: d1.value,
    hbv: hbv.value,
    age: age.value,
  };
  axios.post('/hello', params).then(function (response) {
    console.log(response);
    document.getElementById("result").innerHTML = 'Failure: ' + Math.round(response.data) + '%';
    drawGraph(_.values(_.map(params, (n) => isNaN(n) ? n : parseInt(n, 10))));
  });
}

function drawGraph(response) {
  console.log(response);
  var data = [];
  var chart = RadarChart.chart();

  w = document.getElementById("w").value;
  h = document.getElementById("h").value;

  var c = columns + 'User,' + _.values(response).join(",");

  csv = c.split("\n").map(function(i){return i.split(",")})
  headers = []
  csv.forEach(function(item, i){
    if(i==0){
      headers = item;
    }else{
      newSeries = {};
      item.forEach( function(v, j){
        if(j==0){
          newSeries.className = v;
          newSeries.axes = [];
        }else{
          let value;
          switch (j) {
            case 9:
              value = v / 6;
              console.log('d1_cnt', value)
              break;
            case 11:
              value = v /98;
              console.log('age', value)
              break;
            default:
              value = v;
          }
          newSeries.axes.push({"axis":[headers[j]], "value": parseFloat(value)});
        }
      });
      data.push(newSeries);
    }
  })
  RadarChart.defaultConfig.radius = 3;
  RadarChart.defaultConfig.w = w;
  RadarChart.defaultConfig.h = h;
  RadarChart.draw("#chart-container", data);
  function animate(elem,time) {
    if( !elem) return;
    var to = elem.offsetTop;
    var from = window.scrollY;
    var start = new Date().getTime(),
    timer = setInterval(function() {
        var step = Math.min(1,(new Date().getTime()-start)/time);
        window.scrollTo(0,(from+step*(to-from))+1);
        if( step == 1){ clearInterval(timer);};
    },25);
    window.scrollTo(0,(from+1));
  }

  var divVal = document.getElementById('chart-container');
  animate(divVal, 600);
}