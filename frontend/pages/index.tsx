import React from "react";
import Hero from "../Components/Hero";
import Navbar from "../Components/Navbar";

const Home = (): JSX.Element => {
  return (
    <div className=" w-screen h-screen no-repeat bg-cover bg-[url('/img/landing-image.png')]">
        <Navbar />
        <Hero />
    </div>
  )
}

export default Home