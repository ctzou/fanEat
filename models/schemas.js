const mongoose = require('mongoose');
//const schema = mongoose.Schema;


let menuSchema = new mongoose.Schema({
   name: {type:String, require: true},
   icon: {type:String, require: true},
   menuUrl: {type:String, require: true},
   entryDate: {type:Date, default:Date.now},
})

let usersSchema = new mongoose.Schema({
   email: {type:String, require: true},
   pwd: {type:String, require: true},
   entryDate: {type:Date, default:Date.now},
})

let resSchema = new mongoose.Schema({
   place_id: {type:String, require: true},
   full_name: {type:String, require: true},
   formatted_address: {type:String, require: true},
   type: {type:String, require: true},
   entryDate: {type:Date, default:Date.now},
})

let entreesSchema = new mongoose.Schema({
   res: {type:mongoose.Schema.Types.ObjectId, ref: "restaurants"},
   cnTradName:{type:String, require: true},
   enName:{type:String, require: true},
   entryDate: {type:Date, default:Date.now},
})

let menu = mongoose.model('menu', menuSchema, 'menuDB');
let users = mongoose.model('users', usersSchema, 'usersDB');
let restaurants = mongoose.model('restaurants', resSchema, 'restDB');
let entrees = mongoose.model('entrees', entreesSchema, 'entreeDB');

let mySchemas= {
   'menu': menu,
   'users': users,
   'restaurants': restaurants,
   'entrees': entrees,
};

module.exports= mySchemas;