import "./App.css";
import { Toaster } from "./components/ui/sonner";
import { AppRoutes } from "./routes/routes";

function App() {
  return (
    <>
      <Toaster richColors theme="light" closeButton />
      <AppRoutes />;
    </>
  );
}

export default App;
