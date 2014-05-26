"use strict";
function __es6_transpiler_warn__(warning) {
  if (typeof console === 'undefined') {
  } else if (typeof console.warn === "function") {
    console.warn(warning);
  } else if (typeof console.log === "function") {
    console.log(warning);
  }
}
function __es6_transpiler_build_module_object__(name, imported) {
  var moduleInstanceObject = Object.create ? Object.create(null) : {};
  if (typeof imported === "function") {
    __es6_transpiler_warn__("imported module '"+name+"' exported a function - this may not work as expected");
  }
  for (var key in imported) {
    if (Object.prototype.hasOwnProperty.call(imported, key)) {
      moduleInstanceObject[key] = imported[key];
    }
  }
  if (Object.freeze) {
    Object.freeze(moduleInstanceObject);
  }
  return moduleInstanceObject;
}
var React = require("react")["default"] || require("react");
var routeStore = __es6_transpiler_build_module_object__("routeStore", require("../stores/route-store"));
var urlStore = __es6_transpiler_build_module_object__("urlStore", require("../stores/url-store"));

var Routes = React.createClass({

  propTypes: {
    handler: React.PropTypes.component.isRequired,
    location: React.PropTypes.string
  },

  getInitialState: function() {
    return {
      currentPath: null,
      activeRoutes: []
    };
  },

  componentWillMount: function() {
    routeStore.registerRoot(this);
    urlStore.subscribe(this.handleRouteChange);
    urlStore.setup(this.getLocation());
  },

  componentWillUnmount: function() {
    routeStore.unregisterRoot(this);
    urlStore.unsubscribe(this.handleRouteChange);
    urlStore.teardown();
  },

  getLocation: function () {
    return this.props.location || 'hash';
  },

  handleRouteChange: function() {
    var currentPath = urlStore.getCurrentPath();

    this.setState({
      currentPath: currentPath,
      // TODO: Should we update this in componentWillReceiveProps instead?
      activeRoutes: routeStore.updateActive(currentPath, this)
    });
  },

  reservedProps: ['handler', 'location'],

  render: function() {
    var props = {};
    for (var name in this.props) {
      if (this.reservedProps.indexOf(name) === -1) {
        props[name] = this.props[name];
      }
    }
    var active = this.state.activeRoutes;
    if (active.length) {
      var lastHandlerInstance;
      var lastHandler;
      var lastParams;
      active.slice(0).reverse().forEach(function(info) {
        var props = {};
        if (lastHandlerInstance) {
          props.activeRoute = lastHandlerInstance;
          props.ActiveRoute = lastHandler;
        } else {
          // make sure transitioning to the same route with new
          // params causes an update
          props.key = urlStore.getCurrentPath();
        }
        if (lastParams) {
          props.activeParams = lastParams;
        }
        if (info.params) {
          lastParams = info.params;
          for (var name in info.params) {
            props[name] = info.params[name];
          }
        }
        lastHandler = info.route.props.handler;
        lastHandlerInstance = info.route.props.handler(props);
      });
    }
    if (lastParams) {
      props.activeParams = lastParams;
    }
    props.ActiveRoute = lastHandler;
    props.activeRoute = lastHandlerInstance;
    return this.props.handler(props);
  }

});

exports["default"] = Routes;