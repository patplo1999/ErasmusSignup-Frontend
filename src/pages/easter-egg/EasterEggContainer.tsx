import { Buffer } from "buffer";
// React
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// Components
import EasterEgg from "./EasterEgg";
const EasterEggContainer = () => {
    const maxEggCount = 5; 
    const [eggCount, setIsCoordinator] = useState<number>(0);

    const onEgg = () => {
        if(eggCount+1 < maxEggCount){
            setIsCoordinator(eggCount+1);
        }
        else {
            localStorage.setItem("eggStatus", "you got egged");
            window.location.replace(Buffer.from("aHR0cHM6Ly93d3cueW91dHViZS5jb20vd2F0Y2g/dj1kUXc0dzlXZ1hjUQ==", "base64").toString());
        }
    }
    
    useEffect(() => {
        const eggStatus: string|null = localStorage.getItem("eggStatus");
        if(eggStatus){
            setIsCoordinator(maxEggCount+1);
        }
    })

    return <EasterEgg
        onEgg={onEgg}
        eggCount={eggCount}
        maxEggCount={maxEggCount}
    />;
}

export default EasterEggContainer;