import React from 'react';
import Navbar from '../components/homeUser/navbar';
import Categori from '../components/landingPage/categori';
import BannerFirst from '../components/landingPage/bannerFirst';
import ProductRecomend from '../components/landingPage/productRecomend';
import PopularBrand from '../components/landingPage/popularBrand';
import TrendingSneaker from '../components/landingPage/trendingSneaker';
import FeaturedApparel from '../components/landingPage/featuredApparel';
import BannerProduct from '../components/landingPage/bannerProduct';
import SecondBanner from '../components/landingPage/secondBanner';
import Accessories from '../components/landingPage/accessories';
import Favorit from '../components/landingPage/seasonFavorit';
import NewLauching from '../components/landingPage/newLauching';
import ShoesProduct from '../components/landingPage/shoesProduct';
import ReleaseDate from '../components/landingPage/releaseDate';
import PickForHer from '../components/landingPage/pickForher';
import ForKidsproduct from '../components/landingPage/forKids';
import Footer from '../components/landingPage/footer';
import ChatWidget from '../components/homeUser/chatWidget';

const LandingPages = () => {
  return (
    <>
      <Navbar />
      <Categori />
      <ChatWidget />
      <BannerFirst />
      <ProductRecomend />
      <PopularBrand />
      <TrendingSneaker />
      <FeaturedApparel />
      <BannerProduct />
      <Accessories />
      <Favorit />
      <NewLauching />
      <ShoesProduct />
      <ReleaseDate />
      <SecondBanner />
      <PickForHer />
      <ForKidsproduct />
      <Footer />
    </>
  );
};

export default LandingPages;
