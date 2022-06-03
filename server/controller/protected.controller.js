const rollbar = require("../utils/rollbar");
const sequelize = require("../utils/db");

async function getList(req, res) {
  const userId = req.session.user.id;
  console.log(userId)
  try {
    const [result] = await sequelize.query(`
        select * from lists_item where user_id = ${userId}
      `);
    console.log(result)
    res.status(200).send(result);
  } catch (error) {
    console.log(error)
    const user = req.session.user;
    rollbar.error(error, {
      user: user,
    });

    res.sendStatus(500);
  }
}

async function addListItem(req, res) {
  try {
    const { content } = req.body;
    const userId = req.session.user.id;
  
    const dbResult = await sequelize.query(`
      insert into lists_item (content, user_id) values ('${content}', ${userId} )
      `);
    
    res.redirect("/protected");
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  getList,
  addListItem,
};
