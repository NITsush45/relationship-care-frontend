import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';
import ServicesPage from './pages/ServicesPage.jsx';
import AboutPage from './pages/AboutPage.jsx';
import ContactPage from './pages/ContactPage.jsx';
import Navbar from "./components/Navbar";
import BookAppointment from './pages/BookAppointment.jsx';
import BlogPage from './pages/BlogPage.jsx';
import FAQPage from './pages/FAQPage.jsx';
import PrivacyPolicy from './pages/PrivacyPolicy.jsx';
import TermsOfService from './pages/TermsofService.jsx';
import Footer from './components/Footer.jsx';
import DoctorsListPage from './pages/DoctorsListPage.jsx';
const App = () => {
    return (
        <Router>
          <Navbar/>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/book" element={<BookAppointment />} />
                <Route path="/services" element={<ServicesPage />} />
                <Route path="/doctors/:serviceType" element={<DoctorsListPage />} />
                <Route path="/about-us" element={<AboutPage />} />
                <Route path="/contact-us" element={<ContactPage />} />
                <Route path='/blog' element={<BlogPage/>}/>
                <Route path='/faqs' element={<FAQPage/>}/>
                <Route path='/privacy-policy' element={<PrivacyPolicy/>}/>
                <Route path='/terms' element={<TermsOfService/>}/>
            </Routes>
            <Footer/>
        </Router>
    );
};

export default App;
