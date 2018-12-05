const authRouter = require('./authRouter');

module.exports = function (app) {
    app.get('/', function (request, response) {
        response.send({
            data: 'hiii'
        });
    })


    app.use('/',authRouter);
}