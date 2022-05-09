
const router = require("express").Router();
const controller = require("../controllers/userController");

router.get("/user", controller.getView);
router.post("/user", controller.postView);
router.delete("/user/:id", controller.deleteView);
router.put("/user", controller.updateView);

module.exports = router;