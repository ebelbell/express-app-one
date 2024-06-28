const express = require('express');
const router = express.Router();
const comments = require('../data/comments.js');
const books = require('../data/books.js');

// GET /comments/
// Retrieves the comments
router.get('/', (req, res) => {
  let data = comments;
  let memberId = req.query.memberId;
  let bookId = req.query.bookId;

  if (memberId && bookId) {
    data = comments.filter(
      (comment) => comment.memberId == memberId && comment.bookId == postId
    );
  } else if (memberId && !bookId) {
    data = comments.filter((comment) => comment.memberId == memberId);
  } else {
    data = comments.filter((comment) => comment.bookId == bookId);
  }

  res.json(data);
});

// GET /comments/:id
// Retrieves the comment with the specified id.
router.get('/:id', (req, res) => {
  const comment = comments.find((c) => c.id == req.params.id);

  if (comment) res.json(comment);
  else next();
});

// POST /comments
router.post('/', (req, res) => {
  // the comment data that we want to create is inside the req.body
  if (req.body.memberId && req.body.bookId && req.body.body) {
    // If the code gets to this point, we are good to create the comment
    const comment = {
      id: comments.length + 1,
      memberId: req.body.memberId,
      bookId: req.body.bookId,
      body: req.body.body,
    };

    comments.push(comment);
    res.json(comment);
  } else {
    res.status(400).json({ error: 'Insufficient Data' });
  }
});

// PATCH /comments/:id
// Used to update a comment with the specified id with a new body.
//PATCH Update a Post
router.patch('/:id', (req, res, next) => {
  // Within the PATCH request route, we allow the client
  // to make changes to an existing comment in the database.
  const comment = comments.find((c, i) => {
    if (c.id == req.params.id) {
      for (const key in req.body) {
        // Applying the updates within the req.body to the in-memory post
        comments[i][key] = req.body[key];
      }
      return true;
    }
  });

  if (comment) {
    res.json(comment);
  } else {
    next();
  }
});

// DELETE Delete a Comment
router.delete('/:id', (req, res) => {
  // The DELETE request route simply removes a resource.
  const comment = comments.find((c, i) => {
    if (c.id == req.params.id) {
      comments.splice(i, 1);
      return true;
    }
  });
  if (comment) res.json(comment);
  else next();
});

module.exports = router;