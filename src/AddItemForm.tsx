import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Fab, Button, TextField} from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export function AddItemForm(props: AddItemFormPropsType) {

    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)

    const addItem = () => {
        if (title.trim() !== "") {
            props.addItem(title);
            setTitle("");
        } else {
            setError("Title is required");
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.charCode === 13) {
            addItem();
        }
    }

    return <div>
        <TextField
            variant={'outlined'}
            size={'small'}
            value={title}
            onChange={onChangeHandler}
            onKeyPress={onKeyPressHandler}
            className={error ? "error" : ""}
            label={'Title is required'}
            error={!!error}
            helperText={!!error && 'Please, enter title'}
        />

        <Fab color="primary" aria-label="add" size={"small"} onClick={addItem}>
            <AddIcon/>
        </Fab>

    </div>
}
