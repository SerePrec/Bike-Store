import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Category from "./pages/Category";
import Error404 from "./pages/Error404";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./pages/Home";
import ItemDetailContainer from "./pages/ItemDetailContainer";
import "./App.scss";

import { URLDOLAR, dolarOficial } from "./services/dolar";

function App() {
  const [dollar, setDollar] = useState(null);

  useEffect(() => {
    window
      .fetch(URLDOLAR)
      .then(res => res.json())
      .then(data => setDollar(dolarOficial(data)))
      .catch(err => console.log(err));
    return () => {
      //cleanup
    };
  }, []);

  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/">
          <Home dollar={dollar} />
        </Route>
        <Route exact path="/category/:id">
          <Category />
        </Route>
        <Route exact path="/item/:id">
          <ItemDetailContainer />
        </Route>
        <Route path="*">
          <Error404 />
        </Route>
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
