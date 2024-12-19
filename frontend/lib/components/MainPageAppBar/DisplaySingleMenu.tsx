import * as React from "react";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Button, Link } from "@mui/material";
import { TopMenuItem } from "./MenuHierachy";

export function DisplaySingleMenu(
  topMenuKey: string,
  topMenuName: string,
  topMenuItems: TopMenuItem[]
) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <React.Fragment key={topMenuKey}>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        {topMenuName}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {topMenuItems.map((menuItem) => (
          <MenuItem component={Link} href={menuItem.link} key={menuItem.key}>
            <Typography variant="h6">{menuItem.name}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </React.Fragment>
  );
}
