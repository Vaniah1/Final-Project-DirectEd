import { Router } from "express";
import { getAllAttendances } from "../controllers/attendance.controller.js";

const router = Router();


router.get("/get-all-attendances",getAllAttendances)


export default router;