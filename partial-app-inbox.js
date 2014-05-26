/** @jsx React.DOM */

var React = require('react');
var Link = require('./vendor/react-router').Link;

var Inbox = React.createClass({

	render: function() {
		return (
			<div>
				<h1>Inbox!</h1>
				<ul>
					<li><Link to="/">Home</Link></li>
					<li><Link to="dashboard">Back</Link></li>
				</ul>
			</div>
			);
	}
});

module.exports = Inbox;