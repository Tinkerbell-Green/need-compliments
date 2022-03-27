import Link from "next/link";
import React from "react";
import * as S from "./logo.styled";
import LogoComponent from "public/logo.svg"

export const Logo = () => { 
  return (
    <Link href={"/"} passHref>
      <a><LogoComponent width="150" height="42.86"/></a>
    </Link>
  )
};
