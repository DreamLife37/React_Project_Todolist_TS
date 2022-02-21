import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';

export type FilterValuesType = "all" | "active" | "completed";

function App() {

    let [tasks, setTasks] = useState([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
        {id: v1(), title: "Rest API", isDone: false},
        {id: v1(), title: "GraphQL", isDone: false},
    ]);

    function removeTask(id: string) {
        let filteredTasks = tasks.filter(t => t.id != id);
        setTasks(filteredTasks);
    }

    function addTask(title: string) {
        let task = {id: v1(), title: title, isDone: false};
        let newTasks = [task, ...tasks];
        setTasks(newTasks);
    }

    let [filter, setFilter] = useState<FilterValuesType>("all");

    let tasksForTodolist = tasks;

    if (filter === "active") {
        tasksForTodolist = tasks.filter(t => t.isDone === false);
    }
    if (filter === "completed") {
        tasksForTodolist = tasks.filter(t => t.isDone === true);
    }

    function changeFilter(value: FilterValuesType) {
        setFilter(value);
    }

    const changeStatus = (taskId: string, isDone: boolean) => {

        //Поиск task с помощью цикла for:
        // for (let i = 0; i < tasks.length ; i++)    {
        //     let el=tasks[i] //el один из элементов массива
        // if (el.id===taskId) {
        //     el.isDone=checked
        //     setTasks([...tasks])
        //     break
        // }
        // }

        //Поиск task с помощью метода find:
        // let currentTask = tasks.find(el => el.id === taskId)
        // if (currentTask) {
        //     currentTask.isDone = checked
        //     setTasks([...tasks])
        // }

        //Поиск task с помощью метода map: (map создает новый массив)
        setTasks(tasks.map(el => el.id === taskId ? {...el, isDone: isDone} : el))

        // let newTask=[...tasks]
        // let changeStatus=newTask.find(el=>el.id===taskId)
        // setTasks(changeStatus)

    }

    return (
        <div className="App">
            <Todolist title="What to learn"
                      tasks={tasksForTodolist}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      addTask={addTask}
                      changeStatus={changeStatus}
                      filter={filter}
            />
        </div>
    );
}

export default App;
