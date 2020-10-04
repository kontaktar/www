import React from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
// import Tooltip as MUITooltip from '@material-ui/core/Tooltip';
type Props = {
  anchorEl: any;
  onClose: any;
};

// eslint-disable-next-line unicorn/prevent-abbreviations
const DropdownMenu = ({ anchorEl, onClose }: Props) => {
  return (
    <Menu
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
