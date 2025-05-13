import React from 'react';
import InfoCard from './infoCard';

import {
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaApple,
  FaGooglePlay,
} from 'react-icons/fa';

const footerLinks = {
  AirJordan: [
    'Air Jordan 1',
    'Air Jordan 3',
    'Air Jordan 4',
    'Air Jordan 5',
    'Air Jordan 11',
    'Air Jordan 12',
  ],
  Adidas: [
    'Adidas Yeezy',
    'Yeezy Slides',
    'Yeezy Foam RNR',
    'Yeezy Boost 350',
    'Yeezy 700',
    'Campus 00s',
  ],
  NewBalance: [
    'New Balance 2002R',
    'New Balance 1906R',
    'New Balance 530',
    'New Balance 550',
    'New Balance 9060',
    'New Balance 990 V1',
  ],
  Nike: [
    'Air Force 1',
    'Air Max',
    'Nike Dunk',
    'Nike Ja',
    'Nike Kobe',
    'Nike Vomero 5',
  ],
  Converse: [
    'Chuck Taylor All Star',
    'Run Star Hike',
    'Weapon',
    'One Star',
    'CONS AS-1 Pro',
    'Chuck 70',
  ],
  ASICS: [
    'Gel-Kayano 14',
    'Gel-Nimbus 9',
    'Gel-Lyte III',
    'Gel-1130',
    'GT-2160',
    'Gel-Quantum 360',
  ],
  Apparel: [
    'Denim Tears',
    'BAPE',
    'Nike Apparel',
    'Supreme',
    'Travis Scott',
    'Yeezy',
  ],
  Accessories: [
    'Swatch X Omega',
    'Stanley',
    'Designer Sunglasses',
    'Louis Vuitton Accessories',
    'Gucci Accessories',
    'Supreme Accessories',
  ],
  About: [
    'How It Works',
    'Our Process',
    'Newsroom',
    'Company',
    'Careers',
    'ReKicks Review',
  ],
  Sell: [
    'Selling Guide',
    'Professional Tools',
    'StockX Pro',
    'Sponsored Asks',
    'Developers',
  ],
  Help: ['Help Center', 'Contact Us', 'Product Suggestions', 'Size Guide'],
};

export default function Footer() {
  return (
    <>
      <InfoCard />

      <footer className="bg-neutral-300 text-black pt-10 font-[poppins]">
        <div className="px-7 mb-7 mt-5 md:px-10 lg:px-30 xl:px-30 2xl:px-30 font-[poppins] text-black text-4xl font-semibold ">
          <h1>Rekicks. Access the Now.</h1>
        </div>
        <div className="px-7 mt-5 md:px-10 lg:px-30 xl:px-30 2xl:px-30 4 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 text-sm">
          {Object.entries(footerLinks).map(([section, items], idx) => (
            <div key={idx}>
              <h4 className="font-semibold mb-2">
                {section.replace(/([A-Z])/g, ' $1')}
              </h4>
              <ul className="space-y-1">
                {items.map((item, i) => (
                  <li key={i}>
                    <a href="#" className="hover:underline text-black">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        {/* logo */}
        <div className="border-t border-neutral-700 mt-10 py-6 px-4 text-sm text-neutral-400 flex flex-col md:flex-row justify-between items-center max-w-7xl mx-auto gap-4">
          <div className="flex gap-4">
            <a href="#">
              <FaGooglePlay className="w-5 h-5" />
            </a>
            <a href="#">
              <FaApple className="w-5 h-5" />
            </a>
          </div>
          <p className="text-center">©2025 StockX. All Rights Reserved.</p>
          <div className="flex gap-6">
            <a href="#">
              <FaInstagram className="w-5 h-5" />
            </a>
            <a href="#">
              <FaTwitter className="w-5 h-5" />
            </a>
            <a href="#">
              <FaYoutube className="w-5 h-5" />
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
