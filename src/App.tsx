import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";

function App() {
    // let tasks = [
    //     {id: 1, title: 'HTML&CSS', isDone: true},
    //     {id: 2, title: 'JS', isDone: true},
    //     {id: 3, title: 'React', isDone: false},
    // ]

    //используем хук useState
    let [tasks, setTasks] = useState([ //setTasks функция которая перерисовывает
        {id: 1, title: 'HTML&CSS', isDone: true},
        {id: 2, title: 'JS', isDone: true},
        {id: 3, title: 'React', isDone: false},
    ])

    const [filter, setFilter] = useState('All')

    const removeTask = (newID: number) => {
        setTasks(tasks.filter(el => el.id !== newID))
    }

    const changeFilter = (value: string) => {
        setFilter(value)
    }

    let filteredTasks = tasks

    if (filter === 'Active') {
        filteredTasks = tasks.filter(t => t.isDone)
    }

    if (filter === 'Completed') {
        filteredTasks = tasks.filter(t => !t.isDone)
    }

    return (
        <div className="App">
            <Todolist title={'What to learn'}
                      tasks={filteredTasks}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
            />
            {/*<Todolist title={'Songs'} tasks={tasks2}/>*/}
        </div>
    );
}

export default App;
