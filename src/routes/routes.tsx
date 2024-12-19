import Auth from "@/pages/auth";
import Chat from "@/pages/chat";
import Profile from "@/pages/profile";
import type { RootState } from "@/store";
import type { ReactNode } from "react";
import { useSelector } from "react-redux";
import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";

export const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const user = useSelector((state: RootState) => state.auth.user);
  return user.id ? children : <Navigate to="/auth" replace />;
};

export const AuthRoute = ({ children }: { children: ReactNode }) => {
  const user = useSelector((state: RootState) => state.auth.user);
  return user.id ? <Navigate to="/chat" /> : children;
};

export const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* Giriş yapmış kullanıcılar /auth'a gidemez */}
        <Route
          path="/auth"
          element={
            <AuthRoute>
              <Auth />
            </AuthRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route
          path="/chat"
          element={
            <PrivateRoute>
              <Chat />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Navigate to={"/auth"} />} />
      </Routes>
    </Router>
  );
};
