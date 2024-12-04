import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../store/tasksActions";

export default function TaskCreateSection() {
  const dispatch = useDispatch();

  const inputTitleRef = useRef<HTMLInputElement>(null);
  const inputBodyRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputTitleRef.current?.focus();
  }, []);

  function handleAddTask() {
    const title = inputTitleRef.current!.value.trim();
    const body = inputBodyRef.current!.value.trim();

    if (title !== "" && body !== "") {
      dispatch(addTask(title, body));
    }
  }

  return (
    <div className="create_task_form">
      <div className="tasks_inputs">
        <input
          ref={inputTitleRef}
          className="create_tasks_input"
          id="title_tasks_input"
          type="text"
          placeholder="Title..."
        />
        <input
          ref={inputBodyRef}
          className="create_tasks_input"
          id="body_tasks_input"
          type="text"
          placeholder="About..."
        />
      </div>
      <button className="add_button" onClick={handleAddTask}>
        +
      </button>
    </div>
  );
}
