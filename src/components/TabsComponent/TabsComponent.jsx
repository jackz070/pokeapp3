import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "./TabsComponent.css";

function TabsComponent({ tab1, tab2, tab3 }) {
  return (
    <div className="Tabs-wrapper relative z-[34]">
      <Tabs className="Tabs">
        <TabList>
          <Tab>About</Tab>
          <Tab>Stats</Tab>
          <Tab>Evolutions</Tab>
        </TabList>
        <TabPanel>{tab1}</TabPanel>
        <TabPanel>{tab2}</TabPanel>
        <TabPanel>{tab3}</TabPanel>
      </Tabs>
    </div>
  );
}

export default TabsComponent;
