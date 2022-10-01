import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from "react-router-dom";
import "./App.css";
import "./styles/style.css";
import Dashboard from "./components/pages/Dashboard";
import Clients from "./components/pages/Clients";
import Projects from "./components/pages/Projects";
import Client from "./components/pages/Client";

// HEY!
// TURN STRICT MODE BACK ON!
// I DON"T KNOW WHY < BUT DO IT!

function App() {

  return (
    <BrowserRouter>
      <div className="App">
        <nav className="app-nav">
          <ul className="app-nav-list">
            <li className="app-nav-item">
              <Link to="/">dashboard</Link>
            </li>
            <li className="app-nav-item">
              <Link to="/clients">clients</Link>
            </li>
            <li className="app-nav-item">
              <Link to="/client">client</Link>
            </li>
            <li className="app-nav-item">
              <Link to="/projects">projects</Link>
            </li>
            <li className="app-nav-item">
              <Link to="/tasks">tasks</Link>
            </li>
            <li className="app-nav-item">
              <Link to="/invoices">invoices</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          {/* <Route path="/about" /> */}
          <Route path="/clients" element={<Clients />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/client/:id" element={<Client />} />
          <Route path="/client" element={<Client />} />
          <Route path="/" element={<Dashboard />} />
        </Routes>

      </div>
    </BrowserRouter>
  );
}

export default App;