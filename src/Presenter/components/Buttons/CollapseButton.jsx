import React from "react";
import {
  Collapse,
  Button,
  Card,
  Typography,
  CardBody,
} from "@material-tailwind/react";
import { NavLink } from "react-router-dom";

export default function CollapseButton({
  layout,
  icon,
  path,
  title,
  color,
  items,
}) {
  const [open, setOpen] = React.useState(false);
  const sidenavTypes = {
    dark: "bg-gradient-to-br from-gray-800 to-gray-900",
    white: "bg-white shadow-sm",
    transparent: "bg-transparent",
  };
  const toggleOpen = () => setOpen((cur) => !cur);

  return (
    <>
      <NavLink to={`/${layout}${path}`}>
        {({ isActive }) => (
          <Button
            variant={isActive ? "gradient" : "text"}
            color={isActive ? sidenavColor : color}
            className="flex items-center gap-4 px-4 capitalize"
            fullWidth
          >
            {icon}
            <Typography color="inherit" className="font-medium capitalize">
              {title}
            </Typography>
          </Button>
        )}
      </NavLink>
      <Collapse open={open}>
        <Card className="my-4 mx-auto  bg-transparent">
          <CardBody>{items}</CardBody>
        </Card>
      </Collapse>
    </>
  );
}
