import type {NextPage} from "next"
import React, {useCallback, useEffect} from "react"
import {LayoutNavigation} from "components/templates/layout-navigation";
import {useDataSaga, DataActionType} from "stores/data";
import * as S from "styles/pages/test/feed-public.styled";

const TestFeedPublicPage: NextPage = () => {
  const {fetch: getPublicTasksFetch, data: getPublicTasksData, refetch: getPublicTasksRefetch} = useDataSaga<DataActionType.GET_PUBLIC_TASKS>(DataActionType.GET_PUBLIC_TASKS)
  
  useEffect(()=>{
    getPublicTasksFetch({
      startTime: new Date("1999-11-11"),
      endTime: new Date("2222-11-11"),
    })
  },[getPublicTasksFetch])

  const handleLeftButtonClick = useCallback(()=>{
  },[])

  return (
    <LayoutNavigation
      rightButtonText={"?"}
      title="test feed public"
      onLeftButtonClick={handleLeftButtonClick}
    >
      <S.ListTask>
        {(getPublicTasksData || []).map(item => (
          <S.ListItemTask key={item.id}>
            <S.IdTask>{item.id}</S.IdTask>
            <S.TitleTask>{item.title}</S.TitleTask>
            <S.AuthorTask>{item.author}</S.AuthorTask>
          </S.ListItemTask>
        ))}
      </S.ListTask>
    </LayoutNavigation>   
  )
}

export default TestFeedPublicPage