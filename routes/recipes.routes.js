const express = require('express');
const db = require('../db');
const router = express.Router();  

router.get('/', async (req, res) => {

    const recipe = await db.query('SELECT * FROM recipe;');
    console.log(recipe.rows);
    res.json(recipe.rows);
});

module.exports = router;