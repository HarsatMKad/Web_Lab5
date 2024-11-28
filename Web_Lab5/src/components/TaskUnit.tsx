import { useState, useRef } from "react";
import TaskInteractButtons from "./TaskInteractButtons";
import DelTaskAlert from "./DelTaskAlert";
import { useDrag, useDrop } from "react-dnd";
import { ItemTypes } from "../scripts/ItemTypes";
import { connect, ConnectedProps } from "react-redux";
import { Task } from "../types/Task";

const connector = connect();
type PropsFromRedux = ConnectedProps<typeof connector>;

interface Props extends PropsFromRedux {
  index: number;
  moveCard: (dragIndex: number, hoverIndex: number) => void;
  showAlert: (alert: JSX.Element) => void;
  task: Task;
}

function TaskUnit(props: Props) {
  const [buttonsVisible, setButtonsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: ItemTypes.TASK,
      item: { index: props.index },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [props.index]
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

  return (
    <div ref={ref}>
      <div className="task">
        <div
          className="task_text_area"
          onClick={() => setButtonsVisible(!buttonsVisible)}
        >
          <div className="head_text_stile">{props.task.title}</div>
          <p className="sub_text_stile">{props.task.bodyTask}</p>
        </div>
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

export default connect(null)(TaskUnit);
