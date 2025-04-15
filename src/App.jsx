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
import Blog from './Components/Blog.jsx';

import BlogList from './Components/BlogList';
import BlogDetail from './Components/BlogDetail';
import Articles from './Components/Articles';
import Books from './Components/Books';
import PatientDashboard from './Components/PatientDashboard';
import Feedback from './Components/Feedback';
import Home from './pages/Home';
import AboutUs from './Components/AboutUS';
import AppointmentForm from './Components/AppointmentForm';
import ActivitySection from './Components/ActivitySection';
import HistorySection from './Components/HistorySection';
import ProfileSettings from './Components/ProfileSettings';
import ConsultantProfile from './Components/ConsultantProfile';
import AdminDashboard from './Components/AdminDashboard';
import Admin from './Pages/Admin';




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
        <Route path="/login" element={<LogIn />} />
        <Route path="/Registration" element={<Registration/>} />
        <Route path="/assessment" element={<SelfTest />} />
        <Route path="/options" element={<OptionsPage />} />
        <Route path="/book-appointment" element={<BookAppointment />} />
        <Route path="/MoodTracking" element={<MoodTracking/>} />
        <Route path="/MoodEnhancement" element={<MoodEnhancement/>} />
        <Route path="/Helpline" element={<Helpline />} />
        <Route path="/blog" element={<BlogList />} />
        <Route path="/blog/:id" element={<BlogDetail />} />
        <Route path="/Articles" element={<Articles />} />
        <Route path="/Books" element={<Books />} />
        <Route path="/dashboard" element={<PatientDashboard />} />
        <Route path="/Books" element={<Books />} /> 
        <Route path="/Feedback" element={<Feedback />} />
        <Route path="/" element={<Home />} />
        <Route path="/AboutUs" element={<AboutUs />} />
        <Route path="/AppointmentForm" element={<AppointmentForm />} />
        <Route path="/ActivitySection" element={<ActivitySection />} />
        <Route path="/HistorySection" element={<HistorySection />} />
        <Route path="/ProfileSettings" element={<ProfileSettings />} />
        <Route path="/consultant/:id" element={<ConsultantProfile />} />
        <Route path="/Admin" element ={<Admin/>}/>
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        
        
       
        
      </Routes>

      {/* Footer is displayed on all pages */}
      <Footer />
    </>
  );
}

export default App;
