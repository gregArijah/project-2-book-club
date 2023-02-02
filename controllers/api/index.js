const router = require('express').Router();
const userRoutes = require('./userRoutes');
const bookRoutes = require('./projectRoutes');

router.use('/users', userRoutes);
router.use('/projects', bookRoutes);

module.exports = router;
