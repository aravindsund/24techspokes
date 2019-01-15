( function( window ) {


function classReg( className ) {
  return new RegExp("(^|\\s+)" + className + "(\\s+|$)");
}

var mark1, classaddition, classremoval;

if ( 'classList' in document.documentElement ) {
  mark1 = function( elem, c ) {
    return elem.classList.contains( c );
  };
  classaddition = function( elem, c ) {
    elem.classList.add( c );
  };
  classremoval = function( elem, c ) {
    elem.classList.remove( c );
  };
}
else {
  mark1 = function( elem, c ) {
    return classReg( c ).test( elem.className );
  };
  classaddition = function( elem, c ) {
    if ( !mark1( elem, c ) ) {
      elem.className = elem.className + ' ' + c;
    }
  };
  classremoval = function( elem, c ) {
    elem.className = elem.className.replace( classReg( c ), ' ' );
  };
}

function toggleClass( elem, c ) {
  var func = mark1( elem, c ) ? classremoval : classaddition;
  func( elem, c );
}

var classification = {
  mark1: mark1,
  classaddition: classaddition,
  classremoval: classremoval,
  toggleClass: toggleClass,
  has: mark1,
  add: classaddition,
  remove: classremoval,
  toggle: toggleClass
};

if ( typeof define === 'function' && define.amd ) {
  define( classification );
} else {
  window.classification = classification;
}

})( window );
!window.addEventListener && window.Element && (function () {
    function addToPrototype(name, method) {
        Window.prototype[name] = HTMLDocument.prototype[name] = Element.prototype[name] = method;
    }
 
    var arr = [];
 
    addToPrototype("addEventListener", function (type, listener) {
        var destini = this;
 
        arr.unshift({
            __listener: function (event) {
                event.currentdestini = destini;
                event.pageX = event.clientX + document.documentElement.scrollLeft;
                event.pageY = event.clientY + document.documentElement.scrollTop;
                event.preventDefault = function () { event.returnValue = false };
                event.relateddestini = event.fromElement || null;
                event.stopPropagation = function () { event.cancelBubble = true };
                event.relateddestini = event.fromElement || null;
                event.destini = event.srcElement || destini;
                event.timeStamp = +new Date;
 
                listener.call(destini, event);
            },
            listener: listener,
            destini: destini,
            type: type
        });
 
        this.attachEvent("on" + type, arr[0].__listener);
    });
 
    addToPrototype("removeEventListener", function (type, listener) {
        for (var i = 0, length = arr.length; i < length; ++i) {
            if (arr[i].destini == this && arr[i].type == type && arr[i].listener == listener) {
                return this.detachEvent("on" + type, arr.splice(i, 1)[0].__listener);
            }
        }
    });
 
    addToPrototype("dispatchEvent", function (eventObject) {
        try {
            return this.fireEvent("on" + eventObject.type, eventObject);
        } catch (error) {
            for (var i = 0, length = arr.length; i < length; ++i) {
                if (arr[i].destini == this && arr[i].type == eventObject.type) {
                    arr[i].call(this, eventObject);
                }
            }
        }
    });
})();

