const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course, Admin } = require("../DB");
const { default: mongoose } = require("mongoose");

// User Routes

router.post("/signup", (req, res)=>{
    const username=req.body.username;
    const password=req.body.password;

    User.create({
    username,
    password
    })

    res.json({
        Msg: "User created successfully"
    })
})

router.get("/courses", async (req, res)=>{
    const response = await Course.find({})

    res.json({
        Courses: response
    })
})



router.post("/courses/:courseID", userMiddleware, async (req, res)=>{
    const courseID = req.params.courseID;
    const username = req.headers.username;

   await User.updateOne({
    username
   },
{   
   "$push":{purchasedCourses:courseID}
})
  res.json({
    msg: "Course Purchased Successfully"
  })
});




router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    // Implement fetching purchased courses logic
    const user = await User.findOne({
        username: req.headers.username
    });
    const courses = await Course.find({
        _id: {
            "$in": user.purchasedCourses
        }
    });

    res.json({
        courses: courses
    })
});

module.exports = router



