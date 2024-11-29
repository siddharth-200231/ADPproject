import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import AppContext from "../Context/Context";
import unplugged from "../assets/unplugged.png";

const Home = ({ selectedCategory }) => {
  const { data, isError, addToCart, refreshData } = useContext(AppContext);
  const [products, setProducts] = useState([]);

  // Fetch products and images only when data is available
  useEffect(() => {
    if (data && data.length > 0) {
      const fetchImagesAndUpdateProducts = async () => {
        const updatedProducts = await Promise.all(
          data.map(async (product) => {
            try {
              const response = await axios.get(
                `http://localhost:8080/api/product/${product.id}/image`,
                { responseType: "blob" }
              );
              const imageUrl = URL.createObjectURL(response.data);
              return { ...product, imageUrl };
            } catch (error) {
              console.error(
                "Error fetching image for product ID:",
                product.id,
                error
              );
              return { ...product, imageUrl: unplugged }; // Fallback to placeholder image
            }
          })
        );
        setProducts(updatedProducts);
      };

      fetchImagesAndUpdateProducts();
    }
  }, [data]);

  // Filter products by selected category
  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category === selectedCategory)
    : products;

  // Error handling
  if (isError) {
    return (
      <h2 className="text-center" style={{ padding: "18rem" }}>
        <img src={unplugged} alt="Error" style={{ width: "6rem", height: "6rem" }} />
        <p>There was an error fetching products.</p>
      </h2>
    );
  }

  // Loading or empty state
  if (!data || products.length === 0) {
    return (
      <div className="text-center" style={{ marginTop: "4rem" }}>
        <img src={unplugged} alt="No Products" style={{ width: "6rem", height: "6rem" }} />
        <p>No Products Available</p>
      </div>
    );
  }

  return (
    <>
      <div
        className="grid"
        style={{
          marginTop: "4rem",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(16rem, 1fr))",
          gap: "2rem",
          padding: "2rem",
        }}
      >
        {filteredProducts.length === 0 ? (
          <h2
            className="text-center"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "1.5rem",
            }}
          >
            No Products Available
          </h2>
        ) : (
          filteredProducts.map((product) => {
            const { id, brand, name, price, available, imageUrl } = product;

            // Card style for product display
            const cardStyle = {
              width: "100%",
              height: "auto",
              boxShadow: "0 0.4rem 0.8rem rgba(0,0,0,0.1)",
              borderRadius: "0.8rem",
              overflow: "hidden",
              backgroundColor: available ? "#fff" : "#e0e0e0", // Use available instead of productAvailable
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              position: "relative",
              transition: "transform 0.3s, box-shadow 0.3s",
            };

            return (
              <div
                className="card mb-3"
                style={cardStyle}
                key={id}
              >
                <Link
                  to={`/product/${id}`}
                  style={{
                    textDecoration: "none",
                    color: "inherit",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <div style={{ position: "relative", overflow: "hidden" }}>
                    <img
                      src={imageUrl}
                      alt={name}
                      style={{
                        width: "100%",
                        height: "12rem",
                        objectFit: "cover",
                        transition: "transform 0.3s ease-in-out",
                      }}
                    />
                    {!available && ( // Display "Out of Stock" only when available is false
                      <div
                        style={{
                          position: "absolute",
                          top: "0",
                          left: "0",
                          right: "0",
                          bottom: "0",
                          backgroundColor: "rgba(0, 0, 0, 0.5)",
                          color: "#fff",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          fontSize: "1.4rem",
                          fontWeight: "bold",
                        }}
                      >
                        OUT OF STOCK
                      </div>
                    )}
                  </div>

                  <div
                    className="card-body"
                    style={{
                      flexGrow: 1,
                      padding: "1rem",
                      paddingTop: "1.5rem",
                      textAlign: "center",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                    }}
                  >
                    <div>
                      <h5
                        className="card-title"
                        style={{
                          margin: "0 0 1rem 0",
                          fontSize: "1.2rem",
                          fontWeight: "600",
                          color: "#333",
                        }}
                      >
                        {name.toUpperCase()}
                      </h5>
                      <i
                        className="card-brand"
                        style={{
                          fontStyle: "italic",
                          fontSize: "0.9rem",
                          color: "#777",
                        }}
                      >
                        {"~ " + brand}
                      </i>
                    </div>
                    <hr className="hr-line" style={{ margin: "1rem 0" }} />
                    <div className="home-cart-price">
                      <h5
                        className="card-text"
                        style={{
                          fontWeight: "600",
                          fontSize: "1.1rem",
                          marginBottom: "0.5rem",
                          color: "#333",
                        }}
                      >
                        <i className="bi bi-currency-rupee"></i>
                        {price}
                      </h5>
                    </div>
                    <button
                      className="btn-hover color-9"
                      style={{
                        marginTop: "1rem",
                        padding: "0.6rem 1.5rem",
                        backgroundColor: "#007bff",
                        color: "#fff",
                        borderRadius: "0.5rem",
                        border: "none",
                        cursor: "pointer",
                        transition: "background-color 0.3s",
                      }}
                      onClick={(e) => {
                        e.preventDefault();
                        addToCart(product);
                      }}
                      disabled={!available} // Disable if product is not available
                    >
                      {available ? "Add to Cart" : "Out of Stock"}
                    </button>
                  </div>
                </Link>
              </div>
            );
          })
        )}
      </div>
    </>
  );
};

export default Home;
