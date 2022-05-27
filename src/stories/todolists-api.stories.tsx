import React, {useEffect, useState} from 'react'
import {taskAPI, todolistAPI} from "../api/todolist-api";

export default {
    title: 'API'
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.getTodolist()
            .then((res) => {
                setState(res.data);
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [title, setTitle] = useState<string>('')

    const createTodolist = () => {
        todolistAPI.createTodolist(title)
            .then((res) => {
                setState(res.data);
            })
    }

    return <div> {JSON.stringify(state)}
        <div><input placeholder={'Title'} value={title} onChange={(e) => setTitle(e.currentTarget.value)}/>
            <button onClick={createTodolist}>Create Todolist</button>
        </div>
    </div>
}

export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')

    const deleteTodolist = () => {
        todolistAPI.deleteTodolist(todolistId).then((res) => {
            setState(res.data);
        })
    }

    return <div> {JSON.stringify(state)}
        <div>
            <input placeholder={'todolistId'} onChange={(e) => {
                setTodolistId(e.currentTarget.value)
            }} value={todolistId}/>
            <button onClick={deleteTodolist}>DeleteTodolist</button>
        </div>
    </div>
}

export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')
    const [title, setTitle] = useState<string>('')

    const updateTodolist = () => {
        todolistAPI.updateTodolist(todolistId, title)
            .then((res) => {
                setState(res.data)
            })
    }

    return <div> {JSON.stringify(state)}
        <div>
            <input placeholder={'todolistId'} onChange={(e) => {
                setTodolistId(e.currentTarget.value)
            }} value={todolistId}/>
            <input placeholder={'title'} onChange={(e) => {
                setTitle(e.currentTarget.value)
            }} value={title}/>
            <button onClick={updateTodolist}>UpdateTodolistTitle</button>
        </div>
    </div>
}


export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    const todolistId = '5066dee9-d440-4c56-ac84-fe9c5213dfd5';
    useEffect(() => {
        taskAPI.getTasks(todolistId)
            .then((res) => {
                console.log(res.data)
                setState(res.data);
            })
    }, [])
    return <div> {JSON.stringify(state)}</div>
}

export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')
    const [title, setTitle] = useState<string>('')

    const createTask = () => {
        taskAPI.createTask(todolistId, title)
            .then((res) => {
                console.log(res.data)
                setState(res.data)
            })
    }

    return <div> {JSON.stringify(state)}
        <div>
            <input placeholder={'todolistId'} onChange={(e) => {
                setTodolistId(e.currentTarget.value)
            }} value={todolistId}/>
            <input placeholder={'title'} onChange={(e) => {
                setTitle(e.currentTarget.value)
            }} value={title}/>
            <button onClick={createTask}>CreateTaskTitle</button>
        </div>
    </div>
}

export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')
    const [taskId, setTaskId] = useState<string>('')

    const deleteTask = () => {
        taskAPI.deleteTask(todolistId, taskId)
            .then((res) => {
                console.log(res.data)
                setState(res.data)
            })
    }

    return <div> {JSON.stringify(state)}
        <div>
            <button onClick={deleteTask}>Delete</button>
            <input placeholder={'todolistId'} onChange={(e) => {
                setTodolistId(e.currentTarget.value)
            }} value={todolistId}/>
            <input placeholder={'taskId'} onChange={(e) => {
                setTaskId(e.currentTarget.value)
            }} value={taskId}/>
        </div>
    </div>
}

export const UpdateTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')
    const [taskId, setTaskId] = useState<string>('')
    const [title, setTitle] = useState<string>('')

    const updateTask = () => {
        taskAPI.updateTask(todolistId, taskId, title)
            .then((res) => {
                setState(res.data)
            })
    }

    return <div> {JSON.stringify(state)}
        <div>
            <input placeholder={'todolistId'} onChange={(e) => {
                setTodolistId(e.currentTarget.value)
            }} value={todolistId}/>
            <input placeholder={'taskId'} onChange={(e) => {
                setTaskId(e.currentTarget.value)
            }} value={taskId}/>
            <input placeholder={'title'} onChange={(e) => {
                setTitle(e.currentTarget.value)
            }} value={title}/>
            <button onClick={updateTask}>UpdateTaskTitle</button>
        </div>
    </div>
}

