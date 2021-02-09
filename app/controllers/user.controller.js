const user          = require('../models/word.model.js');


var count = require('word-count');
var request = require("request")
     cheerio = require("cheerio")

exports.index = (req, res) => {            // Index Page
   


    res.render('index');

};

exports.indexPost= (req, res) => {              // A person checking URL without  login
    
    
    var url = req.body.url;
    

        var url = req.body.url;
        var ur = url.slice(0,8);
        if(ur == "HTTPS://" || ur == "https://")           // checking the URL stsrt with HTTPS:// or not..
        {
                request(url, function (error, response, html) {
                    if (!error) {
                    var $ = cheerio.load(html);
                        var allitems =$("body");             //// extracting the body section from the source code 
                        
                        allitems.each(function(){
                            var a =$("body").text()          ///extracting    textfrom body section by avoiding the tags
                        console.log(count(a));
                    
                        
                        
                            res.render('index',{no: "Total word count is   "+count(a)}); // render index page with countnumber
                            
                
                        }
                        );
                
                        
                    } else {                                     
                    console.log("We’ve encountered an error: " + error);            ////if any error occured
                    res.render('index',{no: "The URL is not existing"});
                    }
                });

            }
            else                                              //  if URL not start with HTTPS://
            {
                var head = "https://" 
                var url = head + url;
                request(url, function (error, response, html) {
                    if (!error) {
                    var $ = cheerio.load(html);
                        var allitems =$("body");             //// extracting the body section from the source code 
                        
                        allitems.each(function(){
                            var a =$("body").text()             //extracting    textfrom body section by avoiding the tags
                        console.log(count(a));
                    
                        
                        
                            res.render('index',{no: "Total word count is   "+count(a)});
                            
                
                        }
                        );
                
                        
                    } else {
                    console.log("We’ve encountered an error: " + error);
                    res.render('index',{no: "The URL is not existing"});
                    }
                });
               
            }

};





exports.home = (req, res) => {          // Home page or the page after login
    if(req.session.email)
    {


    res.render('home');

    }else{
        res.redirect('/');
     
    }

};


exports.homePost = (req, res) => { 

    if(req.session.email)                           // checking session
    {
    var url = req.body.url;
    var ur = url.slice(0,8);
    console.log(ur); 
    if(ur == "HTTPS://" || ur == "https://")           // check https or not 
    {
       console.log(ur);
    request(url, function (error, response, html) {
        if (!error) {
          var $ = cheerio.load(html);
            var allitems =$("html");
            
            allitems.each(function(){
                var a =$("html").text()
            console.log(count(a));
           
            
            var result = user(                       // if a active user then save the record
                {
                email : req.session.email,
                url : url,
                wno : count(a)
                });
                result.save(function (err,result)
                {
                    if(err) throw err;
                res.render('home',{no: "Total word count is   "+count(a)});
                });
      
            }
            );
      
               
        } else {
          console.log("We’veuuuu encountered an error: " + error);
          res.render('home',{no: "The URL is not existing"});
        }
      });
    }else /////////////////////////////////////////////////////// else part
    {
       var head = "https://" 
       var url = head + url;
       
    request(url, function (error, response, html) {
        if (!error) {
          var $ = cheerio.load(html);
            var allitems =$("body");
            
            allitems.each(function(){
                var a =$("body").text()          //// extracting the body section from the source code 
            console.log(count(a));
           
            
            var result = user(                       // data storing
                {
                email : req.session.email,
                url : url,
                wno : count(a)
                });
                result.save(function (err,result)
                {
                    if(err) throw err;
                res.render('home',{no: "Total word count is   "+count(a)});
                });
      
            }
            );
      
               
        } else {
          console.log("We’veuuu encountered an error: " + error);
          res.render('home',{no: "Something Wrong!"});
        }
      });
    }
    

    }else{
        res.redirect('/');
     }

};




exports.history = (req, res) => { //////Table to display the history 
      
    if(req.session.email)
    {   var email= req.session.email
        user.find({'email': email},function(err,words)
    {
        
    res.render('history',{word: words});
    });
    
    }else{
        res.redirect('/login');
     }
        
    };


    exports.delete = (req, res) => {      /////deleting previously stroed data

        if(req.session.email)
        {      
            var obid= req.params.id;        
            console.log(obid);
            user.findByIdAndRemove(obid,function(err){
                if(err) throw err;
                res.redirect('/history');
            });
        }else{
            res.redirect('/');
        }
    };

    