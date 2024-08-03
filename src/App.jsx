import FileUpload from "./Pages/Home/FileUpload";
import Home from "./Pages/Home/Home";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/file' element={<FileUpload/>}/>
    </Routes>
    </>
  );
}

export default App;
