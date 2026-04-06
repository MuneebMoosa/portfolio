import { GraduationCap , Calendar, Briefcase} from 'lucide-react';
import { motion } from 'framer-motion';
const Journey = () => {
  return (
    <div className='mt-[200px] mb-[50px]'>
      <h1 className="text-5xl font-extrabold">
        MY<span className="text-[#9CA3AF]"> JOURNEY</span>
      </h1>

      <p className="mt-10 text-l text-[#9CA3AF] font-[family-name:var(--font-kosugi)]">
        The path to mastery is paved with challenges, failures, and breakthroughs.
      </p>

      <div className="relative h-[680px] mt-10">

      {/* line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-full border-l-6 rounded-sm border-gray-700"></div>

       {/* Item 1 - LEFT motion div 1*/}
        <motion.div 
        initial={{ opacity: 0, x: -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ amount: 0.4, once: true }}
        className="absolute bg-[#111114]  top-[50px] left-80 w-[900px] p-10 text-center border rounded-sm border-[#E84A4A] hover:border-[#D4B783]  hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(212,183,131,0.2)] group transition-all duration-300">
          <div className='flex items-start gap-5 '>
            {/* Icon */}
            <div className='w-[50px] h-[50px] rounded-lg bg-[#242220] text-[#E84A4A] flex justify-center items-center flex-shrink-0 group-hover:scale-110 transition-all duration-300'>
              <Briefcase />
            </div>
            {/* Text */}
            <div className='flex flex-col text-left gap-2'>
              <h1 className='text-2xl font-bold leading-tight group-hover:text-[#D4B783]'> Freelance </h1>
              <h2 className='font-semibold text-gray-300 mt-1'>Full Stack Web Developer</h2>
              <p className='flex items-center gap-3 text-gray-400 mb-3'><Calendar size={15} color='#E84A4A'/> Jan 2026 - present </p>
              <div className='border-1 rounded-sm border-gray-700 w-[750px]'></div>
              <p className='text-gray-400 mt-2'> Collaborated on freelance projects to design and build modern, responsive web applications while continuously improving development and problem-solving skills.</p>
            </div>
          </div>
        </motion.div>
       {/* Item 2 - RIGHT */}
        <motion.div
        initial={{ opacity: 0 , x: 40}}
        whileInView={{ opacity: 1 , x: 0}}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ amount: 0.4, once: true }}
        className="absolute bg-[#111114]  top-[350px] right-80 w-[900px] p-10 text-center border rounded-sm border-[#D4B783] hover:border-[#E84A4A] hover:shadow-[0_0_30px_rgba(212,183,131,0.2)] hover:-translate-y-1 group transition-all duration-300">
          <div className='flex items-start gap-5 '>
            {/* Icon */}
            <div className='w-[50px] h-[50px] rounded-lg bg-[#242220] text-[#D4B783] flex justify-center items-center flex-shrink-0 group-hover:scale-110 transition-all duration-300'>
              <GraduationCap />
            </div>
            {/* Text */}
            <div className='flex flex-col text-left gap-2'>
              <h1 className='text-2xl font-bold leading-tight group-hover:text-[#D4B783]'>   APJ Abdul Kalam Technological University </h1>
              <h2 className='font-semibold text-gray-300 mt-1'> B-tech Computer Science and Engineering</h2>
              <p className='flex items-center gap-3 text-gray-400 mb-3'><Calendar size={15} color='#D4B783'/> Sep 2023 - present </p>
              <div className='border-1 rounded-sm border-gray-700 w-[750px]'></div>
              <p className='text-gray-400 mt-2'>Pursuing a degree in Computer Science, building a strong foundation in programming, problem-solving, and software development.</p>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  )
}

export default Journey