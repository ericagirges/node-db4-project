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
    .createTable("Steps", (tbl) => {
      tbl.increments();
      tbl.string("content").notNUllable();
      tbl.integer("step_order").notNUllable();
      tbl
        .integer("recipe_id")
        .unsigned()
        .references("Recipes.id")
        .onDelete("RESTRICT")
        .onUpdate("CASCADE");
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
          tbl
          .integer("step_id")
          .unsigned()
          .references("Steps.id")
          .onDelete("RESTRICT")
          .onUpdate("CASCADE");
      })
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("Steps")
    .dropTableIfExists("RecipeIngredients")
    .dropTableIfExists("Recipes")
    .dropTableIfExists("Ingredients");
};
