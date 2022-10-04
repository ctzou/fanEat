const schemas =require('../models/schemas.js')
require("dotenv").config({ path: "./config/.env" });


module.exports={
   getIndex: async(req,res)=>{
      let rest= schemas.restaurants;
      let session= req.session;
      

       let restResult= await rest.find({})
       .then((restData)=>{
          res.render('index', {title: 'fanEat', data: restData, search: '', loggedIn: session.loggedIn});
       })
      //res.render("index.ejs");
      //res.render('index', {title: 'fanEat', data: restData, search: '', loggedIn: session.loggedIn});
   },
   getPost: async (req, res) => {
      try {
        const post = await Post.findById(req.params.id);
        const comments = await Comment.find({post: req.params.id}).sort({ createdAt: "desc" }).lean();
        res.render("post.ejs", { post: post, user: req.user, comments: comments });
      } catch (err) {
        console.log(err);
      }
    },
   getSearch: async(req,res)=>{
      //let placeID;
//should check if in database, return error if not
//if in database, return page

   let restaurant = schemas.restaurants;
   let query = req.body.searchInput;
   let session = req.session;
   let qry = {name:{$regex:'^' + q, $options:'i'}};
   let restData = null;

 
   if (query != null) {
     let restResult = await restaurant.find(qry).then( (data) => {
       restData = data;
     });
   } else {
     query = 'Search';
     let restResult = await restaurant.find({}).then( (data) => {
       restData = data;
     });
   }
      res.render('index', {title: 'FanEat', data: restData, search: query, loggedIn: session.loggedIn})
   },
   // saveRestaurant: async (req, res) => {
   //    //save place_Id and create restaurant page
   //    let restaurant= schemas.restaurants;
   //    let session= req.session;

   //    try {
  
   //      await restaurant.create({
   //        place_id: req.body.place_id,
   //        name: req.body.name,
   //        formatted_address: req.body.formatted_address,
   //        type: req.body.type,
   //      });
   //      console.log(req.body);

   //      res.redirect("/");
   //    } catch (err) {
   //      console.log(err);
   //    }

   //  },
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