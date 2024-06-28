const express = require('express');
const router = express.Router();
const books = require('../data/books.js');
const comments = require('../data/comments.js');

//GET route to get all user data
router.get('/', (req, res) => {
  const links = [
    {
      href: 'books/:id',
      rel: ':id',
      type: 'GET',
    },
  ];
  let data;

  if (req.query.memberId) {
    data = books.filter((post) => post.memberId == req.query.memberId);
  } else {
    data = books;
  }

  res.json({ data, links });
});

// GET /posts/:id/comments
// Retrieves all comments made on the post with the specified id.
router.get('/:id/comments', (req, res) => {
  let foundComments;

  if (req.query.memberId) {
    foundComments = comments.filter(
      (comment) =>
        comment.bookId == req.params.id && comment.memberId == req.query.memberId
    );
  } else {
    foundComments = comments.filter(
      (comment) => comment.bookId == req.params.id
    );
  }

  res.json(foundComments);
});

// GET route to get a post by ID
router.get('/:id', (req, res, next) => {
  // Using the Array.find method to find the user with the same id as the one sent with the request
  const book = books.find((p) => p.id == req.params.id);

  const links = [
    {
      href: `/${req.params.id}`,
      rel: '',
      type: 'PATCH',
    },
    {
      href: `/${req.params.id}`,
      rel: '',
      type: 'DELETE',
    },
  ];

  if (book) res.json({ book, links });
  else next();
});

// POST Create a Book
router.post('/', (req, res) => {
  // Within the POST request we will create a new post.
  // The client will pass us data and we'll push that data into our psots array.
  // the post data that we want to create is inside the req.body
  if (req.body.memberId && req.body.title && req.body.content) {
    // If the code gets to this point, we are good to create the post
    const book = {
      id: books.length + 1,
      memberId: req.body.memberId,
      title: req.body.title,
      content: req.body.content,
    };

    books.push(book);
    res.json(book);
  } else {
    res.status(400).json({ error: 'Insufficient Data' });
  }
});

//PATCH Update a Book
router.patch('/:id', (req, res, next) => {
  // Within the PATCH request route, we allow the client
  // to make changes to an existing user in the database.
  const book = books.find((p, i) => {
    if (p.id == req.params.id) {
      for (const key in req.body) {
        // Applying the updates within the req.body to the in-memory post
        books[i][key] = req.body[key];
      }
      return true;
    }
  });

  if (book) {
    res.json(book);
  } else {
    next();
  }
});

// DELETE Delete a post
router.delete('/:id', (req, res) => {
  // The DELETE request route simply removes a resource.
  const book = books.find((p, i) => {
    if (p.id == req.params.id) {
      books.splice(i, 1);
      return true;
    }
  });

  if (book) res.json(book);
  else next();
});

module.exports = router;