const router = require("express").Router();
const userRoutes = require('./users');
const eventRoutes = require('./event')

//user routes
router.use("/users", userRoutes);
router.use("/event", eventRoutes);
module.exports = router;
