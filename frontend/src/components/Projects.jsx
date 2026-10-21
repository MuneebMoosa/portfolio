import { FaReact, FaGithub, FaCss3Alt, FaNodeJs, } from "react-icons/fa";
import { SiTailwindcss, SiRedux, SiExpress, SiMongodb, SiJavascript, SiGooglechrome, SiWebrtc, SiSocketdotio, } from "react-icons/si";
import { Layers, Code, Puzzle, FolderKanban, } from "lucide-react";
import Reveal from "./animations/Reveal";
import TiltAnimation from "./TiltAnimation";
import { useGetProjectsQuery } from "../services/portfolioApi";

// Maps icon names from MongoDB to React components.
const iconRegistry = {
  FaReact,
  FaCss3Alt,
  FaNodeJs,
  FaGithub,
  SiTailwindcss,
  SiRedux,
  SiExpress,
  SiMongodb,
  SiJavascript,
  SiGooglechrome,
  SiWebrtc,
  SiSocketdotio,
  Layers,
  Code,
  Puzzle,
  FolderKanban,
};

const typeStyles = {
  "Full Stack": {
    color: "text-[#61DAFB]",
    background: "bg-[#192029]",
    border: "border-[#28313d]",
  },
  Frontend: {
    color: "text-[#3aad3d]",
    background: "bg-[#192029]",
    border: "border-[#235025]",
  },
  Backend: {
    color: "text-[#47A248]",
    background: "bg-[#192029]",
    border: "border-[#28313d]",
  },
  "Chrome Extension": {
    color: "text-[#A78BFA]",
    background: "bg-[#1E1B2E]",
    border: "border-[#3B2F63]",
  },
  "AI/ML": {
    color: "text-[#A78BFA]",
    background: "bg-[#1E1B2E]",
    border: "border-[#3B2F63]",
  },
  "Mobile App": {
    color: "text-[#61DAFB]",
    background: "bg-[#192029]",
    border: "border-[#28313d]",
  },
  Other: {
    color: "text-[#9CA3AF]",
    background: "bg-[#192029]",
    border: "border-[#28313d]",
  },
};

const technologyColors = {
  FaReact: "text-[#61DAFB]",
  FaNodeJs: "text-[#47A248]",
  FaCss3Alt: "text-[#1572B6]",
  SiTailwindcss: "text-[#38BDF8]",
  SiRedux: "text-[#764ABC]",
  SiExpress: "text-white",
  SiMongodb: "text-[#47A248]",
  SiJavascript: "text-[#F7DF1E]",
  SiGooglechrome: "text-[#4285F4]",
  SiWebrtc: "text-red-500",
  SiSocketdotio: "text-gray-200",
};

const Projects = () => {
  const {
    data: response,
    isLoading,
    isError,
    refetch,
  } = useGetProjectsQuery();

  const projects = response?.data ?? [];

  return (
    <section
      className="mt-[100px] md:mt-[200px] mb-[50px] px-6"
      id="projects"
    >
      <h1 className="text-4xl md:text-5xl font-extrabold text-center">
        MY<span className="text-[#9CA3AF]"> PROJECTS</span>
      </h1>

      <p className="mt-6 md:mt-10 text-sm md:text-base text-[#9CA3AF] font-[family-name:var(--font-kosugi)] text-center max-w-2xl mx-auto">
        A collection of projects built across different technologies,
        focused on solving real-world problems and continuous learning.
      </p>

      <div className="mt-16 md:mt-20 flex flex-col justify-center items-center gap-10">
        {isLoading && (
          <p className="text-[#9CA3AF] text-center">
            Loading projects...
          </p>
        )}

        {isError && (
          <div className="text-center text-[#9CA3AF]">
            <p>Unable to load projects. Please try again.</p>

            <button
              onClick={() => refetch()}
              className="mt-3 rounded-sm border border-[#28313d] px-4 py-2 hover:border-[#E84A4A] transition-all"
            >
              Retry
            </button>
          </div>
        )}

        {!isLoading && !isError && projects.length === 0 && (
          <p className="text-[#9CA3AF] text-center">
            No projects available yet.
          </p>
        )}

        {projects.map((project, index) => {
          const typeName =
            typeof project.type === "string"
              ? project.type
              : project.type?.name;

          const TypeIcon =
            iconRegistry[
              typeof project.type === "object"
                ? project.type?.icon
                : ""
            ] ?? FolderKanban;

          const badgeStyle = typeStyles[typeName] ?? typeStyles.Other;

          const reversed = index % 2 === 1;

          return (
            <Reveal key={project._id}>
              {/* Fixed width wrapper for every project card */}
              <div className="w-full min-w-0 max-w-[1040px] mx-auto">
                <TiltAnimation
                  shadowColor="none"
                  tilt={3}
                  cursorShadow="56,62,72"
                  radius="8px"
                >
                  <article
                    className={`w-full min-w-0 box-border bg-[#111114] border border-[#1a1c1f] rounded-lg p-6 md:p-7 flex flex-col ${
                      reversed ? "md:flex-row-reverse" : "md:flex-row"
                    } gap-8 md:gap-10 hover:border-[#E84A4A] transition-all duration-300`}
                  >
                    {/* Project image */}
                    <div className="w-full md:w-[400px] md:flex-shrink-0 aspect-video bg-white rounded-lg border border-[#28313d] z-10">
                      {project.image && (
                        <img
                          src={project.image}
                          alt={project.title}
                          loading="lazy"
                          className="w-full h-full object-cover rounded-lg"
                        />
                      )}
                    </div>

                    {/* Keep your existing project details div here */}

                    {/* Project details */}
                    <div className="flex flex-col gap-6 md:gap-8 flex-1 min-w-0 z-10">
                      <div className="flex flex-wrap gap-3 items-center">
                        <h2 className="font-bold text-2xl md:text-3xl">
                          {project.title}
                        </h2>

                        <div
                          className={`rounded-xl min-h-5 w-max ${badgeStyle.color} border ${badgeStyle.background} ${badgeStyle.border} flex justify-center items-center px-3 py-2 gap-1 text-xs`}
                        >
                          <TypeIcon size={14} />
                          {typeName}
                        </div>
                      </div>

                      <p className="text-start text-[#9CA3AF] text-sm md:text-base">
                        {project.description}
                      </p>

                      {/* Technology badges */}
                      <div className="flex flex-wrap gap-2 md:gap-4">
                        {(project.techStack ?? []).map((tech) => {
                          const TechIcon =
                            iconRegistry[tech.icon] ?? Code;

                          const iconColor =
                            technologyColors[tech.icon] ??
                            "text-[#9CA3AF]";

                          return (
                            <div
                              key={tech.name}
                              className={`flex gap-2 items-center text-xs md:text-sm ${iconColor} w-max bg-[#192029] border border-[#28313d] rounded-sm px-2 py-1 hover:border-[#D4B783] transition-all duration-300`}
                            >
                              <TechIcon />
                              {tech.name}
                            </div>
                          );
                        })}
                      </div>

                      {/* Project links */}
                      <div className="flex w-full gap-3">
                        {project.githubUrl && (
                          <a
                            className="flex-1 min-w-0 rounded-sm bg-[#192029] min-h-10 border border-[#28313d] text-sm md:text-base font-bold flex items-center justify-center gap-3 px-3 py-2 hover:border-[#A78BFA] transition-all duration-300"
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <FaGithub />
                            Source Code
                          </a>
                        )}

                        {project.liveUrl && (
                          <a
                            className="flex-1 min-w-0 rounded-sm bg-[#192029] min-h-10 border border-[#28313d] text-sm md:text-base font-bold flex items-center justify-center gap-3 px-3 py-2 hover:border-[#61DAFB] transition-all duration-300"
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            View Live Project
                          </a>
                        )}
                      </div>
                    </div>
                  </article>
                </TiltAnimation>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
};

export default Projects;