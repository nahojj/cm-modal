(function() {
    // This
    var self = this;

    // Define our constructor
    self.Modal = function() {
        // Create global element references
        self.closeButton = null;
        self.modal       = null;
        self.overlay     = null;

        // Determine proper prefix
        self.transitionEnd = transitionSelect();

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

    // Public Methods

    Modal.prototype.close = function() {
        // Store value of this
        var _ = this;

        // Remove the open class
        self.modal.className    = self.modal.className.replace('cm-modal-open', '');
        self.overlay.className  = self.overlay.className.replace('cm-modal-open');

        // Listen for CSS transitionend evt and then remove the nodes from the DOM
        self.modal.addEventListener(self.transitionEnd, function() {
            _.modal.parentNode.removeChild(_.modal);
        });

        self.overlay.addEventListener(self.transitionEnd, function() {
            if(_.overlay.parentNode) _.overlay.parentNode.removeChild(_.overlay);
        });
    }

    Modal.prototype.open = function() {
        // Build out - Modal
        buildOut.call(this);

        // Init event
        initEvents.casll(this);

        // Then, we adding elements to the DOM. USe getComputedStyle
        // force the broswer re recale and recognize the elements that we just added.
        // Cause css animation has a start point.
        window.getComputedStyle(self.modal).height;

        // Add our open class and check if the modal is taller than the window
        // If true, anchored class will be applied.
        self.modal.className = self.modal.className +
            (self.modal.offsetHeight > window.innerHeight ? 'cm-modal-open cm-modal-anchored') : 'cm-modal-open';

        self.overlay.className = self.overlay.className + 'cm-modal-open';
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
            self.closeButton           = document.createElement('button');
            self.closeButton.className = 'cm-modal-close close-button';
            self.closeButton.innerHTML = 'X';
            this.modal.appendChild(self.closeButton);
        }

        // if overlay is true, then we add it!
        if(self.options.overlay === true) {
            self.overlay           = document.createElement('div');
            self.overlay.className = 'cm-modal-overlay ' + self.options.classname;

            docFrag.appendChild(self.overlay);
        }

        // Create content area and append it to modal
        contentHolder           = document.createElement('div');
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

    function initEvents() {
        if(self.closeButton) {
            self.closeButton.addEventListener('click', self.close.bind(this));
        }

        if(self.overlay) {
            self.overlay.addEventListener('click', self.close.bind(this));
        }
    }

    function transitionSelect() {
        var el = document.createElement("div");
        if (el.style.WebkitTransition) return "webkitTransitionEnd";
        if (el.style.OTransition) return "oTransitionEnd";
        return 'transitionend';
    }


})();
