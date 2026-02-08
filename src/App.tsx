import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Homepage from "./components/Homepage";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* Plads til wrappers */}
        <Homepage />
      </header>
    </div>
  );
}

export default App;
