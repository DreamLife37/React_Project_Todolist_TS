import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {IconButton, TextField} from "@mui/material";
import {AddTask} from "@mui/icons-material";

export type AddItemFormPropsType = {
  callback: (value: string) => void
};

export const AddItemForm = React.memo((props: AddItemFormPropsType) => {
  console.log("AddItemForm is called");
  let [title, setTitle] = useState("");
  let [error, setError] = useState<string | null>(null);

  const addItem = () => {
    if (title.trim() !== "") {
      props.callback(title.trim());
      setTitle("");
    } else {
      setError("Title is required");
      setTitle("");
    }
  }

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  }

  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (error) setError(null);
    if (e.key === "Enter") {
      addItem();
    }
  }

  return (
    <div>
      <TextField
        label={"Title"}
        variant={"outlined"}
        size={"small"}
        style={{marginBottom: "10px"}}
        value={title}
        onChange={onChangeHandler}
        onKeyPress={onKeyPressHandler}
        error={!!error}
        helperText={error}
      />
      <IconButton onClick={addItem} color={"primary"}>
        <AddTask/>
      </IconButton>
    </div>
  );
});