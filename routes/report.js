const router = require("express").Router();
const authorization = require("../middleware/authorize");

const controller = require("../controllers/reportController");

router.post("/publish", authorization, controller.report_create);

router.get("/get", authorization, controller.send_all_reports);

module.exports = router;