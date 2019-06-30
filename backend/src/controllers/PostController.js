const Post = require('../models/Post');

module.exports = {
	async postar(req, res) {
		try {
			const post = await Post.create({ author: req.userId, ...req.body });

			await post.save();

			await req.io.emit('post', post);

			return res.json(post);
		} catch (err) {
			return res.status(400).send({ error: 'Erro ao publicar a postagem' });
		}
	},
	async getAll(req, res) {
		try {
			const posts = await Post.find();

			return res.json(posts);
		} catch (err) {
			return res.status(400).send({ error: 'Erro ao carregar as postagens' });
		}
	},
	async getOne(req, res) {
		try {
			const post = await Post.findOne({ slug: req.params.slug });

			return res.json(post);
		} catch (err) {
			return res.status(400).send({ error: 'Erro ao carregar postagem' });
		}
	},
	async edit(req, res) {
		try {
			const post = await Post.findOne({ slug: req.params.slug });

			await post.updateOne(req.body);

			await post.save();

			return res.json(post);
		} catch (err) {
			return res.status(400).send({ error: 'Erro ao editar' });
		}
	},
	async delete(req, res) {
		try {
			await Post.findOneAndRemove({ slug: req.params.slug });

			res.status(200).send({ message: 'Deletado com sucesso!' });
		} catch (err) {
			return res.status(400).send({ error: 'Erro ao deletar' });
		}
	}
};
