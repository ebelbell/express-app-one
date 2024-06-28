const express = require('express'); // require the express package
const app = express(); // call express

// const fetch = require('node-fetch');
// const path = require('path'); 
const port = 3000;

// //define a route for the root URL
// app.get('/', (req, res) => {
//   res.send('Hello World!');
// });


// Home page, declare the root directory '/'; access the callback function with parameter (req, res)
app.get('/', (req, res) => {
  res.send('Gotta catch em all');
});

// // middleware to parse JSON bodies 
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(express.static('public')); // static files from the 'public' folder

// let pokemons = [
//   { id: 1, name: 'Pikachu', type: 'Electric', height: 0.4, weight: 6, ability: 'Static' },
//   { id: 2, name: 'Charmander', type: 'Fire', height: 0.6, weight: 8.5, ability: 'Blaze' }
// ];

  
// // Function to fetch data from the Pokémon API
// const fetchFromPokeAPI = async (endpoint) => {
//   try {
//       const response = await fetch(`https://pokeapi.co/api/v2/${endpoint}`);
//       if (!response.ok) {
//         throw new Error('Failed to fetch data from PokeAPI');
//       }
//       return await response.json();
//   } catch (error) {
//       throw new Error(`Failed to fetch data from PokeAPI: ${error.message}`);
//   }
// };

// // GET route to get details of a specific Pokémon ability by name or ID
// app.get('/ability/:nameOrId', async (req, res) => { //the URL is the GET route
//     const nameOrId = req.params.nameOrId.toLowerCase(); //change the nameOrId parameter to lowercase
//     try {
//       const data = await fetchFromPokeAPI(`ability/${nameOrId}`);
//       res.json(data);
//     } catch (error) {
//         res.status(500).send('An error occurred');
//       }
//   });


// // // Simple GET route
// // app.get('/pokemon', (req, res) => {
// //   res.json(pokemons);
// // });


// // POST route to create a new Pokémon 
// app.post('/pokemon', (req, res) => {
//     const { name, type, height, weight, ability } = req.body;
//     try {
//       // creating a new Pokémon in a hypothetical database
//       const newPokemon = {
//         id: pokemons.length + 1,
//         name,
//         type,
//         height,
//         weight,
//         ability
//       };

//       // saving to a database
//       pokemons.push(newPokemon);
  
//       // Example: Save newPokemon to database or perform other operations
//       // return a response that pokemon is created
//       res.status(201).json({ message: 'Pokemon created successfully', pokemon: newPokemon });
//     } catch (error) {
//       res.status(500).send('Failed to create Pokemon');
//     }
//   });

// // PUT route to update an existing Pokémon by Id
// app.put('/pokemon/:id', (req, res) => {
//     const id = parseInt(req.params.id);
//     const { name, type, height, weight, ability } = req.body;
  
//     // find the index of a pokemon by id
//     const pokemonIndex = pokemons.findIndex(p => p.id === id); // check if the id of each object matches the id value in the req.params.id
//     if (pokemonIndex === -1) {
//       return res.status(404).send('Pokemon not found');
//     }
  
//     const updatedPokemon = {
//       id,
//       name,
//       type,
//       height,
//       weight,
//       ability
//     };
  
//     pokemons[pokemonIndex] = updatedPokemon;
  
//     res.json({ message: 'Pokemon updated successfully', pokemon: updatedPokemon });
//   });

// // DELETE route to remove a Pokémon by Id
// app.delete('/pokemon/:id', (req, res) => {
//   const id = parseInt(req.params.id);
//   const pokemonIndex = pokemons.findIndex(p => p.id === id);
//   if (pokemonIndex === -1) {
//       return res.status(404).send('Pokemon not found');
//   }
//   pokemons.splice(pokemonIndex, 1);
//   res.json({ message: 'Pokemon deleted successfully' });
// });

// // GET route to fetch all Pokémon with optional filtering
// app.get('/pokemon', (req, res) => {
//   const { name, type, ability, minHeight, maxHeight, minWeight, maxWeight } = req.query;
//   let filteredPokemons = pokemons;

//   if (minHeight) filteredPokemons = filteredPokemons.filter(p => p.height >= parseFloat(minHeight));
//   if (maxHeight) filteredPokemons = filteredPokemons.filter(p => p.height <= parseFloat(maxHeight));
//   if (minWeight) filteredPokemons = filteredPokemons.filter(p => p.weight >= parseFloat(minWeight));
//   if (maxWeight) filteredPokemons = filteredPokemons.filter(p => p.weight <= parseFloat(maxWeight));

//   res.json(filteredPokemons);
// });

// // Route to render a view with all Pokémon
// app.get('/view-pokemons', (req, res) => {
//   res.sendFile('new-pokemon.html', { root: path.join(__dirname, 'public') });
// });

// // Route to handle form submission for adding a new Pokémon
// app.post('/new-pokemon', (req, res) => {
//   const { name, type, height, weight, ability } = req.body;
//   const newPokemon = { id: pokemons.length + 1, name, type, height, weight, ability };
//   pokemons.push(newPokemon);
//   res.redirect('/view-pokemons');
// });

// // Error-handling middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).send('Something broke!');
// });

// // 404 middleware
// app.use((req, res) => {
//   res.status(404).send('Page not found');
// });

// start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost: ${port}`);
});