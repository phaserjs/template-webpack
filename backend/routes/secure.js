const express = require('express');
const asyncMiddleware = require('../middleware/asyncMiddleware');
const UserModel = require('../models/userModel');

const router = express.Router();

router.post('/submit-score', asyncMiddleware(async (req, res, next) => {
  const { email, score } = req.body;
  await UserModel.updateOne({ email }, { highScore: score });
  res.status(200).json({ status: 'ok' });
}));

router.get('/scores', asyncMiddleware(async (req, res, next) => {
  const users = await UserModel.find({}, 'name highScore -_id').sort({ highScore: -1}).limit(10);
  res.status(200).json(users);
}));

module.exports = router;
