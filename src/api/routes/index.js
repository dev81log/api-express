const express = require('express');
const router = express.Router();
const userRoutes = require('./userRoutes');

router.use('/users', userRoutes);

router.get('/', (req, res) => {
  res.json({ message: 'API funcionando!' });
});

module.exports = router;
