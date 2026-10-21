import { Link } from "react-router-dom";
import {
  FolderKanban,
  Code2,
  GraduationCap,
  ArrowUpRight,
} from "lucide-react";

const sections = [
  {
    title: "Projects",
    description: "Manage your portfolio projects and links.",
    path: "/admin/projects",
    icon: FolderKanban,
  },
  {
    title: "Skills",
    description: "Manage skill categories and percentages.",
    path: "/admin/skills",
    icon: Code2,
  },
  {
    title: "Journey",
    description: "Manage education and work experience.",
    path: "/admin/journey",
    icon: GraduationCap,
  },
];

const Dashboard = () => {
  return (
    <div className="max-w-6xl mx-auto">
      <p className="text-sm text-[#D4B783] mb-3">
        WORKSPACE / OVERVIEW
      </p>

      <h1 className="text-3xl md:text-4xl font-bold">
        Dashboard
      </h1>

      <p className="text-gray-400 mt-3">
        Manage the content displayed on your portfolio.
      </p>

      <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5 mt-10">
        {sections.map((section) => {
          const Icon = section.icon;

          return (
            <Link
              key={section.title}
              to={section.path}
              className="group p-6 rounded-xl bg-[#111114] border border-[#27272a] hover:border-[#D4B783] transition-all duration-300"
            >
              <div className="flex justify-between items-center">
                <div className="p-3 rounded-lg bg-[#242220] text-[#D4B783]">
                  <Icon size={23} />
                </div>

                <ArrowUpRight
                  size={20}
                  className="text-gray-500 group-hover:text-[#D4B783] transition-colors"
                />
              </div>

              <h2 className="text-xl font-semibold mt-6">
                {section.title}
              </h2>

              <p className="text-sm text-gray-400 mt-2">
                {section.description}
              </p>

              <p className="text-sm text-[#D4B783] mt-6">
                Manage section →
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard;