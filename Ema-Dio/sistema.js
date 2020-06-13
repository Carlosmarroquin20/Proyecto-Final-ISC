var Pool = (function()
{
    //metodos expuestos:

    var create = function(type, size)
    {
        var obj = Object.create(def);
        obj.init(type, size);

        return obj;
    };

    //Definicion:

    var def =
    {
        _type: null,
        _size: null,
        _pointer: null,
        _elements:null,

        init: function(type, size)
        {
            this._type = type;
            this._size = size;
            this._pointer = size;
            this._elements = [];

            var i = 0;
            var length = this._size;

            for(i; i < length; ++i)
            {
                this._elements[i] = this._type.create();
            }
        },

        getElement: function()
        {
            if(this._pointer > 0) return this._elements[--this._pointer];

            return null;
        },

        disposeElement: function(obj)
        {
            this._elements[this._pointer++] = obj;
        }
    };

    return {create:create};

}());

//vec2d.js ...........................................................

var Vec2D = (function()
{
    //metodos expuestos:

    var create = function(x, y)
    {
        var obj = Object.create(def);
        obj.setXY(x, y);

        return obj;
    };

    //definicion del Vec2D:

    var def =
    {
        _x: 1,
        _y: 0,

        getX: function()
        {
            return this._x;
        },

        setX: function(value)
        {
            this._x = value;
        },

        getY: function()
        {
            return this._y;
        },

        setY: function(value)
        {
            this._y = value;
        },

        setXY: function(x, y)
        {
            this._x = x;
            this._y = y;
        },

        getLength: function()
        {
            return Math.sqrt(this._x * this._x + this._y * this._y);
        },

        setLength: function(length)
        {
            var angle = this.getAngle();
            this._x = Math.cos(angle) * length;
            this._y = Math.sin(angle) * length;
        },

        getAngle: function()
        {
            return Math.atan2(this._y, this._x);
        },

        setAngle: function(angle)
        {
            var length = this.getLength();
            this._x = Math.cos(angle) * length;
            this._y = Math.sin(angle) * length;
        },

        add: function(vector)
        {
            this._x += vector.getX();
            this._y += vector.getY();
        },

        sub: function(vector)
        {
            this._x -= vector.getX();
            this._y -= vector.getY();
        },

        mul: function(value)
        {
            this._x *= value;
            this._y *= value;
        },

        div: function(value)
        {
            this._x /= value;
            this._y /= value;
        }
    };

    return {create:create};
}());

//particulas ...........................................................

var Particle = (function()
{
    //metodos Expuestos:

    var create = function()
    {
        var obj = Object.create(def);
        obj.radius = 2;
        obj.color = '#FFF';
        obj.lifeSpan = 0;
        obj.fric = 0.98;
        obj.pos = Vec2D.create(0, 0);
        obj.vel = Vec2D.create(0, 0);
        obj.blacklisted = false;

        return obj;
    };

    //Definicion:

    var def =
    {
        radius: null,
        color: null,
        lifeSpan: null,
        fric: null,
        pos: null,
        vel: null,
        blacklisted: null,

        update: function()
        {
            this.pos.add(this.vel);
            this.vel.mul(this.fric);
            this.radius -= 0.1;

            if(this.radius < 0.1) this.radius = 0.1;

            if(this.lifeSpan-- < 0)
            {
                this.blacklisted = true;
            }
        },

        reset: function()
        {
            this.blacklisted = false;
        }
    };

    return {create:create};
}());

//bala ...........................................................

var Bullet = (function()
{
    //metodos expuestos:

    var create = function()
    {
        var obj = Object.create(def);
        obj.radius = 4;
        obj.color = '#fff';
        obj.pos = Vec2D.create(0, 0);
        obj.vel = Vec2D.create(0, 0);
        obj.blacklisted = false;

        return obj;
    };

    //definicion:

    var def =
    {
        radius: null,
        color: null,
        pos: null,
        vel: null,
        blacklisted: null,

        update: function()
        {
            this.pos.add(this.vel);
        },

        reset: function()
        {
            this.blacklisted = false;
        }
    };

    return {create:create};
}());

//asteroides.........................................................

var Asteroid = (function()
{

    var create = function()
    {
        var obj = Object.create(def);
        obj.radius = 40;
        obj.color = '#07ff3c';   ////
        obj.pos = Vec2D.create(0, 0);
        obj.vel = Vec2D.create(0, 0);
        obj.blacklisted = false;
        obj.type = 'b';
        obj.sides = (Math.random() * 2 + 50) >> 0;  //////
        obj.angle = 0;
        obj.angleVel = (1 - Math.random() * 2) * 0.01;

        return obj;
    };

    //definicion:

    var def =
    {
        radius: null,
        color: null,
        pos: null,
        vel: null,
        blacklisted: null,
        type: null,
        sides: null,
        angle: null,
        angleVel: null,

        update: function()
        {
            this.pos.add(this.vel);
            this.angle += this.angleVel;
        },

        reset: function()
        {
            this.blacklisted = false;
        }
    };

    return {create:create};

}());

//nave...........................................................

var Ship = (function()
{

    //metodos expuestos:

    var create = function(x, y, ref)
    {
        var obj = Object.create(def);
        obj.ref = ref;
        obj.angle = 0;
        obj.pos = Vec2D.create(x, y);
        obj.vel = Vec2D.create(0, 0);
        obj.thrust = Vec2D.create(0, 0);
        obj.idle = false;
        obj.radius = 8;
        obj.idleDelay = 0;

        return obj;
    };

    //Definicion:

    var def =
    {
        angle: null,
        pos: null,
        vel: null,
        thrust: null,
        ref: null,
        bulletDelay: null,
        idle: null,
        radius: null,

        update: function()
        {
            this.vel.add(this.thrust);
            this.pos.add(this.vel);

            if(this.vel.getLength() > 5) this.vel.setLength(5);

            ++this.bulletDelay;

            if(this.idle)
            {
                if(++this.idleDelay > 120)
                {
                    this.idleDelay = 0;
                    this.idle = false;

                    this.ref.resetGame();
                }
            }
        },

        shoot: function()
        {
            if(this.bulletDelay > 8)
            {
                this.ref.generateShot();
                this.bulletDelay = 0;
            }
        }
    };

    return {create:create};    
}());

//canvas ...........................................................

//variables comunes

var canvas;
var context;
var screenWidth;
var screenHeight;
var doublePI = Math.PI * 2;

//variables del juego

var ship;

var particlePool;
var particles;

var bulletPool;
var bullets;

var asteroidPool;
var asteroids;

var hScan;
var asteroidVelFactor = 0;

//variables del teclado

var keyLeft = false;
var keyUp = false;
var keyRight = false;
var keyDown = false;
var keySpace = false;

window.getAnimationFrame =
window.requestAnimationFrame ||
window.webkitRequestAnimationFrame ||
window.mozRequestAnimationFrame ||
window.oRequestAnimationFrame ||
window.msRequestAnimationFrame ||
function(callback)
{
    window.setTimeout(callback, 16.6);
};

window.onload = function()
{
    canvas = document.getElementById('canvas');
    context = canvas.getContext('2d');

    window.onresize();

    keyboardInit();
    particleInit();
    bulletInit();
    asteroidInit();
    shipInit();

    loop();
};

window.onresize = function()
{
    if(!canvas) return;

    screenWidth = canvas.clientWidth;
    screenHeight = canvas.clientHeight;

    canvas.width = screenWidth;
    canvas.height = screenHeight;

    hScan = (screenHeight / 4) >> 0;
};
function keyboardInit()
{
    window.onkeydown = function(e)
    {
        switch(e.keyCode)
        {
            //tecla A o Izquierda
            case 65:
            case 37:

            keyLeft = true;

            break;

            //tecla W o Arriba
            case 87:
            case 38:

            keyUp = true;

            break;

            //tecla D o derecha
            case 68:
            case 39:

            keyRight = true;

            break;

            //tecla S o abajo
            case 83:
            case 40:

            keyDown = true;

            break;

            //tecla espacio
            case 32:
       case 75:

            keySpace = true;

            break;
        }
    
    e.preventDefault();
    };

    window.onkeyup = function(e)
    {
        switch(e.keyCode)
        {
            //tecla A o Izquierda
            case 65:
            case 37:

            keyLeft = false;

            break;

            //tecla W o Arriba
            case 87:
            case 38:

            keyUp = false;

            break;

            //tecla D o Derecha
            case 68:
            case 39:

            keyRight = false;

            break;

            //tecla S o Abajo
            case 83:
            case 40:

            keyDown = false;

            break;

            //tecla espacio
       case 75:
            case 32:

            keySpace = false;

            break;
        }
    
    e.preventDefault();
    };
}

function particleInit()
{
    particlePool = Pool.create(Particle, 100);
    particles = [];
}

function bulletInit()
{
    bulletPool = Pool.create(Bullet, 40);
    bullets = [];
}

function asteroidInit()
{
    asteroidPool = Pool.create(Asteroid, 30);
    asteroids = [];
}

function shipInit()
{
    ship = Ship.create(screenWidth >> 1, screenHeight >> 1, this);
}

function loop()
{
    updateShip();
    updateParticles();
    updateBullets();
    updateAsteroids();

    checkCollisions();

    render();

    getAnimationFrame(loop);
}

function updateShip()
{
    ship.update();

    if(ship.idle) return;

    if(keySpace) ship.shoot();
    if(keyLeft) ship.angle -= 0.1;
    if(keyRight) ship.angle += 0.1;

    if(keyUp)
    {
        ship.thrust.setLength(0.1);
        ship.thrust.setAngle(ship.angle);

        generateThrustParticle();
    }
    else
    {
        ship.vel.mul(0.94);
        ship.thrust.setLength(0);
    }

    if(ship.pos.getX() > screenWidth) ship.pos.setX(0);
    else if(ship.pos.getX() < 0) ship.pos.setX(screenWidth);

    if(ship.pos.getY() > screenHeight) ship.pos.setY(0);
    else if(ship.pos.getY() < 0) ship.pos.setY(screenHeight);
}

function generateThrustParticle()
{
    var p = particlePool.getElement();

    //si el grupo de partículas no tiene más elementos, devolverá 'nulo'.

    if(!p) return;

    p.radius = Math.random() * 3 + 2;
    p.color = '#FFF';
    p.lifeSpan = 80;
    p.pos.setXY(ship.pos.getX() + Math.cos(ship.angle) * -14, ship.pos.getY() + Math.sin(ship.angle) * -14);
    p.vel.setLength(8 / p.radius);
    p.vel.setAngle(ship.angle + (1 - Math.random() * 2) * (Math.PI / 18));
    p.vel.mul(-1);
    particles[particles.length] = p;
}