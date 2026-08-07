import jwt from "jsonwebtoken"

export function authenticateToken(req, res, next){

    const token = req.cookies?.token_ExpoHub; // returns undefined if token is absent
    if(!token){
        return res.status(401).json({
            message: "Authentication token missing"
        })
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRETKEY);
        req.user = decoded;
        next();
    }catch(err){
        return res.status(401).json({
            message: "Token verification failed: " + err.message
        })
    }

}

// this function returns the middleware function.
export function authorizeRole(...roles){ // rest param, roles = ['Admin', "Visitor"]

    return (req, res, next)=>{

        if(!roles.includes(req.user.role)){ 
            return res.status(403).json({
                message: "Unauthorized."
            })
        }
        
        next();
    }

}



