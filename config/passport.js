const passport = require("passport");

const JWT_Stretegy = require("passport-jwt").Strategy;
const Extract_JWT = require("passport-jwt").ExtractJwt;

const authService = require("../services/auth.service");
const authServiceInstance = new authService();

const secret = process.env.JWT_SECRET;

const options = {
	jwtFromRequest: Extract_JWT.fromAuthHeaderAsBearerToken(),
	secretOrKey: secret,
};

const stretegy = new JWT_Stretegy(options, async (payload, done) => {
	try {
		const user = await authServiceInstance.search(payload.email);

		if (user) {
			done(null, user);
		} else {
			throw error;
		}
	} catch (error) {
		done(error, false);
	}
});

module.exports = (passport) => {
	passport.use(stretegy);
};
