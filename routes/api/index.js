const router = require("express").Router();
const eventRoutes = require('./event');
const userRoutes = require('./users');
const messageRoutes = require('./message');



//user routes
router.use("/users", userRoutes);
router.use("/event", eventRoutes);
router.use("/message", messageRoutes);
module.exports = router;
