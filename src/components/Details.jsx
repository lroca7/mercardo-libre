import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";


const API = "https://api.mercadolibre.com/items/";

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
    <div className="detail-product">
      <h2>{product.title}</h2>
      <h1>$ {product.price}</h1>
      <button class="btn-buy">Comprar</button>
    </div>
    </>
  );
};

export default DetailProduct;
