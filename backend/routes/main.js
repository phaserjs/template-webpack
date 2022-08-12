const express = require('express');

const router = express.Router();

router.get('/status', (req, res, next) => {
  res.status(200);
  res.json({ 'status': 'ok' });
});
router.post('/signup', (req, res, next) => {
    res.status(200);
    res.json({ 'status': 'ok' });
  });
router.post('/login', (req, res, next) => {
    res.status(200);
    res.json({ 'status': 'ok' });
  });
router.post('/logout', (req, res, next) => {
    res.status(200);
    res.json({ 'status': 'ok' });
  });
router.post('/token', (req, res, next) => {
    res.status(200);
    res.json({ 'status': 'ok' });
  });

module.exports = router;