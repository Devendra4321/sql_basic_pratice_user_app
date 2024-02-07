const mysql = require("mysql2");
// const { faker } = require("@faker-js/faker");
const express = require("express");
const path = require("path");
var methodOverride = require("method-override");
const { send } = require("process");
const { v4: uuidv4 } = require("uuid");
const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));

// to display count of tuples
app.get("/", (req, res) => {
  let query = "SELECT count(*) FROM user";
  connection.query(query, (err, result) => {
    try {
      if (err) throw err;
      let count = result[0]["count(*)"];
      res.render("home.ejs", { count });
    } catch (err) {
      console.log(err);
      res.send(err);
    }
  });
});

//to display  all users in the database

app.get("/show", (req, res) => {
  let query = "SELECT * FROM user";

  try {
    connection.query(query, (err, users, fields) => {
      if (err) throw err;
      res.render("showUsers.ejs", { users });
    });
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

//to edit user route step 1
app.get("/user/:id/edit", (req, res) => {
  let { id } = req.params;
  let query = `SELECT * FROM user WHERE id='${id}'`;

  try {
    connection.query(query, (err, result) => {
      if (err) throw err;
      let user = result[0];
      res.render("edit.ejs", { user });
    });
  } catch (err) {
    res.send(err);
  }
});

//to update data of user in db step 2
app.patch("/user/:id", (req, res) => {
  //step 1 search user based on id
  let { id } = req.params;
  let { password: formPassword, username: newUsername } = req.body;
  let query = `SELECT * FROM user WHERE id='${id}'`;

  try {
    connection.query(query, (err, result) => {
      if (err) throw err;
      let user = result[0];
      //step 2 to check wheather password  is correct or not
      if (formPassword != user.password) {
        res.send("WRONG PASSWORD");
      } else {
        //step 3 to update username
        let upQuery = `UPDATE user set username='${newUsername}' where id='${id}'`;
        connection.query(upQuery, (err, result) => {
          if (err) throw err;
          res.redirect("/show");
        });
      }
    });
  } catch (err) {
    res.send(err);
  }
});

//home task
//to insert new user step1
app.get("/user", (req, res) => {
  res.render("add.ejs");
});

//to insert data in db step 2
app.post("/user", (req, res) => {
  let id = uuidv4();
  let { username, email, password } = req.body;
  let query =
    "INSERT INTO user (id, username, email, password) VALUES (?,?,?,?)";
  let user = [id, username, email, password];
  try {
    connection.query(query, user, (err, result) => {
      if (err) throw err;
      res.redirect("/");
    });
  } catch (err) {
    res.send(err);
  }
});

//delete user
app.delete("/user/:id", (req, res) => {
  let { id } = req.params;
  let query = `DELETE FROM user WHERE id='${id}'`;
  try {
    connection.query(query, (err, result) => {
      res.redirect("/");
    });
  } catch (err) {
    res.send(err);
  }
});

app.listen(port, () => {
  console.log("Server started on port 3000");
});

// Create the connection to database
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "college",
  password: "Devendra#*123",
});
