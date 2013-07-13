var gpath;
var pstring="M20,20L60,60L20,80";
var PAPER;
var PATH_FORMAT = "mypath";
var DIV_WIDTH = 500;
var DIV_HEIGHT = 500;
var DIV_MARGIN_TOLERANCE = 0.9;

var SERVER_URL = "http://still-hamlet-4033.herokuapp.com";

var SESH_ID = 26;

var gRespCount = 0;
var gJSONLastResp = {};


function initDrawing()
{
   PAPER = Raphael($("#raphaelContainer")[0], DIV_WIDTH, DIV_HEIGHT);
   LOG("Raphael container initialized");
}

function onRecieveLines(seshData, textStatus, jqXHR)
{
   console.log("recieved response " + gRespCount);
   gRespCount++;
   console.log(seshData);
   var JSONCurResp = JSON.stringify(seshData);
   if (JSONCurResp === gJSONLastResp)
   {
      console.log("dup!");
   }
   else
   {
      console.log("##### NEW! #####");
      gJSONLastResp = JSONCurResp;
      drawSesh(seshData);
   }

   // now do it again
   requestAllLines();
}

function drawSesh(seshData)
{
   var normalizer = getNormalizer(seshData,
                                DIV_WIDTH, DIV_HEIGHT);

   PAPER.clear();

   for(var ii = 0; ii < seshData.lines.length; ii++)
   {
      var normalizedLineArr = normalizer(seshData.lines[ii].points);
      var lineString = objToPathString(normalizedLineArr);
      PAPER.path(lineString);
   }
}

function objToPathString(points)
{
   var str = "M" + points[0].lon + "," + points[0].lat;
   for (var ii = 1; ii < points.length; ii++)
   {
      str += ("L" + points[ii].lon + "," + points[ii].lat);
   }

   console.log(str);
   PAPER.path(str)
        .attr('stroke', '#000')
            .attr('stroke-opacity', '0.5')
            .attr('stroke-linecap', 'round')
            .attr('stroke-linejoin', 'round')
            .attr('stroke-width', '3');
}

   

