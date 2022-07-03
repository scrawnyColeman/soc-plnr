import { useContext } from "react";

import { AlertContext } from "src/context";

export const useAlert = () => useContext(AlertContext);
