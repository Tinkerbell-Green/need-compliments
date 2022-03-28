import Link from "next/link";
import React from "react";
import * as S from "./logo.styled";
import LogoComponent from "public/logo.svg"

export const Logo = () => { 
  return (
    <Link href={"/"} passHref>
      <S.Logo role="img" aria-label="칭찬이필요해 로고">
        <LogoComponent width="200" height="66" />
      </S.Logo>
    </Link>
  )
};