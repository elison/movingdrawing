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

function onReceiveLines(seshData, textStatus, jqXHR)
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
      var thePath = PAPER.path(lineString)
                         .attr('stroke-opacity', '0.5')
                         .attr('stroke-linecap', 'round')
                         .attr('stroke-linejoin', 'round');
   
      brush(seshData.lines[ii].type, thePath);
   }

   var normalizedSpotArr = normalizer([seshData.curr]);
   PAPER.circle(Math.floor(normalizedSpotArr[0].lon), Math.floor(normalizedSpotArr[0].lat), "3")
        .attr('fill', 'red');

}

function objToPathString(points)
{
   var str = "M" + Math.floor(points[0].lon) + "," + Math.floor(points[0].lat);
   for (var ii = 1; ii < points.length; ii++)
   {
      str += ("L" + Math.floor(points[ii].lon) + "," + Math.floor(points[ii].lat));
   }
   return str;
}

function brush(typeString, pathToBrush)
{
   if (typeString == "DEFAULT")
   {
      pathToBrush.attr('stroke-width', '3')
                 .attr('stroke', 'black');
      return;
   }

   var props = typeString.split('-');


   pathToBrush.attr('stroke-width', sizeMap(props[0]))
              .attr('stroke', props[1]);
}

function sizeMap(sizeChar)
{
   if (sizeChar == 'S')
   {
      return '3';
   }
   else if (sizeChar == 'M')
   {
      return '6';
   }
   else if (sizeChar == 'L')
   {
      return '30';
   }
   else 
   {
      return 100;
   }
}

var curvy;
var stringy;
function test()
{
   var str = "M30,30L80,80L20,120";

   PAPER.path(str);
   curvy = Raphael.path2curve(str);

   stringy = toCurveString(curvy);

   PAPER.path(stringy);
}

   

