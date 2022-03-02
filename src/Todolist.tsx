import {ChangeEvent, KeyboardEvent, useState} from "react";
import './App.css';

export type TaskPropsType = {
    id: string
    title: string
    isDone: boolean
}

type TodolistPropsType = {
    id: string
    name: string
    tasksFilter: Array<TaskPropsType>
    removeTask: (tID: string, todolistId: string) => void
    filterTask: (filter: FilterType, todolistId: string) => void
    addTask: (value: string, todolistId: string) => void
    changeChecked: (tID: string, iSDone: boolean, todolistId: string) => void
    filter: FilterType
    removeTodolist: (todolistId: string) => void
}

export type FilterType = 'all' | 'active' | 'completed'

export const Todolist = (props: TodolistPropsType) => {

    let [title, setTitle] = useState('')
    let [error, setError] = useState<string | null>(null)

    const onClickDelHandler = (tID: string) => {
        props.removeTask(tID, props.id)
    }

    const onClickFilterHandler = (filter: FilterType) => {
        props.filterTask(filter, props.id)
    }

    const onChangeAddTaskHandler = (e: ChangeEvent<HTMLInputElement>) => {

        setTitle(e.currentTarget.value)
    }

    const onClickAddTaskHandler = () => {
        if (title.trim() !== '') {
            props.addTask(title, props.id)
            setTitle('')
            setError(null)
        } else {
            error = "Title is required"
            setError(error)
        }
    }

    const onKeyPressAddTaskHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null) //ошибка пропадает при нажатии на любую клавишу
        if (e.key === 'Enter') {
            props.addTask(title, props.id)
            setTitle('')
        }
    }

    const onChangeCheckedHandler = (e: ChangeEvent<HTMLInputElement>, tID: string) => {
        console.log(e.currentTarget.checked)
        props.changeChecked(tID, e.currentTarget.checked, props.id)
    }

    const removeTodolist = () => {
        props.removeTodolist(props.id)
    }

    return <div>
        <h2>{props.name}
            <button onClick={removeTodolist}>X</button>
        </h2>
        <input value={title}
               onChange={onChangeAddTaskHandler}
               onKeyPress={onKeyPressAddTaskHandler}
               className={error ? 'error' : ''}

        />
        <button onClick={onClickAddTaskHandler}>+</button>
        <div className={error ? 'errorMessage' : ''}>{error}</div>
        <ul>
            {props.tasksFilter.map((t) =>
                <li key={t.id} className={t.isDone ? 'isDone' : ''}>
                    <button onClick={() => onClickDelHandler(t.id)}>Del</button>
                    <input onChange={(e) => onChangeCheckedHandler(e, t.id)} type={"checkbox"}
                           checked={t.isDone}/> {t.title}
                </li>)}
        </ul>
        <button className={props.filter === 'all' ? 'activeFilter' : ""}
                onClick={() => onClickFilterHandler('all')}>All
        </button>
        <button className={props.filter === 'active' ? 'activeFilter' : ""}
                onClick={() => onClickFilterHandler('active')}>Active
        </button>
        <button className={props.filter === 'completed' ? 'activeFilter' : ""}
                onClick={() => onClickFilterHandler('completed')}>Completed
        </button>
    </div>
}