const mongoose = require("mongoose");

const bookSchema = mongoose.Schema({
  user_id: { required: true, type: mongoose.Types.ObjectId, ref: "user" },
  book_name: { type: String, required: true },
  book_cover: { type: String, required: true },
  author_name: { type: String, required: true },
  total_books: { type: Number, required: true },
});

const bookModel = mongoose.model("books", bookSchema);
module.exports = bookModel;
