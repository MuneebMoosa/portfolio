import { CodeXml } from 'lucide-react';
import SkillBar from './skills/Skillbar';
import { FaReact, FaJs, FaServer, FaNodeJs, FaDatabase , FaGitAlt, FaGithub, FaDocker} from "react-icons/fa";
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

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-80%"])
  return (
   <div ref={containerRef} className=" mb-[100px] " id='skills'>
      <div className="h-[300vh]">
        <div className="sticky top-0 h-screen flex flex-col items-center justify-center">
         <h1 className="text-5xl font-extrabold">  CORE <span className="text-[#9CA3AF]">COMPETENCIES</span></h1>
         <p className="mt-10 mb-20 text-l text-[#9CA3AF] font-[family-name:var(--font-kosugi)] "> The tools and technologies I use to build scalable, high-performance digital experiences.</p>
        <div className="w-full max-w-[1200px] overflow-hidden px-4">
          <motion.div
            style={{ x }}
            className="flex gap-6"
          >
            <div className="w-[400px] h-max p-5 bg-[#111114] border rounded-xl border-[#111827] flex flex-col items-center justify-center hover:border-[#E84A4A] hover:shadow-[0_0_30px_rgba(212,183,131,0.2)] transition-all duration-300">
              <div className='flex items-center gap-3 font-[family-name:var(--font-kosugi)] mb-10 mt-[10px] '>
                  <div className='w-[50px] h-[50px] rounded-lg bg-[#242220] text-[#D4B783] flex justify-center items-center '>
                        <CodeXml />
                  </div>
                  <h1 className='text-3xl font-bold'>Frontend Wizardry</h1>
              </div>
              <div className='gap-3'>
                    <SkillBar name="React" percent={60} Icon={FaReact} />
                    <SkillBar name="JavaScript" percent={70} Icon={FaJs} />
                    <SkillBar name="Tailwind CSS" percent={85} Icon={SiTailwindcss} />
                    <SkillBar name="Redux" percent={30} Icon={SiRedux} />
                    <SkillBar name="Framer Motion" percent={50} Icon={SiFramer} />
              </div>
            </div>
            <div className="w-[400px] h-max p-5 bg-[#111114] border rounded-xl border-[#111827] flex flex-col items-center justify-center hover:border-[#E84A4A] hover:shadow-[0_0_30px_rgba(212,183,131,0.2)] transition-all duration-300">
              <div className='flex items-center gap-3 font-[family-name:var(--font-kosugi)] mb-10 mt-[10px] '>
                  <div className='w-[50px] h-[50px] rounded-lg bg-[#242220] text-[#D4B783] flex justify-center items-center '>
                        <FaServer />
                  </div>
                  <h1 className='text-3xl font-bold'>Backend Engineering</h1>
              </div>
              <div className='gap-3'>
                  <SkillBar name="Node.js" percent={70} Icon={FaNodeJs} />
                  <SkillBar name="express" percent={70} Icon={SiExpress} />
                
              </div>
            </div>
            <div className="w-[400px] h-max p-5 bg-[#111114] border rounded-xl border-[#111827] flex flex-col items-center justify-center hover:border-[#E84A4A] hover:shadow-[0_0_30px_rgba(212,183,131,0.2)] transition-all duration-300">
              <div className='flex items-center gap-3 font-[family-name:var(--font-kosugi)] mb-10 mt-[10px] '>
                  <div className='w-[50px] h-[50px] rounded-lg bg-[#242220] text-[#D4B783] flex justify-center items-center '>
                        <FaDatabase  />
                  </div>
                  <h1 className='text-3xl font-bold'>Database Systems</h1>
              </div>
              <div className='gap-3'>
                  <SkillBar name="mySQL" percent={50} Icon={SiMysql} />
                  <SkillBar name="MongoDB" percent={50} Icon={SiMongodb} />
              </div>
            </div>
            <div className="w-[400px] h-max p-5 bg-[#111114] border rounded-xl border-[#111827] flex flex-col items-center justify-center hover:border-[#E84A4A] hover:shadow-[0_0_30px_rgba(212,183,131,0.2)] transition-all duration-300">
              <div className='flex items-center gap-3 font-[family-name:var(--font-kosugi)] mb-10 mt-[10px] '>
                  <div className='w-[50px] h-[50px] rounded-lg bg-[#242220] text-[#D4B783] flex justify-center items-center '>
                        <FaDatabase  />
                  </div>
                  <h1 className='text-3xl font-bold'>Devops & Cloud</h1>
              </div>
              <div className='gap-3'>
                <SkillBar name="Docker" percent={30} Icon={FaDocker} />
              </div>
            </div>    
            <div className="w-[400px] h-max p-5 bg-[#111114] border rounded-xl border-[#111827] flex flex-col items-center justify-center hover:border-[#E84A4A] hover:shadow-[0_0_30px_rgba(212,183,131,0.2)] transition-all duration-300">
              <div className='flex items-center gap-3 font-[family-name:var(--font-kosugi)] mb-10 mt-[10px] '>
                  <div className='w-[50px] h-[50px] rounded-lg bg-[#242220] text-[#D4B783] flex justify-center items-center '>
                        <FaDatabase  />
                  </div>
                  <h1 className='text-3xl font-bold'>Tools & Ecosystem</h1>
              </div>
              <div className='gap-3'>
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