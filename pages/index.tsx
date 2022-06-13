import {chunk} from "lodash";
import type {NextPage} from "next";
import {useRouter} from "next/router";
import React, {useMemo, useEffect} from "react";
import {GoalData} from "api"
import {Seo} from "components/atoms/seo";
import {Snackbar} from "components/atoms/snackbar";
import {Tabs} from "components/moleculs/tabs";
import {FeedNotice} from "components/organisms/feedNotice";
import {FeedPublic} from "components/organisms/feedPublic";
import {LayoutMain} from "components/templates/layout-main"
import {useDataSaga, DataActionType,TaskData,GoalData} from "stores/data";
import {Snackbarify} from "utils/snackbarify"

const Home: NextPage = () => {
  const {fetch: getPublicTasksFetch, data: getPublicTasksData} = useDataSaga<DataActionType.GET_PUBLIC_TASKS>(DataActionType.GET_PUBLIC_TASKS, [])
  const router = useRouter();

  useEffect(()=>{
    getPublicTasksFetch({
      startTime: new Date("1999-11-11"),
      endTime: new Date("2222-11-11"),
    })
  },[getPublicTasksFetch])
  
  const tabIndex = useMemo(()=>{
    return router.query.tab;
  },[router.query.tab])

  return (
    <LayoutMain>
      <Snackbarify Snackbar={Snackbar}/>
      <Seo title={"전체 글"}></Seo>
      <Tabs/>
      {tabIndex==="0" && <FeedPublic tasks={getPublicTasksData?.tasks || []}/>}
      {tabIndex==="1" && <FeedNotice/>}
    </LayoutMain>
  );
};

export default Home;
