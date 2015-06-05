/*! eng.js * Copyright (c) 2014 AOL; */
/*!
jQuery Waypoints - v1.1.6
Copyright (c) 2011-2012 Caleb Troughton
Dual licensed under the MIT license and GPL license.
https://github.com/imakewebthings/jquery-waypoints/blob/master/MIT-license.txt
https://github.com/imakewebthings/jquery-waypoints/blob/master/GPL-license.txt
*/
! function (a, b, c, d) {
    "$:nomunge";
    var e = a(d),
        f = "waypoint.reached",
        g = function (a, c) {
            a.element.trigger(f, c), a.options.triggerOnce && a.element[b]("destroy")
        },
        h = function (a, b) {
            if (!b) return -1;
            for (var c = b.waypoints.length - 1; c >= 0 && b.waypoints[c].element[0] !== a[0];) c -= 1;
            return c
        },
        i = [],
        j = function (b) {
            a.extend(this, {
                element: a(b),
                oldScroll: 0,
                waypoints: [],
                didScroll: !1,
                didResize: !1,
                doScroll: a.proxy(function () {
                    var b = this.element.scrollTop(),
                        d = b > this.oldScroll,
                        e = this,
                        f = a.grep(this.waypoints, function (a) {
                            return d ? a.offset > e.oldScroll && a.offset <= b : a.offset <= e.oldScroll && a.offset > b
                        }),
                        h = f.length;
                    this.oldScroll && b || a[c]("refresh"), this.oldScroll = b, h && (d || f.reverse(), a.each(f, function (a, b) {
                        (b.options.continuous || a === h - 1) && g(b, [d ? "down" : "up"])
                    }))
                }, this)
            }), a(b).bind("scroll.waypoints", a.proxy(function () {
                this.didScroll || (this.didScroll = !0, d.setTimeout(a.proxy(function () {
                    this.doScroll(), this.didScroll = !1
                }, this), a[c].settings.scrollThrottle))
            }, this)).bind("resize.waypoints", a.proxy(function () {
                this.didResize || (this.didResize = !0, d.setTimeout(a.proxy(function () {
                    a[c]("refresh"), this.didResize = !1
                }, this), a[c].settings.resizeThrottle))
            }, this)), e.load(a.proxy(function () {
                this.doScroll()
            }, this))
        },
        k = function (b) {
            var c = null;
            return a.each(i, function (a, d) {
                return d.element[0] === b ? (c = d, !1) : void 0
            }), c
        },
        l = {
            init: function (d, e) {
                return this.each(function () {
                    var g, l = a.fn[b].defaults.context,
                        m = a(this);
                    e && e.context && (l = e.context), a.isWindow(l) || (l = m.closest(l)[0]), g = k(l), g || (g = new j(l), i.push(g));
                    var n = h(m, g),
                        o = 0 > n ? a.fn[b].defaults : g.waypoints[n].options,
                        p = a.extend({}, o, e);
                    p.offset = "bottom-in-view" === p.offset ? function () {
                        var b = a.isWindow(l) ? a[c]("viewportHeight") : a(l).height();
                        return b - a(this).outerHeight()
                    } : p.offset, 0 > n ? g.waypoints.push({
                        element: m,
                        offset: null,
                        options: p
                    }) : g.waypoints[n].options = p, d && m.bind(f, d), e && e.handler && m.bind(f, e.handler)
                }), a[c]("refresh"), this
            },
            remove: function () {
                return this.each(function (b, c) {
                    var d = a(c);
                    a.each(i, function (a, b) {
                        var c = h(d, b);
                        c >= 0 && (b.waypoints.splice(c, 1), b.waypoints.length || (b.element.unbind("scroll.waypoints resize.waypoints"), i.splice(a, 1)))
                    })
                })
            },
            destroy: function () {
                return this.unbind(f)[b]("remove")
            }
        },
        m = {
            refresh: function () {
                a.each(i, function (b, d) {
                    var e = a.isWindow(d.element[0]),
                        f = e ? 0 : d.element.offset().top,
                        h = e ? a[c]("viewportHeight") : d.element.height(),
                        i = e ? 0 : d.element.scrollTop();
                    a.each(d.waypoints, function (a, b) {
                        if (b) {
                            var c = b.options.offset,
                                e = b.offset;
                            if ("function" == typeof b.options.offset) c = b.options.offset.apply(b.element);
                            else if ("string" == typeof b.options.offset) {
                                var j = parseFloat(b.options.offset);
                                c = b.options.offset.indexOf("%") ? Math.ceil(h * (j / 100)) : j
                            }
                            b.offset = b.element.offset().top - f + i - c, b.options.onlyOnScroll || (null !== e && d.oldScroll > e && d.oldScroll <= b.offset ? g(b, ["up"]) : null !== e && d.oldScroll < e && d.oldScroll >= b.offset ? g(b, ["down"]) : !e && i > b.offset && g(b, ["down"]))
                        }
                    }), d.waypoints.sort(function (a, b) {
                        return a.offset - b.offset
                    })
                })
            },
            viewportHeight: function () {
                return d.innerHeight ? d.innerHeight : e.height()
            },
            aggregate: function () {
                var b = a();
                return a.each(i, function (c, d) {
                    a.each(d.waypoints, function (a, c) {
                        b = b.add(c.element)
                    })
                }), b
            }
        };
    a.fn[b] = function (c) {
        return l[c] ? l[c].apply(this, Array.prototype.slice.call(arguments, 1)) : "function" != typeof c && c ? "object" == typeof c ? l.init.apply(this, [null, c]) : void a.error("Method " + c + " does not exist on jQuery " + b) : l.init.apply(this, arguments)
    }, a.fn[b].defaults = {
        continuous: !0,
        offset: 0,
        triggerOnce: !1,
        context: d
    }, a[c] = function (a) {
        return m[a] ? m[a].apply(this) : m.aggregate()
    }, a[c].settings = {
        resizeThrottle: 200,
        scrollThrottle: 100
    }, e.load(function () {
        a[c]("refresh")
    })
}(jQuery, "waypoint", "waypoints", window),
/*!
Image loading.
*/
$.fn.loadImage = function () {
    return $(this).filter("img[data-src]").each(function () {
        var a = $(this);
        a.attr("src", a.data("src")).removeData("src")
    }).end()
},
function () {
    function a(a, b) {
        var g, h = this;
        if (h.element = "object" == typeof a ? a : document.getElementById(a), h.wrapper = h.element.parentNode, h.element.style.webkitTransitionProperty = "-webkit-transform", h.element.style.webkitTransitionTimingFunction = "cubic-bezier(0,0,0.25,1)", h.element.style.webkitTransitionDuration = "0", h.element.style.webkitTransform = i + "0,0" + j, h.options = {
            bounce: c,
            momentum: c,
            checkDOMChanges: !0,
            topOnDOMChanges: !1,
            hScrollbar: c,
            vScrollbar: c,
            fadeScrollbar: d || !e,
            shrinkScrollbar: d || !e,
            desktopCompatibility: !1,
            overflow: "auto",
            snap: !1,
            bounceLock: !1,
            scrollbarColor: "rgba(0,0,0,0.5)",
            onScrollEnd: function () {},
            disableTouchEvents: !0
        }, "object" == typeof b)
            for (g in b) h.options[g] = b[g];
        h.options.desktopCompatibility && (h.options.overflow = "hidden"), h.onScrollEnd = h.options.onScrollEnd, delete h.options.onScrollEnd, h.wrapper.style.overflow = h.options.overflow, h.refresh(), window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", h, !1), (e || h.options.desktopCompatibility) && h.element.addEventListener(f, h, !1), h.options.checkDOMChanges && h.element.addEventListener("DOMSubtreeModified", h, !1)
    }

    function b(a, b, c, d, e) {
        var f = this,
            g = document;
        f.dir = a, f.fade = c, f.shrink = d, f.uid = ++k, f.bar = g.createElement("div"), f.bar.style.cssText = "position:absolute;top:0;left:0;-webkit-transition-timing-function:cubic-bezier(0,0,0.25,1);pointer-events:none;-webkit-transition-duration:0;-webkit-transition-delay:0;-webkit-transition-property:-webkit-transform;z-index:10;background:" + e + ";-webkit-transform:" + i + "0,0" + j + ";" + ("horizontal" == a ? "-webkit-border-radius:3px 2px;min-width:6px;min-height:5px" : "-webkit-border-radius:2px 3px;min-width:5px;min-height:6px"), f.wrapper = g.createElement("div"), f.wrapper.style.cssText = "-webkit-mask:-webkit-canvas(scrollbar" + f.uid + f.dir + ");position:absolute;z-index:10;pointer-events:none;overflow:hidden;opacity:0;-webkit-transition-duration:" + (c ? "300ms" : "0") + ";-webkit-transition-delay:0;-webkit-transition-property:opacity;" + ("horizontal" == f.dir ? "bottom:2px;left:2px;right:7px;height:5px" : "top:2px;right:2px;bottom:7px;width:5px;"), f.wrapper.appendChild(f.bar), b.appendChild(f.wrapper)
    }
    a.prototype = {
        x: 0,
        y: 0,
        enabled: !0,
        handleEvent: function (a) {
            var b = this;
            switch (a.type) {
            case f:
                b.touchStart(a);
                break;
            case g:
                b.touchMove(a);
                break;
            case h:
                b.touchEnd(a);
                break;
            case "webkitTransitionEnd":
                b.transitionEnd();
                break;
            case "orientationchange":
            case "resize":
                b.refresh();
                break;
            case "DOMSubtreeModified":
                b.onDOMModified(a)
            }
        },
        onDOMModified: function (a) {
            var b = this;
            a.target.parentNode == b.element && (setTimeout(function () {
                b.refresh()
            }, 0), !b.options.topOnDOMChanges || 0 == b.x && 0 == b.y || b.scrollTo(0, 0, "0"))
        },
        refresh: function () {
            var a, c = this,
                d = c.x,
                e = c.y;
            c.scrollWidth = c.wrapper.clientWidth, c.scrollHeight = c.wrapper.clientHeight, c.scrollerWidth = c.element.offsetWidth, c.scrollerHeight = c.element.offsetHeight, c.maxScrollX = c.scrollWidth - c.scrollerWidth, c.maxScrollY = c.scrollHeight - c.scrollerHeight, c.directionX = 0, c.directionY = 0, c.scrollX && (c.maxScrollX >= 0 ? d = 0 : c.x < c.maxScrollX && (d = c.maxScrollX)), c.scrollY && (c.maxScrollY >= 0 ? e = 0 : c.y < c.maxScrollY && (e = c.maxScrollY)), c.options.snap && (c.maxPageX = -Math.floor(c.maxScrollX / c.scrollWidth), c.maxPageY = -Math.floor(c.maxScrollY / c.scrollHeight), a = c.snap(d, e), d = a.x, e = a.y), (d != c.x || e != c.y) && (c.setTransitionTime("0"), c.setPosition(d, e, !0)), c.scrollX = c.scrollerWidth > c.scrollWidth, c.scrollY = !c.options.bounceLock && !c.scrollX || c.scrollerHeight > c.scrollHeight, c.options.hScrollbar && c.scrollX ? (c.scrollBarX = c.scrollBarX || new b("horizontal", c.wrapper, c.options.fadeScrollbar, c.options.shrinkScrollbar, c.options.scrollbarColor), c.scrollBarX.init(c.scrollWidth, c.scrollerWidth)) : c.scrollBarX && (c.scrollBarX = c.scrollBarX.remove()), c.options.vScrollbar && c.scrollY && c.scrollerHeight > c.scrollHeight ? (c.scrollBarY = c.scrollBarY || new b("vertical", c.wrapper, c.options.fadeScrollbar, c.options.shrinkScrollbar, c.options.scrollbarColor), c.scrollBarY.init(c.scrollHeight, c.scrollerHeight)) : c.scrollBarY && (c.scrollBarY = c.scrollBarY.remove())
        },
        setPosition: function (a, b, c) {
            var d = this;
            d.x = a, d.y = b, d.element.style.webkitTransform = i + d.x + "px," + d.y + "px" + j, c || (d.scrollBarX && d.scrollBarX.setPosition(d.x), d.scrollBarY && d.scrollBarY.setPosition(d.y))
        },
        setTransitionTime: function (a) {
            var b = this;
            a = a || "0", b.element.style.webkitTransitionDuration = a, b.scrollBarX && (b.scrollBarX.bar.style.webkitTransitionDuration = a, b.scrollBarX.wrapper.style.webkitTransitionDuration = c && b.options.fadeScrollbar ? "300ms" : "0"), b.scrollBarY && (b.scrollBarY.bar.style.webkitTransitionDuration = a, b.scrollBarY.wrapper.style.webkitTransitionDuration = c && b.options.fadeScrollbar ? "300ms" : "0")
        },
        touchStart: function (a) {
            var b, c = this;
            c.enabled && (c.options.disableTouchEvents && a.preventDefault(), a.stopPropagation(), c.scrolling = !0, c.moved = !1, c.distX = 0, c.distY = 0, c.setTransitionTime("0"), (c.options.momentum || c.options.snap) && (b = new WebKitCSSMatrix(window.getComputedStyle(c.element).webkitTransform), (b.e != c.x || b.f != c.y) && (document.removeEventListener("webkitTransitionEnd", c, !1), c.setPosition(b.e, b.f), c.moved = !0)), c.touchStartX = e ? a.changedTouches[0].pageX : a.pageX, c.scrollStartX = c.x, c.touchStartY = e ? a.changedTouches[0].pageY : a.pageY, c.scrollStartY = c.y, c.scrollStartTime = a.timeStamp, c.directionX = 0, c.directionY = 0, c.element.addEventListener(g, c, !1), c.element.addEventListener(h, c, !1))
        },
        touchMove: function (a) {
            if (this.scrolling) {
                var b = this,
                    c = e ? a.changedTouches[0].pageX : a.pageX,
                    d = e ? a.changedTouches[0].pageY : a.pageY,
                    f = b.scrollX ? c - b.touchStartX : 0,
                    g = b.scrollY ? d - b.touchStartY : 0,
                    h = b.x + f,
                    i = b.y + g;
                a.stopPropagation(), b.touchStartX = c, b.touchStartY = d, (h >= 0 || h < b.maxScrollX) && (h = b.options.bounce ? Math.round(b.x + f / 3) : h >= 0 || b.maxScrollX >= 0 ? 0 : b.maxScrollX), (i >= 0 || i < b.maxScrollY) && (i = b.options.bounce ? Math.round(b.y + g / 3) : i >= 0 || b.maxScrollY >= 0 ? 0 : b.maxScrollY), b.distX + b.distY > 40 ? (a.preventDefault(), a.stopPropagation(), b.distX - 3 > b.distY ? (i = b.y, g = 0) : b.distY - 3 > b.distX && (h = b.x, f = 0), b.setPosition(h, i), b.moved = !0, b.directionX = f > 0 ? -1 : 1, b.directionY = g > 0 ? -1 : 1) : (b.distX += Math.abs(f), b.distY += Math.abs(g))
            }
        },
        touchEnd: function (a) {
            if (this.scrolling) {
                var b, c, d, f, g = this,
                    h = a.timeStamp - g.scrollStartTime,
                    i = e ? a.changedTouches[0] : a,
                    j = 0,
                    k = g.x,
                    l = g.y;
                if (g.scrolling = !1, g.moved) {
                    if (!g.options.snap && h > 250) return void g.resetPosition();
                    g.options.momentum && (c = g.scrollX === !0 ? g.momentum(g.x - g.scrollStartX, h, g.options.bounce ? -g.x + g.scrollWidth / 5 : -g.x, g.options.bounce ? g.x + g.scrollerWidth - g.scrollWidth + g.scrollWidth / 5 : g.x + g.scrollerWidth - g.scrollWidth) : {
                        dist: 0,
                        time: 0
                    }, d = g.scrollY === !0 ? g.momentum(g.y - g.scrollStartY, h, g.options.bounce ? -g.y + g.scrollHeight / 5 : -g.y, g.options.bounce ? (g.maxScrollY < 0 ? g.y + g.scrollerHeight - g.scrollHeight : 0) + g.scrollHeight / 5 : g.y + g.scrollerHeight - g.scrollHeight) : {
                        dist: 0,
                        time: 0
                    }, j = Math.max(Math.max(c.time, d.time), 1), k = g.x + c.dist, l = g.y + d.dist), g.options.snap && (f = g.snap(k, l), k = f.x, l = f.y, j = Math.max(f.time, j)), g.scrollTo(k, l, j + "ms")
                } else if (g.resetPosition(), e)
                    for (b = i.target; 1 != b.nodeType;) b = b.parentNode
            }
        },
        transitionEnd: function () {
            var a = this;
            document.removeEventListener("webkitTransitionEnd", a, !1), a.resetPosition()
        },
        resetPosition: function () {
            var a = this,
                b = a.x,
                c = a.y;
            a.x >= 0 ? b = 0 : a.x < a.maxScrollX && (b = a.maxScrollX), a.y >= 0 || a.maxScrollY > 0 ? c = 0 : a.y < a.maxScrollY && (c = a.maxScrollY), b != a.x || c != a.y ? a.scrollTo(b, c) : (a.moved && (a.onScrollEnd(), a.moved = !1), a.scrollBarX && a.scrollBarX.hide(), a.scrollBarY && a.scrollBarY.hide())
        },
        snap: function (a, b) {
            var c, d = this;
            return a = d.directionX > 0 ? Math.floor(a / d.scrollWidth) : d.directionX < 0 ? Math.ceil(a / d.scrollWidth) : Math.round(a / d.scrollWidth), d.pageX = -a, a *= d.scrollWidth, a > 0 ? a = d.pageX = 0 : a < d.maxScrollX && (d.pageX = d.maxPageX, a = d.maxScrollX), b = d.directionY > 0 ? Math.floor(b / d.scrollHeight) : d.directionY < 0 ? Math.ceil(b / d.scrollHeight) : Math.round(b / d.scrollHeight), d.pageY = -b, b *= d.scrollHeight, b > 0 ? b = d.pageY = 0 : b < d.maxScrollY && (d.pageY = d.maxPageY, b = d.maxScrollY), c = Math.round(Math.max(Math.abs(d.x - a) / d.scrollWidth * 500, Math.abs(d.y - b) / d.scrollHeight * 500)), {
                x: a,
                y: b,
                time: c
            }
        },
        scrollTo: function (a, b, c) {
            var d = this;
            return d.x == a && d.y == b ? void d.resetPosition() : (d.moved = !0, d.setTransitionTime(c || "350ms"), d.setPosition(a, b), void("0" === c || "0s" == c || "0ms" == c ? d.resetPosition() : document.addEventListener("webkitTransitionEnd", d, !1)))
        },
        scrollToPage: function (a, b, c) {
            var d, e = this;
            e.options.snap || (e.pageX = -Math.round(e.x / e.scrollWidth), e.pageY = -Math.round(e.y / e.scrollHeight)), "next" == a ? a = ++e.pageX : "prev" == a && (a = --e.pageX), "next" == b ? b = ++e.pageY : "prev" == b && (b = --e.pageY), a = -a * e.scrollWidth, b = -b * e.scrollHeight, d = e.snap(a, b), a = d.x, b = d.y, e.scrollTo(a, b, c || "500ms")
        },
        scrollToCatPage: function (a, b, c) {
            var d, e = this;
            e.options.snap || (e.pageX = -Math.round(e.x / e.scrollWidth), e.pageY = -Math.round(e.y / e.scrollHeight)), d = e.snap(a, b), a = d.x, b = d.y, e.scrollTo(a, b, c || "500ms")
        },
        scrollToElement: function (a, b) {
            if (a = "object" == typeof a ? a : this.element.querySelector(a)) {
                var c = this,
                    d = c.scrollX ? -a.offsetLeft : 0,
                    e = c.scrollY ? -a.offsetTop : 0;
                d >= 0 ? d = 0 : d < c.maxScrollX && (d = c.maxScrollX), e >= 0 ? e = 0 : e < c.maxScrollY && (e = c.maxScrollY), c.scrollTo(d, e, b)
            }
        },
        momentum: function (a, b, c, d) {
            var e = 2.5,
                f = 1.2,
                g = Math.abs(a) / b * 1e3,
                h = g * g / e / 1e3,
                i = 0;
            return a > 0 && h > c ? (g = g * c / h / e, h = c) : 0 > a && h > d && (g = g * d / h / e, h = d), h *= 0 > a ? -1 : 1, i = g / f, {
                dist: Math.round(h),
                time: Math.round(i)
            }
        },
        destroy: function (a) {
            var b = this;
            return window.removeEventListener("onorientationchange" in window ? "orientationchange" : "resize", b, !1), b.element.removeEventListener(f, b, !1), b.element.removeEventListener(g, b, !1), b.element.removeEventListener(h, b, !1), document.removeEventListener("webkitTransitionEnd", b, !1), b.options.checkDOMChanges && b.element.removeEventListener("DOMSubtreeModified", b, !1), b.scrollBarX && (b.scrollBarX = b.scrollBarX.remove()), b.scrollBarY && (b.scrollBarY = b.scrollBarY.remove()), a && b.wrapper.parentNode.removeChild(b.wrapper), null
        }
    }, b.prototype = {
        init: function (a, b) {
            var c, d = this,
                e = document,
                f = Math.PI;
            "horizontal" == d.dir ? d.maxSize != d.wrapper.offsetWidth && (d.maxSize = d.wrapper.offsetWidth, c = e.getCSSCanvasContext("2d", "scrollbar" + d.uid + d.dir, d.maxSize, 5), c.fillStyle = "rgb(0,0,0)", c.beginPath(), c.arc(2.5, 2.5, 2.5, f / 2, -f / 2, !1), c.lineTo(d.maxSize - 2.5, 0), c.arc(d.maxSize - 2.5, 2.5, 2.5, -f / 2, f / 2, !1), c.closePath(), c.fill()) : d.maxSize != d.wrapper.offsetHeight && (d.maxSize = d.wrapper.offsetHeight, c = e.getCSSCanvasContext("2d", "scrollbar" + d.uid + d.dir, 5, d.maxSize), c.fillStyle = "rgb(0,0,0)", c.beginPath(), c.arc(2.5, 2.5, 2.5, f, 0, !1), c.lineTo(5, d.maxSize - 2.5), c.arc(2.5, d.maxSize - 2.5, 2.5, 0, f, !1), c.closePath(), c.fill()), d.size = Math.max(Math.round(d.maxSize * d.maxSize / b), 6), d.maxScroll = d.maxSize - d.size, d.toWrapperProp = d.maxScroll / (a - b), d.bar.style["horizontal" == d.dir ? "width" : "height"] = d.size + "px"
        },
        setPosition: function (a) {
            var b = this;
            "1" != b.wrapper.style.opacity && b.show(), a = Math.round(b.toWrapperProp * a), 0 > a ? (a = b.shrink ? a + 3 * a : 0, b.size + a < 7 && (a = -b.size + 6)) : a > b.maxScroll && (a = b.shrink ? a + 3 * (a - b.maxScroll) : b.maxScroll, b.size + b.maxScroll - a < 7 && (a = b.size + b.maxScroll - 6)), a = "horizontal" == b.dir ? i + a + "px,0" + j : i + "0," + a + "px" + j, b.bar.style.webkitTransform = a
        },
        show: function () {
            c && (this.wrapper.style.webkitTransitionDelay = "0"), this.wrapper.style.opacity = "1"
        },
        hide: function () {
            c && (this.wrapper.style.webkitTransitionDelay = "350ms"), this.wrapper.style.opacity = "0"
        },
        remove: function () {
            return this.wrapper.parentNode.removeChild(this.wrapper), null
        }
    };
    var c = "WebKitCSSMatrix" in window && "m11" in new WebKitCSSMatrix,
        d = /iphone|ipad/gi.test(navigator.appVersion),
        e = "ontouchstart" in window,
        f = e ? "touchstart" : "mousedown",
        g = e ? "touchmove" : "mousemove",
        h = e ? "touchend" : "mouseup",
        i = "translate" + (c ? "3d(" : "("),
        j = c ? ",0)" : ")",
        k = 0;
    window.iScroll = a
}(),
function () {
    var a = {};
    jQuery.Topic = function (b) {
        var c, d = b && a[b];
        return d || (c = jQuery.Callbacks("memory"), d = {
            publish: c.fire,
            subscribe: c.add,
            unsubscribe: c.remove
        }, b && (a[b] = d)), d
    }
}(),
/*!
 * jQuery throttle / debounce - v1.1 - 3/7/2010
 * http://benalman.com/projects/jquery-throttle-debounce-plugin/
 *
 * Copyright (c) 2010 "Cowboy" Ben Alman
 * Dual licensed under the MIT and GPL licenses.
 * http://benalman.com/about/license/
 */
function (a, b) {
    "$:nomunge";
    var c, d = a.jQuery || a.Cowboy || (a.Cowboy = {});
    d.throttle = c = function (a, c, e, f) {
        function g() {
            function d() {
                i = +new Date, e.apply(j, l)
            }

            function g() {
                h = b
            }
            var j = this,
                k = +new Date - i,
                l = arguments;
            f && !h && d(), h && clearTimeout(h), f === b && k > a ? d() : c !== !0 && (h = setTimeout(f ? g : d, f === b ? a - k : a))
        }
        var h, i = 0;
        return "boolean" != typeof c && (f = e, e = c, c = b), d.guid && (g.guid = e.guid = e.guid || d.guid++), g
    }, d.debounce = function (a, d, e) {
        return e === b ? c(a, d, !1) : c(a, e, d !== !1)
    }
}(this),
function () {
    function a() {
        var a = 0,
            i = h;
        for (b = window.innerHeight, f = document.documentElement.clientWidth; i--;)!a && f >= g[i] && (a = g[i]);
        a !== c && $.Topic("breakpoint").publish(a), c = a, b !== d && $.Topic("height").publish(b), d = b, f !== e && $.Topic("width").publish(f), e = f
    }
    var b, c, d, e, f, g = [320, 480, 768, 980],
        h = g.length;
    $(window).on("resize", $.throttle(100, a)), a()
}();
var bs = {};
bs.resizeImage = function (a, b, c) {
    var d;
    return a = a.replace(/(.*)_([\d]+)x([\d]+)(\.[\w]+)(\?.+)?$/, "$1$4"), b || c ? (d = a.match(/(.*)(\.[\w]+)$/), a = d[1] + "_" + b + "x" + c + d[2]) : a
};
var getQueryString = function () {
    function a() {
        var a, c = location.search.substring(1),
            d = /([^&=]+)=([^&]*)/g;
        for (b = {}; a = d.exec(c);) b[decodeURIComponent(a[1])] = decodeURIComponent(a[2])
    }
    var b;
    return function () {
        return b || a(), b
    }
}();
/*!
 * FitVids 1.0
 *
 * Copyright 2011, Chris Coyier - http://css-tricks.com + Dave Rupert - http://daverupert.com
 * Credit to Thierry Koblentz - http://www.alistapart.com/articles/creating-intrinsic-ratios-for-video/
 * Released under the WTFPL license - http://sam.zoy.org/wtfpl/
 *
 * Date: Thu Sept 01 18:00:00 2011 -0500
 */
! function (a) {
    a.fn.fitVids = function (b) {
        var c = {
                customSelector: null
            },
            d = document.createElement("div"),
            e = document.getElementsByTagName("base")[0] || document.getElementsByTagName("script")[0];
        return d.className = "fit-vids-style", d.innerHTML = "&shy;<style>               .fluid-width-video-wrapper {                 width: 100%;                              position: relative;                       padding: 0;                            }                                                                                   .fluid-width-video-wrapper iframe,        .fluid-width-video-wrapper object,        .fluid-width-video-wrapper embed {           position: absolute;                       top: 0;                                   left: 0;                                  width: 100%;                              height: 100%;                          }                                       </style>", e.parentNode.insertBefore(d, e), b && a.extend(c, b), this.each(function () {
            var b = ["iframe[src*='player.vimeo.com']", "iframe[src*='www.youtube.com']", "iframe[src*='www.kickstarter.com']", "object", "embed"];
            c.customSelector && b.push(c.customSelector);
            var d = a(this).find(b.join(","));
            d.each(function () {
                var b = a(this);
                if (!("embed" == this.tagName.toLowerCase() && b.parent("object").length || b.parent(".fluid-width-video-wrapper").length)) {
                    var c = "object" == this.tagName.toLowerCase() || b.attr("height") ? b.attr("height") : b.height(),
                        d = b.attr("width") ? b.attr("width") : b.width(),
                        e = c / d;
                    if (!b.attr("id")) {
                        var f = "fitvid" + Math.floor(999999 * Math.random());
                        b.attr("id", f)
                    }
                    b.wrap('<div class="fluid-width-video-wrapper"></div>').parent(".fluid-width-video-wrapper").css("padding-top", 100 * e + "%"), b.removeAttr("height").removeAttr("width")
                }
            })
        })
    }
}(jQuery),
function (a) {
    var b = a.fn.fitVids;
    a.fn.fitVids = function (a) {
        var c;
        return a || (a = {}), c = ["iframe[src*='www.viddler.com']", "iframe[src*='embed-5min']", "iframe[src*='o.aolcdn.com']", "iframe[src*='www.snappytv.com']"], a.customSelector && c.push(a.customSelector), a.customSelector = c.join(","), b.call(this, a)
    }
}(jQuery), /*! http://tinynav.viljamis.com v1.05 by @viljamis */
function (a, b, c) {
    a.fn.tinyNav = function (d) {
        var e = a.extend({
            active: "selected",
            header: ""
        }, d);
        return this.each(function () {
            c++;
            var d = a(this),
                f = "tinynav" + c,
                g = ".l_" + f,
                h = a("<select/>").addClass("tinynav " + f);
            if (d.is("ul,ol")) {
                "" !== e.header && h.append(a("<option/>").text(e.header));
                var i = "";
                d.addClass("l_" + f).find("a").each(function () {
                    i += '<option value="' + a(this).attr("href") + '">';
                    var b;
                    for (b = 0; b < a(this).parents("ul, ol").length - 1; b++) i += "- ";
                    i += a(this).text() + "</option>"
                }), h.append(i), e.header || h.find(":eq(" + a(g + " li").index(a(g + " li." + e.active)) + ")").attr("selected", !0), h.change(function () {
                    b.location.href = a(this).val()
                }), a(g).after(h)
            }
        })
    }
}(jQuery, this, 0);
var gdgt = gdgt || {};
gdgt.databox = {
    version: "1.2",
    labels: {
        collapse: "collapse",
        expand: "expand",
        show_more_prices: "show <strong></strong> more prices",
        show_more_prices_singular: "show <strong></strong> more price"
    },
    lazy_load_images: function (a) {
        0 !== a.length && a.find("noscript.img").each(function () {
            var a = jQuery(this),
                b = jQuery(a.data("html"));
            b.length > 0 && a.replaceWith(b), a = b = null
        })
    },
    tab_onclick_handler: function () {
        var a = jQuery(this);
        if (a.hasClass("selected")) {
            if (a.closest(".gdgt-tabs").hasClass("open")) a.closest(".gdgt-tabs").removeClass("open");
            else if ("35px" === a.css("height")) {
                var b = a.closest(".gdgt-tabs").position().top + 10;
                a.closest(".gdgt-tabs").addClass("open").css("top", b)
            }
        } else {
            a.closest(".gdgt-tabs").find("li.selected").removeClass("selected").removeAttr("aria-selected"), a.addClass("selected").attr("aria-selected", "true");
            var c = a.data("gdgt-datatype");
            if ("string" == typeof c && "" !== c) {
                var d = "gdgt-content-" + jQuery.trim(c);
                a.closest(".gdgt-product-wrapper").find(".gdgt-content").each(function () {
                    var b = jQuery(this);
                    if (b.hasClass(d)) {
                        if (b.show(), b.attr("aria-hidden", "false"), b.data("loaded") !== !0) {
                            gdgt.databox.lazy_load_images(b), b.data("loaded", !0), b.trigger(d + "-onload");
                            try {
                                gdgt.databox.analytics.track_tab_change(c)
                            } catch (e) {}
                        }
                        a.closest(".gdgt-tabs").removeClass("open")
                    } else b.hide(), b.attr("aria-hidden", "true")
                })
            }
        }
    },
    lowest_price_onclick_handler: function () {
        return jQuery(this).closest(".gdgt-product-wrapper").find(".gdgt-tabs li.prices").trigger("click"), !1
    },
    prices_new_offers_handler: function () {
        var a = jQuery(this);
        if (0 !== a.length) {
            var b = a.children();
            if (b.length > 3) {
                b.each(function (a) {
                    a > 2 && jQuery(this).hide()
                });
                var c = jQuery("<span />").addClass("gdgt-show-more-prices");
                c.html(4 === b.length ? gdgt.databox.labels.show_more_prices_singular : gdgt.databox.labels.show_more_prices), c.find("strong").text(b.length - 3), c.append(jQuery("<small />")), c.click(gdgt.databox.prices_show_extra_offers), a.after(c)
            }
        }
    },
    prices_show_extra_offers: function () {
        var a = jQuery(this).closest(".gdgt-content-prices");
        0 !== a.length && (a.find(".gdgt-price-retailers li:hidden").show(), a.find(".gdgt-show-more-prices").remove())
    },
    prices_model_onchange_handler: function () {
        var a = jQuery(this).find("option:selected");
        if (0 !== a.length) {
            var b = a.data("gdgt-offers");
            if ("string" === jQuery.type(b)) {
                var c = a.closest(".gdgt-content-prices");
                if (0 !== c.length) {
                    c.find(".gdgt-show-more-prices").remove();
                    var d = c.find(".gdgt-price-retailers");
                    0 === d.length ? (d = jQuery("<ol />").addClass("gdgt-price-retailers").html(b).bind("gdgt-content-prices-newoffers", gdgt.databox.prices_new_offers_handler), c.append(d)) : d.html(b), d.trigger("gdgt-content-prices-newoffers")
                }
            }
        }
    },
    product_expand: function () {
        var a = jQuery(this).closest(".gdgt-product");
        a.find(".gdgt-product-collapsed-name").hide(), a.find(".gdgt-product-wrapper").show().attr("aria-hidden", "false"), a.removeClass("collapsed"), a.addClass("expanded"), a.attr("aria-expanded", "true"), a.data("loaded") !== !0 && (gdgt.databox.lazy_load_images(a.find(".gdgt-product-head")), a.data("loaded", !0));
        try {
            gdgt.databox.analytics.track_product_view(a)
        } catch (b) {}
    },
    product_collapse: function () {
        var a = jQuery(this).closest(".gdgt-product");
        a.find(".gdgt-product-wrapper").hide().attr("aria-hidden", "true"), a.find(".gdgt-product-collapsed-name").show(), a.removeClass("expanded"), a.addClass("collapsed"), a.removeAttr("aria-expanded")
    },
    enable: function () {
        var a = jQuery("#gdgt-wrapper");
        if (0 !== a.length) {
            gdgt.databox.total = a.length, gdgt.databox.lazy_load_images(a.find(".gdgt-product.expanded .gdgt-product-head")), a.children().find(".gdgt-content:visible").each(function () {
                var a = jQuery(this);
                gdgt.databox.lazy_load_images(a), a.data("loaded", !0)
            }), a.find(".gdgt-tabs li").not(".disabled").click(gdgt.databox.tab_onclick_handler), a.find(".gdgt-product-price").click(gdgt.databox.lowest_price_onclick_handler), a.find(".gdgt-content-prices").one("gdgt-content-prices-onload", function () {
                var a = jQuery(this);
                a.find(".gdgt-prices-configs").change(gdgt.databox.prices_model_onchange_handler);
                var b = a.find(".gdgt-price-retailers");
                0 !== b.length && (b.bind("gdgt-content-prices-newoffers", gdgt.databox.prices_new_offers_handler), b.trigger("gdgt-content-prices-newoffers"))
            });
            var b = a.find("li.prices.selected");
            b.length && b.closest(".gdgt-product-wrapper").find("div.gdgt-content-prices").trigger("gdgt-content-prices-onload"), a.children("div").not(":first").each(function () {
                var a = jQuery(this);
                a.find(".gdgt-product-collapsed-name").click(gdgt.databox.product_expand).append(jQuery('<span class="gdgt-product-expand-icon" />').attr("title", gdgt.databox.labels.expand).click(gdgt.databox.product_expand)), a.find(".gdgt-branding").html(jQuery('<span class="gdgt-product-collapse-icon" />').attr("title", gdgt.databox.labels.collapse).click(gdgt.databox.product_collapse))
            }), gdgt.databox.analytics.init()
        }
    },
    analytics: {
        page_visible: !1,
        databox_offset_top: 0,
        databox_visible: !1,
        viewed_products: [],
        init: function () {
            gdgt.databox.analytics.set_content_width(), gdgt.databox.analytics.set_page_url(), gdgt.databox.analytics.visibility_init()
        },
        visibility_init: function () {
            var a = null,
                b = null;
            void 0 !== document.hidden ? (a = "hidden", b = "visibilitychange") : void 0 !== document.webkitHidden ? (a = "webkitHidden", b = "webkitvisibilitychange") : void 0 !== document.msHidden && (a = "msHidden", b = "msvisibilitychange");
            var c = jQuery("#gdgt-wrapper");
            c.length > 0 && (databox_offset = c.offset(), databox_offset.top > 0 && (gdgt.databox.analytics.databox_offset_top = databox_offset.top), databox_offset = null), c = null, null === a || document[a] === !1 ? (gdgt.databox.analytics.page_visible = !0, gdgt.databox.analytics.google.load(), gdgt.databox.analytics.viewport_test() === !1 ? jQuery(window).scroll(gdgt.databox.analytics.viewport_test) : gdgt.databox.analytics.on_visible()) : jQuery(document).bind(b, {
                hidden: a
            }, gdgt.databox.analytics.visiblity_change)
        },
        visibility_change: function (a) {
            gdgt.databox.analytics.page_visible !== !0 && document[a.data.hidden] === !1 && (gdgt.databox.analytics.page_visible = !0, gdgt.databox.analytics.google.load(), jQuery(document).unbind(a), gdgt.databox.analytics.viewport_test() === !1 ? jQuery(window).scroll(gdgt.databox.analytics.viewport_test) : gdgt.databox.analytics.on_visible())
        },
        viewport_test: function () {
            if (gdgt.databox.analytics.databox_visible === !0) return !0;
            var a = jQuery(window);
            return a.height() + a.scrollTop() >= gdgt.databox.analytics.databox_offset_top ? (jQuery(window).unbind("scroll", gdgt.databox.analytics.viewport_test), gdgt.databox.analytics.databox_visible = !0, gdgt.databox.analytics.on_visible(), !0) : !1
        },
        on_visible: function () {
            jQuery(".gdgt-product.expanded").each(function (a) {
                if (0 === a) {
                    var b = [];
                    jQuery(this).find(".gdgt-tabs li").each(function () {
                        var a = jQuery(this);
                        if (!a.is(":hidden")) {
                            var c = a.data("gdgt-datatype");
                            "string" == typeof c && b.push(c)
                        }
                    }), b.length > 0 && _gaq.push(["gdgt._setCustomVar", 1, "Tabs", b.join(","), 3])
                }
                gdgt.databox.analytics.track_product_view(jQuery(this))
            })
        },
        google: {
            account: "UA-818999-9",
            load: function () {
                "undefined" == typeof _gat && jQuery.ajax({
                    cache: !0,
                    url: ("https:" == document.location.protocol ? "https://ssl" : "http://www") + ".google-analytics.com/ga.js",
                    dataType: "script"
                }), "undefined" == typeof _gaq && (_gaq = []), _gaq.push(function () {
                    var a = _gat._createTracker(gdgt.databox.analytics.google.account, "gdgt");
                    a._getLinkerUrl("http://gdgt.com/"), a._setDomainName("gdgt.com"), a._setAllowLinker(!0), a._setSampleRate("100"), void 0 !== gdgt.databox.analytics.page_url && a._setReferrerOverride(gdgt.databox.analytics.page_url)
                }), _gaq.push(["gdgt._trackPageview", "http://gdgt.com/databox/"]), void 0 !== gdgt.databox.analytics.content_width && _gaq.push(["gdgt._setCustomVar", 2, "Container width", gdgt.databox.analytics.content_width, 3])
            },
            track_pageview: function (a) {
                _gaq.push(["gdgt._trackPageview", a])
            },
            track_tab_change: function (a) {
                _gaq.push(["gdgt._trackEvent", "Tabs", "view", a])
            }
        },
        set_content_width: function () {
            if (void 0 === gdgt.databox.analytics.content_width) {
                var a = jQuery("#gdgt-wrapper").parent().width();
                "number" == typeof a && (gdgt.databox.analytics.content_width = a)
            }
        },
        set_page_url: function () {
            var a = jQuery('link[rel="canonical"]').first().attr("href");
            "string" == typeof a && a.length > 12 && "http" === a.substring(0, 4) ? gdgt.databox.analytics.page_url = a : "string" === jQuery.type(document.URL) ? gdgt.databox.analytics.page_url = document.URL : void 0 !== document.location && (gdgt.databox.analytics.page_url = document.location.toString())
        },
        track_tab_change: function (a) {
            "string" == typeof a && gdgt.databox.analytics.google.track_tab_change(a)
        },
        track_product_view: function (a) {
            if (0 !== a.length) {
                var b = a.find(".gdgt-product-name a").attr("href");
                "string" != typeof b || b.length < 16 || -1 !== jQuery.inArray(b, gdgt.databox.analytics.viewed_products) || (gdgt.databox.analytics.viewed_products.push(b), gdgt.databox.analytics.google.track_pageview(b))
            }
        }
    }
},
function (a) {
    var b = {
        color: "#999",
        placeholder: "",
        namespace: "placeholder"
    };
    a.placeholder = function (c) {
        function d() {
            var a = g.val();
            ("" === a || a === k) && (g.val(k), g.css("color", j))
        }

        function e() {
            var a = g.val();
            a === k && (g.val(""), g.css("color", l))
        }
        if (c.elem) {
            var f = c.elem,
                g = a(f),
                h = a.extend(!0, {}, b, c),
                i = h.namespace,
                j = h.color,
                k = g.attr("placeholder") || h.placeholder,
                l = (g.attr("value"), g.css("color"));
            g.bind("focus." + i, e), g.bind("blur." + i, d), d()
        } else a.extend(!0, b, c)
    }, a.fn.placeholder = function (b) {
        return this.each(function () {
            b = b || {}, b.elem = this, a.placeholder(b)
        })
    }
}(jQuery, document),
function (a, b) {
    var c = {
        ui: {
            form: "form",
            signupEmail: "form > .signup-email",
            signupButton: "form > .button",
            closeButton: "form > .button.close"
        },
        locale: {
            messages: {
                typeValidEmail: "Please type a valid e-mail address.",
                thankYou: "Thank you for signing up!",
                emailAlreadyExists: "You have already signed up.",
                closeButton: "Close"
            },
            errors: {
                invalidEmail: "Invalid Email."
            }
        },
        namespace: "aol-newsletter",
        verify: !0,
        site: "asylum",
        template: "welcome",
        list: "main"
    };
    a.aolNewsletter = function (d) {
        if (d.elem) {
            var e = d.elem,
                f = a(e),
                g = a(b),
                h = a.extend(!0, {}, c, d),
                i = h.ui,
                j = h.namespace,
                k = h.trigger,
                l = i.$signupEmail = f.find(".signup-email"),
                m = i.$form = f.find("form"),
                n = h.locale,
                o = function (a) {
                    var b = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
                    return b.test(a)
                },
                p = function (a, b) {
                    -1 === a.indexOf("Success") ? b.find(".message").show().html(a.indexOf(n.errors.invalidEmail) >= 0 ? n.messages.typeValidEmail : a.indexOf("Already Exists") >= 0 ? n.messages.emailAlreadyExists : a) : b.html("<b>" + n.messages.thankYou + "</b>" + (h.trigger ? '<input class="button close" type="button" value="' + n.messages.closeButton + '" />' : ""))
                };
            f.data("options." + j, h), h.trigger && (f.hide(), g.delegate(k, "click." + j, function (a) {
                a.preventDefault(), "none" === f.css("display") && f.show().height(f.height()).hide(), f.slideToggle(function () {
                    f.height("auto")
                })
            }), f.delegate(i.closeButton, "click." + j, function () {
                f.slideUp()
            })), f.delegate(i.signupButton, "click." + j, function () {
                if (!a(this).hasClass("close")) {
                    var b = l.attr("value");
                    o(b) ? a.ajax({
                        url: [m.attr("action"), "?email=", b, "&verify=", h.verify, "&site=", h.site, "&template=", h.template, "&list=", h.list, "&callback=?"].join(""),
                        dataType: "jsonp",
                        success: function (a) {
                            p(a.replace(/\&#39;/g, "'"), m)
                        }
                    }) : m.find(".message").show().html(n.messages.typeValidEmail)
                }
            }), f.delegate(i.form, "submit", function (a) {
                a.preventDefault(), f.find(i.signupButton).trigger("click." + j)
            }), l.attr("value", "").placeholder()
        } else a.extend(c, d)
    }, a.fn.aolNewsletter = function (b) {
        return this.each(function () {
            b = b || {}, b.elem = this, a.aolNewsletter(b)
        })
    }
}(jQuery, document),
function (a) {
    a.fn.extend({
        titleSlider: function (b) {
            var c = {
                    showSpeed: 100,
                    hideSpeed: 100
                },
                b = a.extend(c, b);
            return this.each(function () {
                var c = b,
                    d = a(this);
                if (void 0 !== d.attr("alt") || "" !== d.attr("alt")) {
                    var e = d.attr("alt");
                    $parent = a('<figure class="captainer">'), d.attr("alt", "").wrap($parent);
                    var f = d.parent("figure.captainer");
                    a(f).append(a("<figcaption>" + e + "</figcaption>").hide()), a(f).addClass(d.get(0).className), d.removeClass("alignleft").removeClass("alignright"), a(f).on("mouseenter", function (b) {
                        b.preventDefault(), a(this).find("figcaption").stop(!0, !1).fadeIn(c.showSpeed)
                    }).on("mouseleave", function (b) {
                        b.preventDefault(), a(this).find("figcaption").stop(!0, !1).fadeOut(c.hideSpeed)
                    })
                }
            })
        }
    })
}(jQuery),
function () {
    "use strict";
    var a, b, c = function (a, b) {
        return function () {
            return a.apply(b, arguments)
        }
    };
    a = jQuery, b = function () {
        function b(d, e) {
            null == e && (e = {}), this.text = c(this.text, this), this.interval = c(this.interval, this), this.format = c(this.format, this), this.unit = c(this.unit, this), this.amount = c(this.amount, this), this.formatting = c(this.formatting, this), this.adjust = c(this.adjust, this), this.suffix = c(this.suffix, this), this.date = c(this.date, this), this.reformat = c(this.reformat, this), this.$el = d, this.settings = a.extend({}, b.settings, e), this.reformat()
        }
        return b.settings = {
            singular: 1,
            interval: 1e3,
            suffixes: {
                past: "ago",
                future: "until"
            },
            formats: {
                now: "now",
                singular: {
                    seconds: "1 second",
                    minutes: "1 minute",
                    hours: "1 hour",
                    days: "1 day",
                    weeks: "1 week",
                    months: "1 month",
                    years: "1 year"
                },
                plural: {
                    seconds: "{{amount}} seconds",
                    minutes: "{{amount}} minutes",
                    hours: "{{amount}} hours",
                    days: "{{amount}} days",
                    weeks: "{{amount}} weeks",
                    months: "{{amount}} months",
                    years: "{{amount}} years"
                }
            }
        }, b.prototype.reformat = function () {
            var a;
            return a = this.interval(), this.$el.html(this.text(a)), a = Math.abs(a), a < this.settings.interval && (a = this.settings.interval), setTimeout(this.reformat, a)
        }, b.prototype.date = function () {
            return new Date(this.$el.attr("datetime") || this.$el.attr("date") || this.$el.attr("time"))
        }, b.prototype.suffix = function (a) {
            return 0 > a ? this.settings.suffixes.past : a > 0 ? this.settings.suffixes.future : void 0
        }, b.prototype.adjust = function (a, b) {
            return Math.round(Math.abs(a / b))
        }, b.prototype.formatting = function (a) {
            return {
                seconds: this.adjust(a, 1e3),
                minutes: this.adjust(a, 6e4),
                hours: this.adjust(a, 36e5),
                days: this.adjust(a, 864e5),
                weeks: this.adjust(a, 6048e5),
                months: this.adjust(a, 2592e6),
                years: this.adjust(a, 31536e6)
            }
        }, b.prototype.amount = function (a) {
            return a.years || a.months || a.weeks || a.days || a.hours || a.minutes || a.seconds || 0
        }, b.prototype.unit = function (a) {
            return a.years && "years" || a.months && "months" || a.weeks && "weeks" || a.days && "days" || a.hours && "hours" || a.minutes && "minutes" || a.seconds && "seconds" || void 0
        }, b.prototype.format = function (a, b) {
            var c;
            return null != (c = this.settings.formats[a === this.settings.singular ? "singular" : "plural"]) ? c[b] : void 0
        }, b.prototype.interval = function () {
            return this.date() - new Date
        }, b.prototype.text = function (a) {
            var b, c, d, e, f;
            return null == a && (a = this.interval()), e = this.suffix(a), d = this.formatting(a), b = this.amount(d), f = this.unit(d), c = this.format(b, f), c ? "" + c.replace("{{unit}}", f).replace("{{amount}}", b) + " " + e : this.settings.formats.now
        }, b
    }(), a.fn.extend({
        age: function (c) {
            return null == c && (c = {}), this.each(function () {
                return new b(a(this), c)
            })
        }
    })
}.call(this),
/*! jQuery UI - v1.9.1 - 2012-10-25
 * http://jqueryui.com
 * Includes: jquery.ui.core.js, jquery.ui.widget.js, jquery.ui.mouse.js, jquery.ui.draggable.js, jquery.ui.droppable.js, jquery.ui.resizable.js, jquery.ui.selectable.js, jquery.ui.sortable.js, jquery.ui.effect.js, jquery.ui.accordion.js, jquery.ui.autocomplete.js, jquery.ui.button.js, jquery.ui.datepicker.js, jquery.ui.dialog.js, jquery.ui.effect-blind.js, jquery.ui.effect-bounce.js, jquery.ui.effect-clip.js, jquery.ui.effect-drop.js, jquery.ui.effect-explode.js, jquery.ui.effect-fade.js, jquery.ui.effect-fold.js, jquery.ui.effect-highlight.js, jquery.ui.effect-pulsate.js, jquery.ui.effect-scale.js, jquery.ui.effect-shake.js, jquery.ui.effect-slide.js, jquery.ui.effect-transfer.js, jquery.ui.menu.js, jquery.ui.position.js, jquery.ui.progressbar.js, jquery.ui.slider.js, jquery.ui.spinner.js, jquery.ui.tabs.js, jquery.ui.tooltip.js
 * Copyright 2012 jQuery Foundation and other contributors; Licensed MIT */
function (a, b) {
    function c(b, c) {
        var e, f, g, h = b.nodeName.toLowerCase();
        return "area" === h ? (e = b.parentNode, f = e.name, b.href && f && "map" === e.nodeName.toLowerCase() ? (g = a("img[usemap=#" + f + "]")[0], !!g && d(g)) : !1) : (/input|select|textarea|button|object/.test(h) ? !b.disabled : "a" === h ? b.href || c : c) && d(b)
    }

    function d(b) {
        return a.expr.filters.visible(b) && !a(b).parents().andSelf().filter(function () {
            return "hidden" === a.css(this, "visibility")
        }).length
    }
    var e = 0,
        f = /^ui-id-\d+$/;
    a.ui = a.ui || {}, a.ui.version || (a.extend(a.ui, {
        version: "1.9.1",
        keyCode: {
            BACKSPACE: 8,
            COMMA: 188,
            DELETE: 46,
            DOWN: 40,
            END: 35,
            ENTER: 13,
            ESCAPE: 27,
            HOME: 36,
            LEFT: 37,
            NUMPAD_ADD: 107,
            NUMPAD_DECIMAL: 110,
            NUMPAD_DIVIDE: 111,
            NUMPAD_ENTER: 108,
            NUMPAD_MULTIPLY: 106,
            NUMPAD_SUBTRACT: 109,
            PAGE_DOWN: 34,
            PAGE_UP: 33,
            PERIOD: 190,
            RIGHT: 39,
            SPACE: 32,
            TAB: 9,
            UP: 38
        }
    }), a.fn.extend({
        _focus: a.fn.focus,
        focus: function (b, c) {
            return "number" == typeof b ? this.each(function () {
                var d = this;
                setTimeout(function () {
                    a(d).focus(), c && c.call(d)
                }, b)
            }) : this._focus.apply(this, arguments)
        },
        scrollParent: function () {
            var b;
            return b = a.ui.ie && /(static|relative)/.test(this.css("position")) || /absolute/.test(this.css("position")) ? this.parents().filter(function () {
                return /(relative|absolute|fixed)/.test(a.css(this, "position")) && /(auto|scroll)/.test(a.css(this, "overflow") + a.css(this, "overflow-y") + a.css(this, "overflow-x"))
            }).eq(0) : this.parents().filter(function () {
                return /(auto|scroll)/.test(a.css(this, "overflow") + a.css(this, "overflow-y") + a.css(this, "overflow-x"))
            }).eq(0), /fixed/.test(this.css("position")) || !b.length ? a(document) : b
        },
        zIndex: function (c) {
            if (c !== b) return this.css("zIndex", c);
            if (this.length)
                for (var d, e, f = a(this[0]); f.length && f[0] !== document;) {
                    if (d = f.css("position"), ("absolute" === d || "relative" === d || "fixed" === d) && (e = parseInt(f.css("zIndex"), 10), !isNaN(e) && 0 !== e)) return e;
                    f = f.parent()
                }
            return 0
        },
        uniqueId: function () {
            return this.each(function () {
                this.id || (this.id = "ui-id-" + ++e)
            })
        },
        removeUniqueId: function () {
            return this.each(function () {
                f.test(this.id) && a(this).removeAttr("id")
            })
        }
    }), a("<a>").outerWidth(1).jquery || a.each(["Width", "Height"], function (c, d) {
        function e(b, c, d, e) {
            return a.each(f, function () {
                c -= parseFloat(a.css(b, "padding" + this)) || 0, d && (c -= parseFloat(a.css(b, "border" + this + "Width")) || 0), e && (c -= parseFloat(a.css(b, "margin" + this)) || 0)
            }), c
        }
        var f = "Width" === d ? ["Left", "Right"] : ["Top", "Bottom"],
            g = d.toLowerCase(),
            h = {
                innerWidth: a.fn.innerWidth,
                innerHeight: a.fn.innerHeight,
                outerWidth: a.fn.outerWidth,
                outerHeight: a.fn.outerHeight
            };
        a.fn["inner" + d] = function (c) {
            return c === b ? h["inner" + d].call(this) : this.each(function () {
                a(this).css(g, e(this, c) + "px")
            })
        }, a.fn["outer" + d] = function (b, c) {
            return "number" != typeof b ? h["outer" + d].call(this, b) : this.each(function () {
                a(this).css(g, e(this, b, !0, c) + "px")
            })
        }
    }), a.extend(a.expr[":"], {
        data: a.expr.createPseudo ? a.expr.createPseudo(function (b) {
            return function (c) {
                return !!a.data(c, b)
            }
        }) : function (b, c, d) {
            return !!a.data(b, d[3])
        },
        focusable: function (b) {
            return c(b, !isNaN(a.attr(b, "tabindex")))
        },
        tabbable: function (b) {
            var d = a.attr(b, "tabindex"),
                e = isNaN(d);
            return (e || d >= 0) && c(b, !e)
        }
    }), a(function () {
        var b = document.body,
            c = b.appendChild(c = document.createElement("div"));
        c.offsetHeight, a.extend(c.style, {
            minHeight: "100px",
            height: "auto",
            padding: 0,
            borderWidth: 0
        }), a.support.minHeight = 100 === c.offsetHeight, a.support.selectstart = "onselectstart" in c, b.removeChild(c).style.display = "none"
    }), function () {
        var b = /msie ([\w.]+)/.exec(navigator.userAgent.toLowerCase()) || [];
        a.ui.ie = b.length ? !0 : !1, a.ui.ie6 = 6 === parseFloat(b[1], 10)
    }(), a.fn.extend({
        disableSelection: function () {
            return this.bind((a.support.selectstart ? "selectstart" : "mousedown") + ".ui-disableSelection", function (a) {
                a.preventDefault()
            })
        },
        enableSelection: function () {
            return this.unbind(".ui-disableSelection")
        }
    }), a.extend(a.ui, {
        plugin: {
            add: function (b, c, d) {
                var e, f = a.ui[b].prototype;
                for (e in d) f.plugins[e] = f.plugins[e] || [], f.plugins[e].push([c, d[e]])
            },
            call: function (a, b, c) {
                var d, e = a.plugins[b];
                if (e && a.element[0].parentNode && 11 !== a.element[0].parentNode.nodeType)
                    for (d = 0; d < e.length; d++) a.options[e[d][0]] && e[d][1].apply(a.element, c)
            }
        },
        contains: a.contains,
        hasScroll: function (b, c) {
            if ("hidden" === a(b).css("overflow")) return !1;
            var d = c && "left" === c ? "scrollLeft" : "scrollTop",
                e = !1;
            return b[d] > 0 ? !0 : (b[d] = 1, e = b[d] > 0, b[d] = 0, e)
        },
        isOverAxis: function (a, b, c) {
            return a > b && b + c > a
        },
        isOver: function (b, c, d, e, f, g) {
            return a.ui.isOverAxis(b, d, f) && a.ui.isOverAxis(c, e, g)
        }
    }))
}(jQuery),
function (a, b) {
    var c = 0,
        d = Array.prototype.slice,
        e = a.cleanData;
    a.cleanData = function (b) {
        for (var c, d = 0; null != (c = b[d]); d++) try {
            a(c).triggerHandler("remove")
        } catch (f) {}
        e(b)
    }, a.widget = function (b, c, d) {
        var e, f, g, h, i = b.split(".")[0];
        b = b.split(".")[1], e = i + "-" + b, d || (d = c, c = a.Widget), a.expr[":"][e.toLowerCase()] = function (b) {
            return !!a.data(b, e)
        }, a[i] = a[i] || {}, f = a[i][b], g = a[i][b] = function (a, b) {
            return this._createWidget ? void(arguments.length && this._createWidget(a, b)) : new g(a, b)
        }, a.extend(g, f, {
            version: d.version,
            _proto: a.extend({}, d),
            _childConstructors: []
        }), h = new c, h.options = a.widget.extend({}, h.options), a.each(d, function (b, e) {
            a.isFunction(e) && (d[b] = function () {
                var a = function () {
                        return c.prototype[b].apply(this, arguments)
                    },
                    d = function (a) {
                        return c.prototype[b].apply(this, a)
                    };
                return function () {
                    var b, c = this._super,
                        f = this._superApply;
                    return this._super = a, this._superApply = d, b = e.apply(this, arguments), this._super = c, this._superApply = f, b
                }
            }())
        }), g.prototype = a.widget.extend(h, {
            widgetEventPrefix: h.widgetEventPrefix || b
        }, d, {
            constructor: g,
            namespace: i,
            widgetName: b,
            widgetBaseClass: e,
            widgetFullName: e
        }), f ? (a.each(f._childConstructors, function (b, c) {
            var d = c.prototype;
            a.widget(d.namespace + "." + d.widgetName, g, c._proto)
        }), delete f._childConstructors) : c._childConstructors.push(g), a.widget.bridge(b, g)
    }, a.widget.extend = function (c) {
        for (var e, f, g = d.call(arguments, 1), h = 0, i = g.length; i > h; h++)
            for (e in g[h]) f = g[h][e], g[h].hasOwnProperty(e) && f !== b && (c[e] = a.isPlainObject(f) ? a.isPlainObject(c[e]) ? a.widget.extend({}, c[e], f) : a.widget.extend({}, f) : f);
        return c
    }, a.widget.bridge = function (c, e) {
        var f = e.prototype.widgetFullName;
        a.fn[c] = function (g) {
            var h = "string" == typeof g,
                i = d.call(arguments, 1),
                j = this;
            return g = !h && i.length ? a.widget.extend.apply(null, [g].concat(i)) : g, this.each(h ? function () {
                var d, e = a.data(this, f);
                return e ? a.isFunction(e[g]) && "_" !== g.charAt(0) ? (d = e[g].apply(e, i), d !== e && d !== b ? (j = d && d.jquery ? j.pushStack(d.get()) : d, !1) : void 0) : a.error("no such method '" + g + "' for " + c + " widget instance") : a.error("cannot call methods on " + c + " prior to initialization; attempted to call method '" + g + "'")
            } : function () {
                var b = a.data(this, f);
                b ? b.option(g || {})._init() : new e(g, this)
            }), j
        }
    }, a.Widget = function () {}, a.Widget._childConstructors = [], a.Widget.prototype = {
        widgetName: "widget",
        widgetEventPrefix: "",
        defaultElement: "<div>",
        options: {
            disabled: !1,
            create: null
        },
        _createWidget: function (b, d) {
            d = a(d || this.defaultElement || this)[0], this.element = a(d), this.uuid = c++, this.eventNamespace = "." + this.widgetName + this.uuid, this.options = a.widget.extend({}, this.options, this._getCreateOptions(), b), this.bindings = a(), this.hoverable = a(), this.focusable = a(), d !== this && (a.data(d, this.widgetName, this), a.data(d, this.widgetFullName, this), this._on(this.element, {
                remove: function (a) {
                    a.target === d && this.destroy()
                }
            }), this.document = a(d.style ? d.ownerDocument : d.document || d), this.window = a(this.document[0].defaultView || this.document[0].parentWindow)), this._create(), this._trigger("create", null, this._getCreateEventData()), this._init()
        },
        _getCreateOptions: a.noop,
        _getCreateEventData: a.noop,
        _create: a.noop,
        _init: a.noop,
        destroy: function () {
            this._destroy(), this.element.unbind(this.eventNamespace).removeData(this.widgetName).removeData(this.widgetFullName).removeData(a.camelCase(this.widgetFullName)), this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName + "-disabled ui-state-disabled"), this.bindings.unbind(this.eventNamespace), this.hoverable.removeClass("ui-state-hover"), this.focusable.removeClass("ui-state-focus")
        },
        _destroy: a.noop,
        widget: function () {
            return this.element
        },
        option: function (c, d) {
            var e, f, g, h = c;
            if (0 === arguments.length) return a.widget.extend({}, this.options);
            if ("string" == typeof c)
                if (h = {}, e = c.split("."), c = e.shift(), e.length) {
                    for (f = h[c] = a.widget.extend({}, this.options[c]), g = 0; g < e.length - 1; g++) f[e[g]] = f[e[g]] || {}, f = f[e[g]];
                    if (c = e.pop(), d === b) return f[c] === b ? null : f[c];
                    f[c] = d
                } else {
                    if (d === b) return this.options[c] === b ? null : this.options[c];
                    h[c] = d
                }
            return this._setOptions(h), this
        },
        _setOptions: function (a) {
            var b;
            for (b in a) this._setOption(b, a[b]);
            return this
        },
        _setOption: function (a, b) {
            return this.options[a] = b, "disabled" === a && (this.widget().toggleClass(this.widgetFullName + "-disabled ui-state-disabled", !!b).attr("aria-disabled", b), this.hoverable.removeClass("ui-state-hover"), this.focusable.removeClass("ui-state-focus")), this
        },
        enable: function () {
            return this._setOption("disabled", !1)
        },
        disable: function () {
            return this._setOption("disabled", !0)
        },
        _on: function (b, c) {
            var d, e = this;
            c ? (b = d = a(b), this.bindings = this.bindings.add(b)) : (c = b, b = this.element, d = this.widget()), a.each(c, function (c, f) {
                function g() {
                    return e.options.disabled === !0 || a(this).hasClass("ui-state-disabled") ? void 0 : ("string" == typeof f ? e[f] : f).apply(e, arguments)
                }
                "string" != typeof f && (g.guid = f.guid = f.guid || g.guid || a.guid++);
                var h = c.match(/^(\w+)\s*(.*)$/),
                    i = h[1] + e.eventNamespace,
                    j = h[2];
                j ? d.delegate(j, i, g) : b.bind(i, g)
            })
        },
        _off: function (a, b) {
            b = (b || "").split(" ").join(this.eventNamespace + " ") + this.eventNamespace, a.unbind(b).undelegate(b)
        },
        _delay: function (a, b) {
            function c() {
                return ("string" == typeof a ? d[a] : a).apply(d, arguments)
            }
            var d = this;
            return setTimeout(c, b || 0)
        },
        _hoverable: function (b) {
            this.hoverable = this.hoverable.add(b), this._on(b, {
                mouseenter: function (b) {
                    a(b.currentTarget).addClass("ui-state-hover")
                },
                mouseleave: function (b) {
                    a(b.currentTarget).removeClass("ui-state-hover")
                }
            })
        },
        _focusable: function (b) {
            this.focusable = this.focusable.add(b), this._on(b, {
                focusin: function (b) {
                    a(b.currentTarget).addClass("ui-state-focus")
                },
                focusout: function (b) {
                    a(b.currentTarget).removeClass("ui-state-focus")
                }
            })
        },
        _trigger: function (b, c, d) {
            var e, f, g = this.options[b];
            if (d = d || {}, c = a.Event(c), c.type = (b === this.widgetEventPrefix ? b : this.widgetEventPrefix + b).toLowerCase(), c.target = this.element[0], f = c.originalEvent)
                for (e in f) e in c || (c[e] = f[e]);
            return this.element.trigger(c, d), !(a.isFunction(g) && g.apply(this.element[0], [c].concat(d)) === !1 || c.isDefaultPrevented())
        }
    }, a.each({
        show: "fadeIn",
        hide: "fadeOut"
    }, function (b, c) {
        a.Widget.prototype["_" + b] = function (d, e, f) {
            "string" == typeof e && (e = {
                effect: e
            });
            var g, h = e ? e === !0 || "number" == typeof e ? c : e.effect || c : b;
            e = e || {}, "number" == typeof e && (e = {
                duration: e
            }), g = !a.isEmptyObject(e), e.complete = f, e.delay && d.delay(e.delay), g && a.effects && (a.effects.effect[h] || a.uiBackCompat !== !1 && a.effects[h]) ? d[b](e) : h !== b && d[h] ? d[h](e.duration, e.easing, f) : d.queue(function (c) {
                a(this)[b](), f && f.call(d[0]), c()
            })
        }
    }), a.uiBackCompat !== !1 && (a.Widget.prototype._getCreateOptions = function () {
        return a.metadata && a.metadata.get(this.element[0])[this.widgetName]
    })
}(jQuery),
function (a) {
    var b = !1;
    a(document).mouseup(function () {
        b = !1
    }), a.widget("ui.mouse", {
        version: "1.9.1",
        options: {
            cancel: "input,textarea,button,select,option",
            distance: 1,
            delay: 0
        },
        _mouseInit: function () {
            var b = this;
            this.element.bind("mousedown." + this.widgetName, function (a) {
                return b._mouseDown(a)
            }).bind("click." + this.widgetName, function (c) {
                return !0 === a.data(c.target, b.widgetName + ".preventClickEvent") ? (a.removeData(c.target, b.widgetName + ".preventClickEvent"), c.stopImmediatePropagation(), !1) : void 0
            }), this.started = !1
        },
        _mouseDestroy: function () {
            this.element.unbind("." + this.widgetName), this._mouseMoveDelegate && a(document).unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate)
        },
        _mouseDown: function (c) {
            if (!b) {
                this._mouseStarted && this._mouseUp(c), this._mouseDownEvent = c;
                var d = this,
                    e = 1 === c.which,
                    f = "string" == typeof this.options.cancel && c.target.nodeName ? a(c.target).closest(this.options.cancel).length : !1;
                return e && !f && this._mouseCapture(c) ? (this.mouseDelayMet = !this.options.delay, this.mouseDelayMet || (this._mouseDelayTimer = setTimeout(function () {
                    d.mouseDelayMet = !0
                }, this.options.delay)), this._mouseDistanceMet(c) && this._mouseDelayMet(c) && (this._mouseStarted = this._mouseStart(c) !== !1, !this._mouseStarted) ? (c.preventDefault(), !0) : (!0 === a.data(c.target, this.widgetName + ".preventClickEvent") && a.removeData(c.target, this.widgetName + ".preventClickEvent"), this._mouseMoveDelegate = function (a) {
                    return d._mouseMove(a)
                }, this._mouseUpDelegate = function (a) {
                    return d._mouseUp(a)
                }, a(document).bind("mousemove." + this.widgetName, this._mouseMoveDelegate).bind("mouseup." + this.widgetName, this._mouseUpDelegate), c.preventDefault(), b = !0, !0)) : !0
            }
        },
        _mouseMove: function (b) {
            return !a.ui.ie || document.documentMode >= 9 || b.button ? this._mouseStarted ? (this._mouseDrag(b), b.preventDefault()) : (this._mouseDistanceMet(b) && this._mouseDelayMet(b) && (this._mouseStarted = this._mouseStart(this._mouseDownEvent, b) !== !1, this._mouseStarted ? this._mouseDrag(b) : this._mouseUp(b)), !this._mouseStarted) : this._mouseUp(b)
        },
        _mouseUp: function (b) {
            return a(document).unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate), this._mouseStarted && (this._mouseStarted = !1, b.target === this._mouseDownEvent.target && a.data(b.target, this.widgetName + ".preventClickEvent", !0), this._mouseStop(b)), !1
        },
        _mouseDistanceMet: function (a) {
            return Math.max(Math.abs(this._mouseDownEvent.pageX - a.pageX), Math.abs(this._mouseDownEvent.pageY - a.pageY)) >= this.options.distance
        },
        _mouseDelayMet: function () {
            return this.mouseDelayMet
        },
        _mouseStart: function () {},
        _mouseDrag: function () {},
        _mouseStop: function () {},
        _mouseCapture: function () {
            return !0
        }
    })
}(jQuery),
function (a) {
    a.widget("ui.draggable", a.ui.mouse, {
        version: "1.9.1",
        widgetEventPrefix: "drag",
        options: {
            addClasses: !0,
            appendTo: "parent",
            axis: !1,
            connectToSortable: !1,
            containment: !1,
            cursor: "auto",
            cursorAt: !1,
            grid: !1,
            handle: !1,
            helper: "original",
            iframeFix: !1,
            opacity: !1,
            refreshPositions: !1,
            revert: !1,
            revertDuration: 500,
            scope: "default",
            scroll: !0,
            scrollSensitivity: 20,
            scrollSpeed: 20,
            snap: !1,
            snapMode: "both",
            snapTolerance: 20,
            stack: !1,
            zIndex: !1
        },
        _create: function () {
            "original" != this.options.helper || /^(?:r|a|f)/.test(this.element.css("position")) || (this.element[0].style.position = "relative"), this.options.addClasses && this.element.addClass("ui-draggable"), this.options.disabled && this.element.addClass("ui-draggable-disabled"), this._mouseInit()
        },
        _destroy: function () {
            this.element.removeClass("ui-draggable ui-draggable-dragging ui-draggable-disabled"), this._mouseDestroy()
        },
        _mouseCapture: function (b) {
            var c = this.options;
            return this.helper || c.disabled || a(b.target).is(".ui-resizable-handle") ? !1 : (this.handle = this._getHandle(b), this.handle ? (a(c.iframeFix === !0 ? "iframe" : c.iframeFix).each(function () {
                a('<div class="ui-draggable-iframeFix" style="background: #fff;"></div>').css({
                    width: this.offsetWidth + "px",
                    height: this.offsetHeight + "px",
                    position: "absolute",
                    opacity: "0.001",
                    zIndex: 1e3
                }).css(a(this).offset()).appendTo("body")
            }), !0) : !1)
        },
        _mouseStart: function (b) {
            var c = this.options;
            return this.helper = this._createHelper(b), this.helper.addClass("ui-draggable-dragging"), this._cacheHelperProportions(), a.ui.ddmanager && (a.ui.ddmanager.current = this), this._cacheMargins(), this.cssPosition = this.helper.css("position"), this.scrollParent = this.helper.scrollParent(), this.offset = this.positionAbs = this.element.offset(), this.offset = {
                top: this.offset.top - this.margins.top,
                left: this.offset.left - this.margins.left
            }, a.extend(this.offset, {
                click: {
                    left: b.pageX - this.offset.left,
                    top: b.pageY - this.offset.top
                },
                parent: this._getParentOffset(),
                relative: this._getRelativeOffset()
            }), this.originalPosition = this.position = this._generatePosition(b), this.originalPageX = b.pageX, this.originalPageY = b.pageY, c.cursorAt && this._adjustOffsetFromHelper(c.cursorAt), c.containment && this._setContainment(), this._trigger("start", b) === !1 ? (this._clear(), !1) : (this._cacheHelperProportions(), a.ui.ddmanager && !c.dropBehaviour && a.ui.ddmanager.prepareOffsets(this, b), this._mouseDrag(b, !0), a.ui.ddmanager && a.ui.ddmanager.dragStart(this, b), !0)
        },
        _mouseDrag: function (b, c) {
            if (this.position = this._generatePosition(b), this.positionAbs = this._convertPositionTo("absolute"), !c) {
                var d = this._uiHash();
                if (this._trigger("drag", b, d) === !1) return this._mouseUp({}), !1;
                this.position = d.position
            }
            return this.options.axis && "y" == this.options.axis || (this.helper[0].style.left = this.position.left + "px"), this.options.axis && "x" == this.options.axis || (this.helper[0].style.top = this.position.top + "px"), a.ui.ddmanager && a.ui.ddmanager.drag(this, b), !1
        },
        _mouseStop: function (b) {
            var c = !1;
            a.ui.ddmanager && !this.options.dropBehaviour && (c = a.ui.ddmanager.drop(this, b)), this.dropped && (c = this.dropped, this.dropped = !1);
            for (var d = this.element[0], e = !1; d && (d = d.parentNode);) d == document && (e = !0);
            if (!e && "original" === this.options.helper) return !1;
            if ("invalid" == this.options.revert && !c || "valid" == this.options.revert && c || this.options.revert === !0 || a.isFunction(this.options.revert) && this.options.revert.call(this.element, c)) {
                var f = this;
                a(this.helper).animate(this.originalPosition, parseInt(this.options.revertDuration, 10), function () {
                    f._trigger("stop", b) !== !1 && f._clear()
                })
            } else this._trigger("stop", b) !== !1 && this._clear();
            return !1
        },
        _mouseUp: function (b) {
            return a("div.ui-draggable-iframeFix").each(function () {
                this.parentNode.removeChild(this)
            }), a.ui.ddmanager && a.ui.ddmanager.dragStop(this, b), a.ui.mouse.prototype._mouseUp.call(this, b)
        },
        cancel: function () {
            return this.helper.is(".ui-draggable-dragging") ? this._mouseUp({}) : this._clear(), this
        },
        _getHandle: function (b) {
            var c = this.options.handle && a(this.options.handle, this.element).length ? !1 : !0;
            return a(this.options.handle, this.element).find("*").andSelf().each(function () {
                this == b.target && (c = !0)
            }), c
        },
        _createHelper: function (b) {
            var c = this.options,
                d = a.isFunction(c.helper) ? a(c.helper.apply(this.element[0], [b])) : "clone" == c.helper ? this.element.clone().removeAttr("id") : this.element;
            return d.parents("body").length || d.appendTo("parent" == c.appendTo ? this.element[0].parentNode : c.appendTo), d[0] == this.element[0] || /(fixed|absolute)/.test(d.css("position")) || d.css("position", "absolute"), d
        },
        _adjustOffsetFromHelper: function (b) {
            "string" == typeof b && (b = b.split(" ")), a.isArray(b) && (b = {
                left: +b[0],
                top: +b[1] || 0
            }), "left" in b && (this.offset.click.left = b.left + this.margins.left), "right" in b && (this.offset.click.left = this.helperProportions.width - b.right + this.margins.left), "top" in b && (this.offset.click.top = b.top + this.margins.top), "bottom" in b && (this.offset.click.top = this.helperProportions.height - b.bottom + this.margins.top)
        },
        _getParentOffset: function () {
            this.offsetParent = this.helper.offsetParent();
            var b = this.offsetParent.offset();
            return "absolute" == this.cssPosition && this.scrollParent[0] != document && a.contains(this.scrollParent[0], this.offsetParent[0]) && (b.left += this.scrollParent.scrollLeft(), b.top += this.scrollParent.scrollTop()), (this.offsetParent[0] == document.body || this.offsetParent[0].tagName && "html" == this.offsetParent[0].tagName.toLowerCase() && a.ui.ie) && (b = {
                top: 0,
                left: 0
            }), {
                top: b.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
                left: b.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
            }
        },
        _getRelativeOffset: function () {
            if ("relative" == this.cssPosition) {
                var a = this.element.position();
                return {
                    top: a.top - (parseInt(this.helper.css("top"), 10) || 0) + this.scrollParent.scrollTop(),
                    left: a.left - (parseInt(this.helper.css("left"), 10) || 0) + this.scrollParent.scrollLeft()
                }
            }
            return {
                top: 0,
                left: 0
            }
        },
        _cacheMargins: function () {
            this.margins = {
                left: parseInt(this.element.css("marginLeft"), 10) || 0,
                top: parseInt(this.element.css("marginTop"), 10) || 0,
                right: parseInt(this.element.css("marginRight"), 10) || 0,
                bottom: parseInt(this.element.css("marginBottom"), 10) || 0
            }
        },
        _cacheHelperProportions: function () {
            this.helperProportions = {
                width: this.helper.outerWidth(),
                height: this.helper.outerHeight()
            }
        },
        _setContainment: function () {
            var b = this.options;
            if ("parent" == b.containment && (b.containment = this.helper[0].parentNode), ("document" == b.containment || "window" == b.containment) && (this.containment = ["document" == b.containment ? 0 : a(window).scrollLeft() - this.offset.relative.left - this.offset.parent.left, "document" == b.containment ? 0 : a(window).scrollTop() - this.offset.relative.top - this.offset.parent.top, ("document" == b.containment ? 0 : a(window).scrollLeft()) + a("document" == b.containment ? document : window).width() - this.helperProportions.width - this.margins.left, ("document" == b.containment ? 0 : a(window).scrollTop()) + (a("document" == b.containment ? document : window).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top]), /^(document|window|parent)$/.test(b.containment) || b.containment.constructor == Array) b.containment.constructor == Array && (this.containment = b.containment);
            else {
                var c = a(b.containment),
                    d = c[0];
                if (!d) return;
                var e = (c.offset(), "hidden" != a(d).css("overflow"));
                this.containment = [(parseInt(a(d).css("borderLeftWidth"), 10) || 0) + (parseInt(a(d).css("paddingLeft"), 10) || 0), (parseInt(a(d).css("borderTopWidth"), 10) || 0) + (parseInt(a(d).css("paddingTop"), 10) || 0), (e ? Math.max(d.scrollWidth, d.offsetWidth) : d.offsetWidth) - (parseInt(a(d).css("borderLeftWidth"), 10) || 0) - (parseInt(a(d).css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left - this.margins.right, (e ? Math.max(d.scrollHeight, d.offsetHeight) : d.offsetHeight) - (parseInt(a(d).css("borderTopWidth"), 10) || 0) - (parseInt(a(d).css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top - this.margins.bottom], this.relative_container = c
            }
        },
        _convertPositionTo: function (b, c) {
            c || (c = this.position);
            var d = "absolute" == b ? 1 : -1,
                e = (this.options, "absolute" != this.cssPosition || this.scrollParent[0] != document && a.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent),
                f = /(html|body)/i.test(e[0].tagName);
            return {
                top: c.top + this.offset.relative.top * d + this.offset.parent.top * d - ("fixed" == this.cssPosition ? -this.scrollParent.scrollTop() : f ? 0 : e.scrollTop()) * d,
                left: c.left + this.offset.relative.left * d + this.offset.parent.left * d - ("fixed" == this.cssPosition ? -this.scrollParent.scrollLeft() : f ? 0 : e.scrollLeft()) * d
            }
        },
        _generatePosition: function (b) {
            var c = this.options,
                d = "absolute" != this.cssPosition || this.scrollParent[0] != document && a.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent,
                e = /(html|body)/i.test(d[0].tagName),
                f = b.pageX,
                g = b.pageY;
            if (this.originalPosition) {
                var h;
                if (this.containment) {
                    if (this.relative_container) {
                        var i = this.relative_container.offset();
                        h = [this.containment[0] + i.left, this.containment[1] + i.top, this.containment[2] + i.left, this.containment[3] + i.top]
                    } else h = this.containment;
                    b.pageX - this.offset.click.left < h[0] && (f = h[0] + this.offset.click.left), b.pageY - this.offset.click.top < h[1] && (g = h[1] + this.offset.click.top), b.pageX - this.offset.click.left > h[2] && (f = h[2] + this.offset.click.left), b.pageY - this.offset.click.top > h[3] && (g = h[3] + this.offset.click.top)
                }
                if (c.grid) {
                    var j = c.grid[1] ? this.originalPageY + Math.round((g - this.originalPageY) / c.grid[1]) * c.grid[1] : this.originalPageY;
                    g = h ? j - this.offset.click.top < h[1] || j - this.offset.click.top > h[3] ? j - this.offset.click.top < h[1] ? j + c.grid[1] : j - c.grid[1] : j : j;
                    var k = c.grid[0] ? this.originalPageX + Math.round((f - this.originalPageX) / c.grid[0]) * c.grid[0] : this.originalPageX;
                    f = h ? k - this.offset.click.left < h[0] || k - this.offset.click.left > h[2] ? k - this.offset.click.left < h[0] ? k + c.grid[0] : k - c.grid[0] : k : k
                }
            }
            return {
                top: g - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + ("fixed" == this.cssPosition ? -this.scrollParent.scrollTop() : e ? 0 : d.scrollTop()),
                left: f - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + ("fixed" == this.cssPosition ? -this.scrollParent.scrollLeft() : e ? 0 : d.scrollLeft())
            }
        },
        _clear: function () {
            this.helper.removeClass("ui-draggable-dragging"), this.helper[0] == this.element[0] || this.cancelHelperRemoval || this.helper.remove(), this.helper = null, this.cancelHelperRemoval = !1
        },
        _trigger: function (b, c, d) {
            return d = d || this._uiHash(), a.ui.plugin.call(this, b, [c, d]), "drag" == b && (this.positionAbs = this._convertPositionTo("absolute")), a.Widget.prototype._trigger.call(this, b, c, d)
        },
        plugins: {},
        _uiHash: function () {
            return {
                helper: this.helper,
                position: this.position,
                originalPosition: this.originalPosition,
                offset: this.positionAbs
            }
        }
    }), a.ui.plugin.add("draggable", "connectToSortable", {
        start: function (b, c) {
            var d = a(this).data("draggable"),
                e = d.options,
                f = a.extend({}, c, {
                    item: d.element
                });
            d.sortables = [], a(e.connectToSortable).each(function () {
                var c = a.data(this, "sortable");
                c && !c.options.disabled && (d.sortables.push({
                    instance: c,
                    shouldRevert: c.options.revert
                }), c.refreshPositions(), c._trigger("activate", b, f))
            })
        },
        stop: function (b, c) {
            var d = a(this).data("draggable"),
                e = a.extend({}, c, {
                    item: d.element
                });
            a.each(d.sortables, function () {
                this.instance.isOver ? (this.instance.isOver = 0, d.cancelHelperRemoval = !0, this.instance.cancelHelperRemoval = !1, this.shouldRevert && (this.instance.options.revert = !0), this.instance._mouseStop(b), this.instance.options.helper = this.instance.options._helper, "original" == d.options.helper && this.instance.currentItem.css({
                    top: "auto",
                    left: "auto"
                })) : (this.instance.cancelHelperRemoval = !1, this.instance._trigger("deactivate", b, e))
            })
        },
        drag: function (b, c) {
            var d = a(this).data("draggable"),
                e = this;
            a.each(d.sortables, function () {
                var f = !1,
                    g = this;
                this.instance.positionAbs = d.positionAbs, this.instance.helperProportions = d.helperProportions, this.instance.offset.click = d.offset.click, this.instance._intersectsWith(this.instance.containerCache) && (f = !0, a.each(d.sortables, function () {
                    return this.instance.positionAbs = d.positionAbs, this.instance.helperProportions = d.helperProportions, this.instance.offset.click = d.offset.click, this != g && this.instance._intersectsWith(this.instance.containerCache) && a.ui.contains(g.instance.element[0], this.instance.element[0]) && (f = !1), f
                })), f ? (this.instance.isOver || (this.instance.isOver = 1, this.instance.currentItem = a(e).clone().removeAttr("id").appendTo(this.instance.element).data("sortable-item", !0), this.instance.options._helper = this.instance.options.helper, this.instance.options.helper = function () {
                    return c.helper[0]
                }, b.target = this.instance.currentItem[0], this.instance._mouseCapture(b, !0), this.instance._mouseStart(b, !0, !0), this.instance.offset.click.top = d.offset.click.top, this.instance.offset.click.left = d.offset.click.left, this.instance.offset.parent.left -= d.offset.parent.left - this.instance.offset.parent.left, this.instance.offset.parent.top -= d.offset.parent.top - this.instance.offset.parent.top, d._trigger("toSortable", b), d.dropped = this.instance.element, d.currentItem = d.element, this.instance.fromOutside = d), this.instance.currentItem && this.instance._mouseDrag(b)) : this.instance.isOver && (this.instance.isOver = 0, this.instance.cancelHelperRemoval = !0, this.instance.options.revert = !1, this.instance._trigger("out", b, this.instance._uiHash(this.instance)), this.instance._mouseStop(b, !0), this.instance.options.helper = this.instance.options._helper, this.instance.currentItem.remove(), this.instance.placeholder && this.instance.placeholder.remove(), d._trigger("fromSortable", b), d.dropped = !1)
            })
        }
    }), a.ui.plugin.add("draggable", "cursor", {
        start: function () {
            var b = a("body"),
                c = a(this).data("draggable").options;
            b.css("cursor") && (c._cursor = b.css("cursor")), b.css("cursor", c.cursor)
        },
        stop: function () {
            var b = a(this).data("draggable").options;
            b._cursor && a("body").css("cursor", b._cursor)
        }
    }), a.ui.plugin.add("draggable", "opacity", {
        start: function (b, c) {
            var d = a(c.helper),
                e = a(this).data("draggable").options;
            d.css("opacity") && (e._opacity = d.css("opacity")), d.css("opacity", e.opacity)
        },
        stop: function (b, c) {
            var d = a(this).data("draggable").options;
            d._opacity && a(c.helper).css("opacity", d._opacity)
        }
    }), a.ui.plugin.add("draggable", "scroll", {
        start: function () {
            var b = a(this).data("draggable");
            b.scrollParent[0] != document && "HTML" != b.scrollParent[0].tagName && (b.overflowOffset = b.scrollParent.offset())
        },
        drag: function (b) {
            var c = a(this).data("draggable"),
                d = c.options,
                e = !1;
            c.scrollParent[0] != document && "HTML" != c.scrollParent[0].tagName ? (d.axis && "x" == d.axis || (c.overflowOffset.top + c.scrollParent[0].offsetHeight - b.pageY < d.scrollSensitivity ? c.scrollParent[0].scrollTop = e = c.scrollParent[0].scrollTop + d.scrollSpeed : b.pageY - c.overflowOffset.top < d.scrollSensitivity && (c.scrollParent[0].scrollTop = e = c.scrollParent[0].scrollTop - d.scrollSpeed)), d.axis && "y" == d.axis || (c.overflowOffset.left + c.scrollParent[0].offsetWidth - b.pageX < d.scrollSensitivity ? c.scrollParent[0].scrollLeft = e = c.scrollParent[0].scrollLeft + d.scrollSpeed : b.pageX - c.overflowOffset.left < d.scrollSensitivity && (c.scrollParent[0].scrollLeft = e = c.scrollParent[0].scrollLeft - d.scrollSpeed))) : (d.axis && "x" == d.axis || (b.pageY - a(document).scrollTop() < d.scrollSensitivity ? e = a(document).scrollTop(a(document).scrollTop() - d.scrollSpeed) : a(window).height() - (b.pageY - a(document).scrollTop()) < d.scrollSensitivity && (e = a(document).scrollTop(a(document).scrollTop() + d.scrollSpeed))), d.axis && "y" == d.axis || (b.pageX - a(document).scrollLeft() < d.scrollSensitivity ? e = a(document).scrollLeft(a(document).scrollLeft() - d.scrollSpeed) : a(window).width() - (b.pageX - a(document).scrollLeft()) < d.scrollSensitivity && (e = a(document).scrollLeft(a(document).scrollLeft() + d.scrollSpeed)))), e !== !1 && a.ui.ddmanager && !d.dropBehaviour && a.ui.ddmanager.prepareOffsets(c, b)
        }
    }), a.ui.plugin.add("draggable", "snap", {
        start: function () {
            var b = a(this).data("draggable"),
                c = b.options;
            b.snapElements = [], a(c.snap.constructor != String ? c.snap.items || ":data(draggable)" : c.snap).each(function () {
                var c = a(this),
                    d = c.offset();
                this != b.element[0] && b.snapElements.push({
                    item: this,
                    width: c.outerWidth(),
                    height: c.outerHeight(),
                    top: d.top,
                    left: d.left
                })
            })
        },
        drag: function (b, c) {
            for (var d = a(this).data("draggable"), e = d.options, f = e.snapTolerance, g = c.offset.left, h = g + d.helperProportions.width, i = c.offset.top, j = i + d.helperProportions.height, k = d.snapElements.length - 1; k >= 0; k--) {
                var l = d.snapElements[k].left,
                    m = l + d.snapElements[k].width,
                    n = d.snapElements[k].top,
                    o = n + d.snapElements[k].height;
                if (g > l - f && m + f > g && i > n - f && o + f > i || g > l - f && m + f > g && j > n - f && o + f > j || h > l - f && m + f > h && i > n - f && o + f > i || h > l - f && m + f > h && j > n - f && o + f > j) {
                    if ("inner" != e.snapMode) {
                        var p = Math.abs(n - j) <= f,
                            q = Math.abs(o - i) <= f,
                            r = Math.abs(l - h) <= f,
                            s = Math.abs(m - g) <= f;
                        p && (c.position.top = d._convertPositionTo("relative", {
                            top: n - d.helperProportions.height,
                            left: 0
                        }).top - d.margins.top), q && (c.position.top = d._convertPositionTo("relative", {
                            top: o,
                            left: 0
                        }).top - d.margins.top), r && (c.position.left = d._convertPositionTo("relative", {
                            top: 0,
                            left: l - d.helperProportions.width
                        }).left - d.margins.left), s && (c.position.left = d._convertPositionTo("relative", {
                            top: 0,
                            left: m
                        }).left - d.margins.left)
                    }
                    var t = p || q || r || s;
                    if ("outer" != e.snapMode) {
                        var p = Math.abs(n - i) <= f,
                            q = Math.abs(o - j) <= f,
                            r = Math.abs(l - g) <= f,
                            s = Math.abs(m - h) <= f;
                        p && (c.position.top = d._convertPositionTo("relative", {
                            top: n,
                            left: 0
                        }).top - d.margins.top), q && (c.position.top = d._convertPositionTo("relative", {
                            top: o - d.helperProportions.height,
                            left: 0
                        }).top - d.margins.top), r && (c.position.left = d._convertPositionTo("relative", {
                            top: 0,
                            left: l
                        }).left - d.margins.left), s && (c.position.left = d._convertPositionTo("relative", {
                            top: 0,
                            left: m - d.helperProportions.width
                        }).left - d.margins.left)
                    }!d.snapElements[k].snapping && (p || q || r || s || t) && d.options.snap.snap && d.options.snap.snap.call(d.element, b, a.extend(d._uiHash(), {
                        snapItem: d.snapElements[k].item
                    })), d.snapElements[k].snapping = p || q || r || s || t
                } else d.snapElements[k].snapping && d.options.snap.release && d.options.snap.release.call(d.element, b, a.extend(d._uiHash(), {
                    snapItem: d.snapElements[k].item
                })), d.snapElements[k].snapping = !1
            }
        }
    }), a.ui.plugin.add("draggable", "stack", {
        start: function () {
            var b = a(this).data("draggable").options,
                c = a.makeArray(a(b.stack)).sort(function (b, c) {
                    return (parseInt(a(b).css("zIndex"), 10) || 0) - (parseInt(a(c).css("zIndex"), 10) || 0)
                });
            if (c.length) {
                var d = parseInt(c[0].style.zIndex) || 0;
                a(c).each(function (a) {
                    this.style.zIndex = d + a
                }), this[0].style.zIndex = d + c.length
            }
        }
    }), a.ui.plugin.add("draggable", "zIndex", {
        start: function (b, c) {
            var d = a(c.helper),
                e = a(this).data("draggable").options;
            d.css("zIndex") && (e._zIndex = d.css("zIndex")), d.css("zIndex", e.zIndex)
        },
        stop: function (b, c) {
            var d = a(this).data("draggable").options;
            d._zIndex && a(c.helper).css("zIndex", d._zIndex)
        }
    })
}(jQuery),
function (a) {
    a.widget("ui.droppable", {
        version: "1.9.1",
        widgetEventPrefix: "drop",
        options: {
            accept: "*",
            activeClass: !1,
            addClasses: !0,
            greedy: !1,
            hoverClass: !1,
            scope: "default",
            tolerance: "intersect"
        },
        _create: function () {
            var b = this.options,
                c = b.accept;
            this.isover = 0, this.isout = 1, this.accept = a.isFunction(c) ? c : function (a) {
                return a.is(c)
            }, this.proportions = {
                width: this.element[0].offsetWidth,
                height: this.element[0].offsetHeight
            }, a.ui.ddmanager.droppables[b.scope] = a.ui.ddmanager.droppables[b.scope] || [], a.ui.ddmanager.droppables[b.scope].push(this), b.addClasses && this.element.addClass("ui-droppable")
        },
        _destroy: function () {
            for (var b = a.ui.ddmanager.droppables[this.options.scope], c = 0; c < b.length; c++) b[c] == this && b.splice(c, 1);
            this.element.removeClass("ui-droppable ui-droppable-disabled")
        },
        _setOption: function (b, c) {
            "accept" == b && (this.accept = a.isFunction(c) ? c : function (a) {
                return a.is(c)
            }), a.Widget.prototype._setOption.apply(this, arguments)
        },
        _activate: function (b) {
            var c = a.ui.ddmanager.current;
            this.options.activeClass && this.element.addClass(this.options.activeClass), c && this._trigger("activate", b, this.ui(c))
        },
        _deactivate: function (b) {
            var c = a.ui.ddmanager.current;
            this.options.activeClass && this.element.removeClass(this.options.activeClass), c && this._trigger("deactivate", b, this.ui(c))
        },
        _over: function (b) {
            var c = a.ui.ddmanager.current;
            c && (c.currentItem || c.element)[0] != this.element[0] && this.accept.call(this.element[0], c.currentItem || c.element) && (this.options.hoverClass && this.element.addClass(this.options.hoverClass), this._trigger("over", b, this.ui(c)))
        },
        _out: function (b) {
            var c = a.ui.ddmanager.current;
            c && (c.currentItem || c.element)[0] != this.element[0] && this.accept.call(this.element[0], c.currentItem || c.element) && (this.options.hoverClass && this.element.removeClass(this.options.hoverClass), this._trigger("out", b, this.ui(c)))
        },
        _drop: function (b, c) {
            var d = c || a.ui.ddmanager.current;
            if (!d || (d.currentItem || d.element)[0] == this.element[0]) return !1;
            var e = !1;
            return this.element.find(":data(droppable)").not(".ui-draggable-dragging").each(function () {
                var b = a.data(this, "droppable");
                return b.options.greedy && !b.options.disabled && b.options.scope == d.options.scope && b.accept.call(b.element[0], d.currentItem || d.element) && a.ui.intersect(d, a.extend(b, {
                    offset: b.element.offset()
                }), b.options.tolerance) ? (e = !0, !1) : void 0
            }), e ? !1 : this.accept.call(this.element[0], d.currentItem || d.element) ? (this.options.activeClass && this.element.removeClass(this.options.activeClass), this.options.hoverClass && this.element.removeClass(this.options.hoverClass), this._trigger("drop", b, this.ui(d)), this.element) : !1
        },
        ui: function (a) {
            return {
                draggable: a.currentItem || a.element,
                helper: a.helper,
                position: a.position,
                offset: a.positionAbs
            }
        }
    }), a.ui.intersect = function (b, c, d) {
        if (!c.offset) return !1;
        var e = (b.positionAbs || b.position.absolute).left,
            f = e + b.helperProportions.width,
            g = (b.positionAbs || b.position.absolute).top,
            h = g + b.helperProportions.height,
            i = c.offset.left,
            j = i + c.proportions.width,
            k = c.offset.top,
            l = k + c.proportions.height;
        switch (d) {
        case "fit":
            return e >= i && j >= f && g >= k && l >= h;
        case "intersect":
            return i < e + b.helperProportions.width / 2 && f - b.helperProportions.width / 2 < j && k < g + b.helperProportions.height / 2 && h - b.helperProportions.height / 2 < l;
        case "pointer":
            var m = (b.positionAbs || b.position.absolute).left + (b.clickOffset || b.offset.click).left,
                n = (b.positionAbs || b.position.absolute).top + (b.clickOffset || b.offset.click).top,
                o = a.ui.isOver(n, m, k, i, c.proportions.height, c.proportions.width);
            return o;
        case "touch":
            return (g >= k && l >= g || h >= k && l >= h || k > g && h > l) && (e >= i && j >= e || f >= i && j >= f || i > e && f > j);
        default:
            return !1
        }
    }, a.ui.ddmanager = {
        current: null,
        droppables: {
            "default": []
        },
        prepareOffsets: function (b, c) {
            var d = a.ui.ddmanager.droppables[b.options.scope] || [],
                e = c ? c.type : null,
                f = (b.currentItem || b.element).find(":data(droppable)").andSelf();
            a: for (var g = 0; g < d.length; g++)
                if (!(d[g].options.disabled || b && !d[g].accept.call(d[g].element[0], b.currentItem || b.element))) {
                    for (var h = 0; h < f.length; h++)
                        if (f[h] == d[g].element[0]) {
                            d[g].proportions.height = 0;
                            continue a
                        }
                    d[g].visible = "none" != d[g].element.css("display"), d[g].visible && ("mousedown" == e && d[g]._activate.call(d[g], c), d[g].offset = d[g].element.offset(), d[g].proportions = {
                        width: d[g].element[0].offsetWidth,
                        height: d[g].element[0].offsetHeight
                    })
                }
        },
        drop: function (b, c) {
            var d = !1;
            return a.each(a.ui.ddmanager.droppables[b.options.scope] || [], function () {
                this.options && (!this.options.disabled && this.visible && a.ui.intersect(b, this, this.options.tolerance) && (d = this._drop.call(this, c) || d), !this.options.disabled && this.visible && this.accept.call(this.element[0], b.currentItem || b.element) && (this.isout = 1, this.isover = 0, this._deactivate.call(this, c)))
            }), d
        },
        dragStart: function (b, c) {
            b.element.parentsUntil("body").bind("scroll.droppable", function () {
                b.options.refreshPositions || a.ui.ddmanager.prepareOffsets(b, c)
            })
        },
        drag: function (b, c) {
            b.options.refreshPositions && a.ui.ddmanager.prepareOffsets(b, c), a.each(a.ui.ddmanager.droppables[b.options.scope] || [], function () {
                if (!this.options.disabled && !this.greedyChild && this.visible) {
                    var d = a.ui.intersect(b, this, this.options.tolerance),
                        e = d || 1 != this.isover ? d && 0 == this.isover ? "isover" : null : "isout";
                    if (e) {
                        var f;
                        if (this.options.greedy) {
                            var g = this.options.scope,
                                h = this.element.parents(":data(droppable)").filter(function () {
                                    return a.data(this, "droppable").options.scope === g
                                });
                            h.length && (f = a.data(h[0], "droppable"), f.greedyChild = "isover" == e ? 1 : 0)
                        }
                        f && "isover" == e && (f.isover = 0, f.isout = 1, f._out.call(f, c)), this[e] = 1, this["isout" == e ? "isover" : "isout"] = 0, this["isover" == e ? "_over" : "_out"].call(this, c), f && "isout" == e && (f.isout = 0, f.isover = 1, f._over.call(f, c))
                    }
                }
            })
        },
        dragStop: function (b, c) {
            b.element.parentsUntil("body").unbind("scroll.droppable"), b.options.refreshPositions || a.ui.ddmanager.prepareOffsets(b, c)
        }
    }
}(jQuery),
function (a) {
    a.widget("ui.resizable", a.ui.mouse, {
        version: "1.9.1",
        widgetEventPrefix: "resize",
        options: {
            alsoResize: !1,
            animate: !1,
            animateDuration: "slow",
            animateEasing: "swing",
            aspectRatio: !1,
            autoHide: !1,
            containment: !1,
            ghost: !1,
            grid: !1,
            handles: "e,s,se",
            helper: !1,
            maxHeight: null,
            maxWidth: null,
            minHeight: 10,
            minWidth: 10,
            zIndex: 1e3
        },
        _create: function () {
            var b = this,
                c = this.options;
            if (this.element.addClass("ui-resizable"), a.extend(this, {
                _aspectRatio: !!c.aspectRatio,
                aspectRatio: c.aspectRatio,
                originalElement: this.element,
                _proportionallyResizeElements: [],
                _helper: c.helper || c.ghost || c.animate ? c.helper || "ui-resizable-helper" : null
            }), this.element[0].nodeName.match(/canvas|textarea|input|select|button|img/i) && (this.element.wrap(a('<div class="ui-wrapper" style="overflow: hidden;"></div>').css({
                position: this.element.css("position"),
                width: this.element.outerWidth(),
                height: this.element.outerHeight(),
                top: this.element.css("top"),
                left: this.element.css("left")
            })), this.element = this.element.parent().data("resizable", this.element.data("resizable")), this.elementIsWrapper = !0, this.element.css({
                marginLeft: this.originalElement.css("marginLeft"),
                marginTop: this.originalElement.css("marginTop"),
                marginRight: this.originalElement.css("marginRight"),
                marginBottom: this.originalElement.css("marginBottom")
            }), this.originalElement.css({
                marginLeft: 0,
                marginTop: 0,
                marginRight: 0,
                marginBottom: 0
            }), this.originalResizeStyle = this.originalElement.css("resize"), this.originalElement.css("resize", "none"), this._proportionallyResizeElements.push(this.originalElement.css({
                position: "static",
                zoom: 1,
                display: "block"
            })), this.originalElement.css({
                margin: this.originalElement.css("margin")
            }), this._proportionallyResize()), this.handles = c.handles || (a(".ui-resizable-handle", this.element).length ? {
                n: ".ui-resizable-n",
                e: ".ui-resizable-e",
                s: ".ui-resizable-s",
                w: ".ui-resizable-w",
                se: ".ui-resizable-se",
                sw: ".ui-resizable-sw",
                ne: ".ui-resizable-ne",
                nw: ".ui-resizable-nw"
            } : "e,s,se"), this.handles.constructor == String) {
                "all" == this.handles && (this.handles = "n,e,s,w,se,sw,ne,nw");
                var d = this.handles.split(",");
                this.handles = {};
                for (var e = 0; e < d.length; e++) {
                    var f = a.trim(d[e]),
                        g = "ui-resizable-" + f,
                        h = a('<div class="ui-resizable-handle ' + g + '"></div>');
                    h.css({
                        zIndex: c.zIndex
                    }), "se" == f && h.addClass("ui-icon ui-icon-gripsmall-diagonal-se"), this.handles[f] = ".ui-resizable-" + f, this.element.append(h)
                }
            }
            this._renderAxis = function (b) {
                b = b || this.element;
                for (var c in this.handles) {
                    if (this.handles[c].constructor == String && (this.handles[c] = a(this.handles[c], this.element).show()), this.elementIsWrapper && this.originalElement[0].nodeName.match(/textarea|input|select|button/i)) {
                        var d = a(this.handles[c], this.element),
                            e = 0;
                        e = /sw|ne|nw|se|n|s/.test(c) ? d.outerHeight() : d.outerWidth();
                        var f = ["padding", /ne|nw|n/.test(c) ? "Top" : /se|sw|s/.test(c) ? "Bottom" : /^e$/.test(c) ? "Right" : "Left"].join("");
                        b.css(f, e), this._proportionallyResize()
                    }
                    a(this.handles[c]).length
                }
            }, this._renderAxis(this.element), this._handles = a(".ui-resizable-handle", this.element).disableSelection(), this._handles.mouseover(function () {
                if (!b.resizing) {
                    if (this.className) var a = this.className.match(/ui-resizable-(se|sw|ne|nw|n|e|s|w)/i);
                    b.axis = a && a[1] ? a[1] : "se"
                }
            }), c.autoHide && (this._handles.hide(), a(this.element).addClass("ui-resizable-autohide").mouseenter(function () {
                c.disabled || (a(this).removeClass("ui-resizable-autohide"), b._handles.show())
            }).mouseleave(function () {
                c.disabled || b.resizing || (a(this).addClass("ui-resizable-autohide"), b._handles.hide())
            })), this._mouseInit()
        },
        _destroy: function () {
            this._mouseDestroy();
            var b = function (b) {
                a(b).removeClass("ui-resizable ui-resizable-disabled ui-resizable-resizing").removeData("resizable").removeData("ui-resizable").unbind(".resizable").find(".ui-resizable-handle").remove()
            };
            if (this.elementIsWrapper) {
                b(this.element);
                var c = this.element;
                this.originalElement.css({
                    position: c.css("position"),
                    width: c.outerWidth(),
                    height: c.outerHeight(),
                    top: c.css("top"),
                    left: c.css("left")
                }).insertAfter(c), c.remove()
            }
            return this.originalElement.css("resize", this.originalResizeStyle), b(this.originalElement), this
        },
        _mouseCapture: function (b) {
            var c = !1;
            for (var d in this.handles) a(this.handles[d])[0] == b.target && (c = !0);
            return !this.options.disabled && c
        },
        _mouseStart: function (c) {
            var d = this.options,
                e = this.element.position(),
                f = this.element;
            this.resizing = !0, this.documentScroll = {
                top: a(document).scrollTop(),
                left: a(document).scrollLeft()
            }, (f.is(".ui-draggable") || /absolute/.test(f.css("position"))) && f.css({
                position: "absolute",
                top: e.top,
                left: e.left
            }), this._renderProxy();
            var g = b(this.helper.css("left")),
                h = b(this.helper.css("top"));
            d.containment && (g += a(d.containment).scrollLeft() || 0, h += a(d.containment).scrollTop() || 0), this.offset = this.helper.offset(), this.position = {
                left: g,
                top: h
            }, this.size = this._helper ? {
                width: f.outerWidth(),
                height: f.outerHeight()
            } : {
                width: f.width(),
                height: f.height()
            }, this.originalSize = this._helper ? {
                width: f.outerWidth(),
                height: f.outerHeight()
            } : {
                width: f.width(),
                height: f.height()
            }, this.originalPosition = {
                left: g,
                top: h
            }, this.sizeDiff = {
                width: f.outerWidth() - f.width(),
                height: f.outerHeight() - f.height()
            }, this.originalMousePosition = {
                left: c.pageX,
                top: c.pageY
            }, this.aspectRatio = "number" == typeof d.aspectRatio ? d.aspectRatio : this.originalSize.width / this.originalSize.height || 1;
            var i = a(".ui-resizable-" + this.axis).css("cursor");
            return a("body").css("cursor", "auto" == i ? this.axis + "-resize" : i), f.addClass("ui-resizable-resizing"), this._propagate("start", c), !0
        },
        _mouseDrag: function (a) {
            var b = this.helper,
                c = (this.options, this.originalMousePosition),
                d = this.axis,
                e = a.pageX - c.left || 0,
                f = a.pageY - c.top || 0,
                g = this._change[d];
            if (!g) return !1;
            var h = g.apply(this, [a, e, f]);
            return this._updateVirtualBoundaries(a.shiftKey), (this._aspectRatio || a.shiftKey) && (h = this._updateRatio(h, a)), h = this._respectSize(h, a), this._propagate("resize", a), b.css({
                top: this.position.top + "px",
                left: this.position.left + "px",
                width: this.size.width + "px",
                height: this.size.height + "px"
            }), !this._helper && this._proportionallyResizeElements.length && this._proportionallyResize(), this._updateCache(h), this._trigger("resize", a, this.ui()), !1
        },
        _mouseStop: function (b) {
            this.resizing = !1;
            var c = this.options,
                d = this;
            if (this._helper) {
                var e = this._proportionallyResizeElements,
                    f = e.length && /textarea/i.test(e[0].nodeName),
                    g = f && a.ui.hasScroll(e[0], "left") ? 0 : d.sizeDiff.height,
                    h = f ? 0 : d.sizeDiff.width,
                    i = {
                        width: d.helper.width() - h,
                        height: d.helper.height() - g
                    },
                    j = parseInt(d.element.css("left"), 10) + (d.position.left - d.originalPosition.left) || null,
                    k = parseInt(d.element.css("top"), 10) + (d.position.top - d.originalPosition.top) || null;
                c.animate || this.element.css(a.extend(i, {
                    top: k,
                    left: j
                })), d.helper.height(d.size.height), d.helper.width(d.size.width), this._helper && !c.animate && this._proportionallyResize()
            }
            return a("body").css("cursor", "auto"), this.element.removeClass("ui-resizable-resizing"), this._propagate("stop", b), this._helper && this.helper.remove(), !1
        },
        _updateVirtualBoundaries: function (a) {
            var b, d, e, f, g, h = this.options;
            g = {
                minWidth: c(h.minWidth) ? h.minWidth : 0,
                maxWidth: c(h.maxWidth) ? h.maxWidth : 1 / 0,
                minHeight: c(h.minHeight) ? h.minHeight : 0,
                maxHeight: c(h.maxHeight) ? h.maxHeight : 1 / 0
            }, (this._aspectRatio || a) && (b = g.minHeight * this.aspectRatio, e = g.minWidth / this.aspectRatio, d = g.maxHeight * this.aspectRatio, f = g.maxWidth / this.aspectRatio, b > g.minWidth && (g.minWidth = b), e > g.minHeight && (g.minHeight = e), d < g.maxWidth && (g.maxWidth = d), f < g.maxHeight && (g.maxHeight = f)), this._vBoundaries = g
        },
        _updateCache: function (a) {
            this.options;
            this.offset = this.helper.offset(), c(a.left) && (this.position.left = a.left), c(a.top) && (this.position.top = a.top), c(a.height) && (this.size.height = a.height), c(a.width) && (this.size.width = a.width)
        },
        _updateRatio: function (a) {
            var b = (this.options, this.position),
                d = this.size,
                e = this.axis;
            return c(a.height) ? a.width = a.height * this.aspectRatio : c(a.width) && (a.height = a.width / this.aspectRatio), "sw" == e && (a.left = b.left + (d.width - a.width), a.top = null), "nw" == e && (a.top = b.top + (d.height - a.height), a.left = b.left + (d.width - a.width)), a
        },
        _respectSize: function (a, b) {
            var d = (this.helper, this._vBoundaries),
                e = (this._aspectRatio || b.shiftKey, this.axis),
                f = c(a.width) && d.maxWidth && d.maxWidth < a.width,
                g = c(a.height) && d.maxHeight && d.maxHeight < a.height,
                h = c(a.width) && d.minWidth && d.minWidth > a.width,
                i = c(a.height) && d.minHeight && d.minHeight > a.height;
            h && (a.width = d.minWidth), i && (a.height = d.minHeight), f && (a.width = d.maxWidth), g && (a.height = d.maxHeight);
            var j = this.originalPosition.left + this.originalSize.width,
                k = this.position.top + this.size.height,
                l = /sw|nw|w/.test(e),
                m = /nw|ne|n/.test(e);
            h && l && (a.left = j - d.minWidth), f && l && (a.left = j - d.maxWidth), i && m && (a.top = k - d.minHeight), g && m && (a.top = k - d.maxHeight);
            var n = !a.width && !a.height;
            return n && !a.left && a.top ? a.top = null : n && !a.top && a.left && (a.left = null), a
        },
        _proportionallyResize: function () {
            this.options;
            if (this._proportionallyResizeElements.length)
                for (var b = this.helper || this.element, c = 0; c < this._proportionallyResizeElements.length; c++) {
                    var d = this._proportionallyResizeElements[c];
                    if (!this.borderDif) {
                        var e = [d.css("borderTopWidth"), d.css("borderRightWidth"), d.css("borderBottomWidth"), d.css("borderLeftWidth")],
                            f = [d.css("paddingTop"), d.css("paddingRight"), d.css("paddingBottom"), d.css("paddingLeft")];
                        this.borderDif = a.map(e, function (a, b) {
                            var c = parseInt(a, 10) || 0,
                                d = parseInt(f[b], 10) || 0;
                            return c + d
                        })
                    }
                    d.css({
                        height: b.height() - this.borderDif[0] - this.borderDif[2] || 0,
                        width: b.width() - this.borderDif[1] - this.borderDif[3] || 0
                    })
                }
        },
        _renderProxy: function () {
            var b = this.element,
                c = this.options;
            if (this.elementOffset = b.offset(), this._helper) {
                this.helper = this.helper || a('<div style="overflow:hidden;"></div>');
                var d = a.ui.ie6 ? 1 : 0,
                    e = a.ui.ie6 ? 2 : -1;
                this.helper.addClass(this._helper).css({
                    width: this.element.outerWidth() + e,
                    height: this.element.outerHeight() + e,
                    position: "absolute",
                    left: this.elementOffset.left - d + "px",
                    top: this.elementOffset.top - d + "px",
                    zIndex: ++c.zIndex
                }), this.helper.appendTo("body").disableSelection()
            } else this.helper = this.element
        },
        _change: {
            e: function (a, b) {
                return {
                    width: this.originalSize.width + b
                }
            },
            w: function (a, b) {
                var c = (this.options, this.originalSize),
                    d = this.originalPosition;
                return {
                    left: d.left + b,
                    width: c.width - b
                }
            },
            n: function (a, b, c) {
                var d = (this.options, this.originalSize),
                    e = this.originalPosition;
                return {
                    top: e.top + c,
                    height: d.height - c
                }
            },
            s: function (a, b, c) {
                return {
                    height: this.originalSize.height + c
                }
            },
            se: function (b, c, d) {
                return a.extend(this._change.s.apply(this, arguments), this._change.e.apply(this, [b, c, d]))
            },
            sw: function (b, c, d) {
                return a.extend(this._change.s.apply(this, arguments), this._change.w.apply(this, [b, c, d]))
            },
            ne: function (b, c, d) {
                return a.extend(this._change.n.apply(this, arguments), this._change.e.apply(this, [b, c, d]))
            },
            nw: function (b, c, d) {
                return a.extend(this._change.n.apply(this, arguments), this._change.w.apply(this, [b, c, d]))
            }
        },
        _propagate: function (b, c) {
            a.ui.plugin.call(this, b, [c, this.ui()]), "resize" != b && this._trigger(b, c, this.ui())
        },
        plugins: {},
        ui: function () {
            return {
                originalElement: this.originalElement,
                element: this.element,
                helper: this.helper,
                position: this.position,
                size: this.size,
                originalSize: this.originalSize,
                originalPosition: this.originalPosition
            }
        }
    }), a.ui.plugin.add("resizable", "alsoResize", {
        start: function () {
            var b = a(this).data("resizable"),
                c = b.options,
                d = function (b) {
                    a(b).each(function () {
                        var b = a(this);
                        b.data("resizable-alsoresize", {
                            width: parseInt(b.width(), 10),
                            height: parseInt(b.height(), 10),
                            left: parseInt(b.css("left"), 10),
                            top: parseInt(b.css("top"), 10)
                        })
                    })
                };
            "object" != typeof c.alsoResize || c.alsoResize.parentNode ? d(c.alsoResize) : c.alsoResize.length ? (c.alsoResize = c.alsoResize[0], d(c.alsoResize)) : a.each(c.alsoResize, function (a) {
                d(a)
            })
        },
        resize: function (b, c) {
            var d = a(this).data("resizable"),
                e = d.options,
                f = d.originalSize,
                g = d.originalPosition,
                h = {
                    height: d.size.height - f.height || 0,
                    width: d.size.width - f.width || 0,
                    top: d.position.top - g.top || 0,
                    left: d.position.left - g.left || 0
                },
                i = function (b, d) {
                    a(b).each(function () {
                        var b = a(this),
                            e = a(this).data("resizable-alsoresize"),
                            f = {},
                            g = d && d.length ? d : b.parents(c.originalElement[0]).length ? ["width", "height"] : ["width", "height", "top", "left"];
                        a.each(g, function (a, b) {
                            var c = (e[b] || 0) + (h[b] || 0);
                            c && c >= 0 && (f[b] = c || null)
                        }), b.css(f)
                    })
                };
            "object" != typeof e.alsoResize || e.alsoResize.nodeType ? i(e.alsoResize) : a.each(e.alsoResize, function (a, b) {
                i(a, b)
            })
        },
        stop: function () {
            a(this).removeData("resizable-alsoresize")
        }
    }), a.ui.plugin.add("resizable", "animate", {
        stop: function (b) {
            var c = a(this).data("resizable"),
                d = c.options,
                e = c._proportionallyResizeElements,
                f = e.length && /textarea/i.test(e[0].nodeName),
                g = f && a.ui.hasScroll(e[0], "left") ? 0 : c.sizeDiff.height,
                h = f ? 0 : c.sizeDiff.width,
                i = {
                    width: c.size.width - h,
                    height: c.size.height - g
                },
                j = parseInt(c.element.css("left"), 10) + (c.position.left - c.originalPosition.left) || null,
                k = parseInt(c.element.css("top"), 10) + (c.position.top - c.originalPosition.top) || null;
            c.element.animate(a.extend(i, k && j ? {
                top: k,
                left: j
            } : {}), {
                duration: d.animateDuration,
                easing: d.animateEasing,
                step: function () {
                    var d = {
                        width: parseInt(c.element.css("width"), 10),
                        height: parseInt(c.element.css("height"), 10),
                        top: parseInt(c.element.css("top"), 10),
                        left: parseInt(c.element.css("left"), 10)
                    };
                    e && e.length && a(e[0]).css({
                        width: d.width,
                        height: d.height
                    }), c._updateCache(d), c._propagate("resize", b)
                }
            })
        }
    }), a.ui.plugin.add("resizable", "containment", {
        start: function () {
            var c = a(this).data("resizable"),
                d = c.options,
                e = c.element,
                f = d.containment,
                g = f instanceof a ? f.get(0) : /parent/.test(f) ? e.parent().get(0) : f;
            if (g)
                if (c.containerElement = a(g), /document/.test(f) || f == document) c.containerOffset = {
                    left: 0,
                    top: 0
                }, c.containerPosition = {
                    left: 0,
                    top: 0
                }, c.parentData = {
                    element: a(document),
                    left: 0,
                    top: 0,
                    width: a(document).width(),
                    height: a(document).height() || document.body.parentNode.scrollHeight
                };
                else {
                    var h = a(g),
                        i = [];
                    a(["Top", "Right", "Left", "Bottom"]).each(function (a, c) {
                        i[a] = b(h.css("padding" + c))
                    }), c.containerOffset = h.offset(), c.containerPosition = h.position(), c.containerSize = {
                        height: h.innerHeight() - i[3],
                        width: h.innerWidth() - i[1]
                    };
                    var j = c.containerOffset,
                        k = c.containerSize.height,
                        l = c.containerSize.width,
                        m = a.ui.hasScroll(g, "left") ? g.scrollWidth : l,
                        n = a.ui.hasScroll(g) ? g.scrollHeight : k;
                    c.parentData = {
                        element: g,
                        left: j.left,
                        top: j.top,
                        width: m,
                        height: n
                    }
                }
        },
        resize: function (b) {
            var c = a(this).data("resizable"),
                d = c.options,
                e = (c.containerSize, c.containerOffset),
                f = (c.size, c.position),
                g = c._aspectRatio || b.shiftKey,
                h = {
                    top: 0,
                    left: 0
                },
                i = c.containerElement;
            i[0] != document && /static/.test(i.css("position")) && (h = e), f.left < (c._helper ? e.left : 0) && (c.size.width = c.size.width + (c._helper ? c.position.left - e.left : c.position.left - h.left), g && (c.size.height = c.size.width / c.aspectRatio), c.position.left = d.helper ? e.left : 0), f.top < (c._helper ? e.top : 0) && (c.size.height = c.size.height + (c._helper ? c.position.top - e.top : c.position.top), g && (c.size.width = c.size.height * c.aspectRatio), c.position.top = c._helper ? e.top : 0), c.offset.left = c.parentData.left + c.position.left, c.offset.top = c.parentData.top + c.position.top;
            var j = Math.abs((c._helper ? c.offset.left - h.left : c.offset.left - h.left) + c.sizeDiff.width),
                k = Math.abs((c._helper ? c.offset.top - h.top : c.offset.top - e.top) + c.sizeDiff.height),
                l = c.containerElement.get(0) == c.element.parent().get(0),
                m = /relative|absolute/.test(c.containerElement.css("position"));
            l && m && (j -= c.parentData.left), j + c.size.width >= c.parentData.width && (c.size.width = c.parentData.width - j, g && (c.size.height = c.size.width / c.aspectRatio)), k + c.size.height >= c.parentData.height && (c.size.height = c.parentData.height - k, g && (c.size.width = c.size.height * c.aspectRatio))
        },
        stop: function () {
            var b = a(this).data("resizable"),
                c = b.options,
                d = (b.position, b.containerOffset),
                e = b.containerPosition,
                f = b.containerElement,
                g = a(b.helper),
                h = g.offset(),
                i = g.outerWidth() - b.sizeDiff.width,
                j = g.outerHeight() - b.sizeDiff.height;
            b._helper && !c.animate && /relative/.test(f.css("position")) && a(this).css({
                left: h.left - e.left - d.left,
                width: i,
                height: j
            }), b._helper && !c.animate && /static/.test(f.css("position")) && a(this).css({
                left: h.left - e.left - d.left,
                width: i,
                height: j
            })
        }
    }), a.ui.plugin.add("resizable", "ghost", {
        start: function () {
            var b = a(this).data("resizable"),
                c = b.options,
                d = b.size;
            b.ghost = b.originalElement.clone(), b.ghost.css({
                opacity: .25,
                display: "block",
                position: "relative",
                height: d.height,
                width: d.width,
                margin: 0,
                left: 0,
                top: 0
            }).addClass("ui-resizable-ghost").addClass("string" == typeof c.ghost ? c.ghost : ""), b.ghost.appendTo(b.helper)
        },
        resize: function () {
            {
                var b = a(this).data("resizable");
                b.options
            }
            b.ghost && b.ghost.css({
                position: "relative",
                height: b.size.height,
                width: b.size.width
            })
        },
        stop: function () {
            {
                var b = a(this).data("resizable");
                b.options
            }
            b.ghost && b.helper && b.helper.get(0).removeChild(b.ghost.get(0))
        }
    }), a.ui.plugin.add("resizable", "grid", {
        resize: function (b) {
            {
                var c = a(this).data("resizable"),
                    d = c.options,
                    e = c.size,
                    f = c.originalSize,
                    g = c.originalPosition,
                    h = c.axis;
                d._aspectRatio || b.shiftKey
            }
            d.grid = "number" == typeof d.grid ? [d.grid, d.grid] : d.grid;
            var i = Math.round((e.width - f.width) / (d.grid[0] || 1)) * (d.grid[0] || 1),
                j = Math.round((e.height - f.height) / (d.grid[1] || 1)) * (d.grid[1] || 1);
            /^(se|s|e)$/.test(h) ? (c.size.width = f.width + i, c.size.height = f.height + j) : /^(ne)$/.test(h) ? (c.size.width = f.width + i, c.size.height = f.height + j, c.position.top = g.top - j) : /^(sw)$/.test(h) ? (c.size.width = f.width + i, c.size.height = f.height + j, c.position.left = g.left - i) : (c.size.width = f.width + i, c.size.height = f.height + j, c.position.top = g.top - j, c.position.left = g.left - i)
        }
    });
    var b = function (a) {
            return parseInt(a, 10) || 0
        },
        c = function (a) {
            return !isNaN(parseInt(a, 10))
        }
}(jQuery),
function (a) {
    a.widget("ui.selectable", a.ui.mouse, {
        version: "1.9.1",
        options: {
            appendTo: "body",
            autoRefresh: !0,
            distance: 0,
            filter: "*",
            tolerance: "touch"
        },
        _create: function () {
            var b = this;
            this.element.addClass("ui-selectable"), this.dragged = !1;
            var c;
            this.refresh = function () {
                c = a(b.options.filter, b.element[0]), c.addClass("ui-selectee"), c.each(function () {
                    var b = a(this),
                        c = b.offset();
                    a.data(this, "selectable-item", {
                        element: this,
                        $element: b,
                        left: c.left,
                        top: c.top,
                        right: c.left + b.outerWidth(),
                        bottom: c.top + b.outerHeight(),
                        startselected: !1,
                        selected: b.hasClass("ui-selected"),
                        selecting: b.hasClass("ui-selecting"),
                        unselecting: b.hasClass("ui-unselecting")
                    })
                })
            }, this.refresh(), this.selectees = c.addClass("ui-selectee"), this._mouseInit(), this.helper = a("<div class='ui-selectable-helper'></div>")
        },
        _destroy: function () {
            this.selectees.removeClass("ui-selectee").removeData("selectable-item"), this.element.removeClass("ui-selectable ui-selectable-disabled"), this._mouseDestroy()
        },
        _mouseStart: function (b) {
            var c = this;
            if (this.opos = [b.pageX, b.pageY], !this.options.disabled) {
                var d = this.options;
                this.selectees = a(d.filter, this.element[0]), this._trigger("start", b), a(d.appendTo).append(this.helper), this.helper.css({
                    left: b.clientX,
                    top: b.clientY,
                    width: 0,
                    height: 0
                }), d.autoRefresh && this.refresh(), this.selectees.filter(".ui-selected").each(function () {
                    var d = a.data(this, "selectable-item");
                    d.startselected = !0, b.metaKey || b.ctrlKey || (d.$element.removeClass("ui-selected"), d.selected = !1, d.$element.addClass("ui-unselecting"), d.unselecting = !0, c._trigger("unselecting", b, {
                        unselecting: d.element
                    }))
                }), a(b.target).parents().andSelf().each(function () {
                    var d = a.data(this, "selectable-item");
                    if (d) {
                        var e = !b.metaKey && !b.ctrlKey || !d.$element.hasClass("ui-selected");
                        return d.$element.removeClass(e ? "ui-unselecting" : "ui-selected").addClass(e ? "ui-selecting" : "ui-unselecting"), d.unselecting = !e, d.selecting = e, d.selected = e, e ? c._trigger("selecting", b, {
                            selecting: d.element
                        }) : c._trigger("unselecting", b, {
                            unselecting: d.element
                        }), !1
                    }
                })
            }
        },
        _mouseDrag: function (b) {
            var c = this;
            if (this.dragged = !0, !this.options.disabled) {
                var d = this.options,
                    e = this.opos[0],
                    f = this.opos[1],
                    g = b.pageX,
                    h = b.pageY;
                if (e > g) {
                    var i = g;
                    g = e, e = i
                }
                if (f > h) {
                    var i = h;
                    h = f, f = i
                }
                return this.helper.css({
                    left: e,
                    top: f,
                    width: g - e,
                    height: h - f
                }), this.selectees.each(function () {
                    var i = a.data(this, "selectable-item");
                    if (i && i.element != c.element[0]) {
                        var j = !1;
                        "touch" == d.tolerance ? j = !(i.left > g || i.right < e || i.top > h || i.bottom < f) : "fit" == d.tolerance && (j = i.left > e && i.right < g && i.top > f && i.bottom < h), j ? (i.selected && (i.$element.removeClass("ui-selected"), i.selected = !1), i.unselecting && (i.$element.removeClass("ui-unselecting"), i.unselecting = !1), i.selecting || (i.$element.addClass("ui-selecting"), i.selecting = !0, c._trigger("selecting", b, {
                            selecting: i.element
                        }))) : (i.selecting && ((b.metaKey || b.ctrlKey) && i.startselected ? (i.$element.removeClass("ui-selecting"), i.selecting = !1, i.$element.addClass("ui-selected"), i.selected = !0) : (i.$element.removeClass("ui-selecting"), i.selecting = !1, i.startselected && (i.$element.addClass("ui-unselecting"), i.unselecting = !0), c._trigger("unselecting", b, {
                            unselecting: i.element
                        }))), i.selected && (b.metaKey || b.ctrlKey || i.startselected || (i.$element.removeClass("ui-selected"), i.selected = !1, i.$element.addClass("ui-unselecting"), i.unselecting = !0, c._trigger("unselecting", b, {
                            unselecting: i.element
                        }))))
                    }
                }), !1
            }
        },
        _mouseStop: function (b) {
            var c = this;
            this.dragged = !1;
            this.options;
            return a(".ui-unselecting", this.element[0]).each(function () {
                var d = a.data(this, "selectable-item");
                d.$element.removeClass("ui-unselecting"), d.unselecting = !1, d.startselected = !1, c._trigger("unselected", b, {
                    unselected: d.element
                })
            }), a(".ui-selecting", this.element[0]).each(function () {
                var d = a.data(this, "selectable-item");
                d.$element.removeClass("ui-selecting").addClass("ui-selected"), d.selecting = !1, d.selected = !0, d.startselected = !0, c._trigger("selected", b, {
                    selected: d.element
                })
            }), this._trigger("stop", b), this.helper.remove(), !1
        }
    })
}(jQuery),
function (a) {
    a.widget("ui.sortable", a.ui.mouse, {
        version: "1.9.1",
        widgetEventPrefix: "sort",
        ready: !1,
        options: {
            appendTo: "parent",
            axis: !1,
            connectWith: !1,
            containment: !1,
            cursor: "auto",
            cursorAt: !1,
            dropOnEmpty: !0,
            forcePlaceholderSize: !1,
            forceHelperSize: !1,
            grid: !1,
            handle: !1,
            helper: "original",
            items: "> *",
            opacity: !1,
            placeholder: !1,
            revert: !1,
            scroll: !0,
            scrollSensitivity: 20,
            scrollSpeed: 20,
            scope: "default",
            tolerance: "intersect",
            zIndex: 1e3
        },
        _create: function () {
            var a = this.options;
            this.containerCache = {}, this.element.addClass("ui-sortable"), this.refresh(), this.floating = this.items.length ? "x" === a.axis || /left|right/.test(this.items[0].item.css("float")) || /inline|table-cell/.test(this.items[0].item.css("display")) : !1, this.offset = this.element.offset(), this._mouseInit(), this.ready = !0
        },
        _destroy: function () {
            this.element.removeClass("ui-sortable ui-sortable-disabled"), this._mouseDestroy();
            for (var a = this.items.length - 1; a >= 0; a--) this.items[a].item.removeData(this.widgetName + "-item");
            return this
        },
        _setOption: function (b, c) {
            "disabled" === b ? (this.options[b] = c, this.widget().toggleClass("ui-sortable-disabled", !!c)) : a.Widget.prototype._setOption.apply(this, arguments)
        },
        _mouseCapture: function (b, c) {
            var d = this;
            if (this.reverting) return !1;
            if (this.options.disabled || "static" == this.options.type) return !1;
            this._refreshItems(b); {
                var e = null;
                a(b.target).parents().each(function () {
                    return a.data(this, d.widgetName + "-item") == d ? (e = a(this), !1) : void 0
                })
            }
            if (a.data(b.target, d.widgetName + "-item") == d && (e = a(b.target)), !e) return !1;
            if (this.options.handle && !c) {
                var f = !1;
                if (a(this.options.handle, e).find("*").andSelf().each(function () {
                    this == b.target && (f = !0)
                }), !f) return !1
            }
            return this.currentItem = e, this._removeCurrentsFromItems(), !0
        },
        _mouseStart: function (b, c, d) {
            var e = this.options;
            if (this.currentContainer = this, this.refreshPositions(), this.helper = this._createHelper(b), this._cacheHelperProportions(), this._cacheMargins(), this.scrollParent = this.helper.scrollParent(), this.offset = this.currentItem.offset(), this.offset = {
                top: this.offset.top - this.margins.top,
                left: this.offset.left - this.margins.left
            }, a.extend(this.offset, {
                click: {
                    left: b.pageX - this.offset.left,
                    top: b.pageY - this.offset.top
                },
                parent: this._getParentOffset(),
                relative: this._getRelativeOffset()
            }), this.helper.css("position", "absolute"), this.cssPosition = this.helper.css("position"), this.originalPosition = this._generatePosition(b), this.originalPageX = b.pageX, this.originalPageY = b.pageY, e.cursorAt && this._adjustOffsetFromHelper(e.cursorAt), this.domPosition = {
                prev: this.currentItem.prev()[0],
                parent: this.currentItem.parent()[0]
            }, this.helper[0] != this.currentItem[0] && this.currentItem.hide(), this._createPlaceholder(), e.containment && this._setContainment(), e.cursor && (a("body").css("cursor") && (this._storedCursor = a("body").css("cursor")), a("body").css("cursor", e.cursor)), e.opacity && (this.helper.css("opacity") && (this._storedOpacity = this.helper.css("opacity")), this.helper.css("opacity", e.opacity)), e.zIndex && (this.helper.css("zIndex") && (this._storedZIndex = this.helper.css("zIndex")), this.helper.css("zIndex", e.zIndex)), this.scrollParent[0] != document && "HTML" != this.scrollParent[0].tagName && (this.overflowOffset = this.scrollParent.offset()), this._trigger("start", b, this._uiHash()), this._preserveHelperProportions || this._cacheHelperProportions(), !d)
                for (var f = this.containers.length - 1; f >= 0; f--) this.containers[f]._trigger("activate", b, this._uiHash(this));
            return a.ui.ddmanager && (a.ui.ddmanager.current = this), a.ui.ddmanager && !e.dropBehaviour && a.ui.ddmanager.prepareOffsets(this, b), this.dragging = !0, this.helper.addClass("ui-sortable-helper"), this._mouseDrag(b), !0
        },
        _mouseDrag: function (b) {
            if (this.position = this._generatePosition(b), this.positionAbs = this._convertPositionTo("absolute"), this.lastPositionAbs || (this.lastPositionAbs = this.positionAbs), this.options.scroll) {
                var c = this.options,
                    d = !1;
                this.scrollParent[0] != document && "HTML" != this.scrollParent[0].tagName ? (this.overflowOffset.top + this.scrollParent[0].offsetHeight - b.pageY < c.scrollSensitivity ? this.scrollParent[0].scrollTop = d = this.scrollParent[0].scrollTop + c.scrollSpeed : b.pageY - this.overflowOffset.top < c.scrollSensitivity && (this.scrollParent[0].scrollTop = d = this.scrollParent[0].scrollTop - c.scrollSpeed), this.overflowOffset.left + this.scrollParent[0].offsetWidth - b.pageX < c.scrollSensitivity ? this.scrollParent[0].scrollLeft = d = this.scrollParent[0].scrollLeft + c.scrollSpeed : b.pageX - this.overflowOffset.left < c.scrollSensitivity && (this.scrollParent[0].scrollLeft = d = this.scrollParent[0].scrollLeft - c.scrollSpeed)) : (b.pageY - a(document).scrollTop() < c.scrollSensitivity ? d = a(document).scrollTop(a(document).scrollTop() - c.scrollSpeed) : a(window).height() - (b.pageY - a(document).scrollTop()) < c.scrollSensitivity && (d = a(document).scrollTop(a(document).scrollTop() + c.scrollSpeed)), b.pageX - a(document).scrollLeft() < c.scrollSensitivity ? d = a(document).scrollLeft(a(document).scrollLeft() - c.scrollSpeed) : a(window).width() - (b.pageX - a(document).scrollLeft()) < c.scrollSensitivity && (d = a(document).scrollLeft(a(document).scrollLeft() + c.scrollSpeed))), d !== !1 && a.ui.ddmanager && !c.dropBehaviour && a.ui.ddmanager.prepareOffsets(this, b)
            }
            this.positionAbs = this._convertPositionTo("absolute"), this.options.axis && "y" == this.options.axis || (this.helper[0].style.left = this.position.left + "px"), this.options.axis && "x" == this.options.axis || (this.helper[0].style.top = this.position.top + "px");
            for (var e = this.items.length - 1; e >= 0; e--) {
                var f = this.items[e],
                    g = f.item[0],
                    h = this._intersectsWithPointer(f);
                if (h && f.instance === this.currentContainer && g != this.currentItem[0] && this.placeholder[1 == h ? "next" : "prev"]()[0] != g && !a.contains(this.placeholder[0], g) && ("semi-dynamic" == this.options.type ? !a.contains(this.element[0], g) : !0)) {
                    if (this.direction = 1 == h ? "down" : "up", "pointer" != this.options.tolerance && !this._intersectsWithSides(f)) break;
                    this._rearrange(b, f), this._trigger("change", b, this._uiHash());
                    break
                }
            }
            return this._contactContainers(b), a.ui.ddmanager && a.ui.ddmanager.drag(this, b), this._trigger("sort", b, this._uiHash()), this.lastPositionAbs = this.positionAbs, !1
        },
        _mouseStop: function (b, c) {
            if (b) {
                if (a.ui.ddmanager && !this.options.dropBehaviour && a.ui.ddmanager.drop(this, b), this.options.revert) {
                    var d = this,
                        e = this.placeholder.offset();
                    this.reverting = !0, a(this.helper).animate({
                        left: e.left - this.offset.parent.left - this.margins.left + (this.offsetParent[0] == document.body ? 0 : this.offsetParent[0].scrollLeft),
                        top: e.top - this.offset.parent.top - this.margins.top + (this.offsetParent[0] == document.body ? 0 : this.offsetParent[0].scrollTop)
                    }, parseInt(this.options.revert, 10) || 500, function () {
                        d._clear(b)
                    })
                } else this._clear(b, c);
                return !1
            }
        },
        cancel: function () {
            if (this.dragging) {
                this._mouseUp({
                    target: null
                }), "original" == this.options.helper ? this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper") : this.currentItem.show();
                for (var b = this.containers.length - 1; b >= 0; b--) this.containers[b]._trigger("deactivate", null, this._uiHash(this)), this.containers[b].containerCache.over && (this.containers[b]._trigger("out", null, this._uiHash(this)), this.containers[b].containerCache.over = 0)
            }
            return this.placeholder && (this.placeholder[0].parentNode && this.placeholder[0].parentNode.removeChild(this.placeholder[0]), "original" != this.options.helper && this.helper && this.helper[0].parentNode && this.helper.remove(), a.extend(this, {
                helper: null,
                dragging: !1,
                reverting: !1,
                _noFinalSort: null
            }), this.domPosition.prev ? a(this.domPosition.prev).after(this.currentItem) : a(this.domPosition.parent).prepend(this.currentItem)), this
        },
        serialize: function (b) {
            var c = this._getItemsAsjQuery(b && b.connected),
                d = [];
            return b = b || {}, a(c).each(function () {
                var c = (a(b.item || this).attr(b.attribute || "id") || "").match(b.expression || /(.+)[-=_](.+)/);
                c && d.push((b.key || c[1] + "[]") + "=" + (b.key && b.expression ? c[1] : c[2]))
            }), !d.length && b.key && d.push(b.key + "="), d.join("&")
        },
        toArray: function (b) {
            var c = this._getItemsAsjQuery(b && b.connected),
                d = [];
            return b = b || {}, c.each(function () {
                d.push(a(b.item || this).attr(b.attribute || "id") || "")
            }), d
        },
        _intersectsWith: function (a) {
            var b = this.positionAbs.left,
                c = b + this.helperProportions.width,
                d = this.positionAbs.top,
                e = d + this.helperProportions.height,
                f = a.left,
                g = f + a.width,
                h = a.top,
                i = h + a.height,
                j = this.offset.click.top,
                k = this.offset.click.left,
                l = d + j > h && i > d + j && b + k > f && g > b + k;
            return "pointer" == this.options.tolerance || this.options.forcePointerForContainers || "pointer" != this.options.tolerance && this.helperProportions[this.floating ? "width" : "height"] > a[this.floating ? "width" : "height"] ? l : f < b + this.helperProportions.width / 2 && c - this.helperProportions.width / 2 < g && h < d + this.helperProportions.height / 2 && e - this.helperProportions.height / 2 < i
        },
        _intersectsWithPointer: function (b) {
            var c = "x" === this.options.axis || a.ui.isOverAxis(this.positionAbs.top + this.offset.click.top, b.top, b.height),
                d = "y" === this.options.axis || a.ui.isOverAxis(this.positionAbs.left + this.offset.click.left, b.left, b.width),
                e = c && d,
                f = this._getDragVerticalDirection(),
                g = this._getDragHorizontalDirection();
            return e ? this.floating ? g && "right" == g || "down" == f ? 2 : 1 : f && ("down" == f ? 2 : 1) : !1
        },
        _intersectsWithSides: function (b) {
            var c = a.ui.isOverAxis(this.positionAbs.top + this.offset.click.top, b.top + b.height / 2, b.height),
                d = a.ui.isOverAxis(this.positionAbs.left + this.offset.click.left, b.left + b.width / 2, b.width),
                e = this._getDragVerticalDirection(),
                f = this._getDragHorizontalDirection();
            return this.floating && f ? "right" == f && d || "left" == f && !d : e && ("down" == e && c || "up" == e && !c)
        },
        _getDragVerticalDirection: function () {
            var a = this.positionAbs.top - this.lastPositionAbs.top;
            return 0 != a && (a > 0 ? "down" : "up")
        },
        _getDragHorizontalDirection: function () {
            var a = this.positionAbs.left - this.lastPositionAbs.left;
            return 0 != a && (a > 0 ? "right" : "left")
        },
        refresh: function (a) {
            return this._refreshItems(a), this.refreshPositions(), this
        },
        _connectWith: function () {
            var a = this.options;
            return a.connectWith.constructor == String ? [a.connectWith] : a.connectWith
        },
        _getItemsAsjQuery: function (b) {
            var c = [],
                d = [],
                e = this._connectWith();
            if (e && b)
                for (var f = e.length - 1; f >= 0; f--)
                    for (var g = a(e[f]), h = g.length - 1; h >= 0; h--) {
                        var i = a.data(g[h], this.widgetName);
                        i && i != this && !i.options.disabled && d.push([a.isFunction(i.options.items) ? i.options.items.call(i.element) : a(i.options.items, i.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), i])
                    }
            d.push([a.isFunction(this.options.items) ? this.options.items.call(this.element, null, {
                options: this.options,
                item: this.currentItem
            }) : a(this.options.items, this.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), this]);
            for (var f = d.length - 1; f >= 0; f--) d[f][0].each(function () {
                c.push(this)
            });
            return a(c)
        },
        _removeCurrentsFromItems: function () {
            var b = this.currentItem.find(":data(" + this.widgetName + "-item)");
            this.items = a.grep(this.items, function (a) {
                for (var c = 0; c < b.length; c++)
                    if (b[c] == a.item[0]) return !1;
                return !0
            })
        },
        _refreshItems: function (b) {
            this.items = [], this.containers = [this];
            var c = this.items,
                d = [
                    [a.isFunction(this.options.items) ? this.options.items.call(this.element[0], b, {
                        item: this.currentItem
                    }) : a(this.options.items, this.element), this]
                ],
                e = this._connectWith();
            if (e && this.ready)
                for (var f = e.length - 1; f >= 0; f--)
                    for (var g = a(e[f]), h = g.length - 1; h >= 0; h--) {
                        var i = a.data(g[h], this.widgetName);
                        i && i != this && !i.options.disabled && (d.push([a.isFunction(i.options.items) ? i.options.items.call(i.element[0], b, {
                            item: this.currentItem
                        }) : a(i.options.items, i.element), i]), this.containers.push(i))
                    }
            for (var f = d.length - 1; f >= 0; f--)
                for (var j = d[f][1], k = d[f][0], h = 0, l = k.length; l > h; h++) {
                    var m = a(k[h]);
                    m.data(this.widgetName + "-item", j), c.push({
                        item: m,
                        instance: j,
                        width: 0,
                        height: 0,
                        left: 0,
                        top: 0
                    })
                }
        },
        refreshPositions: function (b) {
            this.offsetParent && this.helper && (this.offset.parent = this._getParentOffset());
            for (var c = this.items.length - 1; c >= 0; c--) {
                var d = this.items[c];
                if (d.instance == this.currentContainer || !this.currentContainer || d.item[0] == this.currentItem[0]) {
                    var e = this.options.toleranceElement ? a(this.options.toleranceElement, d.item) : d.item;
                    b || (d.width = e.outerWidth(), d.height = e.outerHeight());
                    var f = e.offset();
                    d.left = f.left, d.top = f.top
                }
            }
            if (this.options.custom && this.options.custom.refreshContainers) this.options.custom.refreshContainers.call(this);
            else
                for (var c = this.containers.length - 1; c >= 0; c--) {
                    var f = this.containers[c].element.offset();
                    this.containers[c].containerCache.left = f.left, this.containers[c].containerCache.top = f.top, this.containers[c].containerCache.width = this.containers[c].element.outerWidth(), this.containers[c].containerCache.height = this.containers[c].element.outerHeight()
                }
            return this
        },
        _createPlaceholder: function (b) {
            b = b || this;
            var c = b.options;
            if (!c.placeholder || c.placeholder.constructor == String) {
                var d = c.placeholder;
                c.placeholder = {
                    element: function () {
                        var c = a(document.createElement(b.currentItem[0].nodeName)).addClass(d || b.currentItem[0].className + " ui-sortable-placeholder").removeClass("ui-sortable-helper")[0];
                        return d || (c.style.visibility = "hidden"), c
                    },
                    update: function (a, e) {
                        (!d || c.forcePlaceholderSize) && (e.height() || e.height(b.currentItem.innerHeight() - parseInt(b.currentItem.css("paddingTop") || 0, 10) - parseInt(b.currentItem.css("paddingBottom") || 0, 10)), e.width() || e.width(b.currentItem.innerWidth() - parseInt(b.currentItem.css("paddingLeft") || 0, 10) - parseInt(b.currentItem.css("paddingRight") || 0, 10)))
                    }
                }
            }
            b.placeholder = a(c.placeholder.element.call(b.element, b.currentItem)), b.currentItem.after(b.placeholder), c.placeholder.update(b, b.placeholder)
        },
        _contactContainers: function (b) {
            for (var c = null, d = null, e = this.containers.length - 1; e >= 0; e--)
                if (!a.contains(this.currentItem[0], this.containers[e].element[0]))
                    if (this._intersectsWith(this.containers[e].containerCache)) {
                        if (c && a.contains(this.containers[e].element[0], c.element[0])) continue;
                        c = this.containers[e], d = e
                    } else this.containers[e].containerCache.over && (this.containers[e]._trigger("out", b, this._uiHash(this)), this.containers[e].containerCache.over = 0);
            if (c)
                if (1 === this.containers.length) this.containers[d]._trigger("over", b, this._uiHash(this)), this.containers[d].containerCache.over = 1;
                else {
                    for (var f = 1e4, g = null, h = this.containers[d].floating ? "left" : "top", i = this.containers[d].floating ? "width" : "height", j = this.positionAbs[h] + this.offset.click[h], k = this.items.length - 1; k >= 0; k--)
                        if (a.contains(this.containers[d].element[0], this.items[k].item[0]) && this.items[k].item[0] != this.currentItem[0]) {
                            var l = this.items[k].item.offset()[h],
                                m = !1;
                            Math.abs(l - j) > Math.abs(l + this.items[k][i] - j) && (m = !0, l += this.items[k][i]), Math.abs(l - j) < f && (f = Math.abs(l - j), g = this.items[k], this.direction = m ? "up" : "down")
                        }
                    if (!g && !this.options.dropOnEmpty) return;
                    this.currentContainer = this.containers[d], g ? this._rearrange(b, g, null, !0) : this._rearrange(b, null, this.containers[d].element, !0), this._trigger("change", b, this._uiHash()), this.containers[d]._trigger("change", b, this._uiHash(this)), this.options.placeholder.update(this.currentContainer, this.placeholder), this.containers[d]._trigger("over", b, this._uiHash(this)), this.containers[d].containerCache.over = 1
                }
        },
        _createHelper: function (b) {
            var c = this.options,
                d = a.isFunction(c.helper) ? a(c.helper.apply(this.element[0], [b, this.currentItem])) : "clone" == c.helper ? this.currentItem.clone() : this.currentItem;
            return d.parents("body").length || a("parent" != c.appendTo ? c.appendTo : this.currentItem[0].parentNode)[0].appendChild(d[0]), d[0] == this.currentItem[0] && (this._storedCSS = {
                width: this.currentItem[0].style.width,
                height: this.currentItem[0].style.height,
                position: this.currentItem.css("position"),
                top: this.currentItem.css("top"),
                left: this.currentItem.css("left")
            }), ("" == d[0].style.width || c.forceHelperSize) && d.width(this.currentItem.width()), ("" == d[0].style.height || c.forceHelperSize) && d.height(this.currentItem.height()), d
        },
        _adjustOffsetFromHelper: function (b) {
            "string" == typeof b && (b = b.split(" ")), a.isArray(b) && (b = {
                left: +b[0],
                top: +b[1] || 0
            }), "left" in b && (this.offset.click.left = b.left + this.margins.left), "right" in b && (this.offset.click.left = this.helperProportions.width - b.right + this.margins.left), "top" in b && (this.offset.click.top = b.top + this.margins.top), "bottom" in b && (this.offset.click.top = this.helperProportions.height - b.bottom + this.margins.top)
        },
        _getParentOffset: function () {
            this.offsetParent = this.helper.offsetParent();
            var b = this.offsetParent.offset();
            return "absolute" == this.cssPosition && this.scrollParent[0] != document && a.contains(this.scrollParent[0], this.offsetParent[0]) && (b.left += this.scrollParent.scrollLeft(), b.top += this.scrollParent.scrollTop()), (this.offsetParent[0] == document.body || this.offsetParent[0].tagName && "html" == this.offsetParent[0].tagName.toLowerCase() && a.ui.ie) && (b = {
                top: 0,
                left: 0
            }), {
                top: b.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
                left: b.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
            }
        },
        _getRelativeOffset: function () {
            if ("relative" == this.cssPosition) {
                var a = this.currentItem.position();
                return {
                    top: a.top - (parseInt(this.helper.css("top"), 10) || 0) + this.scrollParent.scrollTop(),
                    left: a.left - (parseInt(this.helper.css("left"), 10) || 0) + this.scrollParent.scrollLeft()
                }
            }
            return {
                top: 0,
                left: 0
            }
        },
        _cacheMargins: function () {
            this.margins = {
                left: parseInt(this.currentItem.css("marginLeft"), 10) || 0,
                top: parseInt(this.currentItem.css("marginTop"), 10) || 0
            }
        },
        _cacheHelperProportions: function () {
            this.helperProportions = {
                width: this.helper.outerWidth(),
                height: this.helper.outerHeight()
            }
        },
        _setContainment: function () {
            var b = this.options;
            if ("parent" == b.containment && (b.containment = this.helper[0].parentNode), ("document" == b.containment || "window" == b.containment) && (this.containment = [0 - this.offset.relative.left - this.offset.parent.left, 0 - this.offset.relative.top - this.offset.parent.top, a("document" == b.containment ? document : window).width() - this.helperProportions.width - this.margins.left, (a("document" == b.containment ? document : window).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top]), !/^(document|window|parent)$/.test(b.containment)) {
                var c = a(b.containment)[0],
                    d = a(b.containment).offset(),
                    e = "hidden" != a(c).css("overflow");
                this.containment = [d.left + (parseInt(a(c).css("borderLeftWidth"), 10) || 0) + (parseInt(a(c).css("paddingLeft"), 10) || 0) - this.margins.left, d.top + (parseInt(a(c).css("borderTopWidth"), 10) || 0) + (parseInt(a(c).css("paddingTop"), 10) || 0) - this.margins.top, d.left + (e ? Math.max(c.scrollWidth, c.offsetWidth) : c.offsetWidth) - (parseInt(a(c).css("borderLeftWidth"), 10) || 0) - (parseInt(a(c).css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left, d.top + (e ? Math.max(c.scrollHeight, c.offsetHeight) : c.offsetHeight) - (parseInt(a(c).css("borderTopWidth"), 10) || 0) - (parseInt(a(c).css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top]
            }
        },
        _convertPositionTo: function (b, c) {
            c || (c = this.position);
            var d = "absolute" == b ? 1 : -1,
                e = (this.options, "absolute" != this.cssPosition || this.scrollParent[0] != document && a.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent),
                f = /(html|body)/i.test(e[0].tagName);
            return {
                top: c.top + this.offset.relative.top * d + this.offset.parent.top * d - ("fixed" == this.cssPosition ? -this.scrollParent.scrollTop() : f ? 0 : e.scrollTop()) * d,
                left: c.left + this.offset.relative.left * d + this.offset.parent.left * d - ("fixed" == this.cssPosition ? -this.scrollParent.scrollLeft() : f ? 0 : e.scrollLeft()) * d
            }
        },
        _generatePosition: function (b) {
            var c = this.options,
                d = "absolute" != this.cssPosition || this.scrollParent[0] != document && a.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent,
                e = /(html|body)/i.test(d[0].tagName);
            "relative" != this.cssPosition || this.scrollParent[0] != document && this.scrollParent[0] != this.offsetParent[0] || (this.offset.relative = this._getRelativeOffset());
            var f = b.pageX,
                g = b.pageY;
            if (this.originalPosition && (this.containment && (b.pageX - this.offset.click.left < this.containment[0] && (f = this.containment[0] + this.offset.click.left), b.pageY - this.offset.click.top < this.containment[1] && (g = this.containment[1] + this.offset.click.top), b.pageX - this.offset.click.left > this.containment[2] && (f = this.containment[2] + this.offset.click.left), b.pageY - this.offset.click.top > this.containment[3] && (g = this.containment[3] + this.offset.click.top)), c.grid)) {
                var h = this.originalPageY + Math.round((g - this.originalPageY) / c.grid[1]) * c.grid[1];
                g = this.containment ? h - this.offset.click.top < this.containment[1] || h - this.offset.click.top > this.containment[3] ? h - this.offset.click.top < this.containment[1] ? h + c.grid[1] : h - c.grid[1] : h : h;
                var i = this.originalPageX + Math.round((f - this.originalPageX) / c.grid[0]) * c.grid[0];
                f = this.containment ? i - this.offset.click.left < this.containment[0] || i - this.offset.click.left > this.containment[2] ? i - this.offset.click.left < this.containment[0] ? i + c.grid[0] : i - c.grid[0] : i : i
            }
            return {
                top: g - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + ("fixed" == this.cssPosition ? -this.scrollParent.scrollTop() : e ? 0 : d.scrollTop()),
                left: f - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + ("fixed" == this.cssPosition ? -this.scrollParent.scrollLeft() : e ? 0 : d.scrollLeft())
            }
        },
        _rearrange: function (a, b, c, d) {
            c ? c[0].appendChild(this.placeholder[0]) : b.item[0].parentNode.insertBefore(this.placeholder[0], "down" == this.direction ? b.item[0] : b.item[0].nextSibling), this.counter = this.counter ? ++this.counter : 1;
            var e = this.counter;
            this._delay(function () {
                e == this.counter && this.refreshPositions(!d)
            })
        },
        _clear: function (b, c) {
            this.reverting = !1;
            var d = [];
            if (!this._noFinalSort && this.currentItem.parent().length && this.placeholder.before(this.currentItem), this._noFinalSort = null, this.helper[0] == this.currentItem[0]) {
                for (var e in this._storedCSS)("auto" == this._storedCSS[e] || "static" == this._storedCSS[e]) && (this._storedCSS[e] = "");
                this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper")
            } else this.currentItem.show();
            this.fromOutside && !c && d.push(function (a) {
                this._trigger("receive", a, this._uiHash(this.fromOutside))
            }), !this.fromOutside && this.domPosition.prev == this.currentItem.prev().not(".ui-sortable-helper")[0] && this.domPosition.parent == this.currentItem.parent()[0] || c || d.push(function (a) {
                this._trigger("update", a, this._uiHash())
            }), this !== this.currentContainer && (c || (d.push(function (a) {
                this._trigger("remove", a, this._uiHash())
            }), d.push(function (a) {
                return function (b) {
                    a._trigger("receive", b, this._uiHash(this))
                }
            }.call(this, this.currentContainer)), d.push(function (a) {
                return function (b) {
                    a._trigger("update", b, this._uiHash(this))
                }
            }.call(this, this.currentContainer))));
            for (var e = this.containers.length - 1; e >= 0; e--) c || d.push(function (a) {
                return function (b) {
                    a._trigger("deactivate", b, this._uiHash(this))
                }
            }.call(this, this.containers[e])), this.containers[e].containerCache.over && (d.push(function (a) {
                return function (b) {
                    a._trigger("out", b, this._uiHash(this))
                }
            }.call(this, this.containers[e])), this.containers[e].containerCache.over = 0);
            if (this._storedCursor && a("body").css("cursor", this._storedCursor), this._storedOpacity && this.helper.css("opacity", this._storedOpacity), this._storedZIndex && this.helper.css("zIndex", "auto" == this._storedZIndex ? "" : this._storedZIndex), this.dragging = !1, this.cancelHelperRemoval) {
                if (!c) {
                    this._trigger("beforeStop", b, this._uiHash());
                    for (var e = 0; e < d.length; e++) d[e].call(this, b);
                    this._trigger("stop", b, this._uiHash())
                }
                return this.fromOutside = !1, !1
            }
            if (c || this._trigger("beforeStop", b, this._uiHash()), this.placeholder[0].parentNode.removeChild(this.placeholder[0]), this.helper[0] != this.currentItem[0] && this.helper.remove(), this.helper = null, !c) {
                for (var e = 0; e < d.length; e++) d[e].call(this, b);
                this._trigger("stop", b, this._uiHash())
            }
            return this.fromOutside = !1, !0
        },
        _trigger: function () {
            a.Widget.prototype._trigger.apply(this, arguments) === !1 && this.cancel()
        },
        _uiHash: function (b) {
            var c = b || this;
            return {
                helper: c.helper,
                placeholder: c.placeholder || a([]),
                position: c.position,
                originalPosition: c.originalPosition,
                offset: c.positionAbs,
                item: c.currentItem,
                sender: b ? b.element : null
            }
        }
    })
}(jQuery), jQuery.effects || function (a, b) {
    var c = a.uiBackCompat !== !1,
        d = "ui-effects-";
    a.effects = {
        effect: {}
    },
    /*!
     * jQuery Color Animations v2.0.0
     * http://jquery.com/
     *
     * Copyright 2012 jQuery Foundation and other contributors
     * Released under the MIT license.
     * http://jquery.org/license
     *
     * Date: Mon Aug 13 13:41:02 2012 -0500
     */
    function (b, c) {
        function d(a, b, c) {
            var d = m[b.type] || {};
            return null == a ? c || !b.def ? null : b.def : (a = d.floor ? ~~a : parseFloat(a), isNaN(a) ? b.def : d.mod ? (a + d.mod) % d.mod : 0 > a ? 0 : d.max < a ? d.max : a)
        }

        function e(a) {
            var c = k(),
                d = c._rgba = [];
            return a = a.toLowerCase(), p(j, function (b, e) {
                var f, g = e.re.exec(a),
                    h = g && e.parse(g),
                    i = e.space || "rgba";
                return h ? (f = c[i](h), c[l[i].cache] = f[l[i].cache], d = c._rgba = f._rgba, !1) : void 0
            }), d.length ? ("0,0,0,0" === d.join() && b.extend(d, g.transparent), c) : g[a]
        }

        function f(a, b, c) {
            return c = (c + 1) % 1, 1 > 6 * c ? a + (b - a) * c * 6 : 1 > 2 * c ? b : 2 > 3 * c ? a + (b - a) * (2 / 3 - c) * 6 : a
        }
        var g, h = "backgroundColor borderBottomColor borderLeftColor borderRightColor borderTopColor color columnRuleColor outlineColor textDecorationColor textEmphasisColor".split(" "),
            i = /^([\-+])=\s*(\d+\.?\d*)/,
            j = [{
                re: /rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d+(?:\.\d+)?)\s*)?\)/,
                parse: function (a) {
                    return [a[1], a[2], a[3], a[4]]
                }
            }, {
                re: /rgba?\(\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d+(?:\.\d+)?)\s*)?\)/,
                parse: function (a) {
                    return [2.55 * a[1], 2.55 * a[2], 2.55 * a[3], a[4]]
                }
            }, {
                re: /#([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})/,
                parse: function (a) {
                    return [parseInt(a[1], 16), parseInt(a[2], 16), parseInt(a[3], 16)]
                }
            }, {
                re: /#([a-f0-9])([a-f0-9])([a-f0-9])/,
                parse: function (a) {
                    return [parseInt(a[1] + a[1], 16), parseInt(a[2] + a[2], 16), parseInt(a[3] + a[3], 16)]
                }
            }, {
                re: /hsla?\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d+(?:\.\d+)?)\s*)?\)/,
                space: "hsla",
                parse: function (a) {
                    return [a[1], a[2] / 100, a[3] / 100, a[4]]
                }
            }],
            k = b.Color = function (a, c, d, e) {
                return new b.Color.fn.parse(a, c, d, e)
            },
            l = {
                rgba: {
                    props: {
                        red: {
                            idx: 0,
                            type: "byte"
                        },
                        green: {
                            idx: 1,
                            type: "byte"
                        },
                        blue: {
                            idx: 2,
                            type: "byte"
                        }
                    }
                },
                hsla: {
                    props: {
                        hue: {
                            idx: 0,
                            type: "degrees"
                        },
                        saturation: {
                            idx: 1,
                            type: "percent"
                        },
                        lightness: {
                            idx: 2,
                            type: "percent"
                        }
                    }
                }
            },
            m = {
                "byte": {
                    floor: !0,
                    max: 255
                },
                percent: {
                    max: 1
                },
                degrees: {
                    mod: 360,
                    floor: !0
                }
            },
            n = k.support = {},
            o = b("<p>")[0],
            p = b.each;
        o.style.cssText = "background-color:rgba(1,1,1,.5)", n.rgba = o.style.backgroundColor.indexOf("rgba") > -1, p(l, function (a, b) {
            b.cache = "_" + a, b.props.alpha = {
                idx: 3,
                type: "percent",
                def: 1
            }
        }), k.fn = b.extend(k.prototype, {
            parse: function (f, h, i, j) {
                if (f === c) return this._rgba = [null, null, null, null], this;
                (f.jquery || f.nodeType) && (f = b(f).css(h), h = c);
                var m = this,
                    n = b.type(f),
                    o = this._rgba = [];
                return h !== c && (f = [f, h, i, j], n = "array"), "string" === n ? this.parse(e(f) || g._default) : "array" === n ? (p(l.rgba.props, function (a, b) {
                    o[b.idx] = d(f[b.idx], b)
                }), this) : "object" === n ? (f instanceof k ? p(l, function (a, b) {
                    f[b.cache] && (m[b.cache] = f[b.cache].slice())
                }) : p(l, function (b, c) {
                    var e = c.cache;
                    p(c.props, function (a, b) {
                        if (!m[e] && c.to) {
                            if ("alpha" === a || null == f[a]) return;
                            m[e] = c.to(m._rgba)
                        }
                        m[e][b.idx] = d(f[a], b, !0)
                    }), m[e] && a.inArray(null, m[e].slice(0, 3)) < 0 && (m[e][3] = 1, c.from && (m._rgba = c.from(m[e])))
                }), this) : void 0
            },
            is: function (a) {
                var b = k(a),
                    c = !0,
                    d = this;
                return p(l, function (a, e) {
                    var f, g = b[e.cache];
                    return g && (f = d[e.cache] || e.to && e.to(d._rgba) || [], p(e.props, function (a, b) {
                        return null != g[b.idx] ? c = g[b.idx] === f[b.idx] : void 0
                    })), c
                }), c
            },
            _space: function () {
                var a = [],
                    b = this;
                return p(l, function (c, d) {
                    b[d.cache] && a.push(c)
                }), a.pop()
            },
            transition: function (a, b) {
                var c = k(a),
                    e = c._space(),
                    f = l[e],
                    g = 0 === this.alpha() ? k("transparent") : this,
                    h = g[f.cache] || f.to(g._rgba),
                    i = h.slice();
                return c = c[f.cache], p(f.props, function (a, e) {
                    var f = e.idx,
                        g = h[f],
                        j = c[f],
                        k = m[e.type] || {};
                    null !== j && (null === g ? i[f] = j : (k.mod && (j - g > k.mod / 2 ? g += k.mod : g - j > k.mod / 2 && (g -= k.mod)), i[f] = d((j - g) * b + g, e)))
                }), this[e](i)
            },
            blend: function (a) {
                if (1 === this._rgba[3]) return this;
                var c = this._rgba.slice(),
                    d = c.pop(),
                    e = k(a)._rgba;
                return k(b.map(c, function (a, b) {
                    return (1 - d) * e[b] + d * a
                }))
            },
            toRgbaString: function () {
                var a = "rgba(",
                    c = b.map(this._rgba, function (a, b) {
                        return null == a ? b > 2 ? 1 : 0 : a
                    });
                return 1 === c[3] && (c.pop(), a = "rgb("), a + c.join() + ")"
            },
            toHslaString: function () {
                var a = "hsla(",
                    c = b.map(this.hsla(), function (a, b) {
                        return null == a && (a = b > 2 ? 1 : 0), b && 3 > b && (a = Math.round(100 * a) + "%"), a
                    });
                return 1 === c[3] && (c.pop(), a = "hsl("), a + c.join() + ")"
            },
            toHexString: function (a) {
                var c = this._rgba.slice(),
                    d = c.pop();
                return a && c.push(~~(255 * d)), "#" + b.map(c, function (a) {
                    return a = (a || 0).toString(16), 1 === a.length ? "0" + a : a
                }).join("")
            },
            toString: function () {
                return 0 === this._rgba[3] ? "transparent" : this.toRgbaString()
            }
        }), k.fn.parse.prototype = k.fn, l.hsla.to = function (a) {
            if (null == a[0] || null == a[1] || null == a[2]) return [null, null, null, a[3]];
            var b, c, d = a[0] / 255,
                e = a[1] / 255,
                f = a[2] / 255,
                g = a[3],
                h = Math.max(d, e, f),
                i = Math.min(d, e, f),
                j = h - i,
                k = h + i,
                l = .5 * k;
            return b = i === h ? 0 : d === h ? 60 * (e - f) / j + 360 : e === h ? 60 * (f - d) / j + 120 : 60 * (d - e) / j + 240, c = 0 === l || 1 === l ? l : .5 >= l ? j / k : j / (2 - k), [Math.round(b) % 360, c, l, null == g ? 1 : g]
        }, l.hsla.from = function (a) {
            if (null == a[0] || null == a[1] || null == a[2]) return [null, null, null, a[3]];
            var b = a[0] / 360,
                c = a[1],
                d = a[2],
                e = a[3],
                g = .5 >= d ? d * (1 + c) : d + c - d * c,
                h = 2 * d - g;
            return [Math.round(255 * f(h, g, b + 1 / 3)), Math.round(255 * f(h, g, b)), Math.round(255 * f(h, g, b - 1 / 3)), e]
        }, p(l, function (a, e) {
            var f = e.props,
                g = e.cache,
                h = e.to,
                j = e.from;
            k.fn[a] = function (a) {
                if (h && !this[g] && (this[g] = h(this._rgba)), a === c) return this[g].slice();
                var e, i = b.type(a),
                    l = "array" === i || "object" === i ? a : arguments,
                    m = this[g].slice();
                return p(f, function (a, b) {
                    var c = l["object" === i ? a : b.idx];
                    null == c && (c = m[b.idx]), m[b.idx] = d(c, b)
                }), j ? (e = k(j(m)), e[g] = m, e) : k(m)
            }, p(f, function (c, d) {
                k.fn[c] || (k.fn[c] = function (e) {
                    var f, g = b.type(e),
                        h = "alpha" === c ? this._hsla ? "hsla" : "rgba" : a,
                        j = this[h](),
                        k = j[d.idx];
                    return "undefined" === g ? k : ("function" === g && (e = e.call(this, k), g = b.type(e)), null == e && d.empty ? this : ("string" === g && (f = i.exec(e), f && (e = k + parseFloat(f[2]) * ("+" === f[1] ? 1 : -1))), j[d.idx] = e, this[h](j)))
                })
            })
        }), p(h, function (a, c) {
            b.cssHooks[c] = {
                set: function (a, d) {
                    var f, g, h = "";
                    if ("string" !== b.type(d) || (f = e(d))) {
                        if (d = k(f || d), !n.rgba && 1 !== d._rgba[3]) {
                            for (g = "backgroundColor" === c ? a.parentNode : a;
                                ("" === h || "transparent" === h) && g && g.style;) try {
                                h = b.css(g, "backgroundColor"), g = g.parentNode
                            } catch (i) {}
                            d = d.blend(h && "transparent" !== h ? h : "_default")
                        }
                        d = d.toRgbaString()
                    }
                    try {
                        a.style[c] = d
                    } catch (j) {}
                }
            }, b.fx.step[c] = function (a) {
                a.colorInit || (a.start = k(a.elem, c), a.end = k(a.end), a.colorInit = !0), b.cssHooks[c].set(a.elem, a.start.transition(a.end, a.pos))
            }
        }), b.cssHooks.borderColor = {
            expand: function (a) {
                var b = {};
                return p(["Top", "Right", "Bottom", "Left"], function (c, d) {
                    b["border" + d + "Color"] = a
                }), b
            }
        }, g = b.Color.names = {
            aqua: "#00ffff",
            black: "#000000",
            blue: "#0000ff",
            fuchsia: "#ff00ff",
            gray: "#808080",
            green: "#008000",
            lime: "#00ff00",
            maroon: "#800000",
            navy: "#000080",
            olive: "#808000",
            purple: "#800080",
            red: "#ff0000",
            silver: "#c0c0c0",
            teal: "#008080",
            white: "#ffffff",
            yellow: "#ffff00",
            transparent: [null, null, null, 0],
            _default: "#ffffff"
        }
    }(jQuery),
    function () {
        function c() {
            var b, c, d = this.ownerDocument.defaultView ? this.ownerDocument.defaultView.getComputedStyle(this, null) : this.currentStyle,
                e = {};
            if (d && d.length && d[0] && d[d[0]])
                for (c = d.length; c--;) b = d[c], "string" == typeof d[b] && (e[a.camelCase(b)] = d[b]);
            else
                for (b in d) "string" == typeof d[b] && (e[b] = d[b]);
            return e
        }

        function d(b, c) {
            var d, e, g = {};
            for (d in c) e = c[d], b[d] !== e && (f[d] || (a.fx.step[d] || !isNaN(parseFloat(e))) && (g[d] = e));
            return g
        }
        var e = ["add", "remove", "toggle"],
            f = {
                border: 1,
                borderBottom: 1,
                borderColor: 1,
                borderLeft: 1,
                borderRight: 1,
                borderTop: 1,
                borderWidth: 1,
                margin: 1,
                padding: 1
            };
        a.each(["borderLeftStyle", "borderRightStyle", "borderBottomStyle", "borderTopStyle"], function (b, c) {
            a.fx.step[c] = function (a) {
                ("none" !== a.end && !a.setAttr || 1 === a.pos && !a.setAttr) && (jQuery.style(a.elem, c, a.end), a.setAttr = !0)
            }
        }), a.effects.animateClass = function (b, f, g, h) {
            var i = a.speed(f, g, h);
            return this.queue(function () {
                var f, g = a(this),
                    h = g.attr("class") || "",
                    j = i.children ? g.find("*").andSelf() : g;
                j = j.map(function () {
                    var b = a(this);
                    return {
                        el: b,
                        start: c.call(this)
                    }
                }), f = function () {
                    a.each(e, function (a, c) {
                        b[c] && g[c + "Class"](b[c])
                    })
                }, f(), j = j.map(function () {
                    return this.end = c.call(this.el[0]), this.diff = d(this.start, this.end), this
                }), g.attr("class", h), j = j.map(function () {
                    var b = this,
                        c = a.Deferred(),
                        d = jQuery.extend({}, i, {
                            queue: !1,
                            complete: function () {
                                c.resolve(b)
                            }
                        });
                    return this.el.animate(this.diff, d), c.promise()
                }), a.when.apply(a, j.get()).done(function () {
                    f(), a.each(arguments, function () {
                        var b = this.el;
                        a.each(this.diff, function (a) {
                            b.css(a, "")
                        })
                    }), i.complete.call(g[0])
                })
            })
        }, a.fn.extend({
            _addClass: a.fn.addClass,
            addClass: function (b, c, d, e) {
                return c ? a.effects.animateClass.call(this, {
                    add: b
                }, c, d, e) : this._addClass(b)
            },
            _removeClass: a.fn.removeClass,
            removeClass: function (b, c, d, e) {
                return c ? a.effects.animateClass.call(this, {
                    remove: b
                }, c, d, e) : this._removeClass(b)
            },
            _toggleClass: a.fn.toggleClass,
            toggleClass: function (c, d, e, f, g) {
                return "boolean" == typeof d || d === b ? e ? a.effects.animateClass.call(this, d ? {
                    add: c
                } : {
                    remove: c
                }, e, f, g) : this._toggleClass(c, d) : a.effects.animateClass.call(this, {
                    toggle: c
                }, d, e, f)
            },
            switchClass: function (b, c, d, e, f) {
                return a.effects.animateClass.call(this, {
                    add: c,
                    remove: b
                }, d, e, f)
            }
        })
    }(),
    function () {
        function e(b, c, d, e) {
            return a.isPlainObject(b) && (c = b, b = b.effect), b = {
                effect: b
            }, null == c && (c = {}), a.isFunction(c) && (e = c, d = null, c = {}), ("number" == typeof c || a.fx.speeds[c]) && (e = d, d = c, c = {}), a.isFunction(d) && (e = d, d = null), c && a.extend(b, c), d = d || c.duration, b.duration = a.fx.off ? 0 : "number" == typeof d ? d : d in a.fx.speeds ? a.fx.speeds[d] : a.fx.speeds._default, b.complete = e || c.complete, b
        }

        function f(b) {
            return !b || "number" == typeof b || a.fx.speeds[b] ? !0 : "string" != typeof b || a.effects.effect[b] ? !1 : c && a.effects[b] ? !1 : !0
        }
        a.extend(a.effects, {
            version: "1.9.1",
            save: function (a, b) {
                for (var c = 0; c < b.length; c++) null !== b[c] && a.data(d + b[c], a[0].style[b[c]])
            },
            restore: function (a, c) {
                var e, f;
                for (f = 0; f < c.length; f++) null !== c[f] && (e = a.data(d + c[f]), e === b && (e = ""), a.css(c[f], e))
            },
            setMode: function (a, b) {
                return "toggle" === b && (b = a.is(":hidden") ? "show" : "hide"), b
            },
            getBaseline: function (a, b) {
                var c, d;
                switch (a[0]) {
                case "top":
                    c = 0;
                    break;
                case "middle":
                    c = .5;
                    break;
                case "bottom":
                    c = 1;
                    break;
                default:
                    c = a[0] / b.height
                }
                switch (a[1]) {
                case "left":
                    d = 0;
                    break;
                case "center":
                    d = .5;
                    break;
                case "right":
                    d = 1;
                    break;
                default:
                    d = a[1] / b.width
                }
                return {
                    x: d,
                    y: c
                }
            },
            createWrapper: function (b) {
                if (b.parent().is(".ui-effects-wrapper")) return b.parent();
                var c = {
                        width: b.outerWidth(!0),
                        height: b.outerHeight(!0),
                        "float": b.css("float")
                    },
                    d = a("<div></div>").addClass("ui-effects-wrapper").css({
                        fontSize: "100%",
                        background: "transparent",
                        border: "none",
                        margin: 0,
                        padding: 0
                    }),
                    e = {
                        width: b.width(),
                        height: b.height()
                    },
                    f = document.activeElement;
                try {
                    f.id
                } catch (g) {
                    f = document.body
                }
                return b.wrap(d), (b[0] === f || a.contains(b[0], f)) && a(f).focus(), d = b.parent(), "static" === b.css("position") ? (d.css({
                    position: "relative"
                }), b.css({
                    position: "relative"
                })) : (a.extend(c, {
                    position: b.css("position"),
                    zIndex: b.css("z-index")
                }), a.each(["top", "left", "bottom", "right"], function (a, d) {
                    c[d] = b.css(d), isNaN(parseInt(c[d], 10)) && (c[d] = "auto")
                }), b.css({
                    position: "relative",
                    top: 0,
                    left: 0,
                    right: "auto",
                    bottom: "auto"
                })), b.css(e), d.css(c).show()
            },
            removeWrapper: function (b) {
                var c = document.activeElement;
                return b.parent().is(".ui-effects-wrapper") && (b.parent().replaceWith(b), (b[0] === c || a.contains(b[0], c)) && a(c).focus()), b
            },
            setTransition: function (b, c, d, e) {
                return e = e || {}, a.each(c, function (a, c) {
                    var f = b.cssUnit(c);
                    f[0] > 0 && (e[c] = f[0] * d + f[1])
                }), e
            }
        }), a.fn.extend({
            effect: function () {
                function b(b) {
                    function c() {
                        a.isFunction(f) && f.call(e[0]), a.isFunction(b) && b()
                    }
                    var e = a(this),
                        f = d.complete,
                        g = d.mode;
                    (e.is(":hidden") ? "hide" === g : "show" === g) ? c() : h.call(e[0], d, c)
                }
                var d = e.apply(this, arguments),
                    f = d.mode,
                    g = d.queue,
                    h = a.effects.effect[d.effect],
                    i = !h && c && a.effects[d.effect];
                return a.fx.off || !h && !i ? f ? this[f](d.duration, d.complete) : this.each(function () {
                    d.complete && d.complete.call(this)
                }) : h ? g === !1 ? this.each(b) : this.queue(g || "fx", b) : i.call(this, {
                    options: d,
                    duration: d.duration,
                    callback: d.complete,
                    mode: d.mode
                })
            },
            _show: a.fn.show,
            show: function (a) {
                if (f(a)) return this._show.apply(this, arguments);
                var b = e.apply(this, arguments);
                return b.mode = "show", this.effect.call(this, b)
            },
            _hide: a.fn.hide,
            hide: function (a) {
                if (f(a)) return this._hide.apply(this, arguments);
                var b = e.apply(this, arguments);
                return b.mode = "hide", this.effect.call(this, b)
            },
            __toggle: a.fn.toggle,
            toggle: function (b) {
                if (f(b) || "boolean" == typeof b || a.isFunction(b)) return this.__toggle.apply(this, arguments);
                var c = e.apply(this, arguments);
                return c.mode = "toggle", this.effect.call(this, c)
            },
            cssUnit: function (b) {
                var c = this.css(b),
                    d = [];
                return a.each(["em", "px", "%", "pt"], function (a, b) {
                    c.indexOf(b) > 0 && (d = [parseFloat(c), b])
                }), d
            }
        })
    }(),
    function () {
        var b = {};
        a.each(["Quad", "Cubic", "Quart", "Quint", "Expo"], function (a, c) {
            b[c] = function (b) {
                return Math.pow(b, a + 2)
            }
        }), a.extend(b, {
            Sine: function (a) {
                return 1 - Math.cos(a * Math.PI / 2)
            },
            Circ: function (a) {
                return 1 - Math.sqrt(1 - a * a)
            },
            Elastic: function (a) {
                return 0 === a || 1 === a ? a : -Math.pow(2, 8 * (a - 1)) * Math.sin((80 * (a - 1) - 7.5) * Math.PI / 15)
            },
            Back: function (a) {
                return a * a * (3 * a - 2)
            },
            Bounce: function (a) {
                for (var b, c = 4; a < ((b = Math.pow(2, --c)) - 1) / 11;);
                return 1 / Math.pow(4, 3 - c) - 7.5625 * Math.pow((3 * b - 2) / 22 - a, 2)
            }
        }), a.each(b, function (b, c) {
            a.easing["easeIn" + b] = c, a.easing["easeOut" + b] = function (a) {
                return 1 - c(1 - a)
            }, a.easing["easeInOut" + b] = function (a) {
                return .5 > a ? c(2 * a) / 2 : 1 - c(-2 * a + 2) / 2
            }
        })
    }()
}(jQuery),
function (a) {
    var b = 0,
        c = {},
        d = {};
    c.height = c.paddingTop = c.paddingBottom = c.borderTopWidth = c.borderBottomWidth = "hide", d.height = d.paddingTop = d.paddingBottom = d.borderTopWidth = d.borderBottomWidth = "show", a.widget("ui.accordion", {
        version: "1.9.1",
        options: {
            active: 0,
            animate: {},
            collapsible: !1,
            event: "click",
            header: "> li > :first-child,> :not(li):even",
            heightStyle: "auto",
            icons: {
                activeHeader: "ui-icon-triangle-1-s",
                header: "ui-icon-triangle-1-e"
            },
            activate: null,
            beforeActivate: null
        },
        _create: function () {
            var c = this.accordionId = "ui-accordion-" + (this.element.attr("id") || ++b),
                d = this.options;
            this.prevShow = this.prevHide = a(), this.element.addClass("ui-accordion ui-widget ui-helper-reset"), this.headers = this.element.find(d.header).addClass("ui-accordion-header ui-helper-reset ui-state-default ui-corner-all"), this._hoverable(this.headers), this._focusable(this.headers), this.headers.next().addClass("ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom").hide(), d.collapsible || d.active !== !1 && null != d.active || (d.active = 0), d.active < 0 && (d.active += this.headers.length), this.active = this._findActive(d.active).addClass("ui-accordion-header-active ui-state-active").toggleClass("ui-corner-all ui-corner-top"), this.active.next().addClass("ui-accordion-content-active").show(), this._createIcons(), this.refresh(), this.element.attr("role", "tablist"), this.headers.attr("role", "tab").each(function (b) {
                var d = a(this),
                    e = d.attr("id"),
                    f = d.next(),
                    g = f.attr("id");
                e || (e = c + "-header-" + b, d.attr("id", e)), g || (g = c + "-panel-" + b, f.attr("id", g)), d.attr("aria-controls", g), f.attr("aria-labelledby", e)
            }).next().attr("role", "tabpanel"), this.headers.not(this.active).attr({
                "aria-selected": "false",
                tabIndex: -1
            }).next().attr({
                "aria-expanded": "false",
                "aria-hidden": "true"
            }).hide(), this.active.length ? this.active.attr({
                "aria-selected": "true",
                tabIndex: 0
            }).next().attr({
                "aria-expanded": "true",
                "aria-hidden": "false"
            }) : this.headers.eq(0).attr("tabIndex", 0), this._on(this.headers, {
                keydown: "_keydown"
            }), this._on(this.headers.next(), {
                keydown: "_panelKeyDown"
            }), this._setupEvents(d.event)
        },
        _getCreateEventData: function () {
            return {
                header: this.active,
                content: this.active.length ? this.active.next() : a()
            }
        },
        _createIcons: function () {
            var b = this.options.icons;
            b && (a("<span>").addClass("ui-accordion-header-icon ui-icon " + b.header).prependTo(this.headers), this.active.children(".ui-accordion-header-icon").removeClass(b.header).addClass(b.activeHeader), this.headers.addClass("ui-accordion-icons"))
        },
        _destroyIcons: function () {
            this.headers.removeClass("ui-accordion-icons").children(".ui-accordion-header-icon").remove()
        },
        _destroy: function () {
            var a;
            this.element.removeClass("ui-accordion ui-widget ui-helper-reset").removeAttr("role"), this.headers.removeClass("ui-accordion-header ui-accordion-header-active ui-helper-reset ui-state-default ui-corner-all ui-state-active ui-state-disabled ui-corner-top").removeAttr("role").removeAttr("aria-selected").removeAttr("aria-controls").removeAttr("tabIndex").each(function () {
                /^ui-accordion/.test(this.id) && this.removeAttribute("id")
            }), this._destroyIcons(), a = this.headers.next().css("display", "").removeAttr("role").removeAttr("aria-expanded").removeAttr("aria-hidden").removeAttr("aria-labelledby").removeClass("ui-helper-reset ui-widget-content ui-corner-bottom ui-accordion-content ui-accordion-content-active ui-state-disabled").each(function () {
                /^ui-accordion/.test(this.id) && this.removeAttribute("id")
            }), "content" !== this.options.heightStyle && a.css("height", "")
        },
        _setOption: function (a, b) {
            return "active" === a ? void this._activate(b) : ("event" === a && (this.options.event && this._off(this.headers, this.options.event), this._setupEvents(b)), this._super(a, b), "collapsible" !== a || b || this.options.active !== !1 || this._activate(0), "icons" === a && (this._destroyIcons(), b && this._createIcons()), void("disabled" === a && this.headers.add(this.headers.next()).toggleClass("ui-state-disabled", !!b)))
        },
        _keydown: function (b) {
            if (!b.altKey && !b.ctrlKey) {
                var c = a.ui.keyCode,
                    d = this.headers.length,
                    e = this.headers.index(b.target),
                    f = !1;
                switch (b.keyCode) {
                case c.RIGHT:
                case c.DOWN:
                    f = this.headers[(e + 1) % d];
                    break;
                case c.LEFT:
                case c.UP:
                    f = this.headers[(e - 1 + d) % d];
                    break;
                case c.SPACE:
                case c.ENTER:
                    this._eventHandler(b);
                    break;
                case c.HOME:
                    f = this.headers[0];
                    break;
                case c.END:
                    f = this.headers[d - 1]
                }
                f && (a(b.target).attr("tabIndex", -1), a(f).attr("tabIndex", 0), f.focus(), b.preventDefault())
            }
        },
        _panelKeyDown: function (b) {
            b.keyCode === a.ui.keyCode.UP && b.ctrlKey && a(b.currentTarget).prev().focus()
        },
        refresh: function () {
            var b, c, d = this.options.heightStyle,
                e = this.element.parent();
            "fill" === d ? (a.support.minHeight || (c = e.css("overflow"), e.css("overflow", "hidden")), b = e.height(), this.element.siblings(":visible").each(function () {
                var c = a(this),
                    d = c.css("position");
                "absolute" !== d && "fixed" !== d && (b -= c.outerHeight(!0))
            }), c && e.css("overflow", c), this.headers.each(function () {
                b -= a(this).outerHeight(!0)
            }), this.headers.next().each(function () {
                a(this).height(Math.max(0, b - a(this).innerHeight() + a(this).height()))
            }).css("overflow", "auto")) : "auto" === d && (b = 0, this.headers.next().each(function () {
                b = Math.max(b, a(this).height("").height())
            }).height(b))
        },
        _activate: function (b) {
            var c = this._findActive(b)[0];
            c !== this.active[0] && (c = c || this.active[0], this._eventHandler({
                target: c,
                currentTarget: c,
                preventDefault: a.noop
            }))
        },
        _findActive: function (b) {
            return "number" == typeof b ? this.headers.eq(b) : a()
        },
        _setupEvents: function (b) {
            var c = {};
            b && (a.each(b.split(" "), function (a, b) {
                c[b] = "_eventHandler"
            }), this._on(this.headers, c))
        },
        _eventHandler: function (b) {
            var c = this.options,
                d = this.active,
                e = a(b.currentTarget),
                f = e[0] === d[0],
                g = f && c.collapsible,
                h = g ? a() : e.next(),
                i = d.next(),
                j = {
                    oldHeader: d,
                    oldPanel: i,
                    newHeader: g ? a() : e,
                    newPanel: h
                };
            b.preventDefault(), f && !c.collapsible || this._trigger("beforeActivate", b, j) === !1 || (c.active = g ? !1 : this.headers.index(e), this.active = f ? a() : e, this._toggle(j), d.removeClass("ui-accordion-header-active ui-state-active"), c.icons && d.children(".ui-accordion-header-icon").removeClass(c.icons.activeHeader).addClass(c.icons.header), f || (e.removeClass("ui-corner-all").addClass("ui-accordion-header-active ui-state-active ui-corner-top"), c.icons && e.children(".ui-accordion-header-icon").removeClass(c.icons.header).addClass(c.icons.activeHeader), e.next().addClass("ui-accordion-content-active")))
        },
        _toggle: function (b) {
            var c = b.newPanel,
                d = this.prevShow.length ? this.prevShow : b.oldPanel;
            this.prevShow.add(this.prevHide).stop(!0, !0), this.prevShow = c, this.prevHide = d, this.options.animate ? this._animate(c, d, b) : (d.hide(), c.show(), this._toggleComplete(b)), d.attr({
                "aria-expanded": "false",
                "aria-hidden": "true"
            }), d.prev().attr("aria-selected", "false"), c.length && d.length ? d.prev().attr("tabIndex", -1) : c.length && this.headers.filter(function () {
                return 0 === a(this).attr("tabIndex")
            }).attr("tabIndex", -1), c.attr({
                "aria-expanded": "true",
                "aria-hidden": "false"
            }).prev().attr({
                "aria-selected": "true",
                tabIndex: 0
            })
        },
        _animate: function (a, b, e) {
            var f, g, h, i = this,
                j = 0,
                k = a.length && (!b.length || a.index() < b.index()),
                l = this.options.animate || {},
                m = k && l.down || l,
                n = function () {
                    i._toggleComplete(e)
                };
            return "number" == typeof m && (h = m), "string" == typeof m && (g = m), g = g || m.easing || l.easing, h = h || m.duration || l.duration, b.length ? a.length ? (f = a.show().outerHeight(), b.animate(c, {
                duration: h,
                easing: g,
                step: function (a, b) {
                    b.now = Math.round(a)
                }
            }), void a.hide().animate(d, {
                duration: h,
                easing: g,
                complete: n,
                step: function (a, c) {
                    c.now = Math.round(a), "height" !== c.prop ? j += c.now : "content" !== i.options.heightStyle && (c.now = Math.round(f - b.outerHeight() - j), j = 0)
                }
            })) : b.animate(c, h, g, n) : a.animate(d, h, g, n)
        },
        _toggleComplete: function (a) {
            var b = a.oldPanel;
            b.removeClass("ui-accordion-content-active").prev().removeClass("ui-corner-top").addClass("ui-corner-all"), b.length && (b.parent()[0].className = b.parent()[0].className), this._trigger("activate", null, a)
        }
    }), a.uiBackCompat !== !1 && (! function (a, b) {
        a.extend(b.options, {
            navigation: !1,
            navigationFilter: function () {
                return this.href.toLowerCase() === location.href.toLowerCase()
            }
        });
        var c = b._create;
        b._create = function () {
            if (this.options.navigation) {
                var b = this,
                    d = this.element.find(this.options.header),
                    e = d.next(),
                    f = d.add(e).find("a").filter(this.options.navigationFilter)[0];
                f && d.add(e).each(function (c) {
                    return a.contains(this, f) ? (b.options.active = Math.floor(c / 2), !1) : void 0
                })
            }
            c.call(this)
        }
    }(jQuery, jQuery.ui.accordion.prototype), function (a, b) {
        a.extend(b.options, {
            heightStyle: null,
            autoHeight: !0,
            clearStyle: !1,
            fillSpace: !1
        });
        var c = b._create,
            d = b._setOption;
        a.extend(b, {
            _create: function () {
                this.options.heightStyle = this.options.heightStyle || this._mergeHeightStyle(), c.call(this)
            },
            _setOption: function (a) {
                ("autoHeight" === a || "clearStyle" === a || "fillSpace" === a) && (this.options.heightStyle = this._mergeHeightStyle()), d.apply(this, arguments)
            },
            _mergeHeightStyle: function () {
                var a = this.options;
                return a.fillSpace ? "fill" : a.clearStyle ? "content" : a.autoHeight ? "auto" : void 0
            }
        })
    }(jQuery, jQuery.ui.accordion.prototype), function (a, b) {
        a.extend(b.options.icons, {
            activeHeader: null,
            headerSelected: "ui-icon-triangle-1-s"
        });
        var c = b._createIcons;
        b._createIcons = function () {
            this.options.icons && (this.options.icons.activeHeader = this.options.icons.activeHeader || this.options.icons.headerSelected), c.call(this)
        }
    }(jQuery, jQuery.ui.accordion.prototype), function (a, b) {
        b.activate = b._activate;
        var c = b._findActive;
        b._findActive = function (a) {
            return -1 === a && (a = !1), a && "number" != typeof a && (a = this.headers.index(this.headers.filter(a)), -1 === a && (a = !1)), c.call(this, a)
        }
    }(jQuery, jQuery.ui.accordion.prototype), jQuery.ui.accordion.prototype.resize = jQuery.ui.accordion.prototype.refresh, function (a, b) {
        a.extend(b.options, {
            change: null,
            changestart: null
        });
        var c = b._trigger;
        b._trigger = function (a, b, d) {
            var e = c.apply(this, arguments);
            return e ? ("beforeActivate" === a ? e = c.call(this, "changestart", b, {
                oldHeader: d.oldHeader,
                oldContent: d.oldPanel,
                newHeader: d.newHeader,
                newContent: d.newPanel
            }) : "activate" === a && (e = c.call(this, "change", b, {
                oldHeader: d.oldHeader,
                oldContent: d.oldPanel,
                newHeader: d.newHeader,
                newContent: d.newPanel
            })), e) : !1
        }
    }(jQuery, jQuery.ui.accordion.prototype), function (a, b) {
        a.extend(b.options, {
            animate: null,
            animated: "slide"
        });
        var c = b._create;
        b._create = function () {
            var a = this.options;
            null === a.animate && (a.animate = a.animated ? "slide" === a.animated ? 300 : "bounceslide" === a.animated ? {
                duration: 200,
                down: {
                    easing: "easeOutBounce",
                    duration: 1e3
                }
            } : a.animated : !1), c.call(this)
        }
    }(jQuery, jQuery.ui.accordion.prototype))
}(jQuery),
function (a) {
    var b = 0;
    a.widget("ui.autocomplete", {
        version: "1.9.1",
        defaultElement: "<input>",
        options: {
            appendTo: "body",
            autoFocus: !1,
            delay: 300,
            minLength: 1,
            position: {
                my: "left top",
                at: "left bottom",
                collision: "none"
            },
            source: null,
            change: null,
            close: null,
            focus: null,
            open: null,
            response: null,
            search: null,
            select: null
        },
        pending: 0,
        _create: function () {
            var b, c, d;
            this.isMultiLine = this._isMultiLine(), this.valueMethod = this.element[this.element.is("input,textarea") ? "val" : "text"], this.isNewMenu = !0, this.element.addClass("ui-autocomplete-input").attr("autocomplete", "off"), this._on(this.element, {
                keydown: function (e) {
                    if (this.element.prop("readOnly")) return b = !0, d = !0, void(c = !0);
                    b = !1, d = !1, c = !1;
                    var f = a.ui.keyCode;
                    switch (e.keyCode) {
                    case f.PAGE_UP:
                        b = !0, this._move("previousPage", e);
                        break;
                    case f.PAGE_DOWN:
                        b = !0, this._move("nextPage", e);
                        break;
                    case f.UP:
                        b = !0, this._keyEvent("previous", e);
                        break;
                    case f.DOWN:
                        b = !0, this._keyEvent("next", e);
                        break;
                    case f.ENTER:
                    case f.NUMPAD_ENTER:
                        this.menu.active && (b = !0, e.preventDefault(), this.menu.select(e));
                        break;
                    case f.TAB:
                        this.menu.active && this.menu.select(e);
                        break;
                    case f.ESCAPE:
                        this.menu.element.is(":visible") && (this._value(this.term), this.close(e), e.preventDefault());
                        break;
                    default:
                        c = !0, this._searchTimeout(e)
                    }
                },
                keypress: function (d) {
                    if (b) return b = !1, void d.preventDefault();
                    if (!c) {
                        var e = a.ui.keyCode;
                        switch (d.keyCode) {
                        case e.PAGE_UP:
                            this._move("previousPage", d);
                            break;
                        case e.PAGE_DOWN:
                            this._move("nextPage", d);
                            break;
                        case e.UP:
                            this._keyEvent("previous", d);
                            break;
                        case e.DOWN:
                            this._keyEvent("next", d)
                        }
                    }
                },
                input: function (a) {
                    return d ? (d = !1, void a.preventDefault()) : void this._searchTimeout(a)
                },
                focus: function () {
                    this.selectedItem = null, this.previous = this._value()
                },
                blur: function (a) {
                    return this.cancelBlur ? void delete this.cancelBlur : (clearTimeout(this.searching), this.close(a), void this._change(a))
                }
            }), this._initSource(), this.menu = a("<ul>").addClass("ui-autocomplete").appendTo(this.document.find(this.options.appendTo || "body")[0]).menu({
                input: a(),
                role: null
            }).zIndex(this.element.zIndex() + 1).hide().data("menu"), this._on(this.menu.element, {
                mousedown: function (b) {
                    b.preventDefault(), this.cancelBlur = !0, this._delay(function () {
                        delete this.cancelBlur
                    });
                    var c = this.menu.element[0];
                    a(b.target).closest(".ui-menu-item").length || this._delay(function () {
                        var b = this;
                        this.document.one("mousedown", function (d) {
                            d.target === b.element[0] || d.target === c || a.contains(c, d.target) || b.close()
                        })
                    })
                },
                menufocus: function (b, c) {
                    if (this.isNewMenu && (this.isNewMenu = !1, b.originalEvent && /^mouse/.test(b.originalEvent.type))) return this.menu.blur(), void this.document.one("mousemove", function () {
                        a(b.target).trigger(b.originalEvent)
                    });
                    var d = c.item.data("ui-autocomplete-item") || c.item.data("item.autocomplete");
                    !1 !== this._trigger("focus", b, {
                        item: d
                    }) ? b.originalEvent && /^key/.test(b.originalEvent.type) && this._value(d.value) : this.liveRegion.text(d.value)
                },
                menuselect: function (a, b) {
                    var c = b.item.data("ui-autocomplete-item") || b.item.data("item.autocomplete"),
                        d = this.previous;
                    this.element[0] !== this.document[0].activeElement && (this.element.focus(), this.previous = d, this._delay(function () {
                        this.previous = d, this.selectedItem = c
                    })), !1 !== this._trigger("select", a, {
                        item: c
                    }) && this._value(c.value), this.term = this._value(), this.close(a), this.selectedItem = c
                }
            }), this.liveRegion = a("<span>", {
                role: "status",
                "aria-live": "polite"
            }).addClass("ui-helper-hidden-accessible").insertAfter(this.element), a.fn.bgiframe && this.menu.element.bgiframe(), this._on(this.window, {
                beforeunload: function () {
                    this.element.removeAttr("autocomplete")
                }
            })
        },
        _destroy: function () {
            clearTimeout(this.searching), this.element.removeClass("ui-autocomplete-input").removeAttr("autocomplete"), this.menu.element.remove(), this.liveRegion.remove()
        },
        _setOption: function (a, b) {
            this._super(a, b), "source" === a && this._initSource(), "appendTo" === a && this.menu.element.appendTo(this.document.find(b || "body")[0]), "disabled" === a && b && this.xhr && this.xhr.abort()
        },
        _isMultiLine: function () {
            return this.element.is("textarea") ? !0 : this.element.is("input") ? !1 : this.element.prop("isContentEditable")
        },
        _initSource: function () {
            var b, c, d = this;
            a.isArray(this.options.source) ? (b = this.options.source, this.source = function (c, d) {
                d(a.ui.autocomplete.filter(b, c.term))
            }) : "string" == typeof this.options.source ? (c = this.options.source, this.source = function (b, e) {
                d.xhr && d.xhr.abort(), d.xhr = a.ajax({
                    url: c,
                    data: b,
                    dataType: "json",
                    success: function (a) {
                        e(a)
                    },
                    error: function () {
                        e([])
                    }
                })
            }) : this.source = this.options.source
        },
        _searchTimeout: function (a) {
            clearTimeout(this.searching), this.searching = this._delay(function () {
                this.term !== this._value() && (this.selectedItem = null, this.search(null, a))
            }, this.options.delay)
        },
        search: function (a, b) {
            return a = null != a ? a : this._value(), this.term = this._value(), a.length < this.options.minLength ? this.close(b) : this._trigger("search", b) !== !1 ? this._search(a) : void 0
        },
        _search: function (a) {
            this.pending++, this.element.addClass("ui-autocomplete-loading"), this.cancelSearch = !1, this.source({
                term: a
            }, this._response())
        },
        _response: function () {
            var a = this,
                c = ++b;
            return function (d) {
                c === b && a.__response(d), a.pending--, a.pending || a.element.removeClass("ui-autocomplete-loading")
            }
        },
        __response: function (a) {
            a && (a = this._normalize(a)), this._trigger("response", null, {
                content: a
            }), !this.options.disabled && a && a.length && !this.cancelSearch ? (this._suggest(a), this._trigger("open")) : this._close()
        },
        close: function (a) {
            this.cancelSearch = !0, this._close(a)
        },
        _close: function (a) {
            this.menu.element.is(":visible") && (this.menu.element.hide(), this.menu.blur(), this.isNewMenu = !0, this._trigger("close", a))
        },
        _change: function (a) {
            this.previous !== this._value() && this._trigger("change", a, {
                item: this.selectedItem
            })
        },
        _normalize: function (b) {
            return b.length && b[0].label && b[0].value ? b : a.map(b, function (b) {
                return "string" == typeof b ? {
                    label: b,
                    value: b
                } : a.extend({
                    label: b.label || b.value,
                    value: b.value || b.label
                }, b)
            })
        },
        _suggest: function (b) {
            var c = this.menu.element.empty().zIndex(this.element.zIndex() + 1);
            this._renderMenu(c, b), this.menu.refresh(), c.show(), this._resizeMenu(), c.position(a.extend({
                of: this.element
            }, this.options.position)), this.options.autoFocus && this.menu.next()
        },
        _resizeMenu: function () {
            var a = this.menu.element;
            a.outerWidth(Math.max(a.width("").outerWidth() + 1, this.element.outerWidth()))
        },
        _renderMenu: function (b, c) {
            var d = this;
            a.each(c, function (a, c) {
                d._renderItemData(b, c)
            })
        },
        _renderItemData: function (a, b) {
            return this._renderItem(a, b).data("ui-autocomplete-item", b)
        },
        _renderItem: function (b, c) {
            return a("<li>").append(a("<a>").text(c.label)).appendTo(b)
        },
        _move: function (a, b) {
            return this.menu.element.is(":visible") ? this.menu.isFirstItem() && /^previous/.test(a) || this.menu.isLastItem() && /^next/.test(a) ? (this._value(this.term), void this.menu.blur()) : void this.menu[a](b) : void this.search(null, b)
        },
        widget: function () {
            return this.menu.element
        },
        _value: function () {
            return this.valueMethod.apply(this.element, arguments)
        },
        _keyEvent: function (a, b) {
            (!this.isMultiLine || this.menu.element.is(":visible")) && (this._move(a, b), b.preventDefault())
        }
    }), a.extend(a.ui.autocomplete, {
        escapeRegex: function (a) {
            return a.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&")
        },
        filter: function (b, c) {
            var d = new RegExp(a.ui.autocomplete.escapeRegex(c), "i");
            return a.grep(b, function (a) {
                return d.test(a.label || a.value || a)
            })
        }
    }), a.widget("ui.autocomplete", a.ui.autocomplete, {
        options: {
            messages: {
                noResults: "No search results.",
                results: function (a) {
                    return a + (a > 1 ? " results are" : " result is") + " available, use up and down arrow keys to navigate."
                }
            }
        },
        __response: function (a) {
            var b;
            this._superApply(arguments), this.options.disabled || this.cancelSearch || (b = a && a.length ? this.options.messages.results(a.length) : this.options.messages.noResults, this.liveRegion.text(b))
        }
    })
}(jQuery),
function (a) {
    var b, c, d, e, f = "ui-button ui-widget ui-state-default ui-corner-all",
        g = "ui-state-hover ui-state-active ",
        h = "ui-button-icons-only ui-button-icon-only ui-button-text-icons ui-button-text-icon-primary ui-button-text-icon-secondary ui-button-text-only",
        i = function () {
            var b = a(this).find(":ui-button");
            setTimeout(function () {
                b.button("refresh")
            }, 1)
        },
        j = function (b) {
            var c = b.name,
                d = b.form,
                e = a([]);
            return c && (e = d ? a(d).find("[name='" + c + "']") : a("[name='" + c + "']", b.ownerDocument).filter(function () {
                return !this.form
            })), e
        };
    a.widget("ui.button", {
        version: "1.9.1",
        defaultElement: "<button>",
        options: {
            disabled: null,
            text: !0,
            label: null,
            icons: {
                primary: null,
                secondary: null
            }
        },
        _create: function () {
            this.element.closest("form").unbind("reset" + this.eventNamespace).bind("reset" + this.eventNamespace, i), "boolean" != typeof this.options.disabled ? this.options.disabled = !!this.element.prop("disabled") : this.element.prop("disabled", this.options.disabled), this._determineButtonType(), this.hasTitle = !!this.buttonElement.attr("title");
            var g = this,
                h = this.options,
                k = "checkbox" === this.type || "radio" === this.type,
                l = "ui-state-hover" + (k ? "" : " ui-state-active"),
                m = "ui-state-focus";
            null === h.label && (h.label = "input" === this.type ? this.buttonElement.val() : this.buttonElement.html()), this.buttonElement.addClass(f).attr("role", "button").bind("mouseenter" + this.eventNamespace, function () {
                h.disabled || (a(this).addClass("ui-state-hover"), this === b && a(this).addClass("ui-state-active"))
            }).bind("mouseleave" + this.eventNamespace, function () {
                h.disabled || a(this).removeClass(l)
            }).bind("click" + this.eventNamespace, function (a) {
                h.disabled && (a.preventDefault(), a.stopImmediatePropagation())
            }), this.element.bind("focus" + this.eventNamespace, function () {
                g.buttonElement.addClass(m)
            }).bind("blur" + this.eventNamespace, function () {
                g.buttonElement.removeClass(m)
            }), k && (this.element.bind("change" + this.eventNamespace, function () {
                e || g.refresh()
            }), this.buttonElement.bind("mousedown" + this.eventNamespace, function (a) {
                h.disabled || (e = !1, c = a.pageX, d = a.pageY)
            }).bind("mouseup" + this.eventNamespace, function (a) {
                h.disabled || (c !== a.pageX || d !== a.pageY) && (e = !0)
            })), "checkbox" === this.type ? this.buttonElement.bind("click" + this.eventNamespace, function () {
                return h.disabled || e ? !1 : (a(this).toggleClass("ui-state-active"), void g.buttonElement.attr("aria-pressed", g.element[0].checked))
            }) : "radio" === this.type ? this.buttonElement.bind("click" + this.eventNamespace, function () {
                if (h.disabled || e) return !1;
                a(this).addClass("ui-state-active"), g.buttonElement.attr("aria-pressed", "true");
                var b = g.element[0];
                j(b).not(b).map(function () {
                    return a(this).button("widget")[0]
                }).removeClass("ui-state-active").attr("aria-pressed", "false")
            }) : (this.buttonElement.bind("mousedown" + this.eventNamespace, function () {
                return h.disabled ? !1 : (a(this).addClass("ui-state-active"), b = this, void g.document.one("mouseup", function () {
                    b = null
                }))
            }).bind("mouseup" + this.eventNamespace, function () {
                return h.disabled ? !1 : void a(this).removeClass("ui-state-active")
            }).bind("keydown" + this.eventNamespace, function (b) {
                return h.disabled ? !1 : void((b.keyCode === a.ui.keyCode.SPACE || b.keyCode === a.ui.keyCode.ENTER) && a(this).addClass("ui-state-active"))
            }).bind("keyup" + this.eventNamespace, function () {
                a(this).removeClass("ui-state-active")
            }), this.buttonElement.is("a") && this.buttonElement.keyup(function (b) {
                b.keyCode === a.ui.keyCode.SPACE && a(this).click()
            })), this._setOption("disabled", h.disabled), this._resetButton()
        },
        _determineButtonType: function () {
            var a, b, c;
            this.type = this.element.is("[type=checkbox]") ? "checkbox" : this.element.is("[type=radio]") ? "radio" : this.element.is("input") ? "input" : "button", "checkbox" === this.type || "radio" === this.type ? (a = this.element.parents().last(), b = "label[for='" + this.element.attr("id") + "']", this.buttonElement = a.find(b), this.buttonElement.length || (a = a.length ? a.siblings() : this.element.siblings(), this.buttonElement = a.filter(b), this.buttonElement.length || (this.buttonElement = a.find(b))), this.element.addClass("ui-helper-hidden-accessible"), c = this.element.is(":checked"), c && this.buttonElement.addClass("ui-state-active"), this.buttonElement.prop("aria-pressed", c)) : this.buttonElement = this.element
        },
        widget: function () {
            return this.buttonElement
        },
        _destroy: function () {
            this.element.removeClass("ui-helper-hidden-accessible"), this.buttonElement.removeClass(f + " " + g + " " + h).removeAttr("role").removeAttr("aria-pressed").html(this.buttonElement.find(".ui-button-text").html()), this.hasTitle || this.buttonElement.removeAttr("title")
        },
        _setOption: function (a, b) {
            return this._super(a, b), "disabled" === a ? void(b ? this.element.prop("disabled", !0) : this.element.prop("disabled", !1)) : void this._resetButton()
        },
        refresh: function () {
            var b = this.element.is(":disabled") || this.element.hasClass("ui-button-disabled");
            b !== this.options.disabled && this._setOption("disabled", b), "radio" === this.type ? j(this.element[0]).each(function () {
                a(this).is(":checked") ? a(this).button("widget").addClass("ui-state-active").attr("aria-pressed", "true") : a(this).button("widget").removeClass("ui-state-active").attr("aria-pressed", "false")
            }) : "checkbox" === this.type && (this.element.is(":checked") ? this.buttonElement.addClass("ui-state-active").attr("aria-pressed", "true") : this.buttonElement.removeClass("ui-state-active").attr("aria-pressed", "false"))
        },
        _resetButton: function () {
            if ("input" === this.type) return void(this.options.label && this.element.val(this.options.label));
            var b = this.buttonElement.removeClass(h),
                c = a("<span></span>", this.document[0]).addClass("ui-button-text").html(this.options.label).appendTo(b.empty()).text(),
                d = this.options.icons,
                e = d.primary && d.secondary,
                f = [];
            d.primary || d.secondary ? (this.options.text && f.push("ui-button-text-icon" + (e ? "s" : d.primary ? "-primary" : "-secondary")), d.primary && b.prepend("<span class='ui-button-icon-primary ui-icon " + d.primary + "'></span>"), d.secondary && b.append("<span class='ui-button-icon-secondary ui-icon " + d.secondary + "'></span>"), this.options.text || (f.push(e ? "ui-button-icons-only" : "ui-button-icon-only"), this.hasTitle || b.attr("title", a.trim(c)))) : f.push("ui-button-text-only"), b.addClass(f.join(" "))
        }
    }), a.widget("ui.buttonset", {
        version: "1.9.1",
        options: {
            items: "button, input[type=button], input[type=submit], input[type=reset], input[type=checkbox], input[type=radio], a, :data(button)"
        },
        _create: function () {
            this.element.addClass("ui-buttonset")
        },
        _init: function () {
            this.refresh()
        },
        _setOption: function (a, b) {
            "disabled" === a && this.buttons.button("option", a, b), this._super(a, b)
        },
        refresh: function () {
            var b = "rtl" === this.element.css("direction");
            this.buttons = this.element.find(this.options.items).filter(":ui-button").button("refresh").end().not(":ui-button").button().end().map(function () {
                return a(this).button("widget")[0]
            }).removeClass("ui-corner-all ui-corner-left ui-corner-right").filter(":first").addClass(b ? "ui-corner-right" : "ui-corner-left").end().filter(":last").addClass(b ? "ui-corner-left" : "ui-corner-right").end().end()
        },
        _destroy: function () {
            this.element.removeClass("ui-buttonset"), this.buttons.map(function () {
                return a(this).button("widget")[0]
            }).removeClass("ui-corner-left ui-corner-right").end().button("destroy")
        }
    })
}(jQuery),
function ($, undefined) {
    function Datepicker() {
        this.debug = !1, this._curInst = null, this._keyEvent = !1, this._disabledInputs = [], this._datepickerShowing = !1, this._inDialog = !1, this._mainDivId = "ui-datepicker-div", this._inlineClass = "ui-datepicker-inline", this._appendClass = "ui-datepicker-append", this._triggerClass = "ui-datepicker-trigger", this._dialogClass = "ui-datepicker-dialog", this._disableClass = "ui-datepicker-disabled", this._unselectableClass = "ui-datepicker-unselectable", this._currentClass = "ui-datepicker-current-day", this._dayOverClass = "ui-datepicker-days-cell-over", this.regional = [], this.regional[""] = {
            closeText: "Done",
            prevText: "Prev",
            nextText: "Next",
            currentText: "Today",
            monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
            dayNamesMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
            weekHeader: "Wk",
            dateFormat: "mm/dd/yy",
            firstDay: 0,
            isRTL: !1,
            showMonthAfterYear: !1,
            yearSuffix: ""
        }, this._defaults = {
            showOn: "focus",
            showAnim: "fadeIn",
            showOptions: {},
            defaultDate: null,
            appendText: "",
            buttonText: "...",
            buttonImage: "",
            buttonImageOnly: !1,
            hideIfNoPrevNext: !1,
            navigationAsDateFormat: !1,
            gotoCurrent: !1,
            changeMonth: !1,
            changeYear: !1,
            yearRange: "c-10:c+10",
            showOtherMonths: !1,
            selectOtherMonths: !1,
            showWeek: !1,
            calculateWeek: this.iso8601Week,
            shortYearCutoff: "+10",
            minDate: null,
            maxDate: null,
            duration: "fast",
            beforeShowDay: null,
            beforeShow: null,
            onSelect: null,
            onChangeMonthYear: null,
            onClose: null,
            numberOfMonths: 1,
            showCurrentAtPos: 0,
            stepMonths: 1,
            stepBigMonths: 12,
            altField: "",
            altFormat: "",
            constrainInput: !0,
            showButtonPanel: !1,
            autoSize: !1,
            disabled: !1
        }, $.extend(this._defaults, this.regional[""]), this.dpDiv = bindHover($('<div id="' + this._mainDivId + '" class="ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all"></div>'))
    }

    function bindHover(a) {
        var b = "button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a";
        return a.delegate(b, "mouseout", function () {
            $(this).removeClass("ui-state-hover"), -1 != this.className.indexOf("ui-datepicker-prev") && $(this).removeClass("ui-datepicker-prev-hover"), -1 != this.className.indexOf("ui-datepicker-next") && $(this).removeClass("ui-datepicker-next-hover")
        }).delegate(b, "mouseover", function () {
            $.datepicker._isDisabledDatepicker(instActive.inline ? a.parent()[0] : instActive.input[0]) || ($(this).parents(".ui-datepicker-calendar").find("a").removeClass("ui-state-hover"), $(this).addClass("ui-state-hover"), -1 != this.className.indexOf("ui-datepicker-prev") && $(this).addClass("ui-datepicker-prev-hover"), -1 != this.className.indexOf("ui-datepicker-next") && $(this).addClass("ui-datepicker-next-hover"))
        })
    }

    function extendRemove(a, b) {
        $.extend(a, b);
        for (var c in b)(null == b[c] || b[c] == undefined) && (a[c] = b[c]);
        return a
    }
    $.extend($.ui, {
        datepicker: {
            version: "1.9.1"
        }
    });
    var PROP_NAME = "datepicker",
        dpuuid = (new Date).getTime(),
        instActive;
    $.extend(Datepicker.prototype, {
        markerClassName: "hasDatepicker",
        maxRows: 4,
        log: function () {
            this.debug && console.log.apply("", arguments)
        },
        _widgetDatepicker: function () {
            return this.dpDiv
        },
        setDefaults: function (a) {
            return extendRemove(this._defaults, a || {}), this
        },
        _attachDatepicker: function (target, settings) {
            var inlineSettings = null;
            for (var attrName in this._defaults) {
                var attrValue = target.getAttribute("date:" + attrName);
                if (attrValue) {
                    inlineSettings = inlineSettings || {};
                    try {
                        inlineSettings[attrName] = eval(attrValue)
                    } catch (err) {
                        inlineSettings[attrName] = attrValue
                    }
                }
            }
            var nodeName = target.nodeName.toLowerCase(),
                inline = "div" == nodeName || "span" == nodeName;
            target.id || (this.uuid += 1, target.id = "dp" + this.uuid);
            var inst = this._newInst($(target), inline);
            inst.settings = $.extend({}, settings || {}, inlineSettings || {}), "input" == nodeName ? this._connectDatepicker(target, inst) : inline && this._inlineDatepicker(target, inst)
        },
        _newInst: function (a, b) {
            var c = a[0].id.replace(/([^A-Za-z0-9_-])/g, "\\\\$1");
            return {
                id: c,
                input: a,
                selectedDay: 0,
                selectedMonth: 0,
                selectedYear: 0,
                drawMonth: 0,
                drawYear: 0,
                inline: b,
                dpDiv: b ? bindHover($('<div class="' + this._inlineClass + ' ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all"></div>')) : this.dpDiv
            }
        },
        _connectDatepicker: function (a, b) {
            var c = $(a);
            b.append = $([]), b.trigger = $([]), c.hasClass(this.markerClassName) || (this._attachments(c, b), c.addClass(this.markerClassName).keydown(this._doKeyDown).keypress(this._doKeyPress).keyup(this._doKeyUp).bind("setData.datepicker", function (a, c, d) {
                b.settings[c] = d
            }).bind("getData.datepicker", function (a, c) {
                return this._get(b, c)
            }), this._autoSize(b), $.data(a, PROP_NAME, b), b.settings.disabled && this._disableDatepicker(a))
        },
        _attachments: function (a, b) {
            var c = this._get(b, "appendText"),
                d = this._get(b, "isRTL");
            b.append && b.append.remove(), c && (b.append = $('<span class="' + this._appendClass + '">' + c + "</span>"), a[d ? "before" : "after"](b.append)), a.unbind("focus", this._showDatepicker), b.trigger && b.trigger.remove();
            var e = this._get(b, "showOn");
            if (("focus" == e || "both" == e) && a.focus(this._showDatepicker), "button" == e || "both" == e) {
                var f = this._get(b, "buttonText"),
                    g = this._get(b, "buttonImage");
                b.trigger = $(this._get(b, "buttonImageOnly") ? $("<img/>").addClass(this._triggerClass).attr({
                    src: g,
                    alt: f,
                    title: f
                }) : $('<button type="button"></button>').addClass(this._triggerClass).html("" == g ? f : $("<img/>").attr({
                    src: g,
                    alt: f,
                    title: f
                }))), a[d ? "before" : "after"](b.trigger), b.trigger.click(function () {
                    return $.datepicker._datepickerShowing && $.datepicker._lastInput == a[0] ? $.datepicker._hideDatepicker() : $.datepicker._datepickerShowing && $.datepicker._lastInput != a[0] ? ($.datepicker._hideDatepicker(), $.datepicker._showDatepicker(a[0])) : $.datepicker._showDatepicker(a[0]), !1
                })
            }
        },
        _autoSize: function (a) {
            if (this._get(a, "autoSize") && !a.inline) {
                var b = new Date(2009, 11, 20),
                    c = this._get(a, "dateFormat");
                if (c.match(/[DM]/)) {
                    var d = function (a) {
                        for (var b = 0, c = 0, d = 0; d < a.length; d++) a[d].length > b && (b = a[d].length, c = d);
                        return c
                    };
                    b.setMonth(d(this._get(a, c.match(/MM/) ? "monthNames" : "monthNamesShort"))), b.setDate(d(this._get(a, c.match(/DD/) ? "dayNames" : "dayNamesShort")) + 20 - b.getDay())
                }
                a.input.attr("size", this._formatDate(a, b).length)
            }
        },
        _inlineDatepicker: function (a, b) {
            var c = $(a);
            c.hasClass(this.markerClassName) || (c.addClass(this.markerClassName).append(b.dpDiv).bind("setData.datepicker", function (a, c, d) {
                b.settings[c] = d
            }).bind("getData.datepicker", function (a, c) {
                return this._get(b, c)
            }), $.data(a, PROP_NAME, b), this._setDate(b, this._getDefaultDate(b), !0), this._updateDatepicker(b), this._updateAlternate(b), b.settings.disabled && this._disableDatepicker(a), b.dpDiv.css("display", "block"))
        },
        _dialogDatepicker: function (a, b, c, d, e) {
            var f = this._dialogInst;
            if (!f) {
                this.uuid += 1;
                var g = "dp" + this.uuid;
                this._dialogInput = $('<input type="text" id="' + g + '" style="position: absolute; top: -100px; width: 0px;"/>'), this._dialogInput.keydown(this._doKeyDown), $("body").append(this._dialogInput), f = this._dialogInst = this._newInst(this._dialogInput, !1), f.settings = {}, $.data(this._dialogInput[0], PROP_NAME, f)
            }
            if (extendRemove(f.settings, d || {}), b = b && b.constructor == Date ? this._formatDate(f, b) : b, this._dialogInput.val(b), this._pos = e ? e.length ? e : [e.pageX, e.pageY] : null, !this._pos) {
                var h = document.documentElement.clientWidth,
                    i = document.documentElement.clientHeight,
                    j = document.documentElement.scrollLeft || document.body.scrollLeft,
                    k = document.documentElement.scrollTop || document.body.scrollTop;
                this._pos = [h / 2 - 100 + j, i / 2 - 150 + k]
            }
            return this._dialogInput.css("left", this._pos[0] + 20 + "px").css("top", this._pos[1] + "px"), f.settings.onSelect = c, this._inDialog = !0, this.dpDiv.addClass(this._dialogClass), this._showDatepicker(this._dialogInput[0]), $.blockUI && $.blockUI(this.dpDiv), $.data(this._dialogInput[0], PROP_NAME, f), this
        },
        _destroyDatepicker: function (a) {
            var b = $(a),
                c = $.data(a, PROP_NAME);
            if (b.hasClass(this.markerClassName)) {
                var d = a.nodeName.toLowerCase();
                $.removeData(a, PROP_NAME), "input" == d ? (c.append.remove(), c.trigger.remove(), b.removeClass(this.markerClassName).unbind("focus", this._showDatepicker).unbind("keydown", this._doKeyDown).unbind("keypress", this._doKeyPress).unbind("keyup", this._doKeyUp)) : ("div" == d || "span" == d) && b.removeClass(this.markerClassName).empty()
            }
        },
        _enableDatepicker: function (a) {
            var b = $(a),
                c = $.data(a, PROP_NAME);
            if (b.hasClass(this.markerClassName)) {
                var d = a.nodeName.toLowerCase();
                if ("input" == d) a.disabled = !1, c.trigger.filter("button").each(function () {
                    this.disabled = !1
                }).end().filter("img").css({
                    opacity: "1.0",
                    cursor: ""
                });
                else if ("div" == d || "span" == d) {
                    var e = b.children("." + this._inlineClass);
                    e.children().removeClass("ui-state-disabled"), e.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled", !1)
                }
                this._disabledInputs = $.map(this._disabledInputs, function (b) {
                    return b == a ? null : b
                })
            }
        },
        _disableDatepicker: function (a) {
            var b = $(a),
                c = $.data(a, PROP_NAME);
            if (b.hasClass(this.markerClassName)) {
                var d = a.nodeName.toLowerCase();
                if ("input" == d) a.disabled = !0, c.trigger.filter("button").each(function () {
                    this.disabled = !0
                }).end().filter("img").css({
                    opacity: "0.5",
                    cursor: "default"
                });
                else if ("div" == d || "span" == d) {
                    var e = b.children("." + this._inlineClass);
                    e.children().addClass("ui-state-disabled"), e.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled", !0)
                }
                this._disabledInputs = $.map(this._disabledInputs, function (b) {
                    return b == a ? null : b
                }), this._disabledInputs[this._disabledInputs.length] = a
            }
        },
        _isDisabledDatepicker: function (a) {
            if (!a) return !1;
            for (var b = 0; b < this._disabledInputs.length; b++)
                if (this._disabledInputs[b] == a) return !0;
            return !1
        },
        _getInst: function (a) {
            try {
                return $.data(a, PROP_NAME)
            } catch (b) {
                throw "Missing instance data for this datepicker"
            }
        },
        _optionDatepicker: function (a, b, c) {
            var d = this._getInst(a);
            if (2 == arguments.length && "string" == typeof b) return "defaults" == b ? $.extend({}, $.datepicker._defaults) : d ? "all" == b ? $.extend({}, d.settings) : this._get(d, b) : null;
            var e = b || {};
            if ("string" == typeof b && (e = {}, e[b] = c), d) {
                this._curInst == d && this._hideDatepicker();
                var f = this._getDateDatepicker(a, !0),
                    g = this._getMinMaxDate(d, "min"),
                    h = this._getMinMaxDate(d, "max");
                extendRemove(d.settings, e), null !== g && e.dateFormat !== undefined && e.minDate === undefined && (d.settings.minDate = this._formatDate(d, g)), null !== h && e.dateFormat !== undefined && e.maxDate === undefined && (d.settings.maxDate = this._formatDate(d, h)), this._attachments($(a), d), this._autoSize(d), this._setDate(d, f), this._updateAlternate(d), this._updateDatepicker(d)
            }
        },
        _changeDatepicker: function (a, b, c) {
            this._optionDatepicker(a, b, c)
        },
        _refreshDatepicker: function (a) {
            var b = this._getInst(a);
            b && this._updateDatepicker(b)
        },
        _setDateDatepicker: function (a, b) {
            var c = this._getInst(a);
            c && (this._setDate(c, b), this._updateDatepicker(c), this._updateAlternate(c))
        },
        _getDateDatepicker: function (a, b) {
            var c = this._getInst(a);
            return c && !c.inline && this._setDateFromField(c, b), c ? this._getDate(c) : null
        },
        _doKeyDown: function (a) {
            var b = $.datepicker._getInst(a.target),
                c = !0,
                d = b.dpDiv.is(".ui-datepicker-rtl");
            if (b._keyEvent = !0, $.datepicker._datepickerShowing) switch (a.keyCode) {
            case 9:
                $.datepicker._hideDatepicker(), c = !1;
                break;
            case 13:
                var e = $("td." + $.datepicker._dayOverClass + ":not(." + $.datepicker._currentClass + ")", b.dpDiv);
                e[0] && $.datepicker._selectDay(a.target, b.selectedMonth, b.selectedYear, e[0]);
                var f = $.datepicker._get(b, "onSelect");
                if (f) {
                    var g = $.datepicker._formatDate(b);
                    f.apply(b.input ? b.input[0] : null, [g, b])
                } else $.datepicker._hideDatepicker();
                return !1;
            case 27:
                $.datepicker._hideDatepicker();
                break;
            case 33:
                $.datepicker._adjustDate(a.target, a.ctrlKey ? -$.datepicker._get(b, "stepBigMonths") : -$.datepicker._get(b, "stepMonths"), "M");
                break;
            case 34:
                $.datepicker._adjustDate(a.target, a.ctrlKey ? +$.datepicker._get(b, "stepBigMonths") : +$.datepicker._get(b, "stepMonths"), "M");
                break;
            case 35:
                (a.ctrlKey || a.metaKey) && $.datepicker._clearDate(a.target), c = a.ctrlKey || a.metaKey;
                break;
            case 36:
                (a.ctrlKey || a.metaKey) && $.datepicker._gotoToday(a.target), c = a.ctrlKey || a.metaKey;
                break;
            case 37:
                (a.ctrlKey || a.metaKey) && $.datepicker._adjustDate(a.target, d ? 1 : -1, "D"), c = a.ctrlKey || a.metaKey, a.originalEvent.altKey && $.datepicker._adjustDate(a.target, a.ctrlKey ? -$.datepicker._get(b, "stepBigMonths") : -$.datepicker._get(b, "stepMonths"), "M");
                break;
            case 38:
                (a.ctrlKey || a.metaKey) && $.datepicker._adjustDate(a.target, -7, "D"), c = a.ctrlKey || a.metaKey;
                break;
            case 39:
                (a.ctrlKey || a.metaKey) && $.datepicker._adjustDate(a.target, d ? -1 : 1, "D"), c = a.ctrlKey || a.metaKey, a.originalEvent.altKey && $.datepicker._adjustDate(a.target, a.ctrlKey ? +$.datepicker._get(b, "stepBigMonths") : +$.datepicker._get(b, "stepMonths"), "M");
                break;
            case 40:
                (a.ctrlKey || a.metaKey) && $.datepicker._adjustDate(a.target, 7, "D"), c = a.ctrlKey || a.metaKey;
                break;
            default:
                c = !1
            } else 36 == a.keyCode && a.ctrlKey ? $.datepicker._showDatepicker(this) : c = !1;
            c && (a.preventDefault(), a.stopPropagation())
        },
        _doKeyPress: function (a) {
            var b = $.datepicker._getInst(a.target);
            if ($.datepicker._get(b, "constrainInput")) {
                var c = $.datepicker._possibleChars($.datepicker._get(b, "dateFormat")),
                    d = String.fromCharCode(a.charCode == undefined ? a.keyCode : a.charCode);
                return a.ctrlKey || a.metaKey || " " > d || !c || c.indexOf(d) > -1
            }
        },
        _doKeyUp: function (a) {
            var b = $.datepicker._getInst(a.target);
            if (b.input.val() != b.lastVal) try {
                var c = $.datepicker.parseDate($.datepicker._get(b, "dateFormat"), b.input ? b.input.val() : null, $.datepicker._getFormatConfig(b));
                c && ($.datepicker._setDateFromField(b), $.datepicker._updateAlternate(b), $.datepicker._updateDatepicker(b))
            } catch (d) {
                $.datepicker.log(d)
            }
            return !0
        },
        _showDatepicker: function (a) {
            if (a = a.target || a, "input" != a.nodeName.toLowerCase() && (a = $("input", a.parentNode)[0]), !$.datepicker._isDisabledDatepicker(a) && $.datepicker._lastInput != a) {
                var b = $.datepicker._getInst(a);
                $.datepicker._curInst && $.datepicker._curInst != b && ($.datepicker._curInst.dpDiv.stop(!0, !0), b && $.datepicker._datepickerShowing && $.datepicker._hideDatepicker($.datepicker._curInst.input[0]));
                var c = $.datepicker._get(b, "beforeShow"),
                    d = c ? c.apply(a, [a, b]) : {};
                if (d !== !1) {
                    extendRemove(b.settings, d), b.lastVal = null, $.datepicker._lastInput = a, $.datepicker._setDateFromField(b), $.datepicker._inDialog && (a.value = ""), $.datepicker._pos || ($.datepicker._pos = $.datepicker._findPos(a), $.datepicker._pos[1] += a.offsetHeight);
                    var e = !1;
                    $(a).parents().each(function () {
                        return e |= "fixed" == $(this).css("position"), !e
                    });
                    var f = {
                        left: $.datepicker._pos[0],
                        top: $.datepicker._pos[1]
                    };
                    if ($.datepicker._pos = null, b.dpDiv.empty(), b.dpDiv.css({
                        position: "absolute",
                        display: "block",
                        top: "-1000px"
                    }), $.datepicker._updateDatepicker(b), f = $.datepicker._checkOffset(b, f, e), b.dpDiv.css({
                        position: $.datepicker._inDialog && $.blockUI ? "static" : e ? "fixed" : "absolute",
                        display: "none",
                        left: f.left + "px",
                        top: f.top + "px"
                    }), !b.inline) {
                        var g = $.datepicker._get(b, "showAnim"),
                            h = $.datepicker._get(b, "duration"),
                            i = function () {
                                var a = b.dpDiv.find("iframe.ui-datepicker-cover");
                                if (a.length) {
                                    var c = $.datepicker._getBorders(b.dpDiv);
                                    a.css({
                                        left: -c[0],
                                        top: -c[1],
                                        width: b.dpDiv.outerWidth(),
                                        height: b.dpDiv.outerHeight()
                                    })
                                }
                            };
                        b.dpDiv.zIndex($(a).zIndex() + 1), $.datepicker._datepickerShowing = !0, $.effects && ($.effects.effect[g] || $.effects[g]) ? b.dpDiv.show(g, $.datepicker._get(b, "showOptions"), h, i) : b.dpDiv[g || "show"](g ? h : null, i), g && h || i(), b.input.is(":visible") && !b.input.is(":disabled") && b.input.focus(), $.datepicker._curInst = b
                    }
                }
            }
        },
        _updateDatepicker: function (a) {
            this.maxRows = 4;
            var b = $.datepicker._getBorders(a.dpDiv);
            instActive = a, a.dpDiv.empty().append(this._generateHTML(a)), this._attachHandlers(a);
            var c = a.dpDiv.find("iframe.ui-datepicker-cover");
            c.length && c.css({
                left: -b[0],
                top: -b[1],
                width: a.dpDiv.outerWidth(),
                height: a.dpDiv.outerHeight()
            }), a.dpDiv.find("." + this._dayOverClass + " a").mouseover();
            var d = this._getNumberOfMonths(a),
                e = d[1],
                f = 17;
            if (a.dpDiv.removeClass("ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4").width(""), e > 1 && a.dpDiv.addClass("ui-datepicker-multi-" + e).css("width", f * e + "em"), a.dpDiv[(1 != d[0] || 1 != d[1] ? "add" : "remove") + "Class"]("ui-datepicker-multi"), a.dpDiv[(this._get(a, "isRTL") ? "add" : "remove") + "Class"]("ui-datepicker-rtl"), a == $.datepicker._curInst && $.datepicker._datepickerShowing && a.input && a.input.is(":visible") && !a.input.is(":disabled") && a.input[0] != document.activeElement && a.input.focus(), a.yearshtml) {
                var g = a.yearshtml;
                setTimeout(function () {
                    g === a.yearshtml && a.yearshtml && a.dpDiv.find("select.ui-datepicker-year:first").replaceWith(a.yearshtml), g = a.yearshtml = null
                }, 0)
            }
        },
        _getBorders: function (a) {
            var b = function (a) {
                return {
                    thin: 1,
                    medium: 2,
                    thick: 3
                }[a] || a
            };
            return [parseFloat(b(a.css("border-left-width"))), parseFloat(b(a.css("border-top-width")))]
        },
        _checkOffset: function (a, b, c) {
            var d = a.dpDiv.outerWidth(),
                e = a.dpDiv.outerHeight(),
                f = a.input ? a.input.outerWidth() : 0,
                g = a.input ? a.input.outerHeight() : 0,
                h = document.documentElement.clientWidth + (c ? 0 : $(document).scrollLeft()),
                i = document.documentElement.clientHeight + (c ? 0 : $(document).scrollTop());
            return b.left -= this._get(a, "isRTL") ? d - f : 0, b.left -= c && b.left == a.input.offset().left ? $(document).scrollLeft() : 0, b.top -= c && b.top == a.input.offset().top + g ? $(document).scrollTop() : 0, b.left -= Math.min(b.left, b.left + d > h && h > d ? Math.abs(b.left + d - h) : 0), b.top -= Math.min(b.top, b.top + e > i && i > e ? Math.abs(e + g) : 0), b
        },
        _findPos: function (a) {
            for (var b = this._getInst(a), c = this._get(b, "isRTL"); a && ("hidden" == a.type || 1 != a.nodeType || $.expr.filters.hidden(a));) a = a[c ? "previousSibling" : "nextSibling"];
            var d = $(a).offset();
            return [d.left, d.top]
        },
        _hideDatepicker: function (a) {
            var b = this._curInst;
            if (b && (!a || b == $.data(a, PROP_NAME)) && this._datepickerShowing) {
                var c = this._get(b, "showAnim"),
                    d = this._get(b, "duration"),
                    e = function () {
                        $.datepicker._tidyDialog(b)
                    };
                $.effects && ($.effects.effect[c] || $.effects[c]) ? b.dpDiv.hide(c, $.datepicker._get(b, "showOptions"), d, e) : b.dpDiv["slideDown" == c ? "slideUp" : "fadeIn" == c ? "fadeOut" : "hide"](c ? d : null, e), c || e(), this._datepickerShowing = !1;
                var f = this._get(b, "onClose");
                f && f.apply(b.input ? b.input[0] : null, [b.input ? b.input.val() : "", b]), this._lastInput = null, this._inDialog && (this._dialogInput.css({
                    position: "absolute",
                    left: "0",
                    top: "-100px"
                }), $.blockUI && ($.unblockUI(), $("body").append(this.dpDiv))), this._inDialog = !1
            }
        },
        _tidyDialog: function (a) {
            a.dpDiv.removeClass(this._dialogClass).unbind(".ui-datepicker-calendar")
        },
        _checkExternalClick: function (a) {
            if ($.datepicker._curInst) {
                var b = $(a.target),
                    c = $.datepicker._getInst(b[0]);
                (b[0].id != $.datepicker._mainDivId && 0 == b.parents("#" + $.datepicker._mainDivId).length && !b.hasClass($.datepicker.markerClassName) && !b.closest("." + $.datepicker._triggerClass).length && $.datepicker._datepickerShowing && (!$.datepicker._inDialog || !$.blockUI) || b.hasClass($.datepicker.markerClassName) && $.datepicker._curInst != c) && $.datepicker._hideDatepicker()
            }
        },
        _adjustDate: function (a, b, c) {
            var d = $(a),
                e = this._getInst(d[0]);
            this._isDisabledDatepicker(d[0]) || (this._adjustInstDate(e, b + ("M" == c ? this._get(e, "showCurrentAtPos") : 0), c), this._updateDatepicker(e))
        },
        _gotoToday: function (a) {
            var b = $(a),
                c = this._getInst(b[0]);
            if (this._get(c, "gotoCurrent") && c.currentDay) c.selectedDay = c.currentDay, c.drawMonth = c.selectedMonth = c.currentMonth, c.drawYear = c.selectedYear = c.currentYear;
            else {
                var d = new Date;
                c.selectedDay = d.getDate(), c.drawMonth = c.selectedMonth = d.getMonth(), c.drawYear = c.selectedYear = d.getFullYear()
            }
            this._notifyChange(c), this._adjustDate(b)
        },
        _selectMonthYear: function (a, b, c) {
            var d = $(a),
                e = this._getInst(d[0]);
            e["selected" + ("M" == c ? "Month" : "Year")] = e["draw" + ("M" == c ? "Month" : "Year")] = parseInt(b.options[b.selectedIndex].value, 10), this._notifyChange(e), this._adjustDate(d)
        },
        _selectDay: function (a, b, c, d) {
            var e = $(a);
            if (!$(d).hasClass(this._unselectableClass) && !this._isDisabledDatepicker(e[0])) {
                var f = this._getInst(e[0]);
                f.selectedDay = f.currentDay = $("a", d).html(), f.selectedMonth = f.currentMonth = b, f.selectedYear = f.currentYear = c, this._selectDate(a, this._formatDate(f, f.currentDay, f.currentMonth, f.currentYear))
            }
        },
        _clearDate: function (a) {
            {
                var b = $(a);
                this._getInst(b[0])
            }
            this._selectDate(b, "")
        },
        _selectDate: function (a, b) {
            var c = $(a),
                d = this._getInst(c[0]);
            b = null != b ? b : this._formatDate(d), d.input && d.input.val(b), this._updateAlternate(d);
            var e = this._get(d, "onSelect");
            e ? e.apply(d.input ? d.input[0] : null, [b, d]) : d.input && d.input.trigger("change"), d.inline ? this._updateDatepicker(d) : (this._hideDatepicker(), this._lastInput = d.input[0], "object" != typeof d.input[0] && d.input.focus(), this._lastInput = null)
        },
        _updateAlternate: function (a) {
            var b = this._get(a, "altField");
            if (b) {
                var c = this._get(a, "altFormat") || this._get(a, "dateFormat"),
                    d = this._getDate(a),
                    e = this.formatDate(c, d, this._getFormatConfig(a));
                $(b).each(function () {
                    $(this).val(e)
                })
            }
        },
        noWeekends: function (a) {
            var b = a.getDay();
            return [b > 0 && 6 > b, ""]
        },
        iso8601Week: function (a) {
            var b = new Date(a.getTime());
            b.setDate(b.getDate() + 4 - (b.getDay() || 7));
            var c = b.getTime();
            return b.setMonth(0), b.setDate(1), Math.floor(Math.round((c - b) / 864e5) / 7) + 1
        },
        parseDate: function (a, b, c) {
            if (null == a || null == b) throw "Invalid arguments";
            if (b = "object" == typeof b ? b.toString() : b + "", "" == b) return null;
            var d = (c ? c.shortYearCutoff : null) || this._defaults.shortYearCutoff;
            d = "string" != typeof d ? d : (new Date).getFullYear() % 100 + parseInt(d, 10);
            for (var e = (c ? c.dayNamesShort : null) || this._defaults.dayNamesShort, f = (c ? c.dayNames : null) || this._defaults.dayNames, g = (c ? c.monthNamesShort : null) || this._defaults.monthNamesShort, h = (c ? c.monthNames : null) || this._defaults.monthNames, i = -1, j = -1, k = -1, l = -1, m = !1, n = function (b) {
                var c = s + 1 < a.length && a.charAt(s + 1) == b;
                return c && s++, c
            }, o = function (a) {
                var c = n(a),
                    d = "@" == a ? 14 : "!" == a ? 20 : "y" == a && c ? 4 : "o" == a ? 3 : 2,
                    e = new RegExp("^\\d{1," + d + "}"),
                    f = b.substring(r).match(e);
                if (!f) throw "Missing number at position " + r;
                return r += f[0].length, parseInt(f[0], 10)
            }, p = function (a, c, d) {
                var e = $.map(n(a) ? d : c, function (a, b) {
                        return [
                            [b, a]
                        ]
                    }).sort(function (a, b) {
                        return -(a[1].length - b[1].length)
                    }),
                    f = -1;
                if ($.each(e, function (a, c) {
                    var d = c[1];
                    return b.substr(r, d.length).toLowerCase() == d.toLowerCase() ? (f = c[0], r += d.length, !1) : void 0
                }), -1 != f) return f + 1;
                throw "Unknown name at position " + r
            }, q = function () {
                if (b.charAt(r) != a.charAt(s)) throw "Unexpected literal at position " + r;
                r++
            }, r = 0, s = 0; s < a.length; s++)
                if (m) "'" != a.charAt(s) || n("'") ? q() : m = !1;
                else switch (a.charAt(s)) {
                case "d":
                    k = o("d");
                    break;
                case "D":
                    p("D", e, f);
                    break;
                case "o":
                    l = o("o");
                    break;
                case "m":
                    j = o("m");
                    break;
                case "M":
                    j = p("M", g, h);
                    break;
                case "y":
                    i = o("y");
                    break;
                case "@":
                    var t = new Date(o("@"));
                    i = t.getFullYear(), j = t.getMonth() + 1, k = t.getDate();
                    break;
                case "!":
                    var t = new Date((o("!") - this._ticksTo1970) / 1e4);
                    i = t.getFullYear(), j = t.getMonth() + 1, k = t.getDate();
                    break;
                case "'":
                    n("'") ? q() : m = !0;
                    break;
                default:
                    q()
                }
                if (r < b.length) {
                    var u = b.substr(r);
                    if (!/^\s+/.test(u)) throw "Extra/unparsed characters found in date: " + u
                }
            if (-1 == i ? i = (new Date).getFullYear() : 100 > i && (i += (new Date).getFullYear() - (new Date).getFullYear() % 100 + (d >= i ? 0 : -100)), l > -1)
                for (j = 1, k = l;;) {
                    var v = this._getDaysInMonth(i, j - 1);
                    if (v >= k) break;
                    j++, k -= v
                }
            var t = this._daylightSavingAdjust(new Date(i, j - 1, k));
            if (t.getFullYear() != i || t.getMonth() + 1 != j || t.getDate() != k) throw "Invalid date";
            return t
        },
        ATOM: "yy-mm-dd",
        COOKIE: "D, dd M yy",
        ISO_8601: "yy-mm-dd",
        RFC_822: "D, d M y",
        RFC_850: "DD, dd-M-y",
        RFC_1036: "D, d M y",
        RFC_1123: "D, d M yy",
        RFC_2822: "D, d M yy",
        RSS: "D, d M y",
        TICKS: "!",
        TIMESTAMP: "@",
        W3C: "yy-mm-dd",
        _ticksTo1970: 24 * (718685 + Math.floor(492.5) - Math.floor(19.7) + Math.floor(4.925)) * 60 * 60 * 1e7,
        formatDate: function (a, b, c) {
            if (!b) return "";
            var d = (c ? c.dayNamesShort : null) || this._defaults.dayNamesShort,
                e = (c ? c.dayNames : null) || this._defaults.dayNames,
                f = (c ? c.monthNamesShort : null) || this._defaults.monthNamesShort,
                g = (c ? c.monthNames : null) || this._defaults.monthNames,
                h = function (b) {
                    var c = m + 1 < a.length && a.charAt(m + 1) == b;
                    return c && m++, c
                },
                i = function (a, b, c) {
                    var d = "" + b;
                    if (h(a))
                        for (; d.length < c;) d = "0" + d;
                    return d
                },
                j = function (a, b, c, d) {
                    return h(a) ? d[b] : c[b]
                },
                k = "",
                l = !1;
            if (b)
                for (var m = 0; m < a.length; m++)
                    if (l) "'" != a.charAt(m) || h("'") ? k += a.charAt(m) : l = !1;
                    else switch (a.charAt(m)) {
                    case "d":
                        k += i("d", b.getDate(), 2);
                        break;
                    case "D":
                        k += j("D", b.getDay(), d, e);
                        break;
                    case "o":
                        k += i("o", Math.round((new Date(b.getFullYear(), b.getMonth(), b.getDate()).getTime() - new Date(b.getFullYear(), 0, 0).getTime()) / 864e5), 3);
                        break;
                    case "m":
                        k += i("m", b.getMonth() + 1, 2);
                        break;
                    case "M":
                        k += j("M", b.getMonth(), f, g);
                        break;
                    case "y":
                        k += h("y") ? b.getFullYear() : (b.getYear() % 100 < 10 ? "0" : "") + b.getYear() % 100;
                        break;
                    case "@":
                        k += b.getTime();
                        break;
                    case "!":
                        k += 1e4 * b.getTime() + this._ticksTo1970;
                        break;
                    case "'":
                        h("'") ? k += "'" : l = !0;
                        break;
                    default:
                        k += a.charAt(m)
                    }
                    return k
        },
        _possibleChars: function (a) {
            for (var b = "", c = !1, d = function (b) {
                var c = e + 1 < a.length && a.charAt(e + 1) == b;
                return c && e++, c
            }, e = 0; e < a.length; e++)
                if (c) "'" != a.charAt(e) || d("'") ? b += a.charAt(e) : c = !1;
                else switch (a.charAt(e)) {
                case "d":
                case "m":
                case "y":
                case "@":
                    b += "0123456789";
                    break;
                case "D":
                case "M":
                    return null;
                case "'":
                    d("'") ? b += "'" : c = !0;
                    break;
                default:
                    b += a.charAt(e)
                }
                return b
        },
        _get: function (a, b) {
            return a.settings[b] !== undefined ? a.settings[b] : this._defaults[b]
        },
        _setDateFromField: function (a, b) {
            if (a.input.val() != a.lastVal) {
                var c, d, e = this._get(a, "dateFormat"),
                    f = a.lastVal = a.input ? a.input.val() : null;
                c = d = this._getDefaultDate(a);
                var g = this._getFormatConfig(a);
                try {
                    c = this.parseDate(e, f, g) || d
                } catch (h) {
                    this.log(h), f = b ? "" : f
                }
                a.selectedDay = c.getDate(), a.drawMonth = a.selectedMonth = c.getMonth(), a.drawYear = a.selectedYear = c.getFullYear(), a.currentDay = f ? c.getDate() : 0, a.currentMonth = f ? c.getMonth() : 0, a.currentYear = f ? c.getFullYear() : 0, this._adjustInstDate(a)
            }
        },
        _getDefaultDate: function (a) {
            return this._restrictMinMax(a, this._determineDate(a, this._get(a, "defaultDate"), new Date))
        },
        _determineDate: function (a, b, c) {
            var d = function (a) {
                    var b = new Date;
                    return b.setDate(b.getDate() + a), b
                },
                e = function (b) {
                    try {
                        return $.datepicker.parseDate($.datepicker._get(a, "dateFormat"), b, $.datepicker._getFormatConfig(a))
                    } catch (c) {}
                    for (var d = (b.toLowerCase().match(/^c/) ? $.datepicker._getDate(a) : null) || new Date, e = d.getFullYear(), f = d.getMonth(), g = d.getDate(), h = /([+-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g, i = h.exec(b); i;) {
                        switch (i[2] || "d") {
                        case "d":
                        case "D":
                            g += parseInt(i[1], 10);
                            break;
                        case "w":
                        case "W":
                            g += 7 * parseInt(i[1], 10);
                            break;
                        case "m":
                        case "M":
                            f += parseInt(i[1], 10), g = Math.min(g, $.datepicker._getDaysInMonth(e, f));
                            break;
                        case "y":
                        case "Y":
                            e += parseInt(i[1], 10), g = Math.min(g, $.datepicker._getDaysInMonth(e, f))
                        }
                        i = h.exec(b)
                    }
                    return new Date(e, f, g)
                },
                f = null == b || "" === b ? c : "string" == typeof b ? e(b) : "number" == typeof b ? isNaN(b) ? c : d(b) : new Date(b.getTime());
            return f = f && "Invalid Date" == f.toString() ? c : f, f && (f.setHours(0), f.setMinutes(0), f.setSeconds(0), f.setMilliseconds(0)), this._daylightSavingAdjust(f)
        },
        _daylightSavingAdjust: function (a) {
            return a ? (a.setHours(a.getHours() > 12 ? a.getHours() + 2 : 0), a) : null
        },
        _setDate: function (a, b, c) {
            var d = !b,
                e = a.selectedMonth,
                f = a.selectedYear,
                g = this._restrictMinMax(a, this._determineDate(a, b, new Date));
            a.selectedDay = a.currentDay = g.getDate(), a.drawMonth = a.selectedMonth = a.currentMonth = g.getMonth(), a.drawYear = a.selectedYear = a.currentYear = g.getFullYear(), e == a.selectedMonth && f == a.selectedYear || c || this._notifyChange(a), this._adjustInstDate(a), a.input && a.input.val(d ? "" : this._formatDate(a))
        },
        _getDate: function (a) {
            var b = !a.currentYear || a.input && "" == a.input.val() ? null : this._daylightSavingAdjust(new Date(a.currentYear, a.currentMonth, a.currentDay));
            return b
        },
        _attachHandlers: function (a) {
            var b = this._get(a, "stepMonths"),
                c = "#" + a.id.replace(/\\\\/g, "\\");
            a.dpDiv.find("[data-handler]").map(function () {
                var a = {
                    prev: function () {
                        window["DP_jQuery_" + dpuuid].datepicker._adjustDate(c, -b, "M")
                    },
                    next: function () {
                        window["DP_jQuery_" + dpuuid].datepicker._adjustDate(c, +b, "M")
                    },
                    hide: function () {
                        window["DP_jQuery_" + dpuuid].datepicker._hideDatepicker()
                    },
                    today: function () {
                        window["DP_jQuery_" + dpuuid].datepicker._gotoToday(c)
                    },
                    selectDay: function () {
                        return window["DP_jQuery_" + dpuuid].datepicker._selectDay(c, +this.getAttribute("data-month"), +this.getAttribute("data-year"), this), !1
                    },
                    selectMonth: function () {
                        return window["DP_jQuery_" + dpuuid].datepicker._selectMonthYear(c, this, "M"), !1
                    },
                    selectYear: function () {
                        return window["DP_jQuery_" + dpuuid].datepicker._selectMonthYear(c, this, "Y"), !1
                    }
                };
                $(this).bind(this.getAttribute("data-event"), a[this.getAttribute("data-handler")])
            })
        },
        _generateHTML: function (a) {
            var b = new Date;
            b = this._daylightSavingAdjust(new Date(b.getFullYear(), b.getMonth(), b.getDate()));
            var c = this._get(a, "isRTL"),
                d = this._get(a, "showButtonPanel"),
                e = this._get(a, "hideIfNoPrevNext"),
                f = this._get(a, "navigationAsDateFormat"),
                g = this._getNumberOfMonths(a),
                h = this._get(a, "showCurrentAtPos"),
                i = this._get(a, "stepMonths"),
                j = 1 != g[0] || 1 != g[1],
                k = this._daylightSavingAdjust(a.currentDay ? new Date(a.currentYear, a.currentMonth, a.currentDay) : new Date(9999, 9, 9)),
                l = this._getMinMaxDate(a, "min"),
                m = this._getMinMaxDate(a, "max"),
                n = a.drawMonth - h,
                o = a.drawYear;
            if (0 > n && (n += 12, o--), m) {
                var p = this._daylightSavingAdjust(new Date(m.getFullYear(), m.getMonth() - g[0] * g[1] + 1, m.getDate()));
                for (p = l && l > p ? l : p; this._daylightSavingAdjust(new Date(o, n, 1)) > p;) n--, 0 > n && (n = 11, o--)
            }
            a.drawMonth = n, a.drawYear = o;
            var q = this._get(a, "prevText");
            q = f ? this.formatDate(q, this._daylightSavingAdjust(new Date(o, n - i, 1)), this._getFormatConfig(a)) : q;
            var r = this._canAdjustMonth(a, -1, o, n) ? '<a class="ui-datepicker-prev ui-corner-all" data-handler="prev" data-event="click" title="' + q + '"><span class="ui-icon ui-icon-circle-triangle-' + (c ? "e" : "w") + '">' + q + "</span></a>" : e ? "" : '<a class="ui-datepicker-prev ui-corner-all ui-state-disabled" title="' + q + '"><span class="ui-icon ui-icon-circle-triangle-' + (c ? "e" : "w") + '">' + q + "</span></a>",
                s = this._get(a, "nextText");
            s = f ? this.formatDate(s, this._daylightSavingAdjust(new Date(o, n + i, 1)), this._getFormatConfig(a)) : s;
            var t = this._canAdjustMonth(a, 1, o, n) ? '<a class="ui-datepicker-next ui-corner-all" data-handler="next" data-event="click" title="' + s + '"><span class="ui-icon ui-icon-circle-triangle-' + (c ? "w" : "e") + '">' + s + "</span></a>" : e ? "" : '<a class="ui-datepicker-next ui-corner-all ui-state-disabled" title="' + s + '"><span class="ui-icon ui-icon-circle-triangle-' + (c ? "w" : "e") + '">' + s + "</span></a>",
                u = this._get(a, "currentText"),
                v = this._get(a, "gotoCurrent") && a.currentDay ? k : b;
            u = f ? this.formatDate(u, v, this._getFormatConfig(a)) : u;
            var w = a.inline ? "" : '<button type="button" class="ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all" data-handler="hide" data-event="click">' + this._get(a, "closeText") + "</button>",
                x = d ? '<div class="ui-datepicker-buttonpane ui-widget-content">' + (c ? w : "") + (this._isInRange(a, v) ? '<button type="button" class="ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all" data-handler="today" data-event="click">' + u + "</button>" : "") + (c ? "" : w) + "</div>" : "",
                y = parseInt(this._get(a, "firstDay"), 10);
            y = isNaN(y) ? 0 : y;
            for (var z = this._get(a, "showWeek"), A = this._get(a, "dayNames"), B = (this._get(a, "dayNamesShort"), this._get(a, "dayNamesMin")), C = this._get(a, "monthNames"), D = this._get(a, "monthNamesShort"), E = this._get(a, "beforeShowDay"), F = this._get(a, "showOtherMonths"), G = this._get(a, "selectOtherMonths"), H = (this._get(a, "calculateWeek") || this.iso8601Week, this._getDefaultDate(a)), I = "", J = 0; J < g[0]; J++) {
                var K = "";
                this.maxRows = 4;
                for (var L = 0; L < g[1]; L++) {
                    var M = this._daylightSavingAdjust(new Date(o, n, a.selectedDay)),
                        N = " ui-corner-all",
                        O = "";
                    if (j) {
                        if (O += '<div class="ui-datepicker-group', g[1] > 1) switch (L) {
                        case 0:
                            O += " ui-datepicker-group-first", N = " ui-corner-" + (c ? "right" : "left");
                            break;
                        case g[1] - 1:
                            O += " ui-datepicker-group-last", N = " ui-corner-" + (c ? "left" : "right");
                            break;
                        default:
                            O += " ui-datepicker-group-middle", N = ""
                        }
                        O += '">'
                    }
                    O += '<div class="ui-datepicker-header ui-widget-header ui-helper-clearfix' + N + '">' + (/all|left/.test(N) && 0 == J ? c ? t : r : "") + (/all|right/.test(N) && 0 == J ? c ? r : t : "") + this._generateMonthYearHeader(a, n, o, l, m, J > 0 || L > 0, C, D) + '</div><table class="ui-datepicker-calendar"><thead><tr>';
                    for (var P = z ? '<th class="ui-datepicker-week-col">' + this._get(a, "weekHeader") + "</th>" : "", Q = 0; 7 > Q; Q++) {
                        var R = (Q + y) % 7;
                        P += "<th" + ((Q + y + 6) % 7 >= 5 ? ' class="ui-datepicker-week-end"' : "") + '><span title="' + A[R] + '">' + B[R] + "</span></th>"
                    }
                    O += P + "</tr></thead><tbody>";
                    var S = this._getDaysInMonth(o, n);
                    o == a.selectedYear && n == a.selectedMonth && (a.selectedDay = Math.min(a.selectedDay, S));
                    var T = (this._getFirstDayOfMonth(o, n) - y + 7) % 7,
                        U = Math.ceil((T + S) / 7),
                        V = j ? this.maxRows > U ? this.maxRows : U : U;
                    this.maxRows = V;
                    for (var W = this._daylightSavingAdjust(new Date(o, n, 1 - T)), X = 0; V > X; X++) {
                        O += "<tr>";
                        for (var Y = z ? '<td class="ui-datepicker-week-col">' + this._get(a, "calculateWeek")(W) + "</td>" : "", Q = 0; 7 > Q; Q++) {
                            var Z = E ? E.apply(a.input ? a.input[0] : null, [W]) : [!0, ""],
                                _ = W.getMonth() != n,
                                ab = _ && !G || !Z[0] || l && l > W || m && W > m;
                            Y += '<td class="' + ((Q + y + 6) % 7 >= 5 ? " ui-datepicker-week-end" : "") + (_ ? " ui-datepicker-other-month" : "") + (W.getTime() == M.getTime() && n == a.selectedMonth && a._keyEvent || H.getTime() == W.getTime() && H.getTime() == M.getTime() ? " " + this._dayOverClass : "") + (ab ? " " + this._unselectableClass + " ui-state-disabled" : "") + (_ && !F ? "" : " " + Z[1] + (W.getTime() == k.getTime() ? " " + this._currentClass : "") + (W.getTime() == b.getTime() ? " ui-datepicker-today" : "")) + '"' + (_ && !F || !Z[2] ? "" : ' title="' + Z[2] + '"') + (ab ? "" : ' data-handler="selectDay" data-event="click" data-month="' + W.getMonth() + '" data-year="' + W.getFullYear() + '"') + ">" + (_ && !F ? "&#xa0;" : ab ? '<span class="ui-state-default">' + W.getDate() + "</span>" : '<a class="ui-state-default' + (W.getTime() == b.getTime() ? " ui-state-highlight" : "") + (W.getTime() == k.getTime() ? " ui-state-active" : "") + (_ ? " ui-priority-secondary" : "") + '" href="#">' + W.getDate() + "</a>") + "</td>", W.setDate(W.getDate() + 1), W = this._daylightSavingAdjust(W)
                        }
                        O += Y + "</tr>"
                    }
                    n++, n > 11 && (n = 0, o++), O += "</tbody></table>" + (j ? "</div>" + (g[0] > 0 && L == g[1] - 1 ? '<div class="ui-datepicker-row-break"></div>' : "") : ""), K += O
                }
                I += K
            }
            return I += x + ($.ui.ie6 && !a.inline ? '<iframe src="javascript:false;" class="ui-datepicker-cover" frameborder="0"></iframe>' : ""), a._keyEvent = !1, I
        },
        _generateMonthYearHeader: function (a, b, c, d, e, f, g, h) {
            var i = this._get(a, "changeMonth"),
                j = this._get(a, "changeYear"),
                k = this._get(a, "showMonthAfterYear"),
                l = '<div class="ui-datepicker-title">',
                m = "";
            if (f || !i) m += '<span class="ui-datepicker-month">' + g[b] + "</span>";
            else {
                var n = d && d.getFullYear() == c,
                    o = e && e.getFullYear() == c;
                m += '<select class="ui-datepicker-month" data-handler="selectMonth" data-event="change">';
                for (var p = 0; 12 > p; p++)(!n || p >= d.getMonth()) && (!o || p <= e.getMonth()) && (m += '<option value="' + p + '"' + (p == b ? ' selected="selected"' : "") + ">" + h[p] + "</option>");
                m += "</select>"
            } if (k || (l += m + (!f && i && j ? "" : "&#xa0;")), !a.yearshtml)
                if (a.yearshtml = "", f || !j) l += '<span class="ui-datepicker-year">' + c + "</span>";
                else {
                    var q = this._get(a, "yearRange").split(":"),
                        r = (new Date).getFullYear(),
                        s = function (a) {
                            var b = a.match(/c[+-].*/) ? c + parseInt(a.substring(1), 10) : a.match(/[+-].*/) ? r + parseInt(a, 10) : parseInt(a, 10);
                            return isNaN(b) ? r : b
                        },
                        t = s(q[0]),
                        u = Math.max(t, s(q[1] || ""));
                    for (t = d ? Math.max(t, d.getFullYear()) : t, u = e ? Math.min(u, e.getFullYear()) : u, a.yearshtml += '<select class="ui-datepicker-year" data-handler="selectYear" data-event="change">'; u >= t; t++) a.yearshtml += '<option value="' + t + '"' + (t == c ? ' selected="selected"' : "") + ">" + t + "</option>";
                    a.yearshtml += "</select>", l += a.yearshtml, a.yearshtml = null
                }
            return l += this._get(a, "yearSuffix"), k && (l += (!f && i && j ? "" : "&#xa0;") + m), l += "</div>"
        },
        _adjustInstDate: function (a, b, c) {
            var d = a.drawYear + ("Y" == c ? b : 0),
                e = a.drawMonth + ("M" == c ? b : 0),
                f = Math.min(a.selectedDay, this._getDaysInMonth(d, e)) + ("D" == c ? b : 0),
                g = this._restrictMinMax(a, this._daylightSavingAdjust(new Date(d, e, f)));
            a.selectedDay = g.getDate(), a.drawMonth = a.selectedMonth = g.getMonth(), a.drawYear = a.selectedYear = g.getFullYear(), ("M" == c || "Y" == c) && this._notifyChange(a)
        },
        _restrictMinMax: function (a, b) {
            var c = this._getMinMaxDate(a, "min"),
                d = this._getMinMaxDate(a, "max"),
                e = c && c > b ? c : b;
            return e = d && e > d ? d : e
        },
        _notifyChange: function (a) {
            var b = this._get(a, "onChangeMonthYear");
            b && b.apply(a.input ? a.input[0] : null, [a.selectedYear, a.selectedMonth + 1, a])
        },
        _getNumberOfMonths: function (a) {
            var b = this._get(a, "numberOfMonths");
            return null == b ? [1, 1] : "number" == typeof b ? [1, b] : b
        },
        _getMinMaxDate: function (a, b) {
            return this._determineDate(a, this._get(a, b + "Date"), null)
        },
        _getDaysInMonth: function (a, b) {
            return 32 - this._daylightSavingAdjust(new Date(a, b, 32)).getDate()
        },
        _getFirstDayOfMonth: function (a, b) {
            return new Date(a, b, 1).getDay()
        },
        _canAdjustMonth: function (a, b, c, d) {
            var e = this._getNumberOfMonths(a),
                f = this._daylightSavingAdjust(new Date(c, d + (0 > b ? b : e[0] * e[1]), 1));
            return 0 > b && f.setDate(this._getDaysInMonth(f.getFullYear(), f.getMonth())), this._isInRange(a, f)
        },
        _isInRange: function (a, b) {
            var c = this._getMinMaxDate(a, "min"),
                d = this._getMinMaxDate(a, "max");
            return (!c || b.getTime() >= c.getTime()) && (!d || b.getTime() <= d.getTime())
        },
        _getFormatConfig: function (a) {
            var b = this._get(a, "shortYearCutoff");
            return b = "string" != typeof b ? b : (new Date).getFullYear() % 100 + parseInt(b, 10), {
                shortYearCutoff: b,
                dayNamesShort: this._get(a, "dayNamesShort"),
                dayNames: this._get(a, "dayNames"),
                monthNamesShort: this._get(a, "monthNamesShort"),
                monthNames: this._get(a, "monthNames")
            }
        },
        _formatDate: function (a, b, c, d) {
            b || (a.currentDay = a.selectedDay, a.currentMonth = a.selectedMonth, a.currentYear = a.selectedYear);
            var e = b ? "object" == typeof b ? b : this._daylightSavingAdjust(new Date(d, c, b)) : this._daylightSavingAdjust(new Date(a.currentYear, a.currentMonth, a.currentDay));
            return this.formatDate(this._get(a, "dateFormat"), e, this._getFormatConfig(a))
        }
    }), $.fn.datepicker = function (a) {
        if (!this.length) return this;
        $.datepicker.initialized || ($(document).mousedown($.datepicker._checkExternalClick).find(document.body).append($.datepicker.dpDiv), $.datepicker.initialized = !0);
        var b = Array.prototype.slice.call(arguments, 1);
        return "string" != typeof a || "isDisabled" != a && "getDate" != a && "widget" != a ? "option" == a && 2 == arguments.length && "string" == typeof arguments[1] ? $.datepicker["_" + a + "Datepicker"].apply($.datepicker, [this[0]].concat(b)) : this.each(function () {
            "string" == typeof a ? $.datepicker["_" + a + "Datepicker"].apply($.datepicker, [this].concat(b)) : $.datepicker._attachDatepicker(this, a)
        }) : $.datepicker["_" + a + "Datepicker"].apply($.datepicker, [this[0]].concat(b))
    }, $.datepicker = new Datepicker, $.datepicker.initialized = !1, $.datepicker.uuid = (new Date).getTime(), $.datepicker.version = "1.9.1", window["DP_jQuery_" + dpuuid] = $
}(jQuery),
function (a, b) {
    var c = "ui-dialog ui-widget ui-widget-content ui-corner-all ",
        d = {
            buttons: !0,
            height: !0,
            maxHeight: !0,
            maxWidth: !0,
            minHeight: !0,
            minWidth: !0,
            width: !0
        },
        e = {
            maxHeight: !0,
            maxWidth: !0,
            minHeight: !0,
            minWidth: !0
        };
    a.widget("ui.dialog", {
        version: "1.9.1",
        options: {
            autoOpen: !0,
            buttons: {},
            closeOnEscape: !0,
            closeText: "close",
            dialogClass: "",
            draggable: !0,
            hide: null,
            height: "auto",
            maxHeight: !1,
            maxWidth: !1,
            minHeight: 150,
            minWidth: 150,
            modal: !1,
            position: {
                my: "center",
                at: "center",
                of: window,
                collision: "fit",
                using: function (b) {
                    var c = a(this).css(b).offset().top;
                    0 > c && a(this).css("top", b.top - c)
                }
            },
            resizable: !0,
            show: null,
            stack: !0,
            title: "",
            width: 300,
            zIndex: 1e3
        },
        _create: function () {
            this.originalTitle = this.element.attr("title"), "string" != typeof this.originalTitle && (this.originalTitle = ""), this.oldPosition = {
                parent: this.element.parent(),
                index: this.element.parent().children().index(this.element)
            }, this.options.title = this.options.title || this.originalTitle;
            var b, d, e, f, g, h = this,
                i = this.options,
                j = i.title || "&#160;";
            b = (this.uiDialog = a("<div>")).addClass(c + i.dialogClass).css({
                display: "none",
                outline: 0,
                zIndex: i.zIndex
            }).attr("tabIndex", -1).keydown(function (b) {
                i.closeOnEscape && !b.isDefaultPrevented() && b.keyCode && b.keyCode === a.ui.keyCode.ESCAPE && (h.close(b), b.preventDefault())
            }).mousedown(function (a) {
                h.moveToTop(!1, a)
            }).appendTo("body"), this.element.show().removeAttr("title").addClass("ui-dialog-content ui-widget-content").appendTo(b), d = (this.uiDialogTitlebar = a("<div>")).addClass("ui-dialog-titlebar  ui-widget-header  ui-corner-all  ui-helper-clearfix").bind("mousedown", function () {
                b.focus()
            }).prependTo(b), e = a("<a href='#'></a>").addClass("ui-dialog-titlebar-close  ui-corner-all").attr("role", "button").click(function (a) {
                a.preventDefault(), h.close(a)
            }).appendTo(d), (this.uiDialogTitlebarCloseText = a("<span>")).addClass("ui-icon ui-icon-closethick").text(i.closeText).appendTo(e), f = a("<span>").uniqueId().addClass("ui-dialog-title").html(j).prependTo(d), g = (this.uiDialogButtonPane = a("<div>")).addClass("ui-dialog-buttonpane ui-widget-content ui-helper-clearfix"), (this.uiButtonSet = a("<div>")).addClass("ui-dialog-buttonset").appendTo(g), b.attr({
                role: "dialog",
                "aria-labelledby": f.attr("id")
            }), d.find("*").add(d).disableSelection(), this._hoverable(e), this._focusable(e), i.draggable && a.fn.draggable && this._makeDraggable(), i.resizable && a.fn.resizable && this._makeResizable(), this._createButtons(i.buttons), this._isOpen = !1, a.fn.bgiframe && b.bgiframe(), this._on(b, {
                keydown: function (c) {
                    if (i.modal && c.keyCode === a.ui.keyCode.TAB) {
                        var d = a(":tabbable", b),
                            e = d.filter(":first"),
                            f = d.filter(":last");
                        return c.target !== f[0] || c.shiftKey ? c.target === e[0] && c.shiftKey ? (f.focus(1), !1) : void 0 : (e.focus(1), !1)
                    }
                }
            })
        },
        _init: function () {
            this.options.autoOpen && this.open()
        },
        _destroy: function () {
            var a, b = this.oldPosition;
            this.overlay && this.overlay.destroy(), this.uiDialog.hide(), this.element.removeClass("ui-dialog-content ui-widget-content").hide().appendTo("body"), this.uiDialog.remove(), this.originalTitle && this.element.attr("title", this.originalTitle), a = b.parent.children().eq(b.index), a.length && a[0] !== this.element[0] ? a.before(this.element) : b.parent.append(this.element)
        },
        widget: function () {
            return this.uiDialog
        },
        close: function (b) {
            var c, d, e = this;
            if (this._isOpen && !1 !== this._trigger("beforeClose", b)) return this._isOpen = !1, this.overlay && this.overlay.destroy(), this.options.hide ? this._hide(this.uiDialog, this.options.hide, function () {
                e._trigger("close", b)
            }) : (this.uiDialog.hide(), this._trigger("close", b)), a.ui.dialog.overlay.resize(), this.options.modal && (c = 0, a(".ui-dialog").each(function () {
                this !== e.uiDialog[0] && (d = a(this).css("z-index"), isNaN(d) || (c = Math.max(c, d)))
            }), a.ui.dialog.maxZ = c), this
        },
        isOpen: function () {
            return this._isOpen
        },
        moveToTop: function (b, c) {
            var d, e = this.options;
            return e.modal && !b || !e.stack && !e.modal ? this._trigger("focus", c) : (e.zIndex > a.ui.dialog.maxZ && (a.ui.dialog.maxZ = e.zIndex), this.overlay && (a.ui.dialog.maxZ += 1, a.ui.dialog.overlay.maxZ = a.ui.dialog.maxZ, this.overlay.$el.css("z-index", a.ui.dialog.overlay.maxZ)), d = {
                scrollTop: this.element.scrollTop(),
                scrollLeft: this.element.scrollLeft()
            }, a.ui.dialog.maxZ += 1, this.uiDialog.css("z-index", a.ui.dialog.maxZ), this.element.attr(d), this._trigger("focus", c), this)
        },
        open: function () {
            if (!this._isOpen) {
                var b, c = this.options,
                    d = this.uiDialog;
                return this._size(), this._position(c.position), d.show(c.show), this.overlay = c.modal ? new a.ui.dialog.overlay(this) : null, this.moveToTop(!0), b = this.element.find(":tabbable"), b.length || (b = this.uiDialogButtonPane.find(":tabbable"), b.length || (b = d)), b.eq(0).focus(), this._isOpen = !0, this._trigger("open"), this
            }
        },
        _createButtons: function (b) {
            var c = this,
                d = !1;
            this.uiDialogButtonPane.remove(), this.uiButtonSet.empty(), "object" == typeof b && null !== b && a.each(b, function () {
                return !(d = !0)
            }), d ? (a.each(b, function (b, d) {
                d = a.isFunction(d) ? {
                    click: d,
                    text: b
                } : d;
                var e = a("<button type='button'></button>").attr(d, !0).unbind("click").click(function () {
                    d.click.apply(c.element[0], arguments)
                }).appendTo(c.uiButtonSet);
                a.fn.button && e.button()
            }), this.uiDialog.addClass("ui-dialog-buttons"), this.uiDialogButtonPane.appendTo(this.uiDialog)) : this.uiDialog.removeClass("ui-dialog-buttons")
        },
        _makeDraggable: function () {
            function b(a) {
                return {
                    position: a.position,
                    offset: a.offset
                }
            }
            var c = this,
                d = this.options;
            this.uiDialog.draggable({
                cancel: ".ui-dialog-content, .ui-dialog-titlebar-close",
                handle: ".ui-dialog-titlebar",
                containment: "document",
                start: function (d, e) {
                    a(this).addClass("ui-dialog-dragging"), c._trigger("dragStart", d, b(e))
                },
                drag: function (a, d) {
                    c._trigger("drag", a, b(d))
                },
                stop: function (e, f) {
                    d.position = [f.position.left - c.document.scrollLeft(), f.position.top - c.document.scrollTop()], a(this).removeClass("ui-dialog-dragging"), c._trigger("dragStop", e, b(f)), a.ui.dialog.overlay.resize()
                }
            })
        },
        _makeResizable: function (c) {
            function d(a) {
                return {
                    originalPosition: a.originalPosition,
                    originalSize: a.originalSize,
                    position: a.position,
                    size: a.size
                }
            }
            c = c === b ? this.options.resizable : c;
            var e = this,
                f = this.options,
                g = this.uiDialog.css("position"),
                h = "string" == typeof c ? c : "n,e,s,w,se,sw,ne,nw";
            this.uiDialog.resizable({
                cancel: ".ui-dialog-content",
                containment: "document",
                alsoResize: this.element,
                maxWidth: f.maxWidth,
                maxHeight: f.maxHeight,
                minWidth: f.minWidth,
                minHeight: this._minHeight(),
                handles: h,
                start: function (b, c) {
                    a(this).addClass("ui-dialog-resizing"), e._trigger("resizeStart", b, d(c))
                },
                resize: function (a, b) {
                    e._trigger("resize", a, d(b))
                },
                stop: function (b, c) {
                    a(this).removeClass("ui-dialog-resizing"), f.height = a(this).height(), f.width = a(this).width(), e._trigger("resizeStop", b, d(c)), a.ui.dialog.overlay.resize()
                }
            }).css("position", g).find(".ui-resizable-se").addClass("ui-icon ui-icon-grip-diagonal-se")
        },
        _minHeight: function () {
            var a = this.options;
            return "auto" === a.height ? a.minHeight : Math.min(a.minHeight, a.height)
        },
        _position: function (b) {
            var c, d = [],
                e = [0, 0];
            b ? (("string" == typeof b || "object" == typeof b && "0" in b) && (d = b.split ? b.split(" ") : [b[0], b[1]], 1 === d.length && (d[1] = d[0]), a.each(["left", "top"], function (a, b) {
                +d[a] === d[a] && (e[a] = d[a], d[a] = b)
            }), b = {
                my: d[0] + (e[0] < 0 ? e[0] : "+" + e[0]) + " " + d[1] + (e[1] < 0 ? e[1] : "+" + e[1]),
                at: d.join(" ")
            }), b = a.extend({}, a.ui.dialog.prototype.options.position, b)) : b = a.ui.dialog.prototype.options.position, c = this.uiDialog.is(":visible"), c || this.uiDialog.show(), this.uiDialog.position(b), c || this.uiDialog.hide()
        },
        _setOptions: function (b) {
            var c = this,
                f = {},
                g = !1;
            a.each(b, function (a, b) {
                c._setOption(a, b), a in d && (g = !0), a in e && (f[a] = b)
            }), g && this._size(), this.uiDialog.is(":data(resizable)") && this.uiDialog.resizable("option", f)
        },
        _setOption: function (b, d) {
            var e, f, g = this.uiDialog;
            switch (b) {
            case "buttons":
                this._createButtons(d);
                break;
            case "closeText":
                this.uiDialogTitlebarCloseText.text("" + d);
                break;
            case "dialogClass":
                g.removeClass(this.options.dialogClass).addClass(c + d);
                break;
            case "disabled":
                d ? g.addClass("ui-dialog-disabled") : g.removeClass("ui-dialog-disabled");
                break;
            case "draggable":
                e = g.is(":data(draggable)"), e && !d && g.draggable("destroy"), !e && d && this._makeDraggable();
                break;
            case "position":
                this._position(d);
                break;
            case "resizable":
                f = g.is(":data(resizable)"), f && !d && g.resizable("destroy"), f && "string" == typeof d && g.resizable("option", "handles", d), f || d === !1 || this._makeResizable(d);
                break;
            case "title":
                a(".ui-dialog-title", this.uiDialogTitlebar).html("" + (d || "&#160;"))
            }
            this._super(b, d)
        },
        _size: function () {
            var b, c, d, e = this.options,
                f = this.uiDialog.is(":visible");
            this.element.show().css({
                width: "auto",
                minHeight: 0,
                height: 0
            }), e.minWidth > e.width && (e.width = e.minWidth), b = this.uiDialog.css({
                height: "auto",
                width: e.width
            }).outerHeight(), c = Math.max(0, e.minHeight - b), "auto" === e.height ? a.support.minHeight ? this.element.css({
                minHeight: c,
                height: "auto"
            }) : (this.uiDialog.show(), d = this.element.css("height", "auto").height(), f || this.uiDialog.hide(), this.element.height(Math.max(d, c))) : this.element.height(Math.max(e.height - b, 0)), this.uiDialog.is(":data(resizable)") && this.uiDialog.resizable("option", "minHeight", this._minHeight())
        }
    }), a.extend(a.ui.dialog, {
        uuid: 0,
        maxZ: 0,
        getTitleId: function (a) {
            var b = a.attr("id");
            return b || (this.uuid += 1, b = this.uuid), "ui-dialog-title-" + b
        },
        overlay: function (b) {
            this.$el = a.ui.dialog.overlay.create(b)
        }
    }), a.extend(a.ui.dialog.overlay, {
        instances: [],
        oldInstances: [],
        maxZ: 0,
        events: a.map("focus,mousedown,mouseup,keydown,keypress,click".split(","), function (a) {
            return a + ".dialog-overlay"
        }).join(" "),
        create: function (b) {
            0 === this.instances.length && (setTimeout(function () {
                a.ui.dialog.overlay.instances.length && a(document).bind(a.ui.dialog.overlay.events, function (b) {
                    return a(b.target).zIndex() < a.ui.dialog.overlay.maxZ ? !1 : void 0
                })
            }, 1), a(window).bind("resize.dialog-overlay", a.ui.dialog.overlay.resize));
            var c = this.oldInstances.pop() || a("<div>").addClass("ui-widget-overlay");
            return a(document).bind("keydown.dialog-overlay", function (d) {
                var e = a.ui.dialog.overlay.instances;
                0 !== e.length && e[e.length - 1] === c && b.options.closeOnEscape && !d.isDefaultPrevented() && d.keyCode && d.keyCode === a.ui.keyCode.ESCAPE && (b.close(d), d.preventDefault())
            }), c.appendTo(document.body).css({
                width: this.width(),
                height: this.height()
            }), a.fn.bgiframe && c.bgiframe(), this.instances.push(c), c
        },
        destroy: function (b) {
            var c = a.inArray(b, this.instances),
                d = 0; - 1 !== c && this.oldInstances.push(this.instances.splice(c, 1)[0]), 0 === this.instances.length && a([document, window]).unbind(".dialog-overlay"), b.height(0).width(0).remove(), a.each(this.instances, function () {
                d = Math.max(d, this.css("z-index"))
            }), this.maxZ = d
        },
        height: function () {
            var b, c;
            return a.ui.ie ? (b = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight), c = Math.max(document.documentElement.offsetHeight, document.body.offsetHeight), c > b ? a(window).height() + "px" : b + "px") : a(document).height() + "px"
        },
        width: function () {
            var b, c;
            return a.ui.ie ? (b = Math.max(document.documentElement.scrollWidth, document.body.scrollWidth), c = Math.max(document.documentElement.offsetWidth, document.body.offsetWidth), c > b ? a(window).width() + "px" : b + "px") : a(document).width() + "px"
        },
        resize: function () {
            var b = a([]);
            a.each(a.ui.dialog.overlay.instances, function () {
                b = b.add(this)
            }), b.css({
                width: 0,
                height: 0
            }).css({
                width: a.ui.dialog.overlay.width(),
                height: a.ui.dialog.overlay.height()
            })
        }
    }), a.extend(a.ui.dialog.overlay.prototype, {
        destroy: function () {
            a.ui.dialog.overlay.destroy(this.$el)
        }
    })
}(jQuery),
function (a) {
    var b = /up|down|vertical/,
        c = /up|left|vertical|horizontal/;
    a.effects.effect.blind = function (d, e) {
        var f, g, h, i = a(this),
            j = ["position", "top", "bottom", "left", "right", "height", "width"],
            k = a.effects.setMode(i, d.mode || "hide"),
            l = d.direction || "up",
            m = b.test(l),
            n = m ? "height" : "width",
            o = m ? "top" : "left",
            p = c.test(l),
            q = {},
            r = "show" === k;
        i.parent().is(".ui-effects-wrapper") ? a.effects.save(i.parent(), j) : a.effects.save(i, j), i.show(), f = a.effects.createWrapper(i).css({
            overflow: "hidden"
        }), g = f[n](), h = parseFloat(f.css(o)) || 0, q[n] = r ? g : 0, p || (i.css(m ? "bottom" : "right", 0).css(m ? "top" : "left", "auto").css({
            position: "absolute"
        }), q[o] = r ? h : g + h), r && (f.css(n, 0), p || f.css(o, h + g)), f.animate(q, {
            duration: d.duration,
            easing: d.easing,
            queue: !1,
            complete: function () {
                "hide" === k && i.hide(), a.effects.restore(i, j), a.effects.removeWrapper(i), e()
            }
        })
    }
}(jQuery),
function (a) {
    a.effects.effect.bounce = function (b, c) {
        var d, e, f, g = a(this),
            h = ["position", "top", "bottom", "left", "right", "height", "width"],
            i = a.effects.setMode(g, b.mode || "effect"),
            j = "hide" === i,
            k = "show" === i,
            l = b.direction || "up",
            m = b.distance,
            n = b.times || 5,
            o = 2 * n + (k || j ? 1 : 0),
            p = b.duration / o,
            q = b.easing,
            r = "up" === l || "down" === l ? "top" : "left",
            s = "up" === l || "left" === l,
            t = g.queue(),
            u = t.length;
        for ((k || j) && h.push("opacity"), a.effects.save(g, h), g.show(), a.effects.createWrapper(g), m || (m = g["top" === r ? "outerHeight" : "outerWidth"]() / 3), k && (f = {
            opacity: 1
        }, f[r] = 0, g.css("opacity", 0).css(r, s ? 2 * -m : 2 * m).animate(f, p, q)), j && (m /= Math.pow(2, n - 1)), f = {}, f[r] = 0, d = 0; n > d; d++) e = {}, e[r] = (s ? "-=" : "+=") + m, g.animate(e, p, q).animate(f, p, q), m = j ? 2 * m : m / 2;
        j && (e = {
            opacity: 0
        }, e[r] = (s ? "-=" : "+=") + m, g.animate(e, p, q)), g.queue(function () {
            j && g.hide(), a.effects.restore(g, h), a.effects.removeWrapper(g), c()
        }), u > 1 && t.splice.apply(t, [1, 0].concat(t.splice(u, o + 1))), g.dequeue()
    }
}(jQuery),
function (a) {
    a.effects.effect.clip = function (b, c) {
        var d, e, f, g = a(this),
            h = ["position", "top", "bottom", "left", "right", "height", "width"],
            i = a.effects.setMode(g, b.mode || "hide"),
            j = "show" === i,
            k = b.direction || "vertical",
            l = "vertical" === k,
            m = l ? "height" : "width",
            n = l ? "top" : "left",
            o = {};
        a.effects.save(g, h), g.show(), d = a.effects.createWrapper(g).css({
            overflow: "hidden"
        }), e = "IMG" === g[0].tagName ? d : g, f = e[m](), j && (e.css(m, 0), e.css(n, f / 2)), o[m] = j ? f : 0, o[n] = j ? 0 : f / 2, e.animate(o, {
            queue: !1,
            duration: b.duration,
            easing: b.easing,
            complete: function () {
                j || g.hide(), a.effects.restore(g, h), a.effects.removeWrapper(g), c()
            }
        })
    }
}(jQuery),
function (a) {
    a.effects.effect.drop = function (b, c) {
        var d, e = a(this),
            f = ["position", "top", "bottom", "left", "right", "opacity", "height", "width"],
            g = a.effects.setMode(e, b.mode || "hide"),
            h = "show" === g,
            i = b.direction || "left",
            j = "up" === i || "down" === i ? "top" : "left",
            k = "up" === i || "left" === i ? "pos" : "neg",
            l = {
                opacity: h ? 1 : 0
            };
        a.effects.save(e, f), e.show(), a.effects.createWrapper(e), d = b.distance || e["top" === j ? "outerHeight" : "outerWidth"](!0) / 2, h && e.css("opacity", 0).css(j, "pos" === k ? -d : d), l[j] = (h ? "pos" === k ? "+=" : "-=" : "pos" === k ? "-=" : "+=") + d, e.animate(l, {
            queue: !1,
            duration: b.duration,
            easing: b.easing,
            complete: function () {
                "hide" === g && e.hide(), a.effects.restore(e, f), a.effects.removeWrapper(e), c()
            }
        })
    }
}(jQuery),
function (a) {
    a.effects.effect.explode = function (b, c) {
        function d() {
            t.push(this), t.length === l * m && e()
        }

        function e() {
            n.css({
                visibility: "visible"
            }), a(t).remove(), p || n.hide(), c()
        }
        var f, g, h, i, j, k, l = b.pieces ? Math.round(Math.sqrt(b.pieces)) : 3,
            m = l,
            n = a(this),
            o = a.effects.setMode(n, b.mode || "hide"),
            p = "show" === o,
            q = n.show().css("visibility", "hidden").offset(),
            r = Math.ceil(n.outerWidth() / m),
            s = Math.ceil(n.outerHeight() / l),
            t = [];
        for (f = 0; l > f; f++)
            for (i = q.top + f * s, k = f - (l - 1) / 2, g = 0; m > g; g++) h = q.left + g * r, j = g - (m - 1) / 2, n.clone().appendTo("body").wrap("<div></div>").css({
                position: "absolute",
                visibility: "visible",
                left: -g * r,
                top: -f * s
            }).parent().addClass("ui-effects-explode").css({
                position: "absolute",
                overflow: "hidden",
                width: r,
                height: s,
                left: h + (p ? j * r : 0),
                top: i + (p ? k * s : 0),
                opacity: p ? 0 : 1
            }).animate({
                left: h + (p ? 0 : j * r),
                top: i + (p ? 0 : k * s),
                opacity: p ? 1 : 0
            }, b.duration || 500, b.easing, d)
    }
}(jQuery),
function (a) {
    a.effects.effect.fade = function (b, c) {
        var d = a(this),
            e = a.effects.setMode(d, b.mode || "toggle");
        d.animate({
            opacity: e
        }, {
            queue: !1,
            duration: b.duration,
            easing: b.easing,
            complete: c
        })
    }
}(jQuery),
function (a) {
    a.effects.effect.fold = function (b, c) {
        var d, e, f = a(this),
            g = ["position", "top", "bottom", "left", "right", "height", "width"],
            h = a.effects.setMode(f, b.mode || "hide"),
            i = "show" === h,
            j = "hide" === h,
            k = b.size || 15,
            l = /([0-9]+)%/.exec(k),
            m = !!b.horizFirst,
            n = i !== m,
            o = n ? ["width", "height"] : ["height", "width"],
            p = b.duration / 2,
            q = {},
            r = {};
        a.effects.save(f, g), f.show(), d = a.effects.createWrapper(f).css({
            overflow: "hidden"
        }), e = n ? [d.width(), d.height()] : [d.height(), d.width()], l && (k = parseInt(l[1], 10) / 100 * e[j ? 0 : 1]), i && d.css(m ? {
            height: 0,
            width: k
        } : {
            height: k,
            width: 0
        }), q[o[0]] = i ? e[0] : k, r[o[1]] = i ? e[1] : 0, d.animate(q, p, b.easing).animate(r, p, b.easing, function () {
            j && f.hide(), a.effects.restore(f, g), a.effects.removeWrapper(f), c()
        })
    }
}(jQuery),
function (a) {
    a.effects.effect.highlight = function (b, c) {
        var d = a(this),
            e = ["backgroundImage", "backgroundColor", "opacity"],
            f = a.effects.setMode(d, b.mode || "show"),
            g = {
                backgroundColor: d.css("backgroundColor")
            };
        "hide" === f && (g.opacity = 0), a.effects.save(d, e), d.show().css({
            backgroundImage: "none",
            backgroundColor: b.color || "#ffff99"
        }).animate(g, {
            queue: !1,
            duration: b.duration,
            easing: b.easing,
            complete: function () {
                "hide" === f && d.hide(), a.effects.restore(d, e), c()
            }
        })
    }
}(jQuery),
function (a) {
    a.effects.effect.pulsate = function (b, c) {
        var d, e = a(this),
            f = a.effects.setMode(e, b.mode || "show"),
            g = "show" === f,
            h = "hide" === f,
            i = g || "hide" === f,
            j = 2 * (b.times || 5) + (i ? 1 : 0),
            k = b.duration / j,
            l = 0,
            m = e.queue(),
            n = m.length;
        for ((g || !e.is(":visible")) && (e.css("opacity", 0).show(), l = 1), d = 1; j > d; d++) e.animate({
            opacity: l
        }, k, b.easing), l = 1 - l;
        e.animate({
            opacity: l
        }, k, b.easing), e.queue(function () {
            h && e.hide(), c()
        }), n > 1 && m.splice.apply(m, [1, 0].concat(m.splice(n, j + 1))), e.dequeue()
    }
}(jQuery),
function (a) {
    a.effects.effect.puff = function (b, c) {
        var d = a(this),
            e = a.effects.setMode(d, b.mode || "hide"),
            f = "hide" === e,
            g = parseInt(b.percent, 10) || 150,
            h = g / 100,
            i = {
                height: d.height(),
                width: d.width()
            };
        a.extend(b, {
            effect: "scale",
            queue: !1,
            fade: !0,
            mode: e,
            complete: c,
            percent: f ? g : 100,
            from: f ? i : {
                height: i.height * h,
                width: i.width * h
            }
        }), d.effect(b)
    }, a.effects.effect.scale = function (b, c) {
        var d = a(this),
            e = a.extend(!0, {}, b),
            f = a.effects.setMode(d, b.mode || "effect"),
            g = parseInt(b.percent, 10) || (0 === parseInt(b.percent, 10) ? 0 : "hide" === f ? 0 : 100),
            h = b.direction || "both",
            i = b.origin,
            j = {
                height: d.height(),
                width: d.width(),
                outerHeight: d.outerHeight(),
                outerWidth: d.outerWidth()
            },
            k = {
                y: "horizontal" !== h ? g / 100 : 1,
                x: "vertical" !== h ? g / 100 : 1
            };
        e.effect = "size", e.queue = !1, e.complete = c, "effect" !== f && (e.origin = i || ["middle", "center"], e.restore = !0), e.from = b.from || ("show" === f ? {
            height: 0,
            width: 0
        } : j), e.to = {
            height: j.height * k.y,
            width: j.width * k.x,
            outerHeight: j.outerHeight * k.y,
            outerWidth: j.outerWidth * k.x
        }, e.fade && ("show" === f && (e.from.opacity = 0, e.to.opacity = 1), "hide" === f && (e.from.opacity = 1, e.to.opacity = 0)), d.effect(e)
    }, a.effects.effect.size = function (b, c) {
        var d, e, f, g = a(this),
            h = ["position", "top", "bottom", "left", "right", "width", "height", "overflow", "opacity"],
            i = ["position", "top", "bottom", "left", "right", "overflow", "opacity"],
            j = ["width", "height", "overflow"],
            k = ["fontSize"],
            l = ["borderTopWidth", "borderBottomWidth", "paddingTop", "paddingBottom"],
            m = ["borderLeftWidth", "borderRightWidth", "paddingLeft", "paddingRight"],
            n = a.effects.setMode(g, b.mode || "effect"),
            o = b.restore || "effect" !== n,
            p = b.scale || "both",
            q = b.origin || ["middle", "center"],
            r = g.css("position"),
            s = o ? h : i,
            t = {
                height: 0,
                width: 0
            };
        "show" === n && g.show(), d = {
            height: g.height(),
            width: g.width(),
            outerHeight: g.outerHeight(),
            outerWidth: g.outerWidth()
        }, "toggle" === b.mode && "show" === n ? (g.from = b.to || t, g.to = b.from || d) : (g.from = b.from || ("show" === n ? t : d), g.to = b.to || ("hide" === n ? t : d)), f = {
            from: {
                y: g.from.height / d.height,
                x: g.from.width / d.width
            },
            to: {
                y: g.to.height / d.height,
                x: g.to.width / d.width
            }
        }, ("box" === p || "both" === p) && (f.from.y !== f.to.y && (s = s.concat(l), g.from = a.effects.setTransition(g, l, f.from.y, g.from), g.to = a.effects.setTransition(g, l, f.to.y, g.to)), f.from.x !== f.to.x && (s = s.concat(m), g.from = a.effects.setTransition(g, m, f.from.x, g.from), g.to = a.effects.setTransition(g, m, f.to.x, g.to))), ("content" === p || "both" === p) && f.from.y !== f.to.y && (s = s.concat(k).concat(j), g.from = a.effects.setTransition(g, k, f.from.y, g.from), g.to = a.effects.setTransition(g, k, f.to.y, g.to)), a.effects.save(g, s), g.show(), a.effects.createWrapper(g), g.css("overflow", "hidden").css(g.from), q && (e = a.effects.getBaseline(q, d), g.from.top = (d.outerHeight - g.outerHeight()) * e.y, g.from.left = (d.outerWidth - g.outerWidth()) * e.x, g.to.top = (d.outerHeight - g.to.outerHeight) * e.y, g.to.left = (d.outerWidth - g.to.outerWidth) * e.x), g.css(g.from), ("content" === p || "both" === p) && (l = l.concat(["marginTop", "marginBottom"]).concat(k), m = m.concat(["marginLeft", "marginRight"]), j = h.concat(l).concat(m), g.find("*[width]").each(function () {
            var c = a(this),
                d = {
                    height: c.height(),
                    width: c.width()
                };
            o && a.effects.save(c, j), c.from = {
                height: d.height * f.from.y,
                width: d.width * f.from.x
            }, c.to = {
                height: d.height * f.to.y,
                width: d.width * f.to.x
            }, f.from.y !== f.to.y && (c.from = a.effects.setTransition(c, l, f.from.y, c.from), c.to = a.effects.setTransition(c, l, f.to.y, c.to)), f.from.x !== f.to.x && (c.from = a.effects.setTransition(c, m, f.from.x, c.from), c.to = a.effects.setTransition(c, m, f.to.x, c.to)), c.css(c.from), c.animate(c.to, b.duration, b.easing, function () {
                o && a.effects.restore(c, j)
            })
        })), g.animate(g.to, {
            queue: !1,
            duration: b.duration,
            easing: b.easing,
            complete: function () {
                0 === g.to.opacity && g.css("opacity", g.from.opacity), "hide" === n && g.hide(), a.effects.restore(g, s), o || ("static" === r ? g.css({
                    position: "relative",
                    top: g.to.top,
                    left: g.to.left
                }) : a.each(["top", "left"], function (a, b) {
                    g.css(b, function (b, c) {
                        var d = parseInt(c, 10),
                            e = a ? g.to.left : g.to.top;
                        return "auto" === c ? e + "px" : d + e + "px"
                    })
                })), a.effects.removeWrapper(g), c()
            }
        })
    }
}(jQuery),
function (a) {
    a.effects.effect.shake = function (b, c) {
        var d, e = a(this),
            f = ["position", "top", "bottom", "left", "right", "height", "width"],
            g = a.effects.setMode(e, b.mode || "effect"),
            h = b.direction || "left",
            i = b.distance || 20,
            j = b.times || 3,
            k = 2 * j + 1,
            l = Math.round(b.duration / k),
            m = "up" === h || "down" === h ? "top" : "left",
            n = "up" === h || "left" === h,
            o = {},
            p = {},
            q = {},
            r = e.queue(),
            s = r.length;
        for (a.effects.save(e, f), e.show(), a.effects.createWrapper(e), o[m] = (n ? "-=" : "+=") + i, p[m] = (n ? "+=" : "-=") + 2 * i, q[m] = (n ? "-=" : "+=") + 2 * i, e.animate(o, l, b.easing), d = 1; j > d; d++) e.animate(p, l, b.easing).animate(q, l, b.easing);
        e.animate(p, l, b.easing).animate(o, l / 2, b.easing).queue(function () {
            "hide" === g && e.hide(), a.effects.restore(e, f), a.effects.removeWrapper(e), c()
        }), s > 1 && r.splice.apply(r, [1, 0].concat(r.splice(s, k + 1))), e.dequeue()
    }
}(jQuery),
function (a) {
    a.effects.effect.slide = function (b, c) {
        var d, e = a(this),
            f = ["position", "top", "bottom", "left", "right", "width", "height"],
            g = a.effects.setMode(e, b.mode || "show"),
            h = "show" === g,
            i = b.direction || "left",
            j = "up" === i || "down" === i ? "top" : "left",
            k = "up" === i || "left" === i,
            l = {};
        a.effects.save(e, f), e.show(), d = b.distance || e["top" === j ? "outerHeight" : "outerWidth"](!0), a.effects.createWrapper(e).css({
            overflow: "hidden"
        }), h && e.css(j, k ? isNaN(d) ? "-" + d : -d : d), l[j] = (h ? k ? "+=" : "-=" : k ? "-=" : "+=") + d, e.animate(l, {
            queue: !1,
            duration: b.duration,
            easing: b.easing,
            complete: function () {
                "hide" === g && e.hide(), a.effects.restore(e, f), a.effects.removeWrapper(e), c()
            }
        })
    }
}(jQuery),
function (a) {
    a.effects.effect.transfer = function (b, c) {
        var d = a(this),
            e = a(b.to),
            f = "fixed" === e.css("position"),
            g = a("body"),
            h = f ? g.scrollTop() : 0,
            i = f ? g.scrollLeft() : 0,
            j = e.offset(),
            k = {
                top: j.top - h,
                left: j.left - i,
                height: e.innerHeight(),
                width: e.innerWidth()
            },
            l = d.offset(),
            m = a('<div class="ui-effects-transfer"></div>').appendTo(document.body).addClass(b.className).css({
                top: l.top - h,
                left: l.left - i,
                height: d.innerHeight(),
                width: d.innerWidth(),
                position: f ? "fixed" : "absolute"
            }).animate(k, b.duration, b.easing, function () {
                m.remove(), c()
            })
    }
}(jQuery),
function (a) {
    var b = !1;
    a.widget("ui.menu", {
        version: "1.9.1",
        defaultElement: "<ul>",
        delay: 300,
        options: {
            icons: {
                submenu: "ui-icon-carat-1-e"
            },
            menus: "ul",
            position: {
                my: "left top",
                at: "right top"
            },
            role: "menu",
            blur: null,
            focus: null,
            select: null
        },
        _create: function () {
            this.activeMenu = this.element, this.element.uniqueId().addClass("ui-menu ui-widget ui-widget-content ui-corner-all").toggleClass("ui-menu-icons", !!this.element.find(".ui-icon").length).attr({
                role: this.options.role,
                tabIndex: 0
            }).bind("click" + this.eventNamespace, a.proxy(function (a) {
                this.options.disabled && a.preventDefault()
            }, this)), this.options.disabled && this.element.addClass("ui-state-disabled").attr("aria-disabled", "true"), this._on({
                "mousedown .ui-menu-item > a": function (a) {
                    a.preventDefault()
                },
                "click .ui-state-disabled > a": function (a) {
                    a.preventDefault()
                },
                "click .ui-menu-item:has(a)": function (c) {
                    var d = a(c.target).closest(".ui-menu-item");
                    !b && d.not(".ui-state-disabled").length && (b = !0, this.select(c), d.has(".ui-menu").length ? this.expand(c) : this.element.is(":focus") || (this.element.trigger("focus", [!0]), this.active && 1 === this.active.parents(".ui-menu").length && clearTimeout(this.timer)))
                },
                "mouseenter .ui-menu-item": function (b) {
                    var c = a(b.currentTarget);
                    c.siblings().children(".ui-state-active").removeClass("ui-state-active"), this.focus(b, c)
                },
                mouseleave: "collapseAll",
                "mouseleave .ui-menu": "collapseAll",
                focus: function (a, b) {
                    var c = this.active || this.element.children(".ui-menu-item").eq(0);
                    b || this.focus(a, c)
                },
                blur: function (b) {
                    this._delay(function () {
                        a.contains(this.element[0], this.document[0].activeElement) || this.collapseAll(b)
                    })
                },
                keydown: "_keydown"
            }), this.refresh(), this._on(this.document, {
                click: function (c) {
                    a(c.target).closest(".ui-menu").length || this.collapseAll(c), b = !1
                }
            })
        },
        _destroy: function () {
            this.element.removeAttr("aria-activedescendant").find(".ui-menu").andSelf().removeClass("ui-menu ui-widget ui-widget-content ui-corner-all ui-menu-icons").removeAttr("role").removeAttr("tabIndex").removeAttr("aria-labelledby").removeAttr("aria-expanded").removeAttr("aria-hidden").removeAttr("aria-disabled").removeUniqueId().show(), this.element.find(".ui-menu-item").removeClass("ui-menu-item").removeAttr("role").removeAttr("aria-disabled").children("a").removeUniqueId().removeClass("ui-corner-all ui-state-hover").removeAttr("tabIndex").removeAttr("role").removeAttr("aria-haspopup").children().each(function () {
                var b = a(this);
                b.data("ui-menu-submenu-carat") && b.remove()
            }), this.element.find(".ui-menu-divider").removeClass("ui-menu-divider ui-widget-content")
        },
        _keydown: function (b) {
            function c(a) {
                return a.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&")
            }
            var d, e, f, g, h, i = !0;
            switch (b.keyCode) {
            case a.ui.keyCode.PAGE_UP:
                this.previousPage(b);
                break;
            case a.ui.keyCode.PAGE_DOWN:
                this.nextPage(b);
                break;
            case a.ui.keyCode.HOME:
                this._move("first", "first", b);
                break;
            case a.ui.keyCode.END:
                this._move("last", "last", b);
                break;
            case a.ui.keyCode.UP:
                this.previous(b);
                break;
            case a.ui.keyCode.DOWN:
                this.next(b);
                break;
            case a.ui.keyCode.LEFT:
                this.collapse(b);
                break;
            case a.ui.keyCode.RIGHT:
                this.active && !this.active.is(".ui-state-disabled") && this.expand(b);
                break;
            case a.ui.keyCode.ENTER:
            case a.ui.keyCode.SPACE:
                this._activate(b);
                break;
            case a.ui.keyCode.ESCAPE:
                this.collapse(b);
                break;
            default:
                i = !1, e = this.previousFilter || "", f = String.fromCharCode(b.keyCode), g = !1, clearTimeout(this.filterTimer), f === e ? g = !0 : f = e + f, h = new RegExp("^" + c(f), "i"), d = this.activeMenu.children(".ui-menu-item").filter(function () {
                    return h.test(a(this).children("a").text())
                }), d = g && -1 !== d.index(this.active.next()) ? this.active.nextAll(".ui-menu-item") : d, d.length || (f = String.fromCharCode(b.keyCode), h = new RegExp("^" + c(f), "i"), d = this.activeMenu.children(".ui-menu-item").filter(function () {
                    return h.test(a(this).children("a").text())
                })), d.length ? (this.focus(b, d), d.length > 1 ? (this.previousFilter = f, this.filterTimer = this._delay(function () {
                    delete this.previousFilter
                }, 1e3)) : delete this.previousFilter) : delete this.previousFilter
            }
            i && b.preventDefault()
        },
        _activate: function (a) {
            this.active.is(".ui-state-disabled") || (this.active.children("a[aria-haspopup='true']").length ? this.expand(a) : this.select(a))
        },
        refresh: function () {
            var b, c = this.options.icons.submenu,
                d = this.element.find(this.options.menus + ":not(.ui-menu)").addClass("ui-menu ui-widget ui-widget-content ui-corner-all").hide().attr({
                    role: this.options.role,
                    "aria-hidden": "true",
                    "aria-expanded": "false"
                });
            b = d.add(this.element), b.children(":not(.ui-menu-item):has(a)").addClass("ui-menu-item").attr("role", "presentation").children("a").uniqueId().addClass("ui-corner-all").attr({
                tabIndex: -1,
                role: this._itemRole()
            }), b.children(":not(.ui-menu-item)").each(function () {
                var b = a(this);
                /[^\-—–\s]/.test(b.text()) || b.addClass("ui-widget-content ui-menu-divider")
            }), b.children(".ui-state-disabled").attr("aria-disabled", "true"), d.each(function () {
                var b = a(this),
                    d = b.prev("a"),
                    e = a("<span>").addClass("ui-menu-icon ui-icon " + c).data("ui-menu-submenu-carat", !0);
                d.attr("aria-haspopup", "true").prepend(e), b.attr("aria-labelledby", d.attr("id"))
            }), this.active && !a.contains(this.element[0], this.active[0]) && this.blur()
        },
        _itemRole: function () {
            return {
                menu: "menuitem",
                listbox: "option"
            }[this.options.role]
        },
        focus: function (a, b) {
            var c, d;
            this.blur(a, a && "focus" === a.type), this._scrollIntoView(b), this.active = b.first(), d = this.active.children("a").addClass("ui-state-focus"), this.options.role && this.element.attr("aria-activedescendant", d.attr("id")), this.active.parent().closest(".ui-menu-item").children("a:first").addClass("ui-state-active"), a && "keydown" === a.type ? this._close() : this.timer = this._delay(function () {
                this._close()
            }, this.delay), c = b.children(".ui-menu"), c.length && /^mouse/.test(a.type) && this._startOpening(c), this.activeMenu = b.parent(), this._trigger("focus", a, {
                item: b
            })
        },
        _scrollIntoView: function (b) {
            var c, d, e, f, g, h;
            this._hasScroll() && (c = parseFloat(a.css(this.activeMenu[0], "borderTopWidth")) || 0, d = parseFloat(a.css(this.activeMenu[0], "paddingTop")) || 0, e = b.offset().top - this.activeMenu.offset().top - c - d, f = this.activeMenu.scrollTop(), g = this.activeMenu.height(), h = b.height(), 0 > e ? this.activeMenu.scrollTop(f + e) : e + h > g && this.activeMenu.scrollTop(f + e - g + h))
        },
        blur: function (a, b) {
            b || clearTimeout(this.timer), this.active && (this.active.children("a").removeClass("ui-state-focus"), this.active = null, this._trigger("blur", a, {
                item: this.active
            }))
        },
        _startOpening: function (a) {
            clearTimeout(this.timer), "true" === a.attr("aria-hidden") && (this.timer = this._delay(function () {
                this._close(), this._open(a)
            }, this.delay))
        },
        _open: function (b) {
            var c = a.extend({
                of: this.active
            }, this.options.position);
            clearTimeout(this.timer), this.element.find(".ui-menu").not(b.parents(".ui-menu")).hide().attr("aria-hidden", "true"), b.show().removeAttr("aria-hidden").attr("aria-expanded", "true").position(c)
        },
        collapseAll: function (b, c) {
            clearTimeout(this.timer), this.timer = this._delay(function () {
                var d = c ? this.element : a(b && b.target).closest(this.element.find(".ui-menu"));
                d.length || (d = this.element), this._close(d), this.blur(b), this.activeMenu = d
            }, this.delay)
        },
        _close: function (a) {
            a || (a = this.active ? this.active.parent() : this.element), a.find(".ui-menu").hide().attr("aria-hidden", "true").attr("aria-expanded", "false").end().find("a.ui-state-active").removeClass("ui-state-active")
        },
        collapse: function (a) {
            var b = this.active && this.active.parent().closest(".ui-menu-item", this.element);
            b && b.length && (this._close(), this.focus(a, b))
        },
        expand: function (a) {
            var b = this.active && this.active.children(".ui-menu ").children(".ui-menu-item").first();
            b && b.length && (this._open(b.parent()), this._delay(function () {
                this.focus(a, b)
            }))
        },
        next: function (a) {
            this._move("next", "first", a)
        },
        previous: function (a) {
            this._move("prev", "last", a)
        },
        isFirstItem: function () {
            return this.active && !this.active.prevAll(".ui-menu-item").length
        },
        isLastItem: function () {
            return this.active && !this.active.nextAll(".ui-menu-item").length
        },
        _move: function (a, b, c) {
            var d;
            this.active && (d = "first" === a || "last" === a ? this.active["first" === a ? "prevAll" : "nextAll"](".ui-menu-item").eq(-1) : this.active[a + "All"](".ui-menu-item").eq(0)), d && d.length && this.active || (d = this.activeMenu.children(".ui-menu-item")[b]()), this.focus(c, d)
        },
        nextPage: function (b) {
            var c, d, e;
            return this.active ? void(this.isLastItem() || (this._hasScroll() ? (d = this.active.offset().top, e = this.element.height(), this.active.nextAll(".ui-menu-item").each(function () {
                return c = a(this), c.offset().top - d - e < 0
            }), this.focus(b, c)) : this.focus(b, this.activeMenu.children(".ui-menu-item")[this.active ? "last" : "first"]()))) : void this.next(b)
        },
        previousPage: function (b) {
            var c, d, e;
            return this.active ? void(this.isFirstItem() || (this._hasScroll() ? (d = this.active.offset().top, e = this.element.height(), this.active.prevAll(".ui-menu-item").each(function () {
                return c = a(this), c.offset().top - d + e > 0
            }), this.focus(b, c)) : this.focus(b, this.activeMenu.children(".ui-menu-item").first()))) : void this.next(b)
        },
        _hasScroll: function () {
            return this.element.outerHeight() < this.element.prop("scrollHeight")
        },
        select: function (b) {
            this.active = this.active || a(b.target).closest(".ui-menu-item");
            var c = {
                item: this.active
            };
            this.active.has(".ui-menu").length || this.collapseAll(b, !0), this._trigger("select", b, c)
        }
    })
}(jQuery),
function (a, b) {
    function c(a, b, c) {
        return [parseInt(a[0], 10) * (m.test(a[0]) ? b / 100 : 1), parseInt(a[1], 10) * (m.test(a[1]) ? c / 100 : 1)]
    }

    function d(b, c) {
        return parseInt(a.css(b, c), 10) || 0
    }
    a.ui = a.ui || {};
    var e, f = Math.max,
        g = Math.abs,
        h = Math.round,
        i = /left|center|right/,
        j = /top|center|bottom/,
        k = /[\+\-]\d+%?/,
        l = /^\w+/,
        m = /%$/,
        n = a.fn.position;
    a.position = {
        scrollbarWidth: function () {
            if (e !== b) return e;
            var c, d, f = a("<div style='display:block;width:50px;height:50px;overflow:hidden;'><div style='height:100px;width:auto;'></div></div>"),
                g = f.children()[0];
            return a("body").append(f), c = g.offsetWidth, f.css("overflow", "scroll"), d = g.offsetWidth, c === d && (d = f[0].clientWidth), f.remove(), e = c - d
        },
        getScrollInfo: function (b) {
            var c = b.isWindow ? "" : b.element.css("overflow-x"),
                d = b.isWindow ? "" : b.element.css("overflow-y"),
                e = "scroll" === c || "auto" === c && b.width < b.element[0].scrollWidth,
                f = "scroll" === d || "auto" === d && b.height < b.element[0].scrollHeight;
            return {
                width: e ? a.position.scrollbarWidth() : 0,
                height: f ? a.position.scrollbarWidth() : 0
            }
        },
        getWithinInfo: function (b) {
            var c = a(b || window),
                d = a.isWindow(c[0]);
            return {
                element: c,
                isWindow: d,
                offset: c.offset() || {
                    left: 0,
                    top: 0
                },
                scrollLeft: c.scrollLeft(),
                scrollTop: c.scrollTop(),
                width: d ? c.width() : c.outerWidth(),
                height: d ? c.height() : c.outerHeight()
            }
        }
    }, a.fn.position = function (b) {
        if (!b || !b.of) return n.apply(this, arguments);
        b = a.extend({}, b);
        var e, m, o, p, q, r = a(b.of),
            s = a.position.getWithinInfo(b.within),
            t = a.position.getScrollInfo(s),
            u = r[0],
            v = (b.collision || "flip").split(" "),
            w = {};
        return 9 === u.nodeType ? (m = r.width(), o = r.height(), p = {
            top: 0,
            left: 0
        }) : a.isWindow(u) ? (m = r.width(), o = r.height(), p = {
            top: r.scrollTop(),
            left: r.scrollLeft()
        }) : u.preventDefault ? (b.at = "left top", m = o = 0, p = {
            top: u.pageY,
            left: u.pageX
        }) : (m = r.outerWidth(), o = r.outerHeight(), p = r.offset()), q = a.extend({}, p), a.each(["my", "at"], function () {
            var a, c, d = (b[this] || "").split(" ");
            1 === d.length && (d = i.test(d[0]) ? d.concat(["center"]) : j.test(d[0]) ? ["center"].concat(d) : ["center", "center"]), d[0] = i.test(d[0]) ? d[0] : "center", d[1] = j.test(d[1]) ? d[1] : "center", a = k.exec(d[0]), c = k.exec(d[1]), w[this] = [a ? a[0] : 0, c ? c[0] : 0], b[this] = [l.exec(d[0])[0], l.exec(d[1])[0]]
        }), 1 === v.length && (v[1] = v[0]), "right" === b.at[0] ? q.left += m : "center" === b.at[0] && (q.left += m / 2), "bottom" === b.at[1] ? q.top += o : "center" === b.at[1] && (q.top += o / 2), e = c(w.at, m, o), q.left += e[0], q.top += e[1], this.each(function () {
            var i, j, k = a(this),
                l = k.outerWidth(),
                n = k.outerHeight(),
                u = d(this, "marginLeft"),
                x = d(this, "marginTop"),
                y = l + u + d(this, "marginRight") + t.width,
                z = n + x + d(this, "marginBottom") + t.height,
                A = a.extend({}, q),
                B = c(w.my, k.outerWidth(), k.outerHeight());
            "right" === b.my[0] ? A.left -= l : "center" === b.my[0] && (A.left -= l / 2), "bottom" === b.my[1] ? A.top -= n : "center" === b.my[1] && (A.top -= n / 2), A.left += B[0], A.top += B[1], a.support.offsetFractions || (A.left = h(A.left), A.top = h(A.top)), i = {
                marginLeft: u,
                marginTop: x
            }, a.each(["left", "top"], function (c, d) {
                a.ui.position[v[c]] && a.ui.position[v[c]][d](A, {
                    targetWidth: m,
                    targetHeight: o,
                    elemWidth: l,
                    elemHeight: n,
                    collisionPosition: i,
                    collisionWidth: y,
                    collisionHeight: z,
                    offset: [e[0] + B[0], e[1] + B[1]],
                    my: b.my,
                    at: b.at,
                    within: s,
                    elem: k
                })
            }), a.fn.bgiframe && k.bgiframe(), b.using && (j = function (a) {
                var c = p.left - A.left,
                    d = c + m - l,
                    e = p.top - A.top,
                    h = e + o - n,
                    i = {
                        target: {
                            element: r,
                            left: p.left,
                            top: p.top,
                            width: m,
                            height: o
                        },
                        element: {
                            element: k,
                            left: A.left,
                            top: A.top,
                            width: l,
                            height: n
                        },
                        horizontal: 0 > d ? "left" : c > 0 ? "right" : "center",
                        vertical: 0 > h ? "top" : e > 0 ? "bottom" : "middle"
                    };
                l > m && g(c + d) < m && (i.horizontal = "center"), n > o && g(e + h) < o && (i.vertical = "middle"), i.important = f(g(c), g(d)) > f(g(e), g(h)) ? "horizontal" : "vertical", b.using.call(this, a, i)
            }), k.offset(a.extend(A, {
                using: j
            }))
        })
    }, a.ui.position = {
        fit: {
            left: function (a, b) {
                var c, d = b.within,
                    e = d.isWindow ? d.scrollLeft : d.offset.left,
                    g = d.width,
                    h = a.left - b.collisionPosition.marginLeft,
                    i = e - h,
                    j = h + b.collisionWidth - g - e;
                b.collisionWidth > g ? i > 0 && 0 >= j ? (c = a.left + i + b.collisionWidth - g - e, a.left += i - c) : a.left = j > 0 && 0 >= i ? e : i > j ? e + g - b.collisionWidth : e : i > 0 ? a.left += i : j > 0 ? a.left -= j : a.left = f(a.left - h, a.left)
            },
            top: function (a, b) {
                var c, d = b.within,
                    e = d.isWindow ? d.scrollTop : d.offset.top,
                    g = b.within.height,
                    h = a.top - b.collisionPosition.marginTop,
                    i = e - h,
                    j = h + b.collisionHeight - g - e;
                b.collisionHeight > g ? i > 0 && 0 >= j ? (c = a.top + i + b.collisionHeight - g - e, a.top += i - c) : a.top = j > 0 && 0 >= i ? e : i > j ? e + g - b.collisionHeight : e : i > 0 ? a.top += i : j > 0 ? a.top -= j : a.top = f(a.top - h, a.top)
            }
        },
        flip: {
            left: function (a, b) {
                var c, d, e = b.within,
                    f = e.offset.left + e.scrollLeft,
                    h = e.width,
                    i = e.isWindow ? e.scrollLeft : e.offset.left,
                    j = a.left - b.collisionPosition.marginLeft,
                    k = j - i,
                    l = j + b.collisionWidth - h - i,
                    m = "left" === b.my[0] ? -b.elemWidth : "right" === b.my[0] ? b.elemWidth : 0,
                    n = "left" === b.at[0] ? b.targetWidth : "right" === b.at[0] ? -b.targetWidth : 0,
                    o = -2 * b.offset[0];
                0 > k ? (c = a.left + m + n + o + b.collisionWidth - h - f, (0 > c || c < g(k)) && (a.left += m + n + o)) : l > 0 && (d = a.left - b.collisionPosition.marginLeft + m + n + o - i, (d > 0 || g(d) < l) && (a.left += m + n + o))
            },
            top: function (a, b) {
                var c, d, e = b.within,
                    f = e.offset.top + e.scrollTop,
                    h = e.height,
                    i = e.isWindow ? e.scrollTop : e.offset.top,
                    j = a.top - b.collisionPosition.marginTop,
                    k = j - i,
                    l = j + b.collisionHeight - h - i,
                    m = "top" === b.my[1],
                    n = m ? -b.elemHeight : "bottom" === b.my[1] ? b.elemHeight : 0,
                    o = "top" === b.at[1] ? b.targetHeight : "bottom" === b.at[1] ? -b.targetHeight : 0,
                    p = -2 * b.offset[1];
                0 > k ? (d = a.top + n + o + p + b.collisionHeight - h - f, a.top + n + o + p > k && (0 > d || d < g(k)) && (a.top += n + o + p)) : l > 0 && (c = a.top - b.collisionPosition.marginTop + n + o + p - i, a.top + n + o + p > l && (c > 0 || g(c) < l) && (a.top += n + o + p))
            }
        },
        flipfit: {
            left: function () {
                a.ui.position.flip.left.apply(this, arguments), a.ui.position.fit.left.apply(this, arguments)
            },
            top: function () {
                a.ui.position.flip.top.apply(this, arguments), a.ui.position.fit.top.apply(this, arguments)
            }
        }
    },
    function () {
        var b, c, d, e, f, g = document.getElementsByTagName("body")[0],
            h = document.createElement("div");
        b = document.createElement(g ? "div" : "body"), d = {
            visibility: "hidden",
            width: 0,
            height: 0,
            border: 0,
            margin: 0,
            background: "none"
        }, g && a.extend(d, {
            position: "absolute",
            left: "-1000px",
            top: "-1000px"
        });
        for (f in d) b.style[f] = d[f];
        b.appendChild(h), c = g || document.documentElement, c.insertBefore(b, c.firstChild), h.style.cssText = "position: absolute; left: 10.7432222px;", e = a(h).offset().left, a.support.offsetFractions = e > 10 && 11 > e, b.innerHTML = "", c.removeChild(b)
    }(), a.uiBackCompat !== !1 && ! function (a) {
        var c = a.fn.position;
        a.fn.position = function (d) {
            if (!d || !d.offset) return c.call(this, d);
            var e = d.offset.split(" "),
                f = d.at.split(" ");
            return 1 === e.length && (e[1] = e[0]), /^\d/.test(e[0]) && (e[0] = "+" + e[0]), /^\d/.test(e[1]) && (e[1] = "+" + e[1]), 1 === f.length && (/left|center|right/.test(f[0]) ? f[1] = "center" : (f[1] = f[0], f[0] = "center")), c.call(this, a.extend(d, {
                at: f[0] + e[0] + " " + f[1] + e[1],
                offset: b
            }))
        }
    }(jQuery)
}(jQuery),
function (a, b) {
    a.widget("ui.progressbar", {
        version: "1.9.1",
        options: {
            value: 0,
            max: 100
        },
        min: 0,
        _create: function () {
            this.element.addClass("ui-progressbar ui-widget ui-widget-content ui-corner-all").attr({
                role: "progressbar",
                "aria-valuemin": this.min,
                "aria-valuemax": this.options.max,
                "aria-valuenow": this._value()
            }), this.valueDiv = a("<div class='ui-progressbar-value ui-widget-header ui-corner-left'></div>").appendTo(this.element), this.oldValue = this._value(), this._refreshValue()
        },
        _destroy: function () {
            this.element.removeClass("ui-progressbar ui-widget ui-widget-content ui-corner-all").removeAttr("role").removeAttr("aria-valuemin").removeAttr("aria-valuemax").removeAttr("aria-valuenow"), this.valueDiv.remove()
        },
        value: function (a) {
            return a === b ? this._value() : (this._setOption("value", a), this)
        },
        _setOption: function (a, b) {
            "value" === a && (this.options.value = b, this._refreshValue(), this._value() === this.options.max && this._trigger("complete")), this._super(a, b)
        },
        _value: function () {
            var a = this.options.value;
            return "number" != typeof a && (a = 0), Math.min(this.options.max, Math.max(this.min, a))
        },
        _percentage: function () {
            return 100 * this._value() / this.options.max
        },
        _refreshValue: function () {
            var a = this.value(),
                b = this._percentage();
            this.oldValue !== a && (this.oldValue = a, this._trigger("change")), this.valueDiv.toggle(a > this.min).toggleClass("ui-corner-right", a === this.options.max).width(b.toFixed(0) + "%"), this.element.attr("aria-valuenow", a)
        }
    })
}(jQuery),
function (a) {
    var b = 5;
    a.widget("ui.slider", a.ui.mouse, {
        version: "1.9.1",
        widgetEventPrefix: "slide",
        options: {
            animate: !1,
            distance: 0,
            max: 100,
            min: 0,
            orientation: "horizontal",
            range: !1,
            step: 1,
            value: 0,
            values: null
        },
        _create: function () {
            var c, d, e = this.options,
                f = this.element.find(".ui-slider-handle").addClass("ui-state-default ui-corner-all"),
                g = "<a class='ui-slider-handle ui-state-default ui-corner-all' href='#'></a>",
                h = [];
            for (this._keySliding = !1, this._mouseSliding = !1, this._animateOff = !0, this._handleIndex = null, this._detectOrientation(), this._mouseInit(), this.element.addClass("ui-slider ui-slider-" + this.orientation + " ui-widget ui-widget-content ui-corner-all" + (e.disabled ? " ui-slider-disabled ui-disabled" : "")), this.range = a([]), e.range && (e.range === !0 && (e.values || (e.values = [this._valueMin(), this._valueMin()]), e.values.length && 2 !== e.values.length && (e.values = [e.values[0], e.values[0]])), this.range = a("<div></div>").appendTo(this.element).addClass("ui-slider-range ui-widget-header" + ("min" === e.range || "max" === e.range ? " ui-slider-range-" + e.range : ""))), d = e.values && e.values.length || 1, c = f.length; d > c; c++) h.push(g);
            this.handles = f.add(a(h.join("")).appendTo(this.element)), this.handle = this.handles.eq(0), this.handles.add(this.range).filter("a").click(function (a) {
                a.preventDefault()
            }).mouseenter(function () {
                e.disabled || a(this).addClass("ui-state-hover")
            }).mouseleave(function () {
                a(this).removeClass("ui-state-hover")
            }).focus(function () {
                e.disabled ? a(this).blur() : (a(".ui-slider .ui-state-focus").removeClass("ui-state-focus"), a(this).addClass("ui-state-focus"))
            }).blur(function () {
                a(this).removeClass("ui-state-focus")
            }), this.handles.each(function (b) {
                a(this).data("ui-slider-handle-index", b)
            }), this._on(this.handles, {
                keydown: function (c) {
                    var d, e, f, g, h = a(c.target).data("ui-slider-handle-index");
                    switch (c.keyCode) {
                    case a.ui.keyCode.HOME:
                    case a.ui.keyCode.END:
                    case a.ui.keyCode.PAGE_UP:
                    case a.ui.keyCode.PAGE_DOWN:
                    case a.ui.keyCode.UP:
                    case a.ui.keyCode.RIGHT:
                    case a.ui.keyCode.DOWN:
                    case a.ui.keyCode.LEFT:
                        if (c.preventDefault(), !this._keySliding && (this._keySliding = !0, a(c.target).addClass("ui-state-active"), d = this._start(c, h), d === !1)) return
                    }
                    switch (g = this.options.step, e = f = this.options.values && this.options.values.length ? this.values(h) : this.value(), c.keyCode) {
                    case a.ui.keyCode.HOME:
                        f = this._valueMin();
                        break;
                    case a.ui.keyCode.END:
                        f = this._valueMax();
                        break;
                    case a.ui.keyCode.PAGE_UP:
                        f = this._trimAlignValue(e + (this._valueMax() - this._valueMin()) / b);
                        break;
                    case a.ui.keyCode.PAGE_DOWN:
                        f = this._trimAlignValue(e - (this._valueMax() - this._valueMin()) / b);
                        break;
                    case a.ui.keyCode.UP:
                    case a.ui.keyCode.RIGHT:
                        if (e === this._valueMax()) return;
                        f = this._trimAlignValue(e + g);
                        break;
                    case a.ui.keyCode.DOWN:
                    case a.ui.keyCode.LEFT:
                        if (e === this._valueMin()) return;
                        f = this._trimAlignValue(e - g)
                    }
                    this._slide(c, h, f)
                },
                keyup: function (b) {
                    var c = a(b.target).data("ui-slider-handle-index");
                    this._keySliding && (this._keySliding = !1, this._stop(b, c), this._change(b, c), a(b.target).removeClass("ui-state-active"))
                }
            }), this._refreshValue(), this._animateOff = !1
        },
        _destroy: function () {
            this.handles.remove(), this.range.remove(), this.element.removeClass("ui-slider ui-slider-horizontal ui-slider-vertical ui-slider-disabled ui-widget ui-widget-content ui-corner-all"), this._mouseDestroy()
        },
        _mouseCapture: function (b) {
            var c, d, e, f, g, h, i, j, k = this,
                l = this.options;
            return l.disabled ? !1 : (this.elementSize = {
                width: this.element.outerWidth(),
                height: this.element.outerHeight()
            }, this.elementOffset = this.element.offset(), c = {
                x: b.pageX,
                y: b.pageY
            }, d = this._normValueFromMouse(c), e = this._valueMax() - this._valueMin() + 1, this.handles.each(function (b) {
                var c = Math.abs(d - k.values(b));
                e > c && (e = c, f = a(this), g = b)
            }), l.range === !0 && this.values(1) === l.min && (g += 1, f = a(this.handles[g])), h = this._start(b, g), h === !1 ? !1 : (this._mouseSliding = !0, this._handleIndex = g, f.addClass("ui-state-active").focus(), i = f.offset(), j = !a(b.target).parents().andSelf().is(".ui-slider-handle"), this._clickOffset = j ? {
                left: 0,
                top: 0
            } : {
                left: b.pageX - i.left - f.width() / 2,
                top: b.pageY - i.top - f.height() / 2 - (parseInt(f.css("borderTopWidth"), 10) || 0) - (parseInt(f.css("borderBottomWidth"), 10) || 0) + (parseInt(f.css("marginTop"), 10) || 0)
            }, this.handles.hasClass("ui-state-hover") || this._slide(b, g, d), this._animateOff = !0, !0))
        },
        _mouseStart: function () {
            return !0
        },
        _mouseDrag: function (a) {
            var b = {
                    x: a.pageX,
                    y: a.pageY
                },
                c = this._normValueFromMouse(b);
            return this._slide(a, this._handleIndex, c), !1
        },
        _mouseStop: function (a) {
            return this.handles.removeClass("ui-state-active"), this._mouseSliding = !1, this._stop(a, this._handleIndex), this._change(a, this._handleIndex), this._handleIndex = null, this._clickOffset = null, this._animateOff = !1, !1
        },
        _detectOrientation: function () {
            this.orientation = "vertical" === this.options.orientation ? "vertical" : "horizontal"
        },
        _normValueFromMouse: function (a) {
            var b, c, d, e, f;
            return "horizontal" === this.orientation ? (b = this.elementSize.width, c = a.x - this.elementOffset.left - (this._clickOffset ? this._clickOffset.left : 0)) : (b = this.elementSize.height, c = a.y - this.elementOffset.top - (this._clickOffset ? this._clickOffset.top : 0)), d = c / b, d > 1 && (d = 1), 0 > d && (d = 0), "vertical" === this.orientation && (d = 1 - d), e = this._valueMax() - this._valueMin(), f = this._valueMin() + d * e, this._trimAlignValue(f)
        },
        _start: function (a, b) {
            var c = {
                handle: this.handles[b],
                value: this.value()
            };
            return this.options.values && this.options.values.length && (c.value = this.values(b), c.values = this.values()), this._trigger("start", a, c)
        },
        _slide: function (a, b, c) {
            var d, e, f;
            this.options.values && this.options.values.length ? (d = this.values(b ? 0 : 1), 2 === this.options.values.length && this.options.range === !0 && (0 === b && c > d || 1 === b && d > c) && (c = d), c !== this.values(b) && (e = this.values(), e[b] = c, f = this._trigger("slide", a, {
                handle: this.handles[b],
                value: c,
                values: e
            }), d = this.values(b ? 0 : 1), f !== !1 && this.values(b, c, !0))) : c !== this.value() && (f = this._trigger("slide", a, {
                handle: this.handles[b],
                value: c
            }), f !== !1 && this.value(c))
        },
        _stop: function (a, b) {
            var c = {
                handle: this.handles[b],
                value: this.value()
            };
            this.options.values && this.options.values.length && (c.value = this.values(b), c.values = this.values()), this._trigger("stop", a, c)
        },
        _change: function (a, b) {
            if (!this._keySliding && !this._mouseSliding) {
                var c = {
                    handle: this.handles[b],
                    value: this.value()
                };
                this.options.values && this.options.values.length && (c.value = this.values(b), c.values = this.values()), this._trigger("change", a, c)
            }
        },
        value: function (a) {
            return arguments.length ? (this.options.value = this._trimAlignValue(a), this._refreshValue(), void this._change(null, 0)) : this._value()
        },
        values: function (b, c) {
            var d, e, f;
            if (arguments.length > 1) return this.options.values[b] = this._trimAlignValue(c), this._refreshValue(), void this._change(null, b);
            if (!arguments.length) return this._values();
            if (!a.isArray(arguments[0])) return this.options.values && this.options.values.length ? this._values(b) : this.value();
            for (d = this.options.values, e = arguments[0], f = 0; f < d.length; f += 1) d[f] = this._trimAlignValue(e[f]), this._change(null, f);
            this._refreshValue()
        },
        _setOption: function (b, c) {
            var d, e = 0;
            switch (a.isArray(this.options.values) && (e = this.options.values.length), a.Widget.prototype._setOption.apply(this, arguments), b) {
            case "disabled":
                c ? (this.handles.filter(".ui-state-focus").blur(), this.handles.removeClass("ui-state-hover"), this.handles.prop("disabled", !0), this.element.addClass("ui-disabled")) : (this.handles.prop("disabled", !1), this.element.removeClass("ui-disabled"));
                break;
            case "orientation":
                this._detectOrientation(), this.element.removeClass("ui-slider-horizontal ui-slider-vertical").addClass("ui-slider-" + this.orientation), this._refreshValue();
                break;
            case "value":
                this._animateOff = !0, this._refreshValue(), this._change(null, 0), this._animateOff = !1;
                break;
            case "values":
                for (this._animateOff = !0, this._refreshValue(), d = 0; e > d; d += 1) this._change(null, d);
                this._animateOff = !1;
                break;
            case "min":
            case "max":
                this._animateOff = !0, this._refreshValue(), this._animateOff = !1
            }
        },
        _value: function () {
            var a = this.options.value;
            return a = this._trimAlignValue(a)
        },
        _values: function (a) {
            var b, c, d;
            if (arguments.length) return b = this.options.values[a], b = this._trimAlignValue(b);
            for (c = this.options.values.slice(), d = 0; d < c.length; d += 1) c[d] = this._trimAlignValue(c[d]);
            return c
        },
        _trimAlignValue: function (a) {
            if (a <= this._valueMin()) return this._valueMin();
            if (a >= this._valueMax()) return this._valueMax();
            var b = this.options.step > 0 ? this.options.step : 1,
                c = (a - this._valueMin()) % b,
                d = a - c;
            return 2 * Math.abs(c) >= b && (d += c > 0 ? b : -b), parseFloat(d.toFixed(5))
        },
        _valueMin: function () {
            return this.options.min
        },
        _valueMax: function () {
            return this.options.max
        },
        _refreshValue: function () {
            var b, c, d, e, f, g = this.options.range,
                h = this.options,
                i = this,
                j = this._animateOff ? !1 : h.animate,
                k = {};
            this.options.values && this.options.values.length ? this.handles.each(function (d) {
                c = (i.values(d) - i._valueMin()) / (i._valueMax() - i._valueMin()) * 100, k["horizontal" === i.orientation ? "left" : "bottom"] = c + "%", a(this).stop(1, 1)[j ? "animate" : "css"](k, h.animate), i.options.range === !0 && ("horizontal" === i.orientation ? (0 === d && i.range.stop(1, 1)[j ? "animate" : "css"]({
                    left: c + "%"
                }, h.animate), 1 === d && i.range[j ? "animate" : "css"]({
                    width: c - b + "%"
                }, {
                    queue: !1,
                    duration: h.animate
                })) : (0 === d && i.range.stop(1, 1)[j ? "animate" : "css"]({
                    bottom: c + "%"
                }, h.animate), 1 === d && i.range[j ? "animate" : "css"]({
                    height: c - b + "%"
                }, {
                    queue: !1,
                    duration: h.animate
                }))), b = c
            }) : (d = this.value(), e = this._valueMin(), f = this._valueMax(), c = f !== e ? (d - e) / (f - e) * 100 : 0, k["horizontal" === this.orientation ? "left" : "bottom"] = c + "%", this.handle.stop(1, 1)[j ? "animate" : "css"](k, h.animate), "min" === g && "horizontal" === this.orientation && this.range.stop(1, 1)[j ? "animate" : "css"]({
                width: c + "%"
            }, h.animate), "max" === g && "horizontal" === this.orientation && this.range[j ? "animate" : "css"]({
                width: 100 - c + "%"
            }, {
                queue: !1,
                duration: h.animate
            }), "min" === g && "vertical" === this.orientation && this.range.stop(1, 1)[j ? "animate" : "css"]({
                height: c + "%"
            }, h.animate), "max" === g && "vertical" === this.orientation && this.range[j ? "animate" : "css"]({
                height: 100 - c + "%"
            }, {
                queue: !1,
                duration: h.animate
            }))
        }
    })
}(jQuery),
function (a) {
    function b(a) {
        return function () {
            var b = this.element.val();
            a.apply(this, arguments), this._refresh(), b !== this.element.val() && this._trigger("change")
        }
    }
    a.widget("ui.spinner", {
        version: "1.9.1",
        defaultElement: "<input>",
        widgetEventPrefix: "spin",
        options: {
            culture: null,
            icons: {
                down: "ui-icon-triangle-1-s",
                up: "ui-icon-triangle-1-n"
            },
            incremental: !0,
            max: null,
            min: null,
            numberFormat: null,
            page: 10,
            step: 1,
            change: null,
            spin: null,
            start: null,
            stop: null
        },
        _create: function () {
            this._setOption("max", this.options.max), this._setOption("min", this.options.min), this._setOption("step", this.options.step), this._value(this.element.val(), !0), this._draw(), this._on(this._events), this._refresh(), this._on(this.window, {
                beforeunload: function () {
                    this.element.removeAttr("autocomplete")
                }
            })
        },
        _getCreateOptions: function () {
            var b = {},
                c = this.element;
            return a.each(["min", "max", "step"], function (a, d) {
                var e = c.attr(d);
                void 0 !== e && e.length && (b[d] = e)
            }), b
        },
        _events: {
            keydown: function (a) {
                this._start(a) && this._keydown(a) && a.preventDefault()
            },
            keyup: "_stop",
            focus: function () {
                this.previous = this.element.val()
            },
            blur: function (a) {
                return this.cancelBlur ? void delete this.cancelBlur : (this._refresh(), void(this.previous !== this.element.val() && this._trigger("change", a)))
            },
            mousewheel: function (a, b) {
                if (b) {
                    if (!this.spinning && !this._start(a)) return !1;
                    this._spin((b > 0 ? 1 : -1) * this.options.step, a), clearTimeout(this.mousewheelTimer), this.mousewheelTimer = this._delay(function () {
                        this.spinning && this._stop(a)
                    }, 100), a.preventDefault()
                }
            },
            "mousedown .ui-spinner-button": function (b) {
                function c() {
                    var a = this.element[0] === this.document[0].activeElement;
                    a || (this.element.focus(), this.previous = d, this._delay(function () {
                        this.previous = d
                    }))
                }
                var d;
                d = this.element[0] === this.document[0].activeElement ? this.previous : this.element.val(), b.preventDefault(), c.call(this), this.cancelBlur = !0, this._delay(function () {
                    delete this.cancelBlur, c.call(this)
                }), this._start(b) !== !1 && this._repeat(null, a(b.currentTarget).hasClass("ui-spinner-up") ? 1 : -1, b)
            },
            "mouseup .ui-spinner-button": "_stop",
            "mouseenter .ui-spinner-button": function (b) {
                return a(b.currentTarget).hasClass("ui-state-active") ? this._start(b) === !1 ? !1 : void this._repeat(null, a(b.currentTarget).hasClass("ui-spinner-up") ? 1 : -1, b) : void 0
            },
            "mouseleave .ui-spinner-button": "_stop"
        },
        _draw: function () {
            var a = this.uiSpinner = this.element.addClass("ui-spinner-input").attr("autocomplete", "off").wrap(this._uiSpinnerHtml()).parent().append(this._buttonHtml());
            this.element.attr("role", "spinbutton"), this.buttons = a.find(".ui-spinner-button").attr("tabIndex", -1).button().removeClass("ui-corner-all"), this.buttons.height() > Math.ceil(.5 * a.height()) && a.height() > 0 && a.height(a.height()), this.options.disabled && this.disable()
        },
        _keydown: function (b) {
            var c = this.options,
                d = a.ui.keyCode;
            switch (b.keyCode) {
            case d.UP:
                return this._repeat(null, 1, b), !0;
            case d.DOWN:
                return this._repeat(null, -1, b), !0;
            case d.PAGE_UP:
                return this._repeat(null, c.page, b), !0;
            case d.PAGE_DOWN:
                return this._repeat(null, -c.page, b), !0
            }
            return !1
        },
        _uiSpinnerHtml: function () {
            return "<span class='ui-spinner ui-widget ui-widget-content ui-corner-all'></span>"
        },
        _buttonHtml: function () {
            return "<a class='ui-spinner-button ui-spinner-up ui-corner-tr'><span class='ui-icon " + this.options.icons.up + "'>&#9650;</span></a><a class='ui-spinner-button ui-spinner-down ui-corner-br'><span class='ui-icon " + this.options.icons.down + "'>&#9660;</span></a>"
        },
        _start: function (a) {
            return this.spinning || this._trigger("start", a) !== !1 ? (this.counter || (this.counter = 1), this.spinning = !0, !0) : !1
        },
        _repeat: function (a, b, c) {
            a = a || 500, clearTimeout(this.timer), this.timer = this._delay(function () {
                this._repeat(40, b, c)
            }, a), this._spin(b * this.options.step, c)
        },
        _spin: function (a, b) {
            var c = this.value() || 0;
            this.counter || (this.counter = 1), c = this._adjustValue(c + a * this._increment(this.counter)), this.spinning && this._trigger("spin", b, {
                value: c
            }) === !1 || (this._value(c), this.counter++)
        },
        _increment: function (b) {
            var c = this.options.incremental;
            return c ? a.isFunction(c) ? c(b) : Math.floor(b * b * b / 5e4 - b * b / 500 + 17 * b / 200 + 1) : 1
        },
        _precision: function () {
            var a = this._precisionOf(this.options.step);
            return null !== this.options.min && (a = Math.max(a, this._precisionOf(this.options.min))), a
        },
        _precisionOf: function (a) {
            var b = a.toString(),
                c = b.indexOf(".");
            return -1 === c ? 0 : b.length - c - 1
        },
        _adjustValue: function (a) {
            var b, c, d = this.options;
            return b = null !== d.min ? d.min : 0, c = a - b, c = Math.round(c / d.step) * d.step, a = b + c, a = parseFloat(a.toFixed(this._precision())), null !== d.max && a > d.max ? d.max : null !== d.min && a < d.min ? d.min : a
        },
        _stop: function (a) {
            this.spinning && (clearTimeout(this.timer), clearTimeout(this.mousewheelTimer), this.counter = 0, this.spinning = !1, this._trigger("stop", a))
        },
        _setOption: function (a, b) {
            if ("culture" === a || "numberFormat" === a) {
                var c = this._parse(this.element.val());
                return this.options[a] = b, void this.element.val(this._format(c))
            }("max" === a || "min" === a || "step" === a) && "string" == typeof b && (b = this._parse(b)), this._super(a, b), "disabled" === a && (b ? (this.element.prop("disabled", !0), this.buttons.button("disable")) : (this.element.prop("disabled", !1), this.buttons.button("enable")))
        },
        _setOptions: b(function (a) {
            this._super(a), this._value(this.element.val())
        }),
        _parse: function (a) {
            return "string" == typeof a && "" !== a && (a = window.Globalize && this.options.numberFormat ? Globalize.parseFloat(a, 10, this.options.culture) : +a), "" === a || isNaN(a) ? null : a
        },
        _format: function (a) {
            return "" === a ? "" : window.Globalize && this.options.numberFormat ? Globalize.format(a, this.options.numberFormat, this.options.culture) : a
        },
        _refresh: function () {
            this.element.attr({
                "aria-valuemin": this.options.min,
                "aria-valuemax": this.options.max,
                "aria-valuenow": this._parse(this.element.val())
            })
        },
        _value: function (a, b) {
            var c;
            "" !== a && (c = this._parse(a), null !== c && (b || (c = this._adjustValue(c)), a = this._format(c))), this.element.val(a), this._refresh()
        },
        _destroy: function () {
            this.element.removeClass("ui-spinner-input").prop("disabled", !1).removeAttr("autocomplete").removeAttr("role").removeAttr("aria-valuemin").removeAttr("aria-valuemax").removeAttr("aria-valuenow"), this.uiSpinner.replaceWith(this.element)
        },
        stepUp: b(function (a) {
            this._stepUp(a)
        }),
        _stepUp: function (a) {
            this._spin((a || 1) * this.options.step)
        },
        stepDown: b(function (a) {
            this._stepDown(a)
        }),
        _stepDown: function (a) {
            this._spin((a || 1) * -this.options.step)
        },
        pageUp: b(function (a) {
            this._stepUp((a || 1) * this.options.page)
        }),
        pageDown: b(function (a) {
            this._stepDown((a || 1) * this.options.page)
        }),
        value: function (a) {
            return arguments.length ? void b(this._value).call(this, a) : this._parse(this.element.val())
        },
        widget: function () {
            return this.uiSpinner
        }
    })
}(jQuery),
function (a, b) {
    function c() {
        return ++e
    }

    function d(a) {
        return a.hash.length > 1 && a.href.replace(f, "") === location.href.replace(f, "")
    }
    var e = 0,
        f = /#.*$/;
    a.widget("ui.tabs", {
        version: "1.9.1",
        delay: 300,
        options: {
            active: null,
            collapsible: !1,
            event: "click",
            heightStyle: "content",
            hide: null,
            show: null,
            activate: null,
            beforeActivate: null,
            beforeLoad: null,
            load: null
        },
        _create: function () {
            var b = this,
                c = this.options,
                d = c.active,
                e = location.hash.substring(1);
            this.running = !1, this.element.addClass("ui-tabs ui-widget ui-widget-content ui-corner-all").toggleClass("ui-tabs-collapsible", c.collapsible).delegate(".ui-tabs-nav > li", "mousedown" + this.eventNamespace, function (b) {
                a(this).is(".ui-state-disabled") && b.preventDefault()
            }).delegate(".ui-tabs-anchor", "focus" + this.eventNamespace, function () {
                a(this).closest("li").is(".ui-state-disabled") && this.blur()
            }), this._processTabs(), null === d && (e && this.tabs.each(function (b, c) {
                return a(c).attr("aria-controls") === e ? (d = b, !1) : void 0
            }), null === d && (d = this.tabs.index(this.tabs.filter(".ui-tabs-active"))), (null === d || -1 === d) && (d = this.tabs.length ? 0 : !1)), d !== !1 && (d = this.tabs.index(this.tabs.eq(d)), -1 === d && (d = c.collapsible ? !1 : 0)), c.active = d, !c.collapsible && c.active === !1 && this.anchors.length && (c.active = 0), a.isArray(c.disabled) && (c.disabled = a.unique(c.disabled.concat(a.map(this.tabs.filter(".ui-state-disabled"), function (a) {
                return b.tabs.index(a)
            }))).sort()), this.active = this.options.active !== !1 && this.anchors.length ? this._findActive(this.options.active) : a(), this._refresh(), this.active.length && this.load(c.active)
        },
        _getCreateEventData: function () {
            return {
                tab: this.active,
                panel: this.active.length ? this._getPanelForTab(this.active) : a()
            }
        },
        _tabKeydown: function (b) {
            var c = a(this.document[0].activeElement).closest("li"),
                d = this.tabs.index(c),
                e = !0;
            if (!this._handlePageNav(b)) {
                switch (b.keyCode) {
                case a.ui.keyCode.RIGHT:
                case a.ui.keyCode.DOWN:
                    d++;
                    break;
                case a.ui.keyCode.UP:
                case a.ui.keyCode.LEFT:
                    e = !1, d--;
                    break;
                case a.ui.keyCode.END:
                    d = this.anchors.length - 1;
                    break;
                case a.ui.keyCode.HOME:
                    d = 0;
                    break;
                case a.ui.keyCode.SPACE:
                    return b.preventDefault(), clearTimeout(this.activating), void this._activate(d);
                case a.ui.keyCode.ENTER:
                    return b.preventDefault(), clearTimeout(this.activating), void this._activate(d === this.options.active ? !1 : d);
                default:
                    return
                }
                b.preventDefault(), clearTimeout(this.activating), d = this._focusNextTab(d, e), b.ctrlKey || (c.attr("aria-selected", "false"), this.tabs.eq(d).attr("aria-selected", "true"), this.activating = this._delay(function () {
                    this.option("active", d)
                }, this.delay))
            }
        },
        _panelKeydown: function (b) {
            this._handlePageNav(b) || b.ctrlKey && b.keyCode === a.ui.keyCode.UP && (b.preventDefault(), this.active.focus())
        },
        _handlePageNav: function (b) {
            return b.altKey && b.keyCode === a.ui.keyCode.PAGE_UP ? (this._activate(this._focusNextTab(this.options.active - 1, !1)), !0) : b.altKey && b.keyCode === a.ui.keyCode.PAGE_DOWN ? (this._activate(this._focusNextTab(this.options.active + 1, !0)), !0) : void 0
        },
        _findNextTab: function (b, c) {
            function d() {
                return b > e && (b = 0), 0 > b && (b = e), b
            }
            for (var e = this.tabs.length - 1; - 1 !== a.inArray(d(), this.options.disabled);) b = c ? b + 1 : b - 1;
            return b
        },
        _focusNextTab: function (a, b) {
            return a = this._findNextTab(a, b), this.tabs.eq(a).focus(), a
        },
        _setOption: function (a, b) {
            return "active" === a ? void this._activate(b) : "disabled" === a ? void this._setupDisabled(b) : (this._super(a, b), "collapsible" === a && (this.element.toggleClass("ui-tabs-collapsible", b), b || this.options.active !== !1 || this._activate(0)), "event" === a && this._setupEvents(b), void("heightStyle" === a && this._setupHeightStyle(b)))
        },
        _tabId: function (a) {
            return a.attr("aria-controls") || "ui-tabs-" + c()
        },
        _sanitizeSelector: function (a) {
            return a ? a.replace(/[!"$%&'()*+,.\/:;<=>?@\[\]\^`{|}~]/g, "\\$&") : ""
        },
        refresh: function () {
            var b = this.options,
                c = this.tablist.children(":has(a[href])");
            b.disabled = a.map(c.filter(".ui-state-disabled"), function (a) {
                return c.index(a)
            }), this._processTabs(), b.active !== !1 && this.anchors.length ? this.active.length && !a.contains(this.tablist[0], this.active[0]) ? this.tabs.length === b.disabled.length ? (b.active = !1, this.active = a()) : this._activate(this._findNextTab(Math.max(0, b.active - 1), !1)) : b.active = this.tabs.index(this.active) : (b.active = !1, this.active = a()), this._refresh()
        },
        _refresh: function () {
            this._setupDisabled(this.options.disabled), this._setupEvents(this.options.event), this._setupHeightStyle(this.options.heightStyle), this.tabs.not(this.active).attr({
                "aria-selected": "false",
                tabIndex: -1
            }), this.panels.not(this._getPanelForTab(this.active)).hide().attr({
                "aria-expanded": "false",
                "aria-hidden": "true"
            }), this.active.length ? (this.active.addClass("ui-tabs-active ui-state-active").attr({
                "aria-selected": "true",
                tabIndex: 0
            }), this._getPanelForTab(this.active).show().attr({
                "aria-expanded": "true",
                "aria-hidden": "false"
            })) : this.tabs.eq(0).attr("tabIndex", 0)
        },
        _processTabs: function () {
            var b = this;
            this.tablist = this._getList().addClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all").attr("role", "tablist"), this.tabs = this.tablist.find("> li:has(a[href])").addClass("ui-state-default ui-corner-top").attr({
                role: "tab",
                tabIndex: -1
            }), this.anchors = this.tabs.map(function () {
                return a("a", this)[0]
            }).addClass("ui-tabs-anchor").attr({
                role: "presentation",
                tabIndex: -1
            }), this.panels = a(), this.anchors.each(function (c, e) {
                var f, g, h, i = a(e).uniqueId().attr("id"),
                    j = a(e).closest("li"),
                    k = j.attr("aria-controls");
                d(e) ? (f = e.hash, g = b.element.find(b._sanitizeSelector(f))) : (h = b._tabId(j), f = "#" + h, g = b.element.find(f), g.length || (g = b._createPanel(h), g.insertAfter(b.panels[c - 1] || b.tablist)), g.attr("aria-live", "polite")), g.length && (b.panels = b.panels.add(g)), k && j.data("ui-tabs-aria-controls", k), j.attr({
                    "aria-controls": f.substring(1),
                    "aria-labelledby": i
                }), g.attr("aria-labelledby", i)
            }), this.panels.addClass("ui-tabs-panel ui-widget-content ui-corner-bottom").attr("role", "tabpanel")
        },
        _getList: function () {
            return this.element.find("ol,ul").eq(0)
        },
        _createPanel: function (b) {
            return a("<div>").attr("id", b).addClass("ui-tabs-panel ui-widget-content ui-corner-bottom").data("ui-tabs-destroy", !0)
        },
        _setupDisabled: function (b) {
            a.isArray(b) && (b.length ? b.length === this.anchors.length && (b = !0) : b = !1);
            for (var c, d = 0; c = this.tabs[d]; d++) b === !0 || -1 !== a.inArray(d, b) ? a(c).addClass("ui-state-disabled").attr("aria-disabled", "true") : a(c).removeClass("ui-state-disabled").removeAttr("aria-disabled");
            this.options.disabled = b
        },
        _setupEvents: function (b) {
            var c = {
                click: function (a) {
                    a.preventDefault()
                }
            };
            b && a.each(b.split(" "), function (a, b) {
                c[b] = "_eventHandler"
            }), this._off(this.anchors.add(this.tabs).add(this.panels)), this._on(this.anchors, c), this._on(this.tabs, {
                keydown: "_tabKeydown"
            }), this._on(this.panels, {
                keydown: "_panelKeydown"
            }), this._focusable(this.tabs), this._hoverable(this.tabs)
        },
        _setupHeightStyle: function (b) {
            var c, d, e = this.element.parent();
            "fill" === b ? (a.support.minHeight || (d = e.css("overflow"), e.css("overflow", "hidden")), c = e.height(), this.element.siblings(":visible").each(function () {
                var b = a(this),
                    d = b.css("position");
                "absolute" !== d && "fixed" !== d && (c -= b.outerHeight(!0))
            }), d && e.css("overflow", d), this.element.children().not(this.panels).each(function () {
                c -= a(this).outerHeight(!0)
            }), this.panels.each(function () {
                a(this).height(Math.max(0, c - a(this).innerHeight() + a(this).height()))
            }).css("overflow", "auto")) : "auto" === b && (c = 0, this.panels.each(function () {
                c = Math.max(c, a(this).height("").height())
            }).height(c))
        },
        _eventHandler: function (b) {
            var c = this.options,
                d = this.active,
                e = a(b.currentTarget),
                f = e.closest("li"),
                g = f[0] === d[0],
                h = g && c.collapsible,
                i = h ? a() : this._getPanelForTab(f),
                j = d.length ? this._getPanelForTab(d) : a(),
                k = {
                    oldTab: d,
                    oldPanel: j,
                    newTab: h ? a() : f,
                    newPanel: i
                };
            b.preventDefault(), f.hasClass("ui-state-disabled") || f.hasClass("ui-tabs-loading") || this.running || g && !c.collapsible || this._trigger("beforeActivate", b, k) === !1 || (c.active = h ? !1 : this.tabs.index(f), this.active = g ? a() : f, this.xhr && this.xhr.abort(), j.length || i.length || a.error("jQuery UI Tabs: Mismatching fragment identifier."), i.length && this.load(this.tabs.index(f), b), this._toggle(b, k))
        },
        _toggle: function (b, c) {
            function d() {
                f.running = !1, f._trigger("activate", b, c)
            }

            function e() {
                c.newTab.closest("li").addClass("ui-tabs-active ui-state-active"), g.length && f.options.show ? f._show(g, f.options.show, d) : (g.show(), d())
            }
            var f = this,
                g = c.newPanel,
                h = c.oldPanel;
            this.running = !0, h.length && this.options.hide ? this._hide(h, this.options.hide, function () {
                c.oldTab.closest("li").removeClass("ui-tabs-active ui-state-active"), e()
            }) : (c.oldTab.closest("li").removeClass("ui-tabs-active ui-state-active"), h.hide(), e()), h.attr({
                "aria-expanded": "false",
                "aria-hidden": "true"
            }), c.oldTab.attr("aria-selected", "false"), g.length && h.length ? c.oldTab.attr("tabIndex", -1) : g.length && this.tabs.filter(function () {
                return 0 === a(this).attr("tabIndex")
            }).attr("tabIndex", -1), g.attr({
                "aria-expanded": "true",
                "aria-hidden": "false"
            }), c.newTab.attr({
                "aria-selected": "true",
                tabIndex: 0
            })
        },
        _activate: function (b) {
            var c, d = this._findActive(b);
            d[0] !== this.active[0] && (d.length || (d = this.active), c = d.find(".ui-tabs-anchor")[0], this._eventHandler({
                target: c,
                currentTarget: c,
                preventDefault: a.noop
            }))
        },
        _findActive: function (b) {
            return b === !1 ? a() : this.tabs.eq(b)
        },
        _getIndex: function (a) {
            return "string" == typeof a && (a = this.anchors.index(this.anchors.filter("[href$='" + a + "']"))), a
        },
        _destroy: function () {
            this.xhr && this.xhr.abort(), this.element.removeClass("ui-tabs ui-widget ui-widget-content ui-corner-all ui-tabs-collapsible"), this.tablist.removeClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all").removeAttr("role"), this.anchors.removeClass("ui-tabs-anchor").removeAttr("role").removeAttr("tabIndex").removeData("href.tabs").removeData("load.tabs").removeUniqueId(), this.tabs.add(this.panels).each(function () {
                a.data(this, "ui-tabs-destroy") ? a(this).remove() : a(this).removeClass("ui-state-default ui-state-active ui-state-disabled ui-corner-top ui-corner-bottom ui-widget-content ui-tabs-active ui-tabs-panel").removeAttr("tabIndex").removeAttr("aria-live").removeAttr("aria-busy").removeAttr("aria-selected").removeAttr("aria-labelledby").removeAttr("aria-hidden").removeAttr("aria-expanded").removeAttr("role")
            }), this.tabs.each(function () {
                var b = a(this),
                    c = b.data("ui-tabs-aria-controls");
                c ? b.attr("aria-controls", c) : b.removeAttr("aria-controls")
            }), "content" !== this.options.heightStyle && this.panels.css("height", "")
        },
        enable: function (c) {
            var d = this.options.disabled;
            d !== !1 && (c === b ? d = !1 : (c = this._getIndex(c), d = a.isArray(d) ? a.map(d, function (a) {
                return a !== c ? a : null
            }) : a.map(this.tabs, function (a, b) {
                return b !== c ? b : null
            })), this._setupDisabled(d))
        },
        disable: function (c) {
            var d = this.options.disabled;
            if (d !== !0) {
                if (c === b) d = !0;
                else {
                    if (c = this._getIndex(c), -1 !== a.inArray(c, d)) return;
                    d = a.isArray(d) ? a.merge([c], d).sort() : [c]
                }
                this._setupDisabled(d)
            }
        },
        load: function (b, c) {
            b = this._getIndex(b);
            var e = this,
                f = this.tabs.eq(b),
                g = f.find(".ui-tabs-anchor"),
                h = this._getPanelForTab(f),
                i = {
                    tab: f,
                    panel: h
                };
            d(g[0]) || (this.xhr = a.ajax(this._ajaxSettings(g, c, i)), this.xhr && "canceled" !== this.xhr.statusText && (f.addClass("ui-tabs-loading"), h.attr("aria-busy", "true"), this.xhr.success(function (a) {
                setTimeout(function () {
                    h.html(a), e._trigger("load", c, i)
                }, 1)
            }).complete(function (a, b) {
                setTimeout(function () {
                    "abort" === b && e.panels.stop(!1, !0), f.removeClass("ui-tabs-loading"), h.removeAttr("aria-busy"), a === e.xhr && delete e.xhr
                }, 1)
            })))
        },
        _ajaxSettings: function (b, c, d) {
            var e = this;
            return {
                url: b.attr("href"),
                beforeSend: function (b, f) {
                    return e._trigger("beforeLoad", c, a.extend({
                        jqXHR: b,
                        ajaxSettings: f
                    }, d))
                }
            }
        },
        _getPanelForTab: function (b) {
            var c = a(b).attr("aria-controls");
            return this.element.find(this._sanitizeSelector("#" + c))
        }
    }), a.uiBackCompat !== !1 && (a.ui.tabs.prototype._ui = function (a, b) {
        return {
            tab: a,
            panel: b,
            index: this.anchors.index(a)
        }
    }, a.widget("ui.tabs", a.ui.tabs, {
        url: function (a, b) {
            this.anchors.eq(a).attr("href", b)
        }
    }), a.widget("ui.tabs", a.ui.tabs, {
        options: {
            ajaxOptions: null,
            cache: !1
        },
        _create: function () {
            this._super();
            var b = this;
            this._on({
                tabsbeforeload: function (c, d) {
                    return a.data(d.tab[0], "cache.tabs") ? void c.preventDefault() : void d.jqXHR.success(function () {
                        b.options.cache && a.data(d.tab[0], "cache.tabs", !0)
                    })
                }
            })
        },
        _ajaxSettings: function (b, c, d) {
            var e = this.options.ajaxOptions;
            return a.extend({}, e, {
                error: function (a, b) {
                    try {
                        e.error(a, b, d.tab.closest("li").index(), d.tab[0])
                    } catch (c) {}
                }
            }, this._superApply(arguments))
        },
        _setOption: function (a, b) {
            "cache" === a && b === !1 && this.anchors.removeData("cache.tabs"), this._super(a, b)
        },
        _destroy: function () {
            this.anchors.removeData("cache.tabs"), this._super()
        },
        url: function (a) {
            this.anchors.eq(a).removeData("cache.tabs"), this._superApply(arguments)
        }
    }), a.widget("ui.tabs", a.ui.tabs, {
        abort: function () {
            this.xhr && this.xhr.abort()
        }
    }), a.widget("ui.tabs", a.ui.tabs, {
        options: {
            spinner: "<em>Loading&#8230;</em>"
        },
        _create: function () {
            this._super(), this._on({
                tabsbeforeload: function (a, b) {
                    if (a.target === this.element[0] && this.options.spinner) {
                        var c = b.tab.find("span"),
                            d = c.html();
                        c.html(this.options.spinner), b.jqXHR.complete(function () {
                            c.html(d)
                        })
                    }
                }
            })
        }
    }), a.widget("ui.tabs", a.ui.tabs, {
        options: {
            enable: null,
            disable: null
        },
        enable: function (b) {
            var c, d = this.options;
            (b && d.disabled === !0 || a.isArray(d.disabled) && -1 !== a.inArray(b, d.disabled)) && (c = !0), this._superApply(arguments), c && this._trigger("enable", null, this._ui(this.anchors[b], this.panels[b]))
        },
        disable: function (b) {
            var c, d = this.options;
            (b && d.disabled === !1 || a.isArray(d.disabled) && -1 === a.inArray(b, d.disabled)) && (c = !0), this._superApply(arguments), c && this._trigger("disable", null, this._ui(this.anchors[b], this.panels[b]))
        }
    }), a.widget("ui.tabs", a.ui.tabs, {
        options: {
            add: null,
            remove: null,
            tabTemplate: "<li><a href='#{href}'><span>#{label}</span></a></li>"
        },
        add: function (c, d, e) {
            e === b && (e = this.anchors.length);
            var f, g, h = this.options,
                i = a(h.tabTemplate.replace(/#\{href\}/g, c).replace(/#\{label\}/g, d)),
                j = c.indexOf("#") ? this._tabId(i) : c.replace("#", "");
            return i.addClass("ui-state-default ui-corner-top").data("ui-tabs-destroy", !0), i.attr("aria-controls", j), f = e >= this.tabs.length, g = this.element.find("#" + j), g.length || (g = this._createPanel(j), f ? e > 0 ? g.insertAfter(this.panels.eq(-1)) : g.appendTo(this.element) : g.insertBefore(this.panels[e])), g.addClass("ui-tabs-panel ui-widget-content ui-corner-bottom").hide(), f ? i.appendTo(this.tablist) : i.insertBefore(this.tabs[e]), h.disabled = a.map(h.disabled, function (a) {
                return a >= e ? ++a : a
            }), this.refresh(), 1 === this.tabs.length && h.active === !1 && this.option("active", 0), this._trigger("add", null, this._ui(this.anchors[e], this.panels[e])), this
        },
        remove: function (b) {
            b = this._getIndex(b);
            var c = this.options,
                d = this.tabs.eq(b).remove(),
                e = this._getPanelForTab(d).remove();
            return d.hasClass("ui-tabs-active") && this.anchors.length > 2 && this._activate(b + (b + 1 < this.anchors.length ? 1 : -1)), c.disabled = a.map(a.grep(c.disabled, function (a) {
                return a !== b
            }), function (a) {
                return a >= b ? --a : a
            }), this.refresh(), this._trigger("remove", null, this._ui(d.find("a")[0], e[0])), this
        }
    }), a.widget("ui.tabs", a.ui.tabs, {
        length: function () {
            return this.anchors.length
        }
    }), a.widget("ui.tabs", a.ui.tabs, {
        options: {
            idPrefix: "ui-tabs-"
        },
        _tabId: function (b) {
            var d = b.is("li") ? b.find("a[href]") : b;
            return d = d[0], a(d).closest("li").attr("aria-controls") || d.title && d.title.replace(/\s/g, "_").replace(/[^\w\u00c0-\uFFFF\-]/g, "") || this.options.idPrefix + c()
        }
    }), a.widget("ui.tabs", a.ui.tabs, {
        options: {
            panelTemplate: "<div></div>"
        },
        _createPanel: function (b) {
            return a(this.options.panelTemplate).attr("id", b).addClass("ui-tabs-panel ui-widget-content ui-corner-bottom").data("ui-tabs-destroy", !0)
        }
    }), a.widget("ui.tabs", a.ui.tabs, {
        _create: function () {
            var a = this.options;
            null === a.active && a.selected !== b && (a.active = -1 === a.selected ? !1 : a.selected), this._super(), a.selected = a.active, a.selected === !1 && (a.selected = -1)
        },
        _setOption: function (a, b) {
            if ("selected" !== a) return this._super(a, b);
            var c = this.options;
            this._super("active", -1 === b ? !1 : b), c.selected = c.active, c.selected === !1 && (c.selected = -1)
        },
        _eventHandler: function () {
            this._superApply(arguments), this.options.selected = this.options.active, this.options.selected === !1 && (this.options.selected = -1)
        }
    }), a.widget("ui.tabs", a.ui.tabs, {
        options: {
            show: null,
            select: null
        },
        _create: function () {
            this._super(), this.options.active !== !1 && this._trigger("show", null, this._ui(this.active.find(".ui-tabs-anchor")[0], this._getPanelForTab(this.active)[0]))
        },
        _trigger: function (a, b, c) {
            var d = this._superApply(arguments);
            return d ? ("beforeActivate" === a && c.newTab.length ? d = this._super("select", b, {
                tab: c.newTab.find(".ui-tabs-anchor")[0],
                panel: c.newPanel[0],
                index: c.newTab.closest("li").index()
            }) : "activate" === a && c.newTab.length && (d = this._super("show", b, {
                tab: c.newTab.find(".ui-tabs-anchor")[0],
                panel: c.newPanel[0],
                index: c.newTab.closest("li").index()
            })), d) : !1
        }
    }), a.widget("ui.tabs", a.ui.tabs, {
        select: function (a) {
            if (a = this._getIndex(a), -1 === a) {
                if (!this.options.collapsible || -1 === this.options.selected) return;
                a = this.options.selected
            }
            this.anchors.eq(a).trigger(this.options.event + this.eventNamespace)
        }
    }), function () {
        var b = 0;
        a.widget("ui.tabs", a.ui.tabs, {
            options: {
                cookie: null
            },
            _create: function () {
                var a, b = this.options;
                null == b.active && b.cookie && (a = parseInt(this._cookie(), 10), -1 === a && (a = !1), b.active = a), this._super()
            },
            _cookie: function (c) {
                var d = [this.cookie || (this.cookie = this.options.cookie.name || "ui-tabs-" + ++b)];
                return arguments.length && (d.push(c === !1 ? -1 : c), d.push(this.options.cookie)), a.cookie.apply(null, d)
            },
            _refresh: function () {
                this._super(), this.options.cookie && this._cookie(this.options.active, this.options.cookie)
            },
            _eventHandler: function () {
                this._superApply(arguments), this.options.cookie && this._cookie(this.options.active, this.options.cookie)
            },
            _destroy: function () {
                this._super(), this.options.cookie && this._cookie(null, this.options.cookie)
            }
        })
    }(), a.widget("ui.tabs", a.ui.tabs, {
        _trigger: function (b, c, d) {
            var e = a.extend({}, d);
            return "load" === b && (e.panel = e.panel[0], e.tab = e.tab.find(".ui-tabs-anchor")[0]), this._super(b, c, e)
        }
    }), a.widget("ui.tabs", a.ui.tabs, {
        options: {
            fx: null
        },
        _getFx: function () {
            var b, c, d = this.options.fx;
            return d && (a.isArray(d) ? (b = d[0], c = d[1]) : b = c = d), d ? {
                show: c,
                hide: b
            } : null
        },
        _toggle: function (a, b) {
            function c() {
                e.running = !1, e._trigger("activate", a, b)
            }

            function d() {
                b.newTab.closest("li").addClass("ui-tabs-active ui-state-active"), f.length && h.show ? f.animate(h.show, h.show.duration, function () {
                    c()
                }) : (f.show(), c())
            }
            var e = this,
                f = b.newPanel,
                g = b.oldPanel,
                h = this._getFx();
            return h ? (e.running = !0, void(g.length && h.hide ? g.animate(h.hide, h.hide.duration, function () {
                b.oldTab.closest("li").removeClass("ui-tabs-active ui-state-active"), d()
            }) : (b.oldTab.closest("li").removeClass("ui-tabs-active ui-state-active"), g.hide(), d()))) : this._super(a, b)
        }
    }))
}(jQuery),
function (a) {
    function b(b, c) {
        var d = (b.attr("aria-describedby") || "").split(/\s+/);
        d.push(c), b.data("ui-tooltip-id", c).attr("aria-describedby", a.trim(d.join(" ")))
    }

    function c(b) {
        var c = b.data("ui-tooltip-id"),
            d = (b.attr("aria-describedby") || "").split(/\s+/),
            e = a.inArray(c, d); - 1 !== e && d.splice(e, 1), b.removeData("ui-tooltip-id"), d = a.trim(d.join(" ")), d ? b.attr("aria-describedby", d) : b.removeAttr("aria-describedby")
    }
    var d = 0;
    a.widget("ui.tooltip", {
        version: "1.9.1",
        options: {
            content: function () {
                return a(this).attr("title")
            },
            hide: !0,
            items: "[title]:not([disabled])",
            position: {
                my: "left top+15",
                at: "left bottom",
                collision: "flipfit flipfit"
            },
            show: !0,
            tooltipClass: null,
            track: !1,
            close: null,
            open: null
        },
        _create: function () {
            this._on({
                mouseover: "open",
                focusin: "open"
            }), this.tooltips = {}, this.parents = {}, this.options.disabled && this._disable()
        },
        _setOption: function (b, c) {
            var d = this;
            return "disabled" === b ? (this[c ? "_disable" : "_enable"](), void(this.options[b] = c)) : (this._super(b, c), void("content" === b && a.each(this.tooltips, function (a, b) {
                d._updateContent(b)
            })))
        },
        _disable: function () {
            var b = this;
            a.each(this.tooltips, function (c, d) {
                var e = a.Event("blur");
                e.target = e.currentTarget = d[0], b.close(e, !0)
            }), this.element.find(this.options.items).andSelf().each(function () {
                var b = a(this);
                b.is("[title]") && b.data("ui-tooltip-title", b.attr("title")).attr("title", "")
            })
        },
        _enable: function () {
            this.element.find(this.options.items).andSelf().each(function () {
                var b = a(this);
                b.data("ui-tooltip-title") && b.attr("title", b.data("ui-tooltip-title"))
            })
        },
        open: function (b) {
            var c = this,
                d = a(b ? b.target : this.element).closest(this.options.items);
            if (d.length) {
                if (this.options.track && d.data("ui-tooltip-id")) return this._find(d).position(a.extend({
                    of: d
                }, this.options.position)), void this._off(this.document, "mousemove");
                d.attr("title") && d.data("ui-tooltip-title", d.attr("title")), d.data("tooltip-open", !0), b && "mouseover" === b.type && d.parents().each(function () {
                    var b;
                    a(this).data("tooltip-open") && (b = a.Event("blur"), b.target = b.currentTarget = this, c.close(b, !0)), this.title && (a(this).uniqueId(), c.parents[this.id] = {
                        element: this,
                        title: this.title
                    }, this.title = "")
                }), this._updateContent(d, b)
            }
        },
        _updateContent: function (a, b) {
            var c, d = this.options.content,
                e = this;
            return "string" == typeof d ? this._open(b, a, d) : (c = d.call(a[0], function (c) {
                a.data("tooltip-open") && e._delay(function () {
                    this._open(b, a, c)
                })
            }), void(c && this._open(b, a, c)))
        },
        _open: function (c, d, e) {
            function f(a) {
                j.of = a, g.is(":hidden") || g.position(j)
            }
            var g, h, i, j = a.extend({}, this.options.position);
            if (e) {
                if (g = this._find(d), g.length) return void g.find(".ui-tooltip-content").html(e);
                d.is("[title]") && (c && "mouseover" === c.type ? d.attr("title", "") : d.removeAttr("title")), g = this._tooltip(d), b(d, g.attr("id")), g.find(".ui-tooltip-content").html(e), this.options.track && c && /^mouse/.test(c.originalEvent.type) ? (this._on(this.document, {
                    mousemove: f
                }), f(c)) : g.position(a.extend({
                    of: d
                }, this.options.position)), g.hide(), this._show(g, this.options.show), this.options.show && this.options.show.delay && (i = setInterval(function () {
                    g.is(":visible") && (f(j.of), clearInterval(i))
                }, a.fx.interval)), this._trigger("open", c, {
                    tooltip: g
                }), h = {
                    keyup: function (b) {
                        if (b.keyCode === a.ui.keyCode.ESCAPE) {
                            var c = a.Event(b);
                            c.currentTarget = d[0], this.close(c, !0)
                        }
                    },
                    remove: function () {
                        this._removeTooltip(g)
                    }
                }, c && "mouseover" !== c.type || (h.mouseleave = "close"), c && "focusin" !== c.type || (h.focusout = "close"), this._on(d, h)
            }
        },
        close: function (b) {
            var d = this,
                e = a(b ? b.currentTarget : this.element),
                f = this._find(e);
            this.closing || (e.data("ui-tooltip-title") && e.attr("title", e.data("ui-tooltip-title")), c(e), f.stop(!0), this._hide(f, this.options.hide, function () {
                d._removeTooltip(a(this))
            }), e.removeData("tooltip-open"), this._off(e, "mouseleave focusout keyup"), e[0] !== this.element[0] && this._off(e, "remove"), this._off(this.document, "mousemove"), b && "mouseleave" === b.type && a.each(this.parents, function (a, b) {
                b.element.title = b.title, delete d.parents[a]
            }), this.closing = !0, this._trigger("close", b, {
                tooltip: f
            }), this.closing = !1)
        },
        _tooltip: function (b) {
            var c = "ui-tooltip-" + d++,
                e = a("<div>").attr({
                    id: c,
                    role: "tooltip"
                }).addClass("ui-tooltip ui-widget ui-corner-all ui-widget-content " + (this.options.tooltipClass || ""));
            return a("<div>").addClass("ui-tooltip-content").appendTo(e), e.appendTo(this.document[0].body), a.fn.bgiframe && e.bgiframe(), this.tooltips[c] = b, e
        },
        _find: function (b) {
            var c = b.data("ui-tooltip-id");
            return c ? a("#" + c) : a()
        },
        _removeTooltip: function (a) {
            a.remove(), delete this.tooltips[a.attr("id")]
        },
        _destroy: function () {
            var b = this;
            a.each(this.tooltips, function (c, d) {
                var e = a.Event("blur");
                e.target = e.currentTarget = d[0], b.close(e, !0), a("#" + c).remove(), d.data("ui-tooltip-title") && (d.attr("title", d.data("ui-tooltip-title")), d.removeData("ui-tooltip-title"))
            })
        }
    })
}(jQuery), //! moment.js
//! version : 2.6.0
//! authors : Tim Wood, Iskren Chernev, Moment.js contributors
//! license : MIT
//! momentjs.com

(function (undefined) {

    /************************************
        Constants
    ************************************/

    var moment,
        VERSION = "2.6.0",
        // the global-scope this is NOT the global object in Node.js
        globalScope = typeof global !== 'undefined' ? global : this,
        oldGlobalMoment,
        round = Math.round,
        i,

        YEAR = 0,
        MONTH = 1,
        DATE = 2,
        HOUR = 3,
        MINUTE = 4,
        SECOND = 5,
        MILLISECOND = 6,

        // internal storage for language config files
        languages = {},

        // moment internal properties
        momentProperties = {
            _isAMomentObject: null,
            _i : null,
            _f : null,
            _l : null,
            _strict : null,
            _isUTC : null,
            _offset : null,  // optional. Combine with _isUTC
            _pf : null,
            _lang : null  // optional
        },

        // check for nodeJS
        hasModule = (typeof module !== 'undefined' && module.exports),

        // ASP.NET json date format regex
        aspNetJsonRegex = /^\/?Date\((\-?\d+)/i,
        aspNetTimeSpanJsonRegex = /(\-)?(?:(\d*)\.)?(\d+)\:(\d+)(?:\:(\d+)\.?(\d{3})?)?/,

        // from http://docs.closure-library.googlecode.com/git/closure_goog_date_date.js.source.html
        // somewhat more in line with 4.4.3.2 2004 spec, but allows decimal anywhere
        isoDurationRegex = /^(-)?P(?:(?:([0-9,.]*)Y)?(?:([0-9,.]*)M)?(?:([0-9,.]*)D)?(?:T(?:([0-9,.]*)H)?(?:([0-9,.]*)M)?(?:([0-9,.]*)S)?)?|([0-9,.]*)W)$/,

        // format tokens
        formattingTokens = /(\[[^\[]*\])|(\\)?(Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Q|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|mm?|ss?|S{1,4}|X|zz?|ZZ?|.)/g,
        localFormattingTokens = /(\[[^\[]*\])|(\\)?(LT|LL?L?L?|l{1,4})/g,

        // parsing token regexes
        parseTokenOneOrTwoDigits = /\d\d?/, // 0 - 99
        parseTokenOneToThreeDigits = /\d{1,3}/, // 0 - 999
        parseTokenOneToFourDigits = /\d{1,4}/, // 0 - 9999
        parseTokenOneToSixDigits = /[+\-]?\d{1,6}/, // -999,999 - 999,999
        parseTokenDigits = /\d+/, // nonzero number of digits
        parseTokenWord = /[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i, // any word (or two) characters or numbers including two/three word month in arabic.
        parseTokenTimezone = /Z|[\+\-]\d\d:?\d\d/gi, // +00:00 -00:00 +0000 -0000 or Z
        parseTokenT = /T/i, // T (ISO separator)
        parseTokenTimestampMs = /[\+\-]?\d+(\.\d{1,3})?/, // 123456789 123456789.123
        parseTokenOrdinal = /\d{1,2}/,

        //strict parsing regexes
        parseTokenOneDigit = /\d/, // 0 - 9
        parseTokenTwoDigits = /\d\d/, // 00 - 99
        parseTokenThreeDigits = /\d{3}/, // 000 - 999
        parseTokenFourDigits = /\d{4}/, // 0000 - 9999
        parseTokenSixDigits = /[+-]?\d{6}/, // -999,999 - 999,999
        parseTokenSignedNumber = /[+-]?\d+/, // -inf - inf

        // iso 8601 regex
        // 0000-00-00 0000-W00 or 0000-W00-0 + T + 00 or 00:00 or 00:00:00 or 00:00:00.000 + +00:00 or +0000 or +00)
        isoRegex = /^\s*(?:[+-]\d{6}|\d{4})-(?:(\d\d-\d\d)|(W\d\d$)|(W\d\d-\d)|(\d\d\d))((T| )(\d\d(:\d\d(:\d\d(\.\d+)?)?)?)?([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/,

        isoFormat = 'YYYY-MM-DDTHH:mm:ssZ',

        isoDates = [
            ['YYYYYY-MM-DD', /[+-]\d{6}-\d{2}-\d{2}/],
            ['YYYY-MM-DD', /\d{4}-\d{2}-\d{2}/],
            ['GGGG-[W]WW-E', /\d{4}-W\d{2}-\d/],
            ['GGGG-[W]WW', /\d{4}-W\d{2}/],
            ['YYYY-DDD', /\d{4}-\d{3}/]
        ],

        // iso time formats and regexes
        isoTimes = [
            ['HH:mm:ss.SSSS', /(T| )\d\d:\d\d:\d\d\.\d+/],
            ['HH:mm:ss', /(T| )\d\d:\d\d:\d\d/],
            ['HH:mm', /(T| )\d\d:\d\d/],
            ['HH', /(T| )\d\d/]
        ],

        // timezone chunker "+10:00" > ["10", "00"] or "-1530" > ["-15", "30"]
        parseTimezoneChunker = /([\+\-]|\d\d)/gi,

        // getter and setter names
        proxyGettersAndSetters = 'Date|Hours|Minutes|Seconds|Milliseconds'.split('|'),
        unitMillisecondFactors = {
            'Milliseconds' : 1,
            'Seconds' : 1e3,
            'Minutes' : 6e4,
            'Hours' : 36e5,
            'Days' : 864e5,
            'Months' : 2592e6,
            'Years' : 31536e6
        },

        unitAliases = {
            ms : 'millisecond',
            s : 'second',
            m : 'minute',
            h : 'hour',
            d : 'day',
            D : 'date',
            w : 'week',
            W : 'isoWeek',
            M : 'month',
            Q : 'quarter',
            y : 'year',
            DDD : 'dayOfYear',
            e : 'weekday',
            E : 'isoWeekday',
            gg: 'weekYear',
            GG: 'isoWeekYear'
        },

        camelFunctions = {
            dayofyear : 'dayOfYear',
            isoweekday : 'isoWeekday',
            isoweek : 'isoWeek',
            weekyear : 'weekYear',
            isoweekyear : 'isoWeekYear'
        },

        // format function strings
        formatFunctions = {},

        // tokens to ordinalize and pad
        ordinalizeTokens = 'DDD w W M D d'.split(' '),
        paddedTokens = 'M D H h m s w W'.split(' '),

        formatTokenFunctions = {
            M    : function () {
                return this.month() + 1;
            },
            MMM  : function (format) {
                return this.lang().monthsShort(this, format);
            },
            MMMM : function (format) {
                return this.lang().months(this, format);
            },
            D    : function () {
                return this.date();
            },
            DDD  : function () {
                return this.dayOfYear();
            },
            d    : function () {
                return this.day();
            },
            dd   : function (format) {
                return this.lang().weekdaysMin(this, format);
            },
            ddd  : function (format) {
                return this.lang().weekdaysShort(this, format);
            },
            dddd : function (format) {
                return this.lang().weekdays(this, format);
            },
            w    : function () {
                return this.week();
            },
            W    : function () {
                return this.isoWeek();
            },
            YY   : function () {
                return leftZeroFill(this.year() % 100, 2);
            },
            YYYY : function () {
                return leftZeroFill(this.year(), 4);
            },
            YYYYY : function () {
                return leftZeroFill(this.year(), 5);
            },
            YYYYYY : function () {
                var y = this.year(), sign = y >= 0 ? '+' : '-';
                return sign + leftZeroFill(Math.abs(y), 6);
            },
            gg   : function () {
                return leftZeroFill(this.weekYear() % 100, 2);
            },
            gggg : function () {
                return leftZeroFill(this.weekYear(), 4);
            },
            ggggg : function () {
                return leftZeroFill(this.weekYear(), 5);
            },
            GG   : function () {
                return leftZeroFill(this.isoWeekYear() % 100, 2);
            },
            GGGG : function () {
                return leftZeroFill(this.isoWeekYear(), 4);
            },
            GGGGG : function () {
                return leftZeroFill(this.isoWeekYear(), 5);
            },
            e : function () {
                return this.weekday();
            },
            E : function () {
                return this.isoWeekday();
            },
            a    : function () {
                return this.lang().meridiem(this.hours(), this.minutes(), true);
            },
            A    : function () {
                return this.lang().meridiem(this.hours(), this.minutes(), false);
            },
            H    : function () {
                return this.hours();
            },
            h    : function () {
                return this.hours() % 12 || 12;
            },
            m    : function () {
                return this.minutes();
            },
            s    : function () {
                return this.seconds();
            },
            S    : function () {
                return toInt(this.milliseconds() / 100);
            },
            SS   : function () {
                return leftZeroFill(toInt(this.milliseconds() / 10), 2);
            },
            SSS  : function () {
                return leftZeroFill(this.milliseconds(), 3);
            },
            SSSS : function () {
                return leftZeroFill(this.milliseconds(), 3);
            },
            Z    : function () {
                var a = -this.zone(),
                    b = "+";
                if (a < 0) {
                    a = -a;
                    b = "-";
                }
                return b + leftZeroFill(toInt(a / 60), 2) + ":" + leftZeroFill(toInt(a) % 60, 2);
            },
            ZZ   : function () {
                var a = -this.zone(),
                    b = "+";
                if (a < 0) {
                    a = -a;
                    b = "-";
                }
                return b + leftZeroFill(toInt(a / 60), 2) + leftZeroFill(toInt(a) % 60, 2);
            },
            z : function () {
                return this.zoneAbbr();
            },
            zz : function () {
                return this.zoneName();
            },
            X    : function () {
                return this.unix();
            },
            Q : function () {
                return this.quarter();
            }
        },

        lists = ['months', 'monthsShort', 'weekdays', 'weekdaysShort', 'weekdaysMin'];

    function defaultParsingFlags() {
        // We need to deep clone this object, and es5 standard is not very
        // helpful.
        return {
            empty : false,
            unusedTokens : [],
            unusedInput : [],
            overflow : -2,
            charsLeftOver : 0,
            nullInput : false,
            invalidMonth : null,
            invalidFormat : false,
            userInvalidated : false,
            iso: false
        };
    }

    function deprecate(msg, fn) {
        var firstTime = true;
        function printMsg() {
            if (moment.suppressDeprecationWarnings === false &&
                    typeof console !== 'undefined' && console.warn) {
                console.warn("Deprecation warning: " + msg);
            }
        }
        return extend(function () {
            if (firstTime) {
                printMsg();
                firstTime = false;
            }
            return fn.apply(this, arguments);
        }, fn);
    }

    function padToken(func, count) {
        return function (a) {
            return leftZeroFill(func.call(this, a), count);
        };
    }
    function ordinalizeToken(func, period) {
        return function (a) {
            return this.lang().ordinal(func.call(this, a), period);
        };
    }

    while (ordinalizeTokens.length) {
        i = ordinalizeTokens.pop();
        formatTokenFunctions[i + 'o'] = ordinalizeToken(formatTokenFunctions[i], i);
    }
    while (paddedTokens.length) {
        i = paddedTokens.pop();
        formatTokenFunctions[i + i] = padToken(formatTokenFunctions[i], 2);
    }
    formatTokenFunctions.DDDD = padToken(formatTokenFunctions.DDD, 3);


    /************************************
        Constructors
    ************************************/

    function Language() {

    }

    // Moment prototype object
    function Moment(config) {
        checkOverflow(config);
        extend(this, config);
    }

    // Duration Constructor
    function Duration(duration) {
        var normalizedInput = normalizeObjectUnits(duration),
            years = normalizedInput.year || 0,
            quarters = normalizedInput.quarter || 0,
            months = normalizedInput.month || 0,
            weeks = normalizedInput.week || 0,
            days = normalizedInput.day || 0,
            hours = normalizedInput.hour || 0,
            minutes = normalizedInput.minute || 0,
            seconds = normalizedInput.second || 0,
            milliseconds = normalizedInput.millisecond || 0;

        // representation for dateAddRemove
        this._milliseconds = +milliseconds +
            seconds * 1e3 + // 1000
            minutes * 6e4 + // 1000 * 60
            hours * 36e5; // 1000 * 60 * 60
        // Because of dateAddRemove treats 24 hours as different from a
        // day when working around DST, we need to store them separately
        this._days = +days +
            weeks * 7;
        // It is impossible translate months into days without knowing
        // which months you are are talking about, so we have to store
        // it separately.
        this._months = +months +
            quarters * 3 +
            years * 12;

        this._data = {};

        this._bubble();
    }

    /************************************
        Helpers
    ************************************/


    function extend(a, b) {
        for (var i in b) {
            if (b.hasOwnProperty(i)) {
                a[i] = b[i];
            }
        }

        if (b.hasOwnProperty("toString")) {
            a.toString = b.toString;
        }

        if (b.hasOwnProperty("valueOf")) {
            a.valueOf = b.valueOf;
        }

        return a;
    }

    function cloneMoment(m) {
        var result = {}, i;
        for (i in m) {
            if (m.hasOwnProperty(i) && momentProperties.hasOwnProperty(i)) {
                result[i] = m[i];
            }
        }

        return result;
    }

    function absRound(number) {
        if (number < 0) {
            return Math.ceil(number);
        } else {
            return Math.floor(number);
        }
    }

    // left zero fill a number
    // see http://jsperf.com/left-zero-filling for performance comparison
    function leftZeroFill(number, targetLength, forceSign) {
        var output = '' + Math.abs(number),
            sign = number >= 0;

        while (output.length < targetLength) {
            output = '0' + output;
        }
        return (sign ? (forceSign ? '+' : '') : '-') + output;
    }

    // helper function for _.addTime and _.subtractTime
    function addOrSubtractDurationFromMoment(mom, duration, isAdding, updateOffset) {
        var milliseconds = duration._milliseconds,
            days = duration._days,
            months = duration._months;
        updateOffset = updateOffset == null ? true : updateOffset;

        if (milliseconds) {
            mom._d.setTime(+mom._d + milliseconds * isAdding);
        }
        if (days) {
            rawSetter(mom, 'Date', rawGetter(mom, 'Date') + days * isAdding);
        }
        if (months) {
            rawMonthSetter(mom, rawGetter(mom, 'Month') + months * isAdding);
        }
        if (updateOffset) {
            moment.updateOffset(mom, days || months);
        }
    }

    // check if is an array
    function isArray(input) {
        return Object.prototype.toString.call(input) === '[object Array]';
    }

    function isDate(input) {
        return  Object.prototype.toString.call(input) === '[object Date]' ||
                input instanceof Date;
    }

    // compare two arrays, return the number of differences
    function compareArrays(array1, array2, dontConvert) {
        var len = Math.min(array1.length, array2.length),
            lengthDiff = Math.abs(array1.length - array2.length),
            diffs = 0,
            i;
        for (i = 0; i < len; i++) {
            if ((dontConvert && array1[i] !== array2[i]) ||
                (!dontConvert && toInt(array1[i]) !== toInt(array2[i]))) {
                diffs++;
            }
        }
        return diffs + lengthDiff;
    }

    function normalizeUnits(units) {
        if (units) {
            var lowered = units.toLowerCase().replace(/(.)s$/, '$1');
            units = unitAliases[units] || camelFunctions[lowered] || lowered;
        }
        return units;
    }

    function normalizeObjectUnits(inputObject) {
        var normalizedInput = {},
            normalizedProp,
            prop;

        for (prop in inputObject) {
            if (inputObject.hasOwnProperty(prop)) {
                normalizedProp = normalizeUnits(prop);
                if (normalizedProp) {
                    normalizedInput[normalizedProp] = inputObject[prop];
                }
            }
        }

        return normalizedInput;
    }

    function makeList(field) {
        var count, setter;

        if (field.indexOf('week') === 0) {
            count = 7;
            setter = 'day';
        }
        else if (field.indexOf('month') === 0) {
            count = 12;
            setter = 'month';
        }
        else {
            return;
        }

        moment[field] = function (format, index) {
            var i, getter,
                method = moment.fn._lang[field],
                results = [];

            if (typeof format === 'number') {
                index = format;
                format = undefined;
            }

            getter = function (i) {
                var m = moment().utc().set(setter, i);
                return method.call(moment.fn._lang, m, format || '');
            };

            if (index != null) {
                return getter(index);
            }
            else {
                for (i = 0; i < count; i++) {
                    results.push(getter(i));
                }
                return results;
            }
        };
    }

    function toInt(argumentForCoercion) {
        var coercedNumber = +argumentForCoercion,
            value = 0;

        if (coercedNumber !== 0 && isFinite(coercedNumber)) {
            if (coercedNumber >= 0) {
                value = Math.floor(coercedNumber);
            } else {
                value = Math.ceil(coercedNumber);
            }
        }

        return value;
    }

    function daysInMonth(year, month) {
        return new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
    }

    function weeksInYear(year, dow, doy) {
        return weekOfYear(moment([year, 11, 31 + dow - doy]), dow, doy).week;
    }

    function daysInYear(year) {
        return isLeapYear(year) ? 366 : 365;
    }

    function isLeapYear(year) {
        return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    }

    function checkOverflow(m) {
        var overflow;
        if (m._a && m._pf.overflow === -2) {
            overflow =
                m._a[MONTH] < 0 || m._a[MONTH] > 11 ? MONTH :
                m._a[DATE] < 1 || m._a[DATE] > daysInMonth(m._a[YEAR], m._a[MONTH]) ? DATE :
                m._a[HOUR] < 0 || m._a[HOUR] > 23 ? HOUR :
                m._a[MINUTE] < 0 || m._a[MINUTE] > 59 ? MINUTE :
                m._a[SECOND] < 0 || m._a[SECOND] > 59 ? SECOND :
                m._a[MILLISECOND] < 0 || m._a[MILLISECOND] > 999 ? MILLISECOND :
                -1;

            if (m._pf._overflowDayOfYear && (overflow < YEAR || overflow > DATE)) {
                overflow = DATE;
            }

            m._pf.overflow = overflow;
        }
    }

    function isValid(m) {
        if (m._isValid == null) {
            m._isValid = !isNaN(m._d.getTime()) &&
                m._pf.overflow < 0 &&
                !m._pf.empty &&
                !m._pf.invalidMonth &&
                !m._pf.nullInput &&
                !m._pf.invalidFormat &&
                !m._pf.userInvalidated;

            if (m._strict) {
                m._isValid = m._isValid &&
                    m._pf.charsLeftOver === 0 &&
                    m._pf.unusedTokens.length === 0;
            }
        }
        return m._isValid;
    }

    function normalizeLanguage(key) {
        return key ? key.toLowerCase().replace('_', '-') : key;
    }

    // Return a moment from input, that is local/utc/zone equivalent to model.
    function makeAs(input, model) {
        return model._isUTC ? moment(input).zone(model._offset || 0) :
            moment(input).local();
    }

    /************************************
        Languages
    ************************************/


    extend(Language.prototype, {

        set : function (config) {
            var prop, i;
            for (i in config) {
                prop = config[i];
                if (typeof prop === 'function') {
                    this[i] = prop;
                } else {
                    this['_' + i] = prop;
                }
            }
        },

        _months : "January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
        months : function (m) {
            return this._months[m.month()];
        },

        _monthsShort : "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),
        monthsShort : function (m) {
            return this._monthsShort[m.month()];
        },

        monthsParse : function (monthName) {
            var i, mom, regex;

            if (!this._monthsParse) {
                this._monthsParse = [];
            }

            for (i = 0; i < 12; i++) {
                // make the regex if we don't have it already
                if (!this._monthsParse[i]) {
                    mom = moment.utc([2000, i]);
                    regex = '^' + this.months(mom, '') + '|^' + this.monthsShort(mom, '');
                    this._monthsParse[i] = new RegExp(regex.replace('.', ''), 'i');
                }
                // test the regex
                if (this._monthsParse[i].test(monthName)) {
                    return i;
                }
            }
        },

        _weekdays : "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
        weekdays : function (m) {
            return this._weekdays[m.day()];
        },

        _weekdaysShort : "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),
        weekdaysShort : function (m) {
            return this._weekdaysShort[m.day()];
        },

        _weekdaysMin : "Su_Mo_Tu_We_Th_Fr_Sa".split("_"),
        weekdaysMin : function (m) {
            return this._weekdaysMin[m.day()];
        },

        weekdaysParse : function (weekdayName) {
            var i, mom, regex;

            if (!this._weekdaysParse) {
                this._weekdaysParse = [];
            }

            for (i = 0; i < 7; i++) {
                // make the regex if we don't have it already
                if (!this._weekdaysParse[i]) {
                    mom = moment([2000, 1]).day(i);
                    regex = '^' + this.weekdays(mom, '') + '|^' + this.weekdaysShort(mom, '') + '|^' + this.weekdaysMin(mom, '');
                    this._weekdaysParse[i] = new RegExp(regex.replace('.', ''), 'i');
                }
                // test the regex
                if (this._weekdaysParse[i].test(weekdayName)) {
                    return i;
                }
            }
        },

        _longDateFormat : {
            LT : "h:mm A",
            L : "MM/DD/YYYY",
            LL : "MMMM D YYYY",
            LLL : "MMMM D YYYY LT",
            LLLL : "dddd, MMMM D YYYY LT"
        },
        longDateFormat : function (key) {
            var output = this._longDateFormat[key];
            if (!output && this._longDateFormat[key.toUpperCase()]) {
                output = this._longDateFormat[key.toUpperCase()].replace(/MMMM|MM|DD|dddd/g, function (val) {
                    return val.slice(1);
                });
                this._longDateFormat[key] = output;
            }
            return output;
        },

        isPM : function (input) {
            // IE8 Quirks Mode & IE7 Standards Mode do not allow accessing strings like arrays
            // Using charAt should be more compatible.
            return ((input + '').toLowerCase().charAt(0) === 'p');
        },

        _meridiemParse : /[ap]\.?m?\.?/i,
        meridiem : function (hours, minutes, isLower) {
            if (hours > 11) {
                return isLower ? 'pm' : 'PM';
            } else {
                return isLower ? 'am' : 'AM';
            }
        },

        _calendar : {
            sameDay : '[Today at] LT',
            nextDay : '[Tomorrow at] LT',
            nextWeek : 'dddd [at] LT',
            lastDay : '[Yesterday at] LT',
            lastWeek : '[Last] dddd [at] LT',
            sameElse : 'L'
        },
        calendar : function (key, mom) {
            var output = this._calendar[key];
            return typeof output === 'function' ? output.apply(mom) : output;
        },

        _relativeTime : {
            future : "in %s",
            past : "%s ago",
            s : "a few seconds",
            m : "a minute",
            mm : "%d minutes",
            h : "an hour",
            hh : "%d hours",
            d : "a day",
            dd : "%d days",
            M : "a month",
            MM : "%d months",
            y : "a year",
            yy : "%d years"
        },
        relativeTime : function (number, withoutSuffix, string, isFuture) {
            var output = this._relativeTime[string];
            return (typeof output === 'function') ?
                output(number, withoutSuffix, string, isFuture) :
                output.replace(/%d/i, number);
        },
        pastFuture : function (diff, output) {
            var format = this._relativeTime[diff > 0 ? 'future' : 'past'];
            return typeof format === 'function' ? format(output) : format.replace(/%s/i, output);
        },

        ordinal : function (number) {
            return this._ordinal.replace("%d", number);
        },
        _ordinal : "%d",

        preparse : function (string) {
            return string;
        },

        postformat : function (string) {
            return string;
        },

        week : function (mom) {
            return weekOfYear(mom, this._week.dow, this._week.doy).week;
        },

        _week : {
            dow : 0, // Sunday is the first day of the week.
            doy : 6  // The week that contains Jan 1st is the first week of the year.
        },

        _invalidDate: 'Invalid date',
        invalidDate: function () {
            return this._invalidDate;
        }
    });

    // Loads a language definition into the `languages` cache.  The function
    // takes a key and optionally values.  If not in the browser and no values
    // are provided, it will load the language file module.  As a convenience,
    // this function also returns the language values.
    function loadLang(key, values) {
        values.abbr = key;
        if (!languages[key]) {
            languages[key] = new Language();
        }
        languages[key].set(values);
        return languages[key];
    }

    // Remove a language from the `languages` cache. Mostly useful in tests.
    function unloadLang(key) {
        delete languages[key];
    }

    // Determines which language definition to use and returns it.
    //
    // With no parameters, it will return the global language.  If you
    // pass in a language key, such as 'en', it will return the
    // definition for 'en', so long as 'en' has already been loaded using
    // moment.lang.
    function getLangDefinition(key) {
        var i = 0, j, lang, next, split,
            get = function (k) {
                if (!languages[k] && hasModule) {
                    try {
                        require('./lang/' + k);
                    } catch (e) { }
                }
                return languages[k];
            };

        if (!key) {
            return moment.fn._lang;
        }

        if (!isArray(key)) {
            //short-circuit everything else
            lang = get(key);
            if (lang) {
                return lang;
            }
            key = [key];
        }

        //pick the language from the array
        //try ['en-au', 'en-gb'] as 'en-au', 'en-gb', 'en', as in move through the list trying each
        //substring from most specific to least, but move to the next array item if it's a more specific variant than the current root
        while (i < key.length) {
            split = normalizeLanguage(key[i]).split('-');
            j = split.length;
            next = normalizeLanguage(key[i + 1]);
            next = next ? next.split('-') : null;
            while (j > 0) {
                lang = get(split.slice(0, j).join('-'));
                if (lang) {
                    return lang;
                }
                if (next && next.length >= j && compareArrays(split, next, true) >= j - 1) {
                    //the next array item is better than a shallower substring of this one
                    break;
                }
                j--;
            }
            i++;
        }
        return moment.fn._lang;
    }

    /************************************
        Formatting
    ************************************/


    function removeFormattingTokens(input) {
        if (input.match(/\[[\s\S]/)) {
            return input.replace(/^\[|\]$/g, "");
        }
        return input.replace(/\\/g, "");
    }

    function makeFormatFunction(format) {
        var array = format.match(formattingTokens), i, length;

        for (i = 0, length = array.length; i < length; i++) {
            if (formatTokenFunctions[array[i]]) {
                array[i] = formatTokenFunctions[array[i]];
            } else {
                array[i] = removeFormattingTokens(array[i]);
            }
        }

        return function (mom) {
            var output = "";
            for (i = 0; i < length; i++) {
                output += array[i] instanceof Function ? array[i].call(mom, format) : array[i];
            }
            return output;
        };
    }

    // format date using native date object
    function formatMoment(m, format) {

        if (!m.isValid()) {
            return m.lang().invalidDate();
        }

        format = expandFormat(format, m.lang());

        if (!formatFunctions[format]) {
            formatFunctions[format] = makeFormatFunction(format);
        }

        return formatFunctions[format](m);
    }

    function expandFormat(format, lang) {
        var i = 5;

        function replaceLongDateFormatTokens(input) {
            return lang.longDateFormat(input) || input;
        }

        localFormattingTokens.lastIndex = 0;
        while (i >= 0 && localFormattingTokens.test(format)) {
            format = format.replace(localFormattingTokens, replaceLongDateFormatTokens);
            localFormattingTokens.lastIndex = 0;
            i -= 1;
        }

        return format;
    }


    /************************************
        Parsing
    ************************************/


    // get the regex to find the next token
    function getParseRegexForToken(token, config) {
        var a, strict = config._strict;
        switch (token) {
        case 'Q':
            return parseTokenOneDigit;
        case 'DDDD':
            return parseTokenThreeDigits;
        case 'YYYY':
        case 'GGGG':
        case 'gggg':
            return strict ? parseTokenFourDigits : parseTokenOneToFourDigits;
        case 'Y':
        case 'G':
        case 'g':
            return parseTokenSignedNumber;
        case 'YYYYYY':
        case 'YYYYY':
        case 'GGGGG':
        case 'ggggg':
            return strict ? parseTokenSixDigits : parseTokenOneToSixDigits;
        case 'S':
            if (strict) { return parseTokenOneDigit; }
            /* falls through */
        case 'SS':
            if (strict) { return parseTokenTwoDigits; }
            /* falls through */
        case 'SSS':
            if (strict) { return parseTokenThreeDigits; }
            /* falls through */
        case 'DDD':
            return parseTokenOneToThreeDigits;
        case 'MMM':
        case 'MMMM':
        case 'dd':
        case 'ddd':
        case 'dddd':
            return parseTokenWord;
        case 'a':
        case 'A':
            return getLangDefinition(config._l)._meridiemParse;
        case 'X':
            return parseTokenTimestampMs;
        case 'Z':
        case 'ZZ':
            return parseTokenTimezone;
        case 'T':
            return parseTokenT;
        case 'SSSS':
            return parseTokenDigits;
        case 'MM':
        case 'DD':
        case 'YY':
        case 'GG':
        case 'gg':
        case 'HH':
        case 'hh':
        case 'mm':
        case 'ss':
        case 'ww':
        case 'WW':
            return strict ? parseTokenTwoDigits : parseTokenOneOrTwoDigits;
        case 'M':
        case 'D':
        case 'd':
        case 'H':
        case 'h':
        case 'm':
        case 's':
        case 'w':
        case 'W':
        case 'e':
        case 'E':
            return parseTokenOneOrTwoDigits;
        case 'Do':
            return parseTokenOrdinal;
        default :
            a = new RegExp(regexpEscape(unescapeFormat(token.replace('\\', '')), "i"));
            return a;
        }
    }

    function timezoneMinutesFromString(string) {
        string = string || "";
        var possibleTzMatches = (string.match(parseTokenTimezone) || []),
            tzChunk = possibleTzMatches[possibleTzMatches.length - 1] || [],
            parts = (tzChunk + '').match(parseTimezoneChunker) || ['-', 0, 0],
            minutes = +(parts[1] * 60) + toInt(parts[2]);

        return parts[0] === '+' ? -minutes : minutes;
    }

    // function to convert string input to date
    function addTimeToArrayFromToken(token, input, config) {
        var a, datePartArray = config._a;

        switch (token) {
        // QUARTER
        case 'Q':
            if (input != null) {
                datePartArray[MONTH] = (toInt(input) - 1) * 3;
            }
            break;
        // MONTH
        case 'M' : // fall through to MM
        case 'MM' :
            if (input != null) {
                datePartArray[MONTH] = toInt(input) - 1;
            }
            break;
        case 'MMM' : // fall through to MMMM
        case 'MMMM' :
            a = getLangDefinition(config._l).monthsParse(input);
            // if we didn't find a month name, mark the date as invalid.
            if (a != null) {
                datePartArray[MONTH] = a;
            } else {
                config._pf.invalidMonth = input;
            }
            break;
        // DAY OF MONTH
        case 'D' : // fall through to DD
        case 'DD' :
            if (input != null) {
                datePartArray[DATE] = toInt(input);
            }
            break;
        case 'Do' :
            if (input != null) {
                datePartArray[DATE] = toInt(parseInt(input, 10));
            }
            break;
        // DAY OF YEAR
        case 'DDD' : // fall through to DDDD
        case 'DDDD' :
            if (input != null) {
                config._dayOfYear = toInt(input);
            }

            break;
        // YEAR
        case 'YY' :
            datePartArray[YEAR] = moment.parseTwoDigitYear(input);
            break;
        case 'YYYY' :
        case 'YYYYY' :
        case 'YYYYYY' :
            datePartArray[YEAR] = toInt(input);
            break;
        // AM / PM
        case 'a' : // fall through to A
        case 'A' :
            config._isPm = getLangDefinition(config._l).isPM(input);
            break;
        // 24 HOUR
        case 'H' : // fall through to hh
        case 'HH' : // fall through to hh
        case 'h' : // fall through to hh
        case 'hh' :
            datePartArray[HOUR] = toInt(input);
            break;
        // MINUTE
        case 'm' : // fall through to mm
        case 'mm' :
            datePartArray[MINUTE] = toInt(input);
            break;
        // SECOND
        case 's' : // fall through to ss
        case 'ss' :
            datePartArray[SECOND] = toInt(input);
            break;
        // MILLISECOND
        case 'S' :
        case 'SS' :
        case 'SSS' :
        case 'SSSS' :
            datePartArray[MILLISECOND] = toInt(('0.' + input) * 1000);
            break;
        // UNIX TIMESTAMP WITH MS
        case 'X':
            config._d = new Date(parseFloat(input) * 1000);
            break;
        // TIMEZONE
        case 'Z' : // fall through to ZZ
        case 'ZZ' :
            config._useUTC = true;
            config._tzm = timezoneMinutesFromString(input);
            break;
        case 'w':
        case 'ww':
        case 'W':
        case 'WW':
        case 'd':
        case 'dd':
        case 'ddd':
        case 'dddd':
        case 'e':
        case 'E':
            token = token.substr(0, 1);
            /* falls through */
        case 'gg':
        case 'gggg':
        case 'GG':
        case 'GGGG':
        case 'GGGGG':
            token = token.substr(0, 2);
            if (input) {
                config._w = config._w || {};
                config._w[token] = input;
            }
            break;
        }
    }

    // convert an array to a date.
    // the array should mirror the parameters below
    // note: all values past the year are optional and will default to the lowest possible value.
    // [year, month, day , hour, minute, second, millisecond]
    function dateFromConfig(config) {
        var i, date, input = [], currentDate,
            yearToUse, fixYear, w, temp, lang, weekday, week;

        if (config._d) {
            return;
        }

        currentDate = currentDateArray(config);

        //compute day of the year from weeks and weekdays
        if (config._w && config._a[DATE] == null && config._a[MONTH] == null) {
            fixYear = function (val) {
                var intVal = parseInt(val, 10);
                return val ?
                  (val.length < 3 ? (intVal > 68 ? 1900 + intVal : 2000 + intVal) : intVal) :
                  (config._a[YEAR] == null ? moment().weekYear() : config._a[YEAR]);
            };

            w = config._w;
            if (w.GG != null || w.W != null || w.E != null) {
                temp = dayOfYearFromWeeks(fixYear(w.GG), w.W || 1, w.E, 4, 1);
            }
            else {
                lang = getLangDefinition(config._l);
                weekday = w.d != null ?  parseWeekday(w.d, lang) :
                  (w.e != null ?  parseInt(w.e, 10) + lang._week.dow : 0);

                week = parseInt(w.w, 10) || 1;

                //if we're parsing 'd', then the low day numbers may be next week
                if (w.d != null && weekday < lang._week.dow) {
                    week++;
                }

                temp = dayOfYearFromWeeks(fixYear(w.gg), week, weekday, lang._week.doy, lang._week.dow);
            }

            config._a[YEAR] = temp.year;
            config._dayOfYear = temp.dayOfYear;
        }

        //if the day of the year is set, figure out what it is
        if (config._dayOfYear) {
            yearToUse = config._a[YEAR] == null ? currentDate[YEAR] : config._a[YEAR];

            if (config._dayOfYear > daysInYear(yearToUse)) {
                config._pf._overflowDayOfYear = true;
            }

            date = makeUTCDate(yearToUse, 0, config._dayOfYear);
            config._a[MONTH] = date.getUTCMonth();
            config._a[DATE] = date.getUTCDate();
        }

        // Default to current date.
        // * if no year, month, day of month are given, default to today
        // * if day of month is given, default month and year
        // * if month is given, default only year
        // * if year is given, don't default anything
        for (i = 0; i < 3 && config._a[i] == null; ++i) {
            config._a[i] = input[i] = currentDate[i];
        }

        // Zero out whatever was not defaulted, including time
        for (; i < 7; i++) {
            config._a[i] = input[i] = (config._a[i] == null) ? (i === 2 ? 1 : 0) : config._a[i];
        }

        // add the offsets to the time to be parsed so that we can have a clean array for checking isValid
        input[HOUR] += toInt((config._tzm || 0) / 60);
        input[MINUTE] += toInt((config._tzm || 0) % 60);

        config._d = (config._useUTC ? makeUTCDate : makeDate).apply(null, input);
    }

    function dateFromObject(config) {
        var normalizedInput;

        if (config._d) {
            return;
        }

        normalizedInput = normalizeObjectUnits(config._i);
        config._a = [
            normalizedInput.year,
            normalizedInput.month,
            normalizedInput.day,
            normalizedInput.hour,
            normalizedInput.minute,
            normalizedInput.second,
            normalizedInput.millisecond
        ];

        dateFromConfig(config);
    }

    function currentDateArray(config) {
        var now = new Date();
        if (config._useUTC) {
            return [
                now.getUTCFullYear(),
                now.getUTCMonth(),
                now.getUTCDate()
            ];
        } else {
            return [now.getFullYear(), now.getMonth(), now.getDate()];
        }
    }

    // date from string and format string
    function makeDateFromStringAndFormat(config) {

        config._a = [];
        config._pf.empty = true;

        // This array is used to make a Date, either with `new Date` or `Date.UTC`
        var lang = getLangDefinition(config._l),
            string = '' + config._i,
            i, parsedInput, tokens, token, skipped,
            stringLength = string.length,
            totalParsedInputLength = 0;

        tokens = expandFormat(config._f, lang).match(formattingTokens) || [];

        for (i = 0; i < tokens.length; i++) {
            token = tokens[i];
            parsedInput = (string.match(getParseRegexForToken(token, config)) || [])[0];
            if (parsedInput) {
                skipped = string.substr(0, string.indexOf(parsedInput));
                if (skipped.length > 0) {
                    config._pf.unusedInput.push(skipped);
                }
                string = string.slice(string.indexOf(parsedInput) + parsedInput.length);
                totalParsedInputLength += parsedInput.length;
            }
            // don't parse if it's not a known token
            if (formatTokenFunctions[token]) {
                if (parsedInput) {
                    config._pf.empty = false;
                }
                else {
                    config._pf.unusedTokens.push(token);
                }
                addTimeToArrayFromToken(token, parsedInput, config);
            }
            else if (config._strict && !parsedInput) {
                config._pf.unusedTokens.push(token);
            }
        }

        // add remaining unparsed input length to the string
        config._pf.charsLeftOver = stringLength - totalParsedInputLength;
        if (string.length > 0) {
            config._pf.unusedInput.push(string);
        }

        // handle am pm
        if (config._isPm && config._a[HOUR] < 12) {
            config._a[HOUR] += 12;
        }
        // if is 12 am, change hours to 0
        if (config._isPm === false && config._a[HOUR] === 12) {
            config._a[HOUR] = 0;
        }

        dateFromConfig(config);
        checkOverflow(config);
    }

    function unescapeFormat(s) {
        return s.replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function (matched, p1, p2, p3, p4) {
            return p1 || p2 || p3 || p4;
        });
    }

    // Code from http://stackoverflow.com/questions/3561493/is-there-a-regexp-escape-function-in-javascript
    function regexpEscape(s) {
        return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    }

    // date from string and array of format strings
    function makeDateFromStringAndArray(config) {
        var tempConfig,
            bestMoment,

            scoreToBeat,
            i,
            currentScore;

        if (config._f.length === 0) {
            config._pf.invalidFormat = true;
            config._d = new Date(NaN);
            return;
        }

        for (i = 0; i < config._f.length; i++) {
            currentScore = 0;
            tempConfig = extend({}, config);
            tempConfig._pf = defaultParsingFlags();
            tempConfig._f = config._f[i];
            makeDateFromStringAndFormat(tempConfig);

            if (!isValid(tempConfig)) {
                continue;
            }

            // if there is any input that was not parsed add a penalty for that format
            currentScore += tempConfig._pf.charsLeftOver;

            //or tokens
            currentScore += tempConfig._pf.unusedTokens.length * 10;

            tempConfig._pf.score = currentScore;

            if (scoreToBeat == null || currentScore < scoreToBeat) {
                scoreToBeat = currentScore;
                bestMoment = tempConfig;
            }
        }

        extend(config, bestMoment || tempConfig);
    }

    // date from iso format
    function makeDateFromString(config) {
        var i, l,
            string = config._i,
            match = isoRegex.exec(string);

        if (match) {
            config._pf.iso = true;
            for (i = 0, l = isoDates.length; i < l; i++) {
                if (isoDates[i][1].exec(string)) {
                    // match[5] should be "T" or undefined
                    config._f = isoDates[i][0] + (match[6] || " ");
                    break;
                }
            }
            for (i = 0, l = isoTimes.length; i < l; i++) {
                if (isoTimes[i][1].exec(string)) {
                    config._f += isoTimes[i][0];
                    break;
                }
            }
            if (string.match(parseTokenTimezone)) {
                config._f += "Z";
            }
            makeDateFromStringAndFormat(config);
        }
        else {
            moment.createFromInputFallback(config);
        }
    }

    function makeDateFromInput(config) {
        var input = config._i,
            matched = aspNetJsonRegex.exec(input);

        if (input === undefined) {
            config._d = new Date();
        } else if (matched) {
            config._d = new Date(+matched[1]);
        } else if (typeof input === 'string') {
            makeDateFromString(config);
        } else if (isArray(input)) {
            config._a = input.slice(0);
            dateFromConfig(config);
        } else if (isDate(input)) {
            config._d = new Date(+input);
        } else if (typeof(input) === 'object') {
            dateFromObject(config);
        } else if (typeof(input) === 'number') {
            // from milliseconds
            config._d = new Date(input);
        } else {
            moment.createFromInputFallback(config);
        }
    }

    function makeDate(y, m, d, h, M, s, ms) {
        //can't just apply() to create a date:
        //http://stackoverflow.com/questions/181348/instantiating-a-javascript-object-by-calling-prototype-constructor-apply
        var date = new Date(y, m, d, h, M, s, ms);

        //the date constructor doesn't accept years < 1970
        if (y < 1970) {
            date.setFullYear(y);
        }
        return date;
    }

    function makeUTCDate(y) {
        var date = new Date(Date.UTC.apply(null, arguments));
        if (y < 1970) {
            date.setUTCFullYear(y);
        }
        return date;
    }

    function parseWeekday(input, language) {
        if (typeof input === 'string') {
            if (!isNaN(input)) {
                input = parseInt(input, 10);
            }
            else {
                input = language.weekdaysParse(input);
                if (typeof input !== 'number') {
                    return null;
                }
            }
        }
        return input;
    }

    /************************************
        Relative Time
    ************************************/


    // helper function for moment.fn.from, moment.fn.fromNow, and moment.duration.fn.humanize
    function substituteTimeAgo(string, number, withoutSuffix, isFuture, lang) {
        return lang.relativeTime(number || 1, !!withoutSuffix, string, isFuture);
    }

    function relativeTime(milliseconds, withoutSuffix, lang) {
        var seconds = round(Math.abs(milliseconds) / 1000),
            minutes = round(seconds / 60),
            hours = round(minutes / 60),
            days = round(hours / 24),
            years = round(days / 365),
            args = seconds < 45 && ['s', seconds] ||
                minutes === 1 && ['m'] ||
                minutes < 45 && ['mm', minutes] ||
                hours === 1 && ['h'] ||
                hours < 22 && ['hh', hours] ||
                days === 1 && ['d'] ||
                days <= 25 && ['dd', days] ||
                days <= 45 && ['M'] ||
                days < 345 && ['MM', round(days / 30)] ||
                years === 1 && ['y'] || ['yy', years];
        args[2] = withoutSuffix;
        args[3] = milliseconds > 0;
        args[4] = lang;
        return substituteTimeAgo.apply({}, args);
    }


    /************************************
        Week of Year
    ************************************/


    // firstDayOfWeek       0 = sun, 6 = sat
    //                      the day of the week that starts the week
    //                      (usually sunday or monday)
    // firstDayOfWeekOfYear 0 = sun, 6 = sat
    //                      the first week is the week that contains the first
    //                      of this day of the week
    //                      (eg. ISO weeks use thursday (4))
    function weekOfYear(mom, firstDayOfWeek, firstDayOfWeekOfYear) {
        var end = firstDayOfWeekOfYear - firstDayOfWeek,
            daysToDayOfWeek = firstDayOfWeekOfYear - mom.day(),
            adjustedMoment;


        if (daysToDayOfWeek > end) {
            daysToDayOfWeek -= 7;
        }

        if (daysToDayOfWeek < end - 7) {
            daysToDayOfWeek += 7;
        }

        adjustedMoment = moment(mom).add('d', daysToDayOfWeek);
        return {
            week: Math.ceil(adjustedMoment.dayOfYear() / 7),
            year: adjustedMoment.year()
        };
    }

    //http://en.wikipedia.org/wiki/ISO_week_date#Calculating_a_date_given_the_year.2C_week_number_and_weekday
    function dayOfYearFromWeeks(year, week, weekday, firstDayOfWeekOfYear, firstDayOfWeek) {
        var d = makeUTCDate(year, 0, 1).getUTCDay(), daysToAdd, dayOfYear;

        weekday = weekday != null ? weekday : firstDayOfWeek;
        daysToAdd = firstDayOfWeek - d + (d > firstDayOfWeekOfYear ? 7 : 0) - (d < firstDayOfWeek ? 7 : 0);
        dayOfYear = 7 * (week - 1) + (weekday - firstDayOfWeek) + daysToAdd + 1;

        return {
            year: dayOfYear > 0 ? year : year - 1,
            dayOfYear: dayOfYear > 0 ?  dayOfYear : daysInYear(year - 1) + dayOfYear
        };
    }

    /************************************
        Top Level Functions
    ************************************/

    function makeMoment(config) {
        var input = config._i,
            format = config._f;

        if (input === null || (format === undefined && input === '')) {
            return moment.invalid({nullInput: true});
        }

        if (typeof input === 'string') {
            config._i = input = getLangDefinition().preparse(input);
        }

        if (moment.isMoment(input)) {
            config = cloneMoment(input);

            config._d = new Date(+input._d);
        } else if (format) {
            if (isArray(format)) {
                makeDateFromStringAndArray(config);
            } else {
                makeDateFromStringAndFormat(config);
            }
        } else {
            makeDateFromInput(config);
        }

        return new Moment(config);
    }

    moment = function (input, format, lang, strict) {
        var c;

        if (typeof(lang) === "boolean") {
            strict = lang;
            lang = undefined;
        }
        // object construction must be done this way.
        // https://github.com/moment/moment/issues/1423
        c = {};
        c._isAMomentObject = true;
        c._i = input;
        c._f = format;
        c._l = lang;
        c._strict = strict;
        c._isUTC = false;
        c._pf = defaultParsingFlags();

        return makeMoment(c);
    };

    moment.suppressDeprecationWarnings = false;

    moment.createFromInputFallback = deprecate(
            "moment construction falls back to js Date. This is " +
            "discouraged and will be removed in upcoming major " +
            "release. Please refer to " +
            "https://github.com/moment/moment/issues/1407 for more info.",
            function (config) {
        config._d = new Date(config._i);
    });

    // creating with utc
    moment.utc = function (input, format, lang, strict) {
        var c;

        if (typeof(lang) === "boolean") {
            strict = lang;
            lang = undefined;
        }
        // object construction must be done this way.
        // https://github.com/moment/moment/issues/1423
        c = {};
        c._isAMomentObject = true;
        c._useUTC = true;
        c._isUTC = true;
        c._l = lang;
        c._i = input;
        c._f = format;
        c._strict = strict;
        c._pf = defaultParsingFlags();

        return makeMoment(c).utc();
    };

    // creating with unix timestamp (in seconds)
    moment.unix = function (input) {
        return moment(input * 1000);
    };

    // duration
    moment.duration = function (input, key) {
        var duration = input,
            // matching against regexp is expensive, do it on demand
            match = null,
            sign,
            ret,
            parseIso;

        if (moment.isDuration(input)) {
            duration = {
                ms: input._milliseconds,
                d: input._days,
                M: input._months
            };
        } else if (typeof input === 'number') {
            duration = {};
            if (key) {
                duration[key] = input;
            } else {
                duration.milliseconds = input;
            }
        } else if (!!(match = aspNetTimeSpanJsonRegex.exec(input))) {
            sign = (match[1] === "-") ? -1 : 1;
            duration = {
                y: 0,
                d: toInt(match[DATE]) * sign,
                h: toInt(match[HOUR]) * sign,
                m: toInt(match[MINUTE]) * sign,
                s: toInt(match[SECOND]) * sign,
                ms: toInt(match[MILLISECOND]) * sign
            };
        } else if (!!(match = isoDurationRegex.exec(input))) {
            sign = (match[1] === "-") ? -1 : 1;
            parseIso = function (inp) {
                // We'd normally use ~~inp for this, but unfortunately it also
                // converts floats to ints.
                // inp may be undefined, so careful calling replace on it.
                var res = inp && parseFloat(inp.replace(',', '.'));
                // apply sign while we're at it
                return (isNaN(res) ? 0 : res) * sign;
            };
            duration = {
                y: parseIso(match[2]),
                M: parseIso(match[3]),
                d: parseIso(match[4]),
                h: parseIso(match[5]),
                m: parseIso(match[6]),
                s: parseIso(match[7]),
                w: parseIso(match[8])
            };
        }

        ret = new Duration(duration);

        if (moment.isDuration(input) && input.hasOwnProperty('_lang')) {
            ret._lang = input._lang;
        }

        return ret;
    };

    // version number
    moment.version = VERSION;

    // default format
    moment.defaultFormat = isoFormat;

    // Plugins that add properties should also add the key here (null value),
    // so we can properly clone ourselves.
    moment.momentProperties = momentProperties;

    // This function will be called whenever a moment is mutated.
    // It is intended to keep the offset in sync with the timezone.
    moment.updateOffset = function () {};

    // This function will load languages and then set the global language.  If
    // no arguments are passed in, it will simply return the current global
    // language key.
    moment.lang = function (key, values) {
        var r;
        if (!key) {
            return moment.fn._lang._abbr;
        }
        if (values) {
            loadLang(normalizeLanguage(key), values);
        } else if (values === null) {
            unloadLang(key);
            key = 'en';
        } else if (!languages[key]) {
            getLangDefinition(key);
        }
        r = moment.duration.fn._lang = moment.fn._lang = getLangDefinition(key);
        return r._abbr;
    };

    // returns language data
    moment.langData = function (key) {
        if (key && key._lang && key._lang._abbr) {
            key = key._lang._abbr;
        }
        return getLangDefinition(key);
    };

    // compare moment object
    moment.isMoment = function (obj) {
        return obj instanceof Moment ||
            (obj != null &&  obj.hasOwnProperty('_isAMomentObject'));
    };

    // for typechecking Duration objects
    moment.isDuration = function (obj) {
        return obj instanceof Duration;
    };

    for (i = lists.length - 1; i >= 0; --i) {
        makeList(lists[i]);
    }

    moment.normalizeUnits = function (units) {
        return normalizeUnits(units);
    };

    moment.invalid = function (flags) {
        var m = moment.utc(NaN);
        if (flags != null) {
            extend(m._pf, flags);
        }
        else {
            m._pf.userInvalidated = true;
        }

        return m;
    };

    moment.parseZone = function () {
        return moment.apply(null, arguments).parseZone();
    };

    moment.parseTwoDigitYear = function (input) {
        return toInt(input) + (toInt(input) > 68 ? 1900 : 2000);
    };

    /************************************
        Moment Prototype
    ************************************/


    extend(moment.fn = Moment.prototype, {

        clone : function () {
            return moment(this);
        },

        valueOf : function () {
            return +this._d + ((this._offset || 0) * 60000);
        },

        unix : function () {
            return Math.floor(+this / 1000);
        },

        toString : function () {
            return this.clone().lang('en').format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ");
        },

        toDate : function () {
            return this._offset ? new Date(+this) : this._d;
        },

        toISOString : function () {
            var m = moment(this).utc();
            if (0 < m.year() && m.year() <= 9999) {
                return formatMoment(m, 'YYYY-MM-DD[T]HH:mm:ss.SSS[Z]');
            } else {
                return formatMoment(m, 'YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]');
            }
        },

        toArray : function () {
            var m = this;
            return [
                m.year(),
                m.month(),
                m.date(),
                m.hours(),
                m.minutes(),
                m.seconds(),
                m.milliseconds()
            ];
        },

        isValid : function () {
            return isValid(this);
        },

        isDSTShifted : function () {

            if (this._a) {
                return this.isValid() && compareArrays(this._a, (this._isUTC ? moment.utc(this._a) : moment(this._a)).toArray()) > 0;
            }

            return false;
        },

        parsingFlags : function () {
            return extend({}, this._pf);
        },

        invalidAt: function () {
            return this._pf.overflow;
        },

        utc : function () {
            return this.zone(0);
        },

        local : function () {
            this.zone(0);
            this._isUTC = false;
            return this;
        },

        format : function (inputString) {
            var output = formatMoment(this, inputString || moment.defaultFormat);
            return this.lang().postformat(output);
        },

        add : function (input, val) {
            var dur;
            // switch args to support add('s', 1) and add(1, 's')
            if (typeof input === 'string') {
                dur = moment.duration(+val, input);
            } else {
                dur = moment.duration(input, val);
            }
            addOrSubtractDurationFromMoment(this, dur, 1);
            return this;
        },

        subtract : function (input, val) {
            var dur;
            // switch args to support subtract('s', 1) and subtract(1, 's')
            if (typeof input === 'string') {
                dur = moment.duration(+val, input);
            } else {
                dur = moment.duration(input, val);
            }
            addOrSubtractDurationFromMoment(this, dur, -1);
            return this;
        },

        diff : function (input, units, asFloat) {
            var that = makeAs(input, this),
                zoneDiff = (this.zone() - that.zone()) * 6e4,
                diff, output;

            units = normalizeUnits(units);

            if (units === 'year' || units === 'month') {
                // average number of days in the months in the given dates
                diff = (this.daysInMonth() + that.daysInMonth()) * 432e5; // 24 * 60 * 60 * 1000 / 2
                // difference in months
                output = ((this.year() - that.year()) * 12) + (this.month() - that.month());
                // adjust by taking difference in days, average number of days
                // and dst in the given months.
                output += ((this - moment(this).startOf('month')) -
                        (that - moment(that).startOf('month'))) / diff;
                // same as above but with zones, to negate all dst
                output -= ((this.zone() - moment(this).startOf('month').zone()) -
                        (that.zone() - moment(that).startOf('month').zone())) * 6e4 / diff;
                if (units === 'year') {
                    output = output / 12;
                }
            } else {
                diff = (this - that);
                output = units === 'second' ? diff / 1e3 : // 1000
                    units === 'minute' ? diff / 6e4 : // 1000 * 60
                    units === 'hour' ? diff / 36e5 : // 1000 * 60 * 60
                    units === 'day' ? (diff - zoneDiff) / 864e5 : // 1000 * 60 * 60 * 24, negate dst
                    units === 'week' ? (diff - zoneDiff) / 6048e5 : // 1000 * 60 * 60 * 24 * 7, negate dst
                    diff;
            }
            return asFloat ? output : absRound(output);
        },

        from : function (time, withoutSuffix) {
            return moment.duration(this.diff(time)).lang(this.lang()._abbr).humanize(!withoutSuffix);
        },

        fromNow : function (withoutSuffix) {
            return this.from(moment(), withoutSuffix);
        },

        calendar : function () {
            // We want to compare the start of today, vs this.
            // Getting start-of-today depends on whether we're zone'd or not.
            var sod = makeAs(moment(), this).startOf('day'),
                diff = this.diff(sod, 'days', true),
                format = diff < -6 ? 'sameElse' :
                    diff < -1 ? 'lastWeek' :
                    diff < 0 ? 'lastDay' :
                    diff < 1 ? 'sameDay' :
                    diff < 2 ? 'nextDay' :
                    diff < 7 ? 'nextWeek' : 'sameElse';
            return this.format(this.lang().calendar(format, this));
        },

        isLeapYear : function () {
            return isLeapYear(this.year());
        },

        isDST : function () {
            return (this.zone() < this.clone().month(0).zone() ||
                this.zone() < this.clone().month(5).zone());
        },

        day : function (input) {
            var day = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
            if (input != null) {
                input = parseWeekday(input, this.lang());
                return this.add({ d : input - day });
            } else {
                return day;
            }
        },

        month : makeAccessor('Month', true),

        startOf: function (units) {
            units = normalizeUnits(units);
            // the following switch intentionally omits break keywords
            // to utilize falling through the cases.
            switch (units) {
            case 'year':
                this.month(0);
                /* falls through */
            case 'quarter':
            case 'month':
                this.date(1);
                /* falls through */
            case 'week':
            case 'isoWeek':
            case 'day':
                this.hours(0);
                /* falls through */
            case 'hour':
                this.minutes(0);
                /* falls through */
            case 'minute':
                this.seconds(0);
                /* falls through */
            case 'second':
                this.milliseconds(0);
                /* falls through */
            }

            // weeks are a special case
            if (units === 'week') {
                this.weekday(0);
            } else if (units === 'isoWeek') {
                this.isoWeekday(1);
            }

            // quarters are also special
            if (units === 'quarter') {
                this.month(Math.floor(this.month() / 3) * 3);
            }

            return this;
        },

        endOf: function (units) {
            units = normalizeUnits(units);
            return this.startOf(units).add((units === 'isoWeek' ? 'week' : units), 1).subtract('ms', 1);
        },

        isAfter: function (input, units) {
            units = typeof units !== 'undefined' ? units : 'millisecond';
            return +this.clone().startOf(units) > +moment(input).startOf(units);
        },

        isBefore: function (input, units) {
            units = typeof units !== 'undefined' ? units : 'millisecond';
            return +this.clone().startOf(units) < +moment(input).startOf(units);
        },

        isSame: function (input, units) {
            units = units || 'ms';
            return +this.clone().startOf(units) === +makeAs(input, this).startOf(units);
        },

        min: function (other) {
            other = moment.apply(null, arguments);
            return other < this ? this : other;
        },

        max: function (other) {
            other = moment.apply(null, arguments);
            return other > this ? this : other;
        },

        // keepTime = true means only change the timezone, without affecting
        // the local hour. So 5:31:26 +0300 --[zone(2, true)]--> 5:31:26 +0200
        // It is possible that 5:31:26 doesn't exist int zone +0200, so we
        // adjust the time as needed, to be valid.
        //
        // Keeping the time actually adds/subtracts (one hour)
        // from the actual represented time. That is why we call updateOffset
        // a second time. In case it wants us to change the offset again
        // _changeInProgress == true case, then we have to adjust, because
        // there is no such time in the given timezone.
        zone : function (input, keepTime) {
            var offset = this._offset || 0;
            if (input != null) {
                if (typeof input === "string") {
                    input = timezoneMinutesFromString(input);
                }
                if (Math.abs(input) < 16) {
                    input = input * 60;
                }
                this._offset = input;
                this._isUTC = true;
                if (offset !== input) {
                    if (!keepTime || this._changeInProgress) {
                        addOrSubtractDurationFromMoment(this,
                                moment.duration(offset - input, 'm'), 1, false);
                    } else if (!this._changeInProgress) {
                        this._changeInProgress = true;
                        moment.updateOffset(this, true);
                        this._changeInProgress = null;
                    }
                }
            } else {
                return this._isUTC ? offset : this._d.getTimezoneOffset();
            }
            return this;
        },

        zoneAbbr : function () {
            return this._isUTC ? "UTC" : "";
        },

        zoneName : function () {
            return this._isUTC ? "Coordinated Universal Time" : "";
        },

        parseZone : function () {
            if (this._tzm) {
                this.zone(this._tzm);
            } else if (typeof this._i === 'string') {
                this.zone(this._i);
            }
            return this;
        },

        hasAlignedHourOffset : function (input) {
            if (!input) {
                input = 0;
            }
            else {
                input = moment(input).zone();
            }

            return (this.zone() - input) % 60 === 0;
        },

        daysInMonth : function () {
            return daysInMonth(this.year(), this.month());
        },

        dayOfYear : function (input) {
            var dayOfYear = round((moment(this).startOf('day') - moment(this).startOf('year')) / 864e5) + 1;
            return input == null ? dayOfYear : this.add("d", (input - dayOfYear));
        },

        quarter : function (input) {
            return input == null ? Math.ceil((this.month() + 1) / 3) : this.month((input - 1) * 3 + this.month() % 3);
        },

        weekYear : function (input) {
            var year = weekOfYear(this, this.lang()._week.dow, this.lang()._week.doy).year;
            return input == null ? year : this.add("y", (input - year));
        },

        isoWeekYear : function (input) {
            var year = weekOfYear(this, 1, 4).year;
            return input == null ? year : this.add("y", (input - year));
        },

        week : function (input) {
            var week = this.lang().week(this);
            return input == null ? week : this.add("d", (input - week) * 7);
        },

        isoWeek : function (input) {
            var week = weekOfYear(this, 1, 4).week;
            return input == null ? week : this.add("d", (input - week) * 7);
        },

        weekday : function (input) {
            var weekday = (this.day() + 7 - this.lang()._week.dow) % 7;
            return input == null ? weekday : this.add("d", input - weekday);
        },

        isoWeekday : function (input) {
            // behaves the same as moment#day except
            // as a getter, returns 7 instead of 0 (1-7 range instead of 0-6)
            // as a setter, sunday should belong to the previous week.
            return input == null ? this.day() || 7 : this.day(this.day() % 7 ? input : input - 7);
        },

        isoWeeksInYear : function () {
            return weeksInYear(this.year(), 1, 4);
        },

        weeksInYear : function () {
            var weekInfo = this._lang._week;
            return weeksInYear(this.year(), weekInfo.dow, weekInfo.doy);
        },

        get : function (units) {
            units = normalizeUnits(units);
            return this[units]();
        },

        set : function (units, value) {
            units = normalizeUnits(units);
            if (typeof this[units] === 'function') {
                this[units](value);
            }
            return this;
        },

        // If passed a language key, it will set the language for this
        // instance.  Otherwise, it will return the language configuration
        // variables for this instance.
        lang : function (key) {
            if (key === undefined) {
                return this._lang;
            } else {
                this._lang = getLangDefinition(key);
                return this;
            }
        }
    });

    function rawMonthSetter(mom, value) {
        var dayOfMonth;

        // TODO: Move this out of here!
        if (typeof value === 'string') {
            value = mom.lang().monthsParse(value);
            // TODO: Another silent failure?
            if (typeof value !== 'number') {
                return mom;
            }
        }

        dayOfMonth = Math.min(mom.date(),
                daysInMonth(mom.year(), value));
        mom._d['set' + (mom._isUTC ? 'UTC' : '') + 'Month'](value, dayOfMonth);
        return mom;
    }

    function rawGetter(mom, unit) {
        return mom._d['get' + (mom._isUTC ? 'UTC' : '') + unit]();
    }

    function rawSetter(mom, unit, value) {
        if (unit === 'Month') {
            return rawMonthSetter(mom, value);
        } else {
            return mom._d['set' + (mom._isUTC ? 'UTC' : '') + unit](value);
        }
    }

    function makeAccessor(unit, keepTime) {
        return function (value) {
            if (value != null) {
                rawSetter(this, unit, value);
                moment.updateOffset(this, keepTime);
                return this;
            } else {
                return rawGetter(this, unit);
            }
        };
    }

    moment.fn.millisecond = moment.fn.milliseconds = makeAccessor('Milliseconds', false);
    moment.fn.second = moment.fn.seconds = makeAccessor('Seconds', false);
    moment.fn.minute = moment.fn.minutes = makeAccessor('Minutes', false);
    // Setting the hour should keep the time, because the user explicitly
    // specified which hour he wants. So trying to maintain the same hour (in
    // a new timezone) makes sense. Adding/subtracting hours does not follow
    // this rule.
    moment.fn.hour = moment.fn.hours = makeAccessor('Hours', true);
    // moment.fn.month is defined separately
    moment.fn.date = makeAccessor('Date', true);
    moment.fn.dates = deprecate("dates accessor is deprecated. Use date instead.", makeAccessor('Date', true));
    moment.fn.year = makeAccessor('FullYear', true);
    moment.fn.years = deprecate("years accessor is deprecated. Use year instead.", makeAccessor('FullYear', true));

    // add plural methods
    moment.fn.days = moment.fn.day;
    moment.fn.months = moment.fn.month;
    moment.fn.weeks = moment.fn.week;
    moment.fn.isoWeeks = moment.fn.isoWeek;
    moment.fn.quarters = moment.fn.quarter;

    // add aliased format methods
    moment.fn.toJSON = moment.fn.toISOString;

    /************************************
        Duration Prototype
    ************************************/


    extend(moment.duration.fn = Duration.prototype, {

        _bubble : function () {
            var milliseconds = this._milliseconds,
                days = this._days,
                months = this._months,
                data = this._data,
                seconds, minutes, hours, years;

            // The following code bubbles up values, see the tests for
            // examples of what that means.
            data.milliseconds = milliseconds % 1000;

            seconds = absRound(milliseconds / 1000);
            data.seconds = seconds % 60;

            minutes = absRound(seconds / 60);
            data.minutes = minutes % 60;

            hours = absRound(minutes / 60);
            data.hours = hours % 24;

            days += absRound(hours / 24);
            data.days = days % 30;

            months += absRound(days / 30);
            data.months = months % 12;

            years = absRound(months / 12);
            data.years = years;
        },

        weeks : function () {
            return absRound(this.days() / 7);
        },

        valueOf : function () {
            return this._milliseconds +
              this._days * 864e5 +
              (this._months % 12) * 2592e6 +
              toInt(this._months / 12) * 31536e6;
        },

        humanize : function (withSuffix) {
            var difference = +this,
                output = relativeTime(difference, !withSuffix, this.lang());

            if (withSuffix) {
                output = this.lang().pastFuture(difference, output);
            }

            return this.lang().postformat(output);
        },

        add : function (input, val) {
            // supports only 2.0-style add(1, 's') or add(moment)
            var dur = moment.duration(input, val);

            this._milliseconds += dur._milliseconds;
            this._days += dur._days;
            this._months += dur._months;

            this._bubble();

            return this;
        },

        subtract : function (input, val) {
            var dur = moment.duration(input, val);

            this._milliseconds -= dur._milliseconds;
            this._days -= dur._days;
            this._months -= dur._months;

            this._bubble();

            return this;
        },

        get : function (units) {
            units = normalizeUnits(units);
            return this[units.toLowerCase() + 's']();
        },

        as : function (units) {
            units = normalizeUnits(units);
            return this['as' + units.charAt(0).toUpperCase() + units.slice(1) + 's']();
        },

        lang : moment.fn.lang,

        toIsoString : function () {
            // inspired by https://github.com/dordille/moment-isoduration/blob/master/moment.isoduration.js
            var years = Math.abs(this.years()),
                months = Math.abs(this.months()),
                days = Math.abs(this.days()),
                hours = Math.abs(this.hours()),
                minutes = Math.abs(this.minutes()),
                seconds = Math.abs(this.seconds() + this.milliseconds() / 1000);

            if (!this.asSeconds()) {
                // this is the same as C#'s (Noda) and python (isodate)...
                // but not other JS (goog.date)
                return 'P0D';
            }

            return (this.asSeconds() < 0 ? '-' : '') +
                'P' +
                (years ? years + 'Y' : '') +
                (months ? months + 'M' : '') +
                (days ? days + 'D' : '') +
                ((hours || minutes || seconds) ? 'T' : '') +
                (hours ? hours + 'H' : '') +
                (minutes ? minutes + 'M' : '') +
                (seconds ? seconds + 'S' : '');
        }
    });

    function makeDurationGetter(name) {
        moment.duration.fn[name] = function () {
            return this._data[name];
        };
    }

    function makeDurationAsGetter(name, factor) {
        moment.duration.fn['as' + name] = function () {
            return +this / factor;
        };
    }

    for (i in unitMillisecondFactors) {
        if (unitMillisecondFactors.hasOwnProperty(i)) {
            makeDurationAsGetter(i, unitMillisecondFactors[i]);
            makeDurationGetter(i.toLowerCase());
        }
    }

    makeDurationAsGetter('Weeks', 6048e5);
    moment.duration.fn.asMonths = function () {
        return (+this - this.years() * 31536e6) / 2592e6 + this.years() * 12;
    };


    /************************************
        Default Lang
    ************************************/


    // Set default language, other languages will inherit from English.
    moment.lang('en', {
        ordinal : function (number) {
            var b = number % 10,
                output = (toInt(number % 100 / 10) === 1) ? 'th' :
                (b === 1) ? 'st' :
                (b === 2) ? 'nd' :
                (b === 3) ? 'rd' : 'th';
            return number + output;
        }
    });
// moment.js language configuration
// language : german (de)
// author : lluchs : https://github.com/lluchs
// author: Menelion ElensÃºle: https://github.com/Oire

(function (factory) {
    factory(moment);
}(function (moment) {
    function processRelativeTime(number, withoutSuffix, key, isFuture) {
        var format = {
            'm': ['eine Minute', 'einer Minute'],
            'h': ['eine Stunde', 'einer Stunde'],
            'd': ['ein Tag', 'einem Tag'],
            'dd': [number + ' Tage', number + ' Tagen'],
            'M': ['ein Monat', 'einem Monat'],
            'MM': [number + ' Monate', number + ' Monaten'],
            'y': ['ein Jahr', 'einem Jahr'],
            'yy': [number + ' Jahre', number + ' Jahren']
        };
        return withoutSuffix ? format[key][0] : format[key][1];
    }

    return moment.lang('de', {
        months : "Januar_Februar_MÃ¤rz_April_Mai_Juni_Juli_August_September_Oktober_November_Dezember".split("_"),
        monthsShort : "Jan._Febr._Mrz._Apr._Mai_Jun._Jul._Aug._Sept._Okt._Nov._Dez.".split("_"),
        weekdays : "Sonntag_Montag_Dienstag_Mittwoch_Donnerstag_Freitag_Samstag".split("_"),
        weekdaysShort : "So._Mo._Di._Mi._Do._Fr._Sa.".split("_"),
        weekdaysMin : "So_Mo_Di_Mi_Do_Fr_Sa".split("_"),
        longDateFormat : {
            LT: "HH:mm [Uhr]",
            L : "DD.MM.YYYY",
            LL : "D. MMMM YYYY",
            LLL : "D. MMMM YYYY LT",
            LLLL : "dddd, D. MMMM YYYY LT"
        },
        calendar : {
            sameDay: "[Heute um] LT",
            sameElse: "L",
            nextDay: '[Morgen um] LT',
            nextWeek: 'dddd [um] LT',
            lastDay: '[Gestern um] LT',
            lastWeek: '[letzten] dddd [um] LT'
        },
        relativeTime : {
            future : "in %s",
            past : "vor %s",
            s : "ein paar Sekunden",
            m : processRelativeTime,
            mm : "%d Minuten",
            h : processRelativeTime,
            hh : "%d Stunden",
            d : processRelativeTime,
            dd : processRelativeTime,
            M : processRelativeTime,
            MM : processRelativeTime,
            y : processRelativeTime,
            yy : processRelativeTime
        },
        ordinal : '%d.',
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 4  // The week that contains Jan 4th is the first week of the year.
        }
    });
}));

// moment.js language configuration
// language : spanish (es)
// author : Julio NapurÃ­ : https://github.com/julionc

(function (factory) {
    factory(moment);
}(function (moment) {
    var monthsShortDot = "ene._feb._mar._abr._may._jun._jul._ago._sep._oct._nov._dic.".split("_"),
        monthsShort = "ene_feb_mar_abr_may_jun_jul_ago_sep_oct_nov_dic".split("_");

    return moment.lang('es', {
        months : "enero_febrero_marzo_abril_mayo_junio_julio_agosto_septiembre_octubre_noviembre_diciembre".split("_"),
        monthsShort : function (m, format) {
            if (/-MMM-/.test(format)) {
                return monthsShort[m.month()];
            } else {
                return monthsShortDot[m.month()];
            }
        },
        weekdays : "domingo_lunes_martes_miÃ©rcoles_jueves_viernes_sÃ¡bado".split("_"),
        weekdaysShort : "dom._lun._mar._miÃ©._jue._vie._sÃ¡b.".split("_"),
        weekdaysMin : "Do_Lu_Ma_Mi_Ju_Vi_SÃ¡".split("_"),
        longDateFormat : {
            LT : "H:mm",
            L : "DD/MM/YYYY",
            LL : "D [de] MMMM [del] YYYY",
            LLL : "D [de] MMMM [del] YYYY LT",
            LLLL : "dddd, D [de] MMMM [del] YYYY LT"
        },
        calendar : {
            sameDay : function () {
                return '[hoy a la' + ((this.hours() !== 1) ? 's' : '') + '] LT';
            },
            nextDay : function () {
                return '[maÃ±ana a la' + ((this.hours() !== 1) ? 's' : '') + '] LT';
            },
            nextWeek : function () {
                return 'dddd [a la' + ((this.hours() !== 1) ? 's' : '') + '] LT';
            },
            lastDay : function () {
                return '[ayer a la' + ((this.hours() !== 1) ? 's' : '') + '] LT';
            },
            lastWeek : function () {
                return '[el] dddd [pasado a la' + ((this.hours() !== 1) ? 's' : '') + '] LT';
            },
            sameElse : 'L'
        },
        relativeTime : {
            future : "en %s",
            past : "hace %s",
            s : "unos segundos",
            m : "un minuto",
            mm : "%d minutos",
            h : "una hora",
            hh : "%d horas",
            d : "un dÃ­a",
            dd : "%d dÃ­as",
            M : "un mes",
            MM : "%d meses",
            y : "un aÃ±o",
            yy : "%d aÃ±os"
        },
        ordinal : '%dÂº',
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 4  // The week that contains Jan 4th is the first week of the year.
        }
    });
}));


   moment.lang('en');


    /************************************
        Exposing Moment
    ************************************/

    function makeGlobal(shouldDeprecate) {
        /*global ender:false */
        if (typeof ender !== 'undefined') {
            return;
        }
        oldGlobalMoment = globalScope.moment;
        if (shouldDeprecate) {
            globalScope.moment = deprecate(
                    "Accessing Moment through the global scope is " +
                    "deprecated, and will be removed in an upcoming " +
                    "release.",
                    moment);
        } else {
            globalScope.moment = moment;
        }
    }

    // CommonJS module is defined
    if (hasModule) {
        module.exports = moment;
    } else if (typeof define === "function" && define.amd) {
        define("moment", function (require, exports, module) {
            if (module.config && module.config() && module.config().noGlobal === true) {
                // release the global variable
                globalScope.moment = oldGlobalMoment;
            }

            return moment;
        });
        makeGlobal(true);
    } else {
        makeGlobal();
    }
}).call(this),
function () {
    function a(a) {
        function c(a) {
            a += "";
            var b = a.split(":"),
                c = ~a.indexOf("-") ? -1 : 1,
                d = Math.abs(+b[0]),
                e = parseInt(b[1], 10) || 0,
                f = parseInt(b[2], 10) || 0;
            return c * (60 * d + e + f / 60)
        }

        function d(a, b, d, e, f, g, h, i, j, k) {
            this.name = a, this.startYear = +b, this.endYear = +d, this.month = +e, this.day = +f, this.dayRule = +g, this.time = c(h), this.timeRule = +i, this.offset = c(j), this.letters = k || ""
        }

        function e(a, b) {
            this.rule = b, this.start = b.start(a)
        }

        function f(a, b) {
            return a.isLast ? -1 : b.isLast ? 1 : b.start - a.start
        }

        function g(a) {
            this.name = a, this.rules = []
        }

        function h(b, d, e, f, g, h) {
            var i, j = "string" == typeof g ? g.split("_") : [9999];
            for (this.name = b, this.offset = c(d), this.ruleSet = e, this.letters = f, i = 0; j.length > i; i++) j[i] = +j[i];
            this.until = a.utc(j).subtract("m", c(h))
        }

        function i(a, b) {
            return a.until - b.until
        }

        function j(a) {
            this.name = m(a), this.displayName = a, this.zones = []
        }

        function k(a) {
            var b, c, d;
            for (b in a)
                for (d = a[b], c = 0; d.length > c; c++) l(b + "	" + d[c])
        }

        function l(a) {
            if (x[a]) return x[a];
            var b = a.split(/\s/),
                c = m(b[0]),
                e = new d(c, b[1], b[2], b[3], b[4], b[5], b[6], b[7], b[8], b[9], b[10]);
            return x[a] = e, q(c).add(e), e
        }

        function m(a) {
            return (a || "").toLowerCase().replace(/\//g, "_")
        }

        function n(a) {
            var b, c, d;
            for (b in a)
                for (d = a[b], c = 0; d.length > c; c++) p(b + "	" + d[c])
        }

        function o(a) {
            var b;
            for (b in a) B[m(b)] = m(a[b])
        }

        function p(a) {
            if (z[a]) return z[a];
            var b = a.split(/\s/),
                c = m(b[0]),
                d = new h(c, b[1], q(b[2]), b[3], b[4], b[5]);
            return z[a] = d, r(b[0]).add(d), d
        }

        function q(a) {
            return a = m(a), y[a] || (y[a] = new g(a)), y[a]
        }

        function r(a) {
            var b = m(a);
            return B[b] && (b = B[b]), A[b] || (A[b] = new j(a)), A[b]
        }

        function s(a) {
            a && (a.zones && n(a.zones), a.rules && k(a.rules), a.links && o(a.links))
        }

        function t() {
            var a, b = [];
            for (a in A) b.push(A[a]);
            return b
        }
        var u, v = a.fn.zoneName,
            w = a.fn.zoneAbbr,
            x = {},
            y = {},
            z = {},
            A = {},
            B = {},
            C = 1,
            D = 2,
            E = 7,
            F = 8;
        return d.prototype = {
            contains: function (a) {
                return a >= this.startYear && this.endYear >= a
            },
            start: function (b) {
                return b = Math.min(Math.max(b, this.startYear), this.endYear), a.utc([b, this.month, this.date(b), 0, this.time])
            },
            date: function (a) {
                return this.dayRule === E ? this.day : this.dayRule === F ? this.lastWeekday(a) : this.weekdayAfter(a)
            },
            weekdayAfter: function (b) {
                for (var c = this.day, d = a([b, this.month, 1]).day(), e = this.dayRule + 1 - d; c > e;) e += 7;
                return e
            },
            lastWeekday: function (b) {
                var c = this.day,
                    d = c % 7,
                    e = a([b, this.month + 1, 1]).day(),
                    f = a([b, this.month, 1]).daysInMonth(),
                    g = f + (d - (e - 1)) - 7 * ~~(c / 7);
                return d >= e && (g -= 7), g
            }
        }, e.prototype = {
            equals: function (a) {
                return a && a.rule === this.rule ? 864e5 > Math.abs(a.start - this.start) : !1
            }
        }, g.prototype = {
            add: function (a) {
                this.rules.push(a)
            },
            ruleYears: function (a, b) {
                var c, d, g, h = a.year(),
                    i = [];
                for (c = 0; this.rules.length > c; c++) d = this.rules[c], d.contains(h) ? i.push(new e(h, d)) : d.contains(h + 1) && i.push(new e(h + 1, d));
                return i.push(new e(h - 1, this.lastYearRule(h - 1))), b && (g = new e(h - 1, b.lastRule()), g.start = b.until.clone().utc(), g.isLast = b.ruleSet !== this, i.push(g)), i.sort(f), i
            },
            rule: function (a, b, c) {
                var d, e, f, g, h, i = this.ruleYears(a, c),
                    j = 0;
                for (c && (e = c.offset + c.lastRule().offset, f = 9e4 * Math.abs(e)), h = i.length - 1; h > -1; h--) g = d, d = i[h], d.equals(g) || (c && !d.isLast && f >= Math.abs(d.start - c.until) && (j += e - b), d.rule.timeRule === D && (j = b), d.rule.timeRule !== C && d.start.add("m", -j), j = d.rule.offset + b);
                for (h = 0; i.length > h; h++)
                    if (d = i[h], a >= d.start && !d.isLast) return d.rule;
                return u
            },
            lastYearRule: function (a) {
                var b, c, d, e = u,
                    f = -1e30;
                for (b = 0; this.rules.length > b; b++) c = this.rules[b], a >= c.startYear && (d = c.start(a), d > f && (f = d, e = c));
                return e
            }
        }, h.prototype = {
            rule: function (a, b) {
                return this.ruleSet.rule(a, this.offset, b)
            },
            lastRule: function () {
                return this._lastRule || (this._lastRule = this.rule(this.until)), this._lastRule
            },
            format: function (a) {
                return this.letters.replace("%s", a.letters)
            }
        }, j.prototype = {
            zoneAndRule: function (a) {
                var b, c, d;
                for (a = a.clone().utc(), b = 0; this.zones.length > b && (c = this.zones[b], !(c.until > a)); b++) d = c;
                return [c, c.rule(a, d)]
            },
            add: function (a) {
                this.zones.push(a), this.zones.sort(i)
            },
            format: function (a) {
                var b = this.zoneAndRule(a);
                return b[0].format(b[1])
            },
            offset: function (a) {
                var b = this.zoneAndRule(a);
                return -(b[0].offset + b[1].offset)
            }
        }, a.updateOffset = function (a) {
            var b;
            a._z && (b = a._z.offset(a), 16 > Math.abs(b) && (b /= 60), a.zone(b))
        }, a.fn.tz = function (b) {
            return b ? (this._z = r(b), this._z && a.updateOffset(this), this) : this._z ? this._z.displayName : void 0
        }, a.fn.zoneName = function () {
            return this._z ? this._z.format(this) : v.call(this)
        }, a.fn.zoneAbbr = function () {
            return this._z ? this._z.format(this) : w.call(this)
        }, a.tz = function () {
            var b, c = [],
                d = arguments.length - 1;
            for (b = 0; d > b; b++) c[b] = arguments[b];
            var e = a.apply(null, c),
                f = e.zone();
            return e.tz(arguments[d]), e.add("minutes", e.zone() - f)
        }, a.tz.add = s, a.tz.addRule = l, a.tz.addZone = p, a.tz.zones = t, a.tz.version = b, u = l("- 0 9999 0 0 0 0 0 0"), a
    }
    var b = "0.0.3";
    "function" == typeof define && define.amd ? define("moment-timezone", ["moment"], a) : "undefined" != typeof window && window.moment ? a(window.moment) : "undefined" != typeof module && (module.exports = a(require("moment")))
}.apply(this), moment.tz.add({
    zones: {
        "America/New_York": ["-4:56:2 - LMT 1883_10_18_12_3_58 -4:56:2", "-5 US E%sT 1920 -5", "-5 NYC E%sT 1942 -5", "-5 US E%sT 1946 -5", "-5 NYC E%sT 1967 -5", "-5 US E%sT"],
        "Europe/London": ["-0:1:15 - LMT 1847_11_1_0 -0:1:15", "0 GB-Eire %s 1968_9_27 1", "1 - BST 1971_9_31_2", "0 GB-Eire %s 1996", "0 EU GMT/BST"],
        "CET": ["1 C-Eur CE%sT"]
    },
    rules: {
        US: ["1918 1919 2 0 8 2 0 1 D", "1918 1919 9 0 8 2 0 0 S", "1942 1942 1 9 7 2 0 1 W", "1945 1945 7 14 7 23 1 1 P", "1945 1945 8 30 7 2 0 0 S", "1967 2006 9 0 8 2 0 0 S", "1967 1973 3 0 8 2 0 1 D", "1974 1974 0 6 7 2 0 1 D", "1975 1975 1 23 7 2 0 1 D", "1976 1986 3 0 8 2 0 1 D", "1987 2006 3 1 0 2 0 1 D", "2007 9999 2 8 0 2 0 1 D", "2007 9999 10 1 0 2 0 0 S"],
        NYC: ["1920 1920 2 0 8 2 0 1 D", "1920 1920 9 0 8 2 0 0 S", "1921 1966 3 0 8 2 0 1 D", "1921 1954 8 0 8 2 0 0 S", "1955 1966 9 0 8 2 0 0 S"],
        "GB-Eire": ["1916 1916 4 21 7 2 2 1 BST", "1916 1916 9 1 7 2 2 0 GMT", "1917 1917 3 8 7 2 2 1 BST", "1917 1917 8 17 7 2 2 0 GMT", "1918 1918 2 24 7 2 2 1 BST", "1918 1918 8 30 7 2 2 0 GMT", "1919 1919 2 30 7 2 2 1 BST", "1919 1919 8 29 7 2 2 0 GMT", "1920 1920 2 28 7 2 2 1 BST", "1920 1920 9 25 7 2 2 0 GMT", "1921 1921 3 3 7 2 2 1 BST", "1921 1921 9 3 7 2 2 0 GMT", "1922 1922 2 26 7 2 2 1 BST", "1922 1922 9 8 7 2 2 0 GMT", "1923 1923 3 16 0 2 2 1 BST", "1923 1924 8 16 0 2 2 0 GMT", "1924 1924 3 9 0 2 2 1 BST", "1925 1926 3 16 0 2 2 1 BST", "1925 1938 9 2 0 2 2 0 GMT", "1927 1927 3 9 0 2 2 1 BST", "1928 1929 3 16 0 2 2 1 BST", "1930 1930 3 9 0 2 2 1 BST", "1931 1932 3 16 0 2 2 1 BST", "1933 1933 3 9 0 2 2 1 BST", "1934 1934 3 16 0 2 2 1 BST", "1935 1935 3 9 0 2 2 1 BST", "1936 1937 3 16 0 2 2 1 BST", "1938 1938 3 9 0 2 2 1 BST", "1939 1939 3 16 0 2 2 1 BST", "1939 1939 10 16 0 2 2 0 GMT", "1940 1940 1 23 0 2 2 1 BST", "1941 1941 4 2 0 1 2 2 BDST", "1941 1943 7 9 0 1 2 1 BST", "1942 1944 3 2 0 1 2 2 BDST", "1944 1944 8 16 0 1 2 1 BST", "1945 1945 3 2 1 1 2 2 BDST", "1945 1945 6 9 0 1 2 1 BST", "1945 1946 9 2 0 2 2 0 GMT", "1946 1946 3 9 0 2 2 1 BST", "1947 1947 2 16 7 2 2 1 BST", "1947 1947 3 13 7 1 2 2 BDST", "1947 1947 7 10 7 1 2 1 BST", "1947 1947 10 2 7 2 2 0 GMT", "1948 1948 2 14 7 2 2 1 BST", "1948 1948 9 31 7 2 2 0 GMT", "1949 1949 3 3 7 2 2 1 BST", "1949 1949 9 30 7 2 2 0 GMT", "1950 1952 3 14 0 2 2 1 BST", "1950 1952 9 21 0 2 2 0 GMT", "1953 1953 3 16 0 2 2 1 BST", "1953 1960 9 2 0 2 2 0 GMT", "1954 1954 3 9 0 2 2 1 BST", "1955 1956 3 16 0 2 2 1 BST", "1957 1957 3 9 0 2 2 1 BST", "1958 1959 3 16 0 2 2 1 BST", "1960 1960 3 9 0 2 2 1 BST", "1961 1963 2 0 8 2 2 1 BST", "1961 1968 9 23 0 2 2 0 GMT", "1964 1967 2 19 0 2 2 1 BST", "1968 1968 1 18 7 2 2 1 BST", "1972 1980 2 16 0 2 2 1 BST", "1972 1980 9 23 0 2 2 0 GMT", "1981 1995 2 0 8 1 1 1 BST", "1981 1989 9 23 0 1 1 0 GMT", "1990 1995 9 22 0 1 1 0 GMT"],
        EU: ["1977 1980 3 1 0 1 1 1 S", "1977 1977 8 0 8 1 1 0", "1978 1978 9 1 7 1 1 0", "1979 1995 8 0 8 1 1 0", "1981 9999 2 0 8 1 1 1 S", "1996 9999 9 0 8 1 1 0"],
        "C-Eur": ["1916 1916 3 30 7 23 0 1 S", "1916 1916 9 1 7 1 0 0", "1917 1918 3 15 1 2 2 1 S", "1917 1918 8 15 1 2 2 0", "1940 1940 3 1 7 2 2 1 S", "1942 1942 10 2 7 2 2 0", "1943 1943 2 29 7 2 2 1 S", "1943 1943 9 4 7 2 2 0", "1944 1945 3 1 1 2 2 1 S", "1944 1944 9 2 7 2 2 0", "1945 1945 8 16 7 2 2 0", "1977 1980 3 1 0 2 2 1 S", "1977 1977 8 0 8 2 2 0", "1978 1978 9 1 7 2 2 0", "1979 1995 8 0 8 2 2 0", "1981 9999 2 0 8 2 2 1 S", "1996 9999 9 0 8 2 2 0"]
    },
    links: {}
});