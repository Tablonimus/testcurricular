import { Routes, Route } from "react-router-dom";
import { Sidenav, DashboardNavbar, Footer } from "@/Presenter/widgets/layout";
import { useEffect, useState } from "react";
import axios from "axios";
import { getAllowedRoutes } from "../../routes";
import { UsersAdapter } from "../../Infra/Adapters/Users/users.adapter";
import {
  useMaterialTailwindController,
  setPermissionsState,
} from "../../context";
import { ApiConstants, ApiPaths } from "../../Common/constants/api/api.constants";

const defaultSubMenuSections = {};

export function Dashboard({ appImages }) {
  const [controller, dispatch] = useMaterialTailwindController();
  const [permissions, setPermissions] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [user, setUser] = useState({});
  /* PERMISSIONS => HACER MODULO INDEPENDIENTE*/
  const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));

  if (!loggedUser) window.location.href = "/auth/sign-in";

  async function getPermissions(permissions) {
    let permissionsArray = Object.keys(permissions);

    let decodedNames = await Promise.all(
      permissionsArray.map(async (permission, index) => {
        const { data } = await axios.get(
          `${ApiPaths.PERMISSIONS_MENU}/${permission}`
        );
        return { name: data.data.name.toLowerCase(), id: data.data.id };
      })
    );

    const permissionsObject = {};
    decodedNames.forEach(
      (permission) =>
        (permissionsObject[permission.name] = permissions[permission.id])
    );

    return permissionsObject;
  }

  useEffect(() => {
    UsersAdapter.getById(loggedUser.user_id)
      .then((user) => setUser(user))
      .then(
        getPermissions(loggedUser.roles[0].permissions).then((permissions) => {
          setPermissions(permissions);
        })
      )
      .catch((err) => alert(err.messagef));
  }, []);

  useEffect(() => {
    setRoutes(getAllowedRoutes(permissions));
    setPermissionsState(dispatch, permissions);
  }, [permissions]);

  /* SIDENAV STATE */
  const [showText, setShowText] = useState(false);
  const [subMenuSelected, setSubMenuSelected] = useState("");
  const [subMenuSections, setSubMenuSection] = useState(defaultSubMenuSections);

  const handleSubMenuSections = (e) => {
    if(e){
    setSubMenuSection({
      ...defaultSubMenuSections,
      [e.currentTarget.id]: !subMenuSections[e.currentTarget.id],
    });
    setSubMenuSelected(e.currentTarget.id);
  
    handleHideSidenav();
  }
  };

  const handleHideSidenav = (e) => {
    if(e){
    setSubMenuSection({
      ...defaultSubMenuSections,
      [e.currentTarget.id]: !subMenuSections[e.currentTarget.id],
    });
    setSubMenuSelected(e.currentTarget.id);
    setShowText(false);
  }
  };

  return (
    <div className="h-screenbg-blue-gray-50/50">
      <Sidenav
        showText={showText}
        setShowText={setShowText}
        routes={routes}
        subMenuSections={subMenuSections}
        handleSubMenuSections={handleSubMenuSections}
        handleHideSidenav={handleHideSidenav}
        appImages={appImages}
      />
      <main
        className="p-4 xl:ml-16 h-screen flex flex-col justify-between"
        onClick={(e) => handleHideSidenav(e)}
      >
        <DashboardNavbar user={user} />

        <Routes>
          {routes.map(
            ({ layout, pages }) =>
              layout === "dashboard" &&
              pages.map(({ path, element }) => (
                <Route exact path={path} element={element} />
              ))
          )}
          {routes.map(
            ({ layout, pages }) =>
              layout === "dashboard" &&
              pages.map(({ subPages }) =>
                subPages?.map((sub) => {
                  return <Route exact path={sub.path} element={sub.element} />;
                })
              )
          )}
        </Routes>
        <div className="text-blue-gray-600">
          <Footer />
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
