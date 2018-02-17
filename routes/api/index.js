const router = require("express").Router();
const eventRoutes = require('./event');
const userRoutes = require('./users');
const messageRoutes = require('./message');
const locationRoutes = require('./location')


//api routes
router.use("/location", locationRoutes);
router.use("/users", userRoutes);
router.use("/event", eventRoutes);
router.use("/message", messageRoutes);
module.exports = router;
