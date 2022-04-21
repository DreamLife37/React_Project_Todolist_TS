import {Story} from "@storybook/react";
import App from "./App";
import {ReduxStoreProviderDecorator} from "./stories/ReduxStoreProviderDecorator";

export default {
  title: "TodoList/App",
  component: App,
  decorators: [ReduxStoreProviderDecorator],
};

const Template: Story = (args) => <App {...args}/>;

export const AppStory = Template.bind({});