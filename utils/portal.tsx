import {ReactNode,useState,useEffect} from "react";
import {createPortal} from "react-dom";

export type PortalProps= {
  children: ReactNode,
  seletorId:string
}

const Portal = ({children,seletorId}:PortalProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(()=>{
    if(document.getElementById(seletorId)) return;

    const $rootPortal = document.createElement("div");
    $rootPortal.id=seletorId;
    document.querySelector("body")!.insertAdjacentElement("afterbegin",$rootPortal);
    // appendChild($rootPortal);

    setMounted(true);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  
  return mounted
    ? createPortal(children, document.getElementById(seletorId)!)
    : null;
};

export default Portal;