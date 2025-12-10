import AboutUs from "./AboutUs";
import Banner from "./Banner";
import Features from "./Features";
import NewsLetter from "./Newsletter";
import Testimonials from "./Testimonials";

const Home = () => {
    return (
      <div className="">
        <Banner></Banner>
        <Features></Features>
        <AboutUs></AboutUs>
        <Testimonials></Testimonials>
        <NewsLetter></NewsLetter>
      </div>
    );
};

export default Home;