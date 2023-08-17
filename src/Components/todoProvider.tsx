import React, { createContext, useReducer } from "react";
import {
  ActionTypeEnum,
  IAddAction,
  ICompletedAction,
  IDeleteAction,
  IReducerAction,
  ITask,
  ITodoContext,
  ITodoState,
  IToggleFavoriteAction,
  IUpdateAction,
} from "./types";
import { clone } from "./utility";

export const TodoContext = createContext<ITodoContext>({
  activeTasks: [],
  completedTasks: [],
  dispatch: () => {},
});
type Props = {
  children: React.ReactNode;
};

const addTaskAction = (state: ITodoState, action: IAddAction) => {
  const { data } = action;
  data.id = new Date().toJSON();
  return [action.data, ...state.activeTasks];
};
const deleteTaskAction = (state: ITodoState, action: IDeleteAction) => {
  const activeTasks: ITask[] = clone(state.activeTasks);
  const filteredData = activeTasks.filter((task) => task.id !== action.data.id);
  return filteredData;
};
const deleteCompletedTaskAction = (state: ITodoState, action: IDeleteAction) => {
  const completedTask: ITask[] = clone(state.completedTasks);
  const filteredData = completedTask.filter((task) => task.id !== action.data.id);
  return filteredData;
};
const toggleFavoriteAction = (
  state: ITodoState,
  action: IToggleFavoriteAction
) => {
  const cloneActiveTasks: ITask[] = clone(state.activeTasks);
  const index = cloneActiveTasks.findIndex((x) => x.id === action.data.id);
  console.log(index);
  if (index >= 0) {
    cloneActiveTasks[index].isFav = !cloneActiveTasks[index].isFav;
  }
  return cloneActiveTasks;
};
const updateTaskAction = (state: ITodoState, action: IUpdateAction) => {
  const cloneActiveTasks: ITask[] = clone(state.activeTasks);
  const index = cloneActiveTasks.findIndex((x) => x.id === action.data.id);
  if (index >= 0) {
    cloneActiveTasks[index] = action.data;
  }
  return cloneActiveTasks;
};
const completedTaskAction = (state: ITodoState, action: ICompletedAction) => {
  const activeTasks: ITask[] = clone(state.activeTasks);
  const completedTaskData = activeTasks.find(
    (task) => task.id === action.data.id
  );
  const filteredData = activeTasks.filter((task) => task.id !== action.data.id);
  const completedTask = completedTaskData
    ? [completedTaskData, ...state.completedTasks]
    : [...state.completedTasks];
  return {
    activeTasks: filteredData,
    completedTask,
  };
};
const reducer = (state: ITodoState, action: IReducerAction) => {
  switch (action.type) {
    case ActionTypeEnum.Add:
      return { ...state, activeTasks: addTaskAction(state, action) };
    case ActionTypeEnum.Delete:
      return { ...state, activeTasks: deleteTaskAction(state, action) };
    case ActionTypeEnum.ToggleFavorite:
      return { ...state, activeTasks: toggleFavoriteAction(state, action) };
    case ActionTypeEnum.Update:
      return { ...state, activeTask: updateTaskAction(state, action) };
    case ActionTypeEnum.Completed:
      const data = completedTaskAction(state, action);
      return {
        ...state,
        activeTasks: data.activeTasks,
        completedTasks: data.completedTask,
      };
      case ActionTypeEnum.DeleteCompletedTask:
        return { ...state, completedTaskAction: deleteCompletedTaskAction(state, action) };
  }

  return { ...state };
};

const TodoProvider = (props: Props) => {
  const tasks: ITask[] = [
    {
      id: "1",
      title: "Task 1",
      isFav: true,
    },
    {
      id: "2",
      title: "Task 2",
      isFav: false,
    },
    {
      id: "3",
      title: "task 3 ",
      isFav: true,
    },
  ];
  const data: ITodoState = { activeTasks: tasks, completedTasks: [] };
  const [state, dispatch] = useReducer(reducer, data);
  return (
    <TodoContext.Provider
      value={{
        activeTasks: state.activeTasks,
        completedTasks: state.completedTasks,
        dispatch,
      }}
    >
      {props.children}
    </TodoContext.Provider>
  );
};
export default TodoProvider;
