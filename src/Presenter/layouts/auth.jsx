import { Routes, Route } from "react-router-dom";
import { authRoutes } from "@/routes";

export function Auth() {
  return (
    <div className="relative min-h-screen w-full">
      <Routes>
        {authRoutes.map(
          ({ layout, pages }) =>
            layout === "auth" &&
            pages.map(({ path, element }) => (
              <Route exact path={path} element={element} />
            ))
        )}
      </Routes>
    </div>
  );
}

export default Auth;
