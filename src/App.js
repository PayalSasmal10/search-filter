import logo from "./logo.svg";
import "./App.css";
import JSONDATA from "./MOCK_DATA.json";
import { useState } from "react";

function App() {
  const [searchTerm, setSearchTerm] = useState('');

  const typingChangeHandler = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="App">
      <input type="text" placeholder="search..." onChange={typingChangeHandler}/>
      {JSONDATA.filter((val) => {
        if(searchTerm === ""){
          return val;
        }else if(val.first_name.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase())){
          return val;
        }
      }).map((val, key) => {
        return (
          <div className="user">
            <p>{val.first_name}</p>
          </div>
        );
      })}
    </div>
  );
}

export default App;
