const express = require('express');
const router = express.Router();
const books = require('../data/books.js');


//==========================================================
// GET route to get routes to the book data
router.get('/', (req, res) => {
  const links = [
    {
      href: 'books/:id',
      rel: ':id',
      type: 'GET',
    },
  ];
  res.json({ books, links });
});

// GET router to get a book by ID ----> GET a book by id functionality
router.get('/:id', (req, res, next) => {
  //console.log(1);
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
    }
  ];
  if (book) res.json({ book, links });
  else next();
});




//==========================================================
// POST - Create a new book
router.post('/', (req, res) => {
  // Within the POST request, we will create a new member
  // The client will pass us data and we'll push that data into our member array.
  // the users data that we want to create is inside the req.body
  if (req.body.userId && req.body.title && req.body.genre && req.body.content) {
    // we can create a book
    const book = {
      // the length of the array -1 = gives us the last element OR you could say members.length + 1
      id: books.length + 1, 
      userId: req.body.userId,
      title: req.body.title,
      genre: req.body.genre,
      content: req.body.content,
    };
      books.push(book);
      res.json(book)
  } else {
    res.status(400).json({ error: 'insufficient data'});
  }
});
//==========================================================

// PATCH - Update a Book
router.patch('/:id', (req, res, next) => {
  // Within the PATCH request route, we allow the client to
  // make changes to an existing book in the database.
  const book = books.find((b, i) => {
    // if the books id is = to the id that was sent from the browser to the client,
    // then we have found the user that we're supposed to add
    if (b.id == req.params.id) { 
      for (const key in req.body) { // loop over every single user, edit the keys of members with the keys of the req.body
        // apply the updates within the req.body to the in-memory user
        books[i][key] = req.body[key];
      }
      return true;
    }
  });
  // this can also be written as if (member) res.json(member);
  // else next();
  // });
  if(book) {
    res.json(book);
  } else {
    next();
  }
});
//==========================================================
// DELETE route - Delete a book in the data
router.delete('/:id', (req, res) => {
  // the DELETE request route simply removes a resource.
  const book = books.find((b, i) => {
    if (b.id == req.params.id) {
      // delete the member that is found with that specific id
      books.splice(i, 1); // when we find the index of where the member is found, the second splice argument is delete
      return true;
    }
});

  if (book) res.json(book);
  else next();
});



module.exports = router;