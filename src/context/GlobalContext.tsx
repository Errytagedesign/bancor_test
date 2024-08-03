import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';

// Define the shape of the context state
interface GlobalState {
  email: string;
  setEmail: (email: string) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (status: boolean) => void;
}

// Create the context with a default value
const GlobalContext = createContext<GlobalState | undefined>(undefined);

// Define the provider component
const GlobalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [email, setEmail] = useState<string>('');
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    const storedStatus = localStorage.getItem('isLoggedIn');
    return storedStatus ? JSON.parse(storedStatus) : false;
  });

  useEffect(() => {
    localStorage.setItem('isLoggedIn', JSON.stringify(isLoggedIn));
  }, [isLoggedIn]);

  return (
    <GlobalContext.Provider
      value={{ email, setEmail, isLoggedIn, setIsLoggedIn }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

// Custom hook to use the GlobalContext
const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error('useGlobalContext must be used within a GlobalProvider');
  }
  return context;
};

export { GlobalProvider, useGlobalContext };
