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
db.models = {}

const modelDefiners = [
  require('./models/ad.model'),
  require('./models/links.model'),
];

for (const modelDefiner of modelDefiners) {
  Object.assign(db.models, modelDefiner(sequelize, Sequelize));
}

db.models.ad.hasMany(db.models.link, { as: "links" });
db.models.link.belongsTo(db.models.ad, {
  foreignKey: "adId",
  as: "ad",
});

module.exports = db;