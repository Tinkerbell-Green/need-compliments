import type {NextPage} from "next"
import {useCallback} from "react"
import {useDispatch, useSelector} from "react-redux"
import {testStore} from "store"
import {RootState} from "store/reducers"
import styled from "styled-components"

const TestContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const Test: NextPage = () => {
  const count = useSelector((state: RootState) => state.test.count);
  const dispatch = useDispatch();

  const handleButtonClick = useCallback(()=>{
    dispatch(testStore.return__REPLACE({
      replacement: count +1,
      path: ["count"]
    }));
  },[dispatch, count])

  return (
    <TestContainer>
      <button onClick={handleButtonClick}>{count}</button>
    </TestContainer>   
  )
}

export default Test