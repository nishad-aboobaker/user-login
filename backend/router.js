import { Router } from "express";
import * as controller from "./controller.js";

const router=Router();

router.route("/adduser").post(controller.addUser);
router.route("/login").post(controller.login);


export default router;