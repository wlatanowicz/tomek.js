// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf

if (!Array.prototype.indexOf)
{
  Array.prototype.indexOf = function(elt /*, from*/)
  {
    var len = this.length >>> 0;

    var from = Number(arguments[1]) || 0;
    from = (from < 0)
         ? Math.ceil(from)
         : Math.floor(from);
    if (from < 0)
      from += len;

    for (; from < len; from++)
    {
      if (from in this &&
          this[from] === elt)
        return from;
    }
    return -1;
  };
}


// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind

if (!Function.prototype.bind) {
  Function.prototype.bind = function (oThis) {
    if (typeof this !== "function") {
      // closest thing possible to the ECMAScript 5 internal IsCallable function
      throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
    }

    var aArgs = Array.prototype.slice.call(arguments, 1), 
        fToBind = this, 
        fNOP = function () {},
        fBound = function () {
          return fToBind.apply(this instanceof fNOP && oThis
                                 ? this
                                 : oThis,
                               aArgs.concat(Array.prototype.slice.call(arguments)));
        };

    fNOP.prototype = this.prototype;
    fBound.prototype = new fNOP();

    return fBound;
  };
}


// http://stackoverflow.com/questions/597268/element-prototype-in-ie7

if ( !window.Element ) 
{
    Element = function(){};

    var __createElement = document.createElement;
    document.createElement = function(tagName)
    {
        var element = __createElement(tagName);
        if (element == null) {return null;}
        for(var key in Element.prototype)
                element[key] = Element.prototype[key];
        return element;
    }

    var __getElementById = document.getElementById;
    document.getElementById = function(id)
    {
        var element = __getElementById(id);
        if (element == null) {return null;}
        for(var key in Element.prototype)
                element[key] = Element.prototype[key];
        return element;
    }
}

// Node.ELEMENT_NODE constant

if ( !window.Node ){
	var Node = {};
}
if ( ! Node.ELEMENT_NODE ){
	Node.ELEMENT_NODE = 1
}

