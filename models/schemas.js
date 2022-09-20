const mongoose = require('mongoose');

let menuSchema = new mongoose.Schema({
   name: {type:String, require: true},
   icon: {type:String, require: true},
   menuUrl: {type:String, require: true},
   entryDate: {type:Date, default:Date.now},
})

let userSchema = new mongoose.Schema({
   email: {type:String, require: true},
   password: {type:String, require: true},
   entryDate: {type:Date, default:Date.now},
})

let menu = mongoose.model('menu', menuSchema, 'memu');
let users = mongoose.model('users', menuSchema, 'users');
let mySchemas= {
   'menu': menu,
   'users': users,
};

module.exports= mySchemas;