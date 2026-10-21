import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/admin/ProtectedRoute";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Journey from "./components/Journey";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Animation from "./components/Animation";
import Chatbot from "./components/Chatbot";

import { Analytics } from "@vercel/analytics/react";

// Admin pages
import AdminLayout from "../src/components/admin/AdminLayout";
import AdminLogin from "../src/components/admin/AdminLogin";
import Dashboard from "../src/components/admin/Dashboard";
import ProjectsAdmin from "../src/components/admin/ProjectsAdmin";
import SkillsAdmin from "../src/components/admin/SkillsAdmin";
import JourneyAdmin from "../src/components/admin/JourneyAdmin";

const Portfolio = () => {
  return (
    <>
      <div className="overflow-x-clip relative min-h-screen flex flex-col text-center">
        <Animation />
        <Navbar />
        <Hero />
        <About />
        <Skills />
        <Journey />
        <Projects />
        <Contact />
        <Footer />
        <Chatbot />
      </div>

      <Analytics />
    </>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public portfolio */}
        <Route path="/" element={<Portfolio />} />

        <Route path="/admin/login" element={<AdminLogin />} />

      {/* All dashboard routes require authentication */}
        <Route element={<ProtectedRoute />}>
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="projects" element={<ProjectsAdmin />} />
              <Route path="skills" element={<SkillsAdmin />} />
              <Route path="journey" element={<JourneyAdmin />} />
            </Route>
         </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;