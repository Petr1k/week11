const express = require('express');
const db = require('../db');
const router = express.Router();  

router.get('/', async (req, res) => {

    const ingredientInRecipe = await db.query('SELECT * FROM ingredientinrecipe;');
    console.log(ingredientInRecipe.rows);
    res.json(ingredientInRecipe.rows);
});

router.get('/pairing', async (req, res) => {

    const pairing = await db.query('SELECT a.recipe_name, b.ingredientname FROM recipe a INNER JOIN ingredientinrecipe c ON a.id = c.recipeid INNER JOIN ingredient b ON b.id = c.ingredientid;');
    console.log(pairing.rows);
    res.json(pairing.rows);
});

module.exports = router;

