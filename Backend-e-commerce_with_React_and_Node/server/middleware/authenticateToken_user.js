require('dotenv').config();
const jwt = require('jsonwebtoken');
const SECRET = process.env.T_SECRET;
const {Users} = require("../../models")

function authenticateToken_user(req, res, next) {
    const token = req.headers.authorization;
    console.log(token);

    if (token == null){
        return res.sendStatus(401)
    }

    jwt.verify(token, SECRET, (err) => {
        if (err) {
          return res.sendStatus(403)
        };
        const decoded = jwt.decode(token)
        Users.findOne({
            where: {
                email: decoded.email
            }
        }).then((user)=>{
            
            if("user" === user.role){
                return res.json("it is not verified")
            } else if("verified_user" === user.role){
                next()
            } else {
                return res.sendStatus(403)
            }
        }).catch((err)=>{
            console.log(err)
            res.sendStatus(403)
        }) 
    })
}

module.exports = { authenticateToken_user };