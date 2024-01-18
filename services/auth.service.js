const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const ErrorHandler = require("../utils/ErrorHandler");
const User = require("../models/user.model");

class authService {
	register = async (user) => {
		const userData = new User(user);
		return await userData.save();
	};

	getByUsernameOrEmail = async (username, email) => {
		const user = await User.findOne({
			$or: [{ username: username }, { email: email }],
		});
		return user;
	};

	getUserByEmail = async (inputEmail) => {
		const user = await User.findOne({ email: inputEmail });
		return user;
	};

	search = async (inputEmail) => {
		return await User.find({ email: inputEmail });
	};

	signup = async (user) => {
		const hashedPassword = await this.hashPassword(user.password);

		const data = {
			...user,
			password: hashedPassword,
		};

		const userData = this.register(data);
		return userData;
	};

	hashPassword = async (password) => {
		try {
			const SALTING_ROUND = 10;

			const salt = await bcrypt.genSalt(SALTING_ROUND);
			const hash = await bcrypt.hash(password, salt);

			return hash;
		} catch (error) {
			return next(new ErrorHandler(error, 401));
		}
	};

	signin = async ({ email, password }) => {
		const isPasswordMatched = await this.verifyPassword(email, password);

		if (isPasswordMatched) {
			return { isLoggedIn: true, token: this.generateToken(email) };
		} else {
			return { isLoggedIn: false };
		}
	};

	generateToken = (email) => {
		const payload = { email };
		const options = { expiresIn: "1h" };
		const secret = process.env.JWT_SECRET;

		const token = JWT.sign(payload, secret, options);
		return token;
	};

	verifyPassword = async (email, password) => {
		const user = await this.search(email);

		if (!user) return false;

		const storedPassword = user[0]?.password;
		const isPasswordSame = await bcrypt.compare(password, storedPassword);

		if (isPasswordSame) return true;
		return false;
	};
}

module.exports = authService;
