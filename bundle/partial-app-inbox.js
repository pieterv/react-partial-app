require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"B3N8yD":[function(require,module,exports){
/** @jsx React.DOM */

var React = require('react');
var Link = require('./vendor/react-router').Link;

var Inbox = React.createClass({displayName: 'Inbox',

	render: function() {
		return (
			React.DOM.div(null, 
				React.DOM.h1(null, "Inbox!"),
				React.DOM.ul(null, 
					React.DOM.li(null, Link( {to:"/"}, "Home")),
					React.DOM.li(null, Link( {to:"dashboard"}, "Back"))
				)
			)
			);
	}
});

module.exports = Inbox;
},{"./vendor/react-router":"tnEs6c","react":"M6d2gk"}],"./partial-app-inbox":[function(require,module,exports){
module.exports=require('B3N8yD');
},{}]},{},[])