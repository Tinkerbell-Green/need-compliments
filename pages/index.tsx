import type {NextPage} from "next";
import {useRouter} from "next/router";
import React, {useMemo, useEffect,useCallback} from "react";
import {Seo} from "components/atoms/seo";
import {Snackbar} from "components/atoms/snackbar";
import {Tabs} from "components/moleculs/tabs";
import {FeedNotice} from "components/organisms/feedNotice";
import {FeedPublic} from "components/organisms/feedPublic";
import {LayoutMain} from "components/templates/layout-main"
import {useDataSaga, DataActionType} from "stores/data";
import {Snackbarify} from "utils/snackbarify"

const TAB_CONTENTS=["All", "Notice"];

const Home: NextPage = () => {
  const {data: loggedInUserData} = useDataSaga<DataActionType.GET_LOGGED_IN_USER_DATA>(DataActionType.GET_LOGGED_IN_USER_DATA, [])
  const loggedInUserId = useMemo(()=>loggedInUserData?.user.userId,[loggedInUserData]);

  const {fetch: getPublicTasksFetch, data: getPublicTasksData} = useDataSaga<DataActionType.GET_PUBLIC_TASKS>(DataActionType.GET_PUBLIC_TASKS, [])
  const onSucceed = useCallback(()=>{
    getPublicTasksFetch({
      startTime: new Date("1999-11-11"),
      endTime: new Date("2222-11-11"),
    })
  },[getPublicTasksFetch])
  const {fetch: createComplimentFetch} = useDataSaga<DataActionType.CREATE_COMPLIMENT>(DataActionType.CREATE_COMPLIMENT, [], {onSucceed})
  const {fetch: deleteComplimentFetch} = useDataSaga<DataActionType.DELETE_COMPLIMENT>(DataActionType.DELETE_COMPLIMENT, [], {onSucceed})
  const router = useRouter();

  const handleComplimentDelete = useCallback((taskId)=>{
    deleteComplimentFetch({
      id: taskId,
    })
  },[deleteComplimentFetch])

  const handleComplimentCreate = useCallback((emoji,taskId)=>{
    if (!loggedInUserId) return;

    createComplimentFetch({
      input: {
        author: loggedInUserId,
        task: taskId,
        type: emoji,
      }
    })
  },[createComplimentFetch,loggedInUserId])

  useEffect(()=>{
    getPublicTasksFetch({
      startTime: new Date("1999-11-11"),
      endTime: new Date("2222-11-11"),
    })
  },[getPublicTasksFetch])

  const tabQuery = useMemo(()=>{
    return router.query.tab;
  },[router.query.tab])

  return (<>
    <Snackbarify Snackbar={Snackbar}/>
    <Seo title={"칭찬 모아보기"}></Seo>
    <LayoutMain>
      <Tabs TAB_CONTENTS={TAB_CONTENTS}/>
      {tabQuery===TAB_CONTENTS[0] 
      && <FeedPublic 
        tasks={getPublicTasksData?.tasks || []} 
        loggedInUserId={loggedInUserId || null}
        onComplimentCreate={handleComplimentCreate}
        onComplimentDelete={handleComplimentDelete}/>}
      {tabQuery===TAB_CONTENTS[1] && <FeedNotice/>}
    </LayoutMain>
  </>
  );
};

export default Home;
