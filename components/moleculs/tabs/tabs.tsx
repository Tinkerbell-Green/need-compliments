import {useRouter} from "next/router";
import React,{useCallback, useEffect, useState} from "react";
import * as S from "./tabs.styled";

type TabsProps = {
  children?: React.ReactNode,
  TAB_CONTENTS:string[],
}

export const Tabs = ({children,TAB_CONTENTS}:TabsProps)=>{
  const router = useRouter();

  useEffect(()=>{
    router.push({
      query: {tab: TAB_CONTENTS[0]}
    },undefined, {shallow: true});
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  const handleTabClick = useCallback((index:number, value:string)=>{
    router.push({
      query: {tab: value}
    },undefined, {shallow: true});
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  return (
    <S.Tabs>
      {TAB_CONTENTS.map((value,index)=>
        <S.Tab
          key={value}
          clicked={router.query.tab === value}
          onClick={()=>handleTabClick(index,value)}>{value}
        </S.Tab>)}
      {children}
    </S.Tabs>
  )
}