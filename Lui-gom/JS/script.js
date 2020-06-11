document.getElementById('player').addEventListener("mouseover",sumarPuntos);

puntos = 0;
tiempo = 30;
necesarios = 30;
function sumarPuntos(){
    puntos++;
   document.getElementById("puntos").innerHTML = "Puntos: <b>" + puntos + "/" + necesarios + "  </b>";
   randNum =  Math.round(Math.random()*500);
   randNum2 =  Math.round(Math.random()*500);
   document.getElementById("player").style.marginTop =randNum + "px";
   document.getElementById("player").style.marginLeft =randNum2 + "px";
   if (puntos == 30) {
        alert("Ganaste");
    }
}


function restarTiempo() {
    tiempo--;
	document.getElementById("tiempo").innerHTML = "&nbsp;&nbsp;&nbsp;Tiempo: "+tiempo; 
	if (tiempo == 0) {
        alert("Perdiste");
		tiempo = 0;
		puntos = 0;
	}
}
setInterval(restarTiempo,1000);

//Volver al estado inicial
function reiniciar() {
    if (marcha==1) { //si el cronómetro está en marcha:
       clearInterval(elcrono); //parar el crono
       marcha=0;	//indicar que está parado
    }
 cro=0;  //tiempo transcurrido a cero
 visor.innerHTML = "0 : 00 : 00 : 00"; //visor a cero
}	