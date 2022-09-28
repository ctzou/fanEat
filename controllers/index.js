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
      let placeID;
//should check if in database, return error if not
//if in database, return page

      //let searchTerm= {name:{$regex: '^'+query, $options: 'i'}}
      
      res.render('index', {title: 'FanEat', data: menuData, search: query, loggedIn: session.loggedIn})
   },
   saveRestaurant: async (req, res) => {
      //save place_Id and create restaurant page
      let restaurant= schemas.restaurants;
      let session= req.session;

      try {
  
        await restaurant.create({
          place_id: req.body.place_id,
          name: req.body.search_input,
          formatted_address: req.body.formatted_address,
          type: req.body.type,
        });
        console.log(req.body);

        res.redirect("/");
      } catch (err) {
        console.log(err);
      }

    },
    /*  createPost: async (req, res) => {
    try {
      // Upload image to cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);

      await Post.create({
        title: req.body.title,
        image: result.secure_url,
        cloudinaryId: result.public_id,
        caption: req.body.caption,
        likes: 0,
        user: req.user.id,
      });
      console.log("Post has been added!");
      res.redirect("/profile");
    } catch (err) {
      console.log(err);
    }
  },
  },*/
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