import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import LandingPage from "./pages/LandingPage";
import BookList from "./pages/BookList";
import BookTableList from "./pages/BookTableList";
import AuthorList from "./pages/AuthorList";
import AuthorTableList from "./pages/AuthorTableList";
import AuthorsByYear from "./pages/AuthorsByYear";
import BooksByPages from "./pages/BooksByPages";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/libros" element={<BookList />} />
          <Route path="/libros-tabla" element={<BookTableList />} />
          <Route path="/autores" element={<AuthorList />} />
          <Route path="/autores-tabla" element={<AuthorTableList />} />
          <Route path="/autores-filtro" element={<AuthorsByYear />} />
          <Route path="/libros-filtro" element={<BooksByPages />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
