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