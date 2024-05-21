const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY

const isAuthorized = (...roles)=>{
    return (req,res,next)=>{
        if(!roles.includes(req.user.role)){
            return res.status(403).json({
                status : "fail",
                message : "You are not allowed to perform this action"
            })
        }
        console.log("authorisation========>",req.user)

        next()
    }
}

const isAuthenticated = (req, res, next) => {
    
    const bearer = req.header('Authorization');
    const token = bearer.split(' ')[1];

    if (!token && bearer) {
        return res.status(401).json({ error: 'Unauthorized', message: error.message });
    }
    try {
        const verify = jwt.verify(token, SECRET_KEY, (error, decoded) => {
            if (error) {
                return res.status(401).json({ error: 'Unauthorized', message: error.message });
            }
            return { 
                userId: decoded.userId,
                iat: decoded.iat,
                exp: decoded.exp
            
            };
            // console.log(verify);
        });

        req.user = verify;
        next();
    } catch (error) {
        console.error("Error authenticating user:", error);
        res.status(401).json({ error: 'Unauthorized', message: error.message});
    }
};

module.exports = {isAuthenticated, isAuthorized};