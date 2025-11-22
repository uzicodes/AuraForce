import pic1 from "../../../assets/abou1.jpg";
import pic2 from "../../../assets/abou2.jpg";
import { FaCheck, FaHeart, FaUsers, FaTrophy, FaPlay } from "react-icons/fa";

const AboutUs = () => {
  const stats = [
    { icon: FaUsers, number: "10K+", label: "Happy Members" },
    { icon: FaTrophy, number: "500+", label: "Success Stories" },
    { icon: FaHeart, number: "99%", label: "Satisfaction Rate" },
  ];

  const benefits = [
    "Personalized workout plans tailored to your goals",
    "Real-time progress tracking and analytics",
    "Expert guidance from certified trainers",
    "Supportive community of fitness enthusiasts",
    "Flexible scheduling that fits your lifestyle",
  ];

  return (
    <section className="py-12 md:py-20 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-block bg-[#16A34A]/10 text-[#16A34A] px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-semibold mb-3 md:mb-4">
            Our Story
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4 md:mb-6 px-2">
            <span className="bg-gradient-to-r from-[#16A34A] to-[#22C55E] bg-clip-text text-transparent">
              About
            </span>{" "}
            Our Fit Family
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div className="order-2 lg:order-1 space-y-6 md:space-y-8">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white leading-tight">
              Empowering Your Fitness Journey Since Day One
            </h3>

            <div className="space-y-4 md:space-y-6">
              <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                Welcome to Aura Force, where your fitness journey becomes a story
                of progress, passion, and personal transformation. We believe in
                empowering you with the tools and insights you need to reach
                your goals, one step at a time.
              </p>

              <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                Our mission is to make fitness an integral and enjoyable part of
                your daily life. Whether you're a seasoned athlete or just
                starting out, our intuitive platform offers personalized
                workouts, real-time progress tracking, and a vibrant community
                to keep you motivated.
              </p>
            </div>

            {/* Benefits List */}
            <div className="space-y-3 md:space-y-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-5 h-5 md:w-6 md:h-6 bg-[#16A34A] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <FaCheck className="text-white text-xs" />
                  </div>
                  <span className="text-sm md:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                    {benefit}
                  </span>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 md:gap-6 pt-4">
              {stats.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <div
                    key={index}
                    className="text-center p-3 md:p-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700"
                  >
                    <div className="w-8 h-8 md:w-12 md:h-12 bg-[#16A34A] rounded-full flex items-center justify-center mx-auto mb-2 md:mb-3">
                      <IconComponent className="text-white text-sm md:text-lg" />
                    </div>
                    <div className="text-lg md:text-2xl font-bold text-gray-900 dark:text-white mb-1">
                      {stat.number}
                    </div>
                    <div className="text-xs md:text-sm text-gray-600 dark:text-gray-300">
                      {stat.label}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Images */}
          <div className="order-1 lg:order-2 relative">
            <div className="grid grid-cols-2 gap-4 md:gap-6">
              <div className="space-y-4 md:space-y-6">
                <div className="relative group overflow-hidden rounded-2xl shadow-xl">
                  <img
                    className="w-full h-48 md:h-64 lg:h-72 object-cover transition-transform duration-500 group-hover:scale-110"
                    src={pic1}
                    alt="Fitness training"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
                <div className="bg-[#16A34A] rounded-2xl p-4 md:p-6 text-white">
                  <h4 className="font-bold text-lg md:text-xl mb-2">
                    Join Today
                  </h4>
                  <p className="text-sm md:text-base text-green-100">
                    Start your transformation journey with us
                  </p>
                </div>
              </div>
              <div className="mt-8 md:mt-12 space-y-4 md:space-y-6">
                <div className="relative group overflow-hidden rounded-2xl shadow-xl">
                  <img
                    className="w-full h-48 md:h-64 lg:h-72 object-cover transition-transform duration-500 group-hover:scale-110"
                    src={pic2}
                    alt="Fitness community"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
