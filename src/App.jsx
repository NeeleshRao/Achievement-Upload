import FileUpload from "./Pages/Home/FileUpload";
import Home from "./Pages/Home/Home";
import { Route, Routes } from "react-router-dom";
import Login from "./Pages/Login/Login";
import Protected from "./Utils/Protected";
import Internship from "./Pages/Internship/Internship";
import Project from "./Pages/Project/Project";
import Publication from "./Pages/Publication/Publication";
import Sports from "./Pages/Sports/Sports";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/home"
          element={
            <Protected>
              <Home />
            </Protected>
          }
        />
        <Route
          path="/internship"
          element={
            <Protected>
              <Internship/>
            </Protected>
          }
        />
        <Route path="/project" element={<Protected><Project/></Protected>}/>
        <Route path="/publication" element={<Protected><Publication/></Protected>}/>
        <Route path="/sports" element={<Protected><Sports/></Protected>}/>
        
        <Route path="/file" element={<FileUpload />} />
      </Routes>
    </>
  );
}

export default App;
