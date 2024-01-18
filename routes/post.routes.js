const router = require("express").Router();
const passport = require("passport");

const {
	getAllPosts,
	newPost,
	getMyPosts,
	likePosts,
	unlikePosts,
} = require("../controllers/post.controller");

// Passport Middleware :
const authenticationMiddleware = passport.authenticate("jwt", {
	session: false,
});

router.get("/allpost", authenticationMiddleware, getAllPosts);
router.get("/myposts", authenticationMiddleware, getMyPosts);
router.post("/post", authenticationMiddleware, newPost);
router.put("/like", authenticationMiddleware, likePosts);
router.put("/unlike", authenticationMiddleware, unlikePosts);

module.exports = router;
