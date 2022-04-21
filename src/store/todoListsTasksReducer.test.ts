import {TasksType, TodoListType} from "../App";
import {addTodoListAC, todoListsReducer} from "./todoListsReducer";
import {tasksReducer} from "./tasksReducer";

test("Ids should be equal", () => {
  const startTasksState: TasksType = {};
  const startTodoListsState: Array<TodoListType> = [];

  const action = addTodoListAC("new todolist");

  const endTasksState = tasksReducer(startTasksState, action)
  const endTodoListsState = todoListsReducer(startTodoListsState, action)

  const keys = Object.keys(endTasksState);
  const idFromTasks = keys[0];
  const idFromTodoLists = endTodoListsState[0].id;

  expect(idFromTasks).toBe(action.todoList_ID);
  expect(idFromTodoLists).toBe(action.todoList_ID);
});