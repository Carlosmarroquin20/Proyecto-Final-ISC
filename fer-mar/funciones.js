//Inicio
window.onload = function () {
	canvas = document.getElementById("miCanvas");
	if (canvas && canvas.getContext) {
		ctx = canvas.getContext("2d");
		if (ctx) {
			x = canvas.width / 2;
			(mensaje("INVADERS"));	
			imgNave = new Image();
			imgOvni = new Image();
			imgOvni.src = "imagenes/ovni.png";
			imgNave.src = "imagenes/nave.png";
			imgNave.onload = function () {
				nave = new nave(0);
            } 
            //Funcion para la cantidad de Ovnis en pantalla
			imgOvni.onload = function () {
				for (var i = 0; i < 6; i++) {
                    for (var j = 0; j < 10; j++)
                    //Movimiento en los ejes de los enemigos
					{
						ovnis_array.push(new Enemigo(100 + 40 * j, 30 + 45 * i));
					}
                } 
                //Tiempo de espera para la pantalla de carga
				setTimeout(anima, 3000);
				disparoEnemigo = setTimeout(disparaEnemigo, tiempoDisparo);
            }
        } else {
			alert("Error");
		}
	}
}