import React, { ReactElement } from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import styles from "./DropdownMenu.module.scss";
// import Tooltip as MUITooltip from '@material-ui/core/Tooltip';
type Props = {
  anchorEl: any;
  onClose: any;
};

// eslint-disable-next-line unicorn/prevent-abbreviations
const DropdownMenu = ({ anchorEl, onClose }: Props): ReactElement => {
  return (
    <Menu
      className={styles.dropdownmenu}
      id="simple-menu"
      anchorEl={anchorEl}
      keepMounted
      open={Boolean(anchorEl)}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center"
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center"
      }}
      elevation={0}
      getContentAnchorEl={null}
      onClose={onClose}
    >
      <MenuItem>Profile</MenuItem>
      <MenuItem>My account</MenuItem>
      <MenuItem>Logout</MenuItem>
    </Menu>
  );
};

export default DropdownMenu;
