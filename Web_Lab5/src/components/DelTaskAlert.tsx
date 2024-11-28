import { useDispatch } from "react-redux";
import { deleteTask } from "../actions/tasksActions";

type Props = { showAlert: (alert: JSX.Element) => void; index: number };

export default function DelTaskAlert(props: Props) {
  const dispatch = useDispatch();

  function handleDelete() {
    dispatch(deleteTask(props.index));
    props.showAlert(<></>);
  }

  function closeAlert() {
    props.showAlert(<></>);
  }

  return (
    <div className="blur_del">
      <div className="alert_box">
        Delete this task?
        <div className="del_button_section">
          <button
            id="choice_button_yes"
            className="choice_button"
            onClick={handleDelete}
          >
            Yes
          </button>
          <button
            id="choice_button_no"
            className="choice_button"
            onClick={closeAlert}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
}
