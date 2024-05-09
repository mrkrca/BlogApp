import express from "express";
import bodyParser from "body-parser"
import { dirname } from "path";
import { fileURLToPath } from "url";
import jQuery from "jquery";
const __dirname = dirname(fileURLToPath(import.meta.url));



var posts = [];
var idCounter = 0;

const app = express();
const port = 3000;


app.use(express.static(__dirname));
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }))







app.get("/", (req, res)=> {
res.render("index.ejs" ,{posts: posts});
});



app.get("/post/:id", (req, res) => {
    const postId = req.params.id;
    const post = posts.find(post => post.id == postId);
    
    res.render("post.ejs", 
    {
        id: postId,
        titula: post.title,
        content: post.text

    })


    
});




app.get("/about", (req, res)=> {
res.render("about.ejs");
});
    


app.get("/dashboard", (req, res)=> {
res.render("dashboard.ejs");
});
        


app.post("/", (req, res) => {


    var titleInput = req.body["title"];
    var textInput = req.body["text"];
    
    var postsObj = {
        id: idCounter++,
        title: titleInput,
        text: textInput
    }

    posts.push(postsObj);
    console.log(posts);

    res.render("index.ejs",  
    {
    posts   
    }); 
});

app.post("/dashboard/delete-product", (req, res) => {
    var postId = req.body.id;
    console.log("Deleting post with ID:", postId);
    const index = posts.findIndex(post => post.id == postId);
    
    if (index !== -1) {
        posts.splice(index, 1);
        console.log("Post deleted successfully");
    } else {
        console.log("Post not found");
    }
    res.redirect("/dashboard")
});



app.post("/dashboard/edit-product", (req, res)=> {


    res.redirect("/dashboard")
})
app.listen(port, ()=> {
    console.log(`Listening to port: ${port}`);
});