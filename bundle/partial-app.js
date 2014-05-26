(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/** @jsx React.DOM */
var React = require('react');
var RfRouter = require('./vendor/react-router');
var Routes = RfRouter.Routes;
var Route = RfRouter.Route;
var Link = RfRouter.Link;

function asyncLoadScript(url, onLoad, onError) {
	var el = document.createElement('script');
	var first_script = document.getElementsByTagName('script')[0] || document.head.children[0];

	el.onload = onLoad;
	el.onerror = onError;
	el.src = url;
	first_script.parentNode.insertBefore(el, first_script);
}

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
	getInitialState: function() {
		return {
			FullRouteComponent: null
		};
	},

	load: function() {
		if (this.state.FullRouteComponent) {
			return;
		}

		asyncLoadScript(
			'bundle/' + this.moduleName + '.js',
			function() {
				this.setState({
					FullRouteComponent: require('./' + this.moduleName)
				});
			}.bind(this),
			function() {
				throw new Error('Failed to load bundle "' + this.moduleName + '"');
			}.bind(this)
		);
	},

	componentDidMount: function() {
		try {
			this.setState({
				FullRouteComponent: require('./' + this.moduleName)
			});
		} catch( e ) {
			setTimeout(this.load, 1000); // feel it good
		}
	},

	render: function() {
		return this.state.FullRouteComponent
			? this.state.FullRouteComponent(this.props) : this.preRender();
	}
};

var PreDashboard = React.createClass({displayName: 'PreDashboard',
	mixins: [AsyncJSXRoute],
	moduleName: 'partial-app-dashboard',
	preRender: function() {
		return React.DOM.div(null, "Loading dashboard...")
	}
});

var PreInbox = React.createClass({displayName: 'PreInbox',
	mixins: [AsyncJSXRoute],
	moduleName: 'partial-app-inbox',
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

},{"./vendor/react-router":"tnEs6c","react":"M6d2gk"}]},{},[1])