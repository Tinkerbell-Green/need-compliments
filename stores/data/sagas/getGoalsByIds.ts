import {QueryConstraint, where, documentId} from "firebase/firestore";
import {call, getContext, put} from "redux-saga/effects";
import {dataActionCreators, DataActionInstance, DataActionType} from "../actions";
import {DataSagaStatus, GoalDocument,GoalData} from "../types"; 
import {Repository, GetDocumentsData} from "utils/firebase";

export function* getGoalsByIds(action: DataActionInstance<DataActionType.GET_GOALS_BY_IDS>) {
  const payload = action.payload  
  const sagaKey = payload.key
  const sagaDataActionType = DataActionType.GET_GOALS_BY_IDS

  const repository: Repository = yield getContext("repository");

  yield put(
    dataActionCreators[DataActionType.SET_DATA_STATUS]({
      type: sagaDataActionType,
      key: sagaKey,
      status: DataSagaStatus.LOADING
    })
  );

  try {
    const queryConstraints: QueryConstraint[] = []
    queryConstraints.push(where(documentId(), "in", [...payload.ids]))

    const response: GetDocumentsData<GoalDocument> = yield call(
      [repository, repository.getDocuments],
      {
        path: "goals",
        queryConstraints,
      }
    );

    const  data: GoalData[] = response.docs.map(item => ({
      id: item.id,
      ...item.data(),
    })
    );

    yield put(
      dataActionCreators[DataActionType.SET_DATA_DATA]({
        type: sagaDataActionType,
        key: sagaKey,
        data,
      })
    ); 

    yield put(
      dataActionCreators[DataActionType.SET_DATA_STATUS]({
        type: sagaDataActionType,
        key: sagaKey,
        status: DataSagaStatus.SUCCEEDED
      })
    );
  } catch (error) {
    console.error(error);

    yield put(
      dataActionCreators[DataActionType.SET_DATA_STATUS]({
        type: sagaDataActionType,
        key: sagaKey,
        status: DataSagaStatus.FAILED
      })
    );
  }
}
