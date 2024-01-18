const authService = require("../services/auth.service");
const authServiceInstance = new authService();

const postSignUp = async (request, response) => {
	try {
		const user = request?.body;

		const isUsernameOrEmailExists =
			await authServiceInstance.getByUsernameOrEmail(
				request?.body?.username,
				request?.body?.email
			);

		if (isUsernameOrEmailExists) {
			return response.status(422).json({
				message: "username or email address already exists.",
			});
		}

		const result = await authServiceInstance.signup(user);

		if (result) {
			response.status(200).json({
				message: "Signed Up Successfully",
			});
		}
	} catch (error) {
		response.status(500).json({
			error: error,
			"request-body": request?.body,
		});
	}
};

const postSignIn = async (request, response) => {
	try {
		const user = request?.body;
		const isUserExist = await authServiceInstance.getUserByEmail(user.email);

		const { _id, fullName, email } = isUserExist;

		const userData = {
			_id,
			fullName,
			email,
		};

		if (!isUserExist) {
			return response.status(422).json({
				message: "user doesn't exists.",
			});
		}

		const result = await authServiceInstance.signin(user);

		if (result.isLoggedIn) {
			response.cookie("token", result.token, {
				maxAge: 1000 * 60 * 60,
				httpOnly: true,
			});

			const token = result.token;
			response.status(200).json({
				message: "Signed In Successfully",
				userData,
				token,
			});
		} else {
			response.status(403).json({
				message: "Credentials doesn't match",
			});
		}
	} catch (error) {
		response.status(500).json({ message: error?.message });
	}
};

module.exports = { postSignUp, postSignIn };
