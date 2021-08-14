'use strict';

const atm = require('./controllers/atmController');

module.exports.initRoutes = function(router) {
    router.route('/dispense').get(atm.dispense);
};
