import { Router } from "express";
import { getAllAttendances } from "../controllers/attendance.controller.js";

const router = Router();


router.get("/get",getAllAttendances)


export default router;