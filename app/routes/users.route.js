module.exports = (app) => {
    const users = require('../controllers/users.controller.js');

app.get('/login', users.loginForm);
app.post('/login', users.loginPost);
app.get('/signup', users.signupForm );
app.post('/signup', users.signupPost);
app.get('/logout', users.logout);

}