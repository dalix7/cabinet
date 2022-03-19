import * as React from "react";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import SignUpClient from "../SignUpClient/SignUpClient";
import SignUpPro from "../SignUpPro/SignUpPro";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function SignUpTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box className="signUp-tabs">
      <Box className="signUp-tabs__head">
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Client" {...a11yProps(0)} />
          <Tab label="Professional" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel className="login-tabs__panel" value={value} index={0}>
        <SignUpClient></SignUpClient>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <SignUpPro></SignUpPro>
      </TabPanel>
    </Box>
  );
}
