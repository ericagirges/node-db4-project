exports.up = function (knex) {
  return knex.schema
    .createTable("Ingredients", (tbl) => {
      tbl.increments();
      tbl.string("name").notNUllable().unique().index();
    })
    .createTable("Recipes", (tbl) => {
      tbl.increments();
      tbl.string("name").notNUllable().unique().index();
    })
    .createTable("RecipeIngredients", (tbl) => {
      tbl.increments();
      tbl.string("name").notNUllable();
      tbl.string("quantity").notNUllable();
      tbl
        .integer("ingredient_id")
        .unsigned()
        .references("Ingredients.id")
        .onDelete("RESTRICT")
        .onUpdate("CASCADE");
      tbl
        .integer("recipe_id")
        .unsigned()
        .references("Recipes.id")
        .onDelete("RESTRICT")
        .onUpdate("CASCADE");
    })
    .createTable("Steps", (tbl) => {
      tbl.increments();
      tbl.string("step_one").notNUllable();
      tbl.string("step_two");
      tbl.string("step_three");
      tbl.string("step_four");
      tbl.string("step_five");
      tbl
        .integer("recipeingredient_id")
        .unsigned()
        .references("RecipeIngredients.id")
        .onDelete("RESTRICT")
        .onUpdate("CASCADE");
      tbl
        .integer("recipe_id")
        .unsigned()
        .references("Recipes.id")
        .onDelete("RESTRICT")
        .onUpdate("CASCADE");
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("Steps")
    .dropTableIfExists("RecipeIngredients")
    .dropTableIfExists("Recipes")
    .dropTableIfExists("Ingredients");
};
