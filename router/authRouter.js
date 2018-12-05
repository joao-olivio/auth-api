const Authentication = require('../controllers/Authentication');
const authRouter = require('express')();

const passportService = require('../services/passport');
const requireSignin = passportService.authenticate('local', { session: false });
const requireAuth = passportService.authenticate('jwt', { session: false });

authRouter.post('/signup', Authentication.signup);
authRouter.post('/signin', requireSignin, Authentication.signin)


module.exports = authRouter;