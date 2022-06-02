const bcryptjs = require("bcryptjs");
const sequelize = require("../utils/db");

async function getUsername(username) {
  const [existingRecord] = await sequelize.query(`
    SELECT * FROM users WHERE users = '${username}';
    `);

  if (existingRecord.length) {
    return existingRecord[0];
  }

  return null;
}

async function handleSignUp(req, res) {
  const { username, password } = req.body;

  const existingRecord = await getUsername(username);

  if (existingRecord) {
    return res.sendStatus(400);
  }

  const hash = bcryptjs.hashSync(password, 10);

  await sequelize.query(`
    INSERT INTO users (user, hash) values ('${username}', '${hash}');
    `);

  const newRecord = await getUsername(username);

  req.session.user = {
    ...newRecord,
  };

  res.sendStatus(200);
}

async function handleLogin(req, res) {
  const { username, password } = req.body;

  const existingRecord = await getUsername(username);

  if (!existingRecord) {
    return res.sendStatus(400);
  }

  const doesPasswordMatch = bcryptjs.compareSync(password, existingRecord.hash);

  if (!doesPasswordMatch) {
    return res.sendStatus(400);
  }

  req.session.user = {
    ...existingRecord,
  };

  res.redirect("/protected");
}

function handleLogout(req, res) {
  req.session.destroy();

  res.sendStatus(200);
}

module.exports = {
  handleSignUp,
  handleLogin,
  handleLogout,
};
