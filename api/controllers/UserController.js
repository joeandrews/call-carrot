/**
 * UserController.js
 *
 * @description ::
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */
var bcrypt = require('bcrypt'),
	twilio = require('twilio');

function initiateTwilioCapacity(userID) {
	var capability = new twilio.Capability('ACc98c3a76e43c2d03ad1efb3c5b261bde', 'e8c08e1c56902121e87fb91ee1c020f6');
	capability.allowClientIncoming(userID);
	var token = capability.generate();
	return token;
};
module.exports = {
	login: function(req, res) {

		User.findOneByEmail(req.body.email).done(function(err, user) {
			if (err) res.json({
				error: 'DB error'
			}, 500);

			if (user) {
				bcrypt.compare(req.body.password, user.password, function(err, match) {
					if (err) res.json({
						error: 'Server error'
					}, 500);

					if (match) {
						// password match
						req.session.user = user.id;
						user.TwilioCapability = initiateTwilioCapacity(user.id);
						res.json(user);
					} else {
						// invalid password
						if (req.session.user) req.session.user = null;
						res.json({
							error: 'Invalid password'
						}, 400);
					}
				});
			} else {
				res.json({
					error: 'User not found'
				}, 404);
			}
		});
	}
};