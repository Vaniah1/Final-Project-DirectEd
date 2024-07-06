import jwt from "jsonwebtoken"

export const verifyToken = (req,res,next) => {
    const token = req.header("auth-token")
    if(!token) return res.status(401).send("Access Denied")
        try{
            const verified = jwt.verify(token,process.env.TOKEN_SECRET)
            req.user = verified
            next()
        }catch(err){
            res.status(400).send("Invalid Token")
        }
    }
export const verifyAdmin = (req, res, next) => {
    const user = req.user
    if (user && (user.isAdmin || user.isSuper)) {
        next()
    } else {
        return res.status(403).send("Access Denied: Not an Admin or Super User")
    }
}

   