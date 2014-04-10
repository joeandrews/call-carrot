/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */
var bcrypt = require('bcrypt');

module.exports = {
	beforeCreate: function(attrs, next) {

		bcrypt.genSalt(10, function(err, salt) {
			if (err) return next(err);

			bcrypt.hash(attrs.password, salt, function(err, hash) {
				if (err) return next(err);

				attrs.password = hash;
				next();
			});
		});
	},
	attributes: {
		email: {
			type: 'email', // Email type will get validated by the ORM
			required: true,
			unique: true
		},
		phone: {
			type: 'string',
			required: true,
			unique: true
		},
		name: {
			type: 'string',
			required: true
		},
		password: {
			type: 'string',
			required: true
		}

	}

};