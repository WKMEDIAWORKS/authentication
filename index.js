import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import bcrypt from "bcrypt";

const app = express();
const port = 3000;
const saltRounds = 10;

const db = new pg.Client({
     user: "postgres",
     host: "localhost",
     database: "xyz",
     password: "pwd",
     port: 5432,
 });

 db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.get("/register", (req, res) => {
  res.render("register.ejs");
});

app.post("/register", async (req, res) => {
  const email = req.body.username;
  const loginPassword = req.body.password;
  try {
    const checkRes = await db.query("SELECT * FROM users WHERE email = $1",
      [email],
    );
    if(checkRes.rows.length > 0) {
      res.send("This email already exists, please try to login!");
    }
    else {
      bcrypt.hash(loginPassword, saltRounds, async (err, hash) => {
        if(err) {
          console.log("Error occured while hashing: ",err);
        }
        else {
          const result = await db.query("INSERT INTO USERS(email, password) VALUES($1, $2)",
            [email, hash],
          );
          console.log(result);
          res.send("User registered successfully!");
        }
      });
    }
  }
  catch(err) {
    console.log("Error while registering: ",err);
  }
});

app.post("/login", async (req, res) => {
  const email = req.body.username;
  const password = req.body.password;

  try {
    const checkUser = await db.query("SELECT * FROM users WHERE email = $1",
      [email],
    );
    if(checkUser.rows.length === 0) {
      res.send("Please register before logging in.");
    }
    else {
    const userHash = checkUser.rows[0].password;
    bcrypt.compare(password, userHash, (err, result) => {
      if(err) {
        res.send("Something went wrong.");
      }
      if(result) {
        res.render('secrets.ejs');
      } else {
        res.send("Incorrect password!");
      }
    });
  }

  }
  catch(err) {
    console.log(err);
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
