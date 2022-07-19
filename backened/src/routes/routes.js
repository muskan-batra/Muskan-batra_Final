const express = require("express");
const bookRoutes = express();
const bookController = require("../controllers/bookController");
const authMiddleWare = require("../middlewares/authenticationMiddleWare");

bookRoutes.post(
  "/addBook",
  authMiddleWare.isAuthenticatedWithToken,
  bookController.addBook
);
bookRoutes.post("/bookmark", bookController.bookmark);
bookRoutes.post("/view bookmark", bookController.viewbookmark);
bookRoutes.get("/home", bookController.home);

module.exports = bookRoutes;
