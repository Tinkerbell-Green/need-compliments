import type {NextPage} from "next";
import {useRouter} from "next/router"
import * as S from "./index.styled";
import {Chip} from "components/atoms/chip"
import {LayoutCenter} from "components/templates/layout-center"

const ErrorPage: NextPage = () => {
  const route = useRouter();
  
  return (
    <LayoutCenter>
      <S.Header>{"존재하지 않는 페이지입니다."}</S.Header>
      <S.Nav>
        <Chip
          label="이전 페이지로 돌아가기 🧚‍♀️"
          color="skyblue"
          onClick={()=>route.back()}
        ></Chip>
        <Chip
          label="홈으로 돌아가기 🧚‍♀️"
          color="skyblue"
          onClick={()=>route.push("/")}
        ></Chip>
      </S.Nav>
    </LayoutCenter>
  )
}

export default ErrorPage;