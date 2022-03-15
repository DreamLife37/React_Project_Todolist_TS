import React, {ChangeEvent} from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import {Button, ButtonGroup, Checkbox, IconButton, List} from "@material-ui/core";
import {Delete, DeleteOutline} from "@material-ui/icons";


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    removeTodolist: (id: string) => void
    changeTodolistTitle: (id: string, newTitle: string) => void
    filter: FilterValuesType
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
}

export function Todolist(props: PropsType) {
    const addTask = (title: string) => {
        props.addTask(title, props.id);
    }

    const removeTodolist = () => {
        props.removeTodolist(props.id);
    }
    const changeTodolistTitle = (title: string) => {
        props.changeTodolistTitle(props.id, title);
    }

    const onAllClickHandler = () => props.changeFilter("all", props.id);
    const onActiveClickHandler = () => props.changeFilter("active", props.id);
    const onCompletedClickHandler = () => props.changeFilter("completed", props.id);

    return <div style={{width: 'fit-content', textAlign: 'center'}}>
        <h3><EditableSpan value={props.title} onChange={changeTodolistTitle}/>
            <IconButton
                size={"medium"}
                onClick={removeTodolist}><DeleteOutline fontSize={"medium"}
            />
            </IconButton>
        </h3>
        <AddItemForm addItem={addTask}/>

        <List>
            {
                props.tasks.map(t => {
                    const onClickHandler = () => props.removeTask(t.id, props.id)
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = e.currentTarget.checked;
                        props.changeTaskStatus(t.id, newIsDoneValue, props.id);
                    }
                    const onTitleChangeHandler = (newValue: string) => {
                        props.changeTaskTitle(t.id, newValue, props.id);
                    }

                    return (
                        <li key={t.id} className={t.isDone ? "is-done" : ""}
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                borderBottom: '1px solid'
                            }}
                        >
                            <Checkbox
                                onChange={onChangeHandler}
                                checked={t.isDone}
                                size={'small'}
                                color={'primary'}
                            />

                            <EditableSpan value={t.title} onChange={onTitleChangeHandler}/>

                            <IconButton
                                size={'small'}
                                onClick={onClickHandler}><DeleteOutline fontSize={"small"}/>
                            </IconButton>
                        </li>
                    )
                })
            }
        </List>

        <ButtonGroup
            aria-label="outlined primary button group"
            variant={'contained'}
            size={'small'}
        >
            <Button color={props.filter === 'all' ? "secondary" : 'primary'}
                    onClick={onAllClickHandler}>All</Button>
            <Button color={props.filter === 'active' ? "secondary" : 'primary'}
                    onClick={onActiveClickHandler}>Active</Button>
            <Button color={props.filter === 'completed' ? "secondary" : 'primary'}
                    onClick={onCompletedClickHandler}>Completed</Button>
        </ButtonGroup>
    </div>
}


