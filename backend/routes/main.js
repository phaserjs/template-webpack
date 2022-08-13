const express = require('express');
const asyncMiddleware = require('../middleware/asyncMiddleware');
const UserModel = require('../models/userModel');

const router = express.Router();


router.get('/status', (req, res, next) => {
  res.status(200);
  res.json({ 'status': 'ok' });
});

//when the signup route is visited, we pull the name, email, and password fields from the request body and then we pass these arguments to the create method of our UserModel. By calling the create method on our model, mongoose will trigger the save pre-hook we set up, and once that is complete mongoose will attempt to add the new document to the database.
router.post('/signup', asyncMiddleware( async (req, res, next) => {
    const { name, email, password } = req.body;
    await UserModel.create({ email, password, name });
    res.status(200).json({ 'status': 'ok' });
  }));

  router.post('/login', asyncMiddleware(async (req, res, next) => {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) {
      res.status(401).json({ 'message': 'unauthenticated' });
      return;
    }
    const validate = await user.isValidPassword(password);
    if (!validate) {
      res.status(401).json({ 'message': 'unauthenticated' });
      return;
    }
    res.status(200).json({ 'status': 'ok' });
  }));

router.post('/logout', (req, res, next) => {
    res.status(200);
    res.json({ 'status': 'ok' });
  });

router.post('/token', (req, res, next) => {
    res.status(200);
    res.json({ 'status': 'ok' });
  });

module.exports = router;