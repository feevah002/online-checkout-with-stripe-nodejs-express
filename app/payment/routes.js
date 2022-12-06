const router = require("express").Router();
const paycontroller = require("./controller")
// app.use('/webhook', bodyParser.raw({ type: 'application/json' }))


router.post("/:uid/checkout", paycontroller.createCheckOut)
router.post("/webhook", paycontroller.webhook)
router.get("/success", paycontroller.success)
router.get("/cancel", paycontroller.cancel)

module.exports = router