var sessionId;

function init()
{
   getSessionAjax();
   initMap();
   initDrawing();
}

 function getSessionAjax(){
   $.get('http://still-hamlet-4033.herokuapp.com/api/latest', "", findSession);
 }

 function findSession(data){
   sessionId = data.session_id;
   sessionId = 2;
   getCoordsAjax();
 }

 function getCoordsAjax(){
   $.get('http://still-hamlet-4033.herokuapp.com/api/coord?session_id='+sessionId, "", processResponseRouter);
 }

 function processResponseRouter(data)
 {
    setTimeout(getCoordsAjax, 1500);
    //Elison
    processResponse(data);

    //Keaton
    onReceiveLines(data, null, null);
 }
