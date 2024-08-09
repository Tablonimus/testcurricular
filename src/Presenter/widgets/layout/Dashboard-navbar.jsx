import { useLocation, Link, useNavigate } from "react-router-dom";
import {
  Navbar,
  Typography,
  Button,
  IconButton,
  Breadcrumbs,
  Input,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
} from "@material-tailwind/react";
import {
  UserCircleIcon,

  Bars3Icon,
  ChevronDoubleDownIcon,
} from "@heroicons/react/24/solid";
import {
  useMaterialTailwindController,

  setOpenSidenav,
} from "@/context";
import { ArrowLeftCircleIcon } from "@heroicons/react/24/outline";

export function DashboardNavbar({ user }) {
  const navigate = useNavigate();
  const [controller, dispatch] = useMaterialTailwindController();
  const { fixedNavbar, openSidenav } = controller;

  const { pathname } = useLocation();
  const [layout, page, page2, page3] = pathname
    .split("/")
    .filter((el) => el !== "");

  const signOut = () => {
    localStorage.removeItem("loggedUser").then(navigate("/auth/sign-in"));
  };

  return (
    <Navbar
      color={fixedNavbar ? "white" : "transparent"}
      className={`rounded-xl transition-all ${
        fixedNavbar
          ? "sticky top-4 z-40 py-3 shadow-md shadow-blue-gray-500/5"
          : "px-0 py-1"
      }`}
      fullWidth
      blurred={fixedNavbar}
    >
      <div className="flex flex-col-reverse justify-between gap-6 md:flex-row md:items-center">
        <div className="capitalize flex items-center ">
          {page3 && (
            <Link to={`/${layout}/${page}/${page2}`}>
              <ArrowLeftCircleIcon className="text-red-500 w-10 h-10 hover:bg-gray-300 rounded-full" />
            </Link>
          )}
          <Breadcrumbs
            className={`bg-transparent p-0 transition-all ${
              fixedNavbar ? "mt-1" : ""
            }`}
          >
            <Link to={`/${layout}`}>
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal opacity-80 transition-all hover:text-blue-500 hover:opacity-100"
              >
                {layout}
              </Typography>
            </Link>

            {page && (
              // <Link to={`/${layout}/${page}`}>
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal cursor-default opacity-80"
              >
                {page}
              </Typography>
              // </Link>
            )}
            {page2 && (
              <Link to={`/${layout}/${page}/${page2}`}>
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal opacity-80 transition-all hover:text-blue-500 hover:opacity-100"
                >
                  {page2}
                </Typography>
              </Link>
            )}
            {page3 && (
              <Link to={`/${layout}/${page}/${page2}/${page3}`}>
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal opacity-80 transition-all hover:text-blue-500 hover:opacity-100"
                >
                  {page3}
                </Typography>
              </Link>
            )}
          </Breadcrumbs>
        </div>
        <div className="flex items-center">
          <div className="mr-auto md:mr-4 md:w-56">
            {/* <Input label="Buscar" /> */}
          </div>
          <IconButton
            variant="text"
            color="blue-gray"
            className="grid xl:hidden"
            onClick={() => setOpenSidenav(dispatch, !openSidenav)}
          >
            <Bars3Icon strokeWidth={3} className="h-6 w-6 text-blue-gray-500" />
          </IconButton>

          <Button
            variant="text"
            color="blue-gray"
            className="hidden items-center gap-1 px-4 xl:flex normal-case"
          >
            <UserCircleIcon className="h-5 w-5 text-blue-gray-500" />
            {user.username}
          </Button>

          <Menu>
            <MenuHandler>
              <IconButton variant="text" color="blue-gray">
                <ChevronDoubleDownIcon className="h-5 w-5 text-blue-gray-500" />
                {/* <Cog6ToothIcon className="h-5 w-5 text-blue-gray-500" /> */}
              </IconButton>
            </MenuHandler>
            <MenuList className="w-max border-0">
              <MenuItem
                className="flex items-center gap-3"
                onClick={(e) => signOut()}
              >
                Cerrar sesión
              </MenuItem>
            </MenuList>
          </Menu>
          {/* <IconButton
            variant="text"
            color="blue-gray"
            onClick={() => setOpenConfigurator(dispatch, true)}
          >
            <Cog6ToothIcon className="h-5 w-5 text-blue-gray-500" />
          </IconButton> */}
        </div>
      </div>
    </Navbar>
  );
}

DashboardNavbar.displayName = "/src/widgets/layout/dashboard-navbar.jsx";

export default DashboardNavbar;
