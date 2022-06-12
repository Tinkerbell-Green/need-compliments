import {ReactNode,useState,useEffect} from "react";
import {createPortal} from "react-dom";

export type PortalProps= {
  children: ReactNode,
  seletorId:string
}

export const Portal = ({children,seletorId}:PortalProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(()=>{
    setMounted(true);
    if(document.getElementById(seletorId)) return;

    const $rootPortal = document.createElement("div");
    $rootPortal.id=seletorId;
    document.querySelector("body")!.appendChild($rootPortal);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  
  return mounted
    ? createPortal(children, document.getElementById(seletorId)!)
    : null;
};