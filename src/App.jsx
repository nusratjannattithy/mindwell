import './App.css';
import { Routes, Route } from 'react-router-dom';
import Header from './Components/Header';
import OptionsPage from './Components/OptionsPage';
import Navbar from './Components/Navbar';
import Hero from './Components/Hero';
import Resources from './Components/Resources';
import Footer from './Components/Footer';
import LogIn from './Components/LogIn';
import SelfTest from './Components/SelfTest';
import Registration from './Components/Registration';
import Helpline from './Components/Helpline'; 
import Feedback from './Components/Feedback'; 



function App() {
  return (
    <>
      {/* Header and Navbar should stay on all pages */}
      <Header />
      <Navbar />

      {/* Define Routes for Navigation */}
      <Routes>
        {/* Define different routes for different components */}
        <Route path="/" element={<Hero />} /> {/* Display Hero on home page */}
        <Route path="/resources" element={<Resources />} />
        <Route path="/LogIn" element={<LogIn />} />
        <Route path="/Registration" element={<Registration/>} />
        <Route path="/assessment" element={<SelfTest />} />
        <Route path="/options" element={<OptionsPage />} />
        <Route path="/Helpline" element={<Helpline />} />
        <Route path="/Feedback" element={<Feedback />} />


      </Routes>

      {/* Footer is displayed on all pages */}
      <Footer />
    </>
  );
}

export default App;
