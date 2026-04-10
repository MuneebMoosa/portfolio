import React from 'react'
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Journey from './components/Journey';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Animation from './components/Animation';
import Chatbot from './components/Chatbot'

const App = () => {
  return (
     <div className="relative min-h-screen flex flex-col   text-center">
      <Animation/>
      <Navbar/>
      <Hero/>
      <About/>
      <Skills/>
      <Journey/>
      <Projects/>
      <Contact/>
      <Footer/>
      <Chatbot/>
    </div>
  )
}

export default App