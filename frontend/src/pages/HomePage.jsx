import Blogs from "../components/Blogs/Blogs";
import Brands from "../components/Brands/Brands";
import CampaignSingle from "../components/CampaignSingle/CampaignSingle";
import Campaigns from "../components/Campaigns/Campaigns";
import Categories from "../components/Categories/Categories";
import Products from "../components/Products/Products";
import Sliders from "../components/Slider/Sliders";

function HomePage() {
  return (
    <>
      <Sliders />
      <Categories />
      <Products />
      <Campaigns />
      <Products />
      <Blogs />
      <Brands />
      <CampaignSingle />
    </>
  );
}

export default HomePage;