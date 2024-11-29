import React, { useContext } from "react";
import { RestaurantsContext } from "../context/RestaurantsContext";
import "./Header.css";

const Header = () => {
  const { setSearchQuery } = useContext(RestaurantsContext);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value); // Update search query context
  };

  return (
    <header className="header">
      <div className="logo">Foodie Finds</div>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for restaurants..."
          onChange={handleSearch} // Dynamically update search query
        />
      </div>
      <div className="auth-buttons">
        <button>Login</button>
        <button>Sign Up</button>
      </div>
    </header>
  );
};

export default Header;
