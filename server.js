var path = require('path');
var express = require('express');

var app = express();

app.use(express.static(path.join(__dirname, 'dist')));
var server = app.listen(process.env.PORT || 5000, function() {
  console.log('listening on port ', server.address().port);
});