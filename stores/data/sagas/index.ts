import {takeEvery} from "redux-saga/effects";
import {DataActionType} from "../actions"
import {createComplimentOnTask} from "./createComplimentOnTask";
import {createGoal} from "./createGoal";
import {createTask} from "./createTask";
import {deleteGoal} from "./deleteGoal";
import {deleteTask} from "./deleteTask"
import {deleteUser} from "./deleteUser"
import {getGoals} from "./getGoals";
import {getGoalsByIds} from "./getGoalsByIds";
import {getLoggedInUserData} from "./getLoggedInUserData"
import {getPublicTasks} from "./getPublicTasks"
import {getTasksByDays} from "./getTasksByDays"
import {updateGoal} from "./updateGoal";
import {updateTask} from "./updateTask";
import {updateUser} from "./updateUser"

export function* dataSaga() {
  yield takeEvery(DataActionType.GET_LOGGED_IN_USER_DATA, getLoggedInUserData)
  yield takeEvery(DataActionType.UPDATE_USER, updateUser)
  yield takeEvery(DataActionType.GET_TASKS_BY_DAYS, getTasksByDays)
  yield takeEvery(DataActionType.GET_PUBLIC_TASKS, getPublicTasks)
  yield takeEvery(DataActionType.CREATE_TASK, createTask)
  yield takeEvery(DataActionType.UPDATE_TASK, updateTask)
  yield takeEvery(DataActionType.DELETE_TASK, deleteTask)
  yield takeEvery(DataActionType.GET_GOALS, getGoals)
  yield takeEvery(DataActionType.GET_GOALS_BY_IDS, getGoalsByIds)
  yield takeEvery(DataActionType.CREATE_GOAL, createGoal)
  yield takeEvery(DataActionType.UPDATE_GOAL, updateGoal)
  yield takeEvery(DataActionType.DELETE_GOAL, deleteGoal)
  yield takeEvery(DataActionType.DELETE_USER, deleteUser)
  yield takeEvery(DataActionType.CREATE_COMPLIMENT_ON_TASK, createComplimentOnTask)
}