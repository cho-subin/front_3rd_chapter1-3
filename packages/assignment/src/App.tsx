import React, { useState } from "react";
import { generateItems } from "./utils";
import { AppContextType, Notification, User } from "./context/contextType";
import { ItemList } from "./component/ItemList";
import { Header } from "./component/Header";
import { ComplexForm } from "./component/ComplexForm";
import { NotificationSystem } from "./component/NotificationSystem";
import { AppContext } from "./context/useAppContext";

// 메인 App 컴포넌트
const App: React.FC = () => {
  const [theme, setTheme] = useState("light");
  const [items] = useState(generateItems(10000));
  const [user, setUser] = useState<User | null>(null);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const login = (email: string) => {
    setUser({ id: 1, name: "홍길동", email });
    addNotification("성공적으로 로그인되었습니다", "success");
  };

  const logout = () => {
    setUser(null);
    addNotification("로그아웃되었습니다", "info");
  };

  const addNotification = (message: string, type: Notification["type"]) => {
    const newNotification: Notification = {
      id: Date.now(),
      message,
      type,
    };
    setNotifications((prev) => [...prev, newNotification]);
  };

  const removeNotification = (id: number) => {
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== id)
    );
  };

  const contextValue: AppContextType = {
    theme,
    toggleTheme,
    user,
    login,
    logout,
    notifications,
    addNotification,
    removeNotification,
  };

  return (
    <AppContext.Provider value={contextValue}>
      <div
        className={`min-h-screen ${
          theme === "light" ? "bg-gray-100" : "bg-gray-900 text-white"
        }`}
      >
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-1/2 md:pr-4">
              <ItemList items={items} />
            </div>
            <div className="w-full md:w-1/2 md:pl-4">
              <ComplexForm />
            </div>
          </div>
        </div>
        <NotificationSystem />
      </div>
    </AppContext.Provider>
  );
};

export default App;
