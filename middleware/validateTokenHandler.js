const jwt = require('jsonwebtoken')

const validateToken = async (req, res, next) => {
    let token;
    let authHeader = req.headers.authorization || req.headers.Authorization
    if (authHeader && authHeader.startsWith("Bearer")) {
        token = authHeader.split(" ")[1]
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                res.status(401);
                throw new Error("User is not Authorized")
            }
            //console.log(decoded.user)
            req.user=decoded.user;
            next();
        });

        if(!token){
            res.status(401);
            throw new Error("User is not authorized or token is missing in the request")
        }
    }
};

module.exports = validateToken;