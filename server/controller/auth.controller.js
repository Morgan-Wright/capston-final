const bcryptjs = require("bcryptjs");
const sequelize = require("../utils/db");

async function getUsername(username) {
  try {
    const [existingRecord] = await sequelize.query(`
      SELECT * FROM users WHERE username = '${username}';
      `);
    if (existingRecord.length) {
      return existingRecord[0];
    }
  
    return null;
    
  } catch (error) {
  console.log(error)    
  }
}

async function handleSignUp(req, res) {
  const { username, password } = req.body;

  const existingRecord = await getUsername(username);

  if (existingRecord) {
    return res.status(400).send('user already exists');
  }

  const hash = bcryptjs.hashSync(password, 10);

  await sequelize.query(`
    INSERT INTO users (username, hash) values ('${username}', '${hash}');
    `);

  const newRecord = await getUsername(username);

  req.session.user = {
    ...newRecord,
  };

  res.status(200).send('sign up successful');
}

async function handleLogin(req, res) {
  const { username, password } = req.body;

  const existingRecord = await getUsername(username);

  if (!existingRecord) {
    return res.status(400).send('user does not exist');
  }

  const doesPasswordMatch = bcryptjs.compareSync(password, existingRecord.hash);

  if (!doesPasswordMatch) {
    return res.status(400).send('Passwords do not match');
  }

  req.session.user = {
    ...existingRecord,
  };

  res.status(200).redirect("/protected");
}

function handleLogout(req, res) {
  req.session.destroy();

  res.status(200).send('logout successful');
}

module.exports = {
  handleSignUp,
  handleLogin,
  handleLogout,
};
