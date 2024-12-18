import Chat from "@/pages/chat";
import Profile from "@/pages/profile";
import type { RootState } from "@/store";
import type { ReactNode } from "react";
import { useSelector } from "react-redux";
import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";

export const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const user = useSelector((state: RootState) => state.auth.user);
  return user ? children : <Navigate to="/auth" replace />;
};

export const ProfileSetupRoute = ({ children }: { children: ReactNode }) => {
  const user = useSelector((state: RootState) => state.auth.user);
  return user.profileSetup ? children : <Navigate to="/profile" replace />;
};

export const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* Giriş yapmış kullanıcılar /auth'a gidemez */}
        <Route path="/auth" element={<Navigate to={"/profile"} />} />
        {/* Giriş yapılmış kullanıcı kontrolü */}
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        {/* ProfileSetup kontrolü */}
        <Route
          path="/chat"
          element={
            <PrivateRoute>
              <ProfileSetupRoute>
                <Chat />
              </ProfileSetupRoute>
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Navigate to={"/auth"} />} />
      </Routes>
    </Router>
  );
};
