import React from "react";
import Navbar from "../components/landingPage/navbar";
import Categori from "../components/landingPage/categori";
import BannerFirst from "../components/landingPage/bannerFirst";
import ProductRecomend from "../components/landingPage/productRecomend";
import PopularBrand from "../components/landingPage/popularBrand";
import TrendingSneaker from "../components/landingPage/trendingSneaker";
import FeaturedApparel from "../components/landingPage/featuredApparel";
import BannerProduct from "../components/landingPage/bannerProduct";
import Accessories from "../components/landingPage/accessories";
import Favorit from "../components/landingPage/seasonFavorit";
import NewLauching from "../components/landingPage/newLauching";
import ShoesProduct from "../components/landingPage/shoesProduct";
import ReleaseDate from "../components/landingPage/releaseDate";
import PickForHer from "../components/landingPage/pickForher";

const LandingPages = () => {
    return (
        <>
        <Navbar />
        <Categori />
        <BannerFirst />
        <ProductRecomend />
        <PopularBrand />
        <TrendingSneaker/>
        <FeaturedApparel />
        <BannerProduct />
        <Accessories />
        <Favorit />
        <NewLauching />
        <ShoesProduct />
        <ReleaseDate />
        <BannerFirst />
        <PickForHer />

        </>
    )
}

export default LandingPages;