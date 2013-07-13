function LOG(str)
{
   console.log(str);
}

function getNormalizer(sesh, width, height)
{
   var lats = new Array();
   var lons = new Array();

   for (var jj = 0; jj < sesh.lines.length; jj++)
   {
      for (var ii = 0; ii < sesh.lines[jj].points.length; ii++)
      {
         lats.push(sesh.lines[jj].points[ii].lat);
         lons.push(sesh.lines[jj].points[ii].lon);
      }
   }

   var maxLat = Math.max.apply(Math, lats);
   var minLat = Math.min.apply(Math, lats);
   var maxLon = Math.max.apply(Math, lons);
   var minLon = Math.min.apply(Math, lons);

   var ret = new Array();

   var scale = DIV_HEIGHT /
               (Math.max(maxLat - minLat, maxLon - minLon));

   var baselat = DIV_HEIGHT;
   var baselon = 0;

   return function(coords)
   {
      var ret = new Array();
      for (var ii = 0; ii < coords.length; ii++)
      {
         ret.push({lat: (baselat - (coords[ii].lat - minLat) * scale),
            lon: (baselon + (coords[ii].lon - minLon) * scale)});
      }
      return ret;
   }
}

