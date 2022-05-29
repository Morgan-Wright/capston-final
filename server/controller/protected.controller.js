const rollbar = require("../utils/rollbar")
const sequelize = require('../utils/db')

async function getList(req, res) {
    const userID = req.session.user.id;
  
    try {
      const [result] = await sequelize.query(`
        select * from lists where user_id = ${userID}
      `);
  
      res.status(200).send(result);
    } catch (error) {
      const user = req.session.user; 
      rollbar.error(error, {
        user: user,
      });
  
      res.sendStatus(500);
    }
  }



module.exports = {
    getList,
}
