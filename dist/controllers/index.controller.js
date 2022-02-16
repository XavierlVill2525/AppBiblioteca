"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderNewEntryPage = exports.renderIndexPage = exports.renderAboutPage = exports.deleteBook = exports.createNewEntry = void 0;

var _config = _interopRequireDefault(require("../config"));

var _fs = _interopRequireDefault(require("fs"));

var _uuid = require("uuid");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var json_books = _fs["default"].readFileSync("src/books.json", "utf-8");

var books = JSON.parse(json_books);

var renderIndexPage = function renderIndexPage(req, res) {
  return res.render("index", {
    books: books
  });
};

exports.renderIndexPage = renderIndexPage;

var renderAboutPage = function renderAboutPage(req, res) {
  return res.render("about", _config["default"]);
};

exports.renderAboutPage = renderAboutPage;

var renderNewEntryPage = function renderNewEntryPage(req, res) {
  return res.render("new-entry");
};

exports.renderNewEntryPage = renderNewEntryPage;

var createNewEntry = function createNewEntry(req, res) {
  var _req$body = req.body,
      title = _req$body.title,
      author = _req$body.author,
      image = _req$body.image,
      description = _req$body.description;

  if (!title || !author || !image || !description) {
    res.status(400).send("Entries must have a title and body");
    return;
  }

  var newBook = {
    id: (0, _uuid.v4)(),
    title: title,
    author: author,
    image: image,
    description: description
  }; // add a new book to the array

  books.push(newBook); // saving the array in a file

  var json_books = JSON.stringify(books);

  _fs["default"].writeFileSync("src/books.json", json_books, "utf-8");

  res.redirect("/");
};

exports.createNewEntry = createNewEntry;

var deleteBook = function deleteBook(req, res) {
  console.log({
    books: books
  });
  books = books.filter(function (book) {
    return book.id != req.params.id;
  }); // saving data

  var json_books = JSON.stringify(books);

  _fs["default"].writeFileSync("src/books.json", json_books);

  res.redirect("/");
};

exports.deleteBook = deleteBook;