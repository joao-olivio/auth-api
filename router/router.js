module.exports = function (app) {
    app.get('/', function (request, response, next) {
        response.send([
            'Hello',
            'Word'
        ])
    });
}