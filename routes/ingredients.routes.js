const express = require('express');
const db = require('../db');
const router = express.Router();  

router.get('/', async (req, res) => {

    const ingredients = await db.query('SELECT * FROM ingredient;');
    console.log(ingredients.rows);
    res.json(ingredients.rows);
});

router.post('/', async (req, res) => {

    const {ingredientname} = req.body;
    console.log(ingredientname);

    const data = await db.query("SELECT * FROM ingredient WHERE ingredientname = $1;", [ingredientname]);

    console.log(data.rows);

    if (data.rows.length !== 0) {
        res.status(400).json({ error: 'Ingredient already exists' });

    } else {
        
        try {
            const result = await db.query("INSERT INTO ingredient (ingredientname) VALUES ($1);", [ingredientname]);
            console.log(result.rowCount);
            res.status(200).json({ message: `${result.rowCount} row was added.` });
        }
        catch (error) {
            console.log(error);
        }
    }
});

router.put('/', async (req, res) => {
    const {ingredientname, description} = req.body;
    console.log(ingredientname);
    console.log(description);

    const data = await db.query("SELECT * FROM ingredient WHERE ingredientname = $1;", [ingredientname]);

    if (data.rows.length === 0) {
        res.status(400).json({ error: 'Ingredient does not exist' });
    } else {
        try {
            const result = await db.query("UPDATE ingredient SET description = $1 WHERE ingredientname = $2;", [description, ingredientname]);
            console.log(result.rowCount);
            res.status(200).json({ message: `${result.rowCount} row was updated.` });
        }
        catch (error) {
            console.log(error);
        }
    }
});

router.delete('/', async (req, res) => {
    const {ingredientname} = req.body;
    console.log(ingredientname);

    const data = await db.query("SELECT * FROM ingredient WHERE ingredientname = $1;", [ingredientname]);

    if (data.rows.length === 0) {
        res.status(400).json({ error: 'Ingredient does not exist' });
    } else {
        try {
            const result = await db.query("DELETE FROM ingredient WHERE ingredientname = $1;", [ingredientname]);
            console.log(result.rowCount);
            res.status(200).json({ message: `${result.rowCount} row was deleted.` });
        }
        catch (error) {
            console.log(error);
        }
    }
});

router.post('/addingredientinrecipe', async (req, res) => {
    const {recipename, ingredientname} = req.body;

    const data = await db.query('SELECT a.recipeName, b.ingredientName FROM recipe a INNER JOIN IngredientInRecipe c ON a.id = c.recipeId INNER JOIN ingredient b ON b.id = c.ingredientId WHERE a.recipeName = $1 AND b.ingredientName = $2;', [recipename, ingredientname]);

    if (data.rows.length !== 0) {
        res.status(400).json({ message: "Record already exists" });

    } else {
        
        try {
            const result = await db.query("INSERT INTO IngredientInRecipe (recipeId, ingredientId) SELECT a.id, b.id FROM recipe a JOIN ingredient b ON a.recipeName = $1 AND b.ingredientname = $2;", [recipename, ingredientname]);
            console.log(result.rowCount);
            res.status(200).json({ message: `${result.rowCount} row was added.` });
        }
        catch (error) {
            console.log(error);
        }
    }
});

module.exports = router;
