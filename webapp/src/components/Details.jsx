import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

// const API = "https://api.mercadolibre.com/items/";
const API = "http://localhost:3000/api/items/";

const DetailProduct = (props) => {
  const { id } = useParams();
  const [product, setProduct] = useState({});

  useEffect(() => {
    fetch(API + id)
      .then((response) => response.json())
      .then((data) => setProduct(data));
  }, [id]);

  return (
    <>
      <div className="product">
        {product.item && (
          <>
            <div className="info-product">
              <img src={product.item.picture} alt="product_logo" />
              <div className="detail-product">
                <h2>{product.item.title}</h2>
                <h1>$ {product.item.price.amount}</h1>
                <button className="btn-buy">Comprar</button>
              </div>
            </div>
            <div className="product-description">
              <h2>Descripción del producto</h2>
              <p className="regular-text">{product.description}</p>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default DetailProduct;
