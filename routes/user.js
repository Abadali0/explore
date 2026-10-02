import express from"express";
import { createUser, loginUser } from "../controller/user.js";
const router=express.Router();
router.post("/login",loginUser);
router.post("/createUser",createUser);

export default router;