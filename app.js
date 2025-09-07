const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const { v4: uuidv4 } = require('uuid');
const methodOverride = require("method-override");


app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

let posts = [
    {
        id: uuidv4(),
        username: "manish",
        content: "hello i am doing again quora project and posts On self",
    },
    {
        id: uuidv4(),
        username: "simran",
        content: "hello i am doing again quora project and posts On self with xyz",
    },
    {
        id: uuidv4(),
        username: "sindhu",
        content: "hello i am doing again quora project and posts On self with my brother",
    },
];

//posts
app.get("/posts", (req, res) => {
    res.render("index.ejs", { posts });
});

//form show
app.get("/posts/new", (req, res) => {
    res.render("create.ejs");
});

//Crearte route
app.post("/posts", (req, res) => {
    let { username, content } = req.body;
    let newPost = { id: uuidv4(), username, content };
    posts.push(newPost);
    res.redirect("/posts");
});

//Show Deatils or Read
app.get("/posts/:id", (req, res) => {
    let { id } = req.params;
    let post = posts.find(p => p.id === id);
    res.render("show.ejs", { post });
});


//Edit Post
app.get("/posts/:id/edit", (req, res) => {
    let {id} = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("edit.ejs", {post});
});

app.patch("/posts/:id", (req, res) => {
    let { id } = req.params;
    let newContent = req.body.content;
    let post = posts.find((p) => id === p.id);
    post.content = newContent;
    console.log(post);
    res.redirect("/posts");
});

//Delete Route
app.delete("/posts/:id", (req, res) => {
    let { id } = req.params;
    posts = posts.filter(p => p.id !== id);
    res.redirect("/posts");
});



//server
app.get("/", (req, res) => {
    res.send("Hello I am root/Server");
});

//listener
app.listen(port, (req, res) => {
    console.log(`port is litening on ${port}`);
});