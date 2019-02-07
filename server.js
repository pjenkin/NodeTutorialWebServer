const express = require('express');

var app = express();    // call express to start with

// HTTP route handlers

app.get('/',(request, response) =>
{   // request and response
  // response.send('<h1>Hello from Express PNJ</h1>');
  response.send(
  {
    name: 'P.N.J.',
    likes:
    [
      'reading',
      'walking'
    ]
  })
}); // url and function to run in this case/route

app.listen(3000);   // listen on port 3000
