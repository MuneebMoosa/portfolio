
import {
  GraduationCap,
  Calendar,
  Briefcase,
} from "lucide-react";
import { motion } from "framer-motion";
import { useGetJourneyQuery } from "../services/portfolioApi";

const iconRegistry = {
  Briefcase,
  GraduationCap,
};

const formatDate = (date) => {
  if (!date) return null;

  const [year, month] = date.split("-");

  if (!year || !month) return date;

  return new Date(
    Number(year),
    Number(month) - 1
  ).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
};

const Journey = () => {
  const {
    data: journeyResponse,
    isLoading,
    isError,
    refetch,
  } = useGetJourneyQuery();

  const journey = journeyResponse?.data || [];

  const orderedJourney = [...journey].sort(
    (a, b) =>
      (a.displayOrder ?? 0) - (b.displayOrder ?? 0)
  );


  
  const getVerticalPosition = (index) => {
    if (index === 0) return 50;

    return 350 + (index - 1) * 300;
  };

  const containerHeight =
    orderedJourney.length > 0
      ? getVerticalPosition(orderedJourney.length - 1) + 350
      : 680;

  if (isLoading) {
    return (
      <section className="py-20 text-center text-gray-400">
        Loading journey...
      </section>
    );
  }

  if (isError) {
    return (
      <section className="py-20 text-center">
        <p className="mb-4 text-red-400">
          Failed to load journey.
        </p>

        <button
          onClick={refetch}
          className="rounded-lg bg-[#D4B783] px-5 py-2 text-black"
        >
          Retry
        </button>
      </section>
    );
  }

  return (
    <section id="journey" className="overflow-hidden py-20">
      <div className="mx-auto max-w-7xl px-4">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <p className="mb-3 text-sm uppercase tracking-[0.3em] text-[#D4B783]">
            My Journey
          </p>

          <h2 className="text-3xl font-bold text-white md:text-5xl">
            Education & Experience
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-gray-400">
            My academic background, experience, and the
            milestones that have shaped my journey.
          </p>
        </motion.div>

        {orderedJourney.length === 0 ? (
          <p className="py-12 text-center text-gray-400">
            No journey entries available yet.
          </p>
        ) : (
          <div
            className="relative mt-16 flex flex-col items-center gap-12 md:mt-20 md:block"
            style={{
              minHeight: `${containerHeight}px`,
            }}
          >
            {/* Timeline line */}
            <div className="absolute bottom-0 left-1/2 top-0 hidden -translate-x-1/2 rounded-sm border-l-[6px] border-gray-700 md:block" />

            {orderedJourney.map((item, index) => {
              const isLeft = index % 2 === 0;

              const ItemIcon =
                iconRegistry[item.icon] || Briefcase;

              const accentColor = isLeft
                ? "#E84A4A"
                : "#D4B783";

              const verticalPosition =
                getVerticalPosition(index);

              return (
                <motion.div
                  key={item._id || item.id || index}
                  initial={{
                    opacity: 0,
                    y: 35,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                    amount: 0.15,
                  }}
                  transition={{
                    duration: 0.6,
                    delay: 0.1,
                  }}
                  className={`relative w-full md:absolute md:w-[600px] lg:w-[900px] ${
                    isLeft
                      ? "md:left-20 lg:left-80"
                      : "md:right-20 lg:right-80"
                  }`}
                  style={{
                    top:
                      typeof window !== "undefined" &&
                      window.innerWidth >= 768
                        ? `${verticalPosition}px`
                        : undefined,
                  }}
                >

                  {/* Card — original styling restored */}
                  <div
                    className={`bg-[#111114] w-full p-6 lg:p-10 text-center border rounded-sm ${
                      isLeft
                        ? "border-[#E84A4A] hover:border-[#D4B783]"
                        : "border-[#D4B783] hover:border-[#E84A4A]"
                    } hover:shadow-[0_0_30px_rgba(212,183,131,0.2)] hover:-translate-y-1 group transition-all duration-300`}
                  >
                    <div className="flex flex-col sm:flex-row items-start gap-5">
                      {/* Entry icon */}
                      <div
                        className="w-[50px] h-[50px] rounded-lg bg-[#242220] flex justify-center items-center flex-shrink-0 group-hover:scale-110 transition-all duration-300"
                        style={{
                          color: accentColor,
                        }}
                      >
                        <ItemIcon size={24} />
                      </div>

                      {/* Entry details */}
                      <div className="flex flex-col text-left gap-2 w-full min-w-0">
                        <h2 className="text-xl md:text-2xl font-bold leading-tight group-hover:text-[#D4B783] transition-colors">
                          {item.organization}
                        </h2>

                        <h3 className="font-semibold text-gray-300 mt-1 text-sm md:text-base">
                          {item.roleOrDegree}
                        </h3>

                        {/* Dates */}
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-3">
                          <p className="flex items-center gap-2 text-gray-400 text-xs md:text-sm">
                            <Calendar
                              size={15}
                              color={accentColor}
                            />
                            {formatDate(item.startDate)}
                          </p>

                          <span className="text-gray-500 text-xs">
                            –
                          </span>

                          <p className="flex items-center gap-2 text-gray-400 text-xs md:text-sm">
                            <Calendar
                              size={15}
                              color={accentColor}
                            />
                            {item.endDate
                              ? formatDate(item.endDate)
                              : "Present"}
                          </p>
                        </div>

                        {/* Divider */}
                        <div className="border-t rounded-sm border-gray-700 w-full md:w-[450px] lg:w-[750px]" />

                        {/* Description */}
                        <p className="text-gray-400 mt-2 text-xs md:text-sm">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default Journey;
