import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        nickname: { type: String, required: true, minlength: 3, maxlength: 30, unique: true },
        email: { type: String, required: true, minlength: 3, maxlength: 200, unique: true },
        password: { type: String, required: true, minlength: 6, maxlength: 1024 },
        role: { type: String },
        friendsId: Array,
        followersId: Array,
        followingId: Array
    },
    {
        timestamps: true,
    }
)

export const userModel = mongoose.model("User", userSchema)