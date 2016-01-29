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
            maxWidth: 600,
            minWidth: 280,
            overlay: true
        };

        // Create options by extending defaults with the passed in arguments
        if(arguments[0] && typeof arguments[0] === 'object') {
            self.options = extendDefaults(defaults, arguments[0]);
        }
    }


    // Private Methods

    function buildOut() {
        var content, contentHolder, docFrag;

        // If content is an HTML string, append the html string.
        // If content is a domNode, append its content.

        if(typeof self.options.content === 'string') {
            content = self.options.content;
        } else {
            content = self.options.content.innerHTML;
        }

        // Create a Documentframent to build with
        docFrag = document.createDocumentFragment();

        // Create modal element.
        self.modal                  = document.createElement('div');
        self.modal.className        = 'cm-modal ' + self.options.className;
        self.modal.style.minWidth   = self.options.minWidth + 'px';
        self.modal.style.maxWidth   = self.options.maxWidth + 'px';

        // if closeButton option true, add close button
        if(self.options.closeButton === true) {
            self.closeButton = document.createElement('button');
            self.closeButton.className = 'cm-modal-close close-button';
            self.closeButton.innerHTML = 'X';
            this.modal.appendChild(self.closeButton);
        }

        // if overlay is true, then we add it!
        if(self.options.overlay === true) {
            self.overlay = document.createElement('div');
            self.overlay.className = 'cm-modal-overlay ' + self.options.classname;
            docFrag.appendChild(self.overlay);
        }

        // Create content area and append it to modal
        contentHolder = document.createElement('div');
        contentHolder.className = 'cm-modal-content';
        contentHolder.innerHTML = content;
        self.modal.appendChild(contentHolder);

        // Append modal to docFrag
        docFrag.appendChild(self.modal);

        // Append to body
        document.body.appendChild(docFrag);
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
