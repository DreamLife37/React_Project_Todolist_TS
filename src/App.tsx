import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import {FilterType, TaskPropsType, Todolist} from "./Todolist";
import {v1} from "uuid";

type TodolistType = {
    id: string
    title: string
    filter: FilterType
}

function App() {
    //
    // const [tasks, setTasks] = useState<Array<TaskPropsType>>([
    //     {id: v1(), title: "HTML", isDone: false},
    //     {id: v1(), title: "CSS", isDone: true},
    //     {id: v1(), title: "React", isDone: false},
    //     {id: v1(), title: "Angular", isDone: false},
    // ])

    //const [filter, setFilter] = useState<FilterType>('all')

    let todolistId1 = v1();
    let todolistId2 = v1();

    let [tasksObj, setTasks] = useState({
        [todolistId1]: [
            {id: v1(), title: "HTML", isDone: false},
            {id: v1(), title: "CSS", isDone: true},
            {id: v1(), title: "React", isDone: false},
            {id: v1(), title: "Angular", isDone: false},
        ],
        [todolistId2]: [
            {id: v1(), title: "Book", isDone: false},
            {id: v1(), title: "Milk", isDone: true},
        ],

    })

    const addTask = (value: string, todolistId: string) => {
        let task = {id: v1(), title: value, isDone: false}
        let tasks = tasksObj[todolistId]
        let newTasks = [task, ...tasks,]
        tasksObj[todolistId] = newTasks
        setTasks({...tasksObj})
    }

    const removeTask = (tID: string, todolistId: string) => {
        let tasks = tasksObj[todolistId]
        let filteredTasks = tasks.filter((f) => (tID !== f.id))
        tasksObj[todolistId] = filteredTasks
        setTasks({...tasksObj})
    }

    const filterTask = (filter: FilterType, todolistId: string) => {
        let todolist = todolists.find(tl => tl.id === todolistId)
        if (todolist) {
            todolist.filter = filter
            setTodolist([...todolists])
        }
        console.log(todolistId)

    }


    const changeChecked = (tID: string, isDone: boolean, todolistId: string) => {
        let tasks = tasksObj[todolistId]
        let task = tasks.find((t) => (t.id === tID))
        if (task) {
            task.isDone = isDone
            tasksObj[todolistId] = [...tasks]
        }
        let copy = [...tasks]
        setTasks({...tasksObj}) //Необходимо сетать копию массива, чтобы useState понял что в массиве произошли изменения.
    }


    let [todolists, setTodolist] = useState<Array<TodolistType>>([
        {id: todolistId1, title: "What your learn", filter: 'active'},
        {id: todolistId2, title: "What to buy", filter: 'completed'},
    ])

    const removeTodolist=(todoListId:string)=>{
let filteredTodolist=todolists.filter(tl=>tl.id!=todoListId)
        setTodolist(filteredTodolist)
        //раз нет Тудулиста, но и нет смысла хранить Таски, удаляем:
        delete tasksObj[todoListId]
        setTasks({...tasksObj})

    }


    return (<div className='App-header'>

            {todolists.map((tl) => {
                let tasksFilter = tasksObj[tl.id]

                if (tl.filter == 'active') {
                    tasksFilter = tasksFilter.filter((f) => !f.isDone)
                }

                if (tl.filter == 'completed') {
                    tasksFilter = tasksFilter.filter((f) => f.isDone)
                }


                return (<div className={'App'}>
                <Todolist
                    key={tl.id}
                    id={tl.id}
                    name={tl.title}
                    tasksFilter={tasksFilter}
                    removeTask={removeTask}
                    filterTask={filterTask}
                    addTask={addTask}
                    changeChecked={changeChecked}
                    filter={tl.filter}
                    removeTodolist={removeTodolist}
                /> </div>)
            })}

        </div>
    );
}

export default App;
