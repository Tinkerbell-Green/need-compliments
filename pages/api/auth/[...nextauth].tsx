import NextAuth, {Session, User} from "next-auth";
import {JWT} from "next-auth/jwt";
import GoogleProvider from "next-auth/providers/google";
import KakaoProvider from "next-auth/providers/kakao";
import NaverProvider from "next-auth/providers/naver";

export default NextAuth({
  providers: [
    KakaoProvider({
      clientId: process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID || "",
      clientSecret: process.env.NEXT_PUBLIC_KAKAO_CLIENT_SECRET || "",
    }),

    NaverProvider({
      clientId: process.env.NEXT_PUBLIC_NAVER_CLIENT_ID || "",
      clientSecret: process.env.NEXT_PUBLIC_NAVER_CLIENT_SECRET || "",
    }),

    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_ID || "",
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_SECRET || "",
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    session: async (params: {
      session: Session;
      user: User;
      token: JWT;
    }) => {
      const newSession: NewSession = {
        ...params.session,
        user: {
          ...params.session.user,
          id: params.token?.sub || ""
        }
      }

      return Promise.resolve(newSession);
    },
    redirect: ({url, baseUrl}) =>{
      return baseUrl
    }
  }
});

export type NewSession = Session & {user: Session["user"] & {id: string}}

