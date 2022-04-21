import {AddItemForm, AddItemFormPropsType} from "./AddItemForm";
import {ComponentMeta, Story} from "@storybook/react";
import {action} from "@storybook/addon-actions";

export default {
  title: "TodoList/AddItemForm",
  component: AddItemForm,
  argTypes: {
    callback: {
      description: "Add item callback"
    }
  }
} as ComponentMeta<typeof AddItemForm>;

const Template: Story<AddItemFormPropsType> = (args) => <AddItemForm {...args}/>;

export const AddItemFormStory = Template.bind({});
AddItemFormStory.args = {
  callback: action("Button clicked inside form"),
};