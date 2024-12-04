import { useState, useRef } from "react";
import TaskInteractButtons from "./TaskInteractButtons";
import DelTaskAlert from "./DelTaskAlert";
import { useDrag, useDrop } from "react-dnd";
import { ItemTypes } from "../utils/ItemTypes";
import { Task } from "../types/Task";
import { useDispatch, useSelector } from "react-redux";
import { togglePinned } from "../store/tasksActions";
import { IRootState } from "../types/IRootState";
import { getTaskPinnedLength } from "../store/tasksActions";

type Props = {
  index: number;
  moveCard: (dragIndex: number, hoverIndex: number) => void;
  showAlert: (alert: JSX.Element) => void;
  task: Task;
};

export default function TaskUnit(props: Props) {
  const dispatch = useDispatch();
  const [buttonsVisible, setButtonsVisible] = useState<Boolean>(false);
  const [pinned, setPinned] = useState<boolean>(props.task.pinned);
  const ref = useRef<HTMLDivElement>(null);

  const lastPinnedIndex = useSelector((state: IRootState) =>
    getTaskPinnedLength(state)
  );

  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: pinned ? ItemTypes.PINNED_TASK : ItemTypes.TASK,
      item: { index: props.index },
      canDrag: pinned ? false : true,
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [props.index, pinned]
  );

  const [, drop] = useDrop(
    () => ({
      accept: ItemTypes.TASK,
      hover(item: { index: number; type: string; id: string }, monitor) {
        if (!ref.current) {
          return;
        }
        const dragIndex = item.index;
        const hoverIndex = props.index;

        if (dragIndex === hoverIndex) {
          return;
        }

        if (hoverIndex < lastPinnedIndex) {
          return;
        }

        const hoverBoundingRect = ref.current.getBoundingClientRect();
        const hoverMiddleY =
          (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
        const clientOffset = monitor.getClientOffset();
        const hoverClientY = clientOffset!.y - hoverBoundingRect.top;

        if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
          return;
        }

        if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
          return;
        }

        props.moveCard(dragIndex, hoverIndex);
        item.index = hoverIndex;
      },
    }),
    [props.index, props.moveCard]
  );

  drag(drop(ref));

  const openDelMenu = () => {
    props.showAlert(
      <DelTaskAlert showAlert={props.showAlert} index={props.index} />
    );
  };

  function switchPinned() {
    if (lastPinnedIndex >= 3 && !pinned) {
      alert("Maximum pinned tasks!");
    } else {
      dispatch(togglePinned(props.index));
      setPinned(!pinned);
      location.reload();
    }
  }

  return (
    <div ref={ref}>
      <div
        className="task"
        style={
          pinned
            ? {
                borderColor: "#ff7033",
                borderRadius: "32px",
                borderWidth: "8px",
              }
            : {}
        }
      >
        <div
          className="task_text_area"
          onClick={() => setButtonsVisible(!buttonsVisible)}
        >
          <div className="head_text_stile">{props.task.title}</div>
          <p className="sub_text_stile">{props.task.bodyTask}</p>
        </div>

        <button className="del_button" onClick={switchPinned}>
          pin
        </button>

        <button id="delButton" className="del_button" onClick={openDelMenu}>
          X
        </button>
      </div>
      {buttonsVisible && (
        <TaskInteractButtons showAlert={props.showAlert} index={props.index} />
      )}
    </div>
  );
}
