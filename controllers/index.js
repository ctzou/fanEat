const schemas =require('../models/schemas.js')

module.exports={
   getIndex: async(req,res)=>{
      let menu= schemas.menu;
      let session= req.session;
      
      let menuResult= await menu.find({})
      .then((menuData)=>{
         res.render('index', {title: 'MenuTracker', data: menuData, search: '', loggedIn: session.loggedIn});
      })
   },
   getSearch: async(req,res)=>{
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
      res.render('index',{title: 'MenuTracker', data: menuData, search: query, loggedIn: session.loggedIn})
   }
}