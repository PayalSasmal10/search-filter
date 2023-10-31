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
    console.log("selectedItem", selectedItem);
    setSelectedItem(0);

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
        behavior: "auto",
        block: "end",
        inline: "end"
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

   const selectItemsToInputField = (index) => {
    setSelectedItem(index)
    const selectedTextedValue = items[index].first_name;
    setInputData(selectedTextedValue);
   }  

  
  return (
    <div className="App" >
      <input type="text" onChange={getTheInputHandler} value={inputData}/>
       {inputData && selectedItem === 0 &&(
        <div ref={containerRef} className="item-container">
        {items.map((item, index) => (
        <div key={item.id}>
          <span onKeyDown={handleByKey} tabIndex={0} className={selectedItem === index ? "selected" : "" }>
            <span className="items" onClick={() => selectItemsToInputField(index)}>
            {item.first_name}</span>
            </span>
        </div>
        ))}
        </div>
       )}
    </div>
  );
}

export default App;
