import { useState, createContext, useContext, useEffect } from 'react';
import { useNotify } from '@/hooks';

type AlertContextProps = {
  showAlert: boolean;
  cancelAlert: () => void;
  alertInfo: AlertInfo;
  notifyAlert: React.Dispatch<React.SetStateAction<AlertInfo>>;
};

type AlertContextProviderProps = {
  children: React.ReactNode;
};

export const AlertContext = createContext<AlertContextProps | null>(null);

export const AlertContextProvider = ({
  children,
}: AlertContextProviderProps) => {
  const [showAlert, notify, cancelAlert] = useNotify(5000);
  const [alertInfo, notifyAlert] = useState<AlertInfo>({
    isError: false,
    message: '',
  });

  useEffect(() => {
    if (alertInfo.message !== '') notify();
  }, [alertInfo, notify]);

  const value = {
    showAlert,
    cancelAlert,
    alertInfo,
    notifyAlert,
  };

  return (
    <AlertContext.Provider value={value}>{children}</AlertContext.Provider>
  );
};

export const useAlertContext = () => {
  const context = useContext(AlertContext);

  if (!context)
    throw new Error(
      'useAlertContext must be called from within the AlertContextProvider'
    );

  return context;
};

type AlertInfo = {
  isError: boolean;
  message: string;
};
