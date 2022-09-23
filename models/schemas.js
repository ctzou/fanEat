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

let menu = mongoose.model('menu', menuSchema, 'memu');
let users = mongoose.model('users', usersSchema, 'users');
let mySchemas= {
   'menu': menu,
   'users': users,
};

module.exports= mySchemas;