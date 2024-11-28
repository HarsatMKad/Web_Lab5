import { Task } from "../types/Task";

export function resetList() {
  const arr: Task[] = [];
  localStorage.setItem("taskList", JSON.stringify(arr));
}

export function addTask(task: Task) {
  let taskList = JSON.parse(localStorage.getItem("taskList") ?? "[]");
  taskList.push(task);
  localStorage.setItem("taskList", JSON.stringify(taskList));
}

export function editTask(index: number, newTitle: String, newBody: String) {
  let taskList = JSON.parse(localStorage.getItem("taskList") ?? "[]");
  taskList[index].title = newTitle;
  taskList[index].bodyTask = newBody;
  localStorage.setItem("taskList", JSON.stringify(taskList));
}

export function delTask(index: number) {
  let taskList = JSON.parse(localStorage.getItem("taskList") ?? "[]");
  taskList.splice(index, 1);
  localStorage.setItem("taskList", JSON.stringify(taskList));
}

export function getTaskList() {
  let taskList = JSON.parse(localStorage.getItem("taskList") ?? "[]");
  return taskList;
}

export function moveTask(dragIndex: number, hoverIndex: number) {
  const taskList = getTaskList();
  const draggedTask = taskList[dragIndex];
  taskList.splice(dragIndex, 1);
  taskList.splice(hoverIndex, 0, draggedTask);
  localStorage.setItem("taskList", JSON.stringify(taskList));
}
