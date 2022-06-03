const sequelize = require("../utils/db");

async function createDatabase(req, res) {
  try {
    await sequelize.query(`
      drop table if exists lists_item;
      drop table if exists users;
      
      create table users (
        id serial primary key,
        username text,
        hash text
      );

        create table lists_item (
          id serial primary key,
          content text,
          user_id int references users(id)
      );
    `);

    res.sendStatus(200);
  } catch (error) {
    console.log(error);

    res.sendStatus(500);
  }
}

module.exports = {
  createDatabase,
};
