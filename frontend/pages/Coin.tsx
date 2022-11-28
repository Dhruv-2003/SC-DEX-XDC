import React, {useState} from "react";
import CoinHero from "../Components/CoinHero";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";

const Coin = (): JSX.Element => {
    const [expand, setExpand] = useState<boolean>(false);
    return(
        <div className=
        {`w-screen min-h-screen no-repeat bg-cover ${!expand ? `bg-[url('/img/dark-bg.png')]` : `bg-[#03071E]`}`}
        >
        <Navbar expand={expand} setExpand={setExpand}/>
        {expand ? null : <CoinHero /> }
        <Footer />
        </div>
    )
}

export default Coin