import mongoose from "mongoose";


const socialMediaSchema = new mongoose.schema(
    {
        platform: {
            type: String,
            enum: ["LinkedIn", "Github", "Portfolio", "Leetcode"]
        },
        url: {
            type: String,
            trim: true,
        }
    }, { _id: false }
);

export default socialMediaSchema;