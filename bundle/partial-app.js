
require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({5001:[function(require,module,exports){
/** @jsx React.DOM */
var React = require('react');
//var RfRouter = require('react-router');
//var Routes = RfRouter.Routes;
//var Route = RfRouter.Route;
//var Link = RfRouter.Link;


var Main = React.createClass({displayName: 'Main',
	render: function() {
		return (
			Routes( {handler:App}, 
				Route( {name:"dashboard", path:"dashboard", handler:PreDashboard}, 
					Route( {name:"inbox", path:"dashboard/inbox", handler:PreInbox})
				)
			)
			);
	}
});

var AsyncJSXRoute = {
	routeCache: {},
	load: function() {
//		if (this.routeCache[this.globalName]) {
//			return;
//		}

		try {
			var component = require(this.moduleName);
		} catch( e ) {

		}
		console.log( component );

//		require([], function() {
//			console.log('loading', this.globalName, this.filePath);
//			this.routeCache[this.globalName] = require('./async-components/' + this.filePath);
//			this.forceUpdate();
//		}.bind(this));
	},

	componentDidMount: function() {
		setTimeout(this.load, 1000); // feel it good
	},

	render: function() {
		var fullRoute = this.routeCache[this.globalName];
		return fullRoute ? fullRoute(this.props) : this.preRender();
	}
};

var PreDashboard = React.createClass({displayName: 'PreDashboard',
	mixins: [AsyncJSXRoute],
	moduleName: 'partial-app-dashboard',
	globalName: 'Dashboard',
	preRender: function() {
		return React.DOM.div(null, "Loading dashboard...")
	}
});

var PreInbox = React.createClass({displayName: 'PreInbox',
	mixins: [AsyncJSXRoute],
	filePath: 'partial-app-inbox.js',
	globalName: 'Inbox',
	preRender: function() {
		return React.DOM.div(null, "Loading inbox...")
	}
});

var App = React.createClass({displayName: 'App',
	render: function() {
		return (
			React.DOM.div(null, 
				React.DOM.h1(null, "Partial App"),
				React.DOM.ul(null, 
					React.DOM.li(null, Link( {to:"dashboard"}, "Dashboard"))
				),
        this.props.activeRoute
			)
			);
	}
});

React.renderComponent(Main(null), document.body);

},{"react":1}]},{},[5001]);
