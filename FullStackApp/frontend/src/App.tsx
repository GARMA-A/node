import "./index.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import NavBar from "./components/NavBar";
import AddPage from "./components/AddPage";
import Delete from "./components/Delete";

export default function App() {
  return (
    <>
      <NavBar />

      <div className="bg-gray-900 text-white min-h-screen">
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="/search" element={<h2> Search For Movie</ h2>} />
          <Route path="/add" element={<AddPage />} />
          <Route path="/delete" element={<Delete />} />
        </Routes>
      </div>

    </>);
}
