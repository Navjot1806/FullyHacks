import { useState } from "react";
import "./App.css";
import SkyMap from "./Component/SkyViewer";
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <SkyMap />
    </>
  );
}

export default App;
