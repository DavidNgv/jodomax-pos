var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

fs = require('fs');
uuid = require('node-uuid');
var multer  = require('multer');


/*
 Cross Origin Resource Sharing Enable
 */

var crossOriginAllower = function(req, res, next) {
    var origin;
    origin = req.header('Origin', '*');
    if (origin === 'null') {
        origin = '*';
    }
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Authorization, Content-Type, X-Requested-With, X-Session-Id');
    res.header('Access-Control-Expose-Headers', 'Location, X-Session-Id');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Max-Age', 86400);
        return res.send(200);
    } else {
        return next();
    }
};




var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(crossOriginAllower);
app.use(multer({ dest: './uploads/'}));

app.use('/', routes);
app.use('/users', users);


app.post('/upload', function(req, res) {

    var e, extName, fileName, fileNameLen, newFileName, startIdx, subDirName, target_path, thumbnail, tmp_path, url_path;

    subDirName = req.body.tableName;
    thumbnail = req.files.file;

    if (thumbnail) {
        fileName = thumbnail.name;
        fileNameLen = fileName.length;
        startIdx = fileNameLen - 3;
        //extName = fileName.substr(startIdx, 3);
        extName = thumbnail.extension;
        newFileName = uuid.v4();
        tmp_path = thumbnail.path;
        target_path = 'public/images/' + subDirName + '/' + newFileName + '.' + extName;
        url_path = 'images/' + subDirName + '/' + newFileName + '.' + extName;
        try {
            fs.rename(tmp_path, target_path, function(err) {
                var result;
                if (err) {
                    res.send({
                        success: false,
                        message: err.toString(),
                        url: null
                    });
                }
                result = {};
                result.url = url_path;
                res.send({
                    success: true,
                    message: null,
                    url: url_path
                });
            });
        } catch (_error) {
            e = _error;
            res.send({
                success: false,
                message: e.toString(),
                url: null
            });
        }
    } else {
        res.send({
            success: false,
            message: 'no upload file found',
            url: null
        });
    }
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
