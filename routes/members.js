const express = require('express');
const router = express.Router();
const members = require('../data/members.js');
const books = require('../data/books.js');
const comments = require('../data/comments.js');

//GET route to get all user data
router.get('/', (req, res) => {
  const links = [
    {
      href: 'members/:id',
      rel: ':id',
      type: 'GET',
    },
  ];

  res.json({ members, links });
});

router.get('/:id/books', (req, res) => {
  // With the filter method, we filter out all the posts that do not have a userId that is equal to the req.params.id
  const foundBooks = books.filter((post) => post.bookId == req.params.id);

  if (foundBooks) {
    res.json(foundBooks);
  } else {
    next();
  }
});

// GET /users/:id/comments
// Retrieves all comments made by a user with the specified id.
router.get('/:id/comments', (req, res) => {
  let foundComments;

  if (req.query.bookId) {
    foundComments = comments.filter(
      (comment) =>
        comment.memberId == req.params.id && comment.bookId == req.query.bookId
    );
  } else {
    foundComments = comments.filter(
      (comment) => comment.memberId == req.params.id
    );
  }

  res.json(foundComments);
});

// GET router to get a user by ID
router.get('/:id', (req, res, next) => {
  // Using the Array.find method to find the user with the same id as the one sent with the request
  const member = members.find((u) => u.id == req.params.id);

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

  if (member) res.json({ member, links });
  else next();
});

// POST Create a Member 
router.post('/', (req, res) => {
  // Within the POST request we will create a new user.
  // The client will pass us data and we'll push that data into our users array.
  // the user data that we want to create is inside the req.body
  if (req.body.name && req.body.username && req.body.email) {
    if (members.find((u) => u.username === req.body.username)) {
      // The above returns an object, we found an existing user with the same username. So it's a no go
      res.json({ error: 'Username Already Taken' });
      return;
    }

    // If the code gets to this point, we are good to create the user
    const member = {
      id: members.length + 1,
      name: req.body.name,
      username: req.body.username,
      email: req.body.email,
    };

    members.push(member);
    res.json(member);
  } else {
    res.status(400).json({ error: 'Insufficient Data' });
  }
});

//PATCH Update Member info
router.patch('/:id', (req, res, next) => {
  // Within the PATCH request route, we allow the client
  // to make changes to an existing user in the database.
  const member = members.find((u, i) => {
    if (u.id == req.params.id) {
      for (const key in req.body) {
        // Applying the updates within the req.body to the in-memory user
        members[i][key] = req.body[key];
      }
      return true;
    }
  });

  if (member) {
    res.json(member);
  } else {
    next();
  }
});

// Delete a member
router.delete('/:id', (req, res) => {
  // The DELETE request route simply removes a resource.
  const member = members.find((u, i) => {
    if (u.id == req.params.id) {
      members.splice(i, 1);
      return true;
    }
  });

  if (member) res.json(member);
  else next();
});

module.exports = router;