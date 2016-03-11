var jwt = require('jsonwebtoken');

module.exports = {
  configureAuth:function(app, router){

    router.post('/authenticate', function(req, res) {      

      var usr = req.body.user;
      var pwd = req.body.password;

      console.log('server login got ', usr, pwd);

      var user ={
        name:'admin',
        pwd:123
      };

      if(usr!='admin' || pwd!='123'){
        res.json({ success: false, message: 'Authentication failed. User not found.' });
        return;
      }

      var token = jwt.sign(user, app.get('superSecret'), {
          expiresIn: 6000 // expires in seconds
        });

        // return the information including token as JSON
        res.json({
          success: true,
          message: 'Enjoy your token!',
          token: token
        });
      });
  }
};