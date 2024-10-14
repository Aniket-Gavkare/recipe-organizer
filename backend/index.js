const cassandra = require('cassandra-driver');
const path = require('path');
const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const app = express();
const PORT = 5000;
require('dotenv').config();

const client = new cassandra.Client({
  cloud: {
    secureConnectBundle: path.resolve(__dirname, 'secure-connect-recipe-organizer-db.zip'),
  },
  credentials: {
    username: process.env.CASSANDRA_USERNAME, 
    password: process.env.CASSANDRA_PASSWORD, 
  },
  keyspace: 'recipe_organizer',
});

client.connect()
  .then(() => console.log('Connected to AstraDB'))
  .catch(err => console.error('Connection failed:', err));

app.use(cors());
app.use(express.json());

// Add a recipe
app.post('/api/recipes', async (req, res) => {
  const { title, ingredients, category, instructions } = req.body;
  const query = `INSERT INTO recipes (id, title, ingredients, category, instructions) VALUES (?, ?, ?, ?, ?)`;

  try {
    await client.execute(query, [uuidv4(), title, ingredients, category, instructions], { prepare: true });
    res.status(201).send('Recipe added');
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Get all recipes
app.get('/api/recipes', async (req, res) => {
  const query = 'SELECT * FROM recipes';
  try {
    const result = await client.execute(query);
    res.json(result.rows);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
