const user        = require('../models/users.model.js');


exports.loginForm = (req, res) => {          //login
   


    res.render('login');

};



exports.loginPost = (req, res) => {     // login connection
    
    console.log("hai");
    var email = req.body.username;
    var password = req.body.pass;
    console.log(email);
    console.log(password);
    user.find({$and:[{'email': email},{'password': password}]},function(err, users)
      
    {
        //console.log(users);
        if(err) throw err;


        if (users && users.length) { 

            //console.log("qwerty". users);
            var mail = users[0].email;
            console.log(mail);

           
            req.session.email =mail;
            //var email =  req.session.email;
           
            console.log(req.session.email);
 
         res.redirect('/home');
      } else {
         //var msg ="Login Faild!";
         res.redirect('/login');
         // empty
      }

       
     } );
       

    };




    exports.signupForm = (req, res) => {          //signup
   


        res.render('signup');
    
    };
    
    exports.signupPost = (req, res) => {  // signup connection
    
        var result = user(
            {
            username : req.body.username,
            email : req.body.email,
            password : req.body.password
            });
             var email = req.body.email;
             var password = req.body.password;
             var confirmpassword = req.body.confirm_password;
                user.find({'email': email},function(err,user)
                {
                if(err) throw err;
                if(user && user.length)
                {
                    var msg ="email already existing";
                    res.render('signup',{message:msg,res: result});
                }else if(password == confirmpassword)
                    {
            //console.log(result);
                        result.save(function (err,result)
                        {
                            if(err) throw err;
                        res.redirect('login');
                        });
                    }else
                    {
                        var msg2 ="password does not matched";
                        res.render('signup',{message2:msg2});   
                    }
        });
    };


    exports.logout = (req, res) => {   ////////////// logout
    {
    
        if(req.session.email)
        {
             req.session.destroy(function(err)
            {
                if(err) throw err;
                res.redirect('/');
            });
        }else
        {
            res.redirect('/'); 
        }
    };
    

    }