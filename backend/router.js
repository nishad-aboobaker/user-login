import { Router } from "express";
import * as controller from "./controller.js";
import Auth from "./middleware/Auth.js";

const router=Router();

router.route("/adduser").post(controller.addUser);
router.route("/login").post(controller.login);
router.route("/home").get(Auth,controller.home);


export default router;