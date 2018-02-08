const router = require("express").Router();
const eventRoutes = require('./event');
const userRoutes = require('./users');



//user routes
router.use("/users", userRoutes);
router.use("/event", eventRoutes);
module.exports = router;
