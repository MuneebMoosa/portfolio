import { CodeXml, FolderKanban } from "lucide-react";
import { FaReact, FaJs, FaServer, FaNodeJs, FaDatabase, FaGitAlt, FaGithub, FaDocker, FaAws, } from "react-icons/fa";
import { SiTailwindcss, SiRedux, SiFramer, SiExpress, SiMongodb, SiMysql, SiPostman, } from "react-icons/si";
import { VscVscode } from "react-icons/vsc";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

import SkillBar from "./skills/SkillBar";
import { useGetSkillsQuery } from "../services/portfolioApi";

const iconRegistry = {
  FaReact,
  FaJs,
  FaServer,
  FaNodeJs,
  FaDatabase,
  FaGitAlt,
  FaGithub,
  FaDocker,
  FaAws,
  SiTailwindcss,
  SiRedux,
  SiFramer,
  SiExpress,
  SiMongodb,
  SiMysql,
  SiPostman,
  VscVscode,
  CodeXml,
  FolderKanban,
};

const Skills = () => {
  const containerRef = useRef(null);

  const {
    data: response,
    isLoading,
    isError,
    refetch,
  } = useGetSkillsQuery();

  // Expected API response: { success: true, data: [...] }
  const skills = Array.isArray(response?.data)
    ? response.data
    : [];

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const isMobile =
    typeof window !== "undefined" && window.innerWidth < 898;

  const x = useTransform(
    scrollYProgress,
    [0, 1],
    isMobile ? ["0%", "-490%"] : ["0%", "-90%"]
  );

  if (isLoading) {
    return (
      <section
        id="skills"
        className="min-h-[50vh] flex items-center justify-center text-[#9CA3AF]"
      >
        Loading skills...
      </section>
    );
  }

  if (isError) {
    return (
      <section
        id="skills"
        className="min-h-[50vh] flex flex-col items-center justify-center gap-4 text-[#9CA3AF]"
      >
        <p>Unable to load skills.</p>

        <button
          onClick={() => refetch()}
          className="rounded-sm border border-[#28313d] px-4 py-2 hover:border-[#E84A4A]"
        >
          Retry
        </button>
      </section>
    );
  }

  return (
    <div
      ref={containerRef}
      className="mb-[50px] md:mb-[100px]"
      id="skills"
    >
      <div className="h-[250vh] md:h-[300vh]">
        <div className="sticky top-0 h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
          <h1 className="text-3xl md:text-5xl font-extrabold text-center">
            CORE{" "}
            <span className="text-[#9CA3AF]">
              COMPETENCIES
            </span>
          </h1>

          <p className="mt-6 md:mt-10 mb-10 md:mb-20 text-sm md:text-base text-[#9CA3AF] font-[family-name:var(--font-kosugi)] text-center max-w-2xl">
            The tools and technologies I use to build scalable,
            high-performance digital experiences.
          </p>

          {skills.length === 0 ? (
            <p className="text-[#9CA3AF]">
              No skills available yet.
            </p>
          ) : (
            <div className="w-full max-w-[1200px] mx-auto px-6 md:px-10 overflow-hidden">
              <motion.div
                style={{ x }}
                className="flex gap-4 md:gap-6"
              >
                {skills
                  .slice()
                  .sort(
                    (a, b) => (a.order ?? 0) - (b.order ?? 0)
                  )
                  .map((category) => {
                    const CategoryIcon =
                      iconRegistry[category.icon] ?? FolderKanban;

                    const categorySkills = Array.isArray(
                      category.skills
                    )
                      ? category.skills
                      : [];

                    return (
                      <div
                        key={category._id ?? category.category}
                        className="w-[300px] md:w-[400px] flex-shrink-0 h-max p-5 bg-[#111114] border rounded-xl border-[#111827] flex flex-col items-center justify-center hover:border-[#E84A4A] hover:shadow-[0_0_30px_rgba(212,183,131,0.2)] transition-all duration-300"
                      >
                        {/* Category heading */}
                        <div className="flex items-center gap-3 font-[family-name:var(--font-kosugi)] mb-6 md:mb-10 mt-[10px]">
                          <div className="w-[40px] h-[40px] md:w-[50px] md:h-[50px] rounded-lg bg-[#242220] text-[#D4B783] flex justify-center items-center">
                            <CategoryIcon
                              size={20}
                              className="md:w-6 md:h-6"
                            />
                          </div>

                          <h2 className="text-xl md:text-3xl font-bold">
                            {category.category}
                          </h2>
                        </div>

                        {/* Skills and percentage bars */}
                        <div className="w-full">
                          {categorySkills.map((skill) => {
                            const Icon =
                              iconRegistry[skill.icon] ?? CodeXml;

                            return (
                              <SkillBar
                                key={skill._id ?? skill.name}
                                name={skill.name}
                                percent={skill.percent}
                                Icon={Icon}
                              />
                            );
                          })}

                          {categorySkills.length === 0 && (
                            <p className="text-sm text-[#9CA3AF] text-center">
                              No skills in this category yet.
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })}
              </motion.div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Skills;
