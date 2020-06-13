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

}());