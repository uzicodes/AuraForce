import AboutUs from "./AboutUs";
import Membership from "./Membership";
import Banner from "./Banner";
import Features from "./Features";
import Newsletter from "./Newsletter";
import Testimonials from "./Testimonials";
import NutritionPlan from "./NutritionPlan";

interface DbPrice {
  name: string;
  price: number;
}

const Home = ({ dbPrices }: { dbPrices: DbPrice[] }) => {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-emerald-500/40 via-emerald-500/20 to-zinc-950 text-zinc-100 overflow-hidden">
      {/* Enhanced Green Glow Background */}
      <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[140vw] h-[60vh] bg-emerald-500/30 blur-[160px] rounded-full pointer-events-none z-0" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[100vw] h-[40vh] bg-emerald-500/20 blur-[120px] rounded-full pointer-events-none z-0" />
      <div className="relative z-10">
        <Banner />
        <Membership dbPrices={dbPrices} />
        <Features />
        <AboutUs />
        <Newsletter />
        <NutritionPlan />
        <Testimonials />
      </div>
    </div>
  );
};

export default Home;