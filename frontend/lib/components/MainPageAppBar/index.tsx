import Toolbar from "@mui/material/Toolbar";
import { AvatarMenu } from "./AvatarMenu";
import { MainMenu } from "./MainMenu";
import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";

export function MainPageAppBar() {
  return (
    <>
      <Toolbar>
        <Box sx={{ flexGrow: 1 }}>
          <Grid
            container
            spacing={2}
            columns={12}
            margin={1}
            alignItems={"center"}
          >
            <Grid size={1}>
              <img
                src="/images/software_logo.png"
                alt="Logo image"
                width={102}
                height={45}
              />
            </Grid>
            <Grid size="grow">
              <MainMenu></MainMenu>
            </Grid>
            <Grid size="auto">
              <AvatarMenu></AvatarMenu>
            </Grid>
          </Grid>
        </Box>
      </Toolbar>
    </>
  );
}
