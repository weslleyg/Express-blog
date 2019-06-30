const mongoose = require('mongoose');

const Post = new mongoose.Schema(
	{
		title: {
			type: String,
			trim: true,
			required: true
		},
		description: {
			type: String,
			required: true
		},
		content: {
			type: String,
			required: true
		},
		author: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true
		},
		slug: {
			type: String,
			trim: true,
			index: true,
			unique: true,
			required: true
		},
		tags: [
			{
				type: String,
				required: true
			}
		]
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Post', Post);
