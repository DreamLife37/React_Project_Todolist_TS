import React from "react";

type TodolistPropsType = {
    title: string
    removeTask: (id: number) => void
    changeFilter: (value: string) => void

    tasks: Array<{
        id: number
        title: string
        isDone: boolean

    }>
}

export const Todolist = (props: TodolistPropsType) => {

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {props.tasks.map((t) => {
                    return <li key={t.id}>
                        <button onClick={() => {
                            props.removeTask(t.id)
                        }}>X
                        </button>
                        <input type="checkbox" checked={t.isDone}/>
                        <span>{t.title}</span>

                    </li>
                })}
            </ul>
            <div>
                <button onClick={() => {
                    props.changeFilter('All')
                }}>All
                </button>
                <button onClick={() => {
                    props.changeFilter('Active')
                }}>Active
                </button>
                <button onClick={() => {
                    props.changeFilter('Completed')
                }}>Completed
                </button>
            </div>
        </div>)
}