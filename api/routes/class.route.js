import express from "express";
import { createClass, deleteClass, getAllClasses, getClass, updateClass } from "../controllers/class.controller.js";
import {  isSuper, verifyToken } from "../middleware/verify.middleware.js";
const router = express.Router()

router.get("/get/id:",verifyToken, isSuper, getClass);
router.get("/get",verifyToken, isSuper, getAllClasses);

router.post("/add",verifyToken, isSuper,createClass);
router.put("/update/id:",verifyToken,isSuper, updateClass);
router.delete("/delete/id:",verifyToken,isSuper, deleteClass);


export default router;