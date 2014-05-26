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

var PreDashboard = React.createClass({
	mixins: [AsyncJSXRoute],
	moduleName: 'partial-app-dashboard',
	preRender: function() {
		return <div>Loading dashboard...</div>
	}
});

var PreInbox = React.createClass({
	mixins: [AsyncJSXRoute],
	moduleName: 'partial-app-inbox',
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
