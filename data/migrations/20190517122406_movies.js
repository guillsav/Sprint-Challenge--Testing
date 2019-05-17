exports.up = function(knex, Promise) {
  return knex.schema.createTable('movies', tbl => {
    tbl.increments();

    tbl
      .string('title', 128)
      .notNullable()
      .unique();
    tbl.string('genre', 255).notNullable();
    tbl.integer('releaseYear');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('movies');
};
