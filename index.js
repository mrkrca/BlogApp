import express from "express";
import bodyParser from "body-parser"
import { dirname } from "path";
import { fileURLToPath } from "url";
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

app.post("/deleted/:id",(req, res)=> {

    const postId = req.params.id;
    const index = posts.find(post => post.id == postId);

    posts.splice(index);

res.render("index.ejs" ,{posts: posts});
});





app.listen(port, ()=> {
    console.log(`Listening to port: ${port}`);
});