import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editTask } from "../store/tasksActions";
import { IRootState } from "../types/IRootState";

type Props = { showAlert: (alert: JSX.Element) => void; index: number };

function EditTaskMenu(props: Props) {
  const dispatch = useDispatch();
  const task = useSelector((state: IRootState) => state.tasks[props.index]);

  const inputTitleRef = useRef<HTMLInputElement>(null);
  const inputBodyRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    inputTitleRef.current?.focus();
  }, []);

  function closeAlert() {
    props.showAlert(<></>);
  }

  function handleEditTask() {
    const title = inputTitleRef.current!.value.trim();
    const body = inputBodyRef.current!.value.trim();

    if (title !== "" && body !== "") {
      dispatch(editTask(props.index, title, body));
      props.showAlert(<></>);
    }
  }

  return (
    <div className="blur_background">
      <div className="edit_box">
        <input
          ref={inputTitleRef}
          className="head_input"
          id="edit_input_title_task"
          type="text"
          placeholder="Title..."
          defaultValue={task?.title || ""}
        />
        <textarea
          ref={inputBodyRef}
          className="body_input"
          id="edit_input_body_task"
          placeholder="About..."
          defaultValue={task?.bodyTask || ""}
        ></textarea>

        <div>
          <button
            id="edit_button_cancel"
            className="edit_button"
            onClick={closeAlert}
          >
            Cancel
          </button>
          <button
            id="edit_button_save"
            className="edit_button"
            onClick={handleEditTask}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditTaskMenu;
