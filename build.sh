#!/bin/bash

browserify -r react -r ./vendor/react-router > bundle/common.js
browserify -x react -x ./vendor/react-router partial-app.js > bundle/partial-app.js
browserify -x react -x ./vendor/react-router -r ./partial-app-dashboard > bundle/partial-app-dashboard.js
browserify -x react -x ./vendor/react-router -r ./partial-app-inbox > bundle/partial-app-inbox.js