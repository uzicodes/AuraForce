// eslint-disable-next-line react/prop-types
const CompoHeading = ({ normHeading, colorHeading, desc }) => {
  return (
    <>
      <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 font-heading">
        {normHeading}{" "}
        <span className="bg-gradient-to-r from-[#16A34A] to-[#22C55E] bg-clip-text text-transparent">
          {colorHeading}
        </span>
      </h2>
      <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto font-satoshi">
        {desc}
      </p>
    </>
  );
};

export default CompoHeading;
