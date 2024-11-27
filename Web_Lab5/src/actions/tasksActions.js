import { ADD_TASK, EDIT_TASK, DELETE_TASK, MOVE_TASK } from "./types";

export const addTask = (title, body) => ({
  type: ADD_TASK,
  payload: { title, body },
});

export const editTask = (index, newTitle, newBody) => ({
  type: EDIT_TASK,
  payload: { index, newTitle, newBody },
});

export const deleteTask = (index) => ({
  type: DELETE_TASK,
  payload: { index },
});

export const moveTask = (oldIndex, newIndex) => ({
  type: MOVE_TASK,
  payload: { oldIndex, newIndex },
});
