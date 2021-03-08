import React, {
  useState,
  useEffect
} from "react";

import "./Products.scss";

import { useHistory } from "react-router-dom";

const API = 'http://localhost:3000/api/items';

const Products = (props) => {
  
  let history = useHistory();

  const [characters, setCharacters] = useState([]);
  

  useEffect(() => {
    const query = history.location.search;
    const url = API + query;
    if (query) {
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          setCharacters(data.items)
        });
    }
  }, [history.location.search]);


  const handleDetailProduct = (product) => {
    history.push(`/items/${product.id}`);
  };

  return (
    <>
      <div className="products">
        {characters.map((product) => (
          <div
            key={product.id}
            className="card"
            onClick={() => handleDetailProduct(product)}
          >
            <img src={product.picture} alt="product_logo" />
            <div className="product-info">
              <h2>$ {product.price.amount}</h2>

              <p>{product.title}</p>
            </div>
            <div className="address">
              <p>{product.address.state_name}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Products;
