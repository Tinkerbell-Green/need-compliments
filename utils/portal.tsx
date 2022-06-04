import {ReactNode,useState,useEffect} from "react";
import {createPortal} from "react-dom";
import {createRoot,hydrateRoot} from "react-dom/client";

export type PortalProps= {
  children: ReactNode,
  selector: string,
}
console.log("1")

const Portal = ({children, selector}:PortalProps) => {
  const [mounted, setMounted] = useState(false)
  console.log("2")
  useEffect(() => {
    setMounted(true);
    console.log("3")
    return ()=>{
      setMounted(false);
      console.log("4")
    }
    // setElement(document.querySelector(selector)!)
  }, [setMounted]);

  // const element =
  //   typeof window !== "undefined" && document.querySelector(selector);
  // return element && children ? createPortal(children, element) : null;
  
  return mounted
    ? createPortal(children, document.querySelector(selector)!)
    : null;
};

export default Portal;