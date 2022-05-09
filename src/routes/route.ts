
const router = require("express").Router();
const userController = require("../controllers/userController");

router.get("/user", userController.get);
router.post("/user", userController.post);
router.delete("/user/:id", userController.delete);
router.put("/user", userController.update);

module.exports = router;