import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './assets/components/Header';
import WelcomeSection from './assets/components/WelcomeSection';
import UserSelection from './assets/components/UserSelection';
import Footer from './assets/components/Footer';


function App() {
  return (
      <Router>
        <div className="flex flex-col min-h-screen">
          <Header />
          <Routes>
            <Route path="/" element={<WelcomeSection />} />
            <Route path="/UserSelection" element={<UserSelection />} />
          </Routes>
          <Footer />
        </div>
      </Router>
  );
}

export default App;