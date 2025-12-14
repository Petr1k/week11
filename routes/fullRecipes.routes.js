const express = require('express');
const db = require('../db');
const router = express.Router();  

router.get('/', async (req, res) => {

     const recipe = await db.query('SELECT a.recipename as "recipeName", a.instructions, b.ingredientname as "ingredientName" FROM recipe a INNER JOIN ingredientinrecipe c ON a.id = c.recipeid INNER JOIN ingredient b ON b.id = c.ingredientid;');

     const recipeMap = {};

     for(const item of recipe.rows) {
         const { recipeName, instructions, ingredientName } = item;
         if(!recipeMap[recipeName]) {
             recipeMap[recipeName] = {
                 instructions: instructions,
                 ingredients: []
             };
         }
         recipeMap[recipeName].ingredients.push(ingredientName);
     }

     res.json(recipeMap);
});

router.get('/recipeingredients', async (req, res) => {

    const recipe = await db.query('SELECT a.recipename as "recipeName", b.ingredientname as "ingredientName" FROM recipe a INNER JOIN ingredientinrecipe c ON a.id = c.recipeid INNER JOIN ingredient b ON b.id = c.ingredientid;');

    const recipeMap = {};

    for(const item of recipe.rows) {
        const {recipeName, ingredientName } = item;
        if(!recipeMap[recipeName]) {
            recipeMap[recipeName] = []
        }

        recipeMap[recipeName].push(ingredientName);
    }

    //const resultArray = Object.values(recipeMap);  
    //console.log(recipeMap);
    res.json(recipeMap);
});

router.get('/search', async (req, res) => {
    const searchString = req.query.recipeName;

    const recipe = await db.query('SELECT a.recipename as "recipeName", a.instructions, b.ingredientname as "ingredientName" FROM recipe a INNER JOIN ingredientinrecipe c ON a.id = c.recipeid INNER JOIN ingredient b ON b.id = c.ingredientid WHERE LOWER(a.recipename) = LOWER($1);', [searchString]);

    const recipeMap = {};

     for(const item of recipe.rows) {
         const { recipeName, instructions, ingredientName } = item;
         if(!recipeMap[recipeName]) {
             recipeMap[recipeName] = {
                 instructions: instructions,
                 ingredients: []
             };
         }
         recipeMap[recipeName].ingredients.push(ingredientName);
     }

     res.json(recipeMap);
});



module.exports = router;