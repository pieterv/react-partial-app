"use strict";
var React = require("react")["default"] || require("react");

var Route = React.createClass({

  propTypes: {
    name: React.PropTypes.string,
    path: React.PropTypes.string,
    handler: React.PropTypes.component.isRequired
  },

  render: function() {
    return;
  }

});

exports["default"] = Route;