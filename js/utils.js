/**
 * Created by liveangel on 16-5-13.
 */
/**
 * DOM utility functions
 */
var __ = {
    $: function (id) {
        return document.getElementById(id);
    },

    all: function (selectors) {
        return document.querySelectorAll(selectors);
    },

    removeClass: function(selectors, cssClass) {
        var nodes = document.querySelectorAll(selectors);
        var l = nodes.length;
        for ( i = 0 ; i < l; i++ ) {
            var el = nodes[i];
            // Bootstrap compatibility
            el.className = el.className.replace(cssClass, '');
        }
    },

    addClass: function (selectors, cssClass) {
        var nodes = document.querySelectorAll(selectors);
        var l = nodes.length;
        for ( i = 0 ; i < l; i++ ) {
            var el = nodes[i];
            // Bootstrap compatibility
            if (-1 == el.className.indexOf(cssClass)) {
                el.className += ' ' + cssClass;
            }
        }
    },

    show: function (selectors) {
        this.removeClass(selectors, 'hidden');
    },

    hide: function (selectors) {
        this.addClass(selectors, 'hidden');
    },

    toggle: function (selectors, cssClass) {
        var cssClass = cssClass || "hidden";
        var nodes = document.querySelectorAll(selectors);
        var l = nodes.length;
        for ( i = 0 ; i < l; i++ ) {
            var el = nodes[i];
            //el.style.display = (el.style.display != 'none' ? 'none' : '' );
            // Bootstrap compatibility
            if (-1 !== el.className.indexOf(cssClass)) {
                el.className = el.className.replace(cssClass, '');
            } else {
                el.className += ' ' + cssClass;
            }
        }
    }
};

function getPST8PDT(day_offset){


    var one_day = 1000*60*60*24;


    var d = new Date(); //
    var localTime = d.getTime();
    var localOffset=d.getTimezoneOffset()*60000; //
    var utc = localTime + localOffset; //
    var offset =-7;//
    var pst = utc + (3600000*offset);

    pst = pst + day_offset*one_day;

    var nd = new Date(pst);
    return moment(nd);
}
function isEmptyObject(e) {
    var t;
    for (t in e)
        return !1;
    return !0
}