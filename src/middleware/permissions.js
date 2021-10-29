'use strict';

module.exports = (capability) => {
	return (req, res, next) => {
		console.log('in permissions!!!!!!!!');
		try {
			if (req.user.capabilities.includes(capability)) {
				next();
			}
		} catch (e) {
			next('Invalid Login');
		}
	};
};
