import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import { Toaster } from "./components/ui/sonner";
import { AppRoutes } from "./routes/routes";
import type { RootState } from "./store";
import { useEffect, useState } from "react";
import { apiClient } from "./lib/api-client";
import { GET_USERINFO } from "./utils/constants";
import { setUser } from "./store/features/auth/authSlice";

function App() {
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const response = await apiClient.get(GET_USERINFO, {
          withCredentials: true,
        });
        if (response.status === 200 && response.data.user.id) {
          console.log(response.data.user);
          dispatch(setUser(response.data.user));
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    if (!user.id) {
      getUserInfo();
    } else {
      setIsLoading(false);
    }
  }, [user, dispatch]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Toaster richColors theme="light" closeButton />
      <AppRoutes />;
    </>
  );
}

export default App;
