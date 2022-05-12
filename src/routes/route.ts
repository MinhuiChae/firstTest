
import express from 'express';
const router = express.Router();

import UserController from "../controllers/userController";

router.get("/user", (req: express.Request, res: express.Response) => {
  new UserController(req, res).getUser();
});
router.post("/user", (req: express.Request, res: express.Response) => {
  new UserController(req, res).postUser();
});
router.delete("/user/:id", (req: express.Request, res: express.Response) => {
  new UserController(req, res).deleteUser();
});
router.put("/user", (req: express.Request, res: express.Response) => {
  new UserController(req, res).updateUser();
});

module.exports = router;

export default router;