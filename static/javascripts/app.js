var columns = 'name,strength,intelligence,charisma,dexterity,luck\n';

function showRadar(){
  var nameInput = document.getElementById("name");
  var strengthInput = document.getElementById("strength");
  var intelligenceInput = document.getElementById("intelligence");
  var charismaInput = document.getElementById("charisma");
  var dexterityInput = document.getElementById("dexterity");
  var luckInput = document.getElementById("luck");

  var wInput = document.getElementById("w");
  var hInput = document.getElementById("h");
  // var dataInput = document.getElementById("data");

  // var c = document.getElementById("data").value,
  c = columns + [
    nameInput.value,
    strengthInput.value,
    intelligenceInput.value,
    charismaInput.value,
    dexterityInput.value,
    luckInput.value,
  ].join(",");
  const params = {
    name: nameInput.value,
    strength: strengthInput.value,
    intelligence: intelligenceInput.value,
    charisma: charismaInput.value,
    dexterity: dexterityInput.value,
    luck: luckInput.value,
  };
  axios.post('/hello', params).then(function (response) {
    console.log(response);
    drawGraph(_.values(_.map(params, (n) => isNaN(n) ? n : parseInt(n, 10))));
  });
}

function drawGraph(response) {
  console.log(response);
  var data = [];
  var chart = RadarChart.chart();

  w = document.getElementById("w").value;
  h = document.getElementById("h").value;

  var c = columns + _.values(response).join(",");

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
          newSeries.axes.push({"axis":[headers[j]], "value": parseFloat(v)});
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