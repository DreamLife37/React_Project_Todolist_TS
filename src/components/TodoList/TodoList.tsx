import React, {useCallback} from 'react';
import {FilterValueType, TaskType} from '../../App';
import {AddItemForm} from "../AddItemForm/AddItemForm";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import {Button, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {Task} from "../Task/Task";

type PropsType = {
  id: string
  title: string
  tasks: Array<TaskType>
  filter: FilterValueType
  addTask: (todoList_ID: string, title: string) => void
  changeTaskTitle: (todoList_ID: string, task_ID: string, title: string) => void
  changeTaskStatus: (todoList_ID: string, task_ID: string, isDone: boolean) => void
  removeTask: (todoList_ID: string, task_ID: string) => void
  changeTodoListTitle: (todoList_ID: string, title: string) => void
  changeFilter: (todoList_ID: string, value: FilterValueType) => void
  removeTodoList: (todoList_ID: string) => void
};

export const TodoList = React.memo((props: PropsType) => {
  console.log("TodoList is called");

  const addTask = useCallback((title: string) => {
    props.addTask(props.id, title);
  }, [props.addTask]);

  const changeTodoListTitle = useCallback((title: string) => {
    props.changeTodoListTitle(props.id, title);
  }, [props.changeTodoListTitle]);

  const removeTodoList = useCallback(() => {
    props.removeTodoList(props.id);
  }, [props.removeTodoList]);

  const onAllClickHandler = useCallback(() => props.changeFilter(props.id, "all"), [props.changeFilter]);
  const onActiveClickHandler = useCallback(() => props.changeFilter(props.id, "active"), [props.changeFilter]);
  const onCompletedClickHandler = useCallback(() => props.changeFilter(props.id, "completed"), [props.changeFilter]);

  let tasksForTodolist = props.tasks;

  if (props.filter === "active") {
    tasksForTodolist = props.tasks.filter(t => !t.isDone);
  }
  if (props.filter === "completed") {
    tasksForTodolist = props.tasks.filter(t => t.isDone);
  }

  return <div>
    <h3>
      <EditableSpan value={props.title} setValue={changeTodoListTitle}/>
      <IconButton onClick={removeTodoList} size={"small"}>
        <Delete/>
      </IconButton>
    </h3>
    <AddItemForm callback={addTask}/>
    <div>
      {tasksForTodolist.map(t =>
        <Task
          key={t.id}
          todoList_ID={props.id}
          task={t}
          changeTaskStatus={props.changeTaskStatus}
          changeTaskTitle={props.changeTaskTitle}
          removeTask={props.removeTask}
        />
      )}
    </div>
    <div>
      <Button
        variant={props.filter === "all" ? "outlined" : "text"}
        size={"small"}
        onClick={onAllClickHandler}
      >
        All
      </Button>
      <Button
        variant={props.filter === "active" ? "outlined" : "text"}
        color={"error"}
        size={"small"}
        onClick={onActiveClickHandler}
      >
        Active
      </Button>
      <Button
        variant={props.filter === "completed" ? "outlined" : "text"}
        color={"success"}
        size={"small"}
        onClick={onCompletedClickHandler}
      >
        Completed
      </Button>
    </div>
  </div>
});
