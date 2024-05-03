const express = require("express");
const router = express.Router();
const apiRouter = require("./api");
router.use(process.env.BASE_URL, apiRouter);
module.exports = router;
