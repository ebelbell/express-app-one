const express = require('express');
const router = express.Router();
const members = require('../data/members.js');


//==========================================================
// GET route to get routes to the members data
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

// GET a user by id functionality ----> GET router to get a user by ID
router.get('/:id', (req, res, next) => {
  // loop over the find method and find every member. return the member with the same id
  const member = members.find((m) => m.id == req.params.id);
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
  
  
  // check for false id. if member exists, send the member back that was found.
    if (member) {
      res.json(member);
    } else {
      // if the member doesn't exist
      next();
    }
});

//==========================================================
// POST - Create a new member
router.post('/', (req, res) => {
  // Within the POST request, we will create a new member
  // The client will pass us data and we'll push that data into our member array.
  // the users data that we want to create is inside the req.body
  if (req.body.name && req.body.username && req.body.email) {
    // we can create a member
    if (members.find((m) => m.username === req.body.username)) {
      // the above returns an object, we have found an existing user with the same username. So it will not work.
      res.json({ error: 'Username already taken'});
      return;
    }

    // if the code gets to this point, we can create the member
    const member = {
      // the length of the array -1 = gives us the last element OR you could say members.length + 1
      id: members[members.length - 1].id + 1, 
      name: req.body.name,
      username: req.body.username,
      email: req.body.email
    }
      members.push(member);
      res.json(member)
  } else {
    res.status(400).json({ error: "insufficient data"})
  }
});

//==========================================================
// PATCH - Update a User
router.patch('/:id', (req, res, next) => {
  // Within the PATCH request route, we allow the client to
  // make changes to an existing member in the database.
  const member = members.find((m, i) => {
    // if the members id is = to the id that was sent from the browser to the client,
    // then we have found the user that we're supposed to add
    if (m.id == req.params.id) { 
      for (const key in req.body) { // loop over every single user, edit the keys of members with the keys of the req.body
        // apply the updates within the req.body to the in-memory user
        members[i][key] = req.body[key];
      }
      return true;
    }
  });
  // this can also be written as if (member) res.json(member);
  // else next();
  // });
  if(member) {
    res.json(member);
  } else {
    next();
  }
});


//==========================================================
// DELETE route - Delete a member in the data
router.delete('/:id', (req, res) => {
  // the DELETE request route simply removes a resource.
  const member = members.find((m, i) => {
    if (m.id == req.params.id) {
      // delete the member that is found with that specific id
      members.splice(i, 1); // when we find the index of where the member is found, the second splice argument is delete
      return true;
    }
});

  if (member) res.json(member);
  else next();
});

module.exports = router;