import React from 'react'
import {motion , useMotionValue , useSpring , useTransform} from "framer-motion"
import { FileDown } from 'lucide-react'
import TiltAnimation from './TiltAnimation'
const About = () => {
   
  return (
    <div className='mb-[100px] md:mb-[200px] pb-[100px] md:pb-[200px] px-6 ' id='about'>
      <h1 className='text-4xl md:text-5xl font-extrabold'>ABOUT <span className='text-[#9CA3AF]'>ME</span></h1>
      <div className='mt-[40px] md:mt-[60px] flex flex-col lg:flex-row items-center justify-center lg:justify-evenly gap-12 font-[family-name:var(--font-kosugi)]'>
        <div className='flex flex-col text-start w-full lg:max-w-[490px] '>
          <h2 className='text-2xl md:text-3xl font-extrabold flex flex-wrap gap-2 md:gap-4 ml-[-3px] mb-6'>Initializing <span className='text-[#D4B783] '>  Developer_Profile...</span> </h2>
          <p className='mb-6 text-[#9CA3AF] text-sm md:text-base'>I'm a B.Tech Computer Science student from Kerala and a Full-Stack Developer passionate about building modern, real-world web applications using the MERN stack and modern technologies.</p>
          <p className='mb-8 text-[#9CA3AF] text-sm md:text-base'>I’m also exploring AI-integrated applications and continuously improving my skills by developing scalable solutions through hands-on projects.</p>
          <div className='w-max bg-linear-to-r from-[#D4B783] to-[#E84A4A] font-bold rounded-lg p-4 md:p-5 flex items-center justify-center gap-2 hover:-translate-y-1 transition cursor-pointer text-sm md:text-base'>
            <FileDown size={20}/>  
            <p> DOWNLOAD CV</p>
          </div>
       </div>
       {/* motion start */}
       <TiltAnimation shadowColor="232,74,74" tilt={17} cursorShadow="56,62,72" radius="8px">
          <div className="w-full max-w-[490px] h-auto border-2 border-[#E84A4A] rounded-lg p-6 md:p-10 bg-[#0A0D16] overflow-x-auto">  
            {/* mac dots */}
            <div className="flex gap-1.5 mb-4">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#28CA41]" />
            </div>

            <pre className="text-start text-xs md:text-sm leading-relaxed">
              <span className="text-purple-400">const </span>
              <span className="text-white">MuneebMoosa </span>
              <span className="text-slate-400">= {"{"}</span>{"\n"}
              {"  "}<span className="text-sky-300">role</span><span className="text-slate-400">:</span><span className="text-green-300">"Full Stack Developer"</span><span className="text-slate-400">,</span>{"\n"}
              {"  "}<span className="text-sky-300">stack</span><span className="text-slate-400">:</span><span className="text-slate-400">[</span><span className="text-red-300">"Node.js"</span><span className="text-slate-400">, </span><span className="text-red-300">"React"</span><span className="text-slate-400">, </span><span className="text-red-300">"Python"</span><span className="text-slate-400">],</span>{"\n"}
              {"  "}<span className="text-sky-300">exploring</span><span className="text-slate-400">:</span><span className="text-slate-400">[</span><span className="text-red-300">"Webdev"</span><span className="text-slate-400">, </span><span className="text-red-300">"LLMs"</span><span className="text-slate-400">, </span><span className="text-red-300">"Ai"</span><span className="text-slate-400">],</span>{"\n"}
              {"  "}<span className="text-sky-300">status</span><span className="text-slate-400">:</span><span className="text-emerald-400">"open_to_opportunities"</span><span className="text-slate-400">,</span>{"\n"}
              {"  "}<span className="text-sky-300">location</span><span className="text-slate-400">:</span><span className="text-green-300">"Kerala, India 🌴"</span><span className="text-slate-400">,</span>{"\n"}
              <span className="text-slate-400">{"}"}</span>;
            </pre>
          </div>
          {/* motion ends */}
        </TiltAnimation>
      </div>
    </div>
  )
}

export default About