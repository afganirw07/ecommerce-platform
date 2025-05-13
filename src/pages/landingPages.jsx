import React, { use } from 'react';
import Navbar from '../components/landingPage/navbar';
import Categori from '../components/landingPage/categori';
import BannerFirst from '../components/landingPage/bannerFirst';
import ProductRecomend from '../components/landingPage/productRecomend';
import PopularBrand from '../components/landingPage/popularBrand';
import TrendingSneaker from '../components/landingPage/trendingSneaker';
import FeaturedApparel from '../components/landingPage/featuredApparel';
import BannerProduct from '../components/landingPage/bannerProduct';
import Accessories from '../components/landingPage/accessories';
import Favorit from '../components/landingPage/seasonFavorit';
import NewLauching from '../components/landingPage/newLauching';
import ShoesProduct from '../components/landingPage/shoesProduct';
import ReleaseDate from '../components/landingPage/releaseDate';
import PickForHer from '../components/landingPage/pickForher';
import ForKidsproduct from '../components/landingPage/forKids';
import Footer from '../components/landingPage/footer';

// bagian inti
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPages = () => {
  const navigate = useNavigate();

  // kalo dh ada token langsung ke home
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/home');
    }
  }, []);

  return (
    <>
      <Navbar />
      <Categori />
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
      <BannerFirst />
      <PickForHer />
      <ForKidsproduct />
      <Footer />
    </>
  );
};

export default LandingPages;
