const express = require('express');
const db = require('./db');
const recipseRoutes = require('./routes/recipes.routes');
const ingredientsRoutes = require('./routes/ingredients.routes');
const ingredientinrecipeRoutes = require('./routes/ingredientinrecipe.routes');
const fullRecipesRoutes = require('./routes/fullRecipes.routes');
const app = express();
const randomRouter = require('./routes/randomRecipe');

app.use(express.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use('/recipes', recipseRoutes);
app.use('/ingredients', ingredientsRoutes);
app.use('/ingredientinrecipe', ingredientinrecipeRoutes);
app.use('/fullRecipes', fullRecipesRoutes);
app.use('/random', randomRouter);


app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
