var fs = require('fs');
var ReadStream = require('./readStream');
var writableStream = fs.createWriteStream(__dirname+'/updatedpersonsData.json');

var readStream = new ReadStream();
readStream.pipe(writableStream);
