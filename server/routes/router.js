module.exports = (app) => {
  const cors = require("cors");
  const bodyParser = require("body-parser");
  const mongoose = require("mongoose");
  const express = require("express");
  mongoose.connect(
    "mongodb+srv://afosh:afosh123@cluster0.dignc.mongodb.net/bookz?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    () => console.log("connected to the database")
  );
  const userSchema = new mongoose.Schema({
    name: String,
    password: String,
  });

  const User = mongoose.model("User", userSchema);

  const bookSchema = new mongoose.Schema({
    bookName: String,
    author: String,
  });

  const Book = mongoose.model("Book", bookSchema);
  app.use(cors());

  app.use(bodyParser.urlencoded({ extended: true }));

  // parse application/json
  app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  );
  app.use(express.urlencoded({ extended: true }));
  app.get("/api/books", (req, res) => {
    Book.find((error, result) => {
      if (error) res.send(error);
      res.json(result);
    });
  });

  app.post("/api/book", (req, res) => {
    let name = req.body.name;
    let author = req.body.author;

    let data = new Book({
      bookName: name,
      author,
    });
    console.log(req.body.name);
    res.send(data);
    /*
    data.save((err, result) => {
      if (err) res.send(err);
      res.send(`${result} : has been saved successfully`);
    });
    */
  });
};
