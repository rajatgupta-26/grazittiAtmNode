'use strict';

const atm = require('./controllers/atmController');
const health = require('./controllers/health');

module.exports.initRoutes = function(router) {
    router.route('/dispense').get(atm.dispense);
    router.route('/ping').get(health.ping);
};
