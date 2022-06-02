const rollbar = require("../utils/rollbar");
const sequelize = require("../utils/db");

async function getList(req, res) {
  const userId = req.session.user.id;

  try {
    const [result] = await sequelize.query(`
        select * from lists where user_id = ${userId}
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

async function addListItem(req, res) {
  const { title, body, _method, id } = req.body;
  const userId = req.session.user.id;

  if (_method === "post") {
    await sequelize.query(`
    insert into lists_item (title, body, user_id) values (${title}, ${body}, ${userId} )
    `);
  } else if (_method === "patch") {
    await sequelize.query(`
    update lists_item set title = ${title}, body = ${body}, where id = ${id}
    `);
  }

  res.redirect("/protected");
}

module.exports = {
  getList,
  addListItem,
};
