import React, {useReducer} from 'react';
import './App.css';
import {TodoList} from './components/TodoList/TodoList';
import {v1} from 'uuid';
import {AddItemForm} from "./components/AddItemForm/AddItemForm";
import {ButtonAppBar} from "./components/ButtonAppBar/ButtonAppBar";
import {Container, Grid, Paper} from "@mui/material";
import {
  addTodoListAC,
  changeTodoListFilterAC,
  changeTodoListTitleAC,
  removeTodoListAC,
  todoListsReducer
} from "./store/todoListsReducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./store/tasksReducer";

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
  console.log("App with useReducer");
  const todoList_ID1 = v1();
  const todoList_ID2 = v1();

  const [todoLists, dispatchToTodoLists] = useReducer(todoListsReducer, [
    {id: todoList_ID1, title: "What to Learn", filter: "all"},
    {id: todoList_ID2, title: "What to buy", filter: "all"},
  ]);

  let [tasks, dispatchToTasks] = useReducer(tasksReducer, {
    [todoList_ID1]: [
      {id: v1(), title: "HTML&CSS", isDone: true},
      {id: v1(), title: "JS", isDone: true},
      {id: v1(), title: "ReactJS", isDone: false},
      {id: v1(), title: "Rest API", isDone: false},
      {id: v1(), title: "GraphQL", isDone: false},
    ],
    [todoList_ID2]: [
      {id: v1(), title: "Bread", isDone: true},
      {id: v1(), title: "Milk", isDone: true},
      {id: v1(), title: "Salt", isDone: false},
      {id: v1(), title: "Sugar", isDone: false},
      {id: v1(), title: "Cheese", isDone: true},
    ]
  });

  function removeTask(todoList_ID: string, task_ID: string) {
    dispatchToTasks(removeTaskAC(todoList_ID, task_ID));
  }

  function addTask(todoList_ID: string, title: string) {
    dispatchToTasks(addTaskAC(todoList_ID, title));
  }

  function changeTaskTitle(todoList_ID: string, task_ID: string, title: string) {
    dispatchToTasks(changeTaskTitleAC(todoList_ID, task_ID, title));
  }

  function changeTaskStatus(todoList_ID: string, task_ID: string, isDone: boolean) {
    dispatchToTasks(changeTaskStatusAC(todoList_ID, task_ID, isDone));
  }

  function addTodoList(title: string) {
    const action = addTodoListAC(title)
    dispatchToTodoLists(action);
    dispatchToTasks(action);
  }

  function changeTodoListTitle(todoList_ID: string, title: string) {
    dispatchToTodoLists(changeTodoListTitleAC(todoList_ID, title));
  }

  function changeTodoListFilter(todoList_ID: string, newValue: FilterValueType) {
    dispatchToTodoLists(changeTodoListFilterAC(todoList_ID, newValue));
  }

  function removeTodoList(todoList_ID: string) {
    dispatchToTodoLists(removeTodoListAC(todoList_ID));
    dispatchToTasks(removeTodoListAC(todoList_ID));
  }


  return (
    <div className="App">
      <ButtonAppBar/>
      <Container fixed>
        <Grid container style={{padding: "30px"}}>
          <AddItemForm callback={addTodoList}/>
        </Grid>
        <Grid container spacing={3}>
          {todoLists.map(tl => {
            let tasksForTodolist = tasks[tl.id];

            if (tl.filter === "active") {
              tasksForTodolist = tasks[tl.id].filter(t => !t.isDone);
            }
            if (tl.filter === "completed") {
              tasksForTodolist = tasks[tl.id].filter(t => t.isDone);
            }

            return (
              <Grid key={tl.id} item>
                <Paper elevation={5} style={{padding: "15px 25px"}}>
                  <TodoList
                    id={tl.id}
                    title={tl.title}
                    tasks={tasksForTodolist}
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
