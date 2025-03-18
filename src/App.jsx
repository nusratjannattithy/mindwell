import './App.css';
import { Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import Navbar from "./Components/Navbar";
import Hero from "./Components/Hero";
import Resources from "./Components/Resources";
import Footer from "./Components/Footer";
import LogIn from "./Components/LogIn";
import BookAppointment from "./Components/BookAppointment"; 

function App() {
  return (
    <>
      <Header />
      <Navbar />
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/self-assessment" element={<Resources />} />
        <Route path="/book-appointment" element={<BookAppointment />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/login" element={<LogIn />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
