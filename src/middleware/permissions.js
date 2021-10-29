'use strict';

module.exports = (capability) => {
	return (req, res, next) => {
		try {
			if (req.user.capabilities.includes(capability)) {
				next();
			}
		} catch (e) {
			next('Invalid Login');
		}
	};
};
