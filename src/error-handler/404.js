'use strict';

const err404 = (req, res, next) => {
	const error = {
		status: 404,
		response: 'Unable to complete request',
	};
	res.status(404).send(response);
};

module.exports = err404;
