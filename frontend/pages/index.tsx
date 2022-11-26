import React, {useState} from "react";
import Hero from "../Components/Hero";
import Navbar from "../Components/Navbar";

const Home = (): JSX.Element => {
  const [expand, setExpand] = useState<boolean>(false);
  return (
    <div className="w-screen h-screen no-repeat bg-cover bg-[url('/img/landing-image.png')]">
        <Navbar expand={expand} setExpand={setExpand}/>
        {
          expand ? null : <Hero />
        }
    </div>
  )
}

export default Home