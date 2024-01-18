const router = require("express").Router();

const { postSignUp, postSignIn } = require("../controllers/auth.controller");

const { validateSchema } = require("../middlewares/auth.middleware");

const {
	userValidationSchema,
	loginBodyValidationSchema,
} = require("../validators/auth.validator");

const signupMiddleware = validateSchema(userValidationSchema);
const signinMiddleware = validateSchema(loginBodyValidationSchema);

router.post("/signup", signupMiddleware, postSignUp);
router.post("/signin", signinMiddleware, postSignIn);

module.exports = router;
