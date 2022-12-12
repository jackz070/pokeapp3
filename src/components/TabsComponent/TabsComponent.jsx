import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "./TabsComponent.css";

function TabsComponent({ tabs, defaultIdx }) {
  return (
    <div className="Tabs-wrapper relative z-[34]  w-full mx-0">
      <Tabs
        className="Tabs mx-0   w-full"
        defaultIndex={defaultIdx ? defaultIdx : null}
      >
        <TabList className=" w-fit flex">
          {tabs.map((tab) => (
            <Tab key={tab.label}>{tab.label}</Tab>
          ))}
        </TabList>
        {tabs.map((tab, index) => (
          <TabPanel key={index}>{tab.content}</TabPanel>
        ))}
      </Tabs>
    </div>
  );
}

export default TabsComponent;
