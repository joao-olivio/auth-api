const Authentication = require('../controllers/Authentication');
const authRouter = require('express')();


authRouter.post('/signup', Authentication.signup);


module.exports = authRouter;