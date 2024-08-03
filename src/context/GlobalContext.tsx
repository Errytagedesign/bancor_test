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
  forgotID: number;
  setForgotID: (forgotID: number) => void;
}

// Create the context with a default value
const GlobalContext = createContext<GlobalState | undefined>(undefined);

// Define the provider component
const GlobalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [email, setEmail] = useState<string>(() => {
    const storedEmail = localStorage.getItem('userEmail');
    return storedEmail ? JSON.parse(storedEmail) : false;
  });

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    const storedStatus = localStorage.getItem('isLoggedIn');
    return storedStatus ? JSON.parse(storedStatus) : false;
  });

  const [forgotID, setForgotID] = useState<number>(() => {
    const storedId = localStorage.getItem('forgotID');
    return storedId ? JSON.parse(storedId) : '';
  });

  useEffect(() => {
    localStorage.setItem('isLoggedIn', JSON.stringify(isLoggedIn));
    localStorage.setItem('userEmail', JSON.stringify(email));
    localStorage.setItem('forgotID', JSON.stringify(forgotID));
  }, [isLoggedIn, email, forgotID]);

  return (
    <GlobalContext.Provider
      value={{
        email,
        setEmail,
        isLoggedIn,
        setIsLoggedIn,
        forgotID,
        setForgotID,
      }}
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
