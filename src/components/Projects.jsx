import { FaReact ,  FaGithub ,FaHtml5, FaCss3Alt} from "react-icons/fa";
import { SiTailwindcss,SiRedux,SiExpress ,SiMongodb,  SiJavascript, SiGooglechrome } from "react-icons/si";
import { Layers , Code , Puzzle } from "lucide-react";
import Reveal from './animations/Reveal';
import TiltAnimation from './TiltAnimation'
const Projects = () => {
  return (
    <div className='mt-[100px] md:mt-[200px] mb-[50px] px-6' id="projects">
      <h1 className="text-4xl md:text-5xl font-extrabold text-center">
        MY<span className="text-[#9CA3AF]"> PROJECTS </span>
      </h1>

      <p className="mt-6 md:mt-10 text-sm md:text-l text-[#9CA3AF] font-[family-name:var(--font-kosugi)] text-center max-w-2xl mx-auto">
        A collection of projects built across different technologies, focused on solving real-world problems and continuous learning.
      </p>

      <div className='mt-16 md:mt-20 flex flex-col justify-center items-center gap-10'>

        {/* NEW ONE */}
        <Reveal>
        <TiltAnimation shadowColor="none" tilt={3} cursorShadow="56,62,72" radius="8px">
        <div className='bg-[#111114] w-full max-w-[1040px] h-auto border border-[#1a1c1f] rounded-lg p-6 md:p-7 flex flex-col md:flex-row gap-8 md:gap-10 hover:border hover:border-[#E84A4A] transition-all duration-300 '>
          <div className='w-full md:w-[400px] aspect-video md:h-full bg-white rounded-lg border-1 border-[#28313d] z-10 flex-shrink-0'>

          </div>
          <div className='flex flex-col gap-6 md:gap-8 flex-1 z-10'>
              <div className='flex flex-wrap gap-3 items-center'>
                <h1 className='font-bold text-2xl md:text-3xl'>Movie App </h1>
                <div className='rounded-xl h-5 w-max text-[#61DAFB] text-bold border bg-[#192029] border-[#28313d] flex justify-center items-center px-3 py-3 gap-1 text-xs'>
                  <Layers size={14}/> Full Stack
                </div>
              </div>
              <p className=' text-start text-[#9CA3AF] text-sm md:text-base'>
                A full-stack movie app where users can search and explore movies. Built using React, Redux, Express, and MongoDB with a focus on smooth user experience and clean design.
              </p>
              <div className='flex flex-wrap gap-2 md:gap-4'>
                  <div className='flex gap-2 items-center text-xs md:text-sm text-[#61DAFB] w-max bg-[#192029] border-1 border-[#28313d] rounded-sm px-2 py-1 hover:border-[#D4B783] transition-all duration-300'>
                    <FaReact/>React
                  </div>
                  <div className='flex gap-2 items-center text-xs md:text-sm text-[#764ABC] w-max bg-[#192029] border-1 border-[#28313d] rounded-sm px-2 py-1 hover:border-[#D4B783] transition-all duration-300'>
                    <SiRedux/>Redux
                  </div>
                  <div className='flex gap-2 items-center text-xs md:text-sm text-[#000000] w-max bg-[#192029] border-1 border-[#28313d] rounded-sm px-2 py-1 hover:border-[#D4B783] transition-all duration-300'>
                    <SiExpress/>Express
                  </div>
                  <div className='flex gap-2 items-center text-xs md:text-sm text-[#47A248] w-max bg-[#192029] border-1 border-[#28313d] rounded-sm px-2 py-1 hover:border-[#D4B783] transition-all duration-300'>
                    <SiMongodb/>MongoDB
                  </div>
                  <div className='flex gap-2 items-center text-xs md:text-sm text-[#38BDF8] w-max bg-[#192029] border-1 border-[#28313d] rounded-sm px-2 py-1 hover:border-[#D4B783] transition-all duration-300'>
                    <SiTailwindcss/>TailwindCSS
                  </div>
              </div>
              <a className="rounded-sm bg-[#192029] h-10 border border-[#28313d] text-sm md:text-l font-bold flex items-center justify-center gap-3 hover:border-[#61DAFB] transition-all duration-300" href="https://github.com/MuneebMoosa/Movie-App" target="_blank" rel="noopener noreferrer">
                  <FaGithub/> Source Code
              </a>
          </div>
        </div>
        </TiltAnimation>
        </Reveal>
        {/* new one */}
        <Reveal>
        <TiltAnimation shadowColor="none" tilt={3} cursorShadow="56,62,72">
        <div className='bg-[#111114] w-full max-w-[1040px] h-auto border-1 border-[#1a1c1f] rounded-lg p-6 md:p-7 flex flex-col-reverse md:flex-row gap-8 md:gap-10 hover:border hover:border-[#E84A4A]  transition-all duration-300'>
          <div className='flex flex-col gap-6 md:gap-6 flex-1 z-10'>
              <div className='flex flex-wrap gap-3 items-center'>
                <h1 className='font-bold text-2xl md:text-3xl'>See Easy </h1>
                <div className='rounded-xl h-5 w-max text-[#A78BFA] text-bold border bg-[#1E1B2E] border-[#3B2F63] flex justify-center items-center px-3 py-3 gap-1 text-xs'>
                  <Puzzle size={14}/> Extension
                </div>
              </div>
              <p className='text-start text-[#9CA3AF] text-sm md:text-base'>
                A Chrome extension that improves web accessibility for color-blind users and developers by enhancing color visibility, checking WCAG contrast, and providing tools like auto scan, eyedropper, and vision simulation.
              </p>
              <div className='flex flex-wrap gap-2 md:gap-4 '>
                  <div className='flex gap-2 items-center text-xs md:text-sm text-[#F7DF1E] w-max bg-[#192029] border border-[#28313d] rounded-sm px-2 py-1 hover:border-[#D4B783] transition-all duration-300'>
                    <SiJavascript/>JavaScript
                  </div>
                  <div className='flex gap-2 items-center text-xs md:text-sm text-[#4285F4] w-max bg-[#192029] border border-[#28313d] rounded-sm px-2 py-1 hover:border-[#D4B783] transition-all duration-300'>
                    <SiGooglechrome/>Chrome API
                  </div>
              </div>
              <a className="rounded-sm bg-[#192029] h-10 border border-[#28313d] text-sm md:text-l font-bold flex items-center justify-center gap-3 hover:border-[#A78BFA] transition-all duration-300" href="https://github.com/MuneebMoosa/SeeEasy-accessibility-extension" target="_blank" rel="noopener noreferrer">
                  <FaGithub/> Source Code
              </a>
          </div>
          <div className='w-full md:w-[400px] aspect-video md:h-full bg-white rounded-lg border-1 border-[#28313d] z-10 flex-shrink-0'>

          </div>
        </div>
        </TiltAnimation>
        </Reveal>
        {/* new one */}
        <Reveal>
        <TiltAnimation shadowColor="none" tilt={3} cursorShadow="56,62,72">
        <div className='bg-[#111114] w-full max-w-[1040px] h-auto border-1 border-[#1a1c1f] rounded-lg p-6 md:p-7 flex flex-col md:flex-row gap-8 md:gap-10 hover:border hover:border-[#E84A4A]  transition-all duration-300'>
          <div className='w-full md:w-[400px] aspect-video md:h-full bg-white rounded-lg border-1 border-[#28313d] z-10 flex-shrink-0'>

          </div>
          <div className='flex flex-col gap-6 md:gap-8 flex-1 z-10'>
              <div className='flex flex-wrap gap-3 items-center'>
                <h1 className='font-bold text-2xl md:text-3xl'>Book Tracker </h1>
                <div className='rounded-xl h-5 w-max text-[#3aad3d] text-bold border bg-[#192029] border-[#235025] flex justify-center items-center px-3 py-3 gap-1 text-xs'>
                  <Code size={14}/> Frontend
                </div>
              </div>
              <p className=' text-start text-[#9CA3AF] text-sm md:text-base'>
                A simple React app to manage your personal reading list. Users can add books, track their status (Wishlist, Reading, Completed), write notes, and store everything using local storage.
              </p>
              <div className='flex flex-wrap gap-2 md:gap-4 '>
                  <div className='flex gap-2 items-center text-xs md:text-sm text-[#61DAFB] w-max bg-[#192029] border-1 border-[#28313d] rounded-sm px-2 py-1 hover:border-[#D4B783] transition-all duration-300'>
                    <FaReact/>React
                  </div>
                  <div className='flex gap-2 items-center text-xs md:text-sm text-[#1572B6] w-max bg-[#192029] border-1 border-[#28313d] rounded-sm px-2 py-1 hover:border-[#D4B783] transition-all duration-300'>
                    <FaCss3Alt/>CSS
                  </div>
              </div>
              <a className="rounded-sm bg-[#192029] h-10 border border-[#28313d] text-sm md:text-l font-bold flex items-center justify-center gap-3 hover:border-[#3aad3d] transition-all duration-300" href="https://github.com/MuneebMoosa/Book-Tracker" target="_blank" rel="noopener noreferrer">
                  <FaGithub/> Source Code
              </a>
          </div>
        </div>
        </TiltAnimation>
        </Reveal>
        {/* new one */}
      </div>
    </div>
  )
}

export default Projects