import React from "react";
import * as S from "../sidebar.styled";

type CategoryListProps = {
  categories: string[];
}

export const CategoryList = ({categories}:CategoryListProps)=>{
  return (
    <S.CategoryList>
      <S.Title>목표
        <span>{">"}</span>
      </S.Title>
      {categories.map((value,index)=>(
        <S.Category key={index}>{value}</S.Category>
      ))}
    </S.CategoryList>
  )
}