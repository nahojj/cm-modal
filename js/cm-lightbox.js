(function() {
    var self = this;
        // Define our constructor
        self.Modal = function() {
        // Create global element references
        self.closeButton = null;
        self.modal       = null;
        self.overlay     = null;

        // Define option defaults
        var defaults = {
            className: 'fade-and-drop',
            closeButton: true,
            content: "",
            mixWidth: 600,
            minWidth: 280,
            overlay: true
        };

        // Create options by extending defaults with the passed in arguments
        if(arguments[0] && typeof arguments[0] === 'object') {
            self.options = extendDefaults(defaults, arguments[0]);
        }
    }

    // Utility method to extend defaults with user options
    function extendDefaults(source, props) {
        var prop;

        for(prop in props) {
            if(props.hasOwnProperty(prop)) {
                source[prop] = props[prop];
            }
        }
        return source;
    }


})();
