import React, { useContext } from "react";
import { Checkbox, FontIcon, MessageBar, Stack, initializeIcons, mergeStyles } from "@fluentui/react";
import TaskListStyle from "./TaskList.Style";
import { ActionTypeEnum, ITask } from "../types";
import { TodoContext } from "../todoProvider";
import TodoString from "../todoString.json"
import TaskDescription from "./TaskDescription";
initializeIcons();
type Props={
  setEditTask:(taskId:string)=>void
}
const TaskList = ({setEditTask}:Props) => {
  const { activeTasks ,dispatch} = useContext(TodoContext);
  const onTaskDelete = (id: string) => {
    if(window.confirm(TodoString.deleteConfirm))
    dispatch({ type: ActionTypeEnum.Delete, data: { id } });
  };
  const onFavoriteClick=(id:string)=>{
    dispatch({type:ActionTypeEnum.ToggleFavorite,data:{id}})
  }
  const checkboxClickedHnd=(id:string)=>{
    dispatch({type:ActionTypeEnum.Completed,data:{id}});
  }
  const onRenderCell = (task: ITask) => {
    return (
      <Stack horizontal key={task.id} className={TaskListStyle.taskItem}>
        <Stack horizontal style={{ width: "85%" }}>
          <Checkbox onChange={()=>{checkboxClickedHnd(task.id)}}/>
          {task.title}
        </Stack>
        <Stack horizontal style={{ width: "15%" }}>
          <TaskDescription task={task}/>
          <FontIcon
            iconName={task.isFav ? "FavoriteStarFill" : "FavoriteStar"}
            className={task.isFav ? mergeStyles(TaskListStyle.iconStyle,{color:"blue"}):TaskListStyle.iconStyle}
            onClick={()=>onFavoriteClick (task.id)}
          />
          <FontIcon iconName="EditNote" className={TaskListStyle.iconStyle} 
          onClick={()=>{
            setEditTask(task.id)
          }}/>
          <FontIcon
            iconName="Delete"
            className={TaskListStyle.iconStyle}
            onClick={()=>onTaskDelete(task.id)}
          />
        </Stack>
      </Stack>
    );
  };

  return <div>{activeTasks.length?activeTasks.map(onRenderCell):<MessageBar>No records to show!</MessageBar>}</div>;
};

export default TaskList;
