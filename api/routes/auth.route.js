import express from "express"
import { loginPrincipal, loginStudent, loginTeacher, signupStudent, signupTeacher, signupPrincipal } from "../controllers/auth.controller.js"
import { isSuper, verifyToken } from "../middleware/verify.middleware.js"

const router = express.Router()

router.post("/signup-student",isSuper,signupStudent)
router.post("/signup-teacher",isSuper,signupTeacher)
router.post("/signup-principal",isSuper,signupPrincipal)
router.post("/login-student",verifyToken,loginStudent)
router.post("/login-teacher",verifyToken,loginTeacher)
router.post("/login-principal",verifyToken,loginPrincipal)


export default router;