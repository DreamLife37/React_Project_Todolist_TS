import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import {TaskType} from "../../App";


export type TaskPropsType = {
  todoList_ID: string
  task: TaskType
  changeTaskTitle: (todoList_ID: string, task_ID: string, title: string) => void
  changeTaskStatus: (todoList_ID: string, task_ID: string, isDone: boolean) => void
  removeTask: (todoList_ID: string, task_ID: string) => void
};

export const Task = React.memo((props: TaskPropsType) => {
  console.log("Task is called");
  const onClickHandler = useCallback(() => {
    props.removeTask(props.todoList_ID, props.task.id)
  }, [props.removeTask, props.todoList_ID, props.task.id]);
  const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    props.changeTaskStatus(props.todoList_ID, props.task.id, e.currentTarget.checked);
  }, [props.changeTaskStatus, props.todoList_ID, props.task.id]);
  const changeTaskTitle = useCallback((title: string) => {
    props.changeTaskTitle(props.todoList_ID, props.task.id, title);
  }, [props.changeTaskTitle, props.todoList_ID, props.task.id]);

  return (
    <div className={props.task.isDone ? "is-done" : ""}>
      <Checkbox onChange={onChangeHandler} checked={props.task.isDone}/>
      <IconButton onClick={onClickHandler} size={"small"}>
        <Delete/>
      </IconButton>
      <EditableSpan value={props.task.title} setValue={changeTaskTitle}/>
    </div>
  );
});