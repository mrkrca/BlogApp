import express from "express";

const app = express();
const port = 3000;


app.use(express.static("public"));


app.get("/", (req, res)=> {

res.render("index.ejs");
});


app.get("/about", (req, res)=> {

res.render("about.ejs");
});
    
app.get("/dashboard", (req, res)=> {

    res.render("dashboard.ejs");
    });
        





app.post("/", (req, res)=> {


});






app.listen(port, ()=> {
    console.log(`Listening to port: ${port}`);
});