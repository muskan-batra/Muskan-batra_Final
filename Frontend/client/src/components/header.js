import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("token") !== undefined) {
      setIsLoggedIn(true);
    }
  }, []);
  return (
    <div>
      <nav
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "space-around",
          paddingTop: "20px",
          paddingBottom: "20px",
          backgroundColor: "lightcyan",
        }}
      >
        {isLoggedIn && <Link to="/">Bookmark app</Link>}
        {!isLoggedIn && <Link to="/login">Login</Link>}
        {!isLoggedIn && <Link to="/register">Register</Link>}
        {/* {isLoggedIn && <Link to="/addBook">Add Book</Link>}
        {isLoggedIn && <Link to="/viewBooks">View Books</Link>}
        {isLoggedIn && <button type="button">logout</button>} */}
      </nav>
    </div>
  );
};

export default Header;
