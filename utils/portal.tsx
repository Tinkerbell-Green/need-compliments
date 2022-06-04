import {ReactNode,useState,useEffect} from "react";
import {createPortal} from "react-dom";

export type PortalProps= {
  children: ReactNode,
}

const Portal = ({children}:PortalProps) => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true);
  }, [setMounted]);
  
  return mounted
    ? createPortal(children, document.querySelector("body")!)
    : null;
};

export default Portal;