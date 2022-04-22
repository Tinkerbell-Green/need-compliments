import {useRouter} from "next/router";
import React,{useCallback, useEffect, useState} from "react";
import * as S from "./tabs.styled";

type TabsProps = {
  children?: React.ReactNode
}
const TAB_CONTENTS=["전체 글", "공지"];

export const Tabs = ({children}:TabsProps)=>{
  const router = useRouter();

  useEffect(()=>{
    router.replace({
      query: {tab: 0}
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  const handleTabClick = useCallback((index:number, value:string)=>{
    router.replace({
      query: {tab: index}
    });
  },[router])

  return (
    <S.Tabs>
      {TAB_CONTENTS.map((value,index)=>
        <S.Tab 
          key={value}
          clicked={router.query.tab === index.toString()}
          onClick={()=>handleTabClick(index,value)}>{value}
        </S.Tab>)}
      {children}
    </S.Tabs>
  )
}