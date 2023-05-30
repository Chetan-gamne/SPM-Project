import React from "react";
import dynamic from "next/dynamic";

import { client } from "../lib/client";

import Carousel from "../components/carousel";
import Benefits from "../components/Benefits";
const Banners = dynamic(() => import("../components/banners"), { ssr: false });
const Brands = dynamic(() => import("../components/brands"));

const Home = (props: { products: any }) => {
  return (
    <div>
      <Carousel />
      <Benefits />
      <Banners />
      <Brands />
    </div>
  );
};

export default Home;

//Fetching from DemoData
export const getStaticProps = async () => {
  const productQuery = `*[_type=='product']`;
  const products = await client.fetch(productQuery);

  return {
    props: {
      products,
    },
  };
};
