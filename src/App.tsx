import { Suspense } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Menu from "./pages/menu";
import Gallery from "./pages/gallery";
import About from "./pages/about";
import Reservations from "./pages/reservations";
import Contact from "./pages/contact";
import Login from "./pages/login";
import Register from "./pages/register";
import routes from "tempo-routes";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import { AuthProvider } from "./contexts/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Suspense fallback={<p>Loading...</p>}>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="pt-20 scroll-smooth flex-grow">
            {/* Add padding top to account for fixed navbar */}
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/about" element={<About />} />
              <Route path="/reservations" element={<Reservations />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              {import.meta.env.VITE_TEMPO === "true" && (
                <Route path="/tempobook/*" />
              )}
            </Routes>
            {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
          </main>
          <Footer />
        </div>
      </Suspense>
    </AuthProvider>
  );
}

export default App;
