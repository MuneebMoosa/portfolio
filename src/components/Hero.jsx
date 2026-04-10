import { FileDown } from 'lucide-react';
import {FaGithub,FaLinkedinIn,FaInstagram,FaWhatsapp,FaDiscord} from "react-icons/fa";
import heroImage from "../assets/happy.webp"
import { motion } from "framer-motion";
import "../components/Hero.css";

const Hero = () => {

  const path = `M337.911 0.00854492L339.359 0.041748C400.593 1.96326 449.175 70.2468 448.156 153.461C447.13 237.33 396.107 304.607 334.192 303.727L332.744 303.694C274.396 301.863 227.535 239.777 224.129 161.934C221.455 243.803 171.121 308.791 110.263 307.927L108.814 307.893C47.5799 305.972 -1.00296 237.688 0.0157166 154.473C1.04262 70.6042 52.0665 3.32792 113.981 4.20776L115.43 4.24097C173.777 6.07221 220.636 68.157 224.042 145.999C226.716 64.1306 277.053 -0.856299 337.911 0.00854492Z`;

  return (
    <div className='z-10 mt-[125px] md:mt-[150px] lg:mt-[250px] mb-[100px] md:mb-[150px] lg:mb-[250px] flex flex-col lg:flex-row items-center justify-center lg:justify-evenly gap-16 lg:gap-0 px-6'>

      <div className='text-center lg:text-start max-w-[490px] '>
        <h2 className='text-xl md:text-2xl ml-1 text-[#D4B783] font-[family-name:var(--font-kosugi)] '>Hi I'm</h2>
        <div className='text-6xl md:text-8xl font-extrabold flex flex-col text-center lg:text-start'>
          <h1>MUNEEB</h1>
          <h1 className='bg-linear-to-r from-[#D4B783] to-[#A08C64] bg-clip-text text-transparent'>MOOSA</h1>
        </div>

        <p className='font-[family-name:var(--font-kosugi)] text-[#9CA3AF] w-90 md:w-full mt-[20px] md:mt-[40px] text-sm md:text-base'>
          Computer Science student passionate about building modern,
          AI-driven web applications with clean design,
          smooth user experiences, and real-world impact.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 w-full mt-8 text-sm font-[family-name:var(--font-kosugi)] items-center sm:items-stretch">
          <a href="#contact" className="relative flex-1 border border-[#D4B783] text-[#D4B783] p-3 flex items-center justify-center cursor-pointer group transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_30px_rgba(212,183,131,0.2)]">
            <span className="absolute inset-0 bg-[#D4B783] w-0 group-hover:w-full transition-all duration-500 ease-in-out z-0"></span>
            <span className="relative z-10 group-hover:text-black transition duration-300">
              INITIALIZE CONTACT
            </span>
          </a>

          <div className="flex-1 text-[#9CA3AF] p-3 flex items-center justify-center gap-2 hover:text-[#E84A4A] hover:translate-x-1 transition cursor-pointer group">
            <FileDown size={18} className="download-icon" />
            DOWNLOAD CV
          </div>
        </div>

        {/* Icons */}
        <div className="flex justify-center lg:justify-start gap-4 md:gap-6 mt-8">
          {[FaGithub, FaLinkedinIn, FaInstagram, FaWhatsapp, FaDiscord].map((Icon, i) => (
            <div key={i} className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full border border-white/20 text-gray-400 hover:text-[#D4B783] hover:border-[#D4B783] transition cursor-pointer">
              <Icon size={16} className="md:w-5 md:h-5" />
            </div>
          ))}
        </div>
      </div>

      <div className="relative w-[320px] h-[320px] md:w-[360px] md:h-[360px] flex items-center justify-center overflow-visible scale-75 sm:scale-90 md:scale-100">

        {/* SVG (fixed) */}
        <motion.svg
          className="orbit-svg"
          viewBox="0 0 449 308"  // ✅ correct viewBox
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
        >

          {/* Gray track */}
          <path 
            d={path}
            className="orbit-path"
          />

          {/* Moving gold */}
          <motion.path 
            d={path}
            className="orbit-move"
            strokeDasharray="220 1400"
            animate={{ strokeDashoffset: [0, -1600] }}
            transition={{
              repeat: Infinity,
              duration: 6,
              ease: "linear"
            }}
          />

        </motion.svg>

        {/* Image */}
        {/* Gold outer border */}
        <div className="relative w-[300px] h-[300px] md:w-[340px] md:h-[340px] flex items-center justify-center">

          {/* Outer gray ring 1 */}
          <div className="absolute w-[320px] h-[320px] md:w-[360px] md:h-[360px] rounded-full border-[1.5px] border-[#E84A4A]/10 ring2"></div>

            {/* Outer gray ring 2 (5px gap) */}
            <div className="absolute w-[385px] h-[385px] rounded-full border-[1.5px] border-[#D4B783]/10 ring1"></div>

            <div className=" w-[300px] h-[300px] md:w-[340px] md:h-[340px] rounded-full bg-[#D4B783] p-[1px] heartbeat z-10">
              {/* Black inner border */}
              <div className="w-full h-full rounded-full bg-black p-[2px]">
                {/* Image */}
                <div className="w-full h-full rounded-full overflow-hidden">
                  <img 
                    src={heroImage}
                    alt="profile"
                    className="w-full h-full object-cover"
                  />
                </div>

              </div>

          </div>

        </div>


        </div>
      {/* ===================================================== */}

    </div>
  )
}

export default Hero