import { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import "./App.css";
import { useUser } from "@clerk/clerk-react";
import Header from "./components/custom/Header";
import { Toaster } from "sonner";
function App() {
  const [count, setCount] = useState(0);
  const { user, isLoaded, isSignedIn } = useUser();
  if (!isSignedIn && isLoaded) {
    return <Navigate to={"/auth/sign-in"} />;
  }
  return (
    <>
      <Header />
      <Outlet></Outlet>
      <Toaster />
    </>
  );
}

export default App;
