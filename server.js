'use strict';

const express = require('express');
const cors = require('cors');

// require and use "multer"...'type' : req.file.mimetype,
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
   res.sendFile(process.cwd() + '/views/index.html');
});

app.get('/hello', function(req, res){
  res.json({greetings: "Hello, API"});
});

app.post('/api/fileanalyse',upload.single('upfile'), function(req, res){
   res.json({
    'name' : req.file.originalname,
    'size' : req.file.size
   });
});

app.listen(process.env.PORT || 3000, function () {
  console.log('Node.js listening ...');
});
