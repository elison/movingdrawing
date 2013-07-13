var map;
var marker;
function initMap()
{
    map = L.map('map').setView([37.4235, -122.0718], 18);
    L.tileLayer('http://{s}.tile.cloudmade.com/BC9A493B41014CAABB98F0471D759707/997/256/{z}/{x}/{y}.png', {
      maxZoom: 25
    }).addTo(map);
}

 function addLine(lat1, long1, lat2, long2, color, weight){
   L.polyline([
     [lat1, long1],
     [lat2, long2]
   ], {color: color || "blue", weight: weight || 5}).addTo(map);
 }

  function addMarker(lat, longt)
  {
    marker = new L.marker([lat,longt],{riseOnHover: false}).addTo(map);
    marker.setZIndexOffset(0);
  }

 function changeView(lat, longt){
   map.setView([lat, longt], 18);
 }


 function processResponse(data){
       for (var j = 0; j < data.lines.length; j++){
          var types = data.lines[j].type.split("-");
            var color = types[1];
            var weight;
            if (types[1] == "S")
                weight = 3;
            if (types[1] == "M")
                weight = 5;
            if (types[1] == "L")
                weight = 12;
         var pointLength = data.lines[j].points.length;
        for(var i = 1; i < pointLength; i++)
         {
          var lineData1 = data.lines[j].points[i];
          var lineData2 = data.lines[j].points[i-1];
          addLine(lineData1.lat, lineData1.lon, lineData2.lat, lineData2.lon, color, weight);
         }           
     }
     addMarker(data.curr.lat, data.curr.lon);
 }

