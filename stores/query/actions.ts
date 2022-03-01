export const REPLACE = "query/REPLACE";
type REPLACE_Payload = {
  path: (string | number)[];
  replacement: unknown;
}
export const return__REPLACE = (payload: REPLACE_Payload) => {
  return {
    type: REPLACE,
    payload: payload,
  };
};
export type REPLACE__Instance = ReturnType<typeof return__REPLACE>;

export const CREATE_TASK = "query/CREATE_TASK";
type CREATE_TASK__Payload = {
  reviewId: number
  content: string
};
export const return__CREATE_TASK = (payload: CREATE_TASK__Payload) => {
  return {
    type: CREATE_TASK,
    payload: payload,
  };
};
export type CREATE_TASK_Instance = ReturnType<typeof return__CREATE_TASK>;
