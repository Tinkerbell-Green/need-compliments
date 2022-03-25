import type {NextPage} from "next";
import {useRouter} from "next/router"
import {Chip} from "components/atoms/chip"
import {Seo} from "components/atoms/seo";
import {LayoutCenter} from "components/templates/layout-center"
import * as S from "styles/pages/404.styled";

const ErrorPage: NextPage = () => {
  const route = useRouter();
  
  return (
    <LayoutCenter>
      <Seo title="404"></Seo>
      <S.Header>{"아무것도 없어요!"}</S.Header>
      <S.Nav>
        <Chip
          label="이전 페이지로 돌아가기 🧚‍♀️"
          color="lightsalmon"
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