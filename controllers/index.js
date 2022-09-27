const schemas =require('../models/schemas.js')
require("dotenv").config({ path: "./config/.env" });


module.exports={
   getIndex: async(req,res)=>{
      let menu= schemas.menu;
      let session= req.session;
      

       let menuResult= await menu.find({})
       .then((menuData)=>{
          res.render('index', {title: 'fanEat', data: menuData, search: '', loggedIn: session.loggedIn});
       })
      //res.render("index.ejs");
   },
   getSearch: async(req,res)=>{
      let placeID= 
//should check if in database, return error if not
//if in database, return page

      //let searchTerm= {name:{$regex: '^'+query, $options: 'i'}}
      
      res.render('index', {title: 'FanEat', data: menuData, search: query, loggedIn: session.loggedIn})
   },
   /*getSearch: async(req,res)=>{
      let menu= schemas.menu;
      let session= req.session;
      let query= req.body.searchInput;
      let menuData= null;
      let searchTerm= {name:{$regex: '^'+query, $options: 'i'}}

      if (query !=null){
         let menuResult = await menu.find(searchTerm)
         .then((data)=>{
            menuData= data;
         });
      } else {
         searchTerm= 'Search';
         let menuResult= await menu.find({})
         .then((data)=>{
            menuData= data;
         })
      }
      res.render('index', {title: 'FanEat', data: menuData, search: query, loggedIn: session.loggedIn})
   }*/
}