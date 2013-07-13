var sessionId;

function init()
{
   getSessionAjax();
   initMap();
   initDrawing();
}

 function getSessionAjax(){
   $.get('http://still-hamlet-4033.herokuapp.com/api/latest', findSession);
 }

 function findSession(data){
   sessionId = session_id;
   getCoordsAjax();
 }

 function getCoordsAjax(){
   $.get('http://still-hamlet-4033.herokuapp.com/api/coord?session_id='+sessionId, processResponse);
 }

 function processResponseRouter(data)
 {
    //Elison
    processResponse(data);

    //Keaton
    onRecieveLines(data);


   getCoordsAjax();
 }