import React from "react";
import { BrowserRouter as Router, Route , Switch} from 'react-router-dom';
import Products from "./components/Products";
import DetailProduct from './components/Details';
import Header from './components/Header';
import "./App.scss";

function App() {

  return (
    <div className="App">      
      <Router>
        <Switch>
          <Route exact path="/">
            <Header />            
          </Route>
          <Route exact path="/items/search">
            <Header />
            <Products />
          </Route>
          <Route exact path="/items/:id">
            <Header />
            <DetailProduct />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
