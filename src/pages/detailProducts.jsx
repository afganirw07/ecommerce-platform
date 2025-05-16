import React from 'react';
import Navbar from '../components/homeUser/navbar';
import NavbarNonUser from '../components/landingPage/navbar';
import DetailProduct from './../components/homeUser/detailProduct';
import RelatedProduct from '../components/homeUser/relatedProduct';
import Footer from '../components/landingPage/footer';

const DetailProducts = () => {

  const token = localStorage.getItem('token');

  return (
    <>
      {token ? <Navbar /> : <NavbarNonUser />}
      <DetailProduct />
      <RelatedProduct />
      <Footer />
    </>
  );
};

export default DetailProducts;
