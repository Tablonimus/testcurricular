import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard, Auth } from "@/Presenter/layouts";

function App({ appImages }) {
  return (
    <>
      <Routes>
        <Route path="/auth/*" element={<Auth />} />
        <Route
          path="/dashboard/*"
          element={<Dashboard appImages={appImages} />}
        />

        {/* Default path */}
        <Route path="*" element={<Navigate to="/auth/sign-in" replace />} />
      </Routes>
    </>
  );
}

export default App;
