var express = require('express'),
    fs = require('fs'),
    util = require('util'),
    xml2js = require('xml2js'),
    parse = require('./Parse.js');
    async = require('async');
var app = express();

app.set('views', './views');
app.set('view engine', 'jade');
app.use(express.static(__dirname + '/views'));

var svn_log, svn_list;
var projectDict = null;
var parser = new xml2js.Parser();
async.parallel([
    function(callback) {
        fs.readFile('xml/svn_log.xml', function(err,data) {
            parser.parseString(data, function (err, result) {
                svn_log = result;
                //console.log(util.inspect(svn_log, false, null));
                //console.log('Done');
                callback(0, null)
            });
        });
    },
    function(callback) {
        fs.readFile('xml/svn_list.xml', function(err,data) {
            parser.parseString(data, function (err, result) {
                svn_list = result;
                //console.log(util.inspect(result, false, null));
                //console.log('Done');
                callback(0, null)
            });
        });
    }],
    function(err, results) {
        logDict = parse.createLogDict(svn_log);
        projectDict = parse.createProjectDict(svn_list, logDict);
        //parse list
        //parse log
    }
);


app.get('/projects', function (req, res){
    res.render('html/projects',
        { title : 'Home', projects: projectDict}
    );
});

app.get('/', function (req, res){
    res.render('html/layout',
        { title : 'Home'}
    );
});

var server = app.listen(process.env.PORT || 3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port)

});

