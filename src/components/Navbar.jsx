import  { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";


const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
          backgroundColor: scrolled || mobileMenuOpen
            ? "#10131fba"
            : "rgba(0,0,0,0)",
          backdropFilter: scrolled || mobileMenuOpen ? "blur(10px)" : "blur(0px)",
        }}
        transition={{ duration: 0.3 }}
      className="fixed top-0 left-0 pt-[10px] w-full flex justify-between md:justify-around items-center px-6 md:px-0 z-50 font-[family-name:var(--font-kosugi)]">
      <h1 className="text-[#D4B783] font-bold text-lg md:text-xl tracking-widest whitespace-nowrap">MUNEEB MOOSA</h1>

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

      {/* Mobile Menu Toggle */}
      <div className="md:hidden flex items-center p-4">
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="text-gray-300 hover:text-[#D4B783] transition-colors"
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute top-full left-0 w-full bg-[#10131f] border-b border-[#D4B783]/20 md:hidden flex flex-col items-center py-6 gap-6"
          >
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.link}
                onClick={() => setMobileMenuOpen(false)}
                className="text-gray-300 text-lg font-medium hover:text-[#E84A4A] transition-colors"
              >
                {item.name}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

export default Navbar
