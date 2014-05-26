"use strict";
var HISTORY_EVENTS = {
  hash: 'hashchange',
  history: 'popstate'
};

var _location;

function setup(location) {
  if (_location)
    throw new Error('Cannot setup URL twice');

  var historyEvent = HISTORY_EVENTS[location];

  if (!historyEvent)
    throw new Error('Invalid URL location: ' + location);

  _location = location;

  if (location === 'hash' && getCurrentPathUsingLocation(location) === '')
    pushHash('/');

  window.addEventListener(historyEvent, handleStateChange, false);

  handleStateChange();
}

exports.setup = setup;function teardown() {
  if (!_location)
    return;

  window.removeEventListener(HISTORY_EVENTS[_location], handleStateChange);

  _location = null;
}

exports.teardown = teardown;function getLocation() {
  return _location || 'hash';
}

exports.getLocation = getLocation;var _currentPath;

function getCurrentPath() {
  return _currentPath;
}

exports.getCurrentPath = getCurrentPath;function updateCurrentPath(path) {
  _currentPath = path;
  notifyChange();
}

exports.updateCurrentPath = updateCurrentPath;function getCurrentPathUsingLocation(location) {
  var pathname = location === 'history' ? window.location.pathname : window.location.hash.substr(1);
  return pathname.replace(/^\//, '');
}

function handleStateChange() {
  updateCurrentPath(getCurrentPathUsingLocation(_location));
}

function push(path) {
  return getLocation() === 'history' ? pushHistory(path) : pushHash(path);
}

exports.push = push;function pushHash(path) {
  window.location.hash = path;
}

function pushHistory(path) {
  window.history.pushState({path: path}, '', path);
  handleStateChange();
}

function replace(path) {
  return getLocation() === 'history' ? replaceHistory(path) : replaceHash(path);
}

exports.replace = replace;function replaceHash(path) {
  window.location.replace(path);
}

function replaceHistory(path) {
  window.history.replaceState({path: path}, '', path);
  handleStateChange();
}

// TODO: pubsub could probably be its own module.

var _subscriptions = [];

function subscribe(fn) {
  _subscriptions.push(fn);
}

exports.subscribe = subscribe;function unsubscribe(fn) {
  for (var i = 0, l = _subscriptions.length; i < l; i++) {
    if (_subscriptions[i] === fn) {
      _subscriptions.splice(i, 1);
      break;
    }
  }
}

exports.unsubscribe = unsubscribe;function notifyChange() {
  for (var i = 0, l = _subscriptions.length; i < l; i++) {
    if (_subscriptions[i] == null) {
      // some views may get wiped out during mid loop and so the subscription
      // is gone, so just bail
      return;
    }
    _subscriptions[i]();
  }
}