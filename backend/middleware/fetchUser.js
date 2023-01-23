const jwt = require("jsonwebtoken");
const JWD_SECRET = "Harryisabadboy";

const fetchUser = (req, res, next)=>{
    // Get the user from the jwt token and add id to req object.
    const token = req.header("auth-token");
    if(!token){
        res.status(401).send({error: "Please autheticate using a valid token 11111"});
    }
    // It can be possible if token is real or not;
    try {
        const data = jwt.verify(token, JWD_SECRET);
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).send({error: "Please autheticate using a valid token"});
    }
}

module.exports = fetchUser;