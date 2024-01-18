const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const User = require("../models/user.model");

const postSchema = new mongoose.Schema(
	{
		caption: { type: String, maxlength: 500, required: true },
		images: { type: String, required: true },
		likes: [{ type: ObjectId, ref: "USER" }],
		postedBy: { type: ObjectId, ref: User },
	},
	{
		timestamps: true,
	}
);

const Post = mongoose.model("post", postSchema);

module.exports = Post;
