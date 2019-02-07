const express = require('express');

var app = express();    // call express to start with

// middleware
app.use(express.static(__dirname + '/public')); //__dirname :  directory from which Node command run


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

app.get('/about',(request, response) =>
{   // request and response);
  response.send('<h2>\'About\' page</h2>');
});

app.get('/bad', (request, response) =>
{
  // response.send('Error occurred - unable to handle request');
  response.send(
    {
      errorMessage: 'Error occurred - unable to handle request'
    }
  );
});

app.listen(3000, () =>
{
  console.log('Server is up, on port 3000');
});   // listen on port 3000
