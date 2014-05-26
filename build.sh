#!/bin/bash

# this works
browserify -r react -r react-router > bundle/common.js
browserify -x react -x react-router partial-app.js > bundle/partial-app.js
browserify -x react -x react-router partial-app-dashboard.js > bundle/partial-app-dashboard.js