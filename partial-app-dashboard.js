/** @jsx React.DOM */

var React = require('react');
var Link = require('./vendor/react-router').Link;

var Dashboard = React.createClass({

	render: function() {
		return (
			<div>
				<h1>Dashboard!</h1>
				<ul>
					<li><Link to="/">Home</Link></li>
					<li><Link to="inbox">Inbox</Link></li>
				</ul>
        {this.props.activeRoute}
			</div>
			);
	}
});

module.exports = Dashboard;