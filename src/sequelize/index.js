const Sequelize = require('sequelize');
const dbConfig = require('../dbconf/db.config')

const sequelize = new Sequelize({
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  port: dbConfig.PORT,
  username: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB,
  operatorsAliases: false,
  pool: dbConfig.pool,
});

const db = {};

db.Sequelize = Sequelize;
db.connection = sequelize;

const modelDefiners = [
  require('./models/test.model'),
];

for (const modelDefiner of modelDefiners) {
  Object.assign(db, modelDefiner(sequelize, Sequelize));
}

module.exports = db;