/*!
 * jQuery JavaScript Library v1.10.1
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright 2005, 2013 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2013-05-30T21:49Z
 */

(function( window, undefined ) {

// Can't do this because several apps including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
// Support: Firefox 18+
//"use strict";
var
	// The deferred used on DOM ready
	readyList,

	// A central reference to the root jQuery(document)
	rootjQuery,

	// Support: IE<10
	// For `typeof xmlNode.method` instead of `xmlNode.method !== undefined`
	core_strundefined = typeof undefined,

	// Use the correct document accordingly with window argument (sandbox)
	location = window.location,
	document = window.document,
	docElem = document.documentElement,

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$,

	// [[Class]] -> type pairs
	class2type = {},

	// List of deleted data cache ids, so we can reuse them
	core_deletedIds = [],

	core_version = "1.10.1",

	// Save a reference to some core methods
	core_concat = core_deletedIds.concat,
	core_push = core_deletedIds.push,
	core_slice = core_deletedIds.slice,
	core_indexOf = core_deletedIds.indexOf,
	core_toString = class2type.toString,
	core_hasOwn = class2type.hasOwnProperty,
	core_trim = core_version.trim,

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {
		// The jQuery object is actually just the init constructor 'enhanced'
		return new jQuery.fn.init( selector, context, rootjQuery );
	},

	// Used for matching numbers
	core_pnum = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,

	// Used for splitting on whitespace
	core_rnotwhite = /\S+/g,

	// Make sure we trim BOM and NBSP (here's looking at you, Safari 5.0 and IE)
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

	// Match a standalone tag
	rsingleTag = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,

	// JSON RegExp
	rvalidchars = /^[\],:{}\s]*$/,
	rvalidbraces = /(?:^|:|,)(?:\s*\[)+/g,
	rvalidescape = /\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g,
	rvalidtokens = /"[^"\\\r\n]*"|true|false|null|-?(?:\d+\.|)\d+(?:[eE][+-]?\d+|)/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([\da-z])/gi,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	},

	// The ready event handler
	completed = function( event ) {

		// readyState === "complete" is good enough for us to call the dom ready in oldIE
		if ( document.addEventListener || event.type === "load" || document.readyState === "complete" ) {
			detach();
			jQuery.ready();
		}
	},
	// Clean-up method for dom ready events
	detach = function() {
		if ( document.addEventListener ) {
			document.removeEventListener( "DOMContentLoaded", completed, false );
			window.removeEventListener( "load", completed, false );

		} else {
			document.detachEvent( "onreadystatechange", completed );
			window.detachEvent( "onload", completed );
		}
	};

jQuery.fn = jQuery.prototype = {
	// The current version of jQuery being used
	jquery: core_version,

	constructor: jQuery,
	init: function( selector, context, rootjQuery ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector.charAt(0) === "<" && selector.charAt( selector.length - 1 ) === ">" && selector.length >= 3 ) {
				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && (match[1] || !context) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[1] ) {
					context = context instanceof jQuery ? context[0] : context;

					// scripts is true for back-compat
					jQuery.merge( this, jQuery.parseHTML(
						match[1],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[1] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {
							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[2] );

					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					if ( elem && elem.parentNode ) {
						// Handle the case where IE and Opera return items
						// by name instead of ID
						if ( elem.id !== match[2] ) {
							return rootjQuery.find( selector );
						}

						// Otherwise, we inject the element directly into the jQuery object
						this.length = 1;
						this[0] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || rootjQuery ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this.context = this[0] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return rootjQuery.ready( selector );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	},

	// Start with an empty selector
	selector: "",

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return core_slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num == null ?

			// Return a 'clean' array
			this.toArray() :

			// Return just the object
			( num < 0 ? this[ this.length + num ] : this[ num ] );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;
		ret.context = this.context;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	// (You can seed the arguments with an array of args, but this is
	// only used internally.)
	each: function( callback, args ) {
		return jQuery.each( this, callback, args );
	},

	ready: function( fn ) {
		// Add the callback
		jQuery.ready.promise().done( fn );

		return this;
	},

	slice: function() {
		return this.pushStack( core_slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[j] ] : [] );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map(this, function( elem, i ) {
			return callback.call( elem, i, elem );
		}));
	},

	end: function() {
		return this.prevObject || this.constructor(null);
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: core_push,
	sort: [].sort,
	splice: [].splice
};

// Give the init function the jQuery prototype for later instantiation
jQuery.fn.init.prototype = jQuery.fn;

jQuery.extend = jQuery.fn.extend = function() {
	var src, copyIsArray, copy, name, options, clone,
		target = arguments[0] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;
		target = arguments[1] || {};
		// skip the boolean and the target
		i = 2;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction(target) ) {
		target = {};
	}

	// extend jQuery itself if only one argument is passed
	if ( length === i ) {
		target = this;
		--i;
	}

	for ( ; i < length; i++ ) {
		// Only deal with non-null/undefined values
		if ( (options = arguments[ i ]) != null ) {
			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ) {
					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray(src) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject(src) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend({
	// Unique for each copy of jQuery on the page
	// Non-digits removed to match rinlinejQuery
	expando: "jQuery" + ( core_version + Math.random() ).replace( /\D/g, "" ),

	noConflict: function( deep ) {
		if ( window.$ === jQuery ) {
			window.$ = _$;
		}

		if ( deep && window.jQuery === jQuery ) {
			window.jQuery = _jQuery;
		}

		return jQuery;
	},

	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Make sure body exists, at least, in case IE gets a little overzealous (ticket #5443).
		if ( !document.body ) {
			return setTimeout( jQuery.ready );
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );

		// Trigger any bound ready events
		if ( jQuery.fn.trigger ) {
			jQuery( document ).trigger("ready").off("ready");
		}
	},

	// See test/unit/core.js for details concerning isFunction.
	// Since version 1.3, DOM methods and functions like alert
	// aren't supported. They return false on IE (#2968).
	isFunction: function( obj ) {
		return jQuery.type(obj) === "function";
	},

	isArray: Array.isArray || function( obj ) {
		return jQuery.type(obj) === "array";
	},

	isWindow: function( obj ) {
		/* jshint eqeqeq: false */
		return obj != null && obj == obj.window;
	},

	isNumeric: function( obj ) {
		return !isNaN( parseFloat(obj) ) && isFinite( obj );
	},

	type: function( obj ) {
		if ( obj == null ) {
			return String( obj );
		}
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ core_toString.call(obj) ] || "object" :
			typeof obj;
	},

	isPlainObject: function( obj ) {
		var key;

		// Must be an Object.
		// Because of IE, we also have to check the presence of the constructor property.
		// Make sure that DOM nodes and window objects don't pass through, as well
		if ( !obj || jQuery.type(obj) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		try {
			// Not own constructor property must be Object
			if ( obj.constructor &&
				!core_hasOwn.call(obj, "constructor") &&
				!core_hasOwn.call(obj.constructor.prototype, "isPrototypeOf") ) {
				return false;
			}
		} catch ( e ) {
			// IE8,9 Will throw exceptions on certain host objects #9897
			return false;
		}

		// Support: IE<9
		// Handle iteration over inherited properties before own properties.
		if ( jQuery.support.ownLast ) {
			for ( key in obj ) {
				return core_hasOwn.call( obj, key );
			}
		}

		// Own properties are enumerated firstly, so to speed up,
		// if last one is own, then all properties are own.
		for ( key in obj ) {}

		return key === undefined || core_hasOwn.call( obj, key );
	},

	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	error: function( msg ) {
		throw new Error( msg );
	},

	// data: string of html
	// context (optional): If specified, the fragment will be created in this context, defaults to document
	// keepScripts (optional): If true, will include scripts passed in the html string
	parseHTML: function( data, context, keepScripts ) {
		if ( !data || typeof data !== "string" ) {
			return null;
		}
		if ( typeof context === "boolean" ) {
			keepScripts = context;
			context = false;
		}
		context = context || document;

		var parsed = rsingleTag.exec( data ),
			scripts = !keepScripts && [];

		// Single tag
		if ( parsed ) {
			return [ context.createElement( parsed[1] ) ];
		}

		parsed = jQuery.buildFragment( [ data ], context, scripts );
		if ( scripts ) {
			jQuery( scripts ).remove();
		}
		return jQuery.merge( [], parsed.childNodes );
	},

	parseJSON: function( data ) {
		// Attempt to parse using the native JSON parser first
		if ( window.JSON && window.JSON.parse ) {
			return window.JSON.parse( data );
		}

		if ( data === null ) {
			return data;
		}

		if ( typeof data === "string" ) {

			// Make sure leading/trailing whitespace is removed (IE can't handle it)
			data = jQuery.trim( data );

			if ( data ) {
				// Make sure the incoming data is actual JSON
				// Logic borrowed from http://json.org/json2.js
				if ( rvalidchars.test( data.replace( rvalidescape, "@" )
					.replace( rvalidtokens, "]" )
					.replace( rvalidbraces, "")) ) {

					return ( new Function( "return " + data ) )();
				}
			}
		}

		jQuery.error( "Invalid JSON: " + data );
	},

	// Cross-browser xml parsing
	parseXML: function( data ) {
		var xml, tmp;
		if ( !data || typeof data !== "string" ) {
			return null;
		}
		try {
			if ( window.DOMParser ) { // Standard
				tmp = new DOMParser();
				xml = tmp.parseFromString( data , "text/xml" );
			} else { // IE
				xml = new ActiveXObject( "Microsoft.XMLDOM" );
				xml.async = "false";
				xml.loadXML( data );
			}
		} catch( e ) {
			xml = undefined;
		}
		if ( !xml || !xml.documentElement || xml.getElementsByTagName( "parsererror" ).length ) {
			jQuery.error( "Invalid XML: " + data );
		}
		return xml;
	},

	noop: function() {},

	// Evaluates a script in a global context
	// Workarounds based on findings by Jim Driscoll
	// http://weblogs.java.net/blog/driscoll/archive/2009/09/08/eval-javascript-global-context
	globalEval: function( data ) {
		if ( data && jQuery.trim( data ) ) {
			// We use execScript on Internet Explorer
			// We use an anonymous function so that context is window
			// rather than jQuery in Firefox
			( window.execScript || function( data ) {
				window[ "eval" ].call( window, data );
			} )( data );
		}
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	// args is for internal usage only
	each: function( obj, callback, args ) {
		var value,
			i = 0,
			length = obj.length,
			isArray = isArraylike( obj );

		if ( args ) {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			}

		// A special, fast, case for the most common use of each
		} else {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			}
		}

		return obj;
	},

	// Use native String.trim function wherever possible
	trim: core_trim && !core_trim.call("\uFEFF\xA0") ?
		function( text ) {
			return text == null ?
				"" :
				core_trim.call( text );
		} :

		// Otherwise use our own trimming functionality
		function( text ) {
			return text == null ?
				"" :
				( text + "" ).replace( rtrim, "" );
		},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArraylike( Object(arr) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				core_push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		var len;

		if ( arr ) {
			if ( core_indexOf ) {
				return core_indexOf.call( arr, elem, i );
			}

			len = arr.length;
			i = i ? i < 0 ? Math.max( 0, len + i ) : i : 0;

			for ( ; i < len; i++ ) {
				// Skip accessing in sparse arrays
				if ( i in arr && arr[ i ] === elem ) {
					return i;
				}
			}
		}

		return -1;
	},

	merge: function( first, second ) {
		var l = second.length,
			i = first.length,
			j = 0;

		if ( typeof l === "number" ) {
			for ( ; j < l; j++ ) {
				first[ i++ ] = second[ j ];
			}
		} else {
			while ( second[j] !== undefined ) {
				first[ i++ ] = second[ j++ ];
			}
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, inv ) {
		var retVal,
			ret = [],
			i = 0,
			length = elems.length;
		inv = !!inv;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			retVal = !!callback( elems[ i ], i );
			if ( inv !== retVal ) {
				ret.push( elems[ i ] );
			}
		}

		return ret;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var value,
			i = 0,
			length = elems.length,
			isArray = isArraylike( elems ),
			ret = [];

		// Go through the array, translating each of the items to their
		if ( isArray ) {
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret[ ret.length ] = value;
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret[ ret.length ] = value;
				}
			}
		}

		// Flatten any nested arrays
		return core_concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var args, proxy, tmp;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = core_slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( core_slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	// Multifunctional method to get and set values of a collection
	// The value/s can optionally be executed if it's a function
	access: function( elems, fn, key, value, chainable, emptyGet, raw ) {
		var i = 0,
			length = elems.length,
			bulk = key == null;

		// Sets many values
		if ( jQuery.type( key ) === "object" ) {
			chainable = true;
			for ( i in key ) {
				jQuery.access( elems, fn, i, key[i], true, emptyGet, raw );
			}

		// Sets one value
		} else if ( value !== undefined ) {
			chainable = true;

			if ( !jQuery.isFunction( value ) ) {
				raw = true;
			}

			if ( bulk ) {
				// Bulk operations run against the entire set
				if ( raw ) {
					fn.call( elems, value );
					fn = null;

				// ...except when executing function values
				} else {
					bulk = fn;
					fn = function( elem, key, value ) {
						return bulk.call( jQuery( elem ), value );
					};
				}
			}

			if ( fn ) {
				for ( ; i < length; i++ ) {
					fn( elems[i], key, raw ? value : value.call( elems[i], i, fn( elems[i], key ) ) );
				}
			}
		}

		return chainable ?
			elems :

			// Gets
			bulk ?
				fn.call( elems ) :
				length ? fn( elems[0], key ) : emptyGet;
	},

	now: function() {
		return ( new Date() ).getTime();
	},

	// A method for quickly swapping in/out CSS properties to get correct calculations.
	// Note: this method belongs to the css module but it's needed here for the support module.
	// If support gets modularized, this method should be moved back to the css module.
	swap: function( elem, options, callback, args ) {
		var ret, name,
			old = {};

		// Remember the old values, and insert the new ones
		for ( name in options ) {
			old[ name ] = elem.style[ name ];
			elem.style[ name ] = options[ name ];
		}

		ret = callback.apply( elem, args || [] );

		// Revert the old values
		for ( name in options ) {
			elem.style[ name ] = old[ name ];
		}

		return ret;
	}
});

jQuery.ready.promise = function( obj ) {
	if ( !readyList ) {

		readyList = jQuery.Deferred();

		// Catch cases where $(document).ready() is called after the browser event has already occurred.
		// we once tried to use readyState "interactive" here, but it caused issues like the one
		// discovered by ChrisS here: http://bugs.jquery.com/ticket/12282#comment:15
		if ( document.readyState === "complete" ) {
			// Handle it asynchronously to allow scripts the opportunity to delay ready
			setTimeout( jQuery.ready );

		// Standards-based browsers support DOMContentLoaded
		} else if ( document.addEventListener ) {
			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", completed, false );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", completed, false );

		// If IE event model is used
		} else {
			// Ensure firing before onload, maybe late but safe also for iframes
			document.attachEvent( "onreadystatechange", completed );

			// A fallback to window.onload, that will always work
			window.attachEvent( "onload", completed );

			// If IE and not a frame
			// continually check to see if the document is ready
			var top = false;

			try {
				top = window.frameElement == null && document.documentElement;
			} catch(e) {}

			if ( top && top.doScroll ) {
				(function doScrollCheck() {
					if ( !jQuery.isReady ) {

						try {
							// Use the trick by Diego Perini
							// http://javascript.nwbox.com/IEContentLoaded/
							top.doScroll("left");
						} catch(e) {
							return setTimeout( doScrollCheck, 50 );
						}

						// detach all dom ready events
						detach();

						// and execute any waiting functions
						jQuery.ready();
					}
				})();
			}
		}
	}
	return readyList.promise( obj );
};

// Populate the class2type map
jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
});

function isArraylike( obj ) {
	var length = obj.length,
		type = jQuery.type( obj );

	if ( jQuery.isWindow( obj ) ) {
		return false;
	}

	if ( obj.nodeType === 1 && length ) {
		return true;
	}

	return type === "array" || type !== "function" &&
		( length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj );
}

// All jQuery objects should point back to these
rootjQuery = jQuery(document);
/*!
 * Sizzle CSS Selector Engine v1.9.4-pre
 * http://sizzlejs.com/
 *
 * Copyright 2013 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2013-05-27
 */
(function( window, undefined ) {

var i,
	support,
	cachedruns,
	Expr,
	getText,
	isXML,
	compile,
	outermostContext,
	sortInput,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + -(new Date()),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	hasDuplicate = false,
	sortOrder = function() { return 0; },

	// General-purpose constants
	strundefined = typeof undefined,
	MAX_NEGATIVE = 1 << 31,

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf if we can't use a native one
	indexOf = arr.indexOf || function( elem ) {
		var i = 0,
			len = this.length;
		for ( ; i < len; i++ ) {
			if ( this[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// Whitespace characters http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",
	// http://www.w3.org/TR/css3-syntax/#characters
	characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

	// Loosely modeled on CSS identifier characters
	// An unquoted value should be a CSS identifier http://www.w3.org/TR/css3-selectors/#attribute-selectors
	// Proper syntax: http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = characterEncoding.replace( "w", "w#" ),

	// Acceptable operators http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + characterEncoding + ")" + whitespace +
		"*(?:([*^$|!~]?=)" + whitespace + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + identifier + ")|)|)" + whitespace + "*\\]",

	// Prefer arguments quoted,
	//   then not containing pseudos/brackets,
	//   then attribute selectors/non-parenthetical expressions,
	//   then anything else
	// These preferences are here to reduce the number of selectors
	//   needing tokenize in the PSEUDO preFilter
	pseudos = ":(" + characterEncoding + ")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|" + attributes.replace( 3, 8 ) + ")*)|.*)\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rsibling = new RegExp( whitespace + "*[+~]" ),
	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + characterEncoding + ")" ),
		"CLASS": new RegExp( "^\\.(" + characterEncoding + ")" ),
		"TAG": new RegExp( "^(" + characterEncoding.replace( "w", "w*" ) + ")" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rescape = /'|\\/g,

	// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			// BMP codepoint
			high < 0 ?
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	};

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var match, elem, m, nodeType,
		// QSA vars
		i, groups, old, nid, newContext, newSelector;

	if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
		setDocument( context );
	}

	context = context || document;
	results = results || [];

	if ( !selector || typeof selector !== "string" ) {
		return results;
	}

	if ( (nodeType = context.nodeType) !== 1 && nodeType !== 9 ) {
		return [];
	}

	if ( documentIsHTML && !seed ) {

		// Shortcuts
		if ( (match = rquickExpr.exec( selector )) ) {
			// Speed-up: Sizzle("#ID")
			if ( (m = match[1]) ) {
				if ( nodeType === 9 ) {
					elem = context.getElementById( m );
					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					if ( elem && elem.parentNode ) {
						// Handle the case where IE, Opera, and Webkit return items
						// by name instead of ID
						if ( elem.id === m ) {
							results.push( elem );
							return results;
						}
					} else {
						return results;
					}
				} else {
					// Context is not a document
					if ( context.ownerDocument && (elem = context.ownerDocument.getElementById( m )) &&
						contains( context, elem ) && elem.id === m ) {
						results.push( elem );
						return results;
					}
				}

			// Speed-up: Sizzle("TAG")
			} else if ( match[2] ) {
				push.apply( results, context.getElementsByTagName( selector ) );
				return results;

			// Speed-up: Sizzle(".CLASS")
			} else if ( (m = match[3]) && support.getElementsByClassName && context.getElementsByClassName ) {
				push.apply( results, context.getElementsByClassName( m ) );
				return results;
			}
		}

		// QSA path
		if ( support.qsa && (!rbuggyQSA || !rbuggyQSA.test( selector )) ) {
			nid = old = expando;
			newContext = context;
			newSelector = nodeType === 9 && selector;

			// qSA works strangely on Element-rooted queries
			// We can work around this by specifying an extra ID on the root
			// and working up from there (Thanks to Andrew Dupont for the technique)
			// IE 8 doesn't work on object elements
			if ( nodeType === 1 && context.nodeName.toLowerCase() !== "object" ) {
				groups = tokenize( selector );

				if ( (old = context.getAttribute("id")) ) {
					nid = old.replace( rescape, "\\$&" );
				} else {
					context.setAttribute( "id", nid );
				}
				nid = "[id='" + nid + "'] ";

				i = groups.length;
				while ( i-- ) {
					groups[i] = nid + toSelector( groups[i] );
				}
				newContext = rsibling.test( selector ) && context.parentNode || context;
				newSelector = groups.join(",");
			}

			if ( newSelector ) {
				try {
					push.apply( results,
						newContext.querySelectorAll( newSelector )
					);
					return results;
				} catch(qsaError) {
				} finally {
					if ( !old ) {
						context.removeAttribute("id");
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * For feature detection
 * @param {Function} fn The function to test for native support
 */
function isNative( fn ) {
	return rnative.test( fn + "" );
}

/**
 * Create key-value caches of limited size
 * @returns {Function(string, Object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key += " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function assert( fn ) {
	var div = document.createElement("div");

	try {
		return !!fn( div );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( div.parentNode ) {
			div.parentNode.removeChild( div );
		}
		// release memory in IE
		div = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied if the test fails
 * @param {Boolean} test The result of a test. If true, null will be set as the handler in leiu of the specified handler
 */
function addHandle( attrs, handler, test ) {
	attrs = attrs.split("|");
	var current,
		i = attrs.length,
		setHandle = test ? null : handler;

	while ( i-- ) {
		// Don't override a user's handler
		if ( !(current = Expr.attrHandle[ attrs[i] ]) || current === handler ) {
			Expr.attrHandle[ attrs[i] ] = setHandle;
		}
	}
}

/**
 * Fetches boolean attributes by node
 * @param {Element} elem
 * @param {String} name
 */
function boolHandler( elem, name ) {
	// XML does not need to be checked as this will not be assigned for XML documents
	var val = elem.getAttributeNode( name );
	return val && val.specified ?
		val.value :
		elem[ name ] === true ? name.toLowerCase() : null;
}

/**
 * Fetches attributes without interpolation
 * http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
 * @param {Element} elem
 * @param {String} name
 */
function interpolationHandler( elem, name ) {
	// XML does not need to be checked as this will not be assigned for XML documents
	return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
}

/**
 * Uses defaultValue to retrieve value in IE6/7
 * @param {Element} elem
 * @param {String} name
 */
function valueHandler( elem ) {
	// Ignore the value *property* on inputs by using defaultValue
	// Fallback to Sizzle.attr by returning undefined where appropriate
	// XML does not need to be checked as this will not be assigned for XML documents
	if ( elem.nodeName.toLowerCase() === "input" ) {
		return elem.defaultValue;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns Returns -1 if a precedes b, 1 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			( ~b.sourceIndex || MAX_NEGATIVE ) -
			( ~a.sourceIndex || MAX_NEGATIVE );

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Detect xml
 * @param {Element|Object} elem An element or a document
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var doc = node ? node.ownerDocument || node : preferredDoc,
		parent = doc.parentWindow;

	// If no document and documentElement is available, return
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Set our document
	document = doc;
	docElem = doc.documentElement;

	// Support tests
	documentIsHTML = !isXML( doc );

	// Support: IE>8
	// If iframe document is assigned to "document" variable and if iframe has been reloaded,
	// IE will throw "permission denied" error when accessing "document" variable, see jQuery #13936
	if ( parent && parent.frameElement ) {
		parent.attachEvent( "onbeforeunload", function() {
			setDocument();
		});
	}

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties (excepting IE8 booleans)
	support.attributes = assert(function( div ) {

		// Support: IE<8
		// Prevent attribute/property "interpolation"
		div.innerHTML = "<a href='#'></a>";
		addHandle( "type|href|height|width", interpolationHandler, div.firstChild.getAttribute("href") === "#" );

		// Support: IE<9
		// Use getAttributeNode to fetch booleans when getAttribute lies
		addHandle( booleans, boolHandler, div.getAttribute("disabled") == null );

		div.className = "i";
		return !div.getAttribute("className");
	});

	// Support: IE<9
	// Retrieving value should defer to defaultValue
	support.input = assert(function( div ) {
		div.innerHTML = "<input>";
		div.firstChild.setAttribute( "value", "" );
		return div.firstChild.getAttribute( "value" ) === "";
	});

	// IE6/7 still return empty string for value,
	// but are actually retrieving the property
	addHandle( "value", valueHandler, support.attributes && support.input );

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( div ) {
		div.appendChild( doc.createComment("") );
		return !div.getElementsByTagName("*").length;
	});

	// Check if getElementsByClassName can be trusted
	support.getElementsByClassName = assert(function( div ) {
		div.innerHTML = "<div class='a'></div><div class='a i'></div>";

		// Support: Safari<4
		// Catch class over-caching
		div.firstChild.className = "i";
		// Support: Opera<10
		// Catch gEBCN failure to find non-leading classes
		return div.getElementsByClassName("i").length === 2;
	});

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( div ) {
		docElem.appendChild( div ).id = expando;
		return !doc.getElementsByName || !doc.getElementsByName( expando ).length;
	});

	// ID find and filter
	if ( support.getById ) {
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== strundefined && documentIsHTML ) {
				var m = context.getElementById( id );
				// Check parentNode to catch when Blackberry 4.6 returns
				// nodes that are no longer in the document #6963
				return m && m.parentNode ? [m] : [];
			}
		};
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
	} else {
		// Support: IE6/7
		// getElementById is not reliable as a find shortcut
		delete Expr.find["ID"];

		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== strundefined && elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== strundefined ) {
				return context.getElementsByTagName( tag );
			}
		} :
		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== strundefined && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See http://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = isNative(doc.querySelectorAll)) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// http://bugs.jquery.com/ticket/12359
			div.innerHTML = "<select><option selected=''></option></select>";

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}
		});

		assert(function( div ) {

			// Support: Opera 10-12/IE8
			// ^= $= *= and empty values
			// Should not select anything
			// Support: Windows 8 Native Apps
			// The type attribute is restricted during .innerHTML assignment
			var input = doc.createElement("input");
			input.setAttribute( "type", "hidden" );
			div.appendChild( input ).setAttribute( "t", "" );

			if ( div.querySelectorAll("[t^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			div.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = isNative( (matches = docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( div ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( div, "div" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( div, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */

	// Element contains another
	// Purposefully does not implement inclusive descendent
	// As in, an element does not contain itself
	contains = isNative(docElem.contains) || docElem.compareDocumentPosition ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
	// Detached nodes confoundingly follow *each other*
	support.sortDetached = assert(function( div1 ) {
		// Should return 1, but returns 4 (following)
		return div1.compareDocumentPosition( doc.createElement("div") ) & 1;
	});

	// Document order sorting
	sortOrder = docElem.compareDocumentPosition ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var compare = b.compareDocumentPosition && a.compareDocumentPosition && a.compareDocumentPosition( b );

		if ( compare ) {
			// Disconnected nodes
			if ( compare & 1 ||
				(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

				// Choose the first element that is related to our preferred document
				if ( a === doc || contains(preferredDoc, a) ) {
					return -1;
				}
				if ( b === doc || contains(preferredDoc, b) ) {
					return 1;
				}

				// Maintain original order
				return sortInput ?
					( indexOf.call( sortInput, a ) - indexOf.call( sortInput, b ) ) :
					0;
			}

			return compare & 4 ? -1 : 1;
		}

		// Not directly comparable, sort on existence of method
		return a.compareDocumentPosition ? -1 : 1;
	} :
	function( a, b ) {
		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;

		// Parentless nodes are either documents or disconnected
		} else if ( !aup || !bup ) {
			return a === doc ? -1 :
				b === doc ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf.call( sortInput, a ) - indexOf.call( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return doc;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch(e) {}
	}

	return Sizzle( expr, document, null, [elem] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = ( fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined );

	return val === undefined ?
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null :
		val;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		for ( ; (node = elem[i]); i++ ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (see #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[5] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] && match[4] !== undefined ) {
				match[2] = match[4];

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== strundefined && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, outerCache, node, diff, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) {
										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {
							// Seek `elem` from a previously-cached index
							outerCache = parent[ expando ] || (parent[ expando ] = {});
							cache = outerCache[ type ] || [];
							nodeIndex = cache[0] === dirruns && cache[1];
							diff = cache[0] === dirruns && cache[2];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									outerCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						// Use previously-cached element index if available
						} else if ( useCache && (cache = (elem[ expando ] || (elem[ expando ] = {}))[ type ]) && cache[0] === dirruns ) {
							diff = cache[1];

						// xml :nth-child(...) or :nth-last-child(...) or :nth(-last)?-of-type(...)
						} else {
							// Use the same loop as above to seek `elem` from the start
							while ( (node = ++nodeIndex && node && node[ dir ] ||
								(diff = nodeIndex = 0) || start.pop()) ) {

								if ( ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) && ++diff ) {
									// Cache the index of each encountered element
									if ( useCache ) {
										(node[ expando ] || (node[ expando ] = {}))[ type ] = [ dirruns, diff ];
									}

									if ( node === elem ) {
										break;
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf.call( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		"disabled": function( elem ) {
			return elem.disabled === true;
		},

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is only affected by element nodes and content nodes(including text(3), cdata(4)),
			//   not comment, processing instructions, or others
			// Thanks to Diego Perini for the nodeName shortcut
			//   Greater than "@" means alpha characters (specifically not starting with "#" or "?")
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeName > "@" || elem.nodeType === 3 || elem.nodeType === 4 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			// IE6 and 7 will map elem.type to 'text' for new HTML5 types (search, etc)
			// use getAttribute instead to test this case
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === elem.type );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

function tokenize( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( tokens = [] );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
}

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		checkNonElements = base && dir === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var data, cache, outerCache,
				dirkey = dirruns + " " + doneName;

			// We can't set arbitrary data on XML nodes, so they don't benefit from dir caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});
						if ( (cache = outerCache[ dir ]) && cache[0] === dirkey ) {
							if ( (data = cache[1]) === true || data === cachedruns ) {
								return data === true;
							}
						} else {
							cache = outerCache[ dir ] = [ dirkey ];
							cache[1] = matcher( elem, context, xml ) || cachedruns;
							if ( cache[1] === true ) {
								return true;
							}
						}
					}
				}
			}
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf.call( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf.call( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			return ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	// A counter to specify which element is currently being matched
	var matcherCachedRuns = 0,
		bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, expandContext ) {
			var elem, j, matcher,
				setMatched = [],
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				outermost = expandContext != null,
				contextBackup = outermostContext,
				// We must always have either seed elements or context
				elems = seed || byElement && Expr.find["TAG"]( "*", expandContext && context.parentNode || context ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1);

			if ( outermost ) {
				outermostContext = context !== document && context;
				cachedruns = matcherCachedRuns;
			}

			// Add elements passing elementMatchers directly to results
			// Keep `i` a string if there are no elements so `matchedCount` will be "00" below
			for ( ; (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context, xml ) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
						cachedruns = ++matcherCachedRuns;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// Apply set filters to unmatched elements
			matchedCount += i;
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, group /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !group ) {
			group = tokenize( selector );
		}
		i = group.length;
		while ( i-- ) {
			cached = matcherFromTokens( group[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );
	}
	return cached;
};

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function select( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		match = tokenize( selector );

	if ( !seed ) {
		// Try to minimize operations if there is only one group
		if ( match.length === 1 ) {

			// Take a shortcut and set the context if the root selector is an ID
			tokens = match[0] = match[0].slice( 0 );
			if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
					support.getById && context.nodeType === 9 && documentIsHTML &&
					Expr.relative[ tokens[1].type ] ) {

				context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
				if ( !context ) {
					return results;
				}
				selector = selector.slice( tokens.shift().value.length );
			}

			// Fetch a seed set for right-to-left matching
			i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
			while ( i-- ) {
				token = tokens[i];

				// Abort if we hit a combinator
				if ( Expr.relative[ (type = token.type) ] ) {
					break;
				}
				if ( (find = Expr.find[ type ]) ) {
					// Search, expanding context for leading sibling combinators
					if ( (seed = find(
						token.matches[0].replace( runescape, funescape ),
						rsibling.test( tokens[0].type ) && context.parentNode || context
					)) ) {

						// If seed is empty or no tokens remain, we can return early
						tokens.splice( i, 1 );
						selector = seed.length && toSelector( tokens );
						if ( !selector ) {
							push.apply( results, seed );
							return results;
						}

						break;
					}
				}
			}
		}
	}

	// Compile and execute a filtering function
	// Provide `match` to avoid retokenization if we modified the selector above
	compile( selector, match )(
		seed,
		context,
		!documentIsHTML,
		results,
		rsibling.test( selector )
	);
	return results;
}

// Deprecated
Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Initialize against the default document
setDocument();

// Support: Chrome<<14
// Always assume duplicates if they aren't passed to the comparison function
[0, 0].sort( sortOrder );
support.detectDuplicates = hasDuplicate;

jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[":"] = jQuery.expr.pseudos;
jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;


})( window );
// String to Object options format cache
var optionsCache = {};

// Convert String-formatted options into Object-formatted ones and store in cache
function createOptions( options ) {
	var object = optionsCache[ options ] = {};
	jQuery.each( options.match( core_rnotwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	});
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		( optionsCache[ options ] || createOptions( options ) ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,
		// Last fire value (for non-forgettable lists)
		memory,
		// Flag to know if list was already fired
		fired,
		// End of the loop when firing
		firingLength,
		// Index of currently firing callback (modified by remove if needed)
		firingIndex,
		// First callback to fire (used internally by add and fireWith)
		firingStart,
		// Actual callback list
		list = [],
		// Stack of fire calls for repeatable lists
		stack = !options.once && [],
		// Fire callbacks
		fire = function( data ) {
			memory = options.memory && data;
			fired = true;
			firingIndex = firingStart || 0;
			firingStart = 0;
			firingLength = list.length;
			firing = true;
			for ( ; list && firingIndex < firingLength; firingIndex++ ) {
				if ( list[ firingIndex ].apply( data[ 0 ], data[ 1 ] ) === false && options.stopOnFalse ) {
					memory = false; // To prevent further calls using add
					break;
				}
			}
			firing = false;
			if ( list ) {
				if ( stack ) {
					if ( stack.length ) {
						fire( stack.shift() );
					}
				} else if ( memory ) {
					list = [];
				} else {
					self.disable();
				}
			}
		},
		// Actual Callbacks object
		self = {
			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {
					// First, we save the current length
					var start = list.length;
					(function add( args ) {
						jQuery.each( args, function( _, arg ) {
							var type = jQuery.type( arg );
							if ( type === "function" ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && type !== "string" ) {
								// Inspect recursively
								add( arg );
							}
						});
					})( arguments );
					// Do we need to add the callbacks to the
					// current firing batch?
					if ( firing ) {
						firingLength = list.length;
					// With memory, if we're not firing then
					// we should call right away
					} else if ( memory ) {
						firingStart = start;
						fire( memory );
					}
				}
				return this;
			},
			// Remove a callback from the list
			remove: function() {
				if ( list ) {
					jQuery.each( arguments, function( _, arg ) {
						var index;
						while( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
							list.splice( index, 1 );
							// Handle firing indexes
							if ( firing ) {
								if ( index <= firingLength ) {
									firingLength--;
								}
								if ( index <= firingIndex ) {
									firingIndex--;
								}
							}
						}
					});
				}
				return this;
			},
			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ? jQuery.inArray( fn, list ) > -1 : !!( list && list.length );
			},
			// Remove all callbacks from the list
			empty: function() {
				list = [];
				firingLength = 0;
				return this;
			},
			// Have the list do nothing anymore
			disable: function() {
				list = stack = memory = undefined;
				return this;
			},
			// Is it disabled?
			disabled: function() {
				return !list;
			},
			// Lock the list in its current state
			lock: function() {
				stack = undefined;
				if ( !memory ) {
					self.disable();
				}
				return this;
			},
			// Is it locked?
			locked: function() {
				return !stack;
			},
			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				args = args || [];
				args = [ context, args.slice ? args.slice() : args ];
				if ( list && ( !fired || stack ) ) {
					if ( firing ) {
						stack.push( args );
					} else {
						fire( args );
					}
				}
				return this;
			},
			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},
			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};
jQuery.extend({

	Deferred: function( func ) {
		var tuples = [
				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks("once memory"), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks("once memory"), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks("memory") ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				then: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;
					return jQuery.Deferred(function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {
							var action = tuple[ 0 ],
								fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];
							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[ tuple[1] ](function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.done( newDefer.resolve )
										.fail( newDefer.reject )
										.progress( newDefer.notify );
								} else {
									newDefer[ action + "With" ]( this === promise ? newDefer.promise() : this, fn ? [ returned ] : arguments );
								}
							});
						});
						fns = null;
					}).promise();
				},
				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Keep pipe for back-compat
		promise.pipe = promise.then;

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 3 ];

			// promise[ done | fail | progress ] = list.add
			promise[ tuple[1] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(function() {
					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			}

			// deferred[ resolve | reject | notify ]
			deferred[ tuple[0] ] = function() {
				deferred[ tuple[0] + "With" ]( this === deferred ? promise : this, arguments );
				return this;
			};
			deferred[ tuple[0] + "With" ] = list.fireWith;
		});

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( subordinate /* , ..., subordinateN */ ) {
		var i = 0,
			resolveValues = core_slice.call( arguments ),
			length = resolveValues.length,

			// the count of uncompleted subordinates
			remaining = length !== 1 || ( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

			// the master Deferred. If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

			// Update function for both resolve and progress values
			updateFunc = function( i, contexts, values ) {
				return function( value ) {
					contexts[ i ] = this;
					values[ i ] = arguments.length > 1 ? core_slice.call( arguments ) : value;
					if( values === progressValues ) {
						deferred.notifyWith( contexts, values );
					} else if ( !( --remaining ) ) {
						deferred.resolveWith( contexts, values );
					}
				};
			},

			progressValues, progressContexts, resolveContexts;

		// add listeners to Deferred subordinates; treat others as resolved
		if ( length > 1 ) {
			progressValues = new Array( length );
			progressContexts = new Array( length );
			resolveContexts = new Array( length );
			for ( ; i < length; i++ ) {
				if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
					resolveValues[ i ].promise()
						.done( updateFunc( i, resolveContexts, resolveValues ) )
						.fail( deferred.reject )
						.progress( updateFunc( i, progressContexts, progressValues ) );
				} else {
					--remaining;
				}
			}
		}

		// if we're not waiting on anything, resolve the master
		if ( !remaining ) {
			deferred.resolveWith( resolveContexts, resolveValues );
		}

		return deferred.promise();
	}
});
jQuery.support = (function( support ) {

	var all, a, input, select, fragment, opt, eventName, isSupported, i,
		div = document.createElement("div");

	// Setup
	div.setAttribute( "className", "t" );
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";

	// Finish early in limited (non-browser) environments
	all = div.getElementsByTagName("*") || [];
	a = div.getElementsByTagName("a")[ 0 ];
	if ( !a || !a.style || !all.length ) {
		return support;
	}

	// First batch of tests
	select = document.createElement("select");
	opt = select.appendChild( document.createElement("option") );
	input = div.getElementsByTagName("input")[ 0 ];

	a.style.cssText = "top:1px;float:left;opacity:.5";

	// Test setAttribute on camelCase class. If it works, we need attrFixes when doing get/setAttribute (ie6/7)
	support.getSetAttribute = div.className !== "t";

	// IE strips leading whitespace when .innerHTML is used
	support.leadingWhitespace = div.firstChild.nodeType === 3;

	// Make sure that tbody elements aren't automatically inserted
	// IE will insert them into empty tables
	support.tbody = !div.getElementsByTagName("tbody").length;

	// Make sure that link elements get serialized correctly by innerHTML
	// This requires a wrapper element in IE
	support.htmlSerialize = !!div.getElementsByTagName("link").length;

	// Get the style information from getAttribute
	// (IE uses .cssText instead)
	support.style = /top/.test( a.getAttribute("style") );

	// Make sure that URLs aren't manipulated
	// (IE normalizes it by default)
	support.hrefNormalized = a.getAttribute("href") === "/a";

	// Make sure that element opacity exists
	// (IE uses filter instead)
	// Use a regex to work around a WebKit issue. See #5145
	support.opacity = /^0.5/.test( a.style.opacity );

	// Verify style float existence
	// (IE uses styleFloat instead of cssFloat)
	support.cssFloat = !!a.style.cssFloat;

	// Check the default checkbox/radio value ("" on WebKit; "on" elsewhere)
	support.checkOn = !!input.value;

	// Make sure that a selected-by-default option has a working selected property.
	// (WebKit defaults to false instead of true, IE too, if it's in an optgroup)
	support.optSelected = opt.selected;

	// Tests for enctype support on a form (#6743)
	support.enctype = !!document.createElement("form").enctype;

	// Makes sure cloning an html5 element does not cause problems
	// Where outerHTML is undefined, this still works
	support.html5Clone = document.createElement("nav").cloneNode( true ).outerHTML !== "<:nav></:nav>";

	// Will be defined later
	support.inlineBlockNeedsLayout = false;
	support.shrinkWrapBlocks = false;
	support.pixelPosition = false;
	support.deleteExpando = true;
	support.noCloneEvent = true;
	support.reliableMarginRight = true;
	support.boxSizingReliable = true;

	// Make sure checked status is properly cloned
	input.checked = true;
	support.noCloneChecked = input.cloneNode( true ).checked;

	// Make sure that the options inside disabled selects aren't marked as disabled
	// (WebKit marks them as disabled)
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Support: IE<9
	try {
		delete div.test;
	} catch( e ) {
		support.deleteExpando = false;
	}

	// Check if we can trust getAttribute("value")
	input = document.createElement("input");
	input.setAttribute( "value", "" );
	support.input = input.getAttribute( "value" ) === "";

	// Check if an input maintains its value after becoming a radio
	input.value = "t";
	input.setAttribute( "type", "radio" );
	support.radioValue = input.value === "t";

	// #11217 - WebKit loses check when the name is after the checked attribute
	input.setAttribute( "checked", "t" );
	input.setAttribute( "name", "t" );

	fragment = document.createDocumentFragment();
	fragment.appendChild( input );

	// Check if a disconnected checkbox will retain its checked
	// value of true after appended to the DOM (IE6/7)
	support.appendChecked = input.checked;

	// WebKit doesn't clone checked state correctly in fragments
	support.checkClone = fragment.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE<9
	// Opera does not clone events (and typeof div.attachEvent === undefined).
	// IE9-10 clones events bound via attachEvent, but they don't trigger with .click()
	if ( div.attachEvent ) {
		div.attachEvent( "onclick", function() {
			support.noCloneEvent = false;
		});

		div.cloneNode( true ).click();
	}

	// Support: IE<9 (lack submit/change bubble), Firefox 17+ (lack focusin event)
	// Beware of CSP restrictions (https://developer.mozilla.org/en/Security/CSP)
	for ( i in { submit: true, change: true, focusin: true }) {
		div.setAttribute( eventName = "on" + i, "t" );

		support[ i + "Bubbles" ] = eventName in window || div.attributes[ eventName ].expando === false;
	}

	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	// Support: IE<9
	// Iteration over object's inherited properties before its own.
	for ( i in jQuery( support ) ) {
		break;
	}
	support.ownLast = i !== "0";

	// Run tests that need a body at doc ready
	jQuery(function() {
		var container, marginDiv, tds,
			divReset = "padding:0;margin:0;border:0;display:block;box-sizing:content-box;-moz-box-sizing:content-box;-webkit-box-sizing:content-box;",
			body = document.getElementsByTagName("body")[0];

		if ( !body ) {
			// Return for frameset docs that don't have a body
			return;
		}

		container = document.createElement("div");
		container.style.cssText = "border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px";

		body.appendChild( container ).appendChild( div );

		// Support: IE8
		// Check if table cells still have offsetWidth/Height when they are set
		// to display:none and there are still other visible table cells in a
		// table row; if so, offsetWidth/Height are not reliable for use when
		// determining if an element has been hidden directly using
		// display:none (it is still safe to use offsets if a parent element is
		// hidden; don safety goggles and see bug #4512 for more information).
		div.innerHTML = "<table><tr><td></td><td>t</td></tr></table>";
		tds = div.getElementsByTagName("td");
		tds[ 0 ].style.cssText = "padding:0;margin:0;border:0;display:none";
		isSupported = ( tds[ 0 ].offsetHeight === 0 );

		tds[ 0 ].style.display = "";
		tds[ 1 ].style.display = "none";

		// Support: IE8
		// Check if empty table cells still have offsetWidth/Height
		support.reliableHiddenOffsets = isSupported && ( tds[ 0 ].offsetHeight === 0 );

		// Check box-sizing and margin behavior.
		div.innerHTML = "";
		div.style.cssText = "box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;";

		// Workaround failing boxSizing test due to offsetWidth returning wrong value
		// with some non-1 values of body zoom, ticket #13543
		jQuery.swap( body, body.style.zoom != null ? { zoom: 1 } : {}, function() {
			support.boxSizing = div.offsetWidth === 4;
		});

		// Use window.getComputedStyle because jsdom on node.js will break without it.
		if ( window.getComputedStyle ) {
			support.pixelPosition = ( window.getComputedStyle( div, null ) || {} ).top !== "1%";
			support.boxSizingReliable = ( window.getComputedStyle( div, null ) || { width: "4px" } ).width === "4px";

			// Check if div with explicit width and no margin-right incorrectly
			// gets computed margin-right based on width of container. (#3333)
			// Fails in WebKit before Feb 2011 nightlies
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			marginDiv = div.appendChild( document.createElement("div") );
			marginDiv.style.cssText = div.style.cssText = divReset;
			marginDiv.style.marginRight = marginDiv.style.width = "0";
			div.style.width = "1px";

			support.reliableMarginRight =
				!parseFloat( ( window.getComputedStyle( marginDiv, null ) || {} ).marginRight );
		}

		if ( typeof div.style.zoom !== core_strundefined ) {
			// Support: IE<8
			// Check if natively block-level elements act like inline-block
			// elements when setting their display to 'inline' and giving
			// them layout
			div.innerHTML = "";
			div.style.cssText = divReset + "width:1px;padding:1px;display:inline;zoom:1";
			support.inlineBlockNeedsLayout = ( div.offsetWidth === 3 );

			// Support: IE6
			// Check if elements with layout shrink-wrap their children
			div.style.display = "block";
			div.innerHTML = "<div></div>";
			div.firstChild.style.width = "5px";
			support.shrinkWrapBlocks = ( div.offsetWidth !== 3 );

			if ( support.inlineBlockNeedsLayout ) {
				// Prevent IE 6 from affecting layout for positioned elements #11048
				// Prevent IE from shrinking the body in IE 7 mode #12869
				// Support: IE<8
				body.style.zoom = 1;
			}
		}

		body.removeChild( container );

		// Null elements to avoid leaks in IE
		container = div = tds = marginDiv = null;
	});

	// Null elements to avoid leaks in IE
	all = select = fragment = opt = a = input = null;

	return support;
})({});

var rbrace = /(?:\{[\s\S]*\}|\[[\s\S]*\])$/,
	rmultiDash = /([A-Z])/g;

function internalData( elem, name, data, pvt /* Internal Use Only */ ){
	if ( !jQuery.acceptData( elem ) ) {
		return;
	}

	var ret, thisCache,
		internalKey = jQuery.expando,

		// We have to handle DOM nodes and JS objects differently because IE6-7
		// can't GC object references properly across the DOM-JS boundary
		isNode = elem.nodeType,

		// Only DOM nodes need the global jQuery cache; JS object data is
		// attached directly to the object so GC can occur automatically
		cache = isNode ? jQuery.cache : elem,

		// Only defining an ID for JS objects if its cache already exists allows
		// the code to shortcut on the same path as a DOM node with no cache
		id = isNode ? elem[ internalKey ] : elem[ internalKey ] && internalKey;

	// Avoid doing any more work than we need to when trying to get data on an
	// object that has no data at all
	if ( (!id || !cache[id] || (!pvt && !cache[id].data)) && data === undefined && typeof name === "string" ) {
		return;
	}

	if ( !id ) {
		// Only DOM nodes need a new unique ID for each element since their data
		// ends up in the global cache
		if ( isNode ) {
			id = elem[ internalKey ] = core_deletedIds.pop() || jQuery.guid++;
		} else {
			id = internalKey;
		}
	}

	if ( !cache[ id ] ) {
		// Avoid exposing jQuery metadata on plain JS objects when the object
		// is serialized using JSON.stringify
		cache[ id ] = isNode ? {} : { toJSON: jQuery.noop };
	}

	// An object can be passed to jQuery.data instead of a key/value pair; this gets
	// shallow copied over onto the existing cache
	if ( typeof name === "object" || typeof name === "function" ) {
		if ( pvt ) {
			cache[ id ] = jQuery.extend( cache[ id ], name );
		} else {
			cache[ id ].data = jQuery.extend( cache[ id ].data, name );
		}
	}

	thisCache = cache[ id ];

	// jQuery data() is stored in a separate object inside the object's internal data
	// cache in order to avoid key collisions between internal data and user-defined
	// data.
	if ( !pvt ) {
		if ( !thisCache.data ) {
			thisCache.data = {};
		}

		thisCache = thisCache.data;
	}

	if ( data !== undefined ) {
		thisCache[ jQuery.camelCase( name ) ] = data;
	}

	// Check for both converted-to-camel and non-converted data property names
	// If a data property was specified
	if ( typeof name === "string" ) {

		// First Try to find as-is property data
		ret = thisCache[ name ];

		// Test for null|undefined property data
		if ( ret == null ) {

			// Try to find the camelCased property
			ret = thisCache[ jQuery.camelCase( name ) ];
		}
	} else {
		ret = thisCache;
	}

	return ret;
}

function internalRemoveData( elem, name, pvt ) {
	if ( !jQuery.acceptData( elem ) ) {
		return;
	}

	var thisCache, i,
		isNode = elem.nodeType,

		// See jQuery.data for more information
		cache = isNode ? jQuery.cache : elem,
		id = isNode ? elem[ jQuery.expando ] : jQuery.expando;

	// If there is already no cache entry for this object, there is no
	// purpose in continuing
	if ( !cache[ id ] ) {
		return;
	}

	if ( name ) {

		thisCache = pvt ? cache[ id ] : cache[ id ].data;

		if ( thisCache ) {

			// Support array or space separated string names for data keys
			if ( !jQuery.isArray( name ) ) {

				// try the string as a key before any manipulation
				if ( name in thisCache ) {
					name = [ name ];
				} else {

					// split the camel cased version by spaces unless a key with the spaces exists
					name = jQuery.camelCase( name );
					if ( name in thisCache ) {
						name = [ name ];
					} else {
						name = name.split(" ");
					}
				}
			} else {
				// If "name" is an array of keys...
				// When data is initially created, via ("key", "val") signature,
				// keys will be converted to camelCase.
				// Since there is no way to tell _how_ a key was added, remove
				// both plain key and camelCase key. #12786
				// This will only penalize the array argument path.
				name = name.concat( jQuery.map( name, jQuery.camelCase ) );
			}

			i = name.length;
			while ( i-- ) {
				delete thisCache[ name[i] ];
			}

			// If there is no data left in the cache, we want to continue
			// and let the cache object itself get destroyed
			if ( pvt ? !isEmptyDataObject(thisCache) : !jQuery.isEmptyObject(thisCache) ) {
				return;
			}
		}
	}

	// See jQuery.data for more information
	if ( !pvt ) {
		delete cache[ id ].data;

		// Don't destroy the parent cache unless the internal data object
		// had been the only thing left in it
		if ( !isEmptyDataObject( cache[ id ] ) ) {
			return;
		}
	}

	// Destroy the cache
	if ( isNode ) {
		jQuery.cleanData( [ elem ], true );

	// Use delete when supported for expandos or `cache` is not a window per isWindow (#10080)
	/* jshint eqeqeq: false */
	} else if ( jQuery.support.deleteExpando || cache != cache.window ) {
		/* jshint eqeqeq: true */
		delete cache[ id ];

	// When all else fails, null
	} else {
		cache[ id ] = null;
	}
}

jQuery.extend({
	cache: {},

	// The following elements throw uncatchable exceptions if you
	// attempt to add expando properties to them.
	noData: {
		"applet": true,
		"embed": true,
		// Ban all objects except for Flash (which handle expandos)
		"object": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
	},

	hasData: function( elem ) {
		elem = elem.nodeType ? jQuery.cache[ elem[jQuery.expando] ] : elem[ jQuery.expando ];
		return !!elem && !isEmptyDataObject( elem );
	},

	data: function( elem, name, data ) {
		return internalData( elem, name, data );
	},

	removeData: function( elem, name ) {
		return internalRemoveData( elem, name );
	},

	// For internal use only.
	_data: function( elem, name, data ) {
		return internalData( elem, name, data, true );
	},

	_removeData: function( elem, name ) {
		return internalRemoveData( elem, name, true );
	},

	// A method for determining if a DOM node can handle the data expando
	acceptData: function( elem ) {
		// Do not set data on non-element because it will not be cleared (#8335).
		if ( elem.nodeType && elem.nodeType !== 1 && elem.nodeType !== 9 ) {
			return false;
		}

		var noData = elem.nodeName && jQuery.noData[ elem.nodeName.toLowerCase() ];

		// nodes accept data unless otherwise specified; rejection can be conditional
		return !noData || noData !== true && elem.getAttribute("classid") === noData;
	}
});

jQuery.fn.extend({
	data: function( key, value ) {
		var attrs, name,
			data = null,
			i = 0,
			elem = this[0];

		// Special expections of .data basically thwart jQuery.access,
		// so implement the relevant behavior ourselves

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = jQuery.data( elem );

				if ( elem.nodeType === 1 && !jQuery._data( elem, "parsedAttrs" ) ) {
					attrs = elem.attributes;
					for ( ; i < attrs.length; i++ ) {
						name = attrs[i].name;

						if ( name.indexOf("data-") === 0 ) {
							name = jQuery.camelCase( name.slice(5) );

							dataAttr( elem, name, data[ name ] );
						}
					}
					jQuery._data( elem, "parsedAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each(function() {
				jQuery.data( this, key );
			});
		}

		return arguments.length > 1 ?

			// Sets one value
			this.each(function() {
				jQuery.data( this, key, value );
			}) :

			// Gets one value
			// Try to fetch any internally stored data first
			elem ? dataAttr( elem, key, jQuery.data( elem, key ) ) : null;
	},

	removeData: function( key ) {
		return this.each(function() {
			jQuery.removeData( this, key );
		});
	}
});

function dataAttr( elem, key, data ) {
	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {

		var name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();

		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
					data === "false" ? false :
					data === "null" ? null :
					// Only convert to a number if it doesn't change the string
					+data + "" === data ? +data :
					rbrace.test( data ) ? jQuery.parseJSON( data ) :
						data;
			} catch( e ) {}

			// Make sure we set the data so it isn't changed later
			jQuery.data( elem, key, data );

		} else {
			data = undefined;
		}
	}

	return data;
}

// checks a cache object for emptiness
function isEmptyDataObject( obj ) {
	var name;
	for ( name in obj ) {

		// if the public data object is empty, the private is still empty
		if ( name === "data" && jQuery.isEmptyObject( obj[name] ) ) {
			continue;
		}
		if ( name !== "toJSON" ) {
			return false;
		}
	}

	return true;
}
jQuery.extend({
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = jQuery._data( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray(data) ) {
					queue = jQuery._data( elem, type, jQuery.makeArray(data) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// not intended for public consumption - generates a queueHooks object, or returns the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return jQuery._data( elem, key ) || jQuery._data( elem, key, {
			empty: jQuery.Callbacks("once memory").add(function() {
				jQuery._removeData( elem, type + "queue" );
				jQuery._removeData( elem, key );
			})
		});
	}
});

jQuery.fn.extend({
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[0], type );
		}

		return data === undefined ?
			this :
			this.each(function() {
				var queue = jQuery.queue( this, type, data );

				// ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[0] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			});
	},
	dequeue: function( type ) {
		return this.each(function() {
			jQuery.dequeue( this, type );
		});
	},
	// Based off of the plugin by Clint Helfers, with permission.
	// http://blindsignals.com/index.php/2009/07/jquery-delay/
	delay: function( time, type ) {
		time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
		type = type || "fx";

		return this.queue( type, function( next, hooks ) {
			var timeout = setTimeout( next, time );
			hooks.stop = function() {
				clearTimeout( timeout );
			};
		});
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},
	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while( i-- ) {
			tmp = jQuery._data( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
});
var nodeHook, boolHook,
	rclass = /[\t\r\n\f]/g,
	rreturn = /\r/g,
	rfocusable = /^(?:input|select|textarea|button|object)$/i,
	rclickable = /^(?:a|area)$/i,
	ruseDefault = /^(?:checked|selected)$/i,
	getSetAttribute = jQuery.support.getSetAttribute,
	getSetInput = jQuery.support.input;

jQuery.fn.extend({
	attr: function( name, value ) {
		return jQuery.access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each(function() {
			jQuery.removeAttr( this, name );
		});
	},

	prop: function( name, value ) {
		return jQuery.access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		name = jQuery.propFix[ name ] || name;
		return this.each(function() {
			// try/catch handles cases where IE balks (such as removing a property on window)
			try {
				this[ name ] = undefined;
				delete this[ name ];
			} catch( e ) {}
		});
	},

	addClass: function( value ) {
		var classes, elem, cur, clazz, j,
			i = 0,
			len = this.length,
			proceed = typeof value === "string" && value;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).addClass( value.call( this, j, this.className ) );
			});
		}

		if ( proceed ) {
			// The disjunction here is for better compressibility (see removeClass)
			classes = ( value || "" ).match( core_rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					" "
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}
					elem.className = jQuery.trim( cur );

				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, clazz, j,
			i = 0,
			len = this.length,
			proceed = arguments.length === 0 || typeof value === "string" && value;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).removeClass( value.call( this, j, this.className ) );
			});
		}
		if ( proceed ) {
			classes = ( value || "" ).match( core_rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					""
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) >= 0 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}
					elem.className = value ? jQuery.trim( cur ) : "";
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value,
			isBool = typeof stateVal === "boolean";

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( i ) {
				jQuery( this ).toggleClass( value.call(this, i, this.className, stateVal), stateVal );
			});
		}

		return this.each(function() {
			if ( type === "string" ) {
				// toggle individual class names
				var className,
					i = 0,
					self = jQuery( this ),
					state = stateVal,
					classNames = value.match( core_rnotwhite ) || [];

				while ( (className = classNames[ i++ ]) ) {
					// check each className given, space separated list
					state = isBool ? state : !self.hasClass( className );
					self[ state ? "addClass" : "removeClass" ]( className );
				}

			// Toggle whole class name
			} else if ( type === core_strundefined || type === "boolean" ) {
				if ( this.className ) {
					// store className if set
					jQuery._data( this, "__className__", this.className );
				}

				// If the element has a class name or if we're passed "false",
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				this.className = this.className || value === false ? "" : jQuery._data( this, "__className__" ) || "";
			}
		});
	},

	hasClass: function( selector ) {
		var className = " " + selector + " ",
			i = 0,
			l = this.length;
		for ( ; i < l; i++ ) {
			if ( this[i].nodeType === 1 && (" " + this[i].className + " ").replace(rclass, " ").indexOf( className ) >= 0 ) {
				return true;
			}
		}

		return false;
	},

	val: function( value ) {
		var ret, hooks, isFunction,
			elem = this[0];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] || jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks && "get" in hooks && (ret = hooks.get( elem, "value" )) !== undefined ) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?
					// handle most common string cases
					ret.replace(rreturn, "") :
					// handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each(function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";
			} else if ( typeof val === "number" ) {
				val += "";
			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map(val, function ( value ) {
					return value == null ? "" : value + "";
				});
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !("set" in hooks) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		});
	}
});

jQuery.extend({
	valHooks: {
		option: {
			get: function( elem ) {
				// Use proper attribute retrieval(#6932, #12072)
				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :
					elem.text;
			}
		},
		select: {
			get: function( elem ) {
				var value, option,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one" || index < 0,
					values = one ? null : [],
					max = one ? index + 1 : options.length,
					i = index < 0 ?
						max :
						one ? index : 0;

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// oldIE doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&
							// Don't return options that are disabled or in a disabled optgroup
							( jQuery.support.optDisabled ? !option.disabled : option.getAttribute("disabled") === null ) &&
							( !option.parentNode.disabled || !jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];
					if ( (option.selected = jQuery.inArray( jQuery(option).val(), values ) >= 0) ) {
						optionSet = true;
					}
				}

				// force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}
				return values;
			}
		}
	},

	attr: function( elem, name, value ) {
		var hooks, ret,
			nType = elem.nodeType;

		// don't get/set attributes on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === core_strundefined ) {
			return jQuery.prop( elem, name, value );
		}

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : nodeHook );
		}

		if ( value !== undefined ) {

			if ( value === null ) {
				jQuery.removeAttr( elem, name );

			} else if ( hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ) {
				return ret;

			} else {
				elem.setAttribute( name, value + "" );
				return value;
			}

		} else if ( hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ) {
			return ret;

		} else {
			ret = jQuery.find.attr( elem, name );

			// Non-existent attributes return null, we normalize to undefined
			return ret == null ?
				undefined :
				ret;
		}
	},

	removeAttr: function( elem, value ) {
		var name, propName,
			i = 0,
			attrNames = value && value.match( core_rnotwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( (name = attrNames[i++]) ) {
				propName = jQuery.propFix[ name ] || name;

				// Boolean attributes get special treatment (#10870)
				if ( jQuery.expr.match.bool.test( name ) ) {
					// Set corresponding property to false
					if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
						elem[ propName ] = false;
					// Support: IE<9
					// Also clear defaultChecked/defaultSelected (if appropriate)
					} else {
						elem[ jQuery.camelCase( "default-" + name ) ] =
							elem[ propName ] = false;
					}

				// See #9699 for explanation of this approach (setting first, then removal)
				} else {
					jQuery.attr( elem, name, "" );
				}

				elem.removeAttribute( getSetAttribute ? name : propName );
			}
		}
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !jQuery.support.radioValue && value === "radio" && jQuery.nodeName(elem, "input") ) {
					// Setting the type on a radio button after the value resets the value in IE6-9
					// Reset value to default in case type is set after value during creation
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	},

	propFix: {
		"for": "htmlFor",
		"class": "className"
	},

	prop: function( elem, name, value ) {
		var ret, hooks, notxml,
			nType = elem.nodeType;

		// don't get/set properties on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		notxml = nType !== 1 || !jQuery.isXMLDoc( elem );

		if ( notxml ) {
			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			return hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ?
				ret :
				( elem[ name ] = value );

		} else {
			return hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ?
				ret :
				elem[ name ];
		}
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {
				// elem.tabIndex doesn't always return the correct value when it hasn't been explicitly set
				// http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				return tabindex ?
					parseInt( tabindex, 10 ) :
					rfocusable.test( elem.nodeName ) || rclickable.test( elem.nodeName ) && elem.href ?
						0 :
						-1;
			}
		}
	}
});

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {
			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
			// IE<8 needs the *property* name
			elem.setAttribute( !getSetAttribute && jQuery.propFix[ name ] || name, name );

		// Use defaultChecked and defaultSelected for oldIE
		} else {
			elem[ jQuery.camelCase( "default-" + name ) ] = elem[ name ] = true;
		}

		return name;
	}
};
jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
	var getter = jQuery.expr.attrHandle[ name ] || jQuery.find.attr;

	jQuery.expr.attrHandle[ name ] = getSetInput && getSetAttribute || !ruseDefault.test( name ) ?
		function( elem, name, isXML ) {
			var fn = jQuery.expr.attrHandle[ name ],
				ret = isXML ?
					undefined :
					/* jshint eqeqeq: false */
					(jQuery.expr.attrHandle[ name ] = undefined) !=
						getter( elem, name, isXML ) ?

						name.toLowerCase() :
						null;
			jQuery.expr.attrHandle[ name ] = fn;
			return ret;
		} :
		function( elem, name, isXML ) {
			return isXML ?
				undefined :
				elem[ jQuery.camelCase( "default-" + name ) ] ?
					name.toLowerCase() :
					null;
		};
});

// fix oldIE attroperties
if ( !getSetInput || !getSetAttribute ) {
	jQuery.attrHooks.value = {
		set: function( elem, value, name ) {
			if ( jQuery.nodeName( elem, "input" ) ) {
				// Does not return so that setAttribute is also used
				elem.defaultValue = value;
			} else {
				// Use nodeHook if defined (#1954); otherwise setAttribute is fine
				return nodeHook && nodeHook.set( elem, value, name );
			}
		}
	};
}

// IE6/7 do not support getting/setting some attributes with get/setAttribute
if ( !getSetAttribute ) {

	// Use this for any attribute in IE6/7
	// This fixes almost every IE6/7 issue
	nodeHook = {
		set: function( elem, value, name ) {
			// Set the existing or create a new attribute node
			var ret = elem.getAttributeNode( name );
			if ( !ret ) {
				elem.setAttributeNode(
					(ret = elem.ownerDocument.createAttribute( name ))
				);
			}

			ret.value = value += "";

			// Break association with cloned elements by also using setAttribute (#9646)
			return name === "value" || value === elem.getAttribute( name ) ?
				value :
				undefined;
		}
	};
	jQuery.expr.attrHandle.id = jQuery.expr.attrHandle.name = jQuery.expr.attrHandle.coords =
		// Some attributes are constructed with empty-string values when not defined
		function( elem, name, isXML ) {
			var ret;
			return isXML ?
				undefined :
				(ret = elem.getAttributeNode( name )) && ret.value !== "" ?
					ret.value :
					null;
		};
	jQuery.valHooks.button = {
		get: function( elem, name ) {
			var ret = elem.getAttributeNode( name );
			return ret && ret.specified ?
				ret.value :
				undefined;
		},
		set: nodeHook.set
	};

	// Set contenteditable to false on removals(#10429)
	// Setting to empty string throws an error as an invalid value
	jQuery.attrHooks.contenteditable = {
		set: function( elem, value, name ) {
			nodeHook.set( elem, value === "" ? false : value, name );
		}
	};

	// Set width and height to auto instead of 0 on empty string( Bug #8150 )
	// This is for removals
	jQuery.each([ "width", "height" ], function( i, name ) {
		jQuery.attrHooks[ name ] = {
			set: function( elem, value ) {
				if ( value === "" ) {
					elem.setAttribute( name, "auto" );
					return value;
				}
			}
		};
	});
}


// Some attributes require a special call on IE
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !jQuery.support.hrefNormalized ) {
	// href/src property should get the full normalized URL (#10299/#12915)
	jQuery.each([ "href", "src" ], function( i, name ) {
		jQuery.propHooks[ name ] = {
			get: function( elem ) {
				return elem.getAttribute( name, 4 );
			}
		};
	});
}

if ( !jQuery.support.style ) {
	jQuery.attrHooks.style = {
		get: function( elem ) {
			// Return undefined in the case of empty string
			// Note: IE uppercases css property names, but if we were to .toLowerCase()
			// .cssText, that would destroy case senstitivity in URL's, like in "background"
			return elem.style.cssText || undefined;
		},
		set: function( elem, value ) {
			return ( elem.style.cssText = value + "" );
		}
	};
}

// Safari mis-reports the default selected property of an option
// Accessing the parent's selectedIndex property fixes it
if ( !jQuery.support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {
			var parent = elem.parentNode;

			if ( parent ) {
				parent.selectedIndex;

				// Make sure that it also works with optgroups, see #5701
				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
			return null;
		}
	};
}

jQuery.each([
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
});

// IE6/7 call enctype encoding
if ( !jQuery.support.enctype ) {
	jQuery.propFix.enctype = "encoding";
}

// Radios and checkboxes getter/setter
jQuery.each([ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery(elem).val(), value ) >= 0 );
			}
		}
	};
	if ( !jQuery.support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			// Support: Webkit
			// "" is returned instead of "on" if a value isn't specified
			return elem.getAttribute("value") === null ? "on" : elem.value;
		};
	}
});
var rformElems = /^(?:input|select|textarea)$/i,
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|contextmenu)|click/,
	rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)$/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {
		var tmp, events, t, handleObjIn,
			special, eventHandle, handleObj,
			handlers, type, namespaces, origType,
			elemData = jQuery._data( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !(events = elemData.events) ) {
			events = elemData.events = {};
		}
		if ( !(eventHandle = elemData.handle) ) {
			eventHandle = elemData.handle = function( e ) {
				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== core_strundefined && (!e || jQuery.event.triggered !== e.type) ?
					jQuery.event.dispatch.apply( eventHandle.elem, arguments ) :
					undefined;
			};
			// Add elem as a property of the handle fn to prevent a memory leak with IE non-native events
			eventHandle.elem = elem;
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( core_rnotwhite ) || [""];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend({
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join(".")
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !(handlers = events[ type ]) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener/attachEvent if the special events handler returns false
				if ( !special.setup || special.setup.call( elem, data, namespaces, eventHandle ) === false ) {
					// Bind the global event handler to the element
					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle, false );

					} else if ( elem.attachEvent ) {
						elem.attachEvent( "on" + type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

		// Nullify elem to prevent memory leaks in IE
		elem = null;
	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {
		var j, handleObj, tmp,
			origCount, t, events,
			special, handlers, type,
			namespaces, origType,
			elemData = jQuery.hasData( elem ) && jQuery._data( elem );

		if ( !elemData || !(events = elemData.events) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( core_rnotwhite ) || [""];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[2] && new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector || selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown || special.teardown.call( elem, namespaces, elemData.handle ) === false ) {
					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			delete elemData.handle;

			// removeData also checks for emptiness and clears the expando if empty
			// so use it instead of delete
			jQuery._removeData( elem, "events" );
		}
	},

	trigger: function( event, data, elem, onlyHandlers ) {
		var handle, ontype, cur,
			bubbleType, special, tmp, i,
			eventPath = [ elem || document ],
			type = core_hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = core_hasOwn.call( event, "namespace" ) ? event.namespace.split(".") : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf(".") >= 0 ) {
			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split(".");
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf(":") < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join(".");
		event.namespace_re = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === (elem.ownerDocument || document) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( (cur = eventPath[i++]) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( jQuery._data( cur, "events" ) || {} )[ event.type ] && jQuery._data( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && jQuery.acceptData( cur ) && handle.apply && handle.apply( cur, data ) === false ) {
				event.preventDefault();
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( (!special._default || special._default.apply( eventPath.pop(), data ) === false) &&
				jQuery.acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name name as the event.
				// Can't use an .isFunction() check here because IE6/7 fails that test.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && elem[ type ] && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					try {
						elem[ type ]();
					} catch ( e ) {
						// IE<9 dies on focus/blur to hidden element (#1486,#12518)
						// only reproducible on winXP IE8 native, not IE9 in IE8 mode
					}
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	dispatch: function( event ) {

		// Make a writable jQuery.Event from the native event object
		event = jQuery.event.fix( event );

		var i, ret, handleObj, matched, j,
			handlerQueue = [],
			args = core_slice.call( arguments ),
			handlers = ( jQuery._data( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[0] = event;
		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( (matched = handlerQueue[ i++ ]) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( (handleObj = matched.handlers[ j++ ]) && !event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or
				// 2) have namespace(s) a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.namespace_re || event.namespace_re.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( (jQuery.event.special[ handleObj.origType ] || {}).handle || handleObj.handler )
							.apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( (event.result = ret) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var sel, handleObj, matches, i,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Find delegate handlers
		// Black-hole SVG <use> instance trees (#13180)
		// Avoid non-left-click bubbling in Firefox (#3861)
		if ( delegateCount && cur.nodeType && (!event.button || event.type !== "click") ) {

			/* jshint eqeqeq: false */
			for ( ; cur != this; cur = cur.parentNode || this ) {
				/* jshint eqeqeq: true */

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && (cur.disabled !== true || event.type !== "click") ) {
					matches = [];
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matches[ sel ] === undefined ) {
							matches[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) >= 0 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matches[ sel ] ) {
							matches.push( handleObj );
						}
					}
					if ( matches.length ) {
						handlerQueue.push({ elem: cur, handlers: matches });
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( delegateCount < handlers.length ) {
			handlerQueue.push({ elem: this, handlers: handlers.slice( delegateCount ) });
		}

		return handlerQueue;
	},

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// Create a writable copy of the event object and normalize some properties
		var i, prop, copy,
			type = event.type,
			originalEvent = event,
			fixHook = this.fixHooks[ type ];

		if ( !fixHook ) {
			this.fixHooks[ type ] = fixHook =
				rmouseEvent.test( type ) ? this.mouseHooks :
				rkeyEvent.test( type ) ? this.keyHooks :
				{};
		}
		copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

		event = new jQuery.Event( originalEvent );

		i = copy.length;
		while ( i-- ) {
			prop = copy[ i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Support: IE<9
		// Fix target property (#1925)
		if ( !event.target ) {
			event.target = originalEvent.srcElement || document;
		}

		// Support: Chrome 23+, Safari?
		// Target should not be a text node (#504, #13143)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		// Support: IE<9
		// For mouse/key events, metaKey==false if it's undefined (#3368, #11328)
		event.metaKey = !!event.metaKey;

		return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
	},

	// Includes some event props shared by KeyEvent and MouseEvent
	props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split(" "),
		filter: function( event, original ) {

			// Add which for key events
			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			}

			return event;
		}
	},

	mouseHooks: {
		props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
		filter: function( event, original ) {
			var body, eventDoc, doc,
				button = original.button,
				fromElement = original.fromElement;

			// Calculate pageX/Y if missing and clientX/Y available
			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX + ( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) - ( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY + ( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) - ( doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			// Add relatedTarget, if necessary
			if ( !event.relatedTarget && fromElement ) {
				event.relatedTarget = fromElement === event.target ? original.toElement : fromElement;
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			// Note: button is not normalized, so don't use it
			if ( !event.which && button !== undefined ) {
				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}

			return event;
		}
	},

	special: {
		load: {
			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {
			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					try {
						this.focus();
						return false;
					} catch ( e ) {
						// Support: IE<9
						// If we error on focus to hidden element (#1486, #12518),
						// let .trigger() run the handlers
					}
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {
			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( jQuery.nodeName( this, "input" ) && this.type === "checkbox" && this.click ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return jQuery.nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Even when returnValue equals to undefined Firefox will still show alert
				if ( event.result !== undefined ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	},

	simulate: function( type, elem, event, bubble ) {
		// Piggyback on a donor event to simulate a different one.
		// Fake originalEvent to avoid donor's stopPropagation, but if the
		// simulated event prevents default then we do the same on the donor.
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true,
				originalEvent: {}
			}
		);
		if ( bubble ) {
			jQuery.event.trigger( e, null, elem );
		} else {
			jQuery.event.dispatch.call( elem, e );
		}
		if ( e.isDefaultPrevented() ) {
			event.preventDefault();
		}
	}
};

jQuery.removeEvent = document.removeEventListener ?
	function( elem, type, handle ) {
		if ( elem.removeEventListener ) {
			elem.removeEventListener( type, handle, false );
		}
	} :
	function( elem, type, handle ) {
		var name = "on" + type;

		if ( elem.detachEvent ) {

			// #8545, #7054, preventing memory leaks for custom events in IE6-8
			// detachEvent needed property on element, by name of that event, to properly expose it to GC
			if ( typeof elem[ name ] === core_strundefined ) {
				elem[ name ] = null;
			}

			elem.detachEvent( name, handle );
		}
	};

jQuery.Event = function( src, props ) {
	// Allow instantiation without the 'new' keyword
	if ( !(this instanceof jQuery.Event) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = ( src.defaultPrevented || src.returnValue === false ||
			src.getPreventDefault && src.getPreventDefault() ) ? returnTrue : returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;
		if ( !e ) {
			return;
		}

		// If preventDefault exists, run it on the original event
		if ( e.preventDefault ) {
			e.preventDefault();

		// Support: IE
		// Otherwise set the returnValue property of the original event to false
		} else {
			e.returnValue = false;
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;
		if ( !e ) {
			return;
		}
		// If stopPropagation exists, run it on the original event
		if ( e.stopPropagation ) {
			e.stopPropagation();
		}

		// Support: IE
		// Set the cancelBubble property of the original event to true
		e.cancelBubble = true;
	},
	stopImmediatePropagation: function() {
		this.isImmediatePropagationStopped = returnTrue;
		this.stopPropagation();
	}
};

// Create mouseenter/leave events using mouseover/out and event-time checks
jQuery.each({
	mouseenter: "mouseover",
	mouseleave: "mouseout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mousenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || (related !== target && !jQuery.contains( target, related )) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
});

// IE submit delegation
if ( !jQuery.support.submitBubbles ) {

	jQuery.event.special.submit = {
		setup: function() {
			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Lazy-add a submit handler when a descendant form may potentially be submitted
			jQuery.event.add( this, "click._submit keypress._submit", function( e ) {
				// Node name check avoids a VML-related crash in IE (#9807)
				var elem = e.target,
					form = jQuery.nodeName( elem, "input" ) || jQuery.nodeName( elem, "button" ) ? elem.form : undefined;
				if ( form && !jQuery._data( form, "submitBubbles" ) ) {
					jQuery.event.add( form, "submit._submit", function( event ) {
						event._submit_bubble = true;
					});
					jQuery._data( form, "submitBubbles", true );
				}
			});
			// return undefined since we don't need an event listener
		},

		postDispatch: function( event ) {
			// If form was submitted by the user, bubble the event up the tree
			if ( event._submit_bubble ) {
				delete event._submit_bubble;
				if ( this.parentNode && !event.isTrigger ) {
					jQuery.event.simulate( "submit", this.parentNode, event, true );
				}
			}
		},

		teardown: function() {
			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Remove delegated handlers; cleanData eventually reaps submit handlers attached above
			jQuery.event.remove( this, "._submit" );
		}
	};
}

// IE change delegation and checkbox/radio fix
if ( !jQuery.support.changeBubbles ) {

	jQuery.event.special.change = {

		setup: function() {

			if ( rformElems.test( this.nodeName ) ) {
				// IE doesn't fire change on a check/radio until blur; trigger it on click
				// after a propertychange. Eat the blur-change in special.change.handle.
				// This still fires onchange a second time for check/radio after blur.
				if ( this.type === "checkbox" || this.type === "radio" ) {
					jQuery.event.add( this, "propertychange._change", function( event ) {
						if ( event.originalEvent.propertyName === "checked" ) {
							this._just_changed = true;
						}
					});
					jQuery.event.add( this, "click._change", function( event ) {
						if ( this._just_changed && !event.isTrigger ) {
							this._just_changed = false;
						}
						// Allow triggered, simulated change events (#11500)
						jQuery.event.simulate( "change", this, event, true );
					});
				}
				return false;
			}
			// Delegated event; lazy-add a change handler on descendant inputs
			jQuery.event.add( this, "beforeactivate._change", function( e ) {
				var elem = e.target;

				if ( rformElems.test( elem.nodeName ) && !jQuery._data( elem, "changeBubbles" ) ) {
					jQuery.event.add( elem, "change._change", function( event ) {
						if ( this.parentNode && !event.isSimulated && !event.isTrigger ) {
							jQuery.event.simulate( "change", this.parentNode, event, true );
						}
					});
					jQuery._data( elem, "changeBubbles", true );
				}
			});
		},

		handle: function( event ) {
			var elem = event.target;

			// Swallow native change events from checkbox/radio, we already triggered them above
			if ( this !== elem || event.isSimulated || event.isTrigger || (elem.type !== "radio" && elem.type !== "checkbox") ) {
				return event.handleObj.handler.apply( this, arguments );
			}
		},

		teardown: function() {
			jQuery.event.remove( this, "._change" );

			return !rformElems.test( this.nodeName );
		}
	};
}

// Create "bubbling" focus and blur events
if ( !jQuery.support.focusinBubbles ) {
	jQuery.each({ focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler while someone wants focusin/focusout
		var attaches = 0,
			handler = function( event ) {
				jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ), true );
			};

		jQuery.event.special[ fix ] = {
			setup: function() {
				if ( attaches++ === 0 ) {
					document.addEventListener( orig, handler, true );
				}
			},
			teardown: function() {
				if ( --attaches === 0 ) {
					document.removeEventListener( orig, handler, true );
				}
			}
		};
	});
}

jQuery.fn.extend({

	on: function( types, selector, data, fn, /*INTERNAL*/ one ) {
		var type, origFn;

		// Types can be a map of types/handlers
		if ( typeof types === "object" ) {
			// ( types-Object, selector, data )
			if ( typeof selector !== "string" ) {
				// ( types-Object, data )
				data = data || selector;
				selector = undefined;
			}
			for ( type in types ) {
				this.on( type, selector, data, types[ type ], one );
			}
			return this;
		}

		if ( data == null && fn == null ) {
			// ( types, fn )
			fn = selector;
			data = selector = undefined;
		} else if ( fn == null ) {
			if ( typeof selector === "string" ) {
				// ( types, selector, fn )
				fn = data;
				data = undefined;
			} else {
				// ( types, data, fn )
				fn = data;
				data = selector;
				selector = undefined;
			}
		}
		if ( fn === false ) {
			fn = returnFalse;
		} else if ( !fn ) {
			return this;
		}

		if ( one === 1 ) {
			origFn = fn;
			fn = function( event ) {
				// Can use an empty set, since event contains the info
				jQuery().off( event );
				return origFn.apply( this, arguments );
			};
			// Use same guid so caller can remove using origFn
			fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
		}
		return this.each( function() {
			jQuery.event.add( this, types, fn, data, selector );
		});
	},
	one: function( types, selector, data, fn ) {
		return this.on( types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {
			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {
			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {
			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each(function() {
			jQuery.event.remove( this, types, fn, selector );
		});
	},

	trigger: function( type, data ) {
		return this.each(function() {
			jQuery.event.trigger( type, data, this );
		});
	},
	triggerHandler: function( type, data ) {
		var elem = this[0];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
});
var isSimple = /^.[^:#\[\.,]*$/,
	rparentsprev = /^(?:parents|prev(?:Until|All))/,
	rneedsContext = jQuery.expr.match.needsContext,
	// methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.fn.extend({
	find: function( selector ) {
		var i,
			ret = [],
			self = this,
			len = self.length;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter(function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			}) );
		}

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		// Needed because $( selector, context ) becomes $( context ).find( selector )
		ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
		ret.selector = this.selector ? this.selector + " " + selector : selector;
		return ret;
	},

	has: function( target ) {
		var i,
			targets = jQuery( target, this ),
			len = targets.length;

		return this.filter(function() {
			for ( i = 0; i < len; i++ ) {
				if ( jQuery.contains( this, targets[i] ) ) {
					return true;
				}
			}
		});
	},

	not: function( selector ) {
		return this.pushStack( winnow(this, selector || [], true) );
	},

	filter: function( selector ) {
		return this.pushStack( winnow(this, selector || [], false) );
	},

	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			ret = [],
			pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
				jQuery( selectors, context || this.context ) :
				0;

		for ( ; i < l; i++ ) {
			for ( cur = this[i]; cur && cur !== context; cur = cur.parentNode ) {
				// Always skip document fragments
				if ( cur.nodeType < 11 && (pos ?
					pos.index(cur) > -1 :

					// Don't pass non-elements to Sizzle
					cur.nodeType === 1 &&
						jQuery.find.matchesSelector(cur, selectors)) ) {

					cur = ret.push( cur );
					break;
				}
			}
		}

		return this.pushStack( ret.length > 1 ? jQuery.unique( ret ) : ret );
	},

	// Determine the position of an element within
	// the matched set of elements
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[0] && this[0].parentNode ) ? this.first().prevAll().length : -1;
		}

		// index in selector
		if ( typeof elem === "string" ) {
			return jQuery.inArray( this[0], jQuery( elem ) );
		}

		// Locate the position of the desired element
		return jQuery.inArray(
			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[0] : elem, this );
	},

	add: function( selector, context ) {
		var set = typeof selector === "string" ?
				jQuery( selector, context ) :
				jQuery.makeArray( selector && selector.nodeType ? [ selector ] : selector ),
			all = jQuery.merge( this.get(), set );

		return this.pushStack( jQuery.unique(all) );
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter(selector)
		);
	}
});

function sibling( cur, dir ) {
	do {
		cur = cur[ dir ];
	} while ( cur && cur.nodeType !== 1 );

	return cur;
}

jQuery.each({
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return jQuery.dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return jQuery.dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return jQuery.dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return jQuery.sibling( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return jQuery.sibling( elem.firstChild );
	},
	contents: function( elem ) {
		return jQuery.nodeName( elem, "iframe" ) ?
			elem.contentDocument || elem.contentWindow.document :
			jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var ret = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			ret = jQuery.filter( selector, ret );
		}

		if ( this.length > 1 ) {
			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				ret = jQuery.unique( ret );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				ret = ret.reverse();
			}
		}

		return this.pushStack( ret );
	};
});

jQuery.extend({
	filter: function( expr, elems, not ) {
		var elem = elems[ 0 ];

		if ( not ) {
			expr = ":not(" + expr + ")";
		}

		return elems.length === 1 && elem.nodeType === 1 ?
			jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
			jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
				return elem.nodeType === 1;
			}));
	},

	dir: function( elem, dir, until ) {
		var matched = [],
			cur = elem[ dir ];

		while ( cur && cur.nodeType !== 9 && (until === undefined || cur.nodeType !== 1 || !jQuery( cur ).is( until )) ) {
			if ( cur.nodeType === 1 ) {
				matched.push( cur );
			}
			cur = cur[dir];
		}
		return matched;
	},

	sibling: function( n, elem ) {
		var r = [];

		for ( ; n; n = n.nextSibling ) {
			if ( n.nodeType === 1 && n !== elem ) {
				r.push( n );
			}
		}

		return r;
	}
});

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			/* jshint -W018 */
			return !!qualifier.call( elem, i, elem ) !== not;
		});

	}

	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		});

	}

	if ( typeof qualifier === "string" ) {
		if ( isSimple.test( qualifier ) ) {
			return jQuery.filter( qualifier, elements, not );
		}

		qualifier = jQuery.filter( qualifier, elements );
	}

	return jQuery.grep( elements, function( elem ) {
		return ( jQuery.inArray( elem, qualifier ) >= 0 ) !== not;
	});
}
function createSafeFragment( document ) {
	var list = nodeNames.split( "|" ),
		safeFrag = document.createDocumentFragment();

	if ( safeFrag.createElement ) {
		while ( list.length ) {
			safeFrag.createElement(
				list.pop()
			);
		}
	}
	return safeFrag;
}

var nodeNames = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|" +
		"header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
	rinlinejQuery = / jQuery\d+="(?:null|\d+)"/g,
	rnoshimcache = new RegExp("<(?:" + nodeNames + ")[\\s/>]", "i"),
	rleadingWhitespace = /^\s+/,
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
	rtagName = /<([\w:]+)/,
	rtbody = /<tbody/i,
	rhtml = /<|&#?\w+;/,
	rnoInnerhtml = /<(?:script|style|link)/i,
	manipulation_rcheckableType = /^(?:checkbox|radio)$/i,
	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptType = /^$|\/(?:java|ecma)script/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,

	// We have to close these tags to support XHTML (#13200)
	wrapMap = {
		option: [ 1, "<select multiple='multiple'>", "</select>" ],
		legend: [ 1, "<fieldset>", "</fieldset>" ],
		area: [ 1, "<map>", "</map>" ],
		param: [ 1, "<object>", "</object>" ],
		thead: [ 1, "<table>", "</table>" ],
		tr: [ 2, "<table><tbody>", "</tbody></table>" ],
		col: [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
		td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

		// IE6-8 can't serialize link, script, style, or any html5 (NoScope) tags,
		// unless wrapped in a div with non-breaking characters in front of it.
		_default: jQuery.support.htmlSerialize ? [ 0, "", "" ] : [ 1, "X<div>", "</div>"  ]
	},
	safeFragment = createSafeFragment( document ),
	fragmentDiv = safeFragment.appendChild( document.createElement("div") );

wrapMap.optgroup = wrapMap.option;
wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;

jQuery.fn.extend({
	text: function( value ) {
		return jQuery.access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().append( ( this[0] && this[0].ownerDocument || document ).createTextNode( value ) );
		}, null, value, arguments.length );
	},

	append: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		});
	},

	prepend: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		});
	},

	before: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		});
	},

	after: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		});
	},

	// keepData is for internal use only--do not document
	remove: function( selector, keepData ) {
		var elem,
			elems = selector ? jQuery.filter( selector, this ) : this,
			i = 0;

		for ( ; (elem = elems[i]) != null; i++ ) {

			if ( !keepData && elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem ) );
			}

			if ( elem.parentNode ) {
				if ( keepData && jQuery.contains( elem.ownerDocument, elem ) ) {
					setGlobalEval( getAll( elem, "script" ) );
				}
				elem.parentNode.removeChild( elem );
			}
		}

		return this;
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; (elem = this[i]) != null; i++ ) {
			// Remove element nodes and prevent memory leaks
			if ( elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem, false ) );
			}

			// Remove any remaining nodes
			while ( elem.firstChild ) {
				elem.removeChild( elem.firstChild );
			}

			// If this is a select, ensure that it displays empty (#12336)
			// Support: IE<9
			if ( elem.options && jQuery.nodeName( elem, "select" ) ) {
				elem.options.length = 0;
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map( function () {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		});
	},

	html: function( value ) {
		return jQuery.access( this, function( value ) {
			var elem = this[0] || {},
				i = 0,
				l = this.length;

			if ( value === undefined ) {
				return elem.nodeType === 1 ?
					elem.innerHTML.replace( rinlinejQuery, "" ) :
					undefined;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				( jQuery.support.htmlSerialize || !rnoshimcache.test( value )  ) &&
				( jQuery.support.leadingWhitespace || !rleadingWhitespace.test( value ) ) &&
				!wrapMap[ ( rtagName.exec( value ) || ["", ""] )[1].toLowerCase() ] ) {

				value = value.replace( rxhtmlTag, "<$1></$2>" );

				try {
					for (; i < l; i++ ) {
						// Remove element nodes and prevent memory leaks
						elem = this[i] || {};
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch(e) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var
			// Snapshot the DOM in case .domManip sweeps something relevant into its fragment
			args = jQuery.map( this, function( elem ) {
				return [ elem.nextSibling, elem.parentNode ];
			}),
			i = 0;

		// Make the changes, replacing each context element with the new content
		this.domManip( arguments, function( elem ) {
			var next = args[ i++ ],
				parent = args[ i++ ];

			if ( parent ) {
				// Don't use the snapshot next if it has moved (#13810)
				if ( next && next.parentNode !== parent ) {
					next = this.nextSibling;
				}
				jQuery( this ).remove();
				parent.insertBefore( elem, next );
			}
		// Allow new content to include elements from the context set
		}, true );

		// Force removal if there was no new content (e.g., from empty arguments)
		return i ? this : this.remove();
	},

	detach: function( selector ) {
		return this.remove( selector, true );
	},

	domManip: function( args, callback, allowIntersection ) {

		// Flatten any nested arrays
		args = core_concat.apply( [], args );

		var first, node, hasScripts,
			scripts, doc, fragment,
			i = 0,
			l = this.length,
			set = this,
			iNoClone = l - 1,
			value = args[0],
			isFunction = jQuery.isFunction( value );

		// We can't cloneNode fragments that contain checked, in WebKit
		if ( isFunction || !( l <= 1 || typeof value !== "string" || jQuery.support.checkClone || !rchecked.test( value ) ) ) {
			return this.each(function( index ) {
				var self = set.eq( index );
				if ( isFunction ) {
					args[0] = value.call( this, index, self.html() );
				}
				self.domManip( args, callback, allowIntersection );
			});
		}

		if ( l ) {
			fragment = jQuery.buildFragment( args, this[ 0 ].ownerDocument, false, !allowIntersection && this );
			first = fragment.firstChild;

			if ( fragment.childNodes.length === 1 ) {
				fragment = first;
			}

			if ( first ) {
				scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
				hasScripts = scripts.length;

				// Use the original fragment for the last item instead of the first because it can end up
				// being emptied incorrectly in certain situations (#8070).
				for ( ; i < l; i++ ) {
					node = fragment;

					if ( i !== iNoClone ) {
						node = jQuery.clone( node, true, true );

						// Keep references to cloned scripts for later restoration
						if ( hasScripts ) {
							jQuery.merge( scripts, getAll( node, "script" ) );
						}
					}

					callback.call( this[i], node, i );
				}

				if ( hasScripts ) {
					doc = scripts[ scripts.length - 1 ].ownerDocument;

					// Reenable scripts
					jQuery.map( scripts, restoreScript );

					// Evaluate executable scripts on first document insertion
					for ( i = 0; i < hasScripts; i++ ) {
						node = scripts[ i ];
						if ( rscriptType.test( node.type || "" ) &&
							!jQuery._data( node, "globalEval" ) && jQuery.contains( doc, node ) ) {

							if ( node.src ) {
								// Hope ajax is available...
								jQuery._evalUrl( node.src );
							} else {
								jQuery.globalEval( ( node.text || node.textContent || node.innerHTML || "" ).replace( rcleanScript, "" ) );
							}
						}
					}
				}

				// Fix #11809: Avoid leaking memory
				fragment = first = null;
			}
		}

		return this;
	}
});

// Support: IE<8
// Manipulating tables requires a tbody
function manipulationTarget( elem, content ) {
	return jQuery.nodeName( elem, "table" ) &&
		jQuery.nodeName( content.nodeType === 1 ? content : content.firstChild, "tr" ) ?

		elem.getElementsByTagName("tbody")[0] ||
			elem.appendChild( elem.ownerDocument.createElement("tbody") ) :
		elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = (jQuery.find.attr( elem, "type" ) !== null) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );
	if ( match ) {
		elem.type = match[1];
	} else {
		elem.removeAttribute("type");
	}
	return elem;
}

// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var elem,
		i = 0;
	for ( ; (elem = elems[i]) != null; i++ ) {
		jQuery._data( elem, "globalEval", !refElements || jQuery._data( refElements[i], "globalEval" ) );
	}
}

function cloneCopyEvent( src, dest ) {

	if ( dest.nodeType !== 1 || !jQuery.hasData( src ) ) {
		return;
	}

	var type, i, l,
		oldData = jQuery._data( src ),
		curData = jQuery._data( dest, oldData ),
		events = oldData.events;

	if ( events ) {
		delete curData.handle;
		curData.events = {};

		for ( type in events ) {
			for ( i = 0, l = events[ type ].length; i < l; i++ ) {
				jQuery.event.add( dest, type, events[ type ][ i ] );
			}
		}
	}

	// make the cloned public data object a copy from the original
	if ( curData.data ) {
		curData.data = jQuery.extend( {}, curData.data );
	}
}

function fixCloneNodeIssues( src, dest ) {
	var nodeName, e, data;

	// We do not need to do anything for non-Elements
	if ( dest.nodeType !== 1 ) {
		return;
	}

	nodeName = dest.nodeName.toLowerCase();

	// IE6-8 copies events bound via attachEvent when using cloneNode.
	if ( !jQuery.support.noCloneEvent && dest[ jQuery.expando ] ) {
		data = jQuery._data( dest );

		for ( e in data.events ) {
			jQuery.removeEvent( dest, e, data.handle );
		}

		// Event data gets referenced instead of copied if the expando gets copied too
		dest.removeAttribute( jQuery.expando );
	}

	// IE blanks contents when cloning scripts, and tries to evaluate newly-set text
	if ( nodeName === "script" && dest.text !== src.text ) {
		disableScript( dest ).text = src.text;
		restoreScript( dest );

	// IE6-10 improperly clones children of object elements using classid.
	// IE10 throws NoModificationAllowedError if parent is null, #12132.
	} else if ( nodeName === "object" ) {
		if ( dest.parentNode ) {
			dest.outerHTML = src.outerHTML;
		}

		// This path appears unavoidable for IE9. When cloning an object
		// element in IE9, the outerHTML strategy above is not sufficient.
		// If the src has innerHTML and the destination does not,
		// copy the src.innerHTML into the dest.innerHTML. #10324
		if ( jQuery.support.html5Clone && ( src.innerHTML && !jQuery.trim(dest.innerHTML) ) ) {
			dest.innerHTML = src.innerHTML;
		}

	} else if ( nodeName === "input" && manipulation_rcheckableType.test( src.type ) ) {
		// IE6-8 fails to persist the checked state of a cloned checkbox
		// or radio button. Worse, IE6-7 fail to give the cloned element
		// a checked appearance if the defaultChecked value isn't also set

		dest.defaultChecked = dest.checked = src.checked;

		// IE6-7 get confused and end up setting the value of a cloned
		// checkbox/radio button to an empty string instead of "on"
		if ( dest.value !== src.value ) {
			dest.value = src.value;
		}

	// IE6-8 fails to return the selected option to the default selected
	// state when cloning options
	} else if ( nodeName === "option" ) {
		dest.defaultSelected = dest.selected = src.defaultSelected;

	// IE6-8 fails to set the defaultValue to the correct value when
	// cloning other types of input fields
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

jQuery.each({
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			i = 0,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone(true);
			jQuery( insert[i] )[ original ]( elems );

			// Modern browsers can apply jQuery collections as arrays, but oldIE needs a .get()
			core_push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
});

function getAll( context, tag ) {
	var elems, elem,
		i = 0,
		found = typeof context.getElementsByTagName !== core_strundefined ? context.getElementsByTagName( tag || "*" ) :
			typeof context.querySelectorAll !== core_strundefined ? context.querySelectorAll( tag || "*" ) :
			undefined;

	if ( !found ) {
		for ( found = [], elems = context.childNodes || context; (elem = elems[i]) != null; i++ ) {
			if ( !tag || jQuery.nodeName( elem, tag ) ) {
				found.push( elem );
			} else {
				jQuery.merge( found, getAll( elem, tag ) );
			}
		}
	}

	return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
		jQuery.merge( [ context ], found ) :
		found;
}

// Used in buildFragment, fixes the defaultChecked property
function fixDefaultChecked( elem ) {
	if ( manipulation_rcheckableType.test( elem.type ) ) {
		elem.defaultChecked = elem.checked;
	}
}

jQuery.extend({
	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var destElements, node, clone, i, srcElements,
			inPage = jQuery.contains( elem.ownerDocument, elem );

		if ( jQuery.support.html5Clone || jQuery.isXMLDoc(elem) || !rnoshimcache.test( "<" + elem.nodeName + ">" ) ) {
			clone = elem.cloneNode( true );

		// IE<=8 does not properly clone detached, unknown element nodes
		} else {
			fragmentDiv.innerHTML = elem.outerHTML;
			fragmentDiv.removeChild( clone = fragmentDiv.firstChild );
		}

		if ( (!jQuery.support.noCloneEvent || !jQuery.support.noCloneChecked) &&
				(elem.nodeType === 1 || elem.nodeType === 11) && !jQuery.isXMLDoc(elem) ) {

			// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			// Fix all IE cloning issues
			for ( i = 0; (node = srcElements[i]) != null; ++i ) {
				// Ensure that the destination node is not null; Fixes #9587
				if ( destElements[i] ) {
					fixCloneNodeIssues( node, destElements[i] );
				}
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0; (node = srcElements[i]) != null; i++ ) {
					cloneCopyEvent( node, destElements[i] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		destElements = srcElements = node = null;

		// Return the cloned set
		return clone;
	},

	buildFragment: function( elems, context, scripts, selection ) {
		var j, elem, contains,
			tmp, tag, tbody, wrap,
			l = elems.length,

			// Ensure a safe fragment
			safe = createSafeFragment( context ),

			nodes = [],
			i = 0;

		for ( ; i < l; i++ ) {
			elem = elems[ i ];

			if ( elem || elem === 0 ) {

				// Add nodes directly
				if ( jQuery.type( elem ) === "object" ) {
					jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

				// Convert non-html into a text node
				} else if ( !rhtml.test( elem ) ) {
					nodes.push( context.createTextNode( elem ) );

				// Convert html into DOM nodes
				} else {
					tmp = tmp || safe.appendChild( context.createElement("div") );

					// Deserialize a standard representation
					tag = ( rtagName.exec( elem ) || ["", ""] )[1].toLowerCase();
					wrap = wrapMap[ tag ] || wrapMap._default;

					tmp.innerHTML = wrap[1] + elem.replace( rxhtmlTag, "<$1></$2>" ) + wrap[2];

					// Descend through wrappers to the right content
					j = wrap[0];
					while ( j-- ) {
						tmp = tmp.lastChild;
					}

					// Manually add leading whitespace removed by IE
					if ( !jQuery.support.leadingWhitespace && rleadingWhitespace.test( elem ) ) {
						nodes.push( context.createTextNode( rleadingWhitespace.exec( elem )[0] ) );
					}

					// Remove IE's autoinserted <tbody> from table fragments
					if ( !jQuery.support.tbody ) {

						// String was a <table>, *may* have spurious <tbody>
						elem = tag === "table" && !rtbody.test( elem ) ?
							tmp.firstChild :

							// String was a bare <thead> or <tfoot>
							wrap[1] === "<table>" && !rtbody.test( elem ) ?
								tmp :
								0;

						j = elem && elem.childNodes.length;
						while ( j-- ) {
							if ( jQuery.nodeName( (tbody = elem.childNodes[j]), "tbody" ) && !tbody.childNodes.length ) {
								elem.removeChild( tbody );
							}
						}
					}

					jQuery.merge( nodes, tmp.childNodes );

					// Fix #12392 for WebKit and IE > 9
					tmp.textContent = "";

					// Fix #12392 for oldIE
					while ( tmp.firstChild ) {
						tmp.removeChild( tmp.firstChild );
					}

					// Remember the top-level container for proper cleanup
					tmp = safe.lastChild;
				}
			}
		}

		// Fix #11356: Clear elements from fragment
		if ( tmp ) {
			safe.removeChild( tmp );
		}

		// Reset defaultChecked for any radios and checkboxes
		// about to be appended to the DOM in IE 6/7 (#8060)
		if ( !jQuery.support.appendChecked ) {
			jQuery.grep( getAll( nodes, "input" ), fixDefaultChecked );
		}

		i = 0;
		while ( (elem = nodes[ i++ ]) ) {

			// #4087 - If origin and destination elements are the same, and this is
			// that element, do not do anything
			if ( selection && jQuery.inArray( elem, selection ) !== -1 ) {
				continue;
			}

			contains = jQuery.contains( elem.ownerDocument, elem );

			// Append to fragment
			tmp = getAll( safe.appendChild( elem ), "script" );

			// Preserve script evaluation history
			if ( contains ) {
				setGlobalEval( tmp );
			}

			// Capture executables
			if ( scripts ) {
				j = 0;
				while ( (elem = tmp[ j++ ]) ) {
					if ( rscriptType.test( elem.type || "" ) ) {
						scripts.push( elem );
					}
				}
			}
		}

		tmp = null;

		return safe;
	},

	cleanData: function( elems, /* internal */ acceptData ) {
		var elem, type, id, data,
			i = 0,
			internalKey = jQuery.expando,
			cache = jQuery.cache,
			deleteExpando = jQuery.support.deleteExpando,
			special = jQuery.event.special;

		for ( ; (elem = elems[i]) != null; i++ ) {

			if ( acceptData || jQuery.acceptData( elem ) ) {

				id = elem[ internalKey ];
				data = id && cache[ id ];

				if ( data ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Remove cache only if it was not already removed by jQuery.event.remove
					if ( cache[ id ] ) {

						delete cache[ id ];

						// IE does not allow us to delete expando properties from nodes,
						// nor does it have a removeAttribute function on Document nodes;
						// we must handle all of these cases
						if ( deleteExpando ) {
							delete elem[ internalKey ];

						} else if ( typeof elem.removeAttribute !== core_strundefined ) {
							elem.removeAttribute( internalKey );

						} else {
							elem[ internalKey ] = null;
						}

						core_deletedIds.push( id );
					}
				}
			}
		}
	},

	_evalUrl: function( url ) {
		return jQuery.ajax({
			url: url,
			type: "GET",
			dataType: "script",
			async: false,
			global: false,
			"throws": true
		});
	}
});
jQuery.fn.extend({
	wrapAll: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function(i) {
				jQuery(this).wrapAll( html.call(this, i) );
			});
		}

		if ( this[0] ) {
			// The elements to wrap the target around
			var wrap = jQuery( html, this[0].ownerDocument ).eq(0).clone(true);

			if ( this[0].parentNode ) {
				wrap.insertBefore( this[0] );
			}

			wrap.map(function() {
				var elem = this;

				while ( elem.firstChild && elem.firstChild.nodeType === 1 ) {
					elem = elem.firstChild;
				}

				return elem;
			}).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function(i) {
				jQuery(this).wrapInner( html.call(this, i) );
			});
		}

		return this.each(function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		});
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each(function(i) {
			jQuery( this ).wrapAll( isFunction ? html.call(this, i) : html );
		});
	},

	unwrap: function() {
		return this.parent().each(function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		}).end();
	}
});
var iframe, getStyles, curCSS,
	ralpha = /alpha\([^)]*\)/i,
	ropacity = /opacity\s*=\s*([^)]*)/,
	rposition = /^(top|right|bottom|left)$/,
	// swappable if display is none or starts with table except "table", "table-cell", or "table-caption"
	// see here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rmargin = /^margin/,
	rnumsplit = new RegExp( "^(" + core_pnum + ")(.*)$", "i" ),
	rnumnonpx = new RegExp( "^(" + core_pnum + ")(?!px)[a-z%]+$", "i" ),
	rrelNum = new RegExp( "^([+-])=(" + core_pnum + ")", "i" ),
	elemdisplay = { BODY: "block" },

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: 0,
		fontWeight: 400
	},

	cssExpand = [ "Top", "Right", "Bottom", "Left" ],
	cssPrefixes = [ "Webkit", "O", "Moz", "ms" ];

// return a css property mapped to a potentially vendor prefixed property
function vendorPropName( style, name ) {

	// shortcut for names that are not vendor prefixed
	if ( name in style ) {
		return name;
	}

	// check for vendor prefixed names
	var capName = name.charAt(0).toUpperCase() + name.slice(1),
		origName = name,
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in style ) {
			return name;
		}
	}

	return origName;
}

function isHidden( elem, el ) {
	// isHidden might be called from jQuery#filter function;
	// in that case, element will be second argument
	elem = el || elem;
	return jQuery.css( elem, "display" ) === "none" || !jQuery.contains( elem.ownerDocument, elem );
}

function showHide( elements, show ) {
	var display, elem, hidden,
		values = [],
		index = 0,
		length = elements.length;

	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		values[ index ] = jQuery._data( elem, "olddisplay" );
		display = elem.style.display;
		if ( show ) {
			// Reset the inline display of this element to learn if it is
			// being hidden by cascaded rules or not
			if ( !values[ index ] && display === "none" ) {
				elem.style.display = "";
			}

			// Set elements which have been overridden with display: none
			// in a stylesheet to whatever the default browser style is
			// for such an element
			if ( elem.style.display === "" && isHidden( elem ) ) {
				values[ index ] = jQuery._data( elem, "olddisplay", css_defaultDisplay(elem.nodeName) );
			}
		} else {

			if ( !values[ index ] ) {
				hidden = isHidden( elem );

				if ( display && display !== "none" || !hidden ) {
					jQuery._data( elem, "olddisplay", hidden ? display : jQuery.css( elem, "display" ) );
				}
			}
		}
	}

	// Set the display of most of the elements in a second loop
	// to avoid the constant reflow
	for ( index = 0; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
			elem.style.display = show ? values[ index ] || "" : "none";
		}
	}

	return elements;
}

jQuery.fn.extend({
	css: function( name, value ) {
		return jQuery.access( this, function( elem, name, value ) {
			var len, styles,
				map = {},
				i = 0;

			if ( jQuery.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	},
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		var bool = typeof state === "boolean";

		return this.each(function() {
			if ( bool ? state : isHidden( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		});
	}
});

jQuery.extend({
	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {
					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"columnCount": true,
		"fillOpacity": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {
		// normalize float css property
		"float": jQuery.support.cssFloat ? "cssFloat" : "styleFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {
		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( style, origName ) );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// convert relative number strings (+= or -=) to relative numbers. #7345
			if ( type === "string" && (ret = rrelNum.exec( value )) ) {
				value = ( ret[1] + 1 ) * ret[2] + parseFloat( jQuery.css( elem, name ) );
				// Fixes bug #9237
				type = "number";
			}

			// Make sure that NaN and null values aren't set. See: #7116
			if ( value == null || type === "number" && isNaN( value ) ) {
				return;
			}

			// If a number was passed in, add 'px' to the (except for certain CSS properties)
			if ( type === "number" && !jQuery.cssNumber[ origName ] ) {
				value += "px";
			}

			// Fixes #8908, it can be done more correctly by specifing setters in cssHooks,
			// but it would mean to define eight (for every problematic property) identical functions
			if ( !jQuery.support.clearCloneStyle && value === "" && name.indexOf("background") === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !("set" in hooks) || (value = hooks.set( elem, value, extra )) !== undefined ) {

				// Wrapped to prevent IE from throwing errors when 'invalid' values are provided
				// Fixes bug #5509
				try {
					style[ name ] = value;
				} catch(e) {}
			}

		} else {
			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks && (ret = hooks.get( elem, false, extra )) !== undefined ) {
				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var num, val, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( elem.style, origName ) );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		//convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Return, converting to number if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || jQuery.isNumeric( num ) ? num || 0 : val;
		}
		return val;
	}
});

// NOTE: we've included the "window" in window.getComputedStyle
// because jsdom on node.js will break without it.
if ( window.getComputedStyle ) {
	getStyles = function( elem ) {
		return window.getComputedStyle( elem, null );
	};

	curCSS = function( elem, name, _computed ) {
		var width, minWidth, maxWidth,
			computed = _computed || getStyles( elem ),

			// getPropertyValue is only needed for .css('filter') in IE9, see #12537
			ret = computed ? computed.getPropertyValue( name ) || computed[ name ] : undefined,
			style = elem.style;

		if ( computed ) {

			if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
				ret = jQuery.style( elem, name );
			}

			// A tribute to the "awesome hack by Dean Edwards"
			// Chrome < 17 and Safari 5.0 uses "computed value" instead of "used value" for margin-right
			// Safari 5.1.7 (at least) returns percentage for a larger set of values, but width seems to be reliably pixels
			// this is against the CSSOM draft spec: http://dev.w3.org/csswg/cssom/#resolved-values
			if ( rnumnonpx.test( ret ) && rmargin.test( name ) ) {

				// Remember the original values
				width = style.width;
				minWidth = style.minWidth;
				maxWidth = style.maxWidth;

				// Put in the new values to get a computed value out
				style.minWidth = style.maxWidth = style.width = ret;
				ret = computed.width;

				// Revert the changed values
				style.width = width;
				style.minWidth = minWidth;
				style.maxWidth = maxWidth;
			}
		}

		return ret;
	};
} else if ( document.documentElement.currentStyle ) {
	getStyles = function( elem ) {
		return elem.currentStyle;
	};

	curCSS = function( elem, name, _computed ) {
		var left, rs, rsLeft,
			computed = _computed || getStyles( elem ),
			ret = computed ? computed[ name ] : undefined,
			style = elem.style;

		// Avoid setting ret to empty string here
		// so we don't default to auto
		if ( ret == null && style && style[ name ] ) {
			ret = style[ name ];
		}

		// From the awesome hack by Dean Edwards
		// http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291

		// If we're not dealing with a regular pixel number
		// but a number that has a weird ending, we need to convert it to pixels
		// but not position css attributes, as those are proportional to the parent element instead
		// and we can't measure the parent instead because it might trigger a "stacking dolls" problem
		if ( rnumnonpx.test( ret ) && !rposition.test( name ) ) {

			// Remember the original values
			left = style.left;
			rs = elem.runtimeStyle;
			rsLeft = rs && rs.left;

			// Put in the new values to get a computed value out
			if ( rsLeft ) {
				rs.left = elem.currentStyle.left;
			}
			style.left = name === "fontSize" ? "1em" : ret;
			ret = style.pixelLeft + "px";

			// Revert the changed values
			style.left = left;
			if ( rsLeft ) {
				rs.left = rsLeft;
			}
		}

		return ret === "" ? "auto" : ret;
	};
}

function setPositiveNumber( elem, value, subtract ) {
	var matches = rnumsplit.exec( value );
	return matches ?
		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i = extra === ( isBorderBox ? "border" : "content" ) ?
		// If we already have the right measurement, avoid augmentation
		4 :
		// Otherwise initialize for horizontal or vertical properties
		name === "width" ? 1 : 0,

		val = 0;

	for ( ; i < 4; i += 2 ) {
		// both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {
			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// at this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {
			// at this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// at this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var valueIsBorderBox = true,
		val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		styles = getStyles( elem ),
		isBorderBox = jQuery.support.boxSizing && jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) {
		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name, styles );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test(val) ) {
			return val;
		}

		// we need the check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox && ( jQuery.support.boxSizingReliable || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

// Try to determine the default display value of an element
function css_defaultDisplay( nodeName ) {
	var doc = document,
		display = elemdisplay[ nodeName ];

	if ( !display ) {
		display = actualDisplay( nodeName, doc );

		// If the simple way fails, read from inside an iframe
		if ( display === "none" || !display ) {
			// Use the already-created iframe if possible
			iframe = ( iframe ||
				jQuery("<iframe frameborder='0' width='0' height='0'/>")
				.css( "cssText", "display:block !important" )
			).appendTo( doc.documentElement );

			// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
			doc = ( iframe[0].contentWindow || iframe[0].contentDocument ).document;
			doc.write("<!doctype html><html><body>");
			doc.close();

			display = actualDisplay( nodeName, doc );
			iframe.detach();
		}

		// Store the correct default display
		elemdisplay[ nodeName ] = display;
	}

	return display;
}

// Called ONLY from within css_defaultDisplay
function actualDisplay( name, doc ) {
	var elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),
		display = jQuery.css( elem[0], "display" );
	elem.remove();
	return display;
}

jQuery.each([ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {
				// certain elements can have dimension info if we invisibly show them
				// however, it must have a current display style that would benefit from this
				return elem.offsetWidth === 0 && rdisplayswap.test( jQuery.css( elem, "display" ) ) ?
					jQuery.swap( elem, cssShow, function() {
						return getWidthOrHeight( elem, name, extra );
					}) :
					getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var styles = extra && getStyles( elem );
			return setPositiveNumber( elem, value, extra ?
				augmentWidthOrHeight(
					elem,
					name,
					extra,
					jQuery.support.boxSizing && jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				) : 0
			);
		}
	};
});

if ( !jQuery.support.opacity ) {
	jQuery.cssHooks.opacity = {
		get: function( elem, computed ) {
			// IE uses filters for opacity
			return ropacity.test( (computed && elem.currentStyle ? elem.currentStyle.filter : elem.style.filter) || "" ) ?
				( 0.01 * parseFloat( RegExp.$1 ) ) + "" :
				computed ? "1" : "";
		},

		set: function( elem, value ) {
			var style = elem.style,
				currentStyle = elem.currentStyle,
				opacity = jQuery.isNumeric( value ) ? "alpha(opacity=" + value * 100 + ")" : "",
				filter = currentStyle && currentStyle.filter || style.filter || "";

			// IE has trouble with opacity if it does not have layout
			// Force it by setting the zoom level
			style.zoom = 1;

			// if setting opacity to 1, and no other filters exist - attempt to remove filter attribute #6652
			// if value === "", then remove inline opacity #12685
			if ( ( value >= 1 || value === "" ) &&
					jQuery.trim( filter.replace( ralpha, "" ) ) === "" &&
					style.removeAttribute ) {

				// Setting style.filter to null, "" & " " still leave "filter:" in the cssText
				// if "filter:" is present at all, clearType is disabled, we want to avoid this
				// style.removeAttribute is IE Only, but so apparently is this code path...
				style.removeAttribute( "filter" );

				// if there is no filter style applied in a css rule or unset inline opacity, we are done
				if ( value === "" || currentStyle && !currentStyle.filter ) {
					return;
				}
			}

			// otherwise, set new filter values
			style.filter = ralpha.test( filter ) ?
				filter.replace( ralpha, opacity ) :
				filter + " " + opacity;
		}
	};
}

// These hooks cannot be added until DOM ready because the support test
// for it is not run until after DOM ready
jQuery(function() {
	if ( !jQuery.support.reliableMarginRight ) {
		jQuery.cssHooks.marginRight = {
			get: function( elem, computed ) {
				if ( computed ) {
					// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
					// Work around by temporarily setting element display to inline-block
					return jQuery.swap( elem, { "display": "inline-block" },
						curCSS, [ elem, "marginRight" ] );
				}
			}
		};
	}

	// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
	// getComputedStyle returns percent when specified for top/left/bottom/right
	// rather than make the css module depend on the offset module, we just check for it here
	if ( !jQuery.support.pixelPosition && jQuery.fn.position ) {
		jQuery.each( [ "top", "left" ], function( i, prop ) {
			jQuery.cssHooks[ prop ] = {
				get: function( elem, computed ) {
					if ( computed ) {
						computed = curCSS( elem, prop );
						// if curCSS returns percentage, fallback to offset
						return rnumnonpx.test( computed ) ?
							jQuery( elem ).position()[ prop ] + "px" :
							computed;
					}
				}
			};
		});
	}

});

if ( jQuery.expr && jQuery.expr.filters ) {
	jQuery.expr.filters.hidden = function( elem ) {
		// Support: Opera <= 12.12
		// Opera reports offsetWidths and offsetHeights less than zero on some elements
		return elem.offsetWidth <= 0 && elem.offsetHeight <= 0 ||
			(!jQuery.support.reliableHiddenOffsets && ((elem.style && elem.style.display) || jQuery.css( elem, "display" )) === "none");
	};

	jQuery.expr.filters.visible = function( elem ) {
		return !jQuery.expr.filters.hidden( elem );
	};
}

// These hooks are used by animate to expand properties
jQuery.each({
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// assumes a single number if not a string
				parts = typeof value === "string" ? value.split(" ") : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
});
var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

jQuery.fn.extend({
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map(function(){
			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		})
		.filter(function(){
			var type = this.type;
			// Use .is(":disabled") so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !manipulation_rcheckableType.test( type ) );
		})
		.map(function( i, elem ){
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val ){
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					}) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		}).get();
	}
});

//Serialize an array of form elements or a set of
//key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, value ) {
			// If value is a function, invoke it and return its value
			value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
			s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
		};

	// Set traditional to true for jQuery <= 1.3.2 behavior.
	if ( traditional === undefined ) {
		traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {
		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		});

	} else {
		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" ).replace( r20, "+" );
};

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( jQuery.isArray( obj ) ) {
		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {
				// Treat each array item as a scalar.
				add( prefix, v );

			} else {
				// Item is non-scalar (array or object), encode its numeric index.
				buildParams( prefix + "[" + ( typeof v === "object" ? i : "" ) + "]", v, traditional, add );
			}
		});

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {
		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {
		// Serialize scalar item.
		add( prefix, obj );
	}
}
jQuery.each( ("blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu").split(" "), function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
});

jQuery.fn.extend({
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	},

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {
		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ? this.off( selector, "**" ) : this.off( types, selector || "**", fn );
	}
});
var
	// Document location
	ajaxLocParts,
	ajaxLocation,
	ajax_nonce = jQuery.now(),

	ajax_rquery = /\?/,
	rhash = /#.*$/,
	rts = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg, // IE leaves an \r character at EOL
	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,
	rurl = /^([\w.+-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/,

	// Keep a copy of the old load method
	_load = jQuery.fn.load,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat("*");

// #8138, IE may throw an exception when accessing
// a field from window.location if document.domain has been set
try {
	ajaxLocation = location.href;
} catch( e ) {
	// Use the href attribute of an A element
	// since IE will modify it given document.location
	ajaxLocation = document.createElement( "a" );
	ajaxLocation.href = "";
	ajaxLocation = ajaxLocation.href;
}

// Segment location into parts
ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( core_rnotwhite ) || [];

		if ( jQuery.isFunction( func ) ) {
			// For each dataType in the dataTypeExpression
			while ( (dataType = dataTypes[i++]) ) {
				// Prepend if requested
				if ( dataType[0] === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					(structure[ dataType ] = structure[ dataType ] || []).unshift( func );

				// Otherwise append
				} else {
					(structure[ dataType ] = structure[ dataType ] || []).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if( typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[ dataTypeOrTransport ] ) {
				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		});
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var deep, key,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || (deep = {}) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

jQuery.fn.load = function( url, params, callback ) {
	if ( typeof url !== "string" && _load ) {
		return _load.apply( this, arguments );
	}

	var selector, response, type,
		self = this,
		off = url.indexOf(" ");

	if ( off >= 0 ) {
		selector = url.slice( off, url.length );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax({
			url: url,

			// if "type" variable is undefined, then "GET" method will be used
			type: type,
			dataType: "html",
			data: params
		}).done(function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery("<div>").append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		}).complete( callback && function( jqXHR, status ) {
			self.each( callback, response || [ jqXHR.responseText, status, jqXHR ] );
		});
	}

	return this;
};

// Attach a bunch of functions for handling common AJAX events
jQuery.each( [ "ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend" ], function( i, type ){
	jQuery.fn[ type ] = function( fn ){
		return this.on( type, fn );
	};
});

jQuery.extend({

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: ajaxLocation,
		type: "GET",
		isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /xml/,
			html: /html/,
			json: /json/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": jQuery.parseJSON,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var // Cross-domain detection vars
			parts,
			// Loop variable
			i,
			// URL without anti-cache param
			cacheURL,
			// Response headers as string
			responseHeadersString,
			// timeout handle
			timeoutTimer,

			// To know if global events are to be dispatched
			fireGlobals,

			transport,
			// Response headers
			responseHeaders,
			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),
			// Callbacks context
			callbackContext = s.context || s,
			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context && ( callbackContext.nodeType || callbackContext.jquery ) ?
				jQuery( callbackContext ) :
				jQuery.event,
			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks("once memory"),
			// Status-dependent callbacks
			statusCode = s.statusCode || {},
			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},
			// The jqXHR state
			state = 0,
			// Default abort message
			strAbort = "canceled",
			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( (match = rheaders.exec( responseHeadersString )) ) {
								responseHeaders[ match[1].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					var lname = name.toLowerCase();
					if ( !state ) {
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( state < 2 ) {
							for ( code in map ) {
								// Lazy-add the new callback in a way that preserves old ones
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						} else {
							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR ).complete = completeDeferred.add;
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (#5866: IE7 issue with protocol-less urls)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || ajaxLocation ) + "" ).replace( rhash, "" ).replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( core_rnotwhite ) || [""];

		// A cross-domain request is in order when we have a protocol:host:port mismatch
		if ( s.crossDomain == null ) {
			parts = rurl.exec( s.url.toLowerCase() );
			s.crossDomain = !!( parts &&
				( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||
					( parts[ 3 ] || ( parts[ 1 ] === "http:" ? "80" : "443" ) ) !==
						( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? "80" : "443" ) ) )
			);
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( state === 2 ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		fireGlobals = s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger("ajaxStart");
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		cacheURL = s.url;

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL = ( s.url += ( ajax_rquery.test( cacheURL ) ? "&" : "?" ) + s.data );
				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add anti-cache in url if needed
			if ( s.cache === false ) {
				s.url = rts.test( cacheURL ) ?

					// If there is already a '_' parameter, set its value
					cacheURL.replace( rts, "$1_=" + ajax_nonce++ ) :

					// Otherwise add one to the end
					cacheURL + ( ajax_rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + ajax_nonce++;
			}
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[0] ] ?
				s.accepts[ s.dataTypes[0] ] + ( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend && ( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {
			// Abort if not done already and return
			return jqXHR.abort();
		}

		// aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		for ( i in { success: 1, error: 1, complete: 1 } ) {
			jqXHR[ i ]( s[ i ] );
		}

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}
			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = setTimeout(function() {
					jqXHR.abort("timeout");
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch ( e ) {
				// Propagate exception as error if not done
				if ( state < 2 ) {
					done( -1, e );
				// Simply rethrow otherwise
				} else {
					throw e;
				}
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Called once
			if ( state === 2 ) {
				return;
			}

			// State is "done" now
			state = 2;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader("Last-Modified");
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader("etag");
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {
				// We extract error from statusText
				// then normalize statusText and status for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );
				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger("ajaxStop");
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
});

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {
		// shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		return jQuery.ajax({
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		});
	};
});

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {
	var firstDataType, ct, finalDataType, type,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {
		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[0] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}
		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},
		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

			// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {
								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s[ "throws" ] ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return { state: "parsererror", error: conv ? e : "No conversion from " + prev + " to " + current };
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}
// Install script dataType
jQuery.ajaxSetup({
	accepts: {
		script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /(?:java|ecma)script/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
});

// Handle cache's special case and global
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
		s.global = false;
	}
});

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function(s) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {

		var script,
			head = document.head || jQuery("head")[0] || document.documentElement;

		return {

			send: function( _, callback ) {

				script = document.createElement("script");

				script.async = true;

				if ( s.scriptCharset ) {
					script.charset = s.scriptCharset;
				}

				script.src = s.url;

				// Attach handlers for all browsers
				script.onload = script.onreadystatechange = function( _, isAbort ) {

					if ( isAbort || !script.readyState || /loaded|complete/.test( script.readyState ) ) {

						// Handle memory leak in IE
						script.onload = script.onreadystatechange = null;

						// Remove the script
						if ( script.parentNode ) {
							script.parentNode.removeChild( script );
						}

						// Dereference the script
						script = null;

						// Callback if not abort
						if ( !isAbort ) {
							callback( 200, "success" );
						}
					}
				};

				// Circumvent IE6 bugs with base elements (#2709 and #4378) by prepending
				// Use native DOM manipulation to avoid our domManip AJAX trickery
				head.insertBefore( script, head.firstChild );
			},

			abort: function() {
				if ( script ) {
					script.onload( undefined, true );
				}
			}
		};
	}
});
var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup({
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( ajax_nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
});

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" && !( s.contentType || "" ).indexOf("application/x-www-form-urlencoded") && rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( ajax_rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters["script json"] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always(function() {
			// Restore preexisting value
			window[ callbackName ] = overwritten;

			// Save back as free
			if ( s[ callbackName ] ) {
				// make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		});

		// Delegate to script
		return "script";
	}
});
var xhrCallbacks, xhrSupported,
	xhrId = 0,
	// #5280: Internet Explorer will keep connections alive if we don't abort on unload
	xhrOnUnloadAbort = window.ActiveXObject && function() {
		// Abort all pending requests
		var key;
		for ( key in xhrCallbacks ) {
			xhrCallbacks[ key ]( undefined, true );
		}
	};

// Functions to create xhrs
function createStandardXHR() {
	try {
		return new window.XMLHttpRequest();
	} catch( e ) {}
}

function createActiveXHR() {
	try {
		return new window.ActiveXObject("Microsoft.XMLHTTP");
	} catch( e ) {}
}

// Create the request object
// (This is still attached to ajaxSettings for backward compatibility)
jQuery.ajaxSettings.xhr = window.ActiveXObject ?
	/* Microsoft failed to properly
	 * implement the XMLHttpRequest in IE7 (can't request local files),
	 * so we use the ActiveXObject when it is available
	 * Additionally XMLHttpRequest can be disabled in IE7/IE8 so
	 * we need a fallback.
	 */
	function() {
		return !this.isLocal && createStandardXHR() || createActiveXHR();
	} :
	// For all other browsers, use the standard XMLHttpRequest object
	createStandardXHR;

// Determine support properties
xhrSupported = jQuery.ajaxSettings.xhr();
jQuery.support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
xhrSupported = jQuery.support.ajax = !!xhrSupported;

// Create transport if the browser can provide an xhr
if ( xhrSupported ) {

	jQuery.ajaxTransport(function( s ) {
		// Cross domain only allowed if supported through XMLHttpRequest
		if ( !s.crossDomain || jQuery.support.cors ) {

			var callback;

			return {
				send: function( headers, complete ) {

					// Get a new xhr
					var handle, i,
						xhr = s.xhr();

					// Open the socket
					// Passing null username, generates a login popup on Opera (#2865)
					if ( s.username ) {
						xhr.open( s.type, s.url, s.async, s.username, s.password );
					} else {
						xhr.open( s.type, s.url, s.async );
					}

					// Apply custom fields if provided
					if ( s.xhrFields ) {
						for ( i in s.xhrFields ) {
							xhr[ i ] = s.xhrFields[ i ];
						}
					}

					// Override mime type if needed
					if ( s.mimeType && xhr.overrideMimeType ) {
						xhr.overrideMimeType( s.mimeType );
					}

					// X-Requested-With header
					// For cross-domain requests, seeing as conditions for a preflight are
					// akin to a jigsaw puzzle, we simply never set it to be sure.
					// (it can always be set on a per-request basis or even using ajaxSetup)
					// For same-domain requests, won't change header if already provided.
					if ( !s.crossDomain && !headers["X-Requested-With"] ) {
						headers["X-Requested-With"] = "XMLHttpRequest";
					}

					// Need an extra try/catch for cross domain requests in Firefox 3
					try {
						for ( i in headers ) {
							xhr.setRequestHeader( i, headers[ i ] );
						}
					} catch( err ) {}

					// Do send the request
					// This may raise an exception which is actually
					// handled in jQuery.ajax (so no try/catch here)
					xhr.send( ( s.hasContent && s.data ) || null );

					// Listener
					callback = function( _, isAbort ) {
						var status, responseHeaders, statusText, responses;

						// Firefox throws exceptions when accessing properties
						// of an xhr when a network error occurred
						// http://helpful.knobs-dials.com/index.php/Component_returned_failure_code:_0x80040111_(NS_ERROR_NOT_AVAILABLE)
						try {

							// Was never called and is aborted or complete
							if ( callback && ( isAbort || xhr.readyState === 4 ) ) {

								// Only called once
								callback = undefined;

								// Do not keep as active anymore
								if ( handle ) {
									xhr.onreadystatechange = jQuery.noop;
									if ( xhrOnUnloadAbort ) {
										delete xhrCallbacks[ handle ];
									}
								}

								// If it's an abort
								if ( isAbort ) {
									// Abort it manually if needed
									if ( xhr.readyState !== 4 ) {
										xhr.abort();
									}
								} else {
									responses = {};
									status = xhr.status;
									responseHeaders = xhr.getAllResponseHeaders();

									// When requesting binary data, IE6-9 will throw an exception
									// on any attempt to access responseText (#11426)
									if ( typeof xhr.responseText === "string" ) {
										responses.text = xhr.responseText;
									}

									// Firefox throws an exception when accessing
									// statusText for faulty cross-domain requests
									try {
										statusText = xhr.statusText;
									} catch( e ) {
										// We normalize with Webkit giving an empty statusText
										statusText = "";
									}

									// Filter status for non standard behaviors

									// If the request is local and we have data: assume a success
									// (success with no data won't get notified, that's the best we
									// can do given current implementations)
									if ( !status && s.isLocal && !s.crossDomain ) {
										status = responses.text ? 200 : 404;
									// IE - #1450: sometimes returns 1223 when it should be 204
									} else if ( status === 1223 ) {
										status = 204;
									}
								}
							}
						} catch( firefoxAccessException ) {
							if ( !isAbort ) {
								complete( -1, firefoxAccessException );
							}
						}

						// Call complete if needed
						if ( responses ) {
							complete( status, statusText, responses, responseHeaders );
						}
					};

					if ( !s.async ) {
						// if we're in sync mode we fire the callback
						callback();
					} else if ( xhr.readyState === 4 ) {
						// (IE6 & IE7) if it's in cache and has been
						// retrieved directly we need to fire the callback
						setTimeout( callback );
					} else {
						handle = ++xhrId;
						if ( xhrOnUnloadAbort ) {
							// Create the active xhrs callbacks list if needed
							// and attach the unload handler
							if ( !xhrCallbacks ) {
								xhrCallbacks = {};
								jQuery( window ).unload( xhrOnUnloadAbort );
							}
							// Add to list of active xhrs callbacks
							xhrCallbacks[ handle ] = callback;
						}
						xhr.onreadystatechange = callback;
					}
				},

				abort: function() {
					if ( callback ) {
						callback( undefined, true );
					}
				}
			};
		}
	});
}
var fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rfxnum = new RegExp( "^(?:([+-])=|)(" + core_pnum + ")([a-z%]*)$", "i" ),
	rrun = /queueHooks$/,
	animationPrefilters = [ defaultPrefilter ],
	tweeners = {
		"*": [function( prop, value ) {
			var tween = this.createTween( prop, value ),
				target = tween.cur(),
				parts = rfxnum.exec( value ),
				unit = parts && parts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

				// Starting value computation is required for potential unit mismatches
				start = ( jQuery.cssNumber[ prop ] || unit !== "px" && +target ) &&
					rfxnum.exec( jQuery.css( tween.elem, prop ) ),
				scale = 1,
				maxIterations = 20;

			if ( start && start[ 3 ] !== unit ) {
				// Trust units reported by jQuery.css
				unit = unit || start[ 3 ];

				// Make sure we update the tween properties later on
				parts = parts || [];

				// Iteratively approximate from a nonzero starting point
				start = +target || 1;

				do {
					// If previous iteration zeroed out, double until we get *something*
					// Use a string for doubling factor so we don't accidentally see scale as unchanged below
					scale = scale || ".5";

					// Adjust and apply
					start = start / scale;
					jQuery.style( tween.elem, prop, start + unit );

				// Update scale, tolerating zero or NaN from tween.cur()
				// And breaking the loop if scale is unchanged or perfect, or if we've just had enough
				} while ( scale !== (scale = tween.cur() / target) && scale !== 1 && --maxIterations );
			}

			// Update tween properties
			if ( parts ) {
				start = tween.start = +start || +target || 0;
				tween.unit = unit;
				// If a +=/-= token was provided, we're doing a relative animation
				tween.end = parts[ 1 ] ?
					start + ( parts[ 1 ] + 1 ) * parts[ 2 ] :
					+parts[ 2 ];
			}

			return tween;
		}]
	};

// Animations created synchronously will run synchronously
function createFxNow() {
	setTimeout(function() {
		fxNow = undefined;
	});
	return ( fxNow = jQuery.now() );
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( tweeners[ prop ] || [] ).concat( tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( (tween = collection[ index ].call( animation, prop, value )) ) {

			// we're done with this property
			return tween;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = animationPrefilters.length,
		deferred = jQuery.Deferred().always( function() {
			// don't match elem in the :animated selector
			delete tick.elem;
		}),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),
				// archaic crash bug won't allow us to use 1 - ( 0.5 || 0 ) (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length ; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ]);

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise({
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, { specialEasing: {} }, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,
					// if we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// resolve when we played the last frame
				// otherwise, reject
				if ( gotoEnd ) {
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		}),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length ; index++ ) {
		result = animationPrefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		})
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// not quite $.extend, this wont overwrite keys already present.
			// also - reusing 'index' from above because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

jQuery.Animation = jQuery.extend( Animation, {

	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.split(" ");
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length ; index++ ) {
			prop = props[ index ];
			tweeners[ prop ] = tweeners[ prop ] || [];
			tweeners[ prop ].unshift( callback );
		}
	},

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			animationPrefilters.unshift( callback );
		} else {
			animationPrefilters.push( callback );
		}
	}
});

function defaultPrefilter( elem, props, opts ) {
	/* jshint validthis: true */
	var prop, value, toggle, tween, hooks, oldfire,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHidden( elem ),
		dataShow = jQuery._data( elem, "fxshow" );

	// handle queue: false promises
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always(function() {
			// doing this makes sure that the complete handler will be called
			// before this completes
			anim.always(function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			});
		});
	}

	// height/width overflow pass
	if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {
		// Make sure that nothing sneaks out
		// Record all 3 overflow attributes because IE does not
		// change the overflow attribute when overflowX and
		// overflowY are set to the same value
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Set display property to inline-block for height/width
		// animations on inline elements that are having width/height animated
		if ( jQuery.css( elem, "display" ) === "inline" &&
				jQuery.css( elem, "float" ) === "none" ) {

			// inline-level elements accept inline-block;
			// block-level elements need to be inline with layout
			if ( !jQuery.support.inlineBlockNeedsLayout || css_defaultDisplay( elem.nodeName ) === "inline" ) {
				style.display = "inline-block";

			} else {
				style.zoom = 1;
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		if ( !jQuery.support.shrinkWrapBlocks ) {
			anim.always(function() {
				style.overflow = opts.overflow[ 0 ];
				style.overflowX = opts.overflow[ 1 ];
				style.overflowY = opts.overflow[ 2 ];
			});
		}
	}


	// show/hide pass
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.exec( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {
				continue;
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );
		}
	}

	if ( !jQuery.isEmptyObject( orig ) ) {
		if ( dataShow ) {
			if ( "hidden" in dataShow ) {
				hidden = dataShow.hidden;
			}
		} else {
			dataShow = jQuery._data( elem, "fxshow", {} );
		}

		// store state if its toggle - enables .stop().toggle() to "reverse"
		if ( toggle ) {
			dataShow.hidden = !hidden;
		}
		if ( hidden ) {
			jQuery( elem ).show();
		} else {
			anim.done(function() {
				jQuery( elem ).hide();
			});
		}
		anim.done(function() {
			var prop;
			jQuery._removeData( elem, "fxshow" );
			for ( prop in orig ) {
				jQuery.style( elem, prop, orig[ prop ] );
			}
		});
		for ( prop in orig ) {
			tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = tween.start;
				if ( hidden ) {
					tween.end = tween.start;
					tween.start = prop === "width" || prop === "height" ? 1 : 0;
				}
			}
		}
	}
}

function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || "swing";
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			if ( tween.elem[ tween.prop ] != null &&
				(!tween.elem.style || tween.elem.style[ tween.prop ] == null) ) {
				return tween.elem[ tween.prop ];
			}

			// passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails
			// so, simple values such as "10px" are parsed to Float.
			// complex values such as "rotate(1rad)" are returned as is.
			result = jQuery.css( tween.elem, tween.prop, "" );
			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {
			// use step hook for back compat - use cssHook if its there - use .style if its
			// available and use plain properties where available
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.style && ( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null || jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE <=9
// Panic based approach to setting things on disconnected nodes

Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.each([ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
});

jQuery.fn.extend({
	fadeTo: function( speed, to, easing, callback ) {

		// show any hidden elements after setting opacity to 0
		return this.filter( isHidden ).css( "opacity", 0 ).show()

			// animate to the value specified
			.end().animate({ opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {
				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || jQuery._data( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each(function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = jQuery._data( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && (type == null || timers[ index ].queue === type) ) {
					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// start the next in the queue if the last step wasn't forced
			// timers currently will call their complete callbacks, which will dequeue
			// but only if they were gotoEnd
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		});
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each(function() {
			var index,
				data = jQuery._data( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// enable finishing flag on private data
			data.finish = true;

			// empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// turn off finishing flag
			delete data.finish;
		});
	}
});

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		attrs = { height: type },
		i = 0;

	// if we include width, step value is 1 to do all cssExpand values,
	// if we don't include width, step value is 2 to skip over Left and Right
	includeWidth = includeWidth? 1 : 0;
	for( ; i < 4 ; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

// Generate shortcuts for custom animations
jQuery.each({
	slideDown: genFx("show"),
	slideUp: genFx("hide"),
	slideToggle: genFx("toggle"),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
});

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
		opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

	// normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p*Math.PI ) / 2;
	}
};

jQuery.timers = [];
jQuery.fx = Tween.prototype.init;
jQuery.fx.tick = function() {
	var timer,
		timers = jQuery.timers,
		i = 0;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];
		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	if ( timer() && jQuery.timers.push( timer ) ) {
		jQuery.fx.start();
	}
};

jQuery.fx.interval = 13;

jQuery.fx.start = function() {
	if ( !timerId ) {
		timerId = setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.stop = function() {
	clearInterval( timerId );
	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,
	// Default speed
	_default: 400
};

// Back Compat <1.8 extension point
jQuery.fx.step = {};

if ( jQuery.expr && jQuery.expr.filters ) {
	jQuery.expr.filters.animated = function( elem ) {
		return jQuery.grep(jQuery.timers, function( fn ) {
			return elem === fn.elem;
		}).length;
	};
}
jQuery.fn.offset = function( options ) {
	if ( arguments.length ) {
		return options === undefined ?
			this :
			this.each(function( i ) {
				jQuery.offset.setOffset( this, options, i );
			});
	}

	var docElem, win,
		box = { top: 0, left: 0 },
		elem = this[ 0 ],
		doc = elem && elem.ownerDocument;

	if ( !doc ) {
		return;
	}

	docElem = doc.documentElement;

	// Make sure it's not a disconnected DOM node
	if ( !jQuery.contains( docElem, elem ) ) {
		return box;
	}

	// If we don't have gBCR, just use 0,0 rather than error
	// BlackBerry 5, iOS 3 (original iPhone)
	if ( typeof elem.getBoundingClientRect !== core_strundefined ) {
		box = elem.getBoundingClientRect();
	}
	win = getWindow( doc );
	return {
		top: box.top  + ( win.pageYOffset || docElem.scrollTop )  - ( docElem.clientTop  || 0 ),
		left: box.left + ( win.pageXOffset || docElem.scrollLeft ) - ( docElem.clientLeft || 0 )
	};
};

jQuery.offset = {

	setOffset: function( elem, options, i ) {
		var position = jQuery.css( elem, "position" );

		// set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		var curElem = jQuery( elem ),
			curOffset = curElem.offset(),
			curCSSTop = jQuery.css( elem, "top" ),
			curCSSLeft = jQuery.css( elem, "left" ),
			calculatePosition = ( position === "absolute" || position === "fixed" ) && jQuery.inArray("auto", [curCSSTop, curCSSLeft]) > -1,
			props = {}, curPosition = {}, curTop, curLeft;

		// need to be able to calculate position if either top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;
		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {
			options = options.call( elem, i, curOffset );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );
		} else {
			curElem.css( props );
		}
	}
};


jQuery.fn.extend({

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			parentOffset = { top: 0, left: 0 },
			elem = this[ 0 ];

		// fixed elements are offset from window (parentOffset = {top:0, left: 0}, because it is it's only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {
			// we assume that getBoundingClientRect is available when computed position is fixed
			offset = elem.getBoundingClientRect();
		} else {
			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset.top  += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
			parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
		}

		// Subtract parent offsets and element margins
		// note: when an element has margin: auto the offsetLeft and marginLeft
		// are the same in Safari causing offset.left to incorrectly be 0
		return {
			top:  offset.top  - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true)
		};
	},

	offsetParent: function() {
		return this.map(function() {
			var offsetParent = this.offsetParent || docElem;
			while ( offsetParent && ( !jQuery.nodeName( offsetParent, "html" ) && jQuery.css( offsetParent, "position") === "static" ) ) {
				offsetParent = offsetParent.offsetParent;
			}
			return offsetParent || docElem;
		});
	}
});


// Create scrollLeft and scrollTop methods
jQuery.each( {scrollLeft: "pageXOffset", scrollTop: "pageYOffset"}, function( method, prop ) {
	var top = /Y/.test( prop );

	jQuery.fn[ method ] = function( val ) {
		return jQuery.access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? (prop in win) ? win[ prop ] :
					win.document.documentElement[ method ] :
					elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : jQuery( win ).scrollLeft(),
					top ? val : jQuery( win ).scrollTop()
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length, null );
	};
});

function getWindow( elem ) {
	return jQuery.isWindow( elem ) ?
		elem :
		elem.nodeType === 9 ?
			elem.defaultView || elem.parentWindow :
			false;
}
// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name }, function( defaultExtra, funcName ) {
		// margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return jQuery.access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {
					// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
					// isn't a whole lot we can do. See pull request at this URL for discussion:
					// https://github.com/jquery/jquery/pull/764
					return elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height], whichever is greatest
					// unfortunately, this causes bug #3838 in IE6/8 only, but there is currently no good, small way to fix it.
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?
					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable, null );
		};
	});
});
// Limit scope pollution from any deprecated API
// (function() {

// The number of elements contained in the matched element set
jQuery.fn.size = function() {
	return this.length;
};

jQuery.fn.andSelf = jQuery.fn.addBack;

// })();
if ( typeof module === "object" && module && typeof module.exports === "object" ) {
	// Expose jQuery as module.exports in loaders that implement the Node
	// module pattern (including browserify). Do not create the global, since
	// the user will be storing it themselves locally, and globals are frowned
	// upon in the Node module world.
	module.exports = jQuery;
} else {
	// Otherwise expose jQuery to the global object as usual
	window.jQuery = window.$ = jQuery;

	// Register as a named AMD module, since jQuery can be concatenated with other
	// files that may use define, but not via a proper concatenation script that
	// understands anonymous AMD modules. A named AMD is safest and most robust
	// way to register. Lowercase jquery is used because AMD module names are
	// derived from file names, and jQuery is normally delivered in a lowercase
	// file name. Do this after creating the global so that if an AMD module wants
	// to call noConflict to hide this version of jQuery, it will work.
	if ( typeof define === "function" && define.amd ) {
		define( "jquery", [], function () { return jQuery; } );
	}
}

})( window );
(function($, undefined) {

/**
 * Unobtrusive scripting adapter for jQuery
 * https://github.com/rails/jquery-ujs
 *
 * Requires jQuery 1.7.0 or later.
 *
 * Released under the MIT license
 *
 */

  // Cut down on the number of issues from people inadvertently including jquery_ujs twice
  // by detecting and raising an error when it happens.
  if ( $.rails !== undefined ) {
    $.error('jquery-ujs has already been loaded!');
  }

  // Shorthand to make it a little easier to call public rails functions from within rails.js
  var rails;
  var $document = $(document);

  $.rails = rails = {
    // Link elements bound by jquery-ujs
    linkClickSelector: 'a[data-confirm], a[data-method], a[data-remote], a[data-disable-with]',

    // Button elements boud jquery-ujs
    buttonClickSelector: 'button[data-remote]',

    // Select elements bound by jquery-ujs
    inputChangeSelector: 'select[data-remote], input[data-remote], textarea[data-remote]',

    // Form elements bound by jquery-ujs
    formSubmitSelector: 'form',

    // Form input elements bound by jquery-ujs
    formInputClickSelector: 'form input[type=submit], form input[type=image], form button[type=submit], form button:not([type])',

    // Form input elements disabled during form submission
    disableSelector: 'input[data-disable-with], button[data-disable-with], textarea[data-disable-with]',

    // Form input elements re-enabled after form submission
    enableSelector: 'input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled',

    // Form required input elements
    requiredInputSelector: 'input[name][required]:not([disabled]),textarea[name][required]:not([disabled])',

    // Form file input elements
    fileInputSelector: 'input[type=file]',

    // Link onClick disable selector with possible reenable after remote submission
    linkDisableSelector: 'a[data-disable-with]',

    // Make sure that every Ajax request sends the CSRF token
    CSRFProtection: function(xhr) {
      var token = $('meta[name="csrf-token"]').attr('content');
      if (token) xhr.setRequestHeader('X-CSRF-Token', token);
    },

    // Triggers an event on an element and returns false if the event result is false
    fire: function(obj, name, data) {
      var event = $.Event(name);
      obj.trigger(event, data);
      return event.result !== false;
    },

    // Default confirm dialog, may be overridden with custom confirm dialog in $.rails.confirm
    confirm: function(message) {
      return confirm(message);
    },

    // Default ajax function, may be overridden with custom function in $.rails.ajax
    ajax: function(options) {
      return $.ajax(options);
    },

    // Default way to get an element's href. May be overridden at $.rails.href.
    href: function(element) {
      return element.attr('href');
    },

    // Submits "remote" forms and links with ajax
    handleRemote: function(element) {
      var method, url, data, elCrossDomain, crossDomain, withCredentials, dataType, options;

      if (rails.fire(element, 'ajax:before')) {
        elCrossDomain = element.data('cross-domain');
        crossDomain = elCrossDomain === undefined ? null : elCrossDomain;
        withCredentials = element.data('with-credentials') || null;
        dataType = element.data('type') || ($.ajaxSettings && $.ajaxSettings.dataType);

        if (element.is('form')) {
          method = element.attr('method');
          url = element.attr('action');
          data = element.serializeArray();
          // memoized value from clicked submit button
          var button = element.data('ujs:submit-button');
          if (button) {
            data.push(button);
            element.data('ujs:submit-button', null);
          }
        } else if (element.is(rails.inputChangeSelector)) {
          method = element.data('method');
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + "&" + element.data('params');
        } else if (element.is(rails.buttonClickSelector)) {
          method = element.data('method') || 'get';
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + "&" + element.data('params');
        } else {
          method = element.data('method');
          url = rails.href(element);
          data = element.data('params') || null;
        }

        options = {
          type: method || 'GET', data: data, dataType: dataType,
          // stopping the "ajax:beforeSend" event will cancel the ajax request
          beforeSend: function(xhr, settings) {
            if (settings.dataType === undefined) {
              xhr.setRequestHeader('accept', '*/*;q=0.5, ' + settings.accepts.script);
            }
            return rails.fire(element, 'ajax:beforeSend', [xhr, settings]);
          },
          success: function(data, status, xhr) {
            element.trigger('ajax:success', [data, status, xhr]);
          },
          complete: function(xhr, status) {
            element.trigger('ajax:complete', [xhr, status]);
          },
          error: function(xhr, status, error) {
            element.trigger('ajax:error', [xhr, status, error]);
          },
          crossDomain: crossDomain
        };

        // There is no withCredentials for IE6-8 when
        // "Enable native XMLHTTP support" is disabled
        if (withCredentials) {
          options.xhrFields = {
            withCredentials: withCredentials
          };
        }

        // Only pass url to `ajax` options if not blank
        if (url) { options.url = url; }

        var jqxhr = rails.ajax(options);
        element.trigger('ajax:send', jqxhr);
        return jqxhr;
      } else {
        return false;
      }
    },

    // Handles "data-method" on links such as:
    // <a href="/users/5" data-method="delete" rel="nofollow" data-confirm="Are you sure?">Delete</a>
    handleMethod: function(link) {
      var href = rails.href(link),
        method = link.data('method'),
        target = link.attr('target'),
        csrf_token = $('meta[name=csrf-token]').attr('content'),
        csrf_param = $('meta[name=csrf-param]').attr('content'),
        form = $('<form method="post" action="' + href + '"></form>'),
        metadata_input = '<input name="_method" value="' + method + '" type="hidden" />';

      if (csrf_param !== undefined && csrf_token !== undefined) {
        metadata_input += '<input name="' + csrf_param + '" value="' + csrf_token + '" type="hidden" />';
      }

      if (target) { form.attr('target', target); }

      form.hide().append(metadata_input).appendTo('body');
      form.submit();
    },

    /* Disables form elements:
      - Caches element value in 'ujs:enable-with' data store
      - Replaces element text with value of 'data-disable-with' attribute
      - Sets disabled property to true
    */
    disableFormElements: function(form) {
      form.find(rails.disableSelector).each(function() {
        var element = $(this), method = element.is('button') ? 'html' : 'val';
        element.data('ujs:enable-with', element[method]());
        element[method](element.data('disable-with'));
        element.prop('disabled', true);
      });
    },

    /* Re-enables disabled form elements:
      - Replaces element text with cached value from 'ujs:enable-with' data store (created in `disableFormElements`)
      - Sets disabled property to false
    */
    enableFormElements: function(form) {
      form.find(rails.enableSelector).each(function() {
        var element = $(this), method = element.is('button') ? 'html' : 'val';
        if (element.data('ujs:enable-with')) element[method](element.data('ujs:enable-with'));
        element.prop('disabled', false);
      });
    },

   /* For 'data-confirm' attribute:
      - Fires `confirm` event
      - Shows the confirmation dialog
      - Fires the `confirm:complete` event

      Returns `true` if no function stops the chain and user chose yes; `false` otherwise.
      Attaching a handler to the element's `confirm` event that returns a `falsy` value cancels the confirmation dialog.
      Attaching a handler to the element's `confirm:complete` event that returns a `falsy` value makes this function
      return false. The `confirm:complete` event is fired whether or not the user answered true or false to the dialog.
   */
    allowAction: function(element) {
      var message = element.data('confirm'),
          answer = false, callback;
      if (!message) { return true; }

      if (rails.fire(element, 'confirm')) {
        answer = rails.confirm(message);
        callback = rails.fire(element, 'confirm:complete', [answer]);
      }
      return answer && callback;
    },

    // Helper function which checks for blank inputs in a form that match the specified CSS selector
    blankInputs: function(form, specifiedSelector, nonBlank) {
      var inputs = $(), input, valueToCheck,
          selector = specifiedSelector || 'input,textarea',
          allInputs = form.find(selector);

      allInputs.each(function() {
        input = $(this);
        valueToCheck = input.is('input[type=checkbox],input[type=radio]') ? input.is(':checked') : input.val();
        // If nonBlank and valueToCheck are both truthy, or nonBlank and valueToCheck are both falsey
        if (!valueToCheck === !nonBlank) {

          // Don't count unchecked required radio if other radio with same name is checked
          if (input.is('input[type=radio]') && allInputs.filter('input[type=radio]:checked[name="' + input.attr('name') + '"]').length) {
            return true; // Skip to next input
          }

          inputs = inputs.add(input);
        }
      });
      return inputs.length ? inputs : false;
    },

    // Helper function which checks for non-blank inputs in a form that match the specified CSS selector
    nonBlankInputs: function(form, specifiedSelector) {
      return rails.blankInputs(form, specifiedSelector, true); // true specifies nonBlank
    },

    // Helper function, needed to provide consistent behavior in IE
    stopEverything: function(e) {
      $(e.target).trigger('ujs:everythingStopped');
      e.stopImmediatePropagation();
      return false;
    },

    //  replace element's html with the 'data-disable-with' after storing original html
    //  and prevent clicking on it
    disableElement: function(element) {
      element.data('ujs:enable-with', element.html()); // store enabled state
      element.html(element.data('disable-with')); // set to disabled state
      element.bind('click.railsDisable', function(e) { // prevent further clicking
        return rails.stopEverything(e);
      });
    },

    // restore element to its original state which was disabled by 'disableElement' above
    enableElement: function(element) {
      if (element.data('ujs:enable-with') !== undefined) {
        element.html(element.data('ujs:enable-with')); // set to old enabled state
        element.removeData('ujs:enable-with'); // clean up cache
      }
      element.unbind('click.railsDisable'); // enable element
    }

  };

  if (rails.fire($document, 'rails:attachBindings')) {

    $.ajaxPrefilter(function(options, originalOptions, xhr){ if ( !options.crossDomain ) { rails.CSRFProtection(xhr); }});

    $document.delegate(rails.linkDisableSelector, 'ajax:complete', function() {
        rails.enableElement($(this));
    });

    $document.delegate(rails.linkClickSelector, 'click.rails', function(e) {
      var link = $(this), method = link.data('method'), data = link.data('params');
      if (!rails.allowAction(link)) return rails.stopEverything(e);

      if (link.is(rails.linkDisableSelector)) rails.disableElement(link);

      if (link.data('remote') !== undefined) {
        if ( (e.metaKey || e.ctrlKey) && (!method || method === 'GET') && !data ) { return true; }

        var handleRemote = rails.handleRemote(link);
        // response from rails.handleRemote() will either be false or a deferred object promise.
        if (handleRemote === false) {
          rails.enableElement(link);
        } else {
          handleRemote.error( function() { rails.enableElement(link); } );
        }
        return false;

      } else if (link.data('method')) {
        rails.handleMethod(link);
        return false;
      }
    });

    $document.delegate(rails.buttonClickSelector, 'click.rails', function(e) {
      var button = $(this);
      if (!rails.allowAction(button)) return rails.stopEverything(e);

      rails.handleRemote(button);
      return false;
    });

    $document.delegate(rails.inputChangeSelector, 'change.rails', function(e) {
      var link = $(this);
      if (!rails.allowAction(link)) return rails.stopEverything(e);

      rails.handleRemote(link);
      return false;
    });

    $document.delegate(rails.formSubmitSelector, 'submit.rails', function(e) {
      var form = $(this),
        remote = form.data('remote') !== undefined,
        blankRequiredInputs = rails.blankInputs(form, rails.requiredInputSelector),
        nonBlankFileInputs = rails.nonBlankInputs(form, rails.fileInputSelector);

      if (!rails.allowAction(form)) return rails.stopEverything(e);

      // skip other logic when required values are missing or file upload is present
      if (blankRequiredInputs && form.attr("novalidate") == undefined && rails.fire(form, 'ajax:aborted:required', [blankRequiredInputs])) {
        return rails.stopEverything(e);
      }

      if (remote) {
        if (nonBlankFileInputs) {
          // slight timeout so that the submit button gets properly serialized
          // (make it easy for event handler to serialize form without disabled values)
          setTimeout(function(){ rails.disableFormElements(form); }, 13);
          var aborted = rails.fire(form, 'ajax:aborted:file', [nonBlankFileInputs]);

          // re-enable form elements if event bindings return false (canceling normal form submission)
          if (!aborted) { setTimeout(function(){ rails.enableFormElements(form); }, 13); }

          return aborted;
        }

        rails.handleRemote(form);
        return false;

      } else {
        // slight timeout so that the submit button gets properly serialized
        setTimeout(function(){ rails.disableFormElements(form); }, 13);
      }
    });

    $document.delegate(rails.formInputClickSelector, 'click.rails', function(event) {
      var button = $(this);

      if (!rails.allowAction(button)) return rails.stopEverything(event);

      // register the pressed submit button
      var name = button.attr('name'),
        data = name ? {name:name, value:button.val()} : null;

      button.closest('form').data('ujs:submit-button', data);
    });

    $document.delegate(rails.formSubmitSelector, 'ajax:beforeSend.rails', function(event) {
      if (this == event.target) rails.disableFormElements($(this));
    });

    $document.delegate(rails.formSubmitSelector, 'ajax:complete.rails', function(event) {
      if (this == event.target) rails.enableFormElements($(this));
    });

    $(function(){
      // making sure that all forms have actual up-to-date token(cached forms contain old one)
      var csrf_token = $('meta[name=csrf-token]').attr('content');
      var csrf_param = $('meta[name=csrf-param]').attr('content');
      $('form input[name="' + csrf_param + '"]').val(csrf_token);
    });
  }

})( jQuery );
/* ===================================================
 * bootstrap-transition.js v2.3.2
 * http://twitter.github.com/bootstrap/javascript.html#transitions
 * ===================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */



!function ($) {

  "use strict"; // jshint ;_;


  /* CSS TRANSITION SUPPORT (http://www.modernizr.com/)
   * ======================================================= */

  $(function () {

    $.support.transition = (function () {

      var transitionEnd = (function () {

        var el = document.createElement('bootstrap')
          , transEndEventNames = {
               'WebkitTransition' : 'webkitTransitionEnd'
            ,  'MozTransition'    : 'transitionend'
            ,  'OTransition'      : 'oTransitionEnd otransitionend'
            ,  'transition'       : 'transitionend'
            }
          , name

        for (name in transEndEventNames){
          if (el.style[name] !== undefined) {
            return transEndEventNames[name]
          }
        }

      }())

      return transitionEnd && {
        end: transitionEnd
      }

    })()

  })

}(window.jQuery);
/* ==========================================================
 * bootstrap-affix.js v2.3.2
 * http://twitter.github.com/bootstrap/javascript.html#affix
 * ==========================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */



!function ($) {

  "use strict"; // jshint ;_;


 /* AFFIX CLASS DEFINITION
  * ====================== */

  var Affix = function (element, options) {
    this.options = $.extend({}, $.fn.affix.defaults, options)
    this.$window = $(window)
      .on('scroll.affix.data-api', $.proxy(this.checkPosition, this))
      .on('click.affix.data-api',  $.proxy(function () { setTimeout($.proxy(this.checkPosition, this), 1) }, this))
    this.$element = $(element)
    this.checkPosition()
  }

  Affix.prototype.checkPosition = function () {
    if (!this.$element.is(':visible')) return

    var scrollHeight = $(document).height()
      , scrollTop = this.$window.scrollTop()
      , position = this.$element.offset()
      , offset = this.options.offset
      , offsetBottom = offset.bottom
      , offsetTop = offset.top
      , reset = 'affix affix-top affix-bottom'
      , affix

    if (typeof offset != 'object') offsetBottom = offsetTop = offset
    if (typeof offsetTop == 'function') offsetTop = offset.top()
    if (typeof offsetBottom == 'function') offsetBottom = offset.bottom()

    affix = this.unpin != null && (scrollTop + this.unpin <= position.top) ?
      false    : offsetBottom != null && (position.top + this.$element.height() >= scrollHeight - offsetBottom) ?
      'bottom' : offsetTop != null && scrollTop <= offsetTop ?
      'top'    : false

    if (this.affixed === affix) return

    this.affixed = affix
    this.unpin = affix == 'bottom' ? position.top - scrollTop : null

    this.$element.removeClass(reset).addClass('affix' + (affix ? '-' + affix : ''))
  }


 /* AFFIX PLUGIN DEFINITION
  * ======================= */

  var old = $.fn.affix

  $.fn.affix = function (option) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('affix')
        , options = typeof option == 'object' && option
      if (!data) $this.data('affix', (data = new Affix(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.affix.Constructor = Affix

  $.fn.affix.defaults = {
    offset: 0
  }


 /* AFFIX NO CONFLICT
  * ================= */

  $.fn.affix.noConflict = function () {
    $.fn.affix = old
    return this
  }


 /* AFFIX DATA-API
  * ============== */

  $(window).on('load', function () {
    $('[data-spy="affix"]').each(function () {
      var $spy = $(this)
        , data = $spy.data()

      data.offset = data.offset || {}

      data.offsetBottom && (data.offset.bottom = data.offsetBottom)
      data.offsetTop && (data.offset.top = data.offsetTop)

      $spy.affix(data)
    })
  })


}(window.jQuery);
/* ==========================================================
 * bootstrap-alert.js v2.3.2
 * http://twitter.github.com/bootstrap/javascript.html#alerts
 * ==========================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */



!function ($) {

  "use strict"; // jshint ;_;


 /* ALERT CLASS DEFINITION
  * ====================== */

  var dismiss = '[data-dismiss="alert"]'
    , Alert = function (el) {
        $(el).on('click', dismiss, this.close)
      }

  Alert.prototype.close = function (e) {
    var $this = $(this)
      , selector = $this.attr('data-target')
      , $parent

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') //strip for ie7
    }

    $parent = $(selector)

    e && e.preventDefault()

    $parent.length || ($parent = $this.hasClass('alert') ? $this : $this.parent())

    $parent.trigger(e = $.Event('close'))

    if (e.isDefaultPrevented()) return

    $parent.removeClass('in')

    function removeElement() {
      $parent
        .trigger('closed')
        .remove()
    }

    $.support.transition && $parent.hasClass('fade') ?
      $parent.on($.support.transition.end, removeElement) :
      removeElement()
  }


 /* ALERT PLUGIN DEFINITION
  * ======================= */

  var old = $.fn.alert

  $.fn.alert = function (option) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('alert')
      if (!data) $this.data('alert', (data = new Alert(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  $.fn.alert.Constructor = Alert


 /* ALERT NO CONFLICT
  * ================= */

  $.fn.alert.noConflict = function () {
    $.fn.alert = old
    return this
  }


 /* ALERT DATA-API
  * ============== */

  $(document).on('click.alert.data-api', dismiss, Alert.prototype.close)

}(window.jQuery);
/* ============================================================
 * bootstrap-button.js v2.3.2
 * http://twitter.github.com/bootstrap/javascript.html#buttons
 * ============================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ============================================================ */



!function ($) {

  "use strict"; // jshint ;_;


 /* BUTTON PUBLIC CLASS DEFINITION
  * ============================== */

  var Button = function (element, options) {
    this.$element = $(element)
    this.options = $.extend({}, $.fn.button.defaults, options)
  }

  Button.prototype.setState = function (state) {
    var d = 'disabled'
      , $el = this.$element
      , data = $el.data()
      , val = $el.is('input') ? 'val' : 'html'

    state = state + 'Text'
    data.resetText || $el.data('resetText', $el[val]())

    $el[val](data[state] || this.options[state])

    // push to event loop to allow forms to submit
    setTimeout(function () {
      state == 'loadingText' ?
        $el.addClass(d).attr(d, d) :
        $el.removeClass(d).removeAttr(d)
    }, 0)
  }

  Button.prototype.toggle = function () {
    var $parent = this.$element.closest('[data-toggle="buttons-radio"]')

    $parent && $parent
      .find('.active')
      .removeClass('active')

    this.$element.toggleClass('active')
  }


 /* BUTTON PLUGIN DEFINITION
  * ======================== */

  var old = $.fn.button

  $.fn.button = function (option) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('button')
        , options = typeof option == 'object' && option
      if (!data) $this.data('button', (data = new Button(this, options)))
      if (option == 'toggle') data.toggle()
      else if (option) data.setState(option)
    })
  }

  $.fn.button.defaults = {
    loadingText: 'loading...'
  }

  $.fn.button.Constructor = Button


 /* BUTTON NO CONFLICT
  * ================== */

  $.fn.button.noConflict = function () {
    $.fn.button = old
    return this
  }


 /* BUTTON DATA-API
  * =============== */

  $(document).on('click.button.data-api', '[data-toggle^=button]', function (e) {
    var $btn = $(e.target)
    if (!$btn.hasClass('btn')) $btn = $btn.closest('.btn')
    $btn.button('toggle')
  })

}(window.jQuery);
/* ==========================================================
 * bootstrap-carousel.js v2.3.2
 * http://twitter.github.com/bootstrap/javascript.html#carousel
 * ==========================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */



!function ($) {

  "use strict"; // jshint ;_;


 /* CAROUSEL CLASS DEFINITION
  * ========================= */

  var Carousel = function (element, options) {
    this.$element = $(element)
    this.$indicators = this.$element.find('.carousel-indicators')
    this.options = options
    this.options.pause == 'hover' && this.$element
      .on('mouseenter', $.proxy(this.pause, this))
      .on('mouseleave', $.proxy(this.cycle, this))
  }

  Carousel.prototype = {

    cycle: function (e) {
      if (!e) this.paused = false
      if (this.interval) clearInterval(this.interval);
      this.options.interval
        && !this.paused
        && (this.interval = setInterval($.proxy(this.next, this), this.options.interval))
      return this
    }

  , getActiveIndex: function () {
      this.$active = this.$element.find('.item.active')
      this.$items = this.$active.parent().children()
      return this.$items.index(this.$active)
    }

  , to: function (pos) {
      var activeIndex = this.getActiveIndex()
        , that = this

      if (pos > (this.$items.length - 1) || pos < 0) return

      if (this.sliding) {
        return this.$element.one('slid', function () {
          that.to(pos)
        })
      }

      if (activeIndex == pos) {
        return this.pause().cycle()
      }

      return this.slide(pos > activeIndex ? 'next' : 'prev', $(this.$items[pos]))
    }

  , pause: function (e) {
      if (!e) this.paused = true
      if (this.$element.find('.next, .prev').length && $.support.transition.end) {
        this.$element.trigger($.support.transition.end)
        this.cycle(true)
      }
      clearInterval(this.interval)
      this.interval = null
      return this
    }

  , next: function () {
      if (this.sliding) return
      return this.slide('next')
    }

  , prev: function () {
      if (this.sliding) return
      return this.slide('prev')
    }

  , slide: function (type, next) {
      var $active = this.$element.find('.item.active')
        , $next = next || $active[type]()
        , isCycling = this.interval
        , direction = type == 'next' ? 'left' : 'right'
        , fallback  = type == 'next' ? 'first' : 'last'
        , that = this
        , e

      this.sliding = true

      isCycling && this.pause()

      $next = $next.length ? $next : this.$element.find('.item')[fallback]()

      e = $.Event('slide', {
        relatedTarget: $next[0]
      , direction: direction
      })

      if ($next.hasClass('active')) return

      if (this.$indicators.length) {
        this.$indicators.find('.active').removeClass('active')
        this.$element.one('slid', function () {
          var $nextIndicator = $(that.$indicators.children()[that.getActiveIndex()])
          $nextIndicator && $nextIndicator.addClass('active')
        })
      }

      if ($.support.transition && this.$element.hasClass('slide')) {
        this.$element.trigger(e)
        if (e.isDefaultPrevented()) return
        $next.addClass(type)
        $next[0].offsetWidth // force reflow
        $active.addClass(direction)
        $next.addClass(direction)
        this.$element.one($.support.transition.end, function () {
          $next.removeClass([type, direction].join(' ')).addClass('active')
          $active.removeClass(['active', direction].join(' '))
          that.sliding = false
          setTimeout(function () { that.$element.trigger('slid') }, 0)
        })
      } else {
        this.$element.trigger(e)
        if (e.isDefaultPrevented()) return
        $active.removeClass('active')
        $next.addClass('active')
        this.sliding = false
        this.$element.trigger('slid')
      }

      isCycling && this.cycle()

      return this
    }

  }


 /* CAROUSEL PLUGIN DEFINITION
  * ========================== */

  var old = $.fn.carousel

  $.fn.carousel = function (option) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('carousel')
        , options = $.extend({}, $.fn.carousel.defaults, typeof option == 'object' && option)
        , action = typeof option == 'string' ? option : options.slide
      if (!data) $this.data('carousel', (data = new Carousel(this, options)))
      if (typeof option == 'number') data.to(option)
      else if (action) data[action]()
      else if (options.interval) data.pause().cycle()
    })
  }

  $.fn.carousel.defaults = {
    interval: 5000
  , pause: 'hover'
  }

  $.fn.carousel.Constructor = Carousel


 /* CAROUSEL NO CONFLICT
  * ==================== */

  $.fn.carousel.noConflict = function () {
    $.fn.carousel = old
    return this
  }

 /* CAROUSEL DATA-API
  * ================= */

  $(document).on('click.carousel.data-api', '[data-slide], [data-slide-to]', function (e) {
    var $this = $(this), href
      , $target = $($this.attr('data-target') || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) //strip for ie7
      , options = $.extend({}, $target.data(), $this.data())
      , slideIndex

    $target.carousel(options)

    if (slideIndex = $this.attr('data-slide-to')) {
      $target.data('carousel').pause().to(slideIndex).cycle()
    }

    e.preventDefault()
  })

}(window.jQuery);
/* =============================================================
 * bootstrap-collapse.js v2.3.2
 * http://twitter.github.com/bootstrap/javascript.html#collapse
 * =============================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ============================================================ */



!function ($) {

  "use strict"; // jshint ;_;


 /* COLLAPSE PUBLIC CLASS DEFINITION
  * ================================ */

  var Collapse = function (element, options) {
    this.$element = $(element)
    this.options = $.extend({}, $.fn.collapse.defaults, options)

    if (this.options.parent) {
      this.$parent = $(this.options.parent)
    }

    this.options.toggle && this.toggle()
  }

  Collapse.prototype = {

    constructor: Collapse

  , dimension: function () {
      var hasWidth = this.$element.hasClass('width')
      return hasWidth ? 'width' : 'height'
    }

  , show: function () {
      var dimension
        , scroll
        , actives
        , hasData

      if (this.transitioning || this.$element.hasClass('in')) return

      dimension = this.dimension()
      scroll = $.camelCase(['scroll', dimension].join('-'))
      actives = this.$parent && this.$parent.find('> .accordion-group > .in')

      if (actives && actives.length) {
        hasData = actives.data('collapse')
        if (hasData && hasData.transitioning) return
        actives.collapse('hide')
        hasData || actives.data('collapse', null)
      }

      this.$element[dimension](0)
      this.transition('addClass', $.Event('show'), 'shown')
      $.support.transition && this.$element[dimension](this.$element[0][scroll])
    }

  , hide: function () {
      var dimension
      if (this.transitioning || !this.$element.hasClass('in')) return
      dimension = this.dimension()
      this.reset(this.$element[dimension]())
      this.transition('removeClass', $.Event('hide'), 'hidden')
      this.$element[dimension](0)
    }

  , reset: function (size) {
      var dimension = this.dimension()

      this.$element
        .removeClass('collapse')
        [dimension](size || 'auto')
        [0].offsetWidth

      this.$element[size !== null ? 'addClass' : 'removeClass']('collapse')

      return this
    }

  , transition: function (method, startEvent, completeEvent) {
      var that = this
        , complete = function () {
            if (startEvent.type == 'show') that.reset()
            that.transitioning = 0
            that.$element.trigger(completeEvent)
          }

      this.$element.trigger(startEvent)

      if (startEvent.isDefaultPrevented()) return

      this.transitioning = 1

      this.$element[method]('in')

      $.support.transition && this.$element.hasClass('collapse') ?
        this.$element.one($.support.transition.end, complete) :
        complete()
    }

  , toggle: function () {
      this[this.$element.hasClass('in') ? 'hide' : 'show']()
    }

  }


 /* COLLAPSE PLUGIN DEFINITION
  * ========================== */

  var old = $.fn.collapse

  $.fn.collapse = function (option) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('collapse')
        , options = $.extend({}, $.fn.collapse.defaults, $this.data(), typeof option == 'object' && option)
      if (!data) $this.data('collapse', (data = new Collapse(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.collapse.defaults = {
    toggle: true
  }

  $.fn.collapse.Constructor = Collapse


 /* COLLAPSE NO CONFLICT
  * ==================== */

  $.fn.collapse.noConflict = function () {
    $.fn.collapse = old
    return this
  }


 /* COLLAPSE DATA-API
  * ================= */

  $(document).on('click.collapse.data-api', '[data-toggle=collapse]', function (e) {
    var $this = $(this), href
      , target = $this.attr('data-target')
        || e.preventDefault()
        || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '') //strip for ie7
      , option = $(target).data('collapse') ? 'toggle' : $this.data()
    $this[$(target).hasClass('in') ? 'addClass' : 'removeClass']('collapsed')
    $(target).collapse(option)
  })

}(window.jQuery);
/* ============================================================
 * bootstrap-dropdown.js v2.3.2
 * http://twitter.github.com/bootstrap/javascript.html#dropdowns
 * ============================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ============================================================ */



!function ($) {

  "use strict"; // jshint ;_;


 /* DROPDOWN CLASS DEFINITION
  * ========================= */

  var toggle = '[data-toggle=dropdown]'
    , Dropdown = function (element) {
        var $el = $(element).on('click.dropdown.data-api', this.toggle)
        $('html').on('click.dropdown.data-api', function () {
          $el.parent().removeClass('open')
        })
      }

  Dropdown.prototype = {

    constructor: Dropdown

  , toggle: function (e) {
      var $this = $(this)
        , $parent
        , isActive

      if ($this.is('.disabled, :disabled')) return

      $parent = getParent($this)

      isActive = $parent.hasClass('open')

      clearMenus()

      if (!isActive) {
        if ('ontouchstart' in document.documentElement) {
          // if mobile we we use a backdrop because click events don't delegate
          $('<div class="dropdown-backdrop"/>').insertBefore($(this)).on('click', clearMenus)
        }
        $parent.toggleClass('open')
      }

      $this.focus()

      return false
    }

  , keydown: function (e) {
      var $this
        , $items
        , $active
        , $parent
        , isActive
        , index

      if (!/(38|40|27)/.test(e.keyCode)) return

      $this = $(this)

      e.preventDefault()
      e.stopPropagation()

      if ($this.is('.disabled, :disabled')) return

      $parent = getParent($this)

      isActive = $parent.hasClass('open')

      if (!isActive || (isActive && e.keyCode == 27)) {
        if (e.which == 27) $parent.find(toggle).focus()
        return $this.click()
      }

      $items = $('[role=menu] li:not(.divider):visible a', $parent)

      if (!$items.length) return

      index = $items.index($items.filter(':focus'))

      if (e.keyCode == 38 && index > 0) index--                                        // up
      if (e.keyCode == 40 && index < $items.length - 1) index++                        // down
      if (!~index) index = 0

      $items
        .eq(index)
        .focus()
    }

  }

  function clearMenus() {
    $('.dropdown-backdrop').remove()
    $(toggle).each(function () {
      getParent($(this)).removeClass('open')
    })
  }

  function getParent($this) {
    var selector = $this.attr('data-target')
      , $parent

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && /#/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, '') //strip for ie7
    }

    $parent = selector && $(selector)

    if (!$parent || !$parent.length) $parent = $this.parent()

    return $parent
  }


  /* DROPDOWN PLUGIN DEFINITION
   * ========================== */

  var old = $.fn.dropdown

  $.fn.dropdown = function (option) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('dropdown')
      if (!data) $this.data('dropdown', (data = new Dropdown(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  $.fn.dropdown.Constructor = Dropdown


 /* DROPDOWN NO CONFLICT
  * ==================== */

  $.fn.dropdown.noConflict = function () {
    $.fn.dropdown = old
    return this
  }


  /* APPLY TO STANDARD DROPDOWN ELEMENTS
   * =================================== */

  $(document)
    .on('click.dropdown.data-api', clearMenus)
    .on('click.dropdown.data-api', '.dropdown form', function (e) { e.stopPropagation() })
    .on('click.dropdown.data-api'  , toggle, Dropdown.prototype.toggle)
    .on('keydown.dropdown.data-api', toggle + ', [role=menu]' , Dropdown.prototype.keydown)

}(window.jQuery);
/* =========================================================
 * bootstrap-modal.js v2.3.2
 * http://twitter.github.com/bootstrap/javascript.html#modals
 * =========================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================= */



!function ($) {

  "use strict"; // jshint ;_;


 /* MODAL CLASS DEFINITION
  * ====================== */

  var Modal = function (element, options) {
    this.options = options
    this.$element = $(element)
      .delegate('[data-dismiss="modal"]', 'click.dismiss.modal', $.proxy(this.hide, this))
    this.options.remote && this.$element.find('.modal-body').load(this.options.remote)
  }

  Modal.prototype = {

      constructor: Modal

    , toggle: function () {
        return this[!this.isShown ? 'show' : 'hide']()
      }

    , show: function () {
        var that = this
          , e = $.Event('show')

        this.$element.trigger(e)

        if (this.isShown || e.isDefaultPrevented()) return

        this.isShown = true

        this.escape()

        this.backdrop(function () {
          var transition = $.support.transition && that.$element.hasClass('fade')

          if (!that.$element.parent().length) {
            that.$element.appendTo(document.body) //don't move modals dom position
          }

          that.$element.show()

          if (transition) {
            that.$element[0].offsetWidth // force reflow
          }

          that.$element
            .addClass('in')
            .attr('aria-hidden', false)

          that.enforceFocus()

          transition ?
            that.$element.one($.support.transition.end, function () { that.$element.focus().trigger('shown') }) :
            that.$element.focus().trigger('shown')

        })
      }

    , hide: function (e) {
        e && e.preventDefault()

        var that = this

        e = $.Event('hide')

        this.$element.trigger(e)

        if (!this.isShown || e.isDefaultPrevented()) return

        this.isShown = false

        this.escape()

        $(document).off('focusin.modal')

        this.$element
          .removeClass('in')
          .attr('aria-hidden', true)

        $.support.transition && this.$element.hasClass('fade') ?
          this.hideWithTransition() :
          this.hideModal()
      }

    , enforceFocus: function () {
        var that = this
        $(document).on('focusin.modal', function (e) {
          if (that.$element[0] !== e.target && !that.$element.has(e.target).length) {
            that.$element.focus()
          }
        })
      }

    , escape: function () {
        var that = this
        if (this.isShown && this.options.keyboard) {
          this.$element.on('keyup.dismiss.modal', function ( e ) {
            e.which == 27 && that.hide()
          })
        } else if (!this.isShown) {
          this.$element.off('keyup.dismiss.modal')
        }
      }

    , hideWithTransition: function () {
        var that = this
          , timeout = setTimeout(function () {
              that.$element.off($.support.transition.end)
              that.hideModal()
            }, 500)

        this.$element.one($.support.transition.end, function () {
          clearTimeout(timeout)
          that.hideModal()
        })
      }

    , hideModal: function () {
        var that = this
        this.$element.hide()
        this.backdrop(function () {
          that.removeBackdrop()
          that.$element.trigger('hidden')
        })
      }

    , removeBackdrop: function () {
        this.$backdrop && this.$backdrop.remove()
        this.$backdrop = null
      }

    , backdrop: function (callback) {
        var that = this
          , animate = this.$element.hasClass('fade') ? 'fade' : ''

        if (this.isShown && this.options.backdrop) {
          var doAnimate = $.support.transition && animate

          this.$backdrop = $('<div class="modal-backdrop ' + animate + '" />')
            .appendTo(document.body)

          this.$backdrop.click(
            this.options.backdrop == 'static' ?
              $.proxy(this.$element[0].focus, this.$element[0])
            : $.proxy(this.hide, this)
          )

          if (doAnimate) this.$backdrop[0].offsetWidth // force reflow

          this.$backdrop.addClass('in')

          if (!callback) return

          doAnimate ?
            this.$backdrop.one($.support.transition.end, callback) :
            callback()

        } else if (!this.isShown && this.$backdrop) {
          this.$backdrop.removeClass('in')

          $.support.transition && this.$element.hasClass('fade')?
            this.$backdrop.one($.support.transition.end, callback) :
            callback()

        } else if (callback) {
          callback()
        }
      }
  }


 /* MODAL PLUGIN DEFINITION
  * ======================= */

  var old = $.fn.modal

  $.fn.modal = function (option) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('modal')
        , options = $.extend({}, $.fn.modal.defaults, $this.data(), typeof option == 'object' && option)
      if (!data) $this.data('modal', (data = new Modal(this, options)))
      if (typeof option == 'string') data[option]()
      else if (options.show) data.show()
    })
  }

  $.fn.modal.defaults = {
      backdrop: true
    , keyboard: true
    , show: true
  }

  $.fn.modal.Constructor = Modal


 /* MODAL NO CONFLICT
  * ================= */

  $.fn.modal.noConflict = function () {
    $.fn.modal = old
    return this
  }


 /* MODAL DATA-API
  * ============== */

  $(document).on('click.modal.data-api', '[data-toggle="modal"]', function (e) {
    var $this = $(this)
      , href = $this.attr('href')
      , $target = $($this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, ''))) //strip for ie7
      , option = $target.data('modal') ? 'toggle' : $.extend({ remote:!/#/.test(href) && href }, $target.data(), $this.data())

    e.preventDefault()

    $target
      .modal(option)
      .one('hide', function () {
        $this.focus()
      })
  })

}(window.jQuery);
/* =============================================================
 * bootstrap-scrollspy.js v2.3.2
 * http://twitter.github.com/bootstrap/javascript.html#scrollspy
 * =============================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ============================================================== */



!function ($) {

  "use strict"; // jshint ;_;


 /* SCROLLSPY CLASS DEFINITION
  * ========================== */

  function ScrollSpy(element, options) {
    var process = $.proxy(this.process, this)
      , $element = $(element).is('body') ? $(window) : $(element)
      , href
    this.options = $.extend({}, $.fn.scrollspy.defaults, options)
    this.$scrollElement = $element.on('scroll.scroll-spy.data-api', process)
    this.selector = (this.options.target
      || ((href = $(element).attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) //strip for ie7
      || '') + ' .nav li > a'
    this.$body = $('body')
    this.refresh()
    this.process()
  }

  ScrollSpy.prototype = {

      constructor: ScrollSpy

    , refresh: function () {
        var self = this
          , $targets

        this.offsets = $([])
        this.targets = $([])

        $targets = this.$body
          .find(this.selector)
          .map(function () {
            var $el = $(this)
              , href = $el.data('target') || $el.attr('href')
              , $href = /^#\w/.test(href) && $(href)
            return ( $href
              && $href.length
              && [[ $href.position().top + (!$.isWindow(self.$scrollElement.get(0)) && self.$scrollElement.scrollTop()), href ]] ) || null
          })
          .sort(function (a, b) { return a[0] - b[0] })
          .each(function () {
            self.offsets.push(this[0])
            self.targets.push(this[1])
          })
      }

    , process: function () {
        var scrollTop = this.$scrollElement.scrollTop() + this.options.offset
          , scrollHeight = this.$scrollElement[0].scrollHeight || this.$body[0].scrollHeight
          , maxScroll = scrollHeight - this.$scrollElement.height()
          , offsets = this.offsets
          , targets = this.targets
          , activeTarget = this.activeTarget
          , i

        if (scrollTop >= maxScroll) {
          return activeTarget != (i = targets.last()[0])
            && this.activate ( i )
        }

        for (i = offsets.length; i--;) {
          activeTarget != targets[i]
            && scrollTop >= offsets[i]
            && (!offsets[i + 1] || scrollTop <= offsets[i + 1])
            && this.activate( targets[i] )
        }
      }

    , activate: function (target) {
        var active
          , selector

        this.activeTarget = target

        $(this.selector)
          .parent('.active')
          .removeClass('active')

        selector = this.selector
          + '[data-target="' + target + '"],'
          + this.selector + '[href="' + target + '"]'

        active = $(selector)
          .parent('li')
          .addClass('active')

        if (active.parent('.dropdown-menu').length)  {
          active = active.closest('li.dropdown').addClass('active')
        }

        active.trigger('activate')
      }

  }


 /* SCROLLSPY PLUGIN DEFINITION
  * =========================== */

  var old = $.fn.scrollspy

  $.fn.scrollspy = function (option) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('scrollspy')
        , options = typeof option == 'object' && option
      if (!data) $this.data('scrollspy', (data = new ScrollSpy(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.scrollspy.Constructor = ScrollSpy

  $.fn.scrollspy.defaults = {
    offset: 10
  }


 /* SCROLLSPY NO CONFLICT
  * ===================== */

  $.fn.scrollspy.noConflict = function () {
    $.fn.scrollspy = old
    return this
  }


 /* SCROLLSPY DATA-API
  * ================== */

  $(window).on('load', function () {
    $('[data-spy="scroll"]').each(function () {
      var $spy = $(this)
      $spy.scrollspy($spy.data())
    })
  })

}(window.jQuery);
/* ========================================================
 * bootstrap-tab.js v2.3.2
 * http://twitter.github.com/bootstrap/javascript.html#tabs
 * ========================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================== */



!function ($) {

  "use strict"; // jshint ;_;


 /* TAB CLASS DEFINITION
  * ==================== */

  var Tab = function (element) {
    this.element = $(element)
  }

  Tab.prototype = {

    constructor: Tab

  , show: function () {
      var $this = this.element
        , $ul = $this.closest('ul:not(.dropdown-menu)')
        , selector = $this.attr('data-target')
        , previous
        , $target
        , e

      if (!selector) {
        selector = $this.attr('href')
        selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') //strip for ie7
      }

      if ( $this.parent('li').hasClass('active') ) return

      previous = $ul.find('.active:last a')[0]

      e = $.Event('show', {
        relatedTarget: previous
      })

      $this.trigger(e)

      if (e.isDefaultPrevented()) return

      $target = $(selector)

      this.activate($this.parent('li'), $ul)
      this.activate($target, $target.parent(), function () {
        $this.trigger({
          type: 'shown'
        , relatedTarget: previous
        })
      })
    }

  , activate: function ( element, container, callback) {
      var $active = container.find('> .active')
        , transition = callback
            && $.support.transition
            && $active.hasClass('fade')

      function next() {
        $active
          .removeClass('active')
          .find('> .dropdown-menu > .active')
          .removeClass('active')

        element.addClass('active')

        if (transition) {
          element[0].offsetWidth // reflow for transition
          element.addClass('in')
        } else {
          element.removeClass('fade')
        }

        if ( element.parent('.dropdown-menu') ) {
          element.closest('li.dropdown').addClass('active')
        }

        callback && callback()
      }

      transition ?
        $active.one($.support.transition.end, next) :
        next()

      $active.removeClass('in')
    }
  }


 /* TAB PLUGIN DEFINITION
  * ===================== */

  var old = $.fn.tab

  $.fn.tab = function ( option ) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('tab')
      if (!data) $this.data('tab', (data = new Tab(this)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.tab.Constructor = Tab


 /* TAB NO CONFLICT
  * =============== */

  $.fn.tab.noConflict = function () {
    $.fn.tab = old
    return this
  }


 /* TAB DATA-API
  * ============ */

  $(document).on('click.tab.data-api', '[data-toggle="tab"], [data-toggle="pill"]', function (e) {
    e.preventDefault()
    $(this).tab('show')
  })

}(window.jQuery);
/* ===========================================================
 * bootstrap-tooltip.js v2.3.2
 * http://twitter.github.com/bootstrap/javascript.html#tooltips
 * Inspired by the original jQuery.tipsy by Jason Frame
 * ===========================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */



!function ($) {

  "use strict"; // jshint ;_;


 /* TOOLTIP PUBLIC CLASS DEFINITION
  * =============================== */

  var Tooltip = function (element, options) {
    this.init('tooltip', element, options)
  }

  Tooltip.prototype = {

    constructor: Tooltip

  , init: function (type, element, options) {
      var eventIn
        , eventOut
        , triggers
        , trigger
        , i

      this.type = type
      this.$element = $(element)
      this.options = this.getOptions(options)
      this.enabled = true

      triggers = this.options.trigger.split(' ')

      for (i = triggers.length; i--;) {
        trigger = triggers[i]
        if (trigger == 'click') {
          this.$element.on('click.' + this.type, this.options.selector, $.proxy(this.toggle, this))
        } else if (trigger != 'manual') {
          eventIn = trigger == 'hover' ? 'mouseenter' : 'focus'
          eventOut = trigger == 'hover' ? 'mouseleave' : 'blur'
          this.$element.on(eventIn + '.' + this.type, this.options.selector, $.proxy(this.enter, this))
          this.$element.on(eventOut + '.' + this.type, this.options.selector, $.proxy(this.leave, this))
        }
      }

      this.options.selector ?
        (this._options = $.extend({}, this.options, { trigger: 'manual', selector: '' })) :
        this.fixTitle()
    }

  , getOptions: function (options) {
      options = $.extend({}, $.fn[this.type].defaults, this.$element.data(), options)

      if (options.delay && typeof options.delay == 'number') {
        options.delay = {
          show: options.delay
        , hide: options.delay
        }
      }

      return options
    }

  , enter: function (e) {
      var defaults = $.fn[this.type].defaults
        , options = {}
        , self

      this._options && $.each(this._options, function (key, value) {
        if (defaults[key] != value) options[key] = value
      }, this)

      self = $(e.currentTarget)[this.type](options).data(this.type)

      if (!self.options.delay || !self.options.delay.show) return self.show()

      clearTimeout(this.timeout)
      self.hoverState = 'in'
      this.timeout = setTimeout(function() {
        if (self.hoverState == 'in') self.show()
      }, self.options.delay.show)
    }

  , leave: function (e) {
      var self = $(e.currentTarget)[this.type](this._options).data(this.type)

      if (this.timeout) clearTimeout(this.timeout)
      if (!self.options.delay || !self.options.delay.hide) return self.hide()

      self.hoverState = 'out'
      this.timeout = setTimeout(function() {
        if (self.hoverState == 'out') self.hide()
      }, self.options.delay.hide)
    }

  , show: function () {
      var $tip
        , pos
        , actualWidth
        , actualHeight
        , placement
        , tp
        , e = $.Event('show')

      if (this.hasContent() && this.enabled) {
        this.$element.trigger(e)
        if (e.isDefaultPrevented()) return
        $tip = this.tip()
        this.setContent()

        if (this.options.animation) {
          $tip.addClass('fade')
        }

        placement = typeof this.options.placement == 'function' ?
          this.options.placement.call(this, $tip[0], this.$element[0]) :
          this.options.placement

        $tip
          .detach()
          .css({ top: 0, left: 0, display: 'block' })

        this.options.container ? $tip.appendTo(this.options.container) : $tip.insertAfter(this.$element)

        pos = this.getPosition()

        actualWidth = $tip[0].offsetWidth
        actualHeight = $tip[0].offsetHeight

        switch (placement) {
          case 'bottom':
            tp = {top: pos.top + pos.height, left: pos.left + pos.width / 2 - actualWidth / 2}
            break
          case 'top':
            tp = {top: pos.top - actualHeight, left: pos.left + pos.width / 2 - actualWidth / 2}
            break
          case 'left':
            tp = {top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left - actualWidth}
            break
          case 'right':
            tp = {top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left + pos.width}
            break
        }

        this.applyPlacement(tp, placement)
        this.$element.trigger('shown')
      }
    }

  , applyPlacement: function(offset, placement){
      var $tip = this.tip()
        , width = $tip[0].offsetWidth
        , height = $tip[0].offsetHeight
        , actualWidth
        , actualHeight
        , delta
        , replace

      $tip
        .offset(offset)
        .addClass(placement)
        .addClass('in')

      actualWidth = $tip[0].offsetWidth
      actualHeight = $tip[0].offsetHeight

      if (placement == 'top' && actualHeight != height) {
        offset.top = offset.top + height - actualHeight
        replace = true
      }

      if (placement == 'bottom' || placement == 'top') {
        delta = 0

        if (offset.left < 0){
          delta = offset.left * -2
          offset.left = 0
          $tip.offset(offset)
          actualWidth = $tip[0].offsetWidth
          actualHeight = $tip[0].offsetHeight
        }

        this.replaceArrow(delta - width + actualWidth, actualWidth, 'left')
      } else {
        this.replaceArrow(actualHeight - height, actualHeight, 'top')
      }

      if (replace) $tip.offset(offset)
    }

  , replaceArrow: function(delta, dimension, position){
      this
        .arrow()
        .css(position, delta ? (50 * (1 - delta / dimension) + "%") : '')
    }

  , setContent: function () {
      var $tip = this.tip()
        , title = this.getTitle()

      $tip.find('.tooltip-inner')[this.options.html ? 'html' : 'text'](title)
      $tip.removeClass('fade in top bottom left right')
    }

  , hide: function () {
      var that = this
        , $tip = this.tip()
        , e = $.Event('hide')

      this.$element.trigger(e)
      if (e.isDefaultPrevented()) return

      $tip.removeClass('in')

      function removeWithAnimation() {
        var timeout = setTimeout(function () {
          $tip.off($.support.transition.end).detach()
        }, 500)

        $tip.one($.support.transition.end, function () {
          clearTimeout(timeout)
          $tip.detach()
        })
      }

      $.support.transition && this.$tip.hasClass('fade') ?
        removeWithAnimation() :
        $tip.detach()

      this.$element.trigger('hidden')

      return this
    }

  , fixTitle: function () {
      var $e = this.$element
      if ($e.attr('title') || typeof($e.attr('data-original-title')) != 'string') {
        $e.attr('data-original-title', $e.attr('title') || '').attr('title', '')
      }
    }

  , hasContent: function () {
      return this.getTitle()
    }

  , getPosition: function () {
      var el = this.$element[0]
      return $.extend({}, (typeof el.getBoundingClientRect == 'function') ? el.getBoundingClientRect() : {
        width: el.offsetWidth
      , height: el.offsetHeight
      }, this.$element.offset())
    }

  , getTitle: function () {
      var title
        , $e = this.$element
        , o = this.options

      title = $e.attr('data-original-title')
        || (typeof o.title == 'function' ? o.title.call($e[0]) :  o.title)

      return title
    }

  , tip: function () {
      return this.$tip = this.$tip || $(this.options.template)
    }

  , arrow: function(){
      return this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow")
    }

  , validate: function () {
      if (!this.$element[0].parentNode) {
        this.hide()
        this.$element = null
        this.options = null
      }
    }

  , enable: function () {
      this.enabled = true
    }

  , disable: function () {
      this.enabled = false
    }

  , toggleEnabled: function () {
      this.enabled = !this.enabled
    }

  , toggle: function (e) {
      var self = e ? $(e.currentTarget)[this.type](this._options).data(this.type) : this
      self.tip().hasClass('in') ? self.hide() : self.show()
    }

  , destroy: function () {
      this.hide().$element.off('.' + this.type).removeData(this.type)
    }

  }


 /* TOOLTIP PLUGIN DEFINITION
  * ========================= */

  var old = $.fn.tooltip

  $.fn.tooltip = function ( option ) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('tooltip')
        , options = typeof option == 'object' && option
      if (!data) $this.data('tooltip', (data = new Tooltip(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.tooltip.Constructor = Tooltip

  $.fn.tooltip.defaults = {
    animation: true
  , placement: 'top'
  , selector: false
  , template: '<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>'
  , trigger: 'hover focus'
  , title: ''
  , delay: 0
  , html: false
  , container: false
  }


 /* TOOLTIP NO CONFLICT
  * =================== */

  $.fn.tooltip.noConflict = function () {
    $.fn.tooltip = old
    return this
  }

}(window.jQuery);
/* ===========================================================
 * bootstrap-popover.js v2.3.2
 * http://twitter.github.com/bootstrap/javascript.html#popovers
 * ===========================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =========================================================== */



!function ($) {

  "use strict"; // jshint ;_;


 /* POPOVER PUBLIC CLASS DEFINITION
  * =============================== */

  var Popover = function (element, options) {
    this.init('popover', element, options)
  }


  /* NOTE: POPOVER EXTENDS BOOTSTRAP-TOOLTIP.js
     ========================================== */

  Popover.prototype = $.extend({}, $.fn.tooltip.Constructor.prototype, {

    constructor: Popover

  , setContent: function () {
      var $tip = this.tip()
        , title = this.getTitle()
        , content = this.getContent()

      $tip.find('.popover-title')[this.options.html ? 'html' : 'text'](title)
      $tip.find('.popover-content')[this.options.html ? 'html' : 'text'](content)

      $tip.removeClass('fade top bottom left right in')
    }

  , hasContent: function () {
      return this.getTitle() || this.getContent()
    }

  , getContent: function () {
      var content
        , $e = this.$element
        , o = this.options

      content = (typeof o.content == 'function' ? o.content.call($e[0]) :  o.content)
        || $e.attr('data-content')

      return content
    }

  , tip: function () {
      if (!this.$tip) {
        this.$tip = $(this.options.template)
      }
      return this.$tip
    }

  , destroy: function () {
      this.hide().$element.off('.' + this.type).removeData(this.type)
    }

  })


 /* POPOVER PLUGIN DEFINITION
  * ======================= */

  var old = $.fn.popover

  $.fn.popover = function (option) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('popover')
        , options = typeof option == 'object' && option
      if (!data) $this.data('popover', (data = new Popover(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.popover.Constructor = Popover

  $.fn.popover.defaults = $.extend({} , $.fn.tooltip.defaults, {
    placement: 'right'
  , trigger: 'click'
  , content: ''
  , template: '<div class="popover"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
  })


 /* POPOVER NO CONFLICT
  * =================== */

  $.fn.popover.noConflict = function () {
    $.fn.popover = old
    return this
  }

}(window.jQuery);
/* =============================================================
 * bootstrap-typeahead.js v2.3.2
 * http://twitter.github.com/bootstrap/javascript.html#typeahead
 * =============================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ============================================================ */



!function($){

  "use strict"; // jshint ;_;


 /* TYPEAHEAD PUBLIC CLASS DEFINITION
  * ================================= */

  var Typeahead = function (element, options) {
    this.$element = $(element)
    this.options = $.extend({}, $.fn.typeahead.defaults, options)
    this.matcher = this.options.matcher || this.matcher
    this.sorter = this.options.sorter || this.sorter
    this.highlighter = this.options.highlighter || this.highlighter
    this.updater = this.options.updater || this.updater
    this.source = this.options.source
    this.$menu = $(this.options.menu)
    this.shown = false
    this.listen()
  }

  Typeahead.prototype = {

    constructor: Typeahead

  , select: function () {
      var val = this.$menu.find('.active').attr('data-value')
      this.$element
        .val(this.updater(val))
        .change()
      return this.hide()
    }

  , updater: function (item) {
      return item
    }

  , show: function () {
      var pos = $.extend({}, this.$element.position(), {
        height: this.$element[0].offsetHeight
      })

      this.$menu
        .insertAfter(this.$element)
        .css({
          top: pos.top + pos.height
        , left: pos.left
        })
        .show()

      this.shown = true
      return this
    }

  , hide: function () {
      this.$menu.hide()
      this.shown = false
      return this
    }

  , lookup: function (event) {
      var items

      this.query = this.$element.val()

      if (!this.query || this.query.length < this.options.minLength) {
        return this.shown ? this.hide() : this
      }

      items = $.isFunction(this.source) ? this.source(this.query, $.proxy(this.process, this)) : this.source

      return items ? this.process(items) : this
    }

  , process: function (items) {
      var that = this

      items = $.grep(items, function (item) {
        return that.matcher(item)
      })

      items = this.sorter(items)

      if (!items.length) {
        return this.shown ? this.hide() : this
      }

      return this.render(items.slice(0, this.options.items)).show()
    }

  , matcher: function (item) {
      return ~item.toLowerCase().indexOf(this.query.toLowerCase())
    }

  , sorter: function (items) {
      var beginswith = []
        , caseSensitive = []
        , caseInsensitive = []
        , item

      while (item = items.shift()) {
        if (!item.toLowerCase().indexOf(this.query.toLowerCase())) beginswith.push(item)
        else if (~item.indexOf(this.query)) caseSensitive.push(item)
        else caseInsensitive.push(item)
      }

      return beginswith.concat(caseSensitive, caseInsensitive)
    }

  , highlighter: function (item) {
      var query = this.query.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, '\\$&')
      return item.replace(new RegExp('(' + query + ')', 'ig'), function ($1, match) {
        return '<strong>' + match + '</strong>'
      })
    }

  , render: function (items) {
      var that = this

      items = $(items).map(function (i, item) {
        i = $(that.options.item).attr('data-value', item)
        i.find('a').html(that.highlighter(item))
        return i[0]
      })

      items.first().addClass('active')
      this.$menu.html(items)
      return this
    }

  , next: function (event) {
      var active = this.$menu.find('.active').removeClass('active')
        , next = active.next()

      if (!next.length) {
        next = $(this.$menu.find('li')[0])
      }

      next.addClass('active')
    }

  , prev: function (event) {
      var active = this.$menu.find('.active').removeClass('active')
        , prev = active.prev()

      if (!prev.length) {
        prev = this.$menu.find('li').last()
      }

      prev.addClass('active')
    }

  , listen: function () {
      this.$element
        .on('focus',    $.proxy(this.focus, this))
        .on('blur',     $.proxy(this.blur, this))
        .on('keypress', $.proxy(this.keypress, this))
        .on('keyup',    $.proxy(this.keyup, this))

      if (this.eventSupported('keydown')) {
        this.$element.on('keydown', $.proxy(this.keydown, this))
      }

      this.$menu
        .on('click', $.proxy(this.click, this))
        .on('mouseenter', 'li', $.proxy(this.mouseenter, this))
        .on('mouseleave', 'li', $.proxy(this.mouseleave, this))
    }

  , eventSupported: function(eventName) {
      var isSupported = eventName in this.$element
      if (!isSupported) {
        this.$element.setAttribute(eventName, 'return;')
        isSupported = typeof this.$element[eventName] === 'function'
      }
      return isSupported
    }

  , move: function (e) {
      if (!this.shown) return

      switch(e.keyCode) {
        case 9: // tab
        case 13: // enter
        case 27: // escape
          e.preventDefault()
          break

        case 38: // up arrow
          e.preventDefault()
          this.prev()
          break

        case 40: // down arrow
          e.preventDefault()
          this.next()
          break
      }

      e.stopPropagation()
    }

  , keydown: function (e) {
      this.suppressKeyPressRepeat = ~$.inArray(e.keyCode, [40,38,9,13,27])
      this.move(e)
    }

  , keypress: function (e) {
      if (this.suppressKeyPressRepeat) return
      this.move(e)
    }

  , keyup: function (e) {
      switch(e.keyCode) {
        case 40: // down arrow
        case 38: // up arrow
        case 16: // shift
        case 17: // ctrl
        case 18: // alt
          break

        case 9: // tab
        case 13: // enter
          if (!this.shown) return
          this.select()
          break

        case 27: // escape
          if (!this.shown) return
          this.hide()
          break

        default:
          this.lookup()
      }

      e.stopPropagation()
      e.preventDefault()
  }

  , focus: function (e) {
      this.focused = true
    }

  , blur: function (e) {
      this.focused = false
      if (!this.mousedover && this.shown) this.hide()
    }

  , click: function (e) {
      e.stopPropagation()
      e.preventDefault()
      this.select()
      this.$element.focus()
    }

  , mouseenter: function (e) {
      this.mousedover = true
      this.$menu.find('.active').removeClass('active')
      $(e.currentTarget).addClass('active')
    }

  , mouseleave: function (e) {
      this.mousedover = false
      if (!this.focused && this.shown) this.hide()
    }

  }


  /* TYPEAHEAD PLUGIN DEFINITION
   * =========================== */

  var old = $.fn.typeahead

  $.fn.typeahead = function (option) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('typeahead')
        , options = typeof option == 'object' && option
      if (!data) $this.data('typeahead', (data = new Typeahead(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.typeahead.defaults = {
    source: []
  , items: 8
  , menu: '<ul class="typeahead dropdown-menu"></ul>'
  , item: '<li><a href="#"></a></li>'
  , minLength: 1
  }

  $.fn.typeahead.Constructor = Typeahead


 /* TYPEAHEAD NO CONFLICT
  * =================== */

  $.fn.typeahead.noConflict = function () {
    $.fn.typeahead = old
    return this
  }


 /* TYPEAHEAD DATA-API
  * ================== */

  $(document).on('focus.typeahead.data-api', '[data-provide="typeahead"]', function (e) {
    var $this = $(this)
    if ($this.data('typeahead')) return
    $this.typeahead($this.data())
  })

}(window.jQuery);













/*  5/19/2012
		PikaChoose
	Jquery plugin for photo galleries
    Copyright (C) 2011 Jeremy Fry

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

(function($){var defaults={autoPlay:true,speed:5000,text:{play:"",stop:"",previous:"Anterior",next:"Siguiente",loading:"Cargando"},transition:[1],showCaption:true,IESafe:false,showTooltips:false,carousel:false,carouselVertical:false,animationFinished:null,buildFinished:null,bindsFinished:null,startOn:0,thumbOpacity:0.4,hoverPause:false,animationSpeed:600,fadeThumbsIn:false,carouselOptions:{},thumbChangeEvent:'click.pikachoose',stopOnClick:false};$.fn.PikaChoose=function(o){return this.each(function(){$(this).data('pikachoose',new $pc(this,o))})};$.PikaChoose=function(e,o){this.options=$.extend({},defaults,o||{});this.list=null;this.image=null;this.anchor=null;this.caption=null;this.imgNav=null;this.imgPlay=null;this.imgPrev=null;this.imgNext=null;this.textNext=null;this.textPrev=null;this.previous=null;this.next=null;this.aniWrap=null;this.aniDiv=null;this.aniImg=null;this.thumbs=null;this.transition=null;this.active=null;this.tooltip=null;this.animating=false;this.stillOut=null;this.counter=null;this.timeOut=null;this.pikaStage=null;if(typeof(this.options.data)!="undefined"){e=$("<ul></ul>").addClass("jcarousel-skin-pika").appendTo(e);$.each(this.options.data,function(){var tmp=null;if(typeof(this.link)!="undefined"){tmp=$("<li><a href='"+this.link+"'><img></a></li>").appendTo(e);if(typeof(this.title)!="undefined"){tmp.find('a').attr('title',this.title)}}else{tmp=$("<li><img></li>").appendTo(e)}if(typeof(this.caption)!="undefined"){tmp.append("<span>"+this.caption+"</span>")}if(typeof(this.thumbnail)!="undefined"){tmp.find('img').attr('ref',this.image);tmp.find('img').attr('src',this.thumbnail)}else{tmp.find('img').attr('src',this.image)}})}if(e instanceof jQuery||e.nodeName.toUpperCase()=='UL'||e.nodeName.toUpperCase()=='OL'){this.list=$(e);this.build();this.bindEvents()}else{return}var y=0;var x=0;for(var t=0;t<25;t++){var a='<div col="'+y+'" row="'+x+'"></div>';this.aniDiv.append(a);y++;if(y==5){x++;y=0}}};var $pc=$.PikaChoose;$pc.fn=$pc.prototype={pikachoose:'4.4.8'};$.fn.pikachoose=$.fn.PikaChoose;$pc.fn.extend=$pc.extend=$.extend;$pc.fn.extend({build:function(){this.step=0;if(this.options.pikaStage){this.wrap=this.options.pikaStage;this.wrap.addClass('pika-stage')}else{this.wrap=$("<div class='pika-stage'></div>").insertBefore(this.list)}this.image=$("<img>").appendTo(this.wrap);this.imgNav=$("<div class='pika-imgnav'></div>").insertAfter(this.image);this.imgPlay=$("<a></a>").appendTo(this.imgNav);this.counter=$("<span class='pika-counter'></span>").appendTo(this.imgNav);if(this.options.autoPlay){this.imgPlay.addClass('pause')}else{this.imgPlay.addClass('play')}this.imgPrev=$("<a class='previous'></a>").insertAfter(this.imgPlay);this.imgNext=$("<a class='next'></a>").insertAfter(this.imgPrev);this.caption=$("<div class='caption'></div>").insertAfter(this.imgNav).hide();this.tooltip=$("<div class='pika-tooltip'></div>").insertAfter(this.list).hide();this.aniWrap=$("<div class='pika-aniwrap'></div>").insertAfter(this.caption);this.aniImg=$("<img>").appendTo(this.aniWrap).hide();this.aniDiv=$("<div class='pika-ani'></div>").appendTo(this.aniWrap);this.textNav=$("<div class='pika-textnav'></div>").insertAfter(this.aniWrap);this.textPrev=$("<a class='previous'>"+this.options.text.previous+"</a>").appendTo(this.textNav);this.textNext=$("<a class='next'>"+this.options.text.next+"</a>").appendTo(this.textNav);this.list.addClass('pika-thumbs');this.thumbs=this.list.find('img');this.loader=$("<div class='pika-loader'></div>").appendTo(this.wrap).hide().html(this.options.text.loading);this.active=this.thumbs.eq(this.options.startOn);this.finishAnimating({'index':this.options.startOn,'source':this.active.attr('ref')||this.active.attr('src'),'caption':this.active.parents('li:first').find('span:first').html(),'clickThrough':this.active.parent().attr('href')||"",'clickThroughTarget':this.active.parent().attr('target')||"",'clickThroughTitle':this.active.parent().attr('title')||""});this.aniDiv.css({position:'relative'});var self=this;this.updateThumbs();if(this.options.fadeThumbsIn){this.list.fadeIn()}if(this.options.carousel){var carouselDefaults={vertical:this.options.carouselVertical,initCallback:function(carousel){jQuery(carousel.list).find('img').click(function(e,x){if(typeof(x)!=='undefined'&&x.how=="auto"){if(self.options.autoPlay==false){return false}}var clicked=parseInt(jQuery(this).parents('.jcarousel-item').attr('jcarouselindex'));var last=(jQuery(this).parents('ul').find('li:last').attr('jcarouselindex')==clicked-1)?true:false;if(!last){clicked=(clicked-2<=0)?0:clicked-2}clicked++;carousel.scroll(clicked)})}};var carouselOptions=$.extend({},carouselDefaults,this.options.carouselOptions||{});this.list.jcarousel(carouselOptions)}if(typeof(this.options.buildFinished)=='function'){this.options.buildFinished(this)}},createThumb:function(ele){var self=ele;var that=this;this.thumbs=this.list.find('img');if(typeof $.data(ele[0],'source')!=='undefined'){return}ele.parents('li:first').wrapInner("<div class='clip' />");self.hide();$.data(ele[0],'clickThrough',self.parent('a').attr('href')||"");$.data(ele[0],'clickThroughTarget',self.parent('a').attr('target')||"");$.data(ele[0],'clickThroughTitle',self.parent('a').attr('title')||"");if(self.parent('a').length>0){self.unwrap()}$.data(ele[0],'caption',self.next('span').html()||"");self.next('span').remove();$.data(ele[0],'source',self.attr('ref')||self.attr('src'));$.data(ele[0],'imageTitle',self.attr('title')||"");$.data(ele[0],'imageAlt',self.attr('alt')||"");$.data(ele[0],'index',this.thumbs.index(ele));$.data(ele[0],'order',self.closest('ul').find('li').index(self.parents('li')));var data=$.data(ele[0]);$('<img />').bind('load',{data:data},function(){if(typeof(that.options.buildThumbStart)=='function'){that.options.buildThumbStart(that)}var img=$(this);var w=this.width;var h=this.height;if(w===0){w=img.attr("width")}if(h===0){h=img.attr("height")}var ph=parseInt(self.parents('.clip').css('height').slice(0,-2));var pw=parseInt(self.parents('.clip').css('width').slice(0,-2));if(pw===0){pw=self.parents('li:first').outerWidth()}if(ph===0){ph=self.parents('li:first').outerHeight()}var rw=pw/w;var rh=ph/h;var ratio;if(rw<rh){self.css({height:'100%'})}else{self.css({width:'100%'})}self.hover(function(e){clearTimeout(that.stillOut);$(this).stop(true,true).fadeTo(250,1);if(!that.options.showTooltips){return}that.tooltip.show().stop(true,true).html(data.caption).animate({top:$(this).parent().position().top,left:$(this).parent().position().left,opacity:1.0},'fast')},function(e){if(!$(this).hasClass("active")){$(this).stop(true,true).fadeTo(250,that.options.thumbOpacity);that.stillOut=setTimeout(that.hideTooltip,700)}});if(data.order==that.options.startOn){self.fadeTo(250,1);self.addClass('active');self.parents('li').eq(0).addClass('active')}else{self.fadeTo(250,that.options.thumbOpacity)}if(typeof(that.options.buildThumbFinish)=='function'){that.options.buildThumbFinish(that)}}).attr('src',self.attr('src'))},bindEvents:function(){this.thumbs.bind(this.options.thumbChangeEvent,{self:this},this.imgClick);this.imgNext.bind('click.pikachoose',{self:this},this.nextClick);this.textNext.bind('click.pikachoose',{self:this},this.nextClick);this.imgPrev.bind('click.pikachoose',{self:this},this.prevClick);this.textPrev.bind('click.pikachoose',{self:this},this.prevClick);this.imgPlay.unbind('click.pikachoose').bind('click.pikachoose',{self:this},this.playClick);this.wrap.unbind('mouseenter.pikachoose').bind('mouseenter.pikachoose',{self:this},function(e){e.data.self.imgNav.stop(true,true).fadeTo('slow',1.0);if(e.data.self.options.hoverPause===true){clearTimeout(e.data.self.timeOut)}});this.wrap.unbind('mouseleave.pikachoose').bind('mouseleave.pikachoose',{self:this},function(e){e.data.self.imgNav.stop(true,true).fadeTo('slow',0.0);if(e.data.self.options.autoPlay&&e.data.self.options.hoverPause){e.data.self.timeOut=setTimeout((function(self){return function(){self.nextClick()}})(e.data.self),e.data.self.options.speed)}});this.tooltip.unbind('mouseenter.pikachoose').bind('mouseenter.pikachoose',{self:this},function(e){clearTimeout(e.data.self.stillOut)});this.tooltip.unbind('mouseleave.pikachoose').bind('mouseleave.pikachoose',{self:this},function(e){e.data.self.stillOut=setTimeout(e.data.self.hideTooltip,700)});if(typeof(this.options.bindsFinished)=='function'){this.options.bindsFinished(this)}},hideTooltip:function(e){$(".pika-tooltip").animate({opacity:0.01})},imgClick:function(e,x){var self=e.data.self;var data=$.data(this);if(self.animating){return}if(typeof(x)=='undefined'||x.how!="auto"){if(self.options.autoPlay&&self.options.stopOnClick){self.imgPlay.trigger('click')}else{clearTimeout(self.timeOut)}}else{if(!self.options.autoPlay){return false}}if($(this).attr('src')!==$.data(this).source){self.loader.fadeIn('fast')}self.caption.fadeOut('slow');self.animating=true;self.active.fadeTo(300,self.options.thumbOpacity).removeClass('active');self.active.parents('.active').eq(0).removeClass('active');self.active=$(this);self.active.addClass('active').fadeTo(200,1);self.active.parents('li').eq(0).addClass('active');$('<img />').bind('load',{self:self,data:data},function(){self.loader.fadeOut('fast');self.aniDiv.css({height:self.image.height(),width:self.image.width()}).show();self.aniDiv.children('div').css({'width':'20%','height':'20%','float':'left'});var n=0;if(self.options.transition[0]==-1){n=Math.floor(Math.random()*7)+1}else{n=self.options.transition[self.step];self.step++;if(self.step>=self.options.transition.length){self.step=0}}if(self.options.IESafe&&$.browser.msie){n=1}self.doAnimation(n,data)}).attr('src',$.data(this).source)},doAnimation:function(n,data){this.aniWrap.css({position:'absolute',top:this.wrap.css('padding-top'),left:this.wrap.css('padding-left'),width:this.wrap.width()});var self=this;self.image.stop(true,false);self.caption.stop().fadeOut();var aWidth=self.aniDiv.children('div').eq(0).width();var aHeight=self.aniDiv.children('div').eq(0).height();var img=new Image();$(img).attr('src',data.source);if(img.height!=self.image.height()||img.width!=self.image.width()){if(n!==0&&n!==1&&n!==7){}}self.aniDiv.css({height:self.image.height(),width:self.image.width()});self.aniDiv.children().each(function(){var div=$(this);var xOffset=Math.floor(div.parent().width()/5)*div.attr('col');var yOffset=Math.floor(div.parent().height()/5)*div.attr('row');div.css({'background':'url('+data.source+') -'+xOffset+'px -'+yOffset+'px','background-size':div.parent().width()+'px '+div.parent().height()+'px','width':'0px','height':'0px','position':'absolute','top':yOffset+'px','left':xOffset+'px','float':'none'})});self.aniDiv.hide();self.aniImg.hide();switch(n){case 0:self.image.stop(true,true).fadeOut(self.options.animationSpeed,function(){self.image.attr('src',data.source).fadeIn(self.options.animationSpeed,function(){self.finishAnimating(data)})});break;case 1:self.aniDiv.hide();self.aniImg.height(self.image.height()).hide().attr('src',data.source);self.wrap.css({height:self.image.height()});$.when(self.image.fadeOut(self.options.animationSpeed),self.aniImg.eq(0).fadeIn(self.options.animationSpeed)).done(function(){self.finishAnimating(data)});break;case 2:self.aniDiv.show().children().hide().each(function(index){var delay=index*30;$(this).css({opacity:0.1}).show().delay(delay).animate({opacity:1,"width":aWidth,"height":aHeight},200,'linear',function(){if(self.aniDiv.find("div").index(this)==24){self.finishAnimating(data)}})});break;case 3:self.aniDiv.show().children("div:lt(5)").hide().each(function(index){var delay=$(this).attr('col')*100;$(this).css({opacity:0.1,"width":aWidth}).show().delay(delay).animate({opacity:1,"height":self.image.height()},self.options.animationSpeed,'linear',function(){if(self.aniDiv.find(" div").index(this)==4){self.finishAnimating(data)}})});break;case 4:self.aniDiv.show().children().hide().each(function(index){if(index>4){return}var delay=$(this).attr('col')*30;var gap=self.gapper($(this),aHeight,aWidth);var speed=self.options.animationSpeed*0.7;$(this).css({opacity:0.1,"height":"100%"}).show().delay(delay).animate({opacity:1,"width":gap.width},speed,'linear',function(){if(self.aniDiv.find(" div").index(this)==4){self.finishAnimating(data)}})});break;case 5:self.aniDiv.show().children().show().each(function(index){var delay=index*Math.floor(Math.random()*5)*7;var gap=self.gapper($(this),aHeight,aWidth);if($(".animation div").index(this)==24){delay=700}$(this).css({"height":gap.height,"width":gap.width,"opacity":0.01}).delay(delay).animate({"opacity":1},self.options.animationSpeed,function(){if(self.aniDiv.find(" div").index(this)==24){self.finishAnimating(data)}})});break;case 6:self.aniDiv.height(self.image.height()).hide().css({'background':'url('+data.source+') top left no-repeat'});self.aniDiv.children('div').hide();self.aniDiv.css({width:0}).show().animate({width:self.image.width()},self.options.animationSpeed,function(){self.finishAnimating(data);self.aniDiv.css({'background':'transparent'})});break;case 7:self.wrap.css({overflow:'hidden'});self.aniImg.height(self.image.height()).hide().attr('src',data.source);self.aniDiv.hide();self.image.css({position:'relative'}).animate({left:"-"+self.wrap.outerWidth()+"px"});self.aniImg.show();self.aniWrap.css({left:self.wrap.outerWidth()}).show().animate({left:"0px"},self.options.animationSpeed,function(){self.finishAnimating(data)});break}},finishAnimating:function(data){this.animating=false;this.image.attr('src',data.source);this.image.attr('alt',data.imageAlt);this.image.attr('title',data.imageTitle);this.image.css({left:"0"});this.image.show();var self=this;$('<img />').bind('load',function(){self.aniImg.fadeOut('fast');self.aniDiv.fadeOut('fast')}).attr('src',data.source);var cur=data.index+1;var total=this.thumbs.length;this.counter.html(cur+"/"+total);if(data.clickThrough!==""){if(this.anchor===null){this.anchor=this.image.wrap("<a>").parent()}this.anchor.attr('href',data.clickThrough);this.anchor.attr('title',data.clickThroughTitle);this.anchor.attr('target',data.clickThroughTarget)}else{if(this.image.parent('a').length>0){this.image.unwrap()}this.anchor=null}if(this.options.showCaption&&data.caption!==""&&data.caption!==null){this.caption.html(data.caption).fadeTo('slow',1)}if(this.options.autoPlay){var self=this;this.timeOut=setTimeout((function(self){return function(){self.nextClick()}})(this),this.options.speed,this.timeOut)}if(typeof(this.options.animationFinished)=='function'){this.options.animationFinished(this)}},gapper:function(ele,aHeight,aWidth){var gap;if(ele.attr('row')==4){gap=(this.aniDiv.height()-(aHeight*5))+aHeight;aHeight=gap}if(ele.attr('col')==4){gap=(this.aniDiv.width()-(aWidth*5))+aWidth;aWidth=gap}return{height:aHeight,width:aWidth}},nextClick:function(e){var how="natural";var self=null;try{self=e.data.self;if(typeof(e.data.self.options.next)=='function'){e.data.self.options.next(this)}}catch(err){self=this;how="auto"}var next=self.active.parents('li:first').next().find('img');if(next.length===0){next=self.list.find('img').eq(0)}next.trigger('click',{how:how})},prevClick:function(e){if(typeof(e.data.self.options.previous)=='function'){e.data.self.options.previous(this)}var self=e.data.self;var prev=self.active.parents('li:first').prev().find('img');if(prev.length===0){prev=self.list.find('img:last')}prev.trigger('click')},playClick:function(e){var self=e.data.self;self.options.autoPlay=!self.options.autoPlay;self.imgPlay.toggleClass('play').toggleClass('pause');if(self.options.autoPlay){self.nextClick()}},Next:function(){var e={data:{self:this}};this.nextClick(e)},Prev:function(){var e={data:{self:this}};this.prevClick(e)},GoTo:function(v){var e={data:{self:this}};this.list.find('img').eq(v).trigger('click')},Play:function(){if(this.options.autoPlay){return}var e={data:{self:this}};this.playClick(e)},Pause:function(){if(!this.options.autoPlay){return}var e={data:{self:this}};this.playClick(e)},updateThumbs:function(){var self=this;this.thumbs=this.list.find('img');this.thumbs.each(function(){self.createThumb($(this),self)})}})})(jQuery);
window.tinymce = window.tinymce || {
  base:   '/assets/tinymce',
  suffix: ''
};
// 4.0.1 (2013-06-26)
!function(e,t){"use strict";function n(e,t){for(var n,r=[],i=0;i<e.length;++i){if(n=s[e[i]]||o(e[i]),!n)throw"module definition dependecy not found: "+e[i];r.push(n)}t.apply(null,r)}function r(e,r,i){if("string"!=typeof e)throw"invalid module definition, module id must be defined and be a string";if(r===t)throw"invalid module definition, dependencies must be specified";if(i===t)throw"invalid module definition, definition function must be specified";n(r,function(){s[e]=i.apply(null,arguments)})}function i(e){return!!s[e]}function o(t){for(var n=e,r=t.split(/[.\/]/),i=0;i<r.length;++i){if(!n[r[i]])return;n=n[r[i]]}return n}function a(n){for(var r=0;r<n.length;r++){for(var i=e,o=n[r],a=o.split(/[.\/]/),l=0;l<a.length-1;++l)i[a[l]]===t&&(i[a[l]]={}),i=i[a[l]];i[a[a.length-1]]=s[o]}}var s={},l="tinymce/dom/Sizzle",c="tinymce/html/Styles",d="tinymce/dom/EventUtils",u="tinymce/dom/TreeWalker",f="tinymce/util/Tools",p="tinymce/dom/Range",h="tinymce/html/Entities",m="tinymce/Env",g="tinymce/dom/DOMUtils",v="tinymce/dom/ScriptLoader",y="tinymce/AddOnManager",b="tinymce/html/Node",C="tinymce/html/Schema",x="tinymce/html/SaxParser",w="tinymce/html/DomParser",_="tinymce/html/Writer",N="tinymce/html/Serializer",E="tinymce/dom/Serializer",k="tinymce/dom/TridentSelection",S="tinymce/util/VK",T="tinymce/dom/ControlSelection",R="tinymce/dom/Selection",A="tinymce/dom/RangeUtils",B="tinymce/Formatter",H="tinymce/UndoManager",M="tinymce/EnterKey",L="tinymce/ForceBlocks",D="tinymce/EditorCommands",P="tinymce/util/URI",O="tinymce/util/Class",I="tinymce/ui/Selector",F="tinymce/ui/Collection",W="tinymce/ui/DomUtils",z="tinymce/ui/Control",V="tinymce/ui/Factory",U="tinymce/ui/Container",q="tinymce/ui/DragHelper",j="tinymce/ui/Scrollable",$="tinymce/ui/Panel",K="tinymce/ui/Movable",G="tinymce/ui/Resizable",Y="tinymce/ui/FloatPanel",X="tinymce/ui/KeyboardNavigation",J="tinymce/ui/Window",Q="tinymce/ui/MessageBox",Z="tinymce/WindowManager",et="tinymce/util/Quirks",tt="tinymce/util/Observable",nt="tinymce/Shortcuts",rt="tinymce/Editor",it="tinymce/util/I18n",ot="tinymce/FocusManager",at="tinymce/EditorManager",st="tinymce/LegacyInput",lt="tinymce/util/XHR",ct="tinymce/util/JSON",dt="tinymce/util/JSONRequest",ut="tinymce/util/JSONP",ft="tinymce/util/LocalStorage",pt="tinymce/Compat",ht="tinymce/ui/Layout",mt="tinymce/ui/AbsoluteLayout",gt="tinymce/ui/Tooltip",vt="tinymce/ui/Widget",yt="tinymce/ui/Button",bt="tinymce/ui/ButtonGroup",Ct="tinymce/ui/Checkbox",xt="tinymce/ui/PanelButton",wt="tinymce/ui/ColorButton",_t="tinymce/ui/ComboBox",Nt="tinymce/ui/Path",Et="tinymce/ui/ElementPath",kt="tinymce/ui/FormItem",St="tinymce/ui/Form",Tt="tinymce/ui/FieldSet",Rt="tinymce/ui/FilePicker",At="tinymce/ui/FitLayout",Bt="tinymce/ui/FlexLayout",Ht="tinymce/ui/FlowLayout",Mt="tinymce/ui/FormatControls",Lt="tinymce/ui/GridLayout",Dt="tinymce/ui/Iframe",Pt="tinymce/ui/Label",Ot="tinymce/ui/Toolbar",It="tinymce/ui/MenuBar",Ft="tinymce/ui/MenuButton",Wt="tinymce/ui/ListBox",zt="tinymce/ui/MenuItem",Vt="tinymce/ui/Menu",Ut="tinymce/ui/Radio",qt="tinymce/ui/ResizeHandle",jt="tinymce/ui/Spacer",$t="tinymce/ui/SplitButton",Kt="tinymce/ui/StackLayout",Gt="tinymce/ui/TabPanel",Yt="tinymce/ui/TextBox",Xt="tinymce/ui/Throbber";r(l,[],function(){function e(e,n,r,i){return t.find(e,n,r,i)}if(!window.jQuery)throw new Error("Load jQuery first");var t=jQuery;return e.matches=function(e,n){return t(n).is(e)?n:[]},e}),r(c,[],function(){return function(e,t){function n(e,t,n,r){function i(e){return e=parseInt(e,10).toString(16),e.length>1?e:"0"+e}return"#"+i(t)+i(n)+i(r)}var r=/rgb\s*\(\s*([0-9]+)\s*,\s*([0-9]+)\s*,\s*([0-9]+)\s*\)/gi,i=/(?:url(?:(?:\(\s*\"([^\"]+)\"\s*\))|(?:\(\s*\'([^\']+)\'\s*\))|(?:\(\s*([^)\s]+)\s*\))))|(?:\'([^\']+)\')|(?:\"([^\"]+)\")/gi,o=/\s*([^:]+):\s*([^;]+);?/g,a=/\s+$/,s,l,c={},d,u="\ufeff";for(e=e||{},d=("\\\" \\' \\; \\: ; : "+u).split(" "),l=0;l<d.length;l++)c[d[l]]=u+l,c[u+l]=d[l];return{toHex:function(e){return e.replace(r,n)},parse:function(t){function s(e,t){var n,r,i,o;n=h[e+"-top"+t],n&&(r=h[e+"-right"+t],n==r&&(i=h[e+"-bottom"+t],r==i&&(o=h[e+"-left"+t],i==o&&(h[e+t]=o,delete h[e+"-top"+t],delete h[e+"-right"+t],delete h[e+"-bottom"+t],delete h[e+"-left"+t]))))}function l(e){var t=h[e],n;if(t&&!(t.indexOf(" ")<0)){for(t=t.split(" "),n=t.length;n--;)if(t[n]!==t[0])return!1;return h[e]=t[0],!0}}function d(e,t,n,r){l(t)&&l(n)&&l(r)&&(h[e]=h[t]+" "+h[n]+" "+h[r],delete h[t],delete h[n],delete h[r])}function u(e){return y=!0,c[e]}function f(e,t){return y&&(e=e.replace(/\uFEFF[0-9]/g,function(e){return c[e]})),t||(e=e.replace(/\\([\'\";:])/g,"$1")),e}function p(e,t,n,r,i,o){return(i=i||o)?(i=f(i),"'"+i.replace(/\'/g,"\\'")+"'"):(t=f(t||n||r),b&&(t=b.call(C,t,"style")),"url('"+t.replace(/\'/g,"\\'")+"')")}var h={},m,g,v,y,b=e.url_converter,C=e.url_converter_scope||this;if(t){for(t=t.replace(/\\[\"\';:\uFEFF]/g,u).replace(/\"[^\"]+\"|\'[^\']+\'/g,function(e){return e.replace(/[;:]/g,u)});m=o.exec(t);)g=m[1].replace(a,"").toLowerCase(),v=m[2].replace(a,""),g&&v.length>0&&("font-weight"===g&&"700"===v?v="bold":("color"===g||"background-color"===g)&&(v=v.toLowerCase()),v=v.replace(r,n),v=v.replace(i,p),h[g]=y?f(v,!0):v),o.lastIndex=m.index+m[0].length;s("border",""),s("border","-width"),s("border","-color"),s("border","-style"),s("padding",""),s("margin",""),d("border","border-width","border-style","border-color"),"medium none"===h.border&&delete h.border}return h},serialize:function(e,n){function r(n){var r,o,a,l;if(r=t.styles[n])for(o=0,a=r.length;a>o;o++)n=r[o],l=e[n],l!==s&&l.length>0&&(i+=(i.length>0?" ":"")+n+": "+l+";")}var i="",o,a;if(n&&t&&t.styles)r("*"),r(n);else for(o in e)a=e[o],a!==s&&a.length>0&&(i+=(i.length>0?" ":"")+o+": "+a+";");return i}}}}),r(d,[],function(){function e(e,t,n,r){e.addEventListener?e.addEventListener(t,n,r||!1):e.attachEvent&&e.attachEvent("on"+t,n)}function t(e,t,n,r){e.removeEventListener?e.removeEventListener(t,n,r||!1):e.detachEvent&&e.detachEvent("on"+t,n)}function n(e,t){function n(){return!1}function r(){return!0}var i,o=t||{},s;for(i in e)"layerX"!==i&&"layerY"!==i&&(o[i]=e[i]);if(o.target||(o.target=o.srcElement||document),e&&a.test(e.type)&&e.pageX===s&&e.clientX!==s){var l=o.target.ownerDocument||document,c=l.documentElement,d=l.body;o.pageX=e.clientX+(c&&c.scrollLeft||d&&d.scrollLeft||0)-(c&&c.clientLeft||d&&d.clientLeft||0),o.pageY=e.clientY+(c&&c.scrollTop||d&&d.scrollTop||0)-(c&&c.clientTop||d&&d.clientTop||0)}return o.preventDefault=function(){o.isDefaultPrevented=r,e&&(e.preventDefault?e.preventDefault():e.returnValue=!1)},o.stopPropagation=function(){o.isPropagationStopped=r,e&&(e.stopPropagation?e.stopPropagation():e.cancelBubble=!0)},o.stopImmediatePropagation=function(){o.isImmediatePropagationStopped=r,o.stopPropagation()},o.isDefaultPrevented||(o.isDefaultPrevented=n,o.isPropagationStopped=n,o.isImmediatePropagationStopped=n),o}function r(n,r,i){function o(){i.domLoaded||(i.domLoaded=!0,r(c))}function a(){"complete"===l.readyState&&(t(l,"readystatechange",a),o())}function s(){try{l.documentElement.doScroll("left")}catch(e){return setTimeout(s,0),void 0}o()}var l=n.document,c={type:"ready"};return i.domLoaded?(r(c),void 0):(l.addEventListener?e(n,"DOMContentLoaded",o):(e(l,"readystatechange",a),l.documentElement.doScroll&&n===n.top&&s()),e(n,"load",o),void 0)}function i(){function i(e,t){var n,r,i,o;if(n=s[t][e.type])for(r=0,i=n.length;i>r;r++)if(o=n[r],o&&o.func.call(o.scope,e)===!1&&e.preventDefault(),e.isImmediatePropagationStopped())return}var a=this,s={},l,c,d,u,f;c=o+(+new Date).toString(32),u="onmouseenter"in document.documentElement,d="onfocusin"in document.documentElement,f={mouseenter:"mouseover",mouseleave:"mouseout"},l=1,a.domLoaded=!1,a.events=s,a.bind=function(t,o,p,h){function m(e){i(n(e||_.event),g)}var g,v,y,b,C,x,w,_=window;if(t&&3!==t.nodeType&&8!==t.nodeType){for(t[c]?g=t[c]:(g=l++,t[c]=g,s[g]={}),h=h||t,o=o.split(" "),y=o.length;y--;)b=o[y],x=m,C=w=!1,"DOMContentLoaded"===b&&(b="ready"),a.domLoaded&&"ready"===b&&"complete"==t.readyState?p.call(h,n({type:b})):(u||(C=f[b],C&&(x=function(e){var t,r;if(t=e.currentTarget,r=e.relatedTarget,r&&t.contains)r=t.contains(r);else for(;r&&r!==t;)r=r.parentNode;r||(e=n(e||_.event),e.type="mouseout"===e.type?"mouseleave":"mouseenter",e.target=t,i(e,g))})),d||"focusin"!==b&&"focusout"!==b||(w=!0,C="focusin"===b?"focus":"blur",x=function(e){e=n(e||_.event),e.type="focus"===e.type?"focusin":"focusout",i(e,g)}),v=s[g][b],v?"ready"===b&&a.domLoaded?p({type:b}):v.push({func:p,scope:h}):(s[g][b]=v=[{func:p,scope:h}],v.fakeName=C,v.capture=w,v.nativeHandler=x,"ready"===b?r(t,x,a):e(t,C||b,x,w)));return t=v=0,p}},a.unbind=function(e,n,r){var i,o,l,d,u,f;if(!e||3===e.nodeType||8===e.nodeType)return a;if(i=e[c]){if(f=s[i],n){for(n=n.split(" "),l=n.length;l--;)if(u=n[l],o=f[u]){if(r)for(d=o.length;d--;)o[d].func===r&&o.splice(d,1);r&&0!==o.length||(delete f[u],t(e,o.fakeName||u,o.nativeHandler,o.capture))}}else{for(u in f)o=f[u],t(e,o.fakeName||u,o.nativeHandler,o.capture);f={}}for(u in f)return a;delete s[i];try{delete e[c]}catch(p){e[c]=null}}return a},a.fire=function(e,t,r){var o;if(!e||3===e.nodeType||8===e.nodeType)return a;r=n(null,r),r.type=t,r.target=e;do o=e[c],o&&i(r,o),e=e.parentNode||e.ownerDocument||e.defaultView||e.parentWindow;while(e&&!r.isPropagationStopped());return a},a.clean=function(e){var t,n,r=a.unbind;if(!e||3===e.nodeType||8===e.nodeType)return a;if(e[c]&&r(e),e.getElementsByTagName||(e=e.document),e&&e.getElementsByTagName)for(r(e),n=e.getElementsByTagName("*"),t=n.length;t--;)e=n[t],e[c]&&r(e);return a},a.destroy=function(){s={}},a.cancel=function(e){return e&&(e.preventDefault(),e.stopImmediatePropagation()),!1}}var o="mce-data-",a=/^(?:mouse|contextmenu)|click/;return i.Event=new i,i.Event.bind(window,"ready",function(){}),i}),r(u,[],function(){return function(e,t){function n(e,n,r,i){var o,a;if(e){if(!i&&e[n])return e[n];if(e!=t){if(o=e[r])return o;for(a=e.parentNode;a&&a!=t;a=a.parentNode)if(o=a[r])return o}}}var r=e;this.current=function(){return r},this.next=function(e){return r=n(r,"firstChild","nextSibling",e)},this.prev=function(e){return r=n(r,"lastChild","previousSibling",e)}}}),r(f,[],function(){function e(e,n){return n?"array"==n&&g(e)?!0:typeof e==n:e!==t}function n(e){var t=[],n,r;for(n=0,r=e.length;r>n;n++)t[n]=e[n];return t}function r(e,t,n){var r;for(e=e||[],t=t||",","string"==typeof e&&(e=e.split(t)),n=n||{},r=e.length;r--;)n[e[r]]={};return n}function i(e,n,r){var i,o;if(!e)return 0;if(r=r||e,e.length!==t){for(i=0,o=e.length;o>i;i++)if(n.call(r,e[i],i,e)===!1)return 0}else for(i in e)if(e.hasOwnProperty(i)&&n.call(r,e[i],i,e)===!1)return 0;return 1}function o(e,t){var n=[];return i(e,function(e){n.push(t(e))}),n}function a(e,t){var n=[];return i(e,function(e){(!t||t(e))&&n.push(e)}),n}function s(e,t,n){var r=this,i,o,a,s,l,c=0;if(e=/^((static) )?([\w.]+)(:([\w.]+))?/.exec(e),a=e[3].match(/(^|\.)(\w+)$/i)[2],o=r.createNS(e[3].replace(/\.\w+$/,""),n),!o[a]){if("static"==e[2])return o[a]=t,this.onCreate&&this.onCreate(e[2],e[3],o[a]),void 0;t[a]||(t[a]=function(){},c=1),o[a]=t[a],r.extend(o[a].prototype,t),e[5]&&(i=r.resolve(e[5]).prototype,s=e[5].match(/\.(\w+)$/i)[1],l=o[a],o[a]=c?function(){return i[s].apply(this,arguments)}:function(){return this.parent=i[s],l.apply(this,arguments)},o[a].prototype[a]=o[a],r.each(i,function(e,t){o[a].prototype[t]=i[t]}),r.each(t,function(e,t){i[t]?o[a].prototype[t]=function(){return this.parent=i[t],e.apply(this,arguments)}:t!=a&&(o[a].prototype[t]=e)})),r.each(t["static"],function(e,t){o[a][t]=e})}}function l(e,t){var n,r;if(e)for(n=0,r=e.length;r>n;n++)if(e[n]===t)return n;return-1}function c(e,n){var r,i,o,a=arguments,s;for(r=1,i=a.length;i>r;r++){n=a[r];for(o in n)n.hasOwnProperty(o)&&(s=n[o],s!==t&&(e[o]=s))}return e}function d(e,t,n,r){r=r||this,e&&(n&&(e=e[n]),i(e,function(e,i){return t.call(r,e,i,n)===!1?!1:(d(e,t,n,r),void 0)}))}function u(e,t){var n,r;for(t=t||window,e=e.split("."),n=0;n<e.length;n++)r=e[n],t[r]||(t[r]={}),t=t[r];return t}function f(e,t){var n,r;for(t=t||window,e=e.split("."),n=0,r=e.length;r>n&&(t=t[e[n]],t);n++);return t}function p(t,n){return!t||e(t,"array")?t:o(t.split(n||","),m)}var h=/^\s*|\s*$/g,m=function(e){return null===e||e===t?"":(""+e).replace(h,"")},g=Array.isArray||function(e){return"[object Array]"===Object.prototype.toString.call(e)};return{trim:m,isArray:g,is:e,toArray:n,makeMap:r,each:i,map:o,grep:a,inArray:l,extend:c,create:s,walk:d,createNS:u,resolve:f,explode:p}}),r(p,[f],function(e){function t(n){function r(){return D.createDocumentFragment()}function i(e,t){_(F,e,t)}function o(e,t){_(W,e,t)}function a(e){i(e.parentNode,$(e))}function s(e){i(e.parentNode,$(e)+1)}function l(e){o(e.parentNode,$(e))}function c(e){o(e.parentNode,$(e)+1)}function d(e){e?(L[U]=L[V],L[q]=L[z]):(L[V]=L[U],L[z]=L[q]),L.collapsed=F}function u(e){a(e),c(e)}function f(e){i(e,0),o(e,1===e.nodeType?e.childNodes.length:e.nodeValue.length)}function p(e,t){var n=L[V],r=L[z],i=L[U],o=L[q],a=t.startContainer,s=t.startOffset,l=t.endContainer,c=t.endOffset;return 0===e?w(n,r,a,s):1===e?w(i,o,a,s):2===e?w(i,o,l,c):3===e?w(n,r,l,c):void 0}function h(){N(I)}function m(){return N(P)}function g(){return N(O)}function v(e){var t=this[V],r=this[z],i,o;3!==t.nodeType&&4!==t.nodeType||!t.nodeValue?(t.childNodes.length>0&&(o=t.childNodes[r]),o?t.insertBefore(e,o):t.appendChild(e)):r?r>=t.nodeValue.length?n.insertAfter(e,t):(i=t.splitText(r),t.parentNode.insertBefore(e,i)):t.parentNode.insertBefore(e,t)}function y(e){var t=L.extractContents();L.insertNode(e),e.appendChild(t),L.selectNode(e)}function b(){return j(new t(n),{startContainer:L[V],startOffset:L[z],endContainer:L[U],endOffset:L[q],collapsed:L.collapsed,commonAncestorContainer:L.commonAncestorContainer})}function C(e,t){var n;if(3==e.nodeType)return e;if(0>t)return e;for(n=e.firstChild;n&&t>0;)--t,n=n.nextSibling;return n?n:e}function x(){return L[V]==L[U]&&L[z]==L[q]}function w(e,t,r,i){var o,a,s,l,c,d;if(e==r)return t==i?0:i>t?-1:1;for(o=r;o&&o.parentNode!=e;)o=o.parentNode;if(o){for(a=0,s=e.firstChild;s!=o&&t>a;)a++,s=s.nextSibling;return a>=t?-1:1}for(o=e;o&&o.parentNode!=r;)o=o.parentNode;if(o){for(a=0,s=r.firstChild;s!=o&&i>a;)a++,s=s.nextSibling;return i>a?-1:1}for(l=n.findCommonAncestor(e,r),c=e;c&&c.parentNode!=l;)c=c.parentNode;for(c||(c=l),d=r;d&&d.parentNode!=l;)d=d.parentNode;if(d||(d=l),c==d)return 0;for(s=l.firstChild;s;){if(s==c)return-1;if(s==d)return 1;s=s.nextSibling}}function _(e,t,r){var i,o;for(e?(L[V]=t,L[z]=r):(L[U]=t,L[q]=r),i=L[U];i.parentNode;)i=i.parentNode;for(o=L[V];o.parentNode;)o=o.parentNode;o==i?w(L[V],L[z],L[U],L[q])>0&&L.collapse(e):L.collapse(e),L.collapsed=x(),L.commonAncestorContainer=n.findCommonAncestor(L[V],L[U])}function N(e){var t,n=0,r=0,i,o,a,s,l,c;if(L[V]==L[U])return E(e);for(t=L[U],i=t.parentNode;i;t=i,i=i.parentNode){if(i==L[V])return k(t,e);++n}for(t=L[V],i=t.parentNode;i;t=i,i=i.parentNode){if(i==L[U])return S(t,e);++r}for(o=r-n,a=L[V];o>0;)a=a.parentNode,o--;for(s=L[U];0>o;)s=s.parentNode,o++;for(l=a.parentNode,c=s.parentNode;l!=c;l=l.parentNode,c=c.parentNode)a=l,s=c;return T(a,s,e)}function E(e){var t,n,i,o,a,s,l,c,d;if(e!=I&&(t=r()),L[z]==L[q])return t;if(3==L[V].nodeType){if(n=L[V].nodeValue,i=n.substring(L[z],L[q]),e!=O&&(o=L[V],c=L[z],d=L[q]-L[z],0===c&&d>=o.nodeValue.length-1?o.parentNode.removeChild(o):o.deleteData(c,d),L.collapse(F)),e==I)return;return i.length>0&&t.appendChild(D.createTextNode(i)),t}for(o=C(L[V],L[z]),a=L[q]-L[z];o&&a>0;)s=o.nextSibling,l=H(o,e),t&&t.appendChild(l),--a,o=s;return e!=O&&L.collapse(F),t}function k(e,t){var n,i,o,a,s,l;if(t!=I&&(n=r()),i=R(e,t),n&&n.appendChild(i),o=$(e),a=o-L[z],0>=a)return t!=O&&(L.setEndBefore(e),L.collapse(W)),n;for(i=e.previousSibling;a>0;)s=i.previousSibling,l=H(i,t),n&&n.insertBefore(l,n.firstChild),--a,i=s;return t!=O&&(L.setEndBefore(e),L.collapse(W)),n}function S(e,t){var n,i,o,a,s,l;for(t!=I&&(n=r()),o=A(e,t),n&&n.appendChild(o),i=$(e),++i,a=L[q]-i,o=e.nextSibling;o&&a>0;)s=o.nextSibling,l=H(o,t),n&&n.appendChild(l),--a,o=s;return t!=O&&(L.setStartAfter(e),L.collapse(F)),n}function T(e,t,n){var i,o,a,s,l,c,d,u;for(n!=I&&(o=r()),i=A(e,n),o&&o.appendChild(i),a=e.parentNode,s=$(e),l=$(t),++s,c=l-s,d=e.nextSibling;c>0;)u=d.nextSibling,i=H(d,n),o&&o.appendChild(i),d=u,--c;return i=R(t,n),o&&o.appendChild(i),n!=O&&(L.setStartAfter(e),L.collapse(F)),o}function R(e,t){var n=C(L[U],L[q]-1),r,i,o,a,s,l=n!=L[U];if(n==e)return B(n,l,W,t);for(r=n.parentNode,i=B(r,W,W,t);r;){for(;n;)o=n.previousSibling,a=B(n,l,W,t),t!=I&&i.insertBefore(a,i.firstChild),l=F,n=o;if(r==e)return i;n=r.previousSibling,r=r.parentNode,s=B(r,W,W,t),t!=I&&s.appendChild(i),i=s}}function A(e,t){var n=C(L[V],L[z]),r=n!=L[V],i,o,a,s,l;if(n==e)return B(n,r,F,t);for(i=n.parentNode,o=B(i,W,F,t);i;){for(;n;)a=n.nextSibling,s=B(n,r,F,t),t!=I&&o.appendChild(s),r=F,n=a;if(i==e)return o;n=i.nextSibling,i=i.parentNode,l=B(i,W,F,t),t!=I&&l.appendChild(o),o=l}}function B(e,t,r,i){var o,a,s,l,c;if(t)return H(e,i);if(3==e.nodeType){if(o=e.nodeValue,r?(l=L[z],a=o.substring(l),s=o.substring(0,l)):(l=L[q],a=o.substring(0,l),s=o.substring(l)),i!=O&&(e.nodeValue=s),i==I)return;return c=n.clone(e,W),c.nodeValue=a,c}if(i!=I)return n.clone(e,W)}function H(e,t){return t!=I?t==O?n.clone(e,F):e:(e.parentNode.removeChild(e),void 0)}function M(){return n.create("body",null,g()).outerText}var L=this,D=n.doc,P=0,O=1,I=2,F=!0,W=!1,z="startOffset",V="startContainer",U="endContainer",q="endOffset",j=e.extend,$=n.nodeIndex;return j(L,{startContainer:D,startOffset:0,endContainer:D,endOffset:0,collapsed:F,commonAncestorContainer:D,START_TO_START:0,START_TO_END:1,END_TO_END:2,END_TO_START:3,setStart:i,setEnd:o,setStartBefore:a,setStartAfter:s,setEndBefore:l,setEndAfter:c,collapse:d,selectNode:u,selectNodeContents:f,compareBoundaryPoints:p,deleteContents:h,extractContents:m,cloneContents:g,insertNode:v,surroundContents:y,cloneRange:b,toStringIE:M}),L}return t.prototype.toString=function(){return this.toStringIE()},t}),r(h,[f],function(e){function t(e){var t;return t=document.createElement("div"),t.innerHTML=e,t.textContent||t.innerText||e}function n(e,t){var n,r,i,a={};if(e){for(e=e.split(","),t=t||10,n=0;n<e.length;n+=2)r=String.fromCharCode(parseInt(e[n],t)),o[r]||(i="&"+e[n+1]+";",a[r]=i,a[i]=r);return a}}var r=e.makeMap,i,o,a,s=/[&<>\"\u007E-\uD7FF\uE000-\uFFEF]|[\uD800-\uDBFF][\uDC00-\uDFFF]/g,l=/[<>&\u007E-\uD7FF\uE000-\uFFEF]|[\uD800-\uDBFF][\uDC00-\uDFFF]/g,c=/[<>&\"\']/g,d=/&(#x|#)?([\w]+);/g,u={128:"\u20ac",130:"\u201a",131:"\u0192",132:"\u201e",133:"\u2026",134:"\u2020",135:"\u2021",136:"\u02c6",137:"\u2030",138:"\u0160",139:"\u2039",140:"\u0152",142:"\u017d",145:"\u2018",146:"\u2019",147:"\u201c",148:"\u201d",149:"\u2022",150:"\u2013",151:"\u2014",152:"\u02dc",153:"\u2122",154:"\u0161",155:"\u203a",156:"\u0153",158:"\u017e",159:"\u0178"};o={'"':"&quot;","'":"&#39;","<":"&lt;",">":"&gt;","&":"&amp;"},a={"&lt;":"<","&gt;":">","&amp;":"&","&quot;":'"',"&apos;":"'"},i=n("50,nbsp,51,iexcl,52,cent,53,pound,54,curren,55,yen,56,brvbar,57,sect,58,uml,59,copy,5a,ordf,5b,laquo,5c,not,5d,shy,5e,reg,5f,macr,5g,deg,5h,plusmn,5i,sup2,5j,sup3,5k,acute,5l,micro,5m,para,5n,middot,5o,cedil,5p,sup1,5q,ordm,5r,raquo,5s,frac14,5t,frac12,5u,frac34,5v,iquest,60,Agrave,61,Aacute,62,Acirc,63,Atilde,64,Auml,65,Aring,66,AElig,67,Ccedil,68,Egrave,69,Eacute,6a,Ecirc,6b,Euml,6c,Igrave,6d,Iacute,6e,Icirc,6f,Iuml,6g,ETH,6h,Ntilde,6i,Ograve,6j,Oacute,6k,Ocirc,6l,Otilde,6m,Ouml,6n,times,6o,Oslash,6p,Ugrave,6q,Uacute,6r,Ucirc,6s,Uuml,6t,Yacute,6u,THORN,6v,szlig,70,agrave,71,aacute,72,acirc,73,atilde,74,auml,75,aring,76,aelig,77,ccedil,78,egrave,79,eacute,7a,ecirc,7b,euml,7c,igrave,7d,iacute,7e,icirc,7f,iuml,7g,eth,7h,ntilde,7i,ograve,7j,oacute,7k,ocirc,7l,otilde,7m,ouml,7n,divide,7o,oslash,7p,ugrave,7q,uacute,7r,ucirc,7s,uuml,7t,yacute,7u,thorn,7v,yuml,ci,fnof,sh,Alpha,si,Beta,sj,Gamma,sk,Delta,sl,Epsilon,sm,Zeta,sn,Eta,so,Theta,sp,Iota,sq,Kappa,sr,Lambda,ss,Mu,st,Nu,su,Xi,sv,Omicron,t0,Pi,t1,Rho,t3,Sigma,t4,Tau,t5,Upsilon,t6,Phi,t7,Chi,t8,Psi,t9,Omega,th,alpha,ti,beta,tj,gamma,tk,delta,tl,epsilon,tm,zeta,tn,eta,to,theta,tp,iota,tq,kappa,tr,lambda,ts,mu,tt,nu,tu,xi,tv,omicron,u0,pi,u1,rho,u2,sigmaf,u3,sigma,u4,tau,u5,upsilon,u6,phi,u7,chi,u8,psi,u9,omega,uh,thetasym,ui,upsih,um,piv,812,bull,816,hellip,81i,prime,81j,Prime,81u,oline,824,frasl,88o,weierp,88h,image,88s,real,892,trade,89l,alefsym,8cg,larr,8ch,uarr,8ci,rarr,8cj,darr,8ck,harr,8dl,crarr,8eg,lArr,8eh,uArr,8ei,rArr,8ej,dArr,8ek,hArr,8g0,forall,8g2,part,8g3,exist,8g5,empty,8g7,nabla,8g8,isin,8g9,notin,8gb,ni,8gf,prod,8gh,sum,8gi,minus,8gn,lowast,8gq,radic,8gt,prop,8gu,infin,8h0,ang,8h7,and,8h8,or,8h9,cap,8ha,cup,8hb,int,8hk,there4,8hs,sim,8i5,cong,8i8,asymp,8j0,ne,8j1,equiv,8j4,le,8j5,ge,8k2,sub,8k3,sup,8k4,nsub,8k6,sube,8k7,supe,8kl,oplus,8kn,otimes,8l5,perp,8m5,sdot,8o8,lceil,8o9,rceil,8oa,lfloor,8ob,rfloor,8p9,lang,8pa,rang,9ea,loz,9j0,spades,9j3,clubs,9j5,hearts,9j6,diams,ai,OElig,aj,oelig,b0,Scaron,b1,scaron,bo,Yuml,m6,circ,ms,tilde,802,ensp,803,emsp,809,thinsp,80c,zwnj,80d,zwj,80e,lrm,80f,rlm,80j,ndash,80k,mdash,80o,lsquo,80p,rsquo,80q,sbquo,80s,ldquo,80t,rdquo,80u,bdquo,810,dagger,811,Dagger,81g,permil,81p,lsaquo,81q,rsaquo,85c,euro",32);var f={encodeRaw:function(e,t){return e.replace(t?s:l,function(e){return o[e]||e})},encodeAllRaw:function(e){return(""+e).replace(c,function(e){return o[e]||e})},encodeNumeric:function(e,t){return e.replace(t?s:l,function(e){return e.length>1?"&#"+(1024*(e.charCodeAt(0)-55296)+(e.charCodeAt(1)-56320)+65536)+";":o[e]||"&#"+e.charCodeAt(0)+";"})},encodeNamed:function(e,t,n){return n=n||i,e.replace(t?s:l,function(e){return o[e]||n[e]||e})},getEncodeFunc:function(e,t){function a(e,n){return e.replace(n?s:l,function(e){return o[e]||t[e]||"&#"+e.charCodeAt(0)+";"||e})}function c(e,n){return f.encodeNamed(e,n,t)}return t=n(t)||i,e=r(e.replace(/\+/g,",")),e.named&&e.numeric?a:e.named?t?c:f.encodeNamed:e.numeric?f.encodeNumeric:f.encodeRaw},decode:function(e){return e.replace(d,function(e,n,r){return n?(r=parseInt(r,2===n.length?16:10),r>65535?(r-=65536,String.fromCharCode(55296+(r>>10),56320+(1023&r))):u[r]||String.fromCharCode(r)):a[e]||i[e]||t(e)})}};return f}),r(m,[],function(){var e=navigator,t=e.userAgent,n,r,i,o,a,s;n=window.opera&&window.opera.buildNumber,r=/WebKit/.test(t),i=!r&&!n&&/MSIE/gi.test(t)&&/Explorer/gi.test(e.appName),i=i&&/MSIE (\w+)\./.exec(t)[1],o=!r&&/Gecko/.test(t),a=-1!=t.indexOf("Mac"),s=/(iPad|iPhone)/.test(t);var l=!s||t.match(/AppleWebKit\/(\d*)/)[1]>=534;return{opera:n,webkit:r,ie:i,gecko:o,mac:a,iOS:s,contentEditable:l,transparentSrc:"data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",caretAfter:8!=i,range:window.getSelection&&"Range"in window,documentMode:i?document.documentMode||7:10}}),r(g,[l,c,d,u,p,h,m,f],function(e,n,r,i,o,a,s,l){function c(e,t){var i=this,o;i.doc=e,i.win=window,i.files={},i.counter=0,i.stdMode=!g||e.documentMode>=8,i.boxModel=!g||"CSS1Compat"==e.compatMode||i.stdMode,i.hasOuterHTML="outerHTML"in e.createElement("a"),i.settings=t=h({keep_values:!1,hex_colors:1},t),i.schema=t.schema,i.styles=new n({url_converter:t.url_converter,url_converter_scope:t.url_converter_scope},t.schema),i.fixDoc(e),i.events=t.ownEvents?new r(t.proxy):r.Event,o=t.schema?t.schema.getBlockElements():{},i.isBlock=function(e){if(!e)return!1;var t=e.nodeType;return t?!(1!==t||!o[e.nodeName]):!!o[e]}}var d=l.each,u=l.is,f=l.grep,p=l.trim,h=l.extend,m=s.webkit,g=s.ie,v=/^([a-z0-9],?)+$/i,y=/^[ \t\r\n]*$/,b=l.makeMap("fillOpacity fontWeight lineHeight opacity orphans widows zIndex zoom"," ");return c.prototype={root:null,props:{"for":"htmlFor","class":"className",className:"className",checked:"checked",disabled:"disabled",maxlength:"maxLength",readonly:"readOnly",selected:"selected",value:"value",id:"id",name:"name",type:"type"},fixDoc:function(e){var t=this.settings,n;if(g&&t.schema){"abbr article aside audio canvas details figcaption figure footer header hgroup mark menu meter nav output progress section summary time video".replace(/\w+/g,function(t){e.createElement(t)});for(n in t.schema.getCustomElements())e.createElement(n)}},clone:function(e,t){var n=this,r,i;return!g||1!==e.nodeType||t?e.cloneNode(t):(i=n.doc,t?r.firstChild:(r=i.createElement(e.nodeName),d(n.getAttribs(e),function(t){n.setAttrib(r,t.nodeName,n.getAttrib(e,t.nodeName))}),r))},getRoot:function(){var e=this;return e.get(e.settings.root_element)||e.doc.body},getViewPort:function(e){var t,n;return e=e?e:this.win,t=e.document,n=this.boxModel?t.documentElement:t.body,{x:e.pageXOffset||n.scrollLeft,y:e.pageYOffset||n.scrollTop,w:e.innerWidth||n.clientWidth,h:e.innerHeight||n.clientHeight}},getRect:function(e){var t=this,n,r;return e=t.get(e),n=t.getPos(e),r=t.getSize(e),{x:n.x,y:n.y,w:r.w,h:r.h}},getSize:function(e){var t=this,n,r;return e=t.get(e),n=t.getStyle(e,"width"),r=t.getStyle(e,"height"),-1===n.indexOf("px")&&(n=0),-1===r.indexOf("px")&&(r=0),{w:parseInt(n,10)||e.offsetWidth||e.clientWidth,h:parseInt(r,10)||e.offsetHeight||e.clientHeight}},getParent:function(e,t,n){return this.getParents(e,t,n,!1)},getParents:function(e,n,r,i){var o=this,a,s=[];for(e=o.get(e),i=i===t,r=r||("BODY"!=o.getRoot().nodeName?o.getRoot().parentNode:null),u(n,"string")&&(a=n,n="*"===n?function(e){return 1==e.nodeType}:function(e){return o.is(e,a)});e&&e!=r&&e.nodeType&&9!==e.nodeType;){if(!n||n(e)){if(!i)return e;s.push(e)}e=e.parentNode}return i?s:null},get:function(e){var t;return e&&this.doc&&"string"==typeof e&&(t=e,e=this.doc.getElementById(e),e&&e.id!==t)?this.doc.getElementsByName(t)[1]:e},getNext:function(e,t){return this._findSib(e,t,"nextSibling")},getPrev:function(e,t){return this._findSib(e,t,"previousSibling")},select:function(t,n){var r=this;return e(t,r.get(n)||r.get(r.settings.root_element)||r.doc,[])},is:function(n,r){var i;if(n.length===t){if("*"===r)return 1==n.nodeType;if(v.test(r)){for(r=r.toLowerCase().split(/,/),n=n.nodeName.toLowerCase(),i=r.length-1;i>=0;i--)if(r[i]==n)return!0;return!1}}return n.nodeType&&1!=n.nodeType?!1:e.matches(r,n.nodeType?[n]:n).length>0},add:function(e,t,n,r,i){var o=this;return this.run(e,function(e){var a;return a=u(t,"string")?o.doc.createElement(t):t,o.setAttribs(a,n),r&&(r.nodeType?a.appendChild(r):o.setHTML(a,r)),i?a:e.appendChild(a)})},create:function(e,t,n){return this.add(this.doc.createElement(e),e,t,n,1)},createHTML:function(e,t,n){var r="",i;r+="<"+e;for(i in t)t.hasOwnProperty(i)&&null!==t[i]&&(r+=" "+i+'="'+this.encode(t[i])+'"');return"undefined"!=typeof n?r+">"+n+"</"+e+">":r+" />"},createFragment:function(e){var t,n,r=this.doc,i;for(i=r.createElement("div"),t=r.createDocumentFragment(),e&&(i.innerHTML=e);n=i.firstChild;)t.appendChild(n);return t},remove:function(e,t){return this.run(e,function(e){var n,r=e.parentNode;if(!r)return null;if(t)for(;n=e.firstChild;)!g||3!==n.nodeType||n.nodeValue?r.insertBefore(n,e):e.removeChild(n);return r.removeChild(e)})},setStyle:function(e,t,n){return this.run(e,function(e){var r=this,i,o;if(t)if("string"==typeof t){i=e.style,t=t.replace(/-(\D)/g,function(e,t){return t.toUpperCase()}),"number"!=typeof n||b[t]||(n+="px"),"opacity"===t&&e.runtimeStyle&&"undefined"==typeof e.runtimeStyle.opacity&&(i.filter=""===n?"":"alpha(opacity="+100*n+")"),"float"==t&&(t="cssFloat"in e.style?"cssFloat":"styleFloat");try{i[t]=n}catch(a){}r.settings.update_styles&&e.removeAttribute("data-mce-style")}else for(o in t)r.setStyle(e,o,t[o])})},getStyle:function(e,n,r){if(e=this.get(e)){if(this.doc.defaultView&&r){n=n.replace(/[A-Z]/g,function(e){return"-"+e});try{return this.doc.defaultView.getComputedStyle(e,null).getPropertyValue(n)}catch(i){return null}}return n=n.replace(/-(\D)/g,function(e,t){return t.toUpperCase()}),"float"==n&&(n=g?"styleFloat":"cssFloat"),n.currentStyle&&r?e.currentStyle[n]:e.style?e.style[n]:t}},setStyles:function(e,t){this.setStyle(e,t)},css:function(e,t,n){this.setStyle(e,t,n)},removeAllAttribs:function(e){return this.run(e,function(e){var t,n=e.attributes;for(t=n.length-1;t>=0;t--)e.removeAttributeNode(n.item(t))})},setAttrib:function(e,t,n){var r=this;if(e&&t)return this.run(e,function(e){var i=r.settings,o=e.getAttribute(t);if(null!==n)switch(t){case"style":if(!u(n,"string"))return d(n,function(t,n){r.setStyle(e,n,t)}),void 0;i.keep_values&&(n?e.setAttribute("data-mce-style",n,2):e.removeAttribute("data-mce-style",2)),e.style.cssText=n;break;case"class":e.className=n||"";break;case"src":case"href":i.keep_values&&(i.url_converter&&(n=i.url_converter.call(i.url_converter_scope||r,n,t,e)),r.setAttrib(e,"data-mce-"+t,n,2));break;case"shape":e.setAttribute("data-mce-style",n)}u(n)&&null!==n&&0!==n.length?e.setAttribute(t,""+n,2):e.removeAttribute(t,2),o!=n&&i.onSetAttrib&&i.onSetAttrib({attrElm:e,attrName:t,attrValue:n})})},setAttribs:function(e,t){var n=this;return this.run(e,function(e){d(t,function(t,r){n.setAttrib(e,r,t)})})},getAttrib:function(e,t,n){var r,i=this,o;if(e=i.get(e),!e||1!==e.nodeType)return n===o?!1:n;if(u(n)||(n=""),/^(src|href|style|coords|shape)$/.test(t)&&(r=e.getAttribute("data-mce-"+t)))return r;if(g&&i.props[t]&&(r=e[i.props[t]],r=r&&r.nodeValue?r.nodeValue:r),r||(r=e.getAttribute(t,2)),/^(checked|compact|declare|defer|disabled|ismap|multiple|nohref|noshade|nowrap|readonly|selected)$/.test(t))return e[i.props[t]]===!0&&""===r?t:r?t:"";if("FORM"===e.nodeName&&e.getAttributeNode(t))return e.getAttributeNode(t).nodeValue;if("style"===t&&(r=r||e.style.cssText,r&&(r=i.serializeStyle(i.parseStyle(r),e.nodeName),i.settings.keep_values&&e.setAttribute("data-mce-style",r))),m&&"class"===t&&r&&(r=r.replace(/(apple|webkit)\-[a-z\-]+/gi,"")),g)switch(t){case"rowspan":case"colspan":1===r&&(r="");break;case"size":("+0"===r||20===r||0===r)&&(r="");break;case"width":case"height":case"vspace":case"checked":case"disabled":case"readonly":0===r&&(r="");break;case"hspace":-1===r&&(r="");break;case"maxlength":case"tabindex":(32768===r||2147483647===r||"32768"===r)&&(r="");break;case"multiple":case"compact":case"noshade":case"nowrap":return 65535===r?t:n;case"shape":r=r.toLowerCase();break;default:0===t.indexOf("on")&&r&&(r=(""+r).replace(/^function\s+\w+\(\)\s+\{\s+(.*)\s+\}$/,"$1"))}return r!==o&&null!==r&&""!==r?""+r:n},getPos:function(e,t){var n=this,r=0,i=0,o,a=n.doc,s;if(e=n.get(e),t=t||a.body,e){if(t===a.body&&e.getBoundingClientRect)return s=e.getBoundingClientRect(),t=n.boxModel?a.documentElement:a.body,r=s.left+(a.documentElement.scrollLeft||a.body.scrollLeft)-t.clientTop,i=s.top+(a.documentElement.scrollTop||a.body.scrollTop)-t.clientLeft,{x:r,y:i};for(o=e;o&&o!=t&&o.nodeType;)r+=o.offsetLeft||0,i+=o.offsetTop||0,o=o.offsetParent;for(o=e.parentNode;o&&o!=t&&o.nodeType;)r-=o.scrollLeft||0,i-=o.scrollTop||0,o=o.parentNode}return{x:r,y:i}},parseStyle:function(e){return this.styles.parse(e)},serializeStyle:function(e,t){return this.styles.serialize(e,t)},addStyle:function(e){var t=this,n=t.doc,r,i;if(t!==c.DOM&&n===document){var o=c.DOM.addedStyles;if(o=o||[],o[e])return;o[e]=!0,c.DOM.addedStyles=o}i=n.getElementById("mceDefaultStyles"),i||(i=n.createElement("style"),i.id="mceDefaultStyles",i.type="text/css",r=n.getElementsByTagName("head")[0],r.firstChild?r.insertBefore(i,r.firstChild):r.appendChild(i)),i.styleSheet?i.styleSheet.cssText+=e:i.appendChild(n.createTextNode(e))},loadCSS:function(e){var t=this,n=t.doc,r;return t!==c.DOM&&n===document?(c.DOM.loadCSS(e),void 0):(e||(e=""),r=n.getElementsByTagName("head")[0],d(e.split(","),function(e){var i;t.files[e]||(t.files[e]=!0,i=t.create("link",{rel:"stylesheet",href:e}),g&&n.documentMode&&n.recalc&&(i.onload=function(){n.recalc&&n.recalc(),i.onload=null}),r.appendChild(i))}),void 0)},addClass:function(e,t){return this.run(e,function(e){var n;return t?this.hasClass(e,t)?e.className:(n=this.removeClass(e,t),e.className=n=(""!==n?n+" ":"")+t,n):0})},removeClass:function(e,t){var n=this,r;return n.run(e,function(e){var i;return n.hasClass(e,t)?(r||(r=new RegExp("(^|\\s+)"+t+"(\\s+|$)","g")),i=e.className.replace(r," "),i=p(" "!=i?i:""),e.className=i,i||(e.removeAttribute("class"),e.removeAttribute("className")),i):e.className
})},hasClass:function(e,t){return e=this.get(e),e&&t?-1!==(" "+e.className+" ").indexOf(" "+t+" "):!1},toggleClass:function(e,n,r){r=r===t?!this.hasClass(e,n):r,this.hasClass(e,n)!==r&&(r?this.addClass(e,n):this.removeClass(e,n))},show:function(e){return this.setStyle(e,"display","block")},hide:function(e){return this.setStyle(e,"display","none")},isHidden:function(e){return e=this.get(e),!e||"none"==e.style.display||"none"==this.getStyle(e,"display")},uniqueId:function(e){return(e?e:"mce_")+this.counter++},setHTML:function(e,t){var n=this;return n.run(e,function(e){if(g){for(;e.firstChild;)e.removeChild(e.firstChild);try{e.innerHTML="<br />"+t,e.removeChild(e.firstChild)}catch(r){var i=n.create("div");i.innerHTML="<br />"+t,d(f(i.childNodes),function(t,n){n&&e.canHaveHTML&&e.appendChild(t)})}}else e.innerHTML=t;return t})},getOuterHTML:function(e){var t,n=this;return(e=n.get(e))?1===e.nodeType&&n.hasOuterHTML?e.outerHTML:(t=(e.ownerDocument||n.doc).createElement("body"),t.appendChild(e.cloneNode(!0)),t.innerHTML):null},setOuterHTML:function(e,t,n){var r=this;return r.run(e,function(e){function i(){var i,o;for(o=n.createElement("body"),o.innerHTML=t,i=o.lastChild;i;)r.insertAfter(i.cloneNode(!0),e),i=i.previousSibling;r.remove(e)}if(1==e.nodeType)if(n=n||e.ownerDocument||r.doc,g)try{1==e.nodeType&&r.hasOuterHTML?e.outerHTML=t:i()}catch(o){i()}else i()})},decode:a.decode,encode:a.encodeAllRaw,insertAfter:function(e,t){return t=this.get(t),this.run(e,function(e){var n,r;return n=t.parentNode,r=t.nextSibling,r?n.insertBefore(e,r):n.appendChild(e),e})},replace:function(e,t,n){var r=this;return r.run(t,function(t){return u(t,"array")&&(e=e.cloneNode(!0)),n&&d(f(t.childNodes),function(t){e.appendChild(t)}),t.parentNode.replaceChild(e,t)})},rename:function(e,t){var n=this,r;return e.nodeName!=t.toUpperCase()&&(r=n.create(t),d(n.getAttribs(e),function(t){n.setAttrib(r,t.nodeName,n.getAttrib(e,t.nodeName))}),n.replace(r,e,1)),r||e},findCommonAncestor:function(e,t){for(var n=e,r;n;){for(r=t;r&&n!=r;)r=r.parentNode;if(n==r)break;n=n.parentNode}return!n&&e.ownerDocument?e.ownerDocument.documentElement:n},toHex:function(e){return this.styles.toHex(l.trim(e))},getClasses:function(){function e(t){d(t.imports,function(t){e(t)}),d(t.cssRules||t.rules,function(t){switch(t.type||1){case 1:t.selectorText&&d(t.selectorText.split(","),function(e){e=e.replace(/^\s*|\s*$|^\s\./g,""),!/\.mce/.test(e)&&/\.[\w\-]+$/.test(e)&&(o=e,e=e.replace(/.*\.([a-z0-9_\-]+).*/i,"$1"),(!i||(e=i(e,o)))&&(r[e]||(n.push({"class":e}),r[e]=1)))});break;case 3:e(t.styleSheet)}})}var t=this,n=[],r={},i=t.settings.class_filter,o;if(t.classes)return t.classes;try{d(t.doc.styleSheets,e)}catch(a){}return n.length>0&&(t.classes=n),n},run:function(e,t,n){var r=this,i;return"string"==typeof e&&(e=r.get(e)),e?(n=n||this,e.nodeType||!e.length&&0!==e.length?t.call(n,e):(i=[],d(e,function(e,o){e&&("string"==typeof e&&(e=r.get(e)),i.push(t.call(n,e,o)))}),i)):!1},getAttribs:function(e){var t;if(e=this.get(e),!e)return[];if(g){if(t=[],"OBJECT"==e.nodeName)return e.attributes;"OPTION"===e.nodeName&&this.getAttrib(e,"selected")&&t.push({specified:1,nodeName:"selected"});var n=/<\/?[\w:\-]+ ?|=[\"][^\"]+\"|=\'[^\']+\'|=[\w\-]+|>/gi;return e.cloneNode(!1).outerHTML.replace(n,"").replace(/[\w:\-]+/gi,function(e){t.push({specified:1,nodeName:e})}),t}return e.attributes},isEmpty:function(e,t){var n=this,r,o,a,s,l,c=0;if(e=e.firstChild){s=new i(e,e.parentNode),t=t||n.schema?n.schema.getNonEmptyElements():null;do{if(a=e.nodeType,1===a){if(e.getAttribute("data-mce-bogus"))continue;if(l=e.nodeName.toLowerCase(),t&&t[l]){if("br"===l){c++;continue}return!1}for(o=n.getAttribs(e),r=e.attributes.length;r--;)if(l=e.attributes[r].nodeName,"name"===l||"data-mce-bookmark"===l)return!1}if(8==a)return!1;if(3===a&&!y.test(e.nodeValue))return!1}while(e=s.next())}return 1>=c},createRng:function(){var e=this.doc;return e.createRange?e.createRange():new o(this)},nodeIndex:function(e,t){var n=0,r,i,o;if(e)for(r=e.nodeType,e=e.previousSibling,i=e;e;e=e.previousSibling)o=e.nodeType,(!t||3!=o||o!=r&&e.nodeValue.length)&&(n++,r=o);return n},split:function(e,t,n){function r(e){function t(e){var t=e.previousSibling&&"SPAN"==e.previousSibling.nodeName,n=e.nextSibling&&"SPAN"==e.nextSibling.nodeName;return t&&n}var n,o=e.childNodes,a=e.nodeType;if(1!=a||"bookmark"!=e.getAttribute("data-mce-type")){for(n=o.length-1;n>=0;n--)r(o[n]);if(9!=a){if(3==a&&e.nodeValue.length>0){var s=p(e.nodeValue).length;if(!i.isBlock(e.parentNode)||s>0||0===s&&t(e))return}else if(1==a&&(o=e.childNodes,1==o.length&&o[0]&&1==o[0].nodeType&&"bookmark"==o[0].getAttribute("data-mce-type")&&e.parentNode.insertBefore(o[0],e),o.length||/^(br|hr|input|img)$/i.test(e.nodeName)))return;i.remove(e)}return e}}var i=this,o=i.createRng(),a,s,l;return e&&t?(o.setStart(e.parentNode,i.nodeIndex(e)),o.setEnd(t.parentNode,i.nodeIndex(t)),a=o.extractContents(),o=i.createRng(),o.setStart(t.parentNode,i.nodeIndex(t)+1),o.setEnd(e.parentNode,i.nodeIndex(e)+1),s=o.extractContents(),l=e.parentNode,l.insertBefore(r(a),e),n?l.replaceChild(n,t):l.insertBefore(t,e),l.insertBefore(r(s),e),i.remove(e),n||t):void 0},bind:function(e,t,n,r){return this.events.bind(e,t,n,r||this)},unbind:function(e,t,n){return this.events.unbind(e,t,n)},fire:function(e,t,n){return this.events.fire(e,t,n)},getContentEditable:function(e){var t;return 1!=e.nodeType?null:(t=e.getAttribute("data-mce-contenteditable"),t&&"inherit"!==t?t:"inherit"!==e.contentEditable?e.contentEditable:null)},destroy:function(){var e=this;e.win=e.doc=e.root=e.events=e.frag=null},dumpRng:function(e){return"startContainer: "+e.startContainer.nodeName+", startOffset: "+e.startOffset+", endContainer: "+e.endContainer.nodeName+", endOffset: "+e.endOffset},_findSib:function(e,t,n){var r=this,i=t;if(e)for("string"==typeof i&&(i=function(e){return r.is(e,t)}),e=e[n];e;e=e[n])if(i(e))return e;return null}},c.DOM=new c(document),c}),r(v,[g,f],function(e,t){function n(){function e(e,t){function n(){o.remove(s),a&&(a.onreadystatechange=a.onload=a=null),t()}function i(){"undefined"!=typeof console&&console.log&&console.log("Failed to load: "+e)}var o=r,a,s;s=o.uniqueId(),a=document.createElement("script"),a.id=s,a.type="text/javascript",a.src=e,"onreadystatechange"in a?a.onreadystatechange=function(){/loaded|complete/.test(a.readyState)&&n()}:a.onload=n,a.onerror=i,(document.getElementsByTagName("head")[0]||document.body).appendChild(a)}var t=0,n=1,a=2,s={},l=[],c={},d=[],u=0,f;this.isDone=function(e){return s[e]==a},this.markDone=function(e){s[e]=a},this.add=this.load=function(e,n,r){var i=s[e];i==f&&(l.push(e),s[e]=t),n&&(c[e]||(c[e]=[]),c[e].push({func:n,scope:r||this}))},this.loadQueue=function(e,t){this.loadScripts(l,e,t)},this.loadScripts=function(t,r,l){function p(e){i(c[e],function(e){e.func.call(e.scope)}),c[e]=f}var h;d.push({func:r,scope:l||this}),h=function(){var r=o(t);t.length=0,i(r,function(t){return s[t]==a?(p(t),void 0):(s[t]!=n&&(s[t]=n,u++,e(t,function(){s[t]=a,u--,p(t),h()})),void 0)}),u||(i(d,function(e){e.func.call(e.scope)}),d.length=0)},h()}}var r=e.DOM,i=t.each,o=t.grep;return n.ScriptLoader=new n,n}),r(y,[v,f],function(e,n){function r(){var e=this;e.items=[],e.urls={},e.lookup={}}var i=n.each;return r.prototype={get:function(e){return this.lookup[e]?this.lookup[e].instance:t},dependencies:function(e){var t;return this.lookup[e]&&(t=this.lookup[e].dependencies),t||[]},requireLangPack:function(t){var n=r.settings;n&&n.language&&n.language_load!==!1&&e.ScriptLoader.add(this.urls[t]+"/langs/"+n.language+".js")},add:function(e,t,n){return this.items.push(t),this.lookup[e]={instance:t,dependencies:n},t},createUrl:function(e,t){return"object"==typeof t?t:{prefix:e.prefix,resource:t,suffix:e.suffix}},addComponents:function(t,n){var r=this.urls[t];i(n,function(t){e.ScriptLoader.add(r+"/"+t)})},load:function(n,o,a,s){function l(){var r=c.dependencies(n);i(r,function(e){var n=c.createUrl(o,e);c.load(n.resource,n,t,t)}),a&&(s?a.call(s):a.call(e))}var c=this,d=o;c.urls[n]||("object"==typeof o&&(d=o.prefix+o.resource+o.suffix),0!==d.indexOf("/")&&-1==d.indexOf("://")&&(d=r.baseURL+"/"+d),c.urls[n]=d.substring(0,d.lastIndexOf("/")),c.lookup[n]?l():e.ScriptLoader.add(d,l,s))}},r.PluginManager=new r,r.ThemeManager=new r,r}),r(b,[],function(){function e(e,t,n){var r,i,o=n?"lastChild":"firstChild",a=n?"prev":"next";if(e[o])return e[o];if(e!==t){if(r=e[a])return r;for(i=e.parent;i&&i!==t;i=i.parent)if(r=i[a])return r}}function t(e,t){this.name=e,this.type=t,1===t&&(this.attributes=[],this.attributes.map={})}var n=/^[ \t\r\n]*$/,r={"#text":3,"#comment":8,"#cdata":4,"#pi":7,"#doctype":10,"#document-fragment":11};return t.prototype={replace:function(e){var t=this;return e.parent&&e.remove(),t.insert(e,t),t.remove(),t},attr:function(e,t){var n=this,r,i,o;if("string"!=typeof e){for(i in e)n.attr(i,e[i]);return n}if(r=n.attributes){if(t!==o){if(null===t){if(e in r.map)for(delete r.map[e],i=r.length;i--;)if(r[i].name===e)return r=r.splice(i,1),n;return n}if(e in r.map){for(i=r.length;i--;)if(r[i].name===e){r[i].value=t;break}}else r.push({name:e,value:t});return r.map[e]=t,n}return r.map[e]}},clone:function(){var e=this,n=new t(e.name,e.type),r,i,o,a,s;if(o=e.attributes){for(s=[],s.map={},r=0,i=o.length;i>r;r++)a=o[r],"id"!==a.name&&(s[s.length]={name:a.name,value:a.value},s.map[a.name]=a.value);n.attributes=s}return n.value=e.value,n.shortEnded=e.shortEnded,n},wrap:function(e){var t=this;return t.parent.insert(e,t),e.append(t),t},unwrap:function(){var e=this,t,n;for(t=e.firstChild;t;)n=t.next,e.insert(t,e,!0),t=n;e.remove()},remove:function(){var e=this,t=e.parent,n=e.next,r=e.prev;return t&&(t.firstChild===e?(t.firstChild=n,n&&(n.prev=null)):r.next=n,t.lastChild===e?(t.lastChild=r,r&&(r.next=null)):n.prev=r,e.parent=e.next=e.prev=null),e},append:function(e){var t=this,n;return e.parent&&e.remove(),n=t.lastChild,n?(n.next=e,e.prev=n,t.lastChild=e):t.lastChild=t.firstChild=e,e.parent=t,e},insert:function(e,t,n){var r;return e.parent&&e.remove(),r=t.parent||this,n?(t===r.firstChild?r.firstChild=e:t.prev.next=e,e.prev=t.prev,e.next=t,t.prev=e):(t===r.lastChild?r.lastChild=e:t.next.prev=e,e.next=t.next,e.prev=t,t.next=e),e.parent=r,e},getAll:function(t){var n=this,r,i=[];for(r=n.firstChild;r;r=e(r,n))r.name===t&&i.push(r);return i},empty:function(){var t=this,n,r,i;if(t.firstChild){for(n=[],i=t.firstChild;i;i=e(i,t))n.push(i);for(r=n.length;r--;)i=n[r],i.parent=i.firstChild=i.lastChild=i.next=i.prev=null}return t.firstChild=t.lastChild=null,t},isEmpty:function(t){var r=this,i=r.firstChild,o,a;if(i)do{if(1===i.type){if(i.attributes.map["data-mce-bogus"])continue;if(t[i.name])return!1;for(o=i.attributes.length;o--;)if(a=i.attributes[o].name,"name"===a||0===a.indexOf("data-mce-"))return!1}if(8===i.type)return!1;if(3===i.type&&!n.test(i.value))return!1}while(i=e(i,r));return!0},walk:function(t){return e(this,null,t)}},t.create=function(e,n){var i,o;if(i=new t(e,r[e]||1),n)for(o in n)i.attr(o,n[o]);return i},t}),r(C,[f],function(e){function t(e,t){return e?e.split(t||" "):[]}function n(e){function n(e,n,r){function i(e){var t={},n,r;for(n=0,r=e.length;r>n;n++)t[e[n]]={};return t}var o,l,c,d=arguments;for(r=r||[],n=n||"","string"==typeof r&&(r=t(r)),l=3;l<d.length;l++)"string"==typeof d[l]&&(d[l]=t(d[l])),r.push.apply(r,d[l]);for(e=t(e),o=e.length;o--;)c=[].concat(s,t(n)),a[e[o]]={attributes:i(c),attributesOrder:c,children:i(r)}}function i(e,n){var r,i,o,s;for(e=t(e),r=e.length,n=t(n);r--;)for(i=a[e[r]],o=0,s=n.length;s>o;o++)i.attributes[n[o]]={},i.attributesOrder.push(n[o])}var a={},s,l,c,d,u,f,p;return r[e]?r[e]:(s=t("id accesskey class dir lang style tabindex title"),l=t("onabort onblur oncancel oncanplay oncanplaythrough onchange onclick onclose oncontextmenu oncuechange ondblclick ondrag ondragend ondragenter ondragleave ondragover ondragstart ondrop ondurationchange onemptied onended onerror onfocus oninput oninvalid onkeydown onkeypress onkeyup onload onloadeddata onloadedmetadata onloadstart onmousedown onmousemove onmouseout onmouseover onmouseup onmousewheel onpause onplay onplaying onprogress onratechange onreset onscroll onseeked onseeking onseeking onselect onshow onstalled onsubmit onsuspend ontimeupdate onvolumechange onwaiting"),c=t("address blockquote div dl fieldset form h1 h2 h3 h4 h5 h6 hr menu ol p pre table ul"),d=t("a abbr b bdo br button cite code del dfn em embed i iframe img input ins kbd label map noscript object q s samp script select small span strong sub sup textarea u var #text #comment"),"html4"!=e&&(s.push.apply(s,t("contenteditable contextmenu draggable dropzone hidden spellcheck translate")),c.push.apply(c,t("article aside details dialog figure header footer hgroup section nav")),d.push.apply(d,t("audio canvas command datalist mark meter output progress time wbr video ruby bdi keygen"))),"html5-strict"!=e&&(s.push("xml:lang"),p=t("acronym applet basefont big font strike tt"),d.push.apply(d,p),o(p,function(e){n(e,"",d)}),f=t("center dir isindex noframes"),c.push.apply(c,f),u=[].concat(c,d),o(f,function(e){n(e,"",u)})),u=u||[].concat(c,d),n("html","manifest","head body"),n("head","","base command link meta noscript script style title"),n("title hr noscript br"),n("base","href target"),n("link","href rel media hreflang type sizes hreflang"),n("meta","name http-equiv content charset"),n("style","media type scoped"),n("script","src async defer type charset"),n("body","onafterprint onbeforeprint onbeforeunload onblur onerror onfocus onhashchange onload onmessage onoffline ononline onpagehide onpageshow onpopstate onresize onscroll onstorage onunload",u),n("address dt dd div caption","",u),n("h1 h2 h3 h4 h5 h6 pre p abbr code var samp kbd sub sup i b u bdo span legend em strong small s cite dfn","",d),n("blockquote","cite",u),n("ol","reversed start type","li"),n("ul","","li"),n("li","value",u),n("dl","","dt dd"),n("a","href target rel media hreflang type",d),n("q","cite",d),n("ins del","cite datetime",u),n("img","src alt usemap ismap width height"),n("iframe","src name width height",u),n("embed","src type width height"),n("object","data type typemustmatch name usemap form width height",u,"param"),n("param","name value"),n("map","name",u,"area"),n("area","alt coords shape href target rel media hreflang type"),n("table","border","caption colgroup thead tfoot tbody tr"+("html4"==e?" col":"")),n("colgroup","span","col"),n("col","span"),n("tbody thead tfoot","","tr"),n("tr","","td th"),n("td","colspan rowspan headers",u),n("th","colspan rowspan headers scope abbr",u),n("form","accept-charset action autocomplete enctype method name novalidate target",u),n("fieldset","disabled form name",u,"legend"),n("label","form for",d),n("input","accept alt autocomplete checked dirname disabled form formaction formenctype formmethod formnovalidate formtarget height list max maxlength min multiple name pattern readonly required size src step type value width"),n("button","disabled form formaction formenctype formmethod formnovalidate formtarget name type value","html4"==e?u:d),n("select","disabled form multiple name required size","option optgroup"),n("optgroup","disabled label","option"),n("option","disabled label selected value"),n("textarea","cols dirname disabled form maxlength name readonly required rows wrap"),n("menu","type label",u,"li"),n("noscript","",u),"html4"!=e&&(n("wbr"),n("ruby","",d,"rt rp"),n("figcaption","",u),n("mark rt rp summary bdi","",d),n("canvas","width height",u),n("video","src crossorigin poster preload autoplay mediagroup loop muted controls width height",u,"track source"),n("audio","src crossorigin preload autoplay mediagroup loop muted controls",u,"track source"),n("source","src type media"),n("track","kind src srclang label default"),n("datalist","",d,"option"),n("article section nav aside header footer","",u),n("hgroup","","h1 h2 h3 h4 h5 h6"),n("figure","",u,"figcaption"),n("time","datetime",d),n("dialog","open",u),n("command","type label icon disabled checked radiogroup command"),n("output","for form name",d),n("progress","value max",d),n("meter","value min max low high optimum",d),n("details","open",u,"summary"),n("keygen","autofocus challenge disabled form keytype name")),"html5-strict"!=e&&(i("script","language xml:space"),i("style","xml:space"),i("object","declare classid codebase codetype archive standby align border hspace vspace"),i("param","valuetype type"),i("a","charset name rev shape coords"),i("br","clear"),i("applet","codebase archive code object alt name width height align hspace vspace"),i("img","name longdesc align border hspace vspace"),i("iframe","longdesc frameborder marginwidth marginheight scrolling align"),i("font basefont","size color face"),i("input","usemap align"),i("select","onchange"),i("textarea"),i("h1 h2 h3 h4 h5 h6 div p legend caption","align"),i("ul","type compact"),i("li","type"),i("ol dl menu dir","compact"),i("pre","width xml:space"),i("hr","align noshade size width"),i("isindex","prompt"),i("table","summary width frame rules cellspacing cellpadding align bgcolor"),i("col","width align char charoff valign"),i("colgroup","width align char charoff valign"),i("thead","align char charoff valign"),i("tr","align char charoff valign bgcolor"),i("th","axis align char charoff valign nowrap bgcolor width height"),i("form","accept"),i("td","abbr axis scope align char charoff valign nowrap bgcolor width height"),i("tfoot","align char charoff valign"),i("tbody","align char charoff valign"),i("area","nohref"),i("body","background bgcolor text link vlink alink")),"html4"!=e&&(i("input button select textarea","autofocus"),i("input textarea","placeholder"),i("a","download"),i("link script img","crossorigin"),i("iframe","srcdoc sandbox seamless allowfullscreen")),o(t("a form meter progress dfn"),function(e){a[e]&&delete a[e].children[e]}),delete a.caption.children.table,r[e]=a,a)}var r={},i=e.makeMap,o=e.each,a=e.extend,s=e.explode,l=e.inArray;return function(e){function c(t,n,o){var s=e[t];return s?s=i(s,",",i(s.toUpperCase()," ")):(s=r[t],s||(s=i(n," ",i(n.toUpperCase()," ")),s=a(s,o),r[t]=s)),s}function d(e){return new RegExp("^"+e.replace(/([?+*])/g,".$1")+"$")}function u(e){var n,r,o,a,s,c,u,f,p,h,m,g,y,C,x,w,_,N,E,k=/^([#+\-])?([^\[!\/]+)(?:\/([^\[!]+))?(?:(!?)\[([^\]]+)\])?$/,S=/^([!\-])?(\w+::\w+|[^=:<]+)?(?:([=:<])(.*))?$/,T=/[*?+]/;if(e)for(e=t(e,","),v["@"]&&(w=v["@"].attributes,_=v["@"].attributesOrder),n=0,r=e.length;r>n;n++)if(s=k.exec(e[n])){if(C=s[1],p=s[2],x=s[3],f=s[5],g={},y=[],c={attributes:g,attributesOrder:y},"#"===C&&(c.paddEmpty=!0),"-"===C&&(c.removeEmpty=!0),"!"===s[4]&&(c.removeEmptyAttrs=!0),w){for(N in w)g[N]=w[N];y.push.apply(y,_)}if(f)for(f=t(f,"|"),o=0,a=f.length;a>o;o++)if(s=S.exec(f[o])){if(u={},m=s[1],h=s[2].replace(/::/g,":"),C=s[3],E=s[4],"!"===m&&(c.attributesRequired=c.attributesRequired||[],c.attributesRequired.push(h),u.required=!0),"-"===m){delete g[h],y.splice(l(y,h),1);continue}C&&("="===C&&(c.attributesDefault=c.attributesDefault||[],c.attributesDefault.push({name:h,value:E}),u.defaultValue=E),":"===C&&(c.attributesForced=c.attributesForced||[],c.attributesForced.push({name:h,value:E}),u.forcedValue=E),"<"===C&&(u.validValues=i(E,"?"))),T.test(h)?(c.attributePatterns=c.attributePatterns||[],u.pattern=d(h),c.attributePatterns.push(u)):(g[h]||y.push(h),g[h]=u)}w||"@"!=p||(w=g,_=y),x&&(c.outputName=p,v[x]=c),T.test(p)?(c.pattern=d(p),b.push(c)):v[p]=c}}function f(e){v={},b=[],u(e),o(x,function(e,t){y[t]=e.children})}function p(e){var n=/^(~)?(.+)$/;e&&o(t(e,","),function(e){var t=n.exec(e),r="~"===t[1],i=r?"span":"div",a=t[2];y[a]=y[i],R[a]=i,r||(k[a.toUpperCase()]={},k[a]={}),v[a]||(v[a]=v[i]),o(y,function(e){e[i]&&(e[a]=e[i])})})}function h(e){var n=/^([+\-]?)(\w+)\[([^\]]+)\]$/;e&&o(t(e,","),function(e){var r=n.exec(e),i,a;r&&(a=r[1],i=a?y[r[2]]:y[r[2]]={"#comment":{}},i=y[r[2]],o(t(r[3],"|"),function(e){"-"===a?delete i[e]:i[e]={}}))})}function m(e){var t=v[e],n;if(t)return t;for(n=b.length;n--;)if(t=b[n],t.pattern.test(e))return t}var g=this,v={},y={},b=[],C,x,w,_,N,E,k,S,T,R={},A={};e=e||{},x=n(e.schema),e.verify_html===!1&&(e.valid_elements="*[*]"),e.valid_styles&&(C={},o(e.valid_styles,function(e,t){C[t]=s(e)})),w=c("whitespace_elements","pre script noscript style textarea video audio iframe object"),_=c("self_closing_elements","colgroup dd dt li option p td tfoot th thead tr"),N=c("short_ended_elements","area base basefont br col frame hr img input isindex link meta param embed source wbr track"),E=c("boolean_attributes","checked compact declare defer disabled ismap multiple nohref noresize noshade nowrap readonly selected autoplay loop controls"),S=c("non_empty_elements","td th iframe video audio object",N),T=c("text_block_elements","h1 h2 h3 h4 h5 h6 p div address pre form blockquote center dir fieldset header footer article section hgroup aside nav figure"),k=c("block_elements","hr table tbody thead tfoot th tr td li ol ul caption dl dt dd noscript menu isindex samp option datalist select optgroup",T),o((e.special||"script noscript style textarea").split(" "),function(e){A[e]=new RegExp("</"+e+"[^>]*>","gi")}),e.valid_elements?f(e.valid_elements):(o(x,function(e,t){v[t]={attributes:e.attributes,attributesOrder:e.attributesOrder},y[t]=e.children}),"html5"!=e.schema&&o(t("strong/b em/i"),function(e){e=t(e,"/"),v[e[1]].outputName=e[0]}),v.img.attributesDefault=[{name:"alt",value:""}],o(t("ol ul sub sup blockquote span font a table tbody tr strong em b i"),function(e){v[e]&&(v[e].removeEmpty=!0)}),o(t("p h1 h2 h3 h4 h5 h6 th td pre div address caption"),function(e){v[e].paddEmpty=!0}),o(t("span"),function(e){v[e].removeEmptyAttrs=!0})),p(e.custom_elements),h(e.valid_children),u(e.extended_valid_elements),h("+ol[ul|ol],+ul[ul|ol]"),e.invalid_elements&&o(s(e.invalid_elements),function(e){v[e]&&delete v[e]}),m("span")||u("span[!data-mce-type|*]"),g.children=y,g.styles=C,g.getBoolAttrs=function(){return E},g.getBlockElements=function(){return k},g.getTextBlockElements=function(){return T},g.getShortEndedElements=function(){return N},g.getSelfClosingElements=function(){return _},g.getNonEmptyElements=function(){return S},g.getWhiteSpaceElements=function(){return w},g.getSpecialElements=function(){return A},g.isValidChild=function(e,t){var n=y[e];return!(!n||!n[t])},g.isValid=function(e,t){var n,r,i=m(e);if(i){if(!t)return!0;if(i.attributes[t])return!0;if(n=i.attributePatterns)for(r=n.length;r--;)if(n[r].pattern.test(e))return!0}return!1},g.getElementRule=m,g.getCustomElements=function(){return R},g.addValidElements=u,g.setValidElements=f,g.addCustomElements=p,g.addValidChildren=h,g.elements=v}}),r(x,[C,h,f],function(e,t,n){var r=n.each;return function(n,i){var o=this,a=function(){};n=n||{},o.schema=i=i||new e,n.fix_self_closing!==!1&&(n.fix_self_closing=!0),r("comment cdata text start end pi doctype".split(" "),function(e){e&&(o[e]=n[e]||a)}),o.parse=function(e){function r(e){var t,n;for(t=u.length;t--&&u[t].name!==e;);if(t>=0){for(n=u.length-1;n>=t;n--)e=u[n],e.valid&&a.end(e.name);u.length=t}}function o(e,t,n,r,i){var o,a;if(t=t.toLowerCase(),n=t in b?t:I(n||r||i||""),x&&!g&&0!==t.indexOf("data-")){if(o=k[t],!o&&S){for(a=S.length;a--&&(o=S[a],!o.pattern.test(t)););-1===a&&(o=null)}if(!o)return;if(o.validValues&&!(n in o.validValues))return}f.map[t]=n,f.push({name:t,value:n})}var a=this,s,l=0,c,d,u=[],f,p,h,m,g,v,y,b,C,x,w,_,N,E,k,S,T,R,A,B,H,M,L,D,P,O=0,I=t.decode,F;for(M=new RegExp("<(?:(?:!--([\\w\\W]*?)-->)|(?:!\\[CDATA\\[([\\w\\W]*?)\\]\\]>)|(?:!DOCTYPE([\\w\\W]*?)>)|(?:\\?([^\\s\\/<>]+) ?([\\w\\W]*?)[?/]>)|(?:\\/([^>]+)>)|(?:([A-Za-z0-9\\-\\:\\.]+)((?:\\s+[^\"'>]+(?:(?:\"[^\"]*\")|(?:'[^']*')|[^>]*))*|\\/|\\s+)>))","g"),L=/([\w:\-]+)(?:\s*=\s*(?:(?:\"((?:[^\"])*)\")|(?:\'((?:[^\'])*)\')|([^>\s]+)))?/g,y=i.getShortEndedElements(),H=n.self_closing_elements||i.getSelfClosingElements(),b=i.getBoolAttrs(),x=n.validate,v=n.remove_internals,F=n.fix_self_closing,D=i.getSpecialElements();s=M.exec(e);){if(l<s.index&&a.text(I(e.substr(l,s.index-l))),c=s[6])c=c.toLowerCase(),":"===c.charAt(0)&&(c=c.substr(1)),r(c);else if(c=s[7]){if(c=c.toLowerCase(),":"===c.charAt(0)&&(c=c.substr(1)),C=c in y,F&&H[c]&&u.length>0&&u[u.length-1].name===c&&r(c),!x||(w=i.getElementRule(c))){if(_=!0,x&&(k=w.attributes,S=w.attributePatterns),(E=s[8])?(g=-1!==E.indexOf("data-mce-type"),g&&v&&(_=!1),f=[],f.map={},E.replace(L,o)):(f=[],f.map={}),x&&!g){if(T=w.attributesRequired,R=w.attributesDefault,A=w.attributesForced,B=w.removeEmptyAttrs,B&&!f.length&&(_=!1),A)for(p=A.length;p--;)N=A[p],m=N.name,P=N.value,"{$uid}"===P&&(P="mce_"+O++),f.map[m]=P,f.push({name:m,value:P});if(R)for(p=R.length;p--;)N=R[p],m=N.name,m in f.map||(P=N.value,"{$uid}"===P&&(P="mce_"+O++),f.map[m]=P,f.push({name:m,value:P}));if(T){for(p=T.length;p--&&!(T[p]in f.map););-1===p&&(_=!1)}f.map["data-mce-bogus"]&&(_=!1)}_&&a.start(c,f,C)}else _=!1;if(d=D[c]){d.lastIndex=l=s.index+s[0].length,(s=d.exec(e))?(_&&(h=e.substr(l,s.index-l)),l=s.index+s[0].length):(h=e.substr(l),l=e.length),_&&(h.length>0&&a.text(h,!0),a.end(c)),M.lastIndex=l;continue}C||(E&&E.indexOf("/")==E.length-1?_&&a.end(c):u.push({name:c,valid:_}))}else(c=s[1])?a.comment(c):(c=s[2])?a.cdata(c):(c=s[3])?a.doctype(c):(c=s[4])&&a.pi(c,s[5]);l=s.index+s[0].length}for(l<e.length&&a.text(I(e.substr(l))),p=u.length-1;p>=0;p--)c=u[p],c.valid&&a.end(c.name)}}}),r(w,[b,C,x,f],function(e,t,n,r){var i=r.makeMap,o=r.each,a=r.explode,s=r.extend;return function(r,l){function c(t){var n,r,o,a,s,c,u,f,p,h,m,g,v,y;for(m=i("tr,td,th,tbody,thead,tfoot,table"),h=l.getNonEmptyElements(),g=l.getTextBlockElements(),n=0;n<t.length;n++)if(r=t[n],r.parent&&!r.fixed)if(g[r.name]&&"li"==r.parent.name){for(v=r.next;v&&g[v.name];)v.name="li",v.fixed=!0,r.parent.insert(v,r.parent),v=v.next;r.unwrap(r)}else{for(a=[r],o=r.parent;o&&!l.isValidChild(o.name,r.name)&&!m[o.name];o=o.parent)a.push(o);if(o&&a.length>1){for(a.reverse(),s=c=d.filterNode(a[0].clone()),p=0;p<a.length-1;p++){for(l.isValidChild(c.name,a[p].name)?(u=d.filterNode(a[p].clone()),c.append(u)):u=c,f=a[p].firstChild;f&&f!=a[p+1];)y=f.next,u.append(f),f=y;c=u}s.isEmpty(h)?o.insert(r,a[0],!0):(o.insert(s,a[0],!0),o.insert(r,s)),o=a[0],(o.isEmpty(h)||o.firstChild===o.lastChild&&"br"===o.firstChild.name)&&o.empty().remove()}else if(r.parent){if("li"===r.name){if(v=r.prev,v&&("ul"===v.name||"ul"===v.name)){v.append(r);continue}if(v=r.next,v&&("ul"===v.name||"ul"===v.name)){v.insert(r,v.firstChild,!0);continue}r.wrap(d.filterNode(new e("ul",1)));continue}l.isValidChild(r.parent.name,"div")&&l.isValidChild("div",r.name)?r.wrap(d.filterNode(new e("div",1))):"style"===r.name||"script"===r.name?r.empty().remove():r.unwrap()}}}var d=this,u={},f=[],p={},h={};r=r||{},r.validate="validate"in r?r.validate:!0,r.root_name=r.root_name||"body",d.schema=l=l||new t,d.filterNode=function(e){var t,n,r;n in u&&(r=p[n],r?r.push(e):p[n]=[e]),t=f.length;for(;t--;)n=f[t].name,n in e.attributes.map&&(r=h[n],r?r.push(e):h[n]=[e]);return e},d.addNodeFilter=function(e,t){o(a(e),function(e){var n=u[e];n||(u[e]=n=[]),n.push(t)})},d.addAttributeFilter=function(e,t){o(a(e),function(e){var n;for(n=0;n<f.length;n++)if(f[n].name===e)return f[n].callbacks.push(t),void 0;f.push({name:e,callbacks:[t]})})},d.parse=function(t,o){function a(){function e(e){e&&(t=e.firstChild,t&&3==t.type&&(t.value=t.value.replace(R,"")),t=e.lastChild,t&&3==t.type&&(t.value=t.value.replace(H,"")))}var t=y.firstChild,n,r;if(l.isValidChild(y.name,I.toLowerCase())){for(;t;)n=t.next,3==t.type||1==t.type&&"p"!==t.name&&!T[t.name]&&!t.attr("data-mce-type")?r?r.append(t):(r=d(I,1),y.insert(r,t),r.append(t)):(e(r),r=null),t=n;e(r)}}function d(t,n){var r=new e(t,n),i;return t in u&&(i=p[t],i?i.push(r):p[t]=[r]),r}function m(e){var t,n,r;for(t=e.prev;t&&3===t.type;)n=t.value.replace(H,""),n.length>0?(t.value=n,t=t.prev):(r=t.prev,t.remove(),t=r)}function g(e){var t,n={};for(t in e)"li"!==t&&"p"!=t&&(n[t]=e[t]);return n}var v,y,b,C,x,w,_,N,E,k,S,T,R,A=[],B,H,M,L,D,P,O,I;if(o=o||{},p={},h={},T=s(i("script,style,head,html,body,title,meta,param"),l.getBlockElements()),O=l.getNonEmptyElements(),P=l.children,S=r.validate,I="forced_root_block"in o?o.forced_root_block:r.forced_root_block,D=l.getWhiteSpaceElements(),R=/^[ \t\r\n]+/,H=/[ \t\r\n]+$/,M=/[ \t\r\n]+/g,L=/^[ \t\r\n]+$/,v=new n({validate:S,self_closing_elements:g(l.getSelfClosingElements()),cdata:function(e){b.append(d("#cdata",4)).value=e},text:function(e,t){var n;B||(e=e.replace(M," "),b.lastChild&&T[b.lastChild.name]&&(e=e.replace(R,""))),0!==e.length&&(n=d("#text",3),n.raw=!!t,b.append(n).value=e)},comment:function(e){b.append(d("#comment",8)).value=e},pi:function(e,t){b.append(d(e,7)).value=t,m(b)},doctype:function(e){var t;t=b.append(d("#doctype",10)),t.value=e,m(b)},start:function(e,t,n){var r,i,o,a,s;if(o=S?l.getElementRule(e):{}){for(r=d(o.outputName||e,1),r.attributes=t,r.shortEnded=n,b.append(r),s=P[b.name],s&&P[r.name]&&!s[r.name]&&A.push(r),i=f.length;i--;)a=f[i].name,a in t.map&&(E=h[a],E?E.push(r):h[a]=[r]);T[e]&&m(r),n||(b=r),!B&&D[e]&&(B=!0)}},end:function(t){var n,r,i,o,a;if(r=S?l.getElementRule(t):{}){if(T[t]&&!B){if(n=b.firstChild,n&&3===n.type)if(i=n.value.replace(R,""),i.length>0)n.value=i,n=n.next;else for(o=n.next,n.remove(),n=o;n&&3===n.type;)i=n.value,o=n.next,(0===i.length||L.test(i))&&(n.remove(),n=o),n=o;if(n=b.lastChild,n&&3===n.type)if(i=n.value.replace(H,""),i.length>0)n.value=i,n=n.prev;else for(o=n.prev,n.remove(),n=o;n&&3===n.type;)i=n.value,o=n.prev,(0===i.length||L.test(i))&&(n.remove(),n=o),n=o}if(B&&D[t]&&(B=!1),(r.removeEmpty||r.paddEmpty)&&b.isEmpty(O))if(r.paddEmpty)b.empty().append(new e("#text","3")).value="\xa0";else if(!b.attributes.map.name&&!b.attributes.map.id)return a=b.parent,b.empty().remove(),b=a,void 0;b=b.parent}}},l),y=b=new e(o.context||r.root_name,11),v.parse(t),S&&A.length&&(o.context?o.invalid=!0:c(A)),I&&("body"==y.name||o.isRootContent)&&a(),!o.invalid){for(k in p){for(E=u[k],C=p[k],_=C.length;_--;)C[_].parent||C.splice(_,1);for(x=0,w=E.length;w>x;x++)E[x](C,k,o)}for(x=0,w=f.length;w>x;x++)if(E=f[x],E.name in h){for(C=h[E.name],_=C.length;_--;)C[_].parent||C.splice(_,1);for(_=0,N=E.callbacks.length;N>_;_++)E.callbacks[_](C,E.name,o)}}return y},r.remove_trailing_brs&&d.addNodeFilter("br",function(t){var n,r=t.length,i,o=s({},l.getBlockElements()),a=l.getNonEmptyElements(),c,d,u,f,p,h;for(o.body=1,n=0;r>n;n++)if(i=t[n],c=i.parent,o[i.parent.name]&&i===c.lastChild){for(u=i.prev;u;){if(f=u.name,"span"!==f||"bookmark"!==u.attr("data-mce-type")){if("br"!==f)break;if("br"===f){i=null;break}}u=u.prev}i&&(i.remove(),c.isEmpty(a)&&(p=l.getElementRule(c.name),p&&(p.removeEmpty?c.remove():p.paddEmpty&&(c.empty().append(new e("#text",3)).value="\xa0"))))}else{for(d=i;c&&c.firstChild===d&&c.lastChild===d&&(d=c,!o[c.name]);)c=c.parent;d===c&&(h=new e("#text",3),h.value="\xa0",i.replace(h))}}),r.allow_html_in_named_anchor||d.addAttributeFilter("id,name",function(e){for(var t=e.length,n,r,i,o;t--;)if(o=e[t],"a"===o.name&&o.firstChild&&!o.attr("href")){i=o.parent,n=o.lastChild;do r=n.prev,i.insert(n,o),n=r;while(n)}})}}),r(_,[h,f],function(e,t){var n=t.makeMap;return function(t){var r=[],i,o,a,s,l;return t=t||{},i=t.indent,o=n(t.indent_before||""),a=n(t.indent_after||""),s=e.getEncodeFunc(t.entity_encoding||"raw",t.entities),l="html"==t.element_format,{start:function(e,t,n){var c,d,u,f;if(i&&o[e]&&r.length>0&&(f=r[r.length-1],f.length>0&&"\n"!==f&&r.push("\n")),r.push("<",e),t)for(c=0,d=t.length;d>c;c++)u=t[c],r.push(" ",u.name,'="',s(u.value,!0),'"');r[r.length]=!n||l?">":" />",n&&i&&a[e]&&r.length>0&&(f=r[r.length-1],f.length>0&&"\n"!==f&&r.push("\n"))},end:function(e){var t;r.push("</",e,">"),i&&a[e]&&r.length>0&&(t=r[r.length-1],t.length>0&&"\n"!==t&&r.push("\n"))},text:function(e,t){e.length>0&&(r[r.length]=t?e:s(e))},cdata:function(e){r.push("<![CDATA[",e,"]]>")},comment:function(e){r.push("<!--",e,"-->")},pi:function(e,t){t?r.push("<?",e," ",t,"?>"):r.push("<?",e,"?>"),i&&r.push("\n")},doctype:function(e){r.push("<!DOCTYPE",e,">",i?"\n":"")
},reset:function(){r.length=0},getContent:function(){return r.join("").replace(/\n$/,"")}}}}),r(N,[_,C],function(e,t){return function(n,r){var i=this,o=new e(n);n=n||{},n.validate="validate"in n?n.validate:!0,i.schema=r=r||new t,i.writer=o,i.serialize=function(e){function t(e){var n=i[e.type],s,l,c,d,u,f,p,h,m;if(n)n(e);else{if(s=e.name,l=e.shortEnded,c=e.attributes,a&&c&&c.length>1){for(f=[],f.map={},m=r.getElementRule(e.name),p=0,h=m.attributesOrder.length;h>p;p++)d=m.attributesOrder[p],d in c.map&&(u=c.map[d],f.map[d]=u,f.push({name:d,value:u}));for(p=0,h=c.length;h>p;p++)d=c[p].name,d in f.map||(u=c.map[d],f.map[d]=u,f.push({name:d,value:u}));c=f}if(o.start(e.name,c,l),!l){if(e=e.firstChild)do t(e);while(e=e.next);o.end(s)}}}var i,a;return a=n.validate,i={3:function(e){o.text(e.value,e.raw)},8:function(e){o.comment(e.value)},7:function(e){o.pi(e.name,e.value)},10:function(e){o.doctype(e.value)},4:function(e){o.cdata(e.value)},11:function(e){if(e=e.firstChild)do t(e);while(e=e.next)}},o.reset(),1!=e.type||n.inner?i[11](e):t(e),o.getContent()}}}),r(E,[g,w,h,N,b,C,m,f],function(e,t,n,r,i,o,a,s){var l=s.each,c=s.trim,d=e.DOM;return function(e,i){var s,u,f;return i&&(s=i.dom,u=i.schema),s=s||d,u=u||new o(e),e.entity_encoding=e.entity_encoding||"named",e.remove_trailing_brs="remove_trailing_brs"in e?e.remove_trailing_brs:!0,f=new t(e,u),f.addAttributeFilter("src,href,style",function(t,n){for(var r=t.length,i,o,a="data-mce-"+n,l=e.url_converter,c=e.url_converter_scope,d;r--;)i=t[r],o=i.attributes.map[a],o!==d?(i.attr(n,o.length>0?o:null),i.attr(a,null)):(o=i.attributes.map[n],"style"===n?o=s.serializeStyle(s.parseStyle(o),i.name):l&&(o=l.call(c,o,n,i.name)),i.attr(n,o.length>0?o:null))}),f.addAttributeFilter("class",function(e){for(var t=e.length,n,r;t--;)n=e[t],r=n.attr("class").replace(/(?:^|\s)mce-item-\w+(?!\S)/g,""),n.attr("class",r.length>0?r:null)}),f.addAttributeFilter("data-mce-type",function(e,t,n){for(var r=e.length,i;r--;)i=e[r],"bookmark"!==i.attributes.map["data-mce-type"]||n.cleanup||i.remove()}),f.addAttributeFilter("data-mce-expando",function(e,t){for(var n=e.length;n--;)e[n].attr(t,null)}),f.addNodeFilter("noscript",function(e){for(var t=e.length,r;t--;)r=e[t].firstChild,r&&(r.value=n.decode(r.value))}),f.addNodeFilter("script,style",function(e,t){function n(e){return e.replace(/(<!--\[CDATA\[|\]\]-->)/g,"\n").replace(/^[\r\n]*|[\r\n]*$/g,"").replace(/^\s*((<!--)?(\s*\/\/)?\s*<!\[CDATA\[|(<!--\s*)?\/\*\s*<!\[CDATA\[\s*\*\/|(\/\/)?\s*<!--|\/\*\s*<!--\s*\*\/)\s*[\r\n]*/gi,"").replace(/\s*(\/\*\s*\]\]>\s*\*\/(-->)?|\s*\/\/\s*\]\]>(-->)?|\/\/\s*(-->)?|\]\]>|\/\*\s*-->\s*\*\/|\s*-->\s*)\s*$/g,"")}for(var r=e.length,i,o;r--;)i=e[r],o=i.firstChild?i.firstChild.value:"","script"===t?(i.attr("type",(i.attr("type")||"text/javascript").replace(/^mce\-/,"")),o.length>0&&(i.firstChild.value="// <![CDATA[\n"+n(o)+"\n// ]]>")):o.length>0&&(i.firstChild.value="<!--\n"+n(o)+"\n-->")}),f.addNodeFilter("#comment",function(e){for(var t=e.length,n;t--;)n=e[t],0===n.value.indexOf("[CDATA[")?(n.name="#cdata",n.type=4,n.value=n.value.replace(/^\[CDATA\[|\]\]$/g,"")):0===n.value.indexOf("mce:protected ")&&(n.name="#text",n.type=3,n.raw=!0,n.value=unescape(n.value).substr(14))}),f.addNodeFilter("xml:namespace,input",function(e,t){for(var n=e.length,r;n--;)r=e[n],7===r.type?r.remove():1===r.type&&("input"!==t||"type"in r.attributes.map||r.attr("type","text"))}),e.fix_list_elements&&f.addNodeFilter("ul,ol",function(e){for(var t=e.length,n,r;t--;)n=e[t],r=n.parent,("ul"===r.name||"ol"===r.name)&&n.prev&&"li"===n.prev.name&&n.prev.append(n)}),f.addAttributeFilter("data-mce-src,data-mce-href,data-mce-style,data-mce-selected",function(e,t){for(var n=e.length;n--;)e[n].attr(t,null)}),{schema:u,addNodeFilter:f.addNodeFilter,addAttributeFilter:f.addAttributeFilter,serialize:function(t,n){var i=this,o,d,p,h,m;return a.ie&&s.select("script,style,select,map").length>0?(m=t.innerHTML,t=t.cloneNode(!1),s.setHTML(t,m)):t=t.cloneNode(!0),o=t.ownerDocument.implementation,o.createHTMLDocument&&(d=o.createHTMLDocument(""),l("BODY"==t.nodeName?t.childNodes:[t],function(e){d.body.appendChild(d.importNode(e,!0))}),t="BODY"!=t.nodeName?d.body.firstChild:d.body,p=s.doc,s.doc=d),n=n||{},n.format=n.format||"html",n.selection&&(n.forced_root_block=""),n.no_events||(n.node=t,i.onPreProcess(n)),h=new r(e,u),n.content=h.serialize(f.parse(c(n.getInner?t.innerHTML:s.getOuterHTML(t)),n)),n.cleanup||(n.content=n.content.replace(/\uFEFF/g,"")),n.no_events||i.onPostProcess(n),p&&(s.doc=p),n.node=null,n.content},addRules:function(e){u.addValidElements(e)},setRules:function(e){u.setValidElements(e)},onPreProcess:function(e){i&&i.fire("PreProcess",e)},onPostProcess:function(e){i&&i.fire("PostProcess",e)}}}}),r(k,[],function(){function e(e){function t(t,n){var r,i=0,o,a,s,l,c,d,u=-1,f;if(r=t.duplicate(),r.collapse(n),f=r.parentElement(),f.ownerDocument===e.dom.doc){for(;"false"===f.contentEditable;)f=f.parentNode;if(!f.hasChildNodes())return{node:f,inside:1};for(s=f.children,o=s.length-1;o>=i;)if(d=Math.floor((i+o)/2),l=s[d],r.moveToElementText(l),u=r.compareEndPoints(n?"StartToStart":"EndToEnd",t),u>0)o=d-1;else{if(!(0>u))return{node:l};i=d+1}if(0>u)for(l?r.collapse(!1):(r.moveToElementText(f),r.collapse(!0),l=f,a=!0),c=0;0!==r.compareEndPoints(n?"StartToStart":"StartToEnd",t)&&0!==r.move("character",1)&&f==r.parentElement();)c++;else for(r.collapse(!0),c=0;0!==r.compareEndPoints(n?"StartToStart":"StartToEnd",t)&&0!==r.move("character",-1)&&f==r.parentElement();)c++;return{node:l,position:u,offset:c,inside:a}}}function n(){function n(e){var n=t(o,e),r,i,s=0,l,c,d;if(r=n.node,i=n.offset,n.inside&&!r.hasChildNodes())return a[e?"setStart":"setEnd"](r,0),void 0;if(i===c)return a[e?"setStartBefore":"setEndAfter"](r),void 0;if(n.position<0){if(l=n.inside?r.firstChild:r.nextSibling,!l)return a[e?"setStartAfter":"setEndAfter"](r),void 0;if(!i)return 3==l.nodeType?a[e?"setStart":"setEnd"](l,0):a[e?"setStartBefore":"setEndBefore"](l),void 0;for(;l;){if(d=l.nodeValue,s+=d.length,s>=i){r=l,s-=i,s=d.length-s;break}l=l.nextSibling}}else{if(l=r.previousSibling,!l)return a[e?"setStartBefore":"setEndBefore"](r);if(!i)return 3==r.nodeType?a[e?"setStart":"setEnd"](l,r.nodeValue.length):a[e?"setStartAfter":"setEndAfter"](l),void 0;for(;l;){if(s+=l.nodeValue.length,s>=i){r=l,s-=i;break}l=l.previousSibling}}a[e?"setStart":"setEnd"](r,s)}var o=e.getRng(),a=i.createRng(),s,l,c,d,u;if(s=o.item?o.item(0):o.parentElement(),s.ownerDocument!=i.doc)return a;if(l=e.isCollapsed(),o.item)return a.setStart(s.parentNode,i.nodeIndex(s)),a.setEnd(a.startContainer,a.startOffset+1),a;try{n(!0),l||n()}catch(f){if(-2147024809!=f.number)throw f;u=r.getBookmark(2),c=o.duplicate(),c.collapse(!0),s=c.parentElement(),l||(c=o.duplicate(),c.collapse(!1),d=c.parentElement(),d.innerHTML=d.innerHTML),s.innerHTML=s.innerHTML,r.moveToBookmark(u),o=e.getRng(),n(!0),l||n()}return a}var r=this,i=e.dom,o=!1;this.getBookmark=function(n){function r(e){var t,n,r,o,a=[];for(t=e.parentNode,n=i.getRoot().parentNode;t!=n&&9!==t.nodeType;){for(r=t.children,o=r.length;o--;)if(e===r[o]){a.push(o);break}e=t,t=t.parentNode}return a}function o(e){var n;return n=t(a,e),n?{position:n.position,offset:n.offset,indexes:r(n.node),inside:n.inside}:void 0}var a=e.getRng(),s={};return 2===n&&(a.item?s.start={ctrl:!0,indexes:r(a.item(0))}:(s.start=o(!0),e.isCollapsed()||(s.end=o()))),s},this.moveToBookmark=function(e){function t(e){var t,n,r,o;for(t=i.getRoot(),n=e.length-1;n>=0;n--)o=t.children,r=e[n],r<=o.length-1&&(t=o[r]);return t}function n(n){var i=e[n?"start":"end"],a,s,l,c;i&&(a=i.position>0,s=o.createTextRange(),s.moveToElementText(t(i.indexes)),c=i.offset,c!==l?(s.collapse(i.inside||a),s.moveStart("character",a?-c:c)):s.collapse(n),r.setEndPoint(n?"StartToStart":"EndToStart",s),n&&r.collapse(!0))}var r,o=i.doc.body;e.start&&(e.start.ctrl?(r=o.createControlRange(),r.addElement(t(e.start.indexes)),r.select()):(r=o.createTextRange(),n(!0),n(),r.select()))},this.addRange=function(t){function n(e){var t,n,a,u,h;a=i.create("a"),t=e?s:c,n=e?l:d,u=r.duplicate(),(t==f||t==f.documentElement)&&(t=p,n=0),3==t.nodeType?(t.parentNode.insertBefore(a,t),u.moveToElementText(a),u.moveStart("character",n),i.remove(a),r.setEndPoint(e?"StartToStart":"EndToEnd",u)):(h=t.childNodes,h.length?(n>=h.length?i.insertAfter(a,h[h.length-1]):t.insertBefore(a,h[n]),u.moveToElementText(a)):t.canHaveHTML&&(t.innerHTML="<span>&#xFEFF;</span>",a=t.firstChild,u.moveToElementText(a),u.collapse(o)),r.setEndPoint(e?"StartToStart":"EndToEnd",u),i.remove(a))}var r,a,s,l,c,d,u,f=e.dom.doc,p=f.body,h,m;if(s=t.startContainer,l=t.startOffset,c=t.endContainer,d=t.endOffset,r=p.createTextRange(),s==c&&1==s.nodeType){if(l==d&&!s.hasChildNodes()){if(s.canHaveHTML)return u=s.previousSibling,u&&!u.hasChildNodes()&&i.isBlock(u)?u.innerHTML="&#xFEFF;":u=null,s.innerHTML="<span>&#xFEFF;</span><span>&#xFEFF;</span>",r.moveToElementText(s.lastChild),r.select(),i.doc.selection.clear(),s.innerHTML="",u&&(u.innerHTML=""),void 0;l=i.nodeIndex(s),s=s.parentNode}if(l==d-1)try{if(m=s.childNodes[l],a=p.createControlRange(),a.addElement(m),a.select(),h=e.getRng(),h.item&&m===h.item(0))return}catch(g){}}n(!0),n(),r.select()},this.getRangeAt=n}return e}),r(S,[m],function(e){return{BACKSPACE:8,DELETE:46,DOWN:40,ENTER:13,LEFT:37,RIGHT:39,SPACEBAR:32,TAB:9,UP:38,modifierPressed:function(e){return e.shiftKey||e.ctrlKey||e.altKey},metaKeyPressed:function(t){return(e.mac?t.ctrlKey||t.metaKey:t.ctrlKey)&&!t.altKey}}}),r(T,[S,f,m],function(e,t,n){return function(r,i){function o(e){return i.settings.object_resizing===!1?!1:/TABLE|IMG|DIV/.test(e.nodeName)?"false"===e.getAttribute("data-mce-resize")?!1:!0:!1}function a(t){var n,r;n=t.screenX-E,r=t.screenY-k,M=n*N[2]+R,L=r*N[3]+A,M=5>M?5:M,L=5>L?5:L,(e.modifierPressed(t)||"IMG"==x.nodeName&&0!==N[2]*N[3])&&(M=Math.round(L/B),L=Math.round(M*B)),b.setStyles(w,{width:M,height:L}),N[2]<0&&w.clientWidth<=M&&b.setStyle(w,"left",S+(R-M)),N[3]<0&&w.clientHeight<=L&&b.setStyle(w,"top",T+(A-L)),H||(i.fire("ObjectResizeStart",{target:x,width:R,height:A}),H=!0)}function s(){function e(e,t){t&&(x.style[e]||!i.schema.isValid(x.nodeName.toLowerCase(),e)?b.setStyle(x,e,t):b.setAttrib(x,e,t))}H=!1,e("width",M),e("height",L),b.unbind(D,"mousemove",a),b.unbind(D,"mouseup",s),P!=D&&(b.unbind(P,"mousemove",a),b.unbind(P,"mouseup",s)),b.remove(w),O&&"TABLE"!=x.nodeName||l(x),i.fire("ObjectResized",{target:x,width:M,height:L}),i.nodeChanged()}function l(e,t,n){var r,l,d,u,f;r=b.getPos(e,i.getBody()),S=r.x,T=r.y,f=e.getBoundingClientRect(),l=f.width||f.right-f.left,d=f.height||f.bottom-f.top,x!=e&&(m(),x=e,M=L=0),u=i.fire("ObjectSelected",{target:e}),o(e)&&!u.isDefaultPrevented()?C(_,function(e,r){function o(t){H=!0,E=t.screenX,k=t.screenY,R=x.clientWidth,A=x.clientHeight,B=A/R,N=e,w=x.cloneNode(!0),b.addClass(w,"mce-clonedresizable"),w.contentEditable=!1,w.unSelectabe=!0,b.setStyles(w,{left:S,top:T,margin:0}),w.removeAttribute("data-mce-selected"),i.getBody().appendChild(w),b.bind(D,"mousemove",a),b.bind(D,"mouseup",s),P!=D&&(b.bind(P,"mousemove",a),b.bind(P,"mouseup",s))}var c,u;return t?(r==t&&o(n),void 0):(c=b.get("mceResizeHandle"+r),c?b.show(c):(u=i.getBody(),c=b.add(u,"div",{id:"mceResizeHandle"+r,"data-mce-bogus":!0,"class":"mce-resizehandle",contentEditable:!1,unSelectabe:!0,style:"cursor:"+r+"-resize; margin:0; padding:0"}),b.bind(c,"mousedown",function(e){e.preventDefault(),o(e)})),b.setStyles(c,{left:l*e[0]+S-c.offsetWidth/2,top:d*e[1]+T-c.offsetHeight/2}),void 0)}):c(),x.setAttribute("data-mce-selected","1")}function c(){var e,t;x&&x.removeAttribute("data-mce-selected");for(e in _)t=b.get("mceResizeHandle"+e),t&&(b.unbind(t),b.remove(t))}function d(e){function t(e,t){do if(e===t)return!0;while(e=e.parentNode)}var n;return C(b.select("img[data-mce-selected],hr[data-mce-selected]"),function(e){e.removeAttribute("data-mce-selected")}),n="mousedown"==e.type?e.target:r.getNode(),n=b.getParent(n,O?"table":"table,img,hr"),n&&(g(),t(r.getStart(),n)&&t(r.getEnd(),n)&&(!O||n!=r.getStart()&&"IMG"!==r.getStart().nodeName))?(l(n),void 0):(c(),void 0)}function u(e,t,n){e&&e.attachEvent&&e.attachEvent("on"+t,n)}function f(e,t,n){e&&e.detachEvent&&e.detachEvent("on"+t,n)}function p(e){var t=e.srcElement,n,r,o,a,s,c,d;n=t.getBoundingClientRect(),c=e.clientX-n.left,d=e.clientY-n.top;for(r in _)if(o=_[r],a=t.offsetWidth*o[0],s=t.offsetHeight*o[1],Math.abs(a-c)<8&&Math.abs(s-d)<8){N=o;break}H=!0,i.getDoc().selection.empty(),l(t,r,e)}function h(e){var t=e.srcElement;if(t!=x){if(m(),0===t.id.indexOf("mceResizeHandle"))return e.returnValue=!1,void 0;("IMG"==t.nodeName||"TABLE"==t.nodeName)&&(c(),x=t,u(t,"resizestart",p))}}function m(){f(x,"resizestart",p)}function g(){try{i.getDoc().execCommand("enableObjectResizing",!1,!1)}catch(e){}}function v(e){var t;if(O){t=D.body.createControlRange();try{return t.addElement(e),t.select(),!0}catch(n){}}}function y(){x=w=null,O&&(m(),f(i.getBody(),"controlselect",h))}var b=i.dom,C=t.each,x,w,_,N,E,k,S,T,R,A,B,H,M,L,D=i.getDoc(),P=document,O=n.ie;_={n:[.5,0,0,-1],e:[1,.5,1,0],s:[.5,1,0,1],w:[0,.5,-1,0],nw:[0,0,-1,-1],ne:[1,0,1,-1],se:[1,1,1,1],sw:[0,1,-1,1]};var I=".mce-content-body";return i.contentStyles.push(I+" div.mce-resizehandle {"+"position: absolute;"+"border: 1px solid black;"+"background: #FFF;"+"width: 5px;"+"height: 5px;"+"z-index: 10000"+"}"+I+" .mce-resizehandle:hover {"+"background: #000"+"}"+I+" img[data-mce-selected], hr[data-mce-selected] {"+"outline: 1px solid black;"+"resize: none"+"}"+I+" .mce-clonedresizable {"+"position: absolute;"+(n.gecko?"":"outline: 1px dashed black;")+"opacity: .5;"+"filter: alpha(opacity=50);"+"z-index: 10000"+"}"),i.on("init",function(){O?(i.on("ObjectResized",function(e){"TABLE"!=e.target.nodeName&&(c(),v(e.target))}),u(i.getBody(),"controlselect",h)):g(),i.on("nodechange mousedown ResizeEditor",d),i.on("keydown keyup",function(e){x&&"TABLE"==x.nodeName&&d(e)})}),{controlSelect:v,destroy:y}}}),r(R,[u,k,T,m,f],function(e,n,r,i,o){function a(e,t,i,o){var a=this;a.dom=e,a.win=t,a.serializer=i,a.editor=o,a.controlSelection=new r(a,o),a.win.getSelection||(a.tridentSel=new n(a))}var s=o.each,l=o.grep,c=o.trim,d=i.ie,u=i.opera;return a.prototype={setCursorLocation:function(e,t){var n=this,r=n.dom.createRng();r.setStart(e,t),r.setEnd(e,t),n.setRng(r),n.collapse(!1)},getContent:function(e){var n=this,r=n.getRng(),i=n.dom.create("body"),o=n.getSel(),a,s,l;return e=e||{},a=s="",e.get=!0,e.format=e.format||"html",e.selection=!0,n.editor.fire("BeforeGetContent",e),"text"==e.format?n.isCollapsed()?"":r.text||(o.toString?o.toString():""):(r.cloneContents?(l=r.cloneContents(),l&&i.appendChild(l)):r.item!==t||r.htmlText!==t?(i.innerHTML="<br>"+(r.item?r.item(0).outerHTML:r.htmlText),i.removeChild(i.firstChild)):i.innerHTML=r.toString(),/^\s/.test(i.innerHTML)&&(a=" "),/\s+$/.test(i.innerHTML)&&(s=" "),e.getInner=!0,e.content=n.isCollapsed()?"":a+n.serializer.serialize(i,e)+s,n.editor.fire("GetContent",e),e.content)},setContent:function(e,t){var n=this,r=n.getRng(),i,o=n.win.document,a,s;if(t=t||{format:"html"},t.set=!0,t.selection=!0,e=t.content=e,t.no_events||n.editor.fire("BeforeSetContent",t),e=t.content,r.insertNode){e+='<span id="__caret">_</span>',r.startContainer==o&&r.endContainer==o?o.body.innerHTML=e:(r.deleteContents(),0===o.body.childNodes.length?o.body.innerHTML=e:r.createContextualFragment?r.insertNode(r.createContextualFragment(e)):(a=o.createDocumentFragment(),s=o.createElement("div"),a.appendChild(s),s.outerHTML=e,r.insertNode(a))),i=n.dom.get("__caret"),r=o.createRange(),r.setStartBefore(i),r.setEndBefore(i),n.setRng(r),n.dom.remove("__caret");try{n.setRng(r)}catch(l){}}else r.item&&(o.execCommand("Delete",!1,null),r=n.getRng()),/^\s+/.test(e)?(r.pasteHTML('<span id="__mce_tmp">_</span>'+e),n.dom.remove("__mce_tmp")):r.pasteHTML(e);t.no_events||n.editor.fire("SetContent",t)},getStart:function(){var e=this,t=e.getRng(),n,r,i,o;if(t.duplicate||t.item){if(t.item)return t.item(0);for(i=t.duplicate(),i.collapse(1),n=i.parentElement(),n.ownerDocument!==e.dom.doc&&(n=e.dom.getRoot()),r=o=t.parentElement();o=o.parentNode;)if(o==n){n=r;break}return n}return n=t.startContainer,1==n.nodeType&&n.hasChildNodes()&&(n=n.childNodes[Math.min(n.childNodes.length-1,t.startOffset)]),n&&3==n.nodeType?n.parentNode:n},getEnd:function(){var e=this,t=e.getRng(),n,r;return t.duplicate||t.item?t.item?t.item(0):(t=t.duplicate(),t.collapse(0),n=t.parentElement(),n.ownerDocument!==e.dom.doc&&(n=e.dom.getRoot()),n&&"BODY"==n.nodeName?n.lastChild||n:n):(n=t.endContainer,r=t.endOffset,1==n.nodeType&&n.hasChildNodes()&&(n=n.childNodes[r>0?r-1:r]),n&&3==n.nodeType?n.parentNode:n)},getBookmark:function(e,t){function n(e,t){var n=0;return s(a.select(e),function(e,r){e==t&&(n=r)}),n}function r(e){function t(t){var n,r,i,o=t?"start":"end";n=e[o+"Container"],r=e[o+"Offset"],1==n.nodeType&&"TR"==n.nodeName&&(i=n.childNodes,n=i[Math.min(t?r:r-1,i.length-1)],n&&(r=t?0:n.childNodes.length,e["set"+(t?"Start":"End")](n,r)))}return t(!0),t(),e}function i(){function e(e,n){var i=e[n?"startContainer":"endContainer"],a=e[n?"startOffset":"endOffset"],s=[],l,c,d=0;if(3==i.nodeType){if(t)for(l=i.previousSibling;l&&3==l.nodeType;l=l.previousSibling)a+=l.nodeValue.length;s.push(a)}else c=i.childNodes,a>=c.length&&c.length&&(d=1,a=Math.max(0,c.length-1)),s.push(o.dom.nodeIndex(c[a],t)+d);for(;i&&i!=r;i=i.parentNode)s.push(o.dom.nodeIndex(i,t));return s}var n=o.getRng(!0),r=a.getRoot(),i={};return i.start=e(n,!0),o.isCollapsed()||(i.end=e(n)),i}var o=this,a=o.dom,l,c,d,u,f,p,h="&#xFEFF;",m;if(2==e)return p=o.getNode(),f=p.nodeName,"IMG"==f?{name:f,index:n(f,p)}:o.tridentSel?o.tridentSel.getBookmark(e):i();if(e)return{rng:o.getRng()};if(l=o.getRng(),d=a.uniqueId(),u=o.isCollapsed(),m="overflow:hidden;line-height:0px",l.duplicate||l.item){if(l.item)return p=l.item(0),f=p.nodeName,{name:f,index:n(f,p)};c=l.duplicate();try{l.collapse(),l.pasteHTML('<span data-mce-type="bookmark" id="'+d+'_start" style="'+m+'">'+h+"</span>"),u||(c.collapse(!1),l.moveToElementText(c.parentElement()),0===l.compareEndPoints("StartToEnd",c)&&c.move("character",-1),c.pasteHTML('<span data-mce-type="bookmark" id="'+d+'_end" style="'+m+'">'+h+"</span>"))}catch(g){return null}}else{if(p=o.getNode(),f=p.nodeName,"IMG"==f)return{name:f,index:n(f,p)};c=r(l.cloneRange()),u||(c.collapse(!1),c.insertNode(a.create("span",{"data-mce-type":"bookmark",id:d+"_end",style:m},h))),l=r(l),l.collapse(!0),l.insertNode(a.create("span",{"data-mce-type":"bookmark",id:d+"_start",style:m},h))}return o.moveToBookmark({id:d,keep:1}),{id:d}},moveToBookmark:function(e){function t(t){var n=e[t?"start":"end"],r,i,o,s;if(n){for(o=n[0],i=c,r=n.length-1;r>=1;r--){if(s=i.childNodes,n[r]>s.length-1)return;i=s[n[r]]}3===i.nodeType&&(o=Math.min(n[0],i.nodeValue.length)),1===i.nodeType&&(o=Math.min(n[0],i.childNodes.length)),t?a.setStart(i,o):a.setEnd(i,o)}return!0}function n(t){var n=o.get(e.id+"_"+t),r,i,a,c,d=e.keep;if(n&&(r=n.parentNode,"start"==t?(d?(r=n.firstChild,i=1):i=o.nodeIndex(n),f=p=r,h=m=i):(d?(r=n.firstChild,i=1):i=o.nodeIndex(n),p=r,m=i),!d)){for(c=n.previousSibling,a=n.nextSibling,s(l(n.childNodes),function(e){3==e.nodeType&&(e.nodeValue=e.nodeValue.replace(/\uFEFF/g,""))});n=o.get(e.id+"_"+t);)o.remove(n,1);c&&a&&c.nodeType==a.nodeType&&3==c.nodeType&&!u&&(i=c.nodeValue.length,c.appendData(a.nodeValue),o.remove(a),"start"==t?(f=p=c,h=m=i):(p=c,m=i))}}function r(e){return!o.isBlock(e)||e.innerHTML||d||(e.innerHTML='<br data-mce-bogus="1" />'),e}var i=this,o=i.dom,a,c,f,p,h,m;if(e)if(e.start){if(a=o.createRng(),c=o.getRoot(),i.tridentSel)return i.tridentSel.moveToBookmark(e);t(!0)&&t()&&i.setRng(a)}else e.id?(n("start"),n("end"),f&&(a=o.createRng(),a.setStart(r(f),h),a.setEnd(r(p),m),i.setRng(a))):e.name?i.select(o.select(e.name)[e.index]):e.rng&&i.setRng(e.rng)},select:function(t,n){function r(t,n){var r=new e(t,t);do{if(3==t.nodeType&&0!==c(t.nodeValue).length)return n?a.setStart(t,0):a.setEnd(t,t.nodeValue.length),void 0;if("BR"==t.nodeName)return n?a.setStartBefore(t):a.setEndBefore(t),void 0}while(t=n?r.next():r.prev())}var i=this,o=i.dom,a=o.createRng(),s;if(t){if(!n&&i.controlSelection.controlSelect(t))return;s=o.nodeIndex(t),a.setStart(t.parentNode,s),a.setEnd(t.parentNode,s+1),n&&(r(t,1),r(t)),i.setRng(a)}return t},isCollapsed:function(){var e=this,t=e.getRng(),n=e.getSel();return!t||t.item?!1:t.compareEndPoints?0===t.compareEndPoints("StartToEnd",t):!n||t.collapsed},collapse:function(e){var t=this,n=t.getRng(),r;n.item&&(r=n.item(0),n=t.win.document.body.createTextRange(),n.moveToElementText(r)),n.collapse(!!e),t.setRng(n)},getSel:function(){var e=this.win;return e.getSelection?e.getSelection():e.document.selection},getRng:function(e){var t=this,n,r,i,o=t.win.document,a;if(!e&&t.restoreRng)return t.restoreRng;if(e&&t.tridentSel)return t.tridentSel.getRangeAt(0);try{(n=t.getSel())&&(r=n.rangeCount>0?n.getRangeAt(0):n.createRange?n.createRange():o.createRange())}catch(s){}if(d&&r&&r.setStart){try{a=o.selection.createRange()}catch(s){}a&&a.item&&(i=a.item(0),r=o.createRange(),r.setStartBefore(i),r.setEndAfter(i))}return r||(r=o.createRange?o.createRange():o.body.createTextRange()),r.setStart&&9===r.startContainer.nodeType&&r.collapsed&&(i=t.dom.getRoot(),r.setStart(i,0),r.setEnd(i,0)),t.selectedRange&&t.explicitRange&&(0===r.compareBoundaryPoints(r.START_TO_START,t.selectedRange)&&0===r.compareBoundaryPoints(r.END_TO_END,t.selectedRange)?r=t.explicitRange:(t.selectedRange=null,t.explicitRange=null)),r},setRng:function(e,t){var n=this,r;if(e.select)try{e.select()}catch(i){}else if(n.tridentSel){if(e.cloneRange)try{return n.tridentSel.addRange(e),void 0}catch(i){}}else if(r=n.getSel()){n.explicitRange=e;try{r.removeAllRanges()}catch(i){}r.addRange(e),t===!1&&r.extend&&(r.collapse(e.endContainer,e.endOffset),r.extend(e.startContainer,e.startOffset)),n.selectedRange=r.rangeCount>0?r.getRangeAt(0):null}},setNode:function(e){var t=this;return t.setContent(t.dom.getOuterHTML(e)),e},getNode:function(){function e(e,t){for(var n=e;e&&3===e.nodeType&&0===e.length;)e=t?e.nextSibling:e.previousSibling;return e||n}var t=this,n=t.getRng(),r,i=n.startContainer,o=n.endContainer,a=n.startOffset,s=n.endOffset;return n?n.setStart?(r=n.commonAncestorContainer,!n.collapsed&&(i==o&&2>s-a&&i.hasChildNodes()&&(r=i.childNodes[a]),3===i.nodeType&&3===o.nodeType&&(i=i.length===a?e(i.nextSibling,!0):i.parentNode,o=0===s?e(o.previousSibling,!1):o.parentNode,i&&i===o))?i:r&&3==r.nodeType?r.parentNode:r):n.item?n.item(0):n.parentElement():t.dom.getRoot()},getSelectedBlocks:function(t,n){var r=this,i=r.dom,o,a,s=[];if(a=i.getRoot(),t=i.getParent(t||r.getStart(),i.isBlock),n=i.getParent(n||r.getEnd(),i.isBlock),t&&t!=a&&s.push(t),t&&n&&t!=n){o=t;for(var l=new e(t,a);(o=l.next())&&o!=n;)i.isBlock(o)&&s.push(o)}return n&&t!=n&&n!=a&&s.push(n),s},isForward:function(){var e=this.dom,t=this.getSel(),n,r;return t&&t.anchorNode&&t.focusNode?(n=e.createRng(),n.setStart(t.anchorNode,t.anchorOffset),n.collapse(!0),r=e.createRng(),r.setStart(t.focusNode,t.focusOffset),r.collapse(!0),n.compareBoundaryPoints(n.START_TO_START,r)<=0):!0},normalize:function(){function t(t){function a(t,n){for(var r=new e(t,f.getParent(t.parentNode,f.isBlock)||p);t=r[n?"prev":"next"]();)if("BR"===t.nodeName)return!0}function s(e,t){return e.previousSibling&&e.previousSibling.nodeName==t}function l(t,n){var r,a;for(n=n||c,r=new e(n,f.getParent(n.parentNode,f.isBlock)||p);h=r[t?"prev":"next"]();){if(3===h.nodeType&&h.nodeValue.length>0)return c=h,d=t?h.nodeValue.length:0,i=!0,void 0;if(f.isBlock(h)||m[h.nodeName.toLowerCase()])return;a=h}o&&a&&(c=a,i=!0,d=0)}var c,d,u,f=n.dom,p=f.getRoot(),h,m,g;if(c=r[(t?"start":"end")+"Container"],d=r[(t?"start":"end")+"Offset"],m=f.schema.getNonEmptyElements(),9===c.nodeType&&(c=f.getRoot(),d=0),c===p){if(t&&(h=c.childNodes[d>0?d-1:0],h&&(g=h.nodeName.toLowerCase(),m[h.nodeName]||"TABLE"==h.nodeName)))return;if(c.hasChildNodes()&&(d=Math.min(!t&&d>0?d-1:d,c.childNodes.length-1),c=c.childNodes[d],d=0,c.hasChildNodes()&&!/TABLE/.test(c.nodeName))){h=c,u=new e(c,p);do{if(3===h.nodeType&&h.nodeValue.length>0){d=t?0:h.nodeValue.length,c=h,i=!0;break}if(m[h.nodeName.toLowerCase()]){d=f.nodeIndex(h),c=h.parentNode,"IMG"!=h.nodeName||t||d++,i=!0;break}}while(h=t?u.next():u.prev())}}o&&(3===c.nodeType&&0===d&&l(!0),1===c.nodeType&&(h=c.childNodes[d],!h||"BR"!==h.nodeName||s(h,"A")||a(h)||a(h,!0)||l(!0,c.childNodes[d]))),t&&!o&&3===c.nodeType&&d===c.nodeValue.length&&l(!1),i&&r["set"+(t?"Start":"End")](c,d)}var n=this,r,i,o;d||(r=n.getRng(),o=r.collapsed,t(!0),o||t(),i&&(o&&r.collapse(!0),n.setRng(r,n.isForward())))},selectorChanged:function(e,t){var n=this,r;return n.selectorChangedData||(n.selectorChangedData={},r={},n.editor.on("NodeChange",function(e){var t=e.element,i=n.dom,o=i.getParents(t,null,i.getRoot()),a={};s(n.selectorChangedData,function(e,t){s(o,function(n){return i.is(n,t)?(r[t]||(s(e,function(e){e(!0,{node:n,selector:t,parents:o})}),r[t]=e),a[t]=e,!1):void 0})}),s(r,function(e,n){a[n]||(delete r[n],s(e,function(e){e(!1,{node:t,selector:n,parents:o})}))})})),n.selectorChangedData[e]||(n.selectorChangedData[e]=[]),n.selectorChangedData[e].push(t),n},scrollIntoView:function(e){var t,n,r=this,i=r.dom;n=i.getViewPort(r.editor.getWin()),t=i.getPos(e).y,(t<n.y||t+25>n.y+n.h)&&r.editor.getWin().scrollTo(0,t<n.y?t:t-n.h+25)},destroy:function(){this.win=null,this.controlSelection.destroy()}},a}),r(A,[f],function(e){function t(e){this.walk=function(t,r){function i(e){var t;return t=e[0],3===t.nodeType&&t===l&&c>=t.nodeValue.length&&e.splice(0,1),t=e[e.length-1],0===u&&e.length>0&&t===d&&3===t.nodeType&&e.splice(e.length-1,1),e}function o(e,t,n){for(var r=[];e&&e!=n;e=e[t])r.push(e);return r}function a(e,t){do{if(e.parentNode==t)return e;e=e.parentNode}while(e)}function s(e,t,n){var a=n?"nextSibling":"previousSibling";for(m=e,g=m.parentNode;m&&m!=t;m=g)g=m.parentNode,v=o(m==e?m:m[a],a),v.length&&(n||v.reverse(),r(i(v)))}var l=t.startContainer,c=t.startOffset,d=t.endContainer,u=t.endOffset,f,p,h,m,g,v,y;if(y=e.select("td.mce-item-selected,th.mce-item-selected"),y.length>0)return n(y,function(e){r([e])}),void 0;if(1==l.nodeType&&l.hasChildNodes()&&(l=l.childNodes[c]),1==d.nodeType&&d.hasChildNodes()&&(d=d.childNodes[Math.min(u-1,d.childNodes.length-1)]),l==d)return r(i([l]));for(f=e.findCommonAncestor(l,d),m=l;m;m=m.parentNode){if(m===d)return s(l,f,!0);if(m===f)break}for(m=d;m;m=m.parentNode){if(m===l)return s(d,f);if(m===f)break}p=a(l,f)||l,h=a(d,f)||d,s(l,p,!0),v=o(p==l?p:p.nextSibling,"nextSibling",h==d?h.nextSibling:h),v.length&&r(i(v)),s(d,h)},this.split=function(e){function t(e,t){return e.splitText(t)}var n=e.startContainer,r=e.startOffset,i=e.endContainer,o=e.endOffset;return n==i&&3==n.nodeType?r>0&&r<n.nodeValue.length&&(i=t(n,r),n=i.previousSibling,o>r?(o-=r,n=i=t(i,o).previousSibling,o=i.nodeValue.length,r=0):o=0):(3==n.nodeType&&r>0&&r<n.nodeValue.length&&(n=t(n,r),r=0),3==i.nodeType&&o>0&&o<i.nodeValue.length&&(i=t(i,o).previousSibling,o=i.nodeValue.length)),{startContainer:n,startOffset:r,endContainer:i,endOffset:o}}}var n=e.each;return t.compareRanges=function(e,t){if(e&&t){if(!e.item&&!e.duplicate)return e.startContainer==t.startContainer&&e.startOffset==t.startOffset;if(e.item&&t.item&&e.item(0)===t.item(0))return!0;if(e.isEqual&&t.isEqual&&t.isEqual(e))return!0}return!1},t}),r(B,[u,A,f],function(e,t,n){return function(r){function i(e){return e.nodeType&&(e=e.nodeName),!!r.schema.getTextBlockElements()[e.toLowerCase()]}function o(e,t){return I.getParents(e,t,I.getRoot())}function a(e){return 1===e.nodeType&&"_mce_caret"===e.id}function s(){d({alignleft:[{selector:"figure,p,h1,h2,h3,h4,h5,h6,td,th,tr,div,ul,ol,li",styles:{textAlign:"left"},defaultBlock:"div"},{selector:"img,table",collapsed:!1,styles:{"float":"left"}}],aligncenter:[{selector:"figure,p,h1,h2,h3,h4,h5,h6,td,th,tr,div,ul,ol,li",styles:{textAlign:"center"},defaultBlock:"div"},{selector:"img",collapsed:!1,styles:{display:"block",marginLeft:"auto",marginRight:"auto"}},{selector:"table",collapsed:!1,styles:{marginLeft:"auto",marginRight:"auto"}}],alignright:[{selector:"figure,p,h1,h2,h3,h4,h5,h6,td,th,tr,div,ul,ol,li",styles:{textAlign:"right"},defaultBlock:"div"},{selector:"img,table",collapsed:!1,styles:{"float":"right"}}],alignjustify:[{selector:"figure,p,h1,h2,h3,h4,h5,h6,td,th,tr,div,ul,ol,li",styles:{textAlign:"justify"},defaultBlock:"div"}],bold:[{inline:"strong",remove:"all"},{inline:"span",styles:{fontWeight:"bold"}},{inline:"b",remove:"all"}],italic:[{inline:"em",remove:"all"},{inline:"span",styles:{fontStyle:"italic"}},{inline:"i",remove:"all"}],underline:[{inline:"span",styles:{textDecoration:"underline"},exact:!0},{inline:"u",remove:"all"}],strikethrough:[{inline:"span",styles:{textDecoration:"line-through"},exact:!0},{inline:"strike",remove:"all"}],forecolor:{inline:"span",styles:{color:"%value"},wrap_links:!1},hilitecolor:{inline:"span",styles:{backgroundColor:"%value"},wrap_links:!1},fontname:{inline:"span",styles:{fontFamily:"%value"}},fontsize:{inline:"span",styles:{fontSize:"%value"}},fontsize_class:{inline:"span",attributes:{"class":"%value"}},blockquote:{block:"blockquote",wrapper:1,remove:"all"},subscript:{inline:"sub"},superscript:{inline:"sup"},code:{inline:"code"},link:{inline:"a",selector:"a",remove:"all",split:!0,deep:!0,onmatch:function(){return!0},onformat:function(e,t,n){et(n,function(t,n){I.setAttrib(e,n,t)})}},removeformat:[{selector:"b,strong,em,i,font,u,strike",remove:"all",split:!0,expand:!1,block_expand:!0,deep:!0},{selector:"span",attributes:["style","class"],remove:"empty",split:!0,expand:!1,deep:!0},{selector:"*",attributes:["style","class"],split:!1,expand:!1,deep:!0}]}),et("p h1 h2 h3 h4 h5 h6 div address pre div dt dd samp".split(/\s/),function(e){d(e,{block:e,remove:"all"})}),d(r.settings.formats)}function l(){r.addShortcut("ctrl+b","bold_desc","Bold"),r.addShortcut("ctrl+i","italic_desc","Italic"),r.addShortcut("ctrl+u","underline_desc","Underline");for(var e=1;6>=e;e++)r.addShortcut("ctrl+"+e,"",["FormatBlock",!1,"h"+e]);r.addShortcut("ctrl+7","",["FormatBlock",!1,"p"]),r.addShortcut("ctrl+8","",["FormatBlock",!1,"div"]),r.addShortcut("ctrl+9","",["FormatBlock",!1,"address"])}function c(e){return e?O[e]:O}function d(e,t){e&&("string"!=typeof e?et(e,function(e,t){d(t,e)}):(t=t.length?t:[t],et(t,function(e){e.deep===X&&(e.deep=!e.selector),e.split===X&&(e.split=!e.selector||e.inline),e.remove===X&&e.selector&&!e.inline&&(e.remove="none"),e.selector&&e.inline&&(e.mixed=!0,e.block_expand=!0),"string"==typeof e.classes&&(e.classes=e.classes.split(/\s+/))}),O[e]=t))}function u(e){var t;return r.dom.getParent(e,function(e){return t=r.dom.getStyle(e,"text-decoration"),t&&"none"!==t}),t}function f(e){var t;1===e.nodeType&&e.parentNode&&1===e.parentNode.nodeType&&(t=u(e.parentNode),r.dom.getStyle(e,"color")&&t?r.dom.setStyle(e,"text-decoration",t):r.dom.getStyle(e,"textdecoration")===t&&r.dom.setStyle(e,"text-decoration",null))}function p(t,n,o){function s(e,t){t=t||m,e&&(t.onformat&&t.onformat(e,t,n,o),et(t.styles,function(t,r){I.setStyle(e,r,E(t,n))}),et(t.attributes,function(t,r){I.setAttrib(e,r,E(t,n))}),et(t.classes,function(t){t=E(t,n),I.hasClass(e,t)||I.addClass(e,t)}))}function l(){function t(t,n){var r=new e(n);for(o=r.current();o;o=r.prev())if(o.childNodes.length>1||o==t||"BR"==o.tagName)return o}var n=r.selection.getRng(),i=n.startContainer,a=n.endContainer;if(i!=a&&0===n.endOffset){var s=t(i,a),l=3==s.nodeType?s.length:s.childNodes.length;n.setEnd(s,l)}return n}function d(e,t,n,r,i){var o=[],a=-1,s,l=-1,c=-1,d;return et(e.childNodes,function(e,t){return"UL"===e.nodeName||"OL"===e.nodeName?(a=t,s=e,!1):void 0}),et(e.childNodes,function(e,n){"SPAN"===e.nodeName&&"bookmark"==I.getAttrib(e,"data-mce-type")&&(e.id==t.id+"_start"?l=n:e.id==t.id+"_end"&&(c=n))}),0>=a||a>l&&c>a?(et(tt(e.childNodes),i),0):(d=I.clone(n,K),et(tt(e.childNodes),function(e,t){(a>l&&a>t||l>a&&t>a)&&(o.push(e),e.parentNode.removeChild(e))
}),a>l?e.insertBefore(d,s):l>a&&e.insertBefore(d,s.nextSibling),r.push(d),et(o,function(e){d.appendChild(e)}),d)}function u(e,r,o){var l=[],c,u,f=!0;c=m.inline||m.block,u=I.create(c),s(u),W.walk(e,function(e){function p(e){var y,C,x,_,N;return N=f,y=e.nodeName.toLowerCase(),C=e.parentNode.nodeName.toLowerCase(),1===e.nodeType&&J(e)&&(N=f,f="true"===J(e),_=!0),w(y,"br")?(v=0,m.block&&I.remove(e),void 0):m.wrapper&&g(e,t,n)?(v=0,void 0):f&&!_&&m.block&&!m.wrapper&&i(y)&&z(C,c)?(e=I.rename(e,c),s(e),l.push(e),v=0,void 0):m.selector&&(et(h,function(t){"collapsed"in t&&t.collapsed!==b||I.is(e,t.selector)&&!a(e)&&(s(e,t),x=!0)}),!m.inline||x)?(v=0,void 0):(!f||_||!z(c,y)||!z(C,c)||!o&&3===e.nodeType&&1===e.nodeValue.length&&65279===e.nodeValue.charCodeAt(0)||a(e)||m.inline&&V(e)?"li"==y&&r?v=d(e,r,u,l,p):(v=0,et(tt(e.childNodes),p),_&&(f=N),v=0):(v||(v=I.clone(u,K),e.parentNode.insertBefore(v,e),l.push(v)),v.appendChild(e)),void 0)}var v;et(e,p)}),m.wrap_links===!1&&et(l,function(e){function t(e){var n,r,i;if("A"===e.nodeName){for(r=I.clone(u,K),l.push(r),i=tt(e.childNodes),n=0;n<i.length;n++)r.appendChild(i[n]);e.appendChild(r)}et(tt(e.childNodes),t)}t(e)}),et(l,function(e){function r(e){var t=0;return et(e.childNodes,function(e){k(e)||H(e)||t++}),t}function i(e){var t,n;return et(e.childNodes,function(e){return 1!=e.nodeType||H(e)||a(e)?void 0:(t=e,K)}),t&&x(t,m)&&(n=I.clone(t,K),s(n),I.replace(n,e,G),I.remove(t,1)),n||e}var o;if(o=r(e),(l.length>1||!V(e))&&0===o)return I.remove(e,1),void 0;if(m.inline||m.wrapper){if(m.exact||1!==o||(e=i(e)),et(h,function(t){et(I.select(t.inline,e),function(e){var r;if(t.wrap_links===!1){r=e.parentNode;do if("A"===r.nodeName)return;while(r=r.parentNode)}R(t,n,e,t.exact?e:null)})}),g(e.parentNode,t,n))return I.remove(e,1),e=0,G;m.merge_with_parents&&I.getParent(e.parentNode,function(r){return g(r,t,n)?(I.remove(e,1),e=0,G):void 0}),e&&m.merge_siblings!==!1&&(e=M(B(e),e),e=M(e,B(e,G)))}})}var h=c(t),m=h[0],v,y,b=!o&&F.isCollapsed();if(m)if(o)o.nodeType?(y=I.createRng(),y.setStartBefore(o),y.setEndAfter(o),u(T(y,h),null,!0)):u(o,null,!0);else if(b&&m.inline&&!I.select("td.mce-item-selected,th.mce-item-selected").length)D("apply",t,n);else{var C=r.selection.getNode();U||!h[0].defaultBlock||I.getParent(C,I.isBlock)||p(h[0].defaultBlock),r.selection.setRng(l()),v=F.getBookmark(),u(T(F.getRng(G),h),v),m.styles&&(m.styles.color||m.styles.textDecoration)&&(nt(C,f,"childNodes"),f(C)),F.moveToBookmark(v),P(F.getRng(G)),r.nodeChanged()}}function h(e,t,n){function i(e){var n,r,o,a,s;if(1===e.nodeType&&J(e)&&(a=b,b="true"===J(e),s=!0),n=tt(e.childNodes),b&&!s)for(r=0,o=p.length;o>r&&!R(p[r],t,e,e);r++);if(h.deep&&n.length){for(r=0,o=n.length;o>r;r++)i(n[r]);s&&(b=a)}}function a(n){var r;return et(o(n.parentNode).reverse(),function(n){var i;r||"_start"==n.id||"_end"==n.id||(i=g(n,e,t),i&&i.split!==!1&&(r=n))}),r}function s(e,n,r,i){var o,a,s,l,c,d;if(e){for(d=e.parentNode,o=n.parentNode;o&&o!=d;o=o.parentNode){for(a=I.clone(o,K),c=0;c<p.length;c++)if(R(p[c],t,a,a)){a=0;break}a&&(s&&a.appendChild(s),l||(l=a),s=a)}!i||h.mixed&&V(e)||(n=I.split(e,n)),s&&(r.parentNode.insertBefore(s,r),l.appendChild(r))}return n}function l(e){return s(a(e),e,e,!0)}function d(e){var t=I.get(e?"_start":"_end"),n=t[e?"firstChild":"lastChild"];return H(n)&&(n=n[e?"firstChild":"lastChild"]),I.remove(t,!0),n}function f(e){var t,n;e=T(e,p,G),h.split&&(t=L(e,G),n=L(e),t!=n?(/^(TR|TD)$/.test(t.nodeName)&&t.firstChild&&(t="TD"==t.nodeName?t.firstChild||t:t.firstChild.firstChild||t),t=S(t,"span",{id:"_start","data-mce-type":"bookmark"}),n=S(n,"span",{id:"_end","data-mce-type":"bookmark"}),l(t),l(n),t=d(G),n=d()):t=n=l(t),e.startContainer=t.parentNode,e.startOffset=q(t),e.endContainer=n.parentNode,e.endOffset=q(n)+1),W.walk(e,function(e){et(e,function(e){i(e),1===e.nodeType&&"underline"===r.dom.getStyle(e,"text-decoration")&&e.parentNode&&"underline"===u(e.parentNode)&&R({deep:!1,exact:!0,inline:"span",styles:{textDecoration:"underline"}},null,e)})})}var p=c(e),h=p[0],m,y,b=!0;return n?(n.nodeType?(y=I.createRng(),y.setStartBefore(n),y.setEndAfter(n),f(y)):f(n),void 0):(F.isCollapsed()&&h.inline&&!I.select("td.mce-item-selected,th.mce-item-selected").length?D("remove",e,t):(m=F.getBookmark(),f(F.getRng(G)),F.moveToBookmark(m),h.inline&&v(e,t,F.getStart())&&P(F.getRng(!0)),r.nodeChanged()),void 0)}function m(e,t,n){var r=c(e);!v(e,t,n)||"toggle"in r[0]&&!r[0].toggle?p(e,t,n):h(e,t,n)}function g(e,t,n,r){function i(e,t,i){var o,a,s=t[i],l;if(t.onmatch)return t.onmatch(e,t,i);if(s)if(s.length===X){for(o in s)if(s.hasOwnProperty(o)){if(a="attributes"===i?I.getAttrib(e,o):_(e,o),r&&!a&&!t.exact)return;if((!r||t.exact)&&!w(a,N(E(s[o],n),o)))return}}else for(l=0;l<s.length;l++)if("attributes"===i?I.getAttrib(e,s[l]):_(e,s[l]))return t;return t}var o=c(t),a,s,l;if(o&&e)for(s=0;s<o.length;s++)if(a=o[s],x(e,a)&&i(e,a,"attributes")&&i(e,a,"styles")){if(l=a.classes)for(s=0;s<l.length;s++)if(!I.hasClass(e,l[s]))return;return a}}function v(e,t,n){function r(n){return n=I.getParent(n,function(n){return!!g(n,e,t,!0)}),g(n,e,t)}var i;return n?r(n):(n=F.getNode(),r(n)?G:(i=F.getStart(),i!=n&&r(i)?G:K))}function y(e,t){var n,r=[],i={};return n=F.getStart(),I.getParent(n,function(n){var o,a;for(o=0;o<e.length;o++)a=e[o],!i[a]&&g(n,a,t)&&(i[a]=!0,r.push(a))},I.getRoot()),r}function b(e){var t=c(e),n,r,i,a,s;if(t)for(n=F.getStart(),r=o(n),a=t.length-1;a>=0;a--){if(s=t[a].selector,!s)return G;for(i=r.length-1;i>=0;i--)if(I.is(r[i],s))return G}return K}function C(e,t,n){var i;return Y||(Y={},i={},r.on("NodeChange",function(e){var t=o(e.element),n={};et(Y,function(e,r){et(t,function(o){return g(o,r,{},e.similar)?(i[r]||(et(e,function(e){e(!0,{node:o,format:r,parents:t})}),i[r]=e),n[r]=e,!1):void 0})}),et(i,function(r,o){n[o]||(delete i[o],et(r,function(n){n(!1,{node:e.element,format:o,parents:t})}))})})),et(e.split(","),function(e){Y[e]||(Y[e]=[],Y[e].similar=n),Y[e].push(t)}),this}function x(e,t){return w(e,t.inline)?G:w(e,t.block)?G:t.selector?1==e.nodeType&&I.is(e,t.selector):void 0}function w(e,t){return e=e||"",t=t||"",e=""+(e.nodeName||e),t=""+(t.nodeName||t),e.toLowerCase()==t.toLowerCase()}function _(e,t){return N(I.getStyle(e,t),t)}function N(e,t){return("color"==t||"backgroundColor"==t)&&(e=I.toHex(e)),"fontWeight"==t&&700==e&&(e="bold"),"fontFamily"==t&&(e=e.replace(/[\'\"]/g,"").replace(/,\s+/g,",")),""+e}function E(e,t){return"string"!=typeof e?e=e(t):t&&(e=e.replace(/%(\w+)/g,function(e,n){return t[n]||e})),e}function k(e){return e&&3===e.nodeType&&/^([\t \r\n]+|)$/.test(e.nodeValue)}function S(e,t,n){var r=I.create(t,n);return e.parentNode.insertBefore(r,e),r.appendChild(e),r}function T(t,n,a){function s(e){function t(e){return"BR"==e.nodeName&&e.getAttribute("data-mce-bogus")&&!e.nextSibling}var r,i,o,a,s;if(r=i=e?g:y,a=e?"previousSibling":"nextSibling",s=I.getRoot(),3==r.nodeType&&!k(r)&&(e?v>0:b<r.nodeValue.length))return r;for(;;){if(!n[0].block_expand&&V(i))return i;for(o=i[a];o;o=o[a])if(!H(o)&&!k(o)&&!t(o))return i;if(i.parentNode==s){r=i;break}i=i.parentNode}return r}function l(e,t){for(t===X&&(t=3===e.nodeType?e.length:e.childNodes.length);e&&e.hasChildNodes();)e=e.childNodes[t],e&&(t=3===e.nodeType?e.length:e.childNodes.length);return{node:e,offset:t}}function c(e){for(var t=e;t;){if(1===t.nodeType&&J(t))return"false"===J(t)?t:e;t=t.parentNode}return e}function d(t,n,i){function o(e,t){var n,r,o=e.nodeValue;return"undefined"==typeof t&&(t=i?o.length:0),i?(n=o.lastIndexOf(" ",t),r=o.lastIndexOf("\xa0",t),n=n>r?n:r,-1===n||a||n++):(n=o.indexOf(" ",t),r=o.indexOf("\xa0",t),n=-1!==n&&(-1===r||r>n)?n:r),n}var s,l,c,d;if(3===t.nodeType){if(c=o(t,n),-1!==c)return{container:t,offset:c};d=t}for(s=new e(t,I.getParent(t,V)||r.getBody());l=s[i?"prev":"next"]();)if(3===l.nodeType){if(d=l,c=o(l),-1!==c)return{container:l,offset:c}}else if(V(l))break;return d?(n=i?0:d.length,{container:d,offset:n}):void 0}function u(e,r){var i,a,s,l;for(3==e.nodeType&&0===e.nodeValue.length&&e[r]&&(e=e[r]),i=o(e),a=0;a<i.length;a++)for(s=0;s<n.length;s++)if(l=n[s],!("collapsed"in l&&l.collapsed!==t.collapsed)&&I.is(i[a],l.selector))return i[a];return e}function f(e,t){var r;if(n[0].wrapper||(r=I.getParent(e,n[0].block)),r||(r=I.getParent(3==e.nodeType?e.parentNode:e,i)),r&&n[0].wrapper&&(r=o(r,"ul,ol").reverse()[0]||r),!r)for(r=e;r[t]&&!V(r[t])&&(r=r[t],!w(r,"br")););return r||e}var p,h,m,g=t.startContainer,v=t.startOffset,y=t.endContainer,b=t.endOffset;if(1==g.nodeType&&g.hasChildNodes()&&(p=g.childNodes.length-1,g=g.childNodes[v>p?p:v],3==g.nodeType&&(v=0)),1==y.nodeType&&y.hasChildNodes()&&(p=y.childNodes.length-1,y=y.childNodes[b>p?p:b-1],3==y.nodeType&&(b=y.nodeValue.length)),g=c(g),y=c(y),(H(g.parentNode)||H(g))&&(g=H(g)?g:g.parentNode,g=g.nextSibling||g,3==g.nodeType&&(v=0)),(H(y.parentNode)||H(y))&&(y=H(y)?y:y.parentNode,y=y.previousSibling||y,3==y.nodeType&&(b=y.length)),n[0].inline&&(t.collapsed&&(m=d(g,v,!0),m&&(g=m.container,v=m.offset),m=d(y,b),m&&(y=m.container,b=m.offset)),h=l(y,b),h.node)){for(;h.node&&0===h.offset&&h.node.previousSibling;)h=l(h.node.previousSibling);h.node&&h.offset>0&&3===h.node.nodeType&&" "===h.node.nodeValue.charAt(h.offset-1)&&h.offset>1&&(y=h.node,y.splitText(h.offset-1))}return(n[0].inline||n[0].block_expand)&&(n[0].inline&&3==g.nodeType&&0!==v||(g=s(!0)),n[0].inline&&3==y.nodeType&&b!==y.nodeValue.length||(y=s())),n[0].selector&&n[0].expand!==K&&!n[0].inline&&(g=u(g,"previousSibling"),y=u(y,"nextSibling")),(n[0].block||n[0].selector)&&(g=f(g,"previousSibling"),y=f(y,"nextSibling"),n[0].block&&(V(g)||(g=s(!0)),V(y)||(y=s()))),1==g.nodeType&&(v=q(g),g=g.parentNode),1==y.nodeType&&(b=q(y)+1,y=y.parentNode),{startContainer:g,startOffset:v,endContainer:y,endOffset:b}}function R(e,t,n,r){var i,o,a;if(!x(n,e))return K;if("all"!=e.remove)for(et(e.styles,function(e,i){e=N(E(e,t),i),"number"==typeof i&&(i=e,r=0),(!r||w(_(r,i),e))&&I.setStyle(n,i,""),a=1}),a&&""===I.getAttrib(n,"style")&&(n.removeAttribute("style"),n.removeAttribute("data-mce-style")),et(e.attributes,function(e,i){var o;if(e=E(e,t),"number"==typeof i&&(i=e,r=0),!r||w(I.getAttrib(r,i),e)){if("class"==i&&(e=I.getAttrib(n,i),e&&(o="",et(e.split(/\s+/),function(e){/mce\w+/.test(e)&&(o+=(o?" ":"")+e)}),o)))return I.setAttrib(n,i,o),void 0;"class"==i&&n.removeAttribute("className"),$.test(i)&&n.removeAttribute("data-mce-"+i),n.removeAttribute(i)}}),et(e.classes,function(e){e=E(e,t),(!r||I.hasClass(r,e))&&I.removeClass(n,e)}),o=I.getAttribs(n),i=0;i<o.length;i++)if(0!==o[i].nodeName.indexOf("_"))return K;return"none"!=e.remove?(A(n,e),G):void 0}function A(e,t){function n(e,t,n){return e=B(e,t,n),!e||"BR"==e.nodeName||V(e)}var r=e.parentNode,i;t.block&&(U?r==I.getRoot()&&(t.list_block&&w(e,t.list_block)||et(tt(e.childNodes),function(e){z(U,e.nodeName.toLowerCase())?i?i.appendChild(e):i=S(e,U):i=0})):V(e)&&!V(r)&&(n(e,K)||n(e.firstChild,G,1)||e.insertBefore(I.create("br"),e.firstChild),n(e,G)||n(e.lastChild,K,1)||e.appendChild(I.create("br")))),t.selector&&t.inline&&!w(t.inline,e)||I.remove(e,1)}function B(e,t,n){if(e)for(t=t?"nextSibling":"previousSibling",e=n?e:e[t];e;e=e[t])if(1==e.nodeType||!k(e))return e}function H(e){return e&&1==e.nodeType&&"bookmark"==e.getAttribute("data-mce-type")}function M(e,t){function n(e,t){function n(e){var t={};return et(I.getAttribs(e),function(n){var r=n.nodeName.toLowerCase();0!==r.indexOf("_")&&"style"!==r&&(t[r]=I.getAttrib(e,r))}),t}function r(e,t){var n,r;for(r in e)if(e.hasOwnProperty(r)){if(n=t[r],n===X)return K;if(e[r]!=n)return K;delete t[r]}for(r in t)if(t.hasOwnProperty(r))return K;return G}return e.nodeName!=t.nodeName?K:r(n(e),n(t))?r(I.parseStyle(I.getAttrib(e,"style")),I.parseStyle(I.getAttrib(t,"style")))?G:K:K}function r(e,t){for(i=e;i;i=i[t]){if(3==i.nodeType&&0!==i.nodeValue.length)return e;if(1==i.nodeType&&!H(i))return i}return e}var i,o;if(e&&t&&(e=r(e,"previousSibling"),t=r(t,"nextSibling"),n(e,t))){for(i=e.nextSibling;i&&i!=t;)o=i,i=i.nextSibling,e.appendChild(o);return I.remove(t),et(tt(t.childNodes),function(t){e.appendChild(t)}),e}return t}function L(t,n){var i,o,a;return i=t[n?"startContainer":"endContainer"],o=t[n?"startOffset":"endOffset"],1==i.nodeType&&(a=i.childNodes.length-1,!n&&o&&o--,i=i.childNodes[o>a?a:o]),3===i.nodeType&&n&&o>=i.nodeValue.length&&(i=new e(i,r.getBody()).next()||i),3!==i.nodeType||n||0!==o||(i=new e(i,r.getBody()).prev()||i),i}function D(t,n,o){function a(e){var t=I.create("span",{id:y,"data-mce-bogus":!0,style:b?"color:red":""});return e&&t.appendChild(r.getDoc().createTextNode(j)),t}function s(e,t){for(;e;){if(3===e.nodeType&&e.nodeValue!==j||e.childNodes.length>1)return!1;t&&1===e.nodeType&&t.push(e),e=e.firstChild}return!0}function l(e){for(;e;){if(e.id===y)return e;e=e.parentNode}}function d(t){var n;if(t)for(n=new e(t,t),t=n.current();t;t=n.next())if(3===t.nodeType)return t}function u(e,t){var n,r;if(e)r=F.getRng(!0),s(e)?(t!==!1&&(r.setStartBefore(e),r.setEndBefore(e)),I.remove(e)):(n=d(e),n.nodeValue.charAt(0)===j&&(n=n.deleteData(0,1)),I.remove(e,1)),F.setRng(r);else if(e=l(F.getStart()),!e)for(;e=I.get(y);)u(e,!1)}function f(){var e,t,r,i,s,u,f;e=F.getRng(!0),i=e.startOffset,u=e.startContainer,f=u.nodeValue,t=l(F.getStart()),t&&(r=d(t)),f&&i>0&&i<f.length&&/\w/.test(f.charAt(i))&&/\w/.test(f.charAt(i-1))?(s=F.getBookmark(),e.collapse(!0),e=T(e,c(n)),e=W.split(e),p(n,o,e),F.moveToBookmark(s)):(t&&r.nodeValue===j?p(n,o,t):(t=a(!0),r=t.firstChild,e.insertNode(t),i=1,p(n,o,t)),F.setCursorLocation(r,i))}function m(){var e=F.getRng(!0),t,r,s,l,d,u,f=[],p,m;for(t=e.startContainer,r=e.startOffset,d=t,3==t.nodeType&&((r!=t.nodeValue.length||t.nodeValue===j)&&(l=!0),d=d.parentNode);d;){if(g(d,n,o)){u=d;break}d.nextSibling&&(l=!0),f.push(d),d=d.parentNode}if(u)if(l)s=F.getBookmark(),e.collapse(!0),e=T(e,c(n),!0),e=W.split(e),h(n,o,e),F.moveToBookmark(s);else{for(m=a(),d=m,p=f.length-1;p>=0;p--)d.appendChild(I.clone(f[p],!1)),d=d.firstChild;d.appendChild(I.doc.createTextNode(j)),d=d.firstChild;var v=I.getParent(u,i);v&&I.isEmpty(v)?u.parentNode.replaceChild(m,u):I.insertAfter(m,u),F.setCursorLocation(d,1)}}function v(){var e;e=l(F.getStart()),e&&!I.isEmpty(e)&&nt(e,function(e){1!=e.nodeType||e.id===y||I.isEmpty(e)||I.setAttrib(e,"data-mce-bogus",null)},"childNodes")}var y="_mce_caret",b=r.settings.caret_debug;r._hasCaretEvents||(Z=function(){var e=[],t;if(s(l(F.getStart()),e))for(t=e.length;t--;)I.setAttrib(e[t],"data-mce-bogus","1")},Q=function(e){var t=e.keyCode;u(),(8==t||37==t||39==t)&&u(l(F.getStart())),v()},r.on("SetContent",function(e){e.selection&&v()}),r._hasCaretEvents=!0),"apply"==t?f():m()}function P(t){var n=t.startContainer,r=t.startOffset,i,o,a,s,l;if(3==n.nodeType&&r>=n.nodeValue.length&&(r=q(n),n=n.parentNode,i=!0),1==n.nodeType)for(s=n.childNodes,n=s[Math.min(r,s.length-1)],o=new e(n,I.getParent(n,I.isBlock)),(r>s.length-1||i)&&o.next(),a=o.current();a;a=o.next())if(3==a.nodeType&&!k(a))return l=I.create("a",null,j),a.parentNode.insertBefore(l,a),t.setStart(a,0),F.setRng(t),I.remove(l),void 0}var O={},I=r.dom,F=r.selection,W=new t(I),z=r.schema.isValidChild,V=I.isBlock,U=r.settings.forced_root_block,q=I.nodeIndex,j="\ufeff",$=/^(src|href|style)$/,K=!1,G=!0,Y,X,J=I.getContentEditable,Q,Z,et=n.each,tt=n.grep,nt=n.walk,rt=n.extend;rt(this,{get:c,register:d,apply:p,remove:h,toggle:m,match:v,matchAll:y,matchNode:g,canApply:b,formatChanged:C}),s(),l(),r.on("BeforeGetContent",function(){Z&&Z()}),r.on("mouseup keydown",function(e){Q&&Q(e)})}}),r(H,[m,f],function(e,t){var n=t.trim,r;return r=new RegExp(["<span[^>]+data-mce-bogus[^>]+>[\u200b\ufeff]+<\\/span>","<div[^>]+data-mce-bogus[^>]+><\\/div>",'\\s?data-mce-selected="[^"]+"'].join("|"),"gi"),function(t){function i(){return n(t.getContent({format:"raw",no_events:1}).replace(r,""))}function o(){a.typing=!1,a.add()}var a,s=0,l=[],c,d;return t.on("init",function(){a.add()}),t.on("BeforeExecCommand",function(e){var t=e.command;"Undo"!=t&&"Redo"!=t&&"mceRepaint"!=t&&a.beforeChange()}),t.on("ExecCommand",function(e){var t=e.command;"Undo"!=t&&"Redo"!=t&&"mceRepaint"!=t&&a.add()}),t.on("ObjectResizeStart",function(){a.beforeChange()}),t.on("SaveContent ObjectResized",o),t.dom.bind(t.dom.getRoot(),"dragend",o),t.dom.bind(t.getBody(),"focusout",function(){!t.removed&&a.typing&&o()}),t.on("KeyUp",function(n){var r=n.keyCode;(r>=33&&36>=r||r>=37&&40>=r||45==r||13==r||n.ctrlKey)&&(o(),t.nodeChanged()),(46==r||8==r||e.mac&&(91==r||93==r))&&t.nodeChanged(),d&&a.typing&&(t.isDirty()||(t.isNotDirty=!l[0]||i()==l[0].content),t.fire("TypingUndo"),d=!1,t.nodeChanged())}),t.on("KeyDown",function(e){var t=e.keyCode;return t>=33&&36>=t||t>=37&&40>=t||45==t?(a.typing&&o(),void 0):((16>t||t>20)&&224!=t&&91!=t&&!a.typing&&(a.beforeChange(),a.typing=!0,a.add(),d=!0),void 0)}),t.on("MouseDown",function(){a.typing&&o()}),t.addShortcut("ctrl+z","","Undo"),t.addShortcut("ctrl+y,ctrl+shift+z","","Redo"),t.on("AddUndo Undo Redo ClearUndos MouseUp",function(e){e.isDefaultPrevented()||t.nodeChanged()}),a={data:l,typing:!1,beforeChange:function(){c=t.selection.getBookmark(2,!0)},add:function(e){var n,r=t.settings,o;if(e=e||{},e.content=i(),t.fire("BeforeAddUndo",{level:e}).isDefaultPrevented())return null;if(o=l[s],o&&o.content==e.content)return null;if(l[s]&&(l[s].beforeBookmark=c),r.custom_undo_redo_levels&&l.length>r.custom_undo_redo_levels){for(n=0;n<l.length-1;n++)l[n]=l[n+1];l.length--,s=l.length}e.bookmark=t.selection.getBookmark(2,!0),s<l.length-1&&(l.length=s+1),l.push(e),s=l.length-1;var a={level:e,lastLevel:o};return t.fire("AddUndo",a),s>0&&(t.fire("change",a),t.isNotDirty=!1),e},undo:function(){var e;return a.typing&&(a.add(),a.typing=!1),s>0&&(e=l[--s],t.setContent(e.content,{format:"raw"}),t.selection.moveToBookmark(e.beforeBookmark),t.fire("undo",{level:e})),e},redo:function(){var e;return s<l.length-1&&(e=l[++s],t.setContent(e.content,{format:"raw"}),t.selection.moveToBookmark(e.bookmark),t.fire("redo",{level:e})),e},clear:function(){l=[],s=0,a.typing=!1,t.fire("ClearUndos")},hasUndo:function(){return s>0||a.typing&&l[0]&&i()!=l[0].content},hasRedo:function(){return s<l.length-1&&!this.typing},transact:function(e){a.beforeChange(),e(),a.add()}}}}),r(M,[u,m],function(e,t){var n=t.ie;return function(t){function r(r){function d(e){return e&&i.isBlock(e)&&!/^(TD|TH|CAPTION|FORM)$/.test(e.nodeName)&&!/^(fixed|absolute)/i.test(e.style.position)&&"true"!==i.getContentEditable(e)}function u(e){var t;i.isBlock(e)&&(t=o.getRng(),e.appendChild(i.create("span",null,"\xa0")),o.select(e),e.lastChild.outerHTML="",o.setRng(t))}function f(e){for(var t=e,n=[],r;t=t.firstChild;){if(i.isBlock(t))return;1!=t.nodeType||c[t.nodeName.toLowerCase()]||n.push(t)}for(r=n.length;r--;)t=n[r],!t.hasChildNodes()||t.firstChild==t.lastChild&&""===t.firstChild.nodeValue?i.remove(t):"A"==t.nodeName&&" "===(t.innerText||t.textContent)&&i.remove(t)}function p(t){var n,r,a,s=t,l;if(a=i.createRng(),t.hasChildNodes()){for(n=new e(t,t);r=n.current();){if(3==r.nodeType){a.setStart(r,0),a.setEnd(r,0);break}if(c[r.nodeName.toLowerCase()]){a.setStartBefore(r),a.setEndBefore(r);break}s=r,r=n.next()}r||(a.setStart(s,0),a.setEnd(s,0))}else"BR"==t.nodeName?t.nextSibling&&i.isBlock(t.nextSibling)?((!R||9>R)&&(l=i.create("br"),t.parentNode.insertBefore(l,t)),a.setStartBefore(t),a.setEndBefore(t)):(a.setStartAfter(t),a.setEndAfter(t)):(a.setStart(t,0),a.setEnd(t,0));o.setRng(a),i.remove(l),o.scrollIntoView(t)}function h(e){var t=k,r,o,s;if(r=e||"TABLE"==L?i.create(e||P):T.cloneNode(!1),s=r,a.keep_styles!==!1)do if(/^(SPAN|STRONG|B|EM|I|FONT|STRIKE|U)$/.test(t.nodeName)){if("_mce_caret"==t.id)continue;o=t.cloneNode(!1),i.setAttrib(o,"id",""),r.hasChildNodes()?(o.appendChild(r.firstChild),r.appendChild(o)):(s=o,r.appendChild(o))}while(t=t.parentNode);return n||(s.innerHTML='<br data-mce-bogus="1">'),r}function m(t){var n,r,i;if(3==k.nodeType&&(t?S>0:S<k.nodeValue.length))return!1;if(k.parentNode==T&&O&&!t)return!0;if(t&&1==k.nodeType&&k==T.firstChild)return!0;if("TABLE"===k.nodeName||k.previousSibling&&"TABLE"==k.previousSibling.nodeName)return O&&!t||!O&&t;for(n=new e(k,T),3==k.nodeType&&(t&&0===S?n.prev():t||S!=k.nodeValue.length||n.next());r=n.current();){if(1===r.nodeType){if(!r.getAttribute("data-mce-bogus")&&(i=r.nodeName.toLowerCase(),c[i]&&"br"!==i))return!1}else if(3===r.nodeType&&!/^[ \t\r\n]*$/.test(r.nodeValue))return!1;t?n.prev():n.next()}return!0}function g(e,n){var r,o,a,s,c,u,f=P||"P";if(o=i.getParent(e,i.isBlock),u=t.getBody().nodeName.toLowerCase(),!o||!d(o)){if(o=o||E,!o.hasChildNodes())return r=i.create(f),o.appendChild(r),_.setStart(r,0),_.setEnd(r,0),r;for(s=e;s.parentNode!=o;)s=s.parentNode;for(;s&&!i.isBlock(s);)a=s,s=s.previousSibling;if(a&&l.isValidChild(u,f.toLowerCase())){for(r=i.create(f),a.parentNode.insertBefore(r,a),s=a;s&&!i.isBlock(s);)c=s.nextSibling,r.appendChild(s),s=c;_.setStart(e,n),_.setEnd(e,n)}}return e}function v(){function e(e){for(var t=M[e?"firstChild":"lastChild"];t&&1!=t.nodeType;)t=t[e?"nextSibling":"previousSibling"];return t===T}function t(){var e=M.parentNode;return"LI"==e.nodeName?e:M}var n=M.parentNode.nodeName;/^(OL|UL|LI)$/.test(n)&&(P="LI"),B=P?h(P):i.create("BR"),e(!0)&&e()?"LI"==n?i.insertAfter(B,t()):i.replace(B,M):e(!0)?"LI"==n?(i.insertAfter(B,t()),B.appendChild(i.doc.createTextNode(" ")),B.appendChild(M)):M.parentNode.insertBefore(B,M):e()?(i.insertAfter(B,t()),u(B)):(M=t(),N=_.cloneRange(),N.setStartAfter(T),N.setEndAfter(M),H=N.extractContents(),i.insertAfter(H,M),i.insertAfter(B,M)),i.remove(T),p(B),s.add()}function y(){for(var t=new e(k,T),n;n=t.next();)if(c[n.nodeName.toLowerCase()]||n.length>0)return!0}function b(){var e,t,r;k&&3==k.nodeType&&S>=k.nodeValue.length&&(n||y()||(e=i.create("br"),_.insertNode(e),_.setStartAfter(e),_.setEndAfter(e),t=!0)),e=i.create("br"),_.insertNode(e),n&&"PRE"==L&&(!R||8>R)&&e.parentNode.insertBefore(i.doc.createTextNode("\r"),e),r=i.create("span",{},"&nbsp;"),e.parentNode.insertBefore(r,e),o.scrollIntoView(r),i.remove(r),t?(_.setStartBefore(e),_.setEndBefore(e)):(_.setStartAfter(e),_.setEndAfter(e)),o.setRng(_),s.add()}function C(e){do 3===e.nodeType&&(e.nodeValue=e.nodeValue.replace(/^[\r\n]+/,"")),e=e.firstChild;while(e)}function x(e){var t=i.getRoot(),n,r;for(n=e;n!==t&&"false"!==i.getContentEditable(n);)"true"===i.getContentEditable(n)&&(r=n),n=n.parentNode;return n!==t?r:t}function w(e){var t;n||(e.normalize(),t=e.lastChild,(!t||/^(left|right)$/gi.test(i.getStyle(t,"float",!0)))&&i.add(e,"br"))}var _=o.getRng(!0),N,E,k,S,T,R,A,B,H,M,L,D,P,O;if(!_.collapsed)return t.execCommand("Delete"),void 0;if(!r.isDefaultPrevented()&&(k=_.startContainer,S=_.startOffset,P=(a.force_p_newlines?"p":"")||a.forced_root_block,P=P?P.toUpperCase():"",R=i.doc.documentMode,A=r.shiftKey,1==k.nodeType&&k.hasChildNodes()&&(O=S>k.childNodes.length-1,k=k.childNodes[Math.min(S,k.childNodes.length-1)]||k,S=O&&3==k.nodeType?k.nodeValue.length:0),E=x(k))){if(s.beforeChange(),!i.isBlock(E)&&E!=i.getRoot())return(!P||A)&&b(),void 0;if((P&&!A||!P&&A)&&(k=g(k,S)),T=i.getParent(k,i.isBlock),M=T?i.getParent(T.parentNode,i.isBlock):null,L=T?T.nodeName.toUpperCase():"",D=M?M.nodeName.toUpperCase():"","LI"!=D||r.ctrlKey||(T=M,L=D),"LI"==L){if(!P&&A)return b(),void 0;if(i.isEmpty(T))return v(),void 0}if("PRE"==L&&a.br_in_pre!==!1){if(!A)return b(),void 0}else if(!P&&!A&&"LI"!=L||P&&A)return b(),void 0;P&&T===t.getBody()||(P=P||"P",m()?(B=/^(H[1-6]|PRE|FIGURE)$/.test(L)&&"HGROUP"!=D?h(P):h(),a.end_container_on_empty_block&&d(M)&&i.isEmpty(T)?B=i.split(M,T):i.insertAfter(B,T),p(B)):m(!0)?(B=T.parentNode.insertBefore(h(),T),u(B)):(N=_.cloneRange(),N.setEndAfter(T),H=N.extractContents(),C(H),B=H.firstChild,i.insertAfter(H,T),f(B),w(T),p(B)),i.setAttrib(B,"id",""),s.add())}}var i=t.dom,o=t.selection,a=t.settings,s=t.undoManager,l=t.schema,c=l.getNonEmptyElements();t.on("keydown",function(e){13==e.keyCode&&r(e)!==!1&&e.preventDefault()})}}),r(L,[],function(){return function(e){function t(){var t=i.getStart(),s=e.getBody(),l,c,d,u,f,p,h,m=-16777215,g,v,y,b,C;if(C=n.forced_root_block,t&&1===t.nodeType&&C){for(;t&&t!=s;){if(a[t.nodeName])return;t=t.parentNode}if(l=i.getRng(),l.setStart){c=l.startContainer,d=l.startOffset,u=l.endContainer,f=l.endOffset;try{v=e.getDoc().activeElement===s}catch(x){}}else l.item&&(t=l.item(0),l=e.getDoc().body.createTextRange(),l.moveToElementText(t)),v=l.parentElement().ownerDocument===e.getDoc(),y=l.duplicate(),y.collapse(!0),d=-1*y.move("character",m),y.collapsed||(y=l.duplicate(),y.collapse(!1),f=-1*y.move("character",m)-d);for(t=s.firstChild,b=s.nodeName.toLowerCase();t;)if((3===t.nodeType||1==t.nodeType&&!a[t.nodeName])&&o.isValidChild(b,C.toLowerCase())){if(3===t.nodeType&&0===t.nodeValue.length){h=t,t=t.nextSibling,r.remove(h);continue}p||(p=r.create(C),t.parentNode.insertBefore(p,t),g=!0),h=t,t=t.nextSibling,p.appendChild(h)}else p=null,t=t.nextSibling;if(g&&v){if(l.setStart)l.setStart(c,d),l.setEnd(u,f),i.setRng(l);else try{l=e.getDoc().body.createTextRange(),l.moveToElementText(s),l.collapse(!0),l.moveStart("character",d),f>0&&l.moveEnd("character",f),l.select()}catch(x){}e.nodeChanged()}}}var n=e.settings,r=e.dom,i=e.selection,o=e.schema,a=o.getBlockElements();n.forced_root_block&&e.on("KeyUp NodeChange",t)}}),r(D,[N,m,f],function(e,n,r){var i=r.each,o=r.extend,a=r.map,s=r.inArray,l=r.explode,c=n.gecko,d=n.ie,u=!0,f=!1;return function(n){function r(e,t,n){var r;return e=e.toLowerCase(),(r=_.exec[e])?(r(e,t,n),u):f}function p(e){var t;return e=e.toLowerCase(),(t=_.state[e])?t(e):-1}function h(e){var t;return e=e.toLowerCase(),(t=_.value[e])?t(e):f}function m(e,t){t=t||"exec",i(e,function(e,n){i(n.toLowerCase().split(","),function(n){_[t][n]=e})})}function g(e,r,i){return r===t&&(r=f),i===t&&(i=null),n.getDoc().execCommand(e,r,i)}function v(e){return E.match(e)}function y(e,r){E.toggle(e,r?{value:r}:t),n.nodeChanged()}function b(e){k=w.getBookmark(e)}function C(){w.moveToBookmark(k)}var x=n.dom,w=n.selection,_={state:{},exec:{},value:{}},N=n.settings,E=n.formatter,k;o(this,{execCommand:r,queryCommandState:p,queryCommandValue:h,addCommands:m}),m({"mceResetDesignMode,mceBeginUndoLevel":function(){},"mceEndUndoLevel,mceAddUndoLevel":function(){n.undoManager.add()},"Cut,Copy,Paste":function(e){var t=n.getDoc(),r;try{g(e)}catch(i){r=u}(r||!t.queryCommandSupported(e))&&n.windowManager.alert("Your browser doesn't support direct access to the clipboard. Please use the Ctrl+X/C/V keyboard shortcuts instead.")},unlink:function(e){w.isCollapsed()&&w.select(w.getNode()),g(e),w.collapse(f)},"JustifyLeft,JustifyCenter,JustifyRight,JustifyFull":function(e){var t=e.substring(7);"full"==t&&(t="justify"),i("left,center,right,justify".split(","),function(e){t!=e&&E.remove("align"+e)}),y("align"+t),r("mceRepaint")},"InsertUnorderedList,InsertOrderedList":function(e){var t,n;g(e),t=x.getParent(w.getNode(),"ol,ul"),t&&(n=t.parentNode,/^(H[1-6]|P|ADDRESS|PRE)$/.test(n.nodeName)&&(b(),x.split(n,t),C()))},"Bold,Italic,Underline,Strikethrough,Superscript,Subscript":function(e){y(e)},"ForeColor,HiliteColor,FontName":function(e,t,n){y(e,n)},FontSize:function(e,t,n){var r,i;n>=1&&7>=n&&(i=l(N.font_size_style_values),r=l(N.font_size_classes),n=r?r[n-1]||n:i[n-1]||n),y(e,n)},RemoveFormat:function(e){E.remove(e)},mceBlockQuote:function(){y("blockquote")},FormatBlock:function(e,t,n){return y(n||"p")},mceCleanup:function(){var e=w.getBookmark();n.setContent(n.getContent({cleanup:u}),{cleanup:u}),w.moveToBookmark(e)},mceRemoveNode:function(e,t,r){var i=r||w.getNode();i!=n.getBody()&&(b(),n.dom.remove(i,u),C())},mceSelectNodeDepth:function(e,t,r){var i=0;x.getParent(w.getNode(),function(e){return 1==e.nodeType&&i++==r?(w.select(e),f):void 0},n.getBody())},mceSelectNode:function(e,t,n){w.select(n)},mceInsertContent:function(t,r,i){function o(e){function t(e){return r[e]&&3==r[e].nodeType}var n,r,i;return n=w.getRng(!0),r=n.startContainer,i=n.startOffset,3==r.nodeType&&(i>0?e=e.replace(/^&nbsp;/," "):t("previousSibling")||(e=e.replace(/^ /,"&nbsp;")),i<r.length?e=e.replace(/&nbsp;(<br>|)$/," "):t("nextSibling")||(e=e.replace(/(&nbsp;| )(<br>|)$/,"&nbsp;"))),e}var a,s,l,c,u,f,p,h,m,g,v,y,b,C;if(/^ | $/.test(i)&&(i=o(i)),a=n.parser,s=new e({},n.schema),b='<span id="mce_marker" data-mce-type="bookmark">&#xFEFF;</span>',f={content:i,format:"html",selection:!0},n.fire("BeforeSetContent",f),i=f.content,-1==i.indexOf("{$caret}")&&(i+="{$caret}"),i=i.replace(/\{\$caret\}/,b),w.isCollapsed()||n.getDoc().execCommand("Delete",!1,null),l=w.getNode(),f={context:l.nodeName.toLowerCase()},u=a.parse(i,f),v=u.lastChild,"mce_marker"==v.attr("id"))for(p=v,v=v.prev;v;v=v.walk(!0))if(3==v.type||!x.isBlock(v.name)){v.parent.insert(p,v,"br"===v.name);break}if(f.invalid){for(w.setContent(b),l=w.getNode(),c=n.getBody(),9==l.nodeType?l=v=c:v=l;v!==c;)l=v,v=v.parentNode;i=l==c?c.innerHTML:x.getOuterHTML(l),i=s.serialize(a.parse(i.replace(/<span (id="mce_marker"|id=mce_marker).+?<\/span>/i,function(){return s.serialize(u)}))),l==c?x.setHTML(c,i):x.setOuterHTML(l,i)}else i=s.serialize(u),v=l.firstChild,y=l.lastChild,!v||v===y&&"BR"===v.nodeName?x.setHTML(l,i):w.setContent(i);p=x.get("mce_marker"),h=x.getRect(p),m=x.getViewPort(n.getWin()),(h.y+h.h>m.y+m.h||h.y<m.y||h.x>m.x+m.w||h.x<m.x)&&(C=d?n.getDoc().documentElement:n.getBody(),C.scrollLeft=h.x,C.scrollTop=h.y-m.h+25),g=x.createRng(),v=p.previousSibling,v&&3==v.nodeType?(g.setStart(v,v.nodeValue.length),d||(y=p.nextSibling,y&&3==y.nodeType&&(v.appendData(y.data),y.parentNode.removeChild(y)))):(g.setStartBefore(p),g.setEndBefore(p)),x.remove(p),w.setRng(g),n.fire("SetContent",f),n.addVisual()},mceInsertRawHTML:function(e,t,r){w.setContent("tiny_mce_marker"),n.setContent(n.getContent().replace(/tiny_mce_marker/g,function(){return r}))},mceToggleFormat:function(e,t,n){y(n)},mceSetContent:function(e,t,r){n.setContent(r)},"Indent,Outdent":function(e){var t,n,r;t=N.indentation,n=/[a-z%]+$/i.exec(t),t=parseInt(t,10),p("InsertUnorderedList")||p("InsertOrderedList")?g(e):(N.forced_root_block||x.getParent(w.getNode(),x.isBlock)||E.apply("div"),i(w.getSelectedBlocks(),function(i){var o;"LI"!=i.nodeName&&(o="rtl"==x.getStyle(i,"direction",!0)?"paddingRight":"paddingLeft","outdent"==e?(r=Math.max(0,parseInt(i.style[o]||0,10)-t),x.setStyle(i,o,r?r+n:"")):(r=parseInt(i.style[o]||0,10)+t+n,x.setStyle(i,o,r)))}))},mceRepaint:function(){if(c)try{b(u),w.getSel()&&w.getSel().selectAllChildren(n.getBody()),w.collapse(u),C()}catch(e){}},InsertHorizontalRule:function(){n.execCommand("mceInsertContent",!1,"<hr />")},mceToggleVisualAid:function(){n.hasVisual=!n.hasVisual,n.addVisual()},mceReplaceContent:function(e,t,r){n.execCommand("mceInsertContent",!1,r.replace(/\{\$selection\}/g,w.getContent({format:"text"})))},mceInsertLink:function(e,t,n){var r;"string"==typeof n&&(n={href:n}),r=x.getParent(w.getNode(),"a"),n.href=n.href.replace(" ","%20"),r&&n.href||E.remove("link"),n.href&&E.apply("link",n,r)},selectAll:function(){var e=x.getRoot(),t=x.createRng();w.getRng().setStart?(t.setStart(e,0),t.setEnd(e,e.childNodes.length),w.setRng(t)):g("SelectAll")},mceNewDocument:function(){n.setContent("")}}),m({"JustifyLeft,JustifyCenter,JustifyRight,JustifyFull":function(e){var t="align"+e.substring(7),n=w.isCollapsed()?[x.getParent(w.getNode(),x.isBlock)]:w.getSelectedBlocks(),r=a(n,function(e){return!!E.matchNode(e,t)});return-1!==s(r,u)},"Bold,Italic,Underline,Strikethrough,Superscript,Subscript":function(e){return v(e)},mceBlockQuote:function(){return v("blockquote")},Outdent:function(){var e;if(N.inline_styles){if((e=x.getParent(w.getStart(),x.isBlock))&&parseInt(e.style.paddingLeft,10)>0)return u;if((e=x.getParent(w.getEnd(),x.isBlock))&&parseInt(e.style.paddingLeft,10)>0)return u}return p("InsertUnorderedList")||p("InsertOrderedList")||!N.inline_styles&&!!x.getParent(w.getNode(),"BLOCKQUOTE")},"InsertUnorderedList,InsertOrderedList":function(e){var t=x.getParent(w.getNode(),"ul,ol");return t&&("insertunorderedlist"===e&&"UL"===t.tagName||"insertorderedlist"===e&&"OL"===t.tagName)}},"state"),m({"FontSize,FontName":function(e){var t=0,n;
return(n=x.getParent(w.getNode(),"span"))&&(t="fontsize"==e?n.style.fontSize:n.style.fontFamily.replace(/, /g,",").replace(/[\'\"]/g,"").toLowerCase()),t}},"value"),m({Undo:function(){n.undoManager.undo()},Redo:function(){n.undoManager.redo()}})}}),r(P,[f],function(e){function t(e,i){var o=this,a,s;return e=r(e),i=o.settings=i||{},/^([\w\-]+):([^\/]{2})/i.test(e)||/^\s*#/.test(e)?(o.source=e,void 0):(0===e.indexOf("/")&&0!==e.indexOf("//")&&(e=(i.base_uri?i.base_uri.protocol||"http":"http")+"://mce_host"+e),/^[\w\-]*:?\/\//.test(e)||(s=i.base_uri?i.base_uri.path:new t(location.href).directory,e=(i.base_uri&&i.base_uri.protocol||"http")+"://mce_host"+o.toAbsPath(s,e)),e=e.replace(/@@/g,"(mce_at)"),e=/^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@\/]*):?([^:@\/]*))?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/.exec(e),n(["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","anchor"],function(t,n){var r=e[n];r&&(r=r.replace(/\(mce_at\)/g,"@@")),o[t]=r}),a=i.base_uri,a&&(o.protocol||(o.protocol=a.protocol),o.userInfo||(o.userInfo=a.userInfo),o.port||"mce_host"!==o.host||(o.port=a.port),o.host&&"mce_host"!==o.host||(o.host=a.host),o.source=""),void 0)}var n=e.each,r=e.trim;return t.prototype={setPath:function(e){var t=this;e=/^(.*?)\/?(\w+)?$/.exec(e),t.path=e[0],t.directory=e[1],t.file=e[2],t.source="",t.getURI()},toRelative:function(e){var n=this,r;if("./"===e)return e;if(e=new t(e,{base_uri:n}),"mce_host"!=e.host&&n.host!=e.host&&e.host||n.port!=e.port||n.protocol!=e.protocol)return e.getURI();var i=n.getURI(),o=e.getURI();return i==o||"/"==i.charAt(i.length-1)&&i.substr(0,i.length-1)==o?i:(r=n.toRelPath(n.path,e.path),e.query&&(r+="?"+e.query),e.anchor&&(r+="#"+e.anchor),r)},toAbsolute:function(e,n){return e=new t(e,{base_uri:this}),e.getURI(this.host==e.host&&this.protocol==e.protocol?n:0)},toRelPath:function(e,t){var n,r=0,i="",o,a;if(e=e.substring(0,e.lastIndexOf("/")),e=e.split("/"),n=t.split("/"),e.length>=n.length)for(o=0,a=e.length;a>o;o++)if(o>=n.length||e[o]!=n[o]){r=o+1;break}if(e.length<n.length)for(o=0,a=n.length;a>o;o++)if(o>=e.length||e[o]!=n[o]){r=o+1;break}if(1===r)return t;for(o=0,a=e.length-(r-1);a>o;o++)i+="../";for(o=r-1,a=n.length;a>o;o++)i+=o!=r-1?"/"+n[o]:n[o];return i},toAbsPath:function(e,t){var r,i=0,o=[],a,s;for(a=/\/$/.test(t)?"/":"",e=e.split("/"),t=t.split("/"),n(e,function(e){e&&o.push(e)}),e=o,r=t.length-1,o=[];r>=0;r--)0!==t[r].length&&"."!==t[r]&&(".."!==t[r]?i>0?i--:o.push(t[r]):i++);return r=e.length-i,s=0>=r?o.reverse().join("/"):e.slice(0,r).join("/")+"/"+o.reverse().join("/"),0!==s.indexOf("/")&&(s="/"+s),a&&s.lastIndexOf("/")!==s.length-1&&(s+=a),s},getURI:function(e){var t,n=this;return(!n.source||e)&&(t="",e||(n.protocol&&(t+=n.protocol+"://"),n.userInfo&&(t+=n.userInfo+"@"),n.host&&(t+=n.host),n.port&&(t+=":"+n.port)),n.path&&(t+=n.path),n.query&&(t+="?"+n.query),n.anchor&&(t+="#"+n.anchor),n.source=t),n.source}},t}),r(O,[f],function(e){function t(){}var n=e.each,r=e.extend,i,o;return t.extend=i=function(e){function t(){var e,t,n,r;if(!o&&(r=this,r.init&&r.init.apply(r,arguments),t=r.Mixins))for(e=t.length;e--;)n=t[e],n.init&&n.init.apply(r,arguments)}function a(){return this}function s(e,t){return function(){var n=this,r=n._super,i;return n._super=c[e],i=t.apply(n,arguments),n._super=r,i}}var l=this,c=l.prototype,d,u,f;o=!0,d=new l,o=!1,e.Mixins&&(n(e.Mixins,function(t){t=t;for(var n in t)"init"!==n&&(e[n]=t[n])}),c.Mixins&&(e.Mixins=c.Mixins.concat(e.Mixins))),e.Methods&&n(e.Methods.split(","),function(t){e[t]=a}),e.Properties&&n(e.Properties.split(","),function(t){var n="_"+t;e[t]=function(e){var t=this,r;return e!==r?(t[n]=e,t):t[n]}}),e.Statics&&n(e.Statics,function(e,n){t[n]=e}),e.Defaults&&c.Defaults&&(e.Defaults=r({},c.Defaults,e.Defaults));for(u in e)f=e[u],d[u]="function"==typeof f&&c[u]?s(u,f):f;return t.prototype=d,t.constructor=t,t.extend=i,t},t}),r(I,[O,f],function(e,t){function n(e){for(var t=[],n=e.length,r;n--;)r=e[n],r.__checked||(t.push(r),r.__checked=1);for(n=t.length;n--;)delete t[n].__checked;return t}var r=/^([\w\\*]+)?(?:#([\w\\]+))?(?:\.([\w\\\.]+))?(?:\[\@?([\w\\]+)([\^\$\*!~]?=)([\w\\]+)\])?(?:\:(.+))?/i,i=/((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,o=/^\s*|\s*$/g,a,s=e.extend({init:function(e){function t(e){return e?(e=e.toLowerCase(),function(t){return"*"===e||t.type===e}):void 0}function n(e){return e?function(t){return t._name===e}:void 0}function a(e){return e?(e=e.split("."),function(t){for(var n=e.length;n--;)if(!t.hasClass(e[n]))return!1;return!0}):void 0}function s(e,t,n){return e?function(r){var i=r[e]?r[e]():"";return t?"="===t?i===n:"*="===t?i.indexOf(n)>=0:"~="===t?(" "+i+" ").indexOf(" "+n+" ")>=0:"!="===t?i!=n:"^="===t?0===i.indexOf(n):"$="===t?i.substr(i.length-n.length)===n:!1:!!n}:void 0}function l(e){var t;return e?(e=/(?:not\((.+)\))|(.+)/i.exec(e),e[1]?(t=d(e[1],[]),function(e){return!u(e,t)}):(e=e[2],function(t,n,r){return"first"===e?0===n:"last"===e?n===r-1:"even"===e?0===n%2:"odd"===e?1===n%2:t[e]?t[e]():!1})):void 0}function c(e,i,c){function d(e){e&&i.push(e)}var u;return u=r.exec(e.replace(o,"")),d(t(u[1])),d(n(u[2])),d(a(u[3])),d(s(u[4],u[5],u[6])),d(l(u[7])),i.psuedo=!!u[7],i.direct=c,i}function d(e,t){var n=[],r,o,a;do if(i.exec(""),o=i.exec(e),o&&(e=o[3],n.push(o[1]),o[2])){r=o[3];break}while(o);for(r&&d(r,t),e=[],a=0;a<n.length;a++)">"!=n[a]&&e.push(c(n[a],[],">"===n[a-1]));return t.push(e),t}var u=this.match;this._selectors=d(e,[])},match:function(e,n){var r,i,o,a,s,l,c,d,u,f,p,h,m;for(n=n||this._selectors,r=0,i=n.length;i>r;r++){for(s=n[r],a=s.length,m=e,h=0,o=a-1;o>=0;o--)for(d=s[o];m;){for(d.psuedo&&(p=m.parent().items(),u=t.inArray(m,p),f=p.length),l=0,c=d.length;c>l;l++)if(!d[l](m,u,f)){l=c+1;break}if(l===c){h++;break}if(o===a-1)break;m=m.parent()}if(h===a)return!0}return!1},find:function(e){function t(e,n,i){var o,a,s,l,c,d=n[i];for(o=0,a=e.length;a>o;o++){for(c=e[o],s=0,l=d.length;l>s;s++)if(!d[s](c,o,a)){s=l+1;break}if(s===l)i==n.length-1?r.push(c):c.items&&t(c.items(),n,i+1);else if(d.direct)return;c.items&&t(c.items(),n,i)}}var r=[],i,o,l=this._selectors;if(e.items){for(i=0,o=l.length;o>i;i++)t(e.items(),l[i],0);o>1&&(r=n(r))}return a||(a=s.Collection),new a(r)}});return s}),r(F,[f,I,O],function(e,t,n){var r,i,o=Array.prototype.push,a=Array.prototype.slice;return i={length:0,init:function(e){e&&this.add(e)},add:function(t){var n=this;return e.isArray(t)?o.apply(n,t):t instanceof r?n.add(t.toArray()):o.call(n,t),n},set:function(e){var t=this,n=t.length,r;for(t.length=0,t.add(e),r=t.length;n>r;r++)delete t[r];return t},filter:function(e){var n=this,i,o,a=[],s,l;for("string"==typeof e?(e=new t(e),l=function(t){return e.match(t)}):l=e,i=0,o=n.length;o>i;i++)s=n[i],l(s)&&a.push(s);return new r(a)},slice:function(){return new r(a.apply(this,arguments))},eq:function(e){return-1===e?this.slice(e):this.slice(e,+e+1)},each:function(t){return e.each(this,t),this},toArray:function(){return e.toArray(this)},indexOf:function(e){for(var t=this,n=t.length;n--&&t[n]!==e;);return n},reverse:function(){return new r(e.toArray(this).reverse())},hasClass:function(e){return this[0]?this[0].hasClass(e):!1},prop:function(e,t){var n=this,r,i;return t!==r?(n.each(function(n){n[e]&&n[e](t)}),n):(i=n[0],i&&i[e]?i[e]():void 0)},exec:function(t){var n=this,r=e.toArray(arguments).slice(1);return n.each(function(e){e[t]&&e[t].apply(e,r)}),n}},e.each("fire on off show hide addClass removeClass append prepend before after reflow".split(" "),function(t){i[t]=function(){var n=e.toArray(arguments);return this.each(function(e){t in e&&e[t].apply(e,n)}),this}}),e.each("text name disabled active selected checked visible parent value data".split(" "),function(e){i[e]=function(t){return this.prop(e,t)}}),r=n.extend(i),t.Collection=r,r}),r(W,[f,g],function(e,t){return{id:function(){return t.DOM.uniqueId()},createFragment:function(e){return t.DOM.createFragment(e)},getWindowSize:function(){return t.DOM.getViewPort()},getSize:function(e){return t.DOM.getSize(e)},getPos:function(e,n){return t.DOM.getPos(e,n)},getViewPort:function(e){return t.DOM.getViewPort(e)},get:function(e){return document.getElementById(e)},addClass:function(e,n){return t.DOM.addClass(e,n)},removeClass:function(e,n){return t.DOM.removeClass(e,n)},hasClass:function(e,n){return t.DOM.hasClass(e,n)},toggleClass:function(e,n,r){return t.DOM.toggleClass(e,n,r)},css:function(e,n,r){return t.DOM.setStyle(e,n,r)},on:function(e,n,r,i){return t.DOM.bind(e,n,r,i)},off:function(e,n,r){return t.DOM.unbind(e,n,r)},fire:function(e,n,r){return t.DOM.fire(e,n,r)}}}),r(z,[O,f,F,W],function(e,t,n,r){var i=t.makeMap("focusin focusout scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave wheel keydown keypress keyup contextmenu"," "),o={},a="onmousewheel"in document,s=!1,l=e.extend({Statics:{controlIdLookup:{}},classPrefix:"mce-",init:function(e){var n=this,i,o;if(n.settings=e=t.extend({},n.Defaults,e),n._id=r.id(),n._text=n._name="",n._width=n._height=0,n._aria={role:e.role},i=e.classes)for(i=i.split(" "),i.map={},o=i.length;o--;)i.map[i[o]]=!0;n._classes=i||[],n.visible(!0),t.each("title text width height name classes visible disabled active value".split(" "),function(t){var r=e[t],i;r!==i?n[t](r):n["_"+t]===i&&(n["_"+t]=!1)}),n.on("click",function(){return n.disabled()?!1:void 0}),e.classes&&t.each(e.classes.split(" "),function(e){n.addClass(e)}),n.settings=e,n._borderBox=n.parseBox(e.border),n._paddingBox=n.parseBox(e.padding),n._marginBox=n.parseBox(e.margin),e.hidden&&n.hide()},Properties:"parent,title,text,width,height,disabled,active,name,value",Methods:"renderHtml",getContainerElm:function(){return document.body},getParentCtrl:function(e){for(var t;e&&!(t=l.controlIdLookup[e.id]);)e=e.parentNode;return t},parseBox:function(e){var t,n=10;if(e)return"number"==typeof e?(e=e||0,{top:e,left:e,bottom:e,right:e}):(e=e.split(" "),t=e.length,1===t?e[1]=e[2]=e[3]=e[0]:2===t?(e[2]=e[0],e[3]=e[1]):3===t&&(e[3]=e[1]),{top:parseInt(e[0],n)||0,right:parseInt(e[1],n)||0,bottom:parseInt(e[2],n)||0,left:parseInt(e[3],n)||0})},borderBox:function(){return this._borderBox},paddingBox:function(){return this._paddingBox},marginBox:function(){return this._marginBox},measureBox:function(e,t){function n(t){var n=document.defaultView;return n?(t=t.replace(/[A-Z]/g,function(e){return"-"+e}),n.getComputedStyle(e,null).getPropertyValue(t)):e.currentStyle[t]}function r(e){var t=parseInt(n(e),10);return isNaN(t)?0:t}return{top:r(t+"TopWidth"),right:r(t+"RightWidth"),bottom:r(t+"BottomWidth"),left:r(t+"LeftWidth")}},initLayoutRect:function(){var e=this,t=e.settings,n,r,i=e.getEl(),o,a,s,l,c,d,u;n=e._borderBox=e._borderBox||e.measureBox(i,"border"),e._paddingBox=e._paddingBox||e.measureBox(i,"padding"),e._marginBox=e._marginBox||e.measureBox(i,"margin"),d=t.minWidth,u=t.minHeight,s=d||i.offsetWidth,l=u||i.offsetHeight,o=t.width,a=t.height,c=t.autoResize,c="undefined"!=typeof c?c:!o&&!a,o=o||s,a=a||l;var f=n.left+n.right,p=n.top+n.bottom,h=t.maxWidth||65535,m=t.maxHeight||65535;return e._layoutRect=r={x:t.x||0,y:t.y||0,w:o,h:a,deltaW:f,deltaH:p,contentW:o-f,contentH:a-p,innerW:o-f,innerH:a-p,startMinWidth:d||0,startMinHeight:u||0,minW:Math.min(s,h),minH:Math.min(l,m),maxW:h,maxH:m,autoResize:c,scrollW:0},e._lastLayoutRect={},r},layoutRect:function(e){var t=this,n=t._layoutRect,r,i,o,a,s,c;return n||(n=t.initLayoutRect()),e?(o=n.deltaW,a=n.deltaH,e.x!==s&&(n.x=e.x),e.y!==s&&(n.y=e.y),e.minW!==s&&(n.minW=e.minW),e.minH!==s&&(n.minH=e.minH),i=e.w,i!==s&&(i=i<n.minW?n.minW:i,i=i>n.maxW?n.maxW:i,n.w=i,n.innerW=i-o),i=e.h,i!==s&&(i=i<n.minH?n.minH:i,i=i>n.maxH?n.maxH:i,n.h=i,n.innerH=i-a),i=e.innerW,i!==s&&(i=i<n.minW-o?n.minW-o:i,i=i>n.maxW-o?n.maxW-o:i,n.innerW=i,n.w=i+o),i=e.innerH,i!==s&&(i=i<n.minH-a?n.minH-a:i,i=i>n.maxH-a?n.maxH-a:i,n.innerH=i,n.h=i+a),e.contentW!==s&&(n.contentW=e.contentW),e.contentH!==s&&(n.contentH=e.contentH),r=t._lastLayoutRect,(r.x!==n.x||r.y!==n.y||r.w!==n.w||r.h!==n.h)&&(c=l.repaintControls,c&&c.map&&!c.map[t._id]&&(c.push(t),c.map[t._id]=!0),r.x=n.x,r.y=n.y,r.w=n.w,r.h=n.h),t):n},repaint:function(){var e=this,t,n,r,i,o=0,a=0,s;t=e.getEl().style,r=e._layoutRect,s=e._lastRepaintRect||{},i=e._borderBox,o=i.left+i.right,a=i.top+i.bottom,r.x!==s.x&&(t.left=r.x+"px",s.x=r.x),r.y!==s.y&&(t.top=r.y+"px",s.y=r.y),r.w!==s.w&&(t.width=r.w-o+"px",s.w=r.w),r.h!==s.h&&(t.height=r.h-a+"px",s.h=r.h),e._hasBody&&r.innerW!==s.innerW&&(n=e.getEl("body").style,n.width=r.innerW+"px",s.innerW=r.innerW),e._hasBody&&r.innerH!==s.innerH&&(n=n||e.getEl("body").style,n.height=r.innerH+"px",s.innerH=r.innerH),e._lastRepaintRect=s,e.fire("repaint",{},!1)},on:function(e,t){function n(e){var t,n;return function(i){return t||r.parents().each(function(r){var i=r.settings.callbacks;return i&&(t=i[e])?(n=r,!1):void 0}),t.call(n,i)}}var r=this,o,a,s,l;if(t)for("string"==typeof t&&(t=n(t)),s=e.toLowerCase().split(" "),l=s.length;l--;)e=s[l],o=r._bindings,o||(o=r._bindings={}),a=o[e],a||(a=o[e]=[]),a.push(t),i[e]&&(r._nativeEvents?r._nativeEvents[e]=!0:r._nativeEvents={name:!0},r._rendered&&r.bindPendingEvents());return r},off:function(e,t){var n=this,r,i=n._bindings,o,a,s,l;if(i)if(e)for(s=e.toLowerCase().split(" "),r=s.length;r--;){if(e=s[r],o=i[e],!e){for(a in i)i[a].length=0;return n}if(o)if(t)for(l=o.length;l--;)o[l]===t&&o.splice(l,1);else o.length=0}else n._bindings=[];return n},fire:function(e,t,n){function r(){return!1}function i(){return!0}var o=this,a,s,l,c;if(e=e.toLowerCase(),t=t||{},t.type||(t.type=e),t.control||(t.control=o),t.preventDefault||(t.preventDefault=function(){t.isDefaultPrevented=i},t.stopPropagation=function(){t.isPropagationStopped=i},t.stopImmediatePropagation=function(){t.isImmediatePropagationStopped=i},t.isDefaultPrevented=r,t.isPropagationStopped=r,t.isImmediatePropagationStopped=r),o._bindings&&(l=o._bindings[e]))for(a=0,s=l.length;s>a&&(t.isImmediatePropagationStopped()||l[a].call(o,t)!==!1);a++);if(n!==!1)for(c=o.parent();c&&!t.isPropagationStopped();)c.fire(e,t,!1),c=c.parent();return t},parents:function(e){var t=this,r=new n;for(t=t.parent();t;t=t.parent())r.add(t);return e&&(r=r.filter(e)),r},next:function(){var e=this.parent().items();return e[e.indexOf(this)+1]},prev:function(){var e=this.parent().items();return e[e.indexOf(this)-1]},findCommonAncestor:function(e,t){for(var n;e;){for(n=t;n&&e!=n;)n=n.parent();if(e==n)break;e=e.parent()}return e},hasClass:function(e,t){var n=this._classes[t||"control"];return e=this.classPrefix+e,n&&!!n.map[e]},addClass:function(e,t){var n=this,r,i;return e=this.classPrefix+e,r=n._classes[t||"control"],r||(r=[],r.map={},n._classes[t||"control"]=r),r.map[e]||(r.map[e]=e,r.push(e),n._rendered&&(i=n.getEl(t),i&&(i.className=r.join(" ")))),n},removeClass:function(e,t){var n=this,r,i,o;if(e=this.classPrefix+e,r=n._classes[t||"control"],r&&r.map[e])for(delete r.map[e],i=r.length;i--;)r[i]===e&&r.splice(i,1);return n._rendered&&(o=n.getEl(t),o&&(o.className=r.join(" "))),n},toggleClass:function(e,t,n){var r=this;return t?r.addClass(e,n):r.removeClass(e,n),r},classes:function(e){var t=this._classes[e||"control"];return t?t.join(" "):""},getEl:function(e,t){var n,i=e?this._id+"-"+e:this._id;return n=o[i]=(t===!0?null:o[i])||r.get(i)},visible:function(e){var t=this,n;return"undefined"!=typeof e?(t._visible!==e&&(t._rendered&&(t.getEl().style.display=e?"":"none"),t._visible=e,n=t.parent(),n&&(n._lastRect=null),t.fire(e?"show":"hide")),t):t._visible},show:function(){return this.visible(!0)},hide:function(){return this.visible(!1)},focus:function(){try{this.getEl().focus()}catch(e){}return this},blur:function(){return this.getEl().blur(),this},aria:function(e,t){var n=this,r=n.getEl();return"undefined"==typeof t?n._aria[e]:(n._aria[e]=t,n._rendered&&("label"==e&&r.setAttribute("aria-labeledby",n._id),r.setAttribute("role"==e?e:"aria-"+e,t)),n)},encode:function(e,t){return t!==!1&&l.translate&&(e=l.translate(e)),(e||"").replace(/[&<>"]/g,function(e){return"&#"+e.charCodeAt(0)+";"})},before:function(e){var t=this,n=t.parent();return n&&n.insert(e,n.items().indexOf(t),!0),t},after:function(e){var t=this,n=t.parent();return n&&n.insert(e,n.items().indexOf(t)),t},remove:function(){var e=this,t=e.getEl(),n=e.parent(),i;if(e.items)for(var o=e.items().toArray(),a=o.length;a--;)o[a].remove();return n&&n.items&&(i=[],n.items().each(function(t){t!==e&&i.push(t)}),n.items().set(i),n._lastRect=null),e._eventsRoot&&e._eventsRoot==e&&r.off(t),delete l.controlIdLookup[e._id],t.parentNode&&t.parentNode.removeChild(t),e},renderBefore:function(e){var t=this;return e.parentNode.insertBefore(r.createFragment(t.renderHtml()),e),t.postRender(),t},renderTo:function(e){var t=this;return e=e||t.getContainerElm(),e.appendChild(r.createFragment(t.renderHtml())),t.postRender(),t},postRender:function(){var e=this,t=e.settings,n,i,o,a,s;for(a in t)0===a.indexOf("on")&&e.on(a.substr(2),t[a]);if(e._eventsRoot){for(o=e.parent();!s&&o;o=o.parent())s=o._eventsRoot;if(s)for(a in s._nativeEvents)e._nativeEvents[a]=!0}e.bindPendingEvents(),t.style&&(n=e.getEl(),n&&(n.setAttribute("style",t.style),n.style.cssText=t.style)),e._visible||r.css(e.getEl(),"display","none"),e.settings.border&&(i=e.borderBox(),r.css(e.getEl(),{"border-top-width":i.top,"border-right-width":i.right,"border-bottom-width":i.bottom,"border-left-width":i.left})),l.controlIdLookup[e._id]=e;for(var c in e._aria)e.aria(c,e._aria[c]);e.fire("postrender",{},!1)},scrollIntoView:function(e){function t(e,t){var n,r,i=e;for(n=r=0;i&&i!=t&&i.nodeType;)n+=i.offsetLeft||0,r+=i.offsetTop||0,i=i.offsetParent;return{x:n,y:r}}var n=this.getEl(),r=n.parentNode,i,o,a,s,l,c,d=t(n,r);return i=d.x,o=d.y,a=n.offsetWidth,s=n.offsetHeight,l=r.clientWidth,c=r.clientHeight,"end"==e?(i-=l-a,o-=c-s):"center"==e&&(i-=l/2-a/2,o-=c/2-s/2),r.scrollLeft=i,r.scrollTop=o,this},bindPendingEvents:function(){function e(e){var t=o.getParentCtrl(e.target);t&&t.fire(e.type,e)}function t(){var e=u._lastHoverCtrl;e&&(e.fire("mouseleave",{target:e.getEl()}),e.parents().each(function(e){e.fire("mouseleave",{target:e.getEl()})}),u._lastHoverCtrl=null)}function n(e){var t=o.getParentCtrl(e.target),n=u._lastHoverCtrl,r=0,i,a,s;if(t!==n){if(u._lastHoverCtrl=t,a=t.parents().toArray().reverse(),a.push(t),n){for(s=n.parents().toArray().reverse(),s.push(n),r=0;r<s.length&&a[r]===s[r];r++);for(i=s.length-1;i>=r;i--)n=s[i],n.fire("mouseleave",{target:n.getEl()})}for(i=r;i<a.length;i++)t=a[i],t.fire("mouseenter",{target:t.getEl()})}}function i(e){e.preventDefault(),"mousewheel"==e.type?(e.deltaY=-1/40*e.wheelDelta,e.wheelDeltaX&&(e.deltaX=-1/40*e.wheelDeltaX)):(e.deltaX=0,e.deltaY=e.detail),e=o.fire("wheel",e)}var o=this,l,c,d,u,f,p;if(o._rendered=!0,f=o._nativeEvents){for(d=o.parents().toArray(),d.unshift(o),l=0,c=d.length;!u&&c>l;l++)u=d[l]._eventsRoot;for(u||(u=d[d.length-1]||o),o._eventsRoot=u,c=l,l=0;c>l;l++)d[l]._eventsRoot=u;for(p in f){if(!f)return!1;"wheel"!==p||s?("mouseenter"===p||"mouseleave"===p?u._hasMouseEnter||(r.on(u.getEl(),"mouseleave",t),r.on(u.getEl(),"mouseover",n),u._hasMouseEnter=1):u[p]||(r.on(u.getEl(),p,e),u[p]=!0),f[p]=!1):a?r.on(o.getEl(),"mousewheel",i):r.on(o.getEl(),"DOMMouseScroll",i)}}},reflow:function(){return this.repaint(),this}});return l}),r(V,[],function(){var e={},t;return{add:function(t,n){e[t.toLowerCase()]=n},has:function(t){return!!e[t.toLowerCase()]},create:function(n,r){var i,o,a;if(!t){a=tinymce.ui;for(o in a)e[o.toLowerCase()]=a[o];t=!0}if("string"==typeof n?(r=r||{},r.type=n):(r=n,n=r.type),n=n.toLowerCase(),i=e[n],!i)throw new Error("Could not find control by type: "+n);return i=new i(r),i.type=n,i}}}),r(U,[z,F,I,V,f,W],function(e,t,n,r,i,o){var a={};return e.extend({layout:"",innerClass:"container-inner",init:function(e){var n=this;n._super(e),e=n.settings,n._fixed=e.fixed,n._items=new t,n.addClass("container"),n.addClass("container-body","body"),e.containerCls&&n.addClass(e.containerCls),n._layout=r.create((e.layout||n.layout)+"layout"),n.settings.items&&n.add(n.settings.items),n._hasBody=!0},items:function(){return this._items},find:function(e){return e=a[e]=a[e]||new n(e),e.find(this)},add:function(e){var t=this;return t.items().add(t.create(e)).parent(t),t},focus:function(){var e=this;return e.keyNav?e.keyNav.focusFirst():e._super(),e},replace:function(e,t){for(var n,r=this.items(),i=r.length;i--;)if(r[i]===e){r[i]=t;break}i>=0&&(n=t.getEl(),n&&n.parentNode.removeChild(n),n=e.getEl(),n&&n.parentNode.removeChild(n)),t.parent(this)},create:function(t){var n=this,o,a=[];return i.isArray(t)||(t=[t]),i.each(t,function(t){t&&(t instanceof e||("string"==typeof t&&(t={type:t}),o=i.extend({},n.settings.defaults,t),t.type=o.type=o.type||t.type||n.settings.defaultType||(o.defaults?o.defaults.type:null),t=r.create(o)),a.push(t))}),a},renderNew:function(){var e=this;return e.items().each(function(t,n){var r,i;t.parent(e),t._rendered||(r=e.getEl("body"),i=o.createFragment(t.renderHtml()),r.hasChildNodes()&&n<=r.childNodes.length-1?r.insertBefore(i,r.childNodes[n]):r.appendChild(i),t.postRender())}),e._layout.applyClasses(e),e._lastRect=null,e},append:function(e){return this.add(e).renderNew()},prepend:function(e){var t=this;return t.items().set(t.create(e).concat(t.items().toArray())),t.renderNew()},insert:function(e,t,n){var r=this,i,o,a;return e=r.create(e),i=r.items(),!n&&t<i.length-1&&(t+=1),t>=0&&t<i.length&&(o=i.slice(0,t).toArray(),a=i.slice(t).toArray(),i.set(o.concat(e,a))),r.renderNew()},fromJSON:function(e){var t=this;for(var n in e)t.find("#"+n).value(e[n]);return t},toJSON:function(){var e=this,t={};return e.find("*").each(function(e){var n=e.name(),r=e.value();n&&"undefined"!=typeof r&&(t[n]=r)}),t},preRender:function(){},renderHtml:function(){var e=this,t=e._layout;return e.preRender(),t.preRender(e),'<div id="'+e._id+'" class="'+e.classes()+'" role="'+this.settings.role+'">'+'<div id="'+e._id+'-body" class="'+e.classes("body")+'">'+(e.settings.html||"")+t.renderHtml(e)+"</div>"+"</div>"},postRender:function(){var e=this,t;return e.items().exec("postRender"),e._super(),e._layout.postRender(e),e._rendered=!0,e.settings.style&&o.css(e.getEl(),e.settings.style),e.settings.border&&(t=e.borderBox(),o.css(e.getEl(),{"border-top-width":t.top,"border-right-width":t.right,"border-bottom-width":t.bottom,"border-left-width":t.left})),e},initLayoutRect:function(){var e=this,t=e._super();return e._layout.recalc(e),t},recalc:function(){var e=this,t=e._layoutRect,n=e._lastRect;return n&&n.w==t.w&&n.h==t.h?void 0:(e._layout.recalc(e),t=e.layoutRect(),e._lastRect={x:t.x,y:t.y,w:t.w,h:t.h},!0)},reflow:function(){var t,n;if(this.visible()){for(e.repaintControls=[],e.repaintControls.map={},n=this.recalc(),t=e.repaintControls.length;t--;)e.repaintControls[t].repaint();"flow"!==this.settings.layout&&"stack"!==this.settings.layout&&this.repaint(),e.repaintControls=[]}return this}})}),r(q,[W],function(e){function t(){var e=document,t,n,r,i,o,a,s,l,c=Math.max;return t=e.documentElement,n=e.body,r=c(t.scrollWidth,n.scrollWidth),i=c(t.clientWidth,n.clientWidth),o=c(t.offsetWidth,n.offsetWidth),a=c(t.scrollHeight,n.scrollHeight),s=c(t.clientHeight,n.clientHeight),l=c(t.offsetHeight,n.offsetHeight),{width:o>r?i:r,height:l>a?s:a}}return function(n,r){function i(){return a.getElementById(r.handle||n)}var o,a=document,s,l,c,d,u,f;r=r||{},l=function(n){var l=t(),p,h;n.preventDefault(),s=n.button,p=i(),u=n.screenX,f=n.screenY,h=window.getComputedStyle?window.getComputedStyle(p,null).getPropertyValue("cursor"):p.runtimeStyle.cursor,o=a.createElement("div"),e.css(o,{position:"absolute",top:0,left:0,width:l.width,height:l.height,zIndex:2147483647,opacity:1e-4,background:"red",cursor:h}),a.body.appendChild(o),e.on(a,"mousemove",d),e.on(a,"mouseup",c),r.start(n)},d=function(e){return e.button!==s?c(e):(e.deltaX=e.screenX-u,e.deltaY=e.screenY-f,e.preventDefault(),r.drag(e),void 0)},c=function(t){e.off(a,"mousemove",d),e.off(a,"mouseup",c),o.parentNode.removeChild(o),r.stop&&r.stop(t)},this.destroy=function(){e.off(i())},e.on(i(),"mousedown",l)}}),r(j,[W,q],function(e,t){return{init:function(){var e=this;e.on("repaint",e.renderScroll)},renderScroll:function(){function n(){function t(t,a,s,l,c,d){var u,f,p,h,m,g,v,y,b;if(f=i.getEl("scroll"+t)){if(y=a.toLowerCase(),b=s.toLowerCase(),i.getEl("absend")&&e.css(i.getEl("absend"),y,i.layoutRect()[l]-1),!c)return e.css(f,"display","none"),void 0;e.css(f,"display","block"),u=i.getEl("body"),p=i.getEl("scroll"+t+"t"),h=u["client"+s]-2*o,h-=n&&r?f["client"+d]:0,m=u["scroll"+s],g=h/m,v={},v[y]=u["offset"+a]+o,v[b]=h,e.css(f,v),v={},v[y]=u["scroll"+a]*g,v[b]=h*g,e.css(p,v)}}var n,r,a;a=i.getEl("body"),n=a.scrollWidth>a.clientWidth,r=a.scrollHeight>a.clientHeight,t("h","Left","Width","contentW",n,"Height"),t("v","Top","Height","contentH",r,"Width")}function r(){function n(n,r,a,s,l){var c,d=i._id+"-scroll"+n,u=i.classPrefix;i.getEl().appendChild(e.createFragment('<div id="'+d+'" class="'+u+"scrollbar "+u+"scrollbar-"+n+'">'+'<div id="'+d+'t" class="'+u+'scrollbar-thumb"></div>'+"</div>")),i.draghelper=new t(d+"t",{start:function(){c=i.getEl("body")["scroll"+r],e.addClass(e.get(d),u+"active")},drag:function(e){var t,d,u,f,p=i.layoutRect();d=p.contentW>p.innerW,u=p.contentH>p.innerH,f=i.getEl("body")["client"+a]-2*o,f-=d&&u?i.getEl("scroll"+n)["client"+l]:0,t=f/i.getEl("body")["scroll"+a],i.getEl("body")["scroll"+r]=c+e["delta"+s]/t},stop:function(){e.removeClass(e.get(d),u+"active")}})}i.addClass("scroll"),n("v","Top","Height","Y","Width"),n("h","Left","Width","X","Height")}var i=this,o=2;i.settings.autoScroll&&(i._hasScroll||(i._hasScroll=!0,r(),i.on("wheel",function(e){var t=i.getEl("body");t.scrollLeft+=10*(e.deltaX||0),t.scrollTop+=10*e.deltaY,n()}),e.on(i.getEl("body"),"scroll",n)),n())}}}),r($,[U,j],function(e,t){return e.extend({Defaults:{layout:"fit",containerCls:"panel"},Mixins:[t],renderHtml:function(){var e=this,t=e._layout,n=e.settings.html;return e.preRender(),t.preRender(e),"undefined"==typeof n?n='<div id="'+e._id+'-body" class="'+e.classes("body")+'">'+t.renderHtml(e)+"</div>":("function"==typeof n&&(n=n.call(e)),e._hasBody=!1),'<div id="'+e._id+'" class="'+e.classes()+'" hideFocus="1" tabIndex="-1">'+(e._preBodyHtml||"")+n+"</div>"}})}),r(K,[W],function(e){function t(t,n,r){var i,o,a,s,l,c,d,u,f;return f=e.getViewPort(),o=e.getPos(n),a=o.x,s=o.y,t._fixed&&(a-=f.x,s-=f.y),i=t.getEl(),l=i.offsetWidth,c=i.offsetHeight,d=n.offsetWidth,u=n.offsetHeight,r=(r||"").split(""),"b"===r[0]&&(s+=u),"r"===r[1]&&(a+=d),"c"===r[0]&&(s+=Math.round(u/2)),"c"===r[1]&&(a+=Math.round(d/2)),"b"===r[3]&&(s-=c),"r"===r[4]&&(a-=l),"c"===r[3]&&(s-=Math.round(c/2)),"c"===r[4]&&(a-=Math.round(l/2)),{x:a,y:s,w:l,h:c}}return{testMoveRel:function(n,r){for(var i=e.getViewPort(),o=0;o<r.length;o++){var a=t(this,n,r[o]);if(this._fixed){if(a.x>0&&a.x+a.w<i.w&&a.y>0&&a.y+a.h<i.h)return r[o]}else if(a.x>i.x&&a.x+a.w<i.w+i.x&&a.y>i.y&&a.y+a.h<i.h+i.y)return r[o]}return r[0]},moveRel:function(e,n){"string"!=typeof n&&(n=this.testMoveRel(e,n));var r=t(this,e,n);return this.moveTo(r.x,r.y)},moveBy:function(e,t){var n=this,r=n.layoutRect();return n.moveTo(r.x+e,r.y+t),n},moveTo:function(t,n){function r(e,t,n){return 0>e?0:e+n>t?(e=t-n,0>e?0:e):e}var i=this;if(i.settings.constrainToViewport){var o=e.getViewPort(window),a=i.layoutRect();t=r(t,o.w+o.x,a.w),n=r(n,o.h+o.y,a.h)}return i._rendered?i.layoutRect({x:t,y:n}).repaint():(i.settings.x=t,i.settings.y=n),i.fire("move",{x:t,y:n}),i}}}),r(G,[W],function(e){return{resizeToContent:function(){this._layoutRect.autoResize=!0,this._lastRect=null,this.reflow()},resizeTo:function(t,n){if(1>=t||1>=n){var r=e.getWindowSize();t=1>=t?t*r.w:t,n=1>=n?n*r.h:n}return this._layoutRect.autoResize=!1,this.layoutRect({minW:t,minH:n,w:t,h:n}).reflow()},resizeBy:function(e,t){var n=this,r=n.layoutRect();return n.resizeTo(r.w+e,r.h+t)}}}),r(Y,[$,K,G,W],function(e,t,n,r){function i(e){var t;for(t=s.length;t--;)s[t]===e&&s.splice(t,1)}var o,a,s=[],l=[],c,d=e.extend({Mixins:[t,n],init:function(e){function t(){var e,t=d.zIndex||65535,n;if(l.length)for(e=0;e<l.length;e++)l[e].modal&&(t++,n=l[e]),l[e].getEl().style.zIndex=t,l[e].zIndex=t,t++;var i=document.getElementById(u.classPrefix+"modal-block");n?r.css(i,"z-index",n.zIndex-1):i&&(i.parentNode.removeChild(i),c=!1),d.currentZIndex=t}function n(e,t){for(;e;){if(e==t)return!0;e=e.parent()}}function i(e){function t(t,n){for(var r,i=0;i<s.length;i++)if(s[i]!=e)for(r=s[i].parent();r&&(r=r.parent());)r==e&&s[i].fixed(t).moveBy(0,n).repaint()}var n=r.getViewPort().y;e.settings.autofix&&(e._fixed?e._autoFixY>n&&(e.fixed(!1).layoutRect({y:e._autoFixY}).repaint(),t(!1,e._autoFixY-n)):(e._autoFixY=e.layoutRect().y,e._autoFixY<n&&(e.fixed(!0).layoutRect({y:0}).repaint(),t(!0,n-e._autoFixY))))}var u=this;u._super(e),u._eventsRoot=u,u.addClass("floatpanel"),e.autohide&&(o||(o=function(e){var t,r=u.getParentCtrl(e.target);for(t=s.length;t--;){var i=s[t];if(i.settings.autohide){if(r&&(n(r,i)||i.parent()===r))continue;e=i.fire("autohide",{target:e.target}),e.isDefaultPrevented()||i.hide()}}},r.on(document,"click",o)),s.push(u)),e.autofix&&(a||(a=function(){var e;for(e=s.length;e--;)i(s[e])},r.on(window,"scroll",a)),u.on("move",function(){i(this)})),u.on("postrender show",function(e){if(e.control==u){var n,i=u.classPrefix;u.modal&&!c&&(n=r.createFragment('<div id="'+i+'modal-block" class="'+i+"reset "+i+'fade"></div>'),n=n.firstChild,u.getContainerElm().appendChild(n),setTimeout(function(){r.addClass(n,i+"in"),r.addClass(u.getEl(),i+"in")},0),c=!0),l.push(u),t()}}),u.on("close hide",function(e){if(e.control==u){for(var n=l.length;n--;)l[n]===u&&l.splice(n,1);t()}}),u.on("show",function(){u.parents().each(function(e){return e._fixed?(u.fixed(!0),!1):void 0})}),e.popover&&(u._preBodyHtml='<div class="'+u.classPrefix+'arrow"></div>',u.addClass("popover").addClass("bottom").addClass("start"))},fixed:function(e){var t=this;if(t._fixed!=e){if(t._rendered){var n=r.getViewPort();e?t.layoutRect().y-=n.y:t.layoutRect().y+=n.y}t.toggleClass("fixed",e),t._fixed=e}return t},show:function(){var e=this,t,n=e._super();for(t=s.length;t--&&s[t]!==e;);return-1===t&&s.push(e),n},hide:function(){return i(this),this._super()},hideAll:function(){d.hideAll()},close:function(){var e=this;return e.fire("close"),e.remove()},remove:function(){i(this),this._super()}});return d.hideAll=function(){for(var e=s.length;e--;){var t=s[e];t.settings.autohide&&(t.fire("cancel",{},!1),t.hide(),s.splice(e,1))}},d}),r(X,[W],function(e){return function(t){function n(){if(!h)if(h=[],u.find)u.find("*").each(function(e){e.canFocus&&h.push(e.getEl())});else for(var e=u.getEl().getElementsByTagName("*"),t=0;t<e.length;t++)e[t].id&&e[t]&&h.push(e[t])}function r(){return document.getElementById(m)}function i(e){return e=e||r(),e&&e.getAttribute("role")}function o(e){for(var t,n=e||r();n=n.parentNode;)if(t=i(n))return t}function a(e){var t=document.getElementById(m);return t?t.getAttribute("aria-"+e):void 0}function s(){var n=r();if(!n||"TEXTAREA"!=n.nodeName&&"text"!=n.type)return t.onAction?t.onAction(m):e.fire(r(),"click",{keyboard:!0}),!0}function l(){var e;t.onCancel?((e=r())&&e.blur(),t.onCancel()):t.root.fire("cancel")}function c(e){function r(e){for(var t=u?u.getEl():document.body;e&&e!=t;){if("none"==e.style.display)return!1;e=e.parentNode}return!0}var i=-1,o,a,l=[];for(n(),a=l.length,a=0;a<h.length;a++)r(h[a])&&l.push(h[a]);for(a=l.length;a--;)if(l[a].id===m){i=a;break}i+=e,0>i?i=l.length-1:i>=l.length&&(i=0),o=l[i],o.focus(),m=o.id,t.actOnFocus&&s()}function d(){var e,r;for(r=i(t.root.getEl()),n(),e=h.length;e--;)if("toolbar"==r&&h[e].id===m)return h[e].focus(),void 0;h[0].focus()}var u=t.root,f=t.enableUpDown!==!1,p=t.enableLeftRight!==!1,h=t.items,m;return u.on("keydown",function(e){var n=37,r=39,d=38,u=40,h=27,m=14,g=13,v=32,y=9,b;switch(e.keyCode){case n:p&&(t.leftAction?t.leftAction():c(-1),b=!0);
break;case r:p&&("menuitem"==i()&&"menu"==o()?a("haspopup")&&s():c(1),b=!0);break;case d:f&&(c(-1),b=!0);break;case u:f&&("menuitem"==i()&&"menubar"==o()?s():"button"==i()&&a("haspopup")?s():c(1),b=!0);break;case y:b=!0,e.shiftKey?c(-1):c(1);break;case h:b=!0,l();break;case m:case g:case v:b=s()}b&&(e.stopPropagation(),e.preventDefault())}),u.on("focusin",function(e){n(),m=e.target.id}),{moveFocus:c,focusFirst:d,cancel:l}}}),r(J,[Y,$,W,X,q],function(e,t,n,r,i){var o=e.extend({modal:!0,Defaults:{border:1,layout:"flex",containerCls:"panel",role:"dialog",callbacks:{submit:function(){this.fire("submit",{data:this.toJSON()})},close:function(){this.close()}}},init:function(e){var n=this;n._super(e),n.addClass("window"),n._fixed=!0,e.buttons&&(n.statusbar=new t({layout:"flex",border:"1 0 0 0",spacing:3,padding:10,align:"center",pack:"end",defaults:{type:"button"},items:e.buttons}),n.statusbar.addClass("foot"),n.statusbar.parent(n)),n.on("click",function(e){-1!=e.target.className.indexOf(n.classPrefix+"close")&&n.close()}),n.aria("label",e.title),n._fullscreen=!1},recalc:function(){var e=this,t=e.statusbar,r,i,o;e._fullscreen&&(e.layoutRect(n.getWindowSize()),e.layoutRect().contentH=e.layoutRect().innerH),e._super(),r=e.layoutRect(),e.settings.title&&!e._fullscreen&&(i=r.headerW,i>r.w&&(e.layoutRect({w:i}),o=!0)),t&&(t.layoutRect({w:e.layoutRect().innerW}).recalc(),i=t.layoutRect().minW+r.deltaW,i>r.w&&(e.layoutRect({w:i}),o=!0)),o&&e.recalc()},initLayoutRect:function(){var e=this,t=e._super(),r=0,i;e.settings.title&&!e._fullscreen&&(i=e.getEl("head"),t.headerW=i.offsetWidth,t.headerH=i.offsetHeight,r+=t.headerH),e.statusbar&&(r+=e.statusbar.layoutRect().h),t.deltaH+=r,t.minH+=r,t.h+=r;var o=n.getWindowSize();return t.x=Math.max(0,o.w/2-t.w/2),t.y=Math.max(0,o.h/2-t.h/2),t},renderHtml:function(){var e=this,t=e._layout,n=e._id,r=e.classPrefix,i=e.settings,o="",a="",s=i.html;return e.preRender(),t.preRender(e),i.title&&(o='<div id="'+n+'-head" class="'+r+'window-head">'+'<div class="'+r+'title">'+e.encode(i.title)+"</div>"+'<button type="button" class="'+r+'close" aria-hidden="true">&times;</button>'+'<div id="'+n+'-dragh" class="'+r+'dragh"></div>'+"</div>"),i.url&&(s='<iframe src="'+i.url+'" tabindex="-1"></iframe>'),"undefined"==typeof s&&(s=t.renderHtml(e)),e.statusbar&&(a=e.statusbar.renderHtml()),'<div id="'+n+'" class="'+e.classes()+'" hideFocus="1" tabIndex="-1">'+o+'<div id="'+n+'-body" class="'+e.classes("body")+'">'+s+"</div>"+a+"</div>"},fullscreen:function(e){var t=this,r=document.documentElement,i,o=t.classPrefix,a;if(e!=t._fullscreen)if(n.on(window,"resize",function(){var e;if(t._fullscreen)if(i)t._timer||(t._timer=setTimeout(function(){var e=n.getWindowSize();t.moveTo(0,0).resizeTo(e.w,e.h),t._timer=0},50));else{e=(new Date).getTime();var r=n.getWindowSize();t.moveTo(0,0).resizeTo(r.w,r.h),(new Date).getTime()-e>50&&(i=!0)}}),a=t.layoutRect(),t._fullscreen=e,e){t._initial={x:a.x,y:a.y,w:a.w,h:a.h},t._borderBox=t.parseBox("0"),t.getEl("head").style.display="none",a.deltaH-=a.headerH+2,n.addClass(r,o+"fullscreen"),n.addClass(document.body,o+"fullscreen"),t.addClass("fullscreen");var s=n.getWindowSize();t.moveTo(0,0).resizeTo(s.w,s.h)}else t._borderBox=t.parseBox(t.settings.border),t.getEl("head").style.display="",a.deltaH+=a.headerH,n.removeClass(r,o+"fullscreen"),n.removeClass(document.body,o+"fullscreen"),t.removeClass("fullscreen"),t.moveTo(t._initial.x,t._initial.y).resizeTo(t._initial.w,t._initial.h);return t.reflow()},postRender:function(){var e=this,t=[],n,o,a;setTimeout(function(){e.addClass("in")},0),e.keyboardNavigation=new r({root:e,enableLeftRight:!1,enableUpDown:!1,items:t,onCancel:function(){e.close()}}),e.find("*").each(function(e){e.canFocus&&(o=o||e.settings.autofocus,n=n||e,"filepicker"==e.type?(t.push(e.getEl("inp")),e.getEl("open")&&t.push(e.getEl("open").firstChild)):t.push(e.getEl()))}),e.statusbar&&e.statusbar.find("*").each(function(e){e.canFocus&&(o=o||e.settings.autofocus,n=n||e,t.push(e.getEl()))}),e._super(),e.statusbar&&e.statusbar.postRender(),!o&&n&&n.focus(),this.dragHelper=new i(e._id+"-dragh",{start:function(){a={x:e.layoutRect().x,y:e.layoutRect().y}},drag:function(t){e.moveTo(a.x+t.deltaX,a.y+t.deltaY)}}),e.on("submit",function(t){t.isDefaultPrevented()||e.close()})},submit:function(){var e=this.getParentCtrl(document.activeElement);return e&&e.blur(),this.fire("submit",{data:this.toJSON()})},remove:function(){var e=this;e._super(),e.dragHelper.destroy(),e.statusbar&&this.statusbar.remove()}});return o}),r(Q,[J],function(e){var t=e.extend({init:function(e){e={border:1,padding:20,layout:"flex",pack:"center",align:"center",containerCls:"panel",autoScroll:!0,buttons:{type:"button",text:"Ok",action:"ok"},items:{type:"label",multiline:!0,maxWidth:500,maxHeight:200}},this._super(e)},Statics:{OK:1,OK_CANCEL:2,YES_NO:3,YES_NO_CANCEL:4,msgBox:function(n){var r,i=n.callback||function(){};switch(n.buttons){case t.OK_CANCEL:r=[{type:"button",text:"Ok",subtype:"primary",onClick:function(e){e.control.parents()[1].close(),i(!0)}},{type:"button",text:"Cancel",onClick:function(e){e.control.parents()[1].close(),i(!1)}}];break;case t.YES_NO:r=[{type:"button",text:"Ok",subtype:"primary",onClick:function(e){e.control.parents()[1].close(),i(!0)}}];break;case t.YES_NO_CANCEL:r=[{type:"button",text:"Ok",subtype:"primary",onClick:function(e){e.control.parents()[1].close()}}];break;default:r=[{type:"button",text:"Ok",subtype:"primary",onClick:function(e){e.control.parents()[1].close()}}]}return new e({padding:20,x:n.x,y:n.y,minWidth:300,minHeight:100,layout:"flex",pack:"center",align:"center",buttons:r,title:n.title,items:{type:"label",multiline:!0,maxWidth:500,maxHeight:200,text:n.text},onClose:n.onClose}).renderTo(document.body).reflow()},alert:function(e,n){return"string"==typeof e&&(e={text:e}),e.callback=n,t.msgBox(e)},confirm:function(e,n){return"string"==typeof e&&(e={text:e}),e.callback=n,e.buttons=t.OK_CANCEL,t.msgBox(e)}}});return t}),r(Z,[J,Q],function(e,t){return function(n){var r=this,i=[];r.windows=i,r.open=function(t,r){var o;return t.url=t.url||t.file,t.url&&(t.width=parseInt(t.width||320,10),t.height=parseInt(t.height||240,10)),t.body&&(t.items={defaults:t.defaults,type:t.bodyType||"form",items:t.body}),t.url||t.buttons||(t.buttons=[{text:"Ok",subtype:"primary",onclick:function(){o.find("form")[0].submit(),o.close()}},{text:"Cancel",onclick:function(){o.close()}}]),o=new e(t),i.push(o),o.on("close",function(){for(var e=i.length;e--;)i[e]===o&&i.splice(e,1);n.focus()}),t.data&&o.on("postRender",function(){this.find("*").each(function(e){var n=e.name();n in t.data&&e.value(t.data[n])})}),o.params=r||{},n.nodeChanged(),o.renderTo(document.body).reflow()},r.alert=function(e,n,r){t.alert(e,function(){n.call(r||this)})},r.confirm=function(e,n,r){t.confirm(e,function(e){n.call(r||this,e)})},r.close=function(){i.length&&i[i.length-1].close()},r.getParams=function(){return i.length?i[i.length-1].params:null},r.setParams=function(e){i.length&&(i[i.length-1].params=e)}}}),r(et,[S,A,b,h,m,f],function(e,t,n,r,i,o){return function(a){function s(e,t){try{a.getDoc().execCommand(e,!1,t)}catch(n){}}function l(){var e=a.getDoc().documentMode;return e?e:6}function c(e){return e.isDefaultPrevented()}function d(){function t(e){function t(){if(3==l.nodeType){if(e&&c==l.length)return!0;if(!e&&0===c)return!0}}var n,r,i,s,l,c,d;n=F.getRng();var u=[n.startContainer,n.startOffset,n.endContainer,n.endOffset];if(n.collapsed||(e=!0),l=n[(e?"start":"end")+"Container"],c=n[(e?"start":"end")+"Offset"],3==l.nodeType&&(r=I.getParent(n.startContainer,I.isBlock),e&&(r=I.getNext(r,I.isBlock)),!r||!t()&&n.collapsed||(i=I.create("em",{id:"__mceDel"}),D(o.grep(r.childNodes),function(e){i.appendChild(e)}),r.appendChild(i))),n=I.createRng(),n.setStart(u[0],u[1]),n.setEnd(u[2],u[3]),F.setRng(n),a.getDoc().execCommand(e?"ForwardDelete":"Delete",!1,null),i){for(s=F.getBookmark();d=I.get("__mceDel");)I.remove(d,!0);F.moveToBookmark(s)}}a.on("keydown",function(n){var r;r=n.keyCode==O,c(n)||!r&&n.keyCode!=P||e.modifierPressed(n)||(n.preventDefault(),t(r))}),a.addCommand("Delete",function(){t()})}function u(){function e(e){var t=I.create("body"),n=e.cloneContents();return t.appendChild(n),F.serializer.serialize(t,{format:"html"})}function t(t){var n=e(t),r=I.createRng();r.selectNode(a.getBody());var i=e(r);return n===i}a.on("keydown",function(e){var n=e.keyCode,r;if(!c(e)&&(n==O||n==P)){if(r=a.selection.isCollapsed(),r&&!I.isEmpty(a.getBody()))return;if(q&&!r)return;if(!r&&!t(a.selection.getRng()))return;e.preventDefault(),a.setContent(""),a.selection.setCursorLocation(a.getBody(),0),a.nodeChanged()}})}function f(){a.on("keydown",function(t){!c(t)&&65==t.keyCode&&e.metaKeyPressed(t)&&(t.preventDefault(),a.execCommand("SelectAll"))})}function p(){a.settings.content_editable||(I.bind(a.getDoc(),"focusin",function(){F.setRng(F.getRng())}),I.bind(a.getDoc(),"mousedown",function(e){e.target==a.getDoc().documentElement&&(a.getWin().focus(),F.setRng(F.getRng()))}))}function h(){a.on("keydown",function(e){if(!c(e)&&e.keyCode===P&&F.isCollapsed()&&0===F.getRng(!0).startOffset){var t=F.getNode(),n=t.previousSibling;n&&n.nodeName&&"hr"===n.nodeName.toLowerCase()&&(I.remove(n),e.preventDefault())}})}function m(){window.Range.prototype.getClientRects||a.on("mousedown",function(e){if(!c(e)&&"HTML"===e.target.nodeName){var t=a.getBody();t.blur(),setTimeout(function(){t.focus()},0)}})}function g(){a.on("click",function(e){e=e.target,/^(IMG|HR)$/.test(e.nodeName)&&F.getSel().setBaseAndExtent(e,0,e,1),"A"==e.nodeName&&I.hasClass(e,"mceItemAnchor")&&F.select(e),a.nodeChanged()})}function v(){function e(){var e=I.getAttribs(F.getStart().cloneNode(!1));return function(){var t=F.getStart();t!==a.getBody()&&(I.setAttrib(t,"style",null),D(e,function(e){t.setAttributeNode(e.cloneNode(!0))}))}}function t(){return!F.isCollapsed()&&I.getParent(F.getStart(),I.isBlock)!=I.getParent(F.getEnd(),I.isBlock)}a.on("keypress",function(n){var r;return c(n)||8!=n.keyCode&&46!=n.keyCode||!t()?void 0:(r=e(),a.getDoc().execCommand("delete",!1,null),r(),n.preventDefault(),!1)}),I.bind(a.getDoc(),"cut",function(n){var r;!c(n)&&t()&&(r=e(),setTimeout(function(){r()},0))})}function y(){var e,n;a.on("selectionchange",function(){n&&(clearTimeout(n),n=0),n=window.setTimeout(function(){var n=F.getRng();e&&t.compareRanges(n,e)||(a.nodeChanged(),e=n)},50)})}function b(){document.body.setAttribute("role","application")}function C(){a.on("keydown",function(e){if(!c(e)&&e.keyCode===P&&F.isCollapsed()&&0===F.getRng(!0).startOffset){var t=F.getNode().previousSibling;if(t&&t.nodeName&&"table"===t.nodeName.toLowerCase())return e.preventDefault(),!1}})}function x(){l()>7||(s("RespectVisibilityInDesign",!0),a.contentStyles.push(".mceHideBrInPre pre br {display: none}"),I.addClass(a.getBody(),"mceHideBrInPre"),z.addNodeFilter("pre",function(e){for(var t=e.length,r,i,o,a;t--;)for(r=e[t].getAll("br"),i=r.length;i--;)o=r[i],a=o.prev,a&&3===a.type&&"\n"!=a.value.charAt(a.value-1)?a.value+="\n":o.parent.insert(new n("#text",3),o,!0).value="\n"}),V.addNodeFilter("pre",function(e){for(var t=e.length,n,r,i,o;t--;)for(n=e[t].getAll("br"),r=n.length;r--;)i=n[r],o=i.prev,o&&3==o.type&&(o.value=o.value.replace(/\r?\n$/,""))}))}function w(){I.bind(a.getBody(),"mouseup",function(){var e,t=F.getNode();"IMG"==t.nodeName&&((e=I.getStyle(t,"width"))&&(I.setAttrib(t,"width",e.replace(/[^0-9%]+/g,"")),I.setStyle(t,"width","")),(e=I.getStyle(t,"height"))&&(I.setAttrib(t,"height",e.replace(/[^0-9%]+/g,"")),I.setStyle(t,"height","")))})}function _(){a.on("keydown",function(t){var n,r,i,o,s,l,d,u;if(n=t.keyCode==O,!c(t)&&(n||t.keyCode==P)&&!e.modifierPressed(t)&&(r=F.getRng(),i=r.startContainer,o=r.startOffset,d=r.collapsed,3==i.nodeType&&i.nodeValue.length>0&&(0===o&&!d||d&&o===(n?0:1)))){if(l=i.previousSibling,l&&"IMG"==l.nodeName)return;u=a.schema.getNonEmptyElements(),t.preventDefault(),s=I.create("br",{id:"__tmp"}),i.parentNode.insertBefore(s,i),a.getDoc().execCommand(n?"ForwardDelete":"Delete",!1,null),i=F.getRng().startContainer,l=i.previousSibling,l&&1==l.nodeType&&!I.isBlock(l)&&I.isEmpty(l)&&!u[l.nodeName.toLowerCase()]&&I.remove(l),I.remove("__tmp")}})}function N(){a.on("keydown",function(t){var n,r,i,o,s;if(!c(t)&&t.keyCode==e.BACKSPACE&&(n=F.getRng(),r=n.startContainer,i=n.startOffset,o=I.getRoot(),s=r,n.collapsed&&0===i)){for(;s&&s.parentNode&&s.parentNode.firstChild==s&&s.parentNode!=o;)s=s.parentNode;"BLOCKQUOTE"===s.tagName&&(a.formatter.toggle("blockquote",null,s),n=I.createRng(),n.setStart(r,0),n.setEnd(r,0),F.setRng(n))}})}function E(){function e(){a._refreshContentEditable(),s("StyleWithCSS",!1),s("enableInlineTableEditing",!1),W.object_resizing||s("enableObjectResizing",!1)}W.readonly||a.on("BeforeExecCommand MouseDown",e)}function k(){function e(){D(I.select("a"),function(e){var t=e.parentNode,n=I.getRoot();if(t.lastChild===e){for(;t&&!I.isBlock(t);){if(t.parentNode.lastChild!==t||t===n)return;t=t.parentNode}I.add(t,"br",{"data-mce-bogus":1})}})}a.on("SetContent ExecCommand",function(t){("setcontent"==t.type||"mceInsertLink"===t.command)&&e()})}function S(){W.forced_root_block&&a.on("init",function(){s("DefaultParagraphSeparator",W.forced_root_block)})}function T(){a.on("Undo Redo SetContent",function(e){e.initial||a.execCommand("mceRepaint")})}function R(){a.on("keydown",function(e){var t;c(e)||e.keyCode!=P||(t=a.getDoc().selection.createRange(),t&&t.item&&(e.preventDefault(),a.undoManager.beforeChange(),I.remove(t.item(0)),a.undoManager.add()))})}function A(){var e;l()>=10&&(e="",D("p div h1 h2 h3 h4 h5 h6".split(" "),function(t,n){e+=(n>0?",":"")+t+":empty"}),a.contentStyles.push(e+"{padding-right: 1px !important}"))}function B(){l()<9&&(z.addNodeFilter("noscript",function(e){for(var t=e.length,n,r;t--;)n=e[t],r=n.firstChild,r&&n.attr("data-mce-innertext",r.value)}),V.addNodeFilter("noscript",function(e){for(var t=e.length,i,o,a;t--;)i=e[t],o=e[t].firstChild,o?o.value=r.decode(o.value):(a=i.attributes.map["data-mce-innertext"],a&&(i.attr("data-mce-innertext",null),o=new n("#text",3),o.value=a,o.raw=!0,i.append(o)))}))}function H(){function e(e,t){var n=i.createTextRange();try{n.moveToPoint(e,t)}catch(r){n=null}return n}function t(t){var r;t.button?(r=e(t.x,t.y),r&&(r.compareEndPoints("StartToStart",a)>0?r.setEndPoint("StartToStart",a):r.setEndPoint("EndToEnd",a),r.select())):n()}function n(){var e=r.selection.createRange();a&&!e.item&&0===e.compareEndPoints("StartToEnd",e)&&a.select(),I.unbind(r,"mouseup",n),I.unbind(r,"mousemove",t),a=o=0}var r=I.doc,i=r.body,o,a,s;r.documentElement.unselectable=!0,I.bind(r,"mousedown contextmenu",function(i){if("HTML"===i.target.nodeName){if(o&&n(),s=r.documentElement,s.scrollHeight>s.clientHeight)return;o=1,a=e(i.x,i.y),a&&(I.bind(r,"mouseup",n),I.bind(r,"mousemove",t),I.win.focus(),a.select())}})}function M(){a.on("keyup focusin",function(t){65==t.keyCode&&e.metaKeyPressed(t)||F.normalize()})}function L(){a.contentStyles.push("img:-moz-broken {-moz-force-broken-image-icon:1;min-width:24px;min-height:24px}")}var D=o.each,P=e.BACKSPACE,O=e.DELETE,I=a.dom,F=a.selection,W=a.settings,z=a.parser,V=a.serializer,U=i.gecko,q=i.ie,j=i.webkit;C(),N(),u(),M(),j&&(_(),d(),p(),g(),S(),i.iOS?y():f()),q&&(h(),b(),x(),w(),R(),A(),B(),H()),U&&(h(),m(),v(),E(),k(),T(),L())}}),r(tt,[f],function(e){function t(){return!1}function n(){return!0}var r="__bindings",i=e.makeMap("focusin focusout click dblclick mousedown mouseup mousemove mouseover beforepaste paste cut copy selectionchange mouseout mouseenter mouseleave keydown keypress keyup contextmenu dragend dragover draggesture dragdrop drop drag"," ");return{fire:function(e,i,o){var a=this,s,l,c,d,u;if(e=e.toLowerCase(),i=i||{},i.type=e,i.target||(i.target=a),i.preventDefault||(i.preventDefault=function(){i.isDefaultPrevented=n},i.stopPropagation=function(){i.isPropagationStopped=n},i.stopImmediatePropagation=function(){i.isImmediatePropagationStopped=n},i.isDefaultPrevented=t,i.isPropagationStopped=t,i.isImmediatePropagationStopped=t),a[r]&&(s=a[r][e]))for(l=0,c=s.length;c>l&&(s[l]=d=s[l],!i.isImmediatePropagationStopped());l++)if(d.call(a,i)===!1)return i.preventDefault(),i;if(o!==!1&&a.parent)for(u=a.parent();u&&!i.isPropagationStopped();)u.fire(e,i,!1),u=u.parent();return i},on:function(e,t){var n=this,o,a,s,l;if(t===!1&&(t=function(){return!1}),t)for(s=e.toLowerCase().split(" "),l=s.length;l--;)e=s[l],o=n[r],o||(o=n[r]={}),a=o[e],a||(a=o[e]=[],n.bindNative&&i[e]&&n.bindNative(e)),a.push(t);return n},off:function(e,t){var n=this,o,a=n[r],s,l,c,d;if(a)if(e)for(c=e.toLowerCase().split(" "),o=c.length;o--;){if(e=c[o],s=a[e],!e){for(l in a)a[e].length=0;return n}if(s){if(t)for(d=s.length;d--;)s[d]===t&&s.splice(d,1);else s.length=0;!s.length&&n.unbindNative&&i[e]&&(n.unbindNative(e),delete a[e])}}else{if(n.unbindNative)for(e in a)n.unbindNative(e);n[r]=[]}return n}}}),r(nt,[f,m],function(e,t){var n=e.each,r=e.explode,i={f9:120,f10:121,f11:122};return function(o){var a=this,s={};o.on("keyup keypress keydown",function(e){(e.altKey||e.ctrlKey||e.metaKey)&&n(s,function(n){var r=t.mac?e.ctrlKey||e.metaKey:e.ctrlKey;if(n.ctrl==r&&n.alt==e.altKey&&n.shift==e.shiftKey)return e.keyCode==n.keyCode||e.charCode&&e.charCode==n.charCode?(e.preventDefault(),"keydown"==e.type&&n.func.call(n.scope),!0):void 0})}),a.add=function(t,a,l,c){var d;return d=l,"string"==typeof l?l=function(){o.execCommand(d,!1,null)}:e.isArray(d)&&(l=function(){o.execCommand(d[0],d[1],d[2])}),n(r(t.toLowerCase()),function(e){var t={func:l,scope:c||o,desc:o.translate(a),alt:!1,ctrl:!1,shift:!1};n(r(e,"+"),function(e){switch(e){case"alt":case"ctrl":case"shift":t[e]=!0;break;default:t.charCode=e.charCodeAt(0),t.keyCode=i[e]||e.toUpperCase().charCodeAt(0)}}),s[(t.ctrl?"ctrl":"")+","+(t.alt?"alt":"")+","+(t.shift?"shift":"")+","+t.keyCode]=t}),!0}}}),r(rt,[g,y,b,E,N,R,B,H,M,L,D,P,v,d,Z,C,w,et,m,f,tt,nt],function(e,n,r,i,o,a,s,l,c,d,u,f,p,h,m,g,v,y,b,C,x,w){function _(e,t){return"selectionchange"==t||"drop"==t?e.getDoc():!e.inline&&/^mouse|click|contextmenu/.test(t)?e.getDoc():e.getBody()}function N(e,t,r){var i=this,o,a;o=i.documentBaseUrl=r.documentBaseURL,a=r.baseURI,i.settings=t=T({id:e,theme:"modern",delta_width:0,delta_height:0,popup_css:"",plugins:"",document_base_url:o,add_form_submit_trigger:!0,submit_patch:!0,add_unload_trigger:!0,convert_urls:!0,relative_urls:!0,remove_script_host:!0,object_resizing:!0,doctype:"<!DOCTYPE html>",visual:!0,font_size_style_values:"xx-small,x-small,small,medium,large,x-large,xx-large",font_size_legacy_values:"xx-small,small,medium,large,x-large,xx-large,300%",forced_root_block:"p",hidden_input:!0,padd_empty_editor:!0,render_ui:!0,indentation:"30px",inline_styles:!0,convert_fonts_to_spans:!0,indent:"simple",indent_before:"p,h1,h2,h3,h4,h5,h6,blockquote,div,title,style,pre,script,td,ul,li,area,table,thead,tfoot,tbody,tr,section,article,hgroup,aside,figure,option,optgroup,datalist",indent_after:"p,h1,h2,h3,h4,h5,h6,blockquote,div,title,style,pre,script,td,ul,li,area,table,thead,tfoot,tbody,tr,section,article,hgroup,aside,figure,option,optgroup,datalist",validate:!0,entity_encoding:"named",url_converter:i.convertURL,url_converter_scope:i,ie7_compat:!0},t),n.settings=t,n.baseURL=r.baseURL,i.id=t.id=e,i.isNotDirty=!0,i.plugins={},i.documentBaseURI=new f(t.document_base_url||o,{base_uri:a}),i.baseURI=a,i.contentCSS=[],i.contentStyles=[],i.shortcuts=new w(i),i.execCommands={},i.queryStateCommands={},i.queryValueCommands={},i.loadedCSS={},i.suffix=r.suffix,i.editorManager=r,i.inline=t.inline,i.execCallback("setup",i)}var E=e.DOM,k=n.ThemeManager,S=n.PluginManager,T=C.extend,R=C.each,A=C.explode,B=C.inArray,H=C.trim,M=C.resolve,L=h.Event,D=b.gecko,P=b.ie,O=b.opera;return N.prototype={render:function(){function e(){var e=p.ScriptLoader;n.language&&"en"!=n.language&&(n.language_url=t.editorManager.baseURL+"/langs/"+n.language+".js"),n.language_url&&e.add(n.language_url),n.theme&&"function"!=typeof n.theme&&"-"!=n.theme.charAt(0)&&!k.urls[n.theme]&&k.load(n.theme,"themes/"+n.theme+"/theme"+i+".js"),C.isArray(n.plugins)&&(n.plugins=n.plugins.join(" ")),R(n.external_plugins,function(e,t){S.load(t,e),n.plugins+=" "+t}),R(n.plugins.split(/[ ,]/),function(e){if(e=H(e),e&&!S.urls[e])if("-"==e.charAt(0)){e=e.substr(1,e.length);var t=S.dependencies(e);R(t,function(e){var t={prefix:"plugins/",resource:e,suffix:"/plugin"+i+".js"};e=S.createUrl(t,e),S.load(e.resource,e)})}else S.load(e,{prefix:"plugins/",resource:e,suffix:"/plugin"+i+".js"})}),e.loadQueue(function(){t.removed||t.init()})}var t=this,n=t.settings,r=t.id,i=t.suffix;if(!L.domLoaded)return E.bind(window,"ready",function(){t.render()}),void 0;if(t.editorManager.settings=n,t.getElement()&&b.contentEditable){n.inline?t.inline=!0:(t.orgVisibility=t.getElement().style.visibility,t.getElement().style.visibility="hidden");var o=t.getElement().form||E.getParent(r,"form");o&&(t.formElement=o,n.hidden_input&&!/TEXTAREA|INPUT/i.test(t.getElement().nodeName)&&E.insertAfter(E.create("input",{type:"hidden",name:r}),r),t.formEventDelegate=function(e){t.fire(e.type,e)},E.bind(o,"submit reset",t.formEventDelegate),t.on("reset",function(){t.setContent(t.startContent,{format:"raw"})}),!n.submit_patch||o.submit.nodeType||o.submit.length||o._mceOldSubmit||(o._mceOldSubmit=o.submit,o.submit=function(){return t.editorManager.triggerSave(),t.isNotDirty=!0,o._mceOldSubmit(o)})),t.windowManager=new m(t),"xml"==n.encoding&&t.on("GetContent",function(e){e.save&&(e.content=E.encode(e.content))}),n.add_form_submit_trigger&&t.on("submit",function(){t.initialized&&(t.save(),t.isNotDirty=!0)}),n.add_unload_trigger&&(t._beforeUnload=function(){!t.initialized||t.destroyed||t.isHidden()||t.save({format:"raw",no_events:!0})},t.editorManager.on("BeforeUnload",t._beforeUnload)),e()}},init:function(){function e(n){var r=S.get(n),i,o;i=S.urls[n]||t.documentBaseUrl.replace(/\/$/,""),n=H(n),r&&-1===B(h,n)&&(R(S.dependencies(n),function(t){e(t)}),o=new r(t,i),t.plugins[n]=o,o.init&&(o.init(t,i),h.push(n)))}var t=this,n=t.settings,r=t.getElement(),i,o,a,s,l,c,d,u,f,p,h=[];if(t.editorManager.add(t),n.aria_label=n.aria_label||E.getAttrib(r,"aria-label",t.getLang("aria.rich_text_area")),n.theme&&("function"!=typeof n.theme?(n.theme=n.theme.replace(/-/,""),l=k.get(n.theme),t.theme=new l(t,k.urls[n.theme]),t.theme.init&&t.theme.init(t,k.urls[n.theme]||t.documentBaseUrl.replace(/\/$/,""))):t.theme=n.theme),R(n.plugins.replace(/\-/g,"").split(/[ ,]/),e),t.fire("BeforeRenderUI"),n.render_ui&&t.theme&&(t.orgDisplay=r.style.display,"function"!=typeof n.theme?(i=n.width||r.style.width||r.offsetWidth,o=n.height||r.style.height||r.offsetHeight,a=n.min_height||100,f=/^[0-9\.]+(|px)$/i,f.test(""+i)&&(i=Math.max(parseInt(i,10)+(l.deltaWidth||0),100)),f.test(""+o)&&(o=Math.max(parseInt(o,10)+(l.deltaHeight||0),a)),l=t.theme.renderUI({targetNode:r,width:i,height:o,deltaWidth:n.delta_width,deltaHeight:n.delta_height}),n.content_editable||(E.setStyles(l.sizeContainer||l.editorContainer,{wi2dth:i,h2eight:o}),o=(l.iframeHeight||o)+("number"==typeof o?l.deltaHeight||0:""),a>o&&(o=a))):(l=n.theme(t,r),l.editorContainer.nodeType&&(l.editorContainer=l.editorContainer.id=l.editorContainer.id||t.id+"_parent"),l.iframeContainer.nodeType&&(l.iframeContainer=l.iframeContainer.id=l.iframeContainer.id||t.id+"_iframecontainer"),o=l.iframeHeight||r.offsetHeight),t.editorContainer=l.editorContainer),n.content_css&&R(A(n.content_css),function(e){t.contentCSS.push(t.documentBaseURI.toAbsolute(e))}),n.content_style&&t.contentStyles.push(n.content_style),n.content_editable)return r=s=l=null,t.initContentBody();for(document.domain&&location.hostname!=document.domain&&(t.editorManager.relaxedDomain=document.domain),t.iframeHTML=n.doctype+"<html><head>",n.document_base_url!=t.documentBaseUrl&&(t.iframeHTML+='<base href="'+t.documentBaseURI.getURI()+'" />'),!b.caretAfter&&n.ie7_compat&&(t.iframeHTML+='<meta http-equiv="X-UA-Compatible" content="IE=7" />'),t.iframeHTML+='<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />',p=0;p<t.contentCSS.length;p++){var m=t.contentCSS[p];t.iframeHTML+='<link type="text/css" rel="stylesheet" href="'+m+'" />',t.loadedCSS[m]=!0}d=n.body_id||"tinymce",-1!=d.indexOf("=")&&(d=t.getParam("body_id","","hash"),d=d[t.id]||d),u=n.body_class||"",-1!=u.indexOf("=")&&(u=t.getParam("body_class","","hash"),u=u[t.id]||""),t.iframeHTML+='</head><body id="'+d+'" class="mce-content-body '+u+'" '+"onload=\"window.parent.tinymce.get('"+t.id+"').fire('load');\"><br></body></html>",t.editorManager.relaxedDomain&&(P||O&&parseFloat(window.opera.version())<11)&&(c='javascript:(function(){document.open();document.domain="'+document.domain+'";'+'var ed = window.parent.tinymce.get("'+t.id+'");document.write(ed.iframeHTML);'+"document.close();ed.initContentBody();})()"),s=E.add(l.iframeContainer,"iframe",{id:t.id+"_ifr",src:c||'javascript:""',frameBorder:"0",allowTransparency:"true",title:t.editorManager.translate("Rich Text Area. Press ALT-F9 for menu. Press ALT-F10 for toolbar. Press ALT-0 for help"),style:{width:"100%",height:o,display:"block"}}),t.contentAreaContainer=l.iframeContainer,l.editorContainer&&(E.get(l.editorContainer).style.display=t.orgDisplay),E.get(t.id).style.display="none",E.setAttrib(t.id,"aria-hidden",!0),t.editorManager.relaxedDomain&&c||t.initContentBody(),r=s=l=null},initContentBody:function(){var t=this,n=t.settings,o=E.get(t.id),f=t.getDoc(),p,h;n.inline||(t.getElement().style.visibility=t.orgVisibility),P&&t.editorManager.relaxedDomain||n.content_editable||(f.open(),f.write(t.iframeHTML),f.close(),t.editorManager.relaxedDomain&&(f.domain=t.editorManager.relaxedDomain)),n.content_editable&&(t.on("remove",function(){var e=this.getBody();E.removeClass(e,"mce-content-body"),E.removeClass(e,"mce-edit-focus"),E.setAttrib(e,"tabIndex",null),E.setAttrib(e,"contentEditable",null)}),E.addClass(o,"mce-content-body"),o.tabIndex=-1,t.contentDocument=f=n.content_document||document,t.contentWindow=n.content_window||window,t.bodyElement=o,n.content_document=n.content_window=null,n.root_name=o.nodeName.toLowerCase()),p=t.getBody(),p.disabled=!0,n.readonly||(p.contentEditable=t.getParam("content_editable_state",!0)),p.disabled=!1,t.schema=new g(n),t.dom=new e(f,{keep_values:!0,url_converter:t.convertURL,url_converter_scope:t,hex_colors:n.force_hex_style_colors,class_filter:n.class_filter,update_styles:!0,root_element:n.content_editable?t.id:null,schema:t.schema,onSetAttrib:function(e){t.fire("SetAttrib",e)}}),t.parser=new v(n,t.schema),t.parser.addAttributeFilter("src,href,style",function(e,n){for(var r=e.length,i,o=t.dom,a,s;r--;)i=e[r],a=i.attr(n),s="data-mce-"+n,i.attributes.map[s]||("style"===n?i.attr(s,o.serializeStyle(o.parseStyle(a),i.name)):i.attr(s,t.convertURL(a,n,i.name)))}),t.parser.addNodeFilter("script",function(e){for(var t=e.length,n;t--;)n=e[t],n.attr("type","mce-"+(n.attr("type")||"text/javascript"))}),t.parser.addNodeFilter("#cdata",function(e){for(var t=e.length,n;t--;)n=e[t],n.type=8,n.name="#comment",n.value="[CDATA["+n.value+"]]"}),t.parser.addNodeFilter("p,h1,h2,h3,h4,h5,h6,div",function(e){for(var n=e.length,i,o=t.schema.getNonEmptyElements();n--;)i=e[n],i.isEmpty(o)&&(i.empty().append(new r("br",1)).shortEnded=!0)}),t.serializer=new i(n,t),t.selection=new a(t.dom,t.getWin(),t.serializer,t),t.formatter=new s(t),t.undoManager=new l(t),t.forceBlocks=new d(t),t.enterKey=new c(t),t.editorCommands=new u(t),t.fire("PreInit"),n.browser_spellcheck||n.gecko_spellcheck||(f.body.spellcheck=!1,E.setAttrib(p,"spellcheck","false")),t.fire("PostRender"),t.quirks=y(t),n.directionality&&(p.dir=n.directionality),n.nowrap&&(p.style.whiteSpace="nowrap"),n.protect&&t.on("BeforeSetContent",function(e){R(n.protect,function(t){e.content=e.content.replace(t,function(e){return"<!--mce:protected "+escape(e)+"-->"})})}),t.on("SetContent",function(){t.addVisual(t.getBody())}),n.padd_empty_editor&&t.on("PostProcess",function(e){e.content=e.content.replace(/^(<p[^>]*>(&nbsp;|&#160;|\s|\u00a0|)<\/p>[\r\n]*|<br \/>[\r\n]*)$/,"")}),t.load({initial:!0,format:"html"}),t.startContent=t.getContent({format:"raw"}),t.initialized=!0,R(t._pendingNativeEvents,function(e){t.dom.bind(_(t,e),e,function(e){t.fire(e.type,e)})}),t.fire("init"),t.focus(!0),t.nodeChanged({initial:!0}),t.execCallback("init_instance_callback",t),t.contentStyles.length>0&&(h="",R(t.contentStyles,function(e){h+=e+"\r\n"}),t.dom.addStyle(h)),R(t.contentCSS,function(e){t.loadedCSS[e]||(t.dom.loadCSS(e),t.loadedCSS[e]=!0)}),n.auto_focus&&setTimeout(function(){var e=t.editorManager.get(n.auto_focus);e.selection.select(e.getBody(),1),e.selection.collapse(1),e.getBody().focus(),e.getWin().focus()},100),o=f=p=null},focus:function(e){var t,n=this,r=n.selection,i=n.settings.content_editable,o,a,s=n.getDoc(),l;e||(o=r.getRng(),o.item&&(a=o.item(0)),n._refreshContentEditable(),i||(n.getBody().focus(),n.getWin().focus()),(D||i)&&(l=n.getBody(),l.setActive?l.setActive():l.focus(),i&&r.normalize()),a&&a.ownerDocument==s&&(o=s.body.createControlRange(),o.addElement(a),o.select())),n.editorManager.activeEditor!=n&&((t=n.editorManager.activeEditor)&&t.fire("deactivate",{relatedTarget:n}),n.fire("activate",{relatedTarget:t})),n.editorManager.activeEditor=n},execCallback:function(e){var t=this,n=t.settings[e],r;if(n)return t.callbackLookup&&(r=t.callbackLookup[e])&&(n=r.func,r=r.scope),"string"==typeof n&&(r=n.replace(/\.\w+$/,""),r=r?M(r):0,n=M(n),t.callbackLookup=t.callbackLookup||{},t.callbackLookup[e]={func:n,scope:r}),n.apply(r||t,Array.prototype.slice.call(arguments,1))},translate:function(e){var t=this.settings.language||"en",n=this.editorManager.i18n;return e?n[t+"."+e]||e.replace(/\{\#([^\}]+)\}/g,function(e,r){return n[t+"."+r]||"{#"+r+"}"}):""},getLang:function(e,n){return this.editorManager.i18n[(this.settings.language||"en")+"."+e]||(n!==t?n:"{#"+e+"}")},getParam:function(e,t,n){var r=e in this.settings?this.settings[e]:t,i;return"hash"===n?(i={},"string"==typeof r?R(r.indexOf("=")>0?r.split(/[;,](?![^=;,]*(?:[;,]|$))/):r.split(","),function(e){e=e.split("="),i[H(e[0])]=e.length>1?H(e[1]):H(e)}):i=r,i):r},nodeChanged:function(){var e=this,t=e.selection,n,r,i;e.initialized&&!e.settings.disable_nodechange&&(i=e.getBody(),n=t.getStart()||i,n=P&&n.ownerDocument!=e.getDoc()?e.getBody():n,"IMG"==n.nodeName&&t.isCollapsed()&&(n=n.parentNode),r=[],e.dom.getParent(n,function(e){return e===i?!0:(r.push(e),void 0)}),e.fire("NodeChange",{element:n,parents:r}))},addButton:function(e,t){var n=this;t.cmd&&(t.onclick=function(){n.execCommand(t.cmd)}),t.text||t.icon||(t.icon=e),n.buttons=n.buttons||{},t.tooltip=t.tooltip||t.title,n.buttons[e]=t},addMenuItem:function(e,t){var n=this;t.cmd&&(t.onclick=function(){n.execCommand(t.cmd)}),n.menuItems=n.menuItems||{},n.menuItems[e]=t},addCommand:function(e,t,n){this.execCommands[e]={func:t,scope:n||this}},addQueryStateHandler:function(e,t,n){this.queryStateCommands[e]={func:t,scope:n||this}},addQueryValueHandler:function(e,t,n){this.queryValueCommands[e]={func:t,scope:n||this}},addShortcut:function(e,t,n,r){this.shortcuts.add(e,t,n,r)},execCommand:function(e,t,n,r){var i=this,o=0,a;return/^(mceAddUndoLevel|mceEndUndoLevel|mceBeginUndoLevel|mceRepaint)$/.test(e)||r&&r.skip_focus||i.focus(),r=T({},r),r=i.fire("BeforeExecCommand",{command:e,ui:t,value:n}),r.isDefaultPrevented()?!1:(a=i.execCommands[e])&&a.func.call(a.scope,t,n)!==!0?(i.fire("ExecCommand",{command:e,ui:t,value:n}),!0):(R(i.plugins,function(r){return r.execCommand&&r.execCommand(e,t,n)?(i.fire("ExecCommand",{command:e,ui:t,value:n}),o=!0,!1):void 0}),o?o:i.theme&&i.theme.execCommand&&i.theme.execCommand(e,t,n)?(i.fire("ExecCommand",{command:e,ui:t,value:n}),!0):i.editorCommands.execCommand(e,t,n)?(i.fire("ExecCommand",{command:e,ui:t,value:n}),!0):(i.getDoc().execCommand(e,t,n),i.fire("ExecCommand",{command:e,ui:t,value:n}),void 0))},queryCommandState:function(e){var t=this,n,r;if(!t._isHidden()){if((n=t.queryStateCommands[e])&&(r=n.func.call(n.scope),r!==!0))return r;if(r=t.editorCommands.queryCommandState(e),-1!==r)return r;
try{return t.getDoc().queryCommandState(e)}catch(i){}}},queryCommandValue:function(e){var n=this,r,i;if(!n._isHidden()){if((r=n.queryValueCommands[e])&&(i=r.func.call(r.scope),i!==!0))return i;if(i=n.editorCommands.queryCommandValue(e),i!==t)return i;try{return n.getDoc().queryCommandValue(e)}catch(o){}}},show:function(){var e=this;E.show(e.getContainer()),E.hide(e.id),e.load(),e.fire("show")},hide:function(){var e=this,t=e.getDoc();P&&t&&t.execCommand("SelectAll"),e.save(),E.hide(e.getContainer()),E.setStyle(e.id,"display",e.orgDisplay),e.fire("hide")},isHidden:function(){return!E.isHidden(this.id)},setProgressState:function(e,t){this.fire("ProgressState",{state:e,time:t})},load:function(e){var n=this,r=n.getElement(),i;return r?(e=e||{},e.load=!0,i=n.setContent(r.value!==t?r.value:r.innerHTML,e),e.element=r,e.no_events||n.fire("LoadContent",e),e.element=r=null,i):void 0},save:function(e){var t=this,n=t.getElement(),r,i;if(n&&t.initialized)return e=e||{},e.save=!0,e.element=n,r=e.content=t.getContent(e),e.no_events||t.fire("SaveContent",e),r=e.content,/TEXTAREA|INPUT/i.test(n.nodeName)?n.value=r:(n.innerHTML=r,(i=E.getParent(t.id,"form"))&&R(i.elements,function(e){return e.name==t.id?(e.value=r,!1):void 0})),e.element=n=null,t.isNotDirty=!0,r},setContent:function(e,t){var n=this,r=n.getBody(),i;return t=t||{},t.format=t.format||"html",t.set=!0,t.content=e,t.no_events||n.fire("BeforeSetContent",t),e=t.content,P||0!==e.length&&!/^\s+$/.test(e)?("raw"!==t.format&&(e=new o({},n.schema).serialize(n.parser.parse(e,{isRootContent:!0}))),t.content=H(e),n.dom.setHTML(r,t.content),t.no_events||n.fire("SetContent",t),n.settings.content_editable&&document.activeElement!==n.getBody()||n.selection.normalize(),t.content):(i=n.settings.forced_root_block,e=i&&n.schema.isValidChild(r.nodeName.toLowerCase(),i.toLowerCase())?"<"+i+'><br data-mce-bogus="1"></'+i+">":'<br data-mce-bogus="1">',r.innerHTML=e,n.selection.select(r,!0),n.selection.collapse(!0),n.fire("SetContent",t),void 0)},getContent:function(e){var t=this,n,r=t.getBody();return e=e||{},e.format=e.format||"html",e.get=!0,e.getInner=!0,e.no_events||t.fire("BeforeGetContent",e),n="raw"==e.format?r.innerHTML:"text"==e.format?r.innerText||r.textContent:t.serializer.serialize(r,e),e.content="text"!=e.format?H(n):n,e.no_events||t.fire("GetContent",e),e.content},insertContent:function(e){this.execCommand("mceInsertContent",!1,e)},isDirty:function(){return!this.isNotDirty},getContainer:function(){var e=this;return e.container||(e.container=E.get(e.editorContainer||e.id+"_parent")),e.container},getContentAreaContainer:function(){return this.contentAreaContainer},getElement:function(){return E.get(this.settings.content_element||this.id)},getWin:function(){var e=this,t;return e.contentWindow||(t=E.get(e.id+"_ifr"),t&&(e.contentWindow=t.contentWindow)),e.contentWindow},getDoc:function(){var e=this,t;return e.contentDocument||(t=e.getWin(),t&&(e.contentDocument=t.document)),e.contentDocument},getBody:function(){return this.bodyElement||this.getDoc().body},convertURL:function(e,t,n){var r=this,i=r.settings;return i.urlconverter_callback?r.execCallback("urlconverter_callback",e,n,!0,t):!i.convert_urls||n&&"LINK"==n.nodeName||0===e.indexOf("file:")||0===e.length?e:i.relative_urls?r.documentBaseURI.toRelative(e):e=r.documentBaseURI.toAbsolute(e,i.remove_script_host)},addVisual:function(e){var n=this,r=n.settings,i=n.dom,o;e=e||n.getBody(),n.hasVisual===t&&(n.hasVisual=r.visual),R(i.select("table,a",e),function(e){var t;switch(e.nodeName){case"TABLE":return o=r.visual_table_class||"mce-item-table",t=i.getAttrib(e,"border"),t&&"0"!=t||(n.hasVisual?i.addClass(e,o):i.removeClass(e,o)),void 0;case"A":return i.getAttrib(e,"href",!1)||(t=i.getAttrib(e,"name")||e.id,o="mce-item-anchor",t&&(n.hasVisual?i.addClass(e,o):i.removeClass(e,o))),void 0}}),n.fire("VisualAid",{element:e,hasVisual:n.hasVisual})},remove:function(){var e=this,t=e.getContainer(),n=e.getDoc();e.removed||(e.removed=1,P&&n&&n.execCommand("SelectAll"),e.save(),E.setStyle(e.id,"display",e.orgDisplay),e.settings.content_editable||(L.unbind(e.getWin()),L.unbind(e.getDoc())),L.unbind(e.getBody()),L.unbind(t),e.fire("remove"),e.editorManager.remove(e),E.remove(t))},bindNative:function(e){var t=this;t.initialized?t.dom.bind(_(t,e),e,function(n){t.fire(e,n)}):t._pendingNativeEvents?t._pendingNativeEvents.push(e):t._pendingNativeEvents=[e]},unbindNative:function(e){var t=this;t.initialized&&t.dom.unbind(e)},destroy:function(e){var t=this,n;t.destroyed||(D&&(L.unbind(t.getDoc()),L.unbind(t.getWin()),L.unbind(t.getBody())),e||(t.editorManager.off("beforeunload",t._beforeUnload),t.theme&&t.theme.destroy&&t.theme.destroy(),t.selection.destroy(),t.dom.destroy()),n=t.formElement,n&&(n.submit=n._mceOldSubmit,n._mceOldSubmit=null,E.unbind(n,"submit reset",t.formEventDelegate)),t.contentAreaContainer=t.formElement=t.container=null,t.settings.content_element=t.bodyElement=t.contentDocument=t.contentWindow=null,t.selection&&(t.selection=t.selection.win=t.selection.dom=t.selection.dom.doc=null),t.destroyed=1)},_refreshContentEditable:function(){var e=this,t,n;e._isHidden()&&(t=e.getBody(),n=t.parentNode,n.removeChild(t),n.appendChild(t),t.focus())},_isHidden:function(){var e;return D?(e=this.selection.getSel(),!e||!e.rangeCount||0===e.rangeCount):0}},T(N.prototype,x),N}),r(it,[],function(){var e={};return{add:function(t,n){for(var r in n)e[r]=n[r]},translate:function(t){if("undefined"==typeof t)return t;if("string"!=typeof t&&t.raw)return t.raw;if(t.push){var n=t.slice(1);t=(e[t[0]]||t[0]).replace(/\{([^\}]+)\}/g,function(e,t){return n[t]})}return e[t]||t},data:e}}),r(ot,[g,m],function(e,t){function n(r){function i(){try{return document.activeElement}catch(e){return document.body}}function o(o){function a(t){return!!e.DOM.getParent(t,n.isEditorUIElement)}var s=o.editor,l,c;s.on("init",function(){"onbeforedeactivate"in document?s.dom.bind(s.getBody(),"beforedeactivate",function(){var e=s.getDoc().selection;l=e&&e.createRange?e.createRange():s.selection.getRng()}):s.inline&&(s.on("nodechange",function(){for(var e,t=document.activeElement;t;){if(t==s.getBody()){e=!0;break}t=t.parentNode}e&&(l=s.selection.getRng())}),t.webkit&&(c=function(){var e=s.selection.getRng();e.collapsed||(l=e)},e.DOM.bind(document,"selectionchange",c),s.on("remove",function(){e.DOM.unbind(document,"selectionchange",c)})))}),s.on("focusin",function(){var e=r.focusedEditor;s.selection.restoreRng&&(s.selection.setRng(s.selection.restoreRng),s.selection.restoreRng=null),e!=s&&(e&&e.fire("blur",{focusedEditor:s}),s.fire("focus",{blurredEditor:e}),s.focus(!1),r.focusedEditor=s)}),s.on("focusout",function(){s.selection.restoreRng=l,window.setTimeout(function(){var e=r.focusedEditor;e!=s&&(s.selection.restoreRng=null),a(i())||e!=s||(s.fire("blur",{focusedEditor:null}),r.focusedEditor=null,s.selection.restoreRng=null)},0)})}r.on("AddEditor",o)}return n.isEditorUIElement=function(e){return-1!==e.className.indexOf("mce-")},n}),r(at,[rt,g,P,m,f,tt,it,ot],function(e,n,r,i,o,a,s,l){var c=n.DOM,d=o.explode,u=o.each,f=o.extend,p=0,h,m={majorVersion:"4",minorVersion:"0",releaseDate:"2013-06-26",editors:[],i18n:s,activeEditor:null,setup:function(){var e=this,t,n,i="",o;if(n=document.location.href.replace(/[\?#].*$/,"").replace(/[\/\\][^\/]+$/,""),/[\/\\]$/.test(n)||(n+="/"),o=window.tinymce||window.tinyMCEPreInit)t=o.base||o.baseURL,i=o.suffix;else for(var a=document.getElementsByTagName("script"),s=0;s<a.length;s++){var c=a[s].src;if(/tinymce(\.jquery|)(\.min|\.dev|)\.js/.test(c)){-1!=c.indexOf(".min")&&(i=".min"),t=c.substring(0,c.lastIndexOf("/"));break}}e.baseURL=new r(n).toAbsolute(t),e.documentBaseURL=n,e.baseURI=new r(e.baseURL),e.suffix=i,e.focusManager=new l(e)},init:function(t){function n(e){var t=e.id;return t||(t=e.name,t=t&&!c.get(t)?e.name:c.uniqueId(),e.setAttribute("id",t)),t}function r(e,t,n){var r=e[t];if(r)return r.apply(n||this,Array.prototype.slice.call(arguments,2))}function i(e,t){return t.constructor===RegExp?t.test(e.className):c.hasClass(e,t)}var o=this,a=[],s;o.settings=t,c.bind(window,"ready",function(){var l,h;if(r(t,"onpageload"),t.types)return u(t.types,function(r){u(c.select(r.selector),function(i){var s=new e(n(i),f({},t,r),o);a.push(s),s.render(1)})}),void 0;if(t.selector)return u(c.select(t.selector),function(r){var i=new e(n(r),t,o);a.push(i),i.render(1)}),void 0;switch(t.mode){case"exact":l=t.elements||"",l.length>0&&u(d(l),function(n){c.get(n)?(s=new e(n,t,o),a.push(s),s.render(!0)):u(document.forms,function(r){u(r.elements,function(r){r.name===n&&(n="mce_editor_"+p++,c.setAttrib(r,"id",n),s=new e(n,t,o),a.push(s),s.render(1))})})});break;case"textareas":case"specific_textareas":u(c.select("textarea"),function(r){t.editor_deselector&&i(r,t.editor_deselector)||(!t.editor_selector||i(r,t.editor_selector))&&(s=new e(n(r),t,o),a.push(s),s.render(!0))})}t.oninit&&(l=h=0,u(a,function(e){h++,e.initialized?l++:e.on("init",function(){l++,l==h&&r(t,"oninit")}),l==h&&r(t,"oninit")}))})},get:function(e){return e===t?this.editors:this.editors[e]},add:function(e){var t=this,n=t.editors;return n[e.id]=e,n.push(e),t.activeEditor=e,t.fire("AddEditor",{editor:e}),h||(h=function(){t.fire("BeforeUnload")},c.bind(window,"beforeunload",h)),e},createEditor:function(t,n){return this.add(new e(t,n,this))},remove:function(e){var t=this,n,r=t.editors,i;if(e){if("string"==typeof e)return e=e.selector||e,u(c.select(e),function(e){t.remove(r[e.id])}),void 0;if(i=e,!r[i.id])return null;for(delete r[i.id],n=0;n<r.length;n++)if(r[n]==i){r.splice(n,1);break}if(t.activeEditor==i&&(t.activeEditor=r[0]),i&&!i.removed)return i.remove(),i.destroy(),t.fire("RemoveEditor",{editor:i}),r.length||c.unbind(window,"beforeunload",h),i}else for(n=r.length-1;n>=0;n--)t.remove(r[n])},execCommand:function(t,n,r){var i=this,o=i.get(r);switch(t){case"mceAddEditor":return i.get(r)||new e(r,i.settings,i).render(),!0;case"mceRemoveEditor":return o&&o.remove(),!0;case"mceToggleEditor":return o?(o.isHidden()?o.show():o.hide(),!0):(i.execCommand("mceAddEditor",0,r),!0)}return i.activeEditor?i.activeEditor.execCommand(t,n,r):!1},triggerSave:function(){u(this.editors,function(e){e.save()})},addI18n:function(e,t){s.add(e,t)},translate:function(e){return s.translate(e)}};return f(m,a),m.setup(),window.tinymce=window.tinyMCE=m,m}),r(st,[at,f],function(e,t){var n=t.each,r=t.explode;e.on("AddEditor",function(e){var t=e.editor;t.on("preInit",function(){function e(e,t){n(t,function(t,n){t&&s.setStyle(e,n,t)}),s.rename(e,"span")}function i(e){s=t.dom,l.convert_fonts_to_spans&&n(s.select("font,u,strike",e.node),function(e){o[e.nodeName.toLowerCase()](s,e)})}var o,a,s,l=t.settings;l.inline_styles&&(a=r(l.font_size_legacy_values),o={font:function(t,n){e(n,{backgroundColor:n.style.backgroundColor,color:n.color,fontFamily:n.face,fontSize:a[parseInt(n.size,10)-1]})},u:function(t,n){e(n,{textDecoration:"underline"})},strike:function(t,n){e(n,{textDecoration:"line-through"})}},t.on("PreProcess SetContent",i))})})}),r(lt,[],function(){return{send:function(e){function t(){!e.async||4==n.readyState||r++>1e4?(e.success&&1e4>r&&200==n.status?e.success.call(e.success_scope,""+n.responseText,n,e):e.error&&e.error.call(e.error_scope,r>1e4?"TIMED_OUT":"GENERAL",n,e),n=null):setTimeout(t,10)}var n,r=0;if(e.scope=e.scope||this,e.success_scope=e.success_scope||e.scope,e.error_scope=e.error_scope||e.scope,e.async=e.async===!1?!1:!0,e.data=e.data||"",n=new XMLHttpRequest){if(n.overrideMimeType&&n.overrideMimeType(e.content_type),n.open(e.type||(e.data?"POST":"GET"),e.url,e.async),e.content_type&&n.setRequestHeader("Content-Type",e.content_type),n.setRequestHeader("X-Requested-With","XMLHttpRequest"),n.send(e.data),!e.async)return t();setTimeout(t,10)}}}}),r(ct,[],function(){function e(t,n){var r,i,o,a;if(n=n||'"',null===t)return"null";if(o=typeof t,"string"==o)return i="\bb	t\nn\ff\rr\"\"''\\\\",n+t.replace(/([\u0080-\uFFFF\x00-\x1f\"\'\\])/g,function(e,t){return'"'===n&&"'"===e?e:(r=i.indexOf(t),r+1?"\\"+i.charAt(r+1):(e=t.charCodeAt().toString(16),"\\u"+"0000".substring(e.length)+e))})+n;if("object"==o){if(t.hasOwnProperty&&"[object Array]"===Object.prototype.toString.call(t)){for(r=0,i="[";r<t.length;r++)i+=(r>0?",":"")+e(t[r],n);return i+"]"}i="{";for(a in t)t.hasOwnProperty(a)&&(i+="function"!=typeof t[a]?(i.length>1?","+n:n)+a+n+":"+e(t[a],n):"");return i+"}"}return""+t}return{serialize:e,parse:function(e){try{return window[String.fromCharCode(101)+"val"]("("+e+")")}catch(t){}}}}),r(dt,[ct,lt,f],function(e,t,n){function r(e){this.settings=i({},e),this.count=0}var i=n.extend;return r.sendRPC=function(e){return(new r).send(e)},r.prototype={send:function(n){var r=n.error,o=n.success;n=i(this.settings,n),n.success=function(t,i){t=e.parse(t),"undefined"==typeof t&&(t={error:"JSON Parse error."}),t.error?r.call(n.error_scope||n.scope,t.error,i):o.call(n.success_scope||n.scope,t.result)},n.error=function(e,t){r&&r.call(n.error_scope||n.scope,e,t)},n.data=e.serialize({id:n.id||"c"+this.count++,method:n.method,params:n.params}),n.content_type="application/json",t.send(n)}},r}),r(ut,[g],function(e){return{callbacks:{},count:0,send:function(n){var r=this,i=e.DOM,o=n.count!==t?n.count:r.count,a="tinymce_jsonp_"+o;r.callbacks[o]=function(e){i.remove(a),delete r.callbacks[o],n.callback(e)},i.add(i.doc.body,"script",{id:a,src:n.url,type:"text/javascript"}),r.count++}}}),r(ft,[],function(){function e(){s=[];for(var e in a)s.push(e);i.length=s.length}function n(){function n(e){var n,r;return r=e!==t?c+e:i.indexOf(",",c),-1===r||r>i.length?null:(n=i.substring(c,r),c=r+1,n)}var r,i,s,c=0;a={},o.load(l),i=o.getAttribute(l)||"";do r=n(parseInt(n(),32)||0),null!==r&&(s=n(parseInt(n(),32)||0),a[r]=s);while(null!==r);e()}function r(){var t,n="";for(var r in a)t=a[r],n+=(n?",":"")+r.length.toString(32)+","+r+","+t.length.toString(32)+","+t;o.setAttribute(l,n),o.save(l),e()}var i,o,a,s,l;return window.localStorage?localStorage:(l="tinymce",o=document.documentElement,o.addBehavior("#default#userData"),i={key:function(e){return s[e]},getItem:function(e){return e in a?a[e]:null},setItem:function(e,t){a[e]=""+t,r()},removeItem:function(e){delete a[e],r()},clear:function(){a={},r()}},n(),i)}),r(pt,[g,d,v,y,f,m],function(e,t,n,r,i,o){var a=window.tinymce;return a.DOM=e.DOM,a.ScriptLoader=n.ScriptLoader,a.PluginManager=r.PluginManager,a.ThemeManager=r.ThemeManager,a.dom=a.dom||{},a.dom.Event=t.Event,i.each(i,function(e,t){a[t]=e}),i.each("isOpera isWebKit isIE isGecko isMac".split(" "),function(e){a[e]=o[e.substr(2).toLowerCase()]}),{}}),r(ht,[O,f],function(e,t){return e.extend({Defaults:{firstControlClass:"first",lastControlClass:"last"},init:function(e){this.settings=t.extend({},this.Defaults,e)},preRender:function(e){e.addClass(this.settings.containerClass,"body")},applyClasses:function(e){var t=this,n=t.settings,r,i,o;r=e.items().filter(":visible"),i=n.firstControlClass,o=n.lastControlClass,r.each(function(e){e.removeClass(i).removeClass(o),n.controlClass&&e.addClass(n.controlClass)}),r.eq(0).addClass(i),r.eq(-1).addClass(o)},renderHtml:function(e){var t=this,n=t.settings,r,i="";return r=e.items(),r.eq(0).addClass(n.firstControlClass),r.eq(-1).addClass(n.lastControlClass),r.each(function(e){n.controlClass&&e.addClass(n.controlClass),i+=e.renderHtml()}),i},recalc:function(){},postRender:function(){}})}),r(mt,[ht],function(e){return e.extend({Defaults:{containerClass:"abs-layout",controlClass:"abs-layout-item"},recalc:function(e){e.items().filter(":visible").each(function(e){var t=e.settings;e.layoutRect({x:t.x,y:t.y,w:t.w,h:t.h}),e.recalc&&e.recalc()})},renderHtml:function(e){return'<div id="'+e._id+'-absend" class="'+e.classPrefix+'abs-end"></div>'+this._super(e)}})}),r(gt,[z,K],function(e,t){return e.extend({Mixins:[t],Defaults:{classes:"widget tooltip tooltip-n"},text:function(e){var t=this;return"undefined"!=typeof e?(t._value=e,t._rendered&&(t.getEl().lastChild.innerHTML=t.encode(e)),t):t._value},renderHtml:function(){var e=this,t=e.classPrefix;return'<div id="'+e._id+'" class="'+e.classes()+'" role="presentation">'+'<div class="'+t+'tooltip-arrow"></div>'+'<div class="'+t+'tooltip-inner">'+e.encode(e._text)+"</div>"+"</div>"},repaint:function(){var e=this,t,n;t=e.getEl().style,n=e._layoutRect,t.left=n.x+"px",t.top=n.y+"px",t.zIndex=131070}})}),r(vt,[z,gt],function(e,t){var n,r=e.extend({init:function(e){var t=this;t._super(e),t.canFocus=!0,e.tooltip&&r.tooltips!==!1&&t.on("mouseenter mouseleave",function(n){var r=t.tooltip().moveTo(-65535);if(n.control==t&&"mouseenter"==n.type){var i=r.text(e.tooltip).show().testMoveRel(t.getEl(),["bc-tc","bc-tl","bc-tr"]);r.toggleClass("tooltip-n","bc-tc"==i),r.toggleClass("tooltip-nw","bc-tl"==i),r.toggleClass("tooltip-ne","bc-tr"==i),r.moveRel(t.getEl(),i)}else r.hide()}),t.aria("label",e.tooltip)},tooltip:function(){var e=this;return n||(n=new t({type:"tooltip"}),n.renderTo(e.getContainerElm())),n},active:function(e){var t=this,n;return e!==n&&(t.aria("pressed",e),t.toggleClass("active",e)),t._super(e)},disabled:function(e){var t=this,n;return e!==n&&(t.aria("disabled",e),t.toggleClass("disabled",e)),t._super(e)},postRender:function(){var e=this,t=e.settings;e._rendered=!0,e._super(),e.parent()||!t.width&&!t.height||(e.initLayoutRect(),e.repaint()),t.autofocus&&setTimeout(function(){e.focus()},0)},remove:function(){this._super(),n&&(n.remove(),n=null)}});return r}),r(yt,[vt],function(e){return e.extend({Defaults:{classes:"widget btn",role:"button"},init:function(e){var t=this,n;t.on("click mousedown",function(e){e.preventDefault()}),t._super(e),n=e.size,e.subtype&&t.addClass(e.subtype),n&&t.addClass("btn-"+n)},repaint:function(){var e=this.getEl().firstChild.style;e.width=e.height="100%",this._super()},renderHtml:function(){var e=this,t=e._id,n=e.classPrefix,r=e.settings.icon,i="";return e.settings.image&&(r="none",i=" style=\"background-image: url('"+e.settings.image+"')\""),r=e.settings.icon?n+"ico "+n+"i-"+r:"",'<div id="'+t+'" class="'+e.classes()+'" tabindex="-1">'+'<button role="presentation" type="button" tabindex="-1">'+(r?'<i class="'+r+'"'+i+"></i>":"")+(e._text?(r?" ":"")+e.encode(e._text):"")+"</button>"+"</div>"}})}),r(bt,[U],function(e){return e.extend({Defaults:{defaultType:"button",role:"toolbar"},renderHtml:function(){var e=this,t=e._layout;return e.addClass("btn-group"),e.preRender(),t.preRender(e),'<div id="'+e._id+'" class="'+e.classes()+'">'+'<div id="'+e._id+'-body">'+(e.settings.html||"")+t.renderHtml(e)+"</div>"+"</div>"}})}),r(Ct,[vt],function(e){return e.extend({Defaults:{classes:"checkbox",role:"checkbox",checked:!1},init:function(e){var t=this;t._super(e),t.on("click mousedown",function(e){e.preventDefault()}),t.on("click",function(e){e.preventDefault(),t.disabled()||t.checked(!t.checked())}),t.checked(t.settings.checked)},checked:function(e){var t=this;return"undefined"!=typeof e?(e?t.addClass("checked"):t.removeClass("checked"),t._checked=e,t.aria("checked",e),t):t._checked},value:function(e){return this.checked(e)},renderHtml:function(){var e=this,t=e._id,n=e.classPrefix;return'<div id="'+t+'" class="'+e.classes()+'" unselectable="on" aria-labeledby="'+t+'-al" tabindex="-1">'+'<i class="'+n+"ico "+n+'i-checkbox"></i>'+'<span id="'+t+'-al" class="'+n+'label">'+e.encode(e._text)+"</span>"+"</div>"}})}),r(xt,[yt,Y],function(e,t){return e.extend({showPanel:function(){var e=this,n=e.settings;n.panel.popover=!0,n.panel.autohide=!0,e.active(!0),e.panel?e.panel.show():(e.panel=new t(n.panel).on("hide",function(){e.active(!1)}).parent(e).renderTo(e.getContainerElm()),e.panel.fire("show"),e.panel.reflow()),e.panel.moveRel(e.getEl(),n.popoverAlign||"bc-tc")},hidePanel:function(){var e=this;e.panel&&e.panel.hide()},postRender:function(){var e=this;return e.on("click",function(t){t.control===e&&(e.panel&&e.panel.visible()?e.hidePanel():e.showPanel())}),e._super()}})}),r(wt,[xt,g],function(e,t){var n=t.DOM;return e.extend({init:function(e){this._super(e),this.addClass("colorbutton")},color:function(e){return e?(this._color=e,this.getEl("preview").style.backgroundColor=e,this):this._color},renderHtml:function(){var e=this,t=e._id,n=e.classPrefix,r=e.settings.icon?n+"ico "+n+"i-"+e.settings.icon:"",i=e.settings.image?" style=\"background-image: url('"+e.settings.image+"')\"":"";return'<div id="'+t+'" class="'+e.classes()+'">'+'<button role="presentation" hidefocus type="button" tabindex="-1">'+(r?'<i class="'+r+'"'+i+"></i>":"")+'<span id="'+t+'-preview" class="'+n+'preview"></span>'+(e._text?(r?" ":"")+e._text:"")+"</button>"+'<button type="button" class="'+n+'open" hidefocus tabindex="-1">'+' <i class="'+n+'caret"></i>'+"</button>"+"</div>"},postRender:function(){var e=this,t=e.settings.onclick;return e.on("click",function(r){r.control!=e||n.getParent(r.target,"."+e.classPrefix+"open")||(r.stopImmediatePropagation(),t.call(e,r))}),delete e.settings.onclick,e._super()}})}),r(_t,[vt,W],function(e,t){return e.extend({init:function(e){var n=this;n._super(e),n.addClass("combobox"),n.on("click",function(e){for(var t=e.target;t;)t.id&&-1!=t.id.indexOf("-open")&&n.fire("action"),t=t.parentNode}),n.on("keydown",function(e){"INPUT"==e.target.nodeName&&13==e.keyCode&&n.parents().reverse().each(function(t){return e.preventDefault(),n.fire("change"),t.submit?(t.submit(),!1):void 0})}),e.placeholder&&(n.addClass("placeholder"),n.on("focusin",function(){n._hasOnChange||(t.on(n.getEl("inp"),"change",function(){n.fire("change")}),n._hasOnChange=!0),n.hasClass("placeholder")&&(n.getEl("inp").value="",n.removeClass("placeholder"))}),n.on("focusout",function(){0===n.value().length&&(n.getEl("inp").value=e.placeholder,n.addClass("placeholder"))}))},value:function(e){var t=this;return"undefined"!=typeof e?(t._value=e,t.removeClass("placeholder"),t._rendered&&(t.getEl("inp").value=e),t):t._rendered?(e=t.getEl("inp").value,e!=t.settings.placeholder?e:""):t._value},disabled:function(e){var t=this;t._super(e),t._rendered&&(t.getEl("inp").disabled=e)},focus:function(){this.getEl("inp").focus()},repaint:function(){var e=this,n=e.getEl(),r=e.getEl("open"),i=e.layoutRect(),o,a;o=r?i.w-r.offsetWidth-10:i.w-10;var s=document;return s.all&&(!s.documentMode||s.documentMode<=8)&&(a=e.layoutRect().h-2+"px"),t.css(n.firstChild,{width:o,lineHeight:a}),e._super(),e},postRender:function(){var e=this;return t.on(this.getEl("inp"),"change",function(){e.fire("change")}),e._super()},renderHtml:function(){var e=this,t=e._id,n=e.settings,r=e.classPrefix,i=n.value||n.placeholder||"",o,a,s="";return o=n.icon?r+"ico "+r+"i-"+n.icon:"",a=e._text,(o||a)&&(s='<div id="'+t+'-open" class="'+r+"btn "+r+'open" tabIndex="-1">'+'<button id="'+t+'-action" type="button" hidefocus tabindex="-1">'+(o?'<i class="'+o+'"></i>':'<i class="'+r+'caret"></i>')+(a?(o?" ":"")+a:"")+"</button>"+"</div>",e.addClass("has-open")),'<div id="'+t+'" class="'+e.classes()+'">'+'<input id="'+t+'-inp" class="'+r+"textbox "+r+'placeholder" value="'+i+'" hidefocus="true">'+s+"</div>"}})}),r(Nt,[z,X],function(e,t){return e.extend({Defaults:{delimiter:"\xbb"},init:function(e){var t=this;t._super(e),t.addClass("path"),t.canFocus=!0,t.on("click",function(e){var n,r=e.target;(n=r.getAttribute("data-index"))&&t.fire("select",{value:t.data()[n],index:n})})},focus:function(){var e=this;return e.keyNav=new t({root:e,enableLeftRight:!0}),e.keyNav.focusFirst(),e},data:function(e){var t=this;return"undefined"!=typeof e?(t._data=e,t.update(),t):t._data},update:function(){this.getEl().innerHTML=this._getPathHtml()},postRender:function(){var e=this;e._super(),e.data(e.settings.data)},renderHtml:function(){var e=this;return'<div id="'+e._id+'" class="'+e.classPrefix+'path">'+e._getPathHtml()+"</div>"},_getPathHtml:function(){var e=this,t=e._data||[],n,r,i="",o=e.classPrefix;for(n=0,r=t.length;r>n;n++)i+=(n>0?'<div class="'+o+'divider" aria-hidden="true"> '+e.settings.delimiter+" </div>":"")+'<div role="button" class="'+o+"path-item"+(n==r-1?" "+o+"last":"")+'" data-index="'+n+'" tabindex="-1" id="'+e._id+"-"+n+'">'+t[n].name+"</div>";return i||(i='<div class="'+o+'path-item">&nbsp;</div>'),i}})}),r(Et,[Nt,at],function(e,t){return e.extend({postRender:function(){function e(e){return 1===e.nodeType&&("BR"==e.nodeName||!!e.getAttribute("data-mce-bogus"))}var n=this,r=t.activeEditor;return n.on("select",function(t){var n=[],i,o=r.getBody();for(r.focus(),i=r.selection.getStart();i&&i!=o;)e(i)||n.push(i),i=i.parentNode;r.selection.select(n[n.length-1-t.index]),r.nodeChanged()}),r.on("nodeChange",function(t){for(var i=[],o=t.parents,a=o.length;a--;)if(1==o[a].nodeType&&!e(o[a])){var s=r.fire("ResolveName",{name:o[a].nodeName.toLowerCase(),target:o[a]});i.push({name:s.name})}n.data(i)}),n._super()}})}),r(kt,[U],function(e){return e.extend({Defaults:{layout:"flex",align:"center",defaults:{flex:1}},renderHtml:function(){var e=this,t=e._layout,n=e.classPrefix;return e.addClass("formitem"),t.preRender(e),'<div id="'+e._id+'" class="'+e.classes()+'" hideFocus="1" tabIndex="-1">'+(e.settings.title?'<div id="'+e._id+'-title" class="'+n+'title">'+e.settings.title+"</div>":"")+'<div id="'+e._id+'-body" class="'+e.classes("body")+'">'+(e.settings.html||"")+t.renderHtml(e)+"</div>"+"</div>"}})}),r(St,[U,kt],function(e,t){return e.extend({Defaults:{containerCls:"form",layout:"flex",direction:"column",align:"stretch",flex:1,padding:20,labelGap:30,spacing:10},preRender:function(){var e=this,n=e.items();n.each(function(n){var r,i=n.settings.label;i&&(r=new t({layout:"flex",autoResize:"overflow",defaults:{flex:1},items:[{type:"label",text:i,flex:0,forId:n._id}]}),r.type="formitem","undefined"==typeof n.settings.flex&&(n.settings.flex=1),e.replace(n,r),r.add(n))})},recalcLabels:function(){var e=this,t=0,n=[],r,i;if(e.settings.labelGapCalc!==!1)for(e.items().filter("formitem").each(function(e){var r=e.items()[0],i=r.getEl().clientWidth;t=i>t?i:t,n.push(r)}),i=e.settings.labelGap||0,r=n.length;r--;)n[r].settings.minWidth=t+i},visible:function(e){var t=this._super(e);return e===!0&&this._rendered&&this.recalcLabels(),t},submit:function(){var e=this.getParentCtrl(document.activeElement);return e&&e.blur(),this.fire("submit",{data:this.toJSON()})},postRender:function(){var e=this;e._super(),e.recalcLabels(),e.fromJSON(e.settings.data)}})}),r(Tt,[St],function(e){return e.extend({Defaults:{containerCls:"fieldset",layout:"flex",direction:"column",align:"stretch",flex:1,padding:"25 15 5 15",labelGap:30,spacing:10,border:1},renderHtml:function(){var e=this,t=e._layout,n=e.classPrefix;return e.preRender(),t.preRender(e),'<fieldset id="'+e._id+'" class="'+e.classes()+'" hideFocus="1" tabIndex="-1">'+(e.settings.title?'<legend id="'+e._id+'-title" class="'+n+'fieldset-title">'+e.settings.title+"</legend>":"")+'<div id="'+e._id+'-body" class="'+e.classes("body")+'">'+(e.settings.html||"")+t.renderHtml(e)+"</div>"+"</fieldset>"}})}),r(Rt,[_t],function(e){return e.extend({init:function(e){var t=this,n=tinymce.activeEditor,r;e.spellcheck=!1,r=n.settings.file_browser_callback,r&&(e.icon="browse",e.onaction=function(){r(t.getEl("inp").id,t.getEl("inp").value,e.filetype,window)}),t._super(e)}})}),r(At,[mt],function(e){return e.extend({recalc:function(e){var t=e.layoutRect(),n=e.paddingBox();e.items().filter(":visible").each(function(e){e.layoutRect({x:n.left,y:n.top,w:t.innerW-n.right-n.left,h:t.innerH-n.top-n.bottom}),e.recalc&&e.recalc()})}})}),r(Bt,[mt],function(e){return e.extend({recalc:function(e){var t,n,r,i,o,a,s,l,c,d,u,f,p,h,m,g,v=[],y,b,C,x,w,_,N,E,k,S,T,R,A,B,H,M,L,D,P,O,I,F,W,z,V=Math.max,U=Math.min;for(r=e.items().filter(":visible"),i=e.layoutRect(),o=e._paddingBox,a=e.settings,f=a.direction,s=a.align,l=a.pack,c=a.spacing||0,("row-reversed"==f||"column-reverse"==f)&&(r=r.set(r.toArray().reverse()),f=f.split("-")[0]),"column"==f?(k="y",N="h",E="minH",S="maxH",R="innerH",T="top",A="bottom",B="deltaH",H="contentH",I="left",D="w",M="x",L="innerW",P="minW",O="maxW",F="right",W="deltaW",z="contentW"):(k="x",N="w",E="minW",S="maxW",R="innerW",T="left",A="right",B="deltaW",H="contentW",I="top",D="h",M="y",L="innerH",P="minH",O="maxH",F="bottom",W="deltaH",z="contentH"),u=i[R]-o[T]-o[T],_=d=0,t=0,n=r.length;n>t;t++)p=r[t],h=p.layoutRect(),m=p.settings,g=m.flex,u-=n-1>t?c:0,g>0&&(d+=g,h[S]&&v.push(p),h.flex=g),u-=h[E],y=o[I]+h[P]+o[F],y>_&&(_=y);if(x={},x[E]=0>u?i[E]-u+i[B]:i[R]-u+i[B],x[P]=_+i[W],x[H]=i[R]-u,x[z]=_,x.minW=U(x.minW,i.maxW),x.minH=U(x.minH,i.maxH),x.minW=V(x.minW,i.startMinWidth),x.minH=V(x.minH,i.startMinHeight),!i.autoResize||x.minW==i.minW&&x.minH==i.minH){for(C=u/d,t=0,n=v.length;n>t;t++)p=v[t],h=p.layoutRect(),b=h[S],y=h[E]+Math.ceil(h.flex*C),y>b?(u-=h[S]-h[E],d-=h.flex,h.flex=0,h.maxFlexSize=b):h.maxFlexSize=0;for(C=u/d,w=o[T],x={},0===d&&("end"==l?w=u+o[T]:"center"==l?(w=Math.round(i[R]/2-(i[R]-u)/2)+o[T],0>w&&(w=o[T])):"justify"==l&&(w=o[T],c=Math.floor(u/(r.length-1)))),x[M]=o[I],t=0,n=r.length;n>t;t++)p=r[t],h=p.layoutRect(),y=h.maxFlexSize||h[E],"center"===s?x[M]=Math.round(i[L]/2-h[D]/2):"stretch"===s?(x[D]=V(h[P]||0,i[L]-o[I]-o[F]),x[M]=o[I]):"end"===s&&(x[M]=i[L]-h[D]-o.top),h.flex>0&&(y+=Math.ceil(h.flex*C)),x[N]=y,x[k]=w,p.layoutRect(x),p.recalc&&p.recalc(),w+=y+c}else if(x.w=x.minW,x.h=x.minH,e.layoutRect(x),this.recalc(e),null===e._lastRect){var q=e.parent();q&&(q._lastRect=null,q.recalc())}}})}),r(Ht,[ht],function(e){return e.extend({Defaults:{containerClass:"flow-layout",controlClass:"flow-layout-item",endClass:"break"},recalc:function(e){e.items().filter(":visible").each(function(e){e.recalc&&e.recalc()})}})}),r(Mt,[V,z,vt,Y,f,at,m],function(e,t,n,r,i,o,a){function s(e){function t(e){return e.replace(/%(\w+)/g,"")}var n=o.activeEditor,r,i,a=n.dom,s="",l,c;return c=n.settings.preview_styles,c===!1?"":(c||(c="font-family font-size font-weight text-decoration text-transform color background-color border border-radius"),(e=n.formatter.get(e))?(e=e[0],r=e.block||e.inline||"span",i=a.create(r),d(e.styles,function(e,n){e=t(e),e&&a.setStyle(i,n,e)}),d(e.attributes,function(e,n){e=t(e),e&&a.setAttrib(i,n,e)}),d(e.classes,function(e){e=t(e),a.hasClass(i,e)||a.addClass(i,e)}),n.fire("PreviewFormats"),a.setStyles(i,{position:"absolute",left:-65535}),n.getBody().appendChild(i),l=a.getStyle(n.getBody(),"fontSize",!0),l=/px$/.test(l)?parseInt(l,10):0,d(c.split(" "),function(e){var t=a.getStyle(i,e,!0);if(!("background-color"==e&&/transparent|rgba\s*\([^)]+,\s*0\)/.test(t)&&(t=a.getStyle(n.getBody(),e,!0),"#ffffff"==a.toHex(t).toLowerCase())||"color"==e&&"#000000"==a.toHex(t).toLowerCase())){if("font-size"==e&&/em|%$/.test(t)){if(0===l)return;t=parseFloat(t,10)/(/%$/.test(t)?100:1),t=t*l+"px"}"border"==e&&t&&(s+="padding:0 2px;"),s+=e+":"+t+";"}}),n.fire("AfterPreviewFormats"),a.remove(i),s):void 0)}function l(e,t){return function(){var n=this;o.activeEditor.on("nodeChange",function(r){var i=o.activeEditor.formatter,a=null;d(r.parents,function(n){return d(e,function(e){return t?i.matchNode(n,t,{value:e.value})&&(a=e.value):i.matchNode(n,e.value)&&(a=e.value),a?!1:void 0}),a?!1:void 0}),n.value(a)})}}function c(e){e=e.split(";");for(var t=e.length;t--;)e[t]=e[t].split("=");return e}var d=i.each;t.translate=function(e){return o.translate(e)},n.tooltips=!a.iOS,o.on("AddEditor",function(t){function n(){function e(r){var i=[];if(r)return d(r,function(r){var o={text:r.title,icon:r.icon,preview:!0};if(r.items)o.menu=e(r.items);else{var a=r.format||"custom"+t++;r.format||(r.name=a,n.push(r)),o.textStyle=function(){return s(a)},o.onclick=function(){m(a)},o.onPostRender=function(){var e=this;e.parent().on("show",function(){e.disabled(!g.formatter.canApply(a)),e.active(g.formatter.match(a))})}}i.push(o)}),i}var t=0,n=[],r=[{title:"Headers",items:[{title:"Header 1",format:"h1"},{title:"Header 2",format:"h2"},{title:"Header 3",format:"h3"},{title:"Header 4",format:"h4"},{title:"Header 5",format:"h5"},{title:"Header 6",format:"h6"}]},{title:"Inline",items:[{title:"Bold",icon:"bold",format:"bold"},{title:"Italic",icon:"italic",format:"italic"},{title:"Underline",icon:"underline",format:"underline"},{title:"Strikethrough",icon:"strikethrough",format:"strikethrough"},{title:"Superscript",icon:"superscript",format:"superscript"},{title:"Subscript",icon:"subscript",format:"subscript"},{title:"Code",icon:"code",format:"code"}]},{title:"Blocks",items:[{title:"Paragraph",format:"p"},{title:"Blockquote",format:"blockquote"},{title:"Div",format:"div"},{title:"Pre",format:"pre"}]},{title:"Alignment",items:[{title:"Left",icon:"alignleft",format:"alignleft"},{title:"Center",icon:"aligncenter",format:"aligncenter"},{title:"Right",icon:"alignright",format:"alignright"},{title:"Justify",icon:"alignjustify",format:"alignjustify"}]}];
g.on("init",function(){d(n,function(e){g.formatter.register(e.name,e)})});var i=e(g.settings.style_formats||r);return i}function a(){return g.undoManager?g.undoManager.hasUndo():!1}function u(){return g.undoManager?g.undoManager.hasRedo():!1}function f(){var e=this;e.disabled(!a()),g.on("Undo Redo AddUndo TypingUndo",function(){e.disabled(!a())})}function p(){var e=this;e.disabled(!u()),g.on("Undo Redo AddUndo TypingUndo",function(){e.disabled(!u())})}function h(){var e=this;g.on("VisualAid",function(t){e.active(t.hasVisual)}),e.active(g.hasVisual)}function m(e){e.control&&(e=e.control.value()),e&&o.activeEditor.execCommand("mceToggleFormat",!1,e)}var g=t.editor,v;v=n(),d({bold:"Bold",italic:"Italic",underline:"Underline",strikethrough:"Strikethrough",subscript:"Subscript",superscript:"Superscript"},function(e,t){g.addButton(t,{tooltip:e,onPostRender:function(){var e=this;g.formatter?g.formatter.formatChanged(t,function(t){e.active(t)}):g.on("init",function(){g.formatter.formatChanged(t,function(t){e.active(t)})})},onclick:function(){m(t)}})}),d({outdent:["Decrease indent","Outdent"],indent:["Increase indent","Indent"],cut:["Cut","Cut"],copy:["Copy","Copy"],paste:["Paste","Paste"],help:["Help","mceHelp"],selectall:["Select all","SelectAll"],hr:["Insert horizontal rule","InsertHorizontalRule"],removeformat:["Clear formatting","RemoveFormat"],visualaid:["Visual aids","mceToggleVisualAid"],newdocument:["New document","mceNewDocument"]},function(e,t){g.addButton(t,{tooltip:e[0],cmd:e[1]})}),d({blockquote:["Toggle blockquote","mceBlockQuote"],numlist:["Numbered list","InsertOrderedList"],bullist:["Bulleted list","InsertUnorderedList"],subscript:["Subscript","Subscript"],superscript:["Superscript","Superscript"],alignleft:["Align left","JustifyLeft"],aligncenter:["Align center","JustifyCenter"],alignright:["Align right","JustifyRight"],alignjustify:["Justify","JustifyFull"]},function(e,t){g.addButton(t,{tooltip:e[0],cmd:e[1],onPostRender:function(){var e=this;g.formatter?g.formatter.formatChanged(t,function(t){e.active(t)}):g.on("init",function(){g.formatter.formatChanged(t,function(t){e.active(t)})})}})}),g.addButton("undo",{tooltip:"Undo",onPostRender:f,cmd:"undo"}),g.addButton("redo",{tooltip:"Redo",onPostRender:p,cmd:"redo"}),g.addMenuItem("newdocument",{text:"New document",shortcut:"Ctrl+N",icon:"newdocument",cmd:"mceNewDocument"}),g.addMenuItem("undo",{text:"Undo",icon:"undo",shortcut:"Ctrl+Z",onPostRender:f,cmd:"undo"}),g.addMenuItem("redo",{text:"Redo",icon:"redo",shortcut:"Ctrl+Y",onPostRender:p,cmd:"redo"}),g.addMenuItem("visualaid",{text:"Visual aids",selectable:!0,onPostRender:h,cmd:"mceToggleVisualAid"}),d({cut:["Cut","Cut","Ctrl+X"],copy:["Copy","Copy","Ctrl+C"],paste:["Paste","Paste","Ctrl+V"],selectall:["Select all","SelectAll","Ctrl+A"],bold:["Bold","Bold","Ctrl+B"],italic:["Italic","Italic","Ctrl+I"],underline:["Underline","Underline"],strikethrough:["Strikethrough","Strikethrough"],subscript:["Subscript","Subscript"],superscript:["Superscript","Superscript"],removeformat:["Clear formatting","RemoveFormat"]},function(e,t){g.addMenuItem(t,{text:e[0],icon:t,shortcut:e[2],cmd:e[1]})}),g.on("mousedown",function(){r.hideAll()}),e.add("styleselect",function(t){var n=[].concat(v);return e.create("menubutton",i.extend({text:"Formats",menu:n},t))}),e.add("formatselect",function(t){var n=[],r=c(g.settings.block_formats||"Paragraph=p;Address=address;Pre=pre;Header 1=h1;Header 2=h2;Header 3=h3;Header 4=h4;Header 5=h5;Header 6=h6");return d(r,function(e){n.push({text:{raw:e[0]},value:e[1],textStyle:function(){return s(e[1])}})}),e.create("listbox",i.extend({text:{raw:r[0][0]},values:n,fixedWidth:!0,onselect:m,onPostRender:l(n)},t))}),e.add("fontselect",function(t){var n="Andale Mono=andale mono,times;Arial=arial,helvetica,sans-serif;Arial Black=arial black,avant garde;Book Antiqua=book antiqua,palatino;Comic Sans MS=comic sans ms,sans-serif;Courier New=courier new,courier;Georgia=georgia,palatino;Helvetica=helvetica;Impact=impact,chicago;Symbol=symbol;Tahoma=tahoma,arial,helvetica,sans-serif;Terminal=terminal,monaco;Times New Roman=times new roman,times;Trebuchet MS=trebuchet ms,geneva;Verdana=verdana,geneva;Webdings=webdings;Wingdings=wingdings,zapf dingbats",r=[],a=c(g.settings.font_formats||n);return d(a,function(e){r.push({text:{raw:e[0]},value:e[1],textStyle:-1==e[1].indexOf("dings")?"font-family:"+e[1]:""})}),e.create("listbox",i.extend({text:"Font Family",tooltip:"Font Family",values:r,fixedWidth:!0,onPostRender:l(r,"fontname"),onselect:function(e){e.control.settings.value&&o.activeEditor.execCommand("FontName",!1,e.control.settings.value)}},t))}),e.add("fontsizeselect",function(t){var n=[],r="8pt 10pt 12pt 14pt 18pt 24pt 36pt",a=g.settings.fontsize_formats||r;return d(a.split(" "),function(e){n.push({text:e,value:e})}),e.create("listbox",i.extend({text:"Font Sizes",tooltip:"Font Sizes",values:n,fixedWidth:!0,onPostRender:l(n,"fontsize"),onclick:function(e){e.control.settings.value&&o.activeEditor.execCommand("FontSize",!1,e.control.settings.value)}},t))}),g.addMenuItem("formats",{text:"Formats",menu:v})})}),r(Lt,[mt],function(e){return e.extend({recalc:function(e){var t=e.settings,n,r,i,o,a,s,l,c,d,u,f,p,h,m,g,v,y,b,C,x,w,_,N=[],E=[],k,S,T,R,A,B;for(t=e.settings,i=e.items().filter(":visible"),o=e.layoutRect(),r=t.columns||Math.ceil(Math.sqrt(i.length)),n=Math.ceil(i.length/r),y=t.spacingH||t.spacing||0,b=t.spacingV||t.spacing||0,C=t.alignH||t.align,x=t.alignV||t.align,g=e._paddingBox,C&&"string"==typeof C&&(C=[C]),x&&"string"==typeof x&&(x=[x]),u=0;r>u;u++)N.push(0);for(f=0;n>f;f++)E.push(0);for(f=0;n>f;f++)for(u=0;r>u&&(d=i[f*r+u],d);u++)c=d.layoutRect(),k=c.minW,S=c.minH,N[u]=k>N[u]?k:N[u],E[f]=S>E[f]?S:E[f];for(A=o.innerW-g.left-g.right,w=0,u=0;r>u;u++)w+=N[u]+(u>0?y:0),A-=(u>0?y:0)+N[u];for(B=o.innerH-g.top-g.bottom,_=0,f=0;n>f;f++)_+=E[f]+(f>0?b:0),B-=(f>0?b:0)+E[f];if(w+=g.left+g.right,_+=g.top+g.bottom,l={},l.minW=w+(o.w-o.innerW),l.minH=_+(o.h-o.innerH),l.contentW=l.minW-o.deltaW,l.contentH=l.minH-o.deltaH,l.minW=Math.min(l.minW,o.maxW),l.minH=Math.min(l.minH,o.maxH),l.minW=Math.max(l.minW,o.startMinWidth),l.minH=Math.max(l.minH,o.startMinHeight),!o.autoResize||l.minW==o.minW&&l.minH==o.minH){o.autoResize&&(l=e.layoutRect(l),l.contentW=l.minW-o.deltaW,l.contentH=l.minH-o.deltaH);var H;H="start"==t.packV?0:B>0?Math.floor(B/n):0;var M=0,L=t.flexWidths;if(L)for(u=0;u<L.length;u++)M+=L[u];else M=r;var D=A/M;for(u=0;r>u;u++)N[u]+=L?Math.ceil(L[u]*D):D;for(h=g.top,f=0;n>f;f++){for(p=g.left,s=E[f]+H,u=0;r>u&&(d=i[f*r+u],d);u++)m=d.settings,c=d.layoutRect(),a=N[u],T=R=0,c.x=p,c.y=h,v=m.alignH||(C?C[u]||C[0]:null),"center"==v?c.x=p+a/2-c.w/2:"right"==v?c.x=p+a-c.w:"stretch"==v&&(c.w=a),v=m.alignV||(x?x[u]||x[0]:null),"center"==v?c.y=h+s/2-c.h/2:"bottom"==v?c.y=h+s-c.h:"stretch"==v&&(c.h=s),d.layoutRect(c),p+=a+y,d.recalc&&d.recalc();h+=s+b}}else if(l.w=l.minW,l.h=l.minH,e.layoutRect(l),this.recalc(e),null===e._lastRect){var P=e.parent();P&&(P._lastRect=null,P.recalc())}}})}),r(Dt,[vt],function(e){return e.extend({renderHtml:function(){var e=this;return e.addClass("iframe"),e.canFocus=!1,'<iframe id="'+e._id+'" class="'+e.classes()+'" tabindex="-1" src="'+(e.settings.url||"javascript:''")+'" frameborder="0"></iframe>'},src:function(e){this.getEl().src=e},html:function(e){return this.getEl().contentWindow.document.body.innerHTML=e,this}})}),r(Pt,[vt],function(e){return e.extend({init:function(e){var t=this;t._super(e),t.addClass("widget"),t.addClass("label"),t.canFocus=!1,e.multiline&&t.addClass("autoscroll"),e.strong&&t.addClass("strong")},initLayoutRect:function(){var e=this,t=e._super();return e.settings.multiline&&(e.getEl().offsetWidth>t.maxW&&(t.minW=t.maxW,e.addClass("multiline")),e.getEl().style.width=t.minW+"px",t.startMinH=t.h=t.minH=Math.min(t.maxH,e.getEl().offsetHeight)),t},disabled:function(e){var t=this,n;return e!==n&&(t.toggleClass("label-disabled",e),t._rendered&&(t.getEl()[0].className=t.classes())),t._super(e)},repaint:function(){var e=this;return e.settings.multiline||(e.getEl().style.lineHeight=e.layoutRect().h+"px"),e._super()},text:function(e){var t=this;return t._rendered&&e&&(t.getEl().innerHTML=t.encode(e)),t._super(e)},renderHtml:function(){var e=this,t=e.settings.forId;return'<label id="'+e._id+'" class="'+e.classes()+'"'+(t?' for="'+t:"")+'">'+e.encode(e._text)+"</label>"}})}),r(Ot,[U,X],function(e,t){return e.extend({Defaults:{role:"toolbar",layout:"flow"},init:function(e){var t=this;t._super(e),t.addClass("toolbar")},postRender:function(){var e=this;return e.items().addClass("toolbar-item"),e.keyNav=new t({root:e,enableLeftRight:!0}),e._super()}})}),r(It,[Ot],function(e){return e.extend({Defaults:{role:"menubar",containerCls:"menubar",defaults:{type:"menubutton"}}})}),r(Ft,[yt,V,It],function(e,t,n){function r(e,t){for(;e;){if(t===e)return!0;e=e.parentNode}return!1}var i=e.extend({init:function(e){var t=this;t._renderOpen=!0,t._super(e),t.addClass("menubtn"),e.fixedWidth&&t.addClass("fixed-width"),t.aria("haspopup",!0),t.hasPopup=!0},showMenu:function(){var e=this,n=e.settings,r;return e.menu&&e.menu.visible()?e.hideMenu():(e.menu||(r=n.menu||[],r.length?r={type:"menu",items:r}:r.type=r.type||"menu",e.menu=t.create(r).parent(e).renderTo(e.getContainerElm()),e.fire("createmenu"),e.menu.reflow(),e.menu.on("cancel",function(t){t.control===e.menu&&e.focus()}),e.menu.on("show hide",function(t){t.control==e.menu&&e.activeMenu("show"==t.type)}).fire("show"),e.aria("expanded",!0)),e.menu.show(),e.menu.layoutRect({w:e.layoutRect().w}),e.menu.moveRel(e.getEl(),["bl-tl","tl-bl"]),void 0)},hideMenu:function(){var e=this;e.menu&&(e.menu.items().each(function(e){e.hideMenu&&e.hideMenu()}),e.menu.hide(),e.aria("expanded",!1))},activeMenu:function(e){this.toggleClass("active",e)},renderHtml:function(){var e=this,t=e._id,r=e.classPrefix,i=e.settings.icon?r+"ico "+r+"i-"+e.settings.icon:"";return e.aria("role",e.parent()instanceof n?"menuitem":"button"),'<div id="'+t+'" class="'+e.classes()+'" tabindex="-1">'+'<button id="'+t+'-open" role="presentation" type="button" tabindex="-1">'+(i?'<i class="'+i+'"></i>':"")+"<span>"+(e._text?(i?" ":"")+e.encode(e._text):"")+"</span>"+' <i class="'+r+'caret"></i>'+"</button>"+"</div>"},postRender:function(){var e=this;return e.on("click",function(t){t.control===e&&r(t.target,e.getEl())&&(e.showMenu(),t.keyboard&&e.menu.items()[0].focus())}),e.on("mouseenter",function(t){var n=t.control,r=e.parent(),o;n&&r&&n instanceof i&&n.parent()==r&&(r.items().filter("MenuButton").each(function(e){e.hideMenu&&e!=n&&(e.menu&&e.menu.visible()&&(o=!0),e.hideMenu())}),o&&n.showMenu())}),e._super()},text:function(e){var t=this,n,r;if(t._rendered)for(r=t.getEl("open").getElementsByTagName("span"),n=0;n<r.length;n++)r[n].innerHTML=t.encode(e);return this._super(e)},remove:function(){this._super(),this.menu&&this.menu.remove()}});return i}),r(Wt,[Ft],function(e){return e.extend({init:function(e){var t=this,n,r,i,o,a;if(t._values=n=e.values,n){for(r=0;r<n.length;r++)i=n[r].selected||e.value===n[r].value,i&&(o=o||n[r].text,t._value=n[r].value);e.menu=n}e.text=e.text||o||n[0].text,t._super(e),t.addClass("listbox"),t.on("select",function(n){var r=n.control;a&&(n.lastControl=a),e.multiple?r.active(!r.active()):t.value(n.control.settings.value),a=r})},value:function(e){function t(e,n){e.items().each(function(e){r=e.value()===n,r&&(i=i||e.text()),e.active(r),e.menu&&t(e.menu,n)})}var n=this,r,i,o,a;if("undefined"!=typeof e){if(n.menu)t(n.menu,e);else for(o=n.settings.menu,a=0;a<o.length;a++)r=o[a].value==e,r&&(i=i||o[a].text),o[a].active=r;n.text(i||this.settings.text)}return n._super(e)}})}),r(zt,[vt,V],function(e,t){return e.extend({Defaults:{border:0,role:"menuitem"},init:function(e){var t=this;t.hasPopup=!0,t._super(e),e=t.settings,t.addClass("menu-item"),e.menu&&t.addClass("menu-item-expand"),e.preview&&t.addClass("menu-item-preview"),("-"===t._text||"|"===t._text)&&(t.addClass("menu-item-sep"),t.aria("role","separator"),t.canFocus=!1,t._text="-"),e.selectable&&(t.aria("role","menuitemcheckbox"),t.aria("checked",!0),t.addClass("menu-item-checkbox"),e.icon="selected"),t.on("mousedown",function(e){e.preventDefault()}),t.on("mouseenter click",function(n){n.control===t&&(e.menu||"click"!==n.type?(t.showMenu(),n.keyboard&&setTimeout(function(){t.menu.items()[0].focus()},0)):(t.parent().hideAll(),t.fire("cancel"),t.fire("select")))}),e.menu&&t.aria("haspopup",!0)},hasMenus:function(){return!!this.settings.menu},showMenu:function(){var e=this,n=e.settings,r;if(e.parent().items().each(function(t){t!==e&&t.hideMenu()}),n.menu){r=e.menu,r?r.show():(r=n.menu,r.length?r={type:"menu",items:r}:r.type=r.type||"menu",r=e.menu=t.create(r).parent(e).renderTo(e.getContainerElm()),r.reflow(),r.fire("show"),r.on("cancel",function(){e.focus()}),r.on("hide",function(t){t.control===r&&e.removeClass("selected")})),r._parentMenu=e.parent(),r.addClass("menu-sub");var i=r.testMoveRel(e.getEl(),["tr-tl","br-bl","tl-tr","bl-br"]);r.moveRel(e.getEl(),i),i="menu-sub-"+i,r.removeClass(r._lastRel),r.addClass(i),r._lastRel=i,e.addClass("selected"),e.aria("expanded",!0)}},hideMenu:function(){var e=this;return e.menu&&(e.menu.items().each(function(e){e.hideMenu&&e.hideMenu()}),e.menu.hide(),e.aria("expanded",!1)),e},renderHtml:function(){var e=this,t=e._id,n=e.settings,r=e.classPrefix,i=e.encode(e._text),o=e.settings.icon;return o&&e.parent().addClass("menu-has-icons"),o=r+"ico "+r+"i-"+(e.settings.icon||"none"),'<div id="'+t+'" class="'+e.classes()+'" tabindex="-1">'+("-"!==i?'<i class="'+o+'"></i>&nbsp;':"")+("-"!==i?'<span id="'+t+'-text" class="'+r+'text">'+i+"</span>":"")+(n.shortcut?'<div id="'+t+'-shortcut" class="'+r+'menu-shortcut">'+n.shortcut+"</div>":"")+(n.menu?'<div class="'+r+'caret"></div>':"")+"</div>"},postRender:function(){var e=this,t=e.settings,n=t.textStyle;if("function"==typeof n&&(n=n()),n){var r=e.getEl("text");r&&r.setAttribute("style",n)}return e._super()},remove:function(){this._super(),this.menu&&this.menu.remove()}})}),r(Vt,[Y,X,zt],function(e,t,n){var r=e.extend({Defaults:{defaultType:"menuitem",border:1,layout:"stack",role:"menu"},init:function(e){var r=this;e.autohide=!0,e.constrainToViewport=!0,r._super(e),r.addClass("menu"),r.keyNav=new t({root:r,enableUpDown:!0,enableLeftRight:!0,leftAction:function(){r.parent()instanceof n&&r.keyNav.cancel()},onCancel:function(){r.fire("cancel",{},!1),r.hide()}})},repaint:function(){return this.toggleClass("menu-align",!0),this._super(),this.getEl().style.height="",this.getEl("body").style.height="",this},cancel:function(){var e=this;e.hideAll(),e.fire("cancel"),e.fire("select")},hideAll:function(){var e=this;return this.find("menuitem").exec("hideMenu"),e._super()},preRender:function(){var e=this;return e.items().each(function(t){var n=t.settings;return n.icon||n.selectable?(e._hasIcons=!0,!1):void 0}),e._super()}});return r}),r(Ut,[Ct],function(e){return e.extend({Defaults:{classes:"radio",role:"radio"}})}),r(qt,[vt,q],function(e,t){return e.extend({renderHtml:function(){var e=this,t=e.classPrefix;return e.addClass("resizehandle"),"both"==e.settings.direction&&e.addClass("resizehandle-both"),e.canFocus=!1,'<div id="'+e._id+'" class="'+e.classes()+'">'+'<i class="'+t+"ico "+t+'i-resize"></i>'+"</div>"},postRender:function(){var e=this;e._super(),e.resizeDragHelper=new t(this._id,{start:function(){e.fire("ResizeStart")},drag:function(t){"both"!=e.settings.direction&&(t.deltaX=0),e.fire("Resize",t)},end:function(){e.fire("ResizeEnd")}})}})}),r(jt,[vt],function(e){return e.extend({renderHtml:function(){var e=this;return e.addClass("spacer"),e.canFocus=!1,'<div id="'+e._id+'" class="'+e.classes()+'"></div>'}})}),r($t,[Ft,g],function(e,t){var n=t.DOM;return e.extend({Defaults:{classes:"widget btn splitbtn",role:"splitbutton"},repaint:function(){var e=this,t=e.getEl(),r=e.layoutRect(),i,o,a;return e._super(),i=t.firstChild,o=t.lastChild,n.css(i,{width:r.w-o.offsetWidth,height:r.h-2}),n.css(o,{height:r.h-2}),a=i.firstChild.style,a.width=a.height="100%",a=o.firstChild.style,a.width=a.height="100%",e},activeMenu:function(e){var t=this;n.toggleClass(t.getEl().lastChild,t.classPrefix+"active",e)},renderHtml:function(){var e=this,t=e._id,n=e.classPrefix,r=e.settings.icon?n+"ico "+n+"i-"+e.settings.icon:"";return'<div id="'+t+'" class="'+e.classes()+'">'+'<button type="button" hidefocus tabindex="-1">'+(r?'<i class="'+r+'"></i>':"")+(e._text?(r?" ":"")+e._text:"")+"</button>"+'<button type="button" class="'+n+'open" hidefocus tabindex="-1">'+(e._menuBtnText?(r?" ":"")+e._menuBtnText:"")+' <i class="'+n+'caret"></i>'+"</button>"+"</div>"},postRender:function(){var e=this,t=e.settings.onclick;return e.on("click",function(e){e.control!=this||n.getParent(e.target,"."+this.classPrefix+"open")||(e.stopImmediatePropagation(),t.call(this,e))}),delete e.settings.onclick,e._super()}})}),r(Kt,[Ht],function(e){return e.extend({Defaults:{containerClass:"stack-layout",controlClass:"stack-layout-item",endClass:"break"}})}),r(Gt,[$,W],function(e,t){"use stict";return e.extend({lastIdx:0,Defaults:{layout:"absolute",defaults:{type:"panel"}},activateTab:function(e){this.activeTabId&&t.removeClass(this.getEl(this.activeTabId),this.classPrefix+"active"),this.activeTabId="t"+e,t.addClass(this.getEl("t"+e),this.classPrefix+"active"),e!=this.lastIdx&&(this.items()[this.lastIdx].hide(),this.lastIdx=e),this.items()[e].show().fire("showtab"),this.reflow()},renderHtml:function(){var e=this,t=e._layout,n="",r=e.classPrefix;return e.preRender(),t.preRender(e),e.items().each(function(t,i){n+='<div id="'+e._id+"-t"+i+'" class="'+r+'tab" unselectable="on">'+e.encode(t.settings.title)+"</div>"}),'<div id="'+e._id+'" class="'+e.classes()+'" hideFocus="1" tabIndex="-1">'+'<div id="'+e._id+'-head" class="'+r+'tabs">'+n+"</div>"+'<div id="'+e._id+'-body" class="'+e.classes("body")+'">'+t.renderHtml(e)+"</div>"+"</div>"},postRender:function(){var e=this;e._super(),e.settings.activeTab=e.settings.activeTab||0,e.activateTab(e.settings.activeTab),this.on("click",function(t){var n=t.target.parentNode;if(t.target.parentNode.id==e._id+"-head")for(var r=n.childNodes.length;r--;)n.childNodes[r]==t.target&&e.activateTab(r)})},initLayoutRect:function(){var e=this,t,n,r;n=r=0,e.items().each(function(t,i){n=Math.max(n,t.layoutRect().minW),r=Math.max(r,t.layoutRect().minH),e.settings.activeTab!=i&&t.hide()}),e.items().each(function(e){e.settings.x=0,e.settings.y=0,e.settings.w=n,e.settings.h=r,e.layoutRect({x:0,y:0,w:n,h:r})});var i=e.getEl("head").offsetHeight;return e.settings.minWidth=n,e.settings.minHeight=r+i,t=e._super(),t.deltaH+=e.getEl("head").offsetHeight,t.innerH=t.h-t.deltaH,t}})}),r(Yt,[vt,W],function(e,t){return e.extend({init:function(e){var t=this;t._super(e),t._value=e.value||"",t.addClass("textbox"),e.multiline?t.addClass("multiline"):t.on("keydown",function(e){13==e.keyCode&&t.parents().reverse().each(function(t){return e.preventDefault(),t.submit?(t.submit(),!1):void 0})})},value:function(e){var t=this;return"undefined"!=typeof e?(t._value=e,t._rendered&&(t.getEl().value=e),t):t._rendered?t.getEl().value:t._value},repaint:function(){var e=this,t,n,r,i=0,o=0,a;t=e.getEl().style,n=e._layoutRect,a=e._lastRepaintRect||{};var s=document;return!e.settings.multiline&&s.all&&(!s.documentMode||s.documentMode<=8)&&(t.lineHeight=n.h-o+"px"),r=e._borderBox,i=r.left+r.right+8,o=r.top+r.bottom+(e.settings.multiline?8:0),n.x!==a.x&&(t.left=n.x+"px",a.x=n.x),n.y!==a.y&&(t.top=n.y+"px",a.y=n.y),n.w!==a.w&&(t.width=n.w-i+"px",a.w=n.w),n.h!==a.h&&(t.height=n.h-o+"px",a.h=n.h),e._lastRepaintRect=a,e.fire("repaint",{},!1),e},renderHtml:function(){var e=this,t=e._id,n=e.settings,r=e.encode(e._value,!1),i="";return"spellcheck"in n&&(i+=' spellcheck="'+n.spellcheck+'"'),n.maxLength&&(i+=' maxlength="'+n.maxLength+'"'),n.size&&(i+=' size="'+n.size+'"'),n.subtype&&(i+=' type="'+n.subtype+'"'),n.multiline?'<textarea id="'+t+'" class="'+e.classes()+'" '+(n.rows?' rows="'+n.rows+'"':"")+' hidefocus="true"'+i+">"+r+"</textarea>":'<input id="'+t+'" class="'+e.classes()+'" value="'+r+'" hidefocus="true"'+i+">"},postRender:function(){var e=this;return t.on(e.getEl(),"change",function(t){e.fire("change",t)}),e._super()}})}),r(Xt,[W],function(e){return function(t){var n=this,r;n.show=function(i){return n.hide(),r=!0,window.setTimeout(function(){r&&t.appendChild(e.createFragment('<div class="mce-throbber"></div>'))},i||0),n},n.hide=function(){var e=t.lastChild;return e&&-1!=e.className.indexOf("throbber")&&e.parentNode.removeChild(e),r=!1,n}}}),a([l,c,d,u,f,p,h,m,g,v,y,b,C,x,w,_,N,E,k,S,T,R,A,B,H,M,L,D,P,O,I,F,W,z,V,U,q,j,$,K,G,Y,X,J,Q,Z,et,tt,nt,rt,it,ot,at,st,lt,ct,dt,ut,ft,pt,ht,mt,gt,vt,yt,bt,Ct,xt,wt,_t,Nt,Et,kt,St,Tt,Rt,At,Bt,Ht,Mt,Lt,Dt,Pt,Ot,It,Ft,Wt,zt,Vt,Ut,qt,jt,$t,Kt,Gt,Yt,Xt])}(this);
!function(t){function e(){function e(t){"remove"===t&&this.each(function(t,e){var n=r(e);n&&n.remove()}),this.find("span.mceEditor,div.mceEditor").each(function(t,e){var n=tinymce.get(e.id.replace(/_parent$/,""));n&&n.remove()})}function i(t){var n,i=this;if(null!=t)e.call(i),i.each(function(e,n){var i;(i=tinymce.get(n.id))&&i.setContent(t)});else if(i.length>0&&(n=tinymce.get(i[0].id)))return n.getContent()}function r(t){var e=null;return t&&t.id&&a.tinymce&&(e=tinymce.get(t.id)),e}function c(t){return!!(t&&t.length&&a.tinymce&&t.is(":tinymce"))}var u={};t.each(["text","html","val"],function(e,a){var o=u[a]=t.fn[a],s="text"===a;t.fn[a]=function(e){var a=this;if(!c(a))return o.apply(a,arguments);if(e!==n)return i.call(a.filter(":tinymce"),e),o.apply(a.not(":tinymce"),arguments),a;var u="",l=arguments;return(s?a:a.eq(0)).each(function(e,n){var i=r(n);u+=i?s?i.getContent().replace(/<(?:"[^"]*"|'[^']*'|[^'">])*>/g,""):i.getContent({save:!0}):o.apply(t(n),l)}),u}}),t.each(["append","prepend"],function(e,i){var a=u[i]=t.fn[i],o="prepend"===i;t.fn[i]=function(t){var e=this;return c(e)?t!==n?(e.filter(":tinymce").each(function(e,n){var i=r(n);i&&i.setContent(o?t+i.getContent():i.getContent()+t)}),a.apply(e.not(":tinymce"),arguments),e):void 0:a.apply(e,arguments)}}),t.each(["remove","replaceWith","replaceAll","empty"],function(n,i){var r=u[i]=t.fn[i];t.fn[i]=function(){return e.call(this,i),r.apply(this,arguments)}}),u.attr=t.fn.attr,t.fn.attr=function(e,a){var o=this,s=arguments;if(!e||"value"!==e||!c(o))return a!==n?u.attr.apply(o,s):u.attr.apply(o,s);if(a!==n)return i.call(o.filter(":tinymce"),a),u.attr.apply(o.not(":tinymce"),s),o;var l=o[0],p=r(l);return p?p.getContent({save:!0}):u.attr.apply(t(l),s)}}var n,i,r=[],a=window;t.fn.tinymce=function(n){function c(){var i=[],r=0;e&&(e(),e=null),l.each(function(t,e){var a,c=e.id,u=n.oninit;c||(e.id=c=tinymce.DOM.uniqueId()),tinymce.get(c)||(a=new tinymce.Editor(c,n,tinymce.EditorManager),i.push(a),a.on("init",function(){var t,e=u;l.css("visibility",""),u&&++r==i.length&&("string"==typeof e&&(t=-1===e.indexOf(".")?null:tinymce.resolve(e.replace(/\.\w+$/,"")),e=tinymce.resolve(e)),e.apply(t||tinymce,i))}))}),t.each(i,function(t,e){e.render()})}var u,o,s,l=this,p="";if(!l.length)return l;if(!n)return tinymce.get(l[0].id);if(l.css("visibility","hidden"),a.tinymce||i||!(u=n.script_url))1===i?r.push(c):c();else{i=1,o=u.substring(0,u.lastIndexOf("/")),-1!=u.indexOf(".min")&&(p=".min"),a.tinymce=a.tinyMCEPreInit||{base:o,suffix:p},-1!=u.indexOf("gzip")&&(s=n.language||"en",u=u+(/\?/.test(u)?"&":"?")+"js=true&core=true&suffix="+escape(p)+"&themes="+escape(n.theme)+"&plugins="+escape(n.plugins)+"&languages="+s,a.tinyMCE_GZ||(a.tinyMCE_GZ={start:function(){function e(t){tinymce.ScriptLoader.markDone(tinymce.baseURI.toAbsolute(t))}e("langs/"+s+".js"),e("themes/"+n.theme+"/theme"+p+".js"),e("themes/"+n.theme+"/langs/"+s+".js"),t.each(n.plugins.split(","),function(t,n){n&&(e("plugins/"+n+"/plugin"+p+".js"),e("plugins/"+n+"/langs/"+s+".js"))})},end:function(){}}));var f=document.createElement("script");f.type="text/javascript",f.onload=f.onreadystatechange=function(e){e=e||event,("load"==e.type||/complete|loaded/.test(f.readyState))&&(tinymce.dom.Event.domLoaded=1,i=2,n.script_loaded&&n.script_loaded(),c(),t.each(r,function(t,e){e()}))},f.src=u,document.body.appendChild(f)}return l},t.extend(t.expr[":"],{tinymce:function(t){return!!(t.id&&"tinymce"in window&&tinymce.get(t.id))}})}(jQuery);



// This [jQuery](http://jquery.com/) plugin implements an `<iframe>`
// [transport](http://api.jquery.com/extending-ajax/#Transports) so that
// `$.ajax()` calls support the uploading of files using standard HTML file
// input fields. This is done by switching the exchange from `XMLHttpRequest`
// to a hidden `iframe` element containing a form that is submitted.

// The [source for the plugin](http://github.com/cmlenz/jquery-iframe-transport)
// is available on [Github](http://github.com/) and dual licensed under the MIT
// or GPL Version 2 licenses.

// ## Usage

// To use this plugin, you simply add an `iframe` option with the value `true`
// to the Ajax settings an `$.ajax()` call, and specify the file fields to
// include in the submssion using the `files` option, which can be a selector,
// jQuery object, or a list of DOM elements containing one or more
// `<input type="file">` elements:

//     $("#myform").submit(function() {
//         $.ajax(this.action, {
//             files: $(":file", this),
//             iframe: true
//         }).complete(function(data) {
//             console.log(data);
//         });
//     });

// The plugin will construct hidden `<iframe>` and `<form>` elements, add the
// file field(s) to that form, submit the form, and process the response.

// If you want to include other form fields in the form submission, include
// them in the `data` option, and set the `processData` option to `false`:

//     $("#myform").submit(function() {
//         $.ajax(this.action, {
//             data: $(":text", this).serializeArray(),
//             files: $(":file", this),
//             iframe: true,
//             processData: false
//         }).complete(function(data) {
//             console.log(data);
//         });
//     });

// ### Response Data Types

// As the transport does not have access to the HTTP headers of the server
// response, it is not as simple to make use of the automatic content type
// detection provided by jQuery as with regular XHR. If you can't set the
// expected response data type (for example because it may vary depending on
// the outcome of processing by the server), you will need to employ a
// workaround on the server side: Send back an HTML document containing just a
// `<textarea>` element with a `data-type` attribute that specifies the MIME
// type, and put the actual payload in the textarea:

//     <textarea data-type="application/json">
//       {"ok": true, "message": "Thanks so much"}
//     </textarea>

// The iframe transport plugin will detect this and pass the value of the
// `data-type` attribute on to jQuery as if it was the "Content-Type" response
// header, thereby enabling the same kind of conversions that jQuery applies
// to regular responses. For the example above you should get a Javascript
// object as the `data` parameter of the `complete` callback, with the
// properties `ok: true` and `message: "Thanks so much"`.

// ### Handling Server Errors

// Another problem with using an `iframe` for file uploads is that it is
// impossible for the javascript code to determine the HTTP status code of the
// servers response. Effectively, all of the calls you make will look like they
// are getting successful responses, and thus invoke the `done()` or
// `complete()` callbacks. You can only determine communicate problems using
// the content of the response payload. For example, consider using a JSON
// response such as the following to indicate a problem with an uploaded file:

//     <textarea data-type="application/json">
//       {"ok": false, "message": "Please only upload reasonably sized files."}
//     </textarea>

// ### Compatibility

// This plugin has primarily been tested on Safari 5 (or later), Firefox 4 (or
// later), and Internet Explorer (all the way back to version 6). While I
// haven't found any issues with it so far, I'm fairly sure it still doesn't
// work around all the quirks in all different browsers. But the code is still
// pretty simple overall, so you should be able to fix it and contribute a
// patch :)

// ## Annotated Source

(function($, undefined) {
  "use strict";

  // Register a prefilter that checks whether the `iframe` option is set, and
  // switches to the "iframe" data type if it is `true`.
  $.ajaxPrefilter(function(options, origOptions, jqXHR) {
    if (options.iframe) {
      return "iframe";
    }
  });

  // Register a transport for the "iframe" data type. It will only activate
  // when the "files" option has been set to a non-empty list of enabled file
  // inputs.
  $.ajaxTransport("iframe", function(options, origOptions, jqXHR) {
    var form = null,
        iframe = null,
        name = "iframe-" + $.now(),
        files = $(options.files).filter(":file:enabled"),
        markers = null,
        accepts;

    // This function gets called after a successful submission or an abortion
    // and should revert all changes made to the page to enable the
    // submission via this transport.
    function cleanUp() {
      markers.prop('disabled', false);
      form.remove();
      iframe.bind("load", function() { iframe.remove(); });
      iframe.attr("src", "javascript:false;");
    }

    // Remove "iframe" from the data types list so that further processing is
    // based on the content type returned by the server, without attempting an
    // (unsupported) conversion from "iframe" to the actual type.
    options.dataTypes.shift();

    if (files.length) {
      form = $("<form enctype='multipart/form-data' method='post'></form>").
        hide().attr({action: options.url, target: name});

      // If there is any additional data specified via the `data` option,
      // we add it as hidden fields to the form. This (currently) requires
      // the `processData` option to be set to false so that the data doesn't
      // get serialized to a string.
      if (typeof(options.data) === "string" && options.data.length > 0) {
        $.error("data must not be serialized");
      }
      $.each(options.data || {}, function(name, value) {
        if ($.isPlainObject(value)) {
          name = value.name;
          value = value.value;
        }
        $("<input type='hidden' />").attr({name:  name, value: value}).
          appendTo(form);
      });

      // Add a hidden `X-Requested-With` field with the value `IFrame` to the
      // field, to help server-side code to determine that the upload happened
      // through this transport.
      $("<input type='hidden' value='IFrame' name='X-Requested-With' />").
        appendTo(form);

      // Borrowed straight from the JQuery source
      // Provides a way of specifying the accepted data type similar to HTTP_ACCEPTS
      accepts = options.dataTypes[ 0 ] && options.accepts[ options.dataTypes[0] ] ?
        options.accepts[ options.dataTypes[0] ] + ( options.dataTypes[ 0 ] !== "*" ? ", */*; q=0.01" : "" ) :
        options.accepts[ "*" ]

      $("<input type='hidden' name='X-Http-Accept'>")
        .attr("value", accepts).appendTo(form);

      // Move the file fields into the hidden form, but first remember their
      // original locations in the document by replacing them with disabled
      // clones. This should also avoid introducing unwanted changes to the
      // page layout during submission.
      markers = files.after(function(idx) {
        return $(this).clone().prop("disabled", true);
      }).next();
      files.appendTo(form);

      return {

        // The `send` function is called by jQuery when the request should be
        // sent.
        send: function(headers, completeCallback) {
          iframe = $("<iframe src='javascript:false;' name='" + name +
            "' id='" + name + "' style='display:none'></iframe>");

          // The first load event gets fired after the iframe has been injected
          // into the DOM, and is used to prepare the actual submission.
          iframe.bind("load", function() {

            // The second load event gets fired when the response to the form
            // submission is received. The implementation detects whether the
            // actual payload is embedded in a `<textarea>` element, and
            // prepares the required conversions to be made in that case.
            iframe.unbind("load").bind("load", function() {
              var doc = this.contentWindow ? this.contentWindow.document :
                (this.contentDocument ? this.contentDocument : this.document),
                root = doc.documentElement ? doc.documentElement : doc.body,
                textarea = root.getElementsByTagName("textarea")[0],
                type = textarea && textarea.getAttribute("data-type") || null,
                status = textarea && textarea.getAttribute("data-status") || 200,
                statusText = textarea && textarea.getAttribute("data-statusText") || "OK",
                content = {
                  html: root.innerHTML,
                  text: type ?
                    textarea.value :
                    root ? (root.textContent || root.innerText) : null
                };
              cleanUp();
              completeCallback(status, statusText, content, type ?
                ("Content-Type: " + type) :
                null);
            });

            // Now that the load handler has been set up, submit the form.
            form[0].submit();
          });

          // After everything has been set up correctly, the form and iframe
          // get injected into the DOM so that the submission can be
          // initiated.
          $("body").append(form, iframe);
        },

        // The `abort` function is called by jQuery when the request should be
        // aborted.
        abort: function() {
          if (iframe !== null) {
            iframe.unbind("load").attr("src", "javascript:false;");
            cleanUp();
          }
        }

      };
    }
  });

})(jQuery);



(function($) {

  var remotipart;

  $.remotipart = remotipart = {

    setup: function(form) {
      form
        // Allow setup part of $.rails.handleRemote to setup remote settings before canceling default remote handler
        // This is required in order to change the remote settings using the form details
        .one('ajax:beforeSend.remotipart', function(e, xhr, settings){
          // Delete the beforeSend bindings, since we're about to re-submit via ajaxSubmit with the beforeSubmit
          // hook that was just setup and triggered via the default `$.rails.handleRemote`
          // delete settings.beforeSend;
          delete settings.beforeSend;

          settings.iframe      = true;
          settings.files       = $($.rails.fileInputSelector, form);
          settings.data        = form.serializeArray();

          // jQuery 1.9 serializeArray() contains input:file entries
          // so exclude them from settings.data, otherwise files will not be sent
          settings.files.each(function(i, file){
            for (var j = settings.data.length - 1; j >= 0; j--)
              if (settings.data[j].name == file.name)
                settings.data.splice(j, 1);
          })

          settings.processData = false;

          // Modify some settings to integrate JS request with rails helpers and middleware
          if (settings.dataType === undefined) { settings.dataType = 'script *'; }
          settings.data.push({name: 'remotipart_submitted', value: true});

          // Allow remotipartSubmit to be cancelled if needed
          if ($.rails.fire(form, 'ajax:remotipartSubmit', [xhr, settings])) {
            // Second verse, same as the first
            $.rails.ajax(settings);
            setTimeout(function(){ $.rails.disableFormElements(form); }, 20);
          }

          //Run cleanup
          remotipart.teardown(form);

          // Cancel the jQuery UJS request
          return false;
        })

        // Keep track that we just set this particular form with Remotipart bindings
        // Note: The `true` value will get over-written with the `settings.dataType` from the `ajax:beforeSend` handler
        .data('remotipartSubmitted', true);
    },

    teardown: function(form) {
      form
        .unbind('ajax:beforeSend.remotipart')
        .removeData('remotipartSubmitted')
    }
  };

  $(document).on('ajax:aborted:file', 'form', function(){
    var form = $(this);

    remotipart.setup(form);

    // If browser does not support submit bubbling, then this live-binding will be called before direct
    // bindings. Therefore, we should directly call any direct bindings before remotely submitting form.
    if (!$.support.submitBubbles && $().jquery < '1.7' && $.rails.callFormSubmitBindings(form) === false) return $.rails.stopEverything(e);

    // Manually call jquery-ujs remote call so that it can setup form and settings as usual,
    // and trigger the `ajax:beforeSend` callback to which remotipart binds functionality.
    $.rails.handleRemote(form);
    return false;
  });

})(jQuery);
/*!
 * Masonry PACKAGED v3.0.3
 * Cascading grid layout library
 * http://masonry.desandro.com
 * MIT License
 * by David DeSandro
 */


(function(t){"use strict";function e(t){if(t){if("string"==typeof n[t])return t;t=t.charAt(0).toUpperCase()+t.slice(1);for(var e,o=0,r=i.length;r>o;o++)if(e=i[o]+t,"string"==typeof n[e])return e}}var i="Webkit Moz ms Ms O".split(" "),n=document.documentElement.style;"function"==typeof define&&define.amd?define(function(){return e}):t.getStyleProperty=e})(window),function(t){"use strict";function e(t){var e=parseFloat(t),i=-1===t.indexOf("%")&&!isNaN(e);return i&&e}function i(){for(var t={width:0,height:0,innerWidth:0,innerHeight:0,outerWidth:0,outerHeight:0},e=0,i=s.length;i>e;e++){var n=s[e];t[n]=0}return t}function n(t){function n(t){if("string"==typeof t&&(t=document.querySelector(t)),t&&"object"==typeof t&&t.nodeType){var n=r(t);if("none"===n.display)return i();var h={};h.width=t.offsetWidth,h.height=t.offsetHeight;for(var p=h.isBorderBox=!(!a||!n[a]||"border-box"!==n[a]),u=0,f=s.length;f>u;u++){var d=s[u],c=n[d],l=parseFloat(c);h[d]=isNaN(l)?0:l}var m=h.paddingLeft+h.paddingRight,y=h.paddingTop+h.paddingBottom,g=h.marginLeft+h.marginRight,v=h.marginTop+h.marginBottom,_=h.borderLeftWidth+h.borderRightWidth,b=h.borderTopWidth+h.borderBottomWidth,L=p&&o,E=e(n.width);E!==!1&&(h.width=E+(L?0:m+_));var S=e(n.height);return S!==!1&&(h.height=S+(L?0:y+b)),h.innerWidth=h.width-(m+_),h.innerHeight=h.height-(y+b),h.outerWidth=h.width+g,h.outerHeight=h.height+v,h}}var o,a=t("boxSizing");return function(){if(a){var t=document.createElement("div");t.style.width="200px",t.style.padding="1px 2px 3px 4px",t.style.borderStyle="solid",t.style.borderWidth="1px 2px 3px 4px",t.style[a]="border-box";var i=document.body||document.documentElement;i.appendChild(t);var n=r(t);o=200===e(n.width),i.removeChild(t)}}(),n}var o=document.defaultView,r=o&&o.getComputedStyle?function(t){return o.getComputedStyle(t,null)}:function(t){return t.currentStyle},s=["paddingLeft","paddingRight","paddingTop","paddingBottom","marginLeft","marginRight","marginTop","marginBottom","borderLeftWidth","borderRightWidth","borderTopWidth","borderBottomWidth"];"function"==typeof define&&define.amd?define(["get-style-property"],n):t.getSize=n(t.getStyleProperty)}(window),function(t){"use strict";var e=document.documentElement,i=function(){};e.addEventListener?i=function(t,e,i){t.addEventListener(e,i,!1)}:e.attachEvent&&(i=function(e,i,n){e[i+n]=n.handleEvent?function(){var e=t.event;e.target=e.target||e.srcElement,n.handleEvent.call(n,e)}:function(){var i=t.event;i.target=i.target||i.srcElement,n.call(e,i)},e.attachEvent("on"+i,e[i+n])});var n=function(){};e.removeEventListener?n=function(t,e,i){t.removeEventListener(e,i,!1)}:e.detachEvent&&(n=function(t,e,i){t.detachEvent("on"+e,t[e+i]);try{delete t[e+i]}catch(n){t[e+i]=void 0}});var o={bind:i,unbind:n};"function"==typeof define&&define.amd?define(o):t.eventie=o}(this),function(t){"use strict";function e(t){"function"==typeof t&&(e.isReady?t():r.push(t))}function i(t){var i="readystatechange"===t.type&&"complete"!==o.readyState;if(!e.isReady&&!i){e.isReady=!0;for(var n=0,s=r.length;s>n;n++){var a=r[n];a()}}}function n(n){return n.bind(o,"DOMContentLoaded",i),n.bind(o,"readystatechange",i),n.bind(t,"load",i),e}var o=t.document,r=[];e.isReady=!1,"function"==typeof define&&define.amd?define(["eventie"],n):t.docReady=n(t.eventie)}(this),function(t){"use strict";function e(){}function i(t,e){if(o)return e.indexOf(t);for(var i=e.length;i--;)if(e[i]===t)return i;return-1}var n=e.prototype,o=Array.prototype.indexOf?!0:!1;n._getEvents=function(){return this._events||(this._events={})},n.getListeners=function(t){var e,i,n=this._getEvents();if("object"==typeof t){e={};for(i in n)n.hasOwnProperty(i)&&t.test(i)&&(e[i]=n[i])}else e=n[t]||(n[t]=[]);return e},n.getListenersAsObject=function(t){var e,i=this.getListeners(t);return i instanceof Array&&(e={},e[t]=i),e||i},n.addListener=function(t,e){var n,o=this.getListenersAsObject(t);for(n in o)o.hasOwnProperty(n)&&-1===i(e,o[n])&&o[n].push(e);return this},n.on=n.addListener,n.defineEvent=function(t){return this.getListeners(t),this},n.defineEvents=function(t){for(var e=0;t.length>e;e+=1)this.defineEvent(t[e]);return this},n.removeListener=function(t,e){var n,o,r=this.getListenersAsObject(t);for(o in r)r.hasOwnProperty(o)&&(n=i(e,r[o]),-1!==n&&r[o].splice(n,1));return this},n.off=n.removeListener,n.addListeners=function(t,e){return this.manipulateListeners(!1,t,e)},n.removeListeners=function(t,e){return this.manipulateListeners(!0,t,e)},n.manipulateListeners=function(t,e,i){var n,o,r=t?this.removeListener:this.addListener,s=t?this.removeListeners:this.addListeners;if("object"!=typeof e||e instanceof RegExp)for(n=i.length;n--;)r.call(this,e,i[n]);else for(n in e)e.hasOwnProperty(n)&&(o=e[n])&&("function"==typeof o?r.call(this,n,o):s.call(this,n,o));return this},n.removeEvent=function(t){var e,i=typeof t,n=this._getEvents();if("string"===i)delete n[t];else if("object"===i)for(e in n)n.hasOwnProperty(e)&&t.test(e)&&delete n[e];else delete this._events;return this},n.emitEvent=function(t,e){var i,n,o,r=this.getListenersAsObject(t);for(n in r)if(r.hasOwnProperty(n))for(i=r[n].length;i--;)o=e?r[n][i].apply(null,e):r[n][i](),o===!0&&this.removeListener(t,r[n][i]);return this},n.trigger=n.emitEvent,n.emit=function(t){var e=Array.prototype.slice.call(arguments,1);return this.emitEvent(t,e)},"function"==typeof define&&define.amd?define(function(){return e}):t.EventEmitter=e}(this),function(t){"use strict";function e(){}function i(t){function i(e){e.prototype.option||(e.prototype.option=function(e){t.isPlainObject(e)&&(this.options=t.extend(!0,this.options,e))})}function o(e,i){t.fn[e]=function(o){if("string"==typeof o){for(var s=n.call(arguments,1),a=0,h=this.length;h>a;a++){var p=this[a],u=t.data(p,e);if(u)if(t.isFunction(u[o])&&"_"!==o.charAt(0)){var f=u[o].apply(u,s);if(void 0!==f)return f}else r("no such method '"+o+"' for "+e+" instance");else r("cannot call methods on "+e+" prior to initialization; "+"attempted to call '"+o+"'")}return this}return this.each(function(){var n=t.data(this,e);n?(n.option(o),n._init()):(n=new i(this,o),t.data(this,e,n))})}}if(t){var r="undefined"==typeof console?e:function(t){console.error(t)};t.bridget=function(t,e){i(e),o(t,e)}}}var n=Array.prototype.slice;"function"==typeof define&&define.amd?define(["jquery"],i):i(t.jQuery)}(window),function(t,e){"use strict";function i(t,e){return t[a](e)}function n(t){if(!t.parentNode){var e=document.createDocumentFragment();e.appendChild(t)}}function o(t,e){n(t);for(var i=t.parentNode.querySelectorAll(e),o=0,r=i.length;r>o;o++)if(i[o]===t)return!0;return!1}function r(t,e){return n(t),i(t,e)}var s,a=function(){if(e.matchesSelector)return"matchesSelector";for(var t=["webkit","moz","ms","o"],i=0,n=t.length;n>i;i++){var o=t[i],r=o+"MatchesSelector";if(e[r])return r}}();if(a){var h=document.createElement("div"),p=i(h,"div");s=p?i:r}else s=o;"function"==typeof define&&define.amd?define(function(){return s}):window.matchesSelector=s}(this,Element.prototype),function(t){"use strict";function e(t,e){for(var i in e)t[i]=e[i];return t}function i(t,e){t&&(this.element=t,this.layout=e,this.position={x:0,y:0},this._create())}var n=t.getSize,o=t.getStyleProperty,r=t.EventEmitter,s=document.defaultView,a=s&&s.getComputedStyle?function(t){return s.getComputedStyle(t,null)}:function(t){return t.currentStyle},h=o("transition"),p=o("transform"),u=h&&p,f=!!o("perspective"),d={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"otransitionend",transition:"transitionend"}[h],c=["transform","transition","transitionDuration","transitionProperty"],l=function(){for(var t={},e=0,i=c.length;i>e;e++){var n=c[e],r=o(n);r&&r!==n&&(t[n]=r)}return t}();e(i.prototype,r.prototype),i.prototype._create=function(){this.css({position:"absolute"})},i.prototype.handleEvent=function(t){var e="on"+t.type;this[e]&&this[e](t)},i.prototype.getSize=function(){this.size=n(this.element)},i.prototype.css=function(t){var e=this.element.style;for(var i in t){var n=l[i]||i;e[n]=t[i]}},i.prototype.getPosition=function(){var t=a(this.element),e=this.layout.options,i=e.isOriginLeft,n=e.isOriginTop,o=parseInt(t[i?"left":"right"],10),r=parseInt(t[n?"top":"bottom"],10);o=isNaN(o)?0:o,r=isNaN(r)?0:r;var s=this.layout.size;o-=i?s.paddingLeft:s.paddingRight,r-=n?s.paddingTop:s.paddingBottom,this.position.x=o,this.position.y=r},i.prototype.layoutPosition=function(){var t=this.layout.size,e=this.layout.options,i={};e.isOriginLeft?(i.left=this.position.x+t.paddingLeft+"px",i.right=""):(i.right=this.position.x+t.paddingRight+"px",i.left=""),e.isOriginTop?(i.top=this.position.y+t.paddingTop+"px",i.bottom=""):(i.bottom=this.position.y+t.paddingBottom+"px",i.top=""),this.css(i),this.emitEvent("layout",[this])};var m=f?function(t,e){return"translate3d("+t+"px, "+e+"px, 0)"}:function(t,e){return"translate("+t+"px, "+e+"px)"};i.prototype._transitionTo=function(t,e){this.getPosition();var i=this.position.x,n=this.position.y,o=parseInt(t,10),r=parseInt(e,10),s=o===this.position.x&&r===this.position.y;if(this.setPosition(t,e),s&&!this.isTransitioning)return this.layoutPosition(),void 0;var a=t-i,h=e-n,p={},u=this.layout.options;a=u.isOriginLeft?a:-a,h=u.isOriginTop?h:-h,p.transform=m(a,h),this.transition({to:p,onTransitionEnd:this.layoutPosition,isCleaning:!0})},i.prototype.goTo=function(t,e){this.setPosition(t,e),this.layoutPosition()},i.prototype.moveTo=u?i.prototype._transitionTo:i.prototype.goTo,i.prototype.setPosition=function(t,e){this.position.x=parseInt(t,10),this.position.y=parseInt(e,10)},i.prototype._nonTransition=function(t){this.css(t.to),t.isCleaning&&this._removeStyles(t.to),t.onTransitionEnd&&t.onTransitionEnd.call(this)},i.prototype._transition=function(t){var e=this.layout.options.transitionDuration;if(!parseFloat(e))return this._nonTransition(t),void 0;var i=t.to,n=[];for(var o in i)n.push(o);var r={};if(r.transitionProperty=n.join(","),r.transitionDuration=e,this.element.addEventListener(d,this,!1),(t.isCleaning||t.onTransitionEnd)&&this.on("transitionEnd",function(e){return t.isCleaning&&e._removeStyles(i),t.onTransitionEnd&&t.onTransitionEnd.call(e),!0}),t.from){this.css(t.from);var s=this.element.offsetHeight;s=null}this.css(r),this.css(i),this.isTransitioning=!0},i.prototype.transition=i.prototype[h?"_transition":"_nonTransition"],i.prototype.onwebkitTransitionEnd=function(t){this.ontransitionend(t)},i.prototype.onotransitionend=function(t){this.ontransitionend(t)},i.prototype.ontransitionend=function(t){t.target===this.element&&(this.removeTransitionStyles(),this.element.removeEventListener(d,this,!1),this.isTransitioning=!1,this.emitEvent("transitionEnd",[this]))},i.prototype._removeStyles=function(t){var e={};for(var i in t)e[i]="";this.css(e)};var y={transitionProperty:"",transitionDuration:""};i.prototype.removeTransitionStyles=function(){this.css(y)},i.prototype.removeElem=function(){this.element.parentNode.removeChild(this.element),this.emitEvent("remove",[this])},i.prototype.remove=h?function(){var t=this;this.on("transitionEnd",function(){return t.removeElem(),!0}),this.hide()}:i.prototype.removeElem,i.prototype.reveal=function(){this.css({display:""});var t=this.layout.options;this.transition({from:t.hiddenStyle,to:t.visibleStyle,isCleaning:!0})},i.prototype.hide=function(){this.css({display:""});var t=this.layout.options;this.transition({from:t.visibleStyle,to:t.hiddenStyle,isCleaning:!0,onTransitionEnd:function(){this.css({display:"none"})}})},i.prototype.destroy=function(){this.css({position:"",left:"",right:"",top:"",bottom:"",transition:"",transform:""})},t.Outlayer={Item:i}}(window),function(t){"use strict";function e(t,e){for(var i in e)t[i]=e[i];return t}function i(t){return"[object Array]"===v.call(t)}function n(t){var e=[];if(i(t))e=t;else if("number"==typeof t.length)for(var n=0,o=t.length;o>n;n++)e.push(t[n]);else e.push(t);return e}function o(t){return t.replace(/(.)([A-Z])/g,function(t,e,i){return e+"-"+i}).toLowerCase()}function r(t,i){if("string"==typeof t&&(t=l.querySelector(t)),!t||!_(t))return m&&m.error("Bad "+this.settings.namespace+" element: "+t),void 0;this.element=t,this.options=e({},this.options),e(this.options,i);var n=++L;this.element.outlayerGUID=n,E[n]=this,this._create(),this.options.isInitLayout&&this.layout()}function s(t,i){t.prototype[i]=e({},r.prototype[i])}var a=t.Outlayer,h=a.Item,p=t.docReady,u=t.EventEmitter,f=t.eventie,d=t.getSize,c=t.matchesSelector,l=t.document,m=t.console,y=t.jQuery,g=function(){},v=Object.prototype.toString,_="object"==typeof HTMLElement?function(t){return t instanceof HTMLElement}:function(t){return t&&"object"==typeof t&&1===t.nodeType&&"string"==typeof t.nodeName},b=Array.prototype.indexOf?function(t,e){return t.indexOf(e)}:function(t,e){for(var i=0,n=t.length;n>i;i++)if(t[i]===e)return i;return-1},L=0,E={};r.prototype.settings={namespace:"outlayer",item:a.Item},r.prototype.options={containerStyle:{position:"relative"},isInitLayout:!0,isOriginLeft:!0,isOriginTop:!0,isResizeBound:!0,transitionDuration:"0.4s",hiddenStyle:{opacity:0,transform:"scale(0.001)"},visibleStyle:{opacity:1,transform:"scale(1)"}},e(r.prototype,u.prototype),r.prototype._create=function(){this.reloadItems(),this.stamps=[],this.stamp(this.options.stamp),e(this.element.style,this.options.containerStyle),this.options.isResizeBound&&this.bindResize()},r.prototype.reloadItems=function(){this.items=this._getItems(this.element.children)},r.prototype._getItems=function(t){for(var e=this._filterFindItemElements(t),i=this.settings.item,n=[],o=0,r=e.length;r>o;o++){var s=e[o],a=new i(s,this,this.options.itemOptions);n.push(a)}return n},r.prototype._filterFindItemElements=function(t){t=n(t);var e=this.options.itemSelector;if(!e)return t;for(var i=[],o=0,r=t.length;r>o;o++){var s=t[o];c(s,e)&&i.push(s);for(var a=s.querySelectorAll(e),h=0,p=a.length;p>h;h++)i.push(a[h])}return i},r.prototype.getItemElements=function(){for(var t=[],e=0,i=this.items.length;i>e;e++)t.push(this.items[e].element);return t},r.prototype.layout=function(){this._resetLayout(),this._manageStamps();var t=void 0!==this.options.isLayoutInstant?this.options.isLayoutInstant:!this._isLayoutInited;this.layoutItems(this.items,t),this._isLayoutInited=!0},r.prototype._init=r.prototype.layout,r.prototype._resetLayout=function(){this.getSize()},r.prototype.getSize=function(){this.size=d(this.element)},r.prototype._getMeasurement=function(t,e){var i,n=this.options[t];n?("string"==typeof n?i=this.element.querySelector(n):_(n)&&(i=n),this[t]=i?d(i)[e]:n):this[t]=0},r.prototype.layoutItems=function(t,e){t=this._getItemsForLayout(t),this._layoutItems(t,e),this._postLayout()},r.prototype._getItemsForLayout=function(t){for(var e=[],i=0,n=t.length;n>i;i++){var o=t[i];o.isIgnored||e.push(o)}return e},r.prototype._layoutItems=function(t,e){if(!t||!t.length)return this.emitEvent("layoutComplete",[this,t]),void 0;this._itemsOn(t,"layout",function(){this.emitEvent("layoutComplete",[this,t])});for(var i=[],n=0,o=t.length;o>n;n++){var r=t[n],s=this._getItemLayoutPosition(r);s.item=r,s.isInstant=e,i.push(s)}this._processLayoutQueue(i)},r.prototype._getItemLayoutPosition=function(){return{x:0,y:0}},r.prototype._processLayoutQueue=function(t){for(var e=0,i=t.length;i>e;e++){var n=t[e];this._positionItem(n.item,n.x,n.y,n.isInstant)}},r.prototype._positionItem=function(t,e,i,n){n?t.goTo(e,i):t.moveTo(e,i)},r.prototype._postLayout=function(){var t=this._getContainerSize();t&&(this._setContainerMeasure(t.width,!0),this._setContainerMeasure(t.height,!1))},r.prototype._getContainerSize=g,r.prototype._setContainerMeasure=function(t,e){if(void 0!==t){var i=this.size;i.isBorderBox&&(t+=e?i.paddingLeft+i.paddingRight+i.borderLeftWidth+i.borderRightWidth:i.paddingBottom+i.paddingTop+i.borderTopWidth+i.borderBottomWidth),t=Math.max(t,0),this.element.style[e?"width":"height"]=t+"px"}},r.prototype._itemsOn=function(t,e,i){function n(){return o++,o===r&&i.call(s),!0}for(var o=0,r=t.length,s=this,a=0,h=t.length;h>a;a++){var p=t[a];p.on(e,n)}},r.prototype.ignore=function(t){var e=this.getItem(t);e&&(e.isIgnored=!0)},r.prototype.unignore=function(t){var e=this.getItem(t);e&&delete e.isIgnored},r.prototype.stamp=function(t){if(t=this._find(t)){this.stamps=this.stamps.concat(t);for(var e=0,i=t.length;i>e;e++){var n=t[e];this.ignore(n)}}},r.prototype.unstamp=function(t){if(t=this._find(t))for(var e=0,i=t.length;i>e;e++){var n=t[e],o=b(this.stamps,n);-1!==o&&this.stamps.splice(o,1),this.unignore(n)}},r.prototype._find=function(t){return t?("string"==typeof t&&(t=this.element.querySelectorAll(t)),t=n(t)):void 0},r.prototype._manageStamps=function(){if(this.stamps&&this.stamps.length){this._getBoundingRect();for(var t=0,e=this.stamps.length;e>t;t++){var i=this.stamps[t];this._manageStamp(i)}}},r.prototype._getBoundingRect=function(){var t=this.element.getBoundingClientRect(),e=this.size;this._boundingRect={left:t.left+e.paddingLeft+e.borderLeftWidth,top:t.top+e.paddingTop+e.borderTopWidth,right:t.right-(e.paddingRight+e.borderRightWidth),bottom:t.bottom-(e.paddingBottom+e.borderBottomWidth)}},r.prototype._manageStamp=g,r.prototype._getElementOffset=function(t){var e=t.getBoundingClientRect(),i=this._boundingRect,n=d(t),o={left:e.left-i.left-n.marginLeft,top:e.top-i.top-n.marginTop,right:i.right-e.right-n.marginRight,bottom:i.bottom-e.bottom-n.marginBottom};return o},r.prototype.handleEvent=function(t){var e="on"+t.type;this[e]&&this[e](t)},r.prototype.bindResize=function(){this.isResizeBound||(f.bind(t,"resize",this),this.isResizeBound=!0)},r.prototype.unbindResize=function(){f.unbind(t,"resize",this),this.isResizeBound=!1},r.prototype.onresize=function(){function t(){e.resize()}this.resizeTimeout&&clearTimeout(this.resizeTimeout);var e=this;this.resizeTimeout=setTimeout(t,100)},r.prototype.resize=function(){var t=d(this.element),e=this.size&&t;e&&t.innerWidth===this.size.innerWidth||(this.layout(),delete this.resizeTimeout)},r.prototype.addItems=function(t){var e=this._getItems(t);if(e.length)return this.items=this.items.concat(e),e},r.prototype.appended=function(t){var e=this.addItems(t);e.length&&(this.layoutItems(e,!0),this.reveal(e))},r.prototype.prepended=function(t){var e=this._getItems(t);if(e.length){var i=this.items.slice(0);this.items=e.concat(i),this._resetLayout(),this.layoutItems(e,!0),this.reveal(e),this.layoutItems(i)}},r.prototype.reveal=function(t){if(t&&t.length)for(var e=0,i=t.length;i>e;e++){var n=t[e];n.reveal()}},r.prototype.hide=function(t){if(t&&t.length)for(var e=0,i=t.length;i>e;e++){var n=t[e];n.hide()}},r.prototype.getItem=function(t){for(var e=0,i=this.items.length;i>e;e++){var n=this.items[e];if(n.element===t)return n}},r.prototype.getItems=function(t){if(t&&t.length){for(var e=[],i=0,n=t.length;n>i;i++){var o=t[i],r=this.getItem(o);r&&e.push(r)}return e}},r.prototype.remove=function(t){t=n(t);var e=this.getItems(t);this._itemsOn(e,"remove",function(){this.emitEvent("removeComplete",[this,e])});for(var i=0,o=e.length;o>i;i++){var r=e[i];r.remove();var s=b(this.items,r);this.items.splice(s,1)}},r.prototype.destroy=function(){var t=this.element.style;t.height="",t.position="",t.width="";for(var e=0,i=this.items.length;i>e;e++){var n=this.items[e];n.destroy()}this.unbindResize(),delete this.element.outlayerGUID},r.data=function(t){var e=t&&t.outlayerGUID;return e&&E[e]},r.create=function(t,i){function n(){r.apply(this,arguments)}return e(n.prototype,r.prototype),s(n,"options"),s(n,"settings"),e(n.prototype.options,i),n.prototype.settings.namespace=t,n.data=r.data,n.Item=function(){h.apply(this,arguments)},n.Item.prototype=new r.Item,n.prototype.settings.item=n.Item,p(function(){for(var e=o(t),i=l.querySelectorAll(".js-"+e),r="data-"+e+"-options",s=0,a=i.length;a>s;s++){var h,p=i[s],u=p.getAttribute(r);try{h=u&&JSON.parse(u)}catch(f){m&&m.error("Error parsing "+r+" on "+p.nodeName.toLowerCase()+(p.id?"#"+p.id:"")+": "+f);continue}var d=new n(p,h);y&&y.data(p,t,d)}}),y&&y.bridget&&y.bridget(t,n),n},r.Item=h,t.Outlayer=r}(window),function(t){"use strict";function e(t,e){var n=t.create("masonry");return n.prototype._resetLayout=function(){this.getSize(),this._getMeasurement("columnWidth","outerWidth"),this._getMeasurement("gutter","outerWidth"),this.measureColumns();var t=this.cols;for(this.colYs=[];t--;)this.colYs.push(0);this.maxY=0},n.prototype.measureColumns=function(){var t=this._getSizingContainer(),i=this.items[0],n=i&&i.element;this.columnWidth||(this.columnWidth=n?e(n).outerWidth:this.size.innerWidth),this.columnWidth+=this.gutter,this._containerWidth=e(t).innerWidth,this.cols=Math.floor((this._containerWidth+this.gutter)/this.columnWidth),this.cols=Math.max(this.cols,1)},n.prototype._getSizingContainer=function(){return this.options.isFitWidth?this.element.parentNode:this.element},n.prototype._getItemLayoutPosition=function(t){t.getSize();var e=Math.ceil(t.size.outerWidth/this.columnWidth);e=Math.min(e,this.cols);for(var n=this._getColGroup(e),o=Math.min.apply(Math,n),r=i(n,o),s={x:this.columnWidth*r,y:o},a=o+t.size.outerHeight,h=this.cols+1-n.length,p=0;h>p;p++)this.colYs[r+p]=a;return s},n.prototype._getColGroup=function(t){if(1===t)return this.colYs;for(var e=[],i=this.cols+1-t,n=0;i>n;n++){var o=this.colYs.slice(n,n+t);e[n]=Math.max.apply(Math,o)}return e},n.prototype._manageStamp=function(t){var i=e(t),n=this._getElementOffset(t),o=this.options.isOriginLeft?n.left:n.right,r=o+i.outerWidth,s=Math.floor(o/this.columnWidth);s=Math.max(0,s);var a=Math.floor(r/this.columnWidth);a=Math.min(this.cols-1,a);for(var h=(this.options.isOriginTop?n.top:n.bottom)+i.outerHeight,p=s;a>=p;p++)this.colYs[p]=Math.max(h,this.colYs[p])},n.prototype._getContainerSize=function(){this.maxY=Math.max.apply(Math,this.colYs);var t={height:this.maxY};return this.options.isFitWidth&&(t.width=this._getContainerFitWidth()),t},n.prototype._getContainerFitWidth=function(){for(var t=0,e=this.cols;--e&&0===this.colYs[e];)t++;return(this.cols-t)*this.columnWidth-this.gutter},n.prototype.resize=function(){var t=this._getSizingContainer(),i=e(t),n=this.size&&i;n&&i.innerWidth===this._containerWidth||(this.layout(),delete this.resizeTimeout)},n}var i=Array.prototype.indexOf?function(t,e){return t.indexOf(e)}:function(t,e){for(var i=0,n=t.length;n>i;i++){var o=t[i];if(o===e)return i}return-1};"function"==typeof define&&define.amd?define(["outlayer","get-size"],e):t.Masonry=e(t.Outlayer,t.getSize)}(window);
(function() {


}).call(this);
(function() {
  $(function() {
    var redirect_url;
    redirect_url = "/auth/facebook/callback";
    return $("a.facebook").click(function(e) {
      e.preventDefault();
      return FB.login((function(response) {
        if (response.authResponse) {
          return window.location = redirect_url;
        }
      }), {
        scope: "email, read_stream, read_friendlists, friends_likes, friends_status, offline_access"
      });
    });
  });

}).call(this);
//add browser back in. jCarousel relies on it.
(function( jQuery, window, undefined ) {
"use strict";
var matched, browser;
jQuery.uaMatch = function( ua ) {
  ua = ua.toLowerCase();
	var match = /(chrome)[ \/]([\w.]+)/.exec( ua ) ||
		/(webkit)[ \/]([\w.]+)/.exec( ua ) ||
		/(opera)(?:.*version|)[ \/]([\w.]+)/.exec( ua ) ||
		/(msie) ([\w.]+)/.exec( ua ) ||
		ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec( ua ) ||
		[];
	return {
		browser: match[ 1 ] || "",
		version: match[ 2 ] || "0"
	};
};
matched = jQuery.uaMatch( window.navigator.userAgent );
browser = {};
if ( matched.browser ) {
	browser[ matched.browser ] = true;
	browser.version = matched.version;
}
// Chrome is Webkit, but Webkit is also Safari.
if ( browser.chrome ) {
	browser.webkit = true;
} else if ( browser.webkit ) {
	browser.safari = true;
}
jQuery.browser = browser;
})( jQuery, window );

/*!
 * jCarousel - Riding carousels with jQuery
 *   http://sorgalla.com/jcarousel/
 *
 * Copyright (c) 2006 Jan Sorgalla (http://sorgalla.com)
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
 * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
 *
 * Built on top of the jQuery library
 *   http://jquery.com
 *
 * Inspired by the "Carousel Component" by Bill Scott
 *   http://billwscott.com/carousel/
 */

(function(g){var q={vertical:!1,rtl:!1,start:1,offset:1,size:null,scroll:3,visible:null,animation:"normal",easing:"swing",auto:0,wrap:null,initCallback:null,setupCallback:null,reloadCallback:null,itemLoadCallback:null,itemFirstInCallback:null,itemFirstOutCallback:null,itemLastInCallback:null,itemLastOutCallback:null,itemVisibleInCallback:null,itemVisibleOutCallback:null,animationStepCallback:null,buttonNextHTML:"<div></div>",buttonPrevHTML:"<div></div>",buttonNextEvent:"click",buttonPrevEvent:"click", buttonNextCallback:null,buttonPrevCallback:null,itemFallbackDimension:null},m=!1;g(window).bind("load.jcarousel",function(){m=!0});g.jcarousel=function(a,c){this.options=g.extend({},q,c||{});this.autoStopped=this.locked=!1;this.buttonPrevState=this.buttonNextState=this.buttonPrev=this.buttonNext=this.list=this.clip=this.container=null;if(!c||c.rtl===void 0)this.options.rtl=(g(a).attr("dir")||g("html").attr("dir")||"").toLowerCase()=="rtl";this.wh=!this.options.vertical?"width":"height";this.lt=!this.options.vertical? this.options.rtl?"right":"left":"top";for(var b="",d=a.className.split(" "),f=0;f<d.length;f++)if(d[f].indexOf("jcarousel-skin")!=-1){g(a).removeClass(d[f]);b=d[f];break}a.nodeName.toUpperCase()=="UL"||a.nodeName.toUpperCase()=="OL"?(this.list=g(a),this.clip=this.list.parents(".jcarousel-clip"),this.container=this.list.parents(".jcarousel-container")):(this.container=g(a),this.list=this.container.find("ul,ol").eq(0),this.clip=this.container.find(".jcarousel-clip"));if(this.clip.size()===0)this.clip= this.list.wrap("<div></div>").parent();if(this.container.size()===0)this.container=this.clip.wrap("<div></div>").parent();b!==""&&this.container.parent()[0].className.indexOf("jcarousel-skin")==-1&&this.container.wrap('<div class=" '+b+'"></div>');this.buttonPrev=g(".jcarousel-prev",this.container);if(this.buttonPrev.size()===0&&this.options.buttonPrevHTML!==null)this.buttonPrev=g(this.options.buttonPrevHTML).appendTo(this.container);this.buttonPrev.addClass(this.className("jcarousel-prev"));this.buttonNext= g(".jcarousel-next",this.container);if(this.buttonNext.size()===0&&this.options.buttonNextHTML!==null)this.buttonNext=g(this.options.buttonNextHTML).appendTo(this.container);this.buttonNext.addClass(this.className("jcarousel-next"));this.clip.addClass(this.className("jcarousel-clip")).css({position:"relative"});this.list.addClass(this.className("jcarousel-list")).css({overflow:"hidden",position:"relative",top:0,margin:0,padding:0}).css(this.options.rtl?"right":"left",0);this.container.addClass(this.className("jcarousel-container")).css({position:"relative"}); !this.options.vertical&&this.options.rtl&&this.container.addClass("jcarousel-direction-rtl").attr("dir","rtl");var j=this.options.visible!==null?Math.ceil(this.clipping()/this.options.visible):null,b=this.list.children("li"),e=this;if(b.size()>0){var h=0,i=this.options.offset;b.each(function(){e.format(this,i++);h+=e.dimension(this,j)});this.list.css(this.wh,h+100+"px");if(!c||c.size===void 0)this.options.size=b.size()}this.container.css("display","block");this.buttonNext.css("display","block");this.buttonPrev.css("display", "block");this.funcNext=function(){e.next()};this.funcPrev=function(){e.prev()};this.funcResize=function(){e.resizeTimer&&clearTimeout(e.resizeTimer);e.resizeTimer=setTimeout(function(){e.reload()},100)};this.options.initCallback!==null&&this.options.initCallback(this,"init");!m&&g.browser.safari?(this.buttons(!1,!1),g(window).bind("load.jcarousel",function(){e.setup()})):this.setup()};var f=g.jcarousel;f.fn=f.prototype={jcarousel:"0.2.8"};f.fn.extend=f.extend=g.extend;f.fn.extend({setup:function(){this.prevLast= this.prevFirst=this.last=this.first=null;this.animating=!1;this.tail=this.resizeTimer=this.timer=null;this.inTail=!1;if(!this.locked){this.list.css(this.lt,this.pos(this.options.offset)+"px");var a=this.pos(this.options.start,!0);this.prevFirst=this.prevLast=null;this.animate(a,!1);g(window).unbind("resize.jcarousel",this.funcResize).bind("resize.jcarousel",this.funcResize);this.options.setupCallback!==null&&this.options.setupCallback(this)}},reset:function(){this.list.empty();this.list.css(this.lt, "0px");this.list.css(this.wh,"10px");this.options.initCallback!==null&&this.options.initCallback(this,"reset");this.setup()},reload:function(){this.tail!==null&&this.inTail&&this.list.css(this.lt,f.intval(this.list.css(this.lt))+this.tail);this.tail=null;this.inTail=!1;this.options.reloadCallback!==null&&this.options.reloadCallback(this);if(this.options.visible!==null){var a=this,c=Math.ceil(this.clipping()/this.options.visible),b=0,d=0;this.list.children("li").each(function(f){b+=a.dimension(this, c);f+1<a.first&&(d=b)});this.list.css(this.wh,b+"px");this.list.css(this.lt,-d+"px")}this.scroll(this.first,!1)},lock:function(){this.locked=!0;this.buttons()},unlock:function(){this.locked=!1;this.buttons()},size:function(a){if(a!==void 0)this.options.size=a,this.locked||this.buttons();return this.options.size},has:function(a,c){if(c===void 0||!c)c=a;if(this.options.size!==null&&c>this.options.size)c=this.options.size;for(var b=a;b<=c;b++){var d=this.get(b);if(!d.length||d.hasClass("jcarousel-item-placeholder"))return!1}return!0}, get:function(a){return g(">.jcarousel-item-"+a,this.list)},add:function(a,c){var b=this.get(a),d=0,p=g(c);if(b.length===0)for(var j,e=f.intval(a),b=this.create(a);;){if(j=this.get(--e),e<=0||j.length){e<=0?this.list.prepend(b):j.after(b);break}}else d=this.dimension(b);p.get(0).nodeName.toUpperCase()=="LI"?(b.replaceWith(p),b=p):b.empty().append(c);this.format(b.removeClass(this.className("jcarousel-item-placeholder")),a);p=this.options.visible!==null?Math.ceil(this.clipping()/this.options.visible): null;d=this.dimension(b,p)-d;a>0&&a<this.first&&this.list.css(this.lt,f.intval(this.list.css(this.lt))-d+"px");this.list.css(this.wh,f.intval(this.list.css(this.wh))+d+"px");return b},remove:function(a){var c=this.get(a);if(c.length&&!(a>=this.first&&a<=this.last)){var b=this.dimension(c);a<this.first&&this.list.css(this.lt,f.intval(this.list.css(this.lt))+b+"px");c.remove();this.list.css(this.wh,f.intval(this.list.css(this.wh))-b+"px")}},next:function(){this.tail!==null&&!this.inTail?this.scrollTail(!1): this.scroll((this.options.wrap=="both"||this.options.wrap=="last")&&this.options.size!==null&&this.last==this.options.size?1:this.first+this.options.scroll)},prev:function(){this.tail!==null&&this.inTail?this.scrollTail(!0):this.scroll((this.options.wrap=="both"||this.options.wrap=="first")&&this.options.size!==null&&this.first==1?this.options.size:this.first-this.options.scroll)},scrollTail:function(a){if(!this.locked&&!this.animating&&this.tail){this.pauseAuto();var c=f.intval(this.list.css(this.lt)), c=!a?c-this.tail:c+this.tail;this.inTail=!a;this.prevFirst=this.first;this.prevLast=this.last;this.animate(c)}},scroll:function(a,c){!this.locked&&!this.animating&&(this.pauseAuto(),this.animate(this.pos(a),c))},pos:function(a,c){var b=f.intval(this.list.css(this.lt));if(this.locked||this.animating)return b;this.options.wrap!="circular"&&(a=a<1?1:this.options.size&&a>this.options.size?this.options.size:a);for(var d=this.first>a,g=this.options.wrap!="circular"&&this.first<=1?1:this.first,j=d?this.get(g): this.get(this.last),e=d?g:g-1,h=null,i=0,k=!1,l=0;d?--e>=a:++e<a;){h=this.get(e);k=!h.length;if(h.length===0&&(h=this.create(e).addClass(this.className("jcarousel-item-placeholder")),j[d?"before":"after"](h),this.first!==null&&this.options.wrap=="circular"&&this.options.size!==null&&(e<=0||e>this.options.size)))j=this.get(this.index(e)),j.length&&(h=this.add(e,j.clone(!0)));j=h;l=this.dimension(h);k&&(i+=l);if(this.first!==null&&(this.options.wrap=="circular"||e>=1&&(this.options.size===null||e<= this.options.size)))b=d?b+l:b-l}for(var g=this.clipping(),m=[],o=0,n=0,j=this.get(a-1),e=a;++o;){h=this.get(e);k=!h.length;if(h.length===0){h=this.create(e).addClass(this.className("jcarousel-item-placeholder"));if(j.length===0)this.list.prepend(h);else j[d?"before":"after"](h);if(this.first!==null&&this.options.wrap=="circular"&&this.options.size!==null&&(e<=0||e>this.options.size))j=this.get(this.index(e)),j.length&&(h=this.add(e,j.clone(!0)))}j=h;l=this.dimension(h);if(l===0)throw Error("jCarousel: No width/height set for items. This will cause an infinite loop. Aborting..."); this.options.wrap!="circular"&&this.options.size!==null&&e>this.options.size?m.push(h):k&&(i+=l);n+=l;if(n>=g)break;e++}for(h=0;h<m.length;h++)m[h].remove();i>0&&(this.list.css(this.wh,this.dimension(this.list)+i+"px"),d&&(b-=i,this.list.css(this.lt,f.intval(this.list.css(this.lt))-i+"px")));i=a+o-1;if(this.options.wrap!="circular"&&this.options.size&&i>this.options.size)i=this.options.size;if(e>i){o=0;e=i;for(n=0;++o;){h=this.get(e--);if(!h.length)break;n+=this.dimension(h);if(n>=g)break}}e=i-o+ 1;this.options.wrap!="circular"&&e<1&&(e=1);if(this.inTail&&d)b+=this.tail,this.inTail=!1;this.tail=null;if(this.options.wrap!="circular"&&i==this.options.size&&i-o+1>=1&&(d=f.intval(this.get(i).css(!this.options.vertical?"marginRight":"marginBottom")),n-d>g))this.tail=n-g-d;if(c&&a===this.options.size&&this.tail)b-=this.tail,this.inTail=!0;for(;a-- >e;)b+=this.dimension(this.get(a));this.prevFirst=this.first;this.prevLast=this.last;this.first=e;this.last=i;return b},animate:function(a,c){if(!this.locked&& !this.animating){this.animating=!0;var b=this,d=function(){b.animating=!1;a===0&&b.list.css(b.lt,0);!b.autoStopped&&(b.options.wrap=="circular"||b.options.wrap=="both"||b.options.wrap=="last"||b.options.size===null||b.last<b.options.size||b.last==b.options.size&&b.tail!==null&&!b.inTail)&&b.startAuto();b.buttons();b.notify("onAfterAnimation");if(b.options.wrap=="circular"&&b.options.size!==null)for(var c=b.prevFirst;c<=b.prevLast;c++)c!==null&&!(c>=b.first&&c<=b.last)&&(c<1||c>b.options.size)&&b.remove(c)}; this.notify("onBeforeAnimation");if(!this.options.animation||c===!1)this.list.css(this.lt,a+"px"),d();else{var f=!this.options.vertical?this.options.rtl?{right:a}:{left:a}:{top:a},d={duration:this.options.animation,easing:this.options.easing,complete:d};if(g.isFunction(this.options.animationStepCallback))d.step=this.options.animationStepCallback;this.list.animate(f,d)}}},startAuto:function(a){if(a!==void 0)this.options.auto=a;if(this.options.auto===0)return this.stopAuto();if(this.timer===null){this.autoStopped= !1;var c=this;this.timer=window.setTimeout(function(){c.next()},this.options.auto*1E3)}},stopAuto:function(){this.pauseAuto();this.autoStopped=!0},pauseAuto:function(){if(this.timer!==null)window.clearTimeout(this.timer),this.timer=null},buttons:function(a,c){if(a==null&&(a=!this.locked&&this.options.size!==0&&(this.options.wrap&&this.options.wrap!="first"||this.options.size===null||this.last<this.options.size),!this.locked&&(!this.options.wrap||this.options.wrap=="first")&&this.options.size!==null&& this.last>=this.options.size))a=this.tail!==null&&!this.inTail;if(c==null&&(c=!this.locked&&this.options.size!==0&&(this.options.wrap&&this.options.wrap!="last"||this.first>1),!this.locked&&(!this.options.wrap||this.options.wrap=="last")&&this.options.size!==null&&this.first==1))c=this.tail!==null&&this.inTail;var b=this;this.buttonNext.size()>0?(this.buttonNext.unbind(this.options.buttonNextEvent+".jcarousel",this.funcNext),a&&this.buttonNext.bind(this.options.buttonNextEvent+".jcarousel",this.funcNext), this.buttonNext[a?"removeClass":"addClass"](this.className("jcarousel-next-disabled")).attr("disabled",a?!1:!0),this.options.buttonNextCallback!==null&&this.buttonNext.data("jcarouselstate")!=a&&this.buttonNext.each(function(){b.options.buttonNextCallback(b,this,a)}).data("jcarouselstate",a)):this.options.buttonNextCallback!==null&&this.buttonNextState!=a&&this.options.buttonNextCallback(b,null,a);this.buttonPrev.size()>0?(this.buttonPrev.unbind(this.options.buttonPrevEvent+".jcarousel",this.funcPrev), c&&this.buttonPrev.bind(this.options.buttonPrevEvent+".jcarousel",this.funcPrev),this.buttonPrev[c?"removeClass":"addClass"](this.className("jcarousel-prev-disabled")).attr("disabled",c?!1:!0),this.options.buttonPrevCallback!==null&&this.buttonPrev.data("jcarouselstate")!=c&&this.buttonPrev.each(function(){b.options.buttonPrevCallback(b,this,c)}).data("jcarouselstate",c)):this.options.buttonPrevCallback!==null&&this.buttonPrevState!=c&&this.options.buttonPrevCallback(b,null,c);this.buttonNextState= a;this.buttonPrevState=c},notify:function(a){var c=this.prevFirst===null?"init":this.prevFirst<this.first?"next":"prev";this.callback("itemLoadCallback",a,c);this.prevFirst!==this.first&&(this.callback("itemFirstInCallback",a,c,this.first),this.callback("itemFirstOutCallback",a,c,this.prevFirst));this.prevLast!==this.last&&(this.callback("itemLastInCallback",a,c,this.last),this.callback("itemLastOutCallback",a,c,this.prevLast));this.callback("itemVisibleInCallback",a,c,this.first,this.last,this.prevFirst, this.prevLast);this.callback("itemVisibleOutCallback",a,c,this.prevFirst,this.prevLast,this.first,this.last)},callback:function(a,c,b,d,f,j,e){if(!(this.options[a]==null||typeof this.options[a]!="object"&&c!="onAfterAnimation")){var h=typeof this.options[a]=="object"?this.options[a][c]:this.options[a];if(g.isFunction(h)){var i=this;if(d===void 0)h(i,b,c);else if(f===void 0)this.get(d).each(function(){h(i,this,d,b,c)});else for(var a=function(a){i.get(a).each(function(){h(i,this,a,b,c)})},k=d;k<=f;k++)k!== null&&!(k>=j&&k<=e)&&a(k)}}},create:function(a){return this.format("<li></li>",a)},format:function(a,c){for(var a=g(a),b=a.get(0).className.split(" "),d=0;d<b.length;d++)b[d].indexOf("jcarousel-")!=-1&&a.removeClass(b[d]);a.addClass(this.className("jcarousel-item")).addClass(this.className("jcarousel-item-"+c)).css({"float":this.options.rtl?"right":"left","list-style":"none"}).attr("jcarouselindex",c);return a},className:function(a){return a+" "+a+(!this.options.vertical?"-horizontal":"-vertical")}, dimension:function(a,c){var b=g(a);if(c==null)return!this.options.vertical?b.outerWidth(!0)||f.intval(this.options.itemFallbackDimension):b.outerHeight(!0)||f.intval(this.options.itemFallbackDimension);else{var d=!this.options.vertical?c-f.intval(b.css("marginLeft"))-f.intval(b.css("marginRight")):c-f.intval(b.css("marginTop"))-f.intval(b.css("marginBottom"));g(b).css(this.wh,d+"px");return this.dimension(b)}},clipping:function(){return!this.options.vertical?this.clip[0].offsetWidth-f.intval(this.clip.css("borderLeftWidth"))- f.intval(this.clip.css("borderRightWidth")):this.clip[0].offsetHeight-f.intval(this.clip.css("borderTopWidth"))-f.intval(this.clip.css("borderBottomWidth"))},index:function(a,c){if(c==null)c=this.options.size;return Math.round(((a-1)/c-Math.floor((a-1)/c))*c)+1}});f.extend({defaults:function(a){return g.extend(q,a||{})},intval:function(a){a=parseInt(a,10);return isNaN(a)?0:a},windowLoaded:function(){m=!0}});g.fn.jcarousel=function(a){if(typeof a=="string"){var c=g(this).data("jcarousel"),b=Array.prototype.slice.call(arguments, 1);return c[a].apply(c,b)}else return this.each(function(){var b=g(this).data("jcarousel");b?(a&&g.extend(b.options,a),b.reload()):g(this).data("jcarousel",new f(this,a))})}})(jQuery);
(function() {


}).call(this);
/*	SWFObject v2.2 <http://code.google.com/p/swfobject/> 
	is released under the MIT License <http://www.opensource.org/licenses/mit-license.php> 
*/

var swfobject=function(){var D="undefined",r="object",S="Shockwave Flash",W="ShockwaveFlash.ShockwaveFlash",q="application/x-shockwave-flash",R="SWFObjectExprInst",x="onreadystatechange",O=window,j=document,t=navigator,T=false,U=[h],o=[],N=[],I=[],l,Q,E,B,J=false,a=false,n,G,m=true,M=function(){var aa=typeof j.getElementById!=D&&typeof j.getElementsByTagName!=D&&typeof j.createElement!=D,ah=t.userAgent.toLowerCase(),Y=t.platform.toLowerCase(),ae=Y?/win/.test(Y):/win/.test(ah),ac=Y?/mac/.test(Y):/mac/.test(ah),af=/webkit/.test(ah)?parseFloat(ah.replace(/^.*webkit\/(\d+(\.\d+)?).*$/,"$1")):false,X=!+"\v1",ag=[0,0,0],ab=null;if(typeof t.plugins!=D&&typeof t.plugins[S]==r){ab=t.plugins[S].description;if(ab&&!(typeof t.mimeTypes!=D&&t.mimeTypes[q]&&!t.mimeTypes[q].enabledPlugin)){T=true;X=false;ab=ab.replace(/^.*\s+(\S+\s+\S+$)/,"$1");ag[0]=parseInt(ab.replace(/^(.*)\..*$/,"$1"),10);ag[1]=parseInt(ab.replace(/^.*\.(.*)\s.*$/,"$1"),10);ag[2]=/[a-zA-Z]/.test(ab)?parseInt(ab.replace(/^.*[a-zA-Z]+(.*)$/,"$1"),10):0}}else{if(typeof O.ActiveXObject!=D){try{var ad=new ActiveXObject(W);if(ad){ab=ad.GetVariable("$version");if(ab){X=true;ab=ab.split(" ")[1].split(",");ag=[parseInt(ab[0],10),parseInt(ab[1],10),parseInt(ab[2],10)]}}}catch(Z){}}}return{w3:aa,pv:ag,wk:af,ie:X,win:ae,mac:ac}}(),k=function(){if(!M.w3){return}if((typeof j.readyState!=D&&j.readyState=="complete")||(typeof j.readyState==D&&(j.getElementsByTagName("body")[0]||j.body))){f()}if(!J){if(typeof j.addEventListener!=D){j.addEventListener("DOMContentLoaded",f,false)}if(M.ie&&M.win){j.attachEvent(x,function(){if(j.readyState=="complete"){j.detachEvent(x,arguments.callee);f()}});if(O==top){(function(){if(J){return}try{j.documentElement.doScroll("left")}catch(X){setTimeout(arguments.callee,0);return}f()})()}}if(M.wk){(function(){if(J){return}if(!/loaded|complete/.test(j.readyState)){setTimeout(arguments.callee,0);return}f()})()}s(f)}}();function f(){if(J){return}try{var Z=j.getElementsByTagName("body")[0].appendChild(C("span"));Z.parentNode.removeChild(Z)}catch(aa){return}J=true;var X=U.length;for(var Y=0;Y<X;Y++){U[Y]()}}function K(X){if(J){X()}else{U[U.length]=X}}function s(Y){if(typeof O.addEventListener!=D){O.addEventListener("load",Y,false)}else{if(typeof j.addEventListener!=D){j.addEventListener("load",Y,false)}else{if(typeof O.attachEvent!=D){i(O,"onload",Y)}else{if(typeof O.onload=="function"){var X=O.onload;O.onload=function(){X();Y()}}else{O.onload=Y}}}}}function h(){if(T){V()}else{H()}}function V(){var X=j.getElementsByTagName("body")[0];var aa=C(r);aa.setAttribute("type",q);var Z=X.appendChild(aa);if(Z){var Y=0;(function(){if(typeof Z.GetVariable!=D){var ab=Z.GetVariable("$version");if(ab){ab=ab.split(" ")[1].split(",");M.pv=[parseInt(ab[0],10),parseInt(ab[1],10),parseInt(ab[2],10)]}}else{if(Y<10){Y++;setTimeout(arguments.callee,10);return}}X.removeChild(aa);Z=null;H()})()}else{H()}}function H(){var ag=o.length;if(ag>0){for(var af=0;af<ag;af++){var Y=o[af].id;var ab=o[af].callbackFn;var aa={success:false,id:Y};if(M.pv[0]>0){var ae=c(Y);if(ae){if(F(o[af].swfVersion)&&!(M.wk&&M.wk<312)){w(Y,true);if(ab){aa.success=true;aa.ref=z(Y);ab(aa)}}else{if(o[af].expressInstall&&A()){var ai={};ai.data=o[af].expressInstall;ai.width=ae.getAttribute("width")||"0";ai.height=ae.getAttribute("height")||"0";if(ae.getAttribute("class")){ai.styleclass=ae.getAttribute("class")}if(ae.getAttribute("align")){ai.align=ae.getAttribute("align")}var ah={};var X=ae.getElementsByTagName("param");var ac=X.length;for(var ad=0;ad<ac;ad++){if(X[ad].getAttribute("name").toLowerCase()!="movie"){ah[X[ad].getAttribute("name")]=X[ad].getAttribute("value")}}P(ai,ah,Y,ab)}else{p(ae);if(ab){ab(aa)}}}}}else{w(Y,true);if(ab){var Z=z(Y);if(Z&&typeof Z.SetVariable!=D){aa.success=true;aa.ref=Z}ab(aa)}}}}}function z(aa){var X=null;var Y=c(aa);if(Y&&Y.nodeName=="OBJECT"){if(typeof Y.SetVariable!=D){X=Y}else{var Z=Y.getElementsByTagName(r)[0];if(Z){X=Z}}}return X}function A(){return !a&&F("6.0.65")&&(M.win||M.mac)&&!(M.wk&&M.wk<312)}function P(aa,ab,X,Z){a=true;E=Z||null;B={success:false,id:X};var ae=c(X);if(ae){if(ae.nodeName=="OBJECT"){l=g(ae);Q=null}else{l=ae;Q=X}aa.id=R;if(typeof aa.width==D||(!/%$/.test(aa.width)&&parseInt(aa.width,10)<310)){aa.width="310"}if(typeof aa.height==D||(!/%$/.test(aa.height)&&parseInt(aa.height,10)<137)){aa.height="137"}j.title=j.title.slice(0,47)+" - Flash Player Installation";var ad=M.ie&&M.win?"ActiveX":"PlugIn",ac="MMredirectURL="+O.location.toString().replace(/&/g,"%26")+"&MMplayerType="+ad+"&MMdoctitle="+j.title;if(typeof ab.flashvars!=D){ab.flashvars+="&"+ac}else{ab.flashvars=ac}if(M.ie&&M.win&&ae.readyState!=4){var Y=C("div");X+="SWFObjectNew";Y.setAttribute("id",X);ae.parentNode.insertBefore(Y,ae);ae.style.display="none";(function(){if(ae.readyState==4){ae.parentNode.removeChild(ae)}else{setTimeout(arguments.callee,10)}})()}u(aa,ab,X)}}function p(Y){if(M.ie&&M.win&&Y.readyState!=4){var X=C("div");Y.parentNode.insertBefore(X,Y);X.parentNode.replaceChild(g(Y),X);Y.style.display="none";(function(){if(Y.readyState==4){Y.parentNode.removeChild(Y)}else{setTimeout(arguments.callee,10)}})()}else{Y.parentNode.replaceChild(g(Y),Y)}}function g(ab){var aa=C("div");if(M.win&&M.ie){aa.innerHTML=ab.innerHTML}else{var Y=ab.getElementsByTagName(r)[0];if(Y){var ad=Y.childNodes;if(ad){var X=ad.length;for(var Z=0;Z<X;Z++){if(!(ad[Z].nodeType==1&&ad[Z].nodeName=="PARAM")&&!(ad[Z].nodeType==8)){aa.appendChild(ad[Z].cloneNode(true))}}}}}return aa}function u(ai,ag,Y){var X,aa=c(Y);if(M.wk&&M.wk<312){return X}if(aa){if(typeof ai.id==D){ai.id=Y}if(M.ie&&M.win){var ah="";for(var ae in ai){if(ai[ae]!=Object.prototype[ae]){if(ae.toLowerCase()=="data"){ag.movie=ai[ae]}else{if(ae.toLowerCase()=="styleclass"){ah+=' class="'+ai[ae]+'"'}else{if(ae.toLowerCase()!="classid"){ah+=" "+ae+'="'+ai[ae]+'"'}}}}}var af="";for(var ad in ag){if(ag[ad]!=Object.prototype[ad]){af+='<param name="'+ad+'" value="'+ag[ad]+'" />'}}aa.outerHTML='<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"'+ah+">"+af+"</object>";N[N.length]=ai.id;X=c(ai.id)}else{var Z=C(r);Z.setAttribute("type",q);for(var ac in ai){if(ai[ac]!=Object.prototype[ac]){if(ac.toLowerCase()=="styleclass"){Z.setAttribute("class",ai[ac])}else{if(ac.toLowerCase()!="classid"){Z.setAttribute(ac,ai[ac])}}}}for(var ab in ag){if(ag[ab]!=Object.prototype[ab]&&ab.toLowerCase()!="movie"){e(Z,ab,ag[ab])}}aa.parentNode.replaceChild(Z,aa);X=Z}}return X}function e(Z,X,Y){var aa=C("param");aa.setAttribute("name",X);aa.setAttribute("value",Y);Z.appendChild(aa)}function y(Y){var X=c(Y);if(X&&X.nodeName=="OBJECT"){if(M.ie&&M.win){X.style.display="none";(function(){if(X.readyState==4){b(Y)}else{setTimeout(arguments.callee,10)}})()}else{X.parentNode.removeChild(X)}}}function b(Z){var Y=c(Z);if(Y){for(var X in Y){if(typeof Y[X]=="function"){Y[X]=null}}Y.parentNode.removeChild(Y)}}function c(Z){var X=null;try{X=j.getElementById(Z)}catch(Y){}return X}function C(X){return j.createElement(X)}function i(Z,X,Y){Z.attachEvent(X,Y);I[I.length]=[Z,X,Y]}function F(Z){var Y=M.pv,X=Z.split(".");X[0]=parseInt(X[0],10);X[1]=parseInt(X[1],10)||0;X[2]=parseInt(X[2],10)||0;return(Y[0]>X[0]||(Y[0]==X[0]&&Y[1]>X[1])||(Y[0]==X[0]&&Y[1]==X[1]&&Y[2]>=X[2]))?true:false}function v(ac,Y,ad,ab){if(M.ie&&M.mac){return}var aa=j.getElementsByTagName("head")[0];if(!aa){return}var X=(ad&&typeof ad=="string")?ad:"screen";if(ab){n=null;G=null}if(!n||G!=X){var Z=C("style");Z.setAttribute("type","text/css");Z.setAttribute("media",X);n=aa.appendChild(Z);if(M.ie&&M.win&&typeof j.styleSheets!=D&&j.styleSheets.length>0){n=j.styleSheets[j.styleSheets.length-1]}G=X}if(M.ie&&M.win){if(n&&typeof n.addRule==r){n.addRule(ac,Y)}}else{if(n&&typeof j.createTextNode!=D){n.appendChild(j.createTextNode(ac+" {"+Y+"}"))}}}function w(Z,X){if(!m){return}var Y=X?"visible":"hidden";if(J&&c(Z)){c(Z).style.visibility=Y}else{v("#"+Z,"visibility:"+Y)}}function L(Y){var Z=/[\\\"<>\.;]/;var X=Z.exec(Y)!=null;return X&&typeof encodeURIComponent!=D?encodeURIComponent(Y):Y}var d=function(){if(M.ie&&M.win){window.attachEvent("onunload",function(){var ac=I.length;for(var ab=0;ab<ac;ab++){I[ab][0].detachEvent(I[ab][1],I[ab][2])}var Z=N.length;for(var aa=0;aa<Z;aa++){y(N[aa])}for(var Y in M){M[Y]=null}M=null;for(var X in swfobject){swfobject[X]=null}swfobject=null})}}();return{registerObject:function(ab,X,aa,Z){if(M.w3&&ab&&X){var Y={};Y.id=ab;Y.swfVersion=X;Y.expressInstall=aa;Y.callbackFn=Z;o[o.length]=Y;w(ab,false)}else{if(Z){Z({success:false,id:ab})}}},getObjectById:function(X){if(M.w3){return z(X)}},embedSWF:function(ab,ah,ae,ag,Y,aa,Z,ad,af,ac){var X={success:false,id:ah};if(M.w3&&!(M.wk&&M.wk<312)&&ab&&ah&&ae&&ag&&Y){w(ah,false);K(function(){ae+="";ag+="";var aj={};if(af&&typeof af===r){for(var al in af){aj[al]=af[al]}}aj.data=ab;aj.width=ae;aj.height=ag;var am={};if(ad&&typeof ad===r){for(var ak in ad){am[ak]=ad[ak]}}if(Z&&typeof Z===r){for(var ai in Z){if(typeof am.flashvars!=D){am.flashvars+="&"+ai+"="+Z[ai]}else{am.flashvars=ai+"="+Z[ai]}}}if(F(Y)){var an=u(aj,am,ah);if(aj.id==ah){w(ah,true)}X.success=true;X.ref=an}else{if(aa&&A()){aj.data=aa;P(aj,am,ah,ac);return}else{w(ah,true)}}if(ac){ac(X)}})}else{if(ac){ac(X)}}},switchOffAutoHideShow:function(){m=false},ua:M,getFlashPlayerVersion:function(){return{major:M.pv[0],minor:M.pv[1],release:M.pv[2]}},hasFlashPlayerVersion:F,createSWF:function(Z,Y,X){if(M.w3){return u(Z,Y,X)}else{return undefined}},showExpressInstall:function(Z,aa,X,Y){if(M.w3&&A()){P(Z,aa,X,Y)}},removeSWF:function(X){if(M.w3){y(X)}},createCSS:function(aa,Z,Y,X){if(M.w3){v(aa,Z,Y,X)}},addDomLoadEvent:K,addLoadEvent:s,getQueryParamValue:function(aa){var Z=j.location.search||j.location.hash;if(Z){if(/\?/.test(Z)){Z=Z.split("?")[1]}if(aa==null){return L(Z)}var Y=Z.split("&");for(var X=0;X<Y.length;X++){if(Y[X].substring(0,Y[X].indexOf("="))==aa){return L(Y[X].substring((Y[X].indexOf("=")+1)))}}}return""},expressInstallCallback:function(){if(a){var X=c(R);if(X&&l){X.parentNode.replaceChild(l,X);if(Q){w(Q,true);if(M.ie&&M.win){l.style.display="block"}}if(E){E(B)}}a=false}}}}();
// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// the compiled file.
//
// WARNING: THE FIRST BLANK LINE MARKS THE END OF WHAT'S TO BE PROCESSED, ANY BLANK LINE SHOULD
// GO AFTER THE REQUIRES BELOW.
//










$(document).ready(function (){
		    $("#pikame").PikaChoose({carousel:true, carouselVertical:true});


		    var $container = $('#anuncios_container');
// initialize

//188
$container.masonry({
  columnWidth: 246,
		     gutter: 15,
  itemSelector: 'li'
});
  });

