const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const User = new mongoose.Schema(
	{
		username: {
			type: String,
			required: [ true, 'Não pode estar em branco' ],
			unique: true,
			index: true
		},
		name: {
			type: String
		},
		email: {
			type: String,
			required: [ true, 'Não pode estar em branco' ],
			match: [ /\S+@\S+\.\S+/, 'is invalid' ],
			index: true,
			unique: true
		},
		password: {
			type: String,
			required: true,
			select: false
		},
		roles: [
			{
				type: String,
				required: true,
				enum: [ 'user', 'admin' ],
				default: 'user'
			}
		]
	},
	{ timestamps: true }
);

User.pre('save', async function(next) {
	const hash = await bcrypt.hash(this.password, 10);
	this.password = hash;

	next();
});

module.exports = mongoose.model('User', User);
