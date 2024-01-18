const mongoose = require("mongoose");
const validator = require("validator");

// User Schema :

const validateIfValueisEmail = (value) => validator.isEmail(value);

const userSchema = new mongoose.Schema(
	{
		email: {
			type: String,
			required: true,
			unique: true,
			validate: validateIfValueisEmail,
		},
		fullName: { type: String, maxLength: 50, default: "" },
		username: { type: String, required: true, maxLength: 25, unique: true },
		password: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

const User = mongoose.model("USER", userSchema);

module.exports = User;
