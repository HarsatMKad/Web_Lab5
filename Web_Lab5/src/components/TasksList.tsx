import TaskUnit from "./TaskUnit";
import ZeroTaskMessage from "./ZeroTaskMessage";
import { useSelector, useDispatch } from "react-redux";
import { moveTask } from "../store/tasksActions";
import { IRootState } from "../types/IRootState";
import { Task } from "../types/Task";

type Props = { showAlert: (alert: JSX.Element) => void };

function TaskList({ showAlert }: Props) {
  const tasks = useSelector((state: IRootState) => state.tasks);
  const dispatch = useDispatch();

  const moveCard = (dragIndex: number, hoverIndex: number) => {
    dispatch(moveTask(dragIndex, hoverIndex));
  };

  if (tasks.length === 0) {
    return <ZeroTaskMessage />;
  } else {
    const taskListResult = tasks.map((task: Task, index: number) => (
      <TaskUnit
        key={`${task.title}-${index}-${task.bodyTask}`}
        index={index}
        moveCard={moveCard}
        showAlert={showAlert}
        task={task}
      />
    ));
    return <div>{taskListResult}</div>;
  }
}

export default TaskList;
