import {TasksType} from "../App";
import {v1} from "uuid";
import {AddTodoListActionType, RemoveTodoListActionType} from "./todoListsReducer";

type RemoveTaskActionType = {
  type: "REMOVE-TASK"
  todoList_ID: string
  task_ID: string
};

type AddTaskActionType = {
  type: "ADD-TASK"
  todoList_ID: string
  title: string
};

type ChangeTaskStatusActionType = {
  type: "CHANGE-TASK-STATUS"
  todoList_ID: string
  task_ID: string
  isDone: boolean
};

type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>;

type TasksInitStateType = typeof tasksInitState;

type ActionType = RemoveTaskActionType | AddTaskActionType |
  ChangeTaskStatusActionType | ChangeTaskTitleActionType |
  AddTodoListActionType | RemoveTodoListActionType;

const tasksInitState: TasksType = {};

export const removeTaskAC = (todoList_ID: string, task_ID: string): RemoveTaskActionType => {
  return {type: "REMOVE-TASK", todoList_ID, task_ID};
};

export const addTaskAC = (todoList_ID: string, newTaskTitle: string): AddTaskActionType => {
  return {type: "ADD-TASK", todoList_ID, title: newTaskTitle};
};

export const changeTaskStatusAC = (todoList_ID: string, task_ID: string, newStatus: boolean): ChangeTaskStatusActionType => {
  return {type: "CHANGE-TASK-STATUS", todoList_ID, task_ID, isDone: newStatus};
};

export const changeTaskTitleAC = (todoList_ID: string, task_ID: string, newTitle: string) => {
  return {type: "CHANGE-TASK-TITLE" as const, todoList_ID, task_ID, title: newTitle};
};

export const tasksReducer = (state: TasksInitStateType = tasksInitState, action: ActionType): TasksInitStateType => {
  switch(action.type) {
    case "REMOVE-TASK": {
      return {
        ...state,
        [action.todoList_ID]: state[action.todoList_ID].filter(t => t.id !== action.task_ID),
      };
    }
    case "ADD-TASK":
      return {
        ...state,
        [action.todoList_ID]: [
          {id: v1(), title: action.title, isDone: false},
          ...state[action.todoList_ID],
        ],
      };
    case "CHANGE-TASK-STATUS":
      return {
        ...state,
        [action.todoList_ID]: state[action.todoList_ID].map(t =>
          t.id === action.task_ID ? {...t, isDone: action.isDone} : t),
      }
    case "CHANGE-TASK-TITLE":
      return {
        ...state,
        [action.todoList_ID]: state[action.todoList_ID].map(t =>
          t.id === action.task_ID ? {...t, title: action.title} : t),
      }
    case "ADD-TODOLIST":
      return {
        ...state,
        [action.todoList_ID]: [],
      };
    case "REMOVE-TODOLIST":
      // const {[action.id]: [], ...rest} = {...state};
      const newState = {...state};
      delete newState[action.id];
      return newState;
    default:
      return state;
  }
};