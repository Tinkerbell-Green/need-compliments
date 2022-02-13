export const REPLACE = "test/REPLACE";
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