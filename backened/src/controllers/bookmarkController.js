const bookModel = require("../models/bookModels");
const userModel = require("../models/userModels");
const fs= require('fs')
const path= require('path')

const addBook = (req, res, next) => {
  const { book_name, author_name, total_books, user_id } = req.body;
  const { book_cover } = req.files;

  book_cover.mv(path.resolve(__dirname,"../../public/img",book_cover.name),(err=>{
    if(!err){
      const newBook = new bookModel({
        book_name,
        author_name,
        total_books,
        book_cover: book_cover.name,
        user_id,
      });
      newBook
        .save()
        .then((onSave) => {
          console.log("onsave", onSave);
        })
        .catch((onerror) => {
          console.log("onError", onerror);
        });
    
    }
  }))


  res.send(JSON.stringify({ data: "ok ok" }));
};

const deleteBook = (req, res) => {
  console.log(req.body)
  bookModel.findOneAndDelete({ _id: req.body._id }).then(onDelete => {
    console.log("on Delete", onDelete);
    let oldImgPath= path.resolve(__dirname,"../../public/img",onDelete.book_cover)
    fs.unlinkSync(oldImgPath)
  }).catch(onError => { console.log("onError ", onError) })
  res.send(JSON.stringify({ data: "ok" }));
};
const editBook = (req, res) => {
  const { book_cover } = req.files
  console.log(req.body)
  bookModel.findOneAndUpdate({ _id: req.body.book_id }, {
    $set: {
      book_name: req.body.book_name,
      total_books: req.body.total_books, book_cover: book_cover.name
    }
  }).then(onUpdate => {
    console.log("on Update ", onUpdate)
    let oldImage= path.resolve(__dirname,"../../public/img",onUpdate.book_cover);
    fs.unlinkSync(oldImage)
    book_cover.mv(path.resolve(__dirname,"../../public/img",book_cover.name),(ifNoError=>{
      if(ifNoError){
        console.log("updated image moved to server")
      }
    }))
  }).catch(onError => { console.log("on error ", onError) })

  res.send(JSON.stringify({ data: "ok" }));
};
const getBooks = (req, res) => {
  bookModel
    .find({})
    .then((onResults) => {
      onResults.map(book=>{
        let bookCover= book.book_cover
        book.book_cover="http://localhost:3001/"+"img/"+bookCover
      })
      res.send(JSON.stringify({ status: 200, data: onResults }));
    })
    .catch((onError) => {
      console.log("onError ", onError);
      res.send(JSON.stringify({ status: 400, data: null }));
    });
};
module.exports = { addBook, deleteBook, editBook, getBooks };
