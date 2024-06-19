const express = require('express');
const fetch = require('node-fetch'); 
const app = express();
const port = 3000;

// define a route for the root URL
// app.get('/', (req, res) => {
//   res.send('Hello World!');
// });

// middleware to parse JSON bodies 
app.use(express.json());
// middleware to serve static files (like HTML)
app.use(express.static('public'));

// function to fetch data from the Pokémon API
const fetchFromPokeAPI = async (endpoint) => {
    // GET URL
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/${endpoint}`);
        if (!response.ok) {
          throw new Error('Failed to fetch data from PokeAPI');
        }
        return await response.json();
      } catch (error) {
        throw new Error('Failed to fetch data from PokeAPI');
      }
    };
  
// GET route to get details of a specific Pokémon ability by name or ID
app.get('/ability/:nameOrId', async (req, res) => { //the URL is the GET route
    const nameOrId = req.params.nameOrId.toLowerCase();
    try {
      const data = await fetchFromPokeAPI(`ability/${nameOrId}`);
      res.json(data);
    } catch (error) {
        res.status(500).send('An error occurred');
      }
  });

// POST route to create a new Pokémon (simplified example)
app.post('/pokemon', async (req, res) => {
    const { name, type, height, weight, ability } = req.body;
    
    try {
      // Example: Creating a new Pokémon in a hypothetical database
      const newPokemon = {
        name,
        type,
        height,
        weight,
        ability
      };
  
      // Example: Save newPokemon to database or perform other operations
      // Here, we just simulate a successful creation and return a response
      res.status(201).json({ message: 'Pokemon created successfully', pokemon: newPokemon });
    } catch (error) {
      res.status(500).send('Failed to create Pokemon');
    }
  });

  // start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });