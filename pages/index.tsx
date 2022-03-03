import type { NextPage } from "next";
import React from "react";
import { Calendar } from "components/calendar";
import { LayoutMain } from "components/layout-main";

const Home: NextPage = () => {
  return (
    <LayoutMain>
      <Calendar></Calendar>
    </LayoutMain>
  );
};

export default Home;
