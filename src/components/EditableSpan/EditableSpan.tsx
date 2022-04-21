import React, {ChangeEvent, useState} from "react";
import {TextField} from "@mui/material";

type EditableSpanPropsType = {
  value: string
  setValue: (value: string) => void
};

export const EditableSpan = React.memo((props: EditableSpanPropsType) => {
  console.log("EditableSpan is called");
  const [editMode, setEditMode] = useState(false);
  const [value, setValue] = useState("");

  const activateEditMode = () => {
    setEditMode(true);
    setValue(props.value);
  };

  const activateViewMode = () => {
    setEditMode(false);
    props.setValue(value);
  };

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
  };

  return (
    editMode ?
      <TextField
        variant={"standard"}
        size={"small"}
        value={value}
        onChange={onChangeHandler}
        onBlur={activateViewMode}
        autoFocus
      />
      :
      <span onDoubleClick={activateEditMode}>{props.value}</span>
  );
});