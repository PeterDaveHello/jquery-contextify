/* jQuery Contextify | (c) 2014 Adam Bouqdib | abemedia.co.uk/license */

/*global define */

;(function( factory ) {
	if ( typeof define === "function" && define.amd ) {

		// AMD. Register as an anonymous module.
		define([ "jquery" ], factory );
	} else {

		// Browser globals
		factory( jQuery, window );
	}
}(function ( $, window ) {
    
    var pluginName = 'contextify',
        defaults = {
            items: [],
            menuId: "contextify-menu"
        },
        contextifyId = 0;
        
    function Plugin( element, options ) {
        this.element = element;
        
        this.options = $.extend( {}, defaults, options) ;
        
        this._defaults = defaults;
        this._name = pluginName;
        
        this.init();
    }

    Plugin.prototype.init = function () {
        var options = $.extend( {}, this.options, $(this.element).data());
        options.id = contextifyId;
    
        $(this.element)
        .attr('data-contextify-id', options.id)
        .on('contextmenu', function (e) {
            e.preventDefault();
        var menu = $('<ul class="dropdown-menu" role="menu" id="' + options.menuId + '" data-contextify-id="' + options.id + '"/>');
    
        menu.data(options);
        
        var l = options.items.length;
        var i;
        
        for (i = 0; i < l; i++) {
            var item = options.items[i];
            var el = $('<li/>');
            
            if (item.divider) {
                el.addClass('divider');
            } 
            else if (item.header) {
                el.addClass('dropdown-header');
                el.html(item.header);
            }
            else {
                el.append('<a/>');
                var a = el.find('a');
                
                if (item.href) {
                    a.attr('href', item.href);
                }
                if (item.onclick) {
                    a.on('click', options, item.onclick);
                    a.css('cursor', 'pointer');
                }
                if (item.data) {
                for (var data in item.data) {
                    menu.attr('data-' + data, item.data[data]);
                }
                    a.data(item.data);
                }
                a.html(item.text);
            }
            
            menu.append(el);
        }
            
            if ($("#" + options.menuId).length > 0) {
                $("#" + options.menuId).replaceWith(menu);
            } 
            else {
                $('body').append(menu);
            }
            
            var x = (menu.width() + e.clientX < $(window).width()) ? e.clientX : e.clientX - menu.width(),
                y = (menu.height() + e.clientY < $(window).height()) ? e.clientY : $(window).height() - menu.height() - 15;
            
            menu
                .css('top', y)
                .css('left', x)
                .show();
        })
        .parents().on('mouseup', function () {
            $("#" + options.menuId).hide();
        });
        
        contextifyId++;
    };
    
    $.fn[pluginName] = function ( options ) {
        return this.each(function () {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName, 
                new Plugin( this, options ));
            }
        });
    };

}));
