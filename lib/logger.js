'use strict';
var util = require('util');
var Buffer = require('buffer').Buffer;
var config = require('config');
var winston = require('winston');
var Sentry = require('winston-common-sentry');
var Scribe = require('winston-common-scribe');

//
// Transports
//

var sentryTransport = new Sentry({
    level: 'warn',
    dsn: config.sentry,
});

var scribeTransport = new Scribe({
    app: config.app,
    version: config.scribe.version,
    host: config.scribe.host,
    port: config.scribe.port,
    category: config.scribe.category,
});

var consoleTransport = new (winston.transports.Console)({
    prettyPrint: true,
    colorize: true,
});

var fileTransport = new (winston.transports.DailyRotateFile)({
    colorize: false,
    timestamp: true,
    json: false,
    filename: config.path.log,
    maxsize: 1024 * 1024 * 100, // 100MB
    maxFiles: 1,
    datePattern: '.HH',
});

// https://github.com/winstonjs/winston/blob/master/docs/transports.md
var logger = new (winston.Logger)({
    transports: config.debug ?
        [consoleTransport, sentryTransport, scribeTransport] :
        [fileTransport, sentryTransport, scribeTransport],
});

module.exports = logger;
