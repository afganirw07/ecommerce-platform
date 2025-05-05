import React from "react";
import Navbar from "../components/landingPage/navbar";
import Categori from "../components/landingPage/categori";
import BannerFirst from "../components/landingPage/bannerFirst";
import ProductRecomend from "../components/landingPage/productRecomend";

const LandingPages = () => {
    return (
        <>
        <Navbar />
        <Categori />
        <BannerFirst />
        <ProductRecomend /> 
        </>
    )
}

export default LandingPages;