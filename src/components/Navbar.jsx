import  { useState, useEffect } from "react";
import { motion } from "framer-motion";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

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
  ]
  return (
    <motion.nav 
      initial={{ backgroundColor: "rgba(0,0,0,0)" }}
        animate={{
          backgroundColor: scrolled
            ? "#10131fba"
            : "rgba(0,0,0,0)",
          backdropFilter: scrolled ? "blur(10px)" : "blur(0px)",
        }}
        transition={{ duration: 0.3 }}
      className="fixed top-0 left-0 pt-[10px] w-full flex justify-around items-center  z-50  font-[family-name:var(--font-kosugi)]">
      <h1 className="text-[#D4B783] font-bold text-xl tracking-widest">MUNEEB MOOSA</h1>

      <div className="flex gap-10 text-sm p-4 text-gray-300">
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
    </motion.nav>
  )
}

export default Navbar