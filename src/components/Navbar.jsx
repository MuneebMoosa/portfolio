import { useState, useEffect } from "react";
import { motion , AnimatePresence} from "framer-motion";
import {X , Menu} from "lucide-react"
const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "HOME", link: "#" },
    { name: "ABOUT", link: "#about" },
    { name: "SKILLS", link: "#skills" },
    { name: "PROJECTS", link: "#projects" },
    { name: "CONTACT", link: "#contact" },
  ];

  return (
    <motion.nav
      initial={{ backgroundColor: "rgba(0,0,0,0)" }}
      animate={{
        backgroundColor: scrolled ? "#10131fba" : "rgba(0,0,0,0)",
        backdropFilter: scrolled ? "blur(10px)" : "blur(0px)",
      }}
      transition={{ duration: 0.3 }}
      className="fixed top-0 left-0 pt-[10px] w-full flex justify-between md:justify-around items-center px-6 z-50 font-[family-name:var(--font-kosugi)]"
    >
      <h1 className="text-[#D4B783] font-bold text-lg md:text-xl tracking-widest whitespace-nowrap">
        MUNEEB MOOSA
      </h1>

      {/* Desktop Menu */}
      <div className="hidden md:flex gap-10 text-sm p-4 text-gray-300">
        {navItems.map((item) => (
          <a
            key={item.name}
            href={item.link}
            className="relative px-3 py-2 rounded-md text-gray-300
                      transition-all duration-300 ease-in-out transform
                      hover:-translate-y-1
                      hover:bg-[#374151] 
                      hover:text-[#E84A4A] 
                      hover:scale-110
                      after:content-[''] after:absolute after:left-0 after:-bottom-2
                      after:h-[2px] after:w-0 after:bg-[#D4B783]
                      after:transition-all after:duration-300
                      hover:after:w-full"
          >
            {item.name}
          </a>
        ))}
      </div>
      {/* mobile menu */}
      <div className="md:hidden flex items-center p-4"> 
        <button onClick={() => setIsMobile(!isMobile)} className="text-gray-300 hover:text-[#D4B783] transition-colors" >
          {isMobile ? <X size={28} color="#D4B783"/> :  <Menu size={28} />} 
        </button>
        <AnimatePresence>
          {isMobile && (
            <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="md:hidden absolute top-full left-0 w-full bg-[#10131f] flex flex-col items-center py-6 gap-6 border-b border-[#D4B783]/20">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.link}
                  onClick={() => setIsMobile(false)}
                  className="text-gray-300 text-lg font-medium hover:text-[#E84A4A] transition-colors"
                >
                  {item.name}
                </a>
              ))}
            </motion.div>
          )}
         </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;