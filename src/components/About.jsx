import React from 'react'
import {motion , useMotionValue , useSpring , useTransform} from "framer-motion"
import { FileDown } from 'lucide-react'
import TiltAnimation from './TiltAnimation'
const About = () => {
   
  return (
    <div className='mb-[200px] pb-[200px] ' id='about'>
      <h1 className='text-5xl font-extrabold'>ABOUT <span className='text-[#9CA3AF]'>ME</span></h1>
      <div className='mt-[60px] flex justify-evenly font-[family-name:var(--font-kosugi)]'>
        <div className='flex-col text-start max-w-[490px] '>
          <h2 className='text-3xl font-extrabold  flex gap-4 ml-[-3px] mb-6'>Initializing <span className='text-[#D4B783] '>  Developer_Profile...</span> </h2>
          <p className='mb-6 text-[#9CA3AF]'>I'm a B.Tech Computer Science student from Kerala and a Full-Stack Developer passionate about building modern, real-world web applications using the MERN stack and modern technologies.</p>
          <p className='mb-8 text-[#9CA3AF]'>I’m also exploring AI-integrated applications and continuously improving my skills by developing scalable solutions through hands-on projects.</p>
          <div className='w-max bg-linear-to-r from-[#D4B783] to-[#E84A4A] font-bold rounded-lg p-5 flex items-center justify-center gap-2 hover:-translate-y-1 transition cursor-pointer'>
            <FileDown/>  
            <p> DOWNLOAD CV</p>
          </div>
       </div>
       {/* motion start */}
       <TiltAnimation shadowColor="232,74,74" tilt={17} cursorShadow="56,62,72" radius="8px">
          <div className="w-[490px] h-max border-2 border-[#E84A4A] rounded-lg p-10 bg-[#0A0D16] ">  
            {/* mac dots */}
            <div className="flex gap-1.5 mb-4">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#28CA41]" />
            </div>

            <pre className="text-start">
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