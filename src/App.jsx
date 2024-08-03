import FileUpload from "./Pages/Home/FileUpload";
import Home from "./Pages/Home/Home";
import { Route, Routes } from "react-router-dom";
import Login from "./Pages/Login/Login";
import Protected from "./Utils/Protected";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/home"
          element={
            <Protected>
              <Home />
            </Protected>
          }
        />
        <Route path="/file" element={<FileUpload />} />
      </Routes>
    </>
  );
}

export default App;
