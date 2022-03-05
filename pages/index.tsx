import type { NextPage } from "next";
import React, { useEffect } from "react";
import { Calendar } from "components/calendar";
import { LayoutMain } from "components/layout-main";
import { signIn, signOut, useSession } from "next-auth/react";

const Home: NextPage = () => {
  const { data: session } = useSession();

  useEffect(() => {
    if (!session) {
      signIn();
    }
  }, [session]);

  return !session ? null : (
    <>
      <h1>Hello, {session.user?.name}!</h1>
      <span>{session.user?.email}</span>
      <button onClick={() => signOut()}>Sign Out</button>

      <LayoutMain>
        <Calendar></Calendar>
      </LayoutMain>
    </>
  );
};

export default Home;
