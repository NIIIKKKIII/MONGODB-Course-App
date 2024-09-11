const { Admin } = require("../DB");



function adminMiddleware(req, res, next) {
    const username = req.headers.username;
    const password = req.headers.password;

Admin.findOne({
        username,
        password
    })
    .then(function(value){
        if(value){
            next()
        }else{
            res.json({
                msg: "Amdin does not exist"
            })
        }
    })
}

module.exports = adminMiddleware