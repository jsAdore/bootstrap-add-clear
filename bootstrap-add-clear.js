/*!
 * bootstrap-add-clear v1.0.7 (http://github.com/gesquive/bootstrap-add-clear)
 * Licensed under MIT (http://github.com/gesquive/bootstrap-add-clear/blob/master/LICENSE)
 */
;(function ($, window, document, undefined) {

    var pluginName = "addClear";

    // The actual plugin constructor
    function Plugin(element, options) {
        this.element = element;

        this.options = $.extend({}, defaults, options);

        this._defaults = defaults;
        this._name = pluginName;

        this.init();
    }

    Plugin.prototype = {

        init: function () {
            var icon = "<svg version=\"1.1\" id=\"Layer_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\"" +
                "\t width=\"32px\" height=\"32px\" viewBox=\"0 0 64 64\" enable-background=\"new 0 0 64 64\" xml:space=\"preserve\">" +
                "<g>" +
                "\t<line fill=\"none\" stroke=\"#000000\" stroke-width=\"2\" stroke-miterlimit=\"10\" x1=\"18.947\" y1=\"17.153\" x2=\"45.045\" y2=\"43.056\"/>" +
                "</g>" +
                "<g>" +
                "\t<line fill=\"none\" stroke=\"#000000\" stroke-width=\"2\" stroke-miterlimit=\"10\" x1=\"19.045\" y1=\"43.153\" x2=\"44.947\" y2=\"17.056\"/>" +
                "</g>" +
                "</svg>";
            var $this = $(this.element),
                me = this,
                options = this.options;

            $this.wrap("<div class='" + options.wrapperClass + "' style='position: relative;'></div>");
            var outerHeight = $this.outerHeight();
            var top = (outerHeight-32)/2;
            $this.after($("<span class='add-clear-x input-group-append " + options.symbolClass + "'>" + icon + "</span>"));
            $this.next().css({
                'color': options.color,
                'cursor': 'pointer',
                'text-decoration': 'none',
                'display': 'none',
                'overflow': 'hidden',
                'position': 'absolute',
                'pointer-events': 'auto',
                'right': options.right,
                'top': top,
                'z-index': options.zindex
            }, this);

            if ($this.val().length >= 1 && options.showOnLoad === true) {
                $this.siblings(".add-clear-x").show();
            }

            $this.on('focus.addclear', function () {
                if ($(this).val().length >= 1) {
                    $(this).siblings(".add-clear-x").show();
                }
            });

            $this.on('blur.addclear', function () {
                var self = this;

                if (options.hideOnBlur) {
                    setTimeout(function () {
                        $(self).siblings(".add-clear-x").hide();
                    }, 50);
                }
            });

            $this.on('keyup.addclear', function (e) {
                if (options.clearOnEscape === true && e.keyCode == 27) {
                    $(this).val('').focus();
                    if (options.onClear) {
                        options.onClear($(this).siblings("input"));
                    }
                }
                if ($(this).val().length >= 1) {
                    $(this).siblings(".add-clear-x").show();
                } else {
                    $(this).siblings(".add-clear-x").hide();
                }
            });

            $this.on('input.addclear change.addclear paste.addclear', function () {
                if ($(this).val().length >= 1) {
                    $(this).siblings(".add-clear-x").show();
                } else {
                    $(this).siblings(".add-clear-x").hide();
                }
            });

            $this.siblings(".add-clear-x").on('click.addclear', function (e) {
                $(this).siblings(me.element).val("");
                $(this).hide();
                if (options.returnFocus === true) {
                    $(this).siblings(me.element).focus();
                }
                if (options.onClear) {
                    options.onClear($(this).siblings("input"));
                }
                e.preventDefault();
            });
        }

    };

    $.fn[pluginName] = function (options, optionName, optionValue) {
        return this.each(function () {
            if (options === "option") {
                var $this = $(this);
                if (optionName === "show") {
                    $this.siblings(".add-clear-x").show();
                } else if (optionName === "hide") {
                    $this.siblings(".add-clear-x").hide();
                }
            }
            var isSetOption = optionName && optionName !== "show" && optionName !== "hide";
            if (isSetOption) {
                var oldInstance = $.data(this, "plugin_" + pluginName);
                if (!oldInstance || !oldInstance.options) {
                    throw "Cannot set option, plugin was not instantiated";
                }
                oldInstance.options[optionName] = optionValue;
            } else {
                if (!$.data(this, "plugin_" + pluginName)) {
                    $.data(this,
                        "plugin_" + pluginName,
                        new Plugin(this, options));
                }
            }

        });
    };

    $.fn[pluginName].Constructor = Plugin;

    var defaults = $.fn[pluginName].defaults = {
        closeSymbol: "",
        symbolClass: 'glyphicon glyphicon-remove-circle',
        color: "#CCC",
        top: 0,
        right: 0,
        returnFocus: true,
        showOnLoad: false,
        onClear: null,
        hideOnBlur: false,
        clearOnEscape: true,
        wrapperClass: '',
        zindex: 100
    };

})(jQuery, window, document);
