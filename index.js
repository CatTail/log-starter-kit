'use strict';
var util = require('util');
var moment = require('moment');
var _ = require('lodash');
var uuid = require('node-uuid');
var app = require('koa')();
var logger = require('./lib/logger');

app.context.userid = function() {
    var id = this.cookies.get('userID') || this.temporaryUuid;
    if (!id) {
        id = uuid.v4();
        this.temporaryUuid = id;
        this.cookies.set('userID', id, {expire: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)});
    }
    return id;
};

app.context.log = function() {
    var args = Array.prototype.slice.call(arguments);
    if (typeof args[args.length-1] !== 'object') {
        args.push({});
    }
    var meta = args[args.length-1];
    meta.requestID = this.state.requestID;
    logger.log.apply(logger, args);
};

function *accesslog(next) {
    // generate requestID
    this.state.requestID = uuid.v4();

    yield* next;

    // ip, date, method, path, status and length
    var format = '%s - %s [%s] "%s %s HTTP/1.X" %d %s';

    var ip = this.req.headers['x-forwarded-for'] || this.req.connection.remoteAddress || '-';
    var userid = this.userid();
    var length = this.length ? this.length.toString() : '-';
    var date = moment().format('D/MMM/YYYY:HH:mm:ss ZZ');

    this.log('info', util.format(format, ip, userid, date, this.method, this.path, this.status, length), {type: 'accesslog'});
    this.log('info', _.pick(this.headers, ['referer', 'user-agent']), {type: 'headers'});
}

var port = 8080;
app.use(accesslog);
app.use(function* () {
    this.status = 200;
    this.log('info', 'Request logging', {type: 'sometype'});
    this.body = 'Hello World!';
});

app.on('error', function(err, context) {
    context.log('error', context.url, {error: err, type: 'app.onerror'});
});

app.listen(port);
logger.info('Server listen at', port);
