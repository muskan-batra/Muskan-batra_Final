import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import apiRequest from "../apiCalls/apiRequest";
import Header from "../components/header";

const ViewBooks = () => {
  const [books, setBooks] = useState([]);
  const navigate= useNavigate()
  useEffect(() => {
    //fetch books
    const fetchBooks = async () => {
      const token = await localStorage.getItem("token");
      const response = await apiRequest("getBooks", "GET", "JSON", null, token);
      if (response.status == 200) {
        setBooks(response.data);
        console.log(response.data)
      }
    };
    fetchBooks();
  }, []);
  const handleEditBookClick = async (book) => {
   navigate("/editBook",{state:{book}})
  };
  const handleDeleteBookClick = async(_id) => {
    let token = localStorage.getItem("token");
    const response= await apiRequest("deleteBook","POST","JSON",{_id},token);
   window.location.reload()
    console.log(response)
  };
  return (
    <div style={{ width: "100%" }}>
      <Header />
      <table border={"solid 2px"} style={{ margin: "auto", padding: 10 }}>
        <thead>
          <th>Book name</th>
          <th>Author name</th>
          <th>Available books</th>
          <th>Book image</th>
          <th>Edit</th>
          <th>Delete</th>
        </thead>
        <tbody>
          {books.map((book) => {
            return (
              <tr key={book._id}>
                <td>{book.book_name}</td>
                <td>{book.author_name}</td>
                <td>{book.total_books}</td>
                <td>
                  <img src={book.book_cover} height={100} width={100}></img>
                </td>
                <td>
                  <button
                    style={{ color: "blue" }}
                    onClick={() => handleEditBookClick(book)}
                  >
                    Edit
                  </button>
                </td>
                <td>
                  <button
                    style={{ color: "red" }}
                    onClick={() => handleDeleteBookClick(book._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ViewBooks;
