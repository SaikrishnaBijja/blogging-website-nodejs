import express from "express";

import {
  getBlogs,
  createUser,
  loginUser,
  createBlog,
  getBlog,
} from "./database.js";

const app = express();
const port = 3000;

app.set("view engine", "ejs");

app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", async (req, res) => {
  res.render("index");
});

app.get("/register", async (req, res) => {
  res.render("register");
});

app.get("/login", async (req, res) => {
  res.render("login");
});

app.get("/createBlog", async (req, res) => {
  res.render("createBlog");
});

app.get("/home", async (req, res) => {
  const blog = await getBlogs();
  res.render("home", { blog: blog });
});

app.post("/register", async (req, res) => {
  const id = req.body.id;
  const name = req.body.name;
  const password = req.body.password;
  await createUser(id, name, password);
  res.send("User Created");
});

app.post("/login", async (req, res) => {
  const id = req.body.id;
  const password = req.body.password;
  const user = await loginUser(id);
  if (user[0].password === password) {
    res.redirect("/home");
  } else {
    res.send("Incorrect Password");
  }
});

app.post("/createBlog", async (req, res) => {
  const title = req.body.title;
  const blog2 = req.body.blog;
  await createBlog(title, blog2);
  res.redirect("/home");
});

app.get("/post/:postTitle", async (req, res) => {
  const title = req.params.postTitle;
  const blog = await getBlog(title);
  res.render("post", { title: title, blog: blog.blog });
});

app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`);
});
