import { InferGetServerSidePropsType } from "next";
import { ClientSafeProvider, signIn } from "next-auth/react";
import React from "react";
import * as S from "./socialLoginButton.styled";
import Image from "next/image";
import facebookLogo from "../../public/icons/facebook-logo.png";
import googleLogo from "../../public/icons/google-logo.jpeg";
import kakaoLogo from "../../public/icons/kakao-logo.png";
import naverLogo from "../../public/icons/naver-logo.png";

export type Provider = {
  id: string;
  name: string;
};

export type SocialLoginButtonProps = {
  provider: Provider;
};

export const SocialLoginButton = ({ provider }: SocialLoginButtonProps) => (
  <S.Button key={provider.name} onClick={() => signIn(provider.id)}>
    <Image width={50} height={50} quality={100} src={kakaoLogo} alt=""></Image>
    <span>카카오톡으로 계속하기</span>
  </S.Button>
);
