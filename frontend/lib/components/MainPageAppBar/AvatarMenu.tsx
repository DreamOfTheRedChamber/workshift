import * as React from "react";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { MenuList, Paper } from "@mui/material";

export function AvatarMenu() {
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const settings = ["个人中心", "登出"];

  return (
    <Box sx={{ flexGrow: 0 }} key="111">
      <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
        <Avatar sx={{ width: 32, height: 32 }}>珉</Avatar>
      </IconButton>
      <Menu
        sx={{ mt: "40px" }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        {settings.map((setting, index) => (
          <Paper key={index}>
            <MenuList dense>
              <MenuItem onClick={handleCloseUserMenu}>
                <Typography variant="h6">{setting}</Typography>
              </MenuItem>
            </MenuList>
          </Paper>
        ))}
      </Menu>
    </Box>
  );
}
