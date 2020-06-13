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
