var Pool = (function()
{
    //metodos expuestos:

    var create = function(type, size)
    {
        var obj = Object.create(def);
        obj.init(type, size);

        return obj;
    };


}());
