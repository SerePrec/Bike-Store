import React from "react";
import "./App.scss";
import NavBar from "./components/NavBar/NavBar";

function App() {
  return (
    <div className="App">
      <header>
        <NavBar />
      </header>
      <main>
        <h2 className="text-center mt-5">Nuestros Productos Destacados</h2>
      </main>
    </div>
  );
}

export default App;
