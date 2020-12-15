const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

app.use(express.static(__dirname + "/dist/client"));
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
mongoose.connect(
  "mongodb+srv://afosh:afosh123@cluster0.dignc.mongodb.net/Contactz?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  },
  () => console.log("connected to the database")
);
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  email: String,
});

const User = mongoose.model("User", userSchema);

const ContactSchema = new mongoose.Schema({
  Name: String,
  Number: String,
  Job: String,
  Location: String,
});

const Contact = mongoose.model("Contacts", ContactSchema);

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to the API",
  });
});

app.get("/api/contacts", (req, res) => {
  Contact.find((err, results) => {
    if (err) console.log(err);
    res.json(results);
  });
});
app.get("/api/contact/:id", (req, res) => {
  let id = req.params.id;

  Contact.findById(id, (err, result) => {
    res.json(result);
  });
});

app.put("/api/contact/:id", async (req, res) => {
  let id = req.params.id;
  let Name = req.body.Name;
  let Number = req.body.Number;
  let Job = req.body.Job;
  let Location = req.body.Location;

  let update = {
    Name,
    Number,
    Job,
    Location,
  };
  let doc = await Contact.findByIdAndUpdate(
    id,
    update,
    { returnOriginal: false },
    (err, result) => {
      if (err) res.send(err);
      res.send(result);
    }
  );
});
app.post("/api/contact", (req, res) => {
  let Name = req.body.Name;
  let Number = req.body.Number;
  let Job = req.body.Job;
  let Location = req.body.Location;

  let temp = {
    Name,
    Number,
    Job,
    Location,
  };

  let data = new Contact(temp);

  data.save((err, results) => {
    if (err) console.log(err);
    res.send(results);
  });
});

app.get("/api/ex", (req, res) => {
  User.find((err, result) => {
    if (err) console.log(err);
    res.json(result);
  });
});
app.post("/api/posts", verifytoken, (req, res) => {
  jwt.verify(req.token, "secretkey", (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      res.json({
        message: "Post Created!",
        authData,
      });
    }
  });
});
app.delete("/api/contact/:id", async (req, res) => {
  let id = req.params.id;

  let doc = await Contact.findByIdAndDelete(id, (err, result) => {
    if (err) res.send(err);
    res.send(result);
  });
});
app.post("/api/register", (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  let email = req.body.email;

  var userEntry = new User({ username, password, email });
  userEntry.save((err, docs) => {
    if (err) return console.log(err);
    res.json({
      message: docs + " has been saved",
    });
  });
});

app.post("/api/login", (req, res) => {
  //mock user
  let user = req.body.username;
  let pass = req.body.password;

  User.findOne(
    { username: user, password: pass },
    async function (error, docs) {
      if (error) console.log(err);
      if (docs == null) {
        res.json({
          message: "Wrong Username or Password",
          data: docs,
        });
      } else {
        if (docs.password == pass) {
          let payload = {
            user,
            id: docs._id,
          };
          let token = await jwt.sign(payload, "secretkey");
          docs.token = token;
          res.json({
            docs,
            token,
          });
        } else {
          res.json({
            message: "server error",
          });
        }
      }
    }
  );
});

//format of token

//verify token
function verifytoken(req, res, next) {
  //GET Auth Header value
  const bearerHeader = req.headers["authorization"];
  //check if bearer is undefined
  if (typeof bearerHeader !== "undefined") {
    //split at the space
    const bearer = bearerHeader.split(" ");
    //Get Token from Array
    const bearerToken = bearer[1];

    //set the token
    req.token = bearerToken;

    //next Middleware
    next();
  } else {
    //forbidden
    res.sendStatus(403);
  }
}

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname + "/dist/client/index.html"));
});
app.listen(process.env.PORT);
