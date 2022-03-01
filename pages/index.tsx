import type {NextPage} from "next";
import React from "react"
import {Calendar} from "components/calendar"
import {LayoutMain} from "components/layout-main"
import {Sidebar} from "components/sidebar";


const Home: NextPage = () => {
  return (
    <LayoutMain>
      <Sidebar></Sidebar>
      <Calendar></Calendar>
    </LayoutMain>
    
  )
}

export default Home