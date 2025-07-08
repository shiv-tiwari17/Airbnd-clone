const { ref } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");

const listingSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    price: Number,
    location: String,
    country: String,
    image: {
        filename: { type: String, default: "listingimage" }, // Default filename
        url: {
            type: String,
            default: "https://www.fastweb.com/uploads/article_photo/photo/2036160/Simple_Environment.jpeg",
        },
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review",
        },
    ],
});

listingSchema.post("findOneAndDelete",async (listing) =>{
    if(listing){
        await Review.deleteMany({_id: {$in:listing.reviews}});
    }
});


const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
