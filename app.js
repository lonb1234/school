const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');
var nl2br  = require('nl2br');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27018/blogDB", {useNewUrlParser: true, useUnifiedTopology: true});

const postSchema = {
  title: String,
  content: String
};

const Post = mongoose.model("Post", postSchema);


app.get("/", function(req, res){

  Post.find({}, function(err, posts){
    res.render("home", {

      posts: posts
      });
  });
});
app.get("/kind", function(req, res){
  res.render("kind")
})

app.get("/kort", function(req, res){
  res.render("kort")
})

app.get("/dynamisch", function(req, res){
  res.render("dynamisch")
})

app.get("/login", function(req, res){
  res.render("login")
})

app.get("/compose", function(req,res){
  res.render("compose")
})

app.post("/compose", function(req, res){
  const post = new Post({
    title: req.body.postTitle,
    content: req.body.postBody
  });


  post.save(function(err){
    if (!err){
        res.redirect("/");
    }
  });
});


app.get("/delete", function (req,res){

  Post.find({}, function(err, posts){
    res.render("delete", {

      posts: posts
      });
})
});

app.post("/delete", function (req,res){
  const checkedBox=req.body.checkbox
  var i;
for (i = 0; i < checkedBox.length; i++) {
  // checkedBox.forEach(function(){
  Post.findByIdAndRemove(checkedBox, function(err){
    if (!err){
      console.log("deleted")
    }
    else{console.log("not deleted")}
})
  }
// )
  res.redirect("/delete")
})

app.get("/edit", function (req,res){
  Post.find({}, function(err, posts){
    res.render("edit", {

      posts: posts
      });
})
});

app.get("/posts/:postId", function(req, res){

const requestedPostId = req.params.postId;

  Post.findOne({_id: requestedPostId}, function(err, post){
    res.render("post", {
      title: post.title,
      content: post.content
    });
  });

});


app.get("/blogmenu", function (req,res){
  res.render("blogmenu")
})


app.listen(3000, function() {
  console.log("Server started on port 3000");
});
