const express = require("express");
const adminMiddleware = require("../middleware/admin");
const { Admin, Course } = require("../DB");
const router = express.Router();




router.post("/signup", async (req, res)=> {
 const username = req.body.username;
 const password = req.body.password;

 await Admin.create({
    username,
    password
 });
 res.json({
    msg: "Admin created seccessfully"
 })

});





router.post("/courses", adminMiddleware, async (req,res)=>{
    const title = req.body.title;
    const description = req.body.description;
    const imageLink = req.body.imageLink;
    const price = req.body.price;

    const newCourse =  await Course.create({
        title,
        price,
        description,
        imageLink
    });
    res.json({
        msg: "Course created successfully", courseId: newCourse._id
    })
})





router.get('/courses', adminMiddleware, async (req, res) => {
    // Implement fetching all courses logic
    const response = await Course.find({});  //this will give all the courses

    res.json({
        courses: response
    })

});


module.exports = router;



