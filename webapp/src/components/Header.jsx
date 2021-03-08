


import React, { useState, useRef } from "react";



import logo from "../Assets/Logo_ML.png"

import { useHistory } from "react-router-dom";

const Header = (props) => {

  let history = useHistory();

  const [search, setSearch] = useState("");
  const searchInput = useRef(null);

  const handleChange = (event) => {
    setSearch(searchInput.current.value);
  };

  const handleSearch = (event) => {
    history.push({
      pathname: '/items/search',
      search: '?q='+search
  });
  };

  const goHome = () => {
    history.push('/');
  }

  return (
    <div className="top">
        <img src={logo} alt="logo-producto" onClick={goHome}></img>
        <div className="search">
          <input type="text" value={search} ref={searchInput} onChange={handleChange}></input>
          <button type="button" className="btn-default" onClick={handleSearch}>Buscar</button>
        </div>
      </div>
  );
};

export default Header;
