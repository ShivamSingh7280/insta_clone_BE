const PostService = require("../services/post.service");
const PostServiceInstance = new PostService();

const getMyPosts = async (request, response) => {
	try {
		const userId = request.user[0]._id;

		const result = await PostServiceInstance.findMyPosts(userId);

		if (result.length > 0) {
			response.status(200).json(result);
		}
	} catch (error) {
		response.status(500).json({
			message: "Failed to get post",
			error,
		});
	}
};

const getAllPosts = async (request, response) => {
	try {
		const result = await PostServiceInstance.findAll({});

		if (result.length > 0) {
			response.status(200).json(result);
		} else {
			response.status(404).json({ message: "No Posts found" });
		}
	} catch (error) {
		response.status(500).json({
			message: "Failed to get any post",
			error,
		});
	}
};

const newPost = async (request, response) => {
	try {
		const { caption, images } = request.body;

		if (!caption || !images.length > 0) {
			return response.status(422).json({
				error: "Please add all the required fields",
			});
		}

		const result = await PostServiceInstance.post(request.body, request.user);
		response.status(200).json({ message: "Post Shared Successfully" });
	} catch (error) {
		response.status(500).json({
			message: "Failed to create new Post",
			title: request.body.title,
			error,
		});
	}
};

const likePosts = async (request, response) => {
	try {
		const userId = request.user[0]._id;

		const result = await PostServiceInstance.updateLike(
			request.body.postId,
			userId
		);

		response.status(200).json(result);
	} catch (error) {
		response.status(500).json({
			message: "Failed to like a Post",
			error,
		});
	}
};

const unlikePosts = async (request, response) => {
	try {
		const userId = request.user[0]._id;

		const result = await PostServiceInstance.updateUnlike(
			request.body.postId,
			userId
		);

		response.status(200).json(result);
	} catch (error) {
		response.status(500).json({
			message: "Failed to like a Post",
			error,
		});
	}
};

module.exports = {
	getAllPosts,
	newPost,
	getMyPosts,
	likePosts,
	unlikePosts,
};
