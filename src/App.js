import "./App.css";
import JSONDATA from "./MOCK_DATA.json";
import { useEffect, useRef, useState } from "react";

function App() {
  const [inputData, setInputData] = useState("");
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(0);
  
  const containerRef = useRef(null);

  const getTheInputHandler = (e) => {
    setInputData(e.target.value);
   
  };

  useEffect(() => {
    const data = JSONDATA.filter((item) => item.first_name.toLowerCase().startsWith((inputData.toLowerCase())));
    setItems(data);
    console.log("data", data);
  }, [inputData])
  
  const  scrollSelectedItemIntoView = () => {
    if(containerRef.current && items[selectedItem]){
      const selectedItemElement = containerRef.current.children[selectedItem];
      selectedItemElement.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  };
  const handleByKey = (e) => {
    if(e.key === 'ArrowUp' && selectedItem>0){
      console.log("arrowUp");
      setSelectedItem(selectedItem - 1);
      scrollSelectedItemIntoView();
    }else if(e.key === 'ArrowDown' && selectedItem < items.length -1){
      console.log("arrowDown");
      setSelectedItem(selectedItem + 1);
      scrollSelectedItemIntoView();
    }
  }


  
  return (
    <div className="App" >
      <input type="text" onChange={getTheInputHandler}/>
       {inputData && (
        <div ref={containerRef} className="item-container">
        {items.map((item, index) => (
        <div key={item.id}>
          <span onKeyDown={handleByKey} tabIndex={0} className={selectedItem === index ? "selected" : "" }>{item.first_name}</span>
        </div>
        ))}
        </div>
       )}
    </div>
  );
}

export default App;
