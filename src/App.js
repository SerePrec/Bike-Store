import React from "react";
import "./App.scss";
import Footer from "./components/Footer/Footer";
import NavBar from "./components/NavBar/NavBar";

function App() {
  return (
    <div className="App">
      <header>
        <NavBar />
      </header>
      <main>
        <h2 className="text-center mt-5" style={{ height: 700 }}>
          Nuestros Productos Destacados
        </h2>
      </main>
      <Footer />
    </div>
  );
}

export default App;
