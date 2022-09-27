import React from "react";
import logo from "./logo.svg";
import "./App.css";

// HEY!
// TURN STRICT MODE BACK ON!
// I DON"T KNOW WHY< BUT DO IT!

function App() {
  const [data, setData] = React.useState(null);

  // there is a new "feature" in react v18 whereby useEffect runs 2x
  // when in dev mode with StrictMode turned on. it's intentional. i don't understand it.
  // when you build and deploy it stops happening. but it's a problem when you do things like
  // seed data in your useEffect. or do inserts. or whatever. 
  // hence StrictMode is disabled whilst i.b. dev'ing.
  
  React.useEffect(() => {
    fetch("/api/clients")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setData(data.message)
      })
        ;
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>{!data ? "Loading..." : data}</p>
      </header>
    </div>
  );
}

export default App;