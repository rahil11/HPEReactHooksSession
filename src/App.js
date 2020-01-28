import React from "react";
import "./App.css";
import Posts from "./components/Context/Posts";
import Header from "./components/Context/Header";

function App() {
  const currentUser = {
    id: 1,
    name: "Raja"
  };

  return (
    <div className="App">
      <Header user={currentUser} />
      <Posts user={currentUser} />
    </div>
  );
}

export default App;
