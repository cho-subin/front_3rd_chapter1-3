import { createContext, useContext } from "react";
import { AppContextType } from "./contextType";

export const AppContext = createContext<AppContextType | undefined>(undefined);

// 커스텀 훅: useAppContext
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
