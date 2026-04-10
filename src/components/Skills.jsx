import { CodeXml } from 'lucide-react';
import SkillBar from './skills/SkillBar';
import { FaReact, FaJs, FaServer, FaNodeJs, FaDatabase, FaGitAlt, FaGithub, FaDocker } from "react-icons/fa";
import { SiTailwindcss, SiRedux, SiFramer, SiExpress, SiMongodb, SiMysql, SiPostman } from "react-icons/si";
import { VscVscode } from "react-icons/vsc";
import { useRef } from "react";
import { motion, useScroll, useTransform } from 'framer-motion';
const Skills = () => {
  const containerRef = useRef(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  const isMobile = window.innerWidth < 768;

  const x = useTransform(
    scrollYProgress,
    [0, 1],
    isMobile ? ["0%", "-450%"] : ["0%", "-90%"]
  );
  
  return (
    <div ref={containerRef} className="mb-[50px] md:mb-[100px]" id='skills'>
      <div className="h-[250vh] md:h-[300vh]">
        <div className="sticky top-0 h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
          <h1 className="text-3xl md:text-5xl font-extrabold text-center">  CORE <span className="text-[#9CA3AF]">COMPETENCIES</span></h1>
          <p className="mt-6 md:mt-10 mb-10 md:mb-20 text-sm md:text-l text-[#9CA3AF] font-[family-name:var(--font-kosugi)] text-center max-w-2xl"> The tools and technologies I use to build scalable, high-performance digital experiences.</p>
          <div className="w-full max-w-[1200px] mx-auto px-6 md:px-10 overflow-hidden">
            <motion.div
              style={{ x }}
              className="flex gap-4 md:gap-6"
            >
              <div className="w-[300px] md:w-[400px] flex-shrink-0 h-max p-5 bg-[#111114] border rounded-xl border-[#111827] flex flex-col items-center justify-center hover:border-[#E84A4A] hover:shadow-[0_0_30px_rgba(212,183,131,0.2)] transition-all duration-300">
                <div className='flex items-center gap-3 font-[family-name:var(--font-kosugi)] mb-6 md:mb-10 mt-[10px] '>
                  <div className='w-[40px] h-[40px] md:w-[50px] md:h-[50px] rounded-lg bg-[#242220] text-[#D4B783] flex justify-center items-center '>
                    <CodeXml size={20} className='md:w-6 md:h-6' />
                  </div>
                  <h1 className='text-xl md:text-3xl font-bold'>Frontend</h1>
                </div>
                <div className='w-full'>
                  <SkillBar name="React" percent={60} Icon={FaReact} />
                  <SkillBar name="JavaScript" percent={70} Icon={FaJs} />
                  <SkillBar name="Tailwind CSS" percent={85} Icon={SiTailwindcss} />
                  <SkillBar name="Redux" percent={30} Icon={SiRedux} />
                  <SkillBar name="Framer Motion" percent={50} Icon={SiFramer} />
                </div>
              </div>
              <div className="w-[300px] md:w-[400px] flex-shrink-0 h-max p-5 bg-[#111114] border rounded-xl border-[#111827] flex flex-col items-center justify-center hover:border-[#E84A4A] hover:shadow-[0_0_30px_rgba(212,183,131,0.2)] transition-all duration-300">
                <div className='flex items-center gap-3 font-[family-name:var(--font-kosugi)] mb-6 md:mb-10 mt-[10px] '>
                  <div className='w-[40px] h-[40px] md:w-[50px] md:h-[50px] rounded-lg bg-[#242220] text-[#D4B783] flex justify-center items-center '>
                    <FaServer size={20} className='md:w-6 md:h-6' />
                  </div>
                  <h1 className='text-xl md:text-3xl font-bold'>Backend</h1>
                </div>
                <div className='w-full'>
                  <SkillBar name="Node.js" percent={70} Icon={FaNodeJs} />
                  <SkillBar name="Express" percent={70} Icon={SiExpress} />

                </div>
              </div>
              <div className="w-[300px] md:w-[400px] flex-shrink-0 h-max p-5 bg-[#111114] border rounded-xl border-[#111827] flex flex-col items-center justify-center hover:border-[#E84A4A] hover:shadow-[0_0_30px_rgba(212,183,131,0.2)] transition-all duration-300">
                <div className='flex items-center gap-3 font-[family-name:var(--font-kosugi)] mb-6 md:mb-10 mt-[10px] '>
                  <div className='w-[40px] h-[40px] md:w-[50px] md:h-[50px] rounded-lg bg-[#242220] text-[#D4B783] flex justify-center items-center '>
                    <FaDatabase size={20} className='md:w-6 md:h-6' />
                  </div>
                  <h1 className='text-xl md:text-3xl font-bold'>Databases</h1>
                </div>
                <div className='w-full'>
                  <SkillBar name="mySQL" percent={50} Icon={SiMysql} />
                  <SkillBar name="MongoDB" percent={50} Icon={SiMongodb} />
                </div>
              </div>
              <div className="w-[300px] md:w-[400px] flex-shrink-0 h-max p-5 bg-[#111114] border rounded-xl border-[#111827] flex flex-col items-center justify-center hover:border-[#E84A4A] hover:shadow-[0_0_30px_rgba(212,183,131,0.2)] transition-all duration-300">
                <div className='flex items-center gap-3 font-[family-name:var(--font-kosugi)] mb-6 md:mb-10 mt-[10px] '>
                  <div className='w-[40px] h-[40px] md:w-[50px] md:h-[50px] rounded-lg bg-[#242220] text-[#D4B783] flex justify-center items-center '>
                    <FaDatabase size={20} className='md:w-6 md:h-6' />
                  </div>
                  <h1 className='text-xl md:text-3xl font-bold'>DevOps</h1>
                </div>
                <div className='w-full'>
                  <SkillBar name="Docker" percent={30} Icon={FaDocker} />
                </div>
              </div>
              <div className="w-[300px] md:w-[400px] flex-shrink-0 h-max p-5 bg-[#111114] border rounded-xl border-[#111827] flex flex-col items-center justify-center hover:border-[#E84A4A] hover:shadow-[0_0_30px_rgba(212,183,131,0.2)] transition-all duration-300">
                <div className='flex items-center gap-3 font-[family-name:var(--font-kosugi)] mb-6 md:mb-10 mt-[10px] '>
                  <div className='w-[40px] h-[40px] md:w-[50px] md:h-[50px] rounded-lg bg-[#242220] text-[#D4B783] flex justify-center items-center '>
                    <FaDatabase size={20} className='md:w-6 md:h-6' />
                  </div>
                  <h1 className='text-xl md:text-3xl font-bold'>Tools</h1>
                </div>
                <div className='w-full'>
                  <SkillBar name="Git" percent={80} Icon={FaGitAlt} />
                  <SkillBar name="GitHub" percent={75} Icon={FaGithub} />
                  <SkillBar name="VS Code" percent={90} Icon={VscVscode} />
                  <SkillBar name="Postman" percent={50} Icon={SiPostman} />
                </div>
              </div>

            </motion.div>
          </div>
        </div>
      </div>
    </div>

  )
}

export default Skills