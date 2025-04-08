import './App.css';
import { Routes, Route } from 'react-router-dom';
import Header from './Components/Header';
import OptionsPage from './Components/OptionsPage';
import Navbar from './Components/Navbar';
import Resources from './Components/Resources';
import Footer from './Components/Footer';
import LogIn from './Components/LogIn';
import SelfTest from './Components/SelfTest';
import BookAppointment from "./Components/BookAppointment"; 
import Registration from './Components/Registration';
import MoodEnhancement from './Components/MoodEnhancement';
import MoodTracking from './Components/MoodTracking';
import Helpline from './Components/Helpline'; 
import Blog from './Components/Blog';
import Articles from './Components/Articles';
import Books from './Components/Books';
import Feedback from './Components/Feedback';
import Home from './Pages/Home';
import AboutUs from './Components/AboutUs.jsx';
import Admin from './Pages/Admin';
import ConsultantProfile from './Components/ConsultantProfile'; 


function App() {
  return (
    <>
      {/* Header and Navbar should stay on all pages */}
      <Header />
      <Navbar />

      {/* Define Routes for Navigation */}
      <Routes>
        {/* Define different routes for different components */}
       
        <Route path="/resources" element={<Resources />} />
        <Route path="/LogIn" element={<LogIn />} />
        <Route path="/Registration" element={<Registration/>} />
        <Route path="/assessment" element={<SelfTest />} />
        <Route path="/options" element={<OptionsPage />} />

        <Route path="/BookAppointment" element={<BookAppointment />} />
        <Route path="/MoodTracking" element={<MoodTracking/>} />
        <Route path="/MoodEnhancement" element={<MoodEnhancement/>} />
        <Route path="/Helpline" element={<Helpline />} />
        <Route path="/Blog" element={<Blog />} />
        <Route path="/Articles" element={<Articles />} />
        <Route path="/Books" element={<Books />} />
        <Route path="/Feedback" element={<Feedback />} />
        <Route path="/" element={<Home />} />
        <Route path="/Admin" element={<Admin/>} />
        <Route path="/AboutUs" element={<AboutUs />} />
        <Route path="/consultant/:id" element={<ConsultantProfile />} />

      </Routes>

      {/* Footer is displayed on all pages */}
      <Footer />
      
    </>
  );
}

export default App;
