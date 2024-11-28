import { ADD_TASK, EDIT_TASK, DELETE_TASK, MOVE_TASK } from "./types";

export const addTask = (title: string, body: string) => ({
  type: ADD_TASK,
  payload: { title, body },
});

export const editTask = (index: number, newTitle: string, newBody: string) => ({
  type: EDIT_TASK,
  payload: { index, newTitle, newBody },
});

export const deleteTask = (index: number) => ({
  type: DELETE_TASK,
  payload: { index },
});

export const moveTask = (oldIndex: number, newIndex: number) => ({
  type: MOVE_TASK,
  payload: { oldIndex, newIndex },
});
