import React, { useState, createContext, useCallback, ReactNode } from "react";

export enum AlertType {
  ERROR = "ERROR",
  SUCCESS = "SUCCESS",
}

type State = {
  type?: keyof typeof AlertType;
  text?: string;
};

type Context = {
  alertState: State;
  setAlert: ({
    type,
    text,
  }: {
    type: keyof typeof AlertType;
    text: string;
  }) => void;
  clearAlert: () => void;
};

export const AlertContext = createContext({} as Context);

export const AlertsProvider = ({ children }: { children: ReactNode }) => {
  const [alertState, setAlertState] = useState<State>({});

  const setAlert = useCallback(
    ({ type, text }: { type: keyof typeof AlertType; text: string }) =>
      setAlertState({
        type,
        text,
      }),
    []
  );

  const clearAlert = useCallback(() => setAlertState({}), []);

  return (
    <AlertContext.Provider value={{ alertState, setAlert, clearAlert }}>
      {children}
    </AlertContext.Provider>
  );
};
