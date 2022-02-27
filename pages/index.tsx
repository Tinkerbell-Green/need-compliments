import type {NextPage} from "next";
import React from "react"
import {Calender} from "components/calender"
import {LayoutMain} from "components/layout-main"


const Home: NextPage = () => {
  return (
    <LayoutMain>
      <Calender></Calender>
    </LayoutMain>
    
  )
}

export default Home