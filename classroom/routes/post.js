const express = require('express');
const router = express.Router();


//index 
router.get("/",(req,res) => {
    res.send("GET for posts")
})


//show - posts
router.get("/:id",(req,res) => {
    res.send("GET for show posts id");
});

//POST - posts
router.post("/",(req,res) => {
    res.send("post for posts");
});

//DELETE - posts
router.delete("/:id", (req,res) =>{
    res.send("DELETE for posts");
});


module.exports = router;