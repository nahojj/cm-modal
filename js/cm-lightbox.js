/*
* CM-MODAL
* ===============================================================
* Description: A custom modal lightbox, built with tutorial.
* Version: 1.0
* Author: Johan <Nahoj>
* License: MIT
* ===============================================================
*/

(function() {
    // Define our constructor
    this.Modal = function() {
        // Create global element references
        this.closeButton = null;
        this.modal       = null;
        this.overlay     = null;

        // Determine proper prefix
        this.transitionEnd = transitionSelect();

        // Define option defaults
        var defaults = {
            autoOpen: false,
            className: 'fade-and-drop',
            closeButton: true,
            content: "",
            maxWidth: 600,
            minWidth: 280,
            overlay: true
        };

        // Create options by extending defaults with the passed in arguments
        if(arguments[0] && typeof arguments[0] === 'object') {
            this.options = extendDefaults(defaults, arguments[0]);
        }

        if(this.options.autoOpen === true) this.open();
    }

    // Public Methods

    Modal.prototype.close = function() {
        // Store value of this
        var _ = this;

        // Remove the open class
        this.modal.className   = this.modal.className.replace(' cm-modal-open', '');
        this.overlay.className = this.overlay.className.replace(' cm-modal-open','');

        // Listen for CSS transitionend evt and then remove the nodes from the DOM
        this.modal.addEventListener(this.transitionEnd, function() {
            _.modal.parentNode.removeChild(_.modal);
       });

        this.overlay.addEventListener(this.transitionEnd, function() {
            if(_.overlay.parentNode) _.overlay.parentNode.removeChild(_.overlay);
        });
    }

    Modal.prototype.open = function() {
        // Build out - Modal
        buildOut.call(this);

        // Init event
        initEvents.call(this);

        // Then, we adding elements to the DOM. USe getComputedStyle
        // force the broswer recale and recognize the elements that we just added.
        // Cause css animation has a start point.
        window.getComputedStyle(this.modal).height;

        // Add our open class and check if the modal is taller than the window
        // If true, anchored class will be applied.
        this.modal.className = this.modal.className + (this.modal.offsetHeight > window.innerHeight ? ' cm-modal-open cm-modal-anchored ' : ' cm-modal-open');
        this.overlay.className = this.overlay.className + ' cm-modal-open';
    }

    // Private Methods

    function buildOut() {
        var content, contentHolder, docFrag;

        // If content is an HTML string, append the html string.
        // If content is a domNode, append its content.

        if(typeof this.options.content === 'string') {
            content = this.options.content;
        } else {
            content = this.options.content.innerHTML;
        }

        // Create a Documentframent to build with
        docFrag = document.createDocumentFragment();

        // Create modal element.
        this.modal                  = document.createElement('div');
        this.modal.className        = 'cm-modal ' + this.options.className;
        this.modal.style.minWidth   = this.options.minWidth + 'px';
        this.modal.style.maxWidth   = this.options.maxWidth + 'px';

        // if closeButton option true, add close button
        if(this.options.closeButton === true) {
            this.closeButton           = document.createElement('button');
            this.closeButton.className = 'cm-modal-close close-button';
            this.closeButton.innerHTML = 'X';
            this.modal.appendChild(this.closeButton);
        }

        // if overlay is true, then we add it!
        if(this.options.overlay === true) {
            this.overlay           = document.createElement('div');
            this.overlay.className = 'cm-modal-overlay ' + this.options.className;

            docFrag.appendChild(this.overlay);
        }

        // Create content area and append it to modal
        contentHolder           = document.createElement('div');
        contentHolder.className = 'cm-modal-content';
        contentHolder.innerHTML = content;

        this.modal.appendChild(contentHolder);

        // Append modal to docFrag
        docFrag.appendChild(this.modal);

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
        if(this.closeButton) {
            this.closeButton.addEventListener('click', this.close.bind(this));
        }

        if(this.overlay) {
            this.overlay.addEventListener('click', this.close.bind(this));
        }
    }

    function transitionSelect() {
        var el = document.createElement('div');
        if (el.style.WebkitTransition) return 'webkitTransitionEnd';
        if (el.style.OTransition) return 'oTransitionEnd';
        return 'transitionend';
    }
}());

/*  EXAMPLE  */
// ================


var myContent = document.querySelector('.modal-example');

var myModal = new Modal({
  content: myContent
});

var triggerButton = document.getElementById('trigger');

triggerButton.addEventListener('click', function() {
    myModal.open();
});
