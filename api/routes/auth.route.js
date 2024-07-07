import express from "express"
import { loginPrincipal, loginStudent, loginTeacher, signupStudent, signupTeacher, signupPrincipal } from "../controllers/auth.controller.js"
import { verifyToken } from "../middleware/verify.middleware.js"

const router = express.Router()

router.post("/signup-student",signupStudent)
router.post("/signup-teacher",signupTeacher)
router.post("/signup-principal",signupPrincipal)
router.post("/login-student",verifyToken,loginStudent)
router.post("/login-teacher",verifyToken,loginTeacher)
router.post("/login-principal",verifyToken,loginPrincipal)


export default router;