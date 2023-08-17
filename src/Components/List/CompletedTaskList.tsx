import { useContext } from "react";
import { ActionTypeEnum, ITask } from "../types";
import { Checkbox, FontIcon, Stack, mergeStyles } from "@fluentui/react";
import TaskDescription from "./TaskDescription";
import TaskListStyle from "./TaskList.Style";
import { TodoContext } from "../todoProvider";
import TodoString from "../todoString.json"

const CompletedTaskList = () => {
  const { completedTasks ,dispatch} = useContext(TodoContext);
  const onTaskDelete=(id : string)=>{
    if (window.confirm(TodoString.deleteConfirm)){
        dispatch({type:ActionTypeEnum.DeleteCompletedTask,data:{id}})
    }
  }
  const onRenderCell = (task: ITask) => {
    return (
      <Stack horizontal key={task.id} className={TaskListStyle.taskItem}>
        <Stack
          horizontal
          style={{ width: "85%" }}
          className={TaskListStyle.disabled}
        >
          <Checkbox disabled/>
          <span>{task.title}</span>
        </Stack>
        <Stack horizontal style={{ width: "15%" }}>
          <TaskDescription task={task} />
          <FontIcon
            iconName={task.isFav ? "FavoriteStarFill" : "FavoriteStar"}
            className={mergeStyles(
              TaskListStyle.iconStyle,
              TaskListStyle.disabled
            )}
          />
          <FontIcon
            iconName="Delete"
            className={TaskListStyle.iconStyle}
            onClick={() => onTaskDelete(task.id)}
          />
        </Stack>
      </Stack>
    );
  };
  return <div>{completedTasks.map(onRenderCell)}</div>;
};

export default CompletedTaskList;
