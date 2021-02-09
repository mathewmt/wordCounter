module.exports = (app) => {
    const user = require('../controllers/user.controller.js');

    app.get('/', user.index);
    app.post('/', user.indexPost);
   
    app.get('/home', user.home);
    app.post('/home', user.homePost);
    app.get('/history', user.history);
    
    app.get('/history_delete/:id', user.delete);
    


}