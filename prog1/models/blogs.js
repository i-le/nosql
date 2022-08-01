const { call } = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    slug:{
        type: String,
        required: false
    },
    author:{
        type: String,
        required: true
    },
    body:{
        type: String,
        required: true
    },
    comments:{
        type: Object,
        required: true
    },
    category:{
        type: String,
        required: true
    }

}, { timestamps: true});


const Blog = mongoose.model('Blog', blogSchema);
module.exports = Blog;

// Get All Users - find method
module.exports.getBlogs = (callback, limit) => {
    Blog.find(callback).limit(limit);
}

// Get User - findById method
module.exports.getBlogById = function(id, res){
	Blog.findById(id, (err, data) => {
		if(err){
			console.log(err);
		}else{
			res(null, data);
		}
	})
}

// Add User - create method
module.exports.addBlog = function(req) {
	var blog = new Blog(req);
	blog.save();
};

// Update User - findOneAndUpdate method
module.exports.updateBlog = function(req, res){
	var blog = new Blog(res);
	Blog.findOneAndUpdate(
		{req}, {blog}, {new: true},
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
module.exports.removeBlog = function(id, res){
	const cond = {"_id": id};
	Blog.deleteOne(cond, res);

};
