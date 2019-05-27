import * as React from "react";
import { storiesOf } from "@storybook/react";
import { Tabs, Tab } from "../index";
import { FirstChapter, SecondChapter, ThirdChapter } from "./TabContent";

const TabsStory = () => {
    const [activeTabKey, setActiveTabKey] = React.useState("chapter1");
    return (
        <Tabs activeTabKey={activeTabKey} onChange={tabKey => setActiveTabKey(tabKey)}>
            <Tab tabKey="chapter1" title="Chapter 1">
                <FirstChapter changeChapter={tabKey => setActiveTabKey(tabKey)} />
            </Tab>
            <Tab tabKey="chapter2" title="Chapter 2">
                <SecondChapter changeChapter={tabKey => setActiveTabKey(tabKey)} />
            </Tab>
            <Tab tabKey="chapter3" title="Chapter 3">
                <ThirdChapter changeChapter={tabKey => setActiveTabKey(tabKey)} />
            </Tab>
            <Tab tabKey="chapter4" title="Chapter 4" disabled />
        </Tabs>
    );
};
storiesOf("General components/Tabs", module)
    .addParameters({ jest: ["Tabs.stories.jsx"] })
    .add("Tabs", () => <TabsStory />);
