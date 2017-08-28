/**
 *  $Id: helpers.js 697 2010-11-11 18:54:51Z wingedfox $
 *  $HeadURL: https://svn.debugger.ru/repos/jslibs/BrowserExtensions/tags/BrowserExtensions.029/helpers.js $
 *
 *  File contains differrent helper functions
 * 
 * @author Ilya Lebedev <ilya@lebedev.net>
 * @license LGPL
 * @version $Rev: 697 $
 */
function isUndefined(i) {
    return (typeof i == 'undefined');
}
function isFunction(i) {
    return (typeof i == 'function');
}
function isString(i) {
    return (typeof i == 'string');
}
function isNumber(i) {
    return (typeof i == 'number');
}
function isNumeric(i) {
    return (isNumber(i) || isString(i)) && !isNaN(parseInt(i)) && isFinite(parseInt(i));
}
function isArray(i) {
    return (i instanceof Array);
}
function isRegExp(i) {
    return (i instanceof RegExp);
}
function isBoolean(i) {
    return ('boolean' == typeof i);
}
function isScalar(i) {
    return isNumeric(i) || isString(i) || isBoolean(i);
}
function isEmpty(i) {
    if (isBoolean(i)) return false;
    if (isRegExp(i) && new RegExp("").toString() == i.toString()) return true;
    if (isString(i) || isNumber(i) || isFunction(i)) return ! i;
    if (Boolean(i) && false != i) {
        for (var I in i) if (i.hasOwnProperty(I)) return false
    }
    return true
}
function gluePath() {
    var i = arguments.length,
    I = i - 2,
    l = arguments[i - 1];
    for (; I >= 0; I--) l = ((!isString(arguments[I]) && !isNumber(arguments[I])) || isEmpty(arguments[I]) ? l: arguments[I] + '\x00' + l);
    return l ? l.replace(/\/*\x00+\/*/g, "/") : ""
}
function findPath(i) {
    var I = document.getElementsByTagName('html')[0].innerHTML,
    l = new RegExp('<scr' + 'ipt[^>]+?src\\s*=\\s*["\']?([^>]+?/|)(' + i + ')([^"\'\\s]*)[^>]*>(.|[\r\n])*?</scr' + 'ipt>', 'i'),
    o = I.match(l);
    if (o) {
        if (!o[1]) o[1] = "";
        if (o[1].match(/^((https?|file)\:\/{2,}|\w:[\\])/)) return o[1];
        if (o[1].indexOf("/") == 0) return o[1];
        b = document.getElementsByTagName('base');
        if (b[0] && b[0].href) return b[0].href + o[1];
        return (document.location.href.match(/(.*[\/\\])/)[0] + o[1]).replace(/^\/+/, "");
    }
    return null
}
function getScriptQuery(i) {
    var I = document.getElementsByTagName('html')[0].innerHTML,
    l = new RegExp('<scr' + 'ipt[^>]+?src\\s*=\\s*["\']?(?:[^>]+?/|)' + i + '([^#"\']*).+?</scr' + 'ipt>', 'i'),
    o = I.match(l);
    if (o) return parseQuery(o[1].replace(/^[^?]*\?([^#]+)/, "$1"));
    return {}
}
function parseQuery(i) {
    if ('string' != typeof i || i.length < 2) return {};
    i = i.split(/&amp;|&/g);
    for (var I = 0,
    l = i.length,
    o = {},
    O, Q; I < l; I++) {
        O = i[I].split("=");
        O[0] = O[0].replace(/[{}\[\]]*$/, "");
        Q = o[O[0]];
        O[1] = unescape(O[1] ? O[1].replace("+", " ") : "");
        if (Q) if ('array' == typeof(Q)) o[O[0]][o[O[0]].length] = O[1];
        else o[O[0]] = [o[O[0]], O[1]];
        else o[O[0]] = O[1]
    }
    return o
}
function table2array(i, I, l, o) {
    if (isString(i)) i = document.getElementById(i);
    if (!i || !DOM.hasTagName(i, ['table', 'tbody,', 'thead', 'tfoot'])) return null;
    if (!isEmpty(l) && (!isString(l) || !(i = i.getElementsByTagName(l)))) return null;
    if (!isEmpty(o) && (!isNumber(o) || o < 0 || !(i = i[o]))) return null;
    if (isUndefined(i.rows)) return null;
    var O = [],
    Q = document.createElement('span'),
    _ = null,
    c = null;
    for (var C = 0,
    e = i.rows.length; C < e; C++) {
        var v = [];
        if (isArray(I)) {
            for (var V = 0,
            x = I.length; V < x; V++) {
                c = i.rows[C].cells[I[V]];
                if (c) {
                    Q.innerHTML = c.innerText ? c.innerText: c.innerHTML.replace(/<script\s+(.|\r?\n)*?<\/script>|<[^>]*>/g, "");
                    Q.normalize();
                    v[v.length] = Q.firstChild ? Q.firstChild.nodeValue.trim(" \xA0") : ""
                } else {
                    v[v.length] = ""
                }
            }
        } else {
            for (var V = 0,
            X = i.rows[C].cells.length; V < X; V++) {
                cd = i.rows[C].cells[V];
                Q.innerHTML = c.innerText ? c.innerText: c.innerHTML.replace(/<script\s+(.|\r?\n)*?<\/script>|<[^>]*>/g, "");
                Q.normalize();
                v[v.length] = Q.firstChild ? Q.firstChild.nodeValue.trim(" \xA0") : ""
            }
        }
        if (!isEmpty(v)) O[O.length] = v
    }
    return O
}
document.createElementExt = function(i, I) {
    var l, o, O, Q = document.createElement(i);
    if (!Q) return null;
    for (o in I) {
        if (!I.hasOwnProperty(o)) continue;
        switch (o) {
        case "class":
            Q.setAttribute('className', I[o]);
            Q.setAttribute('class', I[o]);
            break;
        case "style":
            for (O in I[o]) {
                if (!I[o].hasOwnProperty(O)) continue;
                Q.style[O] = I[o][O]
            }
            break;
        case "event":
            for (O in I[o]) {
                if (!I[o].hasOwnProperty(O)) continue;
                Q.attachEvent(O, I[o][O]);
            }
            break;
        case "child":
            l = I[o].length;
            for (O = 0; O < l; O++) Q.appendChild(I[o][O]);
            break;
        case "param":
            for (O in I[o]) {
                if (!I[o].hasOwnProperty(O)) continue;
                try {
                    Q[O] = I[o][O]
                } catch(e) {}
            }
            break
        }
    }
    return Q
};
function playInterval(I, o, O) {
    return setInterval(function() { (O instanceof Array) ? I.apply(this, O) : I.call(this, O)
    },
    o)
}
function playTimeout(I, o, O) {
    return setTimeout(function() { (O instanceof Array) ? I.apply(this, O) : I.call(this, O)
    },
    o)
}
function cloneObject(i) {
    if (isScalar(i) || isFunction(i) || null == i) return i;
    try {
        var I = new i.constructor();
    } catch(e) {
        return null
    }
    if (isArray(I)) {
        for (var l = 0,
        o = i.length; l < o; l++) {
            I[l] = cloneObject(i[l]);
        }
    } else {
        for (var l in i) {
            if (!i.hasOwnProperty(l)) continue;
            I[l] = cloneObject(i[l]);
        }
    }
    return I
}
function mergeObject() {
    var i = {},
    I, l;
    for (var o = 0,
    O = arguments.length; o < O; o++) {
        l = arguments[o];
        for (var Q in l) {
            if (!l.hasOwnProperty(Q)) continue;
            I = l[Q];
            if (null == I) {
                if (!i.hasOwnProperty(Q)) i[Q] = I
            } else if (isArray(I)) {
                if (isArray(i[Q])) i[Q] = i[Q].concat(I).unique();
                else i[Q] = I.slice(0);
            } else if (isScalar(I) || isFunction(I)) {
                i[Q] = I
            } else {
                if (i.hasOwnProperty(Q)) i[Q] = mergeObject(i[Q], I);
                else i[Q] = cloneObject(I);
            }
        }
    }
    return i
}
function loadStyleSheet(i) {
    if (!hasStyleSheet(i)) {
        var I = document.getElementsByTagName('head')[0],
        l = document.createElement('link');
        l.rel = 'stylesheet';
        l.type = 'text/css';
        l.href = i;
        I.appendChild(l);
    }
}
function hasStyleSheet(i) {
    var I = document.getElementsByTagName('html')[0].innerHTML,
    l = new RegExp('<link[^>]+?src\s*=\s*["\']?([^>]+?/)' + sn + '[^>]*>', 'i');
    return l.test(I);
}
if ('undefined' == typeof Object.hasOwnProperty) {
    Object.prototype.hasOwnProperty = function(i) {
        return ! ('undefined' == typeof this[i] || this.constructor && this.constructor.prototype[i] && this[i] === this.constructor.prototype[i]);
    }
}
if (isUndefined(Array.prototype.concat)) {
    Array.prototype.concat = function(i) {
        var I = this.copy();
        for (var l = 0,
        o = i.length; l < o; l++) {
            I[I.length] = i[l]
        }
        return I
    }
}
if (isUndefined(Array.prototype.copy)) {
    Array.prototype.copy = function() {
        var i = new Array();
        for (var I = 0,
        l = this.length; I < l; I++) {
            i[I] = this[I]
        }
        return i
    }
}
if (isUndefined(Array.prototype.pop)) {
    Array.prototype.pop = function() {
        var i = undefined;
        if (this.length > 0) {
            i = this[this.length - 1];
            this.length--
        }
        return i
    }
}
if (isUndefined(Array.prototype.push)) {
    Array.prototype.push = function() {
        var i = this.length;
        for (var I = 0; I < arguments.length; I++) {
            this[i + I] = arguments[I]
        }
        return this.length
    }
}
if (isUndefined(Array.prototype.shift)) {
    Array.prototype.shift = function() {
        var i = this[0];
        for (var I = 0,
        l = this.length - 1; I < l; I++) {
            this[I] = this[I + 1]
        }
        this.length--;
        return i
    }
}
if (isUndefined(Array.prototype.slice)) {
    Array.prototype.slice = function(i, I) {
        var l;
        if (I == null || I == '') I = this.length;
        else if (I < 0) I = this.length + I;
        if (i < 0) i = this.length + i;
        if (I < i) {
            l = I;
            I = i;
            i = l
        }
        var o = new Array();
        for (var O = 0; O < I - i; O++) {
            o[O] = this[i + O]
        }
        return o
    }
}
if (isUndefined(Array.prototype.splice)) {
    Array.prototype.splice = function(i, I) {
        if (I == null || I == '') I = this.length - i;
        var l = this.copy();
        for (var o = i,
        O = i + arguments.length - 2; o < O; o++) {
            this[o] = arguments[o - i + 2]
        }
        var Q = I - arguments.length + 2;
        for (var o = i + arguments.length - 2,
        _ = this.length - I + arguments.length - 2; o < _; o++) {
            this[o] = l[o + Q]
        }
        this.length = this.length - Q;
        return l.slice(i, i + I);
    }
}
if (isUndefined(Array.prototype.unshift)) {
    Array.prototype.unshift = function(i) {
        for (var I = this.length - 1; I >= 0; I--) {
            this[I + 1] = this[I]
        }
        this[0] = i;
        return this.length
    }
}
Array.prototype.indexOf = function(i, I) {
    for (var l = (null == I || isNaN(I) || I < 0) ? 0 : Math.round(I), o = this.length, O = -1; O == -1 & l < o; l++) {
        O = (this[l] == i) ? l: O
    }
    return O
};
Array.prototype.lastIndexOf = function(i, I) {
    for (var l = (null == I || isNaN(I) || I > this.length) ? this.length - 1 : Math.round(I), o = -1; o == -1 & l > -1; l--) {
        o = (this[l] == i) ? l: o
    }
    return o
};
if (isUndefined(Array.prototype.map)) {
    Array.prototype.map = function(i, I) {
        if ('function' != typeof i) return this;
        var l = new Array(this.length);
        for (var o = this.length - 1; o >= 0; o--) {
            l[o] = i.call(I, this[o], o, this);
        }
        return l
    }
}
if (isUndefined(Array.prototype.unique)) {
    Array.prototype.unique = function() {
        var i = [];
        for (var I = 0,
        l = this.length; I < l; I++) {
            if (i.indexOf(this[I]) < 0) i[i.length] = this[I]
        }
        return i
    }
}
if (isUndefined(Array.prototype.flatten)) {
    Array.prototype.flatten = function(i, I) {
        if (this.length < 1) return [];
        if (isNumeric(i)) i = [i];
        var l = false;
        if (isArray(i)) {
            l = {};
            for (var o = 0,
            O = i.length; o < O; o++) l[i[o]] = true
        }
        var Q = [];
        for (var o = 0,
        _ = this.length; o < _; o++) {
            if (isUndefined(this[o])) continue;
            if (!isArray(this[o])) {
                if (false === l) Q[Q.length] = this[o]
            } else {
                for (var c = 0,
                O = this[o].length; c < O; c++) {
                    if (false === l || l.hasOwnProperty(c)) Q[Q.length] = this[o][c]
                }
            }
        }
        return Q
    }
}
if (isUndefined(Array.prototype.filter)) {
    Array.prototype.filter = function(i) {
        if (!isFunction(i)) i = null;
        for (var I = 0,
        l = this.length,
        o = [], O = null; I < l; I++) {
            O = i ? i(this[I]) : this[I];
            if (!isEmpty(O)) o[o.length] = O
        }
        return o
    }
}
if (isUndefined(Array.prototype.binSearch)) {
    Array.prototype.binSearch = function(i, I) {
        var l = 0,
        o = this.length,
        O = Math.max(o - 1, 0),
        Q = Math.ceil(o / 2),
        _ = 0;
        if (null != I) while ((!this[Q] || i != this[Q][I]) && o >= l) {
            if (this[Q] && i > this[Q][I]) l = Q + 1;
            else o = Q - 1;
            Q = Math.max(0, Math.ceil((o + l) / 2))
        } else while (i != this[Q] && o >= l) {
            if (i > this[Q]) l = Q + 1;
            else o = Q - 1;
            Q = Math.max(0, Math.ceil((o + l) / 2));
        }
        return Q
    }
}
Array.prototype.heapSort = function() {
    var i = function(O, Q, _) {
        var c, I = O[Q];
        while (true) {
            c = (Q << 1) + 1;
            if (c > _) break;
            if (c < _ && O[c + 1] > O[c]) c++;
            if (I >= O[c]) break;
            O[Q] = O[c];
            Q = c
        }
        O[Q] = I
    },
    I,
    l = this.length - 1,
    o = l >> 1;
    while (o >= 0) i(this, o--, l);
    o = l;
    while (o > 0) {
        I = this[0];
        this[0] = this[o];
        this[o] = I;
        i(this, 0, --o);
    }
    return this
};
if (isUndefined(Array.range)) {
    Array.range = function(i, I, l) {
        if (!isNumber(i)) return null;
        if (!isNumber(l)) l = 1;
        if (!isNumber(I)) I = 0;
        var o = [],
        O = Math.min(I, i),
        Q = Math.max(I, i),
        _ = Math.abs(l),
        c = -1;
        do {
            c++;
            o[c] = O;
            O += _
        } while ( O <= Q );
        return l > 0 ? o: o.reverse();
    }
}
if (isUndefined(DOM)) var DOM = {};
DOM.getParent = function(i, I, l) {
    if (i == null) return null;
    else if (i.nodeType == 1 && ((!isUndefined(l) && i[I] == l) || ('string' == typeof I && DOM.hasTagName(i, I)) || i == I)) return i;
    else return arguments.callee(i.parentNode, I, l);
};
DOM.getOffset = function(i) {
    var I = true,
    l = i,
    o = 0,
    O = 0,
    Q = 0,
    _ = 0,
    c = null,
    C = null;
    if (l == null) return null;
    C = l.offsetParent;
    var e = l,
    i = l;
    while (i.parentNode != null) {
        i = i.parentNode;
        if (i.offsetParent !== null) {
            var v = true;
            if (I && window.opera) {
                if (i == e.parentNode || i.nodeName == "TR") {
                    v = false
                }
            }
            if (v) {
                if (i.scrollTop && i.scrollTop > 0) {
                    O -= i.scrollTop
                }
                if (i.scrollLeft && i.scrollLeft > 0) {
                    o -= i.scrollLeft
                }
            }
        }
        if (i == C) {
            o += l.offsetLeft;
            if (i.clientLeft && i.nodeName != "TABLE") {
                o += i.clientLeft
            }
            O += l.offsetTop;
            if (i.clientTop && i.nodeName != "TABLE") {
                O += i.clientTop
            }
            l = i;
            if (l.offsetParent == null) {
                if (l.offsetLeft) {
                    o += l.offsetLeft
                }
                if (l.offsetTop) {
                    O += l.offsetTop
                }
            }
            C = l.offsetParent
        }
    }
    if (e.offsetWidth) {
        Q = e.offsetWidth
    }
    if (e.offsetHeight) {
        _ = e.offsetHeight
    }
    return {
        'x': o,
        'y': O,
        'width': Q,
        'height': _
    }
};
DOM.getClientWidth = function(i) {
    var I = this.getWindow(i),
    l = I.document,
    o = 0;
    if (I.innerWidth) o = I.innerWidth;
    else if (l.documentElement && l.documentElement.clientWidth) o = l.documentElement.clientWidth;
    else if (l.body) o = l.body.clientWidth;
    return o
};
DOM.getOffsetWidth = function(i) {
    var I = this.getWindow(i),
    l = I.document,
    o = 0;
    if (I.outerWidth) o = I.outerWidth;
    else if (l.documentElement && l.documentElement.clientWidth) o = l.documentElement.clientWidth;
    else if (l.body) o = l.body.clientWidth;
    return o
};
DOM.getClientHeight = function(i) {
    var I = this.getWindow(i),
    l = I.document,
    o = 0;
    if (I.innerHeight) o = I.innerHeight;
    else if (l.documentElement && l.documentElement.clientHeight) o = l.documentElement.clientHeight;
    else if (l.body) o = l.body.clientHeight;
    return o
};
DOM.getOffsetHeight = function(i) {
    var I = this.getWindow(i),
    l = I.document,
    o = 0;
    if (I.outerHeight) o = I.outerHeight;
    else if (l.documentElement && l.documentElement.clientHeight) o = l.documentElement.clientHeight;
    else if (l.body) o = l.body.clientHeight;
    return o
};
DOM.getBodyScrollTop = function(i) {
    var I = this.getWindow(i),
    l = I.document;
    return I.pageYOffset || (l.documentElement && l.documentElement.scrollTop) || (l.body && l.body.scrollTop);
};
DOM.getBodyScrollLeft = function(i) {
    var I = this.getWindow(i),
    l = I.document;
    return I.pageXOffset || (l.documentElement && l.documentElement.scrollLeft) || (l.body && l.body.scrollLeft);
};
DOM.getWindow = function(i) {
    var I = window;
    if (i) {
        var l = i.ownerDocument;
        I = l.defaultView || l.parentWindow || l.window || window
    }
    return I
};
DOM.getCursorPosition = function(i) {
    if (i.pageX || i.pageY) return {
        'x': i.pageX,
        'y': i.pageY
    };
    var I = document.documentElement || document.body;
    return {
        'x': i.clientX + I.scrollLeft - (I.clientLeft || 0),
        'y': i.clientY + I.scrollTop - (I.clientTop || 0)
    }
};
DOM.hasTagName = function(i, I) {
    if ("string" == typeof I) I = [I];
    if (!isArray(I) || isEmpty(I) || isUndefined(i) || isEmpty(i.tagName)) return false;
    var l = i.tagName.toLowerCase();
    for (var o = 0,
    O = I.length; o < O; o++) {
        if (I[o].toLowerCase() == l) return true
    }
    return false
};
DOM.color2rgb = function(i) {
    var I;
    if (/^([a-z]+)($|\s[a-z]+)/i.test(i)) {
        var l = document.body,
        o = l.vLink;
        l.vLink = i.split(" ")[0];
        i = l.vLink;
        l.vLink = o
    }
    try {
        if (I = i.match(/^#([\da-f]{6})$/i)) {
            return I = parseInt(I[1], 16),
            [(I & 0xff0000) >> 16, (I & 0xff00) >> 8, (I & 0xff)]
        } else if (I = i.match(/^#([\da-f]{3})$/i)) {
            return I = parseInt(I[1], 16),
            [((I & 0xf00) >> 8) * 0x11, ((I & 0xf0) >> 4) * 0x11, (I & 0xf) * 0x11]
        } else return (i.match(/([\d%]+)/g).splice(0, 3).map(function(O) {
            return /%/.test(O) ? (parseInt(O) * 2.55).toFixed(0) : parseInt(O)
        }))
    } catch(err) {
        return
    }
};
DOM.setOpacity = function(i, I) {
    if (i.style.opacity != I) {
        i.style.opacity = i.style.KhtmOpacity = i.style.MozOpacity = I;
        i.style.filter = "alpha(opacity=" + (I * 100) + ")"
    }
};
DOM.StyleSheet = (function() {
    var _ = function(i, c) {
        var C = this;
        var e = function(o) {
            var O = 0;
            if (i && o) {
                var Q = c.document.getElementsByTagName("link"),
                V = new RegExp(i + "$", "i");
                for (var x = 0,
                X = Q.length; x < X; x++) {
                    var z = Q[x];
                    if (V.test(z.href)) {
                        o(z);
                        O++
                    }
                }
            }
            return O
        };
        var v = function() {
            var o = [];
            if (i) {
                var O = c.document.getElementsByTagName('head')[0],
                Q = new RegExp('<link[^>]+?href\\s*=\\s*["\']?(([^>]+?/|)' + i + '[^"\'\\s]*)[^>]*>', 'ig'),
                V = Q.exec(O.innerHTML);
                while (V && V[1]) {
                    o.push(V[1]);
                    V = Q.exec(O.innerHTML);
                }
            }
            return o
        };
        C.remove = function() {
            return e(function(I) {
                I.parentNode.removeChild(I)
            });
        };
        C.disable = function() {
            return e(function(I) {
                I.disabled = true
            });
        };
        C.enable = function() {
            return e(function(I) {
                I.disabled = false
            });
        };
        C.add = function() {
            if (!C.exists()) {
                var O = c.document.getElementsByTagName('head')[0],
                Q = c.document.createElement('link');
                Q.rel = 'stylesheet';
                Q.type = 'text/css';
                Q.href = 'css/keyboard.css'||i;
                /**/
                O.appendChild(Q);
            }
        };
        C.exists = function() {
            return Boolean(v().length);
        };
        C.count = function() {
            return v().length
        };
        C.get = function(I) {
            return v()[(parseInt(I) || 0)]
        }
    };
    return function(I, l) {
        if (I && !/\.css$/i.test(I)) {
            I += ".css"
        }
        if (!l || !l.document) {
            l = window
        }
        return new _(I, l);
    }
})();
DOM.CSS = (function() {
    var I = arguments.callee;
    I.addClass = function() {
        var l = isArray(arguments[0]) ? arguments[0] : Array.prototype.slice.call(arguments);
        var o = I.el;
        o.className = o.className + " " + Array.prototype.join.call(l, " ");
        return I
    };
    I.removeClass = function() {
        var l = isArray(arguments[0]) ? arguments[0] : arguments;
        var o = arguments.callee;
        if (!o.cache) o.cache = {};
        var O = o.cache;
        var Q = I.el;
        for (var _ = 0,
        c = l.length; _ < c; _++) {
            var C = l[_];
            if (!O.hasOwnProperty(C)) O[C] = new RegExp("((^|\\s+)" + C + "(?=\\s|$))+", "g");
            Q.className = Q.className.replace(O[C], " ");
        }
        Q.className = Q.className.replace(/\s{2,}/g, " ");
        return I
    };
    I.hasClass = function(l) {
        re = new RegExp("(^|\\s+)" + l + "(\\s+|$)");
        return I.el.className.match(re, " " + l + " ");
    };
    I.getClass = function() {
        return I.el.className
    };
    I.getClassValue = function(l) {
        var o = I.el.className.match(new RegExp("(^|\\s)" + l + ":([^\\s]+)"));
        return o ? ((o[2].indexOf(":") + 1) ? o[2].split(":") : o[2]) : null
    };
    I.getComputedStyle = function(l) {
        var o;
        var O = I.el;
        if (I.el.currentStyle) o = l ? O.currentStyle[l] : O.currentStyle;
        else if (window.getComputedStyle) {
            o = document.defaultView.getComputedStyle(O, null);
            if (l) o = o[l]
        } else {
            o = null
        }
        return o
    };
    return function(l) {
        I.el = l;
        return I
    }
})();
var EM = new
function() {
    var C = this;
    var e = [];
    var v = 0;
    var V = {
        'UEID': '__eventManagerUniqueElementId'
    };
    var x = function(i) {
        Z(i);
        var l = null,
        O = null,
        Q = i.target,
        c = true,
        X = true;
        if (!i.currentTarget || !(l = i.currentTarget[V.UEID]) || !(O = e[l].handler[i.type])) return;
        for (var s = 0,
        S = O.length; s < S; s++) X = X && !(false === O[s].call(i.currentTarget, i));
        return X
    };
    var z = function(i) {
        for (var l = e.length - 1,
        o = null,
        Q = null; l >= 0; l--) {
            if (e[l] && (Q = (o = e[l]).node)) {
                for (var _ in o.handler) {
                    if (!o.handler.hasOwnProperty(_)) continue;
                    try {
                        if (Q.removeEventListener) {
                            Q.removeEventListener(_, o.rootEHCaller ? o.rootEHCaller: x, false);
                        } else if (Q.detachEvent) {
                            Q.detachEvent('on' + _, o.rootEHCaller ? o.rootEHCaller: x);
                        }
                    } catch(i) {};
                    o.handler[_].length = 0
                }
            }
            Q = o.node = null
        }
        if (window.removeEventListener) {
            window.removeEventListener(_, arguments.callee, false);
        } else {
            window.detachEvent('on' + _, arguments.callee);
        }
    };
    var Z = function(I) {
        var l = C.EU.length,
        o, O, Q, _;
        while (l--) {
            o = C.EU[l];
            if (o[0].test(I.type)) {
                Q = o[1].length;
                _ = null;
                while (Q--) {
                    O = o[1][Q];
                    if ('init' == O[0]) _ = O[1];
                    else if (!I[O[0]]) I[O[0]] = O[1]
                }
                if (_) _.call(I);
            }
        }
        if (!I.target && I.type != 'unload') I.target = I.srcElement;
        return I
    };
    var w = function(i, I) {
        return i[V.UEID] || (I && (i[V.UEID] = ++v));
    };
    C.addEventListener = function(i, l, o) {
        if (!i || !isFunction(o)) return false;
        var Q = w(i, true),
        _ = null,
        s = null;
        if (!e[Q]) {
            e[Q] = {
                'node': i,
                'handler': {}
            }
        };
        _ = e[Q];
        if (!_.handler.hasOwnProperty(l)) {
            _.handler[l] = s = [];
            if (i.addEventListener) {
                i.addEventListener(l, x, false);
            } else if (i.attachEvent) {
                s.rootEHCaller = function(I) {
                    I.currentTarget = _.node;
                    var c = x(I);
                    I.currentTarget = null;
                    return c
                };
                i.attachEvent('on' + l, s.rootEHCaller);
            }
        } else {
            s = _.handler[l]
        }
        if (s.indexOf(o) == -1) {
            s[s.length] = o;
            return true
        }
        return false
    };
    C.removeEventListener = function(i, l, o) {
        if (!i || !isFunction(o)) return false;
        var Q = w(i),
        _ = e[Q],
        X = null;
        if (_ && (X = _.handler[l])) {
            X.splice(X.indexOf(o), 1);
            if (0 == X.length) {
                delete _.handler[l];
                if (i.removeEventListener) {
                    i.removeEventListener(l, X.rootEHCaller ? X.rootEHCaller: x, false);
                } else if (i.detachEvent) {
                    i.detachEvent('on' + l, X.rootEHCaller ? X.rootEHCaller: x);
                }
            }
            return true
        }
        return false
    };
    C.dispatchEvent = function(i) {
        var I = x(i);
        return I
    };
    C.registerEvent = function(i, l, o, O) {
        var Q = w(i, true);
        if (!e[Q]) {
            e[Q] = {
                'node': i,
                'handler': []
            }
        } else {
            e[Q].node = i
        }
        return new EM.EventTarget(i, l, o, O);
    };
    var W = function() {
        if (window.attachEvent && !window.addEventListener) {
            window.attachEvent('onunload', z);
        }
    };
    W();
};
EM.preventDefaultAction = function(i) {
    i.preventDefault();
};
EM.stopPropagationAction = function(i) {
    i.stopPropagation();
};
EM.EventTarget = function(O, e, v, V) {
    var x = this;
    var X = !!v;
    var z = isFunction(V) ? V: null;
    x.trigger = function(W, s) {
        if (! (arguments.length - 1) && W != O) {
            s = W;
            W = null
        }
        if (!W) W = O;
        var S = {},
        k = true,
        K = true,
        q = null;
        for (var E in s) {
            if (s.hasOwnProperty(E)) S[E] = s[E]
        }
        X = !!v;
        z = V;
        do {
            S.preventDefault = Z;
            S.stopPropagation = w;
            S.target = W;
            S.currentTarget = W;
            S.type = e;
            q = EM.dispatchEvent(S);
            K &= (isUndefined(q));
            k &= !(false === q);
        } while (( W = W . parentNode ) && X);
        if (isFunction(z) && k && !K) {
            z(S);
        }
        return (z && k && !K);
    };
    var Z = function() {
        z = null
    };
    var w = function() {
        X = false
    }
};
EM.EU = [[/./, [['preventDefault',
function() {
    this.returnValue = false
}], ['stopPropagation',
function() {
    this.cancelBubble = true
}]]], [/^mouse(over|out|down|up)/, [['getButton',
function() {
    return this.button == 2 ? 2 : 1
}], ['EM_MB_LEFT', '1'], ['EM_MB_RIGHT', '2']]], [/^key(down|up|press)/, [['getKeyCode',
function() {
    switch (this.keyCode) {
    case 189:
        return 109;
    case 187:
        return 61;
    case 107:
        return 61;
    case 186:
        return 59;
    default:
        return this.keyCode
    }
}], ['getRepeat',
function() {
    return arguments.callee.repeat
}], ['init',
function() {
    var i = this.getRepeat;
    if ('keyup' == this.type) {
        i.repeat = 0;
        i.keyCode = 0
    } else if ('keydown' == this.type) {
        i.repeat = i.keyCode == this.keyCode;
        i.keyCode = this.keyCode
    }
}]]]]; (function() {
    var O = EM.registerEvent(window, 'domload'),
    Q = false,
    _ = function() {
        EM.removeEventListener(document, 'propertychange', c.ie);
        EM.removeEventListener(document, 'DOMContentLoaded', c.mz);
        EM.removeEventListener(window, 'load', c.mz);
    },
    c = {
        'ie': function(o) {
            if (window.event.propertyName == 'activeElement' && !Q) {
                O.trigger(window);
                _();
                Q = true
            }
        },
        'mz': function(l) {
            if (!Q) O.trigger(window);
            Q = true
        }
    };
    EM.addEventListener(document, 'propertychange', c.ie);
    EM.addEventListener(document, 'DOMContentLoaded', c.mz);
    if (/WebKit|Khtml/i.test(navigator.userAgent) || (window.opera && parseInt(window.opera.version()) < 9))(function() {
        if (!Q) / loaded | complete / .test(document.readyState) ? (O.trigger(window), Q = true) : setTimeout(arguments.callee, 100)
    })();
    EM.addEventListener(window, 'load', c.mz);
})();
RegExp.escape = function(i) {
    if (!arguments.callee.sRE) {
        var I = ['/', '.', '*', '+', '?', '|', '(', ')', '[', ']', '{', '}', '$', '^', '\\'];
        arguments.callee.sRE = new RegExp('(\\' + I.join('|\\') + ')', 'g');
    }
    return isString(i) ? i.replace(arguments.callee.sRE, '\\$1') : (isArray(i) ? i.map(RegExp.escape).join("|") : "");
};
String.fromCharCodeExt = function(i) {
    if (i < 0x10000) {
        return String.fromCharCode(i);
    }
    i -= 0x10000;
    return String.fromCharCode(i >> 10 | 0xD800) + String.fromCharCode(i & 0x3FF | 0xDC00)
};
String.prototype.entityDecode = function() {
    if (!arguments.callee.span) arguments.callee.span = document.createElement('span');
    var i = arguments.callee.span;
    i.innerHTML = this;
    return i.firstChild ? i.firstChild.nodeValue: ""
};
String.prototype.ltrim = function(i) {
    if (isString(i)) i = i.split("");
    if (isArray(i) || isUndefined(i)) {
        i = isEmpty(i) ? "\\s": RegExp.escape(i);
        i = new RegExp("^(?:" + i + ")+", "g");
        return this.replace(i, "");
    }
    return this
};
String.prototype.rtrim = function(i) {
    if (isString(i)) i = i.split("");
    if (isArray(i) || isUndefined(i)) {
        i = isEmpty(i) ? "\\s": RegExp.escape(i);
        i = new RegExp("(?:" + i + ")+$", "g");
        return this.replace(i, "");
    }
    return this
};
String.prototype.trim = function(i) {
    if (isString(i)) i = i.split("");
    if (isArray(i) || isUndefined(i)) {
        i = isEmpty(i) ? "\\s": RegExp.escape(i);
        i = new RegExp("^(?:" + i + ")+|(?:" + i + ")+$", "g");
        return this.replace(i, "");
    }
    return this
};
String.prototype.dup = function() {
    var i = this.valueOf();
    return [i, i].join("");
};
String.prototype.repeat = function(i) {
    if (isNaN(i = parseInt(i)) || i < 0) return "";
    return Array(i + 1).join(this.valueOf());
};
String.prototype.padding = function(i, I) {
    var l = this.valueOf();
    i = parseInt(i);
    if (!i) return l;
    if (isUndefined(I)) I = " ";
    var o = String(I).charAt(0).repeat(Math.abs(i) - this.length);
    return (i < 0) ? o + l: l + o
};
String.prototype.padLeft = function(i, I) {
    return this.padding( - Math.abs(i), I);
};
String.prototype.padRight = function(i, I) {
    return this.padding(Math.abs(i), I);
};
String.prototype.sprintf = function() {
    var l = isArray(arguments[0]) ? arguments[0] : arguments,
    o = 0,
    O = this.replace(/%%/g, "\0\0"),
    Q = /%((?:\d+\$)?)((?:[-0+# ])?)((?:\d+|\*(?:\d+\$)?)?)((?:.(?:\d+|\*(?:\d+\$)?))?)([bcdeEfosuxX])/g;
    O = O.replace(Q,
    function() {
        var _ = arguments,
        c = false,
        C;
        if (!isUndefined(_[3]) && _[3].indexOf("*") == 0) {
            _[3] = parseInt(_[3].replace(/\D/g, ""));
            if (isNaN(_[3])) {
                _[3] = l[o];
                o++
            } else {
                _[3] = l[_[3]]
            }
        }
        if ("" != _[4]) {
            if (_[4].indexOf("*") == 1) {
                _[4] = parseInt(_[4].replace(/\D/g, ""));
                if (isNaN(_[4])) {
                    _[4] = l[o];
                    o++
                } else {
                    _[4] = l[_[4]]
                }
            } else {
                _[4] = _[4].replace(/\D/, "")
            }
            _[4] = Math.abs(_[4]);
        }
        _[1] = parseInt(_[1]);
        var C;
        if (isNumeric(_[1])) {
            C = l[_[1]]
        } else {
            C = l[o];
            o++
        }
        switch (_[5]) {
        case "b":
            if (C < 0) C = 0x10000000000000000 + parseInt(C);
            C = Number(C).bin(_[4]);
            if (_[4]) C = C.substr(0, _[4]);
            if (_[2] == '#') C = '0b' + C;
            break;
        case "c":
            C = String.fromCharCode(C);
            break;
        case "u":
            C = Math.abs(C);
        case "d":
            C = Math.round(C);
            if (C < 0) {
                C = "-" + Math.abs(C).dec(_[4]);
            } else {
                C = Number(C).dec(_[4]);
                c = (_[2] == ' ' || _[2] == '+');
            }
            break;
        case "e":
        case "E":
            if (C > 0) {
                c = (_[2] == ' ' || _[2] == '+');
            }
            C = Number(C).toExponential(_[4] ? _[4] : 6);
            if (_[5] == 'E') C = C.toUpperCase();
            break;
        case "f":
            if (C > 0) {
                c = (_[2] == ' ' || _[2] == '+');
            }
            C = Number(C).toFixed(isNumeric(_[4]) ? _[4] : 6);
            break;
        case "o":
            if (C < 0) C = 0x10000000000000000 + parseInt(C);
            C = Number(C).toString(8);
            if (_[4]) C = C.substr(0, _[4]);
            if (_[2] == '#' && C != 0) C = '0' + C;
            break;
        case "s":
            C = String(C);
            if (_[4]) C = C.substr(0, _[4]);
            break;
        case "x":
        case "X":
            if (C < 0) C = 0x10000000000000000 + parseInt(C);
            C = Number(C).hex( - _[4]);
            if (_[4]) C = C.substr(0, _[4]);
            if (_[2] == '#') C = '0x' + C;
            if (_[5] == 'X') C = C.toUpperCase();
            break
        }
        if (c) C = _[2] + C;
        if (_[3]) C = (_[2] == '-' || _[3] < 0) ? C.padRight(_[3]) : C.padLeft(_[3], _[2] == '0' ? 0 : " ");
        return C
    });
    return O.replace(/\0\0/g, "%");
};
DocumentCookie = new
function() {
    var l = this;
    var o = {};
    l.get = function(i) {
        return o[i]
    };
    l.set = function(i, O, Q, _, c, C) {
        if (i) {
            O = escape(O);
            document.cookie = i + "=" + O + (_ ? ";path=" + _: "") + (Q ? ";NoExp=" + ((Q instanceof Date) ? Q.toGMTString() : new Date(new Date().getTime() + Q * 1000).toGMTString()) : "") + (c ? ";domain=" + c || document.location.domain: "") + (C ? ";secure": "");
            o[i] = O;
            return true
        }
        return false
    };
    l.isSet = function(i) {
        return !! o[i]
    };
    l.del = function(i, O, Q) {
        if (Cookie.isSet(i)) {
            document.cookie = i + "=" + (O ? "; path=" + O: "") + (Q ? "; domain=" + Q: "") + (secure ? "; secure": "") + "; NoExp=Thu, 01-Jan-70 00:00:01 GMT";
            delete o[i];
            return true
        }
        return false
    };
    l.delAll = function() {
        for (var O in o) {
            if (o.hasOwnProperty(O)) l.del(O);
        }
    }; (function() {
        var i = document.cookie.split(/\s*;\s*/);
        for (var O = 0,
        Q = i.length; O < Q; O++) {
            var _ = i[O].split(/\s*=\s*/);
            o[_[0]] = unescape(_[1]);
        }
    })()
};
DocumentSelection = new
function() {
    var O = this;
    var Q = {
        'prevCalcNode': '__prevCalcNode'
    };
    var _ = function(l, o) {
        var C = o[0],
        e,
        v = "";
        if (!C || !C.tagName) return false;
        switch (o[0].tagName.toLowerCase()) {
        case 'input':
            if (["button", "checkbox", "hidden", "image", "radio", "reset", "submit"].indexOf((C.type || "").toLowerCase()) > -1) return false;
        case 'textarea':
            v = "input";
            break;
        case 'iframe':
            v = "frame";
            o[0] = C.contentWindow;
            break;
        default:
            return false
        }
        if ('function' == typeof O.module[v]) O.module[v] = new O.module[v](Q);
        if (!O.module[v] || !O.module[v][l]) throw new Error('Method \'' + l + '\' is not implemented for DocumentSelection \'' + v + '\' module.');
        return O.module[v][l].apply(O, o);
    };
    var c = function(I, l, o) {
        if (window.getSelection && 'iframe' != I.tagName.toLowerCase()) {
            var C = O.getSelectionOffset(I);
            if (I.contentWindow) I = I.contentWindow.document.body;
            var e = C.y - l;
            if (e < 0) I.scrollTop = C.y;
            else if (e + C.h > I.clientHeight) I.scrollTop = C.y - I.clientHeight / 2;
            else I.scrollTop = l;
            if (o > C.x) I.scrollLeft = C.x;
            else if (o + I.clientWidth > C.x) I.scrollLeft = o;
            else I.scrollLeft = C.x - I.clientWidth / 2
        }
    };
    O.setRange = function(I, C, e, v) {
        var V = I.scrollTop,
        x = I.scrollLeft;
        if (v) {
            var X = O.getStart(I);
            e = X + e;
            C = X + C
        }
        if (C < 0) C = 0;
        if (e < C) e = C;
        _('setRange', [I, C, e]);
        c(I, V, x);
    };
    O.getSelection = function(i) {
        return _('getSelection', [i]);
    };
    O.getStart = function(i) {
        return _('getPos', [i])[0]
    };
    O.getEnd = function(i) {
        return _('getPos', [i])[0]
    };
    O.getCursorPosition = function(I) {
        return O.getStart(I);
    };
    O.insertAtCursor = function(i, I, C) {
        var e = i.scrollTop,
        v = i.scrollLeft;
        if (!C) {
            _('del', [i]);
        }
        var V = _('ins', [i, I]);
        c(i, e, v);
        return V
    };
    O.wrapSelection = function(I, l, o) {
        var C = O.getCursorPosition(I),
        e = O.getEnd(I);
        if (C == e) {
            O.insertAtCursor(I, l + o);
        } else {
            O.insertAtCursor(I, l, true);
            O.setRange(I, e + l.length, e + l.length);
            O.insertAtCursor(I, o, true);
        }
    };
    O.deleteAtCursor = function(I, l) {
        if (!O.getSelection(I)) {
            if (l) O.setRange(I, 0, 1, true);
            else O.setRange(I, -1, 0, true);
        }
        return O.deleteSelection(I);
    };
    O.deleteSelection = function(i) {
        var I = i.scrollLeft,
        C = i.scrollTop,
        e = _('del', [i]);
        c(i, C, I);
        return e
    };
    O.getSelectionOffset = function(i) {
        return _('getSelectionOffset', [i], true);
    };
    O.getContext = function(i) {
        return _('getContext', [i]);
    }
};
DocumentSelection.module = {
    'input': function(o) {
        var O = this;
        var Q = null;
        O.getContext = function(i) {
            var l = O.getPos(i),
            _ = i.value,
            c = _.match(new RegExp("(?:.|[\\r\\n]){0," + (l[0] - 1) + "}(?:^|\\s)", "m")) || "",
            C = _.match(new RegExp("(?:.|[\\r\\n]){" + l[0] + "}", "m"))[0],
            e = _.replace(C, ""),
            v = e.substring(0, l[1] - l[0]),
            V = (e.replace(v, "")).match(/(?:\S|$)*/);
            return [C.replace(c, ""), v, V]
        };
        O.getPos = function(i) {
            var I = i.value;
            var l = [I.length, I.length];
            if ('function' == typeof window.getSelection) {
                try {
                    l = [i.selectionStart, i.selectionEnd]
                } catch(e) {}
            } else if (window.document.selection) {
                i.setActive();
                var _ = i.document.selection.createRangeCollection()[0];
                if (i.tagName.toLowerCase() == "textarea") {
                    var c = _.duplicate();
                    c.moveToElementText(i);
                    var C = (window.opera ? I: I.replace(/\r/g, "")).length;
                    c.setEndPoint('StartToEnd', _);
                    var v = 0 + C - (window.opera ? c.text: c.text.replace(/\r/g, "")).length;
                    c.setEndPoint('StartToStart', _);
                    var V = 0 + C - (window.opera ? c.text: c.text.replace(/\r/g, "")).length;
                    l[0] = Math.min(v, V);
                    l[1] = Math.max(v, V);
                } else {
                    var x = i.createTextRange();
                    x.setEndPoint('EndToStart', _);
                    l[0] = (window.opera ? x.text: x.text.replace(/\r/g, "")).length;
                    x.setEndPoint('EndToEnd', _);
                    l[1] = (window.opera ? x.text: x.text.replace(/\r/g, "")).length
                }
            }
            return l
        };
        O.del = function(i) {
            var l = "",
            _ = O.getPos(i),
            c = _[0],
            C = _[1];
            if (c != C) {
                var e = document.selection && !window.opera ? i.value.replace(/\r/g, "") : i.value;
                l = e.substring(c, C);
                i.value = e.substring(0, c) + e.substring(C, e.length);
                O.setRange(i, c, c);
            }
            return l
        };
        O.ins = function(i, l) {
            var _ = "",
            c = O.getPos(i)[0],
            C = i.value.length;
            var e = document.selection && !window.opera ? i.value.replace(/\r/g, "") : i.value;
            i.value = e.substring(0, c) + l + e.substring(c, e.length);
            c += i.value.length - C;
            O.setRange(i, c, c);
            return c
        };
        O.getSelection = function(i) {
            var l = O.getPos(i),
            _ = l[0],
            c = l[1];
            if (c < _) c = _;
            var C = document.selection && !window.opera ? i.value.replace(/\r/g, "") : i.value;
            return C.substring(_, c);
        };
        O.setRange = function(i, l, _) {
            if ('function' == typeof i.setSelectionRange) {
                try {
                    i.setSelectionRange(l, _)
                } catch(e) {};
                var c = O.getPos(i);
            } else {
                var C;
                C = i.createTextRange();
                i.setActive();
                C.collapse(true);
                C.moveStart("character", l);
                C.moveEnd("character", _ - l);
                C.select();
            }
        };
        O.getSelectionOffset = function(I) {
            var _, c = DOM.getWindow(I).document;
            if ('function' == typeof I.setSelectionRange) {
                if (!Q) {
                    Q = c.createElement('td');
                    c.body.appendChild(Q);
                }
                if (Q[o.prevCalcNode] != I) {
                    Q[o.prevCalcNode] = I;
                    var C = c.defaultView.getComputedStyle(I, null);
                    for (var v in C) {
                        try {
                            if (C[v] && 'content' != v) Q.style[v] = C[v]
                        } catch(e) {}
                    }
                    Q.style.overflow = 'auto';
                    Q.style.position = 'absolute';
                    Q.style.visibility = 'hidden';
                    Q.style.zIndex = '-10';
                    Q.style.left = "-10000px";
                    Q.style.top = "-10000px";
                    Q.style.clip = "";
                    Q.style.maxWidth = "";
                    Q.style.maxHeight = "";
                    Q.style.backgroundColor = 'yellow'
                }
                var _ = c.createRange(),
                V = I.value || " ";
                if ('input' == I.tagName.toLowerCase()) {
                    Q.style.width = 'auto';
                    Q.style.whiteSpace = 'nowrap'
                } else {
                    Q.style.whiteSpace = 'off' == I.getAttribute('wrap') ? "pre": ""
                }
                V = V.replace(/\x20\x20/g, "\x20\xa0").replace(/</g, "&lt;").replace(/>/g, "&gt").replace(/\r/g, "");
                Q.innerHTML = (V.substring(0, I.selectionStart - 1) + "<span>" + V.substring(I.selectionStart - 1, I.selectionStart) + "\xa0</span>" + V.substring(I.selectionStart)).replace(/\n/g, "<br />").replace(/\t/g, "<em style=\"white-space:pre\">\t</em>");
                var x = Q.getElementsByTagName('span')[0];
                x.style.border = '1px solid red';
                _.offsetLeft = x.offsetLeft;
                _.offsetTop = x.offsetTop;
                _.offsetHeight = x.offsetHeight;
                x = null
            } else if (c.selection && c.selection.createRange) {
                _ = c.selection.createRange();
                _.offsetHeight = Math.round(_.boundingHeight / (_.text.replace(/[^\n]/g, "").length + 1));
                if (I.tagName && 'textarea' == I.tagName.toLowerCase()) {
                    var X = DOM.getOffset(I);
                    _ = {
                        'offsetTop': _.offsetTop + I.scrollTop - X.y + DOM.getBodyScrollTop(I),
                        'offsetLeft': _.offsetLeft + I.scrollLeft - X.x + DOM.getBodyScrollLeft(I),
                        'offsetHeight': _.offsetHeight
                    }
                }
            }
            if (_) {
                return {
                    'x': _.offsetLeft,
                    'y': _.offsetTop,
                    'h': _.offsetHeight
                }
            }
            return {
                'x': 0,
                'y': 0,
                'h': 0
            }
        }
    },
    'frame': function() {
        var I = this;
        I.getContext = function(l) {
            if ('function' == typeof l.getSelection) {
                var o = I.getPos(l),
                O = l.document.body.innerText || l.document.body.innerHTML.replace(/<\/?[a-z:]+[^>]*>/ig, "").replace("&nbsp;", " "),
                Q = O.match(new RegExp("(?:.|[\\r\\n]){0," + (o[0] - 1) + "}(?:^|\\s)", "m")) || "",
                _ = O.match(new RegExp("(?:.|[\\r\\n]){" + o[0] + "}", "m")) || "",
                c = O.replace(_, ""),
                C = c.substring(0, o[1] - o[0]),
                e = (c.replace(C, "")).match(/(?:\S|$)*/);
                return [_.toString().replace(Q, ""), C, e]
            } else {
                var v = l.document.selection.createRange(),
                V = l.document.selection.createRange(),
                x = l.document.selection.createRange();
                v.moveStart("word", -1);
                x.moveEnd("word", 1);
                return [v.text.replace(new RegExp(RegExp.escape(V.text) + "$"), ""), V.text, x.text.replace(new RegExp("^" + RegExp.escape(V.text)), "")]
            }
        };
        I.getPos = function(i) {
            var l = [0, 0];
            if ('function' == typeof i.getSelection) {
                var o = i.getSelection(),
                O = o.anchorNode,
                Q = o.anchorOffset,
                _ = o.focusNode,
                c = o.focusOffset,
                C = false,
                e = false,
                v = 0,
                V = 0,
                x,
                X = i.document.createTreeWalker(i.document.body, NodeFilter.SHOW_TEXT, null, false);
                while (O && O.nodeType != 3) {
                    O = O.childNodes[Q];
                    Q = 0
                }
                while (_ && _.nodeType != 3) {
                    _ = _.childNodes[c];
                    c = 0
                }
                while (x = X.nextNode()) {
                    if (x == _) {
                        V += c;
                        e = true
                    }
                    if (x == O) {
                        v += Q;
                        C = true
                    }
                    if (!e) V += x.nodeValue.length;
                    if (!C) v += x.nodeValue.length;
                    if (e && C) break
                }
                l = [Math.min(V, v), Math.max(V, v)]
            } else {
                i.document.body.setActive();
                l = [Math.abs(i.document.selection.createRange().moveStart("character", -100000000)), Math.abs(i.document.selection.createRange().moveEnd("character", -100000000))]
            }
            return l
        };
        I.del = function(i) {
            if ('function' == typeof i.getSelection) {
                var l = i.getSelection(),
                o = l.rangeCount;
                while (--o > -1) l.getRangeAt(o).deleteContents();
                var O = l.getRangeAt(l.rangeCount - 1);
                O.insertNode(i.document.createTextNode(""));
                l.addRange(O);
            } else if (i.document && i.document.selection) {
                i.document.selection.createRange().text = "";
                i.document.selection.createRange().select();
            }
        };
        I.ins = function(l, o) {
            if ('function' == typeof l.getSelection) {
                o = o.replace(/&/, "&amp;").replace(/</, "&lt;").replace(/>/, "&gt;").replace(/\x20/, "&nbsp;").replace(/[\r\n]/, "<br />");
                var O = l.document.createElement('span'),
                Q = l.getSelection(),
                _ = Q.getRangeAt(0),
                c;
                O.innerHTML = o;
                _.insertNode(O);
                _.selectNodeContents(O);
                var C = O.parentNode,
                c = O.nextSibling;
                O.parentNode.replaceChild(_.extractContents(), O);
                if (!c) c = C.lastChild;
                var e = l.document.createRange();
                if (c.nodeValue) {
                    e.setStart(c, 0);
                } else {
                    e.setStartAfter(c);
                }
                Q.removeAllRanges();
                Q.addRange(e);
            } else if (l.document && l.document.selection) {
                l.document.body.setActive();
                var _ = l.document.selection.createRange();
                _.text = o;
                if (_.moveStart("character", 1)) {
                    _.moveStart("character", -1);
                    _.moveEnd("character", -1);
                    _.select();
                }
            }
            return I.getPos(l)[0]
        };
        I.getSelection = function(i, l, o) {
            if ('function' == typeof i.getSelection) {
                var l = i.getSelection();
                return l ? l.toString() : ""
            } else if (i.document && i.document.selection) {
                return i.document.selection.createRange().text
            }
        };
        I.setRange = function(i, l, o) {
            if ('function' == typeof i.getSelection) {
                var O = i.getSelection();
                O.removeAllRanges();
                var Q = i.document.createRange(),
                _ = 0,
                c = 0,
                C,
                e,
                v = i.document.createTreeWalker(i.document.body, NodeFilter.SHOW_TEXT, null, false);
                while ((C = v.nextNode()) && (!C.nodeValue.length || (_ + C.nodeValue.length <= l))) {
                    e = C;
                    _ += C.nodeValue.length
                }
                if (C || (C = e)) {
                    Q.setStart(C, l - _);
                    Q.setEnd(C, l - _);
                }
                if (C) {
                    do {
                        if (C.nodeType != 3) continue;
                        if (_ + C.nodeValue.length < o) {
                            _ += C.nodeValue.length
                        } else {
                            Q.setEnd(C, o - _);
                            break
                        }
                    } while ( C = v . nextNode ())
                }
                O.addRange(Q);
            } else if (i.document && i.document.selection) {
                i.document.body.setActive();
                var Q = i.document.selection.createRange();
                Q.moveToElementText(i.document.body);
                Q.move("character", l);
                Q.moveEnd("character", o - l);
                Q.select();
            }
        };
        I.getSelectionOffset = function(i) {
            var l = {
                'x': 0,
                'y': 0,
                'h': 0
            };
            if ('function' == typeof i.getSelection) {
                var o = i.getSelection().getRangeAt(0),
                O = i.document.createElement('span'),
                Q = o.cloneContents(),
                _ = o.endOffset,
                c = O;
                O.style.borderLeft = '1px solid red';
                o.surroundContents(O);
                l.h = c.offsetHeight;
                while (c.offsetParent) {
                    l.x += c.offsetLeft;
                    l.y += c.offsetTop;
                    c = c.offsetParent
                }
                O.parentNode.removeChild(O);
                var C = i.document.createRange();
                if (Q.childNodes.length > 0) {
                    for (var e = 0; e < Q.childNodes.length; e++) {
                        var c = Q.childNodes[e];
                        o.insertNode(c);
                        C.selectNode(c);
                    }
                    i.getSelection().addRange(C);
                }
            } else if (i.document && i.document.selection) {
                var o = i.document.selection.createRange();
                l.h = o.boundingHeight;
                l.x = o.offsetLeft;
                l.y = o.offsetTop
            }
            return l
        }
    }
};