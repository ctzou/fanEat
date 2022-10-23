const { name } = require('ejs');
const schemas =require('../models/schemas.js');

module.exports={
  editMenu: async(req,res)=>{
    let session= req.session

    if(!session.loggedIn){
        res.render('menu', {title: 'Edit', loggedIn:false, error:'Invalid Request'})
    } else {
        let id= req.params.id;
        let err='';

        let menu= schemas.menu;
        let query= {_id:id};

        let itemResult= await menu.find(query)
        .then((itemData)=>{
            if(itemData ==null){
                err= 'Invalid ID'
            }
            res.render('menu', {title: 'Edit Menu', item:itemData, loggedIn: session.loggedIn, error: err})
        })
      }
  },
  deleteMenu: async (req,res)=> {
    let session= req.session;

    if(!session.loggedIn) {
        res.redirect('/login')
    } else{
        let menu= schemas.menu;
        let menuId= req.params.id;
        let query= {_id:menuId};
        let deleteResult= await menu.deleteOne(query);
        res.redirect('/');
    }
  },
  saveMenu: async (req,res)=>{
    let session= req.session

    if(!session.loggedIn) {
        res.redirect('/login')
    } else{
        console.log(req.body)
        let menuId= req.body.menuId;
        let menuName= req.body.menuName;
        let menuIcon= req.body.menuIcon;
        let menuUrl= req.body.menuUrl;
        let menu= schemas.menu;

        let qry= {_id:menuId}

        let saveData={
            $set:{
                name: menuName,
                icon: menuIcon,
                menuUrl: menuUrl,
            }
        }
        let updateResult= await menu.updateOne(qry, saveData);
        res.redirect('/')
    }

  },
  newMenu: async (req,res)=> {
    let session= req.session;
    if(!session.loggedIn) {
        res.redirect('/login')
    } else{
        let menuName= req.body.menuName;
        let menuIcon= req.body.menuIcon;
        let menuUrl= req.body.menuUrl;
        let menu= schemas.menu;
        
        let query= {name:menuName}

        let searchResults= await menu.findOne(query)
        .then(async(userData)=>{
            if(!userData) {
                //ok to add
                let newMenu= new schemas.menu({
                    name: menuName,
                    icon: menuIcon,
                    menuUrl: menuUrl,
                });
                let saveMenu= await newMenu.save();
            }
        })
        res.redirect('/');
    }
  },

  getRestIndex: function (req, res) {
    res.render('index', {title: fanEat})
  },
  getRest: async (req, res) => {
    let Restaurant= schemas.restaurants;
    let Entree= schemas.entrees;
    let session= req.session;

    try {
      //const comments = await Comment.find({post: req.params.id}).sort({ createdAt: "desc" }).lean();
      const rest = await Restaurant.findById(req.params.id);
      const entrees = await Entree.find({rest: req.params.id});
      console.log(entrees);
      res.render("rest.ejs", { rest: rest, title: rest.full_name, loggedIn: session.loggedIn, });
    } catch (err) {
      console.log(err);
    }
    //console.log(rest)
  },
  newRest: async (req, res) => {
    //save place_Id and create restaurant page
    let restaurant= schemas.restaurants;
    let session= req.session;

    try {
      await restaurant.create({
        place_id: req.body.place_id,
        full_name: req.body.full_name,
        formatted_address: req.body.formatted_address,
        type: req.body.type,
      });
      
      //let saveRest = await this.newRest.save();

      console.log(req.body);

      res.redirect("/");
      //console.log('got id');
      //res.render("post.ejs", { post: post, user: req.user, comments: comments });
    } catch (err) {
      console.log(err);
    }

  },
  saveRest: async (req, res) => {
    let restaurant= schemas.restaurants;

    try {
      await restaurant.findOneAndUpdate(
        { _id: req.params.id },
        {
          $inc: { likes: 1 },
        }
      );
      console.log("Likes +1");
      res.redirect(`/post/${req.params.id}`);
    } catch (err) {
      console.log(err);
    }
  },
  newEntree: async (req, res) => {
    let entree= schemas.entrees;

    try {
      await entree.create({
        res: req.params.id,
        cnTradName:'',
        enTradName: '',
      });

      console.log("Entree has been added!");
      res.redirect("/post/"+req.params.id);
    } catch (err) {
      console.log(err);
    }
  },
}