'use client';

const TrainerBooked = ({ trainer }) => {
  const trainerDatas = trainer || {};
  //  console.log(trainerDatas);
  const {
    _id,
    name,
    availableDay,
    availableTime,
    expertise,
    email,
    experience,
    category,
    bio,
    certification,
    pic,
  } = trainerDatas;
  return (
    <div>
      <div className="flex flex-col md:flex-row items-center justify-between min-h-[calc(100vh-216px)] p-10">
        {/* heading */}
        <div className="w-full ">
          <h1 className="text-4xl font-semibold">Trainer Name: {name}!</h1>
          <h4 className="mt-5 my-4 text-4xl">Trainer Certifications</h4>
          {certification.map((crtificate) => (
            <h5 key={_id}>
              <ol className="list-disc ml-9">
                <li className="mb-4">
                  <p className="text-lg">{crtificate.value}</p>
                </li>
              </ol>
            </h5>
          ))}
          <div>
            <h4 className="my-10 text-4xl">Description</h4>
            <p className="">{bio}</p>
          </div>
        </div>
        {/* image */}
        <div className="">
          <img src={pic} className="w-full rounded-full h-96 " />
        </div>
      </div>

      {/* plans */}
      <div className="mt-10">
        <h1 className="text-center bg-[#caf0f8] py-3 text-4xl font-bold ">
          Choose your Plan
        </h1>
        <div className="grid mt-12 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-32">
          {/* c1 */}
          <div className="card text-white bg-[#FFC100] shadow-xl">
            <div className="card-body">
              <h2 className="card-title">Basic Membership</h2>
              <h3 className="text-2xl font-extrabold">
                $10/<sub>mo</sub>{" "}
              </h3>
              <p>Access to gym facilities during regular operating hours.</p>
              <p>Use of cardio and strength training equipment.</p>
              <p>Access to locker rooms and showers.</p>
              <div className="card-actions justify-end">
                <button className="bg-white text-black py-3 px-5 border-2 border-white hover:bg-[#FFC100] transition-colors duration-300">
                  Buy Now
                </button>
              </div>
            </div>
          </div>
          {/* c2 */}
          <div className="card text-white bg-[#E178C5] shadow-xl">
            <div className="card-body">
              <h2 className="card-title">Standard Membership</h2>
              <h3 className="text-2xl font-extrabold">
                $50/<sub>mo</sub>{" "}
              </h3>
              <p>All benefits of the basic membership.</p>
              <p>
                Access to group fitness classes such as yoga, spinning, and
                Zumba.
              </p>
              <p>Use of additional amenities like a sauna or steam room.</p>
              <div className="card-actions justify-end">
                <button className="bg-white text-black py-3 px-5 border-2 border-white hover:bg-[#E178C5] transition-colors duration-300">
                  Buy Now
                </button>
              </div>
            </div>
          </div>
          {/* c3 */}
          <div className="card text-white bg-[#ff006e] shadow-xl">
            <div className="card-body">
              <h2 className="card-title">Premium Membership</h2>
              <h3 className="text-2xl font-extrabold">
                $100/<sub>mo</sub>{" "}
              </h3>
              <p>All benefits of the standard membership.</p>
              <p>
                Access to personal training sessions with certified trainers.
              </p>
              <p>
                Discounts on additional services such as massage therapy or
                nutrition counseling.
              </p>
              <div className="card-actions justify-end">
                <button className="bg-white text-black py-3 px-5 border-2 border-white hover:bg-[#ff006e] transition-colors duration-300">
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainerBooked;
