import type { NextPage } from "next";
import React from "react";
import GoalsFormPage from "./goals/form";
import { Calendar } from "components/calendar";
import { LayoutMain } from "components/layout-main";
import { LayoutNavigation } from "components/layout-navigation";

const Home: NextPage = () => {
  return (
    <LayoutMain>
      {/* <Calendar></Calendar> */}
      <LayoutNavigation title="목표" rightButtonText="확인">
        여기에 폼이 들어와요
      </LayoutNavigation>
    </LayoutMain>
  );
};

export default Home;
