import AboutUs from "./AboutUs";
import Banner from "./Banner";
import Features from "./Features";
import Newsletter from "./Newsletter";
import Testimonials from "./Testimonials";

const Home = () => {
    return (
      <div className="">
        <Banner></Banner>
        <Features></Features>
        <AboutUs></AboutUs>
        <Newsletter></Newsletter>
        <Testimonials></Testimonials>

      </div>
    );
};

export default Home;