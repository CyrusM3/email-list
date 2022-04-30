const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password@123",
  database: "join_us",
});

//-----Activating the route-----------
app.get("/", function (req, res) {
  //Find count of users in DB
  const q = "SELECT COUNT(*) AS count FROM users";
  connection.query(q, function (err, results) {
    if (err) throw err;
    const count = results[0].count;
    //Respond with the count
    res.render("home", { count: count });
  });
});
app.post("/register", function (req, res) {
  const person = {
    email: req.body.email,
  };

  connection.query("INSERT INTO users SET ?", person, function (error, result) {
    if (error) throw error;

    res.redirect("/");
  });
});
app.listen(3001, () => {
  console.log("Server running on 3001.");
});
