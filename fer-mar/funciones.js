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
//Listener, Animaciones, correcta funcion de los distintos navegadores
window.requestAnimationFrame = (function () {
	return window.requestAnimationFrame ||
		window.webkitRequestAnimationFrame ||
		window.mozRequestAnimationFrame ||
		function (callback) { window.setTimeout(callback, 20); }
})();
document.addEventListener("keydown", function (e) {
	teclaPulsada = e.keyCode;
	tecla[e.keyCode] = true;
});
document.addEventListener("keyup", function (e) {
	tecla[e.keyCode] = false;
});
//Variables
var canvas, ctx;
var x = 100;
var y = 100;
var teclaIzquierda = 37;
var teclaDerecha = 39;
var teclaEspacio = 32;
var imgNave, imgOvni;
var municion = 100;
var ultimos = new Array();
var imgAni = 0;
var imgAni2 = 0;
var enemigosVivos = 60;
var tiempoBala = true ;
var teclaPulsada = null;
var tecla = [];
var balas_array = new Array();
var ovnis_array = new Array();
var balasEnemigas_array = new Array();
var endGame = false;
var disparoEnemigo;
var tiempoDisparo = 400;
var puntos = 0;

//Balas de la nave
function Bala(x, y, w) {
	this.x = x;
	this.y = y;
	this.w = w;
	this.dibuja = function () {
		ctx.save();
		ctx.fillStyle = "green";
        ctx.fillRect(this.x, this.y, this.w, this.w);
        //Velocidad de disparo de la nave
		this.y = this.y - 10;
		ctx.restore();
	};

    //Balas de los Ovnis
	this.dispara = function () {
		ctx.save();
		ctx.fillStyle = "yellow";
		ctx.fillRect(this.x, this.y, this.w, this.w);
		//Velocidad de disparo de los ovnis
		this.y = this.y + 4;
		ctx.restore();
	};
}

//Objetos de Nave y animaciones
function nave(x) {
    //Posicion de la nave
	this.x = x;
	this.y = 465;
	this.w = 30;
	this.h = 30;
	this.dibuja = function (x) {
		this.x = x;
		if(imgAni2 < 5){
			ctx.drawImage(imgNave,0   , 0   , 32  , 32  , this.x, this.y, 35  , 35);
			imgAni2 = imgAni2 + 1;
			imgAni = imgAni + 1;
            checarBalas();
            //Verificacion de balas
		} else if(imgAni2 < 10) {
			ctx.drawImage(imgNave,32  , 0   , 32  , 32  , this.x, this.y, 35  , 35);
			imgAni2 = imgAni2 + 1;
			imgAni = imgAni + 1;
		} else{
			ctx.drawImage(imgNave,32  , 0   , 32  , 32  , this.x, this.y, 35  , 35);
			imgAni2 = 0;
		}
		
	};
}
//Objetos de Enemigos y animaciones
function Enemigo(x, y) {
	this.x = x;
	this.y = y;
	this.w = 35;
	this.veces = 0;
	this.dx = 5;
	this.ciclos = 0;
	this.num = 14;
	this.figura = true;
	this.vive = true;
	this.dibuja = function () {
        
        //Retraso
		if (this.ciclos > 20) {
            //Saltos de los enemigos
			if (this.veces > this.num) {
				this.dx *= -1;
				this.veces = 0;
				this.num = 30;
				this.y += 40;
				this.dx = (this.dx > 0) ? this.dx++ : this.dx--;
			} else {
				this.x += this.dx;
			}
			this.veces++;
			this.ciclos = 0;
			this.figura = !this.figura;
		} else {
			this.ciclos++;
		}
		if (this.vive) {
			if (imgAni < 4) {
                ctx.drawImage(imgOvni, 0   , 0   , 32  , 32  , this.x, this.y, 35  , 35);
                
                //Dibujado de: imgfile, xini, yini, wimg, himg, xpos  , ypos  , wrez, hrez
			} else if(imgAni < 8) {
				ctx.drawImage(imgOvni, 32, 0, 32, 32, this.x, this.y, 35, 35);
			} else if(imgAni < 12) {
				ctx.drawImage(imgOvni, 64, 0, 32, 32, this.x, this.y, 35, 35);
			} else if(imgAni > 11) {
				ctx.drawImage(imgOvni, 0, 0, 32, 32, this.x, this.y, 35, 35);
				imgAni = 0;
			}
		} else {
			ctx.fillStyle = "black";
			ctx.fillRect(this.x, this.y, 35, 30);
		}

	};
}

