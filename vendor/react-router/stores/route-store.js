"use strict";
var React = require("react")["default"] || require("react");
var path = require("../path")["default"] || require("../path");

var _routes = {};

function getRouteByName(name) {
  return _routes[name];
}

exports.getRouteByName = getRouteByName;function registerRoot(root) {
  _routes = {};
  _routes['/'] = root;
  React.Children.forEach(root, registerRoute);
}

exports.registerRoot = registerRoot;function unregisterRoot(root) {
  React.Children.forEach(root, unregisterRoute);
}

exports.unregisterRoot = unregisterRoot;function registerRoute(route) {
  if (route.props.name)
    _routes[route.props.name] = route;

  if (route.props.children)
    React.Children.forEach(route.props.children, registerRoute);
}

function unregisterRoute(route) {
  if (route.props.name)
    delete _routes[route.props.name];

  if (route.props.children)
    React.Children.forEach(route.props.children, unregisterRoute);
}

var _active = [];

function getActive() {
  return _active;
}

exports.getActive = getActive;function updateActive(activePath, root) {
  _active = findActiveRoutes(activePath, root.props.children);

  if (_active.length === 0 && activePath)
    console.warn('No routes matched path: ' + activePath);

  return _active;
}

exports.updateActive = updateActive;/**
 * Attempts to match the given path against the paths of the given child routes
 * and returns an array of routes that matched ordered by depth, top-first.
 */
function findActiveRoutes(activePath, children, _matches) {
  _matches = _matches || [];

  eachChild(children, function (route) {
    var params = path.getRouteParams(route, activePath);

    if (params) {
      _matches.unshift({
        route: route,
        params: params
      });

      return false; // Stop looping.
    }

    if (route.props.children && _matches.length !== findActiveRoutes(activePath, route.props.children, _matches).length) {
      _matches.unshift({
        route: route
      });

      return false; // Stop looping.
    }
  });

  return _matches;
}

/**
 * A cancellable React.Children.forEach that stops looping when the given
 * callback returns `false`.
 */
function eachChild(children, callback, context) {
  if (Array.isArray(children)) {
    for (var i = 0, length = children.length; i < length; ++i) {
      if (callback.call(context, children[i], i, children) === false)
        break;
    }
  } else if (children) {
    callback.call(context, children, 0, [ children ]);
  }
}