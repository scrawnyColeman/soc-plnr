import React, { useState, createContext, useCallback, ReactNode } from "react";

type AlertType = "error" | "warning";

type State =
  | {
      type?: AlertType;
      text?: string;
      onPress?: () => void;
    }
  | undefined;

type Context = {
  alertState: State;
  setAlert: ({ type, text }: { type: AlertType; text: string }) => void;
  clearAlert: () => void;
};

export const AlertContext = createContext({} as Context);

export const AlertsProvider = ({ children }: { children: ReactNode }) => {
  const [alertState, setAlertState] = useState<State>();

  const setAlert = useCallback(
    ({ type, text }: { type: AlertType; text: string }) => {
      return setAlertState({
        type,
        text,
        onPress: () => setAlertState(undefined),
      });
    },
    []
  );

  const clearAlert = useCallback(() => setAlertState(undefined), []);

  return (
    <AlertContext.Provider value={{ alertState, setAlert, clearAlert }}>
      {children}
    </AlertContext.Provider>
  );
};
