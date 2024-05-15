import express from "express";
import bodyParser from "body-parser";
import path from "path";
import ejs from "ejs";

const app = express();
const port = 3000;

app.set('view engine', 'ejs');

app.engine('ejs', ejs.__express);
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));

const posts = [];
let idCounter = 0;

app.get("/edit-product/:id", (req, res) => {
    const postId = req.params.id;
    const postToChange = posts.find(post => post.id == postId);

    const viewData = {
        postId,
        edit: true,
        pageTitle: "Edit Post",
        post: postToChange
    };
    res.render("dashboard", viewData);
});

app.get("/", (req, res) => {
    res.render("index", { posts });
});

app.get("/post/:id", (req, res) => {
    const postId = req.params.id;
    const post = posts.find(post => post.id == postId);

    if (!post) {
        return res.status(404).send("Post not found");
    }

    res.render("post", {
        postId: post.id,
        title: post.title,
        content: post.text
    });
});

app.get("/about", (req, res) => {
    res.render("about");
});

app.get("/dashboard", (req, res) => {
    const viewData = {
        edit: false,
        pageTitle: "Add post"
    };

    res.render("dashboard", viewData);
});

app.post("/", (req, res) => {
    const titleInput = req.body["title"];
    const textInput = req.body["text"];
    const postsObj = {
        id: idCounter++,
        title: titleInput,
        text: textInput
    };

    posts.push(postsObj);
    console.log(posts);

    res.render("index", { posts });
});

app.post("/delete-post", (req, res) => {
    const postId = req.body.id;
    console.log("Deleting post with ID:", postId);
    const index = posts.findIndex(post => post.id == postId);

    if (index !== -1) {
        posts.splice(index, 1);
        console.log("Post deleted successfully");
    } else {
        console.log("Post not found");
    }
    res.redirect("/");
});

app.post("/edit-product/:id", (req, res) => {
    const postId = req.params.id;
    const { title, text } = req.body;

    const postIndex = posts.findIndex(post => post.id == postId);

    if (postIndex === -1) {
        return res.status(404).send("Post not found");
    }

    posts[postIndex].title = title;
    posts[postIndex].text = text;

    res.redirect("/");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
