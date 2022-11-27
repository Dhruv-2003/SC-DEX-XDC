import React, {useState} from "react";
import Footer from "../Components/Footer";
import Hero from "../Components/Hero";
import Navbar from "../Components/Navbar";

const Home = (): JSX.Element => {
  const [expand, setExpand] = useState<boolean>(false);
  return (
    <div 
    className=
    {`w-screen min-h-screen no-repeat bg-cover ${!expand ? `bg-[url('/img/landing-image.png')]` : `bg-black`}`}>
        <Navbar expand={expand} setExpand={setExpand}/>
        { expand ? null : <Hero /> }
        { expand ? null : <Footer /> }
    </div>
  )
}

export default Home