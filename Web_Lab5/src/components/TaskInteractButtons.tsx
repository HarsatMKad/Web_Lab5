import editIcon from "../assets/edit_button_icon.svg";
import shareIcon from "../assets/share_button_icon.svg";
import EditTaskMenu from "./EditTaskMenu";
import ShareTaskMenu from "./ShareTaskMenu";

type Props = { showAlert: (alert: JSX.Element) => void; index: number };

function TaskInteractButtons(props: Props) {
  function showEditMenu() {
    props.showAlert(
      <EditTaskMenu showAlert={props.showAlert} index={props.index} />
    );
  }

  function showShareMenu() {
    props.showAlert(<ShareTaskMenu showAlert={props.showAlert} />);
  }

  return (
    <div className="task_interact_buttons">
      <button
        className="interact_button"
        id="editButton"
        onClick={showEditMenu}
      >
        <img className="button_icon_scale" src={editIcon} alt="" />
      </button>

      <button className="interact_button">i</button>

      <button
        className="interact_button"
        id="shareButton"
        onClick={showShareMenu}
      >
        <img className="button_icon_scale" src={shareIcon} alt="" />
      </button>
    </div>
  );
}

export default TaskInteractButtons;
