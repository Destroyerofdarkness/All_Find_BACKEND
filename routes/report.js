const router = require("express").Router();
const authorization = require("../middleware/authorize");

const controller = require("../controllers/reportController");

router.post("/publish", authorization, controller.report_create);

module.exports = router;