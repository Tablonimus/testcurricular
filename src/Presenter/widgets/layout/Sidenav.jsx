import { NavLink, useLocation } from "react-router-dom";
import {
  Bars3Icon,
  ChevronLeftIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Button, IconButton, Typography } from "@material-tailwind/react";
import { useMaterialTailwindController, setOpenSidenav } from "@/context";
import { useEffect, useState } from "react";

export function Sidenav({
  routes,
  showText,
  setShowText,
  subMenuSections,
  handleSubMenuSections,
  handleHideSidenav,
  appImages,
}) {
  const [controller, dispatch] = useMaterialTailwindController();
  const { openSidenav } = controller;
  const location = useLocation();
  const [isActive, setIsActive] = useState();
 


  useEffect(() => {
    setIsActive(location.pathname);
  }, [location]);

  return (
    <aside
      className={` ${
        openSidenav ? "translate-x-0" : "-translate-x-80"
      } fixed inset-0 z-50 my-4  h-[calc(100vh-32px)] flex rounded-xl transition-transform duration-1000 xl:translate-x-0 w-16`}
    >
      <section
        className={`flex flex-col transition-all text-white justify-between z-50 py-4 relative h-full rounded-xl shadow-2xl shadow-black bg-[--sidebar-background]`}
      >
        {/* HEADER */}
        <div onClick={(e) => handleHideSidenav(e)}>
          {showText ? (
            <div className="py-6 px-8 text-center h-24">
              <img
                // src={appImages?.mainImageFull}
                src={"/victorius/logo_gica.png"}
                alt=""
                className={`rounded-xl drop-shadow-xl w-full h-14 object-contain`}
              />
            </div>
          ) : (
            <div className="flex justify-end  items-center text-center h-24">
              <img
                // src={appImages?.mainImageSmall}
                src={"/victorius/logo_gica_inicial.png"}
                alt=""
                className={`w-full h-14 rounded-xl drop-shadow-xl object-contain py-2 px-2 `}
              />
            </div>
          )}

          <IconButton
            variant="text"
            size="sm"
            ripple={false}
            className="absolute right-0 top-0 grid rounded-br-none rounded-tl-none xl:hidden hover:bg-gray text-[--sidebar__text--disabled] hover:text-[--sidebar__text--active]"
            onClick={() => setOpenSidenav(dispatch, false)}
          >
            <XMarkIcon strokeWidth={2.5} className="h-5 w-5" />
          </IconButton>
        </div>

        {/* MENÚ */}
        <div className="h-full flex flex-col justify-start">
          <section className="mr-2 w-full">
            <span
              onClick={(e) => setShowText(!showText)}
              className={`text-2xl font-semibold flex items-center ${showText ? "justify-end" : "justify-center"} w-full px-2 text-[--sidebar__text--disabled] hover:text-[--sidebar__text--active]`}
            >
              {showText ? (
                <ChevronLeftIcon className="h-8 w-8 rounded-lg" />
              ) : (
                <Bars3Icon className="h-8 w-8 rounded-lg" />
              )}
            </span>
          </section>

          {routes
            .filter((route) => route.layout === "dashboard")
            .map(({ layout, title, pages }, index) => (
              <ul
                key={index}
                className="mt-5 text-end mb-4 flex flex-col gap-1"
              >
                {pages.map(
                  ({ icon, name, path, show, subPages }, index) =>
                    show && (
                      <li key={index} className="w-full">
                        <div
                          id={name}
                          className="flex justify-center w-full"
                          onClick={(e) => handleSubMenuSections(e)}
                        >
                          <NavLink
                            // to={`/${layout}${path}`}
                            className={"w-full"}
                            id={name}
                          >
                            {/* {({ isActive }) => ( */}
                            <>
                              <Button
                                className={`w-full rounded-none transition-none bg-transparent  shadow-none flex hover:border-y border-gray-600 ${
                                  isActive &&
                                  isActive?.includes(`/${layout}${path}`)
                                    ? `text-[--sidebar__text--active] bg-[--sidebar__selector--active]`
                                    : `text-[--sidebar__text--disabled]`
                                } ${showText ? "justify-start" : "justify-end"} items-center gap-4 capitalize`}
                                fullWidth
                                id={name}
                              >
                                {icon}

                                {showText ? (
                                  <Typography
                                    id={name}
                                    color="inherit"
                                    className="font-medium capitalize text-start w-full text-sm whitespace-nowrap"
                                  >
                                    {name}
                                  </Typography>
                                ) : (
                                  false
                                )}
                              </Button>
                            </>
                            {/* )} */}
                          </NavLink>
                        </div>
                      </li>
                    )
                )}
              </ul>
            ))}

          <div className=" h-full " onClick={(e) => handleHideSidenav(e)}></div>
        </div>

        {/* FOOTER */}
        <div
          className="relative z-10 flex justify-center items-end h-24 px-2"
          onClick={(e) => handleHideSidenav(e)}
        >
          {showText ? (
            <div className="h-24">
              <img
                // src={appImages?.secondaryImageLarge}
                src={"/victorius/logo_uafBlanco.png"}
                alt=""
                className={`rounded-xl drop-shadow-xl w-full h-14 object-contain`}
              />
            </div>
          ) : (
            <div className="h-24">
              {/* <img
                // src={appImages?.secondaryImageSmall}
                src={"/victorius/logo_uafBlanco.png"}
                alt=""
                className={`w-full h-14 rounded-xl drop-shadow-xl object-cover`}
              /> */}
            </div>
          )}
        </div>
      </section>

      {/* SUBMENÚ */}
      {routes
        .filter((route) => route.layout === "dashboard")
        .map(({ layout, title, pages }, index) => (
          <div key={index} className="relative  text-end flex flex-col gap-1">
            {pages.map(
              ({ icon, name, path, show, subPages }, index) =>
                show && (
                  <div
                    key={index}
                    className={`absolute transition-all h-[calc(100vh-32px)] bg-[--submenu-background] shadow-2xl shadow-black  rounded-xl text-gray-900  w-80 ${
                      !subMenuSections[name]
                        ? "-translate-x-[200%]  duration-500"
                        : "translate-x-[0%]  duration-500"
                    }`}
                  >
                    <div key={name} className="w-full ">
                      {/* SUBMENÚ */}

                      <div key={name} className="" id="sidebar">
                        <section className={`relative py-4 h-full `}>
                          <div className=" pt-20 mt-2">
                            <div
                              id={name}
                              onClick={(e) => handleSubMenuSections(e)}
                              className="flex items-center hover:underline   rounded-lg p-2"
                            >
                              <ChevronLeftIcon
                                className="w-5 h-5 rounded-lg"
                                id={name}
                                onClick={(e) => handleSubMenuSections(e)}
                              />
                              <span
                                id={name}
                                className="text-xl font-semibold text-start text-[--submenu__text--disabled]"
                              >
                                {name}
                              </span>
                            </div>
                          </div>

                          <ul className="mt-4 text-end">
                            {subPages &&
                              subPages?.map(
                                ({ name, path, show, icon }, index) =>
                                  show && (
                                    <li key={index} className="text-start">
                                      <NavLink
                                        to={`/${layout}${path}`}
                                        className="text-start"
                                      >
                                        {({ isActive }) => (
                                          <>
                                            <Button
                                              className={`hover:border-y border-gray ${isActive ? `border-y border-gray bg-[--submenu__selector--active] text-[--submenu__text--active]` : `bg-transparent text-[--submenu__text--disabled]`} rounded-none flex justify-start items-center gap-4 px-4 capitalize shadow-none transition-none`}
                                              fullWidth
                                              id={name}
                                               onClick={(e) => handleSubMenuSections(e)}
                                            >
                                              {/* {icon} */}

                                              <Typography
                                                id={name}
                                                color="inherit"
                                                className="text-sm font-semibold capitalize"
                                              >
                                                {name}
                                              </Typography>
                                            </Button>
                                          </>
                                        )}
                                      </NavLink>
                                    </li>
                                  )
                              )}
                          </ul>
                        </section>
                      </div>
                    </div>
                    <div
                      className="h-full"
                      onClick={(e) => handleHideSidenav(e)}
                    ></div>
                  </div>
                )
            )}
          </div>
        ))}
    </aside>
  );
}

export default Sidenav;
