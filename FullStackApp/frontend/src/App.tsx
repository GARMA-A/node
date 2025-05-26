import "./index.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import NavBar from "./components/NavBar";
import AddPage from "./components/AddPage";
import Delete from "./components/Delete";
import { Movie } from "./components/types";
import { SearchPage } from "./components/SearchPage";
import { useState } from "react";

export default function App() {

  const [movie, setMovie] = useState<Partial<Movie>>({});
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [submit, setSubmit] = useState<boolean>(false);

  return (
    <>
      <NavBar />

      <Routes>
        <Route index element={<HomePage />} />
        <Route path="/search" element={<SearchPage movie={movie} setMovie={setMovie} error={error} setError={setError} loading={loading} setLoading={setLoading} submit={submit} setSubmit={setSubmit} />} />
        <Route path="/add" element={<AddPage movie={movie} setMovie={setMovie} error={error} setError={setError} loading={loading} setLoading={setLoading} submit={submit} setSubmit={setSubmit} />} />
        <Route path="/delete" element={<Delete movie={movie} setMovie={setMovie} error={error} setError={setError} loading={loading} setLoading={setLoading} submit={submit} setSubmit={setSubmit} />} />
      </Routes>

    </>);
}
