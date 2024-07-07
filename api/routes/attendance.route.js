import { Router } from "express";
import { getAllAttendances } from "../controllers/attendance.controller";

const router = Router();


router.get("/get-all-attendances",getAllAttendances)