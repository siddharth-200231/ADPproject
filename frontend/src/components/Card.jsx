import React from 'react';
import { Link } from 'react-router-dom';
import unplugged from '../assets/unplugged.png';

const Card = ({ product, addToCart }) => {
  const { id, brand, name, price, available, imageUrl } = product;

  return (
    <div
      className="card mb-3"
      style={{
        width: "100%",
        height: "auto",
        boxShadow: "0 0.4rem 0.8rem rgba(0,0,0,0.1)",
        borderRadius: "0.8rem",
        overflow: "hidden",
        backgroundColor: "#fff",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        position: "relative",
        transition: "transform 0.3s, box-shadow 0.3s ease-in-out",
        cursor: "pointer",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.05)";
        e.currentTarget.style.boxShadow = "0 8px 16px rgba(0, 0, 0, 0.2)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
        e.currentTarget.style.boxShadow = "0 0.4rem 0.8rem rgba(0, 0, 0, 0.1)";
      }}
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
            src={imageUrl || unplugged} // Default to placeholder if no image
            alt={name}
            style={{
              width: "100%",
              height: "12rem",
              objectFit: "cover",
              transition: "transform 0.3s ease-in-out",
              borderBottom: "1px solid #eee",
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
                textTransform: "uppercase",
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
            padding: "1.5rem",
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
                textTransform: "uppercase",
                letterSpacing: "1px",
              }}
            >
              {name}
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
              padding: "0.8rem 1.5rem",
              backgroundColor: available ? "#28a745" : "#6c757d", // Green for available, gray for out of stock
              color: "#fff",
              borderRadius: "0.5rem",
              border: "none",
              cursor: available ? "pointer" : "not-allowed",
              fontWeight: "600",
              fontSize: "1rem",
              transition: "background-color 0.3s, transform 0.3s ease-in-out",
            }}
            onClick={(e) => {
              e.preventDefault();
              if (available) {
                addToCart(product);
              }
            }}
            disabled={!available} // Disable if product is not available
          >
            {available ? "Add to Cart" : "Out of Stock"}
          </button>
        </div>
      </Link>
    </div>
  );
};

export default Card;
