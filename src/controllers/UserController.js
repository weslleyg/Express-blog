const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const authConfig = require('../config/auth');

function generateToken(params = {}) {
	let token = jwt.sign(params, authConfig.secret, {
		expiresIn: 86400
	});
	return token;
}

module.exports = {
	async register(req, res) {
		try {
			const user = await User.create({ ...req.body, roles: [ 'user' ] });

			await user.save();
			user.password = undefined;

			await req.io.emit('user', user);

			return res.send({
				user,
				token: generateToken({ id: user._id, roles: user.roles })
			});
		} catch (err) {
			console.log(err);
			return res.status(400).send({ error: 'Erro ao cadastrar!' });
		}
	},
	async login(req, res) {
		try {
			const { email, password } = req.body;
			const user = await User.findOne({ email }).select('+password');

			if (!user) res.status(404).send({ error: 'Usuário ou senha inválidos!' });
			if (!await bcrypt.compare(password, user.password))
				return res.status(400).send({ error: 'Senha inválida!' });

			user.password = undefined;

			return res.json({
				user,
				token: generateToken({ id: user._id, roles: user.roles })
			});
		} catch (err) {
			return res.status(400).send({ error: 'Erro ao logar' });
		}
	},
	async refreshToken(req, res) {
		try {
			const bearerToken = req.headers.authorization;

			const [ scheme, token ] = bearerToken.split(' ');

			const data = jwt.verify(token, authConfig.secret);

			const user = await User.findById(data.id);

			return res.send({
				user,
				token: generateToken({ id: user._id, roles: user.roles })
			});
		} catch (err) {
			return res.status(500).send({ error: 'Falha ao processar sua requisição!' });
		}
	},
	async users(req, res) {
		try {
			const user = await User.find().sort('-createdAt');

			return res.render('user', { users: user });
		} catch (err) {
			return res.status(400).send({ error: 'Falha ao processar sua requisição!' });
		}
	},
	async user(req, res) {
		try {
			const user = await User.findOne({ username: req.params.username });

			return res.json(user);
		} catch (err) {
			return res.status(400).send({ error: 'Falha ao processar sua requisição!' });
		}
	},
	async edit(req, res) {
		try {
			const user = await User.findOne({ username: req.params.username });

			await user.updateOne(req.body);

			return res.json(user);
		} catch (err) {
			return res.status(400).send({ error: 'Falha ao processar sua requisição!' });
		}
	},
	async delete(req, res) {
		try {
			await User.findOneAndRemove({ username: req.params.username });

			res.status(200).send({ message: 'Deletado com sucesso!' });
		} catch (err) {
			return res.status(400).send({ error: 'Falha ao processar sua requisição!' });
		}
	}
};
