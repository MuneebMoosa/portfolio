import TextType from './TextType';

const Loader = () => {
  return (
    <div className="fixed inset-0 bg-[#121114] flex items-center justify-center z-50">
      <div className="font-[Orbitron] h-max bg-linear-to-r from-[#D4B783] to-[#E84A4A] bg-clip-text text-transparent text-2xl md:text-4xl lg:text-5xl font-semibold text-center">
        <TextType
          text={["Muneeb Moosa initializing..."]}
          typingSpeed={90}
          pauseDuration={1500}
          showCursor
          cursorCharacter="_"
          deletingSpeed={50}
          variableSpeedEnabled={false}
          cursorBlinkDuration={0.5}
        />
      </div>
    </div>
  );
};



export default Loader;