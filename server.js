const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();    // call express to start with

// config (express)
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');   // use handlebars (template in views)


app.use((request, response, next) =>   // next to indicate when middleware complete (must have next called within)
  {
    var now = new Date().toString();    // for timestamp

    // console.log(`${now} ${request.method} ${request.url}`);              // log request, from within middleware
    var log = `${now} ${request.method} ${request.url}`;              // log request, from within middleware
    console.log(log);
    // write to disk
    fs.appendFile('server.log', log + '\n', (error) =>
    {
      if (error)    // only if error exists/occurred, write message
      {
        console.log('Error - Unable to append to server.log');
      }
    });
    next();   // move on from middleware
  });

// served on whatever request
app.use((request, response, next) =>
  {
    response.render('maintenance.hbs');

    // NB no next, so no movement to other pages...
  });

  // middleware (express)
  app.use(express.static(__dirname + '/public')); //__dirname :  directory from which Node command run


hbs.registerHelper('getCurrentYear', () => {return new Date().getFullYear()});   // name, function
hbs.registerHelper('tooLoud', (text) => {return text.toUpperCase();});

// HTTP route handlers

app.get('/',(request, response) =>
{   // request and response
  // response.send('<h1>Hello from Express PNJ</h1>');
  // response.send(
  // {
  //   name: 'P.N.J.',
  //   likes:
  //   [
  //     'reading',
  //     'walking'
  //   ]
  // })
  response.render('home.hbs',
  {
    pageTitle: 'Home Page',
    // currentYear: new Date().getFullYear(),
    welcomeMessage: 'Welcome to a web site using Node by PNJ'
  }   // render template setup with view view engine
);

}); // url and function to run in this case/route

app.get('/about',(request, response) =>
{   // request and response);
  //response.send('<h2>\'About\' page</h2>');
  response.render('about.hbs',
  {
    pageTitle: 'About Page',
    // currentYear: new Date().getFullYear()
  });   // render template setup with view view engine
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
