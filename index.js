const express = require('express');
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

let pokemons = [];

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
        throw new Error('Failed to fetch data from PokeAPI', error.message);
      }
    };
  
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

// GET route to fetch all Pokémon with optional filtering
app.get('/pokemon', (req, res) => {
    const { name, type, ability, minHeight, maxHeight, minWeight, maxWeight } = req.query;
    
    let filteredPokemons = pokemons;

    if (minHeight) {
        filteredPokemons = filteredPokemons.filter(p => p.height >= parseInt(minHeight));
    } else if (maxHeight) {
        filteredPokemons = filteredPokemons.filter(p => p.height <= parseInt(maxHeight));
    } else if (minWeight) {
        filteredPokemons = filteredPokemons.filter(p => p.weight >= parseInt(minWeight));
    } else if (maxWeight) {
        filteredPokemons = filteredPokemons.filter(p => p.weight <= parseInt(maxWeight));
    }
    
    res.json(filteredPokemons);
});

  // start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});