import React from 'react';
import Navbar from '../components/homeUser/navbar';
import DetailProduct from './../components/homeUser/detailProduct';
import RelatedProduct from '../components/homeUser/relatedProduct';
import Footer from '../components/landingPage/footer';

const DetailProducts = () => {
  return (
    <>
      <Navbar />
      <DetailProduct />
      <RelatedProduct />
      <Footer />
    </>
  );
};

export default DetailProducts;
