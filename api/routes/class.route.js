import express from "express";
import { createClass, deleteClass, updateClass } from "../controllers/class.controller.js";
import { isAdmin, isSuper, verifyToken } from "../middleware/verify.middleware.js";
const router = express.Router()


router.post("/create-class",verifyToken, isSuper,createClass);
router.put("/update-class",verifyToken,isAdmin, updateClass);
router.delete("/delete-class",verifyToken,isSuper, deleteClass);

export default router;