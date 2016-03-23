'use strict';

import express from 'express';
var app = express();

app.get('/api/test', (req, res)=> res.send('Hello World!'));

app.listen(8081, ()=> {
  console.log('==> 🌎 Backend app listening on port 8081!');
});
