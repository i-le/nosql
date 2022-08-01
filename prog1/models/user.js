const { call } = require('body-parser');
const mongoose = require('mongoose');

// User Schema
const userSchema = mongoose.Schema({
	name:{
		type: String,
		required: true
	},
	email:{
		type: String,
		default: true
	}
});

const User = module.exports = mongoose.model('User', userSchema);

// Get All Users - find method
module.exports.getUsers = (callback, limit) => {
        User.find(callback).limit(limit);
}

// Get User - findById method
module.exports.getUserById = function(id, res){
	User.findById(id, (err, data) => {
		if(err){
			console.log(err);
		}else{
			res(null, data);
		}
	})
}

// Add User - create method
module.exports.addUser = function(req) {
	var user = new User(req);
	user.save();
};

// Update User - findOneAndUpdate method
module.exports.updateUser = function(req, res){
	var user = new User(res.body);
	User.findOneAndUpdate(
		{req}, {user}, {new: true},
		(err, data) =>{
			if(err){
				console.log(err);
			} else {
				res(null, data)
			}
		}
	)
};

// Delete User - deleteOne method
module.exports.removeUser = function(id, res){
	const cond = {"_id": id};
	User.deleteOne(cond, res);

};
