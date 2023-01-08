import logo from "./logo.svg";
import "./App.css";
import JSONDATA from "./MOCK_DATA.json";

function App() {
  return (
    <div className="App">
      <input type="text" placeholder="search..." />
      {JSONDATA.map((val, key) => {
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
