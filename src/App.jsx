import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { useState } from "react";
import Header from "./componentes/Header";
import LoginForm from "./componentes/FormLogin";
import Footer from "./componentes/Footer";
import SearchMovies from "./componentes/Search/SearchMovies";
import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={
            isLoggedIn ? (
              <Navigate to="/search" />
            ) : (
              <>
                <Header />
                <LoginForm onLogin={handleLogin} />
                <Footer />
              </>
            )
          }
        />
        <Route
          path="/search"
          element={
            isLoggedIn ? (
              <>
                <SearchMovies />
              </>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
