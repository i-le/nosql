use blogger

db.user.insert({
  "_id":ObjectId("5bb26043708926e438db6cad"),
  "email":"a@a.com",
  "name":"a"
});
db.user.insert({
  "_id":ObjectId("5bb26043708926e438db6cae"),
  "email":"b@b.com",
  "name":"b"
});
db.user.insert({
  "_id":ObjectId("5bb26043708926e438db6caf"),
  "email":"c@c.com",
  "name":"c"
});

db.user.find().pretty();

db.user.find({"_id":ObjectId("5bb26043708926e438db6cad")});

function insertBlog(title,body,slug,author,comments,category){db.blogs.insert({title:title,body:body,slug:slug,author:author,comments:comments,category:category})};

insertBlog("aa","aaa","aaaa","a",{suer_id:"5bb26043708926e438db6cad", comment:"good", approved:"y",created_at:"2022-6-26"},["drama","novel"]);
insertBlog("bb","framework","bbbb","b",{suer_id:"5bb26043708926e438db6cae", comment:"good", approved:"y",created_at:"2022-6-26"},["drama","novel"]);
insertBlog("cc","ccc","cccc","c",{suer_id:"5bb26043708926e438db6caf", comment:"good", approved:"y",created_at:"2022-6-26"},["drama","novel"]);

db.blogs.find({'comments.user_id':'5bb26043708926e438db6caf'},{_id:0,title:1,slug:1,comments:1});

db.blogs.find({body:{$regex:"^Framework$",$options:'-i'}},{_id:0,title:1,body:1});