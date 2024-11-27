import { combineReducers } from "redux";
import {
  addTask,
  editTask,
  delTask,
  moveTask,
} from "../scripts/TaskStorageController";

const initialState = [];

const tasksReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TASK": {
      const newTask = {
        title: action.payload.title,
        bodyTask: action.payload.body,
      };
      const updatedState = [...state, newTask];
      addTask(newTask);
      return updatedState;
    }
    case "EDIT_TASK": {
      const updatedState = state.map((task, idx) => {
        if (idx === action.payload.index) {
          return {
            title: action.payload.newTitle,
            bodyTask: action.payload.newBody,
          };
        }
        return task;
      });
      editTask(
        action.payload.index,
        action.payload.newTitle,
        action.payload.newBody
      );
      return updatedState;
    }
    case "DELETE_TASK": {
      const newState = state.filter((_, idx) => idx !== action.payload.index);
      delTask(action.payload.index);
      return newState;
    }
    case "MOVE_TASK": {
      const { oldIndex, newIndex } = action.payload;
      const movedTask = state[oldIndex];
      let newState = [...state];
      newState.splice(oldIndex, 1);
      newState.splice(newIndex, 0, movedTask);

      moveTask(oldIndex, newIndex);

      return newState;
    }
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  tasks: tasksReducer,
});

export default rootReducer;
