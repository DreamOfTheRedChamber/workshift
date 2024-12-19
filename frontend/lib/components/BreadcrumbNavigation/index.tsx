import { StyledBreadcrumb } from "../../themes/BreadcrumbStyled";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import HomeIcon from "@mui/icons-material/Home";
import { Box } from "@mui/material";

interface BreadcrumbProps {
  levelNames: string[];
  levelLinks: string[];
}

export const BreadcrumbNavigation: React.FC<BreadcrumbProps> = (
  props
): JSX.Element => {
  const breadcrumbs = [];

  breadcrumbs.push(
    <StyledBreadcrumb
      key={0}
      component="a"
      href="/home"
      label="首页"
      icon={<HomeIcon fontSize="small" />}
    />
  );
  if (props.levelNames.length > 1) {
    for (let i = 0; i < props.levelLinks.length; i++) {
      breadcrumbs.push(
        <StyledBreadcrumb
          key={i + 1}
          component="a"
          href={props.levelLinks[i]}
          label={props.levelNames[i]}
        />
      );
    }
  }
  breadcrumbs.push(
    <StyledBreadcrumb
      key={props.levelLinks.length + 1}
      component="a"
      label={props.levelNames[props.levelNames.length - 1]}
    />
  );

  return (
    <Box sx={{ my: 2, mx: 1 }}>
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
      >
        {breadcrumbs}
      </Breadcrumbs>
    </Box>
  );
};
