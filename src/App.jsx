import { useState , useEffect } from 'react';
import { Analytics } from '@vercel/analytics/react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Journey from './components/Journey';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Animation from './components/Animation';
import Chatbot from './components/Chatbot';
import Loader from './components/loader/Loader';
const App = () => {

const [loading , setLoading] = useState(true);

  useEffect(() => {
      const timer = setTimeout(() => {
        setLoading(false);
      }, 5800);

    return () => clearTimeout(timer);
  }, []);
  return (
    <>
      {loading ? <Loader /> : 
      <div className=" overflow-x-clip relative min-h-screen flex flex-col text-center">
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
      </div>}
      <Analytics />
    </>
     
  )
}

export default App