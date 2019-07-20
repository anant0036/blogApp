var bodyParser = require("body-parser"),
mongoose         = require('mongoose'),
express           = require("express"),
app                 = express();



mongoose.connect('mongodb://localhost:27017/blogApp', {useNewUrlParser: true});
app.set("view engine" , "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));



var blogSchema = new mongoose.Schema({

    title:String,
    image:String,
    body:String,
    created:{type: Date , default: Date.now}

});

var Blog  = mongoose.model("Blog" , blogSchema);

// Blog.create
// (
//     {
//         title:"TEST",
//         image: "https://images.unsplash.com/photo-1558980394-da1f85d3b540?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
//         body: "This is test app ! "
//     }
// );


//RESTFUL ROUTES

app.get("/", function(req,res)
{
    res.redirect("/blogs");
}
);


app.get("/blogs", function(req , res)
{
   Blog.find({}, function(err, blogs)
   {
       if(err)
       {
           console.log("error!");
       }
       else
       {
           res.render("index", {blogs: blogs});
       }
   }
   );
}
);
































app.listen(2700,function(){
    console.log("READY TO USE !");
});