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
app.use(express.urlencoded({ extended: true }));
app.use(express.static('styles'));

let pokemons = [
    { name: 'Pikachu', type: 'Electric', height: 0.4, weight: 6, ability: 'Static' },
    { name: 'Charmander', type: 'Fire', height: 0.6, weight: 8.5, ability: 'Blaze' }
];

// Home page
app.get('/', (req, res) => {
    res.send(`Gotta catch em all`);
});
  

// GET route to get details of a specific Pokémon ability by name or ID
app.get('/ability/:nameOrId', async (req, res) => { //the URL is the GET route
    const nameOrId = req.params.nameOrId.toLowerCase(); //change the nameOrId parameter to lowercase
    try {
      const data = await fetchFromPokeAPI(`ability/${nameOrId}`);
      res.json(data);
    } catch (error) {
        res.status(500).send('An error occurred');
      }
  });

// POST route to create a new Pokémon 
app.post('/pokemon', (req, res) => {
    const { name, type, height, weight, ability } = req.body;
    try {
      // creating a new Pokémon in a hypothetical database
      const newPokemon = {
        id: pokemons.length + 1,
        name,
        type,
        height,
        weight,
        ability
      };

      // saving to a database
      pokemons.push(newPokemon);
  
      // Example: Save newPokemon to database or perform other operations
      // return a response that pokemon is created
      res.status(201).json({ message: 'Pokemon created successfully', pokemon: newPokemon });
    } catch (error) {
      res.status(500).send('Failed to create Pokemon');
    }
  });

// PUT route to update an existing Pokémon by Id
app.put('/pokemon/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { name, type, height, weight, ability } = req.body;
  
    const pokemonIndex = pokemons.findIndex(p => p.id === id);
    if (pokemonIndex === -1) {
      return res.status(404).send('Pokemon not found');
    }
  
    const updatedPokemon = {
      id,
      name,
      type,
      height,
      weight,
      ability
    };
  
    pokemons[pokemonIndex] = updatedPokemon;
  
    res.json({ message: 'Pokemon updated successfully', pokemon: updatedPokemon });
  });

  // start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost: ${port}`);
});




