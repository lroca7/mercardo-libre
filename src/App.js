import React, { useState, useEffect, useReducer,
  useMemo, useRef, useCallback } from "react";

import { BrowserRouter as Router, Route , Switch} from 'react-router-dom';
import Products from "./components/Products";
import "./App.scss";
import DetailProduct from './components/Details';
import Header from './components/Header';



function App() {


  return (
    <div className="App">
      
      <Router>
        <Switch>
          <Route exact path="/">
            <Header />            
          </Route>
          <Route exact path="/search">
            <Products />
          </Route>
          <Route exact path="/items/:id">
            <DetailProduct />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
