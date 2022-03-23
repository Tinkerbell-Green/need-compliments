import type {NextPage} from "next"
import {useRouter} from "next/router"
import React from "react"
import * as S from "./index.styled";
import {Chip} from "components/atoms/chip"
import {LayoutCenter} from "components/templates/layout-center"

const ExplorePage: NextPage = () => {
  const route = useRouter();
  
  return (
    <LayoutCenter>
      <S.Header>{"준비 중인 페이지 입니다. 곧 만나요 😉"}</S.Header>
      <Chip
        label="이전 페이지로 돌아가기 🧚‍♀️"
        onClick={()=>route.back()}
      ></Chip>
    </LayoutCenter>
  )
}

export default ExplorePage