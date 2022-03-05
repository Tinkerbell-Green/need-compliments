import type { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";

const GoalsPage: NextPage = () => {
  const router = useRouter();

  const onClick = () => {
    router.push("/");
  };

  return <button onClick={onClick}>home으로 가요</button>;
};

export default GoalsPage;
