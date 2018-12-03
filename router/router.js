const authRouter = require('./authRouter');
const passportService = require('../services/passport');

const requireAuth = passportService.authenticate('jwt', { session: false });

module.exports = function (app) {
    app.get('/', requireAuth, function (request, response) {
        response.send({
            data: 'hiii'
        });
    })
    app.use('/',authRouter);
}