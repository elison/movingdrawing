function LOG(str)
{
   console.log(str);
}

function toCurveString(cArr)
{
   str = 'M' + cArr[0][1] + ',' + cArr[0][2];

   for (var ii = 1; ii < cArr.length; ii++)
   {
      str += "C";
      for (var jj = 1; jj < 6; jj++)
      {
         str += (cArr[ii][jj] + ',');
      }
      str += cArr[ii][6];
   }

   return str;
}

function getNormalizer(sesh, width, height)
{
   var lats = new Array();
   var lons = new Array();

   if (sesh.curr)
   {
      lats.push(sesh.curr.lat);
      lons.push(sesh.curr.lon);
   }

   for (var jj = 0; jj < sesh.lines.length; jj++)
   {
      for (var ii = 0; ii < sesh.lines[jj].points.length - 2; ii++)
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

