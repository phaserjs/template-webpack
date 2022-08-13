const passport = require('passport');
const express = require('express');
//Imported jsonwebtoken
const jwt = require('jsonwebtoken');

const tokenList = {};
const router = express.Router();

router.get('/status', (req, res, next) => {
  res.status(200).json({ status: 'ok' });
});

//Added passport authenticate middleware
router.post('/signup', passport.authenticate('signup', { session: false }), async (req, res, next) => {
  res.status(200).json({ message: 'signup successful' });
});

router.post('/login', async (req, res, next) => {
  passport.authenticate('login', async (err, user, info) => {
    try {
      if (err || !user) {
        const error = new Error('An Error occured');
        return next(error);
      }
      req.login(user, { session: false }, async (error) => {
        if (error) return next(error);
        const body = {
          _id: user._id,
          email: user.email
        };

        const token = jwt.sign({ user: body }, 'top_secret', { expiresIn: 300 });
        const refreshToken = jwt.sign({ user: body }, 'top_secret_refresh', { expiresIn: 86400 });

        // store tokens in cookie
        res.cookie('jwt', token);
        res.cookie('refreshJwt', refreshToken);

        // store tokens in memory
        tokenList[refreshToken] = {
          token,
          refreshToken,
          email: user.email,
          _id: user._id
        };

        //Send back the token to the user
        return res.status(200).json({ token, refreshToken });
      });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
});

router.post('/token', (req, res) => {
  const { email, refreshToken } = req.body;

  if ((refreshToken in tokenList) && (tokenList[refreshToken].email === email)) {
    const body = { email, _id: tokenList[refreshToken]._id };
    const token = jwt.sign({ user: body }, 'top_secret', { expiresIn: 300 });

    // update jwt
    res.cookie('jwt', token);
    tokenList[refreshToken].token = token;

    res.status(200).json({ token });
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
});

router.post('/logout', (req, res) => {
  if (req.cookies) {
    const refreshToken = req.cookies['refreshJwt'];
    if (refreshToken in tokenList) delete tokenList[refreshToken]
    res.clearCookie('refreshJwt');
    res.clearCookie('jwt');
  }

  res.status(200).json({ message: 'logged out' });
});

module.exports = router;





/*const express = require('express');
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

module.exports = router;*/