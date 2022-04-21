import {FilterValueType, TodoListType} from "../App";
import {v1} from "uuid";

export type RemoveTodoListActionType = {
  type: "REMOVE-TODOLIST"
  id: string
};

export type AddTodoListActionType = {
  type: "ADD-TODOLIST"
  todoList_ID: string
  title: string
};

type ChangeTodoListTitleActionType = {
  type: "CHANGE-TODOLIST-TITLE"
  todoList_ID: string
  title: string
};

type ChangeTodoListFilterActionType = {
  type: "CHANGE-TODOLIST-FILTER"
  todoList_ID: string
  filter: FilterValueType
};

type ActionType = RemoveTodoListActionType | AddTodoListActionType |
  ChangeTodoListTitleActionType | ChangeTodoListFilterActionType;

type TodoListsInitStateType = typeof todoListsInitState;

const todoListsInitState: Array<TodoListType> = [];

export const removeTodoListAC = (id: string): RemoveTodoListActionType => {
  return {type: "REMOVE-TODOLIST", id};
};

export const addTodoListAC = (title: string): AddTodoListActionType => {
  return {type: "ADD-TODOLIST", todoList_ID: v1(), title};
};

export const changeTodoListTitleAC = (todoList_ID: string, newTitle: string): ChangeTodoListTitleActionType => {
  return {type: "CHANGE-TODOLIST-TITLE", todoList_ID, title: newTitle};
};

export const changeTodoListFilterAC = (todoList_ID: string, newFilter: FilterValueType): ChangeTodoListFilterActionType => {
  return {type: "CHANGE-TODOLIST-FILTER", todoList_ID, filter: newFilter};
};

export const todoListsReducer = (state: TodoListsInitStateType = todoListsInitState, action: ActionType): TodoListsInitStateType => {
  switch(action.type) {
    case "REMOVE-TODOLIST": {
      return state.filter(tl => tl.id !== action.id);
    }
    case "ADD-TODOLIST": {
      return [
        {id: action.todoList_ID, title: action.title, filter: "all"},
        ...state,
      ];
    }
    case "CHANGE-TODOLIST-TITLE": {
      const todoList = state.find(tl => tl.id === action.todoList_ID);
      if (todoList) {
        todoList.title = action.title;
      }
      return [...state];
    }
    case "CHANGE-TODOLIST-FILTER": {
      const todoList = state.find(tl => tl.id === action.todoList_ID);
      if (todoList) {
        todoList.filter = action.filter;
      }
      return [...state];
    }
    default:
      return state;
  }
};