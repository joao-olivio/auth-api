const authRouter = require('./authRouter');

module.exports = function (app) {
    authRouter(app);
}