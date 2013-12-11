garðr-validator-web
=============

[![Build Status](https://travis-ci.org/gardr/validator-web.png)](https://travis-ci.org/gardr/validator-web)
[![Build Status](https://drone.io/github.com/gardr/validator-web/status.png)](https://drone.io/github.com/gardr/validator-web/latest)

**Description: This is the web interface for the [garðr validator project](http://gardr.github.io/).**

The main purpose is to find possible errors or regressions in display ads. Its intended to grow over time to a set of rules based on best practices for performance ( although displayads not necessarily can avoid document.write atm ).

The validator takes _input_ as a _scripturl_ or _html,css and javascript_, and produces in 2 steps harvested data and a report.

Hooks / Harvesters (runs inside phantomJS context):
* har,logs,errors (default)
* images
* jquery
* gardr (based on [advertsspec](https://github.com/finn-no/advertsspec/blob/master/specification.md))
* timers

Validators / Rules (runs in node.js context):
* errors (default)
* images
* jquery
* css
* timers


# How does the validator work?

It uses phantomJS as a browser, loads in a shim on top of the phanomjs api, runs for a 10 seconds after all hooks/harvesters has been injected.
After phantomjs run, the validators/rules runs in a series to generate a report(info, warn, debug, error).


# Installation instructions

Install depedencies and package validator with package gardr(abit funky)

    $ npm install && npm run build

Run tests

    $ npm test

# Starting the application

Run server

    $ npm start

## Additional startup configuration

You can configure port, logfile location, etc using the [config module](lib/config.js) or by specifying environment variables when starting.

	$ HTTP_PORT=1337 LOG_FILE_NAME=~/mylogs/pvw npm start

# Where to get help

Create a github issue, or contact sveinung.rosaker@finn.no.


# Contributing

YES, pull requests with tests. Be sure to create a issue and let us know you are working on it - maybe we can help out with insights etc.

# Alternatives

(please let us know of alternatives to this project)
