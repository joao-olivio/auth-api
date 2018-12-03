const authRouter = require('./authRouter');

module.exports = function (app) {
    app.use('/',authRouter);
}