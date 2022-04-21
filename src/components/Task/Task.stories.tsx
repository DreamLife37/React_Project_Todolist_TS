import {Task, TaskPropsType} from "./Task";
import {Story} from "@storybook/react";
import {action} from "@storybook/addon-actions";

export default {
  title: "TodoList/Task",
  component: Task,
  args: {
    changeTaskTitle: action("Task title changed"),
    changeTaskStatus: action("Task status changed"),
    removeTask: action("Task removed"),
  }
};

const Template: Story<TaskPropsType> = (args) => <Task {...args}/>;

export const TaskIsDoneStory = Template.bind({});
TaskIsDoneStory.args = {
  todoList_ID: "1",
  task: {id: "123", title: "JS", isDone: true},
};

export const TaskIsNotDoneStory = Template.bind({});
TaskIsNotDoneStory.args = {
  todoList_ID: "2",
  task: {id: "123", title: "HTML", isDone: false},
};