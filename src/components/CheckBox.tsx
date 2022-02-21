import React, {ChangeEvent} from "react";

type CheckBoxPropsType = {
    isDone: boolean //значение
    callback: (checked: boolean) => void  //функция
}

export const CheckBox = (props: CheckBoxPropsType) => {

    const changeStatusHandler = (event: ChangeEvent<HTMLInputElement>) => {
        props.callback(event.currentTarget.checked)
    }
    return (
        <input type="checkbox"
               checked={props.isDone}
               onChange={changeStatusHandler}/>
    );
}