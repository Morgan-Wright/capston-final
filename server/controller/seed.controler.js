const sequelize = require('../utils/db')

async function createDatabase(req, res) {
    try {
      await sequelize.query(`
      DROP TABLE IF EXISTS users;
      DROP TABLE IF EXISTS characters;
      
      CREATE TABLE users (
        ID SERIAL PRIMARY KEY,
        username TEXT,
        hash TEXT
      );

      CREATE TABLE lists (
        ID SERIAL PRIMARY KEY,
        content TEXT,
        user_id INT REFERENCES users(id)
      );

      CREATE TABLE lists_item (
          ID SERIAL PRIMARY KEY,
          content TEXT,
          list_id INT REFERENCES lists_id
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