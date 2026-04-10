import { FaReact } from "react-icons/fa";

const SkillBar = ({ name, percent, Icon }) => {
  return (
    <div className="w-full mb-5">

      {/* Top Row */}
      <div className="w-full flex justify-between items-center mb-2 text-[#9CA3AF]">

        {/* Left: Icon + Name */}
        <div className="flex items-center gap-2">
          <Icon className="text-[#9CA3AF] text-lg" />
          <span className="text-sm font-medium">{name}</span>
        </div>

        {/* Right: Percentage */}
        <span className="text-sm ">{percent}%</span>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
        <div
          className="h-2 rounded-full bg-gradient-to-r from-[#D4B783] to-[#E84A4A]"
          style={{ width: `${percent}%` }}
        ></div>
      </div>

    </div>
  );
};

export default SkillBar;