// React
import type {FC, PropsWithChildren} from "react"
import { useEffect } from "react";


// Router
import { useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "@/store/AuthContext";

const NavigationGuard: FC<PropsWithChildren> = ({ children }) => {
  const { clearError } = useContext(AuthContext);

  const location = useLocation()
  useEffect(() => {
    console.log("clearError")
    clearError();
  }, [location]);

  return children;
};

export default NavigationGuard;
