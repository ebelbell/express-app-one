const express = require('express'); // require the express package
const app = express(); // call express
const PORT = process.env.PORT || 3000;

const memberRouter = require('./routes/members.js');
const bookRouter = require('./routes/books.js');

// serve static files from the STYLES directory
// app.use(express.static('./styles.css'));


//const comment = require('./data/comments.js');
//=============================================================

// Body parser middleware to parse JSON data
// we have access to the parsed data within our routes.
// The parsed data will be located in "req.body."
app.use(express.urlencoded({ extended: true }))
app.use(express.json()); // when the client serves off data


// New logging middleware to help us keep track of
// requests during testing!
app.use((req, res, next) => {
  const time = new Date();

  console.log(
    `-----
${time.toLocaleTimeString()}: Received a ${req.method} request to ${req.url}.`
  );
  if (Object.keys(req.body).length > 0) {
    console.log('Containing the data:');
    console.log(`${JSON.stringify(req.body)}`);
  }
  next();
});



// Valid API Keys.
const apiKeys = ['perscholas', 'ps-example', 'hJAsknw-L198sAJD-l3kasx'];

// New middleware to check for API keys!
// Note that if the key is not verified,
// we do not call next(); this is the end.
// This is why we attached the /api/ prefix
// to our routing at the beginning!

app.use('/api', function (req, res, next) {
  var key = req.query['api-key'];

  // Check for the absence of a key.
  if (!key) {
    res.status(400);
    return res.json({ error: 'API Key Required' });
  }

  // Check for key validity.
  if (apiKeys.indexOf(key) === -1) {
    res.status(401);
    // this means that the key that was given is NOT a part of the array
    return res.json({ error: 'Invalid API Key' });
  }

  // Valid key! Store it in req.key for route access.
  req.key = key;
  next();
});


//=================================================
// API routes
app.use('/api/members', memberRouter);
app.use('/api/books', bookRouter);

//=================================================
// Add some HATEOAS links
app.get('/', (req, res) => {
  res.json({
    links: [
      {
        href: '/api',
        rel: 'api',
        type: 'GET',
      },
    ],
  });
});

// Adding some HATEOAS links.
app.get('/api', (req, res) => {
  res.json({
    links: [
      {
        href: 'api/members',
        rel: 'members',
        type: 'GET',
      },
      {
        href: 'api/members',
        rel: 'members',
        type: 'POST',
      },
      {
        href: 'api/books',
        rel: 'books',
        type: 'GET',
      },
      {
        href: 'api/books',
        rel: 'books',
        type: 'POST',
      },
    ],
  });
});



// //define a route for the root URL
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// The only way this middlware runs is if a route handler function runs the "next()" function
// 404 Middleware
app.use((req, res) => {
  //console.log(2);
  res.status(404);
  res.json({ Error: 'Resource Not Found' });
});

app.listen(PORT, () => {
  console.log('Server running on port: ' + PORT);
});