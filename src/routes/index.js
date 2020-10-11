const express = require('express');
const router = express.Router();
const db = require("../sequelize");
const Test = db.test;

router.get('/', async function(req, res, next) {
  const all = await Test.findAll();

  return res.status(200).json(all);
});

router.get('/create', async function(req, res, next) {
  const newUser = await Test.create({
    message: 'a'
  })
  await newUser.save()
  return res.status(200).json({ message: 'OK!'});
});

module.exports = router;