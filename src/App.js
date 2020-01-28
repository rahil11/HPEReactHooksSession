import React from "react";
import "./App.css";
import Posts from "./components/Context/Posts";
import Header from "./components/Context/Header";

export const UserContext = React.createContext({});

function App() {
  const currentUser = {
    id: 1,
    name: "Raja"
  };
  return (
    <div className="App">
      <UserContext.Provider value={currentUser}>
        <Header user={currentUser} />
        <Posts user={currentUser} />
      </UserContext.Provider>
    </div>
  );
}

export default App;
