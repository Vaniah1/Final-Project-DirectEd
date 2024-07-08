import express from "express";
import { createClass, deleteClass, updateClass } from "../controllers/class.controller.js";
import {  isSuper, verifyToken } from "../middleware/verify.middleware.js";
const router = express.Router()


router.post("/add",verifyToken, isSuper,createClass);
router.put("/update",verifyToken,isSuper, updateClass);
router.delete("/delete",verifyToken,isSuper, deleteClass);

export default router;