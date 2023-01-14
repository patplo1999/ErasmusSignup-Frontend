
// Styles
import "./EasterEgg.scss";
// Assets
import egg from "assets/egg.png"


interface Props {
    onEgg: ()=>void,
    eggCount: number,
    maxEggCount: number,
}

const EasterEgg = ({onEgg, eggCount, maxEggCount }: Props) => {
  return (
    <div className="basket block">  
        {eggCount < maxEggCount ? 
            <img src="https://sebastiank1999.files.wordpress.com/2023/01/egg-1.webp" onClick={onEgg} />
        :
            <img src="https://sebastiank1999.files.wordpress.com/2023/01/eggopened.webp"/>
        }
    </div>
  );
};

export default EasterEgg;
