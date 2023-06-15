const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/apiDB");

const articleSchema = {
  title: String,
  content: String,
};

const Article = mongoose.model("Article", articleSchema);

// ------- Requests Targeting All Articles -------
app
  .route("/articles")

  .get(function (req, res) {
    Articles.find(function (e, foundArticles) {
      res.send(e ? e : foundArticles);
    });
  })

  .post(function (req, res) {
    const newArticle = new Article({
      title: req.body.title,
      content: req.body.content,
    });

    newArticle.save(function (e) {
      res.send(e ? e : "Sucessfully added a new article.");
    });
  })

  .delete(function (req, res) {
    Article.deleteMany(function (e) {
      res.send(e ? e : "Sucessfully deleted all atricles.");
    });
  });

// ------- Requests Targeting Specific Article -------
app
  .route("/articles/:articleTitle")
  .get(function (req, res) {
    Article.findOne(
      { title: req.params.articleTitle },
      function (e, foundArticle) {
        res.send(
          foundArticle
            ? foundArticle
            : "No atricle mattching that title was found."
        );
      }
    );
  })

  .put(function (req, res) {
    Article.UpdateOne(
      { title: req.params.articleTitle },
      { $set: { title: req.body.title, content: req.body.content } },
      { overwrite: true },
      function (e) {
        res.send(e ? e : "Sucessfully updated the article.");
      }
    );
  })

  .patch(function (req, res) {
    Article.UpdateOne(
      { title: req.params.articleTitle },
      { $set: req.body },
      function (e) {
        res.send(e ? e : "Sucessfully updated the article.");
      }
    );
  })

  .delete(function (req, res) {
    Article.deleteOne({ title: req.params.articleTitle }, function (e) {
      res.send(e ? e : "Sucessfully deleted the corresponding article.");
    });
  });

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
