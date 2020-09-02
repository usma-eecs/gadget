window.gadget = {
    config: {
        apphostname: 'cy105.army',
        usersubdomains: true,
        protocol: 'https',
        cachePrefix: 'cache-prefix-',
        prefixes: {
            "components": "cache-prefix-bf90cd25",
            "js": "cache-prefix-28aa2534",
            "css": "cache-prefix-28aa2534",
            "img": "cache-prefix-28aa2534",
            "fonts": "cache-prefix-28aa2534",
            "partials": "cache-prefix-28aa2534",
            "skulpt": "485c5ea6",
            "pypyjs": "cache-prefix-e8e5bcf1"
        },
        components: {
            "ace-builds": "v1.2.6.1rc2",
            "anchor-js": "2.0.0",
            "angular-file-saver": "1.1.3",
            "angular-load": "0.1.2",
            "angular-notifyjs": "0.1.0",
            "angular-ui-router": "0.2.11",
            "angular-ui-tree": "2.0.10",
            "angular-ui-utils": "0.1.1",
            "angular-xeditable": "0.1.8",
            "bluebird": "3.5.1",
            "d3": "3.4.11",
            "filereader": "107f68c3b9",
            "file-saver.js": "1.20150507.2",
            "font-mfizz": "2.0.1",
            "gsap": "1.15.0",
            "jquery-ui": "libs/jqueryui/1.12.1",
            "jsdiff": "1.0.8",
            "jszip": "3.1.4",
            "lazysizes": "1.5.0",
            "lodash": "2.4.1",
            "modernizr": "2.7.2",
            "ng-file-upload": "1.2.6",
            "ngInfiniteScroll": "1.1.2",
            "notifyjs": "0.4.2",
            "opal": "0.6.2",
            "restangular": "1.3.1",
            "video.js": "5.20.4",
            "yamljs": "0.1.5"
        }
    }
};

!function(utils, win, doc, context) {
    "use strict";
    function removeQuotes(source) {
        return ("string" == typeof source || source instanceof String) && (source = source.replace(/^['\\/"]+|(;\s?})+|['\\/"]+$/g, "")), 
        source;
    }
    var _add = function(langs) {
        for (var idx = langs.length, item = utils("head"); idx--; ) 0 === item.has("." + langs[idx]).length && item.append('<meta class="' + langs[idx] + '" />');
    };
    _add([ "foundation-mq-small", "foundation-mq-small-only", "foundation-mq-medium", "foundation-mq-medium-only", "foundation-mq-large", "foundation-mq-large-only", "foundation-mq-xlarge", "foundation-mq-xlarge-only", "foundation-mq-xxlarge", "foundation-data-attribute-namespace" ]), 
    utils(function() {
        "undefined" != typeof FastClick && "undefined" != typeof doc.body && FastClick.attach(doc.body);
    });
    var S = function(selector, s) {
        if ("string" == typeof selector) {
            if (s) {
                var actual;
                if (s.jquery) {
                    if (actual = s[0], !actual) return s;
                } else actual = s;
                return utils(actual.querySelectorAll(selector));
            }
            return utils(doc.querySelectorAll(selector));
        }
        return utils(selector, s);
    }, add = function(url) {
        var c = [];
        return url || c.push("data"), this.namespace.length > 0 && c.push(this.namespace), 
        c.push(this.name), c.join("-");
    }, setup = function(name) {
        for (var data = name.split("-"), i = data.length, row = []; i--; ) 0 !== i ? row.push(data[i]) : this.namespace.length > 0 ? row.push(this.namespace, data[i]) : row.push(data[i]);
        return row.reverse().join("-");
    }, Plugin = function(method, options) {
        var self = this, el = !S(this).data(this.attr_name(!0));
        return S(this.scope).is("[" + this.attr_name() + "]") ? (S(this.scope).data(this.attr_name(!0) + "-init", utils.extend({}, this.settings, options || method, this.data_options(S(this.scope)))), 
        el && this.events(this.scope)) : S("[" + this.attr_name() + "]", this.scope).each(function() {
            var eventObject = !S(this).data(self.attr_name(!0) + "-init");
            S(this).data(self.attr_name(!0) + "-init", utils.extend({}, self.settings, options || method, self.data_options(S(this)))), 
            eventObject && self.events(this);
        }), "string" == typeof method ? this[method].call(this, options) : void 0;
    }, load = function(image, callback) {
        function loaded() {
            callback(image[0]);
        }
        function bindLoad() {
            if (this.one("load", loaded), /MSIE (\d+\.\d+);/.test(navigator.userAgent)) {
                var src = this.attr("src"), param = src.match(/\?/) ? "&" : "?";
                param += "random=" + new Date().getTime(), this.attr("src", src + param);
            }
        }
        return image.attr("src") ? void (image[0].complete || 4 === image[0].readyState ? loaded() : bindLoad.call(image)) : void loaded();
    };
    win.matchMedia = win.matchMedia || function(doc) {
        var bool, docElem = doc.documentElement, refNode = docElem.firstElementChild || docElem.firstChild, fakeBody = doc.createElement("body"), div = doc.createElement("div");
        return div.id = "mq-test-1", div.style.cssText = "position:absolute;top:-100em", 
        fakeBody.style.background = "none", fakeBody.appendChild(div), function(q) {
            return div.innerHTML = '&shy;<style media="' + q + '"> #mq-test-1 { width: 42px; }</style>', 
            docElem.insertBefore(fakeBody, refNode), bool = 42 === div.offsetWidth, docElem.removeChild(fakeBody), 
            {
                matches: bool,
                media: q
            };
        };
    }(doc), function(a) {
        function raf() {
            animating && (requestAnimationFrame(raf), inIt && jQuery.fx.tick());
        }
        for (var animating, lastTime = 0, vendors = [ "webkit", "moz" ], requestAnimationFrame = win.requestAnimationFrame, cancelAnimationFrame = win.cancelAnimationFrame, inIt = "undefined" != typeof jQuery.fx; lastTime < vendors.length && !requestAnimationFrame; lastTime++) requestAnimationFrame = win[vendors[lastTime] + "RequestAnimationFrame"], 
        cancelAnimationFrame = cancelAnimationFrame || win[vendors[lastTime] + "CancelAnimationFrame"] || win[vendors[lastTime] + "CancelRequestAnimationFrame"];
        requestAnimationFrame ? (win.requestAnimationFrame = requestAnimationFrame, win.cancelAnimationFrame = cancelAnimationFrame, 
        inIt && (jQuery.fx.timer = function(fn) {
            fn() && jQuery.timers.push(fn) && !animating && (animating = !0, raf());
        }, jQuery.fx.stop = function() {
            animating = !1;
        })) : (win.requestAnimationFrame = function(callback) {
            var currTime = new Date().getTime(), timeToCall = Math.max(0, 16 - (currTime - lastTime)), id = win.setTimeout(function() {
                callback(currTime + timeToCall);
            }, timeToCall);
            return lastTime = currTime + timeToCall, id;
        }, win.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        });
    }(jQuery), win.Foundation = {
        name: "Foundation",
        version: "5.5.0",
        media_queries: {
            small: S(".foundation-mq-small").css("font-family").replace(/^[\/\\'"]+|(;\s?})+|[\/\\'"]+$/g, ""),
            "small-only": S(".foundation-mq-small-only").css("font-family").replace(/^[\/\\'"]+|(;\s?})+|[\/\\'"]+$/g, ""),
            medium: S(".foundation-mq-medium").css("font-family").replace(/^[\/\\'"]+|(;\s?})+|[\/\\'"]+$/g, ""),
            "medium-only": S(".foundation-mq-medium-only").css("font-family").replace(/^[\/\\'"]+|(;\s?})+|[\/\\'"]+$/g, ""),
            large: S(".foundation-mq-large").css("font-family").replace(/^[\/\\'"]+|(;\s?})+|[\/\\'"]+$/g, ""),
            "large-only": S(".foundation-mq-large-only").css("font-family").replace(/^[\/\\'"]+|(;\s?})+|[\/\\'"]+$/g, ""),
            xlarge: S(".foundation-mq-xlarge").css("font-family").replace(/^[\/\\'"]+|(;\s?})+|[\/\\'"]+$/g, ""),
            "xlarge-only": S(".foundation-mq-xlarge-only").css("font-family").replace(/^[\/\\'"]+|(;\s?})+|[\/\\'"]+$/g, ""),
            xxlarge: S(".foundation-mq-xxlarge").css("font-family").replace(/^[\/\\'"]+|(;\s?})+|[\/\\'"]+$/g, "")
        },
        stylesheet: utils("<style></style>").appendTo("head")[0].sheet,
        global: {
            namespace: context
        },
        init: function(scope, libraries, method, options, response) {
            var args = [ scope, method, options, response ], responses = [];
            if (this.rtl = /rtl/i.test(S("html").attr("dir")), this.scope = scope || this.scope, 
            this.set_namespace(), libraries && "string" == typeof libraries && !/reflow/i.test(libraries)) this.libs.hasOwnProperty(libraries) && responses.push(this.init_lib(libraries, args)); else for (var lib in this.libs) responses.push(this.init_lib(lib, libraries));
            return S(win).on(function() {
                S(win).trigger("resize.fndtn.clearing").trigger("resize.fndtn.dropdown").trigger("resize.fndtn.equalizer").trigger("resize.fndtn.interchange").trigger("resize.fndtn.joyride").trigger("resize.fndtn.magellan").trigger("resize.fndtn.topbar").trigger("resize.fndtn.slider");
            }), scope;
        },
        init_lib: function(lib, args) {
            return this.libs.hasOwnProperty(lib) ? (this.patch(this.libs[lib]), args && args.hasOwnProperty(lib) ? ("undefined" != typeof this.libs[lib].settings ? utils.extend(!0, this.libs[lib].settings, args[lib]) : "undefined" != typeof this.libs[lib].defaults && utils.extend(!0, this.libs[lib].defaults, args[lib]), 
            this.libs[lib].init.apply(this.libs[lib], [ this.scope, args[lib] ])) : (args = args instanceof Array ? args : new Array(args), 
            this.libs[lib].init.apply(this.libs[lib], args))) : function() {};
        },
        patch: function(self) {
            self.scope = this.scope, self.namespace = this.global.namespace, self.rtl = this.rtl, 
            self.data_options = this.utils.data_options, self.attr_name = add, self.add_namespace = setup, 
            self.bindings = Plugin, self.S = this.utils.S;
        },
        inherit: function(command, browser) {
            for (var keys = browser.split(" "), i = keys.length; i--; ) this.utils.hasOwnProperty(keys[i]) && (command[keys[i]] = this.utils[keys[i]]);
        },
        set_namespace: function() {
            var element = this.global.namespace === context ? utils(".foundation-data-attribute-namespace").css("font-family") : this.global.namespace;
            this.global.namespace = element === context || /false/i.test(element) ? "" : element;
        },
        libs: {},
        utils: {
            S: S,
            throttle: function(func, delay) {
                var timer = null;
                return function() {
                    var context = this, args = arguments;
                    null == timer && (timer = setTimeout(function() {
                        func.apply(context, args), timer = null;
                    }, delay));
                };
            },
            debounce: function(a, b, r) {
                var c, u;
                return function() {
                    var o = this, e = arguments, f = function() {
                        c = null, r || (u = a.apply(o, e));
                    }, i = r && !c;
                    return clearTimeout(c), c = setTimeout(f, b), i && (u = a.apply(o, e)), u;
                };
            },
            data_options: function(pos, prop) {
                function isNumber(val) {
                    return !isNaN(val - 0) && null !== val && "" !== val && val !== !1 && val !== !0;
                }
                function strip(str) {
                    return "string" == typeof str ? utils.trim(str) : str;
                }
                prop = prop || "options";
                var i, p, list, params = {}, find = function(selector) {
                    var value = Foundation.global.namespace;
                    return value.length > 0 ? selector.data(value + "-" + prop) : selector.data(prop);
                }, v = find(pos);
                if ("object" == typeof v) return v;
                for (list = (v || ":").split(";"), i = list.length; i--; ) p = list[i].split(":"), 
                p = [ p[0], p.slice(1).join(":") ], /true/i.test(p[1]) && (p[1] = !0), /false/i.test(p[1]) && (p[1] = !1), 
                isNumber(p[1]) && (-1 === p[1].indexOf(".") ? p[1] = parseInt(p[1], 10) : p[1] = parseFloat(p[1])), 
                2 === p.length && p[0].length > 0 && (params[strip(p[0])] = strip(p[1]));
                return params;
            },
            register_media: function(media, media_class) {
                Foundation.media_queries[media] === context && (utils("head").append('<meta class="' + media_class + '"/>'), 
                Foundation.media_queries[media] = removeQuotes(utils("." + media_class).css("font-family")));
            },
            add_custom_rule: function(rule, media) {
                if (media === context && Foundation.stylesheet) Foundation.stylesheet.insertRule(rule, Foundation.stylesheet.cssRules.length); else {
                    var query = Foundation.media_queries[media];
                    query !== context && Foundation.stylesheet.insertRule("@media " + Foundation.media_queries[media] + "{ " + rule + " }");
                }
            },
            image_loaded: function(list, callback) {
                var $this = this, count = list.length;
                0 === count && callback(list), list.each(function() {
                    load($this.S(this), function() {
                        count -= 1, 0 === count && callback(list);
                    });
                });
            },
            random_str: function() {
                return this.fidx || (this.fidx = 0), this.prefix = this.prefix || [ this.name || "F", (+new Date()).toString(36) ].join("-"), 
                this.prefix + (this.fidx++).toString(36);
            },
            match: function(query) {
                return win.matchMedia(query).matches;
            },
            is_small_up: function() {
                return this.match(Foundation.media_queries.small);
            },
            is_medium_up: function() {
                return this.match(Foundation.media_queries.medium);
            },
            is_large_up: function() {
                return this.match(Foundation.media_queries.large);
            },
            is_xlarge_up: function() {
                return this.match(Foundation.media_queries.xlarge);
            },
            is_xxlarge_up: function() {
                return this.match(Foundation.media_queries.xxlarge);
            },
            is_small_only: function() {
                return !(this.is_medium_up() || this.is_large_up() || this.is_xlarge_up() || this.is_xxlarge_up());
            },
            is_medium_only: function() {
                return this.is_medium_up() && !this.is_large_up() && !this.is_xlarge_up() && !this.is_xxlarge_up();
            },
            is_large_only: function() {
                return this.is_medium_up() && this.is_large_up() && !this.is_xlarge_up() && !this.is_xxlarge_up();
            },
            is_xlarge_only: function() {
                return this.is_medium_up() && this.is_large_up() && this.is_xlarge_up() && !this.is_xxlarge_up();
            },
            is_xxlarge_only: function() {
                return this.is_medium_up() && this.is_large_up() && this.is_xlarge_up() && this.is_xxlarge_up();
            }
        }
    }, utils.fn.foundation = function() {
        var args = Array.prototype.slice.call(arguments, 0);
        return this.each(function() {
            return Foundation.init.apply(Foundation, [ this ].concat(args)), this;
        });
    };
}(jQuery, window, window.document), function(a, b, c, opt_d) {
    "use strict";
    Foundation.libs.accordion = {
        name: "accordion",
        version: "5.5.0",
        settings: {
            content_class: "content",
            active_class: "active",
            multi_expand: !1,
            toggleable: !0,
            callback: function() {}
        },
        init: function(section, method, options) {
            this.bindings(method, options);
        },
        events: function() {
            var self = this, fn = this.S;
            fn(this.scope).off(".fndtn.accordion").on("click.fndtn.accordion", "[" + this.attr_name() + "] > .accordion-navigation > a", function(e) {
                var el = fn(this).closest("[" + self.attr_name() + "]"), id = self.attr_name() + "=" + el.attr(self.attr_name()), options = el.data(self.attr_name(!0) + "-init") || self.settings, target = fn("#" + this.href.split("#")[1]), $target = a("> .accordion-navigation", el), tabs = $target.children("." + options.content_class), name = tabs.filter("." + options.active_class);
                return e.preventDefault(), el.attr(self.attr_name()) && (tabs = tabs.add("[" + id + "] dd > ." + options.content_class), 
                $target = $target.add("[" + id + "] .accordion-navigation")), options.toggleable && target.is(name) ? (target.parent(".accordion-navigation").toggleClass(options.active_class, !1), 
                target.toggleClass(options.active_class, !1), options.callback(target), target.triggerHandler("toggled", [ el ]), 
                void el.triggerHandler("toggled", [ target ])) : (options.multi_expand || (tabs.removeClass(options.active_class), 
                $target.removeClass(options.active_class)), target.addClass(options.active_class).parent().addClass(options.active_class), 
                options.callback(target), target.triggerHandler("toggled", [ el ]), void el.triggerHandler("toggled", [ target ]));
            });
        },
        off: function() {},
        reflow: function() {}
    };
}(jQuery, window, window.document), function(a, b, c, opt_d) {
    "use strict";
    Foundation.libs.alert = {
        name: "alert",
        version: "5.5.0",
        settings: {
            callback: function() {}
        },
        init: function(section, method, options) {
            this.bindings(method, options);
        },
        events: function() {
            var self = this, callback = this.S;
            a(this.scope).off(".alert").on("click.fndtn.alert", "[" + this.attr_name() + "] .close", function(e) {
                var obj = callback(this).closest("[" + self.attr_name() + "]"), settings = obj.data(self.attr_name(!0) + "-init") || self.settings;
                e.preventDefault(), Modernizr.csstransitions ? (obj.addClass("alert-close"), obj.on("transitionend webkitTransitionEnd oTransitionEnd", function(changed) {
                    callback(this).trigger("close").trigger("close.fndtn.alert").remove(), settings.callback();
                })) : obj.fadeOut(300, function() {
                    callback(this).trigger("close").trigger("close.fndtn.alert").remove(), settings.callback();
                });
            });
        },
        reflow: function() {}
    };
}(jQuery, window, window.document), function(self, b, c, baton) {
    "use strict";
    Foundation.libs.dropdown = {
        name: "dropdown",
        version: "5.5.0",
        settings: {
            active_class: "open",
            disabled_class: "disabled",
            mega_class: "mega",
            align: "bottom",
            is_hover: !1,
            hover_timeout: 150,
            opened: function() {},
            closed: function() {}
        },
        init: function(section, method, options) {
            Foundation.inherit(this, "throttle"), self.extend(!0, this.settings, method, options), 
            this.bindings(method, options);
        },
        events: function(scope) {
            var that = this, merge = that.S;
            merge(this.scope).off(".dropdown").on("click.fndtn.dropdown", "[" + this.attr_name() + "]", function(e) {
                var settings = merge(this).data(that.attr_name(!0) + "-init") || that.settings;
                (!settings.is_hover || Modernizr.touch) && (e.preventDefault(), merge(this).parent("[data-reveal-id]") && e.stopPropagation(), 
                that.toggle(self(this)));
            }).on("mouseenter.fndtn.dropdown", "[" + this.attr_name() + "], [" + this.attr_name() + "-content]", function(e) {
                var m, i, c = merge(this);
                clearTimeout(that.timeout), c.data(that.data_attr()) ? (m = merge("#" + c.data(that.data_attr())), 
                i = c) : (m = c, i = merge("[" + that.attr_name() + '="' + m.attr("id") + '"]'));
                var settings = i.data(that.attr_name(!0) + "-init") || that.settings;
                merge(e.currentTarget).data(that.data_attr()) && settings.is_hover && that.closeall.call(that), 
                settings.is_hover && that.open.apply(that, [ m, i ]);
            }).on("mouseleave.fndtn.dropdown", "[" + this.attr_name() + "], [" + this.attr_name() + "-content]", function(e) {
                var settings, element = merge(this);
                if (element.data(that.data_attr())) settings = element.data(that.data_attr(!0) + "-init") || that.settings; else var target = merge("[" + that.attr_name() + '="' + merge(this).attr("id") + '"]'), settings = target.data(that.attr_name(!0) + "-init") || that.settings;
                that.timeout = setTimeout(function() {
                    element.data(that.data_attr()) ? settings.is_hover && that.close.call(that, merge("#" + element.data(that.data_attr()))) : settings.is_hover && that.close.call(that, element);
                }.bind(this), settings.hover_timeout);
            }).on("click.fndtn.dropdown", function(e) {
                var parent = merge(e.target).closest("[" + that.attr_name() + "-content]"), name = parent.find("a");
                return name.length > 0 && "false" !== parent.attr("aria-autoclose") && that.close.call(that, merge("[" + that.attr_name() + "-content]")), 
                merge(e.target).closest("[" + that.attr_name() + "]").length > 0 ? void 0 : !merge(e.target).data("revealId") && parent.length > 0 && (merge(e.target).is("[" + that.attr_name() + "-content]") || self.contains(parent.first()[0], e.target)) ? void e.stopPropagation() : void that.close.call(that, merge("[" + that.attr_name() + "-content]"));
            }).on("opened.fndtn.dropdown", "[" + that.attr_name() + "-content]", function() {
                that.settings.opened.call(this);
            }).on("closed.fndtn.dropdown", "[" + that.attr_name() + "-content]", function() {
                that.settings.closed.call(this);
            }), merge(b).off(".dropdown").on("resize.fndtn.dropdown", that.throttle(function() {
                that.resize.call(that);
            }, 50)), this.resize();
        },
        close: function(result) {
            var obj = this;
            result.each(function() {
                var tab = self("[" + obj.attr_name() + "=" + result[0].id + "]") || self("aria-controls=" + result[0].id + "]");
                tab.attr("aria-expanded", "false"), obj.S(this).hasClass(obj.settings.active_class) && (obj.S(this).css(Foundation.rtl ? "right" : "left", "-99999px").attr("aria-hidden", "true").removeClass(obj.settings.active_class).prev("[" + obj.attr_name() + "]").removeClass(obj.settings.active_class).removeData("target"), 
                obj.S(this).trigger("closed").trigger("closed.fndtn.dropdown", [ result ]));
            }), result.removeClass("f-open-" + this.attr_name(!0));
        },
        closeall: function() {
            var scope = this;
            self.each(scope.S(".f-open-" + this.attr_name(!0)), function() {
                scope.close.call(scope, scope.S(this));
            });
        },
        open: function(e, target) {
            this.css(e.addClass(this.settings.active_class), target), e.prev("[" + this.attr_name() + "]").addClass(this.settings.active_class), 
            e.data("target", target.get(0)).trigger("opened").trigger("opened.fndtn.dropdown", [ e, target ]), 
            e.attr("aria-hidden", "false"), target.attr("aria-expanded", "true"), e.focus(), 
            e.addClass("f-open-" + this.attr_name(!0));
        },
        data_attr: function() {
            return this.namespace.length > 0 ? this.namespace + "-" + this.name : this.name;
        },
        toggle: function(target) {
            if (!target.hasClass(this.settings.disabled_class)) {
                var dropdown = this.S("#" + target.data(this.data_attr()));
                0 !== dropdown.length && (this.close.call(this, this.S("[" + this.attr_name() + "-content]").not(dropdown)), 
                dropdown.hasClass(this.settings.active_class) ? (this.close.call(this, dropdown), 
                dropdown.data("target") !== target.get(0) && this.open.call(this, dropdown, target)) : this.open.call(this, dropdown, target));
            }
        },
        resize: function() {
            var dropdown = this.S("[" + this.attr_name() + "-content].open"), target = this.S("[" + this.attr_name() + '="' + dropdown.attr("id") + '"]');
            dropdown.length && target.length && this.css(dropdown, target);
        },
        css: function(dropdown, target) {
            var len = Math.max((target.width() - dropdown.width()) / 2, 8), value = target.data(this.attr_name(!0) + "-init") || this.settings;
            if (this.clear_idx(), this.small()) {
                var result = this.dirs.bottom.call(dropdown, target, value);
                dropdown.attr("style", "").removeClass("drop-left drop-right drop-top").css({
                    position: "absolute",
                    width: "95%",
                    "max-width": "none",
                    top: result.top
                }), dropdown.css(Foundation.rtl ? "right" : "left", len);
            } else this.style(dropdown, target, value);
            return dropdown;
        },
        style: function(target, v, options) {
            var args = self.extend({
                position: "absolute"
            }, this.dirs[options.align].call(target, v, options));
            target.attr("style", "").css(args);
        },
        dirs: {
            _base: function($e) {
                var offset_parent = this.offsetParent(), parentOffset = offset_parent.offset(), styles = $e.offset();
                styles.top -= parentOffset.top, styles.left -= parentOffset.left, styles.missRight = !1, 
                styles.missTop = !1, styles.missLeft = !1, styles.leftRightFlag = !1;
                var width;
                width = c.getElementsByClassName("row")[0] ? c.getElementsByClassName("row")[0].clientWidth : b.outerWidth;
                var x = (b.outerWidth - width) / 2, w = width;
                return this.hasClass("mega") || ($e.offset().top <= this.outerHeight() && (styles.missTop = !0, 
                w = b.outerWidth - x, styles.leftRightFlag = !0), $e.offset().left + this.outerWidth() > $e.offset().left + x && $e.offset().left - x > this.outerWidth() && (styles.missRight = !0, 
                styles.missLeft = !1), $e.offset().left - this.outerWidth() <= 0 && (styles.missLeft = !0, 
                styles.missRight = !1)), styles;
            },
            top: function(element, event) {
                var options = Foundation.libs.dropdown, offset = options.dirs._base.call(this, element);
                return this.addClass("drop-top"), 1 == offset.missTop && (offset.top = offset.top + element.outerHeight() + this.outerHeight(), 
                this.removeClass("drop-top")), 1 == offset.missRight && (offset.left = offset.left - this.outerWidth() + element.outerWidth()), 
                (element.outerWidth() < this.outerWidth() || options.small() || this.hasClass(event.mega_menu)) && options.adjust_pip(this, element, event, offset), 
                Foundation.rtl ? {
                    left: offset.left - this.outerWidth() + element.outerWidth(),
                    top: offset.top - this.outerHeight()
                } : {
                    left: offset.left,
                    top: offset.top - this.outerHeight()
                };
            },
            bottom: function(am, w) {
                var c = Foundation.libs.dropdown, h = c.dirs._base.call(this, am);
                return 1 == h.missRight && (h.left = h.left - this.outerWidth() + am.outerWidth()), 
                (am.outerWidth() < this.outerWidth() || c.small() || this.hasClass(w.mega_menu)) && c.adjust_pip(this, am, w, h), 
                c.rtl ? {
                    left: h.left - this.outerWidth() + am.outerWidth(),
                    top: h.top + am.outerHeight()
                } : {
                    left: h.left,
                    top: h.top + am.outerHeight()
                };
            },
            left: function(element, position) {
                var offset = Foundation.libs.dropdown.dirs._base.call(this, element);
                return this.addClass("drop-left"), 1 == offset.missLeft && (offset.left = offset.left + this.outerWidth(), 
                offset.top = offset.top + element.outerHeight(), this.removeClass("drop-left")), 
                {
                    left: offset.left - this.outerWidth(),
                    top: offset.top
                };
            },
            right: function(e, i) {
                var options = Foundation.libs.dropdown.dirs._base.call(this, e);
                this.addClass("drop-right"), 1 == options.missRight ? (options.left = options.left - this.outerWidth(), 
                options.top = options.top + e.outerHeight(), this.removeClass("drop-right")) : options.triggeredRight = !0;
                var model = Foundation.libs.dropdown;
                return (e.outerWidth() < this.outerWidth() || model.small() || this.hasClass(i.mega_menu)) && model.adjust_pip(this, e, i, options), 
                {
                    left: options.left + e.outerWidth(),
                    top: options.top
                };
            }
        },
        adjust_pip: function(t, b, c, d) {
            var result = Foundation.stylesheet, left = 8;
            t.hasClass(c.mega_class) ? left = d.left + b.outerWidth() / 2 - 8 : this.small() && (left += d.left - 8), 
            this.rule_idx = result.cssRules.length;
            var name = ".f-dropdown.open:before", dir = ".f-dropdown.open:after", type = "left: " + left + "px;", path = "left: " + (left - 1) + "px;";
            1 == d.missRight && (left = t.outerWidth() - 23, name = ".f-dropdown.open:before", 
            dir = ".f-dropdown.open:after", type = "left: " + left + "px;", path = "left: " + (left - 1) + "px;"), 
            1 == d.triggeredRight && (name = ".f-dropdown.open:before", dir = ".f-dropdown.open:after", 
            type = "left:-12px;", path = "left:-14px;"), result.insertRule ? (result.insertRule([ name, "{", type, "}" ].join(" "), this.rule_idx), 
            result.insertRule([ dir, "{", path, "}" ].join(" "), this.rule_idx + 1)) : (result.addRule(name, type, this.rule_idx), 
            result.addRule(dir, path, this.rule_idx + 1));
        },
        clear_idx: function() {
            var stylesheet = Foundation.stylesheet;
            "undefined" != typeof this.rule_idx && (stylesheet.deleteRule(this.rule_idx), stylesheet.deleteRule(this.rule_idx), 
            delete this.rule_idx);
        },
        small: function() {
            return matchMedia(Foundation.media_queries.small).matches && !matchMedia(Foundation.media_queries.medium).matches;
        },
        off: function() {
            this.S(this.scope).off(".fndtn.dropdown"), this.S("html, body").off(".fndtn.dropdown"), 
            this.S(b).off(".fndtn.dropdown"), this.S("[data-dropdown-content]").off(".fndtn.dropdown");
        },
        reflow: function() {}
    };
}(jQuery, window, window.document), function(a, b, c, opt_d) {
    "use strict";
    Foundation.libs.offcanvas = {
        name: "offcanvas",
        version: "5.5.0",
        settings: {
            open_method: "move",
            close_on_click: !1
        },
        init: function(section, method, options) {
            this.bindings(method, options);
        },
        events: function() {
            var self = this, i = self.S, className = "", name = "", val = "";
            "move" === this.settings.open_method ? (className = "move-", name = "right", val = "left") : "overlap_single" === this.settings.open_method ? (className = "offcanvas-overlap-", 
            name = "right", val = "left") : "overlap" === this.settings.open_method && (className = "offcanvas-overlap"), 
            i(this.scope).off(".offcanvas").on("click.fndtn.offcanvas", ".left-off-canvas-toggle", function(e) {
                self.click_toggle_class(e, className + name), "overlap" !== self.settings.open_method && i(".left-submenu").removeClass(className + name), 
                a(".left-off-canvas-toggle").attr("aria-expanded", "true");
            }).on("click.fndtn.offcanvas", ".left-off-canvas-menu a", function(e) {
                var url = self.get_settings(e), target = i(this).parent();
                !url.close_on_click || target.hasClass("has-submenu") || target.hasClass("back") ? i(this).parent().hasClass("has-submenu") ? (e.preventDefault(), 
                i(this).siblings(".left-submenu").toggleClass(className + name)) : target.hasClass("back") && (e.preventDefault(), 
                target.parent().removeClass(className + name)) : (self.hide.call(self, className + name, self.get_wrapper(e)), 
                target.parent().removeClass(className + name)), a(".left-off-canvas-toggle").attr("aria-expanded", "true");
            }).on("click.fndtn.offcanvas", ".right-off-canvas-toggle", function(e) {
                self.click_toggle_class(e, className + val), "overlap" !== self.settings.open_method && i(".right-submenu").removeClass(className + val), 
                a(".right-off-canvas-toggle").attr("aria-expanded", "true");
            }).on("click.fndtn.offcanvas", ".right-off-canvas-menu a", function(e) {
                var url = self.get_settings(e), target = i(this).parent();
                !url.close_on_click || target.hasClass("has-submenu") || target.hasClass("back") ? i(this).parent().hasClass("has-submenu") ? (e.preventDefault(), 
                i(this).siblings(".right-submenu").toggleClass(className + val)) : target.hasClass("back") && (e.preventDefault(), 
                target.parent().removeClass(className + val)) : (self.hide.call(self, className + val, self.get_wrapper(e)), 
                target.parent().removeClass(className + val)), a(".right-off-canvas-toggle").attr("aria-expanded", "true");
            }).on("click.fndtn.offcanvas", ".exit-off-canvas", function(e) {
                self.click_remove_class(e, className + val), i(".right-submenu").removeClass(className + val), 
                name && (self.click_remove_class(e, className + name), i(".left-submenu").removeClass(className + val)), 
                a(".right-off-canvas-toggle").attr("aria-expanded", "true");
            }).on("click.fndtn.offcanvas", ".exit-off-canvas", function(e) {
                self.click_remove_class(e, className + val), a(".left-off-canvas-toggle").attr("aria-expanded", "false"), 
                name && (self.click_remove_class(e, className + name), a(".right-off-canvas-toggle").attr("aria-expanded", "false"));
            });
        },
        toggle: function(element, info) {
            info = info || this.get_wrapper(), info.is("." + element) ? this.hide(element, info) : this.show(element, info);
        },
        show: function(index, target) {
            target = target || this.get_wrapper(), target.trigger("open").trigger("open.fndtn.offcanvas"), 
            target.addClass(index);
        },
        hide: function(css, $elem) {
            $elem = $elem || this.get_wrapper(), $elem.trigger("close").trigger("close.fndtn.offcanvas"), 
            $elem.removeClass(css);
        },
        click_toggle_class: function(event, options) {
            event.preventDefault();
            var col = this.get_wrapper(event);
            this.toggle(options, col);
        },
        click_remove_class: function(listener, event) {
            listener.preventDefault();
            var callback = this.get_wrapper(listener);
            this.hide(event, callback);
        },
        get_settings: function(ev) {
            var select = this.S(ev.target).closest("[" + this.attr_name() + "]");
            return select.data(this.attr_name(!0) + "-init") || this.settings;
        },
        get_wrapper: function(config) {
            var t = this.S(config ? config.target : this.scope).closest(".off-canvas-wrap");
            return 0 === t.length && (t = this.S(".off-canvas-wrap")), t;
        },
        reflow: function() {}
    };
}(jQuery, window, window.document), function(select, win, doc, data) {
    "use strict";
    function find(n) {
        var e = /fade/i.test(n), result = /pop/i.test(n);
        return {
            animate: e || result,
            pop: result,
            fade: e
        };
    }
    Foundation.libs.reveal = {
        name: "reveal",
        version: "5.5.0",
        locked: !1,
        settings: {
            animation: "fadeAndPop",
            animation_speed: 250,
            close_on_background_click: !0,
            close_on_esc: !0,
            dismiss_modal_class: "close-reveal-modal",
            bg_class: "reveal-modal-bg",
            bg_root_element: "body",
            root_element: "body",
            open: function() {},
            opened: function() {},
            close: function() {},
            closed: function() {},
            bg: select(".reveal-modal-bg"),
            css: {
                open: {
                    opacity: 0,
                    visibility: "visible",
                    display: "block"
                },
                close: {
                    opacity: 1,
                    visibility: "hidden",
                    display: "none"
                }
            }
        },
        init: function(section, method, options) {
            select.extend(!0, this.settings, method, options), this.bindings(method, options);
        },
        events: function(scope) {
            var self = this, a = self.S;
            return a(this.scope).off(".reveal").on("click.fndtn.reveal", "[" + this.add_namespace("data-reveal-id") + "]:not([disabled])", function(e) {
                if (e.preventDefault(), !self.locked) {
                    var element = a(this), ajax = element.data(self.data_attr("reveal-ajax"));
                    if (self.locked = !0, "undefined" == typeof ajax) self.open.call(self, element); else {
                        var url = ajax === !0 ? element.attr("href") : ajax;
                        self.open.call(self, element, {
                            url: url
                        });
                    }
                }
            }), a(doc).on("click.fndtn.reveal", this.close_targets(), function(e) {
                if (e.preventDefault(), !self.locked) {
                    var settings = a("[" + self.attr_name() + "].open").data(self.attr_name(!0) + "-init") || self.settings, bg_clicked = a(e.target)[0] === a("." + settings.bg_class)[0];
                    if (bg_clicked) {
                        if (!settings.close_on_background_click) return;
                        e.stopPropagation();
                    }
                    self.locked = !0, self.close.call(self, bg_clicked ? a("[" + self.attr_name() + "].open") : a(this).closest("[" + self.attr_name() + "]"));
                }
            }), a("[" + self.attr_name() + "]", this.scope).length > 0 ? a(this.scope).on("open.fndtn.reveal", this.settings.open).on("opened.fndtn.reveal", this.settings.opened).on("opened.fndtn.reveal", this.open_video).on("close.fndtn.reveal", this.settings.close).on("closed.fndtn.reveal", this.settings.closed).on("closed.fndtn.reveal", this.close_video) : a(this.scope).on("open.fndtn.reveal", "[" + self.attr_name() + "]", this.settings.open).on("opened.fndtn.reveal", "[" + self.attr_name() + "]", this.settings.opened).on("opened.fndtn.reveal", "[" + self.attr_name() + "]", this.open_video).on("close.fndtn.reveal", "[" + self.attr_name() + "]", this.settings.close).on("closed.fndtn.reveal", "[" + self.attr_name() + "]", this.settings.closed).on("closed.fndtn.reveal", "[" + self.attr_name() + "]", this.close_video), 
            !0;
        },
        key_up_on: function(scope) {
            var self = this;
            return self.S("body").off("keyup.fndtn.reveal").on("keyup.fndtn.reveal", function(event) {
                var open_modal = self.S("[" + self.attr_name() + "].open"), settings = open_modal.data(self.attr_name(!0) + "-init") || self.settings;
                settings && 27 === event.which && settings.close_on_esc && !self.locked && self.close.call(self, open_modal);
            }), !0;
        },
        key_up_off: function(scope) {
            return this.S("body").off("keyup.fndtn.reveal"), !0;
        },
        open: function(target, opts) {
            var modal, self = this;
            target ? "undefined" != typeof target.selector ? modal = self.S("#" + target.data(self.data_attr("reveal-id"))).first() : (modal = self.S(this.scope), 
            opts = target) : modal = self.S(this.scope);
            var settings = modal.data(self.attr_name(!0) + "-init");
            if (settings = settings || this.settings, modal.hasClass("open") && target.attr("data-reveal-id") == modal.attr("id")) return self.close(modal);
            if (!modal.hasClass("open")) {
                var open_modal = self.S("[" + self.attr_name() + "].open");
                if ("undefined" == typeof modal.data("css-top") && modal.data("css-top", parseInt(modal.css("top"), 10)).data("offset", this.cache_offset(modal)), 
                this.key_up_on(modal), modal.trigger("open").trigger("open.fndtn.reveal"), open_modal.length < 1 && this.toggle_bg(modal, !0), 
                "string" == typeof opts && (opts = {
                    url: opts
                }), "undefined" != typeof opts && opts.url) {
                    var old_success = "undefined" != typeof opts.success ? opts.success : null;
                    select.extend(opts, {
                        success: function(data, textStatus, jqXHR) {
                            if (select.isFunction(old_success)) {
                                var arr = old_success(data, textStatus, jqXHR);
                                "string" == typeof arr && (data = arr);
                            }
                            modal.html(data), self.S(modal).foundation("section", "reflow"), self.S(modal).children().foundation(), 
                            open_modal.length > 0 && self.hide(open_modal, settings.css.close), self.show(modal, settings.css.open);
                        }
                    }), select.ajax(opts);
                } else open_modal.length > 0 && this.hide(open_modal, settings.css.close), this.show(modal, settings.css.open);
            }
            self.S(win).trigger("resize");
        },
        close: function(modal) {
            var modal = modal && modal.length ? modal : this.S(this.scope), open_modals = this.S("[" + this.attr_name() + "].open"), settings = modal.data(this.attr_name(!0) + "-init") || this.settings;
            open_modals.length > 0 && (this.locked = !0, this.key_up_off(modal), modal.trigger("close").trigger("close.fndtn.reveal"), 
            this.toggle_bg(modal, !1), this.hide(open_modals, settings.css.close, settings));
        },
        close_targets: function() {
            var base = "." + this.settings.dismiss_modal_class;
            return this.settings.close_on_background_click ? base + ", ." + this.settings.bg_class : base;
        },
        toggle_bg: function(error, request, result) {
            var e = error.data(this.attr_name(!0) + "-init") || this.settings, t = e.bg_root_element;
            0 === this.S("." + this.settings.bg_class).length && (this.settings.bg = select("<div />", {
                "class": this.settings.bg_class
            }).appendTo(t).hide());
            var value = this.settings.bg.filter(":visible").length > 0;
            result != value && ((result == data ? value : !result) ? this.hide(this.settings.bg) : this.show(this.settings.bg));
        },
        show: function(el, css) {
            if (css) {
                var settings = el.data(this.attr_name(!0) + "-init") || this.settings, selector = settings.root_element;
                if (0 === el.parent(selector).length) {
                    var placeholder = el.wrap('<div style="display: none;" />').parent();
                    el.on("closed.fndtn.reveal.wrapped", function() {
                        el.detach().appendTo(placeholder), el.unwrap().unbind("closed.fndtn.reveal.wrapped");
                    }), el.detach().appendTo(selector);
                }
                var animation = find(settings.animation);
                if (animation.animate || (this.locked = !1), animation.pop) {
                    css.top = select(selector).scrollTop() - el.data("offset") + "px";
                    var end_css = {
                        top: select(selector).scrollTop() + el.data("css-top") + "px",
                        opacity: 1
                    };
                    return setTimeout(function() {
                        return el.css(css).animate(end_css, settings.animation_speed, "linear", function() {
                            this.locked = !1, el.trigger("opened").trigger("opened.fndtn.reveal");
                        }.bind(this)).addClass("open");
                    }.bind(this), settings.animation_speed / 2);
                }
                if (animation.fade) {
                    css.top = select(selector).scrollTop() + el.data("css-top") + "px";
                    var end_css = {
                        opacity: 1
                    };
                    return setTimeout(function() {
                        return el.css(css).animate(end_css, settings.animation_speed, "linear", function() {
                            this.locked = !1, el.trigger("opened").trigger("opened.fndtn.reveal");
                        }.bind(this)).addClass("open");
                    }.bind(this), settings.animation_speed / 2);
                }
                return el.css(css).show().css({
                    opacity: 1
                }).addClass("open").trigger("opened").trigger("opened.fndtn.reveal");
            }
            var settings = this.settings;
            return find(settings.animation).fade ? el.fadeIn(settings.animation_speed / 2) : (this.locked = !1, 
            el.show());
        },
        hide: function(el, css) {
            if (css) {
                var settings = el.data(this.attr_name(!0) + "-init") || this.settings, i = settings.root_element, o = find(settings.animation);
                if (o.animate || (this.locked = !1), o.pop) {
                    var end_css = {
                        top: -select(i).scrollTop() - el.data("offset") + "px",
                        opacity: 0
                    };
                    return setTimeout(function() {
                        return el.animate(end_css, settings.animation_speed, "linear", function() {
                            this.locked = !1, el.css(css).trigger("closed").trigger("closed.fndtn.reveal");
                        }.bind(this)).removeClass("open");
                    }.bind(this), settings.animation_speed / 2);
                }
                if (o.fade) {
                    var end_css = {
                        opacity: 0
                    };
                    return setTimeout(function() {
                        return el.animate(end_css, settings.animation_speed, "linear", function() {
                            this.locked = !1, el.css(css).trigger("closed").trigger("closed.fndtn.reveal");
                        }.bind(this)).removeClass("open");
                    }.bind(this), settings.animation_speed / 2);
                }
                return el.hide().css(css).removeClass("open").trigger("closed").trigger("closed.fndtn.reveal");
            }
            var settings = this.settings;
            return find(settings.animation).fade ? el.fadeOut(settings.animation_speed / 2) : el.hide();
        },
        close_video: function(evt) {
            var video = select(".flex-video", evt.target), iframe = select("iframe", video);
            iframe.length > 0 && (iframe.attr("data-src", iframe[0].src), iframe.attr("src", iframe.attr("src")), 
            video.hide());
        },
        open_video: function(evt) {
            var video = select(".flex-video", evt.target), iframe = video.find("iframe");
            if (iframe.length > 0) {
                var data_src = iframe.attr("data-src");
                if ("string" == typeof data_src) iframe[0].src = iframe.attr("data-src"); else {
                    var src = iframe[0].src;
                    iframe[0].src = data, iframe[0].src = src;
                }
                video.show();
            }
        },
        data_attr: function(className) {
            return this.namespace.length > 0 ? this.namespace + "-" + className : className;
        },
        cache_offset: function(modal) {
            var offset = modal.show().height() + parseInt(modal.css("top"), 10);
            return modal.hide(), offset;
        },
        off: function() {
            select(this.scope).off(".fndtn.reveal");
        },
        reflow: function() {}
    };
}(jQuery, window, window.document), function(func, p, query, fn) {
    "use strict";
    Foundation.libs.tooltip = {
        name: "tooltip",
        version: "5.5.0",
        settings: {
            additional_inheritable_classes: [],
            tooltip_class: ".tooltip",
            append_to: "body",
            touch_close_text: "Tap To Close",
            disable_for_touch: !1,
            hover_delay: 200,
            show_on: "all",
            tip_template: function(selector, content) {
                return '<span data-selector="' + selector + '" id="' + selector + '" class="' + Foundation.libs.tooltip.settings.tooltip_class.substring(1) + '" role="tooltip">' + content + '<span class="nub"></span></span>';
            }
        },
        cache: {},
        init: function(section, method, options) {
            Foundation.inherit(this, "random_str"), this.bindings(method, options);
        },
        should_show: function(el, clazz) {
            var settings = func.extend({}, this.settings, this.data_options(el));
            return "all" === settings.show_on ? !0 : this.small() && "small" === settings.show_on ? !0 : this.medium() && "medium" === settings.show_on ? !0 : this.large() && "large" === settings.show_on ? !0 : !1;
        },
        medium: function() {
            return matchMedia(Foundation.media_queries.medium).matches;
        },
        large: function() {
            return matchMedia(Foundation.media_queries.large).matches;
        },
        events: function(scope) {
            var self = this, trigger = self.S;
            self.create(this.S(scope)), func(this.scope).off(".tooltip").on("mouseenter.fndtn.tooltip mouseleave.fndtn.tooltip touchstart.fndtn.tooltip MSPointerDown.fndtn.tooltip", "[" + this.attr_name() + "]", function(e) {
                var target = trigger(this), settings = func.extend({}, self.settings, self.data_options(target)), c = !1;
                if (Modernizr.touch && /touchstart|MSPointerDown/i.test(e.type) && trigger(e.target).is("a")) return !1;
                if (/mouse/i.test(e.type) && self.ie_touch(e)) return !1;
                if (target.hasClass("open")) Modernizr.touch && /touchstart|MSPointerDown/i.test(e.type) && e.preventDefault(), 
                self.hide(target); else {
                    if (settings.disable_for_touch && Modernizr.touch && /touchstart|MSPointerDown/i.test(e.type)) return;
                    !settings.disable_for_touch && Modernizr.touch && /touchstart|MSPointerDown/i.test(e.type) && (e.preventDefault(), 
                    trigger(settings.tooltip_class + ".open").hide(), c = !0), /enter|over/i.test(e.type) ? this.timer = setTimeout(function() {
                        self.showTip(target);
                    }.bind(this), self.settings.hover_delay) : "mouseout" === e.type || "mouseleave" === e.type ? (clearTimeout(this.timer), 
                    self.hide(target)) : self.showTip(target);
                }
            }).on("mouseleave.fndtn.tooltip touchstart.fndtn.tooltip MSPointerDown.fndtn.tooltip", "[" + this.attr_name() + "].open", function(e) {
                return /mouse/i.test(e.type) && self.ie_touch(e) ? !1 : void (("touch" != func(this).data("tooltip-open-event-type") || "mouseleave" != e.type) && ("mouse" == func(this).data("tooltip-open-event-type") && /MSPointerDown|touchstart/i.test(e.type) ? self.convert_to_touch(func(this)) : self.hide(func(this))));
            }).on("DOMNodeRemoved DOMAttrModified", "[" + this.attr_name() + "]:not(a)", function(e) {
                self.hide(trigger(this));
            });
        },
        ie_touch: function(a) {
            return !1;
        },
        showTip: function(message) {
            var timeout = this.getTip(message);
            return this.should_show(message, timeout) ? this.show(message) : void 0;
        },
        getTip: function(target) {
            var selector = this.selector(target), settings = func.extend({}, this.settings, this.data_options(target)), headers = null;
            return selector && (headers = this.S('span[data-selector="' + selector + '"]' + settings.tooltip_class)), 
            "object" == typeof headers ? headers : !1;
        },
        selector: function($target) {
            var id = $target.attr("id"), dataSelector = $target.attr(this.attr_name()) || $target.attr("data-selector");
            return (id && id.length < 1 || !id) && "string" != typeof dataSelector && (dataSelector = this.random_str(6), 
            $target.attr("data-selector", dataSelector).attr("aria-describedby", dataSelector)), 
            id && id.length > 0 ? id : dataSelector;
        },
        create: function(target) {
            var path = this, args = func.extend({}, this.settings, this.data_options(target)), group = this.settings.tip_template;
            "string" == typeof args.tip_template && p.hasOwnProperty(args.tip_template) && (group = p[args.tip_template]);
            var $tip = func(group(this.selector(target), func("<div></div>").html(target.attr("title")).html())), classes = this.inheritable_classes(target);
            $tip.addClass(classes).appendTo(args.append_to), Modernizr.touch && ($tip.append('<span class="tap-to-close">' + args.touch_close_text + "</span>"), 
            $tip.on("touchstart.fndtn.tooltip MSPointerDown.fndtn.tooltip", function(e) {
                path.hide(target);
            })), target.removeAttr("title").attr("title", "");
        },
        reposition: function(target, tip, classes) {
            var width, nub, nubHeight, nubWidth, objPos;
            if (tip.css("visibility", "hidden").show(), width = target.data("width"), nub = tip.children(".nub"), 
            nubHeight = nub.outerHeight(), nubWidth = nub.outerHeight(), this.small() ? tip.css({
                width: "100%"
            }) : tip.css({
                width: width ? width : "auto"
            }), objPos = function(a, b, c, d, e, f) {
                return a.css({
                    top: b ? b : "auto",
                    bottom: d ? d : "auto",
                    left: e ? e : "auto",
                    right: c ? c : "auto"
                }).end();
            }, objPos(tip, target.offset().top + target.outerHeight() + 10, "auto", "auto", target.offset().left), 
            this.small()) objPos(tip, target.offset().top + target.outerHeight() + 10, "auto", "auto", 12.5, func(this.scope).width()), 
            tip.addClass("tip-override"), objPos(nub, -nubHeight, "auto", "auto", target.offset().left); else {
                var left = target.offset().left;
                Foundation.rtl && (nub.addClass("rtl"), left = target.offset().left + target.outerWidth() - tip.outerWidth()), 
                objPos(tip, target.offset().top + target.outerHeight() + 10, "auto", "auto", left), 
                tip.removeClass("tip-override"), classes && classes.indexOf("tip-top") > -1 ? (Foundation.rtl && nub.addClass("rtl"), 
                objPos(tip, target.offset().top - tip.outerHeight(), "auto", "auto", left).removeClass("tip-override")) : classes && classes.indexOf("tip-left") > -1 ? (objPos(tip, target.offset().top + target.outerHeight() / 2 - tip.outerHeight() / 2, "auto", "auto", target.offset().left - tip.outerWidth() - nubHeight).removeClass("tip-override"), 
                nub.removeClass("rtl")) : classes && classes.indexOf("tip-right") > -1 && (objPos(tip, target.offset().top + target.outerHeight() / 2 - tip.outerHeight() / 2, "auto", "auto", target.offset().left + target.outerWidth() + nubHeight).removeClass("tip-override"), 
                nub.removeClass("rtl"));
            }
            tip.css("visibility", "visible").hide();
        },
        small: function() {
            return matchMedia(Foundation.media_queries.small).matches && !matchMedia(Foundation.media_queries.medium).matches;
        },
        inheritable_classes: function(target) {
            var options = func.extend({}, this.settings, this.data_options(target)), data = [ "tip-top", "tip-left", "tip-bottom", "tip-right", "radius", "round" ].concat(options.additional_inheritable_classes), cls = target.attr("class"), o = cls ? func.map(cls.split(" "), function(i, name) {
                return -1 !== func.inArray(i, data) ? i : void 0;
            }).join(" ") : "";
            return func.trim(o);
        },
        convert_to_touch: function(target) {
            var self = this, $tip = self.getTip(target), options = func.extend({}, self.settings, self.data_options(target));
            0 === $tip.find(".tap-to-close").length && ($tip.append('<span class="tap-to-close">' + options.touch_close_text + "</span>"), 
            $tip.on("click.fndtn.tooltip.tapclose touchstart.fndtn.tooltip.tapclose MSPointerDown.fndtn.tooltip.tapclose", function(e) {
                self.hide(target);
            })), target.data("tooltip-open-event-type", "touch");
        },
        show: function($target) {
            var $tip = this.getTip($target);
            "touch" == $target.data("tooltip-open-event-type") && this.convert_to_touch($target), 
            this.reposition($target, $tip, $target.attr("class")), $target.addClass("open"), 
            $tip.fadeIn(150);
        },
        hide: function($target) {
            var $tip = this.getTip($target);
            $tip.fadeOut(150, function() {
                $tip.find(".tap-to-close").remove(), $tip.off("click.fndtn.tooltip.tapclose MSPointerDown.fndtn.tapclose"), 
                $target.removeClass("open");
            });
        },
        off: function() {
            var me = this;
            this.S(this.scope).off(".fndtn.tooltip"), this.S(this.settings.tooltip_class).each(function(i) {
                func("[" + me.attr_name() + "]").eq(i).attr("title", func(this).text());
            }).remove();
        },
        reflow: function() {}
    };
}(jQuery, window, window.document), function(g) {
    var _self, data = {}, options = {};
    try {
        _self = localStorage;
    } catch (e) {}
    var el;
    _self && _self.getItem ? el = _self.getItem("__browser_id__") : (el = document.cookie.match(/browser_id=(id\d+\.\d+);/), 
    el && (el = el[1])), el || (el = "id" + Date.now() + Math.random(), _self && _self.setItem && _self.setItem("__browser_id__", el)), 
    g.GadgetIO = {
        "export": function(path, val) {
            for (var d = path.split("."), k = d.pop(), opts = data, i = 0; i < d.length; i++) null == opts[d[i]] && (opts[d[i]] = {}), 
            opts = opts[d[i]];
            if (opts[k]) throw new Error("Module " + path + " has already been defined!");
            return opts[k] = val, val;
        },
        "import": function(component) {
            for (var keys = component.split("."), cursor = data, i = 0; i < keys.length; i++) if (cursor = cursor[keys[i]], 
            null == cursor) throw new Error("Module " + component + " could not be found!");
            return cursor;
        },
        runtime: function(a, b) {
            return arguments.length > 1 && (options[a] = b), options[a];
        },
        clearRuntime: function() {
            options = {};
        }
    };
}(window), function(options) {
    window.gadgetConfig = {
        get: function(key) {
            return options[key];
        },
        prefix: function(s, key) {
            if ("/" !== s.charAt(0) && (s = "/" + s), options.testing) return s;
            if ("undefined" == typeof key) {
                var data = s.match(/\/(\w+)\//);
                data && (key = data[1]);
            }
            return key && options.prefixes[key] ? "/" + options.prefixes[key] + s : "/" + options.cachePrefix + Date.now() + s;
        },
        component: function(id, src) {
            return [ options.vendorHost, id, options.components[id], src ].join("/");
        },
        getUrl: function(path) {
            return "/" !== path.charAt(0) && (path = "/" + path), options.protocol + "://" + options.apphostname + path;
        },
        getClassUrl: function(i, entry) {
            var id = "/" + entry;
            return options.usersubdomains ? "//" + i + "." + options.apphostname + id : "/u/" + i + "/classes" + id;
        }
    };
}(window.gadget.config), function(win, doc) {
    "use strict";
    function parse(str) {
        return new Function("o", 'return "' + str.replace(/["\n\r\u2028\u2029]/g, function(type) {
            return item[type];
        }).replace(/\{\{([\s\S]+?)\}\}/g, '" + (o["$1"] !== undefined ? o["$1"] : "") + "') + '";');
    }
    function fn(k, m) {
        return obj[k] || (obj[k] = parse($("#" + k).text()), $("#" + k).remove()), obj[k](m || {});
    }
    var item = {
        "\n": "\\n",
        '"': '\\"',
        "\u2028": "\\u2028",
        "\u2029": "\\u2029"
    }, obj = {};
    fn.compile = parse, doc["export"]("utils.template", fn);
}(window, window.GadgetIO), function(win, dict) {
    "use strict";
    function apply() {
        return +new Date();
    }
    function isCollision(a) {
        return n + a;
    }
    function k(g) {
        return r + g;
    }
    function f(a, res) {
        var v = parseInt(s.getItem(k(a)), 10);
        return v && v < (res || apply()) ? !0 : !1;
    }
    function g(a, cmd, seconds) {
        if (s && a) {
            var e = k(a);
            if (seconds) {
                var i = 1e3 * seconds;
                s.setItem(e, apply() + i);
            } else s.removeItem(e);
            return cmd = JSON.stringify(cmd), s.setItem(isCollision(a), cmd);
        }
    }
    function toJSON(a) {
        if (!s || !a) return null;
        if (f(a)) return deepEquals(a), null;
        var data = s.getItem(isCollision(a));
        if (data) try {
            return JSON.parse(data);
        } catch (e) {
            return null;
        }
        return data;
    }
    function deepEquals(a) {
        s && a && (s.removeItem(k(a)), s.removeItem(isCollision(a)));
    }
    function compare() {
        if (s) {
            var a, i, l = s.length, m = n, r = apply();
            for (i = 0; l > i; i++) a = s.key(i), a && 0 === a.indexOf(m) && (a = a.substr(m.length), 
            f(a, r) && deepEquals(a));
        }
    }
    var n = "__gadget__", r = "__gadget_expire__", s = function() {
        try {
            return win.localStorage.setItem(n, ""), win.localStorage.getItem(n), win.localStorage.removeItem(n), 
            win.localStorage;
        } catch (b) {
            return;
        }
    }();
    dict["export"]("utils.cache", {
        get: toJSON,
        set: g,
        remove: deepEquals,
        purge: compare
    });
}(window, window.GadgetIO), $("document").ready(function() {
    function get(path) {
        return window.location.protocol + "//" + window.location.hostname + path;
    }
    function init(parameter) {
        var self, values, count, s, i, y = parameter.split("="), data = "", len = !1;
        if (("console" === this.getType() || ("python3" === this.getType() || "python" === this.getType()) && "console" === this._queryString.runMode) && (len = !0), 
        "code" === y[0] && y[1]) if (data = decodeURIComponent(y[1]), "java" === this.getType() && (s = data.match(/^----\{(\w[\w\.\-]*)\}----\n/), 
        s && (count = s[1], data = data.substring(data.indexOf("\n") + 1))), self = /\n----\{(\w[\w\.\-]*)\}----\n/, 
        values = data.split(self), values.length > 1 || count) {
            if (count = count || this.getMainFile()) {
                for (data = [ {
                    name: count,
                    content: values.shift()
                } ], len && (data[0].content = render(data[0].content)), i = 0; i < values.length; i += 2) data.push({
                    name: values[i],
                    content: "undefined" != typeof values[i + 1] && values[i + 1].length ? values[i + 1] : ""
                });
                data = JSON.stringify(data);
            }
        } else len && (data = render(data));
        return data;
    }
    function render(str) {
        var data, lines, length, result;
        return /^>>>/.test(str) && (data = [], lines = str.split("\n"), lines.forEach(function(line) {
            (length = /^(>>>|\.\.\.) /.exec(line)) && (result = line.substring(4, line.length), 
            "..." === length[1] ? data[data.length - 1] += "\\n" + result : "undefined" != typeof result && result.length && data.push(result));
        }), str = data.join("\n")), str;
    }
    function extend(result) {
        if ("undefined" == typeof result || null === result) return null;
        if (result instanceof Array) for (var i = 0; i < result.length; i++) result[i] = extend(result[i]); else if ("object" == typeof result) for (var i in result) result.hasOwnProperty(i) && (result[i] = extend(result[i])); else "string" == typeof result && (result = _.unescape(result));
        return result;
    }
    function deserialize() {
        var b = {};
        if (window.location.search) for (var array = window.location.search.substr(1).split("&"), i = 0; i < array.length; i++) {
            var p = array[i].split("=");
            p[0] && "undefined" != typeof p[1] && (b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " ")), 
            "true" === b[p[0]] && (b[p[0]] = !0), "false" === b[p[0]] && (b[p[0]] = !1));
        }
        return b;
    }
    function debug(obj, message) {
        message && o.clearRuntime();
        var keys = Object.keys(obj);
        keys.forEach(function(key) {
            o.runtime(key, obj[key]);
        });
    }
    function save(url, self) {
        return function(event, matches, keyCode) {
            var data = matches ? callback(matches).serialize() : callback("#accountForm").serialize(), e = matches || "#accountForm";
            event.stopPropagation(), event.preventDefault(), callback.ajax({
                type: "POST",
                url: url,
                data: data,
                success: callback.proxy(self.onLoginComplete, self, e),
                dataType: "json"
            }), self.sendInterfaceAnalytics(this, keyCode);
        };
    }
    function remove(name, o, f) {
        var dfd = callback.Deferred();
        return JSZipUtils.getBinaryContent(name, function(error, d) {
            error ? dfd.reject(error) : (f.file(o, d, {
                binary: !0
            }), dfd.resolve(d));
        }), dfd;
    }
    function initialize(options, stage) {
        var i, il, self = this, args = [ "on", "off", "trigger", "once" ], settings = callback("body").data("view-only");
        this._$ = callback(this);
        for (var x = 0; x < args.length; x++) {
            var key = args[x];
            this[key] = callback.proxy(this._$[key], this._$);
        }
        if (this.$shareModal = callback("#shareModal"), this.$shareUrl = callback("#shareUrl"), 
        this.$embedModal = callback("#embedModal"), this.$embedCode = callback("#embedCode"), 
        this.$emailModal = callback("#emailModal"), this.$overlay = callback("#content-overlay"), 
        this.$resetModal = callback("#confirmResetModal"), this.$upgradeModal = callback("#upgradeModal"), 
        this.$draftMessage = callback("#draftMessage"), this.assignment = callback("body").data("assignment"), 
        o.runtime("mission-zero", callback("body").data("mission-zero") || !1), this.$responsiveIndicators = callback(".responsive-indicator"), 
        callback(document).on("click touchstart", ".menu-button", function(e) {
            var p = callback(this).data("action"), s = "gadget." + p;
            if (!callback(this).hasClass("disabled")) {
                if ("touchstart" === e.type) callback(this).addClass("touched"); else if ("click" === e.type && callback(this).hasClass("touched")) return void callback(this).removeClass("touched");
                callback(this).trigger(s, {
                    action: p,
                    data: callback(this).data("data")
                }), callback(this).data("no-analytics") || self.sendInterfaceAnalytics(this);
            }
        }), callback(document).on("gadget.sharing.share", callback.proxy(this.onShareClick, this)), 
        callback(document).on("gadget.sharing.embed", callback.proxy(this.onEmbedClick, this)), 
        callback(document).on("gadget.sharing.email", callback.proxy(this.onEmailClick, this)), 
        callback(document).on("gadget.group.post", callback.proxy(this.onGroupPostClick, this)), 
        callback(document).on("gadget.group.submit", callback.proxy(this.onGroupSubmitClick, this)), 
        callback(document).on("gadget.library.add", callback.proxy(this.onSaveClick, this)), 
        callback(document).on("gadget.code.save", callback.proxy(this.onUpdateClick, this)), 
        callback(document).on("gadget.code.fontsize", callback.proxy(this.onFontSizeClick, this)), 
        callback(document).on("gadget.view.gallery", callback.proxy(this.onGalleryClick, this)), 
        callback(document).on("gadget.mode.fullscreen", callback.proxy(this.onFullScreenClick, this)), 
        callback(document).on("gadget.mode.download", callback.proxy(this.onDownloadClick, this)), 
        callback(document).on("gadget.mode.upload", callback.proxy(this.onUploadClick, this)), 
        callback(document).on("gadget.menu.upgrade", callback.proxy(this.onUpgradeClick, this)), 
        callback(document).on("gadget.open.link", callback.proxy(this.onLinkClick, this)), 
        callback(document).on("gadget.code.reset", function() {
            self.$resetModal.foundation("reveal", "open");
        }), callback(document).on("gadget.code.confirm-reset", callback.proxy(this.onResetClick, this)), 
        callback(document).on("gadget.code.cancel-reset", function() {
            self.$resetModal.foundation("reveal", "close");
        }), callback(document).on("gadget.code.settings", function() {
            callback("#settingsModal").foundation("reveal", "open");
        }), callback(document).on("webkitfullscreenchange mozfullscreenchange fullscreenchange MSFullscreenChange", function(packages) {
            var w = callback(".gadget-content-wrapper").width(), s = callback("#editor").width();
            s > w && callback("#editor").css("width", .5 * w);
        }), callback(document).on("change", "input[data-gadget-settings]", callback.proxy(this.settingsChange, this)), 
        o.runtime("settingsModified", !1), t.init(), callback("#version-toggle").change(function() {
            callback(this).is(":checked") ? (self.reset(self._original), self._viewingOriginal(!1), 
            callback(".menu-button").not(".allow-original").removeClass("disabled")) : (callback.extend(!0, self._original, self.serialize()), 
            self.reset(self._original.original), self._viewingOriginal(!0), callback(".menu-button").not(".allow-original").addClass("disabled"), 
            callback(".revert-remix").removeClass("disabled"));
        }), this._notification_open = !1, callback("#notification-container").click(callback.proxy(this.onNotificationClick, this)), 
        m && m.addEventListener && m.addEventListener("addthis.menu.share", callback.proxy(this.onSocialShare, this)), 
        this._currentMode = "", this._updates = {}, this._original = extend(options), this._viewingDraft = !1, 
        this._predraft = callback.extend(!0, {}, this._original), stage) {
            if (this._original_draft = extend(stage), [ "code", "assets", "settings" ].forEach(function(key) {
                self._original_draft[key] && (self._original[key] = self._original_draft[key], self._viewingDraft = !0, 
                "settings" === key && debug(self._original_draft[key] || {}));
            }), this._viewingDraft) {
                var title = parse("draftTextTemplate", {
                    draftText: "Viewing Draft"
                });
                this.$draftMessage.html(title), callback(".save-it").removeClass("disabled");
            }
        } else this._original = this._original || {};
        debug(this._original.settings || {});
        if (this._queryString = deserialize(), window.location.hash) {
            var url = window.location.href, button = init.call(this, url.substr(url.indexOf("#") + 1));
            button && (this._original.code = button);
        }
        this.setGadget(this._original);
        try {
            window.sessionStorage;
        } catch (y) {
            this._queryString.noStorage = !0;
        }
        if (this._queryString.clearStorage) {
            this.generateGUID();
            try {
                window.sessionStorage && window.sessionStorage.removeItem(this.guid), q.remove(this.guid);
            } catch (y) {}
        }
        true || this._queryString.noStorage || this._queryString.outputOnly || (this.generateGUID(), 
        this._queryString.autoRestore !== !1 && window.sessionStorage && window.sessionStorage.getItem(this.guid) ? this._gadget.code = window.sessionStorage.getItem(this.guid) : (this._previousSession = q.get(this.guid)) && (q.remove(this.guid), 
        this._queryString.autoRestore !== !1 ? this._gadget.code = this._previousSession : self.showRestoreMessage())), 
        this.setUI(), "console" !== this.getType() && "guest" !== this.getUIType() && !this.assignment && !settings && this._original && this._original.id && (i = !0), 
        this.assignment && !settings && (il = !0), i ? callback(this).on("gadget.code.change", _.debounce(function() {
            callback(".save-it").removeClass("disabled"), self.updateDraft();
        }, 1e3)) : il ? callback(this).on("gadget.code.change", _.debounce(function() {
            callback(".save-it").removeClass("disabled"), self.autoSave();
        }, 1e3)) : callback(this).on("gadget.code.change", _.debounce(function() {
            self.updateSessionCache();
        }, 500)), this._queryString.externalInit || this.initialize(this._gadget), this.toggleUI(this.getUIType()), 
        callback(document).keydown(function($event) {
            self.hasOverlay && 27 === $event.keyCode && self.hideAll();
        }), callback(document).foundation({
            offcanvas: {
                close_on_click: !0
            },
            dropdown: {
                active_class: "open"
            }
        }), callback(".left-off-canvas-toggle, .right-off-canvas-toggle").on("click", function() {}), 
        callback(document).on("close.fndtn.alert", function(packages) {
            callback("body").removeClass("has-status-bar");
        }), this.setFontSize(this._queryString.font || "1em"), this.parsedInstructions = "", 
        callback(document).on("click", "#edit-instructions-link", callback.proxy(this.onEditInstructionsClick, this)), 
        callback(document).on("click", "#cancel-edit-instructions", callback.proxy(this.onCancelEditInstructionsClick, this)), 
        callback(document).on("click", "#save-instructions", callback.proxy(this.onSaveInstructionsClick, this)), 
        self.serversideTimeoutDelay = self.hasRole("gadget-connect") ? 6e5 : 18e4;
    }
    function add(object, cb, selector, type) {
        var result = parse("statusMessageTemplate", {
            type: type || "success",
            message: object
        }), error = callback(result);
        callback("body").addClass("has-status-bar").append(error), cb && error.find(".yep").on("click", cb), 
        selector && error.find(".nope").on("click", selector), callback(document).foundation("alert", "reflow");
    }
    function expand(related, what, path) {
        var d = !1, e = new RegExp("\\." + path), f = new RegExp("import\\s*" + what), i = new RegExp("from\\s*" + what + "\\s*import");
        return _.map(related, function(v, k) {
            k.match(e) && (v.match(f) || v.match(i)) && (d = !0);
        }), d;
    }
    var c, m = window.addthis, callback = window.jQuery, o = window.GadgetIO, p = 1728e3, q = o["import"]("utils.cache"), parse = o["import"]("utils.template"), s = o["import"]("utils.selectText"), t = o["import"]("gadget.share"), l = o["import"]("gadget.roles"), _len1 = "undefined" != typeof gadgetMarkdown ? gadgetMarkdown({}) : void 0;
    q.purge(), callback.fn.serializeObject = function() {
        var o = {}, a = this.serializeArray();
        return callback.each(a, function() {
            o[this.name] ? (o[this.name].push || (o[this.name] = [ o[this.name] ]), o[this.name].push(this.value || "")) : o[this.name] = this.value || "";
        }), o;
    };
    if (callback.extend(initialize.prototype, {
        showRestoreMessage: function() {
            var code, obj, lines, result = this;
            obj = 'Do you want to restore your last session? <a title="restore the previous session" data-action="code.restore" class="text-link yep"><i class="fa fa-check"></i>&nbsp;Restore</a>&nbsp;&nbsp;or&nbsp;&nbsp;<a class="text-link nope"><i class="fa fa-trash"></i>&nbsp;Discard</a>', 
            lines = '<i class="fa fa-check-circle-o"></i>&nbsp;Your session has been restored. <a class="text-link yep"><i class="fa fa-thumbs-o-up">&nbsp;</i>Accept</a>&nbsp;&nbsp;or&nbsp;&nbsp;<a class="text-link nope"><i class="fa fa-undo"></i>&nbsp;Undo</a>', 
            add(obj, function() {
                callback("#statusMessages .close").click(), code = result._gadget.code, result._gadget.code = result._previousSession, 
                result.reset(result._gadget), callback(result).trigger("gadget.code.change"), add(lines, function() {
                    callback("#statusMessages .close").click();
                }, function() {
                    callback("#statusMessages .close").click(), result._gadget.code = code, result.reset(result._gadget), 
                    callback(result).trigger("gadget.code.change"), result.showRestoreMessage();
                });
            }, function() {
                callback("#statusMessages .close").click();
            });
        },
        initialize: function(attrs) {
            throw new Error("initialize is not implemented");
        },
        generateGUID: function() {
            var string;
            if (!this.guid) {
                var string = (this._gadget.id || JSON.stringify(this._gadget)) + (document.referrer || document.location);
                this.guid = CryptoJS.MD5(string).toString(CryptoJS.enc.Hex);
            }
        },
        onFontSizeClick: function(oRequest, oResponse) {
            this.setFontSize(oResponse && oResponse.data);
        },
        onFullScreenClick: function(event, fromFocus) {
            var doc = document, elem = doc.documentElement, ref_parent = elem.requestFullscreen || elem.msRequestFullscreen || elem.mozRequestFullScreen || elem.webkitRequestFullscreen, attr = doc.exitFullscreen || doc.msExitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen;
            try {
                if (!ref_parent || doc.fullscreenElement || doc.mozFullScreenElement || doc.webkitFullscreenElement || doc.msFullscreenElement) {
                    if (!attr) throw new Error("fullscreen unavailable");
                    attr.call(doc), this.sendInterfaceAnalytics(event.target, {
                        data: "exit"
                    });
                } else ref_parent.call(elem), this.sendInterfaceAnalytics(event.target, {
                    data: "enter"
                });
            } catch (g) {
                if (confirm("Your browser does not support fullscreen mode. Would you like to open this gadget in a new window?")) {
                    var url = window.location.href;
                    if (this.isModified()) {
                        var str = "code=" + window.encodeURIComponent(this.getValue());
                        url = url.indexOf("#") > 0 ? url.replace(url.substr(url.indexOf("#") + 1), str) : url + "#" + str;
                    }
                    window.open(url);
                }
            }
        },
        onDownloadClick: function(bei, agoi) {
            var key, i, index, data = this.downloadable(), obj = this, self = new JSZip(), type = [];
            callback.each(data.assets, function(a, item) {
                key = /^data:image/.test(item.url) ? item.url : callback("#proxy").val() + "/" + item.url, 
                type.push(remove(key, item.name, self));
            }), callback.when.apply(callback, type).done(function() {
                for (i in data.files) self.file(i, data.files[i]);
                index = obj.getGadgetIdentifier(), obj._gadget && obj._gadget.name && (index = obj._gadget.name + "-" + index), 
                index = "Gadget Download-" + index + ".zip", new JSZip.external.Promise(function(resolve, reject) {
                    if (o.runtime("downloadExtra")) {
                        var errors = callback("#proxy").val() + "/" + o.runtime("downloadExtra");
                        JSZipUtils.getBinaryContent(errors, function(error, value) {
                            error ? reject(error) : resolve(value);
                        });
                    } else resolve();
                }).then(function(result) {
                    return result ? self.loadAsync(result) : void 0;
                }).then(function() {
                    self.generateAsync({
                        type: "blob"
                    }).then(function(content) {
                        saveAs(content, index);
                    }, function(xhr) {
                        throw new Error("Could not generate download.");
                    });
                });
            }).done(function() {
                obj.callAnalytics("Interaction", "Click", "Download"), expand(data.files, "sense_hat", "py") && obj.callAnalytics("Sense Hat Event", "Click", "Download");
            }).fail(function(param) {
                add(param, function() {
                    callback("#statusMessages .close").click();
                }, function() {
                    callback("#statusMessages .close").click();
                }, "alert");
            });
        },
        onUpgradeClick: function(bei, agoi) {
            this.$upgradeModal.foundation("reveal", "open");
        },
        onLinkClick: function(evt) {
            evt.preventDefault(), window.open(get(callback(evt.target).data("href")));
        },
        setFontSize: function(fontSize) {
            callback(".gadget-content-wrapper").children().css("font-size", fontSize || "1em");
        },
        setUI: function() {
            this._ui = "owner";
        },
        toggleUI: function(c) {
            var settings = this, data = parse(c + "MenuTemplate");
            callback("#userMenu").empty().append(data).foundation(), "guest" === c && (callback("#login").click(save("/api/users/login", settings)), 
            callback("#register").click(save("/api/users", settings))), callback(".ui-option").addClass("hide").filter("." + c + "-option").removeClass("hide");
        },
        getUIType: function() {
            return this._ui;
        },
        getUserId: function() {
            return this._userId;
        },
        hasPermission: function() {
            var args = Array.prototype.slice.call(arguments);
            return l.hasPermission.apply(this, args);
        },
        hasRole: function() {
            var args = Array.prototype.slice.call(arguments);
            return l.hasRole.apply(this, args);
        },
        triggerChange: function() {
            callback(document).trigger("gadget.code.change"), this.trigger("gadget.code.change");
        },
        onLoginComplete: function(a, b, c, opt_d) {
            var self = this;
            if (b && "success" === b.status) {
                var nickname = callback(a + ' input[name="email"]').val();
                window.GadgetIO["import"]("debug.sessions").onLogin(nickname, b.data), this._ui = b.data.id === this._gadget._owner ? "owner" : "user", 
                this.toggleUI(this._ui), callback(document).trigger("gadget.account.success"), callback("body").append("<input id='roles' type='hidden' value='" + b.data.roles + "'>"), 
                "console" !== this.getType() && "guest" !== this.getUIType() && this._original && this._original.id && (callback(this).off("gadget.code.change"), 
                callback(this).on("gadget.code.change", _.debounce(function() {
                    callback(".save-it").removeClass("disabled"), self.updateDraft();
                }, 1e3)));
                var cfg = "create-" + this.getType() + "-gadget", url = this.hasPermission(cfg) ? !1 : !0;
                "owner" === this._ui ? (callback("a.create-remix").data("action", "code.save"), 
                callback("a.create-remix").attr("title", "Save changes."), callback("a.create-remix").find("i").removeClass().addClass("fa fa-save"), 
                callback("a.create-remix").find("label").html("Save")) : url || callback("a.create-remix").data("action", "library.add"), 
                url || (callback("a.create-copy").data("action", "library.add"), callback("a.save-remix").data("action", "library.add"), 
                callback("a.revert-remix").data("action", "library.add"));
            } else b && b.flash && b.flash.validation ? callback(a + " .message").addClass("error").text(b.flash.validation.email || b.flash.validation.password) : b && b.flash && b.flash.duplicates ? callback(a + " .message").addClass("error").text("This email is already registered; try logging in.") : b && b.message ? callback(a + " .message").addClass("error").text(b.message) : callback(a + " .message").addClass("error").text("We were unable to log you in; please try again later.");
        },
        updateSessionCache: function() {
            var self = this, value = self.getValue();
            if (value === self._original.code) try {
                window.sessionStorage && window.sessionStorage.removeItem(self.guid), q.remove(self.guid);
            } catch (c) {} else try {
                window.sessionStorage && window.sessionStorage.setItem(self.guid, value), q.set(self.guid, value, p);
            } catch (c) {}
        },
        updateDraft: function() {
            var _this = this;
            "BROADCASTING" !== window.GadgetAPI._receiverBroadcastState && _this.$draftMessage.fadeOut("fast", function() {
                _this.$draftMessage.text("Saving Draft").fadeIn("slow", function() {
                    _this._updateDraft();
                });
            });
        },
        _updateDraft: function() {
            var model, self = this, result = self.serialize(), error = "/api/gadgets/" + self._original.id + "/draft";
            model = {
                code: result.code,
                assets: result.assets,
                settings: result.settings
            }, callback.post(error, model).done(function(result) {
                result.success && (self._viewingDraft = !0, self.$draftMessage.fadeOut("slow", function() {
                    var result = parse("draftTextTemplate", {
                        draftText: "Draft Saved"
                    });
                    self.$draftMessage.html(result).fadeIn("slow");
                }));
            });
        },
        discardDraft: function(renderProductView) {
            var self = this, url = "/api/drafts/" + self._original.id;
            callback.ajax({
                url: url,
                method: "DELETE"
            }).done(function(result) {
                result.success && (JSON.stringify(self._gadget.settings) !== JSON.stringify(self._predraft.settings) && (self.discardDraftSettings(), 
                o.runtime("settingsModified", !1), self._original_draft && debug(self._predraft.settings || {}, !0)), 
                callback("#confirmDiscardModal").foundation("reveal", "close"), self._original = callback.extend(!0, {}, self._predraft), 
                callback(document).trigger("gadget.draft.discard"), callback(self).trigger("gadget.draft.discard"), 
                self.$draftMessage.fadeOut("fast", function() {
                    self.$draftMessage.empty(), self._viewingDraft = !1, callback(".save-it").addClass("disabled");
                })), renderProductView();
            });
        },
        discardDraftSettings: function() {},
        _viewingOriginal: function(state) {
            return void 0 !== state && (this._viewingOriginalFlag = !!state, state ? callback("body").addClass("viewing-original") : callback("body").removeClass("viewing-original")), 
            this._viewingOriginalFlag;
        },
        autoSave: function() {
            var model, self = this, result = self.serialize(), error = "/api/gadgets/" + self._original.id + "/autosave";
            self.$draftMessage.fadeOut("fast", function() {
                self.$draftMessage.text("Saving ...").fadeIn("slow", function() {
                    model = {
                        code: result.code,
                        assets: result.assets,
                        settings: result.settings
                    }, callback.post(error, model).done(function(result) {
                        result.success ? (self.$draftMessage.fadeOut("slow", function() {
                            self.$draftMessage.text("Saved").fadeIn("slow");
                        }), callback(self).trigger("gadget.code.autosave")) : self.$draftMessage.fadeOut("slow", function() {
                            self.$draftMessage.text("Error Saving").fadeIn("slow");
                        });
                    });
                });
            });
        },
        onSaveClick: function() {
            var startTime = Date.now();
            callback("body").addClass("saving");
            var fn = function() {
                var progress = Date.now() - startTime;
                return 750 > progress ? window.setTimeout(fn, 750 - progress) : void callback("body").removeClass("saving");
            };
            this._original && this._original.id ? this._viewingOriginal() ? this.restore(fn) : this._original.original ? this.save(void 0, fn) : this.remix(fn) : this.addToLibrary(fn);
        },
        keys: function() {
            return this._keys || (this._keys = {
                code: 1,
                assets: 1,
                settings: 1
            });
        },
        restore: function(fn) {
            var self = this, body = parse("restoreOriginalModalTemplate", {}), el = callback(body);
            remix = this._original, original = remix.original, callback("body").append(el), 
            el.foundation("reveal", "open"), el.on("close.fndtn.reveal", function() {
                fn();
            }), el.find(".button").click(function() {
                var i, data, name = callback(this).data("action"), r = {};
                if ("confirm" === name) {
                    el.off("close.fndtn.reveal");
                    for (i in self.keys()) r[i] = original[i], "code" === i && (data = JSON.parse(r[i]), 
                    data = data.map(function(row) {
                        return _.omit(row, "comments");
                    }), r[i] = JSON.stringify(data));
                    callback.extend(!0, remix, r), callback("#version-toggle").prop("checked", !0).change(), 
                    window.setTimeout(function() {
                        self.save(void 0, fn), self.updateSessionCache();
                    });
                } else fn();
                el.foundation("reveal", "close"), el.remove();
            });
        },
        remix: function(update) {
            var me = this;
            me._createCopy("Remix", function(o) {
                callback("body").addClass("has-remix"), o.original = me._original, me.setGadget(o, !0), 
                me.reset(o), "function" == typeof update && update();
            });
        },
        addToLibrary: function(recursive) {
            this._createCopy("Copy", function(f) {
                var m = parse("statusMessageTemplate", {
                    type: "success",
                    message: 'A copy of this gadget has been saved for you. View or edit <a class="text-link" href="/library/gadgets/' + f.shortCode + '" target="_blank">your copy here</a>.'
                }), p = callback(m);
                callback("body").addClass("has-status-bar").append(p), p.parent().foundation().trigger("open.fndtn.alert"), 
                recursive && "function" == typeof recursive && recursive(f);
            });
        },
        _createCopy: function(iterable, f) {
            var self = this, w = self.serialize({
                removeComments: !0
            }), h = {
                library: !0
            }, y = self._original && self._original.id, x = function(e) {
                self.$overlay.addClass("hide"), f && "function" == typeof f && f(e), callback(".save-it").addClass("disabled"), 
                self.$draftMessage.fadeOut("slow", function() {
                    self.$draftMessage.empty(), self._viewingDraft = !1;
                }), self.callAnalytics("Interaction", iterable, "Library"), o.runtime("usingSenseHat") && self.callAnalytics("Sense Hat Event", iterable, "Library");
            };
            callback("#statusMessages .close").click(), self.$overlay.removeClass("hide"), y && (w._origin_id = y), 
            "Remix" == iterable && (w._remix = !0), self._gadget.id ? self.fork(self._gadget, w, h, x) : self.create(w, h, x);
        },
        getGadget: function(opts, callback) {
            var self = this;
            return "function" == typeof opts && (callback = opts, opts = void 0), self.isModified() || !self._gadget.id ? self._gadget.id ? self.fork(self._gadget, self.serialize(), opts, callback) : self.create(self.serialize(), opts, callback) : setTimeout(function() {
                callback(self._gadget);
            });
        },
        setGadget: function(xhr, status) {
            status && (this._original = xhr), this._gadget = callback.extend(!0, {}, xhr);
        },
        isModified: function() {
            var value = this.getValue(), result = value !== (this._gadget.code || "") || this.settingsModified();
            return result;
        },
        settingsModified: function() {
            return o.runtime("settingsModified");
        },
        viewingDraft: function() {
            return this._viewingDraft;
        },
        getType: function() {
            throw new Error("getType is not implemented");
        },
        getValue: function() {
            throw new Error("getValue is not implemented");
        },
        getMainFile: function() {
            return "";
        },
        getShareType: function() {
            return callback("#shareType").val() || this.getType();
        },
        getTimeoutDelay: function() {
            return this.serversideTimeoutDelay;
        },
        serialize: function(dom) {
            return {
                code: this.getValue(dom)
            };
        },
        fork: function(world, data, options, fn) {
            var self = this, url = "/api/gadgets/" + world.id + "/forks";
            "function" == typeof options && (fn = options, options = void 0), options && options.library && (url += "?library=true"), 
            callback.post(url, data).done(function(msg) {
                self.setGadget(msg.data), callback("#emailToken").val(""), self.postSave().then(function() {
                    "function" == typeof fn && fn(self._gadget);
                });
            });
        },
        create: function(data, opts, cb) {
            var result = this, error = "/api/gadgets";
            "function" == typeof opts && (cb = opts, opts = void 0), opts && opts.library && (error += "?library=true"), 
            data.lang = this.getType(), callback.post(error, data).done(function(d) {
                result.setGadget(d.data), callback("#emailToken").val(""), result.postSave().then(function() {
                    "function" == typeof cb && cb(result._gadget);
                });
            });
        },
        save: function(options, success) {
            var self = this, t0 = new Date().getTime();
            options || (options = this.serialize()), self.$overlay.removeClass("hide"), callback.ajax({
                url: "/api/gadgets/" + self._original.id + "/code",
                data: JSON.stringify(options),
                type: "PUT",
                contentType: "application/json"
            }).done(function(tag) {
                callback(".save-it").addClass("disabled"), self.$draftMessage.fadeOut("slow", function() {
                    self.$draftMessage.empty(), self._viewingDraft = !1;
                });
                var t = new Date().getTime() - t0;
                for (var v in options) self._gadget[v] = options[v];
                self._original.original && (self._gadget.original = self._original.original), self._original = self._predraft = self._gadget, 
                setTimeout(function() {
                    self.$overlay.addClass("hide");
                }, Math.max(0, 500 - t)), "function" == typeof success && success(), self.postSave();
            }).fail(function(xhr, status, error) {
                "function" == typeof success && success({
                    responseText: xhr.responseText,
                    status: status,
                    error: error
                });
            });
        },
        onResetClick: function(a) {
            var _this = this;
            this.$resetModal.foundation("reveal", "close");
            var render = function() {
                _this.setGadget(_this._original), _this.reset(_this._gadget), callback(document).trigger("gadget.resetted");
            };
            this.viewingDraft() ? this.discardDraft(render) : render();
            try {
                window.sessionStorage && window.sessionStorage.removeItem(this.guid), q.remove(this.guid);
            } catch (d) {}
            callback(".file-name-error").length && callback(".file-name-error").find(".close").trigger("click");
        },
        reset: function(reason) {},
        clickReset: function() {
            callback(document).trigger("gadget.code.reset");
        },
        focus: function() {},
        onUpdateClick: function() {
            this.save(this.serialize());
        },
        onShareClick: function(evt) {
            var self = this, arr = [], padding = "";
            evt.isDefaultPrevented() || self.getGadget(function(node) {
                var out = self.getShareInfo(node), text = get(out.url);
                callback("#runOptionLink").data("gadget-shortCode", node.shortCode), callback("#runOptionLink").data("gadget-runMode", self.runMode), 
                callback("#displayOptionLink").data("gadget-shortCode", node.shortCode), callback("#displayOptionLink").data("gadget-runMode", self.runMode), 
                callback("#displayOptionLink").val() && arr.push(callback("#displayOptionLink").val() + "=true"), 
                callback("#runOptionLink").val() && arr.push("runOption=" + callback("#runOptionLink").val()), 
                self.runMode && arr.push("runMode=" + self.runMode), arr.length && (padding = "?" + arr.join("&")), 
                text = text.replace(node.shortCode, node.shortCode + padding), m && m.toolbox && m.toolbox("#addthis", {}, {
                    url: text
                }), self.$shareUrl.text(text), self.$shareModal.foundation("reveal", "open"), self.sendAnalytics("Navigation", {
                    action: "View Modal",
                    label: "share"
                }, {
                    name: "Snippet Modal Viewed",
                    modalType: "share"
                });
            });
        },
        onEmailClick: function(evt) {
            var self = this;
            evt.isDefaultPrevented() || self.getGadget(function(property) {
                var p = self.getShareInfo(property), qs = get(p.url);
                self.$shareUrl.text(qs), self.$emailModal.foundation("reveal", "open"), self.sendAnalytics("Navigation", {
                    action: "View Modal",
                    label: "email"
                }, {
                    name: "Snippet Modal Viewed",
                    modalType: "email"
                });
            });
        },
        getShareInfo: function(key) {
            return {
                url: "/" + this.getShareType() + "/" + this.getGadgetIdentifier(key)
            };
        },
        onShareFocus: function(a) {
            s.byId("shareUrl"), this.updateMetric("linkShares"), this.sendAnalytics("Shares", {
                action: "Focus",
                label: "link"
            }, {
                name: "Snippet Shared",
                shareType: "link"
            });
        },
        onEmbedClick: function(evt) {
            var result = this, ss = [], val = "";
            evt.isDefaultPrevented() || result.getGadget(function(data) {
                var out = result.getEmbedInfo(data), m = get(out.url), set = '<iframe src="' + m + '" width="100%" height="' + (out.height || 356) + '" frameborder="0" marginwidth="0" marginheight="0" allowfullscreen></iframe>';
                callback("#runOptionEmbed").data("gadget-shortCode", data.shortCode), callback("#runOptionEmbed").data("gadget-runMode", result.runMode), 
                callback("#displayOptionEmbed").data("gadget-shortCode", data.shortCode), callback("#displayOptionEmbed").data("gadget-runMode", result.runMode), 
                callback("#displayOptionEmbed").val() && ss.push(callback("#displayOptionEmbed").val() + "=true"), 
                callback("#runOptionEmbed").val() && ss.push("runOption=" + callback("#runOptionEmbed").val()), 
                callback("#autorunEmbedToggle").is(":checked") && ss.push("start=result"), result.runMode && ss.push("runMode=" + result.runMode), 
                ss.length && (val = "?" + ss.join("&")), set = set.replace(data.shortCode, data.shortCode + val), 
                result.$embedCode.text(set), result.$embedModal.foundation("reveal", "open"), result.sendAnalytics("Navigation", {
                    action: "View Modal",
                    label: "embed"
                }, {
                    name: "Snippet Modal Viewed",
                    modalType: "embed"
                });
            });
        },
        onGroupPostClick: function(a) {
            try {
                window.parent.groups.post(this.serialize());
            } catch (arg3) {
                console.log(arg3);
            }
        },
        onGroupSubmitClick: function(a) {
            try {
                window.parent.groups.submit(this.serialize());
            } catch (arg3) {
                console.log(arg3);
            }
        },
        getEmbedInfo: function(screen_name) {
            var p = "/" + this.getGadgetIdentifier(screen_name);
            return {
                url: "/embed/" + this.getType() + p,
                height: 356
            };
        },
        onEmbedFocus: function(a) {
            s.byId("embedCode"), this.updateMetric("embedShares"), this.sendAnalytics("Shares", {
                action: "Focus",
                label: "embed"
            }, {
                name: "Snippet Shared",
                shareType: "embed"
            });
        },
        updateMetric: function(a, b) {
            var typeahead = callback("body").data("no-metrics");
            if (a && !typeahead && this._gadget && this._gadget.id) {
                if (b) {
                    var hash = CryptoJS.MD5(b);
                    b = hash.toString(CryptoJS.enc.Hex);
                } else b = this._gadget.id;
                if (this._updates[a] || (this._updates[a] = {}), !this._updates[a][b]) {
                    this._updates[a][b] = !0;
                    var im = {};
                    im[a] = !0;
                }
            }
        },
        onLogoClick: function(event) {
            var ids = this;
            event.preventDefault(), ids.getGadget(function(id) {
                var request = ids.getShareInfo(id);
                ids.sendAnalytics("Navigation", {
                    action: "Click",
                    label: "Logo"
                }, {
                    name: "Snippet Logo Clicked"
                }), window.open(get(request.url));
            });
        },
        onGalleryClick: function(event) {
            event.preventDefault(), window.open(get("/gallery"));
        },
        onNotificationClick: function(event) {
            event.preventDefault();
            var a = this;
            this._notification_open ? callback("#notification-content").animate({
                "margin-top": "-100%"
            }, 400, function() {
                a._notification_open = !1;
            }) : callback("#notification-content").animate({
                "margin-top": 0
            }, 400, function() {
                a._notification_open = !0, a.sendAnalytics("Navigation", {
                    action: "Click",
                    label: "Notification"
                }, {
                    name: "Snippet Notification Clicked"
                });
            });
        },
        onSendEmailClick: function(event) {
            var self = this;
            if (event.preventDefault(), callback("#share-email").val() && callback("#share-yourname").val() && callback("#share-youremail").val()) callback(".close").click(), 
            callback("#sendEmail").attr("value", "Sending ..."), callback("#sendEmail").addClass("disabled"), 
            callback.post("/api/gadgets/" + self._gadget.id + "/email", {
                email: callback("#share-email").val(),
                name: callback("#share-yourname").val(),
                replyTo: callback("#share-youremail").val(),
                token: callback("#emailToken").val()
            }).done(function(param) {
                self.$emailModal.foundation("reveal", "close");
                var t = '<div data-alert class="alert-box success"> Your email was sent! Thanks for sharing! <a href="#" class="close">&times;</a></div>';
                callback("#flashMessage").show(), callback("#flashContent").html(t), callback(document).foundation("alert", "reflow"), 
                callback("#share-email").val(""), setTimeout(function() {
                    callback("#flashMessage .close").trigger("click");
                }, 3e3), self.sendAnalytics("Shares", {
                    action: "Send Email"
                }, {
                    name: "Snippet Email Sent"
                });
            }).fail(function(e, r, t) {
                self.$emailModal.foundation("reveal", "close");
                var msg = '<div data-alert class="alert-box warning"> There was a problem sending your email. Please try again later. <a href="#" class="close">&times;</a></div>';
                callback("#flashMessage").show(), callback("#flashContent").html(msg), callback(document).foundation("alert", "reflow");
            }).always(function() {
                callback("#sendEmail").attr("value", "Send"), callback("#sendEmail").removeClass("disabled");
            }); else {
                var new_value = '<div data-alert class="alert-box warning"> Please complete all fields to send your email. <a href="#" class="close">&times;</a></div>';
                callback("#emailAlert").show().html(new_value), callback(document).foundation("alert");
            }
        },
        onSocialShare: function($scope) {
            var name = $scope.data.service;
            this.sendAnalytics("Shares", {
                action: "Click Social",
                label: name
            }, {
                name: "Snippet Social Clicked",
                service: name
            });
        },
        getAnalyticsCategory: function() {
            return "Snippet";
        },
        sendInterfaceAnalytics: function(dom, options) {
            options || (options = {});
            var self = callback(dom), n = self.data("action") || options.action, data = self.data("data") || options.data, j = self.closest("[data-interface]").data("interface") || options["interface"], item = self.data("library-override") || !1, match = this.$responsiveIndicators.filter(function(callSite) {
                return "none" !== callback(this).css("display");
            }).data("size") || "", x = [ match, j, n.replace(/\./g, "-") ];
            data && x.push(data), x = x.join(" ").replace(/[a-zA-Z0-9](?:[^\s\-\._]*)/g, function(value) {
                return value.charAt(0).toUpperCase() + value.substr(1);
            }), this.sendAnalytics("Interface", {
                action: x,
                label: this.getGadgetIdentifier()
            }, item);
        },
        sendAnalytics: function(logger, options, cli) {
            var values, self = this, comp = self.getEmbedInfo(self._gadget), val = self._queryString && self._queryString.inLibrary;
            options = callback.extend({
                category: "Embedded " + self.getAnalyticsCategory() + " " + logger
            }, options, {
                data: {
                    page: comp.url
                }
            }), values = [ "send", "event", options.category, options.action ], options.label && values.push(options.label), 
            options.value && values.push(options.value), options.data && values.push(options.data), 
            window.ga && !self._queryString.snapshot && (!val || val && cli) && window.ga.apply(null, values);
        },
        callAnalytics: function(a, b, c) {
            this.sendAnalytics(a, {
                action: b,
                label: c
            });
        },
        logClientMetric: function(data) {
            try {
                data.lang = this.getType(), this._gadget && this._gadget.id && (data.gadgetId = this._gadget.id), 
                callback.post("/api/gadgets/clientmetric", data).done(function() {});
            } catch (b) {}
        },
        toggleOverlay: function(el) {
            callback(el).toggleClass("hide"), callback(el).hasClass("hide") ? (this.hasOverlay = !1, 
            this.onCloseOverlay()) : (this.hasOverlay = !0, this.onOpenOverlay());
        },
        closeOverlay: function(e) {
            callback(e).addClass("hide"), this.hasOverlay = !1;
        },
        closeAnyModal: function() {
            callback(".close-reveal-modal").is(":visible") && callback(".close-reveal-modal").click();
        },
        closeAnyMessage: function() {
            callback(".close").is(":visible") && callback(".close").click();
        },
        draggable: function(resetState) {
            var o = (callback("#dragbar").width(), callback("#editor")), self = this;
            callback(document).on("mousedown.dragbar", "#dragbar", function(e) {
                e.preventDefault();
                var width = callback(".gadget-content-wrapper").width();
                callback("#content-overlay").show(), self.dragging = !0;
                var target = callback("<div>", {
                    id: "ghostbar",
                    css: {
                        height: o.outerHeight(),
                        top: o.offset().top,
                        left: o.offset().left
                    }
                }).appendTo("body");
                callback(document).on("mousemove.dragbar", function(event) {
                    var position = event.pageX / width, val = (width - event.pageX) / width;
                    position >= .3 && val >= .25 && (target.css("left", event.pageX + 2), callback("#editor").css("width", event.pageX + 2), 
                    resetState && resetState());
                }), callback(document).one("mouseup.dragbar", function(event) {
                    callback("#content-overlay").hide(), self.dragging && (callback("#ghostbar").remove(), 
                    callback(document).off("mousemove.dragbar"), self.dragging = !1);
                });
            });
        },
        toggleAll: function() {},
        onOpenOverlay: function() {},
        onCloseOverlay: function() {},
        postSave: function() {
            function done() {
                return dfd.resolve();
            }
            var dfd = callback.Deferred(), self = this, tags = self._gadget.shortCode;
            return self.saveClientSnapshot() ? (self.captureAndSaveSnapshot(function(err) {
                return err ? void callback.post("/api/gadgets/" + tags + "/snapshot", {
                    snapshotData: err
                }).done(done) : done();
            }), dfd) : done();
        },
        saveClientSnapshot: function() {
            return !1;
        },
        isDirty: function() {
            return this._gadget ? !(this.getValue() === this._original.code) : !1;
        },
        destroy: function() {
            this._gadget = void 0;
        },
        getGadgetIdentifier: function(e) {
            return e || (e = this._gadget), e.shortCode ? e.shortCode : CryptoJS.MD5(e.code).toString(CryptoJS.enc.Hex);
        },
        getGadgetIdentifierOrNull: function() {
            var value = null;
            return this._gadget && (value = this._gadget.original ? this._gadget.original.shortCode : this._gadget.shortCode), 
            value;
        },
        logError: function(str) {},
        triggerRunModeChange: function() {
            callback(document).trigger("gadget.runMode.change", {
                runMode: this.runMode
            }), this.trigger("gadget.runMode.change", {
                runMode: this.runMode
            });
        },
        settingsChange: function(event) {
            var val, matrix = callback(event.target)[0].type;
            this._gadget.settings = callback.extend(!0, {}, this._gadget.settings), "checkbox" === matrix ? val = callback(event.target).is(":checked") : ("range" === matrix || "hidden" === matrix) && (val = callback(event.target).val()), 
            "undefined" != typeof val && (this._gadget.settings[event.target.id] = val, o.runtime("settingsModified", !0)), 
            callback(event.target).data("settings-action") && "function" == typeof this[callback(event.target).data("settings-action")] && this[callback(event.target).data("settings-action")](), 
            callback(event.target).data("skip-trigger") ? callback(event.target).removeData("skip-trigger") : this.triggerChange();
        },
        showOutput: function() {
            callback("#codeOutput").removeClass("hide"), callback("#editor").addClass("hide"), 
            this.closeOverlay("#modules"), callback("#instructionsContainer").addClass("hide"), 
            callback("#outputContainer").removeClass("hide"), callback("#codeOutputTab").addClass("active"), 
            callback("#instructionsTab").removeClass("active");
        },
        showInstructions: function() {
            callback("#codeOutput").removeClass("hide"), callback("#editor").addClass("hide"), 
            this.closeOverlay("#modules"), this.parsedInstructions || this.displayInstructions(), 
            callback("#outputContainer").addClass("hide"), callback("#blocklyCodeContainer").addClass("hide"), 
            callback("#instructionsContainer").removeClass("hide"), callback("#codeViewTab").removeClass("active"), 
            callback("#codeOutputTab").removeClass("active"), callback("#instructionsTab").addClass("active");
        },
        displayInstructions: function() {
            if ("undefined" != typeof _len1) {
                var self = this;
                self._gadget.description || "owner" !== self.getUIType() ? self.parsedInstructions = _len1(self._gadget.description) : self.parsedInstructions = parse("addInstructionsTemplate"), 
                callback("#instructionsOutput").html(self.parsedInstructions), callback("#instructionsActions").length && callback("#instructionsActions").removeClass("hide");
            }
        },
        onEditInstructionsClick: function() {
            var self = this;
            callback("#instructionsActions").addClass("hide"), callback("#instructionsToolbar").removeClass("hide"), 
            callback("#instructionsContainer").addClass("editor"), self.parsedInstructions = parse("editInstructionsTemplate"), 
            callback("#instructionsOutput").empty(), callback("#instructionsContainer").append(self.parsedInstructions);
            var h = callback("#instructionsContainer").height();
            c = ace.edit("embedded-instructions");
            var result = h - 65;
            callback("#embedded-instructions").height(result + "px"), c.resize(), c.$blockScrolling = 1 / 0, 
            c.setTheme("ace/theme/xcode"), c.getSession().setMode("ace/mode/markdown"), c.getSession().setUseSoftTabs(!0), 
            c.getSession().setTabSize(2), c.setShowPrintMargin(!1), null !== self._gadget.description && self._gadget.description.length && c.getSession().setValue(self._gadget.description, -1);
        },
        onCancelEditInstructionsClick: function() {
            var self = this;
            callback("#instructionsContainer").removeClass("editor"), callback("#instructionsToolbar").addClass("hide"), 
            callback("#instructionsActions").removeClass("hide"), c && c.destroy(), callback("#embedded-instructions").remove(), 
            self.displayInstructions();
        },
        onSaveInstructionsClick: function(a) {
            var self = this, body = c.getValue();
            self._gadget.description = body, callback("#instructionsContainer").removeClass("editor"), 
            callback("#instructionsToolbar").addClass("hide"), callback("#instructionsActions").removeClass("hide"), 
            c && c.destroy(), callback("#embedded-instructions").remove(), self.displayInstructions();
        }
    }, window.GadgetAPI), 
    window.GadgetApp = new initialize(window.gadgetObject, window.draftObject),
    window.parent) ;
}), function() {
    function init(type, scope) {
        var script = window.GadgetIO["import"]("utils.cache"), args = script.get("user-log"), result = document.cookie.match(/session=([^;]+);/);
        type = type || $("#requestedLogin").val(), scope = scope || $("#whoami").val(), 
        args || (args = {
            log: [],
            user: scope
        }), args.log.push({
            time: Date.now(),
            user: scope || "",
            requested: type || "",
            path: window.location.href,
            referrer: document.referrer,
            userAgent: navigator.userAgent,
            sesh: result ? result[1] : ""
        }), type && type !== scope || !type && scope && args.user !== scope, args.user = scope, 
        args.log.length > 10 && (args.log = args.log.slice(args.log.length - 10)), script.set("user-log", args);
    }
    window.GadgetIO["export"]("debug.sessions", {
        onLogin: function(username, data) {
            (username === data.username || username === data.email) && (username = data.username), 
            init(username, data.username);
        }
    }), $(function() {
        init();
    });
}(), function(win, dict) {
    "use strict";
    function load(id) {
        select(document.getElementById(id));
    }
    function parse(selector) {
        $("." + selector).click(function(e) {
            select($(e.target)[0]);
        });
    }
    function select(text) {
        if (document.selection) {
            var range = document.body.createTextRange();
            range.moveToElementText(text), range.select();
        } else if (win.getSelection) {
            var range = document.createRange();
            range.selectNodeContents(text), win.getSelection().removeAllRanges(), win.getSelection().addRange(range);
        }
    }
    dict["export"]("utils.selectText", {
        byId: load,
        byClass: parse
    });
}(window, window.GadgetIO), function(win, dict) {
    function test() {
        var anim2 = {
            autorunEmbed: {
                paramName: "start",
                paramValue: "result"
            },
            hideGeneratedCodeEmbed: {
                paramName: "hideGeneratedCode",
                paramValue: "true"
            },
            showInstructionsEmbed: {
                paramName: "showInstructions",
                paramValue: "true"
            },
            showInstructionsShare: {
                paramName: "showInstructions",
                paramValue: "true"
            }
        };
        $("input:checkbox.checkboxToggle").change(function(evt) {
            var d, e, f, g, h = $(evt.target), i = $(h).val(), j = evt.target.name, k = anim2[j].paramName, l = $("#" + i), m = l.text(), n = [], o = "";
            "shareUrl" === i ? (d = $("#displayOptionLink").data("gadget-shortCode"), e = new RegExp(d + ".*"), 
            f = "") : (d = $("#displayOptionEmbed").data("gadget-shortCode"), e = new RegExp(d + '[^"]*"'), 
            f = '"'), $(h).is(":checked") ? obj[k] = anim2[j].paramValue : obj[k] = "", obj.runMode = $(h).prev().data("gadget-runMode") || "";
            for (var prop in obj) obj[prop] && n.push(prop + "=" + obj[prop]);
            n.length && (o = "?" + n.join("&")), g = m.replace(e, d + o + f), l.text(g);
        }), $(":input.runOptions").change(function(event) {
            var d, e, f, g = $(event.target), h = $(g).data("type"), i = $(g).val(), j = $("#" + h), k = j.text(), l = $(g).data("gadget-shortCode"), m = [], n = "";
            "shareUrl" === h ? (d = new RegExp(l + ".*"), e = "") : (d = new RegExp(l + '[^"]*"'), 
            e = '"'), obj.runOption = i, obj.runMode = $(g).data("gadget-runMode") || "";
            for (var prop in obj) obj[prop] && m.push(prop + "=" + obj[prop]);
            m.length && (n = "?" + m.join("&")), f = k.replace(d, l + n + e), j.text(f), "shareUrl" === h && win.addthis && win.addthis.toolbox && win.addthis.toolbox("#addthis", {}, {
                url: f
            });
        }), $(":input.displayOptions").change(function(event) {
            var d, e, f, g = $(event.target), h = $(g).data("type"), i = $(g).val(), j = $("#" + h), k = j.text(), l = $(g).data("gadget-shortCode"), m = [], n = "";
            "shareUrl" === h ? (d = new RegExp(l + ".*"), e = "") : (d = new RegExp(l + '[^"]*"'), 
            e = '"'), obj.outputOnly = "", obj.toggleCode = "", i && "undefined" != typeof obj[i] && (obj[i] = "true"), 
            obj.runMode = $(g).data("gadget-runMode") || "";
            for (var prop in obj) obj[prop] && m.push(prop + "=" + obj[prop]);
            m.length && (n = "?" + m.join("&")), f = k.replace(d, l + n + e), j.text(f), "shareUrl" === h && win.addthis && win.addthis.toolbox && win.addthis.toolbox("#addthis", {}, {
                url: f
            });
        });
    }
    function clearBuffer() {
        obj = {
            outputOnly: "",
            toggleCode: "",
            runOption: "",
            start: "",
            runMode: "",
            hideGeneratedCode: "",
            showInstructions: ""
        };
    }
    var obj;
    clearBuffer(), dict["export"]("gadget.share", {
        init: test,
        resetParams: clearBuffer
    });
}(window, window.GadgetIO), function(dict) {
    function update() {
        if ("undefined" == typeof clients && $("#roles").length && $("#roles").val().length) try {
            var a = $("#roles").val().split("+"), b = a[0], c = a.slice(1).join("+"), d = CryptoJS.AES.decrypt(c, b);
            clients = JSON.parse(CryptoJS.enc.Utf8.stringify(d));
        } catch (c) {
            console.log("roles decrypt error:", c);
        }
    }
    function init(key, id, options) {
        update(), options = _.extend(options || {}), id || (id = "site"), options.id && (id = id + ":" + options.id);
        var config = _.find(clients, function(client) {
            return client.context === id;
        });
        return config && config.permissions.indexOf(key) >= 0 ? config.thru && config.thru[key] ? Array.isArray(config.thru[key]) ? _.some(config.thru[key], function(row) {
            return row instanceof Object ? _.some(_.values(row), function(type) {
                return moment().isBefore(type);
            }) : moment().isBefore(row);
        }) : moment().isBefore(config.thru[key]) : !0 : !1;
    }
    function get(key, id, options) {
        update(), options = _.extend(options || {}), id || (id = "site"), options.id && (id = id + ":" + options.id);
        var user = _.find(clients, function(client) {
            return client.context === id;
        });
        return user && user.roles.indexOf(key) >= 0 ? user.thru && user.thru[key] ? moment().isBefore(user.thru[key]) : !0 : !1;
    }
    function step() {
        var a = !1, self = this;
        return update(), clients && clients.forEach(function(obj) {
            /^group/.test(obj.context) && self.hasRole("group-member", obj.context) && (a = !0);
        }), a;
    }
    function find(id) {
        var client = {};
        return update(), clients && (client = _.find(clients, function(client) {
            return client.context === id;
        })), client;
    }
    var clients;
    dict["export"]("gadget.roles", {
        hasPermission: init,
        hasRole: get,
        inGroup: step,
        getByContext: find
    });
}(window.GadgetIO), function() {
    var a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z, Int, K, W, appendedMessageLength, _lengths, _m, _ref5, _ref6, str, id, state, REDOING_STATE, equal, fn = function(a, b) {
        return function() {
            return a.apply(b, arguments);
        };
    }, __slice = [].slice;
    a = jQuery, id = 0, state = 1, REDOING_STATE = 2, Int = 13, _ref5 = 9, x = 46, w = 8, 
    W = 37, _m = 39, _ref6 = 38, y = 40, K = 36, z = 35, _lengths = 33, appendedMessageLength = 34, 
    j = "jqconsole-", e = j + "cursor", f = j + "header", k = j + "prompt", l = k + "-text", 
    i = j + "old-prompt", g = j + "input", h = j + "old-input", d = j + "blurred", u = "keypress", 
    r = "<span/>", p = "<div/>", q = ":empty", str = "\n", o = ">>> ", n = "... ", m = 2, 
    c = j + "ansi-", s = "", t = /\[(\d*)(?:;(\d*))*m/, b = function() {
        function next() {
            this.stylize = fn(this.stylize, this), this._closeSpan = fn(this._closeSpan, this), 
            this._openSpan = fn(this._openSpan, this), this.getClasses = fn(this.getClasses, this), 
            this._style = fn(this._style, this), this._color = fn(this._color, this), this._remove = fn(this._remove, this), 
            this._append = fn(this._append, this), this.klasses = [];
        }
        return next.prototype.COLORS = [ "black", "red", "green", "yellow", "blue", "magenta", "cyan", "white" ], 
        next.prototype._append = function(prop) {
            return prop = "" + c + prop, -1 === this.klasses.indexOf(prop) ? this.klasses.push(prop) : void 0;
        }, next.prototype._remove = function() {
            var a, i, t, p, l, v;
            for (p = 1 <= arguments.length ? __slice.call(arguments, 0) : [], v = [], i = 0, 
            l = p.length; l > i; i++) t = p[i], "fonts" === t || "color" === t || "background-color" === t ? v.push(this.klasses = function() {
                var e, u, f, _results;
                for (f = this.klasses, _results = [], e = 0, u = f.length; u > e; e++) a = f[e], 
                a.indexOf(t) !== c.length && _results.push(a);
                return _results;
            }.call(this)) : (t = "" + c + t, v.push(this.klasses = function() {
                var i, l, src, x;
                for (src = this.klasses, x = [], i = 0, l = src.length; l > i; i++) a = src[i], 
                a !== t && x.push(a);
                return x;
            }.call(this)));
            return v;
        }, next.prototype._color = function(color) {
            return this.COLORS[color];
        }, next.prototype._style = function(yystate) {
            if ("" === yystate && (yystate = 0), yystate = parseInt(yystate), !isNaN(yystate)) switch (yystate) {
                case 0:
                return this.klasses = [];

                case 1:
                return this._append("bold");

                case 2:
                return this._append("lighter");

                case 3:
                return this._append("italic");

                case 4:
                return this._append("underline");

                case 5:
                return this._append("blink");

                case 6:
                return this._append("blink-rapid");

                case 8:
                return this._append("hidden");

                case 9:
                return this._append("line-through");

                case 10:
                return this._remove("fonts");

                case 11:
                case 12:
                case 13:
                case 14:
                case 15:
                case 16:
                case 17:
                case 18:
                case 19:
                return this._remove("fonts"), this._append("fonts-" + (yystate - 10));

                case 20:
                return this._append("fraktur");

                case 21:
                return this._remove("bold", "lighter");

                case 22:
                return this._remove("bold", "lighter");

                case 23:
                return this._remove("italic", "fraktur");

                case 24:
                return this._remove("underline");

                case 25:
                return this._remove("blink", "blink-rapid");

                case 28:
                return this._remove("hidden");

                case 29:
                return this._remove("line-through");

                case 30:
                case 31:
                case 32:
                case 33:
                case 34:
                case 35:
                case 36:
                case 37:
                return this._remove("color"), this._append("color-" + this._color(yystate - 30));

                case 39:
                return this._remove("color");

                case 40:
                case 41:
                case 42:
                case 43:
                case 44:
                case 45:
                case 46:
                case 47:
                return this._remove("background-color"), this._append("background-color-" + this._color(yystate - 40));

                case 49:
                return this._remove("background-color");

                case 51:
                return this._append("framed");

                case 53:
                return this._append("overline");

                case 54:
                return this._remove("framed");

                case 55:
                return this._remove("overline");
            }
        }, next.prototype.getClasses = function() {
            return this.klasses.join(" ");
        }, next.prototype._openSpan = function(indent) {
            return '<span class="' + this.getClasses() + '">' + indent;
        }, next.prototype._closeSpan = function(str) {
            return str + "</span>";
        }, next.prototype.stylize = function(str) {
            var c, m, i, n, x, v;
            for (str = this._openSpan(str), i = 0; (i = str.indexOf(s, i)) && -1 !== i; ) if (m = str.slice(i).match(t)) {
                for (v = m.slice(1), n = 0, x = v.length; x > n; n++) c = v[n], this._style(c);
                str = this._closeSpan(str.slice(0, i)) + this._openSpan(str.slice(i + 1 + m[0].length));
            } else i++;
            return this._closeSpan(str);
        }, next;
    }(), equal = function(a, b) {
        return '<span class="' + a + '">' + (b || "") + "</span>";
    }, v = function() {
        function init(el, sessionURL, config, context, element) {
            null == element && (element = !1), this._HideComposition = fn(this._HideComposition, this), 
            this._ShowComposition = fn(this._ShowComposition, this), this._UpdateComposition = fn(this._UpdateComposition, this), 
            this._EndComposition = fn(this._EndComposition, this), this._StartComposition = fn(this._StartComposition, this), 
            this._CheckComposition = fn(this._CheckComposition, this), this._ProcessMatch = fn(this._ProcessMatch, this), 
            this._HandleKey = fn(this._HandleKey, this), this._HandleChar = fn(this._HandleChar, this), 
            this.isMobile = !!navigator.userAgent.match(/iPhone|iPad|iPod|Android/i), this.isIos = !!navigator.userAgent.match(/iPhone|iPad|iPod/i), 
            this.isAndroid = !!navigator.userAgent.match(/Android/i), this.auto_focus = !element, 
            this.$window = a(window), this.header = sessionURL || "", this.prompt_label_main = "string" == typeof config ? config : o, 
            this.prompt_label_continue = context || n, this.indent_width = m, this.state = state, 
            this.input_queue = [], this.input_callback = null, this.multiline_callback = null, 
            this.history = [], this.history_index = 0, this.history_new = "", this.history_active = !1, 
            this.shortcuts = {}, this.$container = a("<div/>").appendTo(el), this.$container.css({
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                position: "absolute",
                overflow: "auto"
            }), this.$console = a('<pre class="jqconsole"/>').appendTo(this.$container), this.$console.css({
                margin: 0,
                position: "relative",
                "min-height": "100%",
                "box-sizing": "border-box",
                "-moz-box-sizing": "border-box",
                "-webkit-box-sizing": "border-box"
            }), this.$console_focused = !0, this.$input_container = a(p).appendTo(this.$container), 
            this.$input_container.css({
                position: "absolute",
                width: 1,
                height: 0,
                overflow: "hidden"
            }), this.$input_source = a(this.isAndroid ? "<input/>" : "<textarea/>"), this.$input_source.attr({
                wrap: "off",
                autocapitalize: "off",
                autocorrect: "off",
                spellcheck: "false",
                autocomplete: "off"
            }), this.$input_source.css({
                position: "absolute",
                width: 2
            }), this.$input_source.appendTo(this.$input_container), this.$composition = a(p), 
            this.$composition.addClass(j + "composition"), this.$composition.css({
                display: "inline",
                position: "relative"
            }), this.matchings = {
                openings: {},
                closings: {},
                clss: []
            }, this.ansi = new b(), this._InitPrompt(), this._SetupEvents(), this.Write(this.header, f), 
            a(el).data("jqconsole", this);
        }
        return init.prototype.ResetHistory = function() {
            return this.SetHistory([]);
        }, init.prototype.ResetShortcuts = function() {
            return this.shortcuts = {};
        }, init.prototype.ResetMatchings = function() {
            return this.matchings = {
                openings: {},
                closings: {},
                clss: []
            };
        }, init.prototype.Reset = function() {
            this.state !== state && this.ClearPromptText(!0), this.state = state, this.input_queue = [], 
            this.input_callback = null, this.multiline_callback = null, this.custom_control_key_handler = null, 
            this.custom_keypress_handler = null, this.ResetHistory(), this.ResetShortcuts(), 
            this.ResetMatchings(), this.$prompt.detach(), this.$input_container.detach(), this.$console.html(""), 
            this.$prompt.appendTo(this.$console), this.$input_container.appendTo(this.$container), 
            this.Write(this.header, f);
        }, init.prototype.GetHistory = function() {
            return this.history;
        }, init.prototype.SetHistory = function(indexes) {
            return this.history = indexes.slice(), this.history_index = this.history.length;
        }, init.prototype._CheckKeyCode = function(length) {
            if (length = isNaN(length) ? length.charCodeAt(0) : parseInt(length, 10), !(length > 0 && 256 > length) || isNaN(length)) throw new Error("Key code must be a number between 0 and 256 exclusive.");
            return length;
        }, init.prototype._LetterCaseHelper = function(index, show) {
            return show(index), index >= 65 && 90 >= index && show(index + 32), index >= 97 && 122 >= index ? show(index - 32) : void 0;
        }, init.prototype.RegisterShortcut = function(data, fn) {
            var string;
            if (data = this._CheckKeyCode(data), "function" != typeof fn) throw new Error("Callback must be a function, not " + fn + ".");
            string = function(data) {
                return function(s) {
                    return s in data.shortcuts || (data.shortcuts[s] = []), data.shortcuts[s].push(fn);
                };
            }(this), this._LetterCaseHelper(data, string);
        }, init.prototype.UnRegisterShortcut = function(re, fct) {
            var string;
            re = this._CheckKeyCode(re), string = function(data) {
                return function(s) {
                    return s in data.shortcuts ? fct ? data.shortcuts[s].splice(data.shortcuts[s].indexOf(fct), 1) : delete data.shortcuts[s] : void 0;
                };
            }(this), this._LetterCaseHelper(re, string);
        }, init.prototype.GetColumn = function() {
            var steps;
            return this.$prompt_right.detach(), this.$prompt_cursor.text(""), steps = this.$console.text().split(str), 
            this.$prompt_cursor.html("&nbsp;"), this.$prompt_cursor.after(this.$prompt_right), 
            steps[steps.length - 1].length;
        }, init.prototype.GetLine = function() {
            return this.$console.text().split(str).length - 1;
        }, init.prototype.ClearPromptText = function(visible) {
            if (this.state === state) throw new Error("ClearPromptText() is not allowed in output state.");
            this.$prompt_before.html(""), this.$prompt_after.html(""), this.$prompt_label.text(visible ? "" : this._SelectPromptLabel(!1)), 
            this.$prompt_left.text(""), this.$prompt_right.text("");
        }, init.prototype.GetPromptText = function(play) {
            var x, d, e, f, c;
            if (this.state === state) throw new Error("GetPromptText() is not allowed in output state.");
            return play ? (this.$prompt_cursor.text(""), c = this.$prompt.text(), this.$prompt_cursor.html("&nbsp;"), 
            c) : (f = function(n) {
                var values;
                return values = [], n.children().each(function() {
                    return values.push(a(this).children().last().text());
                }), values.join(str);
            }, d = f(this.$prompt_before), d && (d += str), e = this.$prompt_left.text() + this.$prompt_right.text(), 
            x = f(this.$prompt_after), x && (x = str + x), d + e + x);
        }, init.prototype.SetPromptText = function(time_stamp) {
            if (this.state === state) throw new Error("SetPromptText() is not allowed in output state.");
            this.ClearPromptText(!1), this._AppendPromptText(time_stamp), this._ScrollToEnd();
        }, init.prototype.SetPromptLabel = function(acw_open, openCallback) {
            this.prompt_label_main = acw_open, null != openCallback && (this.prompt_label_continue = openCallback);
        }, init.prototype.UpdatePromptLabel = function() {
            var h, i;
            return i = ">span+span>span:first-child", h = "." + k + i, this.$console.find(h).text(this.prompt_label_main);
        }, init.prototype.Write = function(str, level, y) {
            var choice;
            return null == y && (y = !0), y && (str = this.ansi.stylize(a(r).text(str).html())), 
            choice = a(r).html(str), null != level && choice.addClass(level), this.Append(choice);
        }, init.prototype.Append = function(statement) {
            var node;
            return node = a(statement).insertBefore(this.$prompt), this._ScrollToEnd(), this.$prompt_cursor.detach().insertAfter(this.$prompt_left), 
            node;
        }, init.prototype.Input = function(o) {
            var h, i, title, w;
            if (this.state === REDOING_STATE) title = this.input_callback, w = this.multiline_callback, 
            i = this.history_active, h = this.async_multiline, this.AbortPrompt(), this.input_queue.unshift(function(_this) {
                return function() {
                    return _this.Prompt(i, title, w, h);
                };
            }(this)); else if (this.state !== state) return void this.input_queue.push(function(_this) {
                return function() {
                    return _this.Input(o);
                };
            }(this));
            this.history_active = !1, this.input_callback = o, this.multiline_callback = null, 
            this.state = id, this.$prompt.attr("class", g), this.$prompt_label.text(this._SelectPromptLabel(!1)), 
            this.Focus(), this._ScrollToEnd();
        }, init.prototype.Prompt = function(a, b, c, d) {
            return this.state !== state ? void this.input_queue.push(function(context) {
                return function() {
                    return context.Prompt(a, b, c, d);
                };
            }(this)) : (this.history_active = a, this.input_callback = b, this.multiline_callback = c, 
            this.async_multiline = d, this.state = REDOING_STATE, this.$prompt.attr("class", k + " " + this.ansi.getClasses()), 
            this.$prompt_label.text(this._SelectPromptLabel(!1)), this.auto_focus && this.Focus(), 
            void this._ScrollToEnd());
        }, init.prototype.AbortPrompt = function() {
            var url;
            if (this.state === state) throw new Error("Cannot abort prompt when not in prompt or input state.");
            url = this.GetPromptText(!0), this.state === id ? 0 !== url.trim().length && this.Write(url + str, h) : this.Write(url + str, i), 
            this.ClearPromptText(!0), this.state = state, this.input_callback = this.multiline_callback = null, 
            this._CheckInputQueue();
        }, init.prototype.Focus = function() {
            this.IsDisabled() || this.$input_source.focus();
        }, init.prototype.SetIndentWidth = function(collision) {
            return this.indent_width = collision;
        }, init.prototype.GetIndentWidth = function() {
            return this.indent_width;
        }, init.prototype.RegisterMatching = function(a, b, c) {
            var temp;
            return temp = {
                opening_char: a,
                closing_char: b,
                cls: c
            }, this.matchings.clss.push(c), this.matchings.openings[a] = temp, this.matchings.closings[b] = temp;
        }, init.prototype.UnRegisterMatching = function(acw_open, openCallback) {
            var className;
            return className = this.matchings.openings[acw_open].cls, delete this.matchings.openings[acw_open], 
            delete this.matchings.closings[openCallback], this.matchings.clss.splice(this.matchings.clss.indexOf(className), 1);
        }, init.prototype.Dump = function() {
            var _ref2, value;
            return _ref2 = this.$console.find("." + f).nextUntil("." + k).addBack(), function() {
                var _k, _len2, _results;
                for (_results = [], _k = 0, _len2 = _ref2.length; _len2 > _k; _k++) value = _ref2[_k], 
                a(value).is("." + i) ? _results.push(a(value).text().replace(/^\s+/, ">>> ")) : _results.push(a(value).text());
                return _results;
            }().join("");
        }, init.prototype.GetState = function() {
            return this.state === id ? "input" : this.state === state ? "output" : "prompt";
        }, init.prototype.Disable = function() {
            return this.$input_source.attr("disabled", !0), this.$input_source.blur();
        }, init.prototype.Enable = function() {
            return this.$input_source.attr("disabled", !1);
        }, init.prototype.IsDisabled = function() {
            return Boolean(this.$input_source.attr("disabled"));
        }, init.prototype.MoveToStart = function(o) {
            this._MoveTo(o, !0);
        }, init.prototype.MoveToEnd = function(time_stamp) {
            this._MoveTo(time_stamp, !1);
        }, init.prototype.Clear = function() {
            var i;
            return i = this.state === id ? g : k, this.$console.find("." + f).nextUntil("." + i).addBack().text(""), 
            this.$prompt_cursor.detach(), this.$prompt_right.before(this.$prompt_cursor);
        }, init.prototype._CheckInputQueue = function() {
            return this.input_queue.length ? this.input_queue.shift()() : void 0;
        }, init.prototype._InitPrompt = function() {
            return this.$prompt = a(equal(g)).appendTo(this.$console), this.$prompt_before = a(r).appendTo(this.$prompt), 
            this.$prompt_current = a(r).appendTo(this.$prompt), this.$prompt_after = a(r).appendTo(this.$prompt), 
            this.$prompt_label = a(r).appendTo(this.$prompt_current), this.$prompt_left = a(r).appendTo(this.$prompt_current), 
            this.$prompt_right = a(r).appendTo(this.$prompt_current), this.$prompt_right.css({
                position: "relative"
            }), this.$prompt_left.addClass(l), this.$prompt_cursor = a(equal(e, "&nbsp;")), 
            this.$prompt_cursor.insertBefore(this.$prompt_right), this.$prompt_cursor.css({
                color: "transparent",
                display: "inline",
                zIndex: 0
            }), this.isMobile ? void 0 : this.$prompt_cursor.css("position", "absolute");
        }, init.prototype._SetupEvents = function() {
            return this.isMobile ? this.$console.click(function($this) {
                return function(event) {
                    return event.preventDefault(), $this.Focus();
                };
            }(this)) : this.$console.mouseup(function($this) {
                return function(event) {
                    var cb;
                    return 2 === event.which ? $this.Focus() : (cb = function() {
                        return window.getSelection().toString() ? void 0 : (event.preventDefault(), $this.Focus());
                    }, setTimeout(cb, 0));
                };
            }(this)), this.$input_source.focus(function(evt) {
                return function() {
                    var notify, execute;
                    return evt._ScrollToEnd(), evt.$console_focused = !0, evt.$console.removeClass(d), 
                    execute = function() {
                        return evt.$console_focused ? evt.$console.removeClass(d) : void 0;
                    }, setTimeout(execute, 100), notify = function() {
                        return evt.isIos && evt.$console_focused ? evt.$input_source.hide() : void 0;
                    }, setTimeout(notify, 500);
                };
            }(this)), this.$input_source.blur(function(c) {
                return function() {
                    var later;
                    return c.$console_focused = !1, c.isIos && c.$input_source.show(), later = function() {
                        return c.$console_focused ? void 0 : c.$console.addClass(d);
                    }, setTimeout(later, 100);
                };
            }(this)), this.$input_source.bind("paste", function(_this) {
                return function() {
                    var calc;
                    return calc = function() {
                        return _this.in_composition ? void 0 : (_this._AppendPromptText(_this.$input_source.val()), 
                        _this.$input_source.val(""), _this.Focus());
                    }, setTimeout(calc, 0);
                };
            }(this)), this.$input_source.keypress(this._HandleChar), this.$input_source.keydown(this._HandleKey), 
            this.$input_source.keydown(this._CheckComposition), this.$input_source.bind("compositionstart", this._StartComposition), 
            this.$input_source.bind("compositionend", function(contains) {
                return function(b) {
                    return setTimeout(function() {
                        return contains._EndComposition(b);
                    }, 0);
                };
            }(this)), this.isAndroid ? (this.$input_source.bind("input", this._StartComposition), 
            this.$input_source.bind("input", this._UpdateComposition)) : this.$input_source.bind("text", this._UpdateComposition);
        }, init.prototype.SetKeyPressHandler = function(collision) {
            return this.custom_keypress_handler = collision;
        }, init.prototype.SetControlKeyHandler = function(collision) {
            return this.custom_control_key_handler = collision;
        }, init.prototype._HandleChar = function(event) {
            var charCode;
            return this.state === state || event.metaKey || event.ctrlKey ? !0 : (charCode = event.which, 
            8 === charCode || 9 === charCode || 13 === charCode ? !1 : null != this.custom_keypress_handler && this.custom_keypress_handler.call(this, event) === !1 ? !1 : (this.$prompt_left.text(this.$prompt_left.text() + String.fromCharCode(charCode)), 
            this._ScrollToEnd(), !1));
        }, init.prototype._HandleKey = function(event) {
            var keyCode;
            if (this.state === state) return !0;
            if (keyCode = event.keyCode || event.which, setTimeout(a.proxy(this._CheckMatchings, this), 0), 
            null != this.custom_control_key_handler && this.custom_control_key_handler.call(this, event) === !1) return !1;
            if (event.altKey) return !0;
            if (event.ctrlKey || event.metaKey) return this._HandleCtrlShortcut(keyCode);
            if (event.shiftKey) {
                switch (keyCode) {
                    case Int:
                    this._HandleEnter(!0);
                    break;

                    case _ref5:
                    this._Unindent();
                    break;

                    case _ref6:
                    this._MoveUp();
                    break;

                    case y:
                    this._MoveDown();
                    break;

                    case _lengths:
                    this._ScrollPage("up");
                    break;

                    case appendedMessageLength:
                    this._ScrollPage("down");
                    break;

                    default:
                    return !0;
                }
                return !1;
            }
            switch (keyCode) {
                case Int:
                this._HandleEnter(!1);
                break;

                case _ref5:
                this._Indent();
                break;

                case x:
                this._Delete(!1);
                break;

                case w:
                this._Backspace(!1);
                break;

                case W:
                this._MoveLeft(!1);
                break;

                case _m:
                this._MoveRight(!1);
                break;

                case _ref6:
                this._HistoryPrevious();
                break;

                case y:
                this._HistoryNext();
                break;

                case K:
                this.MoveToStart(!1);
                break;

                case z:
                this.MoveToEnd(!1);
                break;

                case _lengths:
                this._ScrollPage("up");
                break;

                case appendedMessageLength:
                this._ScrollPage("down");
                break;

                default:
                return !0;
            }
            return !1;
        }, init.prototype._HandleCtrlShortcut = function(key) {
            var fn, index, length, model;
            switch (key) {
                case x:
                this._Delete(!0);
                break;

                case w:
                this._Backspace(!0);
                break;

                case W:
                this._MoveLeft(!0);
                break;

                case _m:
                this._MoveRight(!0);
                break;

                case _ref6:
                this._MoveUp();
                break;

                case y:
                this._MoveDown();
                break;

                case z:
                this.MoveToEnd(!0);
                break;

                case K:
                this.MoveToStart(!0);
                break;

                default:
                if (key in this.shortcuts) {
                    for (model = this.shortcuts[key], index = 0, length = model.length; length > index; index++) fn = model[index], 
                    fn.call(this);
                    return !1;
                }
                return !0;
            }
            return !1;
        }, init.prototype._HandleEnter = function(play) {
            var s, o;
            return this._EndComposition(), play ? this._InsertNewLine(!0) : (o = this.GetPromptText(), 
            s = function(self) {
                return function(code) {
                    var t, offset, options, w, h, i;
                    if (code !== !1) {
                        for (self.MoveToEnd(!0), self._InsertNewLine(!0), i = [], t = w = 0, h = Math.abs(code); h >= 0 ? h > w : w > h; t = h >= 0 ? ++w : --w) code > 0 ? i.push(self._Indent()) : i.push(self._Unindent());
                        return i;
                    }
                    return options = self.state === id ? "input" : "prompt", self.Write(self.GetPromptText(!0) + str, j + "old-" + options), 
                    self.ClearPromptText(!0), self.history_active && (self.history.length && self.history[self.history.length - 1] === o || self.history.push(o), 
                    self.history_index = self.history.length), self.state = state, offset = self.input_callback, 
                    self.input_callback = null, offset && offset(o), self._CheckInputQueue();
                };
            }(this), this.multiline_callback ? this.async_multiline ? this.multiline_callback(o, s) : s(this.multiline_callback(o)) : s(!1));
        }, init.prototype._GetDirectionals = function(length) {
            var c, d, e, r, g, h, v, w;
            return r = length ? this.$prompt_left : this.$prompt_right, c = length ? this.$prompt_right : this.$prompt_left, 
            e = length ? this.$prompt_before : this.$prompt_after, d = length ? this.$prompt_after : this.$prompt_before, 
            h = length ? a.proxy(this.MoveToStart, this) : a.proxy(this.MoveToEnd, this), g = length ? a.proxy(this._MoveLeft, this) : a.proxy(this._MoveRight, this), 
            w = length ? "last" : "first", v = length ? "prependTo" : "appendTo", {
                $prompt_which: r,
                $prompt_opposite: c,
                $prompt_relative: e,
                $prompt_rel_opposite: d,
                MoveToLimit: h,
                MoveDirection: g,
                which_end: w,
                where_append: v
            };
        }, init.prototype._VerticalMove = function(value) {
            var b, l, d, e, f, i, a, t;
            return a = this._GetDirectionals(value), d = a.$prompt_which, b = a.$prompt_opposite, 
            l = a.$prompt_relative, f = a.MoveToLimit, e = a.MoveDirection, l.is(q) ? void 0 : (i = this.$prompt_left.text().length, 
            f(), e(), t = d.text(), b.text(value ? t.slice(i) : t.slice(0, i)), d.text(value ? t.slice(0, i) : t.slice(i)));
        }, init.prototype._MoveUp = function() {
            return this._VerticalMove(!0);
        }, init.prototype._MoveDown = function() {
            return this._VerticalMove();
        }, init.prototype._HorizontalMove = function(parse, str) {
            var d, e, f, g, h, i, j, k, l, m, n, o, p, previous;
            if (k = this._GetDirectionals(str), h = k.$prompt_which, e = k.$prompt_opposite, 
            g = k.$prompt_relative, f = k.$prompt_rel_opposite, p = k.which_end, o = k.where_append, 
            l = str ? /\w*\W*$/ : /^\w*\W*/, m = h.text()) {
                if (parse) {
                    if (previous = m.match(l), !previous) return;
                    return previous = previous[0], n = e.text(), e.text(str ? previous + n : n + previous), 
                    j = previous.length, h.text(str ? m.slice(0, -j) : m.slice(j));
                }
                return n = e.text(), e.text(str ? m.slice(-1) + n : n + m[0]), h.text(str ? m.slice(0, -1) : m.slice(1));
            }
            return g.is(q) ? void 0 : (i = a(r)[o](f), i.append(a(r).text(this.$prompt_label.text())), 
            i.append(a(r).text(e.text())), d = g.children()[p]().detach(), this.$prompt_label.text(d.children().first().text()), 
            h.text(d.children().last().text()), e.text(""));
        }, init.prototype._MoveLeft = function(o) {
            return this._HorizontalMove(o, !0);
        }, init.prototype._MoveRight = function(time_stamp) {
            return this._HorizontalMove(time_stamp);
        }, init.prototype._MoveTo = function(remove, toRemove) {
            var o, l, t, w, v, e, _results;
            if (e = this._GetDirectionals(toRemove), t = e.$prompt_which, o = e.$prompt_opposite, 
            l = e.$prompt_relative, v = e.MoveToLimit, w = e.MoveDirection, remove) {
                for (_results = []; !l.is(q) || "" !== t.text(); ) v(!1), _results.push(w(!1));
                return _results;
            }
            return o.text(this.$prompt_left.text() + this.$prompt_right.text()), t.text("");
        }, init.prototype._Delete = function(play) {
            var d, t, res;
            if (t = this.$prompt_right.text()) {
                if (play) {
                    if (res = t.match(/^\w*\W*/), !res) return;
                    return res = res[0], this.$prompt_right.text(t.slice(res.length));
                }
                return this.$prompt_right.text(t.slice(1));
            }
            return this.$prompt_after.is(q) ? void 0 : (d = this.$prompt_after.children().first().detach(), 
            this.$prompt_right.text(d.children().last().text()));
        }, init.prototype._Backspace = function(play) {
            var e, text, color;
            if (setTimeout(a.proxy(this._ScrollToEnd, this), 0), text = this.$prompt_left.text()) {
                if (play) {
                    if (color = text.match(/\w*\W*$/), !color) return;
                    return color = color[0], this.$prompt_left.text(text.slice(0, -color.length));
                }
                return this.isAndroid ? (this.$input_source.val(text.slice(0, -1)), this.$composition.text(text.slice(0, -1))) : this.$prompt_left.text(text.slice(0, -1));
            }
            return this.$prompt_before.is(q) ? void 0 : (e = this.$prompt_before.children().last().detach(), 
            this.$prompt_label.text(e.children().first().text()), this.$prompt_left.text(e.children().last().text()));
        }, init.prototype._Indent = function() {
            var z;
            return this.$prompt_left.prepend(function() {
                var _k, _ref2, _results;
                for (_results = [], z = _k = 1, _ref2 = this.indent_width; _ref2 >= 1 ? _ref2 >= _k : _k >= _ref2; z = _ref2 >= 1 ? ++_k : --_k) _results.push(" ");
                return _results;
            }.call(this).join(""));
        }, init.prototype._Unindent = function() {
            var a, b, k, p, r;
            for (k = this.$prompt_left.text() + this.$prompt_right.text(), r = [], a = b = 1, 
            p = this.indent_width; (p >= 1 ? p >= b : b >= p) && /^ /.test(k); a = p >= 1 ? ++b : --b) this.$prompt_left.text() ? this.$prompt_left.text(this.$prompt_left.text().slice(1)) : this.$prompt_right.text(this.$prompt_right.text().slice(1)), 
            r.push(k = k.slice(1));
            return r;
        }, init.prototype._InsertNewLine = function(len) {
            var c, data, from;
            return null == len && (len = !1), from = this._SelectPromptLabel(!this.$prompt_before.is(q)), 
            c = a(r).appendTo(this.$prompt_before), c.append(a(r).text(from)), c.append(a(r).addClass(l).text(this.$prompt_left.text())), 
            this.$prompt_label.text(this._SelectPromptLabel(!0)), len && (data = this.$prompt_left.text().match(/^\s+/)) ? this.$prompt_left.text(data[0]) : this.$prompt_left.text(""), 
            this._ScrollToEnd();
        }, init.prototype._AppendPromptText = function(contentType) {
            var b, c, d, e, f, i;
            for (e = contentType.split(str), this.$prompt_left.text(this.$prompt_left.text() + e[0]), 
            f = e.slice(1), i = [], b = 0, c = f.length; c > b; b++) d = f[b], this._InsertNewLine(), 
            i.push(this.$prompt_left.text(d));
            return i;
        }, init.prototype._ScrollPage = function(play) {
            var scrollTop;
            return scrollTop = this.$container[0].scrollTop, "up" === play ? scrollTop -= this.$container.height() : scrollTop += this.$container.height(), 
            this.$container.stop().animate({
                scrollTop: scrollTop
            }, "fast");
        }, init.prototype._ScrollToEnd = function() {
            var offset;
            return this.$container.scrollTop(this.$container[0].scrollHeight), offset = this.$prompt_cursor.position(), 
            this.$input_container.css({
                left: offset.left,
                top: offset.top
            }), this.auto_focus ? setTimeout(this.ScrollWindowToPrompt.bind(this), 50) : void 0;
        }, init.prototype.ScrollWindowToPrompt = function() {
            var r, i, h, p, t, y;
            if (i = this.$prompt_cursor.height(), y = this.$window.scrollTop(), t = this.$window.scrollLeft(), 
            r = document.documentElement.clientHeight, p = this.$prompt_cursor.offset(), h = p.top - 2 * i, 
            this.isMobile && "undefined" != typeof orientation && null !== orientation) {
                if (y < p.top || y > p.top) return this.$window.scrollTop(h);
            } else {
                if (y + r < p.top) return this.$window.scrollTop(p.top - r + i);
                if (y > h) return this.$window.scrollTop(p.top);
            }
        }, init.prototype._SelectPromptLabel = function(remove) {
            return this.state === REDOING_STATE ? remove ? " \n" + this.prompt_label_continue : this.prompt_label_main : remove ? "\n " : " ";
        }, init.prototype._Wrap = function(sel, index, value) {
            var s, array;
            return array = sel.html(), s = array.slice(0, index) + equal(value, array[index]) + array.slice(index + 1), 
            sel.html(s);
        }, init.prototype._WalkCharacters = function(name, b, c, d, a) {
            var length, result, call;
            for (result = a ? name.length : 0, name = name.split(""), call = function() {
                var _k, _ref2, _ref3, _ref4;
                return a ? (_ref2 = name, name = 2 <= _ref2.length ? __slice.call(_ref2, 0, _k = _ref2.length - 1) : (_k = 0, 
                []), _ref4 = _ref2[_k++]) : (_ref3 = name, _ref4 = _ref3[0], name = 2 <= _ref3.length ? __slice.call(_ref3, 1) : []), 
                _ref4 && (result += a ? -1 : 1), _ref4;
            }; length = call(); ) if (length === b ? d++ : length === c && d--, 0 === d) return {
                index: result,
                current_count: d
            };
            return {
                index: -1,
                current_count: d
            };
        }, init.prototype._ProcessMatch = function(button, name, options) {
            var c, d, event, group, i, j, k, l, m, n, pane, data;
            return m = name ? [ button.closing_char, button.opening_char ] : [ button.opening_char, button.closing_char ], 
            group = m[0], l = m[1], n = this._GetDirectionals(name), event = n.$prompt_which, 
            d = n.$prompt_relative, i = 1, j = !1, data = event.html(), name || (data = data.slice(1)), 
            options && name && (data = data.slice(0, -1)), pane = this._WalkCharacters(data, group, l, i, name), 
            k = pane.index, i = pane.current_count, k > -1 ? (this._Wrap(event, k, button.cls), 
            j = !0) : (c = d.children(), c = name ? Array.prototype.reverse.call(c) : c, c.each(function(fn) {
                return function(last, item) {
                    var target, result;
                    return target = a(item).children().last(), data = target.html(), result = fn._WalkCharacters(data, group, l, i, name), 
                    k = result.index, i = result.current_count, k > -1 ? (name || k--, fn._Wrap(target, k, button.cls), 
                    j = !0, !1) : void 0;
                };
            }(this))), j;
        }, init.prototype._CheckMatchings = function(height) {
            var c, canvas, e, r, i, l, v;
            for (e = height ? this.$prompt_left.text().slice(this.$prompt_left.text().length - 1) : this.$prompt_right.text()[0], 
            v = this.matchings.clss, i = 0, l = v.length; l > i; i++) c = v[i], a("." + c, this.$console).contents().unwrap();
            if ((canvas = this.matchings.closings[e]) ? r = this._ProcessMatch(canvas, !0, height) : (canvas = this.matchings.openings[e]) ? r = this._ProcessMatch(canvas, !1, height) : height || this._CheckMatchings(!0), 
            height) {
                if (r) return this._Wrap(this.$prompt_left, this.$prompt_left.html().length - 1, canvas.cls);
            } else if (r) return this._Wrap(this.$prompt_right, 0, canvas.cls);
        }, init.prototype._HistoryPrevious = function() {
            return !this.history_active || this.history_index <= 0 ? void 0 : (this.history_index === this.history.length && (this.history_new = this.GetPromptText()), 
            this.SetPromptText(this.history[--this.history_index]));
        }, init.prototype._HistoryNext = function() {
            return !this.history_active || this.history_index >= this.history.length ? void 0 : this.history_index === this.history.length - 1 ? (this.history_index++, 
            this.SetPromptText(this.history_new)) : this.SetPromptText(this.history[++this.history_index]);
        }, init.prototype._CheckComposition = function(event) {
            var code;
            return code = event.keyCode || event.which, 229 === code ? this.in_composition ? this._UpdateComposition() : this._StartComposition() : void 0;
        }, init.prototype._StartComposition = function() {
            return this.in_composition ? void 0 : (this.in_composition = !0, this._ShowComposition(), 
            setTimeout(this._UpdateComposition, 0));
        }, init.prototype._EndComposition = function() {
            return this.in_composition ? (this._HideComposition(), this.$prompt_left.text(this.$prompt_left.text() + this.$composition.text()), 
            this.$composition.text(""), this.$input_source.val(""), this.in_composition = !1) : void 0;
        }, init.prototype._UpdateComposition = function(play) {
            var done;
            return done = function(_this) {
                return function() {
                    return _this.in_composition ? _this.$composition.text(_this.$input_source.val()) : void 0;
                };
            }(this), setTimeout(done, 0);
        }, init.prototype._ShowComposition = function() {
            return this.$composition.css("height", this.$prompt_cursor.height()), this.$composition.empty(), 
            this.$composition.appendTo(this.$prompt_left);
        }, init.prototype._HideComposition = function() {
            return this.$composition.detach();
        }, init;
    }(), a.fn.jqconsole = function(a, b, c, d) {
        return new v(this, a, b, c, d);
    }, a.fn.jqconsole.JQConsole = v, a.fn.jqconsole.Ansi = b;
}.call(this), function(win, doc) {
    "use strict";
    function init(wrapper, pos) {
        var d = Date.now();
        return [ "xxxxxxxx", "xxxx", "4xxx", "yxxx", "xxxxxxxxxxxx" ].join("string" == typeof wrapper ? wrapper : "-").substr(0, pos || 36).replace(/[xy]/g, function(c) {
            var a = (d + 16 * Math.random()) % 16 | 0;
            return d = Math.floor(d / 16), ("x" == c ? a : 3 & a | 8).toString(16);
        });
    }
    doc["export"]("utils.guid", init);
}(window, window.GadgetIO), $.widget("gadget.assetBrowser", {
    options: {
        assets: [],
        libraryUrl: [],
        uploadUrl: "",
        linkAddUrl: "",
        selectedClass: "selected",
        templateUrl: "",
        eventPrefix: "asset-browser",
        openClass: "open",
        assetsHowTo: "",
        guest: !0
    },
    _create: function() {
        var self = this;
        self._templates = {}, self._haveHidden = !1, self._showingHidden = !1, $.get(this.options.templateUrl).then(function(dir) {
            self._setUpView(dir);
        }), this._onAppEvent("view.addimage.show", $.proxy(self.openAddImageView, self)), 
        this._onAppEvent("view.upload.show", $.proxy(self.openUploadImageView, self)), this._onAppEvent("close", $.proxy(self.hide, self)), 
        this._onAppEvent("image.remove", $.proxy(self.removeImage, self)), this._onAppEvent("image.replace", $.proxy(self.replaceImage, self)), 
        this._onAppEvent("image.restore", $.proxy(self.restoreImage, self)), this._onAppEvent("view.hidden", $.proxy(self.viewHidden, self)), 
        this._dropzones = {}, $(this.element).on("click", "[data-event]", function(e) {
            var action = $(this).data("event"), data = $(this).closest("ul").data("image-id");
            self.element.trigger(self.options.eventPrefix + "." + action, [ data ]);
        }), this.options.guest && $(document).on("gadget.account.success", $.proxy(self.allowImageUpload, self));
    },
    _onAppEvent: function(message, origin, target) {
        $(target || this.element).on(this.options.eventPrefix + "." + message, origin);
    },
    _setUpView: function(a) {
        var node, self = this, from = $(a);
        from.find(".template[template-id]").each(function(i, el) {
            var id = $(el).attr("template-id");
            self._templates[id] = $(el).detach().removeClass("template").removeAttr("template-id"), 
            self.element.empty().append(from);
        }), this._addTemplateEvents(from), this.options.assetsHowTo && (node = $(this.options.assetsHowTo), 
        node.is("script") && (node = $(node.text())), this.element.find(".howto-message").append(node), 
        this.element.find(".howto-container").show(), this._onAppEvent("view.howto.show", $.proxy(self.openHowToView, self)), 
        $(document).foundation()), this._viewReady = !0, this._dropzoneReady = !1, this._refreshAssets();
    },
    _refreshAssets: function() {
        var that = this, li = that.element.find("#gadget-asset-list");
        this._viewReady && ($("#asset-list-wrapper").show(), 0 === this.options.assets.length ? li.hide() : (li.empty(), 
        li.show()), $.each(this.options.assets, function(index, file) {
            var content = that._templates.imageInfo.clone();
            that._initLibraryItem(content, file), li.append(content);
        }), that._sortList(li), $(document).foundation("reveal", "reflow"));
    },
    _initLibraryItem: function(element, data) {
        var o, self = this, r = "image-" + data.id;
        if (this._addTemplateEvents(element), element.find(".title").text(data.name), element.find(".thumbnail").attr("src", data.thumb || data.url), 
        element.data("asset-id", data.id), element.addClass("asset-id-" + data.id), element.find(".click-for-dropzone").attr("id", "item-dropzone-" + data.id), 
        o = element.find(".owner-controls"), data.isDemo) element.find(".demo").show(), 
        o.hide(); else if (o.attr("data-dropdown", r), o.next("ul").attr("id", r), o.next("ul").attr("data-image-id", data.id), 
        o.closest("li.asset").attr("id", "item-" + data.id), data.metrics && data.metrics.gadgets) {
            var className = "Image used in " + data.metrics.gadgets + " ";
            className += 1 === data.metrics.gadgets ? "gadget" : "gadgets", element.find(".thumbnail").after('<span class="gadget-stat"><div class="badge" title="' + className + '">' + data.metrics.gadgets + "</div></span>"), 
            o.closest("li.asset").attr("data-used", !0);
        }
        this._onAppEvent("assets.remove", function() {
            element.find(".controls").hide(), element.find(".confirm-controls").show();
        }, element), this._onAppEvent("assets.confirm", function() {
            $.each(self.options.assets, function(index, val) {
                return val.id === data.id ? (self.options.assets.splice(index, 1), self._refreshAssets(), 
                self.element.trigger("assets.change"), !1) : void 0;
            });
        }, element), this._onAppEvent("assets.cancel", function() {
            element.find(".confirm-controls").hide(), element.find(".controls").show();
        }, element), this._onAppEvent("assets.toggle", function() {
            element.hasClass(self.options.selectedClass) ? (element.removeClass(self.options.selectedClass), 
            $.each(self.options.assets, function(i, o) {
                return o.id === data.id ? (self.options.assets.splice(i, 1), self._refreshAssets(), 
                self.element.trigger("assets.change"), element.attr("data-used") || element.find(".if-not-used").removeClass("hide"), 
                !1) : void 0;
            })) : (element.addClass(self.options.selectedClass), self._addToAssets(data), element.find(".if-not-used").addClass("hide"));
        }, element);
    },
    _addTemplateEvents: function(editorHolder) {
        var that = this;
        return editorHolder.find("[events]").each(function(i, el) {
            var key, len, a, styles = $(el).attr("events").split(/\s*,\s*/);
            for ($(el).off(), len = styles.length; --len >= 0; ) a = !1, $(el).data("if-broadcasting") && "disable" === $(el).data("if-broadcasting") && (a = !0), 
            key = styles[len].split(/\s*:\s*/), $(el).on(key[0], function(result) {
                a && void 0 !== window.window.GadgetAPI._receiverBroadcastState && "OFF" !== window.GadgetAPI._receiverBroadcastState ? $(".broadcasting-assets-info").show().delay(5e3).fadeOut() : $(this).trigger(that.options.eventPrefix + "." + key[1], {
                    originalEvent: result
                });
            });
        }), editorHolder;
    },
    _initUpload: function() {
        var _self = this;
        _self._onAppEvent("view.upload.hide", $.proxy(_self.closeUploadImageView, _self)), 
        _self._dropzoneReady = !0;
    },
    _markSelected: function() {
        var i, plugin = this, map = {};
        for (i = 0; i < plugin.options.assets.length; i++) map[plugin.options.assets[i].id] = plugin.options.assets[i];
        this._templates.addImage.find(".asset").each(function(i) {
            var $this = $(this);
            $this.removeClass(plugin.options.selectedClass), map[$this.data("asset-id")] && $this.addClass(plugin.options.selectedClass);
        });
    },
    _addToAssets: function(o) {
        this.options.assets.push({
            url: o.url,
            name: o.name,
            id: o.id
        }), this.element.trigger("assets.change");
    },
    _addToLibrary: function(options, prefix) {
        var collection = this._templates.addImage, root = options.hidden ? collection.find("ul#hidden-asset-list") : collection.find("ul#my-asset-list"), element = this._templates.libraryImageInfo.clone();
        return options.hidden ? element.find(".if-hidden").removeClass("hide") : element.find(".if-not-hidden").removeClass("hide"), 
        options.metrics && options.metrics.gadgets && element.find(".if-not-used").addClass("hide"), 
        prefix = prefix || "", this._initLibraryItem(element, options), "top" === prefix ? (root.prepend(element), 
        element.addClass(this.options.selectedClass)) : root.append(element), options.hidden || element.addClass("clickable"), 
        $(document).foundation("dropdown", "reflow"), element;
    },
    _loadLibrary: function() {
        var that = this, child = this._templates.addImage, input = child.find("ul#my-asset-list");
        input.empty(), $("#loadingContents").show(), $.get(that.options.libraryUrl).then(function(data) {
            var idx, files = data.files || [];
            for (idx = 0; idx < files.length; idx++) that._addToLibrary(files[idx]), !that._haveHidden && files[idx].hidden && (that.element.find(".have-hidden").removeClass("hide"), 
            that._haveHidden = !0);
            $(document).foundation("dropdown", "reflow"), that._markSelected(), $("#loadingContent").hide();
        });
    },
    _showModal: function(element) {
        var _this = this;
        this._modal && (this._modal.hide(), this._modal.trigger("modal.hide")), $.contains(document, element[0]) || ($("#asset-viewer-contents").append(element), 
        element.trigger("modal.init"), element.find(".closer, .addimage-done").click(function() {
            _this._modal && (_this._modal.trigger("modal.hide"), _this._modal.hide(), _this._modal = void 0);
        })), this._modal = element, this._modal.show(), this._modal.trigger("modal.show");
    },
    assets: function(a) {
        if (void 0 !== a) {
            if (!Array.isArray(a)) throw new Error("gadget.codeEditor.assets expects an array, but got " + a);
            this.options.assets = a, this._refreshAssets();
        }
        return this.options.assets;
    },
    show: function() {
        this.element.addClass(this.options.openClass);
    },
    hide: function() {
        this.element.removeClass(this.options.openClass);
    },
    openUploadImageView: function() {
        var that = this;
        that.options.guest ? ($("#upload-guest").fadeIn(), $("#assetLogin").click(function(e) {
            that.element.trigger("gadget.account.login", [ "#assetAccount", {
                action: $(e.target).data("action")
            } ]);
        }), $("#assetCreateAccount").click(function(e) {
            that.element.trigger("gadget.account.create", [ "#assetAccount", {
                action: $(e.target).data("action")
            } ]);
        })) : $("#upload-assets").fadeIn(function() {
            that._dropzoneReady || that._initUpload();
        }), $(document).foundation("dropdown", "reflow");
    },
    closeUploadImageView: function() {
        $("#upload-assets").fadeOut({
            complete: function() {
                $(document).foundation("dropdown", "reflow");
            }
        });
    },
    openHowToView: function() {
        $("#howto-message").show();
    },
    allowImageUpload: function() {
        this.options.guest = !1, $("#upload-guest").hide(), this._loadLibrary(), this.openUploadImageView();
    },
    openLinkView: function() {
        this._showModal(this._templates.imageLink);
    },
    removeImage: function(child, action) {
        var n, e, that = this;
        $.ajax({
            url: "/api/users/assets/" + action,
            method: "DELETE"
        }).done(function(param) {
            n = that.element.find("#item-" + action), e = that.element.find("#hidden-asset-list"), 
            n.fadeOut({
                complete: function() {
                    e.append(n.detach()), that._sortList(e), that._haveHidden || that.element.find(".have-hidden").fadeIn(), 
                    n.find(".if-hidden").removeClass("hide"), n.find(".if-not-hidden").addClass("hide"), 
                    n.fadeIn();
                }
            });
        });
    },
    replaceImage: function($tag, name) {
        var self = this, select = self.element.find("#item-" + name), img = select.attr("data-used") || !1;
        self._dropzones[name] || (self._dropzones[name] = new Dropzone("#item-" + name, {
            url: "/api/users/assets/" + name,
            acceptedFiles: "image/jpeg,image/png,image/gif,image/jpg",
            dictDefaultMessage: "",
            clickable: "#item-dropzone-" + name,
            previewsContainer: ".hidden-previews",
            maxFiles: 1,
            init: function() {
                this.on("success", function(onSuccess, response) {
                    select.find(".title").text(response.file.name), select.find(".thumbnail").attr("src", response.file.url);
                    for (var a = 0; a < self.options.assets.length; a++) self.options.assets[a].id === name && (self.options.assets[a].url = response.file.url, 
                    self.options.assets[a].name = response.file.name);
                    self.element.trigger("assets.change"), $(document).foundation("dropdown", "reflow");
                }), this.on("maxfilesexceeded", function(name) {
                    try {
                        this.removeAllFiles();
                    } catch (b) {}
                    this.addFile(name);
                }), this.on("uploadprogress", function(e, percent, rowdata) {
                    if (!self.element.find("li#item-" + name).has(".upload-progress").length) {
                        var img = self.element.find(".upload-progress").clone();
                        self.element.find("li#item-" + name).find(".asset-container").append(img);
                    }
                    var modal = self.element.find("li#item-" + name).find(".upload-progress");
                    modal.removeClass("hide"), modal.find("span.meter").css("width", percent + "%"), 
                    modal.find("p.percent").text(Math.floor(percent) + "%"), 100 === percent && modal.fadeOut(3e3, function() {
                        modal.remove();
                    });
                });
            }
        })), img || this.element.find("#item-dropzone-" + name).trigger("click");
    },
    viewHidden: function() {
        var $span = this.element.find("#hidden-asset-list");
        $span.prev("a").fadeOut({
            complete: function() {
                $span.fadeIn();
            }
        });
    },
    restoreImage: function(image, action) {
        var $tip, that = this;
        $.post("/api/users/assets/restore", {
            fileId: action
        }).done(function(param) {
            $tip = that.element.find("#item-" + action), $libraryList = that.element.find("#my-asset-list"), 
            $tip.fadeOut({
                complete: function() {
                    $libraryList.append($tip.detach()), that._sortList($libraryList), $tip.find(".if-hidden").addClass("hide"), 
                    $tip.find(".if-not-hidden").removeClass("hide"), $tip.fadeIn(), $(document).foundation("dropdown", "reflow");
                }
            });
        });
    },
    _sortList: function(element) {
        var b = element.find("li.asset"), blocks = $(b, element).get();
        blocks.sort(function(a, b) {
            var bDate = $(a).text().toUpperCase(), aDate = $(b).text().toUpperCase();
            return aDate > bDate ? -1 : 1;
        }), $.each(blocks, function(i, node) {
            element.append(node);
        }), $(document).foundation("dropdown", "reflow");
    }
}), function(get, doc, def) {
    function add($parent, amount, value, object) {
        for (var n = 100; --n > 0 && $parent.height() - amount <= 0; ) value == object ? $parent.append("<div class='lineno lineselect _lineno_" + value + "_' role='presentation'>" + value + "</div>") : $parent.append("<div class='lineno _lineno_" + value + "_' role='presentation'>" + value + "</div>"), 
        value++;
        return value;
    }
    function init(appId, options) {
        var c = 1, container = get(appId), element = get('<textarea class="lined" autocorrect="off" autocapitalize="off" tabindex="0" role="textbox" aria-multiline="true" aria-label="Code Editor"></textarea>');
        container.append(element), element.attr("wrap", "off"), element.css({
            resize: "none"
        }), element.wrap("<div class='linedtextarea' role='tabpanel'></div>");
        var win = element.parent().wrap("<div class='linedwrap'></div>"), parent = win.parent();
        parent.prepend("<div class='lines' aria-hidden='true'></div>");
        var defs = parent.find(".lines");
        defs.append("<div class='codelines' data-filename='" + options.name + "' role='presentation'></div>");
        var a = defs.find(".codelines");
        if (c = add(a, defs.height(), 1, options.selectedLine), -1 != options.selectedLine && !isNaN(options.selectedLine)) {
            var i = parseInt(element.height() / (c - 2)), scrollTop = parseInt(i * options.selectedLine) - element.height() / 2;
            element[0].scrollTop = scrollTop;
        }
        var update = _.throttle(function(event) {
            var node = element[0], t = node.scrollTop, height = node.clientHeight;
            a.css({
                "margin-top": -1 * t + "px"
            }), c = add(a, t + height, c, options.selectedLine);
        }, 50);
        return element.scroll(update), options.onFocus && element.on("focus", options.onFocus), 
        options.value && element.val(options.value, -1), get(window).on("resize", update), 
        {
            registerPlugin: function(plugin, options) {},
            destroy: function() {
                parent.remove(), element.remove(), container.empty(), get(window).off("resize", update);
            },
            addCommand: function(a, b, c) {
                "undefined" == typeof pyc[a] && (pyc[a] = {
                    key: b,
                    fn: c
                });
                var forms = b.win.split("-");
                (2 === forms.length || 3 === forms.length) && element.keydown(function(event) {
                    var a = !1;
                    2 === forms.length ? pyp[forms[1]].keyCodes.indexOf(event.keyCode) >= 0 && event[pyp[forms[0]]] && (a = !0) : 3 === forms.length && pyp[forms[2]].keyCodes.indexOf(event.keyCode) >= 0 && event[pyp[forms[0]]] && event[pyp[forms[1]]] && (a = !0), 
                    a && c.call();
                });
            },
            change: function(trigger) {
                return element.on("input propertychange", trigger);
            },
            setValue: function(value) {
                element.val(value, -1);
            },
            getValue: function() {
                return element.val();
            },
            focus: function() {
                return element.focus();
            },
            blur: function() {
                return element.blur();
            },
            isFocused: function() {
                return element.is(":focus");
            },
            setModeFromName: function(a) {},
            resize: function() {},
            highlight: function(y) {
                get('.codelines[data-filename="' + options.name + '"]').find("._lineno_" + y + "_").addClass("lineselect"), 
                get("textarea.lined").addClass("attention-error");
            },
            addQueueMarkers: function() {}
        };
    }
    function next(call, callback, name, event) {
        var keys, i, ret = this.getSession().lineWidgets, firstRow = event.start.row, len = event.end.row - firstRow;
        if (0 !== len) if (keys = this.getSession().getLine(event.start.row), i = keys.length, 
        ret) {
            if ("remove" == event.action) {
                !event.start.column && data[name][event.start.row + 1] && firstRow--;
                var params = ret.splice(firstRow + 1, len), props = data[name].splice(firstRow + 1, len);
                params.forEach(function(rpc) {
                    rpc && this.removeLineWidget(rpc);
                }, this.getSession().widgetManager), props.forEach(function(a) {
                    a && (delete obj[a._commentId], callback({
                        _id: a._commentId,
                        index: a._file
                    }), this.removeGutterDecoration(a.row, "gadget-comment"), this.removeGutterDecoration(a.row, "data-" + a._file + "-" + a._commentId), 
                    options[a._commentId] ? this.removeGutterDecoration(a.row, "collapsed") : this.removeGutterDecoration(a.row, "open"));
                }, this.getSession());
            } else {
                i && i === event.start.column && firstRow++;
                var args = new Array(len);
                args.unshift(firstRow, 0), ret.splice.apply(ret, args), data[name].splice.apply(data[name], args);
            }
            var colliding = !0;
            data[name].forEach(function(evt, el) {
                evt && (colliding = !1, evt.row !== el && call(evt._file, evt._commentId, el, !0));
            }), colliding && (this.getSession().lineWidgets = null);
        } else {
            if ("remove" == event.action) {
                !event.start.column && data[name][event.start.row + 1] && firstRow--;
                var buf = data[name].splice(firstRow + 1, len);
                buf.forEach(function(b) {
                    b && (delete obj[b._commentId], callback({
                        _id: b._commentId,
                        index: b._file
                    }), this.removeGutterDecoration(b.row, "gadget-comment"), this.removeGutterDecoration(b.row, "data-" + b._file + "-" + b._commentId), 
                    options[b._commentId] ? this.removeGutterDecoration(b.row, "collapsed") : this.removeGutterDecoration(b.row, "open"));
                }, this.getSession());
            } else {
                i && i === event.start.column && firstRow++;
                var args = new Array(len);
                args.unshift(firstRow, 0), data[name].splice.apply(data[name], args);
            }
            data[name].forEach(function(evt, el) {
                evt && evt.row !== el && call(evt._file, evt._commentId, el, !0);
            });
        }
    }
    function bind(id, o) {
        function apply(alpha) {
            get(".comment-warning").find(".close").click(), get(id).append(n({
                message: alpha
            })), get(document).foundation("alert", "reflow");
        }
        function onMouseMove(e) {
            e.which >= 16 && e.which <= 20 || apply("Since one or more selected lines has a comment, first remove any comments or move them to other lines.");
        }
        function init(item) {
            var d, e, f = item.text, g = f.replace(/(?:\r\n|\r|\n)/g, "<br />"), h = moment(item.commentedOn).fromNow(), i = item.row, j = item._id, k = item.index, l = item.edited ? "(edited)" : "", m = options[j] = item.collapsed || !1;
            return e = o.editorOpts.canAddInlineComments && o.editorOpts.userId === item.userId ? "inlineCommentActions" : "inlineCommentDismiss", 
            d = cb(e, {
                commentId: j,
                index: k
            }), get.when(findById(item.userId)).done(function(info) {
                items[item.userId] = info;
                var content = cb("inlineCommentTemplate", {
                    comment: g,
                    avatar: info.avatar,
                    commentedOn: h,
                    username: info.username,
                    commentId: j,
                    edited: l,
                    commentText: f,
                    commentActions: d
                }), element = c.createElement("div");
                element.innerHTML = content;
                var v = {
                    row: i,
                    fixedWidth: !0,
                    el: element,
                    _file: k,
                    _commentId: j,
                    _text: f
                };
                v.destroy = function() {
                    s.widgetManager.removeLineWidget(v), data[k][i] = void 0;
                }, m || (v = node.session.widgetManager.addLineWidget(v)), obj[j] = v, data[k] || (data[k] = []), 
                data[k][i] = v, node.session.addGutterDecoration(i, "gadget-comment"), m ? node.session.addGutterDecoration(i, "collapsed") : node.session.addGutterDecoration(i, "open"), 
                node.session.addGutterDecoration(i, "data-" + k + "-" + j), get(v.el).find(".confirm-remove-comment").on("click", function(e) {
                    v.destroy();
                });
            });
        }
        var i = def.require("ace/ext/modelist"), j = i.getModeForPath("foo." + o.ext), l = def.require("ace/range").Range, idx = def.require("ace/line_widgets").LineWidgets, c = def.require("ace/lib/dom"), node = def.edit(id), attributes = [], parents = [], items = {};
        node.$blockScrolling = 1 / 0, node.setTheme("ace/theme/xcode"), node.getSession().setMode(j ? j.mode : "ace/mode/text"), 
        node.getSession().setUseSoftTabs(!0), node.getSession().setTabSize(2), node.setShowPrintMargin(!1), 
        node.setFontSize("inherit"), node._fileName = o.name, node._addErrorBorder = !1;
        var current = node.commands.byName.del, e = node.commands.byName.backspace, p = node.commands.byName.removeline;
        if (node.commands.addCommand({
            name: e.name,
            bindKey: e.bindKey,
            exec: function(parameters) {
                var pos = parameters.getSession().selection.getCursor();
                0 === pos.column && pos.row > 0 && data[o.index] && data[o.index][pos.row] && (data[o.index][pos.row - 1] || parameters.getSession().getLine(pos.row - 1).length) ? apply("Since this line has a comment, first remove the comment or move it to another line.") : (get(".comment-warning").find(".close").click(), 
                e.exec.call(this, parameters));
            }
        }), node.commands.addCommand({
            name: current.name,
            bindKey: current.bindKey,
            exec: function(parameters) {
                var pos = parameters.getSession().selection.getCursor(), lineLen = parameters.getSession().getLine(pos.row).length;
                pos.column === lineLen && data[o.index] ? data[o.index][pos.row] ? apply("Since this line has a comment, first remove the comment or move it to another line.") : data[o.index][pos.row + 1] && apply("Since the next line has a comment, first remove the comment or move it to another line.") : (get(".comment-warning").find(".close").click(), 
                current.exec.call(this, parameters));
            }
        }), node.commands.addCommand({
            name: p.name,
            bindKey: p.bindKey,
            exec: function(parameters) {
                var opts = parameters.getSession().selection.getCursor();
                data[o.index] && data[o.index][opts.row] ? apply("To remove lines with comments, first remove the comment or move it to another line.") : (get(".comment-warning").find(".close").click(), 
                p.exec.call(this, parameters));
            }
        }), node.getSession().selection.on("changeCursor", function() {
            get(".comment-warning").find(".close").click();
        }), node.getSession().selection.on("changeSelection", function(e) {
            if (data[o.index] && !node.getSession().selection.isEmpty() && node.getSession().selection.isMultiLine()) {
                var i, range = node.getSession().selection.getRange(), found = !1;
                for (i = range.start.row; i <= range.end.row; i++) data[o.index][i] && (found = !0);
                node.setReadOnly(found), found ? get(node.textInput.getElement()).data("keydown-handler") || (get(node.textInput.getElement()).on("keydown.gadget-comment", onMouseMove), 
                get(node.textInput.getElement()).data("keydown-handler", !0)) : (get(node.textInput.getElement()).data("keydown-handler") && (get(node.textInput.getElement()).off("keydown.gadget-comment", onMouseMove), 
                get(node.textInput.getElement()).removeData("keydown-handler")), get(".comment-warning").find(".close").click());
            } else node.setReadOnly(!1), get(node.textInput.getElement()).data("keydown-handler") && (get(node.textInput.getElement()).off("keydown.gadget-comment", onMouseMove), 
            get(node.textInput.getElement()).removeData("keydown-handler")), get(".comment-warning").find(".close").click();
        }), o.value && node.getSession().setValue(o.value), o.onFocus && node.on("focus", o.onFocus), 
        o.comments && o.comments.length) {
            var findById = function(id) {
                return items[id] ? get.Deferred().resolve(items[id]).promise() : get.get("/api/users/" + id + "/info");
            }, s = node.session;
            s.widgetManager || (s.widgetManager = new idx(s, {
                updateOnChange: next.bind(node, o.onCommentChange, o.onCommentRemove, o.index)
            }), s.widgetManager.attach(node));
            for (var reqs = (s.getDocument().getLength(), []), k = 0; k < o.comments.length; k++) reqs.push(init(o.comments[k]));
            get.when.apply(get, reqs).then(function() {
                trigger(s, o.index);
            });
        }
        return {
            registerPlugin: function(clone, obj) {
                clone.initialize(node, obj);
            },
            destroy: function() {
                node.destroy(), get(id).empty();
            },
            addCommand: function(a, b, c) {
                node.commands.addCommand({
                    name: a,
                    bindKey: b,
                    exec: c
                });
            },
            change: function(callback) {
                var _self = this;
                return node.getSession().on("change", function() {
                    _self.removeMarkers(), callback();
                });
            },
            setValue: function(value) {
                node.setValue(value, -1);
            },
            getValue: function() {
                return node.getValue();
            },
            focus: function(i) {
                return 0 === i ? node.navigateFileStart() : -1 === i && node.navigateFileEnd(), 
                node.focus();
            },
            blur: function() {
                node.blur();
            },
            isFocused: function() {
                return node.isFocused();
            },
            setModeFromName: function(t) {
                var g = i.getModeForPath(t), s = node._fileName;
                node._fileName = t, node._emit("file.rename", {
                    oldName: s,
                    newName: t
                }), node.getSession().setMode(g ? g.mode : "ace/mode/text");
            },
            resize: function(size) {
                node.resize(size);
            },
            highlight: function(i, elem) {
                var me = node.getSession().getLine(i - 1);
                if (elem) attributes.push(i), node._addErrorBorder = !0; else {
                    var range = new l(i - 1, 0, i - 1, me.length);
                    parents.push(node.getSession().addMarker(range, "highlight-line-error", "fullLine")), 
                    get(".ace_content").addClass("attention-error");
                }
            },
            addQueueMarkers: function() {
                for (var i = 0; i < attributes.length; i++) this.highlight(attributes[i]);
                attributes = [], node._addErrorBorder && (get(".ace_content").addClass("attention-error"), 
                node._addErrorBorder = !1);
            },
            removeMarkers: function() {
                for (var i = 0; i < parents.length; i++) node.getSession().removeMarker(parents[i]);
                parents = [], attributes = [];
            },
            getSession: function() {
                return node.getSession();
            },
            setReadOnly: function(readOnly) {
                node.setReadOnly(readOnly);
            },
            scrollToLine: function(a, b, c, d) {
                node.scrollToLine(a, b, c, d);
            },
            aceInstance: node,
            renderer: node.renderer,
            keyBinding: node.keyBinding,
            addCommentWidget: function() {
                var self, index, l, d, item, match, i = this.options.userId, h = "/api/users/" + i + "/avatar", len = get("#whoami").val(), name = o.index;
                return self = node.getCursorPosition(), (index = _.findKey(obj, function(o) {
                    return o.row === self.row && o._file === name;
                })) ? (options[index] && get("div.ace_gutter-cell.gadget-comment.data-" + name + "-" + index).trigger("click"), 
                void get("a.edit-inline-comment[data-comment-id='" + index + "']").trigger("click")) : (l = node.session, 
                l.widgetManager || (l.widgetManager = new idx(l, {
                    updateOnChange: next.bind(node, o.onCommentChange, o.onCommentRemove, name)
                }), l.widgetManager.attach(node)), node.scrollToLine(self.row, !0, !0), d = c.createElement("div"), 
                d.innerHTML = cb("addInlineCommentTemplate", {
                    avatar: h,
                    username: len,
                    commentId: name + "_" + self.row,
                    index: name
                }), item = {
                    row: self.row,
                    fixedWidth: !0,
                    el: d,
                    _file: name,
                    _commentId: name + "_" + self.row
                }, item.destroy = function() {
                    l.widgetManager.removeLineWidget(item), delete obj[item._commentId], trigger(l, item._file);
                }, item = l.widgetManager.addLineWidget(item), obj[item._commentId] = item, trigger(l, name), 
                match = get(item.el).find("textarea.inline-comment-text"), match.focus(), get(item.el).find(".cancel-inline-comment").on("click", function(e) {
                    item.destroy();
                }), void get(item.el).find(".save-inline-comment").on("click", function(e) {
                    var content = match.val(), j = content.replace(/(?:\r\n|\r|\n)/g, "<br />"), row = moment().subtract(2, "seconds"), _i = node._fileName + item.row + row, key = CryptoJS.MD5(_i).toString(CryptoJS.enc.Hex).substring(0, 16), _len = cb("inlineCommentActions", {
                        commentId: key,
                        index: name
                    }), _ref = cb("inlineCommentTemplate", {
                        comment: j,
                        avatar: h,
                        username: len,
                        commentedOn: row.fromNow(),
                        commentText: content,
                        commentActions: _len,
                        commentId: key
                    }), _results = c.createElement("div");
                    _results.innerHTML = _ref, get(document).foundation("dropdown", "reflow");
                    var d = {
                        row: item.row,
                        fixedWidth: !0,
                        el: _results,
                        _file: name,
                        _commentId: key,
                        _text: content
                    };
                    d.destroy = function() {
                        l.widgetManager.removeLineWidget(d), data[name][d.row] = void 0;
                    }, item.destroy(), d = node.session.widgetManager.addLineWidget(d), node.session.addGutterDecoration(d.row, "gadget-comment"), 
                    node.session.addGutterDecoration(d.row, "open"), node.session.addGutterDecoration(d.row, "data-" + name + "-" + key), 
                    obj[key] = d, options[key] = !1, data[name] || (data[name] = []), data[name][d.row] = d, 
                    trigger(l, name), get(id).trigger("comment.added", {
                        row: d.row,
                        text: content,
                        commentedOn: row,
                        _id: key,
                        fileName: node._fileName,
                        index: o.index,
                        userId: i,
                        edited: !1,
                        collapsed: !1
                    }), get(id).find(".confirm-remove-comment").on("click", function(e) {
                        d.destroy();
                    });
                }));
            }
        };
    }
    function val(chain, element) {
        var input = {
            value: element.value
        };
        return {
            registerPlugin: function(plugin, options) {},
            destroy: function() {},
            addCommand: function(a, b, c) {},
            change: function(value) {
                value();
            },
            setValue: function(value) {
                return input.value = value, value;
            },
            getValue: function() {
                return input.value;
            },
            focus: function() {},
            blur: function() {},
            isFocused: function() {
                return !1;
            },
            setModeFromName: function(a) {},
            resize: function() {},
            highlight: function(js) {},
            addQueueMarkers: function() {}
        };
    }
    function action(id, token) {
        var s, def = {
            value: token.value
        };
        return s = get("<img />", {
            src: token.value
        }), get(id).html(s), {
            registerPlugin: function(plugin, options) {},
            destroy: function() {},
            addCommand: function(a, b, c) {},
            change: function(callback) {
                callback();
            },
            setValue: function(value) {
                return def.value = value, value;
            },
            getValue: function() {
                return def.value;
            },
            focus: function() {},
            blur: function() {},
            isFocused: function() {
                return !1;
            },
            setModeFromName: function(a) {},
            resize: function() {},
            highlight: function(js) {},
            addQueueMarkers: function() {}
        };
    }
    function update(id, v, x, elapsed) {
        var a = obj[v], n = a.row, s = this._files[id].editor.getSession();
        s.removeGutterDecoration(n, "gadget-comment"), s.removeGutterDecoration(n, "data-" + id + "-" + v), 
        s.addGutterDecoration(x, "gadget-comment"), s.addGutterDecoration(x, "data-" + id + "-" + v), 
        options[v] ? (s.removeGutterDecoration(n, "collapsed"), s.addGutterDecoration(x, "collapsed")) : (s.removeGutterDecoration(n, "open"), 
        s.addGutterDecoration(x, "open")), elapsed ? a.row = x : (s.widgetManager.removeLineWidget(a), 
        a.row = x, s.widgetManager.addLineWidget(a), data[id] || (data[id] = []), data[id][n] = void 0, 
        data[id][x] = a), trigger(s, id), this._updateComment({
            _id: v,
            index: id,
            data: {
                row: x
            }
        });
    }
    function callback(r, g) {
        return _.findKey(obj, function(c) {
            return c._file === r && c.row === g;
        });
    }
    function trigger(el, name) {
        var len = el.getDocument().getLength();
        _.each(obj, function(data, key) {
            data._file === name && (!data.row || callback(data._file, data.row - 1) ? get(data.el).find(".move-comment-up").addClass("disabled") : get(data.el).find(".move-comment-up").removeClass("disabled"), 
            len - 1 === data.row || callback(data._file, data.row + 1) ? get(data.el).find(".move-comment-down").addClass("disabled") : get(data.el).find(".move-comment-down").removeClass("disabled"));
        });
    }
    var cb = doc["import"]("utils.template"), r = {}, obj = {}, options = {}, data = [], pyc = {}, pyp = {
        Enter: {
            keyCodes: [ 10, 13 ]
        },
        Ctrl: "ctrlKey",
        Shift: "shiftKey"
    }, pyn = get('<div class="code-editor" data-interface="code-editor"><div class="tab-nav"><dl class="left-options"><dd class="tab-button"><a class="tab-scroll-link left-arrow" data-direction="-1"><i class="fa fa-chevron-left"></i></a></dd><dd class="tab-button"><a class="tab-scroll-link right-arrow" data-direction="1"><i class="fa fa-chevron-right"></i></a></dd></dl><dl class="scrollable-content" role="tablist" aria-label="File tabs"></dl><dl class="right-options"></dl><div class="clearfix"></div></div><div class="file-content-container"></div><div class="info-area collapsed"><div class="info-quick"></div><div class="scroll-wrap"><div class="info-full"></div></div><a class="expander fa"></a></div></div>'), pxc = get('<div class="file-content"></div>'), pxp = get('<div class="binary-file"><div><p>This is a binary file created by your program. It is not viewable and will not be saved with your gadget.</p></div></div>'), pxn = get('<div class="tab-options" role="button"><ul><li><a class="file-remove-link menu-button" data-action="file.remove"><i class="fa fa-trash"></i></a></li><li><a class="file-rename-link menu-button" data-action="file.rename"><i class="fa fa-pencil"></i></a></li></ul></div>'), x = cb.compile('<dd class="tab"><a class="file-tab-link" aria-label="{{name}} tab" role="tab"><span class="file-name">{{name}}</span><span class="tab-options-link menu-button" data-action="file.options" role="button" tabindex="0"></span></a></dd>'), y = cb.compile('<input type="text" class="file-name-input" value="{{name}}" placeholder="file name" aria-label="Edit {{name}} filename">'), prog = cb.compile('<div data-alert class="file-name-error alert-box alert">{{message}}<a class="close">&times;</a></div>'), lastProg = cb.compile('<div data-alert class="file-remove-info alert-box info" data-interface="code-editor">The file "{{name}}" has been deleted.<a class="close menu-button" data-action="file-undo.close">&times;</a></div>'), n = cb.compile('<div data-alert class="comment-warning alert-box info">{{message}}<a class="close"><i class="fa fa-times-circle"></i></a></div>'), k00 = "click.gadget-code-editor.tab-select", k01 = "mousedown.gadget-code-editor.scroll-tabs-start touchstart.gadget-code-editor.scroll-tabs-start", k02 = "mouseup.gadget-code-editor.scroll-tabs-stop touchend.gadget-code-editor.scroll-tabs-stop", k10 = "click.gadget-code-editor.add-file", k11 = "click.gadget-code-editor.upload-file", k12 = "click.gadget-code-editor.view-assets", k20 = "click.gadget-code-editor.tab-options-open", k21 = "mousedown.gadget-code-editor.tab-options-close", k22 = "click.gadget-code-editor.edit-file-name", p00 = "click.gadget-code-editor.remove-file", p01 = "click.gadget-code-editor.hide-file", p02 = ".fa.fa-exclamation-circle.warning", p10 = "fa fa-exclamation-circle warning", p11 = get('<dd class="tab-button" title=\'New\'><a class="add-file-link menu-button" data-action="file.add" aria-label="Add new file" role="button"><i class="fa fa-plus"></i></a></dd>'), p12 = get('<dd class="tab-button" title=\'Add comment to current line\'><a class="add-inline-comment menu-button" data-action="inline-comment.add"><i class="fa fa-comment"></i></a></dd>'), p20 = "click.gadget-code-editor.add-inline-comment", p21 = get('<dd class="tab-button" title=\'Upload\'><a class="upload-file-link menu-button" data-action="file.upload" aria-label="Upload" role="button"><i class="fa fa-arrow-up"></i></a></dd><dd class="tab-button" title=\'Download all\'><a class="menu-button" data-action="mode.download" aria-label="Download all" role="button"><i class="fa fa-arrow-down"></i></a></dd>'), p22 = get("<form id='file-upload-form'><input type='file' name='file-upload' id='file-upload' class='hidden' tabindex='-1'></form>"), k24 = {
        options: {
            selectedLine: -1,
            selectedClass: "lineselect",
            noEditor: !1,
            state: "",
            defaultFileExt: "txt",
            mainFileName: "main.py",
            mainEditable: !1,
            mainSuffix: null,
            showTabs: false,
            addFiles: false,
            showInfo: !1,
            assets: !1,
            assetsHowTo: "",
            onFocus: function() {},
            lang: "",
            owner: !1,
            canHideTabs: !1,
            canAddInlineComments: !1,
            userId: null,
            disableAceEditor: !1
        },
        _create: function() {
            var self = this;
            def ? def.require("ace/line_widgets").LineWidgets : function() {};
            this._editor, this._commands = [], this._plugins = [], this._files = [], this.element.empty(), 
            this.element.append(pyn.clone()), this.options.addFiles && (this.element.find("dl.right-options").append(p11), 
            window.FileReader && (this.element.find("dl.right-options").append(p21), this.element.append(p22), 
            get("#file-upload").change(function() {
                var file = get("#file-upload")[0].files[0];
                if (!file.type || file.type.match(/text.*/)) {
                    var reader = new FileReader();
                    reader.onload = function() {
                        self.addFile({
                            name: file.name,
                            content: reader.result
                        }, {
                            override: !0
                        }), self._onChange && self._onChange(), self._selectTab(self._files.length - 1), 
                        get("#file-upload-form").get(0).reset();
                    }, reader.onerror = function() {
                        self.element.find(".tab-nav").after(prog({
                            message: "There was a problem reading your file. Please try again."
                        })), get(document).foundation("alert", "reflow"), get("#file-upload-form").get(0).reset();
                    }, reader.readAsText(file);
                } else self.element.find(".tab-nav").after(prog({
                    message: "Only text files are currently supported."
                })), get(document).foundation("alert", "reflow");
            }))), this.options.canAddInlineComments && this.element.find("dl.right-options").append(p12), 
            this.$tabOptions = pxn.clone(), this.options.canHideTabs && this.$tabOptions.find("ul").append('<li><a class="file-hide-link menu-button" data-action="file.hide" title="toggle tab visibility"><i class="fa fa-eye"></i></a></li>'), 
            get("body").append(this.$tabOptions), this.$tabBar = this.element.find(".scrollable-content"), 
            this.$tabBar.on(k00, ".tab", function(e) {
                if (!get(this).hasClass("active")) {
                    var i = get(this).index();
                    return self._files[i].editor.addQueueMarkers(), self._selectTab(i);
                }
            }), this.$contentWrapper = this.element.find(".file-content-container"), this.element.find(".tab-scroll-link").on(k01, function() {
                self._scrollTabBar(get(this).data("direction"));
            }), this.element.find(".add-file-link").parent().on(k10, function() {
                "BROADCASTING" != window.GadgetAPI._receiverBroadcastState && (self.addFile(""), 
                self._selectTab(self.$tabBar.children().length - 1, !0), self._editFileName());
            }), this.element.find(".upload-file-link").parent().on(k11, function() {
                "BROADCASTING" != window.GadgetAPI._receiverBroadcastState && get("#file-upload").trigger("click");
            }), this.element.find(".add-inline-comment").parent().on(p20, function() {
                self._addCommentWidget();
            }), this.element.on(k20, ".tab-options-link", function(e) {
                if (self.$tabOptions.hasClass("open")) self._closeOptionsMenu(); else {
                    var i = get(this).closest(".tab");
                    get(i).hasClass("main-editable") ? (self.$tabOptions.find(".file-remove-link").hide(), 
                    self.options.canHideTabs && self.$tabOptions.find(".file-hide-link").hide()) : get(i).data("binary") ? (self.$tabOptions.find(".file-rename-link").hide(), 
                    self.options.canHideTabs && self.$tabOptions.find(".file-hide-link").hide()) : (self.$tabOptions.find(".file-remove-link").show(), 
                    self.options.canHideTabs && self.$tabOptions.find(".file-hide-link").show());
                    var offset = get(this).offset();
                    self.$tabOptions.css("left", offset.left - 10 + "px"), self.$tabOptions.css("top", offset.top + get(this).height() + 10 + "px"), 
                    self.$tabOptions.addClass("open"), self.element.on(k21, function(event) {
                        get(event.target).hasClass("tab-options-link") || self._closeOptionsMenu();
                    });
                }
            }), this.$tabOptions.find(".file-rename-link").on(k22, function() {
                self._closeOptionsMenu(), "BROADCASTING" != window.GadgetAPI._receiverBroadcastState && (get(".file-name-input").length || self._editFileName());
            }), this.$tabOptions.find(".file-remove-link").on(p00, function() {
                self._closeOptionsMenu(), "BROADCASTING" != window.GadgetAPI._receiverBroadcastState && self._removeFile({
                    undo: !0
                });
            }), this.$tabOptions.find(".file-hide-link").on(p01, function() {
                self._closeOptionsMenu(), self._toggleFile();
            }), this.options.assets && (this.$assetBrowser = get('<div class="file-content fixed-right"></div>').assetBrowser({
                modalParent: ".gadget-content-wrapper",
                libraryUrl: "/api/users/assets?type=image",
                assets: this.options.assets,
                openClass: "active",
                assetsHowTo: this.options.assetsHowTo,
                guest: this.options.guest
            }), this.assetBrowser = this.$assetBrowser.data("gadget-assetBrowser"), this.assetBrowser.hide(), 
            this.element.find(".tab-nav").addClass("allow-assets"), this.$contentWrapper.append(this.$assetBrowser), 
            this.element.find(".add-asset-link").parent().on(k12, function() {
                var item = get(this);
                item.hasClass("active") || (self._selectTab(-1, !0), item.addClass("active"), self.assetBrowser.show());
            })), this.options.showTabs || self.element.addClass("tabless"), this.options.showInfo && self.element.addClass("with-info"), 
            this.options.state && this._loadState(this.options.state), get(document).on("SkfileWrite", function(e) {
                var i, d, m, key, k, options, n;
                for (d = e.originalEvent.data.split(":"), m = d[0], key = d.slice(1).join(":"), 
                i = 0; i < self._files.length; i++) self._files[i].name === m && (k = self._files[i].editor.getValue(), 
                options = k.length ? k + key : key, get('textarea[name="' + self._files[i].name + '"]').val(options), 
                self.$contentWrapper.children().eq(i).hasClass("active") ? self._files[i].editor.setValue(options) : (self._files[i].editor.destroy(), 
                n = pxc.clone(), self._files[i].editor = bind(n[0], {
                    onFocus: function() {},
                    ext: self._files[i].name.split(".").pop() || self.options.defaultFileExt,
                    index: i
                }), self._files[i].editor.setValue(options), self.$contentWrapper.children().eq(i).replaceWith(n)));
            }), get(document).on("SkfileOpen", function(e) {
                var index, input, option, id = e.originalEvent.data.split(":"), i = id[0], key = id.slice(1).join(":"), obj = {};
                self._files.map(function(u, i) {
                    obj[u.name] = i;
                }), "undefined" == typeof obj[key] ? (self.addFile({
                    name: key
                }), "w" === i && (input = get("<textarea>", {
                    id: key,
                    name: key
                }), input.val("\n"), get("body").append(input))) : "w" === i && (index = obj[key], 
                get('textarea[name="' + self._files[index].name + '"]').val("\n"), self.$contentWrapper.children().eq(index).hasClass("active") ? self._files[index].editor.setValue("") : (self._files[index].editor.destroy(), 
                option = pxc.clone(), self._files[index].editor = bind(option[0], {
                    onFocus: function() {},
                    ext: self._files[index].name.split(".").pop() || self.options.defaultFileExt,
                    index: index
                }), self.$contentWrapper.children().eq(index).replaceWith(option)));
            }), get(document).on("comment.added", ".file-content", function(e, data) {
                self._addComment(data);
            }), get(document).on("click", ".edit-inline-comment", function(e) {
                var key = get(this).data("comment-id"), val = obj[key]._text;
                get("#comment-container-" + key).addClass("hide"), get("#edit-comment-container-" + key).removeClass("hide"), 
                get("textarea#edit-inline-comment-" + key).val(val), get("a[data-dropdown='comment-actions-" + key + "']").addClass("hide"), 
                get("#update-comment-container-" + key).removeClass("hide");
            }), get(document).on("click", ".cancel-update-comment", function(e) {
                var input = get(this).data("comment-id");
                get("a[data-dropdown='comment-actions-" + input + "']").removeClass("hide"), get("#update-comment-container-" + input).addClass("hide"), 
                get("#comment-container-" + input).removeClass("hide"), get("#edit-comment-container-" + input).addClass("hide");
            }), get(document).on("click", ".update-comment", function(e) {
                var key = get(this).data("comment-id"), node = get(this).data("file-index"), val = get("textarea#edit-inline-comment-" + key).val(), text = val.replace(/(?:\r\n|\r|\n)/g, "<br />");
                obj[key]._text = val, get("#comment-container-" + key).html(text), get("a[data-dropdown='comment-actions-" + key + "']").removeClass("hide"), 
                get("#update-comment-container-" + key).addClass("hide"), get("#comment-container-" + key).removeClass("hide"), 
                get("#edit-comment-container-" + key).addClass("hide"), self._updateComment({
                    _id: key,
                    index: node,
                    data: {
                        text: val,
                        edited: !0
                    }
                });
            }), get(document).on("click", ".confirm-remove-inline-comment", function(e) {
                var input = get(this).data("comment-id");
                get("a[data-dropdown='comment-actions-" + input + "']").addClass("hide"), get("#confirm-remove-comment-container-" + input).removeClass("hide");
            }), get(document).on("click", ".cancel-remove-comment", function(e) {
                var input = get(this).data("comment-id");
                get("a[data-dropdown='comment-actions-" + input + "']").removeClass("hide"), get("#confirm-remove-comment-container-" + input).addClass("hide");
            }), get(document).on("click", ".confirm-remove-comment", function(e) {
                var i = get(this).data("comment-id"), key = get(this).data("file-index"), val = obj[i];
                self._files[key].editor.getSession().removeGutterDecoration(val.row, "gadget-comment"), 
                self._files[key].editor.getSession().removeGutterDecoration(val.row, "data-" + key + "-" + i), 
                options[i] ? self._files[key].editor.getSession().removeGutterDecoration(val.row, "collapsed") : self._files[key].editor.getSession().removeGutterDecoration(val.row, "open"), 
                obj[i].destroy(), delete obj[i], data[key][val.row] = void 0, trigger(self._files[key].editor.getSession(), key), 
                self._removeComment({
                    _id: i,
                    index: key
                });
            }), get(document).on("click", ".ace_gutter-cell.gadget-comment", function(e) {
                var t, v, c, b, x, i = get(e.target).attr("class").split(" ");
                t = _.find(i, function(x) {
                    return /^data/.test(x);
                }), v = t.split("-"), c = v[1], b = v[2], x = obj[b];
                var s = self._files[c].editor.getSession();
                options[b] ? (s.widgetManager.addLineWidget(obj[b]), options[b] = !1, s.removeGutterDecoration(x.row, "collapsed"), 
                s.addGutterDecoration(x.row, "open")) : (s.widgetManager.removeLineWidget(obj[b]), 
                options[b] = !0, s.removeGutterDecoration(x.row, "open"), s.addGutterDecoration(x.row, "collapsed")), 
                self._updateComment({
                    _id: b,
                    index: c,
                    data: {
                        collapsed: options[b]
                    }
                });
            }), get(document).on("click", ".comment-actions.comment-dismiss", function(e) {
                var i = get(this).data("comment-id"), key = get(this).data("file-index"), val = obj[i];
                self._files[key].editor.getSession().removeGutterDecoration(val.row, "gadget-comment"), 
                self._files[key].editor.getSession().removeGutterDecoration(val.row, "data-" + key + "-" + i), 
                options[i] ? self._files[key].editor.getSession().removeGutterDecoration(val.row, "collapsed") : self._files[key].editor.getSession().removeGutterDecoration(val.row, "open"), 
                obj[i].destroy(), delete obj[i], self._removeComment({
                    _id: i,
                    index: key
                });
            }), get(document).on("click", ".move-comment-up", function(e) {
                if (!get(this).hasClass("disabled")) {
                    var key = get(this).data("comment-id"), item = get(this).data("file-index"), val = obj[key], i = (val.row, 
                    val.row - 1);
                    update.call(self, item, key, i);
                }
            }), get(document).on("click", ".move-comment-down", function(e) {
                if (!get(this).hasClass("disabled")) {
                    var key = get(this).data("comment-id"), item = get(this).data("file-index"), val = obj[key], i = (val.row, 
                    val.row + 1);
                    update.call(self, item, key, i);
                }
            }), get("#outputContainer").keyup(function(e) {
                e.shiftKey && 9 === e.keyCode && (e.preventDefault(), self.focus());
            });
        },
        _closeOptionsMenu: function() {
            this.element.off(k21), this.$tabOptions.removeClass("open");
        },
        _loadState: function(message) {
            var i;
            try {
                if (message = JSON.parse(message), !Array.isArray(message)) throw new Error();
            } catch (c) {
                message = [ {
                    name: this.options.mainFileName,
                    content: message || ""
                } ];
            }
            for (i = 0; i < message.length; i++) this.addFile(message[i]);
            this._selectTab(0, !0);
        },
        _getCurrentVisibleTab: function() {
            var a = this.$tabBar.find(".tab.active").first(), b = (this.$contentWrapper.find(".file-content.active").first(), 
            a.index()), c = a.find(".file-name").text();
            return {
                tabIndex: b,
                fileName: c
            };
        },
        _selectTab: function(tabId, selectInfo) {
            this.element.find(".tab.active, .file-content.active").removeClass("active"), this._editor && this._editor.blur(), 
            void 0 !== tabId && this._files[tabId] ? (this.$tabBar.children().eq(tabId).addClass("active"), 
            this.$contentWrapper.children().eq(tabId).addClass("active"), this._editor = this._files[tabId].editor, 
            selectInfo || this._editor.focus(), this.element.trigger({
                type: "codeeditor.tabChanged",
                tabIndex: tabId
            }), this._files[tabId].binary ? this.element.find(".add-inline-comment").addClass("disabled") : this.element.find(".add-inline-comment").removeClass("disabled")) : this.element.find(".add-inline-comment").addClass("disabled");
        },
        _editFileName: function() {
            if ("BROADCASTING" != window.GadgetAPI._receiverBroadcastState) {
                var self = this, t = self.$tabBar.find(".tab.active"), el = t.find(".file-name"), val = el.text(), len = val.length, elem = get(y({
                    name: val
                })), index = el.outerWidth();
                if (t.hasClass("main-editable")) {
                    if (!self.options.mainEditable) return;
                    self.options.mainSuffix && (len -= self.options.mainSuffix.length);
                }
                el.hide(), elem.css("width", index + "px"), el.after(elem), elem.focus(), elem[0].setSelectionRange(0, len), 
                elem.on("blur", function(e) {
                    var ignore, name = elem.val().replace(/^\s|\s$/g, "");
                    return get(".file-name-error").remove(), name.length ? (name.length > 50 ? ignore = "File names must be less than 50 characters, please choose a shorter name." : "python" !== self.options.lang && "python3" !== self.options.lang || !name.match(/\.py$/) || name.match(/^[\w][\w0-9]*(\.[a-z]+)?$/) ? name.match(/^\w[\w\.\-]*$/) ? get("#" + name).length ? ignore = "The name '" + name + "' is reserved, please choose a different name." : name.toLowerCase() !== val.toLowerCase() && self.$tabBar.find(".file-name").each(function() {
                        return get(this).text().toLowerCase() === name.toLowerCase() ? (ignore = 'There is already a file named "' + name + '", please choose a different name.', 
                        !1) : void 0;
                    }) : ignore = "File names must start with a letter, number, or underscore followed by zero or more letters, numbers, underscores, hyphens, and periods." : ignore = "Python file names must start with a letter or underscore followed by zero or more letters, digits and underscores.", 
                    void (ignore ? (self.element.find(".tab-nav").after(prog({
                        message: ignore
                    })), get(document).foundation("alert", "reflow"), get(this).focus(), this.setSelectionRange(0, name.length)) : (el.text(name), 
                    el.show(), get(this).remove(), self._files[t.index()].name = name, self._onChange && self._onChange(), 
                    self._files[t.index()].editor.setModeFromName(name), self.element.trigger({
                        type: "codeeditor.fileRenamed",
                        oldFileName: val,
                        newFileName: name,
                        newFile: self._files[t.index()]
                    })))) : void self._removeFile({
                        undo: !1
                    });
                }), elem.on("keydown", function(event) {
                    10 === event.keyCode || 13 === event.keyCode ? get(this).blur() : 27 === event.keyCode && (elem.val(val), 
                    get(this).blur());
                });
            }
        },
        _removeFile: function(that) {
            var self = this, o = this.$tabBar.find(".tab.active").first(), d = this.$contentWrapper.find(".file-content.active").first(), n = origIndex = o.index(), t = o.find(".file-name").text(), i = get(lastProg({
                name: t
            })), item = this._files.splice(origIndex, 1)[0], style = origIndex === this._files.length, left = setTimeout(function() {
                i.find(".close").click();
            }, 15e3), top = function() {
                clearTimeout(left), item = void 0, o = void 0, d = void 0, i && (i.remove(), i = void 0);
            };
            o.detach(), d.detach(), style && (n -= 1), this._selectTab(n), this._onChange && !item.binary && this._onChange(), 
            (that.undo || item.editor.getValue().length) && (this.element.find(".tab-nav").after(i), 
            i.find(".close").on("click", function() {
                item.editor.destroy(), self.element.trigger({
                    type: "codeeditor.fileRemoved",
                    fileName: t
                });
            }), get(".file-restore-link").on("click", function() {
                self._files.splice(origIndex, 0, item), style ? (self.$tabBar.append(o), self.$contentWrapper.children().eq(n).after(d)) : (self.$tabBar.children().eq(n).before(o), 
                self.$contentWrapper.children().eq(n).before(d)), self._selectTab(origIndex), top(), 
                self._onChange && !item.binary && self._onChange();
            }), get(document).one("close.fndtn.alert-box", function(event) {
                top();
            }), get(".file-name-error").length && get(".file-name-error").remove(), get(document).foundation("alert", "reflow"));
        },
        _toggleFile: function() {
            var self = this, message = self.$tabBar.find(".tab.active");
            "undefined" == typeof self._files[message.index()].hidden ? self._files[message.index()].hidden = !0 : self._files[message.index()].hidden = !self._files[message.index()].hidden, 
            self._files[message.index()].hidden ? (message.find(".file-name").addClass("hidden-file-indicator"), 
            get('<i class="fa fa-eye-slash file-icon"></i>').insertBefore(message.find(".file-name"))) : (message.find(".file-name").removeClass("hidden-file-indicator"), 
            message.find(".file-name").prev("i").remove()), self._onChange && self._onChange();
        },
        _scrollTabBar: function(len) {
            var e, f, self = this, t = 300, n = 50, data = "swing", k = !1, i = self.$tabBar.children();
            0 > len && (i = get(i.get().reverse())), get(document).one(k02, function() {
                k = !0, clearTimeout(e);
            }), (f = function() {
                var a = !0;
                i.each(function() {
                    var i = get(this).position().left;
                    return len > 0 && (i += get(this).outerWidth()), (len > 0 && i > 10 || 0 > len && -10 > i) && (self.$tabBar.animate({
                        scrollLeft: "+=" + i
                    }, 200, data, function() {
                        k || (t = Math.max(0, t - n), t || (data = "linear"), e = setTimeout(f, t));
                    }), a = !1), a;
                });
            })();
        },
        _addCommentWidget: function() {
            var element = this._getCurrentVisibleTab();
            element.tabIndex >= 0 && this._files[element.tabIndex].editor.addCommentWidget.call(this);
        },
        _addComment: function(row) {
            this._files[row.index].comments.push(row), this._onChange && this._onChange();
        },
        _removeComment: function(item) {
            this._files[item.index].comments = _.filter(this._files[item.index].comments, function(user) {
                return user._id !== item._id;
            }), this._onChange && this._onChange();
        },
        _updateComment: function(res) {
            _.find(this._files[res.index].comments, function(data) {
                data._id === res._id && (data = _.extend(data, res.data));
            }), this._onChange && this._onChange();
        },
        resize: function(size) {
            for (var i = 0; i < this._files.length; i++) this._files[i].editor.resize(size);
        },
        assets: function(path) {
            return this.options.assets ? this.assetBrowser.assets(path) : [];
        },
        addFile: function(options, scope) {
            var a, m, d, value, j, o, s, l, i, y, k, w, self = this, b = "", t = "", n = this._files.length, z = !0, A = scope && scope.override ? scope.override : !1;
            if ("undefined" != typeof jQueryXDomainRequest && jQueryXDomainRequest && (z = !1), 
            "string" == typeof options && (options = {
                name: options
            }), a = options.name, t = options.type || a.split(".").pop(), b = options.content || "", 
            s = options.hidden, y = options.comments || [], k = options.binary || !1, m = get(x({
                name: a
            })), d = pxc.clone(), self.$tabBar.find(".file-name").each(function(node) {
                get(this).text().toLowerCase() === a.toLowerCase() && (i = !0, n = node);
            }), i && A) return get('textarea[name="' + self._files[n].name + '"]').val(b), self.$contentWrapper.children().eq(n).hasClass("active") ? self._files[n].editor.setValue(b) : options.binary ? (self._files[n].editor = val(d[0], {
                value: b
            }), d.html(pxp), self.$contentWrapper.children().eq(n).replaceWith(d)) : (self._files[n].editor.destroy(), 
            self._files[n].editor = bind(d[0], {
                onFocus: function() {},
                ext: self._files[n].name.split(".").pop() || self.options.defaultFileExt,
                name: a,
                value: b,
                index: n
            }), self._files[n].editor.setValue(b), self.$contentWrapper.children().eq(n).replaceWith(d)), 
            this._files[n];
            if (s && (self.options.owner && self.options.canHideTabs ? (m.find(".file-name").addClass("hidden-file-indicator"), 
            get('<i class="fa fa-eye-slash file-icon"></i>').insertBefore(m.find(".file-name"))) : m.hide()), 
            this.options.noEditor) value = val(d[0], {
                value: b
            }); else if (options.image) value = action(d[0], {
                name: a,
                value: b
            }); else if (options.binary) value = val(d[0], {
                value: b
            }), d.html(pxp); else if (!self.options.disableAceEditor && z && def) value = bind(d[0], {
                onFocus: this.options.onFocus,
                ext: t || this.options.defaultFileExt,
                name: a,
                value: b,
                index: n,
                comments: y,
                editorOpts: this.options,
                onCommentChange: update.bind(this),
                onCommentRemove: this._removeComment.bind(this)
            }); else {
                value = init(d[0], {
                    onFocus: this.options.onFocus,
                    selectedLine: this.options.selectedLine,
                    value: b,
                    name: a
                });
                for (var id in pyc) value.addCommand(id, pyc[id].key, pyc[id].fn);
            }
            for (j = 0; j < this._commands.length; j++) value.addCommand.apply(value, this._commands[j]);
            for (j = 0; j < this._plugins.length; j++) value.registerPlugin(this._plugins[j], this);
            this._onChange && !k && value.change(this._onChange), w = {
                index: n
            }, k && (w.binary = !0), m.data(w), this.$tabBar.append(m);
            var o = this.$contentWrapper.find(".fixed-right").first();
            return o.length ? o.before(d) : this.$contentWrapper.append(d), 0 === n && (this.options.mainEditable ? m.addClass("main-editable") : m.addClass("permanent")), 
            get(".info-area .expander").unbind("click"), get(".info-area .expander").click(function() {
                get(".info-area").hasClass("expanded") ? get(".info-area").removeClass("expanded").addClass("collapsed") : get(".info-area").removeClass("collapsed").addClass("expanded");
            }), l = {
                name: a,
                type: t,
                $tab: m,
                $content: d,
                editor: value,
                comments: y,
                binary: k
            }, "undefined" != typeof s && (l.hidden = s), this._files.push(l), this.element.trigger({
                type: "codeeditor.fileAdded",
                fileName: a,
                newFile: this._files[this._files.length - 1]
            }), this._files[this._files.length - 1];
        },
        hasFile: function(name) {
            var i;
            for (i = 0; i < this._files.length; i++) if (this._files[i].name === name) return !0;
            return !1;
        },
        getFile: function(name) {
            var i;
            for (i = 0; i < this._files.length; i++) if (this._files[i].name === name) return this._files[i].editor.getValue();
            return "";
        },
        selectFile: function(element) {
            var ret, c;
            for (c = 0; c < this._files.length; c++) if (this._files[c].name === element) {
                ret = this._files[c].$tab;
                break;
            }
            ret || (ret = this.addFile(element).$tab, c = this._files.length - 1), this._selectTab(c);
        },
        serialize: function(options) {
            var a, i, l, events = [], options = _.extend(options || {
                removeComments: !1
            });
            for (i = 0; i < this._files.length; i++) this._files[i].binary || (a = this._files[i], 
            l = {
                name: a.name,
                content: a.editor.getValue()
            }, "undefined" != typeof a.hidden && (l.hidden = a.hidden), !options.removeComments && a.comments.length && (l.comments = a.comments), 
            events.push(l));
            return JSON.stringify(events);
        },
        getAllFiles: function(data) {
            var filter, length, result = {};
            data && "object" == typeof data ? (filter = data.filter || !1, length = void 0 === data.values ? !0 : data.values) : (filter = !1, 
            length = !0), filter && "regexp" != typeof filter && (filter = new RegExp(filter));
            for (var i = 0; i < this._files.length; i++) if (!filter || filter.test(this._files[i].name)) {
                if (this._files[i].binary) continue;
                result[this._files[i].name] = length ? this._files[i].editor.getValue() : 1;
            }
            return result;
        },
        getAllVisibleFiles: function() {
            var i, where = {};
            for (i = 0; i < this._files.length; i++) this._files[i].hidden || this._files[i].binary || (where[this._files[i].name] = this._files[i].editor.getValue());
            return where;
        },
        addCommand: function(a, b, c) {
            this._commands.push([ a, b, c ]);
            for (var i = 0; i < this._files.length; i++) this._files[i].editor.addCommand(a, b, c);
        },
        updateInfo: function(form) {
            this.options.showInfo && (this._currentInfo = form, get(".info-area .expander").hide(), 
            form ? (get(".info-area").removeClass("empty").find(".info-quick").html(this._currentInfo.title), 
            this.loadFullInfo(this._currentInfo)) : get(".info-area").removeClass("expanded").addClass("collapsed empty"));
        },
        loadFullInfo: function(item) {
            var text;
            if (item && item.url) {
                if (text = r[item.url], void 0 !== text) return void ("string" == typeof text ? text.length && (get(".info-area .info-full").html(r[item.url]), 
                get(".info-area .expander").show()) : text._cancelled = !1);
                this.lastInfoRequest && (this.lastInfoRequest._cancelled = !0), this.lastInfoRequest = r[item.url] = function() {
                    var promise = get.get(item.url, "", "html");
                    return promise.done(function(msg) {
                        r[item.url] = msg || "", msg && !promise._cancelled && (get(".info-area .info-full").html(msg), 
                        get(".info-area .expander").show());
                    }), promise;
                }();
            }
        },
        registerPlugin: function(plugin) {
            var el = this;
            plugin.on && plugin.on("info.token", function(e, i) {
                el.updateInfo(i);
            }), this._plugins.push(plugin);
            for (var i = 0; i < this._files.length; i++) this._files[i].editor.registerPlugin(plugin, this);
        },
        change: function(name) {
            this._onChange = name;
            for (var i = 0; i < this._files.length; i++) this._files[i].editor.change(name);
        },
        reset: function(e) {
            for (var context; context = this._files.pop(); ) context.editor.destroy(), context.$content.remove(), 
            context.$tab.remove();
            this._loadState(e);
        },
        highlight: function(element, name) {
            for (var index = -1, i = 0; i < this._files.length; i++) if (this._files[i].name === element) {
                index = i;
                break;
            }
            if (index >= 0) {
                var target = this._files[index].$tab.hasClass("active") ? !1 : !0;
                this._files[index].editor.highlight(name, target), this._files[index].$tab.has(p02).length || this._files[index].$tab.append(" <i class='" + p10 + "'></i>");
            }
        },
        clearTabMarkers: function() {
            for (var i = 0; i < this._files.length; i++) this._files[i].$tab.has(p02).length && this._files[i].$tab.find(p02).remove();
            get(".ace_content").removeClass("attention-error"), get("textarea.lined").removeClass("attention-error"), 
            get(".lineno").removeClass("lineselect");
        },
        gotoLine: function(line) {
            this._editor && this._editor.aceInstance && this._editor.aceInstance.gotoLine(line);
        },
        removeComments: function() {
            var i, idx, key, item;
            for (i = 0; i < this._files.length; i++) if (this._files[i].comments) for (idx = 0; idx < this._files[i].comments.length; idx++) key = this._files[i].comments[idx]._id, 
            item = obj[key], this._files[i].editor.getSession().removeGutterDecoration(item.row, "gadget-comment"), 
            this._files[i].editor.getSession().removeGutterDecoration(item.row, "data-" + i + "-" + key), 
            options[key] ? this._files[i].editor.getSession().removeGutterDecoration(item.row, "collapsed") : this._files[i].editor.getSession().removeGutterDecoration(item.row, "open"), 
            obj[key].destroy(), delete obj[key];
        },
        activeTab: function() {
            return this._getCurrentVisibleTab();
        }
    };
    !function(wrapped) {
        for (var d = "setValue getValue focus isFocused".split(" "), action = function(to) {
            wrapped[to] = function() {
                var args = Array.prototype.slice.call(arguments);
                return this._editor[to].apply(this._editor, args);
            };
        }, i = 0; i < d.length; i++) action(d[i]);
    }(k24), get.widget("gadget.codeEditor", k24);
}(window.jQuery, window.GadgetIO, window.ace), function() {
    "use strict";
    function merge(s, a) {
        toArray(function() {
            o.send(s + "," + ("object" == typeof a ? JSON.stringify(a) : a));
        });
    }
    function send(completeCallback, name) {
        switch (completeCallback) {
            case "reload":
            options[name] = j.getFile(name).replace(/[^\x00-\x7F]/g, ""), merge("file", {
                name: name,
                contents: options[name]
            });
            break;

            case "completions":
            if (editor.completer && editor.completer.detach(), !t) return;
            var a = JSON.parse(name);
            if (a.id.toString() === t.id.toString()) {
                var opt_value = Date.now() - t.when;
                window.ga && !y && window.ga("send", "event", "Embedded Python Interface", "Autocomplete", "Timing", opt_value), 
                a = a.list || [];
                for (var i = 0; i < a.length; i++) a[i] = {
                    caption: a[i].desc,
                    docs: a[i].docs,
                    value: a[i].name,
                    score: 500 - i,
                    meta: a[i].type,
                    type: a[i].type
                };
                if (t.inImport) {
                    var queue = j.getAllFiles({
                        filter: "^.*\\.py$",
                        values: !1
                    });
                    for (var builder in queue) {
                        var url = builder.replace(/\.py$/, "");
                        a.push({
                            caption: url,
                            value: url,
                            type: "import",
                            meta: "import",
                            score: 500
                        });
                    }
                }
                t.cb(null, a), t = void 0;
            }
        }
    }
    function toArray(cb) {
        return l ? cb() : c ? void (cb && s.push(cb)) : c = !0;
    }
    function init(interval) {
        x || (x = !0, j = interval, that = new diff_match_patch(), that.Diff_Timeout = 1, 
        that.Diff_EditCost = 5, ace.require("ace/ext/language_tools").setCompleters([ {
            identifierRegexps: [ /[.a-zA-Z_0-9\$\-\u00A2-\uFFFF]/ ],
            getCompletions: function(state, session, pos, prefix, callback) {
                var c, cursor, token = session.getTokenAt(pos.row, pos.column);
                return "string" === token.type || "comment" === token.type ? callback(null, []) : (t && (state.completer && state.completer.detach(), 
                t.cb(null, [])), t = {
                    id: ++i,
                    cb: callback
                }, c = parse(state, pos, t), cursor = {
                    id: String(t.id),
                    line: pos.row + 1,
                    column: pos.column,
                    file: state._fileName
                }, c && (cursor.patch = c), t.when = Date.now(), void merge("autocomplete", cursor));
            },
            getDocTooltip: function(file) {
                if ("function" == file.type && file.docs.length) {
                    var filename = file.docs.split("\n", 1)[0], command = file.docs.split(/\-{2,}\s*/)[1];
                    file.docHTML = "<b>" + filename + "</b>", command && (file.docHTML += "<hr></hr>" + command);
                }
            }
        } ]));
    }
    function plugin(self, name) {
        function remove(item) {
            options[item.newName] = options[item.oldName], delete options[item.oldName], merge("file_rename", {
                oldName: item.oldName,
                newName: item.newName
            });
        }
        function on(gesture) {
            delete options[gesture._fileName], merge("file_remove", {
                fileName: gesture._fileName
            });
        }
        function next() {
            /python/.test(self.session.getMode().$id) ? (merge("file", {
                name: self._fileName,
                contents: self.getValue()
            }), options[self._fileName] = self.getValue(), self.on("file.rename", remove), self.on("destroy", on), 
            self.on("blur", function() {
                t = void 0, self.completer && self.completer.detach();
            }), self.setOptions({
                enableBasicAutocompletion: !0,
                enableLiveAutocompletion: !0
            })) : (self.off("file.rename", remove), self.off("file.remove", on), self.setOptions({
                enableBasicAutocompletion: !1,
                enableLiveAutocompletion: !1
            }));
        }
        window.ace && (init(name), self.on("changeMode", function() {
            next();
        }), next());
    }
    var that, o, c, t, j, target = $({}), i = 0, n = GadgetIO["import"]("utils.guid"), l = !1, k = "s" + n("", 16), s = [], x = !1, y = !1, options = {}, parse = function(opt, pos, cb) {
        var content, keys, key, val = opt.getValue(), i = void 0 === options[opt._fileName] ? val : options[opt._fileName], v = opt.session.doc.positionToIndex(pos, 0);
        return val = val.replace(/[^\x00-\x7F]/g, ""), val = val.replace(/(((?:^|;)[^\S\n\r]*)(from|import)((?:[^\S\r\n]+|\\[\r\n])+))((?:[\w.,*]+(?:[^\S\n\r]*\\[\r\n])*[^\S\n\r]*)*)(?:;|$)/gm, function(x, y, z, a, b, c, r) {
            return c = "from" === a ? c.replace(/^[\w.]*/, function(a, b) {
                var i = r + y.length + b, m = a.split("."), n = j.hasFile(a + ".py") ? "sessions." + k + "." : "modules.";
                return v >= i && v <= r + x.length && (pos.column += n.length, v <= i + m[0].length && (cb.inImport = !0)), 
                n + a;
            }) : c.replace(/[^,]*/g, function(str, b) {
                if (b && !str) return str;
                var i = r + y.length + b, parts = str.match(/[\w.]+/g) || [ str ], prop = parts[0], key = j.hasFile(prop + ".py") ? "sessions." + k + "." : "modules.", value = 1 === parts.length && prop.match(/[\w.]/) ? " as " + prop : "";
                return v >= i && v <= i + str.length && (v <= i + str.indexOf(prop) + prop.length ? (pos.column += key.length, 
                v <= i + str.split(".")[0].length && (cb.inImport = !0)) : pos.column += key.length + prop.length + value.length), 
                str.replace(prop, key + prop + value);
            }), y + c;
        }), val !== i ? (options[opt._fileName] = val, content = that.diff_main(i, val, !0), 
        content.length > 2 && that.diff_cleanupEfficiency(content), keys = that.patch_make(i, val, content), 
        key = that.patch_toText(keys)) : void 0;
    };
    window.GadgetIO["export"]("python.editor.autocomplete", {
        initialize: plugin,
        on: function() {
            return target.on.apply(target, arguments);
        },
        off: function() {
            return target.off.apply(target, arguments);
        },
        setInLibrary: function(c2y) {
            y = c2y;
        }
    });
}(), function() {
    "use strict";
    function _init() {
        content.__initialized || (content.__initialized = !0, $("body").append(content));
    }
    function init(element) {
        function callback() {
            c && (update(max), c = !1);
        }
        function update(nodes) {
            var args, values, i;
            if (nodes && nodes.length) for (;nodes.length; ) {
                for (args = nodes.pop(), values = result[args.range.start.row][args.range.start.column], 
                i = 0; i < values.length; i++) if (values[i].id === args.id) {
                    values.splice(i, 1);
                    break;
                }
                element.getSession().removeMarker(args.id);
            }
        }
        function add(directives, annotation, mode, t) {
            var name = annotation.line - 1, dir = new Range(name, annotation.start, name, annotation.end), i = {
                id: element.getSession().addMarker(dir, mode || "variable-undefined"),
                data: t,
                range: dir
            };
            directives.push(i), c = !0, result[name] || (result[name] = []), result[name][annotation.start] || (result[name][annotation.start] = []), 
            result[name][annotation.start].push(i);
        }
        function f(self, min) {
            var n, j, data, i = self && self._astname;
            if (i) {
                if (min[i] && min[i].enter && min[i].enter(self), self._fields) for (n = 0; n < self._fields.length; n += 2) if (data = self._fields[n + 1](self)) if (data._astname) f(data, min); else if (data.constructor === Array && data.length && data[0] && data[0]._astname) for (j = 0; j < data.length; j++) f(data[j], min);
                min[i] && min[i].leave && min[i].leave(self);
            }
        }
        function test() {
            var a, b, o, m, r, i, t = "main.py", y = element.getValue();
            if (callback(), !window.__experiment_name_errors_hints_off && !/import\s+\*/.test(y)) {
                try {
                    b = Sk.parse(t, y), o = Sk.astFromParse(b.cst, t, b.flags), m = Sk.symboltable(o, t);
                } catch (n) {
                    return;
                }
                r = [], i = m.top, a = {
                    enter: function(doc) {
                        r.push(i), i = m.getStsForAst(doc);
                    },
                    leave: function(inSender) {
                        i = r.pop();
                    }
                }, f(o, {
                    FunctionDef: a,
                    ClassDef: a,
                    Name: {
                        enter: function(e) {
                            var name = e.id.v, arg = i.lookup(name);
                            !arg.is_global() || Sk.builtins.hasOwnProperty(name) || headers.hasOwnProperty(name) || m.global.hasOwnProperty(name) && (m.top.lookup(name).is_assigned() || m.top.lookup(name).is_imported()) || add(max, {
                                line: e.lineno,
                                start: e.col_offset,
                                end: e.col_offset + name.length
                            }, !1, {
                                message: "<code>" + name + "</code> is not defined. Did you mean something else?"
                            });
                        }
                    }
                });
            }
        }
        function compare(i, x) {
            var a = element.session.getTokenAt(i, x);
            return (!a || "text" === a.type && /^\s+$/.test(a.value)) && (a = element.session.getTokenAt(i, x + 1)), 
            a && (a.row = i, result[i] && result[i][a.start] && (a.marker = result[i][a.start][0])), 
            a;
        }
        function render() {
            callback(), a && clearTimeout(a), a = setTimeout(test, 883);
        }
        function handle(event) {
            var p, s;
            r && (content.hide(), r = !1), c && (p = event.getDocumentPosition(), s = compare(p.row, p.column), 
            s && s.marker && s.marker.data && s.marker.data.message && (r = !0, content.css({
                left: event.domEvent.pageX,
                top: event.domEvent.pageY + 10
            }).html(s.marker.data.message).show()));
        }
        function load(req, cm) {
            var cursor = cm.getCursor(), data = compare(cursor.row, cursor.column);
            !data || _ref.row === data.row && _ref.start === data.start || ("keyword" === data.type && metadata[data.value] ? o.trigger("info.token", {
                token: data,
                title: metadata[data.value],
                url: "partials/" + data.value + ".html"
            }) : data.marker ? o.trigger("info.token", {
                token: data,
                title: data.marker.data.message
            }) : o.trigger("info.token", void 0), _ref = data);
        }
        function setup() {
            _len || (_len = !0, Range || (Range = ace.require("ace/range").Range), element.on("change", render), 
            element.on("mousemove", handle), element.session.selection.on("changeCursor", load), 
            test());
        }
        function select() {
            _len && (_len = !1, element.off("change", render), element.off("mousemove", handle), 
            element.session.selection.off("changeCursor", load));
        }
        function runTest() {
            /python/.test(element.session.getMode().$id) ? setup() : select();
        }
        var a, max = [], result = [], c = !1, r = !1, _len = !1, _ref = {};
        _init(), element.on("changeMode", function() {
            runTest();
        }), runTest();
    }
    var Range, o = $({}), headers = {
        True: 1,
        False: 1,
        None: 1,
        NotImplemented: 1,
        Ellipsis: 1,
        __debug__: 1,
        "float": 1,
        "int": 1,
        "long": 1
    }, content = $('<div class="editor-tooltip"></div>').hide(), metadata = {
        and: "The boolean <code>and</code> operator.",
        as: "Module aliasing: <code>import random as rnd</code>.",
        assert: "Use <code>assert</code> to test assumptions.",
        "break": "Use <code>break</code> to stop the (loop) cycle.",
        "class": "Use <code>class</code> to create new user defined modules.",
        "continue": "Use <code>continue</code> to skip to the next (loop) cycle.",
        def: "A <code>def</code> defines a function.",
        del: "Use <code>del</code> to delete an object.",
        elif: "Use <code>elif</code> for else-if conditionals.",
        "else": "<code>else</code> is executed unless <code>if</code> is true.",
        except: "Use <code>except</code> to catch an exception.",
        exec: "<code>exec</code> is not yet implemented.",
        "finally": "<code>finally</code> blocks are always executed.",
        "for": "<code>for</code> iterates over a list in order.",
        from: "Use <code>from</code> to import a specific part of a module.",
        global: "<code>global</code> accesses variables defined outside functions",
        "if": "Use <code>if</code> to conditionally execute statements.",
        "import": "Use <code>import</code> to use external modules.",
        "in": "<code>in</code> tests if a sequence contains a value.",
        is: "<code>is</code> tests for object identity.",
        lambda: "<code>lambda</code> creates a new anonymous function",
        not: "The boolean <code>not</code> operator.",
        or: "The boolean <code>or</code> operator.",
        pass: "<code>pass</code> does nothing at all, seriously.",
        print: "Use <code>print</code> to write output.",
        raise: "Use <code>raise</code> to create an exception.",
        "return": "Use <code>return</code> to exit a function.",
        "try": "Use <code>try</code> to capture exceptions.",
        "while": "Use <code>while</code> to loop until a condition is false.",
        "with": "<code>with</code> simplifies exception handling.",
        "yield": "<code>yield</code> exits a generator with a value."
    };
    window.GadgetIO["export"]("python.editor.hints", {
        initialize: init,
        on: function() {
            return o.on.apply(o, arguments);
        },
        off: function() {
            return o.off.apply(o, arguments);
        }
    });
}(), function() {
    function attrs() {}
    function success(m) {
        n = m, $("#test-totals").html(s + " out of " + n + " tests passed");
    }
    function parse(args, y, time) {
        x += 1, s += 1;
        var span = el("unittest-pass", {
            testNumber: x,
            shortDescription: y,
            description: time
        });
        $("#unittest-accordion").append($(span)), $("#test-totals").html(s + " out of " + n + " tests passed"), 
        $(document).foundation();
    }
    function insert(atEnd, y, element, h) {
        x += 1;
        var h = h.replace("\n", "<br>"), e = el("unittest-fail", {
            testNumber: x,
            shortDescription: y,
            description: element,
            reason: h
        });
        $("#unittest-accordion").append($(e)), $(document).foundation();
    }
    function processMessage(e, text) {
        x += 1;
        var text = text.replace("\n", "<br>"), items = el("unittest-error", {
            testNumber: x,
            shortDescription: e,
            reason: text
        });
        $("#unittest-accordion").append($(items)), $(document).foundation();
    }
    function templatePreProcessor() {
        return x;
    }
    var x, n, s, el = window.GadgetIO["import"]("utils.template");
    window.GadgetIO["export"]("python.editor.unittests", {
        initializePlugin: function() {
            x = 0, n = 0, s = 0, $("li.accordion-navigation").remove(), $("#unittest-accordion").on("toggled", function(e, el) {
                var choice = $(".open-close-indicator.fa-angle-down");
                if (choice.addClass("fa-angle-right"), choice.removeClass("fa-angle-down"), $(".content.active").length) {
                    var $image = $(el).parent().find(".open-close-indicator");
                    $image.removeClass("fa-angle-right"), $image.addClass("fa-angle-down");
                }
            });
        },
        addTest: attrs,
        addSuccess: parse,
        addFailure: insert,
        addError: processMessage,
        setNumberOfTests: success,
        getNumberOfTestsRun: templatePreProcessor
    });
}(), function(brozula, m) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = m() : "function" == typeof define && define.amd ? define(m) : brozula.Pygame = m();
}(this, function() {
    "use strict";
    function QTip() {
        throw new Sk.builtin.NotImplementedError("this function is not implemented in Sklupt");
    }
    function foo(_bar) {
        return _bar;
    }
    function Entity() {
        var a;
        return this instanceof Entity ? void Sk.builtin.StandardError.apply(this, arguments) : (a = Object.create(Entity.prototype), 
        a.constructor.apply(a, arguments), a);
    }
    function onLoad(s) {
        return Sk.builtin.pyCheckArgs("get_height", arguments, 1, 1, !1, !1), s.height;
    }
    function onclick(menu) {
        return Sk.builtin.pyCheckArgs("get_width", arguments, 1, 1, !1, !1), menu.width;
    }
    function set(options) {
        return Sk.builtin.pyCheckArgs("get_size", arguments, 1, 1, !1, !1), Sk.builtin.tuple([ options.width, options.height ]);
    }
    function binary() {
        return Sk.builtin.pyCheckArgs("get_flags", arguments, 1, 1, !1, !1), new Sk.builtin.int_(0);
    }
    function map(o2) {
        return o2.Surface = me(o2), o2.Surface.$isclass = !0, o2;
    }
    function apply() {
        if (!a) throw new Entity("video system not initialized");
    }
    function getObject() {
        a = !0;
    }
    function flush() {
        a = !1;
    }
    function f(a) {
        return function(b) {
            var c = find(a, b), length = items.reduce(function(a, b) {
                return a || b(c);
            }, !1);
            !length && init(c) && d.push(c);
        };
    }
    function init(type) {
        return value.size > 0 ? callback(type, Array.from(value)) : item.size > 0 ? !callback(type, Array.from(item)) : !0;
    }
    function exit() {
        items.length = 0;
    }
    function p() {
        return thickness.Event = s(thickness), thickness.Event.$isclass = !0, thickness;
    }
    function test(t, a) {
        var add = function(a, b) {
            return c = ("keyup" === t ? function(a, b) {
                return a - b;
            } : function(a, b) {
                return a + b;
            })(a, b);
        };
        switch (a.code) {
            case "ShiftLeft":
            return assertEquals(a, add(c, 1));

            case "ShiftRight":
            return assertEquals(a, add(c, 2));

            case "ControlRight":
            return assertEquals(a, add(c, 64));

            case "ControlLeft":
            return assertEquals(a, add(c, 128));

            case "AltRight":
            return assertEquals(a, add(c, 256));

            case "AltLeft":
            return assertEquals(a, add(c, 512));

            case "MetaRight":
            return assertEquals(a, add(c, 1024));

            case "MetaLeft":
            return assertEquals(a, add(c, 2048));

            default:
            return assertEquals(a, c);
        }
    }
    function extend(a) {
        var i = constant[Object.keys(constant).find(function(b) {
            return constant[b] === a;
        })];
        return i && padding.hasOwnProperty(i) ? padding[i] : "Unknown";
    }
    function parse(options) {
        if (!options.code) {
            var nextChar = segmenter[[ options.key.toLowerCase(), options.keyCode, options.location ].toString()];
            nextChar && (options.code = nextChar);
        }
        return options;
    }
    function find(type, o) {
        return o = parse(o), Sk.misceval.callsimOrSuspend(p().Event, Sk.ffi.remapToPy(label[type]), Sk.ffi.remapToPy({
            unicode: 1 === o.key.length ? o.key : "",
            key: end[o.code],
            scancode: keys[o.code] || 0,
            mod: test(type, o)
        }));
    }
    function size() {
        c = 0;
    }
    function concat(b) {
        if ("function" == typeof b) return function() {
            return concat(b());
        };
        var a = {};
        for (var prop in b) b[prop].$isclass ? (a[prop] = b[prop], delete a[prop].$isclass) : a[prop] = Sk.ffi.remapToPy(b[prop]);
        return a;
    }
    function get(url) {
        var options = new Sk.builtin.module();
        return options.$d = concat(url), options;
    }
    function unique(arr, b) {
        var c = {};
        return Object.keys(b).filter(function(method) {
            return "_" !== method[0];
        }).forEach(function(e) {
            return c[e] = b[e];
        }), push(arr, c);
    }
    function addAnimation(name, callback) {
        node.listeners = node.listeners || {}, node.listeners[name] = node.listeners[name] || [], 
        node.listeners[name].push(callback);
    }
    function addTest(fun) {
        return function(push) {
            return function(l) {
                fun(l) && push(l);
            };
        };
    }
    function bind(callback, name, onDone) {
        var o = f(name), res = callback(o);
        if (onDone) onDone(res); else {
            var b = clamp(name, o.name);
            b || (addAnimation(name, o.name), node.addEventListener(name, res));
        }
    }
    function on(el, evt, checkCaretPosition) {
        bind(el, "keyup", checkCaretPosition), bind(el, "keydown", evt);
    }
    function render(options) {
        return options.display = get(call(options.Surface, node)), options;
    }
    var setShadow = function(a, b, c) {
        return Sk.builtin.pyCheckArgs("__init__", arguments, 2, 3, !1, !1), Sk.abstr.sattr(a, "dict", c ? c : new Sk.builtin.dict(), !1), 
        Sk.abstr.sattr(a, "type", b, !1), Sk.builtin.none.none$;
    };
    setShadow.co_name = new Sk.builtins.str("__init__"), setShadow.co_varnames = [ "self", "type", "dict" ];
    var action = function(error) {
        var args = Sk.ffi.remapToJs(Sk.abstr.gattr(error, "dict", !1).$r()), from = Sk.ffi.remapToJs(Sk.abstr.gattr(error, "type", !1).$r());
        return Sk.ffi.remapToPy("<Event(" + from + "-" + extend(parseInt(from, 10)) + " " + args + ")>");
    };
    action.co_name = new Sk.builtins.str("__repr__"), action.co_varnames = [ "self" ];
    var cross = function(a, b) {
        Sk.builtin.pyCheckArgs("__getattr__", arguments, 2, 2, !1, !1);
        var c = Sk.abstr.gattr(a, "dict", !1);
        return c.mp$subscript(b);
    };
    action.co_name = new Sk.builtins.str("__getattr__"), action.co_varnames = [ "self", "attr" ];
    var adder = function(a, b) {
        b.__init__ = new Sk.builtins["function"](setShadow, a), b.__repr__ = new Sk.builtins["function"](action, a), 
        b.__getattr__ = new Sk.builtins["function"](cross, a);
    };
    adder.co_name = new Sk.builtins.str("Event");
    var s = function(v) {
        return Sk.misceval.buildClass(v, adder, "Event", []);
    };
    Sk.abstr.setUpInheritance("pygame.error", Entity, Sk.builtin.StandardError);
    var isFunction = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(a) {
        return typeof a;
    } : function(a) {
        return a && "function" == typeof Symbol && a.constructor === Symbol && a !== Symbol.prototype ? "symbol" : typeof a;
    }, push = Object.assign || function(o1) {
        for (var i = 1; i < arguments.length; i++) {
            var o2 = arguments[i];
            for (var key in o2) Object.prototype.hasOwnProperty.call(o2, key) && (o1[key] = o2[key]);
        }
        return o1;
    }, format = function() {
        function init(scope, path) {
            var arr = [], fn = !0, l = !1, s = void 0;
            try {
                for (var node, element = scope[Symbol.iterator](); !(fn = (node = element.next()).done) && (arr.push(node.value), 
                !path || arr.length !== path); fn = !0) ;
            } catch (t) {
                l = !0, s = t;
            } finally {
                try {
                    !fn && element["return"] && element["return"]();
                } finally {
                    if (l) throw s;
                }
            }
            return arr;
        }
        return function(src, max) {
            if (Array.isArray(src)) return src;
            if (Symbol.iterator in Object(src)) return init(src, max);
            throw new TypeError("Invalid attempt to destructure non-iterable instance");
        };
    }(), add = function(args, b) {
        Sk.builtin.pyCheckArgs("__init__", arguments, 2, 5, !1, !1);
        var o = Sk.ffi.remapToJs(b), res = format(o, 2);
        if (args.width = res[0], args.height = res[1], args.width < 0 || args.height < 0) throw new Entity("Invalid resolution for Surface");
        return Sk.builtin.none.none$;
    };
    add.co_name = new Sk.builtins.str("__init__"), add.co_varnames = [ "self", "size", "flags", "depth", "masks" ], 
    add.$defaults = [ new Sk.builtin.int_(0), new Sk.builtin.int_(0), Sk.builtin.none.none$ ];
    var onSuccess = function(result) {
        var w = Sk.ffi.remapToJs(result.width), h = Sk.ffi.remapToJs(result.height);
        return Sk.ffi.remapToPy("<Surface(" + w + "x" + h + "x32 SW)>");
    };
    onSuccess.co_name = new Sk.builtins.str("__repr__"), onSuccess.co_varnames = [ "self" ], 
    onLoad.co_name = new Sk.builtins.str("get_height"), onLoad.co_varnames = [ "self" ], 
    onclick.co_name = new Sk.builtins.str("get_width"), onclick.co_varnames = [ "self" ], 
    set.co_name = new Sk.builtins.str("get_size"), set.co_varnames = [ "self" ], binary.co_name = new Sk.builtins.str("get_flags"), 
    binary.co_varnames = [ "self" ];
    var bar = function(a, b) {
        b.__init__ = new Sk.builtins["function"](add, a), b.__repr__ = new Sk.builtins["function"](onSuccess, a), 
        b.get_width = new Sk.builtins["function"](onclick, a), b.get_height = new Sk.builtins["function"](onLoad, a), 
        b.get_size = new Sk.builtins["function"](set, a), b.get_flags = new Sk.builtins["function"](binary, a);
    };
    bar.co_name = new Sk.builtins.str("Surface");
    var me = function(e) {
        return Sk.misceval.buildClass(e, bar, "Surface", []);
    }, a = !1, call = function(e, d) {
        return {
            __doc__: "pygame module to control the display window and screen",
            __name__: "pygame.display",
            __package__: Sk.builtin.none.none$,
            __PYGAMEinit__: QTip,
            quit: foo(Sk.builtin.none.none$),
            init: function() {
                return getObject(), Sk.builtin.none.none$;
            },
            update: foo(Sk.builtin.none.none$),
            set_mode: function(a) {
                getObject();
                var me = a ? a : new Sk.builtin.tuple([ d.innerWidth, d.innerHeight ]);
                return Sk.misceval.callsim(e, me);
            },
            get_init: function() {
                return Sk.ffi.remapToPy(a);
            },
            get_caption: QTip,
            mode_ok: QTip,
            set_icon: QTip,
            get_active: QTip,
            iconify: QTip,
            set_gamma: QTip,
            set_palette: QTip,
            get_wm_info: QTip,
            set_gamma_ramp: QTip,
            Info: QTip,
            get_surface: QTip,
            toggle_fullscreen: QTip,
            get_driver: QTip,
            set_caption: QTip,
            flip: QTip,
            _PYGAME_C_API: QTip,
            gl_get_attribute: QTip,
            gl_set_attribute: QTip,
            list_modes: QTip
        };
    }, items = [], d = [], item = new Set(), value = new Set(), sum = function(a, b, c) {
        return function(r) {
            return b.result = r, a(r), c;
        };
    }, callback = function(error, response) {
        return -1 !== response.indexOf(Sk.ffi.remapToJs(Sk.abstr.gattr(error, "type", !1)));
    }, page = function(id) {
        return !!d.find(function(err) {
            return callback(err, id);
        });
    }, thickness = {
        __package__: Sk.builtin.none.none$,
        __doc__: "pygame module for interacting with events and queues",
        __name__: "pygame.event",
        get_grab: foo(Sk.builtin.bool.true$),
        set_grab: foo(Sk.builtin.none.none$),
        pump: foo(Sk.builtin.none.none$),
        poll: function() {
            return apply(), d.length ? d.pop() : Sk.misceval.callsimOrSuspend(thickness.Event, Sk.ffi.remapToPy(0));
        },
        post: function(element) {
            apply(), Sk.builtin.pyCheckArgs("post", arguments, 1, 1), init(element) && d.push(element);
        },
        get: function(a) {
            if (apply(), a) {
                var last = function() {
                    var last = Sk.builtin.checkIterable(a) ? Sk.ffi.remapToJs(a) : [ Sk.ffi.remapToJs(a) ];
                    try {
                        return {
                            v: Sk.ffi.remapToPy(d.filter(function(d) {
                                return callback(d, last);
                            }))
                        };
                    } finally {
                        d = d.filter(function(d) {
                            return !callback(d, last);
                        });
                    }
                }();
                if ("object" === ("undefined" == typeof last ? "undefined" : isFunction(last))) return last.v;
            }
            try {
                return Sk.ffi.remapToPy(d);
            } finally {
                d.length = 0;
            }
        },
        clear: function() {
            return apply(), d.length = 0, Sk.builtin.none.none$;
        },
        peek: function(a) {
            if (apply(), a) {
                if (Sk.builtin.checkIterable(a)) {
                    var arg = Sk.ffi.remapToJs(a);
                    return Sk.ffi.remapToPy(page(arg));
                }
                return Sk.ffi.remapToPy(page([ Sk.ffi.remapToJs(a) ]));
            }
            return d.length ? d[0] : Sk.misceval.callsimOrSuspend(thickness.Event, Sk.ffi.remapToPy(0));
        },
        wait: function() {
            apply();
            var item = null, body = new Sk.misceval.Suspension();
            return body.data = {
                type: "Sk.promise",
                promise: new Promise(function(d) {
                    item = sum(d, body, !0), items.push(item);
                })
            }, body.resume = function() {
                return items.splice(items.indexOf(item), 1), body.result;
            }, body;
        },
        event_name: function(position) {
            return Sk.ffi.remapToPy(extend(Sk.ffi.remapToJs(position)));
        },
        set_blocked: function(type) {
            apply(), Sk.builtin.pyCheckArgs("set_blocked", arguments, 1, 1);
            var refnode = Sk.builtin.checkIterable(type) ? Sk.ffi.remapToJs(type) : [ Sk.ffi.remapToJs(type) ];
            return refnode.forEach(function(n) {
                return item.add(n);
            }), Sk.builtin.none.none$;
        },
        set_allowed: function(type) {
            apply(), Sk.builtin.pyCheckArgs("set_allowed", arguments, 1, 1);
            var refnode = Sk.builtin.checkIterable(type) ? Sk.ffi.remapToJs(type) : [ Sk.ffi.remapToJs(type) ];
            return refnode.forEach(function(n) {
                return value.add(n);
            }), Sk.builtin.none.none$;
        },
        get_blocked: function(a) {
            apply(), Sk.builtin.pyCheckArgs("get_blocked", arguments, 1, 1);
            var arg = Sk.ffi.remapToJs(a);
            return Sk.ffi.remapToPy(item.has(arg));
        },
        EventType: QTip,
        _PYGAME_C_API: QTip
    }, constant = {
        __doc__: "Set of functions from PyGame that are handy to have in\nthe local namespace for your module",
        __name__: "pygame.locals",
        __package__: "pygame",
        ACTIVEEVENT: 1,
        ANYFORMAT: 268435456,
        ASYNCBLIT: 4,
        AUDIO_S16: 32784,
        AUDIO_S16LSB: 32784,
        AUDIO_S16MSB: 36880,
        AUDIO_S16SYS: 32784,
        AUDIO_S8: 32776,
        AUDIO_U16: 16,
        AUDIO_U16LSB: 16,
        AUDIO_U16MSB: 4112,
        AUDIO_U16SYS: 16,
        AUDIO_U8: 8,
        BIG_ENDIAN: 4321,
        BLEND_ADD: 1,
        BLEND_MAX: 5,
        BLEND_MIN: 4,
        BLEND_MULT: 3,
        BLEND_PREMULTIPLIED: 17,
        BLEND_RGBA_ADD: 6,
        BLEND_RGBA_MAX: 16,
        BLEND_RGBA_MIN: 9,
        BLEND_RGBA_MULT: 8,
        BLEND_RGBA_SUB: 7,
        BLEND_RGB_ADD: 1,
        BLEND_RGB_MAX: 5,
        BLEND_RGB_MIN: 4,
        BLEND_RGB_MULT: 3,
        BLEND_RGB_SUB: 2,
        BLEND_SUB: 2,
        BUTTON_X1: 6,
        BUTTON_X2: 7,
        DOUBLEBUF: 1073741824,
        FULLSCREEN: -2147483648,
        GL_ACCELERATED_VISUAL: 15,
        GL_ACCUM_ALPHA_SIZE: 11,
        GL_ACCUM_BLUE_SIZE: 10,
        GL_ACCUM_GREEN_SIZE: 9,
        GL_ACCUM_RED_SIZE: 8,
        GL_ALPHA_SIZE: 3,
        GL_BLUE_SIZE: 2,
        GL_BUFFER_SIZE: 4,
        GL_DEPTH_SIZE: 6,
        GL_DOUBLEBUFFER: 5,
        GL_GREEN_SIZE: 1,
        GL_MULTISAMPLEBUFFERS: 13,
        GL_MULTISAMPLESAMPLES: 14,
        GL_RED_SIZE: 0,
        GL_STENCIL_SIZE: 7,
        GL_STEREO: 12,
        GL_SWAP_CONTROL: 16,
        HAT_CENTERED: 0,
        HAT_DOWN: 4,
        HAT_LEFT: 8,
        HAT_LEFTDOWN: 12,
        HAT_LEFTUP: 9,
        HAT_RIGHT: 2,
        HAT_RIGHTDOWN: 6,
        HAT_RIGHTUP: 3,
        HAT_UP: 1,
        HWACCEL: 256,
        HWPALETTE: 536870912,
        HWSURFACE: 1,
        IYUV_OVERLAY: 1448433993,
        JOYAXISMOTION: 7,
        JOYBALLMOTION: 8,
        JOYBUTTONDOWN: 10,
        JOYBUTTONUP: 11,
        JOYHATMOTION: 9,
        KEYDOWN: 2,
        KEYUP: 3,
        KMOD_ALT: 768,
        KMOD_CAPS: 8192,
        KMOD_CTRL: 192,
        KMOD_LALT: 256,
        KMOD_LCTRL: 64,
        KMOD_LMETA: 1024,
        KMOD_LSHIFT: 1,
        KMOD_META: 3072,
        KMOD_MODE: 16384,
        KMOD_NONE: 0,
        KMOD_NUM: 4096,
        KMOD_RALT: 512,
        KMOD_RCTRL: 128,
        KMOD_RMETA: 2048,
        KMOD_RSHIFT: 2,
        KMOD_SHIFT: 3,
        K_0: 48,
        K_1: 49,
        K_2: 50,
        K_3: 51,
        K_4: 52,
        K_5: 53,
        K_6: 54,
        K_7: 55,
        K_8: 56,
        K_9: 57,
        K_AMPERSAND: 38,
        K_ASTERISK: 42,
        K_AT: 64,
        K_BACKQUOTE: 96,
        K_BACKSLASH: 92,
        K_BACKSPACE: 8,
        K_BREAK: 318,
        K_CAPSLOCK: 301,
        K_CARET: 94,
        K_CLEAR: 12,
        K_COLON: 58,
        K_COMMA: 44,
        K_DELETE: 127,
        K_DOLLAR: 36,
        K_DOWN: 274,
        K_END: 279,
        K_EQUALS: 61,
        K_ESCAPE: 27,
        K_EURO: 321,
        K_EXCLAIM: 33,
        K_F1: 282,
        K_F10: 291,
        K_F11: 292,
        K_F12: 293,
        K_F13: 294,
        K_F14: 295,
        K_F15: 296,
        K_F2: 283,
        K_F3: 284,
        K_F4: 285,
        K_F5: 286,
        K_F6: 287,
        K_F7: 288,
        K_F8: 289,
        K_F9: 290,
        K_FIRST: 0,
        K_GREATER: 62,
        K_HASH: 35,
        K_HELP: 315,
        K_HOME: 278,
        K_INSERT: 277,
        K_KP0: 256,
        K_KP1: 257,
        K_KP2: 258,
        K_KP3: 259,
        K_KP4: 260,
        K_KP5: 261,
        K_KP6: 262,
        K_KP7: 263,
        K_KP8: 264,
        K_KP9: 265,
        K_KP_DIVIDE: 267,
        K_KP_ENTER: 271,
        K_KP_EQUALS: 272,
        K_KP_MINUS: 269,
        K_KP_MULTIPLY: 268,
        K_KP_PERIOD: 266,
        K_KP_PLUS: 270,
        K_LALT: 308,
        K_LAST: 323,
        K_LCTRL: 306,
        K_LEFT: 276,
        K_LEFTBRACKET: 91,
        K_LEFTPAREN: 40,
        K_LESS: 60,
        K_LMETA: 310,
        K_LSHIFT: 304,
        K_LSUPER: 311,
        K_MENU: 319,
        K_MINUS: 45,
        K_MODE: 313,
        K_NUMLOCK: 300,
        K_PAGEDOWN: 281,
        K_PAGEUP: 280,
        K_PAUSE: 19,
        K_PERIOD: 46,
        K_PLUS: 43,
        K_POWER: 320,
        K_PRINT: 316,
        K_QUESTION: 63,
        K_QUOTE: 39,
        K_QUOTEDBL: 34,
        K_RALT: 307,
        K_RCTRL: 305,
        K_RETURN: 13,
        K_RIGHT: 275,
        K_RIGHTBRACKET: 93,
        K_RIGHTPAREN: 41,
        K_RMETA: 309,
        K_RSHIFT: 303,
        K_RSUPER: 312,
        K_SCROLLOCK: 302,
        K_SEMICOLON: 59,
        K_SLASH: 47,
        K_SPACE: 32,
        K_SYSREQ: 317,
        K_TAB: 9,
        K_UNDERSCORE: 95,
        K_UNKNOWN: 0,
        K_UP: 273,
        K_a: 97,
        K_b: 98,
        K_c: 99,
        K_d: 100,
        K_e: 101,
        K_f: 102,
        K_g: 103,
        K_h: 104,
        K_i: 105,
        K_j: 106,
        K_k: 107,
        K_l: 108,
        K_m: 109,
        K_n: 110,
        K_o: 111,
        K_p: 112,
        K_q: 113,
        K_r: 114,
        K_s: 115,
        K_t: 116,
        K_u: 117,
        K_v: 118,
        K_w: 119,
        K_x: 120,
        K_y: 121,
        K_z: 122,
        LIL_ENDIAN: 1234,
        MOUSEBUTTONDOWN: 5,
        MOUSEBUTTONUP: 6,
        MOUSEMOTION: 4,
        NOEVENT: 0,
        NOFRAME: 32,
        NUMEVENTS: 32,
        OPENGL: 2,
        OPENGLBLIT: 10,
        PREALLOC: 16777216,
        QUIT: 12,
        RESIZABLE: 16,
        RLEACCEL: 16384,
        RLEACCELOK: 8192,
        SCRAP_BMP: "image/bmp",
        SCRAP_CLIPBOARD: 0,
        SCRAP_PBM: "image/pbm",
        SCRAP_PPM: "image/ppm",
        SCRAP_SELECTION: 1,
        SCRAP_TEXT: "text/plain",
        SRCALPHA: 65536,
        SRCCOLORKEY: 4096,
        SWSURFACE: 0,
        SYSWMEVENT: 13,
        TIMER_RESOLUTION: 10,
        USEREVENT: 24,
        USEREVENT_DROPFILE: 4096,
        UYVY_OVERLAY: 1498831189,
        VIDEOEXPOSE: 17,
        VIDEORESIZE: 16,
        YUY2_OVERLAY: 844715353,
        YV12_OVERLAY: 842094169,
        YVYU_OVERLAY: 1431918169
    }, padding = {
        0: "NoEvent",
        1: "ActiveEvent",
        2: "KeyDown",
        3: "KeyUp",
        4: "MouseMotion",
        5: "MouseButtonDown",
        6: "MouseButtonUp",
        7: "JoyAxisMotion",
        8: "JoyBallMotion",
        9: "JoyHatMotion",
        10: "JoyButtonDown",
        11: "JoyButtonUp",
        12: "Quit",
        13: "SysWMEvent",
        16: "VideoResize",
        17: "VideoExpose",
        24: "UserEvent",
        27: "UserEvent"
    }, label = {
        keyup: constant.KEYUP,
        keydown: constant.KEYDOWN
    }, end = {
        AltLeft: constant.K_LALT,
        AltRight: constant.K_RALT,
        ControlLeft: constant.K_LCTRL,
        ControlRight: constant.K_LCTRL,
        MetaLeft: constant.K_LMETA,
        MetaRight: constant.K_RMETA,
        ShiftLeft: constant.K_LSHIFT,
        ShiftRight: constant.K_RSHIFT,
        CapsLock: constant.K_CAPSLOCK,
        Escape: constant.K_ESCAPE,
        F1: constant.K_F1,
        F2: constant.K_F2,
        F3: constant.K_F3,
        F4: constant.K_F4,
        F5: constant.K_F5,
        F6: constant.K_F6,
        F7: constant.K_F7,
        F8: constant.K_F8,
        F9: constant.K_F9,
        F10: constant.K_F10,
        F11: constant.K_F11,
        F12: constant.K_F12,
        ArrowUp: constant.K_UP,
        ArrowLeft: constant.K_LEFT,
        ArrowRight: constant.K_RIGHT,
        ArrowDown: constant.K_DOWN,
        Semicolon: constant.K_SEMICOLON,
        Quote: constant.K_QUOTE,
        BracketRight: constant.K_RIGHTBRACKET,
        BracketLeft: constant.K_LEFTBRACKET,
        Digit0: constant.K_0,
        Digit1: constant.K_1,
        Digit2: constant.K_2,
        Digit3: constant.K_3,
        Digit4: constant.K_4,
        Digit5: constant.K_5,
        Digit6: constant.K_6,
        Digit7: constant.K_7,
        Digit8: constant.K_8,
        Digit9: constant.K_9,
        Backspace: constant.K_BACKSPACE,
        Enter: constant.K_RETURN,
        Tab: constant.K_TAB,
        Space: constant.K_SPACE,
        Comma: constant.K_COMMA,
        Period: constant.K_PERIOD,
        Slash: constant.K_SLASH,
        Backslash: constant.K_BACKSLASH,
        IntlBackslash: constant.K_BACKQUOTE,
        Minus: constant.K_MINUS,
        Equals: constant.K_EQUALS,
        KeyQ: constant.K_q,
        KeyW: constant.K_w,
        KeyE: constant.K_e,
        KeyR: constant.K_r,
        KeyT: constant.K_t,
        KeyY: constant.K_y,
        KeyU: constant.K_u,
        KeyI: constant.K_i,
        KeyO: constant.K_o,
        KeyP: constant.K_p,
        KeyA: constant.K_a,
        KeyS: constant.K_s,
        KeyD: constant.K_d,
        KeyF: constant.K_f,
        KeyG: constant.K_g,
        KeyH: constant.K_h,
        KeyJ: constant.K_j,
        KeyK: constant.K_k,
        KeyL: constant.K_l,
        KeyZ: constant.K_z,
        KeyX: constant.K_x,
        KeyC: constant.K_c,
        KeyV: constant.K_v,
        KeyB: constant.K_b,
        KeyN: constant.K_n,
        KeyM: constant.K_m,
        Backquote: 160
    }, keys = {
        KeyA: 0,
        KeyS: 1,
        KeyD: 2,
        KeyF: 3,
        KeyH: 4,
        KeyG: 5,
        KeyZ: 6,
        KeyX: 7,
        KeyC: 8,
        KeyV: 9,
        Backquote: 10,
        KeyB: 11,
        KeyQ: 12,
        KeyW: 13,
        KeyE: 14,
        KeyR: 15,
        KeyY: 16,
        KeyT: 17,
        Digit1: 18,
        Digit2: 19,
        Digit3: 20,
        Digit4: 21,
        Digit6: 22,
        Digit5: 23,
        Equals: 24,
        Digit9: 25,
        Digit7: 26,
        Minus: 27,
        Digit8: 28,
        Digit0: 29,
        BracketRight: 30,
        KeyO: 31,
        KeyU: 32,
        BracketLeft: 33,
        KeyI: 34,
        KeyP: 35,
        Enter: 36,
        KeyL: 37,
        KeyJ: 38,
        Quote: 39,
        KeyK: 40,
        Semicolon: 41,
        Backslash: 42,
        Comma: 43,
        Slash: 44,
        KeyN: 45,
        KeyM: 46,
        Period: 47,
        Tab: 48,
        Space: 49,
        IntlBackslash: 50,
        Backspace: 51,
        Escape: 53,
        F5: 96,
        F6: 97,
        F7: 98,
        F3: 99,
        F8: 100,
        F9: 101,
        F10: 109,
        F11: 110,
        F12: 111,
        F4: 118,
        F2: 120,
        F1: 122,
        ArrowLeft: 123,
        ArrowRight: 124,
        ArrowDown: 125,
        ArrowUp: 126
    }, c = 0, assertEquals = function(a, b) {
        return a.getModifierState("CapsLock") ? b + 8192 : b;
    }, segmenter = {
        "shift,16,1": "ShiftLeft",
        "shift,16,2": "ShiftRight",
        "control,17,1": "ControlLeft",
        "control,17,2": "ControlRight",
        "alt,18,1": "AltLeft",
        "alt,18,2": "AltRight",
        "win,91,1": "MetaLeft",
        "win,91,2": "MetaRight",
        "f12,123,0": "F12",
        "f11,122,0": "F11",
        "f10,121,0": "F10",
        "f9,120,0": "F9",
        "f8,119,0": "F8",
        "f7,118,0": "F7",
        "f6,117,0": "F6",
        "f5,116,0": "F5",
        "f4,115,0": "F4",
        "f3,114,0": "F3",
        "f2,113,0": "F2",
        "f1,112,0": "F1",
        "esc,27,0": "Escape",
        "enter,13,0": "Enter",
        "capslock,20,0": "CapsLock",
        "tab,9,0": "Tab",
        "backspace,8,0": "Backspace",
        "down,40,0": "ArrowDown",
        "right,39,0": "ArrowRight",
        "up,38,0": "ArrowUp",
        "left,37,0": "ArrowLeft",
        "=,187,0": "Equals",
        "-,189,0": "Minus",
        "0,48,0": "Digit0",
        "9,57,0": "Digit9",
        "8,56,0": "Digit8",
        "7,55,0": "Digit7",
        "6,54,0": "Digit6",
        "5,53,0": "Digit5",
        "4,52,0": "Digit4",
        "3,51,0": "Digit3",
        "2,50,0": "Digit2",
        "1,49,0": "Digit1",
        "`,192,0": "IntlBackslash",
        "/,191,0": "Slash",
        ".,190,0": "Period",
        ",,188,0": "Comma",
        "m,77,0": "KeyM",
        "n,78,0": "KeyN",
        "b,66,0": "KeyB",
        "v,86,0": "KeyV",
        "c,67,0": "KeyC",
        "x,88,0": "KeyX",
        "z,90,0": "KeyZ",
        ",226,0": "BackSlash",
        ",220,0": "BackSlash",
        "',222,0": "Quote",
        ";,186,0": "SemiColon",
        "l,76,0": "KeyL",
        "k,75,0": "KeyK",
        "j,74,0": "KeyJ",
        "h,72,0": "KeyH",
        "g,71,0": "KeyG",
        "f,70,0": "KeyF",
        "d,68,0": "KeyD",
        "s,83,0": "KeyS",
        "a,65,0": "KeyA",
        "],221,0": "BracketRight",
        "[,219,0": "BracketLeft",
        "p,80,0": "KeyP",
        "o,79,0": "KeyO",
        "i,73,0": "KeyI",
        "u,85,0": "KeyU",
        "y,89,0": "KeyY",
        "t,84,0": "KeyT",
        "r,82,0": "KeyR",
        "e,69,0": "KeyE",
        "w,87,0": "KeyW",
        "q,81,0": "KeyQ"
    }, node = "undefined" != typeof window ? window : global, clamp = function(x, min) {
        var temp = node.listeners && node.listeners[x] && node.listeners[x].indexOf(min) > -1;
        return temp;
    }, lastBBox = {
        init: function(a, b, c, d) {
            var self = b || function() {
                return !0;
            };
            on(addTest(self), c, d), Sk.externalLibraries = Sk.externalLibraries || {}, push(Sk.externalLibraries, {
                pygame: {
                    path: a + "/__init__.js"
                },
                "pygame.locals": {
                    path: a + "/locals.js"
                },
                "pygame.display": {
                    path: a + "/display.js"
                },
                "pygame.event": {
                    path: a + "/event.js"
                }
            }), flush();
        },
        main: function() {
            return exit(), size(), concat(render(map(unique({
                init: function() {
                    return getObject(), new Sk.builtin.tuple([ 6, 0 ]);
                },
                quit: foo,
                error: QTip,
                get_error: QTip,
                set_error: QTip,
                get_sdl_version: QTip,
                get_sql_byteorder: QTip,
                register_quie: QTip,
                encode_string: QTip,
                encode_file_quit: QTip,
                locals: get(constant),
                event: get(p())
            }, constant))));
        },
        locals: concat(constant),
        display: concat(call),
        event: concat(p),
        Sk: Sk,
        eventIsOf: callback
    };
    return lastBBox;
}), function(node) {
    node["export"]("sendSignalToSkulpt", function(e) {
        null != Sk.signals && null != Sk.signals.signal && Sk.signals.signal(e);
    });
}(window.GadgetIO), function(layer) {
    function self() {
        this._eventListeners, this._eventQueue = [], this._threadHandler = null, this._isDownDict = {}, 
        this._signal = result;
    }
    function load(event) {
        var buffer, k, i;
        obj[event.which] ? (event.preventDefault(), buffer = "", i = slice(event.which), 
        k = obj[i].keyword, layer.runtime("usingSenseHat3d") ? ($("#_sense_hat_joystick_").removeClass(val).addClass(obj[i].transform), 
        $("#_astro_pi_joystick_top_").removeClass(val).addClass(obj[i].transform), $("#_astro_pi_joystick_base_").removeClass(val).addClass(obj[i].transform), 
        val = obj[i].transform) : ($("#_sense_hat" + l).hide(), $("#_sense_hat" + obj[i].state).show(), 
        l = obj[i].state), Sk.sense_hat.sensestick.isKeyDown(k) ? buffer = self.STATE_HOLD : Sk.sense_hat.sensestick.addKeyDownEventToDict(k), 
        window.sense_hat.sensestick.push(obj[i].key, buffer || self.STATE_PRESS)) : event.ctrlKey && "c" === String.fromCharCode(event.which).toLowerCase() ? $(document).trigger("gadget.code.stop") : layer.runtime("usingSenseHat3d") && "astro-pi" === layer.runtime("sense_hat_enclosure") && collection[event.which] && (k = collection[event.which].key, 
        $("#_astro_pi_button_" + k + "_").addClass(types));
    }
    function close(event) {
        var pos, i;
        obj[event.which] ? (event.preventDefault(), i = slice(event.which), pos = obj[i].keyword, 
        layer.runtime("usingSenseHat3d") ? ($("#_sense_hat_joystick_").removeClass(val).addClass(index), 
        $("#_astro_pi_joystick_top_").removeClass(val).addClass(index), $("#_astro_pi_joystick_base_").removeClass(val).addClass(index), 
        val = index) : ($("#_sense_hat" + l).hide(), $("#_sense_hat_joystick_rest_").show(), 
        l = "_joystick_rest_"), Sk.sense_hat.sensestick.removeKeyDownEventFromDict(pos), 
        window.sense_hat.sensestick.push(obj[i].key, self.STATE_RELEASE)) : layer.runtime("usingSenseHat3d") && "astro-pi" === layer.runtime("sense_hat_enclosure") && collection[event.which] && (pos = collection[event.which].key, 
        $("#_astro_pi_button_" + pos + "_").removeClass(types));
    }
    function init(event) {
        var e, _key, i, k;
        obj[event.which] ? (event.preventDefault(), e = "", i = slice(event.which), _key = obj[i].keyword, 
        k = layer.runtime("sense_hat_enclosure") || "sense-hat", k = "sense-hat" === k ? "_sense_hat" : "_astro_pi", 
        $("#" + k + l).hide(), $("#" + k + obj[i].state).show(), l = obj[i].state, Sk.sense_hat.sensestick.isKeyDown(_key) ? e = self.STATE_HOLD : Sk.sense_hat.sensestick.addKeyDownEventToDict(_key), 
        window.sense_hat.sensestick.push(obj[i].key, e || self.STATE_PRESS)) : event.ctrlKey && "c" === String.fromCharCode(event.which).toLowerCase() ? $(document).trigger("gadget.code.stop") : layer.runtime("usingSenseHat3d") && "astro-pi" === layer.runtime("sense_hat_enclosure") && collection[event.which] && (_key = collection[event.which].key, 
        $("#_astro_pi_button_" + _key + "_rest_").hide(), $("#_astro_pi_button_" + _key + "_pressed_").show());
    }
    function f(event) {
        var result, i, k;
        obj[event.which] ? (event.preventDefault(), i = slice(event.which), result = obj[i].keyword, 
        k = layer.runtime("sense_hat_enclosure") || "sense-hat", k = "sense-hat" === k ? "_sense_hat" : "_astro_pi", 
        $("#" + k + l).hide(), $("#" + k + "_joystick_rest_").show(), l = "_joystick_rest_", 
        Sk.sense_hat.sensestick.removeKeyDownEventFromDict(result), window.sense_hat.sensestick.push(obj[i].key, self.STATE_RELEASE)) : layer.runtime("usingSenseHat3d") && "astro-pi" === layer.runtime("sense_hat_enclosure") && collection[event.which] && (result = collection[event.which].key, 
        $("#_astro_pi_button_" + result + "_pressed_").hide(), $("#_astro_pi_button_" + result + "_rest_").show());
    }
    function slice(val) {
        var a;
        return "Enter" === obj[val].keyword ? val : (a = Math.abs($("#sense_hat_angle").val()), 
        a && (val += a / 90, val > 40 && (val -= 4)), val);
    }
    function setup() {
        var result = layer.runtime("usingSenseHatFlat") ? !0 : !1;
        if (!layer.runtime("usingSenseHat3d") || result) {
            var eventHandlers = [ "_sense_hat" ], ps = [ "_joystick_enter_", "_joystick_up_", "_joystick_down_", "_joystick_left_", "_joystick_right_" ], ratio = [ "_joystick_rest_" ];
            result && eventHandlers.push("_astro_pi"), eventHandlers.forEach(function(h) {
                ps.forEach(function(n) {
                    $("#" + h + n).hide();
                }), ratio.forEach(function(n) {
                    $("#" + h + n).show();
                });
            });
        }
        result ? (i = init, j = f) : (i = load, j = close), $(document).on("keydown", "#sense-hat-listener", i), 
        $(document).on("keyup", "#sense-hat-listener", j);
    }
    !function(extend) {
        extend.eventEmitter = {
            _JQInit: function() {
                this._JQ = extend(this);
            },
            emit: function(type, data) {
                !this._JQ && this._JQInit(), this._JQ.trigger(type, data);
            },
            once: function(type, fn) {
                !this._JQ && this._JQInit(), this._JQ.one(type, fn);
            },
            on: function(a, b) {
                !this._JQ && this._JQInit(), this._JQ.bind(a, b);
            },
            off: function(a, b) {
                !this._JQ && this._JQInit(), this._JQ.unbind(a, b);
            }
        };
    }($);
    var result = layer["import"]("sendSignalToSkulpt");
    $.extend(self.prototype, jQuery.eventEmitter), self.prototype.triggerKeyboardInterrupt = function() {
        this.emit("sensestick.input", {
            type: "keyboardinterrupt"
        });
    }, self.prototype.addKeyDownEventToDict = function(uniqueId) {
        this._isDownDict[uniqueId] = !0;
    }, self.prototype.removeKeyDownEventFromDict = function(uniqueId) {
        delete this._isDownDict[uniqueId];
    }, self.prototype.isKeyDown = function(keyCode) {
        return this._isDownDict[keyCode] === !0;
    }, self.prototype.push = function(x, c, o) {
        var val = {
            type: null != o ? parseInt(o) : self.EV_KEY,
            key: parseInt(x),
            state: parseInt(c),
            timestamp: Date.now()
        };
        this._eventQueue.push(val), this.emit("sensestick.input", val);
    }, self.prototype.destroy = function() {
        this._threadHandler && this.off("sensestick.input", this._threadHandler), $(document).off("keydown", "#sense-hat-listener", i), 
        $(document).off("keyup", "#sense-hat-listener", j), this._isDownDict = {}, this._eventQueue = [];
    }, self.EV_KEY = 1, self.STATE_RELEASE = 0, self.STATE_PRESS = 1, self.STATE_HOLD = 2, 
    self.KEY_UP = 103, self.KEY_LEFT = 105, self.KEY_RIGHT = 106, self.KEY_DOWN = 108, 
    self.KEY_ENTER = 28;
    var i, j, l = "_joystick_rest_", index = "rest", val = index, types = "pressed", obj = {
        13: {
            state: "_joystick_enter_",
            key: self.KEY_ENTER,
            keyword: "Enter",
            transform: "enter"
        },
        37: {
            state: "_joystick_left_",
            key: self.KEY_LEFT,
            keyword: "ArrowLeft",
            transform: "left"
        },
        38: {
            state: "_joystick_up_",
            key: self.KEY_UP,
            keyword: "ArrowUp",
            transform: "up"
        },
        39: {
            state: "_joystick_right_",
            key: self.KEY_RIGHT,
            keyword: "ArrowRight",
            transform: "right"
        },
        40: {
            state: "_joystick_down_",
            key: self.KEY_DOWN,
            keyword: "ArrowDown",
            transform: "down"
        }
    }, collection = {
        65: {
            key: "a"
        },
        66: {
            key: "b"
        },
        68: {
            key: "d"
        },
        76: {
            key: "l"
        },
        82: {
            key: "r"
        },
        85: {
            key: "u"
        }
    };
    layer["export"]("python.sense-stick", {
        initJoystick: setup,
        SenseStickDevice: self
    });
}(window.GadgetIO), function(win, doc) {
    function round() {
        var n = Date.now(), m = 1e3 * n;
        return m;
    }
    function rotate(val) {
        return 0 > val && (val += 360), Math.round(10 * val) / 10 % 361;
    }
    function fn(target) {
        win.sense_hat.rtimu.raw_orientation = target.asArray();
        var i, l, r, c, b = {
            pitch: rotate(target.pitch),
            roll: rotate(target.roll),
            yaw: rotate(target.yaw),
            rotation_matrix: target.matrix
        };
        for (i = 0; len > i; i++) c = data[i], l = "sense-hat-" + c, r = "sense_hat_" + c, 
        $("span." + l).length && $("span." + l).html(b[c]), $("#" + r).val(b[c]).change();
    }
    function f() {
        var n = win.sense_hat.rtimu.timestamp;
        (null === n || void 0 === n) && (n = round());
        var index = round(), length = (index - n) / 1e6;
        0 === length && (length = 1);
        var v2 = win.sense_hat.rtimu.raw_old_orientation, color = Geometry.degToRad(win.sense_hat.rtimu.raw_orientation), value = [ color[0] - v2[0], color[1] - v2[1], color[2] - v2[2] ];
        value = Geometry.divideArrayWithScalar(value, length);
        var r = color[0], g = color[1], b = color[2], y = Math.cos(b), c = Math.cos(g), a = Math.cos(r), x = Math.sin(b), t = Math.sin(g), w = Math.sin(r), i = [ [ y * c, y * t * w - a * x, x * w + y * a * t ], [ c * x, y * a + x * t * w, a * x * t - y * w ], [ -t, c * w, c * a ] ], j = Geometry.transpose3x3Matrix(i), s = Geometry.dot3x3and3x1(j, Geometry.Defaults.GRAVITY), d = Geometry.dot3x3and3x1(j, Geometry.Defaults.NORTH);
        win.sense_hat.rtimu.raw_old_orientation = color, win.sense_hat.rtimu.fusionPose = color, 
        win.sense_hat.rtimu.timestamp = index, s = pad(s, .1), win.sense_hat.rtimu.accel = [ Geometry.clamp(s[0], -8, 8), Geometry.clamp(s[1], -8, 8), Geometry.clamp(s[2], -8, 8) ], 
        value = pad(value, .5), win.sense_hat.rtimu.gyro = [ value[0], value[1], value[2] ], 
        d = pad(d, .01), win.sense_hat.rtimu.compass = [ 100 * d[0], 100 * d[1], 100 * d[2] ];
    }
    function pad(value, radix, len) {
        null == len && (len = 5);
        for (var p = [ 0, 0, 0 ], i = 0; len > i; i++) p[0] += toString(value[0], radix), 
        p[1] += toString(value[1], radix), p[2] += toString(value[2], radix);
        return p[0] /= len, p[1] /= len, p[2] /= len, p;
    }
    function test() {
        if (this.haveNextNextGaussian) return this.haveNextNextGaussian = !1, this.nextNextGaussian;
        var a, b, r;
        do a = 2 * Math.random() - 1, b = 2 * Math.random() - 1, r = a * a + b * b; while (r >= 1 || 0 === r);
        var d = Math.sqrt(-2 * Math.log(r) / r);
        return this.nextNextGaussian = b * d, this.haveNextNextGaussian = !0, a * d;
    }
    function toString(a, x, success) {
        var b = .2 * test(), t = a + b * x;
        return success && console.info("mean: ", a, b, x, " rg:", t), t;
    }
    function difference(a, b) {
        var t = test(), g = a + t * b, r = a + b, i = a - b;
        return Math.min(Math.max(i, g), r);
    }
    function Color(value, roll, yaw, b) {
        this.pitch = value, this.roll = roll, this.yaw = yaw, this.matrix = b;
    }
    function build() {
        self = $(".orientation-stage"), l = $(".orientation-layer"), el = $("#orientation-reset-btn"), 
        node = $("#enclosure-toggle"), doc.runtime("mission-zero") && $("#enclosure-toggle-container").hide();
        var i, v;
        for (i = 0; i < data.length; i++) v = "sense_hat_" + data[i], $("#" + v).data("skip-trigger", !0), 
        "undefined" != typeof doc.runtime(v) && ($("#" + v).val(doc.runtime(v)), doc.runtime(v, void 0));
        var r = $("#sense_hat_pitch").val(), g = $("#sense_hat_roll").val(), b = $("#sense_hat_yaw").val(), a = parseInt($("#sense_hat_angle").val()), val = $("#sense_hat_rotation_matrix").val();
        win.requestAnimationFrame(function() {
            var that = {
                stage: "orientation-stage",
                rotationCallback: function(rgb) {
                    var cStyle = win.getComputedStyle(l.get(0), null), a = cStyle.getPropertyValue(key + "transform");
                    fn(new Color(rgb.pitch, rgb.roll, -rgb.yaw, a));
                }
            };
            val ? (l.get(0).style.webkitTransform = val, l.get(0).style.transform = val, fn(new Color(r, g, b, val))) : a ? (that.axis = [ 0, 0, 1 ], 
            270 === a ? a = 180 : 180 === a ? a = 270 : 90 === a && (a = 0), that.angle = Geometry.degToRad(a), 
            fn(new Color(0, 0, a))) : (that.axis = [ 0, 0, 1 ], that.angle = Geometry.degToRad(b), 
            fn(new Color(0, 0, b))), prop = new Traqball(that);
        }), el.on("click", function(e) {
            e.preventDefault();
            var f, r = 0, g = 0, b = 90, a = [ 0, 0, 1 ];
            "astro-pi" === doc.runtime("sense_hat_enclosure") && (b = 180, a[0] = 0, a[2] = 1), 
            f = Geometry.degToRad(b);
            var c = new Color(r, g, b);
            prop.stop(function() {
                prop.setup({
                    axis: a,
                    angle: f
                }), fn(c);
            });
        }), doc.runtime("sense_hat_enclosure") && "sense-hat" !== doc.runtime("sense_hat_enclosure") ? doc.runtime("sense_hat_enclosure", "sense-hat") : doc.runtime("sense_hat_enclosure", "astro-pi"), 
        $("#sense_hat_enclosure").data("skip-trigger", !0);
        var handler1 = doc.runtime("usingSenseHatFlat") ? update : render;
        handler1(), node.on("click", handler1);
    }
    function render(inc) {
        var sandbox = document.getElementById("_sense_hat_");
        "sense-hat" === doc.runtime("sense_hat_enclosure") ? (sandbox.setAttribute("viewBox", "22 0 460 445"), 
        $("#_sense_hat_wrapper_").addClass("hide"), $("#_astro_pi_wrapper_").removeClass("hide"), 
        doc.runtime("sense_hat_enclosure", "astro-pi"), $("#enclosure-toggle").attr("src", "https://gadget-app-assets.gadget.io/sense-hat-v0/sense-hat-top.png")) : (sandbox.setAttribute("viewBox", "22 85 460 315"), 
        $("#_sense_hat_wrapper_").removeClass("hide"), $("#_astro_pi_wrapper_").addClass("hide"), 
        doc.runtime("sense_hat_enclosure", "sense-hat"), $("#enclosure-toggle").attr("src", "https://gadget-app-assets.gadget.io/sense-hat-v0/astro-pi-top.png")), 
        init(), $("#sense_hat_enclosure").val(doc.runtime("sense_hat_enclosure")).trigger("change");
    }
    function update() {
        var me = document.getElementById("_sense_hat_"), c = document.getElementById("_sense_hat_bottom_"), data = $("#sense-hat-enclosure").attr("class") ? $("#sense-hat-enclosure").attr("class").split(/\s+/) : [], i = data.indexOf("hide"), item = $("#_sense_hat_leds_").attr("class") ? $("#_sense_hat_leds_").attr("class").split(/\s+/) : [], n = item.indexOf("hide"), s = $("#_sense_hat_joystick_").attr("class") ? $("#_sense_hat_joystick_").attr("class").split(/\s+/) : [], l = s.indexOf("hide"), k = $("#_sense_hat_back_").attr("class") ? $("#_sense_hat_back_").attr("class").split(/\s+/) : [], j = k.indexOf("hide"), x = $("#astro-pi-enclosure").attr("class") ? $("#astro-pi-enclosure").attr("class").split(/\s+/) : [], y = x.indexOf("hide"), list = $("#_astro_pi_back_").attr("class") ? $("#_astro_pi_back_").attr("class").split(/\s+/) : [], index = list.indexOf("hide");
        "sense-hat" === doc.runtime("sense_hat_enclosure") ? (me.setAttribute("viewBox", "22 0 460 445"), 
        c.setAttribute("viewBox", "22 0 460 445"), 0 > i && (data.push("hide"), $("#sense-hat-enclosure").attr("class", data.join(" "))), 
        0 > n && (item.push("hide"), $("#_sense_hat_leds_").attr("class", item.join(" "))), 
        0 > l && (s.push("hide"), $("#_sense_hat_joystick_").attr("class", s.join(" "))), 
        0 > j && (k.push("hide"), $("#_sense_hat_back_").attr("class", k.join(" "))), y >= 0 && (x.splice(y, 1), 
        $("#astro-pi-enclosure").attr("class", x.join(" "))), index >= 0 && (list.splice(index, 1), 
        $("#_astro_pi_back_").attr("class", list.join(" "))), doc.runtime("sense_hat_enclosure", "astro-pi"), 
        $("#enclosure-toggle").attr("src", "https://gadget-app-assets.gadget.io/sense-hat-v0/sense-hat-top.png")) : (me.setAttribute("viewBox", "22 85 460 315"), 
        c.setAttribute("viewBox", "22 85 460 315"), i >= 0 && (data.splice(i, 1), $("#sense-hat-enclosure").attr("class", data.join(" "))), 
        n >= 0 && (item.splice(n, 1), $("#_sense_hat_leds_").attr("class", item.join(" "))), 
        l >= 0 && (s.splice(l, 1), $("#_sense_hat_joystick_").attr("class", s.join(" "))), 
        j >= 0 && (k.splice(j, 1), $("#_sense_hat_back_").attr("class", k.join(" "))), 0 > y && (x.push("hide"), 
        $("#astro-pi-enclosure").attr("class", x.join(" "))), 0 > index && (list.push("hide"), 
        $("#_astro_pi_back_").attr("class", list.join(" "))), doc.runtime("sense_hat_enclosure", "sense-hat"), 
        $("#enclosure-toggle").attr("src", "https://gadget-app-assets.gadget.io/sense-hat-v0/astro-pi-top.png")), 
        viewport(), init(), $("#sense_hat_enclosure").val(doc.runtime("sense_hat_enclosure")).trigger("change");
    }
    function viewport() {
        var w = $(".orientation-box").width(), h = $("#_sense_hat_").height(), d = "rotateY(180deg)";
        $(".orientation-box").css({
            width: w + "px",
            height: h + "px"
        }), $(".orientation-front").css({
            width: w + "px",
            height: h + "px"
        }), "astro-pi" !== doc.runtime("sense_hat_enclosure") && (d += " rotateZ(180deg)"), 
        $(".orientation-back").css({
            width: w + "px",
            height: h + "px",
            transform: d,
            msTransform: d
        });
    }
    function init() {
        if (win.sense_hat && win.sense_hat.pixels) {
            var me, data, x, y, height = 47, h = height, i = .4, l = 180, w = 255, position = 0, offset = 0, j = 0, len = 1, status = 1;
            for (me = 0; me < win.sense_hat.pixels.length; me++) if (position = 0, offset = 0, 
            j = 0, len = 1, status = 1, data = win.sense_hat.pixels[me], x = doc.runtime("sense_hat_enclosure") && "sense-hat" !== doc.runtime("sense_hat_enclosure") && doc.runtime("usingSenseHat3d") ? "_astro_pi_led_" : "_sense_hat_led_", 
            y = $("#" + x + save(me) + "_"), win.sense_hat.pixels[me] = [ -8 & data[0], -4 & data[1], -8 & data[2] ], 
            data[0] > h || data[1] > h || data[2] > h ? (position = data[0] > h ? (data[0] / 255 * (w - l) + l) / 255 : i, 
            offset = data[1] > h ? (data[1] / 255 * (w - l) + l) / 255 : i, j = data[2] > h ? (data[2] / 255 * (w - l) + l) / 255 : i, 
            len = 0, status = 1) : y.attr("filter", ""), !err && ok) y.children(".rled").css({
                opacity: position
            }), y.children(".gled").css({
                opacity: offset
            }), y.children(".bled").css({
                opacity: j
            }), y.children(".oled").css({
                opacity: len
            }), y.children(".kled").css({
                opacity: status
            }); else {
                var p, s, a, n, v, val;
                p = parseInt(255 * position), s = parseInt(255 * offset), a = parseInt(255 * j), 
                val = "rgb(" + [ p, s, a ].join(",") + ")", p + s + a === 0 ? (n = 0, v = 1) : (n = 1, 
                v = 0), y.children(".rled").css({
                    opacity: 0
                }), y.children(".gled").css({
                    opacity: 0
                }), y.children(".bled").css({
                    opacity: 0
                }), y.children(".oled").css({
                    opacity: v
                }), y.children(".kled").css({
                    opacity: n
                }), y.children(".kled").attr("fill", val);
            }
        }
    }
    function save(value) {
        return 2 === value.toString().length ? value : "0" + value;
    }
    function select_icon() {
        $("#sense-hat-enclosure").attr("class", ""), $("#_sense_hat_leds_").attr("class", "leds"), 
        $("#_sense_hat_joystick_").attr("class", "joystick_states");
    }
    function setup() {
        var b = $("#graphic-wrap").width(), c = b - .05 * b, d = $("#sense-hat-sensor-controls-container").height(), e = $("#orientation-overlay").height(), f = $("#graphic").height() - d - e;
        if (doc.runtime("usingSenseHatFlat")) {
            var t = Math.floor(c / f);
            t > 1 && (c /= t);
        }
        if ($(".orientation-stage").css({
            width: c + "px",
            height: f + "px"
        }), prop && prop.setup({
            axis: void 0,
            angle: void 0
        }), !doc.runtime("usingSenseHatFlat") && "astro-pi" === doc.runtime("sense_hat_enclosure")) {
            var width = 200, max = 500, pos = Math.min(c, f);
            pos = Math.min(Math.max(pos, width), max), $("#sensehat-node").css("font-size", pos + "%");
            var pad = $("#sensehat-node").css("font-size").replace("px", ""), newSize = .7 * parseFloat(pad);
            $("#_astro_pi_wrapper_").css("font-size", newSize + "px");
        }
    }
    var self, l, el, node, prop, data = [ "pitch", "roll", "yaw", "rotation_matrix", "angle" ], len = data.length, c = win.getComputedStyle(document.documentElement, ""), key = (Array.prototype.slice.call(c).join("").match(/-(moz|webkit|ms)-/) || "" === c.OLink && [ "", "o" ])[1];
    key && (key = "-" + key + "-"), window.Geometry = {
        _Eps: 1e-5
    }, Geometry.Vector = function(x, y, z) {
        this.x = x, this.y = y, this.z = z;
    }, Geometry.Vector.prototype = {
        length: function() {
            return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
        },
        normalize: function() {
            var length = this.length();
            length <= Geometry._Eps || (this.x /= length, this.y /= length, this.z /= length);
        }
    }, Geometry.transpose3x3Matrix = function(defaultItem) {
        var localeItem = [ [ 0, 0, 0 ], [ 0, 0, 0 ], [ 0, 0, 0 ] ];
        return localeItem[0][0] = defaultItem[0][0], localeItem[0][1] = defaultItem[1][0], 
        localeItem[0][2] = defaultItem[2][0], localeItem[1][0] = defaultItem[0][1], localeItem[1][1] = defaultItem[1][1], 
        localeItem[1][2] = defaultItem[2][1], localeItem[2][0] = defaultItem[0][2], localeItem[2][1] = defaultItem[1][2], 
        localeItem[2][2] = defaultItem[2][2], localeItem;
    }, Geometry.dot3x3and3x1 = function(m1, transpose) {
        var calls = [];
        return calls[0] = m1[0][0] * transpose[0] + m1[0][1] * transpose[1] + m1[0][2] * transpose[2], 
        calls[1] = m1[1][0] * transpose[0] + m1[1][1] * transpose[1] + m1[1][2] * transpose[2], 
        calls[2] = m1[2][0] * transpose[0] + m1[2][1] * transpose[1] + m1[2][2] * transpose[2], 
        calls;
    }, Geometry.multiplyArrayWithScalar = function(vectA, constB) {
        return [ vectA[0] * constB, vectA[1] * constB, vectA[2] * constB ];
    }, Geometry.divideArrayWithScalar = function(a, l) {
        return [ a[0] / l, a[1] / l, a[2] / l ];
    }, Geometry.Defaults = {}, Geometry.Defaults.O = [ 0, 0, 0 ], Geometry.Defaults.X = [ 1, 0, 0 ], 
    Geometry.Defaults.Y = [ 0, 1, 0 ], Geometry.Defaults.Z = [ 0, 0, 1 ], Geometry.Defaults.NORTH = Geometry.multiplyArrayWithScalar(Geometry.Defaults.X, .33), 
    Geometry.Defaults.GRAVITY = Geometry.Defaults.Z, Geometry.clamp = function(v, min, max) {
        var val = Math.min(max, Math.max(min, v));
        return val;
    }, Geometry.degToRad = function(v) {
        return $.isArray(v) ? [ v[0] * Math.PI / 180, v[1] * Math.PI / 180, v[2] * Math.PI / 180 ] : v * Math.PI / 180;
    }, Geometry.radToDeg = function(records) {
        return $.isArray(records) ? [ 180 * records[0] / Math.PI, 180 * records[1] / Math.PI, 180 * records[2] / Math.PI ] : 180 * records / Math.PI;
    }, Color.prototype.asArray = function() {
        return [ this.roll, this.pitch, this.yaw ];
    }, Modernizr.addTest("mixblendmode", function() {
        return Modernizr.testProp("mixBlendMode");
    });
    var ok = Modernizr.mixblendmode && "linux" !== Detectizr.os.name, err = "firefox" === Detectizr.browser.name && "windows" == Detectizr.os.name;
    win.GadgetIO["export"]("python.sense-orientation", {
        initOrientation: build,
        updateRTIMU: f,
        randomGaussian: difference,
        updateStage: setup,
        initSenseHatEnclosure: select_icon
    });
}(window, window.GadgetIO), function() {
    function run() {
        var i, val, a, r;
        for (i = 0; length > i; i++) a = buffer[i], r = "sense_hat_" + a, val = $("#" + r).val(), 
        f(val, {
            sensor: a,
            focus: !1
        });
    }
    function support() {
        x && clearInterval(x), x = window.setInterval(_len1.updateRTIMU, 16);
    }
    function init() {
        var min, i, u, v;
        for (i = 0; length > i; i++) u = buffer[i], v = "sense_hat_" + u, "undefined" != typeof GadgetIO.runtime(v) && ($("#" + v).val(GadgetIO.runtime(v)), 
        GadgetIO.runtime(v, void 0)), position[u] = {
            $slider: $("#" + v + "[data-rangeslider]")
        }, position[u].$slider.rangeslider({
            polyfill: !1,
            onInit: function() {
                var selection = this.$element[0].id.replace("sense_hat_", "");
                f(this.value, {
                    sensor: selection,
                    focus: !1
                });
            },
            onSlideEnd: function() {
                remove();
            }
        }).on("input", function() {
            var term = this.id.replace("sense_hat_", "");
            f(this.value, {
                sensor: term,
                focus: !0
            });
        });
        l = setTimeout(function() {
            run(), j = setInterval(run, 250);
        }, 1500), GadgetIO.runtime("usingSenseHat3d") || ("undefined" != typeof GadgetIO.runtime("sense_hat_angle") ? (angle = GadgetIO.runtime("sense_hat_angle"), 
        GadgetIO.runtime("sense_hat_angle", void 0)) : "undefined" == typeof angle && (angle = 0), 
        min = Math.abs(angle % 360), $("#_sense_hat_").css("transform", "rotate(-" + Math.abs(angle) + "deg)"), 
        $("#sense_hat_angle").data("skip-trigger", !0), $("#sense-hat-display-angle").html(min + "&deg;"), 
        270 === min && $("#_sense_hat_").css("margin-top", "10%"), angle > 0 && (angle *= -1), 
        $("#sense_hat_angle").val(angle).trigger("change"));
    }
    function formatNumber() {
        GadgetIO.runtime("sense_hat_enclosure", "astro-pi"), GadgetIO.runtime("sense_hat_yaw", 180), 
        GadgetIO.runtime("missionZero", !0);
    }
    function extend(obj) {
        var i, c, d, val, h;
        for (i = 0; length > i; i++) c = buffer[i], d = "sense_hat_" + c, h = $("#" + d).length ? !0 : !1, 
        h && $("#" + d).data("skip-trigger", !0), "undefined" != typeof obj[d] ? val = obj[d] : h && (val = $("#" + d).prop("defaultValue")), 
        position[c] && position[c].$slider.val(val).change();
    }
    function each() {
        var i, b;
        for (i = 0; length > i; i++) b = buffer[i], position[b].$slider.rangeslider("update", !1, !1);
        _len1.updateStage();
    }
    function deepClone() {
        var i, prop;
        for (i = 0; length > i; i++) prop = buffer[i], position[prop].$slider.rangeslider("destroy");
    }
    function filter(x) {
        var a = !1;
        return _.map(x, function(match, letter) {
            /\.py$/.test(letter) && (/import\s*sense_hat/.test(match) || /from\s*sense_hat\s*import/.test(match)) && (a = !0);
        }), a;
    }
    function forEach() {
        GadgetIO.runtime("downloadExtra", _model);
    }
    function forOwn() {
        l && clearTimeout(l), j && clearInterval(j), x && clearInterval(x);
    }
    function notify() {
        each();
    }
    function f(n, obj) {
        var c, d, m = !isNaN(parseFloat(n)) && isFinite(n);
        if (m) {
            switch (n = Number(parseFloat(n).toFixed(2)), obj.sensor) {
                case "temperature":
                switch (c = "&deg; C", !0) {
                    case n >= 15 && 40 >= n:
                    d = .5;
                    break;

                    case n >= 0 && 60 >= n:
                    d = 1;
                    break;

                    default:
                    d = 2;
                }
                break;

                case "pressure":
                c = "hPa", d = .1;
                break;

                case "humidity":
                c = "%", d = n >= 20 && 80 >= n ? 3.5 : 5;
            }
            d /= 3, window.sense_hat.rtimu[obj.sensor] = [ 1, _len1.randomGaussian(n, d) ], 
            $(".sense-hat-" + obj.sensor).html(n + c);
        } else window.sense_hat.rtimu[obj.sensor] = [ 0, -1 ];
        Sk.sense_hat && Sk.sense_hat.rtimu && (Sk.sense_hat.rtimu[obj.sensor] = window.sense_hat.rtimu[obj.sensor]), 
        obj.focus && remove();
    }
    function d2h(d) {
        return 2 === d.toString().length ? d : "0" + d;
    }
    function remove(name) {
        if ("undefined" != typeof name && (_ref1 = name), _ref1) {
            var top = $("#graphic-wrap").scrollTop();
            $("#sense-hat-listener").focus(), top && $("#graphic-wrap").scrollTop(top);
        }
    }
    Modernizr.addTest("mixblendmode", function() {
        return Modernizr.testProp("mixBlendMode");
    });
    var arg = Modernizr.mixblendmode && "linux" !== Detectizr.os.name, args = "firefox" === Detectizr.browser.name && "windows" == Detectizr.os.name || "safari" === Detectizr.browser.name, _j = GadgetIO["import"]("python.sense-stick"), _len1 = GadgetIO["import"]("python.sense-orientation"), _model = "https://gadget-app-assets.gadget.io/sense-hat/v2.2.0.zip", _ref1 = !1;
    window.sense_hat = {
        rtimu: {
            temperature: [ 1, $("#sense_hat_temperature").val() ],
            humidity: [ 1, $("#sense_hat_humidity").val() ],
            pressure: [ 1, $("#sense_hat_pressure").val() ],
            gyro: [ 0, 0, 0 ],
            accel: [ 0, 0, 1 ],
            compass: [ 0, 0, 0 ],
            fusionPose: [ 0, 0, 0 ],
            raw_orientation: [ 0, 0, 0 ],
            raw_old_orientation: [ 0, 0, 0 ]
        },
        sensestick: new _j.SenseStickDevice()
    }, window.Sk_interrupt = !1;
    var angle, l, j, x, y, gutterX = 8, gutterY = 47, dashSize = gutterY, update = function(index, content) {
        var c, d, a, b, value = .4, u = 180, i = 255, x = 0, y = 0, tmp = 0, id = 1, j = 1;
        if (index && "setpixel" === index) if (c = content, d = window.sense_hat.pixels[c], 
        a = GadgetIO.runtime("sense_hat_enclosure") && "sense-hat" !== GadgetIO.runtime("sense_hat_enclosure") && GadgetIO.runtime("usingSenseHat3d") ? "_astro_pi_led_" : "_sense_hat_led_", 
        b = $("#" + a + d2h(c) + "_"), window.sense_hat.pixels[c] = [ -8 & d[0], -4 & d[1], -8 & d[2] ], 
        d[0] > dashSize || d[1] > dashSize || d[2] > dashSize ? (x = d[0] > dashSize ? (d[0] / 255 * (i - u) + u) / 255 : value, 
        y = d[1] > dashSize ? (d[1] / 255 * (i - u) + u) / 255 : value, tmp = d[2] > dashSize ? (d[2] / 255 * (i - u) + u) / 255 : value, 
        id = 0, j = 1) : b.attr("filter", ""), !args && arg) b.children(".rled").css({
            opacity: x
        }), b.children(".gled").css({
            opacity: y
        }), b.children(".bled").css({
            opacity: tmp
        }), b.children(".oled").css({
            opacity: id
        }), b.children(".kled").css({
            opacity: j
        }); else {
            var p, k, l, n, v, val;
            p = parseInt(255 * x), k = parseInt(255 * y), l = parseInt(255 * tmp), val = "rgb(" + [ p, k, l ].join(",") + ")", 
            p + k + l === 0 ? (n = 0, v = 1) : (n = 1, v = 0), b.children(".rled").css({
                opacity: 0
            }), b.children(".gled").css({
                opacity: 0
            }), b.children(".bled").css({
                opacity: 0
            }), b.children(".oled").css({
                opacity: v
            }), b.children(".kled").css({
                opacity: n
            }), b.children(".kled").attr("fill", val);
        } else index && "changeLowlight" === index && (dashSize = content === !0 ? gutterX : gutterY);
    }, buffer = [ "temperature", "pressure", "humidity" ], length = buffer.length, position = {}, inflections = !1;
    window.onresize = function() {
        GadgetIO.runtime("usingSenseHat") && (clearTimeout(y), y = setTimeout(notify, 500));
    }, $(document).on("click", ".exit-off-canvas", function() {
        GadgetIO.runtime("usingSenseHat") && setTimeout(function() {
            each();
        }, 500);
    }), $(document).on("click.sense-hat-focus", "#graphic", function() {
        remove(!0);
    }), $(document).on("click", "#sense-hat-info-button", function(e) {
        e.preventDefault(), $("#sense-hat-info-button").addClass("hide"), $("#sense-hat-info").removeClass("hide"), 
        $("#sense-hat-rotate-container").addClass("hide");
    }), $(document).on("click", "#sense-hat-info-close", function(e) {
        e.preventDefault(), $("#sense-hat-info").addClass("hide"), $("#sense-hat-info-button").removeClass("hide"), 
        $("#sense-hat-rotate-container").removeClass("hide");
    }), $(document).on("click", "#sense-hat-rotate-button", function(e) {
        if (!inflections) {
            var a = angle - 90, q = Math.abs(a % 360), c = 0;
            inflections = !0, $({
                deg: angle
            }).animate({
                deg: a
            }, {
                duration: 350,
                step: function(val) {
                    $("#_sense_hat_").css({
                        transform: "rotate(" + val + "deg)"
                    });
                },
                complete: function() {
                    angle = a, $("#sense_hat_angle").val(q).trigger("change"), $("#sense-hat-display-angle").html(q + "&deg;"), 
                    inflections = !1, 270 === q && (c = "10%"), $("#_sense_hat_").css("margin-top", c);
                }
            });
        }
    }), $("#graphic-wrap").scroll(function() {
        if (GadgetIO.runtime("usingSenseHat")) {
            var sTop = $(this).scrollTop(), coords = -sTop + "px";
            $("#sense-hat-info-button").css({
                bottom: coords
            }), $("#sense-hat-info").css({
                bottom: coords
            }), $("#sense-hat-rotate-container").css({
                bottom: coords
            });
        }
    }), window.GadgetIO["export"]("python.sense-hat", {
        sense_hat_emit: update,
        focus: remove,
        initSensors: init,
        initIMU: support,
        destroySliders: deepClone,
        updateSliders: each,
        resetSensors: extend,
        usingSenseHat: filter,
        addSrc: forEach,
        stopSenseHat: forOwn,
        initMissionZero: formatNumber
    });
}(), function(app, callback) {
    function create(options, e, properties, text, phonegap, fn) {
        var type, id, args, view;
        e && !e.complete && (e.stop = !0);
        var loc = {
            print_function: !1,
            division: !0,
            absolute_import: null,
            unicode_literals: !0,
            set_repr: !0,
            class_repr: !0,
            inherit_from_object: !0,
            super_args: !0
        }, error_obj = {
            print_function: !1,
            division: !1,
            absolute_import: null,
            unicode_literals: !1,
            set_repr: !1,
            class_repr: !1,
            inherit_from_object: !1,
            super_args: !1
        }, the_url = {
            print_function: !0,
            division: !0,
            absolute_import: null,
            unicode_literals: !0,
            set_repr: !0,
            class_repr: !0,
            inherit_from_object: !0,
            super_args: !0
        };
        text = text.replace(/\r(?!\n)/gm, "\r\n");
        var tmp = text.match(/^\s*#!.*?python(\d)/i), parts = text.match(/^\s*#\s*python\s*[=:]?\s*(\d)/i);
        parts ? Sk.__future__ = "2" === parts[1] ? error_obj : loc : tmp ? Sk.__future__ = "3" === tmp[1] ? the_url : error_obj : Sk.__future__ = loc, 
        Sk.__future__ = the_url;
        app.runtime("missionZero") && (Sk.__future__ = the_url);
        var init = function(e) {
            var i, val = trim(e.toString());
            if (e.traceback && e.traceback.length) {
                for (i = 0; i < e.traceback.length; i++) options.userFiles && "undefined" != typeof options.userFiles[e.traceback[i].filename] && (e.filename = e.traceback[i].filename, 
                e.lineno = e.traceback[i].lineno);
                "undefined" == typeof e.filename && (e.traceback = e.traceback.filter(function(part) {
                    return "undefined" != typeof part.filename && "main.py" === part.filename;
                }), e.traceback[0] && (e.filename = e.traceback[0].filename, e.lineno = e.traceback[0].lineno));
            }
            if (options.includeFileInErrors && e.filename && (val = val.replace(/on line \d+/, "on line " + e.lineno), 
            val = val + " in " + e.filename.replace(/^\.\//, "")), /^ImportError: No module named/.test(val), 
            "repl" === options.evalMode) {
                val += "\n";
                var idx = -1;
                -1 !== (idx = e.toString().indexOf("on line")) && (idx = parseInt(e.toString().substr(idx + 8), 10));
                var count = 0;
                val += id ? "1>: " + args[0].substr(key.length) : args.map(function(arg) {
                    return ++count + (idx === count ? ">" : " ") + ": " + arg;
                }).join("\n");
            }
            options.error(val, e), fn && "function" == typeof fn && fn(val, e);
        };
        Sk.configure({
            inputfun: options.inputfun,
            __future__: Sk.__future__,
            retainglobals: "repl" === options.evalMode,
            output: properties,
            read: function(data) {
                return options.read(data, Sk.builtinFiles.files || {}, options.userFiles || {});
            },
            write: function() {},
            nonreadopen: !0,
            fileopen: dispatch,
            filewrite: fireEvent,
            imageProxy: options.imageProxy || "",
            uncaughtException: init,
            signals: !0,
            killableWhile: _ref1,
            killableFor: !1
        });
        var container = document.getElementById("codeOutput");
        if (options.suspensionHandler = {
            "*": function() {
                if (window.Sk_interrupt === !0) throw new Error("interrupt");
                return null;
            }
        }, Pygame.init("/components/pygame.sk/skulpt_module", function(evt) {
            return evt.target === document.body || container && container.contains(evt.target);
        }), callback.extend(Sk.externalLibraries, options.externalLibraries), options.allowGraphics && (Sk.availableWidth = options.graphicsWidth(), 
        Sk.availableHeight = options.graphicsHeight()), Sk.domOutput = function(item) {
            return callback(options.graphicsTarget()).append(item).children().last();
        }, Sk.onBeforeImport = function(v) {
            if (_len1.test(v)) {
                if (!options.allowGraphics) return "Graphics libraries are not allowed";
                if (type) {
                    if (type !== v && (!_ref[type] || _ref[type].indexOf(v) < 0)) return "You may only use a single graphics library at a time and the " + type + " library is already in use.";
                } else "function" == typeof options.onGraphicsInit && options.onGraphicsInit(), 
                options.graphicsSetup[v](options, callback(options.graphicsTarget())), type = v;
            }
            return options.onBeforeImport ? options.onBeforeImport(v) : void 0;
        }, options.onAfterImport && (Sk.onAfterImport = options.onAfterImport), "repl" === options.evalMode) {
            if (args = text.split("\n").filter(function(callSite) {
                return !_j.test(callSite);
            }), id = 1 === args.length || /"""/.test(args[0]) && /"""/.test(args[args.length - 1]), 
            id && !_i.test(args[0]) && !value.test(args[0]) && !v.test(args[0]) && args[0].length > 0 && (match.test(args[0]) || _len.test(args[0]) || (args.unshift(key + args.shift()), 
            args.push("if not evaluationresult == None: print(evaluationresult)"))), args = args.filter(function(arg) {
                return !_j.test(arg);
            }), 0 === args.length) return;
            text = args.join("\n");
        }
        return {
            code: text,
            lines: args,
            oneLiner: id,
            errorMessage: view,
            handleError: init
        };
    }
    function trigger(params, args) {
        _len2[params] || callback.ajax({
            async: !1,
            type: "GET",
            url: params,
            dataType: args && args.dataType ? args.dataType : "script",
            success: function(event, xhr) {
                _len2[params] = !0, args && args.success && args.success(event);
            }
        });
    }
    function build(name) {
        var elm = callback("#console-output");
        elm.removeClass("hide"), elm.html(elm.html() + name);
    }
    function f(message, e) {
        var o, name = "code-error";
        if (e instanceof Sk.builtin.ExternalError && (e = e.nativeError), e && "validation" === e.type && (name = "info", 
        message = e.message), !(e && "interrupt" === e.message || message && /\b(?:SystemExit|KeyboardInterrupt)\b/.test(message))) {
            var o = m("statusMessageTemplate", {
                type: name,
                message: message
            }), res = callback(o);
            callback("body").append(res), callback("body").addClass("has-status-bar"), res.parent().foundation().trigger("open.fndtn.alert");
        }
    }
    function g(p, d, s) {
        var wrapper = s[p] || d[p];
        if (void 0 === wrapper) throw "File not found: '" + p + "'";
        return wrapper;
    }
    function dispatch(args) {
        var event = document.createEvent("Event");
        event.data = args.mode.v + ":" + args.name, event.initEvent("SkfileOpen", !0, !0), 
        document.dispatchEvent(event);
    }
    function fireEvent(event, opts) {
        var e = document.createEvent("Event");
        e.data = event.name + ":" + opts.v, e.initEvent("SkfileWrite", !0, !0), document.dispatchEvent(e);
    }
    function trim(string) {
        return string.replace(/[&<>]/g, function(x) {
            return k[x] || x;
        });
    }
    var data, b, m = app["import"]("utils.template"), result = app["import"]("python.sense-hat"), x = app["import"]("python.sense-stick"), j = app["import"]("python.sense-orientation"), n = Detectizr.browser.name, i = n + ":" + Detectizr.os.name, _ref1 = "midori" === n || "iceweasel" === n || "epiphany" === n ? !1 : !0, _ref2 = parseInt(Detectizr.browser.version), _ref3 = n + "-gte-3d", _ref4 = 400, update = function(opts, obj) {
        function step() {
            if (0 === callback("#_sense_hat_").height()) setTimeout(step, 250); else {
                var height = callback("#_sense_hat_").height();
                cp = Math.floor(value / height), cp > 1 && (value /= cp), callback(".orientation-box").css({
                    width: value + "px",
                    height: height + "px"
                }), callback(".orientation-front").css({
                    width: value + "px",
                    height: height + "px"
                }), callback(".orientation-back").css({
                    width: value + "px",
                    height: height + "px",
                    transform: "rotateY(180deg) rotateZ(180deg)",
                    msTransform: "rotateY(180deg) rotateZ(180deg)"
                });
            }
        }
        var height;
        obj.html(data), obj.css({
            height: "100%"
        });
        var avg = callback("#graphic-wrap").width(), value = avg - .05 * avg;
        try {
            height = callback("#sense-hat-enclosure").get(0).getBBox().height;
        } catch (i) {
            height = _ref4;
        }
        height || (height = _ref4);
        var cp = Math.floor(value / height);
        cp > 1 && (value /= cp), j.updateStage(), app.runtime("usingSenseHat3d") || (callback(".orientation-box").css({
            width: value + "px",
            height: height + "px"
        }), callback(".orientation-front").css({
            width: value + "px",
            height: height + "px"
        })), function f() {
            0 === callback("#sense-hat-sensor-controls-container").width() ? setTimeout(f, 100) : (app.runtime("usingSenseHatFlat") && step(), 
            opts._3d ? (obj.find(".3d").removeClass("hide"), app.runtime("usingSenseHat3d", !0), 
            j.initOrientation(), callback(".save-it").removeClass("blue-highlight"), callback(".save-it").removeClass("green-highlight")) : (obj.find(".2d").removeClass("hide"), 
            app.runtime("usingSenseHat3d", void 0), j.initSenseHatEnclosure()), opts.snapshot && (obj.find(".hide-for-snapshot").addClass("hide"), 
            obj.find(".orientation-stage").addClass("snapshot")), result.initSensors());
        }(), callback("#graphic-wrap").addClass("sense-hat");
    };
    callback("#graphic-wrap").on("split-output", function(packages) {
        if (app.runtime("usingSenseHat") && callback(".orientation-stage").length) {
            var ht = callback(".orientation-stage").height() - callback("#console-wrap").height();
            callback(".orientation-stage").css({
                height: ht + "px"
            });
        }
    });
    var arg, k = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;"
    }, key = "evaluationresult = ", match = /^\s*print\b/, v = /^\s*(from\s+\w+\s+)?import\b/, value = /(def|class|for|while|del)\b.*/, _j = /^\s*$/, _i = /[^!=<>]=[^=]/, _len = /^\s*#/, _len2 = {}, _len1 = /^(turtle|pygal|processing|matplotlib\.pyplot|image|sense_hat)$/i, _ref = {
        sense_hat: [ "image" ],
        image: [ "sense_hat" ]
    }, _ref5 = {
        turtle: function(model, $el) {
            "function" == typeof arg && arg();
            var t = model.graphicsWidth(), n = model.graphicsHeight(), e = Math.min(t, n);
            return Sk.TurtleGraphics || (Sk.TurtleGraphics = {}), Sk.TurtleGraphics.width = e, 
            Sk.TurtleGraphics.height = e, Sk.TurtleGraphics.worldWidth = 400, Sk.TurtleGraphics.worldHeight = 400, 
            Sk.TurtleGraphics.target = $el[0], Sk.TurtleGraphics.assets = function(callback) {
                if (model.userAssets) for (var x = 0; x < model.userAssets.length; x++) if (model.userAssets[x].name === callback) return model.userAssets[x].url;
            }, $el.data("graphicMode", "turtle"), $el.empty();
        },
        pygal: function(txId, details) {
            return "function" == typeof arg && arg(), details.data("graphicMode", "pygal"), 
            details.empty();
        },
        image: function(type, data) {
            return "function" == typeof arg && arg(), Sk.canvas = "graphic", "undefined" != typeof ImageMod && (ImageMod.canvasLib = []), 
            Sk.imageProxy = function(name) {
                if (!type.userAssets) return name;
                for (var x = 0; x < type.userAssets.length; x++) if (type.userAssets[x].name === name) return type.userAssets[x].url;
                return name;
            }, data.empty();
        },
        processing: function(data, container) {
            var eventType = gadgetConfig.prefix("/components/processing.sk/processing-sk-min.js"), node = document.getElementById("codeOutput");
            trigger(eventType, {
                success: function(instance) {
                    var output = gadgetConfig.prefix("/components/processing.sk/skulpt_module");
                    ProcessingSk.init(output, data.suspensionHandler, data.suspensionHandler["*"], function(evt) {
                        return evt.target === document.body || node && node.contains(evt.target);
                    }), Sk.externalLibraries.processing.dependencies = [ gadgetConfig.prefix("/components/Processing.js/processing.min.js") ];
                }
            }), "function" == typeof arg && arg();
            var canvas = Sk.canvas = "processingCanvas";
            return container.data("graphicMode", "processing"), Sk.imageProxy = function(name) {
                if (!data.userAssets) return name;
                for (var i = 0; i < data.userAssets.length; i++) if (data.userAssets[i].name === name) return data.userAssets[i].url;
                return name;
            }, setTimeout(function() {
                window.readyForSnapshot = !0;
            }, 1e4), container.html('<canvas style="display:none" id="' + canvas + '" width="400" height="400"></canvas>');
        },
        "matplotlib.pyplot": function(i, el) {
            "function" == typeof arg && arg();
            var modalId = Sk.canvas = "matplotlibCanvas";
            return el.data("graphicMode", "matplot"), el.html('<div id="' + modalId + '"></div>');
        },
        sense_hat: function(img, e) {
            if (Sk.sense_hat || (Sk.sense_hat = img.sense_hat), Sk.sense_hat_emit || (Sk.sense_hat_emit = img.sense_hat_emit), 
            data) 0 === callback("#sense-hat-sensor-controls-container").length && update(img, e); else {
                var v, c = !1, a = [ "sense-hat" ];
                b = window.senseHatConfig || {}, b[_ref3] && _ref2 >= b[_ref3] && (c = !0), b[n] && !c && a.push(b[n]), 
                b[i] && a.push(b[i]), img._3d || (a.indexOf("flat") >= 0 && a.splice(a.indexOf("flat"), 1), 
                a.push("2d")), a.indexOf("flat") >= 0 && app.runtime("usingSenseHatFlat", !0), v = a.join("-"), 
                v = "partials/" + v + ".html", trigger(v, {
                    dataType: "html",
                    success: function(object) {
                        if (data = object, update(img, e), app.runtime("usingSenseHatFlat")) {
                            var html = m("statusMessageTemplate", {
                                type: "info",
                                message: "Try <a href='https://www.google.com/chrome/browser/desktop/' class='text-link' target='_blank'><strong>Chrome</strong></a> or Safari for a richer 3D experience."
                            }), output = callback(html);
                            callback("body").append(output), callback("body").addClass("has-status-bar"), output.parent().foundation().trigger("open.fndtn.alert");
                        }
                    }
                });
            }
            x.initJoystick(), arg = function() {
                result.destroySliders(), callback("#graphic-wrap").removeClass("sense-hat"), arg = void 0;
            }, e.data("graphicMode", "sense hat");
        }
    }, _ref6 = {
        pygal: {
            path: gadgetConfig.prefix("/components/pygal.js/__init__.js"),
            dependencies: [ gadgetConfig.prefix("/js/vendor/highcharts/highcharts.js"), gadgetConfig.prefix("/js/vendor/highcharts/highcharts-more.js") ]
        },
        numpy: {
            path: gadgetConfig.prefix("/components/skulpt_numpy/dist/numpy/__init__.js")
        },
        "numpy.random": {
            path: gadgetConfig.prefix("/components/skulpt_numpy/dist/numpy/random/__init__.js")
        },
        matplotlib: {
            path: gadgetConfig.prefix("/components/skulpt_matplotlib/matplotlib/__init__.js")
        },
        "matplotlib.pyplot": {
            path: gadgetConfig.prefix("/components/skulpt_matplotlib/matplotlib/pyplot/__init__.js"),
            dependencies: [ gadgetConfig.component("d3", "d3.min.js") ]
        },
        json: {
            path: gadgetConfig.prefix("/components/json.sk/__init__.js"),
            dependencies: [ gadgetConfig.prefix("/components/json.sk/stringify.js") ]
        },
        xml: {
            path: gadgetConfig.prefix("/components/xml.sk/__init__.js")
        },
        "xml.etree": {
            path: gadgetConfig.prefix("/components/xml.sk/etree/__init__.js")
        },
        "xml.etree.ElementTree": {
            path: gadgetConfig.prefix("/components/xml.sk/etree/ElementTree.js")
        },
        itertools: {
            path: gadgetConfig.prefix("/js/skulpt/itertools.js")
        },
        os: {
            path: "imports/os.js"
        },
        "gadget.checks": {
            path: "imports/checks.js"
        },
        "gadget.tester": {
            path: "imports/tester/__init__.py"
        },
        "gadget.ast": {
            path: "imports/ast/__init__.py"
        },
        _ast: {
            path: "imports/ast/_ast.js"
        },
        gadget: {
            path: "imports/gadget/__init__.js"
        },
        "gadget.tests": {
            path: "imports/gadget/tests.py"
        },
        unittest: {
            path: "imports/unittest/__init__.py"
        },
        turtletalk: {
            path: "imports/turtletalk.py"
        }
    };
    app["export"]("Skulpt", function(req) {
        var path = {
            evalMode: "main",
            allowGraphics: !0,
            autoEscape: !1,
            read: g,
            write: build,
            error: f,
            graphicsSetup: _ref5,
            includeFileInErrors: !1,
            graphicsWidth: function() {
                return callback(req.graphicsTarget()).parent().width();
            },
            graphicsHeight: function() {
                return callback(req.graphicsTarget()).parent().height();
            },
            externalLibraries: _ref6
        };
        req = callback.extend({}, path, req), req.allowGraphics && (req.graphicsSetup = callback.extend({}, _ref5, req.graphicsSetup), 
        req.graphicsTarget = req.graphicsTarget || function() {
            return callback("#graphic");
        });
        var action, key = function(data) {
            req.autoEscape && (data = trim(data)), req.write(data);
        }, params = "__abort_code__", next = function(err, ok, res, user, challenge, status) {
            var test = {
                complete: !1
            };
            "repl" !== req.evalMode && Sk.TurtleGraphics && Sk.TurtleGraphics.reset && Sk.TurtleGraphics.reset();
            return Sk.misceval.asyncToPromise(function() {
                return Sk.importMainWithBody(req.evalMode, !1, err, !0);
            }, req.suspensionHandler).then(function(exists) {
                test.complete = !0, user && "function" == typeof user && user(), Sk.sense_hat && Sk.sense_hat.sensestick.destroy();
            }, function(err) {
                return err === params ? void (status && "function" == typeof status && status()) : (test.complete = !0, 
                challenge(err), void (Sk.sense_hat && Sk.sense_hat.sensestick.destroy()));
            }), test;
        };
        return function(value, callback, errback, timeout) {
            if (!value || /^\s*$/.test(value)) return callback();
            var res = create(req, action, key, value, callback, errback);
            return action = next(res.code, res.oneLiner, res.lines, callback, res.handleError, timeout), 
            res.errorMessage ? !1 : !0;
        };
    }), app["export"]("SkRuntimeConfig", create);
}(window.GadgetIO, window.jQuery), function(inits) {
    function options(dom) {
        this._pollInterval = void 0, this._analytics = dom, this._events = {}, $(window).on("blur", $.proxy(this.poll, this));
    }
    options.POLL_INTERVAL = 3e4, options.prototype.poll = function() {
        if (this._pollInterval) {
            for (var event in this._events) this._events[event] && this._analytics(event, this._events[event]), 
            this._events[event] = 0;
            clearTimeout(this._pollInterval), this._pollInterval = void 0;
        }
    }, options.prototype.logEvent = function(type) {
        var _this = this;
        _this._events[type] = (_this._events[type] || 0) + 1, this._pollInterval || (this._pollInterval = setTimeout($.proxy(this.poll, this), options.POLL_INTERVAL));
    }, inits["export"]("embed.analytics.activity", options);
}(window.GadgetIO), function() {
    "use strict";
    function test(options, self) {
        var i, s, r, action = options && options._astname;
        if (action) {
            if ("Call" === action) "Name" === options.func.constructor.name ? self[action].push(options.func.id.v) : "Attribute" === options.func.constructor.name && self[action].push(options.func.attr.v); else if ("Attribute" === action) self[action].push(options.attr.v); else if ("ImportFrom" === action) self.Import.push(options.module.v); else if ("Import" === action) for (i = 0; i < options.names.length; i++) self.Import.push(options.names[i].name.v);
            if (options._fields) for (i = 0; i < options._fields.length; i += 2) if (r = options._fields[i + 1](options)) if (r._astname) test(r, self); else if (r.constructor === Array && r.length && r[0] && r[0]._astname) for (s = 0; s < r.length; s++) test(r[s], self);
        }
    }
    function merge_settings_data(res) {
        var d, k, i = "main.py", j = res.getValue(), n = {
            Call: [],
            Attribute: [],
            Import: []
        };
        try {
            d = Sk.parse(i, j), k = Sk.astFromParse(d.cst, i, d.flags);
        } catch (h) {
            return;
        }
        return test(k, n), n;
    }
    void 0 === Function.prototype.name && void 0 !== Object.defineProperty && Object.defineProperty(Function.prototype, "name", {
        get: function() {
            var h = /function\s([^(]{1,})\(/, m = h.exec(this.toString());
            return m && m.length > 1 ? m[1].trim() : "";
        },
        set: function(value) {}
    }), window.GadgetIO["export"]("skulpt.ast", {
        parseCode: merge_settings_data
    });
}(), function(self, params) {
    function connect(buf) {
        var match = buf.toString().match(/^(.*?)[:;]\s*(.*?)(?:on\sline\s(\d+).*)?$/i);
        return match && match[1] && match[2] ? {
            error: match[0],
            type: match[1],
            message: match[2],
            line: match[3] ? parseInt(match[3]) : -1
        } : !1;
    }
    function success() {
        controlsHeader || (controlsHeader = !0, $("#console-wrap").removeClass("hide"), 
        pickerHour ? build() : $("#console-wrap").css("height", "100%"), linkdiv = $("#console-output").jqconsole(), 
        linkdiv.Write("[0m"), linkdiv.Reset());
    }
    function build() {
        if ($("#output-dragbar").hasClass("hide")) {
            $("#output-dragbar").removeClass("hide");
            var a = $("#outputTabs").height(), b = $(".gadget-content-wrapper").height() - a, c = $("#output-dragbar").height(), d = .8 * b - c / 2, v = b - d - c / 2;
            $("#graphic-wrap").css("height", d), $("#console-wrap").css("height", v), $("#graphic-wrap").trigger("split-output");
        }
    }
    function showOverlay() {
        $("#unittest-wrap").removeClass("hide").css("height", "100%");
    }
    function upload(v) {
        switch (v) {
            case "turtle":
            context._queryString.snapshot ? (Sk.TurtleGraphics || (Sk.TurtleGraphics = {}), 
            Sk.TurtleGraphics.animate = !1, Sk.TurtleGraphics.allowUndo = !1, Sk.TurtleGraphics.width = 320, 
            Sk.TurtleGraphics.height = 320) : (controlsPlus = !0, "run" === fld && show(!0));
            break;

            case "urllib.request":
            if ($("#proxy").val()) {
                var data = {}, compiled = Sk.sysmodules.mp$subscript(v);
                compiled.$d.urlopen.func_code = function(el, xValue, yValue) {
                    if (void 0 === data[el.v]) {
                        var url = $("#proxy").val() + "?url=" + encodeURIComponent(el.v), xhr = new XMLHttpRequest();
                        xhr.open("GET", url, !1), xhr.send(null), data[el.v] = xhr.responseText, data[el.v].length && setTimeout(function() {
                            data[el.v] = void 0;
                        }, 10 * data[el.v].length);
                    }
                    return Sk.misceval.callsim(compiled.$d.Response, {
                        responseText: data[el.v]
                    });
                };
            }
            break;

            case "sense_hat":
            params.runtime("usingSenseHat", !0), params.runtime("usingSenseHat3d", !0), params.runtime("sense_hat_enclosure") || params.runtime("sense_hat_enclosure", "sense-hat"), 
            el.initIMU(), el.addSrc();
            break;

            case "pygal":
            context._queryString.snapshot && Highcharts.setOptions({
                plotOptions: {
                    series: {
                        animation: !1
                    }
                }
            });
        }
        "function" == typeof context.afterImport && context.afterImport(v);
    }
    function done() {
        return y || (y = $('<div class="turtle-overlay hide" data-action="graphic.focus" data-interface="output"></div>'), 
        y.insertAfter("#graphic"), y.on("click", function() {
            show(!0);
        })), y;
    }
    function show(event) {
        return controlsPlus ? (void 0 !== event && (event = !!event, event ? (done().addClass("hide"), 
        $("#graphic").focus(), $(document).on("keydown.turtle-focus", function(e) {
            e.preventDefault();
        }), context.sendInterfaceAnalytics(done()), $(document).on("mousedown.turtle-focus", function(packages) {
            $("#graphic-wrap").is(":hover") || show(!1);
        })) : ($(document).off("keydown.turtle-focus"), $(document).off("mousedown.turtle-focus"), 
        done().removeClass("hide"))), Sk.TurtleGraphics.focus(event)) : void 0;
    }
    function fn(m) {
        o.clearTabMarkers(), linkdiv && (linkdiv.Write("[0m"), linkdiv.Reset()), m || params.runtime("usingSenseHat") || ($("#graphic").empty(), 
        $("#graphic").removeData("graphicMode"));
    }
    function factory() {
        var table = o.assets();
        $("#imageAssets").empty(), _len = table.length, _len2 = 0, _len && (_i = !0), table.forEach(function(data) {
            var link = /^data:image/.test(data.url) ? data.url : escape(data.url), img = new Image();
            img.id = data.name, img.className = "hide", img.onload = function() {
                $("#imageAssets").append(img), _len2++, _len2 >= _len && (_i = !1);
            }, img.src = link;
        });
    }
    function escape(source) {
        var val = $("#proxy").val(), regexp = new RegExp(val + "/", "g");
        return source = source.replace(regexp, ""), source = val + "/" + source;
    }
    function create(params, uid) {
        var tmp, i, element;
        for (i in pickerMins) delete pickerMins[i];
        $(".hidden-file").remove();
        for (i in params) i === uid ? tmp = params[i] : (i.match(/\.py$/) && (pickerMins["./" + i] = params[i] + "\n"), 
        $("#" + i).length || (element = $("<textarea>", {
            id: i,
            text: params[i] + "\n",
            name: i,
            "class": "hide hidden-file"
        }), $("body").append(element)));
        return pickerMeri.length = 0, pickerMeri.push.apply(pickerMeri, o.assets()), $("#proxy").val() && pickerMeri.forEach(function(req) {
            /^data:image/.test(req.url) || (req.url = escape(req.url));
        }), tmp;
    }
    function render() {
        $(".reveal-modal").foundation("reveal", "close"), null == test && (test = controlsInput(props));
        var title, template = ($("#graphic"), context.getValue());
        title = create(o.getAllFiles(), pickerDay), $("#statusMessages").children().length && $("#statusMessages").trigger("close.fndtn.alert").remove(), 
        "function" == typeof context.beforeRun && (title = context.beforeRun(title)), controlsPlus = !1, 
        done().addClass("hide");
        var activeElement = document.activeElement;
        test(title, function() {
            controlsMinus = void 0, "function" == typeof context.afterRun && context.afterRun(title), 
            context.collectErrorData(template), clear();
        }, function(t) {
            controlsMinus = void 0, "function" == typeof context.afterRun && context.afterRun(title), 
            context.collectErrorData(template, t);
            var n = /on line (\d+) in (.+)$/, c1 = t.match(n);
            c1 && context.highlightLine(c1[2], c1[1]);
        }, function() {
            clear();
        }), controlsPlus ? $("#graphic").focus() : controlsMinus || activeElement !== document.activeElement || ("none" != $("#editor").css("display") ? context.focus() : o.options.noEditor || $("#honeypot").focus()), 
        context.updateMetric("runs", template), !templFlip[template] && context.isModified() && context.callAnalytics("Interaction", "Modify", "Code"), 
        context.markCodeAsRun(template);
    }
    function update() {
        if ($(".reveal-modal").foundation("reveal", "close"), pickerContent = "run", a) checkFunction(), 
        setTimeout(update, 250); else if (_i) setTimeout(update, 500); else {
            null == on && (context._queryString.snapshot && (r.snapshot = !0), on = controlsInput(r)), 
            self.Sk_interrupt = !1;
            var event, func = context.getValue();
            event = create(o.getAllFiles(), o.activeTab().fileName), fn(), $("#console-output").removeClass("console-mode"), 
            $("#statusMessages").children().length && $("#statusMessages").trigger("close.fndtn.alert").remove(), 
            "function" == typeof context.beforeRun && (event = context.beforeRun(event)), controlsPlus = !1, 
            done().addClass("hide");
            var content = params.runtime("usingSenseHat");
            params.runtime("usingSenseHat", !1), params.runtime("downloadExtra", void 0);
            var activeElement = document.activeElement;
            a = !0;
            var id = setTimeout(function() {
                a && context.changeRunOption("stop");
            }, 500);
            on(event, function() {
                controlsMinus = void 0, "function" == typeof context.afterRun && context.afterRun(event), 
                context.collectErrorData(func), clear(id);
            }, function(e) {
                if (controlsMinus = void 0, "function" == typeof context.afterRun && context.afterRun(event), 
                !/(?:interrupt|systemexit)/i.test(e)) {
                    context.collectErrorData(func, e);
                    var r = /on line (\d+) in (\S+)/, m = e.match(r);
                    if (m) {
                        var height = m[2].replace(/\.$/, "");
                        context.highlightLine(height, m[1]);
                    }
                    params.runtime("usingSenseHat", content);
                }
                clear(id);
            }, function() {
                params.runtime("usingSenseHat", content), clear(id);
            }), controlsPlus ? $("#graphic").focus() : params.runtime("usingSenseHat") ? el.focus(!0) : controlsMinus || activeElement !== document.activeElement || now || ("none" != $("#editor").css("display") ? context.focus() : o.options.noEditor || now || $("#honeypot").focus()), 
            context.updateMetric("runs", func), !templFlip[func] && context.isModified() && (context.callAnalytics("Interaction", "Modify", "Code"), 
            params.runtime("usingSenseHat") && context.callAnalytics("Sense Hat Event", "Modify", "Code")), 
            context.markCodeAsRun(func);
        }
    }
    function checkFunction() {
        self.Sk_interrupt = !0, match(0), self.sense_hat.sensestick.triggerKeyboardInterrupt(), 
        params.runtime("usingSenseHat") && el.stopSenseHat(), templInput && (templInput(new Sk.builtin.SystemExit("execution halted")), 
        templInput = null), "function" == typeof Processing && Processing.instances && Processing.instances.length && Processing.instances[0].exit();
    }
    function clear(gestureTimeout) {
        gestureTimeout && clearTimeout(gestureTimeout), a = !1, pickerContent && context.changeRunOption(pickerContent), 
        params.runtime("usingSenseHat") && el.stopSenseHat(), self.readyForSnapshot = !0;
    }
    function process() {
        if ($(".reveal-modal").foundation("reveal", "close"), pickerContent = "console", 
        a) checkFunction(), setTimeout(process, 250); else if (_i) setTimeout(process, 500); else {
            Sk.globals && (Sk.globals = {
                __name__: Sk.globals.__name__
            }), success(), $("#console-output").addClass("console-mode"), null == constrain && (constrain = controlsInput(result));
            var data, resp = ($("#graphic"), context.getValue(), []);
            data = create(o.getAllFiles(), o.activeTab().fileName), fn(), $("#statusMessages").children().length && $("#statusMessages").trigger("close.fndtn.alert").remove(), 
            "function" == typeof context.beforeRun && (data = context.beforeRun(data)), data && (resp = data.split("\n")), 
            controlsPlus = !1, done().addClass("hide"), CodeMirror({
                history: resp
            });
        }
    }
    function CodeMirror(place) {
        var ext = !1;
        linkdiv.Prompt(!0, function(value) {
            if (/^\s*$/.test(value)) CodeMirror(place); else {
                self.Sk_interrupt = !1, a = !0;
                var to = setTimeout(function() {
                    a && params.runtime("usingSenseHat") && context.changeRunOption("stop");
                }, 500);
                constrain(value, function() {
                    linkdiv._pauseHistory = !1, CodeMirror(place), clear(to);
                }, function(a, e) {
                    params.runtime("usingSenseHat") && /interrupt/i.test(e.toString()) || linkdiv.Write(_escapeHTML(e.toString()), "jqconsole-error", !1), 
                    linkdiv._pauseHistory = !1, CodeMirror(place), clear(to);
                }, function() {
                    clear(to);
                }), context.callAnalytics("Interaction", "Modify", "Code");
            }
        }, function(value) {
            var e, s, src, x = !1;
            return src = value.split("\n"), 0 === src.length ? 0 : (s = src[src.length - 1], 
            e = s.match(/^\s*/)[0], s = src[src.length - 1].replace(/\s+$/, ""), /"""/.test(s) && !/""".*"""/.test(s) && (ext = !ext), 
            ext ? x = 0 : /^\s*#/.test(s) || ":" !== s[s.length - 1] ? e.length && s && 0 !== s[s.length - 1].length ? x = 0 : /^\s*#/.test(s) && (x = 0) : x = 1, 
            linkdiv._enteringHistory && (e.length ? x = -(e.length / 2) : x !== !1 && (x = 0), 
            x === !1 && (linkdiv._pauseHistory = !0)), x);
        }), linkdiv.Focus(), find(place.history);
    }
    function find(arr) {
        var b, c, i, e;
        if (arr.length) {
            for (linkdiv._enteringHistory = !0, b = arr.shift(), c = b.split(""), i = 0; i < c.length; i++) e = $.Event("keypress"), 
            e.which = c[i].charCodeAt(0), linkdiv.$input_source.trigger(e);
            arr.length || (linkdiv._enteringHistory = !1), e = $.Event("keydown"), e.which = "\r".charCodeAt(0), 
            linkdiv.$input_source.trigger(e), arr.length && !linkdiv._pauseHistory && find(arr);
        }
    }
    function _escapeHTML(text) {
        var HTML_ESCAPES = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#039;"
        };
        return text.replace(/[&<>"']/g, function(match) {
            return HTML_ESCAPES[match];
        });
    }
    var context, o, x, y, newHour, fld, linkdiv, pickerContent, templInput, templInputT, templControls, templFlip = {}, controlsPlus = !1, controlsInput = params["import"]("Skulpt"), controlsMinus = void 0, controlsSet = !1, controlsHeader = !1, pickerHour = !1, pickerMins = {}, pickerMeri = [], pickerMon = "main.py", pickerDay = "tests.py", pickerYar = params["import"]("utils.guid"), pickerSecs = params["import"]("utils.template"), el = params["import"]("python.sense-hat"), PQueue = params["import"]("embed.analytics.activity"), a = !1, match = params["import"]("sendSignalToSkulpt"), now = self.userSettings && self.userSettings.disableAceEditor || !1;
    try {
        templInputT = params["import"]("skulpt.ast"), templControls = params["import"]("SkRuntimeConfig");
    } catch (Y) {}
    var on, constrain, test, i = function(d) {
        success(), d = d.replace(/\0(33)\[/g, "["), linkdiv.Write(d);
    }, init = function(code) {
        return success(), self.readyForSnapshot = !0, new Promise(function(resolve, reject) {
            templInput = reject;
            var input = document.activeElement;
            linkdiv.Append('<span aria-hidden="true" role="presentation">' + code + "</span>"), 
            $("#console-output").addClass("console-active"), linkdiv.Input(function(value) {
                $("#console-output").removeClass("console-active"), context.activityLog && context.activityLog.logEvent("Text Input"), 
                resolve(value), input && !now && $(input).focus();
            }), controlsMinus || linkdiv.Focus();
        });
    }, p = function() {
        pickerHour || (pickerHour = !0, $("#graphic-wrap").removeClass("hide"), controlsHeader ? build() : $("#graphic-wrap").css("height", "100%"));
    }, r = {
        evalMode: "main",
        onAfterImport: upload,
        userFiles: pickerMins,
        userAssets: pickerMeri,
        includeFileInErrors: !0,
        imageProxy: $("#proxy").val(),
        write: i,
        inputfun: init,
        onGraphicsInit: p,
        sense_hat: self.sense_hat,
        sense_hat_emit: el.sense_hat_emit,
        _3d: !0
    }, result = {
        evalMode: "repl",
        onAfterImport: upload,
        userFiles: pickerMins,
        userAssets: pickerMeri,
        includeFileInErrors: !1,
        imageProxy: $("#proxy").val(),
        write: i,
        inputfun: init,
        onGraphicsInit: p,
        sense_hat: self.sense_hat,
        sense_hat_emit: el.sense_hat_emit,
        _3d: !0,
        error: function(a, b) {}
    }, props = {
        evalMode: "tests",
        userFiles: pickerMins,
        userAssets: pickerMeri,
        includeFileInErrors: !0,
        write: function(data) {
            showOverlay();
        },
        inputfun: function(a) {
            return showOverlay(), new Promise(function(resolve, reject) {
                resolve();
            });
        }
    }, _i = !1, _len = 0, _len2 = 0;
    !function() {
        var contentType = /^(input|text|password|file|email|search|date)$/i;
        $(document).bind("keydown", function(event) {
            var d, doPrevent = !0;
            8 === event.keyCode && (d = event.srcElement || event.target, ("textarea" === d.tagName.toLowerCase() || "input" === d.tagName.toLowerCase() && d.type.match(contentType)) && (doPrevent = d.readOnly || d.disabled), 
            doPrevent && event.preventDefault());
        });
    }(), self.GadgetAPI = {
        initialize: function(options) {
            context = this, newHour = $("#start-value").val(), fld = $("#runOption-value").val(), 
            context.runMode = $("#runMode-value").val(), controlsMinus = "result" === newHour && !$("body").hasClass("has-status-bar");
            var r = [], t = !0;
            params.runtime("mission-zero") ? (r = !1, t = !1, el.initMissionZero()) : options.assets && (r = options.assets.slice()), 
            o = $("#editor").codeEditor({
                showTabs: !this._queryString.outputOnly,
                noEditor: !!this._queryString.outputOnly,
                disableAceEditor: now,
                mainFileName: pickerMon,
                showInfo: !0,
                assets: r,
                addFiles: t,
                guest: false,
                owner: true,
                canHideTabs: true,
                canAddInlineComments: context.hasPermission("add-gadget-inline-comments") && "owner" === context.getUIType(),
                userId: context.getUserId(),
                lang: "python",
                onFocus: function() {
                    show(!1);
                },
                assetsHowTo: "#assets-howto-message"
            }).data("gadget-codeEditor");
            var s = {
                gadgetIdentifier: context.getGadgetIdentifierOrNull(),
                userIdentifier: context.getUserId()
            };
            self.gadgetBroadcast && self.gadgetBroadcast.connection && self.gadgetBroadcast.connection.initialize(o, s), 
            factory();
            var handler = context.save;
            context.save = function(name, cb) {
                handler.call(context, name, function(err, result) {
                    "function" == typeof cb && cb(err, result);
                });
            }, $(document).on("sk.system.clear", function() {
                fn(!0);
            }), $("#reset-output").click(function() {
                fn(!0);
            }), $(document).on("assets.change", function() {
                factory(), context.triggerChange();
            }), $(document).on("open.fndtn.alert", function() {
                o.resize();
            }), $(document).on("close.fndtn.alert", function() {
                o.resize(), params.runtime("usingSenseHat") && el.updateSliders();
            }), o.addCommand("run", {
                win: "Ctrl-Enter",
                mac: "Command-Enter"
            }, function(args) {
                $("#editor").trigger("gadget.code.run", {
                    action: "code.run"
                });
            }), o.addCommand("test", {
                win: "Shift-Ctrl-Enter",
                mac: "Shift-Command-Enter"
            }, function(data) {
                $("#editor").trigger("gadget.code.check", {
                    action: "code.check"
                });
            });
            try {
                x = params["import"]("python.editor.hints"), o.registerPlugin(x), gadgetConfig.get("testing") || (AutoCompletePlugin = params["import"]("python.editor.autocomplete"), 
                context._queryString && context._queryString.inLibrary && AutoCompletePlugin.setInLibrary(!0), 
                o.registerPlugin(AutoCompletePlugin));
            } catch (h) {}
            this._errorGroup = 0, this._sessionId = pickerYar(), this._previousError = void 0, 
            $(document).on("gadget.code.edit", $.proxy(this.showCode, this)), $(document).on("gadget.code.run", $.proxy(this.showResult, this)), 
            $(document).on("gadget.code.stop", $.proxy(this.stopExecution, this)), $(document).on("gadget.code.check", $.proxy(this.showTestResult, this)), 
            $(document).on("gadget.code.console", $.proxy(this.consoleResult, this)), $(document).on("gadget.output.view", $.proxy(context.showOutput, context)), 
            $(document).on("gadget.instructions.view", $.proxy(context.showInstructions, context)), 
            this.viewer = "#codeOutput", $(document).on("gadget.code.modules", $.proxy(this.toggleModules, this)), 
            $("#honeypot").on("keydown", $.proxy(this.showCode, this)), $("#menu").on("gadget.sharing.share gadget.sharing.embed gadget.sharing.email", function(e) {
                context.isModified() && !templFlip[context.getValue()] && ($("#runFirstModal").foundation("reveal", "open"), 
                e.preventDefault());
            }), $('.menu-toolbar .menu-button[data-action="code.run"]').on("mousedown", function(e) {
                o && o.isFocused() && e.preventDefault();
            }), $('.menu-toolbar .menu-button[data-action="code.check"]').on("mousedown", function(e) {
                o && o.isFocused() && e.preventDefault();
            }), $("#modalRun").click(function() {
                sendInterfaceAnalytics(this), $("#runFirstModal").foundation("reveal", "close"), 
                update();
            }), options.settings && options.settings.testsEnabled && $(".check-it").hasClass("hide") && $(".check-it").removeClass("hide"), 
            context.reset(options, !0), o.change(function() {
                context.triggerChange();
            }), context.draggable(_.debounce(function() {
                params.runtime("usingSenseHat") && el.updateSliders();
            }, 500)), $("#output-dragbar").mousedown(function(e) {
                e.preventDefault();
                var bottom = $("#outputTabs").height(), y = $(".gadget-content-wrapper").height() - bottom, height = $(".gadget-content-wrapper").offset().top + bottom, h = $("#output-dragbar").height();
                $(document).on("mousemove.output-dragbar", function(e) {
                    var i = e.pageY - height - h / 2, item = y - i - h / 2;
                    i >= 20 && item >= 20 && ($("#graphic-wrap").css("height", i), $("#console-wrap").css("height", item));
                }), $(document).on("mouseup.output-dragbar", function(packages) {
                    $(document).off("mousemove.output-dragbar mouseup.output-dragbar");
                }), context.sendInterfaceAnalytics(this);
            }), context.activityLog = new PQueue(function(a, b) {
                var msg = a.replace(/[a-zA-Z0-9](?:[^\s\-\._]*)/g, function(a) {
                    return a.charAt(0).toUpperCase() + a.substr(1);
                });
                context.sendAnalytics("Output", {
                    action: msg,
                    label: context.getGadgetIdentifier(),
                    value: b
                });
            }), $(document).keydown(function(e) {
                var msg = $("#graphic").data("graphicMode");
                (/turtle/i.test(msg) && $(".turtle-overlay").hasClass("hide") || /sense\s*hat/i.test(msg) && params.runtime("usingSenseHat")) && context.activityLog.logEvent(msg + " Key");
            }), $(document).on("mousedown", "#graphic-wrap", function(event) {
                var option;
                "sense-hat-rotate-button" === $(event.target).attr("id") || "sense-hat-rotate-button" === $(event.target).parent().attr("id") ? context.callAnalytics("Sense Hat Event", "Click", "RotateButton") : (option = $("#graphic").data("graphicMode"), 
                option ? context.activityLog.logEvent(option + " Click") : context.activityLog.logEvent("Output Click"));
            }), $(document).on("change", "[data-rangeslider]", function(e) {
                context.callAnalytics("Sense Hat Event", "Click", "Sensor");
            }), self.parent && self.parent.postMessage("initialised", "*"), context._queryString && context._gadget.description && context._queryString.showInstructions && context._gadget.description.length && $(document).trigger("gadget.instructions.view");
        },
        collectErrorData: function(response, dst) {
            var e, tmp, err = dst && connect(dst), data = this._previousError;
            data && (data.attempt += 1, tmp = self.JsDiff.createPatch("attempt" + data.attempt, data.code, response), 
            e = {
                session: this._sessionId,
                error: data.error,
                group: data.group,
                type: data.type,
                message: data.message,
                line: data.line,
                code: data.code,
                elapsed: Date.now() - data.time,
                totalElapsed: Date.now() - data.firstTime,
                delta: tmp.substr(tmp.indexOf("@")),
                attempt: data.attempt
            }, err && (e.introduced = err.error), err && data.message === err.message ? (e.state = "repeated", 
            this.logError(e), data.time = Date.now(), err = void 0) : (e.state = "resolved", 
            this.logError(e), err || (this._previousError = void 0))), err && (err.group = ++this._errorGroup, 
            err.code = response, err.time = err.firstTime = Date.now(), err.attempt = 0, this.logError({
                state: "encountered",
                session: this._sessionId,
                group: err.group,
                error: err.error,
                type: err.type,
                message: err.message,
                line: err.line,
                attempt: err.attempt,
                code: response
            }), this._previousError = err);
        },
        highlightLine: function(a, b) {
            o.highlight(a, b);
        },
        getTour: function() {
            var a = this.getUIType(), ops = [];
            return "owner" !== a && ("none" !== $(".mode-toolbar .show-for-small-only").css("display") ? ($("#editor").hasClass("hide") || ops.push({
                el: ".run-it",
                event: "code.run"
            }), ops.push({
                el: ".edit-it",
                event: "code.edit"
            }, {
                el: ".ace_content",
                event: "code.change"
            }, {
                el: ".run-it",
                event: "code.run"
            })) : "result" !== $("#start-value").val() && this._gadget.code ? ops.push([ {
                el: ".run-it",
                event: "code.run"
            }, {
                el: ".ace_content",
                event: "code.change"
            } ]) : ops.push({
                el: ".ace_content",
                event: "code.change"
            }, {
                el: ".run-it",
                event: "code.run"
            }), ops.push({
                el: ".left-menu-toggle",
                event: "menu.options"
            }, {
                el: ".share-it",
                event: "sharing.share"
            }), "guest" === a && ops.push({
                el: ".right-menu-toggle",
                event: "menu.user"
            }), ops.push({
                el: ".save-it",
                event: "library.add"
            })), ops;
        },
        getEditor: function() {
            return o;
        },
        getType: function() {
            return "python";
        },
        getValue: function(node) {
            return o.serialize(node);
        },
        getMainFile: function() {
            return pickerMon;
        },
        isDirty: function() {
            if (!this._gadget) return !1;
            if (this.getValue() !== (this._original.code || "")) return !0;
            var data = o.assets();
            return data.length !== (this._original.assets || []).length ? !0 : JSON.stringify(data) !== JSON.stringify(this._original.assets) ? !0 : JSON.stringify(this._gadget.settings) !== JSON.stringify(this._original.settings) ? !0 : !1;
        },
        getAnalyticsCategory: function() {
            return "Python";
        },
        serialize: function(dom) {
            var p = {
                code: this.getValue(dom),
                assets: o.assets().slice(),
                settings: this._gadget.settings,
                description: this._gadget.description
            };
            return dom && dom.removeComments && o.removeComments(), p;
        },
        showMessage: function(a, b) {
            var html = pickerSecs("statusMessageTemplate", {
                type: a,
                message: b
            }), output = $(html);
            $("body").addClass("has-status-bar").append(output), output.parent().foundation().trigger("open.fndtn.alert");
        },
        showCode: function(a) {
            $("#codeOutput").addClass("hide"), $("#editor").removeClass("hide"), context.closeOverlay("#modules"), 
            context.focus(), show(!1);
        },
        showResult: function(r) {
            "run" !== fld && r && "run" === $(r.target).data("button") && context.changeRunOption("run"), 
            context.runMode = "", context.triggerRunModeChange(), $("#codeOutput").removeClass("hide"), 
            $("#editor").addClass("hide"), $("#unittest-wrap").addClass("hide"), context.closeOverlay("#modules"), 
            $("#instructionsContainer").addClass("hide"), $("#outputContainer").removeClass("hide"), 
            $("#codeOutputTab").addClass("active"), $("#instructionsTab").removeClass("active"), 
            update(), r && (context.callAnalytics("Interaction", "Click", "Run"), params.runtime("usingSenseHat") && context.callAnalytics("Sense Hat Run", "Click", "Run"));
        },
        stopExecution: function(a) {
            checkFunction();
        },
        showTestResult: function(a) {
            $("#codeOutput").removeClass("hide"), $("#editor").addClass("hide"), $("#console-wrap").addClass("hide"), 
            controlsHeader = !1, $("#graphic-wrap").addClass("hide"), pickerHour = !1, $("#unittest-wrap").removeClass("hide"), 
            $("#output-dragbar").addClass("hide"), $("#instructionsContainer").addClass("hide"), 
            $("#outputContainer").removeClass("hide"), context.closeOverlay("#modules"), render(), 
            a && context.callAnalytics("Interaction", "Click", "Check");
        },
        consoleResult: function(jEv) {
            "console" !== fld && jEv && "console" === $(jEv.target).data("button") && context.changeRunOption("console"), 
            context.runMode = "console", context.triggerRunModeChange(), $("#codeOutput").removeClass("hide"), 
            $("#editor").addClass("hide"), $("#unittest-wrap").addClass("hide"), context.closeOverlay("#modules"), 
            $("#instructionsContainer").addClass("hide"), $("#outputContainer").removeClass("hide"), 
            $("#codeOutputTab").addClass("active"), $("#instructionsTab").removeClass("active"), 
            process(), jEv && (context.callAnalytics("Interaction", "Click", "Console"), params.runtime("usingSenseHat") && context.callAnalytics("Sense Hat Run", "Click", "Console"));
        },
        toggleModules: function() {
            controlsSet ? context.toggleOverlay("#modules") : $.get("/api/docs/python", function(data) {
                $("#modules").prepend(data), $(document).foundation(), context.toggleOverlay("#modules"), 
                controlsSet = !0, context.callAnalytics("Interaction", "Click", "Documentation");
            });
        },
        hideAll: function() {
            this.toggleModules();
        },
        onOpenOverlay: function() {
            $("#codeOutput").addClass("hide"), $("#editor").addClass("hide");
        },
        onCloseOverlay: function() {
            $("#codeOutput").removeClass("hide"), $("#editor").removeClass("hide"), context.focus(), 
            show(!1);
        },
        reset: function(cfg, anim) {
            o.reset(cfg.code), o.assets(cfg.assets ? cfg.assets.slice() : []), anim || factory(), 
            "console" === fld || "console" === context.runMode ? this.consoleResult() : cfg.code && "result" === newHour && controlsMinus !== !1 ? this.showResult() : (this.showCode(), 
            fn());
            if (newHour === "check") {
                this.showTestResult();
            }
        },
        replaceMain: function(result, message) {
            o.setValue(result.code), o.assets(result.assets ? result.assets.slice() : []), message || factory();
        },
        onChange: function(func) {
            var self = this.getEditor();
            var squares = self._files;
            for (var s = 0; s < squares.length; s++) squares[s].editor.aceInstance.getSession().on("change", func);
            $('[data-action^="file."]').click(func);
            self.element.on("codeeditor.fileAdded", function() {
                var url = self._files[self._files.length - 1];
                url.editor.aceInstance.getSession().on("change", func);
            });
        },
        getAsDataURL: function() {
            return btoa(JSON.stringify(GadgetApp.serialize()));
        },
        getEmbedCode: function(data, options) {
            var buf = '<iframe width="100%" height="350" src="';
            buf += data || window.location.pathname;
            buf += '" frameborder="0" marginwidth="0" marginheight="0" allowfullscreen="true" data-gadget="';
            buf += options || GadgetApp.getAsDataURL();
            buf += '"></iframe>';
            return buf;
        },
        onChangeChecks: function(states) {
            var init, n, s, _this = this;
            init = function() {
                n = [];
                var node, css = JSON.parse(_this.getValue()), event = "main.py", i = _.find(css, {
                    name: event
                }).content;
                for (templControls && templControls(r, void 0, function() {}, i, function() {}, function() {}), 
                templInputT && (node = templInputT.parseCode(o)), s = 0; s < states.length; s++) n.push({
                    result: states[s].fn.call(_this, node),
                    name: states[s].name
                });
                self.parent.postMessage(JSON.stringify({
                    action: "check-results",
                    results: n
                }), "*");
            }, $(this).on("gadget.code.change", _.debounce(init, 1e3)), $(document).on("gadget.resetted", init), 
            init();
        },
        focus: function() {
            $("body").data("is-mobile") || o.focus(), show(!1);
        },
        markCodeAsRun: function($namespace$$) {
            templFlip[$namespace$$] = !0;
        },
        downloadable: function() {
            var b, c, d, e = "owner" === this.getUIType();
            return this._gadget && this._gadget._origin_id && (b = this._gadget._origin_id), 
            c = e && !b ? o.getAllFiles() : o.getAllVisibleFiles(), d = o.assets(), params.runtime("usingSenseHat") || el.usingSenseHat(c) && el.addSrc(), 
            {
                files: c,
                assets: d
            };
        },
        toggleCheckButton: function() {
            $(".check-it").hasClass("hide") ? $(".check-it").removeClass("hide") : $(".check-it").addClass("hide");
        },
        changeRunOption: function(i) {
            var position = {
                run: "fa fa-play",
                console: "fa fa-terminal",
                stop: "fa fa-stop"
            }, titles = {
                run: "View the result.",
                console: "Run code interactively.",
                stop: "Stop program."
            }, nicknames = {
                run: "Run",
                console: "Console",
                stop: "Stop"
            };
            $(".run-it").data("action", "code." + i), $(".run-it").attr("title", titles[i]), 
            $(".run-it").find("label").text(nicknames[i]), $(".run-it").find("i").removeClass().addClass(position[i]), 
            fld = i;
        },
        discardDraftSettings: function() {
            if (this._gadget.settings.testsEnabled !== this._predraft.settings.testsEnabled) {
                var mouseEvent = new MouseEvent("click", {
                    bubbles: !0
                });
                try {
                    $("#testsEnabled").data("skip-trigger", !0), $("#testsEnabled")[0].dispatchEvent(mouseEvent);
                } catch (num_files) {
                    console.log("testsEnabled click err:", num_files);
                }
            }
            params.runtime("usingSenseHat") && el.resetSensors(this._predraft.settings);
        }
    };
}(window, window.GadgetIO);