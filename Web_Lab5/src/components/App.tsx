import TaskCreateSection from "./TaskCreateSection";
import TaskList from "./TasksList";
import { useState } from "react";
import store from "../store/Store";
import { Provider } from "react-redux";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function App() {
  const [alert, setAlert] = useState<JSX.Element>();

  return (
    <>
      <Provider store={store}>
        {alert}
        <TaskCreateSection />
        <DndProvider backend={HTML5Backend}>
          <TaskList showAlert={setAlert} />
        </DndProvider>
      </Provider>
    </>
  );
}

export default App;
