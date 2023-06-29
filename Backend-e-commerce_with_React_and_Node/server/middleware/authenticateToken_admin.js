require('dotenv').config();
const jwt = require('jsonwebtoken');
const SECRET = process.env.T_SECRET;
const {Users} = require("../../models")

function authenticateToken_admin(req, res, next) {
    const token = req.headers.authorization;
    const user_id = req.body.user_id;
    console.log(token);

    if (token == null){
        return res.sendStatus(401)
    }

    jwt.verify(token, SECRET, (err) => {
        if (err) {
          return res.sendStatus(403)
        };
        Users.findOne({
            where: {
                id: user_id
            }
        }).then((user)=>{
            const decoded = jwt.decode(token)
            if(decoded.email === user.email && "admin" === user.role){
                next()
            } else {
                return res.sendStatus(403)
            }
        })
    })
}

module.exports = { authenticateToken_admin }