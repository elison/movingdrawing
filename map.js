var map;
function initMap()
{
    map = L.map('map').setView([37.4235, -122.0718], 18);
    L.tileLayer('http://{s}.tile.cloudmade.com/BC9A493B41014CAABB98F0471D759707/997/256/{z}/{x}/{y}.png', {
      maxZoom: 25
    }).addTo(map);
}

 function addLine(lat1, long1, lat2, long2){
   L.polyline([
     [lat1, long1],
     [lat2, long2]
   ]).addTo(map);
 }

 function changeView(lat, longt){
   map.setView([lat, longt], 18);
 }


 function processResponse(data){
       for (var j = 0; j < data.lines.length; j++){
         var pointLength = data.lines[j].points.length;
        for(var i = 1; i < pointLength; i++)
         {
          var lineData1 = data.lines[j].points[i];
          var lineData2 = data.lines[j].points[i-1];
          addLine(lineData1.lat, lineData1.lon, lineData2.lat, lineData2.lon);
         }           
     }
 }

