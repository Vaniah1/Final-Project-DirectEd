import express from "express"
import { loginPrincipal, loginStudent, loginTeacher, signupStudent, signupTeacher, signupPrincipal } from "../controllers/auth.controller.js"

const router = express.Router()

router.post("/signup-student",signupStudent)
router.post("/signup-teacher",signupTeacher)
router.post("/signup-principal",signupPrincipal)
router.post("/login-student",loginStudent)
router.post("/login-teacher",loginTeacher)
router.post("/login-principal",loginPrincipal)


export default router;