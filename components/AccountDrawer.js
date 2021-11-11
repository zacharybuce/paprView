import * as React from "react";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import NextLink from "next/link";

export default function TemporaryDrawer(props) {
  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    props.setState(open);
  };

  const list = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <NextLink href={"/user/" + props.userId}>
          <ListItem button key={"Profile"}>
            <ListItemIcon>
              <AccountCircleIcon />
            </ListItemIcon>
            <ListItemText primary={"Profile"} />
          </ListItem>
        </NextLink>
        <ListItem button onClick={() => props.logOut()} key={"logout"}>
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary={"Logout"} />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <div>
      <React.Fragment>
        <Drawer
          anchor={"right"}
          open={props.state}
          onClose={toggleDrawer(false)}
        >
          {list("right")}
        </Drawer>
      </React.Fragment>
    </div>
  );
}
