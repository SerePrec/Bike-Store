import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import Home from "./pages/Home";
import Footer from "./components/Footer";
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
    <div className="App">
      <Header />
      <Home dollar={dollar} />
      <Footer />
    </div>
  );
}

export default App;
