import React from 'react'
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Journey from './components/Journey';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import LeafBackground from './components/leafBackground';
const App = () => {
  return (
     <div className="relative z-10 min-h-screen flex flex-col  text-center">
      <LeafBackground/>
      <Navbar/>
      <Hero/>
      <About/>
      <Skills/>
      <Journey/>
      <Projects/>
      <Contact/>
      <Footer/>
    </div>
  )
}

export default App