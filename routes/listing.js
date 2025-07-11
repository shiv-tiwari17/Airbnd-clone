const express = require("express");
const wrapAsync = require("../utils/wrapAsync");
const router = express.Router();
const ExpressError = require("../utils/ExpressError.js");
const { listingSchema } = require('../schema.js');
const Listing = require("../models/listing.js")


const validateListing = (req, res, next) => {
    let {error} =listingSchema.validate(req.body);
    if(error){
        let errMsg = error.details.map((el) => el.message).join(',');
        throw new ExpressError(400, errMsg);
    }else{
        next();
    }
};

//Index Route
router.get("/", wrapAsync(async (req,res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs",{allListings});
}));

//New Route
router.get("/new",(req,res) => {
    res.render("listings/new.ejs");
});

//Create Route
router.post(
    "/",
    validateListing,
    wrapAsync(async (req,res,next) => {  
    const newListing =  new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings");
 }

));

//Show Route

router.get("/:id",wrapAsync(async (req,res) => {
    let{id} = req.params;
    const listing = await Listing.findById(id).populate("reviews");
    res.render("listings/show.ejs",{listing});
}));
 
//Edit 
router.get("/:id/edit", wrapAsync(async (req,res) => {
    let{id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs",{listing});

}));

//update Route
router.put("/:id",
    validateListing,
     wrapAsync(async (req,res) => {
    let{id} = req.params;
   await Listing.findByIdAndUpdate(id,{ ...req.body.listing});
   req.flash("success","Listing Updated");
   res.redirect(`/listings/${id}`);   
}));

//delete Route
router.delete("/:id", wrapAsync(async (req,res) => {
    let {id} = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    req.flash("success","Listing Deleted!");
    res.redirect("/listings");
}));

module.exports = router;