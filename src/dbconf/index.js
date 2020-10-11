const sequelize = require('../sequelize');

module.exports = async function () {
  console.log(`Checking database connection...`);
  try {
    await sequelize.connection.authenticate();
    console.log('Database connection OK!');
  } catch (error) {
    console.log('Unable to connect to the database:');
    console.log(error.message);
    process.exit(1);
  }

  await sequelize.connection
    .sync({ force: false })
    .then(() => {
      console.log('Re-sync db OK!');
    })
    .catch(() => {
      console.log('Error with drop or re-sync db.');
    });
};
