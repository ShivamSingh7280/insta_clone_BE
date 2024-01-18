const Post = require("../models/post.model");

class PostService {
	post = async (userData, user) => {
		const newPost = new Post({
			...userData,
			postedBy: user[0],
		});

		return await newPost.save();
	};

	findAll = async () => {
		return await Post.find({})
			.populate("postedBy", "fullName")
			.sort({ createdAt: -1 });
	};

	findMyPosts = async (userId) => {
		return await Post.find({ postedBy: userId })
			.populate("postedBy", "fullName")
			.sort({ createdAt: -1 });
	};

	updateLike = async (postId, userId) => {
		const result = await Post.findByIdAndUpdate(
			postId,
			{
				$push: { likes: userId },
			},
			{
				new: true,
			}
		)
			.populate("postedBy", "_id fullName images")
			.exec();

		return result;
	};

	updateUnlike = async (postId, userId) => {
		const result = await Post.findByIdAndUpdate(
			postId,
			{
				$pull: { likes: userId },
			},
			{
				new: true,
			}
		)
			.populate("postedBy", "_id fullName images")
			.exec();

		return result;
	};
}

module.exports = PostService;
