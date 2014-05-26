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
var Link = require("./components/link")["default"] || require("./components/link");
var Route = require("./components/route")["default"] || require("./components/route");
var Routes = require("./components/routes")["default"] || require("./components/routes");
var routeStore = __es6_transpiler_build_module_object__("routeStore", require("./stores/route-store"));
var urlStore = __es6_transpiler_build_module_object__("urlStore", require("./stores/url-store"));

function transitionTo(name, props) {
  urlStore.push(Link.makeHref(name, props));
}

exports.transitionTo = transitionTo;function replaceWith(name, props) {
  urlStore.replace(Link.makeHref(name, props));
}

exports.replaceWith = replaceWith;function getCurrentInfo() {
  var active = routeStore.getActive();
  var current = active[active.length - 1];

  return {
    name: current.route.props.name,
    params: current.params
  };
}

exports.getCurrentInfo = getCurrentInfo;exports.Link = Link;
exports.Route = Route;
exports.Routes = Routes;