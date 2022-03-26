import {takeEvery} from "redux-saga/effects";
import {DataActionType} from "../actions"
import {createGoal} from "./createGoal";
import {createTask} from "./createTask";
import {deleteGoal} from "./deleteGoal";
import {deleteTask} from "./deleteTask"
import {deleteUser} from "./deleteUser"
import {getCommunityTasks} from "./getCommunityTasks"
import {getGoals} from "./getGoals";
import {getLoggedInUserData} from "./getLoggedInUserData"
import {getTasksByDays} from "./getTasksByDays"
import {updateGoal} from "./updateGoal";
import {updateTask} from "./updateTask";
import {updateUser} from "./updateUser"

export function* dataSaga() {
  yield takeEvery(DataActionType.GET_LOGGED_IN_USER_DATA, getLoggedInUserData)
  yield takeEvery(DataActionType.UPDATE_USER, updateUser)
  yield takeEvery(DataActionType.GET_TASKS_BY_DAYS, getTasksByDays)
  yield takeEvery(DataActionType.GET_COMMUNITY_TASKS, getCommunityTasks)
  yield takeEvery(DataActionType.CREATE_TASK, createTask)
  yield takeEvery(DataActionType.UPDATE_TASK, updateTask)
  yield takeEvery(DataActionType.DELETE_TASK, deleteTask)
  yield takeEvery(DataActionType.GET_GOALS, getGoals)
  yield takeEvery(DataActionType.CREATE_GOAL, createGoal)
  yield takeEvery(DataActionType.UPDATE_GOAL, updateGoal)
  yield takeEvery(DataActionType.DELETE_GOAL, deleteGoal)
  yield takeEvery(DataActionType.DELETE_USER, deleteUser)
}