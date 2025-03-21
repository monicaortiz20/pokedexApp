import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Login from "./pages/Login";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route>
          <Login />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
