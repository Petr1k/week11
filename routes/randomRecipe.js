const express = require('express');
const db = require('../db');
const router = express.Router();  

router.get('/', async (req, res) => {

    try {
        //console.log("Random recipe requested");
        
        const recipeQuery = 'SELECT id, recipename, imageURL, instructions FROM recipe ORDER BY RANDOM() LIMIT 1;'
        const recipeResult = await db.query(recipeQuery);
        const selectedRecipe = recipeResult.rows[0];
        
        const ingredientsQuery = 'SELECT b.ingredientname FROM ingredient b INNER JOIN ingredientinrecipe c ON b.id = c.ingredientid WHERE c.recipeid = $1;'
        
        const ingredientsResult = await db.query(ingredientsQuery, [selectedRecipe.id]);
        const ingredients = ingredientsResult.rows.map(element => element.ingredientname);
        //console.log(ingredients);
        
        res.json({
            recipe: selectedRecipe.recipename,
            instructions: selectedRecipe.instructions,
            ingredients: ingredients
        });
    } catch (error) {
        console.log("Error fetching random recipe:", error);
        res.status(500).json({ error: "Failed to fetch random recipe" });
    }
});

module.exports = router;
