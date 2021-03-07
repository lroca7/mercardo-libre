import React, { useState, useEffect, useReducer,
   useMemo, useRef, useCallback } from "react";

import './Products.scss'

import { useHistory } from "react-router-dom";


const API = 'https://api.mercadolibre.com/sites/MLA/search?q=iphone'

const Products = (props) => {

  debugger
  let history = useHistory();

  const [characters, setCharacters] = useState([]);
  const [search, setSearch] = useState("");
  const searchInput = useRef(null);

  useEffect(() => {
    debugger
    fetch(API)
      .then((response) => response.json())
      .then((data) => setCharacters(data.results));
  }, []);


  const handleSearch = (event) => {
    setSearch(searchInput.current.value);
  };


  const filteredUsers = characters.filter((user) => {
    return user.title.toLowerCase().includes(search.toLocaleLowerCase())
  })

  const handleDetailProduct = (product) => {
     history.push(`items/${product.id}`);
  }


  return (
    <>
      {/* <div className="top">
        <img src={logo} alt="logo-producto"></img>
        <div className="search">
          <input type="text" value={search} ref={searchInput} onChange={handleSearch}></input>
          <button type="button" className="btn-default">Buscar</button>
        </div>
      </div> */}
      
      <div className="products">
        PRODUCTOS AQUI
        {filteredUsers.map((product) => (
          <div key={product.id} className="card" onClick={() => handleDetailProduct(product)}>
            <img src={product.thumbnail} alt="product_logo" />
            <div className="product-info">
              
                <h2>$ {product.price}</h2>
                
              
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
