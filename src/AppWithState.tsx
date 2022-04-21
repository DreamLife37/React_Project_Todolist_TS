import React, {useState} from 'react';
import './App.css';
import {TodoList} from './components/TodoList/TodoList';
import {v1} from 'uuid';
import {AddItemForm} from "./components/AddItemForm/AddItemForm";
import {ButtonAppBar} from "./components/ButtonAppBar/ButtonAppBar";
import {Container, Grid, Paper} from "@mui/material";

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
  console.log("App with useState");
  const todoList_ID1 = v1();
  const todoList_ID2 = v1();

  const [todoLists, setTodoLists] = useState<TodoListType[]>([
    {id: todoList_ID1, title: "What to Learn", filter: "all"},
    {id: todoList_ID2, title: "What to buy", filter: "all"},
  ]);

  let [tasks, setTasks] = useState<TasksType>({
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
    tasks[todoList_ID] = tasks[todoList_ID].filter(t => t.id !== task_ID);
    setTasks({...tasks});
  }

  function addTask(todoList_ID: string, title: string) {
    let newTask = {id: v1(), title: title, isDone: false};
    tasks[todoList_ID] = [newTask, ...tasks[todoList_ID]];
    setTasks({...tasks});
  }

  function changeTaskTitle(todoList_ID: string, task_ID: string, title: string) {
    let task = tasks[todoList_ID].find(t => t.id === task_ID);
    if (task) {
      task.title = title;
      setTasks({...tasks});
    }
  }

  function changeTaskStatus(todoList_ID: string, task_ID: string, isDone: boolean) {
    let task = tasks[todoList_ID].find(t => t.id === task_ID);
    if (task) {
      task.isDone = isDone;
      setTasks({...tasks});
    }
  }

  function addTodoList(title: string) {
    const newTodoList_ID = v1();
    const newTodoList: TodoListType = {id: newTodoList_ID, title, filter: "all"};
    setTodoLists([newTodoList, ...todoLists]);
    setTasks({...tasks, [newTodoList_ID]: []});
  }

  function changeTodoListTitle(todoList_ID: string, title: string) {
    setTodoLists(todoLists.map(tl => tl.id === todoList_ID ? {...tl, title} : tl));
  }

  function changeTodoListFilter(todoList_ID: string, newValue: FilterValueType) {
    setTodoLists(todoLists.map(tl => tl.id === todoList_ID ? {...tl, filter: newValue} : tl));
  }

  function removeTodoList(todoList_ID: string) {
    setTodoLists(todoLists.filter(tl => tl.id !== todoList_ID));

    delete tasks[todoList_ID];
    setTasks({...tasks});
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
