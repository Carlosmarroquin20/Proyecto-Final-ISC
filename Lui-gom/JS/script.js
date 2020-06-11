document.getElementById('player').addEventListener("mouseover",sumarPuntos);

puntos = 0;
tiempo = 30;
necesarios = 30;
function sumarPuntos(){
    puntos++;
   document.getElementById("puntos").innerHTML = "Puntos: <b>" + puntos + "/" + necesarios + "  </b>";
   randNum =  Math.round(Math.random()*500);
   randNum2 =  Math.round(Math.random()*500);