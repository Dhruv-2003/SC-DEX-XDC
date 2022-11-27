import React, {useState} from "react";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import Swap from "../Components/Swap";

const DEX = (): JSX.Element => {
    const [expand, setExpand] = useState<boolean>(false);

    return(
        <div className=
        {`w-screen min-h-screen no-repeat bg-cover ${!expand ? `bg-[url('/img/landing-image.png')]` : `bg-[#03071E]`}`}>
            <Navbar expand={expand} setExpand={setExpand}/>
            <Swap />
            <Footer />
        </div>
    )
}

export default DEX