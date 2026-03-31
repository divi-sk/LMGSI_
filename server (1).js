const express = require('express');
const axios = require('axios');
const convert = require('xml-js');
const app = express();
const PORT = 3000;

app.use(express.static('public'));

function jsonToXml(json) {
  const options = { compact: true, spaces: 2 };
  return convert.json2xml(json, options);
}

app.get('/pokemon/:name', async (req, res) => {
  const pokemonName = req.params.name.toLowerCase();
  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
    res.json(response.data);
  } catch (error) {
    res.status(404).json({ error: 'Pokémon no encontrado' });
  }
});

app.get('/pokemon/:name/xml', async (req, res) => {
  const pokemonName = req.params.name.toLowerCase();
  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
    const xmlData = jsonToXml(response.data);
    res.set('Content-Type', 'application/xml');
    res.send(xmlData);
  } catch (error) {
    res.status(404).send('Pokémon no encontrado');
  }
});

app.get('/pokemon/:name/abilities', async (req, res) => {
  const pokemonName = req.params.name.toLowerCase();
  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
    const abilities = response.data.abilities.map(ability => ability.ability.name);
    res.json({ abilities });
  } catch (error) {
    res.status(404).json({ error: 'Pokémon no encontrado' });
  }
});

app.get('/pokemon/:name/image', async (req, res) => {
  const pokemonName = req.params.name.toLowerCase();
  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
    const imageUrl = response.data.sprites.front_default;
    res.json({ imageUrl });
  } catch (error) {
    res.status(404).json({ error: 'Pokémon no encontrado' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});