import React,{useState} from "react";
import * as S from "./tabs.styled";

type TabsProps = {
  children?: React.ReactNode
}
const TAB_CONTENTS=["전체 글", "📍 공지"];

export const Tabs = ({children}:TabsProps)=>{
  const [focusedTab, setFocusedTab] = useState(TAB_CONTENTS[0]);

  return (
    <S.Tabs>
      {TAB_CONTENTS.map((value)=>
        <S.Tab 
          key={value}
          id={value}
          clicked={focusedTab === value}
          onClick={()=>setFocusedTab(value)}>{value}
        </S.Tab>)}
      {children}
    </S.Tabs>
  )
}