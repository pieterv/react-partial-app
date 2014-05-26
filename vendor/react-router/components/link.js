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
var urlStore = __es6_transpiler_build_module_object__("urlStore", require("../stores/url-store"));
var routeStore = __es6_transpiler_build_module_object__("routeStore", require("../stores/route-store"));
var path = __es6_transpiler_build_module_object__("path", require("../path"));

var Link = React.createClass({

  statics: {

    makeHref: function (routeName, params) {
      var route = routeStore.getRouteByName(routeName);

      if (!route)
        throw new Error('No route with name: ' + routeName);

      var base = urlStore.getLocation() === 'history' ? '/' : '#/';

      return base + path.forRoute(route, params);
    }

  },

  getInitialState: function() {
    return {
      href: Link.makeHref(this.props.to, this.props),
      isActive: this.isActive()
    };
  },

  handleRouteChange: function() {
    this.setState({
      isActive: this.isActive()
    });
  },

  isActive: function() {
    var active = routeStore.getActive();
    for (var i = 0, l = active.length; i < l; i++) {
      if (this.props.to === active[i].route.props.name) {
        if (!active[i].params) {
          return true;
        }
        return paramsAreActive(active[i].params, this.props);
      }
    }
    return false;
  },

  componentDidMount: function() {
    // must subscribe in didMount so the subscription is after the RootRoute
    // subscription
    urlStore.subscribe(this.handleRouteChange);
  },

  componentWillUnmount: function() {
    urlStore.unsubscribe(this.handleRouteChange);
  },

  handleClick: function(event) {
    if (event.metaKey || event.ctrlKey || event.shiftKey) {
      return;
    }
    event.preventDefault();
    urlStore.push(this.state.href);
  },

  className: function() {
    var className = this.props.className || '';
    if (this.state.isActive) {
      className += ' active';
    }
    return className;
  },

  render: function() {
    return React.DOM.a({
      href: this.state.href,
      onClick: this.handleClick,
      className: this.className()
    }, this.props.children);
  }
});

function paramsAreActive(params, props) {
  for (var key in params) {
    if (props[key] !== params[key]) {
      return false;
    }
  }
  return true;
}

exports["default"] = Link;