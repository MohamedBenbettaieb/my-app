import React, { createContext, useState } from "react";
import HomeStyle from "./Home.Style";
import TodoString from "./todoString.json";
import { Pivot, PivotItem, Stack } from "@fluentui/react";
import { ITask, PivotKeysEnum } from "./types";
import TaskList from "./List/TaskList";
import TodoProvider from "./todoProvider";
import TaskForm from "./TaskForm/TaskForm";
import CompletedTaskList from "./List/CompletedTaskList";

export const TodoContext = createContext<{ activeTasks: ITask[] }>({
  activeTasks: [],
});

const Home = () => {
  const [selectedKey, setSelectedKey] = React.useState<string>(
    PivotKeysEnum.Tasks
  );
  const [editTaskId,setEditTaskId]=useState<string|null>(null)
  const editTask=(id:string)=>{
    setEditTaskId(id)
    setSelectedKey(PivotKeysEnum.TaskForm)
  }  
  return (
      <Stack className={HomeStyle.todoContainer}>
        <TodoProvider>
          <header className={HomeStyle.headerStyle}>
            <h2>{TodoString.header}</h2>
          </header>
          <Stack className={HomeStyle.pivotContainer}>
            <Pivot
              selectedKey={String(selectedKey)}
              styles={{ root: HomeStyle.pivotRoot }}
              onLinkClick={(item?: PivotItem) => {
                if(item?.props.itemKey!==PivotKeysEnum.TaskForm){
                  setEditTaskId(null)
                }
                setSelectedKey(item?.props.itemKey || PivotKeysEnum.Tasks);
              }}
            >
              <PivotItem
                headerText={TodoString.pivots.tasksTab}
                itemKey={PivotKeysEnum.Tasks}
              >
                <TaskList setEditTask={editTask}/>
              </PivotItem>
              <PivotItem
                headerText={TodoString.pivots.taskFormTab}
                itemKey={PivotKeysEnum.TaskForm}
              >
                <TaskForm editTaskId={editTaskId}/>
              </PivotItem>
              <PivotItem
                headerText={TodoString.pivots.completedTaskTab}
                itemKey={PivotKeysEnum.Completed}
              >
              <CompletedTaskList/>
              </PivotItem>
            </Pivot>
          </Stack>
        </TodoProvider>
      </Stack>
    );
  ;
};

export default Home;
