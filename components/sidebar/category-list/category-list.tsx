import React from "react";
import * as S from "../sidebar.styled";

type CategoryListProps = {
  categories: string[];
  onTitleClick: ()=>void;
}

export const CategoryList = ({onTitleClick,categories}:CategoryListProps)=>{
  return (
    <S.CategoryList>
      <S.Title onClick={()=>onTitleClick()}>목표
        <span>{">"}</span>
      </S.Title>
      {categories.map((value,index)=>(
        <S.Category key={index}>{value}</S.Category>
      ))}
    </S.CategoryList>
  )
}