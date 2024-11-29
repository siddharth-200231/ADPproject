import React, { useEffect, useState } from "react";
import axios from "axios";

const Navbar = ({ onSelectCategory, onSearch }) => {
  const getInitialTheme = () => {
    const storedTheme = localStorage.getItem("theme");
    return storedTheme ? storedTheme : "light-theme";
  };

  const [selectedCategory, setSelectedCategory] = useState("");
  const [theme, setTheme] = useState(getInitialTheme());
  const [input, setInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async (value) => {
    try {
      const response = await axios.get("http://localhost:8080/api/products");
      setSearchResults(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleChange = async (value) => {
    setInput(value);
    if (value.length >= 1) {
      setShowSearchResults(true);
      try {
        const response = await axios.get(
          `http://localhost:8080/api/products/search?keyword=${value}`
        );
        setSearchResults(response.data);
        setNoResults(response.data.length === 0);
      } catch (error) {
        console.error("Error searching:", error);
      }
    } else {
      setShowSearchResults(false);
      setSearchResults([]);
      setNoResults(false);
    }
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    onSelectCategory(category);
  };

  const toggleTheme = () => {
    const newTheme = theme === "dark-theme" ? "light-theme" : "dark-theme";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const categories = [
    "Laptop",
    "Headphone",
    "Mobile",
    "Electronics",
    "Toys",
    "Fashion",
  ];

  return (
    <>
      <header>
        <nav
          className={`navbar navbar-expand-lg fixed-top ${
            theme === "dark-theme" ? "bg-dark text-light" : "bg-light text-dark"
          } shadow-sm`}
        >
          <div className="container-fluid">
            <a className="navbar-brand fw-bold" href="/">
              <i className="bi bi-house-door-door"></i> Telusko
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="/">
                    Home
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/add_product">
                    Add Product
                  </a>
                </li>

                {/* Categories Dropdown */}
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="/"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Categories
                  </a>
                  <ul className="dropdown-menu">
                    {categories.map((category) => (
                      <li key={category}>
                        <button
                          className="dropdown-item"
                          onClick={() => handleCategorySelect(category)}
                        >
                          {category}
                        </button>
                      </li>
                    ))}
                  </ul>
                </li>
              </ul>

              {/* Theme Toggle Button */}
              <button
                className="btn theme-btn border-0 bg-transparent d-flex align-items-center ms-3"
                onClick={toggleTheme}
              >
                {theme === "dark-theme" ? (
                  <i className="bi bi-moon-fill text-dark fs-4"></i>
                ) : (
                  <i className="bi bi-sun-fill text-warning fs-4"></i>
                )}
              </button>

              {/* Cart & Search Section */}
              <div className="d-flex align-items-center ms-auto">
                <a
                  href="/cart"
                  className="nav-link text-dark d-flex align-items-center me-3"
                  style={{ fontSize: "1rem" }}
                >
                  <i className="bi bi-cart me-2"></i>
                  Cart
                </a>

                {/* Search Input */}
                <div className="position-relative">
                  <input
                    className="form-control rounded-pill ps-4"
                    type="search"
                    placeholder="Search Products"
                    aria-label="Search"
                    value={input}
                    onChange={(e) => handleChange(e.target.value)}
                    onFocus={() => setSearchFocused(true)}
                    onBlur={() => setSearchFocused(false)}
                    style={{
                      maxWidth: "300px",
                      transition: "width 0.3s ease-in-out",
                    }}
                  />
                  {showSearchResults && (
                    <ul className="list-group position-absolute w-100 mt-1 bg-white shadow-sm rounded-3">
                      {searchResults.length > 0 ? (
                        searchResults.map((result) => (
                          <li key={result.id} className="list-group-item">
                            <a
                              href={`/product/${result.id}`}
                              className="search-result-link text-decoration-none"
                            >
                              {result.name}
                            </a>
                          </li>
                        ))
                      ) : (
                        noResults && (
                          <li className="list-group-item text-muted">
                            No products found
                          </li>
                        )
                      )}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
