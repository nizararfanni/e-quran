import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import SurahList from "./components/SurahList";
import SurahDetail from "./components/SurahDeatil";
import AllJuz from "./components/AllJuz";
import DetailJuz from "./components/DetailJuz";
import AboutEQuran from "./components/AboutEquran";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-r from-gray-800 via-gray-600  to-gray-400">
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<SurahList />} />
            <Route path="/home" element={<SurahList />} />
            <Route path="/surah/:number" element={<SurahDetail />} />
            <Route path="/juz" element={<AllJuz />} />
            <Route path="/juz/:juzNumber" element={<DetailJuz />} />
            <Route path="/about" element={<AboutEQuran />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm />} />
          </Routes>
        </main>
        <Navbar />
      </div>
    </Router>
  );
};

export default App;
