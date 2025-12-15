import AboutUs from "./AboutUs";
import Membership from "./Membership";
import Banner from "./Banner";
import Features from "./Features";
import Newsletter from "./Newsletter";
import Testimonials from "./Testimonials";
import NutritionPlan from "./NutritionPlan";

const Home = () => {
    return (
      <div className="">
        <Banner></Banner>
        <Membership></Membership>
        <Features></Features>
        <AboutUs></AboutUs>
        <Newsletter></Newsletter>
        <NutritionPlan></NutritionPlan> 
        <Testimonials></Testimonials>
      </div>
    );
};

export default Home;