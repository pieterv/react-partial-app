/** @jsx React.DOM */
var React = require('react');
//var RfRouter = require('react-router');
//var Routes = RfRouter.Routes;
//var Route = RfRouter.Route;
//var Link = RfRouter.Link;


var Main = React.createClass({
	render: function() {
		return (
			<Routes handler={App}>
				<Route name="dashboard" path="dashboard" handler={PreDashboard}>
					<Route name="inbox" path="dashboard/inbox" handler={PreInbox}/>
				</Route>
			</Routes>
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

var PreDashboard = React.createClass({
	mixins: [AsyncJSXRoute],
	moduleName: 'partial-app-dashboard',
	globalName: 'Dashboard',
	preRender: function() {
		return <div>Loading dashboard...</div>
	}
});

var PreInbox = React.createClass({
	mixins: [AsyncJSXRoute],
	filePath: 'partial-app-inbox.js',
	globalName: 'Inbox',
	preRender: function() {
		return <div>Loading inbox...</div>
	}
});

var App = React.createClass({
	render: function() {
		return (
			<div>
				<h1>Partial App</h1>
				<ul>
					<li><Link to="dashboard">Dashboard</Link></li>
				</ul>
        {this.props.activeRoute}
			</div>
			);
	}
});

React.renderComponent(<Main/>, document.body);
