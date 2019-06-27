const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');

exports.auth = (req, res, next) => {
	const authHeader = req.headers.authorization;
	console.log(req.headers);

	if (!authHeader) return res.status(401).send({ error: 'Nenhum token disponível!' });

	const parts = authHeader.split(' ');

	if (!parts.legth === 2) return res.status(401).send({ error: 'Erro no token!' });

	const [ scheme, token ] = parts;

	if (!/^Bearer$/i.test(scheme)) return res.status(401).send({ error: 'Token mal formatado!' });

	jwt.verify(token, authConfig.secret, (err, decoded) => {
		if (err) return res.status(401).send({ error: 'Token inválido!' });

		req.userId = decoded.id;
		return next();
	});
};

exports.isAdm = (req, res, next) => {
	const authHeader = req.headers.authorization;

	if (!authHeader) return res.status(401).send({ error: 'Nenhum token disponível!' });

	const parts = authHeader.split(' ');

	if (!parts.legth === 2) return res.status(401).send({ error: 'Erro no token!' });

	const [ scheme, token ] = parts;

	if (!/^Bearer$/i.test(scheme)) return res.status(401).send({ error: 'Token mal formatado!' });

	jwt.verify(token, authConfig.secret, (err, decoded) => {
		if (err) res.status(401).send({ error: 'Token inválido!' });

		if (decoded.roles.includes('admin')) {
			req.userId = decoded.id;
			return next();
		} else {
			res.status(401).send({ error: 'Esta funcionalidade é restrita para administradores!' });
		}
	});
};
