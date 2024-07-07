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
export const isAdmin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next()
    } else {
        res.status(403).send("Access denied. Admin role required.")
    }
}

export const isSuper = (req, res, next) => {
    if (req.user && req.user.isSuper) {
        next()
    } else {
        res.status(403).send("Access denied. Super admin role required.")
    }
}

    
   