'use strict';

const err500 = (err, req, res, next) => {
	const error = {
		status: 500,
		message: error,
	};
	res.status(500).json(error);
};

module.exports = err500;
