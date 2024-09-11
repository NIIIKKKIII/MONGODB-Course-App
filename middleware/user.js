const {User} = require("../DB");

function userMiddleware(req, res, next){
    const username = req.headers.username;
    const password= req.headers.password;

    User.findOne({
        username,
        password
    })
.then(function(value){
    if(value){
        next()
    }else{
        res.json({
            msg: "User does not exist"
        })
    }
})

};

module.exports = userMiddleware;