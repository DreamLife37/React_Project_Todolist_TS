import React, {useCallback} from 'react';
import './App.css';
import {TodoList} from './components/TodoList/TodoList';
import {AddItemForm} from "./components/AddItemForm/AddItemForm";
import {ButtonAppBar} from "./components/ButtonAppBar/ButtonAppBar";
import {Container, Grid, Paper} from "@mui/material";
import {
  addTodoListAC,
  changeTodoListFilterAC,
  changeTodoListTitleAC,
  removeTodoListAC
} from "./store/todoListsReducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./store/tasksReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "./store/store";

export type FilterValueType = "all" | "active" | "completed";

export type TodoListType = {
  id: string
  title: string
  filter: FilterValueType
};

export type TaskType = {
  id: string
  title: string
  isDone: boolean
};

export type TasksType = {
  [key: string]: TaskType[]
};


function App() {
  console.log("App with Redux is called");

  const todoLists = useSelector<AppStateType, Array<TodoListType>>(state => state.todoLists);
  const tasks = useSelector<AppStateType, TasksType>(state => state.tasks);
  const dispatch = useDispatch();

  const removeTask = useCallback((todoList_ID: string, task_ID: string) => {
    dispatch(removeTaskAC(todoList_ID, task_ID));
  }, [dispatch]);

  const addTask = useCallback((todoList_ID: string, title: string) => {
    dispatch(addTaskAC(todoList_ID, title));
  }, [dispatch]);

  const changeTaskTitle = useCallback((todoList_ID: string, task_ID: string, title: string) => {
    dispatch(changeTaskTitleAC(todoList_ID, task_ID, title));
  }, [dispatch]);

  const changeTaskStatus = useCallback((todoList_ID: string, task_ID: string, isDone: boolean) => {
    dispatch(changeTaskStatusAC(todoList_ID, task_ID, isDone));
  }, [dispatch]);

  const addTodoList = useCallback((title: string) => {
    dispatch(addTodoListAC(title));
  }, [dispatch]);

  const changeTodoListTitle = useCallback((todoList_ID: string, title: string) => {
    dispatch(changeTodoListTitleAC(todoList_ID, title));
  }, [dispatch]);

  const changeTodoListFilter = useCallback((todoList_ID: string, newValue: FilterValueType) => {
    dispatch(changeTodoListFilterAC(todoList_ID, newValue));
  }, [dispatch]);

  const removeTodoList = useCallback((todoList_ID: string) => {
    dispatch(removeTodoListAC(todoList_ID));
  }, [dispatch]);


  return (
    <div className="App">
      <ButtonAppBar/>
      <Container fixed>
        <Grid container style={{padding: "30px"}}>
          <AddItemForm callback={addTodoList}/>
        </Grid>
        <Grid container spacing={3}>
          {todoLists.map(tl => {
            return (
              <Grid key={tl.id} item>
                <Paper elevation={5} style={{padding: "15px 25px"}}>
                  <TodoList
                    id={tl.id}
                    title={tl.title}
                    tasks={tasks[tl.id]}
                    filter={tl.filter}
                    addTask={addTask}
                    changeTaskTitle={changeTaskTitle}
                    changeTaskStatus={changeTaskStatus}
                    removeTask={removeTask}
                    changeTodoListTitle={changeTodoListTitle}
                    changeFilter={changeTodoListFilter}
                    removeTodoList={removeTodoList}
                  />
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </div>
  );
}

export default App;
