const express = require('express');
const router = express.Router();

//index - users
router.get("/",(req,res) => {
    res.send("GET for posts")
})


//show - users
router.get("/:id",(req,res) => {
    res.send("GET for show posts id");
});

//POST - users
router.post("/",(req,res) => {
    res.send("post for posts");
});

//DELETE - users
router.delete("/:id", (req,res) =>{
    res.send("DELETE for posts");
});

module.exports = router;