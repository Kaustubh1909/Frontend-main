import axios from "axios";
import styles from "./AddProduct.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddProduct = (props) => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState("");
  const [price, setPrice] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    // Check if any field is empty
    if (!name || !category || !stock || !price) {
      setError("Error: All fields must be filled");
      return;
    }

    setError(""); // Clear any previous error

    const data = { name, category, stock, price };
    axios.post("https://inventory-backend-6068.onrender.com/dashboardRoute/create-item", data)
      .then((res) => {
        if (res.status === 200) {
          alert("Record added Successfully");
          navigate("/user");
        } else {
          Promise.reject();
        }
      })
      .catch((err) => {
        if (err.response && err.response.status === 409) {
          setError("Error: Item already exists");
        } else {
          setError("An error occurred. Please try again.");
        }
      });

    event.target.reset();
  };

  return (
    <div className={styles.add_product_wrap}>
      <span className={styles.header}>Add Product</span>
      {error && <div className={styles.error_message}>{error}</div>}
      <form className={styles.add_product_form} onSubmit={handleSubmit}>
        <div className={styles.input_wrap}>
          <div className={styles.field_wrap}>
            <label>Name</label>
            <input
              type="text"
              pattern="^[a-zA-Z]+$"
              placeholder="Enter the product name"
              onChange={(event) => setName(event.target.value)}
              value={name}
              required
            />
          </div>
          <div className={styles.field_wrap}>
            <label>Category</label>
            <select
              onChange={(event) => setCategory(event.target.value)}
              value={category}
              required
            >
              <option value="" disabled>Select a category</option>
              <option value="Grocery">Grocery</option>
              <option value="Electronics">Electronics</option>
              <option value="Sports">Sports</option>
              <option value="Furniture">Furniture</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>
        <div className={styles.input_wrap}>
          <div className={styles.field_wrap}>
            <label>Stock</label>
            <input
              type="number"
              placeholder="Enter the quantity"
              onChange={(event) => setStock(event.target.value)}
              value={stock}
              required
            />
          </div>
          <div className={styles.field_wrap}>
            <label>Price</label>
            <input
              type="number"
              min="1"
              max="999"
              placeholder="Enter the price"
              onChange={(event) => setPrice(event.target.value)}
              value={price}
              required
            />
          </div>
        </div>
        <button className={styles.add_product_button} type="submit">
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
