CREATE TABLE recipe (
    id SERIAL PRIMARY KEY,
    recipe_name VARCHAR(55)
);

CREATE TABLE ingredient (
    id SERIAL PRIMARY KEY,
    ingredientName VARCHAR(55)
);

CREATE TABLE ingredientInRecipe (
    id SERIAL PRIMARY KEY,
    recipeId INTEGER,
    ingredientId INTEGER,
    FOREIGN KEY (recipeId) REFERENCES recipe(id),
    FOREIGN KEY (ingredientId) REFERENCES ingredient(id)
);

INSERT INTO recipe (recipe_name) VALUES ('Pumkin Pasties');

SELECT * FROM recipe;

DELETE FROM recipe WHERE id = 2;

INSERT INTO recipe (recipe_name) VALUES ('Pumpkin Tartlets');

INSERT INTO ingredient (ingredientName) VALUES ('pumpkin puree');

INSERT INTO ingredient (ingredientName) VALUES ('sugar');